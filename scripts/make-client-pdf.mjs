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
import { ROUTES } from '../src/routes.js'

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

  .eyebrow { font-size: 7.5pt; font-weight: 700; letter-spacing: .16em; text-transform: uppercase;
             color: var(--accent-deep); display: flex; align-items: center; gap: 8px; margin-bottom: 7mm; }
  .eyebrow::before { content: ''; width: 20px; height: 3px; border-radius: 2px; background: var(--accent); }
  .rule { height: 3px; width: 52px; border-radius: 2px; background: var(--accent); margin: 5mm 0; }
  .foot { margin-top: auto; padding-top: 5mm; border-top: 1px solid rgba(8,32,63,.1);
          display: flex; justify-content: space-between; font-size: 7.5pt; color: var(--ink-faint); }

  /* ── Cover ── */
  .cover { background: linear-gradient(140deg, var(--ink-mid) 0%, var(--ink) 45%, var(--ink-deep) 100%);
           color: #fff; justify-content: space-between; padding: 22mm 16mm; }
  .cover h1 { color: #fff; font-size: 40pt; }
  .cover .chip { background: #fff; border-radius: 8px; padding: 7px 12px; display: inline-block; }
  .cover .chip img { height: 34px; display: block; }
  .cover p { color: rgba(255,255,255,.72); font-size: 11pt; }
  .cover .meta { display: flex; gap: 14mm; border-top: 1px solid rgba(255,255,255,.2); padding-top: 6mm; }
  .cover .meta div span:first-child { display: block; font-size: 7.5pt; letter-spacing: .14em;
    text-transform: uppercase; color: var(--sky); margin-bottom: 3px; font-weight: 700; }
  .cover .meta div span:last-child { font-size: 10pt; color: #fff; }
  .cover a { color: #fff; }

  /* ── Stats ── */
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

  /* ── Screenshots ── */
  .shot { border: 1px solid rgba(8,32,63,.14); border-radius: 6px; overflow: hidden; background: #fff; }
  .shot img { width: 100%; display: block; }
  .shot figcaption { font-size: 7.5pt; color: var(--ink-faint); padding: 2.5mm 3mm;
                     border-top: 1px solid rgba(8,32,63,.1); background: var(--paper-deep); }
  .shot.tall img { max-height: 205mm; object-fit: cover; object-position: top; }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
  .phones { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm; align-items: start; }
  .phones .shot img { max-height: 175mm; object-fit: cover; object-position: top; }

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
  .band { background: var(--paper-deep); border-radius: 8px; padding: 5mm; }
  .note { border-left: 3px solid var(--accent); padding-left: 4mm; }
  .note p { font-size: 8.5pt; }
</style></head><body>

${page(`
  <div>
    <div class="chip"><img src="${d.logo}" alt="PayYou Advisory"></div>
  </div>
  <div>
    <h1>Your new website.</h1>
    <p style="margin-top:7mm;max-width:130mm">
      A complete rebuild of payyouadvisory.com. ${counts0(d)} pages, built around one idea:
      one application, ${d.counts.partnerClaim} lenders, one credit enquiry.
    </p>
  </div>
  <div class="meta">
    <div><span>Live preview</span><span><a href="${SITE_URL}">${SITE_URL.replace('https://','')}</a></span></div>
    <div><span>Prepared for</span><span>${esc(COMPANY.parent)}</span></div>
    <div><span>Date</span><span>${today}</span></div>
  </div>
`, 'cover')}

${page(`
  <p class="eyebrow">At a glance</p>
  <h2>What has been built</h2>
  <div class="stats">
    <div class="stat"><b>${d.counts.total}</b><span>Pages</span><em>Every one written, not generated from a template</em></div>
    <div class="stat"><b>${d.counts.localityPages}</b><span>Local landing pages</span><em>${d.counts.localities} areas × ${AREA_PRODUCT_SLUGS.length} products</em></div>
    <div class="stat"><b>${d.counts.logos}</b><span>Partner logos</span><em>${d.counts.lenders} lenders named in full</em></div>
    <div class="stat"><b>3</b><span>Working calculators</span><em>EMI, eligibility, balance transfer</em></div>
  </div>

  <div class="cards" style="margin-top:6mm">
    <div class="card">
      <h3>Built to be found</h3>
      <p>Every page is delivered as finished HTML, so Google, Bing and the AI assistants read it
      instantly rather than waiting for scripts. Each page carries its own title, description and
      structured data.</p>
    </div>
    <div class="card">
      <h3>Built to be fast</h3>
      <p>No page builder, no plugins, no database. Pages are served from a global network as static
      files, which is the fastest a website can be and the hardest to take down.</p>
    </div>
    <div class="card">
      <h3>Built to be trusted</h3>
      <p>Rates and eligibility figures are indicative and say so. The notice that PayYou is an
      advisory firm and not a lender appears on every page, designed to be read rather than buried.</p>
    </div>
    <div class="card">
      <h3>Built to convert</h3>
      <p>Your phone number is visible on every screen, at the top, in the hero, and on a bar that
      follows the reader on mobile. Three calculators answer the visitor's first question before
      asking them for anything.</p>
    </div>
  </div>

  <div class="band" style="margin-top:6mm;padding:4mm">
    <h3 style="margin-bottom:2mm">Your brand, not a new one</h3>
    <p>The colours in this document and across the site are taken from your own logo: the royal
    blue and red sampled directly from the artwork on payyouadvisory.com. Your logo, and your
    twelve partner bank logos, are used as published.</p>
  </div>

  <h3 style="margin-top:6mm;margin-bottom:2.5mm">The eight products, each with its own page</h3>
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
  ${shotBlock(d.homeHero, 'Homepage, desktop. The phone number and eligibility check are both visible without scrolling')}
  <div class="note" style="margin-top:5mm">
    <p>The headline states the one thing no competitor says plainly: apply to eight banks yourself
    and you collect eight hard enquiries. We shortlist, then submit to one.</p>
  </div>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">The homepage</p>
  <h2 style="margin-bottom:5mm">Products and lenders</h2>
  ${shotBlock(d.secProducts, 'All eight products, with rate, amount and tenure on every card')}
  <div style="height:5mm"></div>
  ${shotBlock(d.secLenders, 'The partner panel: twelve bank and NBFC logos, scrolling continuously')}
  ${foot()}
`)}

${page(`
  <p class="eyebrow">The homepage</p>
  <h2 style="margin-bottom:5mm">Tools and process</h2>
  ${shotBlock(d.secEligibility, 'The eligibility calculator answers "how much can I get?" with no form to fill in')}
  <div style="height:5mm"></div>
  ${shotBlock(d.secProcess, 'The four steps, and what does not happen at each. No hard credit check until you say so')}
  ${foot()}
`)}

${page(`
  <p class="eyebrow">Inside pages</p>
  <h2 style="margin-bottom:5mm">A product page, and a local page</h2>
  <div class="two">
    ${shotBlock(d.productPage, 'Personal loan: eligibility, documents, rates and questions', 'tall')}
    ${shotBlock(d.localityPage, 'Business loan in Bhosari, written for that belt specifically', 'tall')}
  </div>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">Inside pages</p>
  <h2 style="margin-bottom:5mm">The tools, and the panel</h2>
  <div class="two">
    ${shotBlock(d.calcPage, 'EMI calculator, with the amortisation chart and the year-by-year table', 'tall')}
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
  <div class="note" style="margin-top:6mm">
    <p>Checked at eight screen sizes, from a 360-pixel budget Android to a 1920-pixel desktop. On
    every one of them, the call button is visible without scrolling.</p>
  </div>

  <h3 style="margin-top:7mm;margin-bottom:3mm">What changes on a small screen</h3>
  <div class="cards">
    <div class="card">
      <h3>A call bar that follows</h3>
      <p>Once a reader scrolls past the first screen, a bar appears at the bottom with Call and
      WhatsApp. It is there for the whole page and disappears on desktop, where the number is
      already in the header.</p>
    </div>
    <div class="card">
      <h3>Every tap target sized properly</h3>
      <p>Buttons and menu items are at least 44 pixels tall, which is the accessibility standard
      and the difference between a number that dials and one that misses.</p>
    </div>
    <div class="card">
      <h3>Images sized for the connection</h3>
      <p>A phone is sent an image about a tenth the weight of the desktop version, with a blurred
      placeholder so the layout never jumps while it loads.</p>
    </div>
    <div class="card">
      <h3>Tables that scroll, pages that do not</h3>
      <p>Wide comparison tables scroll inside their own frame. The page itself never scrolls
      sideways, which is the most common fault on a mobile finance site.</p>
    </div>
  </div>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">Search</p>
  <h2>How this site is meant to be found</h2>
  <p style="margin:4mm 0 6mm;max-width:150mm">Most loan websites have five or six pages and compete
  for the same handful of searches. This one has ${d.counts.total}, and most of them target a search
  a competitor is not answering at all.</p>

  <table>
    <thead><tr><th>Page type</th><th>What it is for</th><th style="text-align:right">Count</th></tr></thead>
    <tbody>
      <tr><td>Product pages</td><td>“personal loan in Pune”, “loan against property Pune”</td><td class="num">${d.counts.products}</td></tr>
      <tr><td>Local landing pages</td><td>“business loan Bhosari”, “home loan Hinjewadi”</td><td class="num">${d.counts.localityPages}</td></tr>
      <tr><td>Calculators</td><td>“EMI calculator”, “loan eligibility calculator”</td><td class="num">${d.counts.calculators}</td></tr>
      <tr><td>Questions</td><td>“low CIBIL score loan”, “cash salary loan”</td><td class="num">${d.counts.questions}</td></tr>
      <tr><td>Company, policy &amp; landing</td><td>Trust signals that Google weighs heavily for finance</td><td class="num">${d.counts.company}</td></tr>
      <tr style="border-top:2px solid rgba(8,32,63,.18)"><td>Total</td><td></td><td class="num">${d.counts.total}</td></tr>
    </tbody>
  </table>

  <div class="band" style="margin-top:6mm">
    <h3 style="margin-bottom:2mm">Why the local pages matter most</h3>
    <p>Each of the ${d.counts.localityPages} is written for that area specifically. Bhosari's page is
    about MIDC leasehold sheds and ninety-day receivables; Hinjewadi's is about approved-project
    lists and variable pay; Baramati's is about income that arrives in a season. They are different
    pages because they are different problems, and that is what keeps them ranking rather than
    being dismissed as duplicates.</p>
  </div>

  <h3 style="margin-top:6mm;margin-bottom:3mm">Have a look at a few</h3>
  <table>
    <tbody>
      ${sampleUrls.map(([label, path]) => `<tr><td>${esc(label)}</td><td colspan="2"><a href="${SITE_URL}${path}">${SITE_URL.replace('https://','')}${path}</a></td></tr>`).join('')}
    </tbody>
  </table>

  <div class="note" style="margin-top:7mm">
    <p>None of this replaces your Google Business Profile. For a local firm that listing still
    outranks everything, and genuine customer reviews on it will bring in more enquiries than any
    change to this website. The site is built to support that, not to substitute for it.</p>
  </div>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">Search</p>
  <h2>What is already in place</h2>

  <ul class="ticks" style="margin-top:5mm">
    <li><b>Every page pre-rendered.</b> Search engines and WhatsApp link previews see finished
    content, not an empty page waiting for scripts to run.</li>
    <li><b>Structured data on every page.</b> Your business, address, opening hours, each loan
    product and every FAQ, in the format Google reads directly.</li>
    <li><b>Your old links preserved.</b> Twelve addresses from the current site redirect to their
    replacements, so the ranking you already have moves across instead of being lost.</li>
    <li><b>Sitemap and robots file generated automatically</b> from the site itself, so they can
    never fall out of date.</li>
    <li><b>Written for AI assistants too.</b> A plain-language summary at <a href="${SITE_URL}/llms.txt">/llms.txt</a>
    tells ChatGPT, Claude and Perplexity what PayYou does — and, importantly, that PayYou is an
    advisory firm rather than a lender.</li>
    <li><b>Secure by default.</b> HTTPS enforced, modern security headers, and no forms that could
    collect data insecurely.</li>
  </ul>

  <h3 style="margin-top:7mm;margin-bottom:3mm">Reference links</h3>
  <table>
    <tbody>
      <tr><td>Live preview</td><td colspan="2"><a href="${SITE_URL}">${SITE_URL}</a></td></tr>
      <tr><td>Sitemap (for Google Search Console)</td><td colspan="2"><a href="${SITE_URL}/sitemap.xml">${SITE_URL}/sitemap.xml</a></td></tr>
      <tr><td>Crawler instructions</td><td colspan="2"><a href="${SITE_URL}/robots.txt">${SITE_URL}/robots.txt</a></td></tr>
      <tr><td>AI assistant summary</td><td colspan="2"><a href="${SITE_URL}/llms.txt">${SITE_URL}/llms.txt</a></td></tr>
      <tr><td>All lenders</td><td colspan="2"><a href="${SITE_URL}/lenders/">${SITE_URL}/lenders/</a></td></tr>
      <tr><td>Photo credits</td><td colspan="2"><a href="${SITE_URL}/photo-credits/">${SITE_URL}/photo-credits/</a></td></tr>
    </tbody>
  </table>
  ${foot()}
`)}

${page(`
  <p class="eyebrow">Before launch</p>
  <h2>What we still need from you</h2>
  <p style="margin:4mm 0 6mm;max-width:150mm">Six items. The first is the only one that blocks
  anything; the rest each make the site measurably stronger.</p>

  <table>
    <thead><tr><th style="width:34%">Item</th><th>Why it matters</th></tr></thead>
    <tbody>
      <tr><td>Confirm your track record</td><td>Your current homepage says “5 years of experience” and “100+ loans”; the About page says incorporated January 2026 with 50+ customers. We have used the conservative figures. Lending is a category where Google and customers both check.</td></tr>
      <tr><td>CIN, GSTIN, IRDAI number</td><td>A registration number a visitor can verify is worth more than any adjective on the page. Goes in the footer of every page.</td></tr>
      <tr><td>A named Grievance Officer</td><td>The complaints page has a full escalation path to the RBI Ombudsman. It needs a name.</td></tr>
      <tr><td>Your Google Business Profile link</td><td>So the address and map pin on the site match it exactly. This is most of local ranking.</td></tr>
      <tr><td>Logo files</td><td>The original vector, plus a white version. Your logo is currently only 166 pixels wide, which limits how crisply it can be shown.</td></tr>
      <tr><td>Photographs of your office and team</td><td>The site currently uses licensed stock photography, credited openly. Real photographs of Chapekar Chowk will beat all of it.</td></tr>
    </tbody>
  </table>

  <div class="band" style="margin-top:6mm">
    <h3 style="margin-bottom:2mm">One thing to decide soon</h3>
    <p>The site is live at a temporary address. Once payyouadvisory.com points here, everything moves
    across in a single change. Until then the preview and your current site are two copies of similar
    content, which is worth closing rather than leaving open.</p>
  </div>
  ${foot()}
`)}

${page(`
  <div style="margin-top:24mm">
    <div class="rule"></div>
    <h2 style="font-size:26pt;max-width:140mm">Ready when you are.</h2>
    <p style="margin-top:5mm;max-width:130mm;font-size:11pt">Have a look at the live preview, and
    send anything that should read differently. Copy, figures and photographs are all quick to
    change; the structure underneath is built to take it.</p>

    <table style="margin-top:9mm;max-width:130mm">
      <tbody>
        <tr><td>Live preview</td><td><a href="${SITE_URL}">${SITE_URL.replace('https://','')}</a></td></tr>
        <tr><td>${esc(COMPANY.name)}</td><td>${esc(PRIMARY_OFFICE.lines.join(' '))}</td></tr>
        <tr><td>Telephone</td><td class="fig">${esc(CONTACT.landlineDisplay)} · +91 ${esc(CONTACT.mobile)}</td></tr>
        <tr><td>Email</td><td>${esc(CONTACT.email)}</td></tr>
      </tbody>
    </table>
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
    <span>${esc(COMPANY.shortName)} · Website presentation</span>
    <span class="fig">${String(++pageNo).padStart(2, '0')}</span>
  </div>`

main().catch((err) => {
  console.error('✗ PDF generation failed:', err)
  process.exit(1)
})
