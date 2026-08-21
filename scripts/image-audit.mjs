/**
 * Checks the photography, in the built output.
 *
 * Images are the one part of this site that can break without anything
 * throwing. A `<Photo name="hero-advisry" />` typo renders nothing at all and
 * the page still looks structurally fine in a build log. A file that was never
 * downloaded gives a 404 nobody sees until a visitor loads that page. And an
 * image left in `src/data/photos.js` after its last use costs three files and
 * several hundred kilobytes in the repository forever.
 *
 * So: every name referenced in the source must exist in the manifest, every
 * file the manifest promises must exist in dist, every `<img>` in the built
 * HTML must carry alt/width/height/srcset, and nothing may be orphaned.
 *
 * Runs as part of `npm run build`.
 */
import { readdir, readFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PHOTOS, AREA_PHOTO } from '../src/data/photos.js'
import { IMAGES, IMAGE_WIDTHS } from '../src/data/images.gen.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'src')
const DIST = join(ROOT, 'dist')

const errors = []
const warnings = []

async function jsxFiles(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await jsxFiles(full, acc)
    else if (entry.name.endsWith('.jsx')) acc.push(full)
  }
  return acc
}

async function htmlFiles(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await htmlFiles(full, acc)
    else if (entry.name.endsWith('.html')) acc.push(full)
  }
  return acc
}

const exists = async (p) => {
  try {
    await stat(p)
    return true
  } catch {
    return false
  }
}

async function main() {
  // ── Every name in the source resolves ──────────────────────────────────
  //
  // Only literal `name="…"` attributes can be checked statically; the product
  // and locality pages pass a variable. Those are covered by the two loops
  // below, which walk the actual data instead.
  const used = new Set()

  for (const file of await jsxFiles(SRC)) {
    const source = await readFile(file, 'utf8')
    const name = file.slice(ROOT.length + 1).replace(/\\/g, '/')
    for (const m of source.matchAll(/<Photo(?:Backdrop)?\b[^>]*?\bname="([^"]+)"/g)) {
      used.add(m[1])
      if (!IMAGES[m[1]]) errors.push(`${name}: <Photo name="${m[1]}"> is not in the manifest`)
    }
  }

  // Product pages pass `name={p.slug}`; locality pages pass AREA_PHOTO[slug].
  for (const slug of Object.keys(PHOTOS)) used.add(slug)
  for (const [area, photo] of Object.entries(AREA_PHOTO)) {
    used.add(photo)
    if (!IMAGES[photo]) errors.push(`AREA_PHOTO["${area}"] points at "${photo}", which has no image`)
  }

  // ── Every manifest entry has its files on disk ─────────────────────────
  for (const [name, image] of Object.entries(IMAGES)) {
    for (const width of IMAGE_WIDTHS) {
      if (!(await exists(join(DIST, 'images', `${name}-${width}.webp`))))
        errors.push(`missing dist/images/${name}-${width}.webp — run "npm run images"`)
    }
    if (!image.blur?.startsWith('data:image/'))
      errors.push(`${name}: no blurred placeholder in the manifest`)
    if (!image.width || !image.height) errors.push(`${name}: no intrinsic dimensions`)
    if (!image.alt || image.alt.length < 12)
      errors.push(`${name}: alt text is missing or too short to be useful`)
    // Alt text describing the file rather than the picture is worse than none.
    if (/^(image|photo|picture|banner)\b/i.test(image.alt))
      warnings.push(`${name}: alt text starts with "${image.alt.split(' ')[0]}" — describe the scene, not the file`)
  }

  // ── Nothing orphaned ───────────────────────────────────────────────────
  for (const name of Object.keys(IMAGES)) {
    if (!used.has(name))
      warnings.push(`${name} is downloaded but never rendered — remove it from src/data/photos.js`)
  }

  // ── Every <img> in the built HTML is well-formed ───────────────────────
  const files = await htmlFiles(DIST)
  let imgCount = 0

  for (const file of files) {
    const name = file.slice(DIST.length + 1).replace(/\\/g, '/')
    const html = (await readFile(file, 'utf8')).replace(/<!--[\s\S]*?-->/g, '')

    for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
      imgCount += 1
      const isDecorative = /aria-hidden="true"/i.test(tag)

      // Every attribute test here is case-insensitive, and that is not
      // defensive tidiness — `renderToString` emits `srcSet` with a capital S
      // rather than the all-lowercase `srcset`. HTML attribute names are
      // ASCII case-insensitive so browsers do not care, but a case-sensitive
      // check reported all 273 images on the site as missing a srcset they
      // plainly had. An audit that is wrong about everything is worse than no
      // audit: the next real failure gets dismissed as more of the same noise.
      if (!/\bwidth="\d+"/i.test(tag) || !/\bheight="\d+"/i.test(tag))
        errors.push(`${name}: <img> without width/height — guaranteed layout shift`)
      if (!/\bsrcset=/i.test(tag))
        errors.push(`${name}: <img> without srcset — one size served to every device`)
      if (!/\balt=/i.test(tag)) errors.push(`${name}: <img> without an alt attribute`)
      if (!isDecorative && /\balt=""/i.test(tag))
        errors.push(`${name}: <img> with empty alt that is not marked aria-hidden`)
      if (!/\bloading="(lazy|eager)"/i.test(tag))
        warnings.push(`${name}: <img> without an explicit loading attribute`)

      // Referenced file must actually be in dist.
      const src = tag.match(/\bsrc="([^"]+)"/)?.[1]
      if (src?.startsWith('/') && !(await exists(join(DIST, src.slice(1)))))
        errors.push(`${name}: <img src="${src}"> does not exist in dist`)
    }

    // Exactly one eagerly-loaded image per page: the LCP candidate. More than
    // one and they compete for bandwidth; none and the hero arrives late.
    const eager = (html.match(/loading="eager"/g) ?? []).length
    if (eager > 1) warnings.push(`${name}: ${eager} eagerly-loaded images — only the LCP one should be`)
  }

  // ── Report ─────────────────────────────────────────────────────────────
  console.log(
    `\nImage audit — ${Object.keys(IMAGES).length} photographs, ${imgCount} <img> tags across ${files.length} pages`,
  )

  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} warning(s):`)
    const shown = [...new Set(warnings.map((w) => w.replace(/^[^:]+:/, '…:')))].slice(0, 10)
    shown.forEach((w) => console.log(`   ${w}`))
    if (warnings.length > shown.length)
      console.log(`   …and ${warnings.length - shown.length} more of the same kinds`)
  }

  if (errors.length) {
    console.error(`\n✗ ${errors.length} error(s):`)
    ;[...new Set(errors)].slice(0, 20).forEach((e) => console.error(`   ${e}`))
    console.error('')
    process.exit(1)
  }

  console.log('\n✓ image audit passed\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
