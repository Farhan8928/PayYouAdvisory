import { useState } from 'react'
import { Section } from '../components/PageHeader.jsx'
import { LINE_ART } from '../components/LineArt.jsx'
import { ArrowRight, ChevronRight } from '../components/Icon.jsx'

/**
 * IDFC FIRST Bank inspired Tab Rail & Product Grid:
 * 1. Dark glass tab rail overlapping the hero with custom vector line icons
 * 2. Flat colour cards in 3 rotating tones (brand blue, deep blue, brand red)
 * 3. Cropped SVG line art in the corner with smooth scale on hover
 * 4. Dual CTAs: Outlined action pill + "Know More →" text link
 */

const TABS = [
  { id: 'popular', label: 'Popular Products', art: 'award' },
  { id: 'loans', label: 'Loans', art: 'hand-coins' },
  { id: 'business', label: 'Business & MSME', art: 'storefront' },
  { id: 'property', label: 'Property & Housing', art: 'house-key' },
  { id: 'insurance', label: 'Insurance', art: 'umbrella' },
  { id: 'deposits', label: 'Deposits', art: 'coin-stack' },
  { id: 'tools', label: 'Calculators & Tools', art: 'calculator' },
]

const TILES = {
  popular: [
    { title: 'Personal Loan', rate: 'From 10.25% p.a.', line: 'Unsecured financing approved on your income and banking track record alone.', href: '/personal-loan/', cta: 'Check Rates', art: 'hand-coins' },
    { title: 'Business Loan', rate: 'Up to ₹2 Crore', line: 'Evaluated on banking conduct and GST turnover without collateral requirements.', href: '/business-loan/', cta: 'Explore MSME', art: 'storefront' },
    { title: 'Home Loan', rate: 'From 8.40% p.a.', line: 'Secure your sanction before booking your property for maximum negotiation leverage.', href: '/home-loan/', cta: 'Calculate EMI', art: 'house-key' },
    { title: 'Loan Against Property', rate: 'Up to 20 Yrs Tenure', line: 'The most cost-effective way to raise large capital against residential or commercial units.', href: '/loan-against-property/', cta: 'See Eligibility', art: 'building' },
    { title: 'Gold Loan', rate: 'Same-Day Disbursal', line: 'Quick liquidity against physical gold jewellery with zero prepayment penalties.', href: '/gold-loan/', cta: 'Instant Approval', art: 'coin-stack' },
    { title: 'Insurance Advisory', rate: 'Zero Commission Bias', line: 'Term, health and motor coverage compared across leading private insurers.', href: '/insurance/', cta: 'Compare Plans', art: 'umbrella' },
  ],
  loans: [
    { title: 'Personal Loan for Salaried', rate: 'From 10.25%', line: 'Company categorisation advantage for employees of listed and MNC corporates.', href: '/personal-loan-for-salaried/', cta: 'Check Sanction', art: 'hand-coins' },
    { title: 'Self-Employed Loan', rate: 'Cash-Flow Based', line: 'Accounting add-backs to optimise your net borrowing capacity.', href: '/personal-loan-for-self-employed/', cta: 'See Options', art: 'doc-check' },
    { title: 'Doctors & Professionals', rate: 'Special Rates', line: 'Customised underwriting recognising professional qualification as primary security.', href: '/personal-loan-for-doctors/', cta: 'Doctor Loans', art: 'shield' },
    { title: 'Balance Transfer & Top-Up', rate: 'Lower Your Rate', line: 'Reduce your current EMI burden and access fresh capital in one consolidation.', href: '/personal-loan-balance-transfer/', cta: 'Calculate Savings', art: 'growth' },
    { title: 'Medical Emergency Loan', rate: 'Priority Processing', line: 'Fast-track approval when timing is critical for hospitalisation and treatments.', href: '/personal-loan-for-medical-emergency/', cta: 'Quick Access', art: 'shield' },
    { title: 'Education Loan', rate: 'India & Abroad', line: 'Funding 100% of tuition and living expenses with flexible moratorium periods.', href: '/education-loan/', cta: 'Study Abroad', art: 'graduation' },
  ],
  business: [
    { title: 'Unsecured Business Loan', rate: '₹5L to ₹2 Cr', line: 'Direct sanction based on average monthly bank balance and turnover.', href: '/unsecured-business-loan/', cta: 'Apply Business', art: 'storefront' },
    { title: 'Business Loan without ITR', rate: 'Special Criteria', line: 'For growing enterprises with strong banking deposits but concise tax filings.', href: '/business-loan-without-itr/', cta: 'Explore Route', art: 'doc-check' },
    { title: 'GST-Based Funding', rate: 'From 11.50%', line: 'Fast approvals using monthly GSTR-3B filings as primary income proof.', href: '/business-loan-on-gst/', cta: 'Check Limits', art: 'growth' },
    { title: 'Machinery & Equipment', rate: 'Hypothecation', line: 'Finance new industrial machinery where the equipment itself serves as collateral.', href: '/machinery-loan/', cta: 'Get Quotation', art: 'building' },
    { title: 'Overdraft & Cash Credit', rate: 'Interest on Usage', line: 'Flexible working capital limit with interest charged only on utilised funds.', href: '/business-overdraft/', cta: 'Set Up OD', art: 'calculator' },
    { title: 'MSME Priority Schemes', rate: 'Govt Subsidy', line: 'Subsidised credit access under CGTMSE and Udyam registered frameworks.', href: '/msme-loan/', cta: 'MSME Benefits', art: 'award' },
  ],
  property: [
    { title: 'Home Purchase Loan', rate: 'Starting 8.40%', line: 'Transparent legal checks and property valuation across Pune & PCMC.', href: '/home-purchase-loan/', cta: 'New Flat', art: 'house-key' },
    { title: 'Plot & Construction Loan', rate: 'Stage Disbursal', line: 'Tranche releases mapped to verified architectural milestones.', href: '/home-construction-loan/', cta: 'Build Home', art: 'building' },
    { title: 'Residential LAP', rate: 'Up to 75% LTV', line: 'Unlock long-term equity from self-occupied or rented residential homes.', href: '/residential-property-loan/', cta: 'Pledge House', art: 'house-key' },
    { title: 'Commercial Property Loan', rate: 'Offices & Shops', line: 'Funding for commercial unit acquisition and business expansion.', href: '/commercial-property-loan/', cta: 'Commercial', art: 'storefront' },
    { title: 'Lease Rental Discounting', rate: 'Rental Backed', line: 'Discount future lease receivables from corporate tenants for immediate capital.', href: '/lease-rental-discounting/', cta: 'LRD Facility', art: 'growth' },
    { title: 'Home Loan Balance Transfer', rate: 'Rate Reduction', line: 'Switch from high floating interest rates to the market-leading partner bank.', href: '/home-loan-balance-transfer/', cta: 'Transfer Loan', art: 'calculator' },
  ],
  insurance: [
    { title: 'Term Life Insurance', rate: '100x Cover', line: 'High financial cover at low premiums to secure your family future.', href: '/term-insurance/', cta: 'View Quotes', art: 'umbrella' },
    { title: 'Family Health Insurance', rate: 'Cashless Network', line: 'Hospitalisation coverage with comprehensive day-care and room rent freedom.', href: '/health-insurance/', cta: 'Compare Health', art: 'shield' },
    { title: 'Motor Insurance', rate: 'Instant Renewal', line: 'Zero depreciation and cashless claim assistance across 4000+ garages.', href: '/motor-insurance/', cta: 'Get Policy', art: 'car' },
    { title: 'Personal Accident Cover', rate: '24/7 Worldwide', line: 'Income protection against permanent total and temporary disabilities.', href: '/personal-accident-insurance/', cta: 'Protection', art: 'shield' },
    { title: 'Critical Illness Plan', rate: 'Lump Sum Payout', line: 'Immediate claim settlement upon diagnosis of 30+ major conditions.', href: '/critical-illness-insurance/', cta: 'Coverage', art: 'award' },
    { title: 'Travel Insurance', rate: 'Global Care', line: 'Emergency medical support and baggage protection for international travel.', href: '/travel-insurance/', cta: 'Travel Safe', art: 'globe-arrows' },
  ],
  deposits: [
    { title: 'High Yield Fixed Deposit', rate: 'Up to 8.85% p.a.', line: 'Guaranteed returns with AAA and AA+ rated corporate and bank deposits.', href: '/fixed-deposit/', cta: 'Compare FDs', art: 'coin-stack' },
    { title: 'Recurring Deposit', rate: 'Monthly Savings', line: 'Systematic discipline for targeted milestones with compounding interest.', href: '/recurring-deposit/', cta: 'Start RD', art: 'growth' },
    { title: 'Systematic Deposit Plan', rate: 'Flexible Tenures', line: 'A deposit ladder giving monthly liquidity while locking peak rates.', href: '/systematic-deposit-plan/', cta: 'Plan Ladder', art: 'calculator' },
    { title: 'Savings & Current Accounts', rate: 'Zero Balance Options', line: 'Premier banking partnerships with free domestic transfers and privileges.', href: '/savings-and-current-account/', cta: 'Open Account', art: 'building' },
    { title: 'Loan Against Fixed Deposit', rate: 'Base + 1% p.a.', line: 'Instant liquidity without breaking your deposit and forfeiting earned interest.', href: '/loan-against-fixed-deposit/', cta: 'Get OD Limit', art: 'hand-coins' },
    { title: 'Loan Against Mutual Funds', rate: 'From 9.50%', line: 'Retain portfolio ownership and dividend rights while raising quick cash.', href: '/loan-against-securities/', cta: 'Pledge Shares', art: 'growth' },
  ],
  tools: [
    { title: 'Master EMI Calculator', rate: 'Amortisation Table', line: 'Calculate exact principal and interest split with prepayment schedules.', href: '/emi-calculator/', cta: 'Open Tool', art: 'calculator' },
    { title: 'Loan Eligibility Check', rate: 'FOIR Analysis', line: 'Discover your maximum borrowing capacity across 25+ partner lending norms.', href: '/eligibility-calculator/', cta: 'Check Limits', art: 'hand-coins' },
    { title: 'Balance Transfer Calculator', rate: 'Net Savings', line: 'Calculate actual net rupee savings after factoring in lender processing charges.', href: '/balance-transfer-calculator/', cta: 'Calculate Now', art: 'growth' },
    { title: 'CIBIL & Credit Score Guide', rate: 'Score Optimization', line: 'Learn the specific parameters that move your score and how to rectify errors.', href: '/credit-score/', cta: 'Read Guide', art: 'shield' },
    { title: 'Documents Required Matrix', rate: 'Ready Checklist', line: 'Product-wise documentation checklist to prevent approval delays.', href: '/documents-required/', cta: 'View List', art: 'doc-check' },
    { title: 'Interest Rate Comparison', rate: 'Updated Weekly', line: 'Compare genuine APR and processing costs across major private and PSU banks.', href: '/interest-rate-comparison/', cta: 'Compare All', art: 'award' },
  ],
}

const TONES = ['tile-ink', 'tile-mid', 'tile-accent']

export default function ProductGrid() {
  const [tab, setTab] = useState('popular')
  const tiles = TILES[tab] ?? TILES.popular

  return (
    <>
      {/* Tab rail overlapping the hero */}
      <div className="relative z-20 -mt-12 sm:-mt-14">
        <div className="container-page">
          <div className="scroll-x tab-rail shadow-lift">
            <div
              role="tablist"
              aria-label="Banking and advisory categories"
              className="flex min-w-max"
            >
              {TABS.map((t) => {
                const Art = LINE_ART[t.art]
                const active = t.id === tab
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.id)}
                    className="tab-item group"
                    data-active={active}
                  >
                    <Art className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-200 group-hover:scale-110" />
                    <span className="font-bold">{t.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Product tiles grid */}
      <Section tone="paper" size="sm" className="pt-10 sm:pt-14 pb-14 sm:pb-20">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="rule-mark" />
              <h2 className="h-section text-ink">
                Compare Solutions from 25+ Lenders
              </h2>
              <p className="mt-2 text-base text-ink-soft">
                Find the right financing option matched to your income profile and credit score.
              </p>
            </div>
            <a href="/loans/" className="btn-text text-accent flex items-center gap-1.5 font-bold">
              View all products
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((tile, i) => {
              const Art = LINE_ART[tile.art]
              return (
                <li key={tile.href + tile.title}>
                  <a
                    href={tile.href}
                    className={`tile group ${TONES[i % TONES.length]}`}
                  >
                    {/* Background vector line art */}
                    <Art className="tile-art transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />

                    {/* Card content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-2xs font-extrabold uppercase tracking-wider text-white">
                          {tile.rate}
                        </span>
                      </div>
                      <h3 className="mt-3 block text-xl font-extrabold tracking-tight sm:text-2xl text-white">
                        {tile.title}
                      </h3>
                      <p className="mt-2.5 block text-sm font-medium leading-relaxed text-white/85">
                        {tile.line}
                      </p>
                    </div>

                    {/* Footer CTAs */}
                    <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-5">
                      <span className="tile-pill">{tile.cta}</span>
                      <span className="flex items-center gap-1 text-xs font-bold text-white transition-transform duration-200 group-hover:translate-x-1">
                        Know more
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </Section>
    </>
  )
}
