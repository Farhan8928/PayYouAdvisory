/**
 * Insurance, vehicle and education variants.
 *
 * PayYou distributes insurance as an intermediary; it does not underwrite,
 * does not settle claims and does not decide premiums. Every page here says so
 * where it matters. See ../variants.js for the rule on numbers.
 */

export const PROTECTION = [
  // ── Insurance ────────────────────────────────────────────────────────────
  {
    slug: 'term-insurance',
    parent: 'insurance',
    group: 'Life cover',
    name: 'Term Insurance',
    shortName: 'Term',
    tagline: 'The most cover for the least money.',
    angle:
      'Term insurance pays nothing if you survive the policy, which is precisely why it buys many times the cover of a savings-linked plan for the same premium.',
    summary:
      'Pure life cover for a fixed period, paying a lump sum to your family if you die within it.',
    intro: [
      'Term insurance is the cheapest way to protect a family, and the least popular, because it returns nothing if you live. That is the whole design. Every rupee of premium buys cover rather than being split between cover and a savings pot, so the sum assured available for a given premium is a multiple of what an endowment or money-back plan provides.',
      'The sizing question is more important than the product choice. A useful working figure is enough to clear all outstanding debt, particularly a home loan, and to replace the income the household depends on for as long as it will be needed, typically until children are independent. Buying young matters more than people expect: premiums are set by age at entry and stay level for the term, so a policy taken at thirty costs materially less every year for its whole life than the same cover taken at forty. Disclose health conditions fully. A claim declined for non-disclosure defeats the entire purpose of buying cover.',
    ],
    points: [
      {
        title: 'Cover, not savings',
        body: 'Nothing is paid if you survive the term. That is why the sum assured per rupee of premium is many times what a savings-linked plan offers.',
      },
      {
        title: 'Age at entry fixes the premium for life',
        body: 'Buying at thirty rather than forty locks a lower premium for the whole term. Delay is the most expensive decision in this product.',
      },
      {
        title: 'Size it against debt and dependent years',
        body: 'Enough to clear the home loan and replace household income until dependants are independent is the practical benchmark.',
      },
      {
        title: 'Disclose everything, in writing',
        body: 'Non-disclosure of a health condition or habit is the commonest ground for a claim being contested. Full disclosure protects the family, not the insurer.',
      },
    ],
    eligibility: [
      { criterion: 'Age at entry', detail: 'Commonly 18 – 65 years' },
      { criterion: 'Medical', detail: 'Tests usually required above a threshold of age or sum assured' },
      { criterion: 'Income proof', detail: 'Required to justify the sum assured sought' },
      { criterion: 'Habits', detail: 'Tobacco use materially changes the premium and must be declared' },
    ],
    documents: [
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
      { label: 'Income proof', note: 'Salary slips, Form 16 or ITR, to justify the sum assured' },
      { label: 'Medical reports', note: 'Where the insurer requires tests' },
      { label: 'Nomination details', note: 'Of the beneficiary' },
    ],
    faqs: [
      {
        q: 'Why would I buy something that returns nothing?',
        a: 'Because it buys many times more protection for the same money. Insurance and investment do different jobs, and combining them into one product usually does both badly. Buy the cover here and invest the difference separately.',
      },
      {
        q: 'How much cover do I need?',
        a: 'Enough to clear outstanding debt, particularly the home loan, and to replace the income your household relies on until dependants are independent. Working through those two figures produces a far better answer than any thumb rule.',
      },
      {
        q: 'What if I forget to mention a health condition?',
        a: 'Non-disclosure is the most common reason a claim is contested, and the person who suffers is your family. Declare everything, including habits, and keep a copy of what was declared. A slightly higher premium is worth an uncontested claim.',
      },
    ],
    seo: {
      title: 'Term Insurance Plans in Pune & PCMC | PayYou Advisory',
      description:
        'Term life cover for families in Pune. Why pure protection buys more, how to size the sum assured against your home loan, and why disclosure decides claims.',
      keywords: [
        'term insurance Pune',
        'term plan PCMC',
        'life cover Pimpri Chinchwad',
        'term insurance premium Pune',
      ],
    },
  },

  {
    slug: 'life-insurance',
    parent: 'insurance',
    group: 'Life cover',
    name: 'Life Insurance & Savings Plans',
    shortName: 'Life & savings',
    tagline: 'Cover and savings in one contract, at a cost.',
    angle:
      'Endowment and money-back plans bundle protection with a savings pot, and the bundling is what makes both the cover thin and the return modest compared with buying each separately.',
    summary:
      'Endowment, money-back and whole-life policies that pay on maturity as well as on death.',
    intro: [
      'Traditional life policies combine protection with a savings element. Part of the premium buys cover and part accumulates, so the policy pays out whether you die during the term or survive it. That certainty of getting something back is why these plans remain the most widely held form of life insurance in India despite the arithmetic.',
      'The arithmetic deserves stating plainly. Because the premium is split, the cover bought is a fraction of what the same money would buy as term insurance, and the returns on the savings portion are typically modest compared with what a straightforward investment would produce over the same period. There are genuine reasons to hold one: guaranteed maturity values suit someone who will not tolerate any volatility, the policies build a surrender value that can be borrowed against, and the discipline of a committed annual premium works for people who would not otherwise save. But they should be chosen knowing the trade, not sold as though there is not one.',
    ],
    points: [
      {
        title: 'The cover is thin for the premium',
        body: 'Splitting the premium between protection and savings means the sum assured is a fraction of what term insurance would buy.',
      },
      {
        title: 'Returns are guaranteed and modest',
        body: 'Certainty is the product\'s real feature. Over long horizons the return usually sits well below what a plain investment would deliver.',
      },
      {
        title: 'It builds a surrender value you can borrow against',
        body: 'Unlike a term plan, a traditional policy accumulates cash value, and that value can be pledged without ending the cover.',
      },
      {
        title: 'Surrendering early is expensive',
        body: 'Policies surrendered in the first few years return very little. If you commit, commit for the full term.',
      },
    ],
    eligibility: [
      { criterion: 'Age at entry', detail: 'Varies by plan, commonly 18 – 60 years' },
      { criterion: 'Premium commitment', detail: 'Annual, half-yearly or monthly, for the paying term' },
      { criterion: 'Medical', detail: 'Often lighter than term insurance, given lower sums assured' },
      { criterion: 'Term', detail: 'Typically 10 – 30 years, or whole of life' },
    ],
    documents: [
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
      { label: 'Income proof', note: 'To justify the premium and sum assured' },
      { label: 'Age proof', note: 'Birth certificate, passport or school certificate' },
      { label: 'Nomination details', note: 'Of the beneficiary' },
    ],
    faqs: [
      {
        q: 'Is an endowment policy a good investment?',
        a: 'As an investment, usually a modest one. Its real feature is certainty rather than return. If you need protection, term insurance buys far more of it; if you need growth, a plain investment usually delivers more. These plans suit someone who wants a guaranteed outcome and will not tolerate volatility.',
      },
      {
        q: 'Should I surrender a policy I already hold?',
        a: 'Not automatically. Early surrender returns very little, and the calculation depends on how many years have run and what the paid-up value would be. It is worth working through the numbers on the specific policy rather than acting on a general rule.',
      },
      {
        q: 'Can I borrow against it?',
        a: 'Yes, once a surrender value has built up, usually after two to three years of premiums. The insurer itself is often the cheapest lender, and the cover continues while the loan runs.',
      },
    ],
    seo: {
      title: 'Life Insurance & Endowment Plans in Pune | PayYou Advisory',
      description:
        'Endowment, money-back and whole-life policies in Pune and PCMC. An honest account of what bundling cover with savings costs, and when these plans genuinely fit.',
      keywords: [
        'life insurance Pune',
        'endowment policy PCMC',
        'money back plan Pimpri Chinchwad',
        'LIC policy advisor Pune',
      ],
    },
  },

  {
    slug: 'health-insurance',
    parent: 'insurance',
    group: 'Health',
    name: 'Health Insurance',
    shortName: 'Health',
    tagline: 'The exclusions matter more than the premium.',
    angle:
      'Two policies at the same premium and sum insured can behave completely differently at claim time, because room rent limits, co-payment clauses and disease-wise sub-limits decide what is actually paid.',
    summary:
      'Individual and family floater hospitalisation cover, chosen on the terms that decide claims rather than on price.',
    intro: [
      'Health insurance is the product where comparison shopping on premium does the most damage. The premium and the sum insured are the two numbers everyone looks at, and neither tells you what the policy will pay when someone is admitted. Four clauses do most of that work, and they sit in the wording rather than in the brochure.',
      'Room rent capping is the first: a limit tied to a percentage of the sum insured can proportionately reduce the entire claim if you occupy a costlier room, so a bill far larger than the room difference gets scaled down. Co-payment requires you to bear a share of every claim. Disease-wise sub-limits cap what will be paid for specific procedures regardless of the sum insured. And waiting periods, for pre-existing conditions and for named ailments, determine whether a claim is admissible at all in the early years. A policy with no room rent limit and no co-payment at a slightly higher premium is usually the better purchase, and that is what we compare on.',
    ],
    points: [
      {
        title: 'Room rent capping can shrink the whole claim',
        body: 'Occupying a room above the limit lets the insurer scale down every associated charge proportionately, not just the room difference.',
      },
      {
        title: 'Waiting periods decide the early years',
        body: 'Pre-existing conditions and named ailments carry waiting periods. Buying before you need it is the only way to serve them out quietly.',
      },
      {
        title: 'A family floater is cheaper and shared',
        body: 'One sum insured across the family costs less than separate policies, and one serious claim can consume the cover for everyone.',
      },
      {
        title: 'Portability protects your waiting periods',
        body: 'Moving insurer without losing accrued waiting periods is possible if done at renewal and within the notice window.',
      },
    ],
    eligibility: [
      { criterion: 'Age at entry', detail: 'Commonly 18 – 65 years; children covered under a floater' },
      { criterion: 'Pre-existing conditions', detail: 'Must be declared; subject to a waiting period' },
      { criterion: 'Medical screening', detail: 'Often required above a threshold age or sum insured' },
      { criterion: 'Renewal', detail: 'Lifelong renewability is a feature worth insisting on' },
    ],
    documents: [
      { label: 'PAN and Aadhaar', note: 'Of every member proposed' },
      { label: 'Age proof', note: 'For each insured person' },
      { label: 'Medical history', note: 'Full declaration of existing conditions' },
      { label: 'Previous policy', note: 'Where porting, to preserve waiting periods' },
    ],
    faqs: [
      {
        q: 'How much cover does a family need?',
        a: 'Enough to meet a serious hospitalisation at the hospitals you would actually use, which in Pune is a higher figure than most families first assume. A smaller base policy topped up with a super top-up is often the most economical way to reach a meaningful total.',
      },
      {
        q: 'What is room rent capping and why does it matter so much?',
        a: 'It limits the daily room charge the policy will meet. If you occupy a costlier room, many insurers scale down the entire claim proportionately, not just the room difference. A policy without that cap is usually worth a higher premium.',
      },
      {
        q: 'Can I change insurer without losing my waiting periods?',
        a: 'Yes, through portability, provided you apply at renewal and within the notice window. Accrued waiting periods carry across, which is what makes switching viable at all once a policy has been running for some years.',
      },
    ],
    seo: {
      title: 'Health Insurance Plans in Pune & PCMC | PayYou Advisory',
      description:
        'Family and individual health cover in Pune. Room rent capping, co-payment, waiting periods and portability, the clauses that actually decide what a policy pays.',
      keywords: [
        'health insurance Pune',
        'family floater policy PCMC',
        'mediclaim Pimpri Chinchwad',
        'health insurance room rent limit',
      ],
    },
  },

  {
    slug: 'motor-insurance',
    parent: 'insurance',
    group: 'General',
    name: 'Motor Insurance',
    shortName: 'Motor',
    tagline: 'Third-party is the law; own damage is the point.',
    angle:
      'Third-party cover is compulsory and protects other people, not your vehicle, so a policy bought purely to satisfy the law leaves the owner carrying the entire cost of their own repair.',
    summary:
      'Cover for cars, two-wheelers and commercial vehicles, including third-party liability, own damage and the add-ons worth having.',
    intro: [
      'Motor insurance has two halves that serve different people. Third-party liability, which is compulsory under the Motor Vehicles Act, pays for injury or damage you cause to others. It pays nothing towards your own vehicle. Own damage cover, which is optional, is what pays to repair or replace your car or two-wheeler, and a comprehensive policy is simply the two combined.',
      'A few terms decide what a claim is actually worth. Insured declared value is the agreed figure the vehicle is covered for, and setting it low to reduce the premium reduces every claim including a total loss. Depreciation is deducted on replaced parts unless zero-depreciation cover is added, and on a newer vehicle that add-on usually repays itself in a single claim. No-claim bonus accumulates for every claim-free year and can be transferred when you change insurer or vehicle, so it should never be allowed to lapse. For commercial and goods-carrying vehicles, the permit and the goods carried both affect the cover and must be declared accurately.',
    ],
    points: [
      {
        title: 'Third-party protects others, not your vehicle',
        body: 'It is the legal minimum and pays nothing towards your own repair. Own damage cover is what protects the asset.',
      },
      {
        title: 'Zero depreciation usually pays for itself',
        body: 'Without it, depreciation is deducted on replaced parts. On a newer vehicle the add-on is typically recovered in one claim.',
      },
      {
        title: 'Do not understate the insured declared value',
        body: 'A lower IDV cuts the premium and cuts every claim, including a total loss. It is a false economy.',
      },
      {
        title: 'No-claim bonus is portable',
        body: 'It follows you to a new insurer or a new vehicle. Let it lapse and you lose years of accumulated discount.',
      },
    ],
    eligibility: [
      { criterion: 'Vehicle', detail: 'Private car, two-wheeler, commercial or goods-carrying vehicle' },
      { criterion: 'Registration', detail: 'Valid registration certificate in the proposer\'s name' },
      { criterion: 'Inspection', detail: 'Required where cover has lapsed or for a used vehicle' },
      { criterion: 'Permit', detail: 'For commercial vehicles, matching the declared use' },
    ],
    documents: [
      { label: 'Registration certificate', note: 'Of the vehicle to be insured' },
      { label: 'Previous policy', note: 'To carry forward no-claim bonus' },
      { label: 'Driving licence', note: 'Of the owner or regular driver' },
      { label: 'Permit and fitness', note: 'For commercial and goods-carrying vehicles' },
    ],
    faqs: [
      {
        q: 'Is third-party insurance enough?',
        a: 'Legally yes, practically no. It pays for damage you cause to others and nothing at all towards your own vehicle. If your car is damaged or stolen, a third-party-only policy leaves you carrying the whole cost.',
      },
      {
        q: 'Is zero depreciation worth the extra premium?',
        a: 'On a vehicle less than about five years old, usually yes. Without it, depreciation is deducted on every replaced part, and on a claim involving plastic or glass components that deduction is substantial. One claim generally recovers the add-on cost.',
      },
      {
        q: 'What happens to my no-claim bonus if I change insurer?',
        a: 'It transfers with you, and it also transfers to a new vehicle. The one thing that destroys it is letting the policy lapse beyond the permitted grace period, which resets years of accumulated discount to nothing.',
      },
    ],
    seo: {
      title: 'Car, Bike & Commercial Vehicle Insurance in Pune | PayYou',
      description:
        'Motor insurance in Pune and PCMC for cars, two-wheelers and commercial vehicles. IDV, zero depreciation, no-claim bonus transfer and what third-party really covers.',
      keywords: [
        'car insurance Pune',
        'two wheeler insurance PCMC',
        'commercial vehicle insurance Pimpri Chinchwad',
        'zero depreciation car insurance Pune',
      ],
    },
  },

  {
    slug: 'personal-accident-insurance',
    parent: 'insurance',
    group: 'Health',
    name: 'Personal Accident Insurance',
    shortName: 'Personal accident',
    tagline: 'Covers what health insurance and life cover both miss.',
    angle:
      'A permanent disability that ends your ability to earn is not a death claim and is not a hospital bill, so neither a term plan nor a mediclaim policy pays for it.',
    summary:
      'Cover for accidental death, permanent and temporary disability, and loss of income following an accident.',
    intro: [
      'There is a gap between the two policies most households hold. Life insurance pays if you die. Health insurance pays hospital bills. Neither addresses the situation where an accident leaves you alive, discharged, and unable to work again. The medical treatment is covered; the loss of every future rupee of income is not.',
      'Personal accident cover fills that gap. It pays a lump sum on accidental death, a graded proportion of the sum insured for permanent total or partial disability, and in many policies a weekly benefit during temporary disability while you cannot work. Premiums are low relative to the sum insured because the covered events are narrow, and cover is usually priced on occupation rather than on health, which makes it accessible to people whose medical history makes other cover expensive. For anyone who rides a two-wheeler daily, travels for work, or earns from physical work, it is among the most efficient protection available.',
    ],
    points: [
      {
        title: 'It covers the case both other policies miss',
        body: 'Surviving an accident with a permanent disability is neither a death claim nor a hospital bill. Only this pays for it.',
      },
      {
        title: 'Priced on occupation, not health',
        body: 'Underwriting looks at what you do rather than your medical history, so it remains affordable where other cover is not.',
      },
      {
        title: 'Disability is paid on a graded scale',
        body: 'The proportion of the sum insured depends on the injury. Read the table, because policies differ considerably on it.',
      },
      {
        title: 'A weekly benefit replaces income',
        body: 'Many policies pay a weekly amount during temporary disability, which is what keeps a household running while you recover.',
      },
    ],
    eligibility: [
      { criterion: 'Age at entry', detail: 'Commonly 18 – 70 years' },
      { criterion: 'Occupation', detail: 'Classified by risk; hazardous occupations cost more' },
      { criterion: 'Medical tests', detail: 'Usually not required' },
      { criterion: 'Sum insured', detail: 'Often linked to a multiple of annual income' },
    ],
    documents: [
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
      { label: 'Occupation details', note: 'Which determines the risk classification' },
      { label: 'Income proof', note: 'Where the sum insured is linked to earnings' },
      { label: 'Nomination details', note: 'Of the beneficiary' },
    ],
    faqs: [
      {
        q: 'I have life and health insurance. Do I need this too?',
        a: 'They cover different events. Life insurance pays if you die; health insurance pays the hospital. Neither pays anything if an accident leaves you alive but permanently unable to earn. That specific case is what this covers, and it is not a rare one.',
      },
      {
        q: 'Why is the premium so low?',
        a: 'Because the covered events are narrow: accidents only, not illness. That focus, combined with underwriting on occupation rather than medical history, makes the sum insured per rupee of premium unusually high.',
      },
      {
        q: 'Does it cover accidents on a two-wheeler?',
        a: 'Ordinarily yes, and for daily riders it is among the most sensible cover available. Some policies exclude specific activities such as racing or adventure sports, so the exclusions are worth reading if any of those apply to you.',
      },
    ],
    seo: {
      title: 'Personal Accident Insurance in Pune & PCMC | PayYou Advisory',
      description:
        'Accident cover for disability and loss of income in Pune. The gap between life and health insurance, graded disability payouts, and why premiums are low.',
      keywords: [
        'personal accident insurance Pune',
        'accident cover PCMC',
        'disability insurance Pimpri Chinchwad',
        'accidental death policy Pune',
      ],
    },
  },

  {
    slug: 'critical-illness-insurance',
    parent: 'insurance',
    group: 'Health',
    name: 'Critical Illness & Hospital Cash',
    shortName: 'Critical illness',
    tagline: 'Paid on diagnosis, spend it on anything.',
    angle:
      'A critical illness policy pays a lump sum on diagnosis rather than reimbursing bills, so it covers the costs a mediclaim policy never sees: lost income, travel, a carer, and the household running while you cannot work.',
    summary:
      'A lump sum on diagnosis of a listed serious illness, and a daily cash benefit during hospitalisation.',
    intro: [
      'Health insurance reimburses what the hospital charges. A serious illness costs a great deal more than that. Income stops or reduces for months. Someone in the family gives up work to provide care. There is travel, accommodation near a specialist centre, non-medical expenses, and a household that still has to run. None of it appears on a hospital bill, so none of it is reimbursed.',
      'A critical illness policy answers that differently. On diagnosis of a listed condition, and after any survival period the policy specifies, it pays the full sum insured as a lump sum. It does not matter what the treatment cost or whether health insurance also paid; the money is yours to use as you decide. The list of covered conditions and the definitions attached to them are what distinguish policies, and they are more precise than the marketing suggests. Hospital cash, often sold alongside, pays a fixed daily amount for each night in hospital and helps with the incidental costs no policy itemises.',
    ],
    points: [
      {
        title: 'A lump sum, not a reimbursement',
        body: 'It pays on diagnosis regardless of what treatment cost, and you decide what the money is for.',
      },
      {
        title: 'The definitions are strict',
        body: 'Covered conditions are defined precisely, often requiring specific severity or diagnostic criteria. Read that list rather than the brochure.',
      },
      {
        title: 'A survival period usually applies',
        body: 'Most policies require survival for a defined number of days after diagnosis before the benefit is paid.',
      },
      {
        title: 'It complements health insurance rather than replacing it',
        body: 'Mediclaim pays the hospital; this pays for everything the hospital does not bill. Both have a job.',
      },
    ],
    eligibility: [
      { criterion: 'Age at entry', detail: 'Commonly 18 – 65 years' },
      { criterion: 'Medical history', detail: 'Fully declared; pre-existing conditions usually excluded' },
      { criterion: 'Waiting period', detail: 'An initial period applies before any claim is admissible' },
      { criterion: 'Survival period', detail: 'Defined days of survival after diagnosis, per policy' },
    ],
    documents: [
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
      { label: 'Medical history', note: 'Full declaration, including family history where asked' },
      { label: 'Medical reports', note: 'Where the insurer requires screening' },
      { label: 'Income proof', note: 'Where the sum insured is linked to earnings' },
    ],
    faqs: [
      {
        q: 'I already have health insurance. Why add this?',
        a: 'Because health insurance pays the hospital and nothing else. A serious illness also stops your income, may stop a family member\'s, and brings travel, care and household costs that never appear on a bill. This pays a lump sum you can use for any of it.',
      },
      {
        q: 'What counts as a critical illness?',
        a: 'Only the conditions named in the policy, defined precisely, often with severity or diagnostic criteria attached. Policies differ considerably on both the list and the definitions, and that is the single most important thing to compare.',
      },
      {
        q: 'What is hospital cash?',
        a: 'A fixed amount paid for each night in hospital, independent of the bill and of any other policy. It is modest but it covers the incidental costs of an admission, and it is paid even where a mediclaim policy has settled everything else.',
      },
    ],
    seo: {
      title: 'Critical Illness & Hospital Cash Cover in Pune | PayYou Advisory',
      description:
        'Critical illness cover in Pune and PCMC. A lump sum on diagnosis for the costs mediclaim never sees, why definitions matter, and how hospital cash works.',
      keywords: [
        'critical illness insurance Pune',
        'hospital cash policy PCMC',
        'critical illness cover Pimpri Chinchwad',
        'cancer insurance Pune',
      ],
    },
  },

  {
    slug: 'travel-insurance',
    parent: 'insurance',
    group: 'General',
    name: 'Travel Insurance',
    shortName: 'Travel',
    tagline: 'Bought for the visa, valued for the medical cover.',
    angle:
      'Most people buy travel insurance because a visa demands it, and the clause that actually matters is emergency medical cover, since a hospital admission abroad can cost more than the trip several times over.',
    summary:
      'Cover for overseas and domestic travel: medical emergencies, trip cancellation, baggage and passport loss.',
    intro: [
      'Travel insurance is usually bought under compulsion. Schengen visas require a minimum medical cover, and many other countries expect it, so the policy is treated as a form to be filled. That framing hides where the value sits. Trip cancellation and lost baggage are annoyances measured in tens of thousands of rupees. An emergency hospital admission in Europe, North America or Singapore is measured in lakhs, and an air ambulance repatriation in considerably more.',
      'So the clauses to check are the medical ones. The emergency medical sum insured, whether it is enough for the destination, and what deductible applies before it pays. Whether pre-existing conditions are covered at all, which by default they frequently are not, and whether an emergency arising from one would be. Whether repatriation and evacuation are included. For students abroad and for older travellers the terms differ again, and both are worth arranging deliberately rather than accepting whatever the ticket portal offered at checkout.',
    ],
    points: [
      {
        title: 'Medical cover is the part that matters',
        body: 'A hospital admission abroad dwarfs every other covered loss. Check the sum insured against the destination, not against the premium.',
      },
      {
        title: 'Pre-existing conditions are usually excluded',
        body: 'Cover for an emergency arising from a known condition is often absent by default and sometimes available as an add-on. Ask explicitly.',
      },
      {
        title: 'Visa minimums are a floor, not a recommendation',
        body: 'Schengen and similar requirements set a minimum. For expensive healthcare destinations it is well below what is sensible.',
      },
      {
        title: 'Student and senior policies differ',
        body: 'Both have distinct terms, longer durations and different exclusions. Neither is well served by a standard leisure policy.',
      },
    ],
    eligibility: [
      { criterion: 'Traveller', detail: 'Individual, family or group; student and senior variants available' },
      { criterion: 'Age', detail: 'Cover available across ages; terms and premium change materially for seniors' },
      { criterion: 'Destination', detail: 'Premium and sum insured vary by region' },
      { criterion: 'Purchase', detail: 'Must be bought before departure' },
    ],
    documents: [
      { label: 'Passport', note: 'With visa details where applicable' },
      { label: 'Travel itinerary', note: 'Dates and destinations' },
      { label: 'Medical declaration', note: 'Of existing conditions' },
      { label: 'Student enrolment', note: 'For a student travel policy' },
    ],
    faqs: [
      {
        q: 'How much medical cover do I actually need?',
        a: 'More than the visa minimum for expensive healthcare destinations. Visa requirements set a floor, not a recommendation, and a serious admission in North America or Western Europe can exceed it several times over.',
      },
      {
        q: 'Are my existing health conditions covered?',
        a: 'By default usually not. Many policies exclude anything arising from a pre-existing condition, and some offer it as a paid add-on. If you have a known condition, ask the question specifically before buying rather than assuming.',
      },
      {
        q: 'Can I buy it after I have left?',
        a: 'No. Travel insurance must be arranged before departure. Some student policies allow adjustments after arrival, but the cover itself has to be in place before the journey begins.',
      },
    ],
    seo: {
      title: 'Travel Insurance for Overseas Trips from Pune | PayYou Advisory',
      description:
        'Travel cover from Pune for holidays, business and study abroad. Emergency medical sums insured, pre-existing condition exclusions and Schengen visa minimums.',
      keywords: [
        'travel insurance Pune',
        'overseas travel policy PCMC',
        'schengen visa insurance Pune',
        'student travel insurance Pimpri Chinchwad',
      ],
    },
  },

  // ── Vehicle & consumer ───────────────────────────────────────────────────
  {
    slug: 'two-wheeler-loan',
    parent: 'car-loan',
    group: 'Other vehicles',
    name: 'Two-Wheeler Loan',
    shortName: 'Two-wheeler',
    tagline: 'A small loan that builds a credit record.',
    angle:
      'Two-wheeler finance is one of the few products available to someone with no credit history at all, which makes it as useful for building a bureau record as for buying the vehicle.',
    summary:
      'Finance for a motorcycle or scooter, with a short tenure and a route in for first-time borrowers.',
    intro: [
      'A two-wheeler loan is a small, short, secured facility: the vehicle is hypothecated, tenures run from one to four years, and the amounts are modest. Because the exposure is limited and the security is straightforward, lenders take a broader view of the applicant than they would on a larger unsecured loan. Several will lend to someone with no credit history whatever, which is genuinely rare.',
      'That makes it quietly valuable beyond the purchase. A first borrower with no bureau file is invisible to most lenders, and being invisible is treated much like being risky. Twenty-four months of two-wheeler instalments paid on time creates a record, and that record is what makes the next application, for a personal loan or eventually a home loan, straightforward. Dealership finance is convenient and is rarely the cheapest option, so it is worth comparing before signing at the showroom, particularly on the processing fee and the insurance bundled into the deal.',
    ],
    points: [
      {
        title: 'Open to first-time borrowers',
        body: 'Several lenders will consider an applicant with no bureau history, which very few other products allow.',
      },
      {
        title: 'It builds the record for everything after',
        body: 'Two years of instalments paid on time creates the credit file that makes the next, larger application straightforward.',
      },
      {
        title: 'Compare before signing at the showroom',
        body: 'Dealer finance is convenient and often dearer. The processing fee and the bundled insurance are where the difference usually hides.',
      },
      {
        title: 'The vehicle is hypothecated',
        body: 'The hypothecation is noted on the registration certificate and removed only after the loan closes and you file for it.',
      },
    ],
    eligibility: [
      { criterion: 'Age', detail: '18 – 65 years with a valid driving licence' },
      { criterion: 'Income', detail: 'Salaried or self-employed; modest income levels accepted' },
      { criterion: 'Credit history', detail: 'Not always required; first-time borrowers considered' },
      { criterion: 'Margin', detail: 'A down payment is normally required against the on-road price' },
    ],
    documents: [
      { label: 'PAN and Aadhaar', note: 'Identity and address' },
      { label: 'Driving licence', note: 'Valid, for the vehicle class' },
      { label: 'Income proof', note: 'Salary slip or bank statements' },
      { label: 'Proforma invoice', note: 'From the dealer' },
    ],
    faqs: [
      {
        q: 'Can I get a two-wheeler loan with no credit history?',
        a: 'Often yes. It is one of the few products where lenders will consider an applicant with no bureau file at all, because the amount is small and the vehicle is security. It is a common and sensible way to start building a credit record.',
      },
      {
        q: 'Is dealer finance a good deal?',
        a: 'Convenient rather than cheap, usually. The rate may look competitive while the processing fee and a bundled insurance policy make up the difference. Ask for the total amount payable and compare that figure elsewhere before signing.',
      },
      {
        q: 'When is the hypothecation removed?',
        a: 'After the loan is closed and you apply to the RTO with the lender\'s no-objection certificate. It does not happen automatically, and an uncleared hypothecation on the registration certificate causes problems when you sell.',
      },
    ],
    seo: {
      title: 'Two-Wheeler Loan in Pune & PCMC | PayYou Advisory',
      description:
        'Bike and scooter finance in Pune and Pimpri-Chinchwad. Available to first-time borrowers, how it builds a credit record, and why dealer finance is rarely cheapest.',
      keywords: [
        'two wheeler loan Pune',
        'bike loan PCMC',
        'scooter finance Pimpri Chinchwad',
        'two wheeler loan without credit history Pune',
      ],
    },
  },

  {
    slug: 'used-car-loan',
    parent: 'car-loan',
    group: 'Other vehicles',
    name: 'Used Car Loan',
    shortName: 'Used car',
    tagline: 'The car\'s age decides the loan, not yours.',
    angle:
      'Lenders cap the vehicle\'s age at the end of the loan, not at its start, so an older car limits the tenure available and that constraint often matters more than the rate.',
    summary:
      'Finance for a pre-owned car, with valuation, vehicle age limits and title checks that a new car purchase does not involve.',
    intro: [
      'Used car finance is priced above new car finance and structured more tightly, because the security is harder to value and depreciates from a less predictable base. The lender arranges a valuation rather than accepting an invoice, and funds a proportion of the assessed value, which is frequently below the price agreed with the seller. That gap comes from your own funds and is the usual surprise in a used purchase.',
      'The constraint that catches most buyers is vehicle age. Lenders set a maximum age at loan maturity rather than at purchase, commonly around ten to twelve years. A car that is already eight years old therefore supports only a short tenure, which raises the monthly instalment regardless of how good the rate looks. Beyond that, the paperwork matters more than on a new car: verify that the registration certificate is clear of any existing hypothecation, that there are no outstanding challans, and that the transfer and the insurance are both properly assigned to you.',
    ],
    points: [
      {
        title: 'Vehicle age at maturity caps the tenure',
        body: 'Lenders limit how old the car may be when the loan ends. An older vehicle means a shorter tenure and a higher instalment.',
      },
      {
        title: 'Valuation, not invoice',
        body: 'The loan is a proportion of the lender\'s assessed value, which is often below the agreed price. The difference is yours to fund.',
      },
      {
        title: 'Check for an existing hypothecation',
        body: 'A seller\'s unclosed loan shows on the registration certificate. Buying before it is cleared creates a problem that is hard to unwind.',
      },
      {
        title: 'Transfer the insurance properly',
        body: 'The policy must be assigned to you, along with the no-claim bonus position. An unassigned policy can leave a claim unpayable.',
      },
    ],
    eligibility: [
      { criterion: 'Vehicle age', detail: 'Maximum age at loan maturity, commonly 10 – 12 years' },
      { criterion: 'Valuation', detail: 'Lender-appointed assessment of the vehicle' },
      { criterion: 'Title', detail: 'Registration certificate clear of existing hypothecation' },
      { criterion: 'Applicant', detail: 'Salaried or self-employed, 21 – 65 years' },
    ],
    documents: [
      { label: 'Registration certificate', note: 'Of the vehicle being purchased' },
      { label: 'Valuation report', note: 'Arranged by the lender' },
      { label: 'Seller documents', note: 'Identity, and NOC where a loan was running' },
      { label: 'Income proof', note: 'Salary slips or ITR' },
      { label: 'Insurance policy', note: 'To be transferred into your name' },
    ],
    faqs: [
      {
        q: 'Why is my tenure shorter than I wanted?',
        a: 'Because lenders limit the vehicle\'s age at the end of the loan, not at the start. If the car is already eight years old and the limit is twelve, only four years of tenure are available, which raises the instalment whatever the rate.',
      },
      {
        q: 'Why is the loan less than the price I agreed?',
        a: 'The lender funds a proportion of its own valuation rather than of the price you negotiated, and a used vehicle frequently values below what a private seller asks. The gap comes from your own funds, so establish the valuation before committing.',
      },
      {
        q: 'What should I check on the seller\'s paperwork?',
        a: 'That the registration certificate carries no unclosed hypothecation, that there are no outstanding challans, and that the insurance can be transferred to you properly. An existing lender\'s charge is the one that causes real trouble later.',
      },
    ],
    seo: {
      title: 'Used Car Loan in Pune & PCMC | PayYou Advisory',
      description:
        'Pre-owned car finance in Pune. How vehicle age caps your tenure, why the valuation is below the asking price, and the paperwork to check before you buy.',
      keywords: [
        'used car loan Pune',
        'second hand car finance PCMC',
        'pre owned car loan Pimpri Chinchwad',
        'used car loan interest rate Pune',
      ],
    },
  },

  {
    slug: 'consumer-durable-loan',
    parent: 'car-loan',
    group: 'Other vehicles',
    name: 'Consumer Durable & No-Cost EMI',
    shortName: 'Consumer durable',
    tagline: '"No cost" usually has one.',
    angle:
      'A no-cost EMI is generally a discount you were entitled to anyway, withheld and applied against the interest, so the honest comparison is the EMI total against the best cash price you could negotiate.',
    summary:
      'Point-of-sale finance for appliances, electronics and furniture, and how to read a no-cost EMI offer.',
    intro: [
      'Consumer durable finance is arranged at the counter: a short loan, typically three to twenty-four months, for a phone, a refrigerator, a television or furniture. Approval is quick, frequently instant against a pre-approved limit or a card, and the goods themselves are the implicit security. For a genuine requirement it is a reasonable way to spread a cost.',
      'The thing to understand is the no-cost EMI. Interest does not vanish because a poster says so; it is generally funded by a discount the manufacturer or retailer would otherwise have offered on the cash price, redirected to cover it. So the real comparison is not between an EMI with interest and one without. It is between the total you will pay under the EMI scheme and the lowest cash price you could negotiate on the same item today. Sometimes the EMI still wins. Often the cash discount is larger. And processing fees, which many schemes charge separately, sit outside the "no cost" claim entirely.',
    ],
    points: [
      {
        title: 'The discount pays the interest',
        body: 'No-cost schemes are usually funded by a cash discount withheld from you. Compare the EMI total against the best negotiated cash price.',
      },
      {
        title: 'Processing fees sit outside the claim',
        body: 'Many schemes charge a fee that is not part of the "no cost" arithmetic. Ask for the total amount payable.',
      },
      {
        title: 'It appears on your credit report',
        body: 'These are real loans reported to the bureaus. Missed instalments damage your record exactly as any other default would.',
      },
      {
        title: 'Short tenures suit short-lived goods',
        body: 'Financing a phone over twenty-four months means paying for it long after you have replaced it. Match the tenure to the use.',
      },
    ],
    eligibility: [
      { criterion: 'Applicant', detail: 'Salaried or self-employed, 21 – 60 years' },
      { criterion: 'Credit record', detail: 'Assessed; pre-approved limits reach instant approval' },
      { criterion: 'Down payment', detail: 'Often required, varying by scheme and item' },
      { criterion: 'Tenure', detail: 'Commonly 3 – 24 months' },
    ],
    documents: [
      { label: 'PAN and Aadhaar', note: 'For e-KYC at the counter' },
      { label: 'Bank statements', note: 'Last 3 months, often fetched digitally' },
      { label: 'Salary slip', note: 'Where required by the scheme' },
    ],
    faqs: [
      {
        q: 'Is no-cost EMI genuinely free?',
        a: 'Rarely. The interest is usually covered by a discount the retailer or manufacturer would otherwise have given you on the cash price. Ask what the item costs paying cash today, then compare that against the EMI total including any processing fee.',
      },
      {
        q: 'Does it affect my credit score?',
        a: 'Yes. These are reported to the credit bureaus like any other loan. Paid on time they help build a record; missed, they damage it exactly as a larger default would, which people often do not expect from a small purchase.',
      },
      {
        q: 'What tenure should I take?',
        a: 'No longer than you will realistically use the item. A phone financed over two years is often replaced before the last instalment, which is a poor trade. Short tenures also keep the total cost visible.',
      },
    ],
    seo: {
      title: 'Consumer Durable Loan & No-Cost EMI in Pune | PayYou Advisory',
      description:
        'Point-of-sale finance for appliances and electronics in Pune. How no-cost EMI is actually funded, the fees outside the claim, and the effect on your credit report.',
      keywords: [
        'consumer durable loan Pune',
        'no cost EMI PCMC',
        'appliance finance Pimpri Chinchwad',
        'mobile phone EMI Pune',
      ],
    },
  },

  // ── Education ────────────────────────────────────────────────────────────
  {
    slug: 'domestic-education-loan',
    parent: 'education-loan',
    group: 'Where you study',
    name: 'Education Loan for Study in India',
    shortName: 'Study in India',
    tagline: 'The institution matters as much as the income.',
    angle:
      'Lenders maintain tiered lists of Indian institutions, and a seat at a highly ranked one can secure a larger loan without collateral than a family\'s income alone would support.',
    summary:
      'Funding undergraduate, postgraduate and professional study at Indian institutions.',
    intro: [
      'For study within India, the institution is close to being the credit decision. Lenders classify colleges into tiers, and the tier determines how much can be borrowed, whether collateral is required, and how finely the loan is priced. A seat at a premier institution can support a substantial unsecured facility on the strength of expected employability alone; the same family applying for a course at an unlisted college may face a smaller loan, a collateral requirement, or a decline.',
      'That is worth knowing before results, not after. If a student holds offers from institutions in different tiers, the financing consequence is a legitimate part of the comparison. Beyond the institution, the practical points are consistent: the loan covers examination and library fees, books and equipment as well as tuition, disbursal goes semester by semester to the college, and the Section 80E interest deduction applies for up to eight years. Public sector banks generally run these schemes more actively than private lenders, and their processing takes longer, so files should start early.',
    ],
    points: [
      {
        title: 'Institution tier drives the sanction',
        body: 'Lenders classify colleges, and the tier decides the amount, the collateral requirement and the rate before income is considered.',
      },
      {
        title: 'More than tuition is covered',
        body: 'Examination and library fees, books, equipment and, in many cases, hostel charges fall within the loan.',
      },
      {
        title: 'Public sector banks are more active here',
        body: 'They run the schemes more widely and price them more finely. They are also slower, so start the file well before the fee deadline.',
      },
      {
        title: 'Section 80E applies with no ceiling',
        body: 'The full interest paid is deductible for up to eight years from when repayment begins.',
      },
    ],
    eligibility: [
      { criterion: 'Admission', detail: 'Confirmed seat at a recognised Indian institution' },
      { criterion: 'Course', detail: 'On the lender\'s approved list; professional and technical courses favoured' },
      { criterion: 'Co-applicant', detail: 'Parent or guardian, with income assessed' },
      { criterion: 'Collateral', detail: 'Usually not required below a threshold amount' },
      { criterion: 'Academic record', detail: 'Considered, particularly for larger sanctions' },
    ],
    documents: [
      { label: 'Admission letter', note: 'Confirmed offer from the institution' },
      { label: 'Fee structure', note: 'Official schedule for the full course' },
      { label: 'Mark sheets', note: 'Of the qualifying examination' },
      { label: 'Co-applicant income proof', note: 'Salary slips and Form 16, or ITR' },
      { label: 'Entrance test result', note: 'Where admission was through one' },
    ],
    faqs: [
      {
        q: 'Does it matter which college I get into?',
        a: 'A great deal. Lenders tier institutions, and the tier decides how much can be borrowed, whether collateral is needed and how the loan is priced. If you hold offers from colleges in different tiers, the financing difference is a legitimate part of the comparison.',
      },
      {
        q: 'Will I need to pledge property?',
        a: 'Usually not below a threshold amount, which varies by lender. Above it, security is normally required. For a premier institution, the unsecured limit is often higher, which is another way the college affects the outcome.',
      },
      {
        q: 'Which lender should I approach?',
        a: 'Public sector banks generally run education schemes more widely and price them better, and they take longer to process. Starting early matters more here than on almost any other product, because fee deadlines do not move.',
      },
    ],
    seo: {
      title: 'Education Loan for Study in India from Pune | PayYou Advisory',
      description:
        'Education loans for Indian colleges from Pune and PCMC. How institution tiers decide your sanction, what the loan covers beyond tuition, and Section 80E relief.',
      keywords: [
        'education loan for India Pune',
        'college loan PCMC',
        'engineering education loan Pimpri Chinchwad',
        'MBA loan Pune',
      ],
    },
  },

  {
    slug: 'study-abroad-loan',
    parent: 'education-loan',
    group: 'Where you study',
    name: 'Study Abroad Education Loan',
    shortName: 'Study abroad',
    tagline: 'The sanction letter is part of the visa file.',
    angle:
      'Several countries require documented proof of funds for the visa, so the loan sanction has to exist before the visa application rather than after the offer, which inverts the usual order of events.',
    summary:
      'Funding overseas postgraduate and undergraduate study, including living costs, travel and the proof of funds a visa requires.',
    intro: [
      'An overseas education loan has to cover more than fees, and it has to arrive earlier than people expect. The sanction typically funds tuition, living expenses, travel, health insurance, equipment and, where applicable, the deposit a university requires to confirm a place. Sizing it means building a realistic total cost of attendance rather than looking only at the fee schedule.',
      'The timing matters as much as the amount. Student visas for several destinations require documented evidence that the full cost can be met, and a sanctioned education loan is one of the accepted forms. That means the loan process should run alongside the admission process rather than after it, because a visa appointment cannot wait for a sanction. Currency is the other consideration people underestimate: the loan is in rupees while the costs are not, so a movement in the exchange rate over a two-year course changes what the money actually buys. Building a margin into the sanction is more sensible than seeking an enhancement halfway through.',
    ],
    points: [
      {
        title: 'The sanction is often needed for the visa',
        body: 'Proof of funds is a visa requirement in several countries, so the loan has to be in place before the appointment, not after arrival.',
      },
      {
        title: 'Budget the full cost of attendance',
        body: 'Tuition, living costs, travel, insurance and deposits. A sanction sized on fees alone runs out in the first year.',
      },
      {
        title: 'Exchange rate movement is a real risk',
        body: 'A rupee loan funding foreign currency costs buys less if the rupee weakens. Build a margin rather than seeking a top-up mid-course.',
      },
      {
        title: 'Collateral is common at these amounts',
        body: 'Overseas sanctions usually exceed the unsecured threshold, so property or a deposit is normally required as security.',
      },
    ],
    eligibility: [
      { criterion: 'Admission', detail: 'Confirmed or conditional offer from a recognised overseas institution' },
      { criterion: 'Course', detail: 'On the lender\'s approved list; postgraduate courses favoured' },
      { criterion: 'Co-applicant', detail: 'Resident parent or guardian, with income assessed' },
      { criterion: 'Collateral', detail: 'Usually required, given the amounts involved' },
      { criterion: 'Test scores', detail: 'Language and entrance test results as applicable' },
    ],
    documents: [
      { label: 'Offer letter', note: 'From the overseas institution' },
      { label: 'Cost of attendance', note: 'Official statement covering fees and living costs' },
      { label: 'Test scores', note: 'IELTS, TOEFL, GRE or GMAT as applicable' },
      { label: 'Collateral documents', note: 'Title papers for the property offered' },
      { label: 'Co-applicant income proof', note: 'Salary slips and Form 16, or ITR' },
    ],
    faqs: [
      {
        q: 'When should I start the loan process?',
        a: 'Alongside your applications, not after the offer. Several countries require documented proof of funds for the student visa, and a sanctioned loan is one accepted form. A visa appointment will not wait for a sanction to come through.',
      },
      {
        q: 'What if the exchange rate moves against me?',
        a: 'The loan is in rupees and the costs are not, so a weakening rupee reduces what the sanction buys. Building a margin into the amount at the outset is far easier than seeking an enhancement halfway through a course.',
      },
      {
        q: 'Do I need to pledge property?',
        a: 'Usually, because overseas sanctions generally exceed the threshold below which lenders lend unsecured. Property or a deposit is the common security, and arranging the valuation early prevents it becoming the delay.',
      },
    ],
    seo: {
      title: 'Study Abroad Education Loan from Pune | PayYou Advisory',
      description:
        'Overseas education loans from Pune and PCMC. Proof of funds for the visa, budgeting the full cost of attendance, exchange rate risk and collateral requirements.',
      keywords: [
        'study abroad loan Pune',
        'overseas education loan PCMC',
        'foreign education loan Pimpri Chinchwad',
        'education loan for USA UK Pune',
      ],
    },
  },
]
