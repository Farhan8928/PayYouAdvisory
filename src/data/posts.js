/**
 * Blog posts.
 *
 * ── Why these exist and what they are for ──────────────────────────────────
 * A DSA's blog is usually filler: "5 Tips for a Personal Loan", written for a
 * keyword and read by nobody. The posts below are the opposite bet. Each one
 * answers a question a borrower in Pune actually asks out loud, at a length
 * that finishes the answer, and each says at least one thing that is against
 * PayYou's immediate commercial interest. That is what makes it worth reading,
 * and in a YMYL category it is also what Google's raters are looking for.
 *
 * ── The rule on numbers is unchanged ───────────────────────────────────────
 * No rate, fee or figure appears here unless it is traceable to something the
 * client has published, is a matter of published regulation, or is arithmetic
 * the reader can verify. `updated` is an ISO date and is rendered as the
 * `dateModified` in the article schema; keep it honest, because a stale post
 * wearing a fresh date is worse than an old one.
 */

export const POSTS = [
  {
    slug: 'why-your-loan-application-was-rejected',
    title: 'Why your loan application was rejected, and what to do next',
    standfirst:
      'Rejections rarely come with a reason. Here are the ones that actually account for most of them, in the order we see them, and what each one takes to fix.',
    published: '2026-08-18',
    updated: '2026-08-18',
    readingMinutes: 7,
    topic: 'Applying',
    photo: 'review-documents',
    body: [
      {
        heading: 'The lender will not tell you, but the reason is usually one of five things',
        paragraphs: [
          'A declined application in India almost never comes with an explanation. The message says the file did not meet internal criteria and stops there, which leaves the applicant to guess, and most people guess wrong. They assume their income was too low when in practice the income was fine and something else failed.',
          'Across the files we place, the reasons cluster tightly. In rough order of frequency: too many existing obligations, a recent run of applications, an error or an old account on the credit report, income that cannot be evidenced in the form the lender wanted, and a mismatch between documents. Only one of those is genuinely about how much you earn.',
        ],
      },
      {
        heading: 'Obligations, not income, is the usual culprit',
        paragraphs: [
          'Lenders cap total monthly instalments at a proportion of net income, commonly somewhere around half to sixty per cent. Everything counts: the car loan, the consumer durable EMI on the television, the minimum due on two credit cards, a loan you guaranteed for a relative. Add them up and many applicants are already at the ceiling before the new loan is considered.',
          'The fix is arithmetic rather than persuasion. Closing one small, nearly finished loan can free enough room to clear the ratio, and it often costs very little to do. Where a card balance is the problem, paying it down before applying changes both the obligation and the credit score in the same move.',
        ],
      },
      {
        heading: 'Applying everywhere is what turns one rejection into five',
        paragraphs: [
          'Each application creates a hard enquiry on your credit report. One is unremarkable. Four in a month reads, to the next lender, as somebody being turned down repeatedly and now trying anywhere, and it lowers the score at the same time. This is the single most avoidable mistake in the whole process, and it is the one most people make immediately after a first decline.',
          'If you have been declined, the useful next step is to stop, obtain your credit report, and find out what actually happened. Applying again the same week makes the second answer more likely to be no than the first.',
        ],
      },
      {
        heading: 'Check the report before you believe the rejection',
        paragraphs: [
          'You are entitled to a free full credit report from each bureau every year, and errors on them are common rather than rare. A loan closed three years ago still showing as running. An account that belongs to somebody with a similar name. A settlement recorded where a full payment was made. Any of those will fail a file, and none of them is your borrowing behaviour.',
          'Disputes have a defined process and a timeline, and they are worth raising before the next application rather than during it. Where you closed a loan, ask for the no-dues letter at the time; it is the document that resolves this quickly.',
        ],
      },
      {
        heading: 'What we would say if you called us instead',
        paragraphs: [
          'The reason this is worth writing down is that most of it is diagnosis, and diagnosis is the part a borrower cannot easily do alone. We can read a credit report, work out which of the five it was, and tell you whether the file is placeable somewhere else today or whether it needs three months of repair first.',
          'Occasionally the honest answer is the second one, and that means telling somebody there is nothing worth applying for right now. It is a strange thing for a broker to say and it is usually correct, because the alternative is four more enquiries and a worse position in the spring.',
        ],
      },
    ],
    seo: {
      title: 'Why Your Loan Application Was Rejected | PayYou Advisory',
      description:
        'The five reasons that account for most loan rejections in India, why obligations matter more than income, and what to do before you apply again.',
      keywords: [
        'loan application rejected reasons',
        'why loan rejected India',
        'loan rejected low CIBIL Pune',
        'reapply after loan rejection',
      ],
    },
  },

  {
    slug: 'what-a-dsa-actually-does',
    title: 'What a loan DSA actually does, and how we get paid',
    standfirst:
      'A Direct Selling Agent sits between you and twenty-five lenders. Here is what that means in practice, who pays for it, and where the conflict of interest genuinely sits.',
    published: '2026-08-12',
    updated: '2026-08-12',
    readingMinutes: 6,
    topic: 'How we work',
    photo: 'meeting-india',
    body: [
      {
        heading: 'We are not a lender, and that distinction matters',
        paragraphs: [
          'PayYou Advisory is a Direct Selling Agent. We do not lend money, we do not hold deposits, and we do not make the credit decision. What we do is assess a file, work out which of our partner banks and finance companies are likely to approve it on the best terms, and manage the application through to disbursal.',
          'That sounds like a small thing until you watch what happens without it. Lenders differ enormously on the same file: one declines a cash-salaried applicant outright and another underwrites the same person from six months of bank statements. Knowing which is which before you apply, rather than after four rejections, is most of the job.',
        ],
      },
      {
        heading: 'One credit enquiry instead of twenty-five',
        paragraphs: [
          'The practical benefit is easiest to see on the credit report. If you apply to eight lenders yourself, you collect eight hard enquiries, and by the fourth your score has fallen far enough to make the remaining four harder. The applications damage each other.',
          'Shortlisting first means submitting to the lender most likely to say yes, at the terms most likely to be good. It is the same reason you would not send the same job application to every company in a city and hope.',
        ],
      },
      {
        heading: 'The lender pays us, and you should know what that implies',
        paragraphs: [
          'Our commission comes from the lender on a successfully disbursed loan, not from the borrower. There is no fee to you for the advice, the comparison or the paperwork. That model is standard across the industry and it is worth understanding rather than glossing over, because it creates an obvious question: does the broker send you to whoever pays the most?',
          'It is a fair question and the honest answer is that the incentive exists. What protects you against it is that our commission only arrives if the loan is actually disbursed, so recommending a lender who will decline you earns nothing. And in a business that lives on referrals in a city this size, placing somebody badly is expensive in a way that outlasts a single commission.',
        ],
      },
      {
        heading: 'What you should ask any broker, including us',
        paragraphs: [
          'Ask whether there is any fee payable by you, and get the answer in writing. Ask which lenders were considered and why the recommended one was chosen. Ask for the sanction letter before you sign anything, and read the schedule of charges rather than the brochure.',
          'A broker who cannot answer those comfortably is telling you something. So is one who pushes a decision the same day when nothing about your requirement is urgent.',
        ],
      },
    ],
    seo: {
      title: 'What a Loan DSA Does and How We Are Paid | PayYou Advisory',
      description:
        'What a Direct Selling Agent does, why one credit enquiry beats eight, who pays the commission, and the questions worth asking any loan broker including us.',
      keywords: [
        'what is a loan DSA',
        'DSA charges loan India',
        'loan agent commission Pune',
        'direct selling agent loan meaning',
      ],
    },
  },

  {
    slug: 'flat-versus-reducing-interest-rate',
    title: 'A "9% flat" loan is not a 9% loan',
    standfirst:
      'Flat and reducing-balance rates are quoted in the same units and mean completely different things. The gap is roughly double, and it is entirely legal to quote either.',
    published: '2026-08-05',
    updated: '2026-08-05',
    readingMinutes: 5,
    topic: 'Costs',
    photo: 'calculator-papers',
    body: [
      {
        heading: 'Two ways to charge interest on the same loan',
        paragraphs: [
          'A reducing-balance rate charges interest on what you still owe. As you repay, the outstanding falls and so does the interest, which is how a home loan, a personal loan and almost all bank lending works.',
          'A flat rate charges interest on the entire original amount for the whole tenure, regardless of how much you have already repaid. In the final month, having paid back nearly everything, you are still being charged interest as though you had borrowed the full sum yesterday.',
        ],
      },
      {
        heading: 'The rough conversion',
        paragraphs: [
          'Over a typical tenure, a flat rate works out to somewhere near double the equivalent reducing rate. A loan quoted at nine per cent flat over five years costs about what a sixteen per cent reducing-balance loan does. The exact figure depends on the tenure, and our calculators page carries a table converting common flat rates to their reducing equivalents across three, five and seven years.',
          'Neither method is dishonest in itself. What causes harm is quoting a flat rate next to competitors quoting reducing rates and letting the reader compare the two numbers directly. That comparison is meaningless, and it is a familiar tactic in vehicle finance, consumer durable lending and some small-ticket business loans.',
        ],
      },
      {
        heading: 'What to ask',
        paragraphs: [
          'Ask one question of any quote: is this on a flat or a reducing basis? If the answer is flat, ask for the reducing equivalent in writing, or ask for the annual percentage rate, which folds the calculation method and the fees into a single comparable figure.',
          'A lender who will not give you either in writing has told you what you needed to know. And if you have already been quoted a flat rate, our EMI calculator will show you what the same money looks like on a reducing basis, without sending anything you type to anyone.',
        ],
      },
    ],
    seo: {
      title: 'Flat vs Reducing Interest Rate: The Real Difference | PayYou',
      description:
        'A 9% flat loan costs roughly what a 16% reducing-balance loan does. How the two methods differ, why the comparison is meaningless, and what to ask instead.',
      keywords: [
        'flat vs reducing interest rate',
        'flat rate loan meaning India',
        'reducing balance interest calculation',
        'how to compare loan rates India',
      ],
    },
  },

  {
    slug: 'buying-a-home-in-pcmc-what-the-loan-will-not-cover',
    title: 'Buying in PCMC: the costs the home loan will not cover',
    standfirst:
      'Stamp duty, registration, society charges and the valuation gap all fall outside the loan and are payable on the day. Buyers who budget only for the down payment run short at the worst moment.',
    published: '2026-07-28',
    updated: '2026-07-28',
    readingMinutes: 8,
    topic: 'Home loans',
    photo: 'home-loan',
    body: [
      {
        heading: 'The loan funds a proportion of the valuation, not of your costs',
        paragraphs: [
          'A home loan is computed as a percentage of the property\'s assessed value. Two things follow that catch first-time buyers in Pimpri-Chinchwad and across Pune. The assessment is the valuer\'s figure rather than the price you negotiated, and if it lands below what you agreed, the difference comes from your own funds on top of the margin you already planned.',
          'The second is that the assessed value is the property. It is not the transaction. Everything required to complete the transaction sits outside the loan.',
        ],
      },
      {
        heading: 'What sits outside',
        paragraphs: [
          'Stamp duty and registration are the largest, they are payable to the state at registration, and they are not funded. In Maharashtra this is a substantial sum on any purchase and it must be arranged in cleared funds for the day.',
          'Then the smaller ones, which add up faster than people expect: society transfer and formation charges, maintenance deposits, legal and technical fees, the loan processing fee, and where the property is under construction, the GST payable on the purchase. Add furnishing and moving costs and a buyer can need a meaningful sum beyond the down payment.',
        ],
      },
      {
        heading: 'Get the sanction before you book',
        paragraphs: [
          'The order most buyers follow is find the flat, pay a booking amount, then apply for the loan. That exposes the booking amount if the sanction comes in smaller than hoped or the lender takes a view on the title. Applying first produces a sanction letter valid for months and tells you precisely what you can spend.',
          'It also changes how you negotiate. A buyer with a sanction in hand is a buyer who will certainly complete, and in a market where builders and sellers have both been let down by financing that fell through, that is worth something in the price.',
        ],
      },
      {
        heading: 'Two things worth checking that are not about money',
        paragraphs: [
          'Confirm the RERA registration of any under-construction project and read what is actually registered, including the promised possession date. It is a public record and it takes minutes.',
          'And check the title chain properly rather than accepting an assurance. A break in the chain of ownership is the single most common reason a home purchase takes weeks longer than planned, and it is far cheaper to discover before the booking amount is paid than after.',
        ],
      },
    ],
    seo: {
      title: 'Home Loan Hidden Costs in PCMC & Pune | PayYou Advisory',
      description:
        'Stamp duty, registration, society charges, GST and the valuation gap all fall outside a home loan. What to budget for in Pimpri-Chinchwad beyond the down payment.',
      keywords: [
        'home loan hidden costs Pune',
        'stamp duty registration PCMC',
        'home buying costs Pimpri Chinchwad',
        'home loan down payment Pune',
      ],
    },
  },

  {
    slug: 'business-loan-what-lenders-read-in-your-bank-statement',
    title: 'What a lender actually reads in your bank statement',
    standfirst:
      'For an unsecured business loan, the statement matters more than the balance sheet. Six things are being looked at, and most business owners are surprised by at least three of them.',
    published: '2026-07-20',
    updated: '2026-07-20',
    readingMinutes: 6,
    topic: 'Business loans',
    photo: 'business-loan',
    body: [
      {
        heading: 'Why the statement outranks the accounts',
        paragraphs: [
          'Filed accounts are prepared once a year with tax in mind. A bank statement is a contemporaneous record of what actually happened, month by month, and it cannot easily be arranged after the fact. For an unsecured facility, where the lender has no security to fall back on, it is the primary evidence.',
          'That is why a profitable business with untidy banking is a harder file to place than a modest one that maintains balances and never returns an instrument.',
        ],
      },
      {
        heading: 'The six things being read',
        paragraphs: [
          'Average balance across the month, not the balance on any single day. Money that arrives and leaves the same afternoon does almost nothing for the assessment. Credit summations, meaning total money in, compared against the turnover you have declared elsewhere, because a large gap invites questions that are difficult to answer well.',
          'Inward cheque returns and failed mandates, which in the recent three to six months will stop most unsecured files outright. The number of existing loan instalments visible in the account, which reveals obligations whether or not you listed them. Any sign of cheque discounting or informal borrowing. And whether the account is a current account being used as one, or a personal savings account doing a business\'s work.',
        ],
      },
      {
        heading: 'What to do about it',
        paragraphs: [
          'Most of this responds to a few months of deliberate housekeeping. Keep balances rather than sweeping everything out. Route trade through the current account so it appears where a lender expects it. Ensure standing instructions are funded so nothing bounces. If a return has already happened, waiting until it falls outside the recent window is frequently better than applying now and collecting a decline.',
          'And if the filings genuinely understate a business that trades well, there are lenders who assess GST returns or banking turnover directly rather than working from profit. Knowing which ones is the difference between a decline and a sanction on the same file.',
        ],
      },
    ],
    seo: {
      title: 'What Lenders Read in Your Business Bank Statement | PayYou',
      description:
        'Average balance, credit summations, cheque returns and account conduct. The six things a lender examines in a business bank statement, and how to improve them.',
      keywords: [
        'business loan bank statement requirements',
        'unsecured business loan Pune',
        'bank statement for loan India',
        'business loan rejected cheque bounce',
      ],
    },
  },
]

export const POST_BY_SLUG = Object.fromEntries(POSTS.map((p) => [p.slug, p]))
