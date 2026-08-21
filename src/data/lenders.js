/**
 * The lender panel.
 *
 * ── On the logos ────────────────────────────────────────────────────────────
 * An earlier version of this site rendered the panel as a typographic index
 * with no logos at all, arguing that a wall of borrowed marks implies an
 * endorsement a DSA arrangement does not confer, and that in practice it always
 * ships as a row of mismatched scraped PNGs.
 *
 * The client asked for logos, twice. That is their call to make — and the
 * files below are *their own*, already published on payyouadvisory.com for
 * exactly this purpose, so the sourcing question answers itself.
 *
 * The second objection was real and is dealt with rather than argued about:
 * `scripts/fetch-logos.mjs` trims every mark of its dead space and centres it
 * in an identical box, and `LenderWall` renders the wall greyscale at rest with
 * colour restored on hover. That is the standard technique for making twelve
 * heterogeneous marks read as one set, and it is why this wall does not look
 * scraped.
 *
 * `logo` is the output name; `logoFile` is the file on the client's server.
 * Five partners have no logo file published — they appear in the named index
 * below the wall, which is honest and reads as complete.
 *
 * TODO(client): confirm each lender's DSA agreement permits use of its mark on
 * marketing material. Most do; a few require prior written approval of the
 * creative. This is a five-minute question to your relationship manager and it
 * is worth asking before launch.
 *
 * ── On the count ────────────────────────────────────────────────────────────
 * The site claims "25+ lending partners", which is the client's own published
 * figure. Seventeen are named below because seventeen are named on
 * payyouadvisory.com. `PARTNER_COUNT_CLAIM` is kept separate from the array
 * length precisely so nobody later "fixes" the discrepancy by inventing eight
 * more banks.
 *
 * TODO(client): supply the full panel list. Every named lender is a searchable
 * entity and an E-E-A-T signal; eight unnamed ones are worth nothing.
 */

export const PARTNER_COUNT_CLAIM = '25+'

export const LENDERS = [
  // ── Banks ────────────────────────────────────────────────────────────────
  {
    name: 'HDFC Bank',
    type: 'bank',
    logo: 'hdfc-bank',
    logoFile: 'hdfc-bank.webp',
    // The source is a brand-guide sheet with a colour-swatch bar underneath
    // the mark. Keep the top 84% and the swatches go away.
    logoCrop: 0.84,
    note: 'Full retail range. Strong on salaried profiles in top employer categories.',
  },
  {
    name: 'Axis Bank',
    type: 'bank',
    logo: 'axis-bank',
    logoFile: 'Axis-Bank-PNG-Logo-.png',
    note: 'Retail and MSME. Active on loan against property.',
  },
  {
    name: 'State Bank of India',
    type: 'bank',
    logo: 'sbi',
    logoFile: 'sbi-state-bank-of-india-logo-png_seeklogo-556507.png',
    note: 'The widest home loan reach in the country, and the deepest branch network in our districts.',
  },
  {
    name: 'Kotak Mahindra Bank',
    type: 'bank',
    logo: 'kotak',
    logoFile: 'RBI-Approves-Reappointment-of-C-S-Rajan-at-Kotak-Bank.webp',
    note: 'Retail and business banking, including working-capital facilities.',
  },
  {
    name: 'Yes Bank',
    type: 'bank',
    logo: 'yes-bank',
    logoFile: 'Yes-Bank-Logo-Vector.jpg',
    note: 'Retail and business lending.',
  },
  { name: 'ICICI Bank', type: 'bank', note: 'Broad retail and business lending; competitive on home loan balance transfers.' },
  { name: 'Union Bank of India', type: 'bank', note: 'Public sector. Home loans and MSME lending.' },
  { name: 'HSBC', type: 'bank', note: 'Selective, premium-segment retail lending.' },

  // ── NBFCs ────────────────────────────────────────────────────────────────
  {
    name: 'Bajaj Finance',
    type: 'nbfc',
    logo: 'bajaj-finance',
    logoFile: 'Bajaj_Finance_Logo_2025.svg.png',
    note: 'Fast unsecured personal and business lending; wide acceptance of profiles banks decline.',
  },
  {
    name: 'Tata Capital',
    type: 'nbfc',
    logo: 'tata-capital',
    logoFile: 'tata-capital-logo-svg_logoshape.png',
    note: 'Personal, business and property-backed lending.',
  },
  {
    name: 'Aditya Birla Finance',
    type: 'nbfc',
    logo: 'aditya-birla',
    logoFile: 'aditya-birla-finance-ltd-janakpuri-delhi-loans-a9ia5rx1i2.avif',
    note: 'Secured and unsecured business finance, and loan against property.',
  },
  {
    name: 'L&T Finance',
    type: 'nbfc',
    logo: 'lt-finance',
    logoFile: 'l-t-finance-logo.webp',
    note: 'Retail and rural lending, including two-wheeler and farm equipment.',
  },
  {
    name: 'Mahindra Finance',
    type: 'nbfc',
    logo: 'mahindra-finance',
    logoFile: 'Mahindra-finance-logo.png',
    note: 'Vehicle and rural lending across our Baramati and Phaltan catchment.',
  },
  {
    name: 'Muthoot Finance',
    type: 'nbfc',
    logo: 'muthoot-finance',
    logoFile: 'MUTHOOTFIN.NS_BIG-f66d7a3f.png',
    note: 'Gold loans, with same-day valuation and disbursal.',
  },
  {
    name: 'Piramal Finance',
    type: 'nbfc',
    logo: 'piramal',
    logoFile: 'Piramal-pic-620x400-1.jpg.webp',
    note: 'Housing finance and loan against property, including less-standard property types.',
  },
  { name: 'Shriram Finance', type: 'nbfc', note: 'Commercial vehicle and small-business lending; strong on informal-income profiles.' },
  { name: 'Cholamandalam Finance', type: 'nbfc', note: 'Vehicle finance, home loans and loan against property.' },
]

/** The subset with a published logo file — what the partner wall renders. */
export const LENDERS_WITH_LOGOS = LENDERS.filter((l) => l.logo)

export const BANKS = LENDERS.filter((l) => l.type === 'bank')
export const NBFCS = LENDERS.filter((l) => l.type === 'nbfc')

/**
 * Why a panel beats a single lender. This is the site's actual argument, so it
 * lives in data rather than being buried in a component's JSX.
 */
export const PANEL_ARGUMENT = [
  {
    title: 'The same file gets different answers',
    body: 'A cash-salaried applicant is an automatic decline at one lender and a routine approval at another. An MIDC leasehold shed is unfundable at most banks and ordinary business for three of the NBFCs on this list. The file did not change; the lender did.',
  },
  {
    title: 'Applying widely damages you',
    body: 'Every formal application puts a hard enquiry on your credit report, and several in a short window lower your score, at precisely the moment you need it highest. Shortlisting first is not a convenience, it is protection.',
  },
  {
    title: 'The cheapest advertised rate is often irrelevant',
    body: 'A rate you do not qualify for is not an offer. What matters is the best rate among lenders that will actually approve your profile, which is a different and much shorter list.',
  },
  {
    title: 'We are paid by the lender, and you should know that',
    body: 'PayYou is a Direct Selling Agent. Our fee comes from the lender on a completed disbursal, not from you. You should weigh any broker’s recommendation in that light, including ours, which is why we show you the comparison rather than just the conclusion.',
  },
]
