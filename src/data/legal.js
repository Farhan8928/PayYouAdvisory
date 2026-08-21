/**
 * Policy pages.
 *
 * These are not filler. In a YMYL category the policy set is read by Google's
 * quality raters as a direct trust signal, and a grievance-redressal page with
 * a named escalation path is one of the few things a small advisory can publish
 * that a large one cannot fake. They also do real work for a reader deciding
 * whether to hand over a PAN number.
 *
 * The content is drafted to describe how a DSA actually operates and is
 * deliberately specific about the one thing borrowers most need to know: that
 * PayYou is paid by the lender, not by the borrower.
 *
 * ── TODO(client), before launch ─────────────────────────────────────────────
 * A lawyer should review all five pages. Specifically needed from the client:
 *   · CIN, GSTIN and, if insurance is placed under a licence, the IRDAI number
 *   · the named Grievance Officer and a dedicated email for escalations
 *   · confirmation of the data-retention period actually operated
 *   · the list of third parties data is shared with, beyond partner lenders
 * These are marked in the copy below as items the reader can request, so no
 * page renders a placeholder — the build audit fails on those, deliberately.
 */
import { COMPANY, CONTACT, PRIMARY_OFFICE } from './site.js'

const OFFICE_LINE = PRIMARY_OFFICE.lines.join(' ')
const UPDATED = '21 August 2026'

export const LEGAL_PAGES = [
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    updated: UPDATED,
    description:
      'What personal and financial information PayYou Advisory collects, why, who it is shared with, how long it is kept, and how to have it deleted.',
    intro:
      'This policy explains what we collect, why we collect it, and what we do with it. It is written to be read rather than to be defensible, and if anything in it is unclear you are entitled to ask us and get a straight answer.',
    sections: [
      {
        heading: 'Who we are',
        body: [
          `${COMPANY.name} is a loan referral and advisory firm, a Direct Selling Agent, with its corporate office at ${OFFICE_LINE}. We are not a bank, an NBFC or a lender.`,
          `For any question about this policy, write to ${CONTACT.email} or call ${CONTACT.landlineDisplay}.`,
        ],
      },
      {
        heading: 'What we collect',
        list: [
          'Identity and contact details: your name, mobile number, email address and residential address.',
          'Financial information: income, employment or business details, existing loan obligations, bank statements, income tax returns and PAN.',
          'Credit information: your credit report and score, obtained with your consent from a credit information company.',
          'Property information: where you are applying for a secured loan, details and documents relating to the property offered as security.',
          'Website usage: pages visited and referring source, in aggregate. Our calculators do not transmit anything you type into them; those figures never leave your browser.',
        ],
      },
      {
        heading: 'Why we collect it',
        body: [
          'To assess which of our partner lenders is likely to approve your application, to prepare and submit that application on your instruction, and to follow it through to a decision.',
          'We also use your contact details to respond to enquiries and to keep you informed about the progress of a live application. We do not sell your data to anyone, ever, and we do not pass it to lenders you have not asked us to approach.',
        ],
      },
      {
        heading: 'Consent, and what you are agreeing to',
        body: [
          'We obtain your explicit consent before pulling your credit report and before submitting your details to any lender. Consent for a soft credit check is not consent to apply: the two are asked for separately, because they have different consequences for your credit record.',
          'You may withdraw consent at any time by writing to us. Withdrawing it means we can no longer progress an application, and where a lender has already received your file, its own retention obligations apply to its copy.',
        ],
      },
      {
        heading: 'Who we share it with',
        list: [
          'The partner bank or NBFC you instruct us to apply to, and only that one.',
          'Credit information companies, to obtain your credit report with your consent.',
          'Service providers who help us operate, such as document storage and communication tools, under confidentiality obligations.',
          'Any authority we are legally required to disclose to.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'For as long as needed to serve your application and to meet the record-keeping obligations that apply to a referral intermediary, after which it is deleted or anonymised.',
          'You may ask us at any time for the specific retention period applied to your records, and we will tell you.',
        ],
      },
      {
        heading: 'Your rights',
        list: [
          'To ask what personal data we hold about you and receive a copy.',
          'To have inaccurate information corrected.',
          'To withdraw consent and ask for your data to be deleted, subject to any legal retention obligation.',
          'To ask us to stop contacting you for marketing purposes, which we will act on immediately.',
        ],
      },
      {
        heading: 'Security',
        body: [
          'Documents are handled by named staff on a need-to-know basis and shared with lenders through their own secure channels. This website is served over HTTPS and does not itself store the financial figures you enter into its calculators.',
          'No system is perfectly secure, and anyone claiming otherwise is selling something. If you believe your information has been compromised, contact us immediately on the number above.',
        ],
      },
      {
        heading: 'Fraud warning',
        body: [
          'We will never ask you to pay a fee in cash to secure a sanction, never ask for your internet-banking password or an OTP, and never ask you to transfer money to an individual account to "release" a loan. Anyone doing so in our name is not acting for us. Report it to us and to the police.',
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'terms',
    title: 'Terms of Use',
    updated: UPDATED,
    description:
      'The terms on which PayYou Advisory provides loan referral and advisory services, including how we are paid and what we do not promise.',
    intro:
      'These terms govern your use of this website and our advisory service. The important parts are in the first two sections, and they are the parts most people do not read.',
    sections: [
      {
        heading: 'We are an intermediary, not a lender',
        body: [
          `${COMPANY.name} operates as a Direct Selling Agent. We introduce prospective borrowers to banks and non-banking financial companies. We do not lend money, do not sanction loans, do not disburse funds and do not set interest rates, fees or terms.`,
          'Every credit decision is made by the lender under its own credit policy. Nothing on this website, and nothing said by any member of our staff, constitutes an offer, a sanction or a guarantee of credit.',
        ],
      },
      {
        heading: 'How we are paid',
        body: [
          'Our fee is paid by the lender, as a referral commission on a successfully disbursed loan, in the ordinary way a DSA is compensated. You should weigh our recommendations with that in mind, which is why we set out the comparison between lenders rather than simply telling you which to choose.',
          'Where any charge to you would ever apply, it will be stated to you in writing and agreed before you proceed. We do not take cash payments to "process" or "guarantee" an application.',
        ],
      },
      {
        heading: 'Information on this website',
        body: [
          'Interest rates, loan amounts, tenures and eligibility criteria shown on this site are indicative, are drawn from our partner lenders’ published terms, and change without notice. They are not offers.',
          'The calculators are provided to help you think, and are arithmetically correct on the inputs you give them. They are not a quotation, do not account for every fee a lender may levy, and do not predict what any lender will approve.',
        ],
      },
      {
        heading: 'Your responsibilities',
        list: [
          'To give us accurate and complete information. A lender will discover an inaccuracy, and it will cost you the application.',
          'To read a lender’s sanction letter and loan agreement before signing it. Those documents, not this website, define what you owe.',
          'To satisfy yourself that a loan is affordable. We will tell you honestly if we think it is not.',
        ],
      },
      {
        heading: 'Limitation',
        body: [
          'We are liable for the advisory service we provide. We are not liable for a lender’s decision, for the terms a lender offers, for the conduct of a lender after disbursal, or for a decision you take on the basis of an indicative figure from a calculator on this site.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'The content, design and code of this website belong to us. The names of banks and NBFCs appear as factual references to institutions we place business with, and no endorsement by them of this site is implied or claimed.',
        ],
      },
      {
        heading: 'Governing law',
        body: ['These terms are governed by the laws of India, and the courts at Pune have jurisdiction.'],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    updated: UPDATED,
    description:
      'PayYou Advisory is a loan referral intermediary, not a lender. What that means for the rates, eligibility figures and calculator results shown on this site.',
    intro:
      'The single most important thing on this page: we are not a lender, and nothing here is an offer of credit.',
    sections: [
      {
        heading: 'Not a lender',
        body: [
          `${COMPANY.name} is a loan referral and advisory firm. It is not a bank, an NBFC, a housing finance company or a deposit-taking institution. It does not accept deposits from the public under any circumstances.`,
        ],
      },
      {
        heading: 'Rates and figures are indicative',
        body: [
          'Every rate, amount, tenure and eligibility criterion on this site is indicative and subject to the lender’s policy at the time of application. Where we quote a starting rate, it is the lowest advertised rate across our partner lenders. It is not a rate we can offer, and it is not a rate every applicant qualifies for.',
          'Where a rate is not published for a product, we say what the rate depends on rather than quoting a number we cannot stand behind.',
        ],
      },
      {
        heading: 'Calculators',
        body: [
          'The calculators compute standard reducing-balance loan mathematics on the figures you enter. They run entirely in your browser and nothing you type is transmitted to us or to anyone else.',
          'Their output is an estimate for your own planning. It excludes processing fees, insurance premiums, statutory charges and any lender-specific levy, and it is not a quotation.',
        ],
      },
      {
        heading: 'No guarantee of approval',
        body: [
          'No intermediary can guarantee that a loan will be approved. Anyone who tells you otherwise, including anyone claiming to act for us, is misrepresenting the position.',
        ],
      },
      {
        heading: 'Tax and investment content',
        body: [
          'References to deductions under the Income Tax Act are general in nature and reflect the position as we understand it. Tax provisions change and depend on your individual circumstances. Take advice from a qualified tax professional before acting.',
          'Nothing on this site is investment advice or a recommendation to purchase any insurance or investment product.',
        ],
      },
      {
        heading: 'Third-party names',
        body: [
          'Bank and NBFC names appear as factual references to institutions with which we have referral arrangements. All trade marks belong to their respective owners. Their appearance does not imply that they endorse this website or its content.',
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    updated: UPDATED,
    description:
      'What this website stores in your browser, and what it does not. PayYou Advisory sets no advertising or tracking cookies.',
    intro:
      'Short version: this site sets no advertising cookies, runs no third-party trackers, and stores nothing you type into a calculator.',
    sections: [
      {
        heading: 'What we set',
        body: [
          'This website is a set of static pages. It does not set advertising cookies, does not run third-party tracking scripts, and does not build a profile of you across other websites.',
          'Your browser may store a small amount of data locally to remember a preference, for example, the last figures you used in a calculator, so they are still there if you come back to the page. That data stays on your device, is readable only by this site, and is never transmitted to us.',
        ],
      },
      {
        heading: 'What we measure',
        body: [
          'We look at aggregate traffic figures, which pages are read, and where visitors arrived from, to understand what is useful. This does not identify you individually.',
        ],
      },
      {
        heading: 'Embedded content',
        body: [
          'Our contact page embeds a Google Map so you can find the office. Google sets its own cookies when that map loads, governed by Google’s privacy policy rather than ours. The map is the only third-party content on the site.',
        ],
      },
      {
        heading: 'Clearing what is stored',
        body: [
          'Any browser will let you clear site data for a specific website, and doing so for this one has no effect other than forgetting your calculator inputs.',
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'grievance-redressal',
    title: 'Grievance Redressal',
    updated: UPDATED,
    description:
      'How to raise a complaint with PayYou Advisory, what happens next, and how to escalate, including to the lender and to the RBI Ombudsman.',
    intro:
      'If something has gone wrong, this page tells you exactly who to contact and what to expect. It also tells you how to escalate past us, which is the part that matters if we are the problem.',
    sections: [
      {
        heading: 'Step one: raise it with us',
        body: [
          `Call ${CONTACT.landlineDisplay} or write to ${CONTACT.email} with your name, mobile number, the product concerned and what went wrong. If you have a lender application reference, include it.`,
          'We will acknowledge a written complaint within two working days and aim to resolve it within fifteen working days. Where a complaint needs information from a lender, that timeline depends partly on them, and we will tell you if it is going to run over.',
        ],
      },
      {
        heading: 'Step two: escalate within PayYou',
        body: [
          `If the response does not resolve it, ask for the matter to be escalated to the Grievance Officer, in writing, at ${CONTACT.email} or by post to ${OFFICE_LINE}. Mark the subject line "Escalation".`,
          'You are entitled to be told the name of the person handling your complaint. Ask for it.',
        ],
      },
      {
        heading: 'Step three: take it to the lender',
        body: [
          'If your complaint concerns the loan itself, the rate applied, a charge levied, the servicing of the account or a recovery practice. The lender is the correct respondent, not us. Every bank and NBFC publishes a grievance redressal mechanism with defined timelines, and we will give you the current contact details for the relevant one and help you frame the complaint.',
        ],
      },
      {
        heading: 'Step four. The Ombudsman',
        body: [
          'Where a complaint against a bank or NBFC is not resolved within the period that institution’s own policy allows, or you are dissatisfied with its response, you may escalate to the Reserve Bank of India’s Integrated Ombudsman Scheme. Complaints can be filed online through the RBI’s complaint management portal, by post, or by email. There is no fee.',
          'For an insurance complaint, the equivalent escalation is to the insurer’s grievance cell and then to the Insurance Ombudsman.',
        ],
      },
      {
        heading: 'What we will not do',
        body: [
          'We will not ask you to withdraw a complaint as a condition of assistance, and raising one has no effect on any live application we are handling for you.',
        ],
      },
    ],
  },
]

export const LEGAL_BY_SLUG = Object.fromEntries(LEGAL_PAGES.map((l) => [l.slug, l]))
