/**
 * Writes the full page list as plain text, ready to paste into WhatsApp.
 *
 * Run with `npm run links`. Output: `deliverables/links-whatsapp.txt`, plus a
 * shorter `deliverables/links-short.txt`.
 *
 * ── Why it is built from the route table ───────────────────────────────────
 * The first version of this script listed pages from hand-written groups:
 * these seven main pages, then PRODUCTS, then the locality grid, then the legal
 * pages. It worked, and it silently stopped being complete the moment the site
 * grew. After the 24 Aug 2026 restructure it was emitting 142 links for a
 * 218-page site and reporting "218 links" in its own header, because the count
 * came from ROUTES and the content did not.
 *
 * So nothing is enumerated by hand any more. Every line comes from `ROUTES`,
 * grouped by each route's `kind`, and a page that exists cannot be missing from
 * the list. `assertComplete` below fails the script if any route is unaccounted
 * for, which is what turns "should be complete" into "is complete".
 *
 * ── Why two files ──────────────────────────────────────────────────────────
 * The full list is what was asked for and it is genuinely useful as a record.
 * It is also 218 links, which lands in a WhatsApp thread as a wall of text that
 * nobody reads to the end. The short version says the same thing in twenty
 * lines and points at the sitemap for the rest. Send the short one; keep the
 * long one for the record.
 *
 * ── Formatting ─────────────────────────────────────────────────────────────
 * WhatsApp renders *asterisks* as bold and linkifies bare URLs, so the https://
 * prefix is kept: a bare domain usually linkifies too, but not reliably when it
 * is the first thing on a line after a bold heading.
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from '../src/data/site.js'
import { ROUTES } from '../src/routes.js'
import { PRODUCTS, PRODUCT_BY_SLUG } from '../src/data/products.js'
import { VARIANT_BY_SLUG, variantsFor } from '../src/data/variants.js'
import { AREAS, AREA_PRODUCT_SLUGS } from '../src/data/areas.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'deliverables')

const url = (path) => `${SITE_URL}${path}`
const byKind = (...kinds) => ROUTES.filter((r) => kinds.includes(r.kind))

/**
 * A readable label for a route.
 *
 * Route titles are written for Google and carry the brand and a keyword tail,
 * which reads badly in a list of 218 lines. The label is the human name of the
 * thing wherever the data can supply one, and the title trimmed at its first
 * separator otherwise.
 */
function label(r) {
  if (r.kind === 'product') return PRODUCT_BY_SLUG[r.params.product].name
  if (r.kind === 'variant') return VARIANT_BY_SLUG[r.params.variant].name
  return r.title.split(/\s*[|:]\s*/)[0]
}

async function main() {
  await mkdir(OUT, { recursive: true })

  const lines = []
  const add = (s = '') => lines.push(s)
  const seen = new Set()

  const section = (heading, routes) => {
    if (!routes.length) return
    add(`*${heading}*`)
    for (const r of routes) {
      seen.add(r.path)
      add(`${label(r)}: ${url(r.path)}`)
    }
    add()
  }

  add('*PayYou Advisory — the new website*')
  add(url('/'))
  add()
  add(`Every page below is live now. ${ROUTES.length} pages in total.`)
  add()

  section(
    'Main pages',
    byKind('home', 'loans-hub', 'lenders', 'about', 'careers', 'contact'),
  )
  section('Loan & insurance products', byKind('product'))

  // ── Variants, grouped under their parent product ─────────────────────────
  const variantRoutes = byKind('variant')
  if (variantRoutes.length) {
    add(`*Detailed pages by situation (${variantRoutes.length})*`)
    add('Written for the specific case rather than as one general page.')
    add()
    for (const p of PRODUCTS) {
      const family = variantsFor(p.slug)
      if (!family.length) continue
      add(`*${p.name} — in detail*`)
      for (const v of family) {
        seen.add(`/${v.slug}/`)
        add(`${v.name}: ${url(`/${v.slug}/`)}`)
      }
      add()
    }
  }

  section('Calculators', byKind(
    'calculators', 'calc-emi', 'calc-eligibility', 'calc-bt',
    'calc-emi-home', 'calc-emi-personal', 'calc-emi-business', 'calc-sip', 'calc-fd',
  ))
  section('Guides', byKind('resources', 'resource'))
  section('Blog', byKind('blog', 'post'))

  // ── The locality grid, grouped by product ────────────────────────────────
  const areaRoutes = byKind('product-area')
  if (areaRoutes.length) {
    add(`*Local pages (${areaRoutes.length})*`)
    add('Written for each area individually, not one page with the name swapped.')
    add()
    for (const slug of AREA_PRODUCT_SLUGS) {
      const product = PRODUCT_BY_SLUG[slug]
      add(`*${product.name} — by area*`)
      for (const area of AREAS) {
        const path = `/${slug}-${area.slug}/`
        seen.add(path)
        add(`${area.name}: ${url(path)}`)
      }
      add()
    }
  }

  section('Policies', byKind('legal'))

  add('*For Google Search Console*')
  add(`Site map: ${url('/sitemap.xml')}`)

  assertComplete(seen)

  const full = lines.join('\n')
  await writeFile(join(OUT, 'links-whatsapp.txt'), full, 'utf8')

  // ── The version actually worth sending ───────────────────────────────────
  const short = [
    '*PayYou Advisory — the new website*',
    url('/'),
    '',
    `${ROUTES.length} pages, all live. A few worth opening first:`,
    '',
    '*The products*',
    ...PRODUCTS.slice(0, 4).map((p) => `${p.name}: ${url(`/${p.slug}/`)}`),
    '',
    '*Written for a specific situation, not a general page*',
    `Personal loan for doctors: ${url('/personal-loan-for-doctors/')}`,
    `Business loan without ITR: ${url('/business-loan-without-itr/')}`,
    `Home loan balance transfer: ${url('/home-loan-balance-transfer/')}`,
    '',
    '*Local pages — one for every area we cover*',
    `Business loan in Bhosari: ${url('/business-loan-bhosari/')}`,
    `Gold loan in Baramati: ${url('/gold-loan-baramati/')}`,
    '',
    '*Calculators and guides*',
    `EMI: ${url('/emi-calculator/')}`,
    `Credit score guide: ${url('/credit-score/')}`,
    '',
    `Full list of all ${ROUTES.length} pages: ${url('/sitemap.xml')}`,
  ].join('\n')
  await writeFile(join(OUT, 'links-short.txt'), short, 'utf8')

  console.log(`\n✓ deliverables/links-whatsapp.txt   ${ROUTES.length} links, ${full.length.toLocaleString()} characters`)
  console.log(`✓ deliverables/links-short.txt      ${short.split('\n').length} lines\n`)

  // WhatsApp caps a single message at 65,536 characters.
  if (full.length > 65000) {
    console.warn('⚠ the full list exceeds one WhatsApp message and will need splitting\n')
  }
}

/**
 * Fail loudly if any route did not make it into the list.
 *
 * This is the whole point of the rewrite. A link list that is quietly 76 pages
 * short looks exactly like a complete one.
 */
function assertComplete(seen) {
  const missing = ROUTES.filter((r) => !seen.has(r.path))
  if (!missing.length) return
  console.error(`\n✗ ${missing.length} route(s) are not in the link list:`)
  missing.slice(0, 15).forEach((r) => console.error(`   ${r.path}  (kind: ${r.kind})`))
  if (missing.length > 15) console.error(`   …and ${missing.length - 15} more`)
  console.error('\n   Add the new `kind` to a section() call above.\n')
  process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
