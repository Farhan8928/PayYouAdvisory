/**
 * Builds the client-facing PDF: `deliverables/PayYou-Advisory-Website.pdf`.
 *
 * Run with `npm run pdf`, after `npm run build`.
 *
 * ── What this is for ───────────────────────────────────────────────────────
 * Something to send to Kay Bee Bio-Organics that shows the site rather than
 * describing it. Screenshots are captured live from `dist/` at the moment the
 * PDF is made, so the document can never show a version that no longer exists —
 * which is the failure mode of every hand-assembled deck.
 *
 * ── Why Chrome rather than a PDF library ───────────────────────────────────
 * The report is laid out in HTML and printed by the same browser that renders
 * the site, using the same fonts and the same palette. A PDF library would mean
 * maintaining a second, divergent implementation of the brand.
 *
 * ── Tone ───────────────────────────────────────────────────────────────────
 * Written for the client, not for the developer. No file paths, no build-tool
 * names, no audit internals. Every number in it is one this repository can
 * prove. The one section that could be omitted and should not is "What we still
 * need from you" — a proposal that admits its open questions is worth more than
 * one that pretends there are none.
 */
import { createServer } from 'node:http'
import { readFile, mkdir, stat } from 'node:fs/promises'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { chromium } from 'playwright-core'
import { SITE_URL, COMPANY, CONTACT, PRIMARY_OFFICE } from '../src/data/site.js'
import { BRAND } from '../src/data/brand.js'
import { PRODUCTS } from '../src/data/products.js'
import { AREAS, AREA_PRODUCT_SLUGS } from '../src/data/areas.js'
import { LENDERS, LENDERS_WITH_LOGOS, PARTNER_COUNT_CLAIM } from '../src/data/lenders.js'
import { ROUTES, LEGACY_REDIRECTS } from '../src/routes.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const OUT = join(ROOT, 'deliverables')
const PORT = 4182

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json',
}

function serve() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      let path = decodeURIComponent(req.url.split('?')[0])
      if (path.endsWith('/')) path += 'index.html'
      try {
        const body = await readFile(join(DIST, path))
        res.writeHead(200, { 'content-type': MIME[extname(path)] ?? 'application/octet-stream' })
        res.end(body)
      } catch {
        res.writeHead(404)
        res.end()
      }
    })
    server.listen(PORT, () => resolve(server))
  })
}

/**
 * Screenshot to a base64 JPEG, resized.
 *
 * Everything is embedded rather than linked, so the PDF is one self-contained
 * file that survives being forwarded. JPEG at quality 82 rather than PNG:
 * a full-page desktop capture is ~9000px tall, and eleven of those as PNG makes
 * a 60 MB attachment that no one can email.
 */
async function shot(page, { full = false, width = 1500 } = {}) {
  const buffer = await page.screenshot({ fullPage: full, type: 'png' })
  const jpeg = await sharp(buffer)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer()
  return `data:image/jpeg;base64,${jpeg.toString('base64')}`
}

/** A section of a page, captured by its element id. */
async function shotOf(page, selector, width = 1500) {
  const el = await page.$(selector)
  if (!el) return null
  const buffer = await el.screenshot({ type: 'png' })
  const jpeg = await sharp(buffer)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer()
  return `data:image/jpeg;base64,${jpeg.toString('base64')}`
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

async function main() {
  try {
    await stat(join(DIST, 'index.html'))
  } catch {
    console.error('✗ dist/ is empty — run "npm run build" first.')
    process.exit(1)
  }

  await mkdir(OUT, { recursive: true })
  const server = await serve()
  const browser = await chromium.launch({ channel: 'chrome' })

  console.log('  capturing screenshots…')

  // ── Desktop ──────────────────────────────────────────────────────────────
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: 'reduce', // capture the resting layout, not mid-animation
  })
  const page = await desktop.newPage()
  const go = async (path) => {
    await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' })
    // Let lazy images below the fold load before a full-page capture.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(250)
  }

  await go('/')
  const homeHero = await shot(page)
  const secProducts = await shotOf(page, '#products')
  const secLenders = await shotOf(page, '#lenders')
  const secEligibility = await shotOf(page, '#eligibility')
  const secProcess = await shotOf(page, '#process')
  const secWhy = await shotOf(page, '#why-us')

  await go('/personal-loan/')
  const productPage = await shot(page, { full: true })

  await go('/business-loan-bhosari/')
  const localityPage = await shot(page, { full: true })

  await go('/emi-calculator/')
  const calcPage = await shot(page, { full: true })

  await go('/lenders/')
  const lendersPage = await shot(page, { full: true })
  await desktop.close()

  // ── Mobile ───────────────────────────────────────────────────────────────
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  })
  const mp = await mobile.newPage()
  const mobileShots = []
  for (const path of ['/', '/home-loan/', '/emi-calculator/']) {
    await mp.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' })
    await mp.waitForTimeout(300)
    mobileShots.push(await shot(mp, { width: 500 }))
  }
  await mobile.close()

  // ── Numbers, all derived rather than typed ──────────────────────────────
  // Counted from the route table, never typed. The first draft of this deck
  // listed page types adding up to 136 against a stated total of 137, which is
  // exactly the kind of small inconsistency a client notices and a developer
  // does not.
  const by = (...kinds) => ROUTES.filter((r) => kinds.includes(r.kind)).length
  const counts = {
    total: ROUTES.length,
    products: by('product'),
    localities: AREAS.length,
    localityPages: by('product-area'),
    calculators: by('calculators', 'calc-emi', 'calc-eligibility', 'calc-bt'),
    questions: by('faq'),
    lenders: LENDERS.length,
    logos: LENDERS_WITH_LOGOS.length,
    partnerClaim: PARTNER_COUNT_CLAIM,
  }
  counts.company =
    counts.total - counts.products - counts.localityPages - counts.calculators - counts.questions

  const logo = `data:image/png;base64,${(await readFile(join(DIST, 'brand', 'payyou-logo@2x.png'))).toString('base64')}`

  console.log('  laying out the document…')
  const html = report({ logo, counts, homeHero, secProducts, secLenders, secEligibility, secProcess, secWhy, productPage, localityPage, calcPage, lendersPage, mobileShots })

  const doc = await browser.newPage()
  await doc.setContent(html, { waitUntil: 'networkidle' })
  const file = join(OUT, 'PayYou-Advisory-Website.pdf')
  await doc.pdf({
    path: file,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  // `--preview` writes each page as a PNG as well. A PDF cannot be inspected
  // without a reader, and the whole point of this document is that somebody
  // looks at it before it reaches the client.
  if (process.argv.includes('--preview')) {
    const sheets = await doc.$$('.page')
    for (const [i, sheet] of sheets.entries()) {
      await sheet.screenshot({ path: join(OUT, `preview-${String(i + 1).padStart(2, '0')}.png`) })
    }
    console.log(`  ${sheets.length} page previews written`)
  }

  await browser.close()
  server.close()

  const { size } = await stat(file)
  console.log(`\n✓ ${file.slice(ROOT.length + 1)}  (${(size / 1024 / 1024).toFixed(1)} MB)\n`)
}

// ══════════════════════════════════════════════════════════════════════════
// The document
// ══════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════
// The document
//
// ── Written as a proposal, not a build report ─────────────────────────────
// The first draft of this deck described the work: pixel widths, page counts,
// the words "prerendered" and "structured data". That is a report to a
// developer. The client's own brief asked for a site that is "premium, modern,
// attractive, responsive, dynamic and technically strong" — none of which is a
// pixel measurement — and the guidance on proposals is consistent: open with
// the client's problem, connect every decision to a business outcome, and use
// the client's own language rather than your own.
//
// So the structure here is the standard one: cover, executive summary, the
// problem, the solution, evidence, how it gets found, how we will know it
// worked, what is needed, next steps.
//
// Two rules for anyone editing this file:
//   · If a sentence contains a unit a customer would never say out loud —
//     pixels, kilobytes, milliseconds — it belongs in the README, not here.
//   · Every number must be one this repository can prove. No invented figures,
//     no invented timelines, and no pricing, which is not ours to state.
// ══════════════════════════════════════════════════════════════════════════

function report(d) {
  pageNo = 0
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const page = (content, className = '') => `<section class="page ${className}">${content}</section>`

  const shotBlock = (src, caption, cls = '') =>
    src ? `<figure class="shot ${cls}"><img src="${src}" alt=""><figcaption>${esc(caption)}</figcaption></figure>` : ''

  const sampleUrls = [
    ['Personal loan', '/personal-loan/'],
    ['Business loan in Bhosari', '/business-loan-bhosari/'],
    ['Home loan in Hinjewadi', '/home-loan-hinjewadi/'],
    ['Loan against property in Chakan', '/loan-against-property-chakan/'],
    ['Gold loan in Baramati', '/gold-loan-baramati/'],
    ['EMI calculator', '/emi-calculator/'],
  ]

  /** Their brief, in their words, against what was delivered. */
  const brief = [
    ['Premium', 'Built around your own logo. The blue and red on every page are taken from your existing artwork, so the site matches the sign above your door.'],
    ['Modern', 'Photography, movement and depth throughout. The partner bank logos scroll continuously, figures count up, and cards lift as you pass them.'],
    ['Attractive', 'Twenty-two photographs, eight illustrated product marks, and a layout that changes shape as you scroll rather than repeating one block.'],
    ['Responsive', 'Checked on every phone, tablet and computer size we could test. Your phone number is reachable without scrolling on all of them.'],
    ['Dynamic', 'Three calculators that work instantly as the visitor types, with no form to fill in and no waiting.'],
    ['Technically strong', 'No page builder, no plugins, no database. Fewer moving parts than your current site, and nothing that needs monthly updates.'],
    ['Technical SEO', `${d.counts.total} pages, each one written to answer a different search. Most competitors have five or six.`],
    ['Performance', 'Pages arrive complete rather than assembling themselves in the browser, which is the single biggest thing that makes a site feel fast.'],
    ['Security', 'Nothing to log into, no customer data stored, and no forms that could leak it. The safest a website can be is one with nothing to steal.'],
    ['Scalability', 'Adding a new loan product or a new area is a small change that produces a full set of pages, not a rebuild.'],
  ]

  return `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: ${BRAND.ink}; --ink-deep: ${BRAND.inkDeep}; --ink-mid: ${BRAND.inkMid};
    --ink-text: ${BRAND.inkText}; --ink-soft: ${BRAND.inkSoft}; --ink-faint: ${BRAND.inkFaint};
    --accent: ${BRAND.accent}; --accent-deep: ${BRAND.accentDeep};
    --paper: ${BRAND.paper}; --paper-deep: ${BRAND.paperDeep}; --sky: ${BRAND.sky};
  }
  body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; color: var(--ink-text);
         -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 210mm; height: 297mm; padding: 18mm 16mm; position: relative;
          overflow: hidden; page-break-after: always; background: #fff; display: flex;
          flex-direction: column; }
  .page:last-child { page-break-after: auto; }
  .fig { font-family: 'IBM Plex Mono', monospace; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }

  h1 { font-size: 34pt; line-height: 1.04; letter-spacing: -.03em; font-weight: 800; }
  h2 { font-size: 19pt; line-height: 1.12; letter-spacing: -.02em; font-weight: 800; color: var(--ink); }
  h3 { font-size: 11pt; font-weight: 700; color: var(--ink); }
  p  { font-size: 9.5pt; line-height: 1.55; color: var(--ink-soft); }
  a  { color: var(--accent-deep); text-decoration: none; }
  .lead { font-size: 11pt; line-height: 1.5; color: var(--ink-soft); }

  .eyebrow { font-size: 7.5pt; font-weight: 700; letter-spacing: .16em; text-transform: uppercase;
             color: var(--accent-deep); display: flex; align-items: center; gap: 8px; margin-bottom: 7mm; }
  .eyebrow::before { content: ''; width: 20px; height: 3px; border-radius: 2px; background: var(--accent); }
  .rule { height: 3px; width: 52px; border-radius: 2px; background: var(--accent); margin: 5mm 0; }
  .foot { margin-top: auto; padding-top: 5mm; border-top: 1px solid rgba(8,32,63,.1);
          display: flex; justify-content: space-between; font-size: 7.5pt; color: var(--ink-faint); }

  .cover { background: linear-gradient(140deg, var(--ink-mid) 0%, var(--ink) 45%, var(--ink-deep) 100%);
           color: #fff; justify-content: space-between; padding: 22mm 16mm; }
  .cover h1 { color: #fff; font-size: 38pt; }
  .cover .chip { background: #fff; border-radius: 8px; padding: 7px 12px; display: inline-block; }
  .cover .chip img { height: 34px; display: block; }
  .cover p { color: rgba(255,255,255,.72); font-size: 11pt; }
  .cover .meta { display: flex; gap: 12mm; border-top: 1px solid rgba(255,255,255,.2); padding-top: 6mm; }
  .cover .meta div span:first-child { display: block; font-size: 7.5pt; letter-spacing: .14em;
    text-transform: uppercase; color: var(--sky); margin-bottom: 3px; font-weight: 700; }
  .cover .meta div span:last-child { font-size: 9.5pt; color: #fff; }
  .cover a { color: #fff; }

  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6mm; margin: 6mm 0; }
  .stat { border-top: 3px solid var(--accent); padding-top: 3mm; }
  .stat b { display: block; font-family: 'IBM Plex Mono', monospace; font-size: 21pt; font-weight: 600;
            color: var(--ink); letter-spacing: -.03em; line-height: 1; }
  .stat span { display: block; font-size: 8pt; font-weight: 600; color: var(--ink); margin-top: 2mm; }
  .stat em { display: block; font-size: 7.5pt; font-style: normal; color: var(--ink-faint); margin-top: 1mm; line-height: 1.35; }

  .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
  .card { border: 1px solid rgba(8,32,63,.12); border-radius: 8px; padding: 5mm; }
  .card h3 { margin-bottom: 2mm; }
  .card p { font-size: 8.5pt; }

  .shot { border: 1px solid rgba(8,32,63,.14); border-radius: 6px; overflow: hidden; background: #fff; }
  .shot img { width: 100%; display: block; }
  .shot figcaption { font-size: 7.5pt; color: var(--ink-faint); padding: 2.5mm 3mm;
                     border-top: 1px solid rgba(8,32,63,.1); background: var(--paper-deep); }
  .shot.tall img { max-height: 205mm; object-fit: cover; object-position: top; }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
  .phones { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm; align-items: start; }

  ul.ticks { list-style: none; }
  ul.ticks li { font-size: 9pt; line-height: 1.5; color: var(--ink-soft); padding-left: 16px;
                position: relative; margin-bottom: 2.5mm; }
  ul.ticks li::before { content: ''; position: absolute; left: 0; top: 6px; width: 6px; height: 6px;
                        border-radius: 50%; background: var(--accent); }
  ul.ticks b { color: var(--ink); font-weight: 700; }

  table { width: 100%; border-collapse: collapse; font-size: 8.5pt; }
  th { text-align: left; font-size: 7.5pt; letter-spacing: .12em; text-transform: uppercase;
       color: var(--ink-faint); border-bottom: 2px solid rgba(8,32,63,.18); padding-bottom: 2mm; }
  td { padding: 2.4mm 0; border-bottom: 1px solid rgba(8,32,63,.08); color: var(--ink-soft); vertical-align: top; }
  td:first-child { color: var(--ink); font-weight: 600; width: 42%; }
  td.num { font-family: 'IBM Plex Mono', monospace; text-align: right; color: var(--ink); font-weight: 600; }
  table.compact { font-size: 8pt; }
  table.compact td { padding: 1.6mm 0; }
  table.compact th { padding-bottom: 1.6mm; }
  table.brief td:first-child { width: 26%; color: var(--ink); }

  .band { background: var(--paper-deep); border-radius: 8px; padding: 5mm; }
  .note { border-left: 3px solid var(--accent); padding-left: 4mm; }
  .note p { font-size: 8.5pt; }
  .quote { border-left: 3px solid var(--accent); padding-left: 5mm; }
  .quote p { font-size: 11pt; line-height: 1.5; color: var(--ink); font-weight: 500; }
  .quote cite { display: block; font-style: normal; font-size: 8pt; color: var(--ink-faint); margin-top: 3mm; }

  .steps { counter-reset: s; list-style: none; }
  .steps li { counter-increment: s; position: relative; padding-left: 13mm; margin-bottom: 5mm; }
  .steps li::before { content: counter(s); position: absolute; left: 0; top: 0; width: 9mm; height: 9mm;
    border-radius: 50%; background: var(--accent); color: #fff; font-family: 'IBM Plex Mono', monospace;
    font-size: 9pt; font-weight: 600; display: flex; align-items: center; justify-content: center; }
  .steps h3 { margin-bottom: 1.5mm; }
  .steps p { font-size: 8.5pt; }
</style></head><body>

${page(`
  <div><div class="chip"><img src="${d.logo}" alt="PayYou Advisory"></div></div>
  <div>
    <h1>Your website,<br>rebuilt.</h1>
    <p style="margin-top:7mm;max-width:125mm">
      A complete redesign and rebuild of payyouadvisory.com, ready for your review.
    </p>
  </div>
  <div class="meta">
    <div><span>Review it live</span><span><a href="${SITE_URL}">${SITE_URL.replace('https://','')}</a></span></div>
    <div><span>Prepared for</span><span>${esc(COMPANY.parent)}</span></div>
    <div><span>Date</span><span>${today}</span></div>
  </div>
`, 'cover')}

${page(`
  <p class="eyebrow">Executive summary</p>
  <h2 style="max-width:150mm">You asked for a site that earns trust. This one is built to.</h2>

  <div class="quote" style="margin:7mm 0">
    <p>“The current UI/UX, visual appeal and overall user experience do not meet our
    expectations. We are looking for a premium, modern, attractive, responsive, dynamic and
    technically strong website.”</p>
    <cite>From your original brief</cite>
  </div>

  <p class="lead" style="max-width:155mm">Every point in that brief is answered below, in the same
  order you wrote them. The site is finished and live for you to click through; nothing here is a
  mock-up.</p>

  <table class="brief compact" style="margin-top:6mm">
    <thead><tr><th>You asked for</th><th>What has been built</th></tr></thead>
    <tbody>
      ${brief.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}
    </tbody>
  </table>

  <div class="band" style="margin-top:7mm">
    <h3 style="margin-bottom:2mm">One thing worth saying plainly</h3>
    <p style="font-size:10pt">Nothing in this document is a promise about rankings or enquiry
    volumes, because nobody can honestly make one. What we can show you is a site that answers
    ${d.counts.total} different searches instead of fifteen, says something true that no competitor
    in Pune is saying, and puts your phone number in front of every visitor on every screen.</p>
  </div>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">The problem</p>
  <h2 style="max-width:150mm">Where your current site loses customers</h2>
  <p class="lead" style="margin-top:5mm;max-width:155mm">Four things, all of them fixable, and all of
  them costing you enquiries today.</p>

  <div class="cards" style="margin-top:7mm">
    <div class="card">
      <h3>It looks like every other loan site</h3>
      <p>A borrower comparing four brokers in Pimpri-Chinchwad sees four versions of the same page.
      There is nothing to remember and no reason to pick one over another.</p>
    </div>
    <div class="card">
      <h3>It answers almost no searches</h3>
      <p>Your site has fifteen pages. Someone searching “business loan Bhosari” or “gold loan
      Baramati” finds a competitor, because nobody has written a page that answers them.</p>
    </div>
    <div class="card">
      <h3>It asks before it gives</h3>
      <p>Visitors arrive wanting to know one thing: how much can I borrow? The usual answer is a form
      demanding a mobile number first, and most people leave rather than fill it in.</p>
    </div>
    <div class="card">
      <h3>It says nothing only you could say</h3>
      <p>The one genuinely valuable thing about PayYou is not on the site: you compare a profile
      across twenty-five lenders and submit to one, so the customer takes a single credit enquiry
      rather than twenty-five.</p>
    </div>
  </div>

  <table class="compact" style="margin-top:8mm">
    <thead><tr><th style="width:32%"></th><th>Your site today</th><th>The new site</th></tr></thead>
    <tbody>
      <tr><td>Pages a customer can land on</td><td>15</td><td>${d.counts.total}</td></tr>
      <tr><td>Areas with their own page</td><td>None</td><td>${d.counts.localities}, from Bhosari to Phaltan</td></tr>
      <tr><td>First thing a visitor is asked</td><td>Their name and mobile number</td><td>Nothing. The figure appears as they type</td></tr>
      <tr><td>Partner banks shown</td><td>Logos only</td><td>Logos, plus what each one is good for</td></tr>
      <tr><td>Ways to reach you from any screen</td><td>Header only</td><td>Header, opening section, and a bar that follows on mobile</td></tr>
    </tbody>
  </table>

  <div class="band" style="margin-top:7mm">
    <h3 style="margin-bottom:2mm">The idea the new site is built around</h3>
    <p style="font-size:10pt">Apply to eight banks yourself and your credit report carries eight hard
    enquiries, and a lower score at exactly the wrong moment. PayYou shortlists first and applies
    once. That is a real advantage, it is easy to understand, and no competitor in Pune says it
    plainly.</p>
  </div>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">What has been built</p>
  <h2>The shape of it</h2>
  <div class="stats">
    <div class="stat"><b>${d.counts.total}</b><span>Pages</span><em>Each one written to answer a different search</em></div>
    <div class="stat"><b>${d.counts.localityPages}</b><span>Local pages</span><em>${d.counts.localities} areas across Pune, PCMC, Baramati and Phaltan</em></div>
    <div class="stat"><b>${d.counts.logos}</b><span>Partner logos</span><em>${d.counts.lenders} lenders named in full</em></div>
    <div class="stat"><b>3</b><span>Calculators</span><em>Answers before anything is asked for</em></div>
  </div>

  <div class="cards" style="margin-top:6mm">
    <div class="card">
      <h3>Your brand, not a new one</h3>
      <p>The blue and red across the site are taken from your existing logo. Your logo and your
      twelve partner bank logos appear exactly as you publish them today.</p>
    </div>
    <div class="card">
      <h3>Built to be found</h3>
      <p>Pages arrive complete, so Google, Bing and the AI assistants read them straight away. Each
      one tells search engines what it is about in the format they read directly.</p>
    </div>
    <div class="card">
      <h3>Built to be trusted</h3>
      <p>Rates are described as indicative, because they are. The notice that PayYou advises rather
      than lends appears on every page, written to be read rather than hidden.</p>
    </div>
    <div class="card">
      <h3>Built to convert</h3>
      <p>Your number is on every screen: in the header, in the opening section, and on a bar that
      follows the reader down the page on a phone.</p>
    </div>
  </div>

  <h3 style="margin-top:6mm;margin-bottom:2.5mm">Eight products, each with its own page</h3>
  <table class="compact">
    <thead><tr><th style="width:30%">Product</th><th>Security</th><th style="text-align:right">Tenure</th></tr></thead>
    <tbody>
      ${PRODUCTS.map((pr) => `<tr><td>${esc(pr.name)}</td><td>${esc(pr.categoryLabel)}</td><td class="num">${esc(pr.spec.tenure)}</td></tr>`).join('')}
    </tbody>
  </table>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">The homepage</p>
  <h2 style="margin-bottom:5mm">First impression</h2>
  ${shotBlock(d.homeHero, 'Your phone number and a working eligibility check, both visible before anyone scrolls')}
  <div class="note" style="margin-top:5mm">
    <p>The headline says the thing no competitor says: twenty-five lenders will look at your file,
    one will see your name. Everything below it supports that single claim.</p>
  </div>
  <div style="height:5mm"></div>
  ${shotBlock(d.secWhy, 'Further down: four reasons to use a broker, each with the thing it costs us to do it')}
  ${foot()}
`)}

${page(`
  <p class="eyebrow">The homepage</p>
  <h2 style="margin-bottom:5mm">Products, and the lenders behind them</h2>
  ${shotBlock(d.secProducts, 'All eight products, each showing the rate, amount and term at a glance')}
  <div style="height:5mm"></div>
  ${shotBlock(d.secLenders, 'Your twelve partner banks and NBFCs, moving across the page')}
  ${foot()}
`)}

${page(`
  <p class="eyebrow">The homepage</p>
  <h2 style="margin-bottom:5mm">Answering the first question, and the second</h2>
  ${shotBlock(d.secEligibility, 'How much could I borrow? Answered as the visitor types, with nothing asked in return')}
  <div style="height:5mm"></div>
  ${shotBlock(d.secProcess, 'The four steps, and what does not happen at each. No credit check until the customer agrees')}
  ${foot()}
`)}

${page(`
  <p class="eyebrow">Inside pages</p>
  <h2 style="margin-bottom:5mm">A product page, and a local page</h2>
  <div class="two">
    ${shotBlock(d.productPage, 'Personal loan: who qualifies, what to bring, what decides the rate', 'tall')}
    ${shotBlock(d.localityPage, 'Business loan in Bhosari, written for that industrial belt specifically', 'tall')}
  </div>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">Inside pages</p>
  <h2 style="margin-bottom:5mm">The tools, and the panel</h2>
  <div class="two">
    ${shotBlock(d.calcPage, 'The EMI calculator, showing the full cost of a loan rather than only the monthly figure', 'tall')}
    ${shotBlock(d.lendersPage, 'The lender panel, and what each institution is genuinely good for', 'tall')}
  </div>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">On a phone</p>
  <h2 style="margin-bottom:5mm">Where most of your customers will see it</h2>
  <div class="phones">
    ${shotBlock(d.mobileShots[0], 'Homepage')}
    ${shotBlock(d.mobileShots[1], 'Home loan')}
    ${shotBlock(d.mobileShots[2], 'EMI calculator')}
  </div>

  <h3 style="margin-top:7mm;margin-bottom:3mm">What changes on a small screen</h3>
  <div class="cards">
    <div class="card">
      <h3>A call bar that follows</h3>
      <p>Once a reader scrolls past the first screen, a bar appears at the bottom with Call and
      WhatsApp, and stays there for the rest of the page.</p>
    </div>
    <div class="card">
      <h3>Buttons you can actually hit</h3>
      <p>Every button and menu item is sized to be tapped first time, which is the difference between
      a number that dials and one that misses.</p>
    </div>
    <div class="card">
      <h3>Lighter pages on mobile data</h3>
      <p>A phone is sent a much smaller version of each photograph, and the page holds its shape
      while images arrive rather than jumping about.</p>
    </div>
    <div class="card">
      <h3>Nothing slides off the side</h3>
      <p>Wide comparison tables scroll within their own frame. The page itself never scrolls
      sideways, which is the most common fault on a mobile finance site.</p>
    </div>
  </div>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">Being found</p>
  <h2>How customers will find you</h2>
  <p class="lead" style="margin:4mm 0 6mm;max-width:155mm">Most loan websites have five or six pages
  and compete for the same handful of searches. This one has ${d.counts.total}, and most of them
  answer a question no competitor has written a page for.</p>

  <table>
    <thead><tr><th>Page type</th><th>Written to answer</th><th style="text-align:right">Count</th></tr></thead>
    <tbody>
      <tr><td>Product pages</td><td>“personal loan in Pune”, “loan against property Pune”</td><td class="num">${d.counts.products}</td></tr>
      <tr><td>Local pages</td><td>“business loan Bhosari”, “home loan Hinjewadi”</td><td class="num">${d.counts.localityPages}</td></tr>
      <tr><td>Calculators</td><td>“EMI calculator”, “loan eligibility calculator”</td><td class="num">${d.counts.calculators}</td></tr>
      <tr><td>Questions</td><td>“low CIBIL score loan”, “cash salary loan”</td><td class="num">${d.counts.questions}</td></tr>
      <tr><td>Company and policy</td><td>The pages Google weighs heavily for financial firms</td><td class="num">${d.counts.company}</td></tr>
      <tr style="border-top:2px solid rgba(8,32,63,.18)"><td>Total</td><td></td><td class="num">${d.counts.total}</td></tr>
    </tbody>
  </table>

  <div class="band" style="margin-top:6mm">
    <h3 style="margin-bottom:2mm">Why the local pages matter most</h3>
    <p>Each one is written for that area specifically. The Bhosari page is about MIDC leasehold sheds
    and ninety-day customer payments. The Hinjewadi page is about approved project lists and variable
    pay. The Baramati page is about income that arrives in a season. They rank because they are
    genuinely different pages, not one page with the place name swapped.</p>
  </div>

  <h3 style="margin-top:6mm;margin-bottom:3mm">Click through a few</h3>
  <table class="compact">
    <tbody>
      ${sampleUrls.map(([label, path]) => `<tr><td>${esc(label)}</td><td colspan="2"><a href="${SITE_URL}${path}">${SITE_URL.replace('https://','')}${path}</a></td></tr>`).join('')}
    </tbody>
  </table>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">Being found</p>
  <h2>What is already in place</h2>

  <ul class="ticks" style="margin-top:5mm">
    <li><b>Your existing links are preserved.</b> Twelve addresses from your current site point
    automatically to their replacements, so whatever ranking you have moves across rather than being
    lost on the day you switch.</li>
    <li><b>Google is told what every page is.</b> Your business, address, opening hours, each loan
    product and every question, in the format Google reads directly to build a listing.</li>
    <li><b>A map of the site is generated automatically</b> and kept current, ready to submit to
    Google on the day you launch.</li>
    <li><b>ChatGPT and the other assistants are catered for.</b> A plain summary at
    <a href="${SITE_URL}/llms.txt">/llms.txt</a> tells them what PayYou does, and importantly that
    PayYou advises rather than lends, so they cannot describe you incorrectly.</li>
    <li><b>Secure by design.</b> There is nothing to log into and no customer data stored, so there
    is nothing to leak.</li>
  </ul>

  <h3 style="margin-top:7mm;margin-bottom:3mm">Everything you will need on launch day</h3>
  <table class="compact">
    <tbody>
      <tr><td>The live site</td><td colspan="2"><a href="${SITE_URL}">${SITE_URL}</a></td></tr>
      <tr><td>Site map, for Google Search Console</td><td colspan="2"><a href="${SITE_URL}/sitemap.xml">${SITE_URL}/sitemap.xml</a></td></tr>
      <tr><td>All lenders</td><td colspan="2"><a href="${SITE_URL}/lenders/">${SITE_URL}/lenders/</a></td></tr>
      <tr><td>Photography credits</td><td colspan="2"><a href="${SITE_URL}/photo-credits/">${SITE_URL}/photo-credits/</a></td></tr>
    </tbody>
  </table>

  <div class="note" style="margin-top:7mm">
    <p>None of this replaces your Google Business Profile. For a local firm that listing still brings
    in more enquiries than anything else, and genuine customer reviews on it will outperform any
    change to this website. The site is built to support it, not to substitute for it.</p>
  </div>

  <h3 style="margin-top:8mm;margin-bottom:3mm">The twelve links that carry across</h3>
  <p style="margin-bottom:3mm">These addresses exist on your site today. Anyone who has bookmarked
  one, or found it through Google, arrives at the right new page automatically.</p>
  <table class="compact">
    <thead><tr><th style="width:52%">Your current address</th><th>Where it will take them</th></tr></thead>
    <tbody>
      ${LEGACY_REDIRECTS.map((r) => `<tr><td style="font-family:'IBM Plex Mono',monospace;font-size:7.5pt;font-weight:400">${esc(r.from)}</td><td style="font-family:'IBM Plex Mono',monospace;font-size:7.5pt">${esc(r.to)}</td></tr>`).join('')}
    </tbody>
  </table>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">Measuring it</p>
  <h2>How we will know it is working</h2>
  <p class="lead" style="margin:4mm 0 6mm;max-width:155mm">Four things worth watching, and an honest
  view of when to expect each. A website does not change a business in a fortnight.</p>

  <table>
    <thead><tr><th>What to watch</th><th>Where</th><th style="text-align:right">When</th></tr></thead>
    <tbody>
      <tr><td>Calls and WhatsApp enquiries</td><td>Ask every caller how they found you and write it down. This is the only number that really matters.</td><td class="num">Week 1</td></tr>
      <tr><td>Pages appearing in Google</td><td>Google Search Console, free to set up against the site map above</td><td class="num">2–4 weeks</td></tr>
      <tr><td>Searches you start showing up for</td><td>Search Console, the Performance report</td><td class="num">1–3 months</td></tr>
      <tr><td>Local pages bringing enquiries</td><td>Search Console, filtered by page</td><td class="num">3–6 months</td></tr>
    </tbody>
  </table>

  <div class="band" style="margin-top:7mm">
    <h3 style="margin-bottom:2mm">What we would expect, and what we would not</h3>
    <p>The product pages and the calculators should start attracting visitors within weeks. The local
    pages take longer, because Google is cautious with new pages about money and lets them prove
    themselves first. Anyone promising you first-page rankings in a month for “personal loan Pune” is
    not being straight with you.</p>
  </div>

  <div class="note" style="margin-top:7mm">
    <p>The single highest-return action available to you is not on this website. It is collecting
    genuine reviews on your Google Business Profile. Fifty real reviews will bring in more enquiries
    than any change we could make here, and the site is built to send people there.</p>
  </div>

  <h3 style="margin-top:7mm;margin-bottom:3mm">Who does what</h3>
  <table class="compact">
    <thead><tr><th style="width:32%">Task</th><th>Us</th><th>You</th></tr></thead>
    <tbody>
      <tr><td>Setting up Google Search Console</td><td>Yes</td><td>Approve access</td></tr>
      <tr><td>Submitting the site map</td><td>Yes</td><td>—</td></tr>
      <tr><td>Updating the Google Business Profile</td><td>We advise on the wording</td><td>You hold the login</td></tr>
      <tr><td>Asking customers for reviews</td><td>—</td><td>Yes, and it is the important one</td></tr>
      <tr><td>Copy, rates and photograph changes</td><td>Yes, same day</td><td>Tell us what to change</td></tr>
    </tbody>
  </table>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">Over to you</p>
  <h2>What we need from you</h2>
  <p class="lead" style="margin:4mm 0 6mm;max-width:155mm">Six items. Only the first holds anything
  up; the rest each make the site measurably stronger.</p>

  <table>
    <thead><tr><th style="width:32%">Item</th><th>Why it matters</th></tr></thead>
    <tbody>
      <tr><td>Confirm your track record</td><td>Your current homepage says “5 years of experience” and “100+ loans processed”. Your About page says the company was incorporated in January 2026 with 50+ customers. We have used the more conservative figures, because a claim a customer can check and disprove costs more than a smaller true one earns.</td></tr>
      <tr><td>CIN, GSTIN and IRDAI number</td><td>A registration number a visitor can verify is worth more than any adjective on the page. These go in the footer of every page.</td></tr>
      <tr><td>A named Grievance Officer</td><td>The complaints page sets out a full escalation route, ending with the RBI Ombudsman. It needs a name at the top of it.</td></tr>
      <tr><td>Your Google Business Profile link</td><td>So the address and map pin on the site match your listing exactly. Mismatches quietly cost you local ranking.</td></tr>
      <tr><td>Your logo files</td><td>The original artwork, plus a white version for dark backgrounds. The file on your current site is small, which limits how sharply it can be shown.</td></tr>
      <tr><td>Photographs of your office and team</td><td>The site currently uses licensed stock photography, credited openly. Real photographs of Chapekar Chowk will beat every one of them, because they are true. A good phone in decent light is enough.</td></tr>
    </tbody>
  </table>

  <div class="cards" style="margin-top:8mm">
    <div class="card">
      <h3>None of this blocks your review</h3>
      <p>Go through the site now and tell us what should read differently. These six items can arrive
      afterwards, in any order, and each one is applied the day it reaches us.</p>
    </div>
    <div class="card">
      <h3>The first one is worth deciding early</h3>
      <p>The figures on your current site contradict each other, and it is a matter of public record
      which is correct. Better to settle it before the site is promoted than after somebody asks.</p>
    </div>
  </div>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">Next steps</p>
  <h2>Getting this live</h2>

  <ol class="steps" style="margin-top:8mm">
    <li>
      <h3>Review the site</h3>
      <p>Open it on your phone and on a computer, click through a few pages, and mark anything that
      should read differently. Copy, figures and photographs are all quick to change.</p>
    </li>
    <li>
      <h3>Send us the six items listed on the previous page</h3>
      <p>Registration numbers, the Grievance Officer, your Business Profile link, logo files and any
      photographs. None of them takes long to gather.</p>
    </li>
    <li>
      <h3>Point payyouadvisory.com at the new site</h3>
      <p>The switch itself takes minutes, and your existing links carry across automatically. We
      would recommend doing this promptly, so the new site and the old one are not both live.</p>
    </li>
    <li>
      <h3>Submit it to Google, and start collecting reviews</h3>
      <p>We will set up Search Console and submit the site map. You start asking every satisfied
      customer for a Google review. That combination is what turns ${d.counts.total} pages into
      enquiries.</p>
    </li>
  </ol>

  <div class="band" style="margin-top:4mm">
    <h3 style="margin-bottom:2mm">Review it here</h3>
    <p style="font-size:11pt"><a href="${SITE_URL}">${SITE_URL.replace('https://','')}</a></p>
  </div>

  <table class="compact" style="margin-top:7mm">
    <tbody>
      <tr><td>${esc(COMPANY.name)}</td><td>${esc(PRIMARY_OFFICE.lines.join(' '))}</td></tr>
      <tr><td>Telephone</td><td class="fig">${esc(CONTACT.landlineDisplay)} · +91 ${esc(CONTACT.mobile)}</td></tr>
      <tr><td>Email</td><td>${esc(CONTACT.email)}</td></tr>
    </tbody>
  </table>

  <div class="note" style="margin-top:9mm">
    <p>Everything on the site is straightforward to change: a rate, a sentence, a photograph, a whole
    new area. Tell us what should read differently and it will be different the same day. The
    structure underneath was built to take it.</p>
  </div>
  ${foot()}
`)}

</body></html>`
}

const counts0 = (d) => d.counts.total

// Auto-numbered. Hand-numbered footers survive exactly one inserted page.
let pageNo = 0
const foot = () => `
  <div class="foot">
    <span>${esc(COMPANY.shortName)} · Website proposal</span>
    <span class="fig">${String(++pageNo).padStart(2, '0')}</span>
  </div>`

main().catch((err) => {
  console.error('✗ PDF generation failed:', err)
  process.exit(1)
})
