/**
 * Downloads and processes every photograph in src/data/photos.js.
 *
 * Run with `npm run images`. It is deliberately NOT part of `npm run build`:
 * the build must work offline and on a CI box with no network egress, and a
 * deploy should never silently depend on someone else's CDN being up. The
 * processed files are committed; this script only runs when the manifest
 * changes.
 *
 * For each source it writes, into public/images/:
 *   <name>-480.webp   phones
 *   <name>-960.webp   tablets and the smaller desktop slots
 *   <name>-1600.webp  full-bleed hero and section backgrounds
 *
 * and records the intrinsic dimensions plus a ~400-byte blurred placeholder in
 * src/data/images.gen.js.
 *
 * ── Why the placeholder matters ────────────────────────────────────────────
 * Every image slot on this site renders its blur as a CSS background
 * underneath the real file. Combined with the width/height attributes that
 * come from the same generated file, that means: no layout shift, and no
 * white rectangle sitting where a photograph will eventually appear. On the
 * mid-range Android phones most of this audience reads on, that difference is
 * the difference between a page that feels built and one that feels like it is
 * still loading.
 *
 * ── Why WebP and not AVIF ──────────────────────────────────────────────────
 * AVIF is ~20% smaller and encodes about thirty times slower, and the saving is
 * measured in single-digit kilobytes on images this size. WebP is universally
 * supported by every browser this site targets, so there is no JPEG fallback to
 * maintain either. If page weight ever becomes the binding constraint, add AVIF
 * as an extra <source> rather than replacing WebP.
 */
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { PHOTOS } from '../src/data/photos.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'images')
const MANIFEST = join(ROOT, 'src', 'data', 'images.gen.js')

/** The widths every photograph is emitted at. */
const WIDTHS = [480, 960, 1600]

/** Quality per width — the smallest is displayed smallest and can take more compression. */
const QUALITY = { 480: 72, 960: 76, 1600: 80 }

/** Ask Unsplash for a generous source and do the real resizing locally. */
const sourceUrl = (src) => `${src}?w=2000&q=90&fm=jpg&fit=max&auto=format`

async function download(url) {
  const res = await fetch(url, {
    headers: { 'user-agent': 'payyouadvisory-build/1.0 (+https://payyouadvisory.com)' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)
  const type = res.headers.get('content-type') ?? ''
  if (!type.startsWith('image/')) throw new Error(`expected an image, got "${type}"`)
  return Buffer.from(await res.arrayBuffer())
}

/**
 * A 20px-wide WebP, base64'd into a data URI.
 *
 * Twenty pixels sounds absurd and is the point: scaled up behind the real
 * image it reads as a soft wash of the right colours, and it costs about 400
 * bytes inline rather than a network request. Larger placeholders look like
 * low-quality images, which is worse than looking like nothing.
 */
async function placeholder(buffer) {
  const tiny = await sharp(buffer)
    .resize(20, null, { fit: 'inside' })
    .webp({ quality: 30 })
    .toBuffer()
  return `data:image/webp;base64,${tiny.toString('base64')}`
}

async function main() {
  await mkdir(OUT, { recursive: true })

  const force = process.argv.includes('--force')
  const entries = Object.entries(PHOTOS)
  const manifest = {}
  let fetched = 0
  let skipped = 0
  const failures = []

  for (const [name, photo] of entries) {
    // Skip work already done, unless --force. Re-downloading thirty images to
    // change one alt string is a waste of everyone's time and of Unsplash's
    // bandwidth.
    const largest = join(OUT, `${name}-${WIDTHS[WIDTHS.length - 1]}.webp`)
    const existing = await readExistingManifest()
    if (!force && existing[name] && (await exists(largest))) {
      manifest[name] = { ...existing[name], alt: photo.alt, focal: photo.focal ?? '50% 50%' }
      skipped += 1
      continue
    }

    process.stdout.write(`  ${name} … `)
    try {
      const buffer = await download(sourceUrl(photo.src))
      const meta = await sharp(buffer).metadata()

      for (const width of WIDTHS) {
        // Never upscale. An image enlarged past its source is soft, larger on
        // the wire, and worse than simply serving the source size.
        const target = Math.min(width, meta.width)
        await sharp(buffer)
          .resize(target, null, { withoutEnlargement: true })
          .webp({ quality: QUALITY[width], effort: 5 })
          .toFile(join(OUT, `${name}-${width}.webp`))
      }

      manifest[name] = {
        width: meta.width,
        height: meta.height,
        ratio: Math.round((meta.width / meta.height) * 1000) / 1000,
        alt: photo.alt,
        focal: photo.focal ?? '50% 50%',
        source: photo.src,
        blur: await placeholder(buffer),
      }

      fetched += 1
      console.log(`${meta.width}×${meta.height}`)
    } catch (err) {
      console.log('FAILED')
      failures.push(`${name}: ${err.message}`)
    }
  }

  if (failures.length) {
    console.error(`\n✗ ${failures.length} image(s) could not be processed:`)
    failures.forEach((f) => console.error(`   ${f}`))
    console.error('\n  Nothing was written. Fix the source URLs in src/data/photos.js')
    console.error('  and run "npm run images" again.\n')
    process.exit(1)
  }

  const file = `/**
 * GENERATED FILE — do not edit.
 *
 * Written by scripts/fetch-images.mjs from the manifest in src/data/photos.js.
 * Run "npm run images" to regenerate, or "npm run images -- --force" to
 * re-download everything.
 *
 * Every entry carries the intrinsic dimensions (so <img> can declare width and
 * height and reserve the right space before the file arrives) and a ~400-byte
 * blurred placeholder (so the space is not blank while it does).
 */
export const IMAGES = ${JSON.stringify(manifest, null, 2)}

export const IMAGE_WIDTHS = ${JSON.stringify(WIDTHS)}
`
  await writeFile(MANIFEST, file, 'utf8')

  console.log(`\n✓ ${fetched} downloaded, ${skipped} already present`)
  console.log(`✓ ${Object.keys(manifest).length} images in src/data/images.gen.js\n`)
}

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

/** Read the previous run's output so unchanged images can be skipped. */
async function readExistingManifest() {
  if (readExistingManifest.cache) return readExistingManifest.cache
  try {
    const source = await readFile(MANIFEST, 'utf8')
    const json = source.slice(source.indexOf('{'), source.lastIndexOf('}') + 1)
    readExistingManifest.cache = JSON.parse(json)
  } catch {
    readExistingManifest.cache = {}
  }
  return readExistingManifest.cache
}

main().catch((err) => {
  console.error('✗ image processing failed:', err)
  process.exit(1)
})
