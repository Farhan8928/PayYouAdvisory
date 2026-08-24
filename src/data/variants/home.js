/**
 * Home Loan variants.
 *
 * By what is being bought or built, by scheme, and by residency. See
 * ../variants.js for the rule on numbers.
 */

export const HOME = [
  {
    slug: 'home-purchase-loan',
    parent: 'home-loan',
    group: 'What you are buying',
    name: 'New Home Purchase Loan',
    shortName: 'Buying a home',
    tagline: 'Get the sanction before you book, not after.',
    angle:
      'A pre-approved sanction turns you into a cash-equivalent buyer, which is worth real negotiating power in a market where builders and sellers both prefer a buyer who cannot fall through.',
    summary:
      'Financing the purchase of a ready or under-construction home, from sanction through to registration and disbursal.',
    intro: [
      'The order in which people do this is usually backwards. Most buyers find a property, pay a booking amount, and then apply for a loan, which leaves the deposit exposed if the sanction comes in smaller than expected or the lender takes a view on the title. Applying first produces a sanction letter valid for several months, tells you exactly what you can spend, and lets you negotiate as a buyer who will certainly complete.',
      'Two numbers govern the purchase. Loan to value determines how much the lender will fund against the property\'s assessed value, with the remainder your margin, and that assessment is the valuer\'s figure rather than the price you agreed. And the assessed value excludes stamp duty and registration, which in Maharashtra are a substantial sum payable from your own funds on the day. A buyer who budgets only for the down payment is regularly caught short at registration.',
    ],
    points: [
      {
        title: 'Sanction first, then negotiate',
        body: 'A pre-approved letter is valid for months, fixes your ceiling and strengthens your position with a builder or seller.',
      },
      {
        title: 'Stamp duty and registration come from your pocket',
        body: 'They sit outside the loan and outside the valuation. In Maharashtra this is a meaningful sum, and it is due at registration.',
      },
      {
        title: 'The valuer\'s figure decides the loan, not the price',
        body: 'If the valuation lands below the agreed price, the shortfall is yours to fund. It is the most common reason a purchase runs short.',
      },
      {
        title: 'Under-construction disburses in stages',
        body: 'The lender releases against construction milestones, and you service interest on the drawn portion until possession. Budget for that period.',
      },
    ],
    eligibility: [
      { criterion: 'Income', detail: 'Salaried or self-employed, with a co-applicant permitted to lift eligibility' },
      { criterion: 'Age', detail: '21 – 65 years, with the loan closing before retirement' },
      { criterion: 'CIBIL score', detail: '700+ for the finest pricing; 650+ workable on a narrower panel' },
      { criterion: 'Property', detail: 'Clear, marketable title with approved plans and, where applicable, RERA registration' },
      { criterion: 'Margin', detail: 'Your own contribution, driven by the lender\'s loan-to-value norm' },
    ],
    documents: [
      { label: 'Agreement to sell', note: 'Or allotment letter from the builder' },
      { label: 'Title documents', note: 'Chain of ownership, approved plan, occupancy certificate' },
      { label: 'Income proof', note: 'Salary slips and Form 16, or 2–3 years ITR' },
      { label: 'Bank statements', note: 'Last 6 months' },
      { label: 'Own contribution proof', note: 'Evidence of funds for margin, stamp duty and registration' },
    ],
    faqs: [
      {
        q: 'Should I apply before I find a property?',
        a: 'Yes. A pre-approved sanction is usually valid for several months, tells you your real ceiling, and lets you negotiate as a buyer who will certainly complete. Booking first and borrowing afterwards is how deposits get put at risk.',
      },
      {
        q: 'What if the valuation comes in below the price I agreed?',
        a: 'The loan is computed on the valuer\'s figure, not the agreed price, so the difference becomes your contribution. It is one of the commonest reasons a purchase runs short, and one of the reasons to have the sanction in hand early.',
      },
      {
        q: 'Are stamp duty and registration included in the loan?',
        a: 'Generally no. They sit outside both the loan and the valuation and are payable from your own funds at registration. In Maharashtra that is a substantial amount and it needs to be budgeted separately from the down payment.',
      },
    ],
    seo: {
      title: 'Home Purchase Loan in Pune & PCMC | PayYou Advisory',
      description:
        'Home loans for buying in Pune and Pimpri-Chinchwad. Why to get sanctioned before booking, how valuation sets your loan, and what stamp duty costs on the day.',
      keywords: [
        'home purchase loan Pune',
        'home loan for flat PCMC',
        'housing loan Pimpri Chinchwad',
        'home loan sanction before booking Pune',
      ],
    },
  },

  {
    slug: 'home-construction-loan',
    parent: 'home-loan',
    group: 'What you are buying',
    name: 'Home Construction Loan',
    shortName: 'Building',
    tagline: 'Money released against progress, not against a purchase.',
    angle:
      'Disbursal follows an engineer\'s certification of stage completion, so the contractor payment schedule and the lender\'s release schedule have to be reconciled before work starts.',
    summary:
      'Funding construction on a plot you own, released in tranches against certified stages of work.',
    intro: [
      'Building is financed differently from buying. There is no seller and no single settlement; instead the lender releases money in tranches as construction reaches defined stages, each certified by a technical officer or an approved engineer. Plinth, slabs, brickwork, plastering and finishing are typical milestones, and the money for each arrives only once the previous stage is verified.',
      'The practical difficulty is the gap between how contractors want to be paid and how lenders release. Contractors generally want money before or at the start of a stage; lenders release after it is complete and inspected. Somebody has to bridge that, and it is the owner. Agreeing a payment schedule with the contractor that anticipates the lender\'s release pattern, and holding working capital of your own for the gap, is the single most useful piece of planning on a construction loan. During construction you service interest on what has been drawn, with full EMIs beginning after the final tranche.',
    ],
    points: [
      {
        title: 'Releases follow certified stages',
        body: 'An engineer inspects and certifies completion before each tranche. Nothing is released against an invoice alone.',
      },
      {
        title: 'You bridge the timing gap',
        body: 'Contractors want paying at the start of a stage; lenders release at the end. Plan for that gap before work begins.',
      },
      {
        title: 'Interest only until completion',
        body: 'You service interest on the drawn portion during construction. Full EMIs start after the final tranche.',
      },
      {
        title: 'Approvals must be in place first',
        body: 'A sanctioned plan and commencement certificate from the local authority are prerequisites. Unapproved construction cannot be funded.',
      },
    ],
    eligibility: [
      { criterion: 'Plot', detail: 'Owned outright, with clear title and non-agricultural status' },
      { criterion: 'Approvals', detail: 'Sanctioned building plan and commencement certificate' },
      { criterion: 'Estimate', detail: 'A costed construction estimate, usually from an approved architect or engineer' },
      { criterion: 'Income', detail: 'Assessed as for any home loan; co-applicants permitted' },
      { criterion: 'Margin', detail: 'Own contribution against the estimated construction cost' },
    ],
    documents: [
      { label: 'Plot title documents', note: 'Sale deed, 7/12 extract and mutation entries' },
      { label: 'Sanctioned plan', note: 'Approved by the municipal or planning authority' },
      { label: 'Commencement certificate', note: 'Permission to begin construction' },
      { label: 'Construction estimate', note: 'Costed and signed by an architect or engineer' },
      { label: 'Income proof', note: 'Salary slips and Form 16, or 2–3 years ITR' },
    ],
    faqs: [
      {
        q: 'When does the money actually arrive?',
        a: 'In tranches, after each construction stage is completed and certified by the lender\'s technical officer or an approved engineer. Nothing is released against an invoice or a promise, which is why the contractor\'s payment schedule needs planning around it.',
      },
      {
        q: 'What do I pay during construction?',
        a: 'Interest only, on whatever has been drawn so far. Full EMIs begin once the final tranche is released. That keeps the outgo low while you may also be paying rent, and it means the loan runs longer overall.',
      },
      {
        q: 'Can I fund construction on agricultural land?',
        a: 'Not until it is converted to non-agricultural use. Lenders require NA status and a sanctioned plan before any construction facility, and the conversion process needs to be complete rather than in progress.',
      },
    ],
    seo: {
      title: 'Home Construction Loan in Pune & PCMC | PayYou Advisory',
      description:
        'Construction finance for a plot you own in Pune. Stage-wise disbursal, engineer certification, the contractor timing gap, and interest-only until completion.',
      keywords: [
        'home construction loan Pune',
        'house building loan PCMC',
        'construction finance Pimpri Chinchwad',
        'plot construction loan Pune',
      ],
    },
  },

  {
    slug: 'home-improvement-loan',
    parent: 'home-loan',
    group: 'On a home you own',
    name: 'Home Improvement Loan',
    shortName: 'Improvement',
    tagline: 'Secured on the house, so priced like a home loan.',
    angle:
      'Because the property is already mortgaged or being mortgaged, renovation borrows at housing-loan pricing rather than at unsecured rates, which for a job of any size is the difference that matters.',
    summary:
      'Funding repairs, waterproofing, flooring, plumbing and structural improvement on a property you own, secured against it.',
    intro: [
      'A home improvement loan is a housing product rather than a personal one, and that single fact governs everything about it. Because the house secures the borrowing, the rate sits at or near home loan pricing and the tenure runs for years rather than months. On a substantial renovation, the difference against an unsecured personal loan is large enough to fund a good part of the work.',
      'What it will and will not cover is worth checking before you plan. Lenders fund improvement to the structure and its fixed elements: waterproofing, flooring, plumbing, electrical rewiring, painting, kitchen and bathroom fittings that are fixed in place. They generally will not fund loose furniture, appliances or decorative items, and they usually want a costed estimate. Disbursal may be staged against progress for larger jobs. Where the requirement is mostly furnishing rather than fabric, a personal loan often covers the gap more practically despite costing more.',
    ],
    points: [
      {
        title: 'Priced as a housing loan',
        body: 'Security against the property brings the rate down to home-loan territory, well below unsecured borrowing.',
      },
      {
        title: 'Fabric yes, furniture usually no',
        body: 'Structural and fixed improvements qualify. Loose furniture, appliances and decorative items generally do not.',
      },
      {
        title: 'A costed estimate is normally required',
        body: 'Unlike a personal loan, the lender wants to see what the money is for, and may disburse in stages against progress.',
      },
      {
        title: 'Check a top-up against a fresh facility',
        body: 'If a home loan is already running on the property, a top-up is often simpler and cheaper than arranging a separate improvement loan.',
      },
    ],
    eligibility: [
      { criterion: 'Ownership', detail: 'The property must be owned by the applicant or a co-applicant' },
      { criterion: 'Title', detail: 'Clear and marketable, with approved construction' },
      { criterion: 'Purpose', detail: 'Repair, renovation or improvement, evidenced by an estimate' },
      { criterion: 'Income', detail: 'Assessed as for any home loan' },
    ],
    documents: [
      { label: 'Property title documents', note: 'Sale deed and current tax receipt' },
      { label: 'Renovation estimate', note: 'Itemised, from a contractor or architect' },
      { label: 'Approved plan', note: 'Where the work alters the structure' },
      { label: 'Income proof', note: 'Salary slips and Form 16, or ITR' },
      { label: 'Existing loan statement', note: 'If a home loan already runs on the property' },
    ],
    faqs: [
      {
        q: 'How is this different from a personal loan for renovation?',
        a: 'It is secured on the house, so it is priced like a home loan rather than an unsecured one, and it runs for years rather than months. On a job of any size that difference is substantial. The trade is a valuation, a legal check and a defined end use.',
      },
      {
        q: 'Will it pay for furniture and appliances?',
        a: 'Usually not. Lenders fund fixed improvements to the fabric of the building. Loose furniture, white goods and decorative items sit outside most improvement loans, which is where a smaller personal loan often fills the gap.',
      },
      {
        q: 'I already have a home loan on this flat. What is simpler?',
        a: 'Usually a top-up on the existing loan. The property is already mortgaged to that lender, so there is no fresh charge to create, the paperwork is lighter and the pricing is generally comparable.',
      },
    ],
    seo: {
      title: 'Home Improvement & Renovation Loan in Pune | PayYou Advisory',
      description:
        'Secured renovation finance in Pune and PCMC at housing-loan pricing. What lenders fund, what they exclude, and when a home loan top-up is the simpler route.',
      keywords: [
        'home improvement loan Pune',
        'home renovation loan PCMC',
        'house repair loan Pimpri Chinchwad',
        'waterproofing flooring loan Pune',
      ],
    },
  },

  {
    slug: 'home-extension-loan',
    parent: 'home-loan',
    group: 'On a home you own',
    name: 'Home Extension Loan',
    shortName: 'Extension',
    tagline: 'The approval matters more than the finance.',
    angle:
      'An extension adds built-up area, so it needs planning permission and revised sanctioned plans, and lenders will not fund work that would leave the property unauthorised.',
    summary:
      'Funding an additional room, floor or covered area on a property you own, where the extension is properly approved.',
    intro: [
      'Extension is distinct from improvement in a way that matters legally rather than aesthetically. Improvement changes what exists; extension adds built-up area, which engages the planning rules. A revised sanctioned plan from the municipal or planning authority is required, floor space index limits apply, and in a housing society the society\'s no-objection is usually needed as well.',
      'Lenders take this seriously because unauthorised construction damages the value of the security they hold. An extension built without approval can attract penalties or a demolition notice, and it makes the property difficult to sell or to mortgage again later. Most lenders will therefore ask for the revised plan before sanctioning, not afterwards. The finance itself is straightforward once approvals are in hand, priced as a housing loan and often disbursed in stages against construction progress.',
    ],
    points: [
      {
        title: 'A revised sanctioned plan comes first',
        body: 'Lenders will not fund additional built-up area without planning approval. Start with the authority, not with the bank.',
      },
      {
        title: 'FSI limits may cap what you can build',
        body: 'Floor space index governs how much can be added to a plot. It is worth confirming before designing, let alone financing.',
      },
      {
        title: 'A society NOC is usually needed',
        body: 'In an apartment or a society layout, the society\'s written no-objection is normally a condition of both approval and finance.',
      },
      {
        title: 'Unapproved work costs you twice',
        body: 'It risks penalties or demolition, and it makes the property hard to sell or remortgage. No saving on approvals is worth that.',
      },
    ],
    eligibility: [
      { criterion: 'Ownership', detail: 'Property owned by the applicant, with clear title' },
      { criterion: 'Approvals', detail: 'Revised sanctioned plan permitting the additional area' },
      { criterion: 'Society consent', detail: 'Written NOC where the property sits in a society' },
      { criterion: 'Estimate', detail: 'A costed construction estimate for the extension' },
    ],
    documents: [
      { label: 'Revised sanctioned plan', note: 'Approving the additional built-up area' },
      { label: 'Society NOC', note: 'Where applicable' },
      { label: 'Title documents', note: 'Sale deed and current tax receipt' },
      { label: 'Construction estimate', note: 'From an architect or approved engineer' },
      { label: 'Income proof', note: 'Salary slips and Form 16, or ITR' },
    ],
    faqs: [
      {
        q: 'Can I get a loan to add a floor without approval?',
        a: 'No, and you should not want to. Lenders require the revised sanctioned plan because unauthorised area damages the value of the property they are holding as security, and it exposes you to penalties or a demolition notice later.',
      },
      {
        q: 'How is this different from an improvement loan?',
        a: 'Improvement changes what already exists; extension adds built-up area, which engages the planning rules. That means a revised plan, FSI limits and usually a society NOC. The finance is similar once the approvals are in place.',
      },
      {
        q: 'How long do the approvals take?',
        a: 'It varies considerably by authority and by the complexity of the change, and it is normally the long pole in the project rather than the loan. Begin the approval process well before you plan to start work.',
      },
    ],
    seo: {
      title: 'Home Extension Loan in Pune & PCMC | PayYou Advisory',
      description:
        'Finance for adding a room or floor in Pune. Revised sanctioned plans, FSI limits, society NOCs, and why lenders will not fund unapproved construction.',
      keywords: [
        'home extension loan Pune',
        'add floor loan PCMC',
        'house extension finance Pimpri Chinchwad',
        'room addition loan Pune',
      ],
    },
  },

  {
    slug: 'plot-purchase-loan',
    parent: 'home-loan',
    group: 'What you are buying',
    name: 'Plot & Land Purchase Loan',
    shortName: 'Plot purchase',
    tagline: 'Shorter, dearer, and taxed differently from a home loan.',
    angle:
      'Land carries no Section 24 interest deduction unless a house is actually built on it, which makes a plot loan meaningfully more expensive after tax than a home loan at the same rate.',
    summary:
      'Financing the purchase of a residential plot, with the tax and tenure differences a buyer should know before committing.',
    intro: [
      'A plot loan looks like a home loan and behaves differently in three ways. The loan-to-value permitted is generally lower, so your own contribution is larger. Tenures are shorter, typically well below the twenty to thirty years available on a house. And the tax treatment is the difference most buyers do not anticipate: the interest deduction under Section 24 is available on a house, not on bare land, so a plot loan gives no deduction unless and until a house is constructed on it.',
      'A composite plot-plus-construction loan resolves this where you intend to build. It funds the land purchase and the construction under one facility, and once the house is complete the tax treatment follows a normal home loan. Lenders sanctioning composite facilities usually require construction to begin within a defined period, often two to three years. If the intention is purely to hold land as an investment, that condition will not suit, and the plot loan\'s cost should be assessed on its own terms.',
    ],
    points: [
      {
        title: 'No Section 24 deduction on bare land',
        body: 'The interest deduction applies to a house. On a plot alone there is none, which raises the effective cost against a home loan.',
      },
      {
        title: 'Lower loan to value, larger contribution',
        body: 'Lenders fund a smaller share of a plot\'s value than of a completed home, so more of the purchase comes from your own funds.',
      },
      {
        title: 'A composite loan is usually the better structure',
        body: 'Funding land and construction together restores home-loan tax treatment once the house is built, and simplifies the paperwork.',
      },
      {
        title: 'Land must be non-agricultural and within limits',
        body: 'NA status, a clear 7/12 extract and location within municipal or approved layout limits are standard conditions.',
      },
    ],
    eligibility: [
      { criterion: 'Land type', detail: 'Non-agricultural residential plot in an approved layout' },
      { criterion: 'Title', detail: 'Clear title with 7/12 extract and mutation entries in order' },
      { criterion: 'Tenure', detail: 'Generally shorter than a home loan' },
      { criterion: 'Construction condition', detail: 'On composite facilities, building usually to start within 2–3 years' },
    ],
    documents: [
      { label: 'Agreement to sell', note: 'For the plot being purchased' },
      { label: '7/12 extract and mutation', note: 'Establishing title and NA status' },
      { label: 'Approved layout plan', note: 'From the planning authority' },
      { label: 'Income proof', note: 'Salary slips and Form 16, or ITR' },
      { label: 'Construction plan', note: 'Where a composite facility is sought' },
    ],
    faqs: [
      {
        q: 'Do I get tax benefit on a plot loan?',
        a: 'Not on bare land. The Section 24 interest deduction applies to a house, so a plot loan gives no deduction until a house is built on it. This is the single biggest difference from a home loan and it materially changes the after-tax cost.',
      },
      {
        q: 'What is a composite loan?',
        a: 'One facility covering both the land purchase and the construction. It is usually the better structure if you intend to build, because once the house is complete the tax treatment follows a normal home loan. Lenders typically require construction to start within two to three years.',
      },
      {
        q: 'Can I buy agricultural land with a loan?',
        a: 'Not under a plot loan. Lenders require non-agricultural status and an approved layout. Agricultural land has its own restrictions on who may purchase it and is financed, if at all, through entirely different products.',
      },
    ],
    seo: {
      title: 'Plot & Land Purchase Loan in Pune & PCMC | PayYou Advisory',
      description:
        'Plot loans around Pune, Chakan and Talegaon. Lower LTV, shorter tenure, no Section 24 deduction on bare land, and why a composite loan usually works better.',
      keywords: [
        'plot loan Pune',
        'land purchase loan PCMC',
        'plot purchase finance Talegaon',
        'NA plot loan Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'home-loan-balance-transfer',
    parent: 'home-loan',
    group: 'On an existing loan',
    name: 'Home Loan Balance Transfer & Top-Up',
    shortName: 'Transfer & top-up',
    tagline: 'The largest saving available to most borrowers.',
    angle:
      'On a twenty-year loan the outstanding balance is enormous for most of its life, so even a small rate reduction moves a very large number, and the top-up alongside is usually the cheapest money a household can raise.',
    summary:
      'Moving a running home loan to a lower rate, with the option of additional borrowing against the same property.',
    intro: [
      'Home loans reward refinancing more than any other retail product, for a simple structural reason: the balances are large and they stay large for years. A fraction of a percentage point on a sum outstanding for another fifteen years is a substantial figure, and unlike a personal loan the switching costs are proportionally small. Floating-rate home loans to individuals also cannot carry a foreclosure charge under RBI rules, which removes the largest single obstacle to moving.',
      'Two things are usually worth doing at the same time. First, ask your existing lender to reprice before you move, because many will match rather than lose the account, and a repricing costs a fraction of a transfer. Second, if you need money for anything else, a top-up taken alongside the transfer is almost always the cheapest borrowing available to a homeowner, priced near home-loan rates and running for the remaining tenure. Judge the transfer and the top-up as two separate decisions, so the additional money does not disguise a move that does not pay for itself.',
    ],
    points: [
      {
        title: 'No foreclosure charge on floating-rate home loans',
        body: 'RBI rules prohibit prepayment charges on floating-rate housing loans to individuals, which removes the main cost of switching.',
      },
      {
        title: 'Ask your current lender first',
        body: 'Many will reprice to keep the account. A repricing conversation costs almost nothing and sometimes achieves most of the saving.',
      },
      {
        title: 'A top-up is the cheapest household borrowing',
        body: 'Additional money against the same property, at close to home-loan pricing and over the remaining tenure, beats any unsecured alternative.',
      },
      {
        title: 'Keep the tenure, take the lower EMI as prepayment',
        body: 'Where the rate falls, holding the original end date and letting the saving reduce principal is worth far more than a smaller instalment.',
      },
    ],
    eligibility: [
      { criterion: 'Existing loan', detail: 'Running home loan, usually with 12+ EMIs paid' },
      { criterion: 'Repayment record', detail: 'Clean, with no overdue instalments' },
      { criterion: 'Property', detail: 'Clear title, with original documents obtainable from the existing lender' },
      { criterion: 'Residual tenure', detail: 'Enough remaining for the saving to exceed the costs' },
    ],
    documents: [
      { label: 'Loan statement', note: 'From the existing lender, with the outstanding balance' },
      { label: 'Foreclosure letter', note: 'And a list of documents held' },
      { label: 'Property documents', note: 'Held by the existing lender, to be released on transfer' },
      { label: 'Income proof', note: 'Salary slips and Form 16, or ITR' },
      { label: 'Bank statements', note: 'Last 6 months' },
    ],
    faqs: [
      {
        q: 'Is there a charge to move my home loan?',
        a: 'Not from the existing lender on a floating-rate housing loan to an individual, because RBI rules prohibit prepayment charges on those. The new lender will charge processing and legal fees, and there is stamp duty on the fresh charge, but the largest obstacle is absent.',
      },
      {
        q: 'Should I reduce the EMI or the tenure?',
        a: 'Keeping the tenure and letting the saving reduce principal is worth considerably more over the life of the loan. Reducing the EMI feels better monthly and gives away most of the benefit. If cash flow allows, hold the original end date.',
      },
      {
        q: 'Can I borrow extra when I transfer?',
        a: 'Usually, and a top-up taken alongside a transfer is generally the cheapest money a homeowner can raise. Judge the two decisions separately though, so the extra borrowing does not disguise a transfer that would not otherwise pay.',
      },
    ],
    seo: {
      title: 'Home Loan Balance Transfer & Top-Up in Pune | PayYou Advisory',
      description:
        'Transfer a home loan in Pune to a lower rate with an optional top-up. No foreclosure charge on floating rates, and why keeping the tenure beats cutting the EMI.',
      keywords: [
        'home loan balance transfer Pune',
        'home loan top up PCMC',
        'home loan takeover Pimpri Chinchwad',
        'refinance home loan Pune',
      ],
    },
  },

  {
    slug: 'pmay-home-loan',
    parent: 'home-loan',
    group: 'Schemes',
    name: 'PMAY & Government Housing Schemes',
    shortName: 'PMAY',
    tagline: 'Worth checking, and the conditions are strict.',
    angle:
      'The disqualifier that catches most applicants is not income but ownership: if any member of the household already owns a pucca house anywhere in India, the family is out.',
    summary:
      'Pradhan Mantri Awas Yojana and related housing schemes, the eligibility conditions, and how a subsidy is actually applied.',
    intro: [
      'Government housing schemes can reduce the cost of a first home meaningfully, and their conditions are more restrictive than the advertising suggests. Eligibility is assessed at the household level rather than the individual: an applicant, spouse and unmarried children are treated as one unit, and if any of them owns a pucca house anywhere in India, the household does not qualify. That single condition disqualifies more applicants than the income limits do.',
      'Where a household does qualify, the benefit is generally applied as an upfront credit to the loan account rather than paid to the borrower, which reduces the principal and therefore the EMI from the outset. Carpet area limits apply and are defined precisely, so a property marketed as within scheme limits should be checked against the actual measurement. Because scheme terms, income bands and application windows are revised from time to time, the current conditions should be confirmed rather than assumed, and we will check where a file stands before it is submitted.',
    ],
    points: [
      {
        title: 'Household ownership is the main disqualifier',
        body: 'Applicant, spouse and unmarried children count as one household. A pucca house owned by any of them anywhere in India ends eligibility.',
      },
      {
        title: 'The benefit reduces principal, not cash in hand',
        body: 'Where a subsidy applies it is normally credited to the loan account upfront, lowering the outstanding and the EMI.',
      },
      {
        title: 'Carpet area limits are measured, not estimated',
        body: 'Definitions are precise. A property described as scheme-compliant should be verified against the actual carpet area.',
      },
      {
        title: 'Terms change; confirm before relying on them',
        body: 'Income bands, subsidy amounts and application windows are revised periodically. We check the current position on each file.',
      },
    ],
    eligibility: [
      { criterion: 'Household', detail: 'No pucca house owned by applicant, spouse or unmarried children anywhere in India' },
      { criterion: 'Income', detail: 'Within the scheme\'s prescribed band for the applicable category' },
      { criterion: 'Property', detail: 'Within the carpet area limit for the category' },
      { criterion: 'Woman ownership', detail: 'Several categories require a woman as owner or co-owner' },
      { criterion: 'Documentation', detail: 'Aadhaar for all household members' },
    ],
    documents: [
      { label: 'Aadhaar', note: 'For applicant, spouse and children' },
      { label: 'Income proof', note: 'Salary slips, Form 16 or ITR, within the scheme band' },
      { label: 'Property documents', note: 'Agreement and carpet area certification' },
      { label: 'Self-declaration', note: 'Of no existing pucca house in the household' },
    ],
    faqs: [
      {
        q: 'Who is actually eligible?',
        a: 'A household with income within the prescribed band that owns no pucca house anywhere in India. That ownership test applies to the applicant, spouse and unmarried children together, and it disqualifies more people than the income limits do.',
      },
      {
        q: 'How do I receive the benefit?',
        a: 'Normally as an upfront credit to the loan account rather than a payment to you. The principal reduces and so does the EMI, from the start of the loan rather than at the end.',
      },
      {
        q: 'Does the property have to be in my wife\'s name?',
        a: 'Several categories require a woman to be an owner or co-owner, which is one of the scheme\'s deliberate features. The exact requirement depends on the category applied under, so it should be confirmed before the agreement is executed.',
      },
    ],
    seo: {
      title: 'PMAY Home Loan Scheme Eligibility in Pune | PayYou Advisory',
      description:
        'Pradhan Mantri Awas Yojana housing loans in Pune and PCMC. The household ownership test, income bands, carpet area limits and how the benefit is applied.',
      keywords: [
        'PMAY home loan Pune',
        'pradhan mantri awas yojana PCMC',
        'government housing scheme loan Pune',
        'PMAY eligibility Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'affordable-housing-loan',
    parent: 'home-loan',
    group: 'Schemes',
    name: 'Affordable Housing Loan',
    shortName: 'Affordable housing',
    tagline: 'Built for income that is real but hard to document.',
    angle:
      'Affordable housing finance companies assess cash and informal income through personal discussion and field verification, which is why they lend where a bank\'s payslip-driven process cannot.',
    summary:
      'Home loans for smaller ticket sizes and informal incomes, from housing finance companies that assess income differently.',
    intro: [
      'A large part of the working population earns reliably and cannot evidence it the way a bank requires: shopkeepers, drivers, tailors, contractors, workers paid in cash. A conventional home loan process, which begins with a payslip and a Form 16, has no way to read that income and declines the file. Affordable housing finance companies were established to serve exactly this gap.',
      'Their method is different. A credit officer visits the home or the business, assesses trade in person, speaks to the applicant about earnings and outgoings, and builds an income estimate from observation and from whatever banking exists. Ticket sizes are smaller, the rate is above a bank home loan because the assessment costs more and the risk is judged higher, and the process takes longer because it involves people rather than documents. For a borrower who would otherwise have no route to a home loan at all, it is the difference between owning and not.',
    ],
    points: [
      {
        title: 'Income is assessed in person',
        body: 'A credit officer visits and builds an estimate from what the business or household actually earns, rather than from a payslip.',
      },
      {
        title: 'Cash income is not a barrier here',
        body: 'These lenders exist to underwrite exactly the profiles a bank\'s documentary process cannot read.',
      },
      {
        title: 'Rates sit above bank home loans',
        body: 'The assessment costs more and the risk is priced higher. It is still far below any unsecured alternative.',
      },
      {
        title: 'Refinance later once you have a record',
        body: 'After two or three years of clean repayment, a transfer to a bank at a lower rate is often possible. It is worth planning for.',
      },
    ],
    eligibility: [
      { criterion: 'Income', detail: 'Formal or informal, assessed through personal discussion and verification' },
      { criterion: 'Ticket size', detail: 'Smaller loans, suited to affordable housing segments' },
      { criterion: 'Property', detail: 'Clear title; approvals still required' },
      { criterion: 'CIBIL', detail: 'Thin or absent credit history is workable' },
    ],
    documents: [
      { label: 'KYC', note: 'PAN and Aadhaar' },
      { label: 'Bank statements', note: 'Whatever banking exists, even if limited' },
      { label: 'Business proof', note: 'Shop licence, Udyam or trade evidence where self-employed' },
      { label: 'Property documents', note: 'Agreement, title and approvals' },
      { label: 'Informal income evidence', note: 'Rent receipts, order books, supplier records' },
    ],
    faqs: [
      {
        q: 'I am paid in cash. Can I really get a home loan?',
        a: 'Yes, through an affordable housing finance company. Their credit officers assess income by visiting and by discussion rather than relying on a payslip. The rate is above a bank home loan and the process takes longer, and it is a genuine route where a bank has none.',
      },
      {
        q: 'Why is the rate higher than a bank?',
        a: 'Because the assessment is done in person rather than from documents, which costs more, and because the risk is judged higher. It remains far cheaper than any unsecured borrowing, and it is secured against the home.',
      },
      {
        q: 'Can I move to a cheaper lender later?',
        a: 'Often, after two or three years of clean repayment which creates the credit record a bank needs. Planning for that transfer from the outset is sensible, and there is no foreclosure charge on a floating-rate housing loan to an individual.',
      },
    ],
    seo: {
      title: 'Affordable Housing Loan for Cash Income in Pune | PayYou',
      description:
        'Home loans in Pune and PCMC for informal and cash income. How housing finance companies assess earnings in person, what it costs, and how to refinance later.',
      keywords: [
        'affordable housing loan Pune',
        'home loan for cash salary PCMC',
        'housing finance company loan Pune',
        'home loan without ITR Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'nri-home-loan',
    parent: 'home-loan',
    group: 'Who it is for',
    name: 'NRI Home Loan',
    shortName: 'NRI',
    tagline: 'Arrange the power of attorney before you leave.',
    angle:
      'Almost every practical difficulty in an NRI file comes from executing documents abroad, which a properly attested power of attorney granted to a resident relative removes entirely.',
    summary:
      'Home loans for non-resident Indians buying property in Pune, with the documentation and repayment rules that differ from a resident file.',
    intro: [
      'An NRI home loan is underwritten much as a resident one is, on income, obligations and the property. The differences are procedural, and they are where files stall. Documents must be executed abroad and attested, usually by the Indian consulate or under apostille depending on the country. Income is evidenced by overseas salary certificates and bank statements, often with a copy of the employment contract and the passport and visa pages.',
      'Repayment has its own rules. Instalments must come from an NRE or NRO account or through normal banking channels, not from an ordinary overseas account directly. Tenures are frequently shorter than for residents. And because the borrower is not present, a power of attorney in favour of a resident relative, properly executed and attested, is close to essential: it allows documents to be signed, registration to be completed and queries to be resolved without a flight. Arranging it before departure, or at the consulate soon after, saves more time than anything else on the file.',
    ],
    points: [
      {
        title: 'A power of attorney removes most of the friction',
        body: 'Properly attested, granted to a resident relative, it lets registration and documentation proceed without you being present.',
      },
      {
        title: 'Repayment must route through NRE or NRO',
        body: 'EMIs are serviced from an NRE or NRO account or through normal banking channels. Set the account up before disbursal.',
      },
      {
        title: 'Attestation rules vary by country',
        body: 'Consular attestation or apostille depends on where you are resident. Confirm the requirement before executing anything.',
      },
      {
        title: 'Tenures are often shorter',
        body: 'Many lenders cap NRI tenures below the resident maximum, which raises the EMI for the same amount.',
      },
    ],
    eligibility: [
      { criterion: 'Status', detail: 'Non-resident Indian or person of Indian origin, per the lender\'s definition' },
      { criterion: 'Income', detail: 'Overseas salary or business income, evidenced and translated where required' },
      { criterion: 'Employment', detail: 'Minimum overseas work experience, commonly 1–3 years' },
      { criterion: 'Co-applicant', detail: 'A resident close relative is frequently required' },
      { criterion: 'Accounts', detail: 'NRE or NRO account for repayment' },
    ],
    documents: [
      { label: 'Passport and visa', note: 'With residence permit or equivalent' },
      { label: 'Overseas income proof', note: 'Salary certificate, contract and bank statements' },
      { label: 'Power of attorney', note: 'Attested, in favour of a resident relative' },
      { label: 'NRE or NRO account details', note: 'For servicing the loan' },
      { label: 'Property documents', note: 'Agreement, title and approvals' },
    ],
    faqs: [
      {
        q: 'Do I have to travel to India to complete the loan?',
        a: 'Usually not, if you have executed a properly attested power of attorney in favour of a resident relative. That single document lets registration, signing and queries be handled locally, and arranging it early removes most of the delay from an NRI file.',
      },
      {
        q: 'How do I repay from abroad?',
        a: 'Through an NRE or NRO account, or through normal banking channels into it. Direct remittance from an ordinary overseas account is not the accepted route, so the account should be opened before disbursal rather than after.',
      },
      {
        q: 'Can I buy any property?',
        a: 'Residential and commercial property, generally yes. Agricultural land, plantation property and farmhouses are restricted for non-residents under exchange control rules, and lenders will not fund them.',
      },
    ],
    seo: {
      title: 'NRI Home Loan for Property in Pune | PayYou Advisory',
      description:
        'Home loans for non-resident Indians buying in Pune and PCMC. Power of attorney, consular attestation, NRE and NRO repayment, and shorter NRI tenures.',
      keywords: [
        'NRI home loan Pune',
        'NRI property loan PCMC',
        'home loan for NRI Pimpri Chinchwad',
        'NRI housing finance Pune',
      ],
    },
  },
]
