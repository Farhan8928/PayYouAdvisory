/**
 * Business Loan variants.
 *
 * By structure (unsecured, secured, term, overdraft), by borrower (women
 * entrepreneurs, professionals), and by the situations that actually decide
 * where a business file can be placed: no ITR, GST-only assessment, invoice
 * discounting. See ../variants.js for the rule on numbers.
 */

export const BUSINESS = [
  {
    slug: 'unsecured-business-loan',
    parent: 'business-loan',
    group: 'How it is structured',
    name: 'Unsecured Business Loan',
    shortName: 'Unsecured',
    tagline: 'Nothing pledged, so the numbers have to speak.',
    angle:
      'With no security to fall back on, the lender underwrites bank statements almost line by line, and banking conduct decides more files here than profitability does.',
    summary:
      'Working capital and growth funding with no collateral, assessed on turnover, banking behaviour and filed returns.',
    intro: [
      'An unsecured business loan is decided on evidence of trade rather than on an asset. Two to three years of continuous operation, filed returns, and six to twelve months of current-account statements form the core of the file. Because the lender has nothing to recover against, the assessment of those statements is far more forensic than most applicants expect.',
      'What is actually read is instructive. Average bank balance across the month, not the balance on any single day. The ratio of credits to declared turnover, which should broadly agree. Cheque returns and inward bounces, which are close to disqualifying in the recent window. Whether balances are swept out the moment money arrives. A profitable business with untidy banking is a harder file to place than a modest one that maintains balances and never bounces an instrument.',
    ],
    points: [
      {
        title: 'Average balance matters more than peak balance',
        body: 'Lenders compute an average across the statement period. Money that arrives and leaves the same day does very little for the assessment.',
      },
      {
        title: 'A bounced cheque is close to fatal in the recent window',
        body: 'Inward returns in the last three to six months will stop most unsecured files. Where they exist, waiting out the window often beats applying and collecting a decline.',
      },
      {
        title: 'Credits should agree with declared turnover',
        body: 'A large gap between banked credits and the figure on the ITR or GST return invites questions that are difficult to answer well.',
      },
      {
        title: 'Faster, smaller and dearer than a secured facility',
        body: 'No valuation and no legal search means days rather than weeks. It also means a smaller sanction at a higher rate than the same business could raise against property.',
      },
    ],
    eligibility: [
      { criterion: 'Business vintage', detail: 'Typically 2–3 years of continuous operation' },
      { criterion: 'Turnover', detail: 'Lender minimums vary; consistency matters more than size' },
      { criterion: 'Banking', detail: '6–12 months current account statements, no recent returns' },
      { criterion: 'Filings', detail: '2 years ITR, GST returns where registered' },
      { criterion: 'CIBIL', detail: 'Personal 700+ and a clean commercial report' },
    ],
    documents: [
      { label: 'Bank statements', note: '6–12 months, all operating accounts' },
      { label: 'ITR with computation', note: 'Last 2 years' },
      { label: 'GST returns', note: 'Last 4 quarters where registered' },
      { label: 'Business proof', note: 'Udyam, trade licence, partnership deed or incorporation papers' },
      { label: 'KYC', note: 'PAN and Aadhaar of proprietor, partners or directors' },
    ],
    faqs: [
      {
        q: 'Why do lenders care so much about my bank statement?',
        a: 'Because it is the only independent record of how the business actually trades. Filed returns are prepared once a year with tax in mind; the statement shows month by month what came in, what went out and whether instruments were honoured. With no collateral behind the loan, it is the primary evidence.',
      },
      {
        q: 'I had one cheque return six months ago. Does that end it?',
        a: 'Not necessarily, but it narrows the panel and it matters more the more recent it is. Most unsecured lenders look hard at the last three to six months. If the return is about to fall outside that window, waiting is often better than applying now.',
      },
      {
        q: 'How much can I raise without security?',
        a: 'It is driven by assessed turnover and banking, not by a fixed ceiling. As a rule, an unsecured sanction is materially smaller than what the same business could raise against property, which is the trade you are making for speed and for keeping the asset unencumbered.',
      },
    ],
    seo: {
      title: 'Unsecured Business Loan in Pune & PCMC | PayYou Advisory',
      description:
        'Collateral-free business loans in Pune. What lenders read in your bank statements, why cheque returns stop files, and how 25+ partners differ on the same numbers.',
      keywords: [
        'unsecured business loan Pune',
        'collateral free business loan PCMC',
        'business loan without security Pune',
        'business loan bank statement Pune',
      ],
    },
  },

  {
    slug: 'secured-business-loan',
    parent: 'business-loan',
    group: 'How it is structured',
    name: 'Secured Business Loan',
    shortName: 'Secured',
    tagline: 'Slower to arrange, much cheaper to carry.',
    angle:
      'Pledging property converts the pricing question entirely: the rate drops by several points and the tenure roughly triples, in exchange for weeks of legal and valuation work.',
    summary:
      'Business funding against property or other security, at a lower rate, a larger amount and a longer tenure than unsecured lending allows.',
    intro: [
      'Where a business owns property, or where a promoter is willing to pledge one, the economics of borrowing change completely. Security reduces the lender\'s loss given default, and the pricing reflects it: a secured facility typically sits several percentage points below an unsecured one, sanctions run to a multiple of what turnover alone would support, and tenures extend to ten or fifteen years rather than three to five.',
      'The cost is time and process. A technical valuation, a legal search of title, a search of the registrar\'s records and the creation of a charge all take weeks rather than days, and they carry fees of their own. For a business with an urgent, short gap that is a poor trade. For anyone funding expansion, consolidating expensive borrowings, or carrying a facility for years, it is usually the single largest saving available.',
    ],
    points: [
      {
        title: 'The rate difference compounds over a long tenure',
        body: 'Several points saved on a facility running ten years is a very large sum. It is worth the weeks of process in almost every case where the money will be held for years.',
      },
      {
        title: 'Title has to be clean',
        body: 'Clear title, an unbroken chain of documents and no existing charge are the practical requirements. Agricultural land and unapproved construction are refused by most lenders.',
      },
      {
        title: 'Loan to value is the ceiling, not turnover',
        body: 'The sanction is driven by the valuer\'s figure and the lender\'s LTV norm. A modest business owning a valuable property can raise far more this way.',
      },
      {
        title: 'Budget for the process costs',
        body: 'Valuation, legal opinion, stamp duty on the charge and processing fees are real. They are recovered quickly by the rate saving, but they are payable upfront.',
      },
    ],
    eligibility: [
      { criterion: 'Security', detail: 'Residential or commercial property with clear, marketable title' },
      { criterion: 'Ownership', detail: 'Held by the business, a promoter, or a close family co-owner' },
      { criterion: 'Business vintage', detail: 'Usually 2+ years, relaxed against strong security' },
      { criterion: 'Tenure', detail: 'Commonly up to 10–15 years' },
      { criterion: 'CIBIL', detail: 'More flexible than unsecured, but still assessed' },
    ],
    documents: [
      { label: 'Title documents', note: 'Sale deed, chain of ownership, latest tax receipt' },
      { label: 'Approved plan', note: 'Sanctioned building plan and occupancy certificate' },
      { label: 'ITR and financials', note: 'Last 2–3 years, audited where applicable' },
      { label: 'Bank statements', note: '6–12 months' },
      { label: 'KYC', note: 'Of borrower and every property owner' },
    ],
    faqs: [
      {
        q: 'How long does a secured business loan take?',
        a: 'Typically three to six weeks. Credit assessment runs in parallel with a technical valuation and a legal title search, and the charge has to be created before disbursal. Any gap in the title chain extends it, sometimes considerably.',
      },
      {
        q: 'Can I pledge a property my father owns?',
        a: 'Usually yes, with the owner joining as co-applicant or guarantor. Lenders differ on which relationships they accept, and everyone on the title has to sign. It is one of the most common ways a young business raises against family property.',
      },
      {
        q: 'Is it worth it for a short-term requirement?',
        a: 'Rarely. The process costs and the four to six weeks of work are hard to justify for money you will hold for a few months. Secured borrowing earns its keep on facilities carried for years.',
      },
    ],
    seo: {
      title: 'Secured Business Loan Against Property in Pune | PayYou',
      description:
        'Business loans against property in Pune and PCMC. Lower rates, longer tenures and larger sanctions, with an honest account of the valuation and legal process.',
      keywords: [
        'secured business loan Pune',
        'business loan against property PCMC',
        'collateral business loan Pune',
        'property backed business finance Pune',
      ],
    },
  },

  {
    slug: 'business-term-loan',
    parent: 'business-loan',
    group: 'How it is structured',
    name: 'Business Term Loan',
    shortName: 'Term loan',
    tagline: 'For an asset, not for a gap.',
    angle:
      'A term loan should be matched to the life of what it buys: financing a five-year machine over three years starves cash flow, and financing a working-capital gap over five leaves you paying for stock long since sold.',
    summary:
      'A fixed amount repaid over a fixed schedule, used for capital expenditure and expansion rather than for day-to-day cash flow.',
    intro: [
      'A term loan disburses a lump sum against a defined purpose and recovers it on a set schedule. It is the right instrument for capital expenditure: a new machine, a fit-out, an additional unit, an acquisition. The defining discipline is matching the repayment schedule to the economic life of whatever the money buys.',
      'That principle is broken in both directions, and both are expensive. Funding a machine that will earn for eight years over a three-year term produces an EMI the early cash flow cannot carry, and businesses end up refinancing under pressure. Funding a seasonal stock cycle over five years means paying interest for years on inventory that turned over in months, when an overdraft or a working-capital line would have cost a fraction. Choose the instrument by the shape of the requirement, not by what is quickest to arrange.',
    ],
    points: [
      {
        title: 'Match the tenure to the asset life',
        body: 'The repayment schedule should track the period over which the purchase actually earns. Both a too-short and a too-long tenure carry a real cost.',
      },
      {
        title: 'A moratorium can be negotiated',
        body: 'Where the asset takes months to commission, an initial principal holiday is often available. It costs interest and it prevents a cash crunch during installation.',
      },
      {
        title: 'Term loans do not solve cash-flow gaps',
        body: 'For a recurring seasonal gap, an overdraft or working-capital line is the correct product and materially cheaper over a year.',
      },
      {
        title: 'Ask about the prepayment clause upfront',
        body: 'Floating-rate facilities to businesses can carry foreclosure charges. If you expect to prepay from a good year, that clause is worth more than a small rate concession.',
      },
    ],
    eligibility: [
      { criterion: 'Business vintage', detail: 'Usually 2–3 years, longer for larger tickets' },
      { criterion: 'Purpose', detail: 'Defined capital expenditure, usually evidenced by a quotation' },
      { criterion: 'Financials', detail: '2–3 years ITR and audited statements where applicable' },
      { criterion: 'Coverage', detail: 'Lenders test whether cash flow services the new EMI alongside existing ones' },
    ],
    documents: [
      { label: 'Quotation or proforma invoice', note: 'For the asset being financed' },
      { label: 'ITR and financials', note: 'Last 2–3 years' },
      { label: 'Bank statements', note: '6–12 months' },
      { label: 'Existing loan statements', note: 'To assess total obligations' },
      { label: 'Business proof and KYC', note: 'Registration documents and promoter KYC' },
    ],
    faqs: [
      {
        q: 'What tenure should I take?',
        a: 'Broadly the period over which the purchase earns its cost back. A machine with an eight-year life suits a five to seven year term; a fit-out that pays back in three suits three. Stretching the tenure to reduce the EMI is tempting and adds a great deal of interest.',
      },
      {
        q: 'Can repayment start after the machine is installed?',
        a: 'Often, yes. A moratorium on principal for the commissioning period is commonly available, with interest serviced meanwhile. It costs more overall and it prevents the cash crunch that kills otherwise sound expansion plans.',
      },
      {
        q: 'Is a term loan right for buying stock?',
        a: 'Usually not. Stock turns over in weeks or months, so financing it over years means paying interest long after it has been sold. A cash credit limit or an overdraft matches that cycle and costs far less across a year.',
      },
    ],
    seo: {
      title: 'Business Term Loan in Pune for Expansion | PayYou Advisory',
      description:
        'Term loans for capital expenditure in Pune and PCMC. Matching tenure to asset life, negotiating a moratorium, and why a term loan is the wrong tool for stock.',
      keywords: [
        'business term loan Pune',
        'expansion loan PCMC',
        'capital expenditure loan Pune',
        'machinery term loan Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'business-overdraft',
    parent: 'business-loan',
    group: 'How it is structured',
    name: 'Business Overdraft & Cash Credit',
    shortName: 'Overdraft',
    tagline: 'Interest only on the days you are actually overdrawn.',
    angle:
      'An overdraft is priced on utilisation rather than on sanction, so a limit that sits mostly unused can cost very little while covering a gap that would otherwise force an expensive term loan.',
    summary:
      'A revolving limit on the current account for recurring working-capital gaps, with interest charged daily on the drawn balance.',
    intro: [
      'An overdraft, or a cash credit limit against stock and receivables, exists for the ordinary rhythm of trading: money goes out to suppliers before it comes in from customers, and the gap repeats every cycle. The limit sits on the current account. When the balance goes below zero, interest runs on the overdrawn amount, day by day, and stops the moment a customer payment restores it.',
      'For a recurring gap, this is dramatically cheaper than borrowing a lump sum. A business that dips into a limit for ten days a month pays interest for those ten days rather than for thirty. The trade-offs are that limits are usually renewed annually, that cash credit against stock requires periodic statements of inventory and debtors, and that a limit permanently drawn to its ceiling is treated by lenders as a term loan in disguise and will attract awkward questions at renewal.',
    ],
    points: [
      {
        title: 'Charged on utilisation, not on sanction',
        body: 'Interest accrues daily on the overdrawn balance. An unused limit costs little beyond any renewal or commitment fee.',
      },
      {
        title: 'Renewal is annual and not automatic',
        body: 'Limits are reviewed each year against fresh financials and conduct. Plan renewals early rather than discovering a reduced limit mid-cycle.',
      },
      {
        title: 'Cash credit needs stock and debtor statements',
        body: 'Where the limit is against inventory and receivables, monthly or quarterly statements are a condition. Missing them can freeze the facility.',
      },
      {
        title: 'A permanently drawn limit is a warning sign',
        body: 'If the account never comes back into credit, lenders read it as a funding gap rather than a cycle, and renewal becomes difficult.',
      },
    ],
    eligibility: [
      { criterion: 'Business vintage', detail: 'Usually 2–3 years with an established banking relationship' },
      { criterion: 'Security', detail: 'Often against stock, receivables or property; unsecured limits are smaller' },
      { criterion: 'Financials', detail: 'Audited statements and ITR, plus a projected turnover for the limit' },
      { criterion: 'Conduct', detail: 'Clean account history with no returns' },
    ],
    documents: [
      { label: 'Audited financials', note: 'Last 2–3 years' },
      { label: 'Stock and debtor statement', note: 'For cash credit against current assets' },
      { label: 'Bank statements', note: '12 months, all operating accounts' },
      { label: 'GST returns', note: 'To corroborate turnover' },
      { label: 'Security documents', note: 'Where property is offered' },
    ],
    faqs: [
      {
        q: 'How is an overdraft cheaper than a loan if the rate is similar?',
        a: 'Because interest runs only on the days and amounts you are actually overdrawn. A business dipping into a limit for a third of each month pays roughly a third of the interest a lump-sum loan of the same size would cost.',
      },
      {
        q: 'What happens at renewal?',
        a: 'The lender reviews fresh financials, turnover and how the account behaved. A well-conducted limit is usually renewed and often enhanced. One that stayed at its ceiling all year, or saw returns, can be reduced or withdrawn.',
      },
      {
        q: 'What is the difference between an overdraft and cash credit?',
        a: 'In practice they are close cousins. Cash credit is normally secured against stock and receivables with a limit computed from those, and requires periodic statements. An overdraft can be against property or, at smaller sizes, unsecured, with lighter reporting.',
      },
    ],
    seo: {
      title: 'Business Overdraft & Cash Credit Limit in Pune | PayYou',
      description:
        'Overdraft and cash credit facilities in Pune and PCMC. Interest on daily utilisation, annual renewal, stock statements, and when a limit beats a term loan.',
      keywords: [
        'business overdraft Pune',
        'cash credit limit PCMC',
        'OD facility for business Pune',
        'working capital limit Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'msme-loan',
    parent: 'business-loan',
    group: 'Schemes & sectors',
    name: 'MSME Loan',
    shortName: 'MSME',
    tagline: 'Udyam registration is the key that opens the cheaper door.',
    angle:
      'MSME classification is not paperwork for its own sake: it admits a business to guarantee-backed schemes that lend without collateral at rates an ordinary unsecured facility cannot match.',
    summary:
      'Priority-sector and guarantee-backed lending for micro, small and medium enterprises registered under Udyam.',
    intro: [
      'A business registered on the Udyam portal is classified as micro, small or medium by its investment in plant and machinery and its turnover. That classification carries real consequences for borrowing. MSME lending is priority-sector for banks, which gives them a reason to do it, and several central schemes provide a credit guarantee that removes the need for collateral on facilities up to substantial limits.',
      'The practical effect is that a small business with no property to pledge can often borrow at a rate well below what a purely unsecured commercial facility would cost, precisely because the lender\'s risk is guaranteed rather than unsecured. Registration itself is free and takes minutes on the portal, requiring only Aadhaar and PAN. It is one of the few pieces of administration in Indian lending that reliably pays for itself, and a surprising number of eligible businesses have never done it.',
    ],
    points: [
      {
        title: 'Udyam registration is free and quick',
        body: 'Self-declared on the government portal with Aadhaar and PAN. It costs nothing and is a precondition for most MSME schemes.',
      },
      {
        title: 'Guarantee cover can replace collateral',
        body: 'Central guarantee schemes let lenders extend facilities without security, which is the single biggest advantage available to a small business with no property.',
      },
      {
        title: 'Priority-sector status gives banks a reason to lend',
        body: 'MSME advances count towards regulatory targets. That changes a bank\'s appetite for a file it might otherwise pass over.',
      },
      {
        title: 'Classification limits are worth watching',
        body: 'Investment and turnover thresholds determine micro, small or medium status, and crossing one changes which schemes apply.',
      },
    ],
    eligibility: [
      { criterion: 'Registration', detail: 'Valid Udyam registration certificate' },
      { criterion: 'Classification', detail: 'Within investment and turnover limits for micro, small or medium' },
      { criterion: 'Vintage', detail: 'Varies by scheme; some cover new enterprises' },
      { criterion: 'Filings', detail: 'ITR and GST returns where applicable' },
      { criterion: 'Credit record', detail: 'No existing default; promoter CIBIL assessed' },
    ],
    documents: [
      { label: 'Udyam registration certificate', note: 'Mandatory for scheme eligibility' },
      { label: 'ITR and financials', note: 'Last 2 years where available' },
      { label: 'GST returns', note: 'Where registered' },
      { label: 'Bank statements', note: '6–12 months' },
      { label: 'Project report', note: 'For scheme-linked term funding' },
    ],
    faqs: [
      {
        q: 'Do I need Udyam registration to get a business loan?',
        a: 'Not for an ordinary commercial loan, but you do for MSME schemes, and those are usually the cheaper option. Registration is free, takes a few minutes online, and needs only Aadhaar and PAN. There is very little reason for an eligible business not to have it.',
      },
      {
        q: 'Can I get an MSME loan without collateral?',
        a: 'Frequently, yes. Central credit guarantee schemes allow lenders to extend facilities without security up to substantial limits, with a guarantee fee in place of collateral. It is the main route for a small business that owns no property.',
      },
      {
        q: 'Which banks lend under these schemes?',
        a: 'Most public sector banks, many private banks and a number of NBFCs participate, but appetite and turnaround differ enormously between them for the same file. That difference is what a panel is for.',
      },
    ],
    seo: {
      title: 'MSME Loan in Pune & PCMC: Udyam & Guarantee Schemes | PayYou',
      description:
        'MSME lending for micro, small and medium enterprises in Pune. Udyam registration, collateral-free guarantee-backed facilities, and which lenders actually move quickly.',
      keywords: [
        'MSME loan Pune',
        'Udyam registered business loan PCMC',
        'collateral free MSME loan Pune',
        'small business loan Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'machinery-loan',
    parent: 'business-loan',
    group: 'Schemes & sectors',
    name: 'Machinery & Equipment Loan',
    shortName: 'Machinery',
    tagline: 'The machine secures its own purchase.',
    angle:
      'Because the equipment itself is hypothecated, pricing sits below an unsecured business loan without any property being pledged, and the margin you contribute is the main variable.',
    summary:
      'Funding for plant, machinery and equipment, secured on the asset being purchased rather than on property.',
    intro: [
      'Equipment finance solves a problem that unsecured lending handles badly: a large, single, identifiable purchase with a long earning life. The machine is hypothecated to the lender, which means the loan is secured without any property entering the picture. Pricing therefore sits between a property-backed facility and an unsecured one, and tenures follow the asset\'s useful life rather than the three to five years an unsecured loan would impose.',
      'Two variables move the outcome most. The margin, meaning the share of the invoice you fund yourself, typically runs from ten to twenty-five per cent and a larger contribution improves both rate and approval odds. And whether the equipment is new or used: new machinery from an established manufacturer with a dealer network is straightforward, while used or imported equipment requires a valuation, and some lenders decline it outright because resale value is harder to establish.',
    ],
    points: [
      {
        title: 'The asset is the security',
        body: 'Hypothecation of the machine means no property charge is created, which keeps other assets free for future borrowing.',
      },
      {
        title: 'Margin drives the pricing',
        body: 'The larger your own contribution to the invoice, the better the terms. It is often the most effective lever available on this product.',
      },
      {
        title: 'Used and imported equipment is harder',
        body: 'A valuation is required and several lenders will not fund it. Where the purchase is second-hand, the shortlist narrows sharply.',
      },
      {
        title: 'Dealer tie-ups can be quicker but not cheaper',
        body: 'Manufacturer finance arms process fast, and their rate is not always the best available. Compare before signing at the dealership.',
      },
    ],
    eligibility: [
      { criterion: 'Purpose', detail: 'Purchase of new or, with some lenders, used plant and machinery' },
      { criterion: 'Business vintage', detail: 'Usually 2–3 years of operation' },
      { criterion: 'Margin', detail: 'Own contribution commonly 10–25% of invoice value' },
      { criterion: 'Financials', detail: '2 years ITR and audited statements where applicable' },
    ],
    documents: [
      { label: 'Proforma invoice', note: 'From the equipment supplier' },
      { label: 'Valuation report', note: 'For used or imported machinery' },
      { label: 'ITR and financials', note: 'Last 2–3 years' },
      { label: 'Bank statements', note: '6–12 months' },
      { label: 'Business registration', note: 'Udyam, GST and constitution documents' },
    ],
    faqs: [
      {
        q: 'Do I have to pledge property as well?',
        a: 'Usually not. The machine itself is hypothecated to the lender, which is what makes this cheaper than an unsecured business loan. Some lenders ask for a collateral top-up on larger tickets or for a business with limited vintage.',
      },
      {
        q: 'Can I finance second-hand machinery?',
        a: 'Some lenders do, with a valuation report and usually a lower loan-to-value and a shorter tenure. Others decline used equipment entirely because resale value is difficult to establish. The panel is considerably narrower than for new machines.',
      },
      {
        q: 'Is dealer finance a good idea?',
        a: 'It is fast and convenient, and it is often not the cheapest. Manufacturer finance arms price for convenience. It is worth taking the proforma invoice to two or three other lenders before signing at the dealership.',
      },
    ],
    seo: {
      title: 'Machinery & Equipment Loan in Pune & Chakan | PayYou Advisory',
      description:
        'Plant and machinery finance in Pune, Chakan and Bhosari. Hypothecation instead of property, how margin drives pricing, and what changes for used equipment.',
      keywords: [
        'machinery loan Pune',
        'equipment finance Chakan',
        'plant and machinery loan PCMC',
        'CNC machine loan Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'invoice-discounting',
    parent: 'business-loan',
    group: 'Schemes & sectors',
    name: 'Invoice Discounting & Supply Chain Finance',
    shortName: 'Invoice discounting',
    tagline: 'Borrow against the buyer, not against yourself.',
    angle:
      'Underwriting shifts to your customer\'s credit standing, which is why a small supplier to a large corporate can raise money on terms its own balance sheet would never support.',
    summary:
      'Converting approved receivables into cash before the due date, priced on the buyer\'s credit rather than the supplier\'s.',
    intro: [
      'A supplier who invoices on sixty or ninety day terms has money it has earned but cannot use. Invoice discounting releases most of that value immediately: the financier advances a proportion of the approved invoice, and recovers it when the buyer pays. The distinguishing feature is whose credit is being assessed. Because repayment comes from the buyer, it is the buyer\'s standing that determines the terms.',
      'That inversion is the entire value of the product for a small business. A modest firm supplying a large, well-rated corporate can obtain funding at a cost reflecting that corporate\'s credit, not its own. Supply chain finance programmes formalise this: a large buyer sponsors a facility across its supplier base, and its suppliers draw against approved invoices at rates none of them could obtain independently. Where a business sells to strong counterparties on long terms, this is usually the cheapest working capital available to it.',
    ],
    points: [
      {
        title: 'Your customer\'s credit sets the price',
        body: 'Selling to a large, well-rated buyer can produce funding costs far below what your own balance sheet would command.',
      },
      {
        title: 'It scales with sales, not with a fixed limit',
        body: 'Available funding grows as invoicing grows, which suits a business expanding faster than an annual limit review can follow.',
      },
      {
        title: 'With or without recourse changes everything',
        body: 'With recourse, you carry the risk if the buyer does not pay. Without recourse, the financier does, at a higher cost. Confirm which is on offer.',
      },
      {
        title: 'The buyer usually has to acknowledge the invoice',
        body: 'Most programmes need the buyer to confirm the invoice and, in some cases, to agree to pay the financier directly. That conversation cannot be avoided.',
      },
    ],
    eligibility: [
      { criterion: 'Receivables', detail: 'Invoices to creditworthy corporate or institutional buyers' },
      { criterion: 'Terms', detail: 'Credit periods typically 30–120 days' },
      { criterion: 'Buyer standing', detail: 'The principal factor; buyer rating drives pricing' },
      { criterion: 'Trade history', detail: 'An established supply relationship with the buyer' },
    ],
    documents: [
      { label: 'Invoices', note: 'Approved and acknowledged by the buyer' },
      { label: 'Purchase orders', note: 'Supporting the invoiced supply' },
      { label: 'Buyer details', note: 'Counterparty identity and payment history' },
      { label: 'GST returns', note: 'Corroborating the invoices raised' },
      { label: 'Bank statements', note: '6–12 months' },
    ],
    faqs: [
      {
        q: 'Does my buyer have to know?',
        a: 'In most programmes, yes. The buyer usually acknowledges the invoice and often pays the financier directly. Confidential arrangements exist but are less common and cost more. If the relationship makes that conversation difficult, this may not be the right product.',
      },
      {
        q: 'What if the buyer does not pay?',
        a: 'It depends on recourse. With recourse, you must repay the financier and pursue the buyer yourself. Without recourse, the financier absorbs the loss, and prices for it. Establish which structure you are being offered before you draw.',
      },
      {
        q: 'How is this better than an overdraft?',
        a: 'It is priced off your customer\'s credit rather than yours, so a small supplier to a large corporate usually gets better terms here. It also grows with your invoicing instead of being capped by an annual limit review.',
      },
    ],
    seo: {
      title: 'Invoice Discounting & Supply Chain Finance in Pune | PayYou',
      description:
        'Receivables finance for Pune and Chakan suppliers. Funding priced on your buyer\'s credit, recourse versus non-recourse, and how supply chain programmes work.',
      keywords: [
        'invoice discounting Pune',
        'bill discounting PCMC',
        'supply chain finance Chakan',
        'receivables finance Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'merchant-cash-advance',
    parent: 'business-loan',
    group: 'How it is structured',
    name: 'Merchant Cash Advance',
    shortName: 'Merchant advance',
    tagline: 'Repaid as a slice of daily card settlements.',
    angle:
      'Repayment flexes with takings rather than following a fixed EMI, which suits a seasonal retailer and makes the true annualised cost much harder to see than a stated rate suggests.',
    summary:
      'An advance against future card and digital sales, recovered as a percentage of daily settlements rather than as a fixed monthly instalment.',
    intro: [
      'For a retailer, restaurant or salon whose takings arrive through card terminals and digital payments, a merchant cash advance offers a repayment shape that matches the business. The financier advances a sum and recovers a fixed percentage of each day\'s settlements until the agreed amount is repaid. A quiet week repays less; a busy one repays more. There is no fixed EMI to find on a slow month, which for a seasonal business is a genuine benefit.',
      'The cost deserves scrutiny, because it is usually quoted in a form that obscures it. Merchant advances are often priced as a factor rate or a total repayment amount rather than as an annual percentage. A repayment of 1.2 times the advance sounds mild, and if it is recovered in six months the annualised cost is far higher than that framing suggests. Ask for the effective annual rate and the expected repayment period, and compare that figure against an overdraft before deciding.',
    ],
    points: [
      {
        title: 'Repayment follows takings',
        body: 'A percentage of daily settlements is retained. Slow periods repay less, which removes the fixed-EMI pressure that hurts seasonal businesses.',
      },
      {
        title: 'A factor rate is not an interest rate',
        body: 'A stated multiple of the advance says nothing about the annualised cost until you know the repayment period. Always convert it.',
      },
      {
        title: 'Card settlement history is the qualification',
        body: 'Six to twelve months of terminal or gateway settlements is the primary evidence. Vintage and financials matter less than on other products.',
      },
      {
        title: 'Compare against an overdraft first',
        body: 'Where the business can carry a fixed repayment, a limit or a term loan is usually materially cheaper. Convenience is what you are paying for here.',
      },
    ],
    eligibility: [
      { criterion: 'Sales channel', detail: 'Consistent card or digital settlements through a terminal or gateway' },
      { criterion: 'Settlement history', detail: '6–12 months of records' },
      { criterion: 'Business vintage', detail: 'Often as little as 1 year' },
      { criterion: 'Sector', detail: 'Retail, food service, salons and similar consumer-facing trades' },
    ],
    documents: [
      { label: 'Card settlement statements', note: '6–12 months from the acquirer or gateway' },
      { label: 'Bank statements', note: '6–12 months' },
      { label: 'Business registration', note: 'GST, Udyam or shop licence' },
      { label: 'KYC', note: 'Proprietor or partner identity and address' },
    ],
    faqs: [
      {
        q: 'What does it actually cost?',
        a: 'Ask for the effective annual rate rather than the factor rate. A repayment of 1.2 times the advance recovered over six months is a much higher annualised cost than the multiple suggests. That conversion is the only way to compare it with an overdraft.',
      },
      {
        q: 'What happens in a bad month?',
        a: 'You repay less, because the recovery is a percentage of what actually settles. That is the main advantage of the structure, and it means the repayment period stretches rather than the payment being missed.',
      },
      {
        q: 'Do I need collateral or a long trading history?',
        a: 'Usually neither. The card settlement record is the primary evidence, and some financiers work with as little as a year of trading. That accessibility is part of why it is priced above conventional facilities.',
      },
    ],
    seo: {
      title: 'Merchant Cash Advance for Retailers in Pune | PayYou Advisory',
      description:
        'Advances against card settlements for Pune retailers, restaurants and salons. How repayment flexes with takings, and how to convert a factor rate into a real cost.',
      keywords: [
        'merchant cash advance Pune',
        'card settlement loan PCMC',
        'POS loan for shop Pune',
        'retail business advance Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'business-loan-without-itr',
    parent: 'business-loan',
    group: 'Difficult files',
    name: 'Business Loan Without ITR or for a New Business',
    shortName: 'Without ITR',
    tagline: 'Thin filings narrow the panel; they do not close it.',
    angle:
      'Where returns are missing or the business is under two years old, lenders substitute other evidence: GST filings, banking turnover, card settlements or a guarantee scheme, and each opens a different set of doors.',
    summary:
      'Routes for businesses with limited filed returns, short vintage, or no ITR at all.',
    intro: [
      'A conventional business loan assessment starts with two or three years of filed returns. A business that has traded for eighteen months, or one whose filings do not reflect its actual trade, does not fit that template, and applying to conventional lenders in sequence produces a series of declines and a damaged bureau report.',
      'The alternatives are real but specific. GST returns can substitute for ITR with lenders that assess on filed turnover. Banking-surrogate programmes underwrite on twelve months of credits without requiring returns at all. Card settlement records support an advance for consumer-facing businesses. Guarantee-backed MSME schemes cover new enterprises where conventional appetite does not exist. And where a promoter owns property, a secured facility ignores vintage almost entirely. The task is choosing the right one first rather than discovering it after four rejections.',
    ],
    points: [
      {
        title: 'GST returns can stand in for ITR',
        body: 'Several lenders assess turnover directly from GST filings. Consistent returns over four quarters are the evidence they want.',
      },
      {
        title: 'Banking-surrogate programmes ignore returns',
        body: 'Twelve months of current-account credits, assessed as turnover, is enough for some NBFCs. Pricing is above a documented file and it is available.',
      },
      {
        title: 'Property makes vintage almost irrelevant',
        body: 'A secured facility against a promoter\'s property is the most reliable route for a young business, and by a distance the cheapest.',
      },
      {
        title: 'Do not apply everywhere at once',
        body: 'Each application is a hard enquiry. Four declines in a month damage the file and make the fifth lender harder to convince.',
      },
    ],
    eligibility: [
      { criterion: 'Vintage', detail: 'From 6–12 months on surrogate programmes; under 2 years is workable' },
      { criterion: 'Evidence', detail: 'GST returns, banking turnover, card settlements or security in place of ITR' },
      { criterion: 'Banking', detail: '12 months of statements is usually the minimum' },
      { criterion: 'Promoter credit', detail: 'Personal CIBIL carries more weight where business history is thin' },
    ],
    documents: [
      { label: 'Bank statements', note: '12 months, all operating accounts' },
      { label: 'GST returns', note: 'Last 4 quarters where registered' },
      { label: 'Business registration', note: 'Udyam, shop licence or incorporation documents' },
      { label: 'Card settlements', note: 'Where the business takes digital payments' },
      { label: 'Promoter KYC and credit', note: 'PAN, Aadhaar and personal bureau record' },
    ],
    faqs: [
      {
        q: 'Can I get a business loan with no ITR at all?',
        a: 'Yes, on a narrower panel and at a higher price. GST-based and banking-surrogate programmes assess turnover from filings or credits without requiring returns. If a promoter owns property, a secured facility is usually available and much cheaper.',
      },
      {
        q: 'My business is one year old. Is that too new?',
        a: 'For most conventional lenders, yes. Some NBFC surrogate programmes start at six to twelve months, and guarantee-backed MSME schemes cover new enterprises. A secured facility against property largely sidesteps the vintage question.',
      },
      {
        q: 'Should I just apply to several lenders and see?',
        a: 'No. Every application is a hard enquiry on your report, and a run of declines makes the next lender materially harder to convince. Shortlisting first is not a courtesy, it is what protects the file.',
      },
    ],
    seo: {
      title: 'Business Loan Without ITR or for a New Business | PayYou',
      description:
        'Funding for young Pune businesses and those without filed returns. GST-based assessment, banking surrogates, guarantee schemes and secured routes compared.',
      keywords: [
        'business loan without ITR Pune',
        'new business loan PCMC',
        'business loan without income proof Pune',
        'startup business loan Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'business-loan-on-gst',
    parent: 'business-loan',
    group: 'Difficult files',
    name: 'Business Loan on GST Returns',
    shortName: 'On GST returns',
    tagline: 'Your filings become the income proof.',
    angle:
      'GST-based assessment reads declared turnover directly from GSTR filings, which suits a business whose sales are fully invoiced but whose ITR understates what it earns.',
    summary:
      'Lending assessed from GST turnover rather than from filed profit, for registered businesses with consistent returns.',
    intro: [
      'GST-based lending emerged from a straightforward observation: a registered business files its sales with the government every month or quarter, and those filings are far harder to dress up than a set of annual accounts. Lenders now read GSTR-1 and GSTR-3B directly, derive turnover from them, and size a facility as a multiple of monthly sales. For many businesses this produces a larger and faster sanction than an ITR-based assessment would.',
      'It suits a particular profile. Sales must be substantially invoiced through GST rather than conducted in cash, filings must be current and consistent, and the turnover trend matters as much as its level, since a declining line invites questions. Where a business genuinely trades well but files a modest profit after depreciation and remuneration, GST assessment often reflects reality better than the return does. Where a large share of trade sits outside the GST net, it will understate the business instead.',
    ],
    points: [
      {
        title: 'Filings must be current',
        body: 'Lapsed or irregular returns stop these programmes immediately. Bringing filings up to date is the first step, not an afterthought.',
      },
      {
        title: 'The trend is read, not just the total',
        body: 'A rising turnover line supports a larger sanction. A falling one prompts questions that need a good answer.',
      },
      {
        title: 'It can beat an ITR assessment',
        body: 'Where tax planning has compressed declared profit, turnover-based sizing often produces a materially larger facility.',
      },
      {
        title: 'Cash trade is invisible here',
        body: 'Sales outside the GST net do not count. A business trading substantially in cash will be understated by this method.',
      },
    ],
    eligibility: [
      { criterion: 'Registration', detail: 'Active GST registration with a filing history' },
      { criterion: 'Filing record', detail: 'Usually 12 months of consistent GSTR-1 and GSTR-3B' },
      { criterion: 'Turnover', detail: 'Lender minimums vary; consistency matters as much as scale' },
      { criterion: 'Banking', detail: 'Statements corroborating the filed turnover' },
    ],
    documents: [
      { label: 'GST returns', note: 'GSTR-1 and GSTR-3B, last 12 months' },
      { label: 'GST registration certificate', note: 'Current and active' },
      { label: 'Bank statements', note: '6–12 months' },
      { label: 'ITR', note: 'Where available; not always required' },
      { label: 'KYC', note: 'Promoter and entity' },
    ],
    faqs: [
      {
        q: 'How much can I borrow against my GST turnover?',
        a: 'It is generally computed as a multiple of average monthly turnover, and the multiple differs across lenders. The trend matters too: consistent or rising sales support a larger facility than the same total on a declining line.',
      },
      {
        q: 'I file GST but have not filed ITR for last year. Is that a problem?',
        a: 'For a purely GST-based programme, often not. For most other lenders it is a real obstacle. It also narrows your options considerably, so bringing the return up to date usually opens a much better set of offers.',
      },
      {
        q: 'A lot of my sales are in cash. Does this suit me?',
        a: 'Probably not. GST-based assessment only sees invoiced sales, so a business with substantial cash trade will be understated. A banking-surrogate programme that reads total account credits usually gives a fairer picture.',
      },
    ],
    seo: {
      title: 'Business Loan on GST Returns in Pune & PCMC | PayYou Advisory',
      description:
        'GST-based business lending in Pune. How turnover from GSTR filings sizes a facility, why the trend matters, and when it beats an ITR assessment.',
      keywords: [
        'business loan on GST Pune',
        'GST return based loan PCMC',
        'loan against GST turnover Pune',
        'GST business finance Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'business-loan-balance-transfer',
    parent: 'business-loan',
    group: 'On an existing loan',
    name: 'Business Loan Balance Transfer',
    shortName: 'Balance transfer',
    tagline: 'Refinance the rate, and check what it does to the covenants.',
    angle:
      'A business transfer moves more than pricing: security, covenants, drawing power and reporting obligations are all renegotiated, and a lower rate with tighter terms can be the worse deal.',
    summary:
      'Moving an existing business facility to another lender for better pricing, a larger limit or looser terms.',
    intro: [
      'Refinancing a business facility is a bigger exercise than transferring a personal loan, and the rate is only part of what changes. Where the facility is secured, the charge has to be released by the outgoing lender and recreated by the incoming one, which takes weeks and carries legal and stamp costs. Where it is a working-capital limit, drawing power computation, stock statement frequency and covenant tests may all be defined differently by the new lender.',
      'That makes the comparison a broader one. A facility a percentage point cheaper but with a tighter drawing power formula can leave a business with less usable money than the dearer one it replaced. Conversely, the best reason to move is frequently not price at all: an enhanced limit that finally matches turnover, a lender that understands the sector, or release from a covenant that has become impossible to meet. Establish what problem the transfer solves before treating the rate as the answer.',
    ],
    points: [
      {
        title: 'Compare drawing power, not just the rate',
        body: 'How the new lender computes usable limit against stock and receivables can matter more to your cash position than the interest rate.',
      },
      {
        title: 'Charge release and recreation take weeks',
        body: 'A no-objection certificate from the existing lender, release of the charge and a fresh charge with the registrar all take time and carry cost.',
      },
      {
        title: 'Read the covenants before signing',
        body: 'Ratio tests, reporting frequency and end-use restrictions differ. A cheaper facility with covenants you cannot meet is not cheaper.',
      },
      {
        title: 'Enhancement is often the real prize',
        body: 'Many transfers are worth doing because the limit finally matches the business, not because of a fraction of a percent on the rate.',
      },
    ],
    eligibility: [
      { criterion: 'Existing facility', detail: 'Running business loan, term loan or working-capital limit' },
      { criterion: 'Conduct', detail: 'Clean repayment record, no overdue or irregular limits' },
      { criterion: 'Financials', detail: 'Current audited statements and up-to-date filings' },
      { criterion: 'Security', detail: 'Where secured, clear title and an obtainable no-objection certificate' },
    ],
    documents: [
      { label: 'Sanction letter', note: 'Of the existing facility, with the current terms' },
      { label: 'Loan statement', note: 'Repayment and conduct history' },
      { label: 'No-objection certificate', note: 'From the existing lender, for secured facilities' },
      { label: 'Audited financials', note: 'Last 2–3 years' },
      { label: 'Security documents', note: 'Title papers where property is charged' },
    ],
    faqs: [
      {
        q: 'How long does a business loan transfer take?',
        a: 'Unsecured facilities can move in two to three weeks. Anything secured takes longer, because the outgoing lender must release its charge and the incoming one must create a fresh one, and both involve the registrar. Six weeks is common.',
      },
      {
        q: 'Is a lower rate always worth moving for?',
        a: 'No. If the new lender computes drawing power more conservatively, or imposes covenants you will struggle with, you can end up with less usable money on a cheaper facility. Compare the whole structure, not one number.',
      },
      {
        q: 'Can I increase the limit at the same time?',
        a: 'Frequently that is the point. An enhancement alongside the transfer is common where turnover has outgrown the existing limit, and it is often a better reason to move than the pricing.',
      },
    ],
    seo: {
      title: 'Business Loan Balance Transfer in Pune & PCMC | PayYou',
      description:
        'Refinance a business loan or working-capital limit in Pune. Charge release, drawing power, covenants and enhancement compared, not just the interest rate.',
      keywords: [
        'business loan balance transfer Pune',
        'business loan takeover PCMC',
        'refinance business loan Pune',
        'working capital limit transfer Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'business-loan-for-women',
    parent: 'business-loan',
    group: 'Who it is for',
    name: 'Business Loan for Women Entrepreneurs',
    shortName: 'Women entrepreneurs',
    tagline: 'Where the schemes are genuine, and worth the paperwork.',
    angle:
      'Unlike the token concessions on personal loans, several central and state schemes for women-owned enterprises carry real subsidy or guarantee cover, and the qualifying test is the ownership share.',
    summary:
      'Funding for enterprises majority-owned by women, including the guarantee and subsidy schemes that make the difference worth pursuing.',
    intro: [
      'Concessions for women borrowers are frequently nominal in retail lending. In enterprise lending they are not. Several central and state programmes carry genuine benefits for women-owned businesses: guarantee cover that removes the collateral requirement, interest subvention on certain scheme loans, and preferential treatment in priority-sector targets that changes a bank\'s willingness to look at a small file at all.',
      'The qualifying test is usually ownership rather than management. Most schemes require a woman or women to hold a majority stake, commonly fifty-one per cent, in a proprietorship, partnership or company, with the shareholding documented. A business run day to day by a woman but majority-owned by someone else generally will not qualify. Where the structure does fit, registering under Udyam and identifying the right scheme before approaching lenders is what converts an eligibility into an actual saving.',
    ],
    points: [
      {
        title: 'Majority ownership is the qualifying test',
        body: 'Most schemes require women to hold at least 51% of the enterprise, evidenced by the deed or shareholding, not merely to run it.',
      },
      {
        title: 'Guarantee cover can replace collateral',
        body: 'Scheme-backed facilities let a lender extend credit without security, which is the most valuable feature for a business with no property.',
      },
      {
        title: 'Udyam registration comes first',
        body: 'Almost every scheme routes through MSME classification. Registering is free and is the precondition for the rest.',
      },
      {
        title: 'Bank appetite varies enormously',
        body: 'Public sector banks generally run these schemes more actively than private lenders. Choosing the right institution matters more than negotiating.',
      },
    ],
    eligibility: [
      { criterion: 'Ownership', detail: 'Typically 51% or more held by one or more women' },
      { criterion: 'Registration', detail: 'Udyam registration for MSME-linked schemes' },
      { criterion: 'Vintage', detail: 'Varies by scheme; several cover new enterprises' },
      { criterion: 'Documentation', detail: 'Shareholding or partnership deed evidencing the ownership share' },
    ],
    documents: [
      { label: 'Ownership proof', note: 'Partnership deed, shareholding pattern or proprietorship declaration' },
      { label: 'Udyam registration', note: 'For scheme eligibility' },
      { label: 'ITR and financials', note: 'Where the business has trading history' },
      { label: 'Bank statements', note: '6–12 months' },
      { label: 'Project report', note: 'For new enterprises under scheme funding' },
    ],
    faqs: [
      {
        q: 'Are women\'s business loan schemes actually better, or is it marketing?',
        a: 'In enterprise lending they are genuinely better, unlike the token concessions on personal loans. Guarantee cover that removes the collateral requirement, and interest subvention on some schemes, are real and material. The paperwork is worth doing.',
      },
      {
        q: 'I run the business but my husband owns most of it. Do I qualify?',
        a: 'Usually not. Most schemes test ownership rather than management, commonly requiring women to hold at least 51%. Restructuring the shareholding is possible, but it is a genuine legal and tax decision rather than a formality.',
      },
      {
        q: 'Can a new business apply?',
        a: 'Several schemes are designed for new enterprises, which is unusual in business lending. A project report and Udyam registration are normally required, and public sector banks are generally the more active participants.',
      },
    ],
    seo: {
      title: 'Business Loan for Women Entrepreneurs in Pune | PayYou',
      description:
        'Enterprise funding for women-owned businesses in Pune and PCMC. Guarantee cover, subsidy schemes, the 51% ownership test, and which lenders actually run them.',
      keywords: [
        'business loan for women Pune',
        'women entrepreneur loan PCMC',
        'mahila udyam loan Pune',
        'women business scheme loan Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'business-loan-for-professionals',
    parent: 'business-loan',
    group: 'Who it is for',
    name: 'Business Loan for Doctors, CAs & Professionals',
    shortName: 'For professionals',
    tagline: 'Funding the practice, not the person.',
    angle:
      'A professional practice borrows against professional standing rather than against turnover history, which lets a clinic or a firm raise setup capital that an ordinary business of the same age could not.',
    summary:
      'Practice finance for doctors, chartered accountants, architects and other qualified professionals, for setup, equipment and expansion.',
    intro: [
      'A professional practice sits awkwardly between the personal and business categories. It has a business\'s costs, including premises, equipment and staff, but its earning capacity rests on an individual qualification rather than on a trading history. Conventional business lending, which wants two or three years of returns, handles a newly established practice badly.',
      'Dedicated professional programmes resolve this by underwriting the qualification. A registered doctor setting up a clinic, or a chartered accountant establishing a firm, can raise setup and equipment finance on the strength of the degree and council registration, sometimes before a full year of practice accounts exists. Amounts are meaningful, tenures are long, and pricing sits well below a general unsecured business facility. Where the money is for equipment specifically, an equipment facility hypothecating the asset is usually cheaper still, and worth comparing before taking the general programme.',
    ],
    points: [
      {
        title: 'The qualification substitutes for trading history',
        body: 'Degree and council registration let a practice borrow at a vintage where an ordinary business would be refused.',
      },
      {
        title: 'Setup finance is genuinely available',
        body: 'Clinic fit-out, premises deposit and initial equipment can be funded before a full year of practice accounts exists.',
      },
      {
        title: 'Compare against equipment finance',
        body: 'Where the requirement is a specific machine, hypothecating that asset usually prices below a general professional facility.',
      },
      {
        title: 'Practice premises change the arithmetic',
        body: 'If the practice owns or is buying its premises, a property-backed facility is materially cheaper and worth structuring towards.',
      },
    ],
    eligibility: [
      { criterion: 'Qualification', detail: 'Registered doctor, dentist, CA, CS, architect or similar' },
      { criterion: 'Registration', detail: 'Valid council registration or certificate of practice' },
      { criterion: 'Practice vintage', detail: 'Often 1–3 years; some programmes fund setup' },
      { criterion: 'Purpose', detail: 'Setup, equipment, premises, working capital or expansion' },
    ],
    documents: [
      { label: 'Degree and registration', note: 'Qualification certificate and council registration' },
      { label: 'Practice proof', note: 'Clinic or office registration, lease or ownership papers' },
      { label: 'ITR and financials', note: 'Where the practice has trading history' },
      { label: 'Bank statements', note: '6–12 months' },
      { label: 'Quotation', note: 'For equipment or fit-out being funded' },
    ],
    faqs: [
      {
        q: 'Can I borrow to set up a new clinic with no practice history?',
        a: 'Often yes, which is the main advantage of a professional programme. Degree and council registration carry the file where a conventional business lender would want two years of returns. Amounts are meaningful and tenures are long.',
      },
      {
        q: 'Is this different from a personal loan for doctors?',
        a: 'Yes. A professional personal loan funds the individual with no end-use restriction. This funds the practice, usually at a larger size and longer tenure, with the purpose defined. For a clinic setup, this is the cheaper instrument.',
      },
      {
        q: 'What if I am buying the clinic premises?',
        a: 'Then a property-backed facility is almost certainly the right route: a commercial property loan or loan against property will price several points below an unsecured professional facility and run far longer.',
      },
    ],
    seo: {
      title: 'Practice Loan for Doctors, CAs & Professionals in Pune | PayYou',
      description:
        'Practice finance in Pune and PCMC for clinics, firms and consultancies. Setup and equipment funding on professional standing rather than trading history.',
      keywords: [
        'clinic setup loan Pune',
        'professional practice loan PCMC',
        'doctor business loan Pune',
        'CA firm loan Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'promoter-funding',
    parent: 'business-loan',
    group: 'Schemes & sectors',
    name: 'Structured Finance & Promoter Funding',
    shortName: 'Structured finance',
    tagline: 'For requirements that no standard product fits.',
    angle:
      'Structured facilities are negotiated rather than applied for: security, repayment and covenants are designed around a specific transaction, which is why they exist at ticket sizes where bespoke work is worth doing.',
    summary:
      'Bespoke facilities for acquisitions, promoter stake funding and situations that standard products cannot accommodate.',
    intro: [
      'Some requirements do not fit a product sheet. Funding a promoter to increase a stake, financing an acquisition, bridging between a committed sale and a purchase, or raising against an asset with an unusual cash-flow profile are all situations where standard underwriting has no template. Structured finance is what fills the gap: a facility designed around the transaction, with security, repayment schedule and covenants negotiated rather than selected.',
      'It works differently from ordinary borrowing in ways worth stating plainly. Diligence is deeper and slower, and the lender will want to understand the transaction thoroughly rather than tick a checklist. Pricing reflects both the complexity and the bespoke work involved. And ticket sizes are meaningful, because the cost of structuring cannot be justified on a small facility. Where a requirement genuinely has no standard answer, this is the route. Where a standard product would in fact serve, it is an expensive way to arrive at the same place.',
    ],
    points: [
      {
        title: 'The structure is negotiated, not selected',
        body: 'Security, repayment shape, moratorium and covenants are designed around the transaction rather than taken from a product sheet.',
      },
      {
        title: 'Diligence is deeper and slower',
        body: 'Expect the lender to examine the underlying transaction closely. Timelines run to months rather than weeks.',
      },
      {
        title: 'Ticket size has to justify the work',
        body: 'Bespoke structuring is not economic on small facilities. Below a certain size, a standard product will serve better and cost less.',
      },
      {
        title: 'Bring the transaction, not just the number',
        body: 'These conversations start from what is being done and why. A well-documented transaction rationale moves a file faster than financials alone.',
      },
    ],
    eligibility: [
      { criterion: 'Transaction', detail: 'A defined purpose: acquisition, stake purchase, bridge or restructuring' },
      { criterion: 'Scale', detail: 'Meaningful ticket sizes; small requirements suit standard products' },
      { criterion: 'Security', detail: 'Usually a combination of assets, shares, receivables or guarantees' },
      { criterion: 'Financials', detail: 'Audited statements, projections and full transaction documentation' },
    ],
    documents: [
      { label: 'Transaction documents', note: 'Term sheets, agreements or share purchase papers' },
      { label: 'Audited financials', note: 'Last 3 years, entity and group' },
      { label: 'Projections', note: 'With the assumptions stated' },
      { label: 'Security particulars', note: 'Assets, shareholding or guarantees offered' },
      { label: 'Group structure', note: 'Where multiple entities are involved' },
    ],
    faqs: [
      {
        q: 'What counts as structured finance?',
        a: 'Anything a standard product cannot accommodate: funding a promoter to increase a stake, financing an acquisition, bridging between a sale and a purchase, or borrowing against an asset with an irregular cash-flow profile. The defining feature is that the structure is designed rather than chosen.',
      },
      {
        q: 'How long does it take?',
        a: 'Months rather than weeks. Diligence is deeper, the lender wants to understand the underlying transaction, and documentation is negotiated. Where speed matters more than structure, a standard secured facility is usually the better answer.',
      },
      {
        q: 'Is there a minimum size?',
        a: 'In practice, yes. Bespoke structuring involves legal and diligence costs that cannot be justified on a small facility. Below a certain ticket, a conventional secured or term facility will serve the same purpose more cheaply.',
      },
    ],
    seo: {
      title: 'Structured Finance & Promoter Funding in Pune | PayYou Advisory',
      description:
        'Bespoke facilities for acquisitions, promoter stake funding and bridge requirements in Pune. How structured deals are negotiated, and when a standard product is better.',
      keywords: [
        'structured finance Pune',
        'promoter funding PCMC',
        'acquisition finance Pune',
        'bridge loan for business Pimpri Chinchwad',
      ],
    },
  },
]
