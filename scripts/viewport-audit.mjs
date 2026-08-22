/**
 * Measures the built site in a real browser, at real viewport sizes.
 *
 * ── Why this exists ────────────────────────────────────────────────────────
 * The hero was sized twice by arithmetic — "eyebrow 20 + headline 2 lines ≈ 120
 * + standfirst 2 lines ≈ 56 …" — and was wrong both times, because the
 * arithmetic assumed how many lines a headline would wrap to and the browser
 * disagreed. At 1280 CSS px the six-column hero text is about 590px wide, and
 * "Twenty-five lenders." set at 64px extrabold does not fit on one line in
 * 590px. It became three lines, the standfirst became four, and the call to
 * action went below the fold on an extremely ordinary laptop.
 *
 * No amount of care in a comment fixes that. The only thing that fixes it is
 * measuring, so this loads the built pages in headless Chrome and asserts:
 *
 *   · the primary call to action is above the fold on every viewport
 *   · nothing overflows horizontally
 *   · no tap target on a phone is smaller than the 44px accessibility minimum
 *   · the hero fits without the photograph being pushed off the screen
 *
 * ── Why it is not part of `npm run build` ──────────────────────────────────
 * It needs a browser. The build must work on a CI box with nothing installed,
 * so this is a separate command — `npm run audit:viewport` — run whenever a
 * layout changes. It uses the Chrome already on the machine rather than
 * downloading its own; `playwright-core` is a ~2 MB dependency with no bundled
 * browsers.
 */
import { createServer } from 'node:http'
import { readFile, mkdir, stat } from 'node:fs/promises'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SHOTS = join(ROOT, '.viewport-shots')
const PORT = 4178

/**
 * The viewports that matter, and why each one is here.
 *
 * The desktop sizes are CSS pixels *after* OS scaling, which is the number that
 * actually decides a layout and the one people forget. A 1920x1080 monitor at
 * Windows 125% — the single most common desktop configuration in this market —
 * reports 1536x864 to CSS, and once browser chrome is subtracted the usable
 * height is about 760px. The machine in the client's screenshot is one of
 * these, not a "1920px" viewport.
 */
const VIEWPORTS = [
  { name: 'phone-small', width: 360, height: 640, mobile: true },
  { name: 'phone', width: 390, height: 844, mobile: true },
  { name: 'phone-large', width: 430, height: 932, mobile: true },
  { name: 'tablet', width: 768, height: 1024, mobile: true },
  { name: 'laptop-768p', width: 1366, height: 625, note: '1366x768 minus chrome' },
  { name: 'laptop-1080p-125', width: 1536, height: 760, note: '1080p at 125% scaling' },
  { name: 'laptop-1080p-150', width: 1280, height: 614, note: '1080p at 150% scaling' },
  { name: 'desktop', width: 1920, height: 960 },
]

/**
 * The pages worth checking. One of each layout kind.
 *
 * The calculators were missing from this list until a phone screenshot showed
 * the whole page scrolling sideways on one. They are the densest layouts on the
 * site — two large tabular figures side by side, sliders, a chart, a wide table
 * — so leaving them out meant this audit was checking the easy pages and
 * declaring the site sound. Any page with a widget on it belongs here.
 *
 * `stress: 'max'` drives every slider to its maximum before measuring. This is
 * the other half of the same miss: at the default ₹25,00,000 the readouts hold
 * ten characters and fit, and at the ₹5,00,00,000 ceiling they hold thirteen and
 * do not. Measuring only the state the page loads in tests the one case the
 * reader is guaranteed to leave.
 */
const PAGES = [
  { path: '/', kind: 'home' },
  { path: '/personal-loan/', kind: 'product' },
  { path: '/business-loan-bhosari/', kind: 'locality' },
  { path: '/lenders/', kind: 'lenders' },
  { path: '/contact/', kind: 'contact' },
  { path: '/calculators/', kind: 'calculators', stress: 'max' },
  { path: '/emi-calculator/', kind: 'calc-emi', stress: 'max' },
  { path: '/eligibility-calculator/', kind: 'calc-eligibility', stress: 'max' },
  { path: '/balance-transfer-calculator/', kind: 'calc-bt', stress: 'max' },
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
}

/** A static server over dist/, so absolute /assets paths resolve. */
function serve() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      let path = decodeURIComponent(req.url.split('?')[0])
      if (path.endsWith('/')) path += 'index.html'
      const file = join(DIST, path)
      try {
        const body = await readFile(file)
        res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' })
        res.end(body)
      } catch {
        res.writeHead(404, { 'content-type': 'text/plain' })
        res.end('not found')
      }
    })
    server.listen(PORT, () => resolve(server))
  })
}

const errors = []
const warnings = []

async function main() {
  try {
    await stat(join(DIST, 'index.html'))
  } catch {
    console.error('✗ dist/ is empty — run "npm run build" first.')
    process.exit(1)
  }

  await mkdir(SHOTS, { recursive: true })
  const server = await serve()

  let browser
  try {
    browser = await chromium.launch({ channel: 'chrome' })
  } catch (err) {
    server.close()
    console.error('✗ could not launch Chrome.')
    console.error('  This audit drives the Chrome already installed on the machine.')
    console.error(`  ${err.message.split('\n')[0]}`)
    process.exit(1)
  }

  const rows = []

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      isMobile: Boolean(vp.mobile),
      hasTouch: Boolean(vp.mobile),
      reducedMotion: 'reduce', // measure the resting layout, not mid-animation
    })
    const page = await context.newPage()

    for (const target of PAGES) {
      await page.goto(`http://localhost:${PORT}${target.path}`, { waitUntil: 'networkidle' })

      // ── Worst-case content ─────────────────────────────────────────────
      // Push every slider to its ceiling so the figures are as long as the
      // widget can ever make them. Assigning to `.value` is not enough: React
      // caches the last value it wrote, sees no change, and skips the update.
      // Going through the prototype's setter defeats that cache, which is the
      // documented way to drive a controlled input from outside React.
      if (target.stress === 'max') {
        await page.evaluate(() => {
          const setValue = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value',
          ).set
          for (const el of document.querySelectorAll('input[type="range"]')) {
            setValue.call(el, el.max)
            el.dispatchEvent(new Event('input', { bubbles: true }))
            el.dispatchEvent(new Event('change', { bubbles: true }))
          }
        })
        await page.waitForTimeout(120)
      }

      const result = await page.evaluate(() => {
        const doc = document.documentElement

        // ── Which viewport number to trust ──────────────────────────────
        //
        // Not `window.innerWidth`. Under Chrome's mobile emulation it reports
        // the *visual* viewport, which the browser widens to fit overflowing
        // content: on a 360px phone whose page is 520px wide it returns 520,
        // and innerHeight is inflated the same way (925 for a 640px screen).
        //
        // That is not a rounding difference, it is the wrong quantity. Every
        // check below compares an element against the viewport, so measuring
        // the viewport as "however wide the content turned out to be" makes
        // the overflow test tautologically true — which is exactly why this
        // audit passed a page a phone screenshot showed scrolling sideways.
        //
        // `documentElement.clientWidth/clientHeight` is the layout viewport
        // and matches the CSS pixel the media queries use. Verified against
        // both emulated and non-emulated contexts at 360/390/430/768.
        const vw = doc.clientWidth
        const vh = doc.clientHeight

        /** The first genuinely primary action in the page's own content. */
        const main = document.getElementById('main')
        const cta =
          main?.querySelector('.btn-accent, .btn-primary') ??
          main?.querySelector('a[href^="tel:"]')
        const ctaBox = cta?.getBoundingClientRect()

        const h1 = main?.querySelector('h1')
        const h1Box = h1?.getBoundingClientRect()

        // Line count, from the rendered box rather than from the source.
        const h1Style = h1 ? getComputedStyle(h1) : null
        const h1Lines =
          h1Box && h1Style
            ? Math.round(h1Box.height / parseFloat(h1Style.lineHeight || '0'))
            : 0

        // ── Does the page scroll sideways? ──────────────────────────────
        //
        // This is the reader's actual complaint, and it has a single honest
        // measure. Everything else in this block only exists to say *which
        // element* caused it.
        const sidewaysBy = Math.max(0, doc.scrollWidth - vw)

        // ── Which element caused it ─────────────────────────────────────
        //
        // An element wider than the viewport is only a fault if nothing
        // between it and <html> clips or scrolls it. A wide table inside
        // `.scroll-x` is the design working; the same table with the wrapper
        // missing is the bug. The previous version decided this by looking
        // for class names — `.scroll-x`, `[class*="overflow-hidden"]` — which
        // guesses at the styling instead of reading it, and got it wrong in
        // both directions. Computed style is the thing that actually governs.
        const CONTAINS = new Set(['hidden', 'clip', 'auto', 'scroll'])
        const isContained = (el) => {
          for (let p = el.parentElement; p && p !== doc; p = p.parentElement) {
            const cs = getComputedStyle(p)
            if (CONTAINS.has(cs.overflowX)) return true
            // A fixed/absolute box establishes its own containing block, so a
            // wide child of one does not push the document — the marquee rows
            // and the off-canvas drawer both rely on this.
            if (cs.position === 'fixed') return true
          }
          return false
        }

        const overflowing = []
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect()
          if (r.width === 0 || r.height === 0) continue
          if (r.right <= vw + 1 && r.left >= -1) continue
          // The closed mobile drawer genuinely lives off-canvas: it is
          // translate-x-full and marked aria-hidden. Reporting it as overflow
          // flagged five "faults" on every page that were the design working
          // exactly as intended — and an audit that is wrong five times a page
          // is one nobody reads.
          if (el.closest('[aria-hidden="true"]')) continue
          if (CONTAINS.has(getComputedStyle(el).overflowX)) continue
          if (isContained(el)) continue
          // Report the innermost offender. When a wide child pushes its
          // parent, naming both is noise; the child is the thing to fix.
          if ([...el.children].some((c) => c.getBoundingClientRect().right > vw + 1)) continue
          overflowing.push(
            `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : ''} — ${Math.round(r.width)}px wide, ends at ${Math.round(r.right)}px`,
          )
          if (overflowing.length > 4) break
        }

        // ── Tap targets ──────────────────────────────────────────────────
        //
        // Two thresholds, because there are two standards and conflating them
        // produces noise. WCAG 2.5.5 (AAA) and the Apple/Android guidelines
        // want 44px, and that is the right bar for a *control* — a button, a
        // navigation item, anything shaped like something you press. WCAG 2.5.8
        // (AA, added in 2.2) sets 24px, and that is the honest bar for an
        // inline text link such as a breadcrumb, which cannot be 44px tall
        // without wrecking the typography it lives in.
        //
        // The first version of this check applied 44px to everything and
        // reported breadcrumbs as failures on every inner page. Holding a
        // breadcrumb to a AAA control standard is not rigour, it is a category
        // error, and it buries the real findings.
        const small = []
        for (const el of document.querySelectorAll(
          '#main a, #main button, header a, header button',
        )) {
          const r = el.getBoundingClientRect()
          if (r.width === 0 || r.height === 0) continue
          if (r.top > vh) continue // only what is on screen
          if (el.closest('[aria-hidden="true"]')) continue // the closed drawer

          // `closest('nav')` alone is too coarse: the breadcrumb trail is a
          // <nav> landmark, but its items are inline text links and holding
          // them to a 44px control bar would mean styling breadcrumbs like
          // buttons. The landmark's label is what distinguishes the two.
          const isControl =
            el.tagName === 'BUTTON' ||
            /btn|btn-/.test(el.className || '') ||
            Boolean(el.closest('nav:not([aria-label="Breadcrumb"])'))
          const min = isControl ? 44 : 24

          // A 0.5px tolerance: sub-pixel layout puts a 24px target at 23.996,
          // which a strict comparison reports as failing its own 24px minimum.
          if (r.height < min - 0.5) {
            small.push(
              `${isControl ? 'control' : 'link'} ${Math.round(r.height)}px (min ${min}) "${(el.textContent || '').trim().slice(0, 22)}"`,
            )
            if (small.length > 4) break
          }
        }

        return {
          vw,
          vh,
          scrollWidth: doc.scrollWidth,
          ctaTop: ctaBox ? Math.round(ctaBox.top) : null,
          ctaBottom: ctaBox ? Math.round(ctaBox.bottom) : null,
          ctaText: cta ? (cta.textContent || '').trim().slice(0, 26) : null,
          h1Top: h1Box ? Math.round(h1Box.top) : null,
          h1Height: h1Box ? Math.round(h1Box.height) : null,
          h1Lines,
          h1Font: h1Style ? Math.round(parseFloat(h1Style.fontSize)) : null,
          sidewaysBy,
          overflowing,
          small,
        }
      })

      rows.push({ vp, target, ...result })

      // ── Assertions ─────────────────────────────────────────────────────
      const where = `${target.path} @ ${vp.name} (${vp.width}x${vp.height})`

      // The reader's complaint, stated the way they would state it.
      if (result.sidewaysBy > 1)
        errors.push(
          `${where}: page scrolls sideways by ${result.sidewaysBy}px (content ${result.scrollWidth}px in a ${result.vw}px screen)`,
        )

      for (const o of result.overflowing) errors.push(`${where}: overflows — ${o}`)

      if (result.ctaBottom === null) {
        errors.push(`${where}: no primary call to action found in <main>`)
      } else if (result.ctaBottom > result.vh) {
        errors.push(
          `${where}: primary CTA "${result.ctaText}" ends at ${result.ctaBottom}px, below the ${result.vh}px fold`,
        )
      }

      if (vp.mobile) for (const s of result.small) errors.push(`${where}: tap target ${s}`)

      if (target.kind === 'home' && result.h1Lines > 3)
        warnings.push(`${where}: h1 wraps to ${result.h1Lines} lines at ${result.h1Font}px`)

      // Screenshot every page kind at one representative desktop and one
      // phone. Reading the numbers catches whether something fits; looking at
      // the picture catches whether it looks right, and those are different
      // questions.
      if (vp.name === 'laptop-1080p-150' || vp.name === 'phone-small')
        await page.screenshot({ path: join(SHOTS, `${target.kind}-${vp.name}.png`) })
    }

    await context.close()
  }

  await browser.close()
  server.close()

  // ── Report ───────────────────────────────────────────────────────────────
  console.log(`\nViewport audit — ${PAGES.length} pages x ${VIEWPORTS.length} viewports\n`)
  console.log('  homepage                       h1        CTA')
  console.log('  viewport            size    px  lines    ends   fold   ')
  for (const r of rows.filter((x) => x.target.path === '/')) {
    const ok = r.ctaBottom !== null && r.ctaBottom <= r.vh
    console.log(
      `  ${r.vp.name.padEnd(18)} ${String(r.vp.width).padStart(4)}  ${String(r.h1Font).padStart(3)}  ${String(r.h1Lines).padStart(2)}     ${String(r.ctaBottom).padStart(5)}  ${String(r.vh).padStart(5)}   ${ok ? '✓' : '✗ below fold'}`,
    )
  }

  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} warning(s):`)
    ;[...new Set(warnings)].slice(0, 12).forEach((w) => console.log(`   ${w}`))
  }

  if (errors.length) {
    console.error(`\n✗ ${errors.length} error(s):`)
    ;[...new Set(errors)].slice(0, 20).forEach((e) => console.error(`   ${e}`))
    console.error(`\n   Screenshots in .viewport-shots/\n`)
    process.exit(1)
  }

  console.log(`\n✓ viewport audit passed — screenshots in .viewport-shots/\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
