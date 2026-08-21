/**
 * Generates the favicon, the PWA / Apple icons and the Open Graph share card.
 *
 * ── The source is PayYou's real logo ───────────────────────────────────────
 * Earlier versions of this script drew a mark from scratch. That was wrong: the
 * client has a logo, and the browser tab is one of the places it most obviously
 * belongs. `npm run logos` downloads it to public/brand/; this script crops the
 * distinctive part of it for the small sizes and composes the share card around
 * the full lockup.
 *
 * ── The icon is the whole mark, and that is a compromise ───────────────────
 * The logo is a wide wordmark at roughly 2.3:1, which is a poor fit for a
 * square. The first attempt cropped out the red-and-blue swoosh over the "Y" —
 * the one element that is distinctive at small sizes — but the swoosh overlaps
 * the letterforms, so every rectangular crop of it drags in half an "A". A
 * clipped fragment of a client's logo is worse than a small one.
 *
 * So the icon is the complete mark, contained and centred on white. It is
 * unmistakable at 512px and at 192px, and at 16px in a browser tab it is a
 * blue-and-red smudge — which is what every wordmark favicon looks like at
 * 16px, and is at least an honest rendering of the real thing.
 *
 * TODO(client): a square app-icon version of the mark — the swoosh alone, or a
 * "P" monogram, drawn properly rather than cropped — would fix this. It is a
 * small design job and it is the difference between a recognisable tab and a
 * smudge. Drop it in as public/brand/payyou-icon.png and point this script at
 * it.
 *
 * Colours come from src/data/brand.js, which sampled them from that same file,
 * so nothing here can drift from the palette. `npm run audit:brand` proves it.
 *
 * Run with `npm run brand`, after `npm run logos`.
 */
import { mkdir, writeFile, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { BRAND } from '../src/data/brand.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUB = join(ROOT, 'public')
const LOGO = join(PUB, 'brand', 'payyou-logo@2x.png')

/**
 * The icon: the swoosh, on the brand blue, with generous padding.
 *
 * `pad` insets it further for the Android maskable icon, which is cropped to a
 * circle and will otherwise clip the corners of the artwork.
 */
async function iconBuffer(size, pad = 0) {
  // 80% of the padded box. A wordmark this wide needs the width, and the
  // vertical air that leaves is what stops it looking crammed into the square.
  const inner = Math.round(size * (1 - pad * 2) * 0.8)
  const mark = await sharp(LOGO)
    .resize({ width: inner, fit: 'inside' })
    .png()
    .toBuffer()

  const markMeta = await sharp(mark).metadata()

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BRAND.paper,
    },
  })
    .composite([
      {
        input: mark,
        left: Math.round((size - markMeta.width) / 2),
        top: Math.round((size - markMeta.height) / 2),
      },
    ])
    .png()
    .toBuffer()
}

/**
 * The Open Graph card.
 *
 * Most of this business's inbound links arrive forwarded in a WhatsApp group,
 * and WhatsApp renders a link as this image plus the title — so this file is,
 * in practice, PayYou's visiting card online.
 *
 * The text is set in Arial and Georgia rather than the site's own faces because
 * sharp rasterises SVG through librsvg, which can only use fonts installed on
 * the build machine. Naming "Plus Jakarta Sans" here would silently fall back
 * to something arbitrary on a CI box.
 */
const ogSvg = (logoWidth, logoHeight) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0"    stop-color="${BRAND.inkMid}"/>
      <stop offset="0.45" stop-color="${BRAND.ink}"/>
      <stop offset="1"    stop-color="${BRAND.inkDeep}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- A white chip for the logo, for the same reason the footer uses one: the
       mark is blue on transparency and has no reversed version. -->
  <rect x="72" y="64" width="${logoWidth + 48}" height="${logoHeight + 32}" rx="10" fill="#ffffff"/>

  <rect x="72" y="222" width="76" height="5" rx="2.5" fill="${BRAND.accent}"/>

  <text x="72" y="300" font-family="Arial Black, Arial, sans-serif" font-size="62"
        font-weight="900" letter-spacing="-2" fill="#ffffff">Twenty-five lenders.</text>
  <text x="72" y="374" font-family="Arial Black, Arial, sans-serif" font-size="62"
        font-weight="900" letter-spacing="-2" fill="${BRAND.accentLight}">One application.</text>

  <text x="72" y="432" font-family="Arial, Helvetica, sans-serif" font-size="24"
        fill="#ffffff" opacity="0.72">One credit enquiry, not twenty-five.</text>

  <rect x="72" y="466" width="1056" height="1" fill="#ffffff" opacity="0.18"/>

  <text x="72" y="514" font-family="Arial, Helvetica, sans-serif" font-size="21"
        fill="#ffffff" opacity="0.62">
    Personal · Business · Home · Property · Car · Gold · Insurance
  </text>

  <rect x="72" y="536" width="300" height="52" rx="6" fill="${BRAND.accent}"/>
  <text x="96" y="570" font-family="Courier New, monospace" font-size="23" font-weight="bold"
        fill="#ffffff">020 2735 0055</text>

  <text x="400" y="570" font-family="Arial, Helvetica, sans-serif" font-size="18"
        fill="#ffffff" opacity="0.5">
    Chapekar Chowk, Chinchwad · Pune
  </text>
</svg>`

async function main() {
  try {
    await access(LOGO)
  } catch {
    console.error('✗ public/brand/payyou-logo@2x.png is missing.')
    console.error('  Run "npm run logos" first — it downloads PayYou\'s logo from the live site.')
    process.exit(1)
  }

  await mkdir(PUB, { recursive: true })

  // favicon.svg embeds the PNG rather than being redrawn as vector. A traced
  // approximation of someone else's logo is a worse artefact than an honest
  // raster of the real one.
  const favicon = await iconBuffer(64)
  await writeFile(
    join(PUB, 'favicon.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><image href="data:image/png;base64,${favicon.toString('base64')}" width="64" height="64"/></svg>`,
    'utf8',
  )

  await writeFile(join(PUB, 'icon-192.png'), await iconBuffer(192))
  await writeFile(join(PUB, 'icon-512.png'), await iconBuffer(512))
  await writeFile(join(PUB, 'icon-maskable.png'), await iconBuffer(512, 0.14))
  await writeFile(join(PUB, 'apple-touch-icon.png'), await iconBuffer(180))

  // ── Open Graph card ──────────────────────────────────────────────────────
  const logo = await sharp(LOGO).resize({ height: 100, fit: 'inside' }).png().toBuffer()
  const logoMeta = await sharp(logo).metadata()

  await sharp(Buffer.from(ogSvg(logoMeta.width, logoMeta.height)))
    .composite([{ input: logo, left: 96, top: 80 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(PUB, 'og-image.jpg'))

  console.log('✓ favicon.svg, icons and og-image.jpg written from the real logo')
}

main().catch((err) => {
  console.error('✗ brand asset generation failed:', err)
  process.exit(1)
})
