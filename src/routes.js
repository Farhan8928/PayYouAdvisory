/**
 * The route table — the single source of truth for what pages exist.
 *
 * Every consumer reads from here: the client router, the build-time
 * prerenderer, the sitemap generator, the footer's link columns and the SEO
 * audit. Adding a route adds it everywhere at once, with its `<head>`, its
 * breadcrumbs and its structured data attached — which is the point. The
 * alternative, a page component that also owns its own meta tags, is how sites
 * end up with three pages sharing one canonical and nobody noticing.
 *
 * Each route carries everything the prerenderer needs to write a complete
 * `<head>`, because at build time there is no browser and no document to mutate.
 */
import { PRODUCTS, PRODUCT_BY_SLUG, PROCESS } from './data/products.js'
import { AREAS, AREA_BY_SLUG, AREA_PRODUCT_SLUGS } from './data/areas.js'
import { ALL_FAQS } from './data/faqs.js'
import { LEGAL_PAGES } from './data/legal.js'
import { COMPANY } from './data/site.js'
import {
  organisationSchema,
  localBusinessSchema,
  productSchema,
  faqSchema,
  breadcrumbSchema,
  howToSchema,
  itemListSchema,
} from './lib/schema.js'
import { LENDERS } from './data/lenders.js'

const HOME_CRUMB = { label: 'Home', href: '/' }

/** Trim a description to what Google will actually render, on a word boundary. */
const clip = (s, n = 158) =>
  s.length <= n ? s : `${s.slice(0, s.lastIndexOf(' ', n - 1))}…`

function route(r) {
  return {
    priority: '0.6',
    changefreq: 'monthly',
    jsonLd: [],
    breadcrumbs: [HOME_CRUMB],
    ...r,
    description: clip(r.description),
  }
}

// ── Static routes ──────────────────────────────────────────────────────────

const staticRoutes = [
  route({
    path: '/',
    kind: 'home',
    priority: '1.0',
    changefreq: 'weekly',
    title: 'Loan Advisory in Pune & PCMC — 25+ Lenders | PayYou Advisory',
    description:
      'PayYou Advisory compares your profile across 25+ banks and NBFCs, then applies to one. Personal, business, home, property, car and gold loans in Pune and Pimpri-Chinchwad. One credit enquiry, not twenty-five.',
    keywords: [
      'loan advisory Pune',
      'loan DSA Pune',
      'personal loan Pune',
      'business loan Pune',
      'home loan Pimpri Chinchwad',
      'loan against property Pune',
      'loan agent Chinchwad',
      'loan consultant PCMC',
    ],
    breadcrumbs: [HOME_CRUMB],
    jsonLd: [organisationSchema(), localBusinessSchema(), howToSchema(PROCESS)],
  }),

  route({
    path: '/loans/',
    kind: 'loans-hub',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Loans in Pune & PCMC — Compare Every Product | PayYou Advisory',
    description:
      'Every loan we place, side by side: personal, business, home, loan against property, car, gold and working capital. Rates, amounts, tenures and what each one is actually for.',
    keywords: ['loan products Pune', 'types of loans Pune', 'compare loans PCMC', 'loan advisory services Pune'],
    breadcrumbs: [HOME_CRUMB, { label: 'Loans', href: '/loans/' }],
    jsonLd: [
      itemListSchema(
        'Loan products',
        PRODUCTS.map((p) => ({ name: p.name, href: `/${p.slug}/` })),
      ),
      breadcrumbSchema([HOME_CRUMB, { label: 'Loans', href: '/loans/' }]),
    ],
  }),

  route({
    path: '/lenders/',
    kind: 'lenders',
    priority: '0.8',
    title: 'Our Bank & NBFC Panel — 25+ Lending Partners | PayYou Advisory',
    description:
      'The banks and NBFCs we place files with, and what each is actually good for. Why a panel beats a single lender, and how we are paid.',
    keywords: ['loan DSA partners Pune', 'bank NBFC partners', 'loan partners Pimpri Chinchwad', 'NBFC loan Pune'],
    breadcrumbs: [HOME_CRUMB, { label: 'Lenders', href: '/lenders/' }],
    jsonLd: [
      itemListSchema('Lending partners', LENDERS.map((l) => ({ name: l.name }))),
      breadcrumbSchema([HOME_CRUMB, { label: 'Lenders', href: '/lenders/' }]),
    ],
  }),

  route({
    path: '/about/',
    kind: 'about',
    priority: '0.8',
    title: `About ${COMPANY.shortName} — A Kay Bee Bio-Organics Venture`,
    description:
      'PayYou Advisory is a Pune loan advisory and Direct Selling Agent, a venture of Kay Bee Bio-Organics. What we do, what we do not do, how we are paid, and who runs it.',
    keywords: ['PayYou Advisory company', 'loan advisory company Pune', 'Kay Bee Bio-Organics', 'DSA company Pune'],
    breadcrumbs: [HOME_CRUMB, { label: 'About', href: '/about/' }],
    jsonLd: [organisationSchema(), breadcrumbSchema([HOME_CRUMB, { label: 'About', href: '/about/' }])],
  }),

  route({
    path: '/careers/',
    kind: 'careers',
    priority: '0.6',
    title: 'Financial Advisor & Loan Officer Jobs in Pune | PayYou Advisory',
    description:
      'Work in lending in Pune and Pimpri-Chinchwad. Roles for relationship managers, credit officers and financial advisors, including openings for graduates with no prior banking experience.',
    keywords: [
      'financial advisor jobs Pune',
      'loan officer jobs Pimpri Chinchwad',
      'DSA jobs Pune',
      'banking jobs Chinchwad',
      'relationship manager jobs Pune',
    ],
    breadcrumbs: [HOME_CRUMB, { label: 'Careers', href: '/careers/' }],
    jsonLd: [breadcrumbSchema([HOME_CRUMB, { label: 'Careers', href: '/careers/' }])],
  }),

  route({
    path: '/contact/',
    kind: 'contact',
    priority: '0.9',
    title: 'Contact PayYou Advisory — Chinchwad, Baramati & Phaltan',
    description:
      'Call 020 2735 0055 or +91 91755 35507. Office at Vishal Arcade, Chapekar Chowk, Chinchwad, Pune 411033. Branch offices in Baramati and Phaltan. Mon–Sat, 9:30 am – 6:30 pm.',
    keywords: [
      'PayYou Advisory contact',
      'loan agent Chapekar Chowk',
      'loan advisory Chinchwad address',
      'loan consultant Baramati',
      'loan agent Phaltan',
    ],
    breadcrumbs: [HOME_CRUMB, { label: 'Contact', href: '/contact/' }],
    jsonLd: [localBusinessSchema(), breadcrumbSchema([HOME_CRUMB, { label: 'Contact', href: '/contact/' }])],
  }),

  route({
    path: '/faq/',
    kind: 'faq',
    priority: '0.7',
    title: 'Loan Questions Answered — CIBIL & Costs | PayYou Advisory',
    description:
      'Straight answers on eligibility, low CIBIL scores, cash income, what a DSA charges, how long a file takes, and what actually delays one. No sales copy.',
    keywords: [
      'loan FAQ India',
      'low CIBIL score loan Pune',
      'cash salary loan eligibility',
      'DSA charges loan',
      'loan documents required Pune',
    ],
    breadcrumbs: [HOME_CRUMB, { label: 'FAQ', href: '/faq/' }],
    jsonLd: [faqSchema(ALL_FAQS), breadcrumbSchema([HOME_CRUMB, { label: 'FAQ', href: '/faq/' }])],
  }),

  route({
    path: '/calculators/',
    kind: 'calculators',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Loan Calculators — EMI & Eligibility | PayYou Advisory',
    description:
      'Work out an EMI with the full amortisation, what you could actually borrow at your income, and whether a balance transfer would save anything. Everything runs in your browser.',
    keywords: ['EMI calculator India', 'loan eligibility calculator', 'balance transfer calculator', 'home loan EMI calculator Pune'],
    breadcrumbs: [HOME_CRUMB, { label: 'Calculators', href: '/calculators/' }],
    jsonLd: [breadcrumbSchema([HOME_CRUMB, { label: 'Calculators', href: '/calculators/' }])],
  }),

  route({
    path: '/photo-credits/',
    kind: 'credits',
    priority: '0.2',
    changefreq: 'yearly',
    title: 'Photography credits | PayYou Advisory',
    description:
      'Every photograph on this site, its licence and its source. All images are licensed under the Unsplash License and served from our own origin.',
    keywords: [],
    breadcrumbs: [HOME_CRUMB, { label: 'Photo credits', href: '/photo-credits/' }],
    jsonLd: [breadcrumbSchema([HOME_CRUMB, { label: 'Photo credits', href: '/photo-credits/' }])],
  }),

  route({
    path: '/emi-calculator/',
    kind: 'calc-emi',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'EMI Calculator with Full Amortisation Schedule | PayYou Advisory',
    description:
      'Enter an amount, a rate and a tenure. See the EMI, the total interest, the year-by-year split of principal against interest, and what paying a little extra each month would save.',
    keywords: ['EMI calculator', 'loan EMI calculator India', 'amortisation schedule calculator', 'home loan EMI calculator'],
    breadcrumbs: [
      HOME_CRUMB,
      { label: 'Calculators', href: '/calculators/' },
      { label: 'EMI Calculator', href: '/emi-calculator/' },
    ],
    jsonLd: [
      breadcrumbSchema([
        HOME_CRUMB,
        { label: 'Calculators', href: '/calculators/' },
        { label: 'EMI Calculator', href: '/emi-calculator/' },
      ]),
    ],
  }),

  route({
    path: '/eligibility-calculator/',
    kind: 'calc-eligibility',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Loan Eligibility Calculator — How Much? | PayYou Advisory',
    description:
      'An indicative borrowing figure from your net income, your existing EMIs and the tenure — worked the way a lender does it, on the fixed-obligation-to-income ratio.',
    keywords: ['loan eligibility calculator', 'how much loan can I get', 'FOIR calculator', 'personal loan eligibility India'],
    breadcrumbs: [
      HOME_CRUMB,
      { label: 'Calculators', href: '/calculators/' },
      { label: 'Eligibility', href: '/eligibility-calculator/' },
    ],
    jsonLd: [
      breadcrumbSchema([
        HOME_CRUMB,
        { label: 'Calculators', href: '/calculators/' },
        { label: 'Eligibility', href: '/eligibility-calculator/' },
      ]),
    ],
  }),

  route({
    path: '/balance-transfer-calculator/',
    kind: 'calc-bt',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'Balance Transfer Calculator — Real Saving | PayYou Advisory',
    description:
      'Models the real saving on a loan balance transfer, net of processing fees, valuation and stamp duty — not just the difference between two interest rates.',
    keywords: ['balance transfer calculator', 'home loan balance transfer saving', 'loan transfer calculator India'],
    breadcrumbs: [
      HOME_CRUMB,
      { label: 'Calculators', href: '/calculators/' },
      { label: 'Balance Transfer', href: '/balance-transfer-calculator/' },
    ],
    jsonLd: [
      breadcrumbSchema([
        HOME_CRUMB,
        { label: 'Calculators', href: '/calculators/' },
        { label: 'Balance Transfer', href: '/balance-transfer-calculator/' },
      ]),
    ],
  }),
]

// ── Product routes ─────────────────────────────────────────────────────────

const productRoutes = PRODUCTS.map((p) => {
  const crumbs = [HOME_CRUMB, { label: 'Loans', href: '/loans/' }, { label: p.name, href: `/${p.slug}/` }]
  return route({
    path: `/${p.slug}/`,
    kind: 'product',
    params: { product: p.slug },
    priority: '0.9',
    changefreq: 'weekly',
    title: p.seo.title,
    description: p.seo.description,
    keywords: p.seo.keywords,
    breadcrumbs: crumbs,
    jsonLd: [productSchema(p), faqSchema(p.faqs), breadcrumbSchema(crumbs)],
  })
})

// ── Product x area routes ──────────────────────────────────────────────────
//
// The grid that makes this site rank for "personal loan in Hinjewadi" rather
// than only for "personal loan Pune". See the long note at the top of
// src/data/areas.js on why these are not doorway pages — each one is built
// around that area's own borrower profile and that product's own local problem.
//
// Only the FAQ block is shared with the product hub, and the hub carries the
// canonical `FAQPage`; the area pages deliberately do not, so the same six
// questions are not offered to Google 112 times.

const areaRoutes = AREA_PRODUCT_SLUGS.flatMap((slug) => {
  const p = PRODUCT_BY_SLUG[slug]
  return AREAS.map((a) => {
    const crumbs = [
      HOME_CRUMB,
      { label: 'Loans', href: '/loans/' },
      { label: p.name, href: `/${p.slug}/` },
      { label: a.name, href: `/${p.slug}-${a.slug}/` },
    ]
    return route({
      path: `/${p.slug}-${a.slug}/`,
      kind: 'product-area',
      params: { product: p.slug, area: a.slug },
      priority: a.home || a.branch ? '0.7' : '0.6',
      title: areaTitle(p, a),
      description: `${p.name} for ${a.name} borrowers — ${a.relevance[p.slug]}`,
      keywords: [
        `${p.name.toLowerCase()} ${a.name}`,
        `${p.name.toLowerCase()} in ${a.name}`,
        `loan agent ${a.name}`,
        `${p.shortName.toLowerCase()} loan ${a.name} ${a.pincodes[0]}`,
        `loan DSA ${a.name}`,
      ],
      breadcrumbs: crumbs,
      jsonLd: [productSchema(p, { area: a }), breadcrumbSchema(crumbs)],
    })
  })
})

/**
 * Build a locality page title inside Google's rendering width.
 *
 * Google truncates a title at roughly 60 characters, and a truncated title in a
 * result costs clicks. "Working Capital & LRD in Talegaon Dabhade, Satara |
 * PayYou Advisory" is 68 and would be cut mid-brand.
 *
 * So the parts are shed in order of what a searcher can most afford to lose:
 * the district first — someone searching "business loan Bhosari" already knows
 * which district Bhosari is in — then the "Advisory" half of the brand, which
 * is still unambiguous next to "PayYou". The product and the locality are the
 * two things that must survive, and they always do: the longest possible pair
 * is "Loan Against Property in Talegaon Dabhade | PayYou" at 50.
 */
function areaTitle(p, a) {
  const candidates = [
    `${p.name} in ${a.name}, ${a.district} | PayYou Advisory`,
    `${p.name} in ${a.name} | PayYou Advisory`,
    `${p.name} in ${a.name} | PayYou`,
  ]
  return candidates.find((t) => t.length <= 62) ?? candidates[candidates.length - 1]
}

// ── Legal routes ───────────────────────────────────────────────────────────

const legalRoutes = LEGAL_PAGES.map((l) => {
  const crumbs = [HOME_CRUMB, { label: l.title, href: `/${l.slug}/` }]
  return route({
    path: `/${l.slug}/`,
    kind: 'legal',
    params: { legal: l.slug },
    priority: '0.3',
    changefreq: 'yearly',
    title: `${l.title} | ${COMPANY.shortName}`,
    description: l.description,
    keywords: [],
    breadcrumbs: crumbs,
    jsonLd: [breadcrumbSchema(crumbs)],
  })
})

// ── Legacy redirects ───────────────────────────────────────────────────────
//
// The previous site's URLs, mapped to their replacements. These are emitted
// into vercel.json rather than served as pages: a 301 passes the accumulated
// link equity on, where a 404 throws it away. Every one of these appears in
// the old sitemap and is therefore already in Google's index.

export const LEGACY_REDIRECTS = [
  { from: '/financial-services/', to: '/loans/' },
  { from: '/financial-services/personal-loan-pune/', to: '/personal-loan/' },
  { from: '/financial-services/business-loan-pune/', to: '/business-loan/' },
  { from: '/financial-services/home-loan-pune/', to: '/home-loan/' },
  { from: '/financial-services/loan-against-property-pune/', to: '/loan-against-property/' },
  { from: '/financial-services/insurance-plans-pune/', to: '/insurance/' },
  { from: '/payyou-advisory-company/', to: '/about/' },
  { from: '/financial-advisor-jobs-pune/', to: '/careers/' },
  { from: '/bank-nbfc-loan-partners/', to: '/lenders/' },
  { from: '/banks/', to: '/lenders/' },
  { from: '/nbfc/', to: '/lenders/' },
  { from: '/blog/', to: '/faq/' },
]

export const ROUTES = [...staticRoutes, ...productRoutes, ...areaRoutes, ...legalRoutes]

export const ROUTE_BY_PATH = Object.fromEntries(ROUTES.map((r) => [r.path, r]))

/**
 * Resolve a URL path to a route.
 *
 * Normalises a missing trailing slash so `/about` and `/about/` render the same
 * page in development. In production `vercel.json` sets `trailingSlash: true`
 * and redirects the bare form, so only one of the two is ever canonical — but
 * the dev server does not, and having them diverge locally hides real bugs.
 */
export function resolve(pathname) {
  const clean = pathname.split('?')[0].split('#')[0]
  const withSlash = clean.endsWith('/') ? clean : `${clean}/`
  return ROUTE_BY_PATH[withSlash] ?? null
}
