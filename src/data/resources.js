/**
 * Guides — the "Tools & Resources" group in the client's page specification.
 *
 * ── One thing deliberately not built ───────────────────────────────────────
 * The specification asks for an "Interest Rate Comparison (all lenders, all
 * products)" table. Publishing that would mean stating roughly two hundred
 * live rate figures across twenty-five lenders, none of which PayYou has
 * published and all of which change without notice. Inventing them would break
 * the rule this whole codebase is built on, and a stale rate table on a lending
 * site is worse than none: a borrower who phones a bank and finds the number
 * wrong stops trusting everything else on the page.
 *
 * So `/interest-rate-comparison/` teaches a reader to read an offer instead —
 * which is the durable version of the same page — and CLIENT-ACTIONS.md records
 * what the client must supply, and who must own updating it, before a live
 * table can ship.
 */

export const RESOURCES = [
  {
    slug: 'credit-score',
    name: 'Credit Score: Read It, Then Improve It',
    shortName: 'Credit Score Guide',
    tagline: 'The number is a summary, not a verdict.',
    summary:
      'What a CIBIL score is built from, what actually moves it, how long each repair takes, and what to do about an error on your report.',
    intro: [
      'A credit score compresses years of borrowing behaviour into three digits, and lenders use it as a first filter rather than as the decision. Understanding what feeds it is more useful than knowing the number, because the components respond to different actions over very different timescales.',
      'Four things carry most of the weight. Repayment history is the largest: every instalment paid on time builds it and a single default damages it for years. Credit utilisation, meaning how much of your available card limits you are actually using, is the second and the one that responds fastest. The age of your accounts matters, which is why closing an old card can hurt. And the mix of secured and unsecured borrowing, along with how many recent applications you have made, fills in the rest.',
    ],
    sections: [
      {
        title: 'What moves it, and how quickly',
        items: [
          {
            title: 'Utilisation, within one or two cycles',
            body: 'Paying card balances down below roughly a third of the limit is the fastest legitimate improvement available. It reflects in the next reporting cycle, not in a year.',
          },
          {
            title: 'Repayment history, over years',
            body: 'Every on-time instalment helps and a default stays on the report for years. There is no shortcut here, only consistency.',
          },
          {
            title: 'Account age, by leaving things alone',
            body: 'Closing your oldest card shortens your credit history and can lower the score. Keeping it open and unused is usually better than closing it.',
          },
          {
            title: 'Enquiries, by not applying everywhere',
            body: 'Each application is a hard enquiry. Several in a short window reads as distress and lowers the score at exactly the wrong moment.',
          },
        ],
      },
      {
        title: 'If the report has an error',
        items: [
          {
            title: 'Check the report itself, not just the score',
            body: 'You are entitled to a free full credit report from each bureau annually. Errors are common: a closed loan still showing open, someone else\'s account, a settled amount recorded as written off.',
          },
          {
            title: 'Raise the dispute with the bureau',
            body: 'Bureaus have a defined process and a timeline to investigate with the lender that reported the entry. Do this before applying anywhere, not during.',
          },
          {
            title: 'Get a no-dues letter when you close a loan',
            body: 'Ask for it at closure and keep it. It is the document that resolves a dispute quickly if the account is still reported as running.',
          },
          {
            title: '"Settled" is not the same as "closed"',
            body: 'A settlement, where a lender accepts less than the full amount, is recorded and damages the report for years. Paying in full and closing properly is materially better.',
          },
        ],
      },
      {
        title: 'If your score is already low',
        items: [
          {
            title: 'Secured borrowing still works',
            body: 'A gold loan or a loan against a fixed deposit is largely indifferent to your score, because the security carries the loan. Both are far cheaper than a high-rate unsecured offer.',
          },
          {
            title: 'A small, repaid loan rebuilds a record',
            body: 'A two-wheeler loan or a secured credit card, serviced on time for a year or two, creates the history that makes the next application straightforward.',
          },
          {
            title: 'Stop applying while it is low',
            body: 'A run of declines adds enquiries and makes the next lender more cautious. Repair first, apply once.',
          },
          {
            title: 'Talk to us before you apply',
            body: 'We can tell you which lenders will consider your file as it stands, which is usually better than finding out through four rejections.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What score do I need for a loan?',
        a: 'It varies by product and lender. Broadly, 750 and above generally reaches the best pricing, 650 to 750 is workable on a narrower panel, and below 650 the unsecured options thin out considerably while secured ones remain open.',
      },
      {
        q: 'How fast can I improve my score?',
        a: 'Utilisation responds within one or two reporting cycles, so paying card balances down is the quickest legitimate improvement. Repayment history takes years. Anyone offering to fix a score quickly is describing something that does not exist.',
      },
      {
        q: 'Does checking my own score lower it?',
        a: 'No. Checking your own report is a soft enquiry and has no effect. Only applications for credit create hard enquiries, and it is those that matter when several appear in a short period.',
      },
      {
        q: 'I settled a loan years ago. Is that still a problem?',
        a: 'It can be. A settlement is recorded distinctly from a closure and stays on the report for years, and many lenders treat it as seriously as a default. Where possible, paying the balance in full and obtaining a no-dues letter is a much better outcome.',
      },
    ],
    seo: {
      title: 'CIBIL Credit Score Guide: Read It & Improve It | PayYou Advisory',
      description:
        'What a credit score is built from, what moves it and how fast, how to dispute an error on your report, and what to do if your score is already low.',
      keywords: [
        'CIBIL score improve',
        'credit score guide India',
        'low CIBIL score loan Pune',
        'credit report dispute India',
        'check credit score Pune',
      ],
    },
  },

  {
    slug: 'documents-required',
    name: 'Documents Required, by Loan Type',
    shortName: 'Documents Required',
    tagline: 'Most delays are a missing paper, not a credit decision.',
    summary:
      'What to keep ready for each kind of loan, what the common substitutes are, and the documents that hold files up most often.',
    intro: [
      'Files rarely stall because a lender is deciding. They stall because a document is missing, out of date, or does not match another one. Getting the set together before an application is submitted is the single most effective thing an applicant can do to shorten the process, and it costs nothing.',
      'The core set is the same everywhere: identity, address, income and banking. What changes between products is what proves income and what secures the loan. Below is what each kind of file actually needs, and what most often goes wrong with it.',
    ],
    sections: [
      {
        title: 'Everyone, every product',
        items: [
          {
            title: 'PAN card',
            body: 'Mandatory for every applicant and co-applicant. The name must match your other documents exactly; a mismatch is one of the commonest causes of a delay.',
          },
          {
            title: 'Aadhaar',
            body: 'Identity and address. It should be linked to a working mobile number, because most digital verification steps send a one-time password to it.',
          },
          {
            title: 'Bank statements',
            body: 'Usually three to six months for a salaried file and six to twelve for a business one. Provide the statement of the account the income actually reaches.',
          },
          {
            title: 'Photographs',
            body: 'Recent passport-sized photographs for each applicant. Trivial, and it holds up more files than it should.',
          },
        ],
      },
      {
        title: 'Proving income',
        items: [
          {
            title: 'Salaried',
            body: 'Three months of salary slips and Form 16 or an appointment letter where job vintage needs proving.',
          },
            {
            title: 'Self-employed',
            body: 'Two years of income tax returns with the computation of income, plus audited financials where the turnover requires an audit.',
          },
          {
            title: 'Paid in cash',
            body: 'Six to twelve months of bank statements, and where a business exists, GST returns or a shop licence. Some lenders assess this properly; many do not.',
          },
          {
            title: 'Professional practice',
            body: 'Degree certificate and council registration or certificate of practice, which on a professional programme can replace part of the usual income set.',
          },
        ],
      },
      {
        title: 'Where property is involved',
        items: [
          {
            title: 'Title documents',
            body: 'Sale deed and the full chain of ownership. A break anywhere in that chain is the single most common reason a secured file takes weeks longer than expected.',
          },
          {
            title: 'Approved plan and occupancy certificate',
            body: 'Sanctioned plan from the planning authority, and the occupancy certificate where the building is complete.',
          },
          {
            title: 'Property tax receipt',
            body: 'The latest one, showing no arrears. Outstanding dues stop a disbursal.',
          },
          {
            title: 'Society documents',
            body: 'Share certificate and a no-objection certificate where the property sits in a housing society.',
          },
        ],
      },
      {
        title: 'What most often goes wrong',
        items: [
          {
            title: 'Names that do not match',
            body: 'An initial on the PAN and a full name on the Aadhaar, or a married name on one and a maiden name on another. Fix this before applying.',
          },
          {
            title: 'Statements that are too short',
            body: 'A statement covering five months when six are required means the whole set has to be reissued. Ask what period is needed before downloading.',
          },
          {
            title: 'An old loan still showing open',
            body: 'A closed account still reported as running inflates your obligations and can fail the ratio test. Obtain the no-dues letter and raise it with the bureau.',
          },
          {
            title: 'Unsigned or unstamped copies',
            body: 'Self-attestation is required on most copies, and lenders return unsigned sets. It is a five-minute job that regularly costs a week.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I apply without income tax returns?',
        a: 'For some products, yes. Banking-surrogate and GST-based programmes assess turnover from statements or filings rather than returns, and gold and deposit-backed loans barely look at income at all. The panel is narrower and the pricing higher.',
      },
      {
        q: 'How recent do my bank statements have to be?',
        a: 'Generally up to the previous month, and the required period varies from three months for a straightforward salaried file to twelve for a business one. Ask before downloading, because a set that is one month short has to be redone entirely.',
      },
      {
        q: 'My PAN and Aadhaar names do not match. Is that a problem?',
        a: 'Yes, and it is worth fixing before you apply rather than during. A mismatch stops digital verification and requires manual reconciliation, which adds days to a file for no good reason.',
      },
      {
        q: 'Do you need original documents?',
        a: 'For unsecured lending, self-attested copies are normally enough with originals shown for verification. For anything secured on property, the original title documents are deposited with the lender until the loan is closed.',
      },
    ],
    seo: {
      title: 'Documents Required for a Loan in Pune, by Type | PayYou Advisory',
      description:
        'A checklist of documents for personal, business, home and property loans in Pune. Income proof substitutes, property papers, and the mistakes that delay files.',
      keywords: [
        'documents required for loan Pune',
        'home loan documents list India',
        'business loan documents PCMC',
        'loan document checklist Pimpri Chinchwad',
      ],
    },
  },

  {
    slug: 'interest-rate-comparison',
    name: 'How to Compare Interest Rates',
    shortName: 'Comparing Rates',
    tagline: 'The rate is not the cost.',
    summary:
      'Why the advertised rate tells you very little, what to ask for instead, and the four things that make two offers at the same rate cost different amounts.',
    intro: [
      'Every lender advertises a rate "starting from" some figure, and almost nobody gets it. That number is the best case for the strongest possible profile, and it exists to win a comparison table rather than to describe what you will pay. Comparing two offers on their advertised rates is close to meaningless.',
      'What makes a real comparison possible is the annual percentage rate, which folds the processing fee and other mandatory charges into a single figure, and the total amount payable over the loan. Ask for both in writing. A lender quoting a lower rate with a larger fee frequently costs more than one quoting slightly higher with none, and on a short tenure the fee can outweigh the interest entirely.',
    ],
    sections: [
      {
        title: 'Four things that change the real cost',
        items: [
          {
            title: 'How the interest is calculated',
            body: 'A flat rate charges interest on the whole original amount for the entire tenure. A reducing-balance rate charges only on what is outstanding. The same number means roughly twice the cost on a flat basis.',
          },
          {
            title: 'Fees and charges',
            body: 'Processing fee, documentation, valuation, legal and stamp duty. On a short or small loan these routinely exceed the difference between two interest rates.',
          },
          {
            title: 'Fixed or floating',
            body: 'A floating rate moves with the lender\'s benchmark. A fixed rate does not. Neither is better in the abstract, and comparing one against the other on rate alone tells you nothing.',
          },
          {
            title: 'Prepayment terms',
            body: 'Floating-rate home loans to individuals cannot carry a foreclosure charge. Almost everything else can. If you expect to prepay, that clause can be worth more than the rate.',
          },
        ],
      },
      {
        title: 'What to ask every lender for',
        items: [
          {
            title: 'The annual percentage rate',
            body: 'Interest plus mandatory charges, expressed as one annual figure. It is the only number that compares cleanly across offers.',
          },
          {
            title: 'The total amount payable',
            body: 'What you will have paid by the end. It makes a long tenure\'s true cost visible in a way a monthly instalment never does.',
          },
          {
            title: 'The full schedule of charges',
            body: 'In writing, including what is charged on prepayment, on a bounced instalment and on a statement request.',
          },
          {
            title: 'The sanction letter, before you sign',
            body: 'Read it rather than the brochure. Everything that binds either party is in that document and nowhere else.',
          },
        ],
      },
      {
        title: 'Why we do not publish a live rate table',
        items: [
          {
            title: 'Rates change without notice',
            body: 'A table published today is wrong within weeks. A borrower who phones a bank and finds our figure stale has good reason to distrust everything else on this site.',
          },
          {
            title: 'The advertised rate is not your rate',
            body: 'Pricing is set on your profile, your employer or business, your bureau score and the tenure. A single published number cannot describe that.',
          },
          {
            title: 'We will tell you the current position',
            body: 'Call and we will tell you where the panel actually stands for a profile like yours today, which is more useful than a table and more honest than one.',
          },
          {
            title: 'And we will show you the arithmetic',
            body: 'Our EMI and balance transfer calculators run in your browser and take whatever figures you have been quoted. Nothing you type reaches us.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does the rate I am offered differ from the advertised one?',
        a: 'Because the advertised figure is the best case for the strongest profile. Your bureau score, income, employer or business, existing obligations and chosen tenure all move the price. It is the reason we shortlist lenders before applying rather than after.',
      },
      {
        q: 'What is the difference between flat and reducing rate?',
        a: 'A flat rate charges interest on the full original amount for the whole tenure. A reducing-balance rate charges only on what is still outstanding. A loan quoted at nine per cent flat costs roughly what a sixteen per cent reducing loan does, which is why the basis must always be established.',
      },
      {
        q: 'Should I always take the lowest rate?',
        a: 'Not necessarily. A lower rate with a large processing fee can cost more overall, particularly on a short tenure, and a cheaper facility with a punitive prepayment clause can be worse if you intend to close early. Compare the annual percentage rate and the total payable.',
      },
      {
        q: 'Do you publish a comparison of all lenders\' rates?',
        a: 'No, deliberately. Rates change without notice and are set on individual profiles, so any table we published would be both stale and wrong for most readers. Call us and we will tell you where the panel stands for a profile like yours today.',
      },
    ],
    seo: {
      title: 'How to Compare Loan Interest Rates in India | PayYou Advisory',
      description:
        'Why an advertised rate tells you little. Flat versus reducing balance, processing fees, prepayment clauses, and the two figures to ask every lender for in writing.',
      keywords: [
        'compare loan interest rates India',
        'flat vs reducing interest rate',
        'APR loan India',
        'lowest interest rate loan Pune',
        'loan processing fee comparison',
      ],
    },
  },
]

export const RESOURCE_BY_SLUG = Object.fromEntries(RESOURCES.map((r) => [r.slug, r]))
