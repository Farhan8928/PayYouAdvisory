/**
 * Generates every brand asset that is not hand-written CSS: favicon.svg, the
 * PWA and Apple icons, and the 1200x630 Open Graph share card.
 *
 * All of them read their colours from src/data/brand.js and their geometry from
 * src/data/mark.js — the same two files the Tailwind theme and the React
 * `<Wordmark />` import. That is the entire reason this script exists in this
 * form. When these assets carry their own hard-coded hexes, a palette change
 * updates the site and silently does not update the browser tab, the Android
 * splash screen or every WhatsApp link preview. Nothing errors. They just stop
 * matching, and nobody notices for months.
 *
 * `npm run audit:brand` asserts the output still matches the palette.
 *
 * Run with `npm run brand`. Re-run whenever the palette or the mark changes.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { BRAND } from '../src/data/brand.js'
import { markGeometry, markSvgString } from '../src/data/mark.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUB = join(ROOT, 'public')

/**
 * The Open Graph card.
 *
 * Most of this business's inbound links will arrive forwarded in a WhatsApp
 * group, and WhatsApp renders a link as this image plus the title. So this file
 * is, in practice, PayYou's visiting card online — worth more attention than
 * its 65 kB suggests.
 *
 * It uses Georgia and Arial rather than the site's own faces: sharp rasterises
 * SVG through librsvg, which can only use fonts installed on the build machine.
 * Naming "Source Serif 4" here would silently fall back to something limp on a
 * CI box, which is precisely the class of failure this file is trying to avoid.
 * Georgia is the closest system stand-in for a transitional serif and is
 * present on effectively every machine that will ever run this.
 *
 * There is no photograph on it, for the same reason there is none on the site.
 * See DESIGN.md § On photography.
 */
/**
 * The mark, drawn from the shared geometry rather than re-typed here.
 *
 * The first version of this file hard-coded the four rectangles, which held up
 * for exactly one revision: the moment the bar lengths changed to stop the
 * favicon reading as a hamburger menu, the OG card silently kept the old
 * drawing. That is the same class of drift the whole brand.js/mark.js
 * arrangement exists to prevent, reintroduced by hand in the one file that
 * generates the assets.
 */
const ogMark = (() => {
  const g = markGeometry(72)
  const rects = g.bars
    .map((b) => `<rect x="${b.x.toFixed(2)}" y="${b.y.toFixed(2)}" width="${b.w.toFixed(2)}" height="${b.h.toFixed(2)}" fill="${b.fill}"/>`)
    .join('\n    ')
  return `<g transform="translate(72 68)">
    <rect width="72" height="72" fill="${g.background}"/>
    ${rects}
  </g>`
})()

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BRAND.inkDeep}"/>

  ${ogMark}

  <text x="164" y="102" font-family="Georgia, serif" font-size="34" font-weight="bold"
        fill="${BRAND.paper}">PayYou</text>
  <text x="165" y="126" font-family="Courier New, monospace" font-size="13" letter-spacing="4.5"
        fill="${BRAND.brass}">ADVISORY</text>

  <rect x="72" y="184" width="88" height="3" fill="${BRAND.brass}"/>

  <text x="72" y="266" font-family="Georgia, serif" font-size="60" font-weight="bold"
        fill="${BRAND.paper}">Twenty-five lenders</text>
  <text x="72" y="336" font-family="Georgia, serif" font-size="60" font-weight="bold"
        fill="${BRAND.paper}">will look at your file.</text>
  <text x="72" y="406" font-family="Georgia, serif" font-size="60" font-weight="bold"
        fill="${BRAND.brass}">One will see your name.</text>

  <rect x="72" y="452" width="1056" height="1" fill="${BRAND.paper}" opacity="0.18"/>

  <text x="72" y="500" font-family="Arial, Helvetica, sans-serif" font-size="21"
        fill="${BRAND.paper}" opacity="0.62">
    Personal · Business · Home · Property · Car · Gold · Insurance
  </text>

  <rect x="72" y="524" width="326" height="52" fill="${BRAND.brass}"/>
  <text x="96" y="558" font-family="Courier New, monospace" font-size="23" font-weight="bold"
        fill="${BRAND.inkDeep}">020 2735 0055</text>

  <text x="424" y="558" font-family="Arial, Helvetica, sans-serif" font-size="18"
        fill="${BRAND.paper}" opacity="0.45">
    Chapekar Chowk, Chinchwad · payyouadvisory.com
  </text>
</svg>`

async function main() {
  await mkdir(PUB, { recursive: true })

  // Generated rather than hand-edited, so it cannot fall out of step with the
  // palette the way a checked-in SVG always eventually does.
  await writeFile(join(PUB, 'favicon.svg'), markSvgString(64), 'utf8')

  await sharp(Buffer.from(markSvgString(192))).png().toFile(join(PUB, 'icon-192.png'))
  await sharp(Buffer.from(markSvgString(512))).png().toFile(join(PUB, 'icon-512.png'))
  // Android crops maskable icons to a circle, so the mark is inset by 14%.
  await sharp(Buffer.from(markSvgString(512, 0.14))).png().toFile(join(PUB, 'icon-maskable.png'))
  await sharp(Buffer.from(markSvgString(180))).png().toFile(join(PUB, 'apple-touch-icon.png'))

  await sharp(Buffer.from(ogSvg)).jpeg({ quality: 88, mozjpeg: true }).toFile(join(PUB, 'og-image.jpg'))

  console.log('✓ favicon.svg, icons and og-image.jpg written to public/')
}

main().catch((err) => {
  console.error('✗ brand asset generation failed:', err)
  process.exit(1)
})
