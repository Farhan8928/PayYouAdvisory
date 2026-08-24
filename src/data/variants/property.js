/**
 * Loan Against Property and Gold Loan variants.
 *
 * Both are secured products, and both are chosen for the same underlying
 * reason: an asset the borrower already owns can raise money far more cheaply
 * than their income alone can. See ../variants.js for the rule on numbers.
 */

export const PROPERTY = [
  {
    slug: 'residential-property-loan',
    parent: 'loan-against-property',
    group: 'What you are pledging',
    name: 'Loan Against Residential Property',
    shortName: 'Residential',
    tagline: 'The cheapest large sum most families can raise.',
    angle:
      'A self-occupied house attracts the best loan-to-value and the finest pricing in the whole property-backed category, because it is the security a lender is most confident of realising.',
    summary:
      'Borrowing against a house or flat you own, whether self-occupied or let, for any purpose.',
    intro: [
      'A loan against residential property is the least expensive way most households can raise a large sum. The house is mortgaged, the money is yours to use for any purpose, and because the security is strong the rate sits far below unsecured borrowing while the tenure runs for many years. For funding a business, a wedding, an education abroad or the consolidation of expensive debt, nothing else available to an ordinary family comes close on cost.',
      'The considerations are ownership and consequence. Every person named on the title must join the application and sign, which in practice means family agreement before anything else happens. The loan-to-value is set by the lender\'s valuer rather than by what you believe the property is worth. And the risk is real: this is your home, and a default puts it at stake in a way that no unsecured borrowing does. That is precisely why the rate is low, and it is the thing to weigh most carefully before proceeding.',
    ],
    points: [
      {
        title: 'Best pricing in the secured category',
        body: 'Residential property, particularly self-occupied, attracts the finest rates and the highest loan-to-value a lender offers against real estate.',
      },
      {
        title: 'Every owner has to sign',
        body: 'Joint owners, including family members on the title, must all join as applicants. Establish agreement before the file is started.',
      },
      {
        title: 'End use is unrestricted but declared',
        body: 'The money can be used for anything lawful, though lenders ask the purpose and will not fund speculative activity.',
      },
      {
        title: 'The house is genuinely at risk',
        body: 'This is the trade for the low rate. Borrow an amount the household can service comfortably, not the maximum offered.',
      },
    ],
    eligibility: [
      { criterion: 'Property', detail: 'Self-occupied, let or vacant residential property with clear title' },
      { criterion: 'Ownership', detail: 'All title holders join as applicants or co-applicants' },
      { criterion: 'Income', detail: 'Salaried or self-employed, assessed for servicing capacity' },
      { criterion: 'Approvals', detail: 'Sanctioned plan and occupancy certificate where applicable' },
      { criterion: 'Tenure', detail: 'Commonly up to 15 years' },
    ],
    documents: [
      { label: 'Title documents', note: 'Sale deed and complete chain of ownership' },
      { label: 'Approved plan', note: 'And occupancy certificate' },
      { label: 'Property tax receipt', note: 'Latest, showing no arrears' },
      { label: 'Income proof', note: 'Salary slips and Form 16, or 2–3 years ITR' },
      { label: 'KYC', note: 'Of every owner on the title' },
    ],
    faqs: [
      {
        q: 'How much can I raise against my flat?',
        a: 'It is a proportion of the valuer\'s assessment rather than of the price you paid or the price you believe it would fetch, and the proportion differs by lender and by whether the property is self-occupied or let. Servicing capacity then caps it further.',
      },
      {
        q: 'My father is a joint owner. Does he have to be involved?',
        a: 'Yes. Every person named on the title must join the application and sign the mortgage documents. There is no route around it, so family agreement is the first step rather than a later formality.',
      },
      {
        q: 'What happens if I cannot repay?',
        a: 'The lender can enforce the mortgage and the property can be sold to recover the debt. That is the honest answer, and it is why the rate is low. Borrow what the household can service, not the largest figure offered.',
      },
    ],
    seo: {
      title: 'Loan Against Residential Property in Pune & PCMC | PayYou',
      description:
        'Raise a large sum against a house or flat in Pune. Best pricing in the secured category, how valuation sets the amount, and what every joint owner must do.',
      keywords: [
        'loan against residential property Pune',
        'loan against flat PCMC',
        'mortgage loan house Pimpri Chinchwad',
        'LAP residential Pune',
      ],
    },
  },

  {
    slug: 'commercial-property-loan',
    parent: 'loan-against-property',
    group: 'What you are pledging',
    name: 'Loan Against Commercial Property',
    shortName: 'Commercial',
    tagline: 'A shop or office raises less than a house of the same value.',
    angle:
      'Commercial property is harder and slower to sell in a distressed sale, so lenders apply a lower loan-to-value and a higher rate than they would to residential security of identical worth.',
    summary:
      'Borrowing against a shop, office, godown or industrial unit that you own.',
    intro: [
      'Commercial premises make perfectly good security and are treated more cautiously than a home. The reason is liquidity: a residential flat in a reasonable location has a broad market of buyers, whereas a shop in a particular complex or an industrial shed in a particular estate has a narrow one. A lender enforcing security wants to realise it within a reasonable period, so the loan-to-value against commercial property is lower and the pricing sits above the residential equivalent.',
      'Within the category the distinctions matter. A let shop in an established high street with a tenant on a registered leave and licence agreement is straightforward. A vacant unit in a complex with poor occupancy is considerably harder, and some lenders will decline it. Industrial property is usually assessed separately again, with attention to the estate, its approvals and whether the unit is suited to more than one type of use. Where the property is let, lease rental discounting is often the better instrument and worth comparing.',
    ],
    points: [
      {
        title: 'Lower loan to value than residential',
        body: 'The narrower resale market means lenders fund a smaller proportion of assessed value than they would against a house of the same worth.',
      },
      {
        title: 'A tenant strengthens the file',
        body: 'A registered leave and licence agreement with a sound tenant improves both the assessment and the lender\'s comfort considerably.',
      },
      {
        title: 'Location and complex occupancy are read closely',
        body: 'A unit in a poorly occupied complex is difficult to place. The building matters as much as the unit.',
      },
      {
        title: 'Compare against lease rental discounting',
        body: 'If the property is let to a good tenant, discounting the rental stream can raise more, at better pricing, than a conventional mortgage.',
      },
    ],
    eligibility: [
      { criterion: 'Property', detail: 'Shop, office, godown or industrial unit with clear title' },
      { criterion: 'Use', detail: 'Commercially approved use, matching the sanctioned plan' },
      { criterion: 'Occupancy', detail: 'Let or self-occupied; vacant units face a narrower panel' },
      { criterion: 'Income', detail: 'Business or professional income assessed for servicing' },
    ],
    documents: [
      { label: 'Title documents', note: 'Sale deed, chain of ownership, share certificate where applicable' },
      { label: 'Commercial use approval', note: 'Sanctioned plan showing approved commercial use' },
      { label: 'Lease agreement', note: 'Registered leave and licence, where let' },
      { label: 'Financials', note: '2–3 years ITR and audited statements' },
      { label: 'Property tax receipt', note: 'Latest, showing no arrears' },
    ],
    faqs: [
      {
        q: 'Why do I get less against my shop than against my flat?',
        a: 'Because commercial property is harder to sell quickly. A lender enforcing security needs a broad market of buyers, and a specific shop or industrial unit has a much narrower one than a residential flat. That shows up as a lower loan-to-value and a higher rate.',
      },
      {
        q: 'Does having a tenant help or hurt?',
        a: 'It generally helps considerably, provided the leave and licence agreement is registered and the tenant is sound. It demonstrates that the property earns and that it is lettable. Where the rent is substantial, lease rental discounting may raise more than a mortgage would.',
      },
      {
        q: 'Can I borrow against an industrial shed in Chakan or Bhosari?',
        a: 'Yes, and it is assessed separately from ordinary commercial property. Lenders look at the estate, its approvals, power and access, and whether the unit could suit more than one occupier. The panel is narrower and the files are placeable.',
      },
    ],
    seo: {
      title: 'Loan Against Commercial Property in Pune & PCMC | PayYou',
      description:
        'Borrow against a shop, office or industrial unit in Pune, Bhosari and Chakan. Why LTV is lower than residential, and when lease rental discounting raises more.',
      keywords: [
        'loan against commercial property Pune',
        'shop mortgage loan PCMC',
        'industrial property loan Chakan',
        'office loan against property Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'lease-rental-discounting',
    parent: 'loan-against-property',
    group: 'How it is structured',
    name: 'Lease Rental Discounting',
    shortName: 'Lease rental discounting',
    tagline: 'The tenant repays the loan, not you.',
    angle:
      'The loan is sized from the rental stream and serviced by it through an escrow, so the tenant\'s credit standing and the unexpired lease term matter more than the owner\'s income does.',
    summary:
      'Raising a lump sum against the future rent from a let property, repaid directly from the rental stream.',
    intro: [
      'Lease rental discounting turns a let property\'s future income into money now. The lender computes the present value of the contracted rent over the unexpired lease term and advances a proportion of it. The rent is then routed through an escrow account and services the loan directly, so the instalment is met by the tenant\'s payment rather than by the owner writing a cheque.',
      'What is being underwritten is the lease rather than the landlord. A property let to a well-rated corporate on a long registered lease with a lock-in period supports a considerably larger and cheaper facility than the same building let to a small firm on a short one. The unexpired term is the binding constraint: a lease with two years left cannot support a ten-year loan, whatever the property is worth. For an owner of let commercial premises who needs capital, this frequently raises more, at better pricing, than a conventional mortgage on the same asset.',
    ],
    points: [
      {
        title: 'The tenant\'s credit is what is assessed',
        body: 'A well-rated corporate tenant on a long lease supports a much larger facility than a small tenant on a short one, for the same property.',
      },
      {
        title: 'Unexpired lease term caps the tenure',
        body: 'The loan cannot outrun the contracted rent. A short remaining term limits the facility however valuable the property.',
      },
      {
        title: 'Rent is escrowed and services the loan',
        body: 'Payments route through a designated account and meet the instalment directly, which is what makes the structure work.',
      },
      {
        title: 'Registration and lock-in matter',
        body: 'A registered lease with a lock-in period is materially stronger than an unregistered arrangement or one terminable at will.',
      },
    ],
    eligibility: [
      { criterion: 'Property', detail: 'Let commercial or, with some lenders, residential property' },
      { criterion: 'Lease', detail: 'Registered, with a meaningful unexpired term and preferably a lock-in' },
      { criterion: 'Tenant', detail: 'Creditworthy; corporate and institutional tenants preferred' },
      { criterion: 'Escrow', detail: 'Rent routed through a designated account' },
      { criterion: 'Title', detail: 'Clear and marketable, mortgaged to the lender' },
    ],
    documents: [
      { label: 'Registered lease agreement', note: 'With term, rent, escalation and lock-in' },
      { label: 'Tenant details', note: 'Constitution, financials or credit standing' },
      { label: 'Rent receipts', note: 'Demonstrating the payment record' },
      { label: 'Title documents', note: 'Sale deed and chain of ownership' },
      { label: 'Owner financials', note: 'ITR and statements' },
    ],
    faqs: [
      {
        q: 'How much can I raise against my rent?',
        a: 'It is the present value of the contracted rent over the unexpired lease term, discounted, with a proportion advanced. The tenant\'s standing, the remaining term and whether there is a lock-in all move the figure considerably.',
      },
      {
        q: 'What if my tenant leaves?',
        a: 'The obligation remains yours. That is the main risk in the structure, and it is why lenders prefer long registered leases with lock-in periods and sound tenants. Some facilities require a replacement tenant within a defined period.',
      },
      {
        q: 'Is this better than a normal loan against property?',
        a: 'For a well-let commercial property, frequently yes: the sizing is driven by the rental stream rather than by a discounted valuation, and the pricing is often finer. For a vacant or short-let property, a conventional mortgage is the only route.',
      },
    ],
    seo: {
      title: 'Lease Rental Discounting in Pune & PCMC | PayYou Advisory',
      description:
        'Raise capital against rent from let property in Pune. How the tenant\'s credit and the unexpired lease term size the loan, and how escrow servicing works.',
      keywords: [
        'lease rental discounting Pune',
        'LRD loan PCMC',
        'loan against rent Pimpri Chinchwad',
        'rental income loan Pune',
      ],
    },
  },

  {
    slug: 'mortgage-loan-takeover',
    parent: 'loan-against-property',
    group: 'On an existing loan',
    name: 'Mortgage Loan Takeover & Top-Up',
    shortName: 'Takeover & top-up',
    tagline: 'Refinance the mortgage, and check the charge first.',
    angle:
      'Unlike a floating-rate home loan, a loan against property can carry a foreclosure charge, so the saving has to be tested against that cost before a transfer makes sense.',
    summary:
      'Moving an existing loan against property to another lender for a better rate or a larger facility.',
    intro: [
      'Refinancing a mortgage works much as a home loan transfer does, with one important difference. The prohibition on prepayment charges applies to floating-rate housing loans to individuals; a loan against property is not a housing loan, and many lenders do levy a foreclosure charge on it. That cost has to be established from the existing sanction letter and set against the saving before a transfer is worth pursuing.',
      'Where the arithmetic works, the case is often strong. Property-backed facilities are large and long, so a rate reduction moves a substantial number, and a revaluation after some years of appreciation frequently supports a larger facility than the original. That combination, a lower rate and an enhanced limit against the same asset, is the usual reason people move. The process takes weeks rather than days, because the outgoing lender must release its charge and hand back the original title documents before the incoming lender can create its own.',
    ],
    points: [
      {
        title: 'Check the foreclosure clause first',
        body: 'A loan against property is not a housing loan and can carry a prepayment charge. Read the existing sanction letter before doing any arithmetic.',
      },
      {
        title: 'Revaluation often supports a larger facility',
        body: 'Where the property has appreciated since the original loan, a fresh valuation can enhance the limit alongside the transfer.',
      },
      {
        title: 'Original documents have to change hands',
        body: 'The outgoing lender releases the title deeds and its charge; the incoming one creates a fresh charge. It takes weeks and carries stamp duty.',
      },
      {
        title: 'Ask the existing lender to reprice',
        body: 'A repricing avoids the charge, the stamp duty and the weeks. It will not always be offered, and it costs nothing to ask.',
      },
    ],
    eligibility: [
      { criterion: 'Existing facility', detail: 'Running loan against property with a clean record' },
      { criterion: 'Seasoning', detail: 'Usually 12+ instalments paid' },
      { criterion: 'Property', detail: 'Clear title, documents obtainable from the existing lender' },
      { criterion: 'Income', detail: 'Reassessed by the incoming lender in full' },
    ],
    documents: [
      { label: 'Existing sanction letter', note: 'Including the foreclosure clause' },
      { label: 'Loan statement', note: 'Outstanding balance and repayment record' },
      { label: 'List of documents held', note: 'From the existing lender' },
      { label: 'Title documents', note: 'To be released on transfer' },
      { label: 'Income proof', note: 'Salary slips and Form 16, or ITR' },
    ],
    faqs: [
      {
        q: 'Will I be charged for closing my existing mortgage?',
        a: 'Possibly. The rule prohibiting prepayment charges covers floating-rate housing loans to individuals, and a loan against property is not a housing loan. Many lenders do levy a charge on it, so check the sanction letter before assuming the transfer pays.',
      },
      {
        q: 'Can I increase the amount when I transfer?',
        a: 'Frequently, and it is often the main reason to move. Where the property has appreciated, a fresh valuation supports a larger facility, and taking the enhancement alongside the transfer avoids a second round of legal and stamp costs.',
      },
      {
        q: 'How long does it take?',
        a: 'Typically four to six weeks. The outgoing lender must release its charge and return the original title documents, and the incoming lender then creates a fresh charge with the registrar. Neither step can be rushed much.',
      },
    ],
    seo: {
      title: 'Loan Against Property Takeover & Top-Up in Pune | PayYou',
      description:
        'Transfer an existing mortgage in Pune and PCMC. Foreclosure charges on LAP, revaluation for a larger facility, and why repricing is worth asking about first.',
      keywords: [
        'loan against property balance transfer Pune',
        'LAP takeover PCMC',
        'mortgage loan transfer Pimpri Chinchwad',
        'property loan top up Pune',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Gold Loan
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'gold-loan-interest-rates',
    parent: 'gold-loan',
    group: 'Understanding the product',
    name: 'Gold Loan Rates, LTV & Valuation',
    shortName: 'Rates & valuation',
    tagline: 'How much your jewellery actually raises.',
    angle:
      'RBI caps the loan-to-value on a gold loan at 75% of the ornament\'s gold value, and valuation counts only the gold content, so stones, enamel and making charges raise nothing at all.',
    summary:
      'How gold loan valuation and pricing work, and why the amount offered is lower than the jewellery cost you.',
    intro: [
      'Two things determine what a gold loan raises, and neither is the price on the original bill. The first is valuation. Lenders assess the gold content alone: the ornament is tested for purity, weighed, and valued at the prevailing rate for that purity. Stones, pearls, enamel work and the making charges you paid are excluded entirely, which is why a heavily worked necklace can raise noticeably less than a plain chain of similar weight.',
      'The second is the regulatory ceiling. The Reserve Bank of India caps the loan-to-value ratio on loans against gold ornaments at 75 per cent of that assessed gold value. No lender may exceed it, so an offer above that figure is either being computed on a different basis or is not what it appears. Within the cap, rates vary widely between banks and gold loan NBFCs, and so do the repayment structures on offer: bullet repayment at maturity, interest serviced monthly with principal at the end, or a conventional EMI. The structure often affects the total cost more than the headline rate does.',
    ],
    points: [
      {
        title: 'Only the gold content is valued',
        body: 'Stones, enamel and making charges raise nothing. Purity and net weight are what the valuation rests on.',
      },
      {
        title: 'The loan-to-value ceiling is 75%, set by RBI',
        body: 'It applies to every lender. An offer that appears to exceed it should be questioned closely.',
      },
      {
        title: 'The repayment structure moves the total cost',
        body: 'Bullet, interest-only and EMI options differ substantially in what you finally pay. Compare structures, not just rates.',
      },
      {
        title: 'Understand the auction terms before you sign',
        body: 'Lenders may auction pledged gold on default, following notice. Know the timelines and the notice you are entitled to.',
      },
    ],
    eligibility: [
      { criterion: 'Security', detail: 'Gold ornaments, typically 18–22 carat; bars and coins are restricted' },
      { criterion: 'Ownership', detail: 'The borrower must own the jewellery pledged' },
      { criterion: 'Age', detail: '18 years and above' },
      { criterion: 'Income proof', detail: 'Usually not required; the security carries the loan' },
      { criterion: 'CIBIL', detail: 'Rarely a barrier, which is why this suits a damaged credit record' },
    ],
    documents: [
      { label: 'KYC', note: 'PAN and Aadhaar' },
      { label: 'The jewellery', note: 'Assessed for purity and weight at the branch' },
      { label: 'Address proof', note: 'Where not covered by Aadhaar' },
    ],
    faqs: [
      {
        q: 'Why is the offer lower than what my jewellery cost?',
        a: 'Because only the gold content is valued. Stones, enamel and the making charges on the original bill are excluded, and the assessed gold value is then capped at 75 per cent by RBI rules. A heavily worked piece raises less than a plain one of similar weight.',
      },
      {
        q: 'Do I need a good credit score?',
        a: 'Rarely. The loan is secured by the gold itself, so income proof is usually not required and a damaged credit record is seldom a barrier. It is one of the few products genuinely available to someone a bureau score has locked out.',
      },
      {
        q: 'What happens to my gold if I cannot repay?',
        a: 'The lender may auction it to recover the debt, after giving notice as required. The timelines and the notice you are entitled to should be read in the agreement before you pledge, not afterwards.',
      },
    ],
    seo: {
      title: 'Gold Loan Interest Rate, LTV & Valuation Explained | PayYou',
      description:
        'How gold loans are valued in Pune and PCMC. Purity and net weight, the RBI 75% loan-to-value cap, why making charges raise nothing, and how repayment structures differ.',
      keywords: [
        'gold loan interest rate Pune',
        'gold loan per gram PCMC',
        'gold loan LTV RBI',
        'gold loan valuation Pimpri Chinchwad',
      ],
    },
  },
]
