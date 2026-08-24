/**
 * Loan Against Securities and Deposit variants.
 *
 * Each security class behaves differently in a pledge — what it is worth, how
 * far it can be lent against, and what happens when its value moves — which is
 * the whole reason these are separate pages. See ../variants.js for the rule on
 * numbers.
 */

export const FINANCIAL = [
  // ── Loan against securities ──────────────────────────────────────────────
  {
    slug: 'loan-against-shares',
    parent: 'loan-against-securities',
    group: 'What you pledge',
    name: 'Loan Against Shares',
    shortName: 'Shares',
    tagline: 'Liquidity without a sale, and a margin to watch.',
    angle:
      'Equity is the most volatile thing you can pledge, so it attracts the lowest lending proportion of any security and is the only one where a market fall can trigger a demand for money within days.',
    summary:
      'An overdraft against listed equity shares held in your demat account, with the holding pledged rather than sold.',
    intro: [
      'Pledging shares suits an investor who needs cash but does not want to exit a position, whether because the market is down, because a capital gain would crystallise, or because the holding is meant for the long term. The shares stay in your demat account with a pledge marked in favour of the lender. Dividends, bonus issues and price appreciation all continue to belong to you.',
      'Equity carries the tightest terms in the category, and for an obvious reason: its value can move sharply in a single session. Lenders therefore advance a smaller proportion against shares than against debt instruments, and they maintain a list of approved scrips, typically large and liquid ones. A holding outside that list cannot be pledged however good the company is. If the market falls far enough that the cover behind your drawing shrinks, the lender issues a margin call, and the deadline is usually measured in days rather than weeks.',
    ],
    points: [
      {
        title: 'Only approved scrips can be pledged',
        body: 'Each lender maintains a list, generally of large and liquid stocks. A holding outside it is not acceptable security whatever its merits.',
      },
      {
        title: 'The lending proportion is the lowest in the category',
        body: 'Equity moves more than any other pledgeable asset, so lenders advance a smaller share of its value than against debt or deposits.',
      },
      {
        title: 'Margin calls come with short deadlines',
        body: 'A market fall reduces your cover. Topping up or repaying is usually required within days, and failing to do so lets the lender sell.',
      },
      {
        title: 'Draw well inside the limit',
        body: 'Using the full limit leaves no headroom for a fall. Borrowing conservatively is what keeps a margin call from becoming a forced sale.',
      },
    ],
    eligibility: [
      { criterion: 'Holding', detail: 'Listed shares in the applicant\'s own demat account' },
      { criterion: 'Approved list', detail: 'The scrip must appear on the lender\'s acceptable list' },
      { criterion: 'Demat', detail: 'Pledge marked through the depository in the lender\'s favour' },
      { criterion: 'Age', detail: '18 – 70 years' },
      { criterion: 'Concentration', detail: 'Some lenders cap exposure to a single scrip' },
    ],
    documents: [
      { label: 'Demat holding statement', note: 'Current, showing the shares to be pledged' },
      { label: 'Client master report', note: 'From the depository participant' },
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
      { label: 'Bank statements', note: 'Last 3 – 6 months' },
    ],
    faqs: [
      {
        q: 'Can I still sell the shares while they are pledged?',
        a: 'Not while the pledge stands and the facility is drawn. You keep ownership, dividends and any appreciation, but the holding is locked. Repaying the drawing releases the pledge and restores your ability to sell.',
      },
      {
        q: 'What happens if the market crashes?',
        a: 'The cover behind your drawing shrinks and the lender issues a margin call, asking you to pledge more shares or repay part of the balance, usually within days. If it is not met, the lender can sell the pledged shares to restore cover.',
      },
      {
        q: 'Why will the lender not accept my small-cap holding?',
        a: 'Because it has to be sellable quickly at a predictable price if things go wrong. Lenders maintain lists of large, liquid scrips for that reason. It is not a judgement on the company, only on how easily the position could be unwound.',
      },
    ],
    seo: {
      title: 'Loan Against Shares in Pune: Overdraft on Equity | PayYou',
      description:
        'Borrow against listed shares in Pune without selling. Approved scrip lists, lending proportions, margin calls and how the demat pledge works.',
      keywords: [
        'loan against shares Pune',
        'overdraft against equity PCMC',
        'demat pledge loan Pune',
        'loan against stocks Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'loan-against-mutual-funds',
    parent: 'loan-against-securities',
    group: 'What you pledge',
    name: 'Loan Against Mutual Funds',
    shortName: 'Mutual funds',
    tagline: 'Keep the SIP running and borrow against the corpus.',
    angle:
      'Debt funds are lent against far more generously than equity funds, so an investor holding both should pledge the debt side first and leave the equity growing.',
    summary:
      'A facility against mutual fund units, with a lien marked through the registrar while the investment stays yours.',
    intro: [
      'Mutual fund units are among the easiest assets to pledge, because the registrars maintain the records digitally and a lien can usually be marked within a day or two. The units remain in your folio, the net asset value continues to move in your favour, and any systematic investment plan running into the scheme carries on undisturbed.',
      'The distinction that matters most is between fund types. A debt or liquid fund has a stable net asset value, so lenders advance a high proportion of it. An equity fund moves with the market and attracts a materially lower proportion, closer to what shares command. An investor who holds both should generally pledge the debt holdings first: it raises more money per rupee of investment and it leaves the equity, which is the part meant to compound, untouched and outside the reach of a margin call.',
    ],
    points: [
      {
        title: 'Debt funds lend further than equity funds',
        body: 'Stable net asset value means a higher advance. Pledging debt holdings first raises more money and avoids putting equity at margin-call risk.',
      },
      {
        title: 'The lien is marked digitally',
        body: 'Registrars process a lien against units quickly, which makes this one of the faster secured facilities to arrange.',
      },
      {
        title: 'Your SIP carries on',
        body: 'Existing systematic investments into the scheme continue. Fresh units may or may not fall under the lien, so confirm it.',
      },
      {
        title: 'Not every scheme is acceptable',
        body: 'Lenders maintain approved scheme lists. Sectoral, thematic and small-cap funds are frequently excluded.',
      },
    ],
    eligibility: [
      { criterion: 'Holding', detail: 'Units in the applicant\'s own folio' },
      { criterion: 'Scheme', detail: 'On the lender\'s approved list; sectoral and thematic funds often excluded' },
      { criterion: 'Fund type', detail: 'Debt and liquid funds attract a higher advance than equity' },
      { criterion: 'Lien', detail: 'Marked with the registrar in the lender\'s favour' },
      { criterion: 'Age', detail: '18 – 70 years' },
    ],
    documents: [
      { label: 'Consolidated account statement', note: 'Showing the units to be pledged' },
      { label: 'Folio details', note: 'Registrar and scheme particulars' },
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
      { label: 'Bank statements', note: 'Last 3 – 6 months' },
    ],
    faqs: [
      {
        q: 'Will my SIP stop?',
        a: 'No. An existing systematic investment plan into the scheme continues to run and units keep accumulating. Whether newly purchased units automatically fall under the lien depends on the lender, so it is worth confirming at the outset.',
      },
      {
        q: 'Should I pledge equity or debt funds?',
        a: 'Debt, wherever possible. A stable net asset value means the lender advances a much higher proportion, so you raise more per rupee pledged, and you avoid exposing the equity portion to a margin call in a falling market.',
      },
      {
        q: 'How quickly can this be arranged?',
        a: 'Faster than most secured facilities. Registrars mark a lien digitally, often within a day or two, so the whole process can complete in well under a week once documentation is in order.',
      },
    ],
    seo: {
      title: 'Loan Against Mutual Funds in Pune & PCMC | PayYou Advisory',
      description:
        'Borrow against mutual fund units in Pune without redeeming. Why debt funds lend further than equity, how the registrar lien works, and what happens to your SIP.',
      keywords: [
        'loan against mutual funds Pune',
        'LAMF PCMC',
        'loan against MF units Pimpri Chinchwad',
        'mutual fund lien loan Pune',
      ],
    },
  },

  {
    slug: 'loan-against-insurance-policy',
    parent: 'loan-against-securities',
    group: 'What you pledge',
    name: 'Loan Against Life Insurance Policy',
    shortName: 'Insurance policy',
    tagline: 'Only if the policy has a surrender value.',
    angle:
      'A term plan cannot be borrowed against at all, because it has no surrender value: only traditional endowment, money-back and whole-life policies build the cash value a lender can lend against.',
    summary:
      'Borrowing against the surrender value of a traditional life policy, usually from the insurer itself.',
    intro: [
      'A traditional life insurance policy accumulates a surrender value over time, the amount the insurer would pay if you terminated the contract. That value is a real asset, and it can be borrowed against without ending the cover. Insurers themselves commonly lend against their own policies, often at rates below what an unsecured lender would offer and with almost no documentation, because they already hold everything they need.',
      'The eligibility test surprises people. A term plan, which is pure protection with no savings element, has no surrender value and therefore cannot be borrowed against at all, however large the sum assured. Endowment, money-back and whole-life policies do build a value, but only after premiums have been paid for a minimum period, commonly two to three years. Unit-linked plans are treated separately again. Importantly, the cover continues while the loan runs; if a claim arises, the outstanding loan and interest are deducted from what is paid.',
    ],
    points: [
      {
        title: 'Term plans do not qualify',
        body: 'Pure protection builds no surrender value, so there is nothing to lend against. Only savings-linked policies work here.',
      },
      {
        title: 'Premiums must be paid for a minimum period',
        body: 'A surrender value usually accrues only after two to three years of premiums. Before that the policy is not acceptable security.',
      },
      {
        title: 'The insurer is often the cheapest lender',
        body: 'Borrowing from the insurer that issued the policy is typically quick and lightly documented, because they hold all the records already.',
      },
      {
        title: 'Cover continues, and a claim is netted',
        body: 'The policy stays in force. If a claim arises while the loan is outstanding, the loan and interest are deducted from the payout.',
      },
    ],
    eligibility: [
      { criterion: 'Policy type', detail: 'Endowment, money-back or whole-life with a surrender value' },
      { criterion: 'Premium record', detail: 'Usually 2 – 3 years of premiums paid, policy in force' },
      { criterion: 'Ownership', detail: 'The applicant must be the policyholder' },
      { criterion: 'Assignment', detail: 'The policy is assigned to the lender for the term of the loan' },
    ],
    documents: [
      { label: 'Original policy document', note: 'To be assigned to the lender' },
      { label: 'Premium receipts', note: 'Evidence the policy is in force' },
      { label: 'Surrender value statement', note: 'From the insurer' },
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
    ],
    faqs: [
      {
        q: 'Can I borrow against my term insurance?',
        a: 'No. A term plan is pure protection and builds no surrender value, so there is nothing for a lender to lend against, regardless of how large the sum assured is. Only savings-linked policies such as endowment and money-back plans qualify.',
      },
      {
        q: 'Does my cover stop while the loan is running?',
        a: 'No, the policy stays in force and your family remains protected. If a claim arises while the loan is outstanding, the loan balance and accrued interest are deducted from the payout and the remainder is paid.',
      },
      {
        q: 'Is the insurer cheaper than a bank?',
        a: 'Usually, for this particular purpose. The insurer already holds the policy records and the security, so the process is quick, the documentation minimal and the rate often below what an unsecured lender would offer.',
      },
    ],
    seo: {
      title: 'Loan Against LIC & Life Insurance Policy in Pune | PayYou',
      description:
        'Borrow against a traditional life policy in Pune. Why term plans do not qualify, when surrender value accrues, and how a claim is netted against the loan.',
      keywords: [
        'loan against LIC policy Pune',
        'loan against insurance policy PCMC',
        'policy surrender value loan Pimpri Chinchwad',
        'life insurance loan Pune',
      ],
    },
  },

  {
    slug: 'loan-against-bonds',
    parent: 'loan-against-securities',
    group: 'What you pledge',
    name: 'Loan Against Bonds & Government Securities',
    shortName: 'Bonds',
    tagline: 'Stable value, so a generous advance.',
    angle:
      'Because a bond redeems at a known amount on a known date, lenders advance a much higher proportion against it than against equity, and margin calls are correspondingly rare.',
    summary:
      'Borrowing against government securities, debentures and rated corporate bonds held in demat form.',
    intro: [
      'Bonds and government securities are the most straightforward things to pledge. Their value does not swing the way equity does, and they redeem at a defined amount on a defined date, which gives a lender unusual certainty about what the security is worth. The result is a higher advance against value than any other pledgeable instrument except a deposit, and margin calls that occur rarely rather than routinely.',
      'The variables are credit quality and tenor. A sovereign security is treated most favourably. A highly rated corporate bond follows closely. A lower-rated instrument attracts a smaller advance or may be refused outright, because a downgrade would move its price sharply. Where the bond\'s redemption falls before the facility would end, lenders normally require the facility to be reduced or closed at redemption, so it is worth matching the borrowing period to the instrument\'s remaining life at the outset.',
    ],
    points: [
      {
        title: 'A high advance against value',
        body: 'Predictable pricing means lenders fund a much larger proportion than they would against equity, so less has to be pledged.',
      },
      {
        title: 'Credit rating drives acceptance',
        body: 'Sovereign and highly rated instruments are readily accepted. Lower-rated bonds attract a smaller advance or a refusal.',
      },
      {
        title: 'Match the facility to the redemption date',
        body: 'When the bond redeems, the security disappears. Lenders require repayment or substitution at that point, so plan the tenure around it.',
      },
      {
        title: 'Interest keeps coming to you',
        body: 'Coupon payments continue to be received by the holder while the pledge stands.',
      },
    ],
    eligibility: [
      { criterion: 'Instrument', detail: 'Government securities, debentures or rated corporate bonds' },
      { criterion: 'Rating', detail: 'On the lender\'s acceptable list; higher ratings lend further' },
      { criterion: 'Holding', detail: 'In demat form, in the applicant\'s own name' },
      { criterion: 'Residual tenor', detail: 'Redemption date compared against the facility period' },
    ],
    documents: [
      { label: 'Demat holding statement', note: 'Showing the instruments to be pledged' },
      { label: 'Instrument particulars', note: 'ISIN, rating and redemption date' },
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
      { label: 'Bank statements', note: 'Last 3 – 6 months' },
    ],
    faqs: [
      {
        q: 'Why do bonds raise more than shares of the same value?',
        a: 'Because their price is predictable. A bond redeems at a known amount on a known date, so a lender can be confident of what the security is worth. Equity can move sharply in a session, which is why the advance against it is much smaller.',
      },
      {
        q: 'What happens when the bond matures?',
        a: 'The security ceases to exist, so lenders require the facility to be repaid or other securities substituted at that point. It is worth matching the borrowing period to the instrument\'s remaining life when you set the facility up.',
      },
      {
        q: 'Do I keep receiving the interest?',
        a: 'Yes. Coupon payments continue to come to you as the holder throughout. The pledge restricts your ability to sell the instrument; it does not divert its income.',
      },
    ],
    seo: {
      title: 'Loan Against Bonds & Government Securities in Pune | PayYou',
      description:
        'Pledge bonds, debentures and government securities in Pune for an overdraft. Higher advance than equity, rating requirements and redemption date planning.',
      keywords: [
        'loan against bonds Pune',
        'loan against government securities PCMC',
        'debenture pledge loan Pimpri Chinchwad',
        'loan against NCD Pune',
      ],
    },
  },

  {
    slug: 'loan-against-fixed-deposit',
    parent: 'loan-against-securities',
    group: 'What you pledge',
    name: 'Loan Against Fixed Deposit',
    shortName: 'Fixed deposit',
    tagline: 'Almost always better than breaking the deposit.',
    angle:
      'The rate is set at a small margin over what the deposit itself earns, so the true cost of borrowing is only that spread, which is nearly always less than the penalty and lost interest of a premature withdrawal.',
    summary:
      'An overdraft against a fixed deposit you hold, priced just above the deposit rate and arranged the same day.',
    intro: [
      'This is the simplest and cheapest secured borrowing available to anyone holding a fixed deposit. The bank already has your money; lending a proportion of it back carries almost no risk, so the pricing reflects that. Rates are typically set at a modest margin above the rate the deposit itself is earning, which means your real cost is only that spread rather than the full interest rate.',
      'The comparison that matters is against breaking the deposit. Premature withdrawal usually attracts a penalty and, more significantly, the deposit is then re-rated to the shorter period it actually ran, so you lose part of the interest already accrued. Borrowing against it instead leaves the deposit intact and earning at its contracted rate to maturity. For a short requirement, the arithmetic favours the loan in almost every case. The facility is normally arranged same-day, needs no fresh credit assessment, and is available against most deposit types.',
    ],
    points: [
      {
        title: 'Priced at a small margin over the deposit rate',
        body: 'Your effective cost is the spread, not the headline rate, because the deposit continues to earn throughout.',
      },
      {
        title: 'Cheaper than breaking the deposit',
        body: 'Premature withdrawal costs a penalty and re-rates the deposit to the period it actually ran. Borrowing avoids both.',
      },
      {
        title: 'Same-day and no credit assessment',
        body: 'The bank holds the security already, so there is no underwriting, no bureau check and usually no wait.',
      },
      {
        title: 'The deposit keeps earning',
        body: 'It runs to maturity at the contracted rate. Only your ability to withdraw it is suspended.',
      },
    ],
    eligibility: [
      { criterion: 'Deposit', detail: 'Held with the lending bank, in the applicant\'s own name' },
      { criterion: 'Type', detail: 'Most fixed deposits; tax-saving deposits under lock-in are excluded' },
      { criterion: 'Residual tenure', detail: 'The facility normally ends at the deposit\'s maturity' },
      { criterion: 'Credit history', detail: 'Not assessed; the deposit is the security' },
    ],
    documents: [
      { label: 'Deposit receipt', note: 'Original, to be marked with a lien' },
      { label: 'PAN and Aadhaar', note: 'Usually already held by the bank' },
      { label: 'Lien request', note: 'Signed by every deposit holder' },
    ],
    faqs: [
      {
        q: 'Should I break my FD or borrow against it?',
        a: 'Borrow against it, in almost every case. Breaking a deposit costs a penalty and re-rates it to the shorter period it actually ran, so you lose accrued interest. Borrowing leaves it earning at the contracted rate and costs only the small spread over that rate.',
      },
      {
        q: 'Will the bank check my credit score?',
        a: 'Generally not. The bank already holds the deposit as security, so there is no underwriting and usually no bureau enquiry. It is one of the few facilities genuinely available to someone with a damaged credit record.',
      },
      {
        q: 'Can I borrow against a tax-saving FD?',
        a: 'No. A tax-saving fixed deposit carries a statutory lock-in and cannot be pledged or encumbered during it. Ordinary fixed deposits are acceptable.',
      },
    ],
    seo: {
      title: 'Loan Against Fixed Deposit in Pune & PCMC | PayYou Advisory',
      description:
        'Overdraft against a fixed deposit in Pune. Priced just above the deposit rate, arranged same day with no credit check, and cheaper than premature withdrawal.',
      keywords: [
        'loan against fixed deposit Pune',
        'overdraft against FD PCMC',
        'FD loan Pimpri Chinchwad',
        'loan on fixed deposit India',
      ],
    },
  },

  // ── Deposits ─────────────────────────────────────────────────────────────
  {
    slug: 'fixed-deposit',
    parent: 'investments',
    group: 'Deposits',
    name: 'Fixed Deposit',
    shortName: 'Fixed deposit',
    tagline: 'Certainty, taxed as income.',
    angle:
      'A fixed deposit is the only common savings product where the return is contractually certain, and also the one where tax and inflation take the largest proportionate bite out of it.',
    summary:
      'A lump sum placed for a defined period at a contracted rate, with banks and rated finance companies.',
    intro: [
      'A fixed deposit does one thing well: it tells you exactly what you will have and when. The rate is contracted at the outset and does not move, the maturity date is fixed, and for a bank deposit the money is covered by deposit insurance up to a statutory limit per depositor per bank. For money that must not be at risk, or that is needed on a known date, nothing is simpler.',
      'The honest limitation is the after-tax, after-inflation return. Deposit interest is added to your income and taxed at your slab rate, with tax deducted at source above a threshold, so a headline rate flatters what actually reaches you. Over long horizons that combination frequently leaves very little real growth. Two practical points follow: spread large sums across institutions so each stays within the insurance limit, and ladder maturities across several dates so money becomes available periodically without any deposit having to be broken.',
    ],
    points: [
      {
        title: 'Deposit insurance is per depositor per bank',
        body: 'Splitting a large amount across institutions keeps more of it covered, which is usually worth more than a marginally better rate.',
      },
      {
        title: 'Interest is taxed at your slab',
        body: 'It is added to income, with tax deducted at source above a threshold. Compare a deposit against alternatives after tax, not before.',
      },
      {
        title: 'Ladder the maturities',
        body: 'Several deposits maturing at staggered dates keep money reachable without breaking anything and without holding it all in cash.',
      },
      {
        title: 'Senior citizens usually get more',
        body: 'Most banks offer a higher rate to depositors above a qualifying age. It is worth placing family deposits in the right name.',
      },
    ],
    eligibility: [
      { criterion: 'Depositor', detail: 'Individual, singly or jointly; firms, companies and trusts also eligible' },
      { criterion: 'Tenure', detail: 'From 7 days to 10 years, by institution' },
      { criterion: 'Minimum', detail: 'Set by the bank or finance company' },
      { criterion: 'KYC', detail: 'PAN mandatory; Aadhaar for individuals' },
    ],
    documents: [
      { label: 'PAN and Aadhaar', note: 'For every depositor named' },
      { label: 'Form 15G or 15H', note: 'Where you qualify to avoid tax deducted at source' },
      { label: 'Nomination', note: 'Strongly recommended at the time of placing' },
      { label: 'Entity documents', note: 'Where the depositor is a firm, company or trust' },
    ],
    faqs: [
      {
        q: 'How much of my deposit is protected?',
        a: 'Bank deposits are insured per depositor per bank up to a statutory limit, covering principal and interest together. Spreading a large sum across several banks keeps more of it inside that cover, which usually matters more than chasing a slightly better rate.',
      },
      {
        q: 'How is the interest taxed?',
        a: 'It is added to your income and taxed at your slab rate, and the bank deducts tax at source once interest crosses a threshold. If your total income is below the taxable limit, Form 15G or 15H prevents that deduction.',
      },
      {
        q: 'What if I need the money before maturity?',
        a: 'Most deposits can be broken, with a penalty and a re-rating to the period actually run. Two better options usually exist: borrow against the deposit at a small spread, or ladder maturities from the start so something is always coming due.',
      },
    ],
    seo: {
      title: 'Fixed Deposit Rates & Placement in Pune | PayYou Advisory',
      description:
        'Place fixed deposits with partner banks and NBFCs in Pune. Deposit insurance limits, tax on interest, laddering maturities and senior citizen rates explained.',
      keywords: [
        'fixed deposit Pune',
        'best FD rates PCMC',
        'bank fixed deposit Pimpri Chinchwad',
        'senior citizen FD Pune',
      ],
    },
  },

  {
    slug: 'recurring-deposit',
    parent: 'investments',
    group: 'Deposits',
    name: 'Recurring Deposit',
    shortName: 'Recurring deposit',
    tagline: 'For building a sum, not for parking one.',
    angle:
      'Each instalment earns only for the time remaining to maturity, so a recurring deposit yields noticeably less than a fixed deposit at the same quoted rate.',
    summary:
      'A fixed monthly contribution for a set period at a contracted rate, maturing as a lump sum.',
    intro: [
      'A recurring deposit is a saving mechanism rather than an investment of surplus. You commit a fixed amount each month for a chosen period, the rate is contracted at the start, and the whole sum with interest is paid at maturity. It suits a defined goal on a defined date, funded from monthly income: a house deposit, a fee instalment, an insurance premium falling due next year.',
      'The arithmetic is worth understanding, because the quoted rate is not what you earn on the total. Your first instalment earns for the full term; your last earns for a month. The effective yield on the total contributed is therefore meaningfully below the headline rate, unlike a fixed deposit where the whole sum works from day one. That is not a flaw, it is what a monthly product must look like. But it means a recurring deposit and a fixed deposit at the same quoted rate are not equivalent, and someone with a lump sum already in hand should place a fixed deposit rather than drip it in.',
    ],
    points: [
      {
        title: 'The effective yield is below the quoted rate',
        body: 'Later instalments earn for less time, so the return on the total contributed is lower than the headline suggests.',
      },
      {
        title: 'Only for money you do not yet have',
        body: 'If the lump sum already exists, a fixed deposit earns more. A recurring deposit is for income being saved as it arrives.',
      },
      {
        title: 'Missed instalments carry a penalty',
        body: 'Most institutions levy a charge for a missed month and can close the account after repeated defaults. Set a standing instruction.',
      },
      {
        title: 'Taxed exactly like a fixed deposit',
        body: 'Interest is added to income and taxed at your slab, with tax deducted at source above the threshold.',
      },
    ],
    eligibility: [
      { criterion: 'Depositor', detail: 'Individual, singly or jointly; minors with a guardian' },
      { criterion: 'Tenure', detail: 'Commonly 6 months to 10 years' },
      { criterion: 'Instalment', detail: 'Fixed monthly amount, minimum set by the institution' },
      { criterion: 'KYC', detail: 'PAN and Aadhaar' },
    ],
    documents: [
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
      { label: 'Standing instruction mandate', note: 'To avoid missed instalments' },
      { label: 'Nomination', note: 'Recommended at account opening' },
    ],
    faqs: [
      {
        q: 'Is a recurring deposit as good as a fixed deposit?',
        a: 'Not at the same quoted rate, because each instalment earns only for the time left to maturity. If you already hold the lump sum, a fixed deposit earns more. A recurring deposit is the right product when you are saving out of monthly income.',
      },
      {
        q: 'What if I miss a month?',
        a: 'Most institutions charge a penalty and some can close the account after repeated defaults, paying out at a reduced rate. A standing instruction from your account is the simplest way to avoid it entirely.',
      },
      {
        q: 'Can I withdraw before maturity?',
        a: 'Usually, with a penalty and a lower rate applied to the period actually run. Because the sum builds gradually, an early closure in the first year often returns very little interest, so the tenure is worth choosing carefully at the start.',
      },
    ],
    seo: {
      title: 'Recurring Deposit Accounts in Pune & PCMC | PayYou Advisory',
      description:
        'Open a recurring deposit with partner banks in Pune. Why the effective yield sits below the quoted rate, penalties for missed instalments, and how RDs compare to FDs.',
      keywords: [
        'recurring deposit Pune',
        'RD account PCMC',
        'monthly deposit scheme Pimpri Chinchwad',
        'recurring deposit interest rate Pune',
      ],
    },
  },

  {
    slug: 'savings-and-current-account',
    parent: 'investments',
    group: 'Accounts',
    name: 'Savings & Current Account Opening',
    shortName: 'Bank accounts',
    tagline: 'The balance requirement costs more than the fees.',
    angle:
      'A minimum balance requirement is a real cost, because that money earns a savings rate while it could be in a deposit, and the penalty for breaching it usually exceeds any charge the account advertises.',
    summary:
      'Opening savings and current accounts with partner banks, chosen on balance requirements and transaction limits rather than on rate.',
    intro: [
      'Choosing a bank account is usually treated as an afterthought and is worth ten minutes of thought. For a savings account the headline interest rate matters far less than the minimum balance requirement, because the sum you must keep sitting there earns a savings rate while it could be earning a deposit rate. Over a year, on a substantial minimum balance, that gap is a larger number than any account fee.',
      'A current account has different tests entirely. It pays no interest by design, so what matters is the cash deposit limit before charges apply, the number of free transactions, whether outstation cheque handling costs anything, and how good the digital and payment gateway integration is if you take digital payments. For a business, the account also builds the banking record that a lender will read when you next apply for a facility, so keeping it tidy and keeping balances visible has a value well beyond convenience.',
    ],
    points: [
      {
        title: 'Minimum balance is the real cost',
        body: 'Money locked at a savings rate to avoid a penalty is money not earning a deposit rate. Compare that gap against the account\'s fees.',
      },
      {
        title: 'Current accounts are judged on limits',
        body: 'Free cash deposit limits, transaction counts and gateway integration matter far more than any interest, since none is paid.',
      },
      {
        title: 'Your account is your future credit file',
        body: 'Lenders read bank statements closely. A well-conducted account with visible balances makes the next borrowing conversation much easier.',
      },
      {
        title: 'Sweep facilities can reconcile both',
        body: 'An automatic sweep moves surplus above a threshold into a deposit and back when needed, which recovers much of the lost yield.',
      },
    ],
    eligibility: [
      { criterion: 'Savings account', detail: 'Resident individuals, singly or jointly; minors with a guardian' },
      { criterion: 'Current account', detail: 'Proprietors, firms, companies, trusts and societies' },
      { criterion: 'KYC', detail: 'PAN and Aadhaar for individuals; entity documents for a business' },
      { criterion: 'Business proof', detail: 'Required for a current account: GST, Udyam or a trade licence' },
    ],
    documents: [
      { label: 'PAN and Aadhaar', note: 'For the applicant and any joint holder' },
      { label: 'Business registration', note: 'GST, Udyam, shop licence or incorporation papers' },
      { label: 'Board or partnership resolution', note: 'Authorising the account and its signatories' },
      { label: 'Address proof', note: 'For the business premises, where applicable' },
    ],
    faqs: [
      {
        q: 'Which savings account should I choose?',
        a: 'Compare on minimum balance before anything else. The money you must keep parked earns a savings rate when it could be in a deposit, and over a year that gap usually exceeds any fee the account charges. The interest rate itself is a minor consideration.',
      },
      {
        q: 'Do I need a current account for my business?',
        a: 'In practice, yes. Running a business through a personal savings account breaches most banks\' terms, complicates your tax position, and produces a bank statement no lender can read cleanly when you later apply for a facility.',
      },
      {
        q: 'What is a sweep facility?',
        a: 'An arrangement where balances above a set threshold move automatically into a fixed deposit and come back when the account needs them. It recovers much of the yield lost to a minimum balance requirement without you having to manage it.',
      },
    ],
    seo: {
      title: 'Savings & Current Account Opening in Pune | PayYou Advisory',
      description:
        'Open savings and current accounts with partner banks in Pune and PCMC. Choosing on minimum balance and transaction limits, and how sweep facilities recover lost yield.',
      keywords: [
        'current account opening Pune',
        'savings account PCMC',
        'business bank account Pimpri Chinchwad',
        'zero balance account Pune',
      ],
    },
  },

  {
    slug: 'systematic-deposit-plan',
    parent: 'investments',
    group: 'Deposits',
    name: 'Systematic Deposit Plan',
    shortName: 'Deposit SIP',
    tagline: 'A ladder of deposits, built one month at a time.',
    angle:
      'Unlike a recurring deposit, each monthly contribution becomes its own separate fixed deposit at that month\'s prevailing rate, so you average across the rate cycle instead of locking into one point in it.',
    summary:
      'Monthly contributions that each open a fresh fixed deposit, spreading both maturity dates and interest rates.',
    intro: [
      'A systematic deposit plan looks like a recurring deposit and works quite differently. Each monthly contribution opens its own fixed deposit for the chosen term, at whatever rate applies that month. After a year you hold twelve separate deposits, each with its own rate and its own maturity date, rather than one account earning a single contracted rate.',
      'The two consequences are worth having. You average across the interest rate cycle rather than committing everything at one point in it, which matters when rates are moving. And you build a natural ladder: from the thirteenth month onwards a deposit matures every month, so money becomes available regularly without anything being broken. If liquidity is needed sooner, individual deposits can be closed or borrowed against while the rest continue untouched. The trade against a recurring deposit is a little more administration and a little more to keep track of.',
    ],
    points: [
      {
        title: 'Each instalment gets that month\'s rate',
        body: 'You average across the cycle rather than locking the whole plan into a single contracted rate.',
      },
      {
        title: 'A ladder builds itself',
        body: 'After the first term, one deposit matures each month, so money is regularly available without breaking anything.',
      },
      {
        title: 'Individual deposits can be broken alone',
        body: 'Needing money early affects one deposit rather than the whole plan, which a recurring deposit cannot offer.',
      },
      {
        title: 'More paperwork than a recurring deposit',
        body: 'You are running many deposits rather than one account. Most institutions consolidate the reporting, and it is still more to track.',
      },
    ],
    eligibility: [
      { criterion: 'Depositor', detail: 'Individuals and, with some institutions, entities' },
      { criterion: 'Instalment', detail: 'Fixed monthly amount, minimum set by the institution' },
      { criterion: 'Term', detail: 'Chosen per deposit, commonly 1 – 5 years' },
      { criterion: 'KYC', detail: 'PAN and Aadhaar, completed once for the plan' },
    ],
    documents: [
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
      { label: 'Standing instruction mandate', note: 'For the monthly contribution' },
      { label: 'Nomination', note: 'Applied across the deposits in the plan' },
    ],
    faqs: [
      {
        q: 'How is this different from a recurring deposit?',
        a: 'A recurring deposit is one account at one contracted rate. A systematic deposit plan opens a separate fixed deposit each month at that month\'s rate, so you average across the rate cycle and end up with a ladder of maturities instead of a single date.',
      },
      {
        q: 'Can I stop the plan?',
        a: 'Yes. Stopping future contributions leaves the deposits already made running to their own maturities, undisturbed. That flexibility is one of the practical advantages over a recurring deposit.',
      },
      {
        q: 'Is it better when rates are rising or falling?',
        a: 'It protects you against being wrong about either. When rates rise, later instalments capture the higher rates. When they fall, earlier ones are already locked in. The point is not to have to guess.',
      },
    ],
    seo: {
      title: 'Systematic Deposit Plan in Pune: Monthly FD Ladder | PayYou',
      description:
        'Build a deposit ladder in Pune one month at a time. Each instalment opens its own fixed deposit at that month\'s rate, averaging the cycle and staggering maturities.',
      keywords: [
        'systematic deposit plan Pune',
        'FD SIP PCMC',
        'monthly fixed deposit Pimpri Chinchwad',
        'deposit laddering Pune',
      ],
    },
  },
]
