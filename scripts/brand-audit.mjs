/**
 * Verifies the brand assets still match the palette.
 *
 * This class of bug is silent and long-lived. The favicon, the PWA icons, the
 * Open Graph card, the manifest colours and the browser theme-colour are all
 * generated or hand-written separately from the stylesheet. Change the palette
 * and the site changes; the tab icon, the Android splash screen and every
 * WhatsApp link preview keep the old colours indefinitely. Nothing errors.
 * Nothing in the build notices. The only way to catch it is for a human to look
 * at a browser tab and remember what the colour used to be.
 *
 * Colours come from src/data/brand.js, sampled from PayYou's own logo, and the
 * icons are generated from that logo by scripts/make-brand-assets.mjs. This
 * asserts that:
 *   · the generated assets exist and are in palette colours
 *   · the manifest and the theme-color meta tag agree with the palette
 *   · no non-palette hex has crept into any built page
 *   · the type stack is the one DESIGN.md specifies, on every page
 *
 * Runs as part of `npm run build`.
 */
import { readdir, readFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BRAND, THEME_COLOR, BACKGROUND_COLOR } from '../src/data/brand.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

const errors = []
const palette = new Set(Object.values(BRAND).map((c) => c.toLowerCase()))

/** Pure black and white, legitimate outside the brand palette. */
const ALLOWED_EXTRA = new Set(['#fff', '#ffffff', '#000', '#000000'])

/**
 * Hexes that legitimately appear inside a base64 data URI.
 *
 * Every photograph ships a ~400-byte blurred placeholder inlined as a
 * `data:image/webp;base64,…` string, and base64 uses the characters a-z, A-Z,
 * 0-9, + and /. A run like `#fa3b21` cannot occur — base64 has no `#` — but a
 * `style="background-image:url("data:…")"` attribute is long enough that it is
 * worth stripping before the palette scan rather than trusting that.
 */
const stripDataUris = (html) => html.replace(/data:image\/[a-z+]+;base64,[A-Za-z0-9+/=]+/g, '')

/**
 * The three faces DESIGN.md commits to, and the ones it bans.
 *
 * The banned list is not stylistic fussiness. Each of those is among the most
 * heavily used typefaces on the generated web, and reaching for one is the
 * single easiest way for this design to drift back toward the statistical
 * average of every landing page — which is the specific failure DESIGN.md was
 * written to prevent.
 */
const REQUIRED_FONTS = ['Plus+Jakarta+Sans', 'IBM+Plex+Mono']
const BANNED_FONTS = ['Inter:', 'Poppins', 'Montserrat', 'Space+Grotesk', 'Fraunces', 'Playfair', 'Lato', 'Open+Sans']

async function htmlFiles(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await htmlFiles(full, acc)
    else if (entry.name.endsWith('.html')) acc.push(full)
  }
  return acc
}

async function main() {
  // ── The generated assets must exist ─────────────────────────────────────
  for (const f of [
    'favicon.svg',
    'icon-192.png',
    'icon-512.png',
    'icon-maskable.png',
    'apple-touch-icon.png',
    'og-image.jpg',
  ]) {
    try {
      await stat(join(DIST, f))
    } catch {
      errors.push(`missing brand asset dist/${f} — run "npm run brand"`)
    }
  }

  // ── favicon.svg must be the generated one, in palette colours ───────────
  const favicon = await readFile(join(DIST, 'favicon.svg'), 'utf8').catch(() => '')
  for (const hex of favicon.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []) {
    if (!palette.has(hex.toLowerCase()) && !ALLOWED_EXTRA.has(hex.toLowerCase()))
      errors.push(`favicon.svg uses ${hex}, which is not in the brand palette — run "npm run brand"`)
  }

  // ── Manifest colours ────────────────────────────────────────────────────
  const manifestRaw = await readFile(join(DIST, 'site.webmanifest'), 'utf8').catch(() => '{}')
  let manifest = {}
  try {
    // Strip a UTF-8 BOM before parsing. Editors and PowerShell's
    // `Set-Content -Encoding utf8` both add one and JSON.parse rejects it,
    // which otherwise crashes this script with a stack trace rather than a
    // usable message.
    manifest = JSON.parse(manifestRaw.replace(/^﻿/, ''))
  } catch (err) {
    errors.push(`site.webmanifest is not valid JSON — ${err.message}`)
  }
  if (manifest.theme_color?.toLowerCase() !== THEME_COLOR.toLowerCase())
    errors.push(`site.webmanifest theme_color is ${manifest.theme_color}, expected ${THEME_COLOR}`)
  if (manifest.background_color?.toLowerCase() !== BACKGROUND_COLOR.toLowerCase())
    errors.push(
      `site.webmanifest background_color is ${manifest.background_color}, expected ${BACKGROUND_COLOR}`,
    )

  // ── Every built page ────────────────────────────────────────────────────
  //
  // Every page, not a sample. Sampling three was the first instinct — they all
  // come from one template, so drift "must" hit them equally — but the negative
  // test kills that argument: tamper with a page outside the sample and it
  // passes clean. Reading 140 small files costs milliseconds, and a check that
  // can miss is worse than no check, because it is believed.
  const files = await htmlFiles(DIST)
  for (const file of files) {
    const name = file.slice(DIST.length + 1).replace(/\\/g, '/')
    const raw = await readFile(file, 'utf8')

    // Strip comments first. index.html carries a comment naming every banned
    // typeface as documentation, and the first run of this audit dutifully
    // reported all five of them on all 136 pages — 685 failures, none real. An
    // audit that cries wolf is worse than no audit, because the next genuine
    // failure gets waved through as more of the same noise.
    const html = stripDataUris(raw.replace(/<!--[\s\S]*?-->/g, ''))

    for (const hex of html.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []) {
      if (!palette.has(hex.toLowerCase()) && !ALLOWED_EXTRA.has(hex.toLowerCase()))
        errors.push(`${name} uses ${hex}, which is not in the brand palette`)
    }

    const themeMeta = html.match(/<meta name="theme-color" content="([^"]+)"/)?.[1]
    if (themeMeta && themeMeta.toLowerCase() !== THEME_COLOR.toLowerCase())
      errors.push(`${name}: theme-color is ${themeMeta}, expected ${THEME_COLOR}`)

    for (const font of REQUIRED_FONTS) {
      if (!html.includes(font)) errors.push(`${name} does not load the ${font.replace(/\+/g, ' ')} typeface`)
    }
    for (const banned of BANNED_FONTS) {
      if (html.includes(banned))
        errors.push(`${name} references "${banned.replace(/[+:]/g, ' ').trim()}" — banned by DESIGN.md § Typography`)
    }
  }

  if (errors.length) {
    console.error(`\n✗ brand-audit: ${errors.length} problem(s):`)
    ;[...new Set(errors)].slice(0, 25).forEach((e) => console.error(`   ${e}`))
    console.error('')
    process.exit(1)
  }
  console.log(`✓ brand-audit passed — palette, icons, manifest and type stack agree across ${files.length} pages`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
