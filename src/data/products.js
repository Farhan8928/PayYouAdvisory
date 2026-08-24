/**
 * The product catalogue: one entry per loan or protection product.
 *
 * This file is the site's spine. The homepage list, the mega-menu, all eight
 * product pages, the ~90 generated product x locality pages, the sitemap and
 * every `FinancialProduct` / `FAQPage` JSON-LD block are rendered from it.
 * Adding a product here adds it everywhere, correctly, including to the
 * sitemap and the structured data.
 *
 * ── On the numbers ──────────────────────────────────────────────────────────
 * Every figure below is traceable to something PayYou has already published on
 * payyouadvisory.com (captured 2026-08-21). Where the client has not published
 * a figure, the field is `null` and the page renders what the number *depends
 * on* instead of inventing one.
 *
 * That restraint is not fastidiousness. Lending is a YMYL category: Google's
 * quality raters hold it to the highest accuracy standard, and a rate a
 * borrower can disprove by phoning a bank destroys more trust than a missing
 * number ever costs. `npm run audit:seo` fails the build if a page renders the
 * literal string "TODO" or "PLACEHOLDER", so a guess cannot ship by accident.
 *
 * `rateFrom` is the *lowest advertised starting rate across partner lenders*,
 * never PayYou's own rate — PayYou is a DSA and does not set rates. Every page
 * that shows one also shows `rateNote`.
 */

/** Shared across products: what a lender actually decides a rate on. */
const RATE_DEPENDS_ON = [
  'Your CIBIL score: 750+ generally reaches the lowest published band',
  'Net monthly income and existing EMI obligations',
  'Employment type, employer category and job or business vintage',
  'Loan amount and the tenure you choose',
  'Whether the lender is a bank or an NBFC',
]

export const PRODUCTS = [
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'personal-loan',
    index: '01',
    name: 'Personal Loan',
    shortName: 'Personal',
    category: 'unsecured',
    categoryLabel: 'Unsecured',
    tagline: 'Money for the thing that will not wait.',
    summary:
      'An unsecured loan against your income alone. Nothing is pledged, nothing is mortgaged, and the lender does not ask what you plan to spend it on.',
    intro: [
      'A personal loan is the fastest money a bank will lend an individual, because there is no asset to value and no title to verify: only your income and your repayment record. That is also why it is priced higher than a home loan or a loan against property, and why your CIBIL score moves the rate more here than anywhere else.',
      'PayYou compares your profile across 25+ banks and NBFCs before a single application is submitted. Lenders differ enormously on the same file: one declines a cash-salaried applicant outright, another underwrites the same person from bank statements. Knowing which is which in advance is the entire job.',
    ],
    spec: {
      rateFrom: null,
      rateNote: 'Rates are set by the lender, not by PayYou, and vary by profile.',
      amountMax: null,
      amountNote: 'Based on your income and the lender’s multiplier, no fixed ceiling.',
      tenure: '12 – 60 months',
      security: 'None. Nothing is pledged.',
      disbursal: '24 – 48 hours after approval and document verification',
    },
    features: [
      {
        title: 'No collateral',
        body: 'Nothing is pledged as security. The lender underwrites your income and credit history, not an asset.',
      },
      {
        title: 'End-use is yours',
        body: 'Medical emergencies, a wedding, travel, home renovation, education, consolidating costlier debt. The lender does not restrict how the money is used.',
      },
      {
        title: 'Cash salary is not a dead end',
        body: 'Several partner lenders underwrite cash-salaried applicants from six months of bank statements. Most brokers will not tell you which ones.',
      },
      {
        title: 'One enquiry, not twenty-five',
        body: 'We shortlist before we submit. Applying to eight lenders yourself puts eight hard enquiries on your credit report and lowers your score at exactly the wrong moment.',
      },
    ],
    uses: [
      'Medical treatment and hospitalisation',
      'Wedding expenses',
      'Home renovation or interiors',
      'Higher education and coaching fees',
      'Travel',
      'Consolidating credit-card or costlier debt',
    ],
    eligibility: {
      note: 'Indicative. Individual lenders set their own floors, and PayYou matches your profile to the ones you actually clear.',
      rows: [
        { criterion: 'Age', salaried: '21 – 60 years', selfEmployed: '21 – 60 years' },
        {
          criterion: 'Income',
          salaried: 'Stable monthly salary, per lender norms',
          selfEmployed: 'Demonstrable income via ITR or bank statements',
        },
        {
          criterion: 'Vintage',
          salaried: 'Per lender, typically 6+ months in current job',
          selfEmployed: '2+ years in the current business',
        },
        { criterion: 'CIBIL score', salaried: '650+ preferred', selfEmployed: '650+ preferred' },
        { criterion: 'Residency', salaried: 'Indian resident', selfEmployed: 'Indian resident' },
      ],
    },
    accepted: {
      title: 'Profiles our partner lenders accept',
      items: [
        'Salaried: private companies, MNCs, government and PSU',
        'Self-employed professionals: doctors, chartered accountants, architects, consultants',
        'Business owners: proprietors, partners, directors',
        'Cash-salaried applicants, verified through bank statements',
        'Teaching professionals',
        'Defence personnel',
      ],
    },
    documents: [
      { label: 'PAN card', note: 'Mandatory for every applicant' },
      { label: 'Aadhaar card', note: 'Identity and address' },
      { label: 'Income proof', note: 'Salary slips, ITR, or bank statements where salary is paid in cash' },
      { label: 'Bank statements', note: 'Last 3 – 6 months, of the salary or primary account' },
      { label: 'Employment details', note: 'Offer or appointment letter, or business registration' },
    ],
    faqs: [
      {
        q: 'What is the eligibility for a personal loan in Pune?',
        a: 'Broadly: age 21 to 60, a stable income whether salaried or self-employed, a CIBIL score of 650 or above, and Indian residency. Each lender sets its own floor on top of that, which is why we match your profile to lenders before applying rather than after.',
      },
      {
        q: 'Can I get a personal loan if my salary is paid in cash?',
        a: 'Yes, with some lenders. Several of our partner NBFCs underwrite cash-salaried applicants using six months of bank statements showing consistent credits. Not every lender does, so the shortlist matters more for this profile than for any other.',
      },
      {
        q: 'Do I need to pledge anything?',
        a: 'No. A personal loan is unsecured. It is assessed on your income and credit profile alone. That is why it carries a higher rate than a secured loan such as a loan against property.',
      },
      {
        q: 'How quickly is the money disbursed?',
        a: 'Typically 24 to 48 hours after approval and document verification. The approval itself is what varies: a complete file with clean documents moves in a day, an incomplete one can sit for a week.',
      },
      {
        q: 'What interest rate will I get?',
        a: 'That is the lender’s decision, not ours, and it depends mainly on your CIBIL score, your income, your existing EMIs, your employment type and the tenure you pick. A score of 750+ generally reaches the lowest published band. We will show you the actual offers from the lenders you qualify with rather than quote you a headline rate you may never see.',
      },
      {
        q: 'Will applying damage my credit score?',
        a: 'Each formal application creates a hard enquiry, and several in a short window do lower your score. This is precisely why we shortlist first: one considered application instead of eight speculative ones.',
      },
    ],
    seo: {
      title: 'Personal Loan in Pune & PCMC: 25+ Lenders | PayYou Advisory',
      description:
        'Unsecured personal loans in Pune and Pimpri-Chinchwad. One application compared across 25+ banks and NBFCs, one credit enquiry. Cash-salary profiles accepted. Call 020 2735 0055.',
      keywords: [
        'personal loan in Pune',
        'personal loan Pimpri Chinchwad',
        'personal loan DSA Pune',
        'instant personal loan Pune',
        'personal loan for cash salary Pune',
        'personal loan without collateral Pune',
        'low CIBIL personal loan Pune',
        'personal loan agent Chinchwad',
      ],
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'business-loan',
    index: '02',
    name: 'Business Loan',
    shortName: 'Business',
    category: 'unsecured',
    categoryLabel: 'Unsecured · MSME',
    tagline: 'Working capital that does not cost you equity.',
    summary:
      'Funding for stock, staff, machinery and expansion, assessed on your turnover and banking, not on what you are willing to mortgage.',
    intro: [
      'Most businesses that need funding do not need an investor. They need six months of working capital to hold stock through a season, or eighteen months to pay for a machine that will pay for itself. A business loan does that without diluting a single share.',
      'What actually decides the outcome is your banking: average balance, credit consistency, cheque returns, and how the GST and ITR line up with what the account shows. We read that file the way an underwriter will, before it goes anywhere.',
    ],
    spec: {
      rateFrom: 10.5,
      rateNote:
        'Lowest advertised starting rate across partner lenders. Your rate depends on turnover, vintage and credit profile.',
      amountMax: 20000000,
      amountNote: 'Up to ₹2 Crore, subject to business profile and lender policy.',
      tenure: '12 – 60 months',
      security: 'Unsecured options available for eligible profiles',
      disbursal: 'Typically 3 – 7 working days from a complete file',
    },
    features: [
      {
        title: 'No dilution',
        body: 'Debt is the cheapest capital a profitable business can raise. You keep every share.',
      },
      {
        title: 'Unsecured options',
        body: 'Many partner lenders fund eligible businesses with no collateral at all, assessed on turnover, banking and vintage.',
      },
      {
        title: 'Interest is deductible',
        body: 'Interest paid on a business loan is an allowable business expense, which lowers the effective cost against a personal loan used for the same purpose.',
      },
      {
        title: 'Informal income is workable',
        body: 'Trades that run substantially on cash can still be underwritten where the bank statements show it. The lender shortlist is what makes the difference.',
      },
    ],
    uses: [
      'Working capital and day-to-day operations',
      'Stock and inventory ahead of a season',
      'Plant, machinery and equipment',
      'Opening a new branch or outlet',
      'Office or shop renovation',
      'Technology and systems upgrades',
    ],
    eligibility: {
      note: 'Indicative, and stricter than a personal loan because the lender is underwriting a business rather than a salary.',
      rows: [
        { criterion: 'Age', salaried: '—', selfEmployed: '21 – 65 years' },
        { criterion: 'Annual income', salaried: '—', selfEmployed: '₹1.5 lakh and above' },
        { criterion: 'Business turnover', salaried: '—', selfEmployed: '₹40 lakh and above' },
        {
          criterion: 'Business vintage',
          salaried: '—',
          selfEmployed: '3 years in the current business, 5 years total',
        },
        { criterion: 'Profitability', salaried: '—', selfEmployed: 'Minimum 2 years in profit' },
        { criterion: 'Residency', salaried: '—', selfEmployed: 'Indian resident' },
      ],
      singleColumn: true,
    },
    accepted: {
      title: 'Business types our partner lenders fund',
      items: [
        'Proprietorships, partnerships and private limited companies',
        'Professionals: doctors, chartered accountants, architects, consultants',
        'Medical shops and clinics',
        'Manufacturing units',
        'Trading and distribution businesses',
        'Service businesses',
        'Cash and informal-income businesses, verified through bank statements',
      ],
    },
    documents: [
      { label: 'PAN and Aadhaar', note: 'Of the proprietor, partners or directors' },
      { label: 'Business registration', note: 'Udyam, GST registration, Shop Act or incorporation certificate' },
      { label: 'ITR', note: 'Last 2 – 3 years, with computation of income' },
      { label: 'Bank statements', note: 'Last 6 – 12 months of the primary current account' },
      { label: 'GST returns', note: 'Where the business is registered' },
      { label: 'Financials', note: 'Audited balance sheet and P&L where applicable' },
    ],
    faqs: [
      {
        q: 'What is the interest rate on a business loan?',
        a: 'Rates generally start from around 10.50% per annum and move up from there depending on the lender, your turnover, your vintage and your credit profile. NBFCs price higher than banks but underwrite files banks decline, so the cheapest advertised rate is not always the relevant one.',
      },
      {
        q: 'Is collateral required?',
        a: 'Not always. Many business loans are unsecured and require no collateral where the business clears the turnover and vintage criteria. Secured options exist too, and they price lower. A loan against property is usually the cheaper way to raise a large amount.',
      },
      {
        q: 'What is the maximum amount available?',
        a: 'Business loans are available up to ₹2 Crore through our partner lenders, subject to the business profile. What you are actually offered is driven by turnover and existing obligations.',
      },
      {
        q: 'My business is three years old but I have been in the trade for eight. Does that count?',
        a: 'Often, yes. Most lenders look at both the vintage of the entity and total experience in the line of business, which is why the criteria above list both. Bring the earlier registration or employment record. It does real work.',
      },
      {
        q: 'Can a business with mostly cash sales get funded?',
        a: 'Where the cash is banked, yes. Lenders underwrite what the statements show, not what the ledger claims. A business that deposits its takings consistently is fundable; one that does not is very hard to help.',
      },
    ],
    seo: {
      title: 'Business Loan in Pune. Up to ₹2 Cr from 10.50% | PayYou Advisory',
      description:
        'MSME and working-capital business loans in Pune and PCMC. Up to ₹2 Crore, rates from 10.50% p.a., unsecured options. One profile compared across 25+ banks and NBFCs.',
      keywords: [
        'business loan in Pune',
        'MSME loan Pune',
        'working capital loan Pune',
        'unsecured business loan Pimpri Chinchwad',
        'business loan without collateral Pune',
        'business loan DSA Pune',
        'machinery loan Pune',
      ],
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'home-loan',
    index: '03',
    name: 'Home Loan',
    shortName: 'Home',
    category: 'secured',
    categoryLabel: 'Secured · Long tenure',
    tagline: 'The cheapest money you will ever be lent.',
    summary:
      'Finance for a purchase, a plot, a construction or a renovation, secured on the property, priced accordingly, and deductible twice over under the Income Tax Act.',
    intro: [
      'A home loan is the longest and cheapest borrowing available to an individual, because the lender holds the property and the tenure spreads the burden. It is also the loan where a small difference in rate is worth the most: a quarter of a percent over twenty years is a large number.',
      'Which is why the file is worth preparing properly. Title, approvals, the builder’s standing with each bank, and whether the property is on a lender’s approved-project list all decide the outcome before your income is even discussed.',
    ],
    spec: {
      rateFrom: null,
      rateNote: 'Home loan rates are repo-linked and move with RBI policy. We quote the live offers you qualify for.',
      amountMax: null,
      amountNote: '75% – 90% of the property value, depending on the ticket size and the lender.',
      tenure: 'Up to 20 – 30 years',
      security: 'Mortgage of the property being financed',
      disbursal: 'On completion, or in stages linked to construction progress',
    },
    features: [
      {
        title: 'Up to 90% funded',
        body: 'Lenders typically finance 75% to 90% of the property value. The balance, plus stamp duty and registration, is your contribution.',
      },
      {
        title: 'Tenure up to 30 years',
        body: 'A longer tenure lowers the EMI and raises the total interest. Our EMI calculator shows both numbers side by side, because only seeing one of them is how people over-borrow.',
      },
      {
        title: 'Deductible twice',
        body: 'Principal under Section 80C and interest under Section 24(b), with an additional deduction under 80EEA for eligible first-time buyers.',
      },
      {
        title: 'Pre-EMI while it is built',
        body: 'On an under-construction property the lender disburses in stages against construction progress, and you pay only the interest on what has been drawn.',
      },
    ],
    types: [
      { name: 'Home purchase', body: 'Ready-to-move or under-construction, resale or direct from the builder.' },
      { name: 'Plot purchase', body: 'For a residential plot, usually with a requirement to begin construction within a defined period.' },
      { name: 'Construction', body: 'For building on a plot you already own, disbursed in stages.' },
      { name: 'Renovation & extension', body: 'For repair, improvement or adding to an existing home.' },
      { name: 'Balance transfer', body: 'Moving an existing loan to a lender with a lower rate. Worth modelling before moving; see the calculator.' },
      { name: 'Top-up', body: 'Additional borrowing on an existing home loan, usually at a rate far below a personal loan.' },
    ],
    taxBenefits: [
      { section: '80C', limit: 150000, on: 'Principal repaid during the year', note: 'Shared with your other 80C investments' },
      { section: '24(b)', limit: 200000, on: 'Interest paid on a self-occupied property', note: 'Per financial year' },
      { section: '80EEA', limit: 150000, on: 'Additional interest, eligible first-time buyers', note: 'Subject to the conditions in force' },
    ],
    eligibility: {
      note: 'Indicative. On a home loan the property is assessed as hard as the applicant. A clean profile on a property the lender will not fund still gets declined.',
      rows: [
        { criterion: 'Age', salaried: '21 – 60 years', selfEmployed: '21 – 65 years' },
        { criterion: 'Minimum income', salaried: '₹25,000 per month', selfEmployed: 'Per lender, evidenced by ITR' },
        {
          criterion: 'Vintage',
          salaried: '2 years total, 1 year with the current employer',
          selfEmployed: '2 – 3 years in the business',
        },
        { criterion: 'Income proof', salaried: 'Salary slips and Form 16', selfEmployed: '2 years of income tax returns' },
        { criterion: 'CIBIL score', salaried: '650+', selfEmployed: '650+' },
        { criterion: 'Employer type', salaried: 'Private, MNC, public sector or government', selfEmployed: '—' },
      ],
    },
    accepted: {
      title: 'Also eligible',
      items: [
        'NRI applicants, with passport, visa or residency proof, NRE/NRO statements, overseas income proof and a Power of Attorney',
        'Joint applications with a spouse, parent or child, which raise the eligible amount',
        'Balance transfers from an existing lender, with or without a top-up',
      ],
    },
    documents: [
      { label: 'PAN and Aadhaar', note: 'For every applicant and co-applicant' },
      { label: 'Income proof', note: 'Salary slips and Form 16, or 2 years of ITR for the self-employed' },
      { label: 'Bank statements', note: 'Last 6 months' },
      { label: 'Property papers', note: 'Agreement to sell, index II, approved plan, NA order or occupancy certificate' },
      { label: 'Own-contribution proof', note: 'Evidence of the margin you are putting in' },
      { label: 'Existing loan statements', note: 'For a balance transfer, the last 12 months and a foreclosure letter' },
    ],
    faqs: [
      {
        q: 'How much of the property value can I borrow?',
        a: 'Lenders typically finance 75% to 90% of the property value. The rest, plus stamp duty, registration and any brokerage, has to come from you, and lenders check that the margin is genuinely yours rather than borrowed elsewhere.',
      },
      {
        q: 'Can I take a home loan on an under-construction flat?',
        a: 'Yes. Disbursement is done in stages linked to construction progress, and you pay only Pre-EMI (interest on the amount drawn so far) until the loan is fully disbursed. Check whether your project is on the lender’s approved list first; it shortens everything.',
      },
      {
        q: 'What tax benefit does a home loan actually give?',
        a: 'Principal repayment qualifies under Section 80C up to ₹1.5 lakh a year, shared with your other 80C investments. Interest qualifies under Section 24(b) up to ₹2 lakh a year on a self-occupied property. Eligible first-time buyers may claim a further ₹1.5 lakh of interest under Section 80EEA. Confirm your own position with a tax adviser, the conditions change.',
      },
      {
        q: 'Is a balance transfer worth it?',
        a: 'Only if the saving beats the cost of moving. A transfer carries processing fees, legal and valuation charges and fresh documentation, and resets your amortisation. Our balance-transfer calculator models the actual saving over your remaining tenure rather than comparing two rates and calling it a win.',
      },
      {
        q: 'Can an NRI take a home loan in Pune?',
        a: 'Yes, with additional documentation: passport, visa or residency proof, NRE/NRO account statements, proof of overseas income and usually a Power of Attorney in favour of someone in India to execute documents on your behalf.',
      },
    ],
    seo: {
      title: 'Home Loan in Pune & PCMC: up to 90% Funding | PayYou Advisory',
      description:
        'Home loans in Pune and Pimpri-Chinchwad for purchase, plot, construction, renovation, balance transfer and top-up. 75–90% funding, tenure to 30 years, NRI applications accepted.',
      keywords: [
        'home loan in Pune',
        'home loan Pimpri Chinchwad',
        'housing loan Pune',
        'home loan balance transfer Pune',
        'NRI home loan Pune',
        'plot loan Pune',
        'home construction loan Pune',
        'home loan agent Chinchwad',
      ],
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'loan-against-property',
    index: '04',
    name: 'Loan Against Property',
    shortName: 'LAP',
    category: 'secured',
    categoryLabel: 'Secured · Large ticket',
    tagline: 'Raise money against property you keep using.',
    summary:
      'A mortgage on a property you already own, at a fraction of the cost of unsecured borrowing, and you continue to live in it or trade from it throughout.',
    intro: [
      'A loan against property is the cheapest way to raise a large sum without selling anything. Because the lender holds a mortgage, the rate sits far below a personal or unsecured business loan, and the tenure runs to fifteen or twenty years rather than five.',
      'The trade-off is real and should be said plainly: the property is security. Default and it is at risk. It is the right instrument for funding a business expansion or consolidating expensive debt, and the wrong one for a discretionary expense.',
      'The other thing that separates lenders here is which properties they will accept at all. Our partner list includes NBFCs that fund MIDC units, godowns, hospitals and Grampanchayat land: properties most banks decline outright.',
    ],
    spec: {
      rateFrom: null,
      rateNote:
        'Lower than personal or unsecured business loans because the loan is secured. Actual rate depends on property type and location.',
      amountMax: null,
      amountNote: 'Typically 60% – 70% of the assessed market value of the property.',
      tenure: 'Up to 15 – 20 years',
      security: 'Mortgage of the property; you retain possession and use',
      disbursal: 'After legal and technical valuation, typically 2 – 4 weeks',
    },
    features: [
      {
        title: 'You keep the property',
        body: 'You continue to occupy your home or trade from your shop throughout the loan. Only the title is mortgaged.',
      },
      {
        title: 'Priced like a secured loan',
        body: 'Materially below an unsecured business or personal loan, which is what makes it the sensible instrument for a large requirement.',
      },
      {
        title: 'Overdraft option',
        body: 'Some lenders offer LAP as an overdraft: you draw only what you need and pay interest only on what is drawn. Useful for lumpy working-capital cycles.',
      },
      {
        title: 'Unusual properties considered',
        body: 'MIDC units, industrial sheds, godowns, hospitals and Grampanchayat land are fundable with the right lender, even where a bank declines.',
      },
    ],
    propertyTypes: [
      {
        group: 'Residential',
        items: ['Flats and apartments', 'Bungalows and row houses', 'MHADA properties', 'Load-bearing structures', 'NRI-owned property'],
      },
      {
        group: 'Commercial & industrial',
        items: ['Office space', 'Shops and showrooms', 'MIDC units', 'Industrial sheds', 'Godowns and warehouses', 'Hospitals and clinics', 'Bars and restaurants', 'PG accommodation', 'Highway dhabas'],
      },
      {
        group: 'Land',
        items: ['Non-agricultural (NA) open land', 'Grampanchayat properties of 11 guntha or more'],
      },
    ],
    eligibility: {
      note: 'On a LAP the property is underwritten as hard as the borrower. Both have to clear.',
      rows: [
        { criterion: 'Age', salaried: '21 – 60 years', selfEmployed: '21 – 60 years' },
        { criterion: 'Income', salaried: 'Stable, with demonstrable repayment capacity', selfEmployed: 'Evidenced by ITR and banking' },
        { criterion: 'Property ownership', salaried: 'Clear, marketable title in the applicant’s name', selfEmployed: 'Clear, marketable title' },
        { criterion: 'Property type', salaried: 'Residential, commercial or industrial, lender-approved', selfEmployed: 'Residential, commercial or industrial' },
        { criterion: 'Loan to value', salaried: '60% – 70% of market value', selfEmployed: '60% – 70% of market value' },
      ],
    },
    documents: [
      { label: 'PAN and Aadhaar', note: 'For every owner on the title' },
      { label: 'Income proof', note: 'Salary slips and Form 16, or 2 – 3 years of ITR' },
      { label: 'Bank statements', note: 'Last 6 – 12 months' },
      { label: 'Title documents', note: 'Sale deed, index II, chain of title, share certificate where applicable' },
      { label: 'Property tax receipts', note: 'Latest paid receipt' },
      { label: 'Approved plan / NA order', note: 'For land, construction or industrial property' },
    ],
    faqs: [
      {
        q: 'What is a loan against property?',
        a: 'A secured loan where you mortgage a property you own to obtain funds for a personal or business purpose, without selling the property. The lender holds the title as security; you keep possession and use.',
      },
      {
        q: 'Can I still use the property after taking a LAP?',
        a: 'Yes. You continue to occupy and use your property while repaying the loan. Nothing about your day-to-day use changes.',
      },
      {
        q: 'How much can I raise?',
        a: 'Generally 60% to 70% of the property’s assessed market value. The lender’s valuation, which is frequently lower than the price you believe the property would fetch.',
      },
      {
        q: 'Will a lender accept a Grampanchayat property or a godown?',
        a: 'Some will. Non-agricultural open land, Grampanchayat properties of 11 guntha or more, MIDC units, industrial sheds and godowns are all fundable with the right lender, subject to approval and valuation. This is exactly where a broad lender panel earns its keep, a bank that declines the property is not a negotiation, it is a dead end.',
      },
      {
        q: 'How is a LAP different from a home loan?',
        a: 'A home loan funds the purchase or construction of a property. A LAP raises money against a property you already own, for any purpose. LAP carries a higher rate and a lower loan-to-value than a home loan, but is far cheaper than any unsecured option.',
      },
      {
        q: 'What happens if I cannot repay?',
        a: 'The property is security and the lender can enforce against it. That is the honest answer, and it is why a LAP should fund something that generates a return or replaces costlier debt, not a discretionary expense.',
      },
    ],
    seo: {
      title: 'Loan Against Property in Pune: 60–70% LTV | PayYou Advisory',
      description:
        'LAP in Pune and PCMC against residential, commercial, industrial or NA land, including MIDC units, godowns and Grampanchayat property. 60–70% of value, tenure to 20 years.',
      keywords: [
        'loan against property Pune',
        'LAP Pune',
        'mortgage loan Pimpri Chinchwad',
        'loan against commercial property Pune',
        'loan against MIDC property',
        'loan against Grampanchayat property',
        'property loan agent Pune',
      ],
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'car-loan',
    index: '05',
    name: 'Car Loan',
    shortName: 'Car',
    category: 'secured',
    categoryLabel: 'Secured · Vehicle',
    tagline: 'Financed against the car, not against you.',
    summary:
      'Funding for a new or pre-owned vehicle, secured by hypothecation of the car itself, which is why it prices well below a personal loan for the same amount.',
    intro: [
      'A car loan is secured on the vehicle, so it costs less than borrowing the same amount unsecured. The variables worth attention are the funding percentage on the ex-showroom versus on-road price, whether insurance and accessories are being financed too, and the foreclosure terms, which differ sharply between banks and NBFCs.',
      'Pre-owned vehicles are a separate underwriting question: the age of the car, its valuation and the seller’s paperwork decide as much as your income does.',
    ],
    spec: {
      rateFrom: null,
      rateNote: 'Set by the lender. New cars price below used, and dealer-tied schemes are not always the cheapest.',
      amountMax: null,
      amountNote: 'A percentage of ex-showroom or on-road price, varying by lender and by vehicle.',
      tenure: 'Typically up to 7 years',
      security: 'Hypothecation of the vehicle',
      disbursal: 'Usually direct to the dealer on delivery',
    },
    features: [
      {
        title: 'Cheaper than unsecured',
        body: 'Because the vehicle is security, the rate sits well below a personal loan used to buy the same car.',
      },
      {
        title: 'New and pre-owned',
        body: 'Partner lenders fund both. Used-car funding depends on the vehicle’s age and valuation as much as on your profile.',
      },
      {
        title: 'Compare beyond the showroom',
        body: 'The finance desk at a dealership represents the lenders it has a tie-up with. That is a shortlist chosen for the dealer’s convenience, not for your rate.',
      },
      {
        title: 'Watch the foreclosure terms',
        body: 'Car loans are frequently closed early. The charge for doing so varies more between lenders than the headline rate does, and nobody points it out at signing.',
      },
    ],
    uses: ['A new car', 'A pre-owned car', 'Refinancing an existing vehicle loan', 'Commercial vehicles, through selected partners'],
    eligibility: {
      note: 'Indicative; vehicle loans are among the more accommodating products because the security is straightforward.',
      rows: [
        { criterion: 'Age', salaried: '21 – 60 years', selfEmployed: '21 – 65 years' },
        { criterion: 'Income', salaried: 'Stable monthly salary per lender norms', selfEmployed: 'ITR or business banking' },
        { criterion: 'Vintage', salaried: 'Typically 1 year in employment', selfEmployed: '2+ years in business' },
        { criterion: 'CIBIL score', salaried: '650+ preferred', selfEmployed: '650+ preferred' },
      ],
    },
    documents: [
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
      { label: 'Income proof', note: 'Salary slips, or ITR for the self-employed' },
      { label: 'Bank statements', note: 'Last 3 – 6 months' },
      { label: 'Vehicle quotation', note: 'Proforma invoice from the dealer, or valuation for a used car' },
      { label: 'Driving licence', note: 'Where the lender requires it' },
    ],
    faqs: [
      {
        q: 'Should I take the finance the dealer offers?',
        a: 'Compare it, certainly, but understand what it is. A dealership finance desk works with the lenders it has tie-ups with, and the scheme presented is the one that suits that arrangement. It is sometimes genuinely the best offer. It is worth ten minutes to find out.',
      },
      {
        q: 'Can I finance a used car?',
        a: 'Yes, through several partner lenders. The vehicle’s age, its valuation and the transfer paperwork carry more weight than they do on a new car, and the rate is higher because the security depreciates faster.',
      },
      {
        q: 'How much of the price is funded?',
        a: 'It varies by lender and by vehicle, and the important distinction is whether the percentage is quoted on the ex-showroom or the on-road price. The same "90% funding" means two quite different amounts of cash from your pocket.',
      },
    ],
    seo: {
      title: 'Car Loan in Pune & PCMC: New & Used | PayYou Advisory',
      description:
        'Car loans in Pune and Pimpri-Chinchwad for new and pre-owned vehicles, compared across 25+ banks and NBFCs, not just the lenders your dealership has a tie-up with.',
      keywords: [
        'car loan in Pune',
        'car loan Pimpri Chinchwad',
        'used car loan Pune',
        'vehicle loan Pune',
        'car finance agent Chinchwad',
      ],
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'gold-loan',
    index: '06',
    name: 'Gold Loan',
    shortName: 'Gold',
    category: 'secured',
    categoryLabel: 'Secured · Same day',
    tagline: 'The fastest secured money there is.',
    summary:
      'A loan against gold jewellery, valued and disbursed the same day, with no credit score requirement, because the security is in the lender’s vault.',
    intro: [
      'A gold loan is the only borrowing where your credit history is broadly irrelevant: the lender holds the asset, values it against purity and weight, and lends a regulated percentage of that value. Approval takes hours, not days.',
      'It is genuinely useful for a short, sharp requirement. It is a poor instrument for a long one. The repayment structures vary a great deal, and some are bullet repayments that catch people out at maturity. Read the structure, not just the rate.',
    ],
    spec: {
      rateFrom: null,
      rateNote: 'Varies widely between banks and gold-loan NBFCs, as does the repayment structure.',
      amountMax: null,
      amountNote: 'A regulated percentage of the assessed value of the gold, by purity and weight.',
      tenure: 'Short tenure, commonly 6 – 24 months',
      security: 'Pledge of gold jewellery, held by the lender',
      disbursal: 'Same day, once valued',
    },
    features: [
      {
        title: 'Credit score is not the gate',
        body: 'The gold is the security. A thin or damaged credit file does not block a gold loan the way it blocks unsecured borrowing.',
      },
      {
        title: 'Same-day money',
        body: 'Valuation and disbursal happen in a single visit. Nothing else legitimate moves this fast.',
      },
      {
        title: 'Read the repayment structure',
        body: 'Some schemes are regular EMIs; others are interest-only with the principal due as a bullet at maturity. The second is cheaper monthly and far riskier at the end.',
      },
      {
        title: 'Your jewellery comes back',
        body: 'It is held in the lender’s vault, insured, and returned on closure. Check the storage and insurance terms in writing before you hand anything over.',
      },
    ],
    uses: ['A short-term cash requirement', 'A medical emergency', 'Business working capital between cycles', 'Bridging until a receivable lands'],
    eligibility: {
      note: 'The simplest eligibility of any product here, because the lender is underwriting metal rather than a person.',
      rows: [
        { criterion: 'Age', salaried: '18 years and above', selfEmployed: '18 years and above' },
        { criterion: 'Ownership', salaried: 'The gold must be yours', selfEmployed: 'The gold must be yours' },
        { criterion: 'Purity', salaried: 'Typically 18 – 22 carat jewellery', selfEmployed: 'Typically 18 – 22 carat jewellery' },
        { criterion: 'Credit score', salaried: 'Generally not a deciding factor', selfEmployed: 'Generally not a deciding factor' },
      ],
    },
    documents: [
      { label: 'PAN or Form 60', note: 'As applicable to the amount' },
      { label: 'Aadhaar', note: 'Identity and address' },
      { label: 'The jewellery', note: 'Valued for purity and weight at the branch' },
    ],
    faqs: [
      {
        q: 'Does my CIBIL score matter for a gold loan?',
        a: 'Generally not. The loan is secured by the gold itself, so lenders do not underwrite it on credit history the way they do an unsecured loan. This makes it one of the few routes open to someone rebuilding a damaged credit file.',
      },
      {
        q: 'How much will I get for my jewellery?',
        a: 'A regulated percentage of the assessed value, which is calculated on the weight of gold at the assessed purity: stones, and the making, are not funded. The valuation is done at the branch in front of you.',
      },
      {
        q: 'What happens if the gold price falls during the loan?',
        a: 'Lenders may ask for a part-payment or additional security to restore the loan-to-value ratio. Ask what the trigger is before you borrow. It is in the agreement and rarely mentioned at the counter.',
      },
    ],
    seo: {
      title: 'Gold Loan in Pune & PCMC: Same-day Disbursal | PayYou Advisory',
      description:
        'Gold loans in Pune and Pimpri-Chinchwad. Same-day valuation and disbursal, no credit score requirement. Compare bank and NBFC schemes and repayment structures before you pledge.',
      keywords: [
        'gold loan in Pune',
        'gold loan Pimpri Chinchwad',
        'gold loan near me Pune',
        'loan against gold Chinchwad',
      ],
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'working-capital-loan',
    index: '07',
    name: 'Working Capital & LRD',
    shortName: 'Working Capital',
    category: 'business',
    categoryLabel: 'Business facilities',
    tagline: 'Facilities for a business that has outgrown a term loan.',
    summary:
      'Cash credit, overdraft, and Lease Rental Discounting: structured facilities for established businesses, priced and sized on turnover, receivables or rental income.',
    intro: [
      'A term loan is the wrong shape for a working-capital problem. A business whose money is tied up in stock and receivables needs a revolving facility it can draw on and repay as the cycle turns, paying interest only on what is outstanding.',
      'Lease Rental Discounting is a different instrument again: if you own commercial property let to a creditworthy tenant, the lender advances against the future rent stream. It is one of the cheapest ways for a property owner to raise a large sum, and one of the least understood.',
    ],
    spec: {
      rateFrom: null,
      rateNote: 'Priced on the facility type, the security offered and the strength of the borrower.',
      amountMax: null,
      amountNote: 'Sized on turnover, on the receivables and stock cycle, or on the assessed rental stream.',
      tenure: 'Renewable annually (CC/OD); up to the lease term for LRD',
      security: 'Stock and book debts, property, or the rental receivable',
      disbursal: 'On sanction and facility documentation',
    },
    features: [
      {
        title: 'Pay only on what you draw',
        body: 'A cash credit or overdraft charges interest on the outstanding balance, not on the sanctioned limit. Idle headroom costs nothing.',
      },
      {
        title: 'Sized to the cycle',
        body: 'The limit is assessed on your actual working-capital gap (stock plus receivables less creditors) rather than on a round number.',
      },
      {
        title: 'Lease Rental Discounting',
        body: 'Own commercial property with a tenant in place? The lender advances against the contracted rent, at rates close to a home loan.',
      },
      {
        title: 'Renewable',
        body: 'Facilities are reviewed and renewed annually, so a growing business can raise the limit without refinancing from scratch.',
      },
    ],
    uses: [
      'Funding a stock and receivables cycle',
      'Bridging seasonal peaks',
      'Raising against rent from a let commercial property (LRD)',
      'Replacing expensive short-term borrowing',
    ],
    eligibility: {
      note: 'These are facilities for established businesses. A young business is generally better served by a term loan.',
      rows: [
        { criterion: 'Entity', salaried: '—', selfEmployed: 'Proprietorship, partnership, LLP or company' },
        { criterion: 'Vintage', salaried: '—', selfEmployed: 'Established operating history, audited where applicable' },
        { criterion: 'Financials', salaried: '—', selfEmployed: 'Audited balance sheet and P&L, GST returns' },
        { criterion: 'For LRD', salaried: '—', selfEmployed: 'Registered lease, creditworthy tenant, clear title' },
      ],
      singleColumn: true,
    },
    documents: [
      { label: 'Constitution documents', note: 'Incorporation, partnership deed, or registration' },
      { label: 'Audited financials', note: 'Last 2 – 3 years' },
      { label: 'GST returns', note: 'Last 12 months' },
      { label: 'Bank statements', note: 'All operating accounts, last 12 months' },
      { label: 'Stock and debtors statement', note: 'For a working-capital assessment' },
      { label: 'Lease deed and tenant details', note: 'For Lease Rental Discounting' },
    ],
    faqs: [
      {
        q: 'What is the difference between a cash credit and a term loan?',
        a: 'A term loan gives you a lump sum you repay on a fixed schedule. A cash credit gives you a limit you can draw down and repay repeatedly, paying interest only on what is outstanding. For a business funding a stock cycle, the second is both cheaper and the right shape.',
      },
      {
        q: 'What is Lease Rental Discounting?',
        a: 'A loan advanced against the future rent from a commercial property you own and have let. The lender assesses the lease, the tenant’s standing and the remaining term, and lends against that income stream, usually at a rate close to a home loan, because the security and the cash flow are both strong.',
      },
      {
        q: 'How is the working-capital limit decided?',
        a: 'By assessing your working-capital gap: inventory plus receivables, less what you owe creditors. Lenders apply their own margins on each. The figure is driven by your audited financials and GST filings, so those need to be current.',
      },
    ],
    seo: {
      title: 'Working Capital, CC/OD & LRD in Pune | PayYou Advisory',
      description:
        'Cash credit, overdraft and Lease Rental Discounting facilities for established businesses in Pune and PCMC. Sized on turnover, receivables or contracted rental income.',
      keywords: [
        'working capital loan Pune',
        'cash credit limit Pune',
        'overdraft facility Pune',
        'lease rental discounting Pune',
        'LRD loan Pimpri Chinchwad',
        'CC OD limit Chinchwad',
      ],
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'insurance',
    index: '08',
    name: 'Insurance Plans',
    shortName: 'Insurance',
    category: 'protection',
    categoryLabel: 'Protection',
    tagline: 'The cover that keeps a loan from becoming a family’s problem.',
    summary:
      'Life, health, motor, property, business and loan-protection cover, placed with multiple insurers rather than whichever one pays the largest commission.',
    intro: [
      'Insurance is where advice matters most and is given least, because the incentive runs the wrong way: whoever sells you the policy is paid by the insurer. PayYou places cover across multiple insurers rather than being tied to one, which at least removes the worst version of that conflict.',
      'The single most under-sold product on this page is loan protection. A family that inherits a home loan alongside a bereavement is the most avoidable financial disaster in Indian retail lending, and a term plan covering the outstanding balance costs a small fraction of the EMI.',
    ],
    spec: {
      rateFrom: null,
      rateNote: 'Premiums depend on age, health, sum insured, tenure and plan type.',
      amountMax: null,
      amountNote: 'Sum insured chosen to your requirement and the insurer’s underwriting.',
      tenure: 'Annual to whole-of-life, by product',
      security: 'Not applicable',
      disbursal: 'Cover commences on acceptance and premium realisation',
    },
    covers: [
      { name: 'Life insurance', body: 'Term plans, endowment and ULIPs. A term plan is pure cover at the lowest cost per rupee of sum assured; the others bundle an investment, which is a separate decision worth making separately.' },
      { name: 'Health insurance', body: 'Hospitalisation, surgery, critical illness and day-care procedures, for an individual or a family floater.' },
      { name: 'Loan protection', body: 'Covers the outstanding balance of a loan on death, and on disability or critical illness where the plan provides. The most useful and least-sold cover here.' },
      { name: 'Property insurance', body: 'Home or commercial premises against fire, natural disaster, burglary and allied perils.' },
      { name: 'Business insurance', body: 'Assets, stock, liability and employee cover for a running business.' },
      { name: 'Motor insurance', body: 'Third-party cover, which is compulsory, plus comprehensive own-damage protection.' },
    ],
    taxBenefits: [
      { section: '80C', limit: 150000, on: 'Life insurance premiums', note: 'Shared with your other 80C investments' },
      { section: '80D', limit: null, on: 'Health insurance premiums', note: 'Limit varies with age of the insured and of parents covered' },
      { section: '10(10D)', limit: null, on: 'Proceeds from a life policy', note: 'Exempt subject to the conditions in force' },
    ],
    eligibility: {
      note: 'Underwriting is by the insurer and depends principally on age and health.',
      rows: [
        { criterion: 'Age', salaried: 'By product; term plans commonly 18 – 65', selfEmployed: 'By product' },
        { criterion: 'Medical underwriting', salaried: 'May be required above certain ages or sums insured', selfEmployed: 'Same' },
        { criterion: 'Disclosure', salaried: 'Full and accurate: non-disclosure voids claims', selfEmployed: 'Full and accurate' },
      ],
    },
    documents: [
      { label: 'Identity proof', note: 'PAN and Aadhaar' },
      { label: 'Address proof', note: 'As accepted by the insurer' },
      { label: 'Photographs', note: 'Recent passport size' },
      { label: 'Medical records', note: 'Where the insurer calls for them' },
      { label: 'Income proof', note: 'For higher sums assured' },
    ],
    faqs: [
      {
        q: 'Is insurance compulsory when I take a loan?',
        a: 'No. Insurance is generally optional, though lenders will often suggest a loan protection plan alongside the sanction. It should be your decision, taken on its merits, and you are entitled to buy that cover from someone other than the lender.',
      },
      {
        q: 'Can I buy a policy without taking a loan?',
        a: 'Yes. Every product here can be bought independently of any borrowing.',
      },
      {
        q: 'How is the premium calculated?',
        a: 'On your age, your health, the sum insured, the policy tenure and the type of plan. Age is the variable that punishes delay most. The same cover bought five years later costs materially more for the rest of the policy’s life.',
      },
      {
        q: 'What tax benefits apply?',
        a: 'Life premiums qualify under Section 80C, health premiums under Section 80D with limits that vary by the age of those insured, and life policy proceeds are exempt under Section 10(10D) subject to the conditions in force. Confirm your own position with a tax adviser.',
      },
      {
        q: 'What is loan protection insurance and do I need it?',
        a: 'It covers the outstanding balance of your loan in the event of death, and on disability or critical illness where the plan provides, so the liability does not pass to your family. If anyone depends on your income and you carry a large loan, the answer is almost always yes.',
      },
    ],
    seo: {
      title: 'Insurance Plans in Pune. Life, Health & Motor | PayYou Advisory',
      description:
        'Life, health, motor, property, business and loan-protection insurance in Pune and PCMC, placed across multiple insurers. Tax benefits under 80C, 80D and 10(10D).',
      keywords: [
        'insurance plans Pune',
        'health insurance Pimpri Chinchwad',
        'term insurance Pune',
        'loan protection insurance Pune',
        'motor insurance Chinchwad',
        'insurance advisor Pune',
      ],
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Added 24 Aug 2026, from the client's page specification.
  //
  // `photo` names an image key from src/data/photos.js rather than defaulting
  // to the slug. The photography set is licensed, real and finite; a new
  // product reuses an existing frame rather than acquiring one, because the
  // alternative is a broken image slot or a made-up Unsplash URL.
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'loan-against-securities',
    index: '09',
    name: 'Loan Against Securities',
    shortName: 'Securities',
    category: 'secured',
    categoryLabel: 'Secured · Financial assets',
    photo: 'consult-desk',
    tagline: 'Borrow against the portfolio without selling it.',
    summary:
      'An overdraft against shares, mutual funds, bonds, insurance policies or fixed deposits you already hold, so the investment stays invested.',
    intro: [
      'Selling an investment to raise money has two costs people underestimate: the capital gains tax that crystallises on the sale, and the compounding that stops the day the holding leaves the portfolio. A loan against securities avoids both. The holding is pledged rather than sold, a limit is set against its value, and you draw only what you need.',
      'It is structured as an overdraft rather than a term loan, so interest accrues on the drawn balance day by day and stops when the balance is repaid. Dividends, interest and growth continue to accrue to you throughout, because you remain the owner. The discipline it demands is watching the margin: if the pledged value falls, the lender will call for more security or for part repayment, and that call has a short deadline.',
    ],
    spec: {
      rateFrom: null,
      rateNote: 'Priced by the lender against the class of security pledged.',
      amountMax: null,
      amountNote: 'A percentage of the pledged value, set by the security type and the lender.',
      tenure: 'Revolving, usually renewed annually',
      security: 'Pledge or lien on the securities held',
      disbursal: '1 – 3 working days once the pledge is marked',
    },
    features: [
      {
        title: 'The investment keeps working',
        body: 'You remain the owner throughout. Dividends, interest and capital growth continue to accrue to you while the holding is pledged.',
      },
      {
        title: 'No capital gains event',
        body: 'Pledging is not a sale, so no gain crystallises and no tax falls due. For a long-held equity position that difference alone can exceed the interest cost.',
      },
      {
        title: 'Interest on what you draw',
        body: 'The facility is an overdraft. Draw a fraction of the limit and you pay interest on that fraction, day by day.',
      },
      {
        title: 'Margin calls are the real risk',
        body: 'If the market falls, the lender asks for more security or part repayment at short notice. Borrow well inside the limit rather than at it.',
      },
    ],
    uses: [
      'A short-term requirement without disturbing a long-term holding',
      'Bridging between a committed sale and a purchase',
      'Working capital for a business owner whose wealth sits in investments',
      'A medical or family emergency where speed matters',
      'Avoiding a forced sale in a falling market',
    ],
    eligibility: {
      note: 'Indicative. Each lender publishes its own list of approved securities, and a holding outside that list cannot be pledged however sound it is.',
      rows: [
        { criterion: 'Holding', salaried: 'In the applicant’s own name', selfEmployed: 'In the applicant’s own name' },
        {
          criterion: 'Security type',
          salaried: 'On the lender’s approved list of shares, funds or bonds',
          selfEmployed: 'On the lender’s approved list of shares, funds or bonds',
        },
        { criterion: 'Demat account', salaried: 'Required for shares and most bonds', selfEmployed: 'Required for shares and most bonds' },
        { criterion: 'Age', salaried: '18 – 70 years', selfEmployed: '18 – 70 years' },
        { criterion: 'Income proof', salaried: 'Often light, since the security carries the loan', selfEmployed: 'Often light, since the security carries the loan' },
      ],
    },
    accepted: {
      title: 'What can usually be pledged',
      items: [
        'Listed equity shares on the lender’s approved list',
        'Mutual fund units, equity and debt',
        'Traditional and endowment life insurance policies with a surrender value',
        'Government securities, bonds and debentures',
        'Fixed deposits held with the lending bank',
      ],
    },
    documents: [
      { label: 'Demat statement', note: 'Holding statement for shares and bonds' },
      { label: 'Mutual fund statement', note: 'Consolidated account statement' },
      { label: 'Policy document', note: 'Where a life insurance policy is pledged' },
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
      { label: 'Bank statements', note: 'Last 3 – 6 months' },
    ],
    faqs: [
      {
        q: 'Do I lose the dividends or growth while the shares are pledged?',
        a: 'No. You remain the owner throughout. Dividends, interest, bonus issues and capital growth continue to accrue to you. The pledge only prevents you selling the holding while the facility is drawn.',
      },
      {
        q: 'What is a margin call?',
        a: 'If the market value of the pledged holding falls, the cover behind your limit shrinks. The lender then asks you to pledge more securities or repay part of the drawing, usually within a short deadline. Failing to meet it allows the lender to sell the holding.',
      },
      {
        q: 'How much will I get against my portfolio?',
        a: 'A percentage of the value, and the percentage depends heavily on what is pledged. Debt instruments and fixed deposits support a higher proportion than equity, because their value moves less. Each lender also maintains its own list of approved securities.',
      },
      {
        q: 'Is this cheaper than a personal loan?',
        a: 'Usually considerably, because it is secured. And the comparison people forget is against selling: for a long-held equity position, avoiding the capital gains event can be worth more than the entire interest cost of the facility.',
      },
    ],
    seo: {
      title: 'Loan Against Shares, Mutual Funds & Securities in Pune | PayYou',
      description:
        'Overdraft against shares, mutual funds, bonds, insurance policies and deposits in Pune. Keep the investment, avoid the capital gains event, and understand margin calls.',
      keywords: [
        'loan against shares Pune',
        'loan against mutual funds PCMC',
        'loan against securities Pimpri Chinchwad',
        'LAS overdraft Pune',
        'loan against insurance policy Pune',
      ],
    },
  },

  {
    slug: 'education-loan',
    index: '10',
    name: 'Education Loan',
    shortName: 'Education',
    category: 'unsecured',
    categoryLabel: 'Education',
    photo: 'meeting-india',
    tagline: 'Repayment starts after the course, not after the cheque.',
    summary:
      'Funding for higher education in India and abroad, with a moratorium through the course and a tax deduction on the interest that no other loan carries.',
    intro: [
      'An education loan is built around a fact no other retail product accommodates: the borrower has no income yet. Repayment is deferred through the course and for a grace period after it, usually six to twelve months, so the first instalment falls due when the graduate is working rather than while they are studying. Interest accrues during that moratorium and can generally be serviced or capitalised, and servicing it if the family can reduces the eventual burden noticeably.',
      'Two features make it materially cheaper than borrowing any other way for the same purpose. The interest paid qualifies for deduction under Section 80E of the Income Tax Act, with no ceiling on the amount, for up to eight years. And the loan covers more than tuition: examination fees, library and laboratory charges, books, equipment, travel and, for study abroad, living costs are all normally within scope. Loans up to a threshold are typically unsecured; above it, lenders ask for collateral, and that threshold is the single most important number to establish before choosing a course.',
    ],
    spec: {
      rateFrom: null,
      rateNote: 'Set by the lender, and often finer for a recognised institution on its approved list.',
      amountMax: null,
      amountNote: 'Driven by the course cost and whether collateral is offered.',
      tenure: 'Course period plus moratorium, then commonly 10 – 15 years',
      security: 'Usually none up to a threshold; collateral above it',
      disbursal: 'Semester by semester, direct to the institution',
    },
    features: [
      {
        title: 'A moratorium through the course',
        body: 'Repayment begins after the course ends plus a grace period, usually six to twelve months, rather than the month after disbursal.',
      },
      {
        title: 'Section 80E, with no upper limit',
        body: 'The full interest paid is deductible for up to eight years. It is the most generous interest deduction available on any retail loan in India.',
      },
      {
        title: 'More than tuition is covered',
        body: 'Examination and library fees, books, equipment, travel and living costs abroad normally fall within the loan.',
      },
      {
        title: 'Disbursed to the institution',
        body: 'Money is released semester by semester directly to the college, which keeps the drawn balance and therefore the accruing interest low.',
      },
    ],
    uses: [
      'Undergraduate and postgraduate study in India',
      'Master’s and doctoral study abroad',
      'Professional and technical courses on an approved list',
      'Living costs, travel and equipment for overseas study',
      'Executive programmes at recognised institutions',
    ],
    eligibility: {
      note: 'Indicative. The student is the borrower and a parent or guardian normally joins as co-applicant; the institution and course carry as much weight as the family’s income.',
      rows: [
        { criterion: 'Applicant', salaried: 'The student, with a co-applicant', selfEmployed: 'The student, with a co-applicant' },
        {
          criterion: 'Admission',
          salaried: 'Confirmed seat at a recognised institution',
          selfEmployed: 'Confirmed seat at a recognised institution',
        },
        { criterion: 'Course', salaried: 'On the lender’s approved list', selfEmployed: 'On the lender’s approved list' },
        {
          criterion: 'Co-applicant income',
          salaried: 'Salary slips and Form 16',
          selfEmployed: '2 years ITR with computation',
        },
        { criterion: 'Collateral', salaried: 'Usually above a threshold amount', selfEmployed: 'Usually above a threshold amount' },
      ],
    },
    accepted: {
      title: 'What lenders look at hardest',
      items: [
        'The institution’s standing and whether it sits on the lender’s approved list',
        'Employability of the course, which drives repayment confidence',
        'The co-applicant’s income and existing obligations',
        'Whether collateral is available where the amount exceeds the unsecured threshold',
        'The student’s academic record, particularly for study abroad',
      ],
    },
    documents: [
      { label: 'Admission letter', note: 'Confirmed offer from the institution' },
      { label: 'Fee structure', note: 'Official schedule of course and other charges' },
      { label: 'Academic records', note: 'Mark sheets and, where applicable, test scores' },
      { label: 'Co-applicant income proof', note: 'Salary slips and Form 16, or 2 years ITR' },
      { label: 'Collateral documents', note: 'Where the amount requires security' },
    ],
    faqs: [
      {
        q: 'When do repayments actually start?',
        a: 'After the course ends plus a grace period, usually six to twelve months. Interest accrues during that moratorium. If the family can service the interest while the student studies, the eventual repayment is noticeably lighter, and most lenders allow it.',
      },
      {
        q: 'Do I need collateral?',
        a: 'Usually not up to a threshold amount, above which lenders ask for security such as property or a deposit. That threshold varies between lenders and is one of the first things to establish, because it can determine which courses are realistically affordable.',
      },
      {
        q: 'What is the tax benefit?',
        a: 'Section 80E allows the whole of the interest paid to be deducted, with no upper limit, for up to eight years from when repayment begins. No other retail loan in India carries an uncapped interest deduction.',
      },
      {
        q: 'Can the loan cover living costs abroad?',
        a: 'Generally yes. Overseas education loans normally cover tuition, travel, insurance, equipment and living expenses. The sanction is based on a total cost estimate rather than on tuition alone, so build the full figure before applying.',
      },
    ],
    seo: {
      title: 'Education Loan for India & Abroad from Pune | PayYou Advisory',
      description:
        'Education loans in Pune and PCMC for study in India and overseas. Moratorium until after the course, Section 80E interest deduction, and when collateral is required.',
      keywords: [
        'education loan Pune',
        'study abroad loan PCMC',
        'student loan Pimpri Chinchwad',
        'education loan without collateral Pune',
        'abroad education loan Pune',
      ],
    },
  },

  {
    slug: 'investments',
    index: '11',
    name: 'Deposits & Investments',
    shortName: 'Investments',
    category: 'protection',
    categoryLabel: 'Savings',
    photo: 'calculator-papers',
    tagline: 'Where surplus money sits while it waits.',
    summary:
      'Fixed and recurring deposits and savings products placed with partner banks and NBFCs. PayYou arranges and refers; it does not accept deposits or manage money.',
    intro: [
      'Not every conversation about money is about borrowing. A business holding a surplus between seasons, a family building towards a down payment, a retiree who needs income rather than growth: all of them are choosing where to place money rather than where to raise it. PayYou refers these requirements to the same partner banks and finance companies it places loans with, and is paid a referral fee by the institution in the same way.',
      'What matters most in this category is rarely the headline rate. Deposit insurance covers bank deposits per depositor per bank up to a statutory limit, so spreading a large sum across institutions is often worth more than chasing a fraction of a percent. Premature withdrawal terms decide what happens when plans change. And interest on deposits is taxable as income, so a comparison against a tax-advantaged alternative should be made after tax, not before. We will say where a deposit is the sensible answer and where it plainly is not.',
    ],
    spec: {
      rateFrom: null,
      rateNote: 'Set by the bank or finance company, and revised frequently. We compare current rates at the time you place.',
      amountMax: null,
      amountNote: 'By the institution’s minimum and your requirement.',
      tenure: '7 days to 10 years, by product',
      security: 'Not applicable; deposit insurance limits apply to bank deposits',
      disbursal: 'Not applicable',
    },
    features: [
      {
        title: 'Deposit insurance has a per-bank limit',
        body: 'Bank deposits are insured per depositor per bank up to a statutory ceiling. Splitting a large sum across institutions is often worth more than a marginally better rate.',
      },
      {
        title: 'Company deposits pay more and are not insured',
        body: 'NBFC and corporate deposits typically offer higher rates precisely because that protection does not extend to them. The rating is the thing to read.',
      },
      {
        title: 'Interest is taxable as income',
        body: 'Deposit interest is added to income and taxed at your slab, with tax deducted at source above a threshold. Compare alternatives after tax.',
      },
      {
        title: 'Premature withdrawal has a cost',
        body: 'Breaking a deposit early usually means a rate penalty. Laddering across several maturities keeps money accessible without paying it.',
      },
    ],
    uses: [
      'Parking a business surplus between seasons',
      'Building a house deposit over a defined period',
      'Regular monthly saving through a recurring deposit',
      'Income for a retired household through a monthly payout deposit',
      'Holding an emergency fund somewhere reachable',
    ],
    eligibility: {
      note: 'Indicative. Individuals, businesses, trusts and societies can all place deposits; the institution’s own account-opening norms apply.',
      rows: [
        { criterion: 'Applicant', salaried: 'Individual, jointly or singly', selfEmployed: 'Proprietor, firm, company, trust or society' },
        { criterion: 'KYC', salaried: 'PAN and Aadhaar', selfEmployed: 'Entity KYC and authorised signatory' },
        { criterion: 'Minimum amount', salaried: 'Set by the institution', selfEmployed: 'Set by the institution' },
        { criterion: 'Age', salaried: 'No upper limit; senior citizens often get a better rate', selfEmployed: 'Not applicable' },
      ],
    },
    accepted: {
      title: 'What we can arrange',
      items: [
        'Fixed deposits with banks and rated finance companies',
        'Recurring deposits for regular monthly saving',
        'Tax-saving fixed deposits with a statutory lock-in',
        'Monthly and quarterly income payout deposits',
        'Savings and current account opening with partner banks',
      ],
    },
    documents: [
      { label: 'PAN and Aadhaar', note: 'Mandatory for every depositor' },
      { label: 'Address proof', note: 'Where not covered by Aadhaar' },
      { label: 'Entity documents', note: 'For a firm, company, trust or society' },
      { label: 'Form 15G or 15H', note: 'Where you wish to avoid tax deducted at source and qualify' },
      { label: 'Nomination details', note: 'Strongly recommended on every deposit' },
    ],
    faqs: [
      {
        q: 'Does PayYou hold my money?',
        a: 'No, and this matters. PayYou is a referral and advisory firm. The deposit is placed with the bank or finance company, in your name, and the receipt comes from them. We are paid a referral fee by the institution, exactly as we are on a loan.',
      },
      {
        q: 'Is my deposit safe?',
        a: 'Bank deposits are covered by deposit insurance per depositor per bank up to a statutory limit, which is why splitting a large sum across institutions is sensible. Company and NBFC deposits are not covered by that scheme, which is why they pay more. Read the rating.',
      },
      {
        q: 'What happens if I need the money early?',
        a: 'Most deposits can be broken, usually with a penalty on the rate. A practical alternative is laddering: several deposits maturing at different dates, so something is always close to maturity and nothing has to be broken.',
      },
      {
        q: 'Is a fixed deposit a good investment?',
        a: 'It is a good place to keep money you cannot afford to lose or may need soon. Over long periods, after tax and inflation, the real return is usually modest. For a goal many years away, it is worth taking advice on alternatives rather than defaulting to a deposit.',
      },
    ],
    seo: {
      title: 'Fixed & Recurring Deposits Through PayYou Advisory, Pune',
      description:
        'Place fixed and recurring deposits with partner banks and NBFCs in Pune. Deposit insurance limits, taxation of interest, premature withdrawal and laddering explained.',
      keywords: [
        'fixed deposit Pune',
        'recurring deposit PCMC',
        'best FD rates Pimpri Chinchwad',
        'company fixed deposit Pune',
        'savings account opening Pune',
      ],
    },
  },
]

export const PRODUCT_BY_SLUG = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]))

/** What a lender actually decides a rate on. Rendered on every product page. */
export { RATE_DEPENDS_ON }

/**
 * The four steps, as PayYou describes its own process. Kept here rather than
 * inline in a component because it also feeds the `HowTo` JSON-LD.
 */
export const PROCESS = [
  {
    step: '01',
    title: 'Tell us the requirement',
    body: 'Amount, purpose, and a rough picture of your income and obligations. Five minutes on the phone is usually enough to know whether this is straightforward or not.',
    detail: 'No documents needed at this stage.',
  },
  {
    step: '02',
    title: 'We read your profile the way an underwriter will',
    body: 'Income, vintage, existing EMIs, credit report, and, for a secured loan. The property. This is where a file is either fixed or found to be unfixable, and it is the part most brokers skip.',
    detail: 'Soft check only. No hard enquiry on your credit report.',
  },
  {
    step: '03',
    title: 'We shortlist the lenders you actually clear',
    body: 'Out of 25+ partners, usually two or three are genuinely right for a given profile. You see what each would offer (rate, amount, tenure, fees) side by side, before anything is submitted.',
    detail: 'You choose. We do not submit anywhere without your instruction.',
  },
  {
    step: '04',
    title: 'One application, then disbursal',
    body: 'We submit to the lender you pick, manage the documentation and the queries, and stay on it until the money lands. One credit enquiry, not twenty-five.',
    detail: 'Sanction, rate and disbursal remain the lender’s decision.',
  },
]
