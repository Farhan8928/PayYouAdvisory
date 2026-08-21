/**
 * Post-build SEO and integrity gate. Runs last in `npm run build`.
 *
 * Every check here corresponds to a mistake that looks completely fine in a
 * browser and quietly costs rankings or trust for months — a canonical pointing
 * at the wrong page, two of the 140 pages sharing a title, a JSON-LD block that
 * stopped parsing after an apostrophe crept in, an internal link to a route
 * that was renamed, a phone number that drifted out of step with
 * src/data/site.js.
 *
 * The build fails on an error and prints warnings without failing. A check that
 * only warns is a check nobody acts on, so anything genuinely damaging is an
 * error.
 */
import { readdir, readFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL, CONTACT, COMPANY } from '../src/data/site.js'
import { ROUTES, ROUTE_BY_PATH, LEGACY_REDIRECTS } from '../src/routes.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

const errors = []
const warnings = []
const fail = (m) => errors.push(m)
const warn = (m) => warnings.push(m)

async function htmlFiles(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await htmlFiles(full, acc)
    else if (entry.name.endsWith('.html')) acc.push(full)
  }
  return acc
}

/**
 * Decode the handful of entities the prerenderer writes, before measuring a
 * length.
 *
 * Without this the audit measures `&amp;` as five characters and reports a
 * 60-character title as 64 — so "Loan Advisory in Pune & PCMC" gets flagged as
 * too long when it is not. A search result shows the ampersand, not the entity,
 * and the check has to measure what the searcher sees or it is worse than
 * useless: it produces work that makes the titles genuinely worse.
 */
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

/** dist/personal-loan/index.html → /personal-loan/ */
const urlPathOf = (file) => {
  const rel = file.slice(DIST.length + 1).replace(/\\/g, '/')
  if (rel === 'index.html') return '/'
  return `/${rel.replace(/index\.html$/, '')}`
}

async function main() {
  const files = await htmlFiles(DIST)
  const titles = new Map()
  const descriptions = new Map()
  const internalLinks = new Map()

  if (files.length < ROUTES.length) {
    fail(`only ${files.length} HTML pages in dist — the route table lists ${ROUTES.length}`)
  }

  for (const file of files) {
    const raw = await readFile(file, 'utf8')
    const name = file.slice(DIST.length + 1).replace(/\\/g, '/')
    const path = urlPathOf(file)
    const isErrorPage = name === '404.html'

    // Strip comments before any content check. Without this, an explanatory
    // comment that merely mentions a tag gets counted as that tag, and the
    // audit reports failures that are not there — which is worse than no audit,
    // because the next real failure gets ignored as noise.
    const html = raw.replace(/<!--[\s\S]*?-->/g, '')

    // ── Language ───────────────────────────────────────────────────────────
    if (!/<html[^>]+lang="en-IN"/.test(html)) fail(`${name}: <html> is missing lang="en-IN"`)

    // ── Every logo is a link home ──────────────────────────────────────────
    // The logo renders three times per page — the bar, the mobile drawer, the
    // footer — and tapping it is how people get home, especially on a phone
    // where the drawer covers the bar and the drawer's logo is the only one on
    // screen. Two of the three shipped as bare artwork and did nothing when
    // tapped; nothing else here caught it, because a missing link is not a
    // broken link. So: count the logo images, count the ones wrapped in an
    // anchor to `/`, and require the two to agree.
    const logoImgs = html.match(/<img[^>]+src="\/brand\/payyou-logo\.png"/gi) ?? []
    const linkedLogos =
      html.match(
        /<a[^>]+href="\/"[^>]*>(?:(?!<\/a>)[\s\S]){0,200}?<img[^>]+src="\/brand\/payyou-logo\.png"/gi,
      ) ?? []
    if (logoImgs.length !== linkedLogos.length) {
      fail(
        `${name}: ${logoImgs.length - linkedLogos.length} of ${logoImgs.length} logo images are not wrapped in a link to "/" — tapping them does nothing`,
      )
    }

    // ── Title ──────────────────────────────────────────────────────────────
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '')
    if (!title) {
      fail(`${name}: no <title>`)
    } else {
      if (title.length > 65) warn(`${name}: title is ${title.length} chars — "${title}"`)
      if (!isErrorPage) {
        // Duplicate titles across 140 pages are the classic failure of a
        // programmatic page grid — and the exact symptom of the per-page head
        // substitution silently no-opping.
        if (titles.has(title)) fail(`duplicate <title> on ${path} and ${titles.get(title)}: "${title}"`)
        else titles.set(title, path)
      }
    }

    // ── Description ────────────────────────────────────────────────────────
    const descRaw = html.match(/<meta name="description" content="([^"]*)"/)?.[1]
    const desc = descRaw === undefined ? undefined : decode(descRaw)
    if (!desc) {
      fail(`${name}: no meta description`)
    } else {
      if (desc.length > 165) warn(`${name}: meta description is ${desc.length} chars (~160 shown)`)
      if (desc.length < 60) warn(`${name}: meta description is only ${desc.length} chars`)
      if (!isErrorPage) {
        if (descriptions.has(desc))
          fail(`duplicate meta description on ${path} and ${descriptions.get(desc)}`)
        else descriptions.set(desc, path)
      }
    }

    // ── Canonical must point at this page ──────────────────────────────────
    if (!isErrorPage) {
      const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
      if (!canonical) fail(`${name}: no canonical link`)
      else if (canonical !== `${SITE_URL}${path}`)
        fail(`${name}: canonical is "${canonical}", expected "${SITE_URL}${path}"`)
    } else if (!/name="robots" content="noindex/.test(html)) {
      fail('404.html is not marked noindex')
    }

    // ── Exactly one h1 ─────────────────────────────────────────────────────
    const h1s = html.match(/<h1[\s>]/g)?.length ?? 0
    if (h1s !== 1) fail(`${name}: ${h1s} <h1> tags (must be exactly 1)`)

    // ── Prerender actually ran ─────────────────────────────────────────────
    if (/<div id="root"><\/div>/.test(html)) fail(`${name}: shipped an empty #root — not prerendered`)

    // ── Images ─────────────────────────────────────────────────────────────
    for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
      if (!/\balt=/.test(tag)) fail(`${name}: <img> without alt — ${tag.slice(0, 90)}`)
      if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag))
        warn(`${name}: <img> without width/height (causes layout shift)`)
    }

    // ── Structured data ────────────────────────────────────────────────────
    const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? []
    if (!isErrorPage && blocks.length === 0) fail(`${name}: no JSON-LD structured data`)
    for (const block of blocks) {
      const json = block.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '')
      try {
        const parsed = JSON.parse(json)
        // A rating the business has not earned is a structured-data violation
        // that can attract a manual action. See RATING in src/data/site.js.
        if (JSON.stringify(parsed).includes('aggregateRating'))
          warn(`${name}: JSON-LD contains aggregateRating — publish only a real, verifiable rating`)
        // A JobPosting without a real vacancy gets a site removed from Google
        // Jobs entirely. See the note in src/pages/Careers.jsx.
        if (JSON.stringify(parsed).includes('"JobPosting"'))
          fail(`${name}: JSON-LD contains JobPosting — only mark up a genuine, dated vacancy`)
      } catch (e) {
        fail(`${name}: JSON-LD does not parse — ${e.message}`)
      }
    }

    // ── NAP consistency ────────────────────────────────────────────────────
    // Google cross-checks these against the Business Profile and every
    // directory listing; a drift between the site and src/data/site.js is
    // invisible on the page and quietly costs local ranking.
    if (!isErrorPage) {
      if (!html.includes(CONTACT.landlineDisplay))
        fail(`${name}: landline ${CONTACT.landlineDisplay} missing from the page`)
      if (!html.includes('411033')) warn(`${name}: corporate postal code 411033 not present`)
    }

    // ── The disclosure must be on every page ───────────────────────────────
    // PayYou is a DSA, not a lender. If that ever stops rendering it is a
    // compliance problem, not a design one — so it is an error, not a warning.
    if (!isErrorPage && !/is a loan referral and advisory firm/.test(html))
      fail(`${name}: the "not a lender" disclosure is missing`)

    // ── Collect internal links for the graph check below ───────────────────
    for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      const target = m[1]
      if (!internalLinks.has(target)) internalLinks.set(target, new Set())
      internalLinks.get(target).add(path)
    }

    // ── Common own-goals ───────────────────────────────────────────────────
    // XML namespace URIs are identifiers, not links — inline SVG carries
    // `xmlns="http://www.w3.org/2000/svg"` and must not trip the http check.
    const links = html.replace(/xmlns(:\w+)?="[^"]*"/g, '')
    if (/\bhttp:\/\/(?!localhost)/.test(links)) warn(`${name}: contains a plain http:// link`)
    if (/target="_blank"(?![^>]*rel=)/.test(html))
      fail(`${name}: target="_blank" without rel="noopener" — a tab-nabbing vector`)
    if (/lorem ipsum/i.test(html)) fail(`${name}: placeholder text left in the page`)
    if (/\bPLACEHOLDER\b|\bTODO\b|\bFIXME\b/.test(html))
      fail(`${name}: renders TODO/PLACEHOLDER text to the reader`)
    if (/\bundefined\b|\bNaN\b|\[object Object\]/.test(html))
      fail(`${name}: renders "undefined", "NaN" or "[object Object]"`)
  }

  // ── Internal link graph ──────────────────────────────────────────────────
  // With ~140 pages cross-linking each other, a renamed slug leaves broken
  // links nobody clicks for six months. Every internal href must resolve to a
  // route or to a real file in dist.
  for (const [target, sources] of internalLinks) {
    if (ROUTE_BY_PATH[target]) continue
    try {
      await stat(join(DIST, target.replace(/^\//, '')))
      continue
    } catch {
      /* not a static file either */
    }
    fail(
      `broken internal link to ${target} — from ${[...sources].slice(0, 3).join(', ')}${sources.size > 3 ? ` and ${sources.size - 3} more` : ''}`,
    )
  }

  // ── Orphan check ─────────────────────────────────────────────────────────
  // A page nothing links to is a page Google will struggle to find, whatever
  // the sitemap says.
  for (const route of ROUTES) {
    if (route.path === '/') continue
    if (!internalLinks.has(route.path)) warn(`${route.path} is an orphan — nothing links to it`)
  }

  // ── Required files ───────────────────────────────────────────────────────
  for (const required of [
    'sitemap.xml',
    'robots.txt',
    'llms.txt',
    'site.webmanifest',
    'og-image.jpg',
    'favicon.svg',
    '404.html',
    'icon-192.png',
    'icon-512.png',
    'apple-touch-icon.png',
  ]) {
    try {
      await stat(join(DIST, required))
    } catch {
      fail(`missing required file: dist/${required}`)
    }
  }

  // ── robots + sitemap agree with the canonical host ───────────────────────
  const robots = await readFile(join(DIST, 'robots.txt'), 'utf8').catch(() => '')
  if (robots && !robots.includes(`${SITE_URL}/sitemap.xml`))
    fail(`robots.txt does not point at ${SITE_URL}/sitemap.xml`)

  const sitemap = await readFile(join(DIST, 'sitemap.xml'), 'utf8').catch(() => '')
  const locs = (sitemap.match(/<loc>([^<]+)<\/loc>/g) ?? []).map((l) => l.replace(/<\/?loc>/g, ''))
  if (locs.length !== ROUTES.length)
    fail(`sitemap lists ${locs.length} URLs but the route table has ${ROUTES.length}`)
  for (const loc of locs) {
    if (!loc.startsWith(SITE_URL)) {
      fail(`sitemap contains a URL on a different host: ${loc}`)
      continue
    }
    const path = loc.slice(SITE_URL.length)
    const target = join(DIST, path === '/' ? 'index.html' : join(path, 'index.html'))
    try {
      await stat(target)
    } catch {
      fail(`sitemap lists ${loc} but dist has no such page`)
    }
  }

  // ── Legacy redirects are actually configured ─────────────────────────────
  // Every one of these URLs is in Google's index from the previous site. A 301
  // passes the accumulated authority on; a 404 throws it away, and the loss is
  // completely invisible until traffic does not arrive.
  const vercel = await readFile(join(ROOT, 'vercel.json'), 'utf8').catch(() => '')
  for (const r of LEGACY_REDIRECTS) {
    if (!vercel.includes(`"${r.from}"`))
      fail(`vercel.json has no redirect for the old URL ${r.from} → ${r.to}`)
    if (!ROUTE_BY_PATH[r.to]) fail(`legacy redirect ${r.from} points at ${r.to}, which is not a route`)
  }

  // ── vercel.json actually matches Vercel's schema ────────────────────────
  //
  // Vercel validates this file at deploy time and rejects any property it does
  // not recognise. A `"//": "…"` key added as a pseudo-comment — JSON has no
  // real ones — failed a production deploy with
  // `redirects[0] should NOT have additional property //`.
  //
  // The build had no opinion about it, because nothing here had ever read the
  // file's shape. A config error that only surfaces on the deploy is the worst
  // place to find one: the site is already broken and the feedback loop is
  // minutes long instead of seconds.
  //
  // Put explanatory notes in README.md, never in this file.
  const ALLOWED = {
    redirects: ['source', 'destination', 'permanent', 'statusCode', 'has', 'missing'],
    rewrites: ['source', 'destination', 'has', 'missing'],
    headers: ['source', 'headers', 'has', 'missing'],
    cleanUrls: null,
    trailingSlash: null,
    buildCommand: null,
    outputDirectory: null,
    framework: null,
    installCommand: null,
    devCommand: null,
    regions: null,
    redirectsOrder: null,
    $schema: null,
  }

  try {
    const config = JSON.parse(vercel.replace(/^﻿/, ''))

    for (const key of Object.keys(config)) {
      if (!(key in ALLOWED)) warn(`vercel.json: unrecognised top-level key "${key}"`)
    }

    for (const [section, keys] of Object.entries(ALLOWED)) {
      if (!keys || !Array.isArray(config[section])) continue
      config[section].forEach((entry, i) => {
        for (const key of Object.keys(entry)) {
          if (!keys.includes(key))
            fail(
              `vercel.json: ${section}[${i}] has property "${key}", which Vercel rejects at deploy. ` +
                `Allowed: ${keys.join(', ')}. JSON has no comments — put the note in README.md.`,
            )
        }
      })
    }
  } catch (err) {
    fail(`vercel.json is not valid JSON — ${err.message}`)
  }

  // ── Report ───────────────────────────────────────────────────────────────
  console.log(
    `\nSEO audit — ${files.length} pages, ${locs.length} sitemap URLs, ${internalLinks.size} distinct internal targets`,
  )

  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} warning(s):`)
    // Warnings repeat across near-identical pages; show one of each kind.
    const shown = [...new Set(warnings.map((w) => w.replace(/^[^:]+:/, '…:')))].slice(0, 14)
    shown.forEach((w) => console.log(`   ${w}`))
    if (warnings.length > shown.length)
      console.log(`   …and ${warnings.length - shown.length} more of the same kinds`)
  }

  if (errors.length) {
    console.error(`\n✗ ${errors.length} error(s):`)
    ;[...new Set(errors)].slice(0, 30).forEach((e) => console.error(`   ${e}`))
    console.error('')
    process.exit(1)
  }

  console.log(`\n✓ SEO audit passed — ${COMPANY.shortName}, ${files.length} pages\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
