/**
 * The mega-menu behind each top-level navigation item.
 *
 * ── What this reproduces ───────────────────────────────────────────────────
 * The reference site's panel, measured on 24 Aug 2026: a full-width white
 * sheet, 520px tall, in three parts.
 *
 *   1. A grey category rail down the left. Hovering a category swaps the
 *      middle without navigating anywhere.
 *   2. Two or three columns of links in the middle, each under a heading with
 *      a "View All →" beside it.
 *   3. A "Discover" promo card on the right: image, headline, one line, and an
 *      outlined pill.
 *
 * ── Why it is data rather than markup ──────────────────────────────────────
 * Because there are five panels and each has four to seven categories. Written
 * as JSX that is two thousand lines nobody will keep correct, and the moment
 * one panel drifts from another the menu stops feeling like one system. This
 * way `components/Nav.jsx` renders one shape and every panel is guaranteed to
 * behave identically.
 *
 * ── Every link here must resolve ───────────────────────────────────────────
 * `npm run audit:seo` walks every internal href in the built HTML and fails
 * the build on anything that does not match a route. A menu is the easiest
 * place in a site to accumulate dead links, and this is what stops it.
 */

export const MEGA = {
  Borrow: {
    categories: [
      {
        label: 'Personal loans',
        columns: [
          {
            heading: 'By who you are',
            viewAll: '/personal-loan/',
            links: [
              { label: 'Personal loan overview', href: '/personal-loan/' },
              { label: 'For salaried employees', href: '/personal-loan-for-salaried/' },
              { label: 'For self-employed', href: '/personal-loan-for-self-employed/' },
              { label: 'For doctors', href: '/personal-loan-for-doctors/' },
              { label: 'For CAs & professionals', href: '/personal-loan-for-professionals/' },
              { label: 'For women', href: '/personal-loan-for-women/' },
            ],
          },
          {
            heading: 'By what it is for',
            viewAll: '/personal-loan/',
            links: [
              { label: 'Medical emergency', href: '/personal-loan-for-medical-emergency/' },
              { label: 'Wedding', href: '/personal-loan-for-wedding/' },
              { label: 'Home renovation', href: '/personal-loan-for-home-renovation/' },
              { label: 'Debt consolidation', href: '/personal-loan-for-debt-consolidation/' },
              { label: 'Education & coaching', href: '/personal-loan-for-education/' },
              { label: 'Travel', href: '/personal-loan-for-travel/' },
            ],
          },
        ],
        discover: {
          eyebrow: 'Before you apply',
          title: 'One credit enquiry, not one per lender',
          body: 'Eight applications means eight hard enquiries and a lower score at the worst moment.',
          cta: { label: 'Check your eligibility', href: '/eligibility-calculator/' },
          photo: 'hero-advisory',
        },
      },
      {
        label: 'Business loans',
        columns: [
          {
            heading: 'How it is structured',
            viewAll: '/business-loan/',
            links: [
              { label: 'Business loan overview', href: '/business-loan/' },
              { label: 'Unsecured business loan', href: '/unsecured-business-loan/' },
              { label: 'Secured business loan', href: '/secured-business-loan/' },
              { label: 'Term loan', href: '/business-term-loan/' },
              { label: 'Overdraft & cash credit', href: '/business-overdraft/' },
              { label: 'Working capital & LRD', href: '/working-capital-loan/' },
            ],
          },
          {
            heading: 'Difficult files & schemes',
            viewAll: '/business-loan/',
            links: [
              { label: 'Without ITR or new business', href: '/business-loan-without-itr/' },
              { label: 'On GST returns', href: '/business-loan-on-gst/' },
              { label: 'MSME & Udyam schemes', href: '/msme-loan/' },
              { label: 'Machinery & equipment', href: '/machinery-loan/' },
              { label: 'Invoice discounting', href: '/invoice-discounting/' },
              { label: 'For women entrepreneurs', href: '/business-loan-for-women/' },
            ],
          },
        ],
        discover: {
          eyebrow: 'What lenders read',
          title: 'Your bank statement is the application',
          body: 'Average balance, credit summations and cheque returns decide more files than your accounts do.',
          cta: { label: 'Read the guide', href: '/blog/business-loan-what-lenders-read-in-your-bank-statement/' },
          photo: 'business-loan',
        },
      },
      {
        label: 'Home & property',
        columns: [
          {
            heading: 'Buying or building',
            viewAll: '/home-loan/',
            links: [
              { label: 'Home loan overview', href: '/home-loan/' },
              { label: 'Buying a home', href: '/home-purchase-loan/' },
              { label: 'Building on a plot', href: '/home-construction-loan/' },
              { label: 'Plot & land purchase', href: '/plot-purchase-loan/' },
              { label: 'Improvement & renovation', href: '/home-improvement-loan/' },
              { label: 'Extension', href: '/home-extension-loan/' },
            ],
          },
          {
            heading: 'Against property you own',
            viewAll: '/loan-against-property/',
            links: [
              { label: 'Loan against property', href: '/loan-against-property/' },
              { label: 'Residential property', href: '/residential-property-loan/' },
              { label: 'Commercial property', href: '/commercial-property-loan/' },
              { label: 'Lease rental discounting', href: '/lease-rental-discounting/' },
              { label: 'Transfer & top-up', href: '/home-loan-balance-transfer/' },
              { label: 'Affordable housing', href: '/affordable-housing-loan/' },
            ],
          },
        ],
        discover: {
          eyebrow: 'Home loans',
          title: 'Get the sanction before you book',
          body: 'A sanction letter fixes your ceiling and makes you a buyer who will certainly complete.',
          cta: { label: 'Work out the EMI', href: '/home-loan-emi-calculator/' },
          photo: 'home-loan',
        },
      },
      {
        label: 'Gold, vehicle & more',
        columns: [
          {
            heading: 'Secured on an asset',
            viewAll: '/loans/',
            links: [
              { label: 'Gold loan', href: '/gold-loan/' },
              { label: 'Rates, LTV & valuation', href: '/gold-loan-interest-rates/' },
              { label: 'Loan against securities', href: '/loan-against-securities/' },
              { label: 'Against shares', href: '/loan-against-shares/' },
              { label: 'Against mutual funds', href: '/loan-against-mutual-funds/' },
              { label: 'Against a fixed deposit', href: '/loan-against-fixed-deposit/' },
            ],
          },
          {
            heading: 'Vehicle & education',
            viewAll: '/loans/',
            links: [
              { label: 'Car loan', href: '/car-loan/' },
              { label: 'Used car loan', href: '/used-car-loan/' },
              { label: 'Two-wheeler loan', href: '/two-wheeler-loan/' },
              { label: 'Consumer durable & no-cost EMI', href: '/consumer-durable-loan/' },
              { label: 'Education loan', href: '/education-loan/' },
              { label: 'Study abroad', href: '/study-abroad-loan/' },
            ],
          },
        ],
        discover: {
          eyebrow: 'Same-day money',
          title: 'Gold you already own is the cheapest emergency cash',
          body: 'Valued on purity and net weight, capped at 75% loan-to-value by RBI rules.',
          cta: { label: 'How gold loans work', href: '/gold-loan-interest-rates/' },
          photo: 'gold-loan',
        },
      },
    ],
  },

  Protect: {
    categories: [
      {
        label: 'Life cover',
        columns: [
          {
            heading: 'Protecting income',
            viewAll: '/insurance/',
            links: [
              { label: 'Insurance overview', href: '/insurance/' },
              { label: 'Term insurance', href: '/term-insurance/' },
              { label: 'Life & savings plans', href: '/life-insurance/' },
            ],
          },
        ],
        discover: {
          eyebrow: 'Term insurance',
          title: 'The most cover for the least money',
          body: 'It pays nothing if you survive the policy, which is exactly why it buys so much more.',
          cta: { label: 'How to size it', href: '/term-insurance/' },
          photo: 'meeting-india',
        },
      },
      {
        label: 'Health & accident',
        columns: [
          {
            heading: 'Medical cover',
            viewAll: '/insurance/',
            links: [
              { label: 'Health insurance', href: '/health-insurance/' },
              { label: 'Critical illness & hospital cash', href: '/critical-illness-insurance/' },
              { label: 'Personal accident', href: '/personal-accident-insurance/' },
            ],
          },
        ],
        discover: {
          eyebrow: 'Health insurance',
          title: 'The exclusions matter more than the premium',
          body: 'Room rent capping can scale down an entire claim, not just the room difference.',
          cta: { label: 'What to check', href: '/health-insurance/' },
          photo: 'review-documents',
        },
      },
      {
        label: 'General',
        columns: [
          {
            heading: 'Vehicle & travel',
            viewAll: '/insurance/',
            links: [
              { label: 'Motor insurance', href: '/motor-insurance/' },
              { label: 'Travel insurance', href: '/travel-insurance/' },
            ],
          },
        ],
        discover: {
          eyebrow: 'Motor insurance',
          title: 'Third-party is the law. Own damage is the point.',
          body: 'A policy bought to satisfy the law pays nothing towards your own repair.',
          cta: { label: 'What cover you need', href: '/motor-insurance/' },
          photo: 'car-loan',
        },
      },
    ],
  },

  Invest: {
    categories: [
      {
        label: 'Deposits',
        columns: [
          {
            heading: 'Placing a sum',
            viewAll: '/investments/',
            links: [
              { label: 'Deposits overview', href: '/investments/' },
              { label: 'Fixed deposit', href: '/fixed-deposit/' },
              { label: 'Recurring deposit', href: '/recurring-deposit/' },
              { label: 'Systematic deposit plan', href: '/systematic-deposit-plan/' },
            ],
          },
          {
            heading: 'Accounts & borrowing against them',
            viewAll: '/investments/',
            links: [
              { label: 'Savings & current account', href: '/savings-and-current-account/' },
              { label: 'Loan against a fixed deposit', href: '/loan-against-fixed-deposit/' },
              { label: 'Loan against securities', href: '/loan-against-securities/' },
            ],
          },
        ],
        discover: {
          eyebrow: 'Worth knowing',
          title: 'Deposit insurance is per depositor, per bank',
          body: 'Splitting a large sum across institutions is usually worth more than a better rate.',
          cta: { label: 'Work out maturity', href: '/fd-calculator/' },
          photo: 'calculator-papers',
        },
      },
    ],
  },

  Tools: {
    categories: [
      {
        label: 'Calculators',
        columns: [
          {
            heading: 'Borrowing',
            viewAll: '/calculators/',
            links: [
              { label: 'EMI calculator', href: '/emi-calculator/' },
              { label: 'Home loan EMI', href: '/home-loan-emi-calculator/' },
              { label: 'Personal loan EMI', href: '/personal-loan-emi-calculator/' },
              { label: 'Business loan EMI', href: '/business-loan-emi-calculator/' },
              { label: 'What you could borrow', href: '/eligibility-calculator/' },
              { label: 'Balance transfer saving', href: '/balance-transfer-calculator/' },
            ],
          },
          {
            heading: 'Saving',
            viewAll: '/calculators/',
            links: [
              { label: 'SIP calculator', href: '/sip-calculator/' },
              { label: 'FD & RD calculator', href: '/fd-calculator/' },
              { label: 'All calculators', href: '/calculators/' },
            ],
          },
        ],
        discover: {
          eyebrow: 'No forms, no OTP',
          title: 'Everything computes in your browser',
          body: 'Nothing you type into a calculator on this site reaches us or anyone else.',
          cta: { label: 'Open the calculators', href: '/calculators/' },
          photo: 'calculator-papers',
        },
      },
    ],
  },

  Guides: {
    categories: [
      {
        label: 'Guides',
        columns: [
          {
            heading: 'Before you apply',
            viewAll: '/resources/',
            links: [
              { label: 'Credit score: read it, improve it', href: '/credit-score/' },
              { label: 'Documents required, by loan type', href: '/documents-required/' },
              { label: 'How to compare interest rates', href: '/interest-rate-comparison/' },
            ],
          },
          {
            heading: 'From the desk',
            viewAll: '/blog/',
            links: [
              { label: 'Why your application was rejected', href: '/blog/why-your-loan-application-was-rejected/' },
              { label: 'What a DSA actually does', href: '/blog/what-a-dsa-actually-does/' },
              { label: 'Flat versus reducing rates', href: '/blog/flat-versus-reducing-interest-rate/' },
              { label: 'Buying in PCMC: hidden costs', href: '/blog/buying-a-home-in-pcmc-what-the-loan-will-not-cover/' },
            ],
          },
        ],
        discover: {
          eyebrow: 'Start here',
          title: 'Most delays are a missing paper, not a credit decision',
          body: 'The checklist for every loan type, and the four mistakes that hold files up.',
          cta: { label: 'Documents required', href: '/documents-required/' },
          photo: 'review-documents',
        },
      },
    ],
  },
}

/**
 * The support panel behind "Contact us".
 *
 * The reference drops a grid of service tiles here — WhatsApp banking, track a
 * request, locate us, customer care — plus an app download panel on the right.
 * PayYou has no app, so that slot carries the thing it does have: three
 * offices you can walk into, which for a loan file is worth more than an app.
 */
export const SUPPORT_PANEL = {
  tiles: [
    {
      icon: 'whatsapp',
      title: 'WhatsApp us',
      body: 'Send your requirement and we will come back with which lenders fit.',
      href: 'wa',
    },
    {
      icon: 'phone',
      title: 'Call the office',
      body: 'Mon–Sat, 9:30 am to 6:30 pm. A person, not a queue.',
      href: 'tel',
    },
    {
      icon: 'calculator',
      title: 'Check eligibility',
      body: 'Work out what you could borrow before speaking to anyone.',
      href: '/eligibility-calculator/',
    },
    {
      icon: 'doc',
      title: 'Documents required',
      body: 'What to gather, by loan type, and what usually holds a file up.',
      href: '/documents-required/',
    },
    {
      icon: 'shield',
      title: 'How we are paid',
      body: 'The lender pays our fee on a disbursed loan. You pay nothing.',
      href: '/about/',
    },
    {
      icon: 'pin',
      title: 'Find an office',
      body: 'Chinchwad, Baramati and Phaltan. Addresses and directions.',
      href: '/contact/',
    },
  ],
}
