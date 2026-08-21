/**
 * Single source of truth for PayYou Advisory's business facts.
 *
 * Every phone number, address and headline figure on the site reads from here,
 * so a detail changes in exactly one place and stays identical across the nav,
 * the hero, the contact block, the footer, the sticky call bar, all ~100
 * generated pages and every JSON-LD block.
 *
 * That last part matters more than it sounds. Google cross-checks a business's
 * name/address/phone against its Google Business Profile and every directory
 * listing it can find; a mismatch quietly costs local ranking, and in a YMYL
 * category — which lending very much is — inconsistency also reads as a
 * trust failure to a human. `npm run audit:seo` asserts the phone number and
 * postal code from this file appear on every built page.
 *
 * Values transcribed from payyouadvisory.com as published on 2026-08-21.
 */

/**
 * The canonical origin — the single place the deployed domain is written.
 *
 * Everything derives from this: every page's `<link rel="canonical">`, the
 * hreflang pair, the Open Graph URLs, every `@id` and `url` in the JSON-LD,
 * `sitemap.xml`, `robots.txt` and `llms.txt`. `npm run audit:seo` fails the
 * build if a canonical does not match `SITE_URL + path`, so a half-finished
 * domain change cannot ship.
 *
 * ── TODO(client), before the real launch ────────────────────────────────────
 * This currently points at the Vercel deployment. When payyouadvisory.com is
 * pointed at this site, change the line below back to
 * `https://payyouadvisory.com` and update the two `www` redirect entries in
 * vercel.json to match. That is the whole change.
 *
 * Worth doing promptly. While this address is live and indexable it is a
 * complete copy of what will eventually sit on payyouadvisory.com, and two
 * identical sites competing for the same searches is a duplicate-content
 * problem that costs both of them. Either finish the domain move, or ask and
 * I will add `noindex` to the Vercel deployment until you do.
 */
export const SITE_URL = 'https://pay-you-advisory.vercel.app'

export const COMPANY = {
  name: 'PayYou Advisory Private Limited',
  shortName: 'PayYou Advisory',
  /** The parent group. Named on the site because it is the strongest E-E-A-T signal available. */
  parent: 'Kay Bee Bio-Organics Private Limited',
  /**
   * What PayYou actually is. Stated in the footer of every page and in the
   * disclosure block on every product page — see DESIGN.md § Copy. Getting
   * this wrong is not a style problem, it is a regulatory one.
   */
  role: 'Direct Selling Agent (DSA) / loan referral and advisory',
  incorporated: 'January 2026',

  // TODO(client): supply the CIN and, if the insurance vertical is sold under
  // an IRDAI licence, the licence number. Both belong in the footer — a
  // registration number a reader can verify is worth more than any adjective
  // on the page, and in a YMYL category Google's raters look for exactly this.
  cin: null,
  irdaiLicence: null,
  gstin: null,
}

export const CONTACT = {
  /** Landline first: it is the number the Google Business Profile is verified on. */
  landline: '02027350055',
  landlineDisplay: '020 2735 0055',
  mobile: '9175535507',
  email: 'info@payyouadvisory.com',
  whatsapp: '919175535507',

  hours: 'Mon – Sat · 9:30 am – 6:30 pm',
  hoursSpec: { opens: '09:30', closes: '18:30' },
  closedOn: ['Sunday'],
}

/**
 * Three addresses, three different jobs. The corporate office is the one that
 * carries the Google Business Profile and therefore the one in the LocalBusiness
 * JSON-LD; the other two are additional `Place` entries, not duplicates of the
 * primary listing. Listing three offices as three LocalBusinesses on one page
 * is a classic way to get a local listing suppressed.
 */
export const OFFICES = [
  {
    id: 'pcmc',
    kind: 'Corporate office',
    primary: true,
    lines: [
      'Office No. 3, 4, 5 & 6, Vishal Arcade,',
      'Chapekar Chowk, Opp. Sonigara Jewellers,',
      'Pimpri Chinchwad, Haveli, Pune 411033',
    ],
    locality: 'Chinchwad',
    city: 'Pune',
    region: 'MH',
    postalCode: '411033',
    country: 'IN',
    // TODO(client): replace with the exact pin from the verified Google Business
    // Profile. These coordinates are Chapekar Chowk, Chinchwad — close, but the
    // geo tag should match the GBP pin to the decimal or it weakens the listing.
    geo: { lat: 18.6437, lng: 73.7997 },
    mapEmbed:
      'https://www.google.com/maps?q=Vishal+Arcade,+Chapekar+Chowk,+Chinchwad,+Pimpri-Chinchwad,+Pune,+411033&output=embed',
    directions:
      'https://www.google.com/maps/search/?api=1&query=PayYou+Advisory+Vishal+Arcade+Chapekar+Chowk+Chinchwad+Pune+411033',
  },
  {
    id: 'baramati',
    kind: 'Branch office',
    primary: false,
    lines: ['Bhigwan Chowk,', 'Baramati, Dist. Pune 413102'],
    locality: 'Baramati',
    city: 'Baramati',
    region: 'MH',
    postalCode: '413102',
    country: 'IN',
    geo: { lat: 18.1514, lng: 74.5815 },
    directions:
      'https://www.google.com/maps/search/?api=1&query=Bhigwan+Chowk+Baramati+Pune+413102',
  },
  {
    id: 'phaltan',
    kind: 'Registered office',
    primary: false,
    lines: ['Plot No. 92, Laxmi Nagar,', 'Phaltan, Dist. Satara 415523'],
    locality: 'Phaltan',
    city: 'Phaltan',
    region: 'MH',
    postalCode: '415523',
    country: 'IN',
    geo: { lat: 17.9885, lng: 74.4318 },
    directions:
      'https://www.google.com/maps/search/?api=1&query=Laxmi+Nagar+Phaltan+Satara+415523',
  },
]

export const PRIMARY_OFFICE = OFFICES[0]

/**
 * Headline figures.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * TODO(client) — RESOLVE BEFORE LAUNCH. The current site contradicts itself:
 * the homepage advertises "5 years of experience" and "100+ loans processed",
 * while the About page states the company was incorporated in January 2026 and
 * has served "50+ customers". Both cannot be true.
 *
 * The conservative set is used below, because in a YMYL category a claim a
 * reader can disprove costs more than a smaller true number earns — and
 * "incorporated 2026" is a matter of public record at the MCA. If the five
 * years refers to the founding team's experience rather than the company's,
 * say exactly that: "a team with 5+ years in lending" is both true and
 * stronger than an ambiguous badge.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const STATS = [
  { value: '₹20 Cr+', label: 'Loans facilitated', note: 'Disbursed through partner lenders' },
  { value: '25+', label: 'Bank & NBFC partners', note: 'One profile, compared across all of them' },
  { value: '1', label: 'Credit enquiry', note: 'However many lenders we approach' },
  { value: '3', label: 'Offices in Maharashtra', note: 'Chinchwad · Baramati · Phaltan' },
]

/**
 * Deliberately false. The business has no verified review corpus yet, and
 * publishing an `aggregateRating` the business has not earned is a Google
 * structured-data violation that can earn a manual action — as well as being
 * the kind of claim a customer can catch. Flip `show` and fill in the real
 * numbers once the Google Business Profile has reviews; the rating then appears
 * in the trust band and the JSON-LD automatically.
 */
export const RATING = { show: false, score: null, count: null }

/**
 * Published testimonials.
 *
 * Exactly one, because exactly one is published on payyouadvisory.com today.
 * The temptation on a redesign is to invent three more — a smiling stock
 * portrait, a plausible name, a sentence about "seamless service" — and it is
 * worth naming why that is a bad trade rather than merely a dishonest one: a
 * fabricated review is the single easiest claim on a financial site to check,
 * the stock portrait is reverse-image-searchable in about four seconds, and
 * being caught costs more than the extra two quotes could ever earn.
 *
 * The section renders one quote and says plainly that it is the only verified
 * one. That reads as confidence rather than as thinness — and it gives the
 * client an obvious reason to go and collect real Google reviews, which is the
 * highest-return marketing action available to them.
 *
 * TODO(client): as the Google Business Profile fills up, add verified reviews
 * here — name, locality, product, and the date. Then flip RATING.show above.
 */
export const TESTIMONIALS = [
  {
    quote:
      'The digital integration made the entire process faster and easier, and gave me the flexibility to work remotely.',
    name: 'Mr. Sher Singh',
    role: 'Wealth Advisor',
    place: 'Pune',
    verified: true,
  },
]

/**
 * Primary navigation. `children` renders as a mega-menu panel on desktop and a
 * disclosure on mobile — the same data, two presentations, one source.
 */
export const NAV = [
  {
    label: 'Borrow',
    href: '/loans/',
    children: [
      { label: 'Personal Loan', href: '/personal-loan/', meta: 'Unsecured · 12–60 months' },
      { label: 'Business Loan', href: '/business-loan/', meta: 'From 10.50% p.a. · up to ₹2 Cr' },
      { label: 'Home Loan', href: '/home-loan/', meta: '75–90% of property value' },
      { label: 'Loan Against Property', href: '/loan-against-property/', meta: 'Secured · up to 20 years' },
      { label: 'Car Loan', href: '/car-loan/', meta: 'New & used vehicles' },
      { label: 'Gold Loan', href: '/gold-loan/', meta: 'Same-day disbursal' },
      { label: 'Working Capital & LRD', href: '/working-capital-loan/', meta: 'For established businesses' },
    ],
  },
  {
    label: 'Protect',
    href: '/insurance/',
    children: [
      { label: 'Insurance Plans', href: '/insurance/', meta: 'Life · health · motor · property' },
    ],
  },
  {
    label: 'Tools',
    href: '/calculators/',
    children: [
      { label: 'EMI Calculator', href: '/emi-calculator/', meta: 'With full amortisation' },
      { label: 'Eligibility Check', href: '/eligibility-calculator/', meta: 'What you could borrow' },
      { label: 'Balance Transfer Saving', href: '/balance-transfer-calculator/', meta: 'What a switch would save' },
      { label: 'All calculators', href: '/calculators/', meta: '' },
    ],
  },
  { label: 'Lenders', href: '/lenders/' },
  { label: 'About', href: '/about/' },
  { label: 'Careers', href: '/careers/' },
  { label: 'Contact', href: '/contact/' },
]

/** Format a bare 10-digit mobile as a readable +91 string. */
export const fmtMobile = (p) => `+91 ${p.replace(/(\d{5})(\d{5})/, '$1 $2')}`

/** Build a click-to-chat WhatsApp URL with a pre-filled message. */
export const waLink = (text) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`

export const WA_DEFAULT =
  'Hi PayYou Advisory, I saw your website. I would like to check my eligibility for a '
