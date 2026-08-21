/**
 * Downloads and normalises the partner bank / NBFC logos.
 *
 * Run with `npm run logos`. Like the photography, it is deliberately not part
 * of `npm run build` — the output is committed and a deploy must not depend on
 * a third-party server being up.
 *
 * ── Where these come from ──────────────────────────────────────────────────
 * PayYou's own site, `/wp-content/themes/payyou-theme/assets/images/Bank and
 * NBFC's logo/`. They are the client's existing, chosen assets for exactly this
 * purpose, which settles the question of which files to use.
 *
 * ── Why they need processing ───────────────────────────────────────────────
 * As downloaded they are a mess, and it is the mess every partner wall on the
 * web has: twelve files at twelve resolutions from 447x70 to 1600x1600, some
 * with transparency and some without, some tightly cropped and some floating in
 * a sea of white, and three (Bajaj, L&T, Aditya Birla) with a solid coloured
 * block baked into the image. Dropped into a grid as-is they look scraped,
 * which is precisely the impression a lending business cannot afford.
 *
 * So each one is:
 *   1. `trim()`ed — removes the surrounding dead space, so a logo that occupied
 *      30% of its file and one that filled it end up optically the same size.
 *   2. Fitted into a common box without enlargement, so nothing is upscaled
 *      into blur.
 *   3. Centred on a transparent canvas of identical dimensions, so the grid
 *      aligns on the logos themselves rather than on their bounding boxes.
 *
 * The remaining inconsistency — the three coloured blocks — is handled in the
 * design rather than here: the wall renders every logo greyscale at rest and
 * restores full colour on hover, which is the standard technique for making
 * heterogeneous marks read as one set. See src/sections/LenderWall.jsx.
 */
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { LENDERS } from '../src/data/lenders.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'logos')
const MANIFEST = join(ROOT, 'src', 'data', 'logos.gen.js')

/** The common box every logo is fitted into, at 1x. Emitted at 1x and 2x. */
const BOX = { width: 240, height: 96 }

/**
 * How much of the box a logo is allowed to fill.
 *
 * Not 100%. A wordmark like "mahindra FINANCE" is wide and short; a roundel
 * like SBI is square. Fitting both to the full box makes the square one look
 * enormous next to the wide one, because the eye compares area rather than
 * bounding box. Holding everything to 86% of the height leaves optical air and
 * lets the wide marks run closer to the full width, which is what makes a row
 * of mismatched logos look deliberately set.
 */
const FILL = 0.86

const sourceOf = (file) =>
  `https://payyouadvisory.com/wp-content/themes/payyou-theme/assets/images/Bank%20and%20NBFC's%20logo/${encodeURIComponent(file)}`

/**
 * PayYou's own logo, from their live site.
 *
 * The source is 166x72 — small, but it is the real mark and a real mark at
 * modest resolution beats an invented one at any resolution. It is emitted at
 * 1x and 2x; the 2x is an upscale, which is acceptable for a wordmark rendered
 * at 40px tall and is flagged here so nobody is surprised by it later.
 *
 * TODO(client): send the original vector (AI/EPS/SVG) or a PNG at 1000px+ wide.
 * The header logo is the single most-seen graphic on the site and it deserves
 * to be crisp on a retina screen. This is a two-minute ask of whoever designed
 * the mark.
 */
const BRAND_LOGO =
  'https://payyouadvisory.com/wp-content/themes/payyou-theme/assets/images/PayYou-Logo.webp'

async function fetchBrandLogo() {
  const dir = join(ROOT, 'public', 'brand')
  await mkdir(dir, { recursive: true })

  const res = await fetch(BRAND_LOGO, { headers: { 'user-agent': 'payyouadvisory-build/1.0' } })
  if (!res.ok) throw new Error(`brand logo: HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const meta = await sharp(buffer).metadata()

  // Height-driven: the lockup is placed by height everywhere it is used, so
  // the width follows from the source aspect ratio rather than being asserted.
  const H = 72
  const ratio = meta.width / meta.height

  for (const scale of [1, 2]) {
    await sharp(buffer)
      .resize({ height: H * scale, fit: 'inside' })
      .png({ compressionLevel: 9 })
      .toFile(join(dir, scale === 2 ? 'payyou-logo@2x.png' : 'payyou-logo.png'))
  }

  console.log(`  payyou-logo … ${meta.width}x${meta.height} source → ${Math.round(H * ratio)}x${H}`)
  return { width: Math.round(H * ratio), height: H, source: BRAND_LOGO }
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const brand = await fetchBrandLogo()

  const force = process.argv.includes('--force')
  const withLogos = LENDERS.filter((l) => l.logoFile)
  const manifest = {}
  const failures = []
  let fetched = 0
  let skipped = 0

  for (const lender of withLogos) {
    const name = lender.logo
    if (!force && (await exists(join(OUT, `${name}@2x.png`)))) {
      const previous = await readExisting()
      if (previous[name]) {
        manifest[name] = previous[name]
        skipped += 1
        continue
      }
    }

    process.stdout.write(`  ${name} … `)
    try {
      const res = await fetch(sourceOf(lender.logoFile), {
        headers: { 'user-agent': 'payyouadvisory-build/1.0 (+https://payyouadvisory.com)' },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buffer = Buffer.from(await res.arrayBuffer())

      const meta = await sharp(buffer).metadata()

      // Some sources are not logo files at all. The HDFC one is a brand-guide
      // sheet: the mark on top, a row of colour swatches labelled ED232A /
      // FFFFFF / 004C8F along the bottom. Trimming keeps both, and the wall
      // ends up with one tile that has a colour chart in it. `logoCrop` keeps
      // the given fraction of the height before anything else runs.
      const cropped = lender.logoCrop
        ? await sharp(buffer)
            .extract({
              left: 0,
              top: 0,
              width: meta.width,
              height: Math.round(meta.height * lender.logoCrop),
            })
            .toBuffer()
        : buffer

      // `trim` needs to know what counts as background. With an alpha channel
      // it finds the transparent border on its own; without one it uses the
      // top-left pixel, which for all of these files is the white surround.
      const trimmed = await sharp(cropped)
        .ensureAlpha()
        .trim({ threshold: meta.hasAlpha ? 1 : 12 })
        .toBuffer()

      const t = await sharp(trimmed).metadata()

      for (const scale of [1, 2]) {
        const box = { width: BOX.width * scale, height: BOX.height * scale }
        await sharp(trimmed)
          // Two resizes, and both are needed. The first scales the trimmed mark
          // to `FILL` of the box — `fit: inside` preserves the aspect ratio and
          // enlargement is allowed, because some of these sources are tiny.
          .resize({
            width: Math.round(box.width * FILL),
            height: Math.round(box.height * FILL),
            fit: 'inside',
          })
          // The second pads it out to the exact box on a transparent ground.
          // `withoutEnlargement` is what stops `contain` undoing the FILL by
          // scaling the mark back up to the full box.
          .resize({
            width: box.width,
            height: box.height,
            fit: 'contain',
            withoutEnlargement: true,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png({ compressionLevel: 9 })
          .toFile(join(OUT, scale === 2 ? `${name}@2x.png` : `${name}.png`))
      }

      manifest[name] = {
        label: lender.name,
        width: BOX.width,
        height: BOX.height,
        trimmed: `${t.width}x${t.height}`,
        source: sourceOf(lender.logoFile),
      }
      fetched += 1
      console.log(`trimmed to ${t.width}x${t.height}`)
    } catch (err) {
      console.log('FAILED')
      failures.push(`${name}: ${err.message}`)
    }
  }

  if (failures.length) {
    console.error(`\n✗ ${failures.length} logo(s) failed:`)
    failures.forEach((f) => console.error(`   ${f}`))
    console.error('\n  Nothing written. Fix `logoFile` in src/data/lenders.js.\n')
    process.exit(1)
  }

  await writeFile(
    MANIFEST,
    `/**
 * GENERATED FILE — do not edit.
 *
 * Written by scripts/fetch-logos.mjs. Run "npm run logos" to regenerate.
 * Every logo is trimmed of dead space and centred in an identical
 * ${BOX.width}x${BOX.height} box, so the partner wall aligns on the marks
 * themselves rather than on their original bounding boxes.
 */
export const LOGOS = ${JSON.stringify(manifest, null, 2)}

export const LOGO_BOX = ${JSON.stringify(BOX)}

/** PayYou's own mark, taken from the live site rather than invented. */
export const BRAND_LOGO = ${JSON.stringify(brand, null, 2)}
`,
    'utf8',
  )

  console.log(`\n✓ ${fetched} downloaded, ${skipped} already present`)
  console.log(`✓ ${Object.keys(manifest).length} logos in src/data/logos.gen.js\n`)
}

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

async function readExisting() {
  if (readExisting.cache) return readExisting.cache
  try {
    const source = await readFile(MANIFEST, 'utf8')
    readExisting.cache = JSON.parse(source.slice(source.indexOf('{'), source.lastIndexOf('}') + 1))
  } catch {
    readExisting.cache = {}
  }
  return readExisting.cache
}

main().catch((err) => {
  console.error('✗ logo processing failed:', err)
  process.exit(1)
})
