/**
 * Writes the full page list as plain text, ready to paste into WhatsApp.
 *
 * Run with `npm run links`. Output: `deliverables/links-whatsapp.txt`, plus a
 * shorter `deliverables/links-short.txt`.
 *
 * ── Why generate it ────────────────────────────────────────────────────────
 * The list is built from `src/routes.js`, the same table that builds the site
 * and the sitemap. A hand-kept list of 137 URLs is out of date the first time
 * anyone adds a page, and a dead link sent to a client is worse than no link.
 *
 * ── Why two files ──────────────────────────────────────────────────────────
 * The full list is what was asked for and it is genuinely useful as a record.
 * It is also 137 links, which lands in a WhatsApp thread as a wall of text that
 * nobody reads to the end. The short version says the same thing in fifteen
 * lines and points at the sitemap for the rest. Send the short one; keep the
 * long one for the record.
 *
 * ── Formatting ─────────────────────────────────────────────────────────────
 * WhatsApp renders *asterisks* as bold and linkifies bare URLs, so the https://
 * prefix is kept — a bare domain usually linkifies too, but not reliably when
 * it is the first thing on a line after a bold heading.
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from '../src/data/site.js'
import { ROUTES } from '../src/routes.js'
import { PRODUCTS, PRODUCT_BY_SLUG } from '../src/data/products.js'
import { AREAS, AREA_PRODUCT_SLUGS } from '../src/data/areas.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'deliverables')

const url = (path) => `${SITE_URL}${path}`
const routeTitle = (path) => ROUTES.find((r) => r.path === path)?.title ?? path

async function main() {
  await mkdir(OUT, { recursive: true })

  const lines = []
  const add = (s = '') => lines.push(s)

  add('*PayYou Advisory — the new website*')
  add(url('/'))
  add()
  add(`Every page below is live now. ${ROUTES.length} pages in total.`)
  add()

  // ── Main pages ───────────────────────────────────────────────────────────
  add('*Main pages*')
  for (const [label, path] of [
    ['Home', '/'],
    ['All loans compared', '/loans/'],
    ['Our lender panel', '/lenders/'],
    ['About PayYou', '/about/'],
    ['Careers', '/careers/'],
    ['Contact', '/contact/'],
    ['Questions answered', '/faq/'],
  ]) {
    add(`${label}: ${url(path)}`)
  }
  add()

  // ── Products ─────────────────────────────────────────────────────────────
  add(`*Loan & insurance products (${PRODUCTS.length})*`)
  for (const p of PRODUCTS) add(`${p.name}: ${url(`/${p.slug}/`)}`)
  add()

  // ── Calculators ──────────────────────────────────────────────────────────
  add('*Calculators*')
  for (const [label, path] of [
    ['EMI calculator', '/emi-calculator/'],
    ['Eligibility calculator', '/eligibility-calculator/'],
    ['Balance transfer calculator', '/balance-transfer-calculator/'],
    ['All three', '/calculators/'],
  ]) {
    add(`${label}: ${url(path)}`)
  }
  add()

  // ── The locality grid, grouped by product ────────────────────────────────
  add(`*Local pages (${AREA_PRODUCT_SLUGS.length * AREAS.length})*`)
  add('Written for each area individually, not one page with the name swapped.')
  add()
  for (const slug of AREA_PRODUCT_SLUGS) {
    const product = PRODUCT_BY_SLUG[slug]
    add(`*${product.name} — by area*`)
    for (const area of AREAS) add(`${area.name}: ${url(`/${slug}-${area.slug}/`)}`)
    add()
  }

  // ── Policies ─────────────────────────────────────────────────────────────
  add('*Policies*')
  for (const [label, path] of [
    ['Privacy policy', '/privacy-policy/'],
    ['Terms of use', '/terms/'],
    ['Disclaimer', '/disclaimer/'],
    ['Cookie policy', '/cookie-policy/'],
    ['Grievance redressal', '/grievance-redressal/'],
    ['Photo credits', '/photo-credits/'],
  ]) {
    add(`${label}: ${url(path)}`)
  }
  add()
  add('*For Google Search Console*')
  add(`Site map: ${url('/sitemap.xml')}`)

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
    '*Local pages — one for every area we cover*',
    `Business loan in Bhosari: ${url('/business-loan-bhosari/')}`,
    `Home loan in Hinjewadi: ${url('/home-loan-hinjewadi/')}`,
    `Gold loan in Baramati: ${url('/gold-loan-baramati/')}`,
    `Loan against property in Chakan: ${url('/loan-against-property-chakan/')}`,
    '',
    '*The calculators*',
    `EMI: ${url('/emi-calculator/')}`,
    `What you could borrow: ${url('/eligibility-calculator/')}`,
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

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
