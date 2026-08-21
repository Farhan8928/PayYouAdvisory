/**
 * The lender panel.
 *
 * ── Why there are no logos ──────────────────────────────────────────────────
 * The obvious design here is a wall of bank logos, and it is a mistake on three
 * counts. PayYou has no licence to reproduce HDFC's or SBI's marks. A grid of
 * borrowed logos implies an endorsement that does not exist — these are DSA
 * arrangements, not partnerships those banks would describe in those terms. And
 * in practice it always ships as a row of mismatched, blurry PNGs scraped at
 * different resolutions, which is the single most common way a financial site
 * gives away that it is small.
 *
 * A typographic index is legally clean, visually better, and — because it can
 * carry a note about what each lender is actually good for — more useful to a
 * reader than a logo ever was.
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
  { name: 'HDFC Bank', type: 'bank', note: 'Full retail range. Strong on salaried profiles in top employer categories.' },
  { name: 'ICICI Bank', type: 'bank', note: 'Broad retail and business lending; competitive on home loan balance transfers.' },
  { name: 'Axis Bank', type: 'bank', note: 'Retail and MSME. Active on loan against property.' },
  { name: 'Kotak Mahindra Bank', type: 'bank', note: 'Retail and business banking, including working-capital facilities.' },
  { name: 'State Bank of India', type: 'bank', note: 'The widest home loan reach in the country, and the deepest branch network in our districts.' },
  { name: 'Union Bank of India', type: 'bank', note: 'Public sector. Home loans and MSME lending.' },
  { name: 'Yes Bank', type: 'bank', note: 'Retail and business lending.' },
  { name: 'HSBC', type: 'bank', note: 'Selective, premium-segment retail lending.' },

  // ── NBFCs ────────────────────────────────────────────────────────────────
  { name: 'Bajaj Finance', type: 'nbfc', note: 'Fast unsecured personal and business lending; wide acceptance of profiles banks decline.' },
  { name: 'Tata Capital', type: 'nbfc', note: 'Personal, business and property-backed lending.' },
  { name: 'Aditya Birla Finance', type: 'nbfc', note: 'Secured and unsecured business finance, and loan against property.' },
  { name: 'L&T Finance', type: 'nbfc', note: 'Retail and rural lending, including two-wheeler and farm equipment.' },
  { name: 'Shriram Finance', type: 'nbfc', note: 'Commercial vehicle and small-business lending; strong on informal-income profiles.' },
  { name: 'Mahindra Finance', type: 'nbfc', note: 'Vehicle and rural lending across our Baramati and Phaltan catchment.' },
  { name: 'Cholamandalam Finance', type: 'nbfc', note: 'Vehicle finance, home loans and loan against property.' },
  { name: 'Muthoot Finance', type: 'nbfc', note: 'Gold loans, with same-day valuation and disbursal.' },
  { name: 'Piramal Finance', type: 'nbfc', note: 'Housing finance and loan against property, including less-standard property types.' },
]

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
    body: 'Every formal application puts a hard enquiry on your credit report, and several in a short window lower your score — at precisely the moment you need it highest. Shortlisting first is not a convenience, it is protection.',
  },
  {
    title: 'The cheapest advertised rate is often irrelevant',
    body: 'A rate you do not qualify for is not an offer. What matters is the best rate among lenders that will actually approve your profile, which is a different and much shorter list.',
  },
  {
    title: 'We are paid by the lender, and you should know that',
    body: 'PayYou is a Direct Selling Agent. Our fee comes from the lender on a completed disbursal, not from you. You should weigh any broker’s recommendation in that light — including ours — which is why we show you the comparison rather than just the conclusion.',
  },
]
