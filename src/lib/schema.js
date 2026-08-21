/**
 * JSON-LD builders.
 *
 * Structured data is generated from the same objects that render the page, so
 * the markup and the schema cannot disagree. That is the whole reason this file
 * exists rather than the JSON being pasted into each page: hand-maintained
 * JSON-LD drifts from the visible content within about two edits, and a schema
 * describing content that is not on the page is a spam signal rather than a
 * ranking one.
 *
 * `npm run audit:seo` parses every block on every built page and fails the
 * build if one does not parse, or if an `aggregateRating` appears — see
 * RATING in src/data/site.js for why that one is singled out.
 */
import { SITE_URL, COMPANY, CONTACT, OFFICES, PRIMARY_OFFICE, RATING } from '../data/site.js'
import { ALL_PINCODES, AREAS } from '../data/areas.js'
import { LENDERS } from '../data/lenders.js'

const abs = (path) => `${SITE_URL}${path}`

/** Stable @id values, so blocks across pages reference one another properly. */
export const ID = {
  org: `${SITE_URL}/#organization`,
  business: `${SITE_URL}/#business`,
  website: `${SITE_URL}/#website`,
}

/**
 * The organisation. `FinancialService` rather than `Organization` because it
 * is the closest schema.org type to what PayYou does, and `additionalType`
 * carries the more specific idea that it is an intermediary rather than a
 * lender. `parentOrganization` is not decoration: naming Kay Bee Bio-Organics
 * is the strongest verifiable-entity signal available to a company this young.
 */
export function organisationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': ID.org,
    name: COMPANY.name,
    alternateName: [COMPANY.shortName, 'PayYou', 'PayYou Advisory Pvt Ltd'],
    additionalType: 'https://en.wikipedia.org/wiki/Loan_broker',
    description:
      'Loan advisory and Direct Selling Agent in Pune and Pimpri-Chinchwad. One application compared across 25+ partner banks and NBFCs for personal, business, home, property, car and gold loans, plus insurance.',
    url: abs('/'),
    logo: abs('/icon-512.png'),
    image: abs('/og-image.jpg'),
    email: CONTACT.email,
    telephone: `+91${CONTACT.landline.replace(/^0/, '')}`,
    foundingDate: '2026-01',
    parentOrganization: {
      '@type': 'Organization',
      name: COMPANY.parent,
    },
    address: postalAddress(PRIMARY_OFFICE),
    areaServed: areaServed(),
    knowsAbout: [
      'personal loan',
      'business loan',
      'MSME loan',
      'home loan',
      'housing finance',
      'loan against property',
      'lease rental discounting',
      'working capital finance',
      'car loan',
      'gold loan',
      'loan protection insurance',
      'CIBIL score',
      'loan eligibility',
      'balance transfer',
    ],
    // Naming the panel is a genuine trust signal and gives the crawler real
    // entities to associate the site with.
    memberOf: LENDERS.map((l) => ({ '@type': 'Organization', name: l.name })),
    sameAs: [],
    // Deliberately no aggregateRating. See RATING in src/data/site.js.
    ...(RATING.show && RATING.score
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: RATING.score,
            reviewCount: RATING.count,
          },
        }
      : {}),
  }
}

/**
 * The physical office that carries the Google Business Profile.
 *
 * Only the primary office is a LocalBusiness. The Baramati and Phaltan offices
 * are listed as `location` Places instead — publishing three LocalBusiness
 * blocks on one page is a well-known way to get a local listing suppressed,
 * because it looks like an attempt to claim three listings from one page.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': ID.business,
    name: COMPANY.name,
    parentOrganization: { '@id': ID.org },
    url: abs('/'),
    telephone: `+91${CONTACT.landline.replace(/^0/, '')}`,
    email: CONTACT.email,
    image: abs('/og-image.jpg'),
    priceRange: 'Advisory service — fee paid by the lender on disbursal',
    currenciesAccepted: 'INR',
    address: postalAddress(PRIMARY_OFFICE),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: PRIMARY_OFFICE.geo.lat,
      longitude: PRIMARY_OFFICE.geo.lng,
    },
    hasMap: PRIMARY_OFFICE.directions,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: CONTACT.hoursSpec.opens,
        closes: CONTACT.hoursSpec.closes,
      },
    ],
    location: OFFICES.filter((o) => !o.primary).map((o) => ({
      '@type': 'Place',
      name: `${COMPANY.shortName} — ${o.kind}`,
      address: postalAddress(o),
    })),
    areaServed: areaServed(),
  }
}

const postalAddress = (office) => ({
  '@type': 'PostalAddress',
  streetAddress: office.lines.join(' ').replace(/,$/, ''),
  addressLocality: office.city,
  addressRegion: office.region,
  postalCode: office.postalCode,
  addressCountry: office.country,
})

/**
 * Every locality and pincode we claim. Pincodes matter here: they are how a
 * search engine resolves "near me" for a service business without a shopfront
 * in every one of these areas.
 */
const areaServed = () => [
  { '@type': 'City', name: 'Pune' },
  { '@type': 'City', name: 'Pimpri-Chinchwad' },
  ...AREAS.map((a) => ({ '@type': 'Place', name: `${a.name}, ${a.district}` })),
  ...ALL_PINCODES.map((p) => ({ '@type': 'PostalCodeRangeSpecification', postalCodeBegin: p, postalCodeEnd: p })),
]

/**
 * A loan product.
 *
 * `LoanOrCredit` carries `annualPercentageRate` and `amount`, and both are
 * omitted rather than guessed when the client has not published a figure — a
 * schema claiming a rate the business does not offer is worse than no schema.
 */
export function productSchema(product, { area } = {}) {
  const name = area ? `${product.name} in ${area.name}` : product.name
  const path = area ? `/${product.slug}-${area.slug}/` : `/${product.slug}/`

  return {
    '@context': 'https://schema.org',
    '@type': product.slug === 'insurance' ? 'FinancialProduct' : 'LoanOrCredit',
    name,
    description: product.seo.description,
    url: abs(path),
    provider: { '@id': ID.org },
    areaServed: area
      ? { '@type': 'Place', name: `${area.name}, ${area.district}` }
      : [
          { '@type': 'City', name: 'Pune' },
          { '@type': 'City', name: 'Pimpri-Chinchwad' },
        ],
    ...(product.spec.rateFrom
      ? {
          annualPercentageRate: {
            '@type': 'QuantitativeValue',
            minValue: product.spec.rateFrom,
            unitText: 'PERCENT',
          },
        }
      : {}),
    ...(product.spec.amountMax
      ? {
          amount: {
            '@type': 'MonetaryAmount',
            currency: 'INR',
            maxValue: product.spec.amountMax,
          },
        }
      : {}),
    ...(product.category === 'unsecured'
      ? { requiredCollateral: 'None' }
      : product.spec.security
        ? { requiredCollateral: product.spec.security }
        : {}),
    feesAndCommissionsSpecification: abs('/terms/'),
  }
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: abs(c.href),
    })),
  }
}

export function howToSchema(steps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to apply for a loan through PayYou Advisory',
    description:
      'One application compared across 25+ partner banks and NBFCs, submitted to a single shortlisted lender so your credit report carries one enquiry rather than many.',
    totalTime: 'P2D',
    supply: [{ '@type': 'HowToSupply', name: 'PAN, Aadhaar, income proof and recent bank statements' }],
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
      url: abs(`/#process-${s.step}`),
    })),
  }
}

export function itemListSchema(name, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: it.href ? abs(it.href) : undefined,
    })),
  }
}
