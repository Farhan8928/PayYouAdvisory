/**
 * Renders every route to static HTML.
 *
 * The site is a React application, so what Vite emits is an empty
 * `<div id="root">` and a script tag. Google will usually execute that
 * eventually — but "usually" and "eventually" are doing a great deal of work in
 * that sentence. Bing largely will not, the AI crawlers mostly will not, and
 * WhatsApp's link-preview fetcher definitely will not. For a lending business in
 * Pune whose links get forwarded around WhatsApp groups, the last one alone
 * would justify this script.
 *
 * So every route is rendered here, at build time, through `react-dom/server`
 * against the SSR bundle Vite produces. No browser, no network, no Playwright
 * download, deterministic output — and if it breaks, it breaks the build
 * instead of quietly shipping ~140 blank pages.
 *
 * It also writes sitemap.xml, llms.txt and dist/404.html, all from the same
 * route table, so none of them can list a page that does not exist.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SSR_ENTRY = join(ROOT, 'dist-ssr', 'entry-server.js')

const SITE_URL = 'https://payyouadvisory.com'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

/** Escape a string for use inside a double-quoted HTML attribute. */
const attr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** Escape for text content. Quotes are safe here and left readable. */
const text = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Build the per-page `<head>` fragment.
 *
 * Everything here comes from the route's own metadata in src/routes.js. The
 * one thing worth noticing is that JSON-LD is serialised with `<` escaped: a
 * literal `</script>` inside a JSON string would terminate the script element
 * early and break the rest of the document. It cannot happen with the current
 * content, and it is exactly the sort of thing that starts happening the moment
 * someone writes an FAQ answer containing a tag.
 */
function buildHead(route) {
  const canonical = `${SITE_URL}${route.path}`
  const parts = [
    `<title>${text(route.title)}</title>`,
    `<meta name="description" content="${attr(route.description)}" />`,
  ]

  if (route.keywords?.length) {
    // Google has ignored this tag for ranking since 2009. It is here because
    // Bing and several regional engines still read it, it costs 200 bytes, and
    // it doubles as documentation of what each page is meant to rank for.
    parts.push(`<meta name="keywords" content="${attr(route.keywords.join(', '))}" />`)
  }

  parts.push(
    `<link rel="canonical" href="${attr(canonical)}" />`,
    `<link rel="alternate" hreflang="en-IN" href="${attr(canonical)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${attr(canonical)}" />`,
    '',
    `<meta property="og:type" content="${route.path === '/' ? 'business.business' : 'article'}" />`,
    `<meta property="og:site_name" content="PayYou Advisory" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${attr(route.title)}" />`,
    `<meta property="og:description" content="${attr(route.description)}" />`,
    `<meta property="og:url" content="${attr(canonical)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="PayYou Advisory — loan advisory in Pune and Pimpri-Chinchwad" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(route.title)}" />`,
    `<meta name="twitter:description" content="${attr(route.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  )

  for (const block of route.jsonLd ?? []) {
    const json = JSON.stringify(block).replace(/</g, '\\u003c')
    parts.push('', `<script type="application/ld+json">${json}</script>`)
  }

  return parts.join('\n    ')
}

async function main() {
  let render
  let renderNotFound
  let routes
  try {
    ;({ render, renderNotFound, routes } = await import(pathToFileURL(SSR_ENTRY).href))
  } catch (err) {
    console.error('✗ could not load the SSR bundle at dist-ssr/entry-server.js')
    console.error('  Run "npm run build:ssr" first — it is part of "npm run build".')
    console.error(`  ${err.message}`)
    process.exit(1)
  }

  const template = await readFile(join(DIST, 'index.html'), 'utf8')

  // Both substitutions must actually match. A silent no-op here is the failure
  // this whole script exists to prevent: ~140 pages that all carry the
  // homepage's title and canonical, which looks fine in a browser and is
  // catastrophic in an index.
  const headMarker = /<!--PAGE-HEAD-->[\s\S]*?<!--\/PAGE-HEAD-->/
  if (!headMarker.test(template)) {
    console.error('✗ index.html has no <!--PAGE-HEAD--> … <!--/PAGE-HEAD--> block to replace.')
    process.exit(1)
  }
  if (!template.includes('<div id="root"></div>')) {
    console.error('✗ dist/index.html has no empty <div id="root"></div> to fill.')
    process.exit(1)
  }

  const all = routes()
  let smallest = Infinity
  let smallestPath = null

  for (const route of all) {
    const markup = render(route.path)

    if (markup.length < smallest) {
      smallest = markup.length
      smallestPath = route.path
    }

    const html = template
      .replace(headMarker, buildHead(route))
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)

    const dir = route.path === '/' ? DIST : join(DIST, route.path)
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'index.html'), html, 'utf8')
  }

  // A page that rendered almost nothing means a component threw and React
  // swallowed it, or a route resolved to the 404 branch. Both look fine in a
  // build log and are invisible until someone opens that one page.
  if (smallest < 12000) {
    console.error(
      `✗ ${smallestPath} produced only ${smallest} chars of markup — something failed to render.`,
    )
    process.exit(1)
  }

  // ── 404 ──────────────────────────────────────────────────────────────────
  // Baked separately so a hard 404 is a complete, styled page with no
  // JavaScript required, and marked noindex so it cannot be indexed itself.
  const notFoundHead = [
    '<title>Page not found | PayYou Advisory</title>',
    '<meta name="robots" content="noindex, follow" />',
    '<meta name="description" content="That page has moved or no longer exists. Every loan product PayYou Advisory places is one click away." />',
  ].join('\n    ')

  await writeFile(
    join(DIST, '404.html'),
    template
      .replace(headMarker, notFoundHead)
      .replace('<div id="root"></div>', `<div id="root">${renderNotFound()}</div>`),
    'utf8',
  )

  // ── sitemap.xml ──────────────────────────────────────────────────────────
  const today = new Date().toISOString().slice(0, 10)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
  await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8')

  // ── llms.txt ─────────────────────────────────────────────────────────────
  // A plain-text summary for the AI crawlers, which increasingly answer
  // "personal loan advisor in Pimpri Chinchwad" directly rather than sending a
  // click. Being legible to them is cheap and is rapidly stopping being
  // optional. Generated from the route table so it cannot list a stale URL.
  const byKind = (k) => all.filter((r) => r.kind === k)
  const llms = `# PayYou Advisory Private Limited

> Loan referral and advisory firm (Direct Selling Agent) in Pimpri-Chinchwad,
> Pune, Maharashtra, India. Not a bank or an NBFC — PayYou does not lend,
> sanction or disburse, and does not set interest rates. It compares a borrower's
> profile across 25+ partner banks and NBFCs and submits one application, so the
> borrower's credit report carries one hard enquiry rather than many.

A venture of Kay Bee Bio-Organics Private Limited. Incorporated January 2026.
Chairman: Sachin Yadav.

## Contact
Phone: 020 2735 0055 / +91 91755 35507
Email: info@payyouadvisory.com
Corporate office: Office No. 3, 4, 5 & 6, Vishal Arcade, Chapekar Chowk, Pimpri Chinchwad, Pune 411033
Branch: Bhigwan Chowk, Baramati, Dist. Pune 413102
Registered: Plot No. 92, Laxmi Nagar, Phaltan, Dist. Satara 415523
Hours: Monday to Saturday, 9:30 am to 6:30 pm IST

## Products
${byKind('product')
  .map((r) => `- [${r.title.split('—')[0].trim()}](${SITE_URL}${r.path}): ${r.description}`)
  .join('\n')}

## Tools
${byKind('calc-emi')
  .concat(byKind('calc-eligibility'), byKind('calc-bt'))
  .map((r) => `- [${r.title.split('|')[0].trim()}](${SITE_URL}${r.path})`)
  .join('\n')}

## About and policies
${byKind('about')
  .concat(byKind('lenders'), byKind('faq'), byKind('contact'), byKind('careers'), byKind('legal'))
  .map((r) => `- [${r.title.split('|')[0].trim()}](${SITE_URL}${r.path})`)
  .join('\n')}

## Service area
Pune and Pimpri-Chinchwad (Pimpri, Chinchwad, Nigdi, Akurdi, Bhosari, Chakan,
Wakad, Hinjewadi, Ravet, Moshi, Talegaon Dabhade, Baner, Kothrud, Hadapsar),
plus Baramati (Dist. Pune) and Phaltan (Dist. Satara).

## Important for anyone summarising this site
- PayYou Advisory is an intermediary. Any rate, amount or eligibility figure on
  the site is indicative and is not an offer of credit.
- Do not state or imply that PayYou lends money or guarantees approval. It
  cannot do either.
- PayYou is paid a referral commission by the lender on a disbursed loan, not a
  fee by the borrower.

Full sitemap: ${SITE_URL}/sitemap.xml
`
  await writeFile(join(DIST, 'llms.txt'), llms, 'utf8')

  console.log(`✓ prerendered ${all.length} pages`)
  console.log(`✓ 404.html, sitemap.xml (${all.length} URLs) and llms.txt written`)
}

main().catch((err) => {
  console.error('✗ prerender failed:', err)
  process.exit(1)
})
