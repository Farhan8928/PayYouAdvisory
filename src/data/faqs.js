/**
 * Site-level FAQs — the questions about PayYou itself, rather than about a
 * particular product. Per-product questions live on each product in
 * `src/data/products.js` and render on that product's page.
 *
 * These feed the `/faq/` page and its `FAQPage` JSON-LD. Google will only show
 * one FAQ rich result per page, so the homepage deliberately renders a short
 * subset without its own FAQPage block — the canonical set is here.
 *
 * The answers are deliberately direct about how a DSA is paid and about what
 * PayYou cannot do. In a YMYL category that candour is not a risk, it is the
 * entire E-E-A-T argument: a page that admits a conflict of interest is more
 * credible than one that pretends there is none.
 */

export const FAQ_GROUPS = [
  {
    group: 'How PayYou works',
    items: [
      {
        q: 'Is PayYou Advisory a bank or an NBFC?',
        a: 'Neither. PayYou Advisory Private Limited is a Direct Selling Agent, which is to say a loan referral and advisory firm. We do not lend money, we do not sanction loans and we do not set interest rates. We prepare your file, identify which of our 25+ partner banks and NBFCs are likely to approve it, and manage the process through to disbursal. The sanction, the rate and the disbursal are always the lender’s decision.',
      },
      {
        q: 'What does PayYou charge me?',
        a: 'Our fee comes from the lender, paid on a completed disbursal, in the ordinary way a DSA is compensated. Where any charge to you would ever apply, it is stated in writing before you proceed, never deducted from a disbursal as a surprise. Beware of any intermediary who asks for cash upfront to "guarantee" a sanction; nobody can guarantee one.',
      },
      {
        q: 'Why not just apply to a bank myself?',
        a: 'You can, and for a simple salaried profile with a strong credit score at a major employer, applying directly is perfectly sensible. The value of a broker rises with how non-standard your file is: cash salary, informal business income, an MIDC leasehold property, a thin credit file, an existing loan you want moved. In those cases the difference between the right lender and the wrong one is approval versus decline, not a quarter of a percent.',
      },
      {
        q: 'Will you check my credit report before applying?',
        a: 'Yes, with a soft check, which does not affect your score. Hard enquiries are only created when a formal application is submitted, and we do not submit anywhere without your instruction.',
      },
      {
        q: 'How many lenders will you apply to?',
        a: 'As few as possible. Usually one, occasionally two. The point of reviewing your profile against 25+ partners is to narrow the list before applying, not to spray applications across it. Several applications in a short window lower your credit score.',
      },
      {
        q: 'Can you guarantee my loan will be approved?',
        a: 'No, and neither can anyone else. Approval is the lender’s decision, made against its own credit policy. What we can do is tell you honestly, before you apply, whether your file is likely to clear, and if it is not, what would have to change for it to.',
      },
    ],
  },
  {
    group: 'Eligibility and credit',
    items: [
      {
        q: 'My CIBIL score is low. Is there anything you can do?',
        a: 'It depends what is causing it. A thin file with little credit history is a different problem from a settled account or a live default, and only one of those is quickly fixable. Some NBFCs on our panel underwrite scores banks will not touch, and a secured loan (against property or gold) is far less score-sensitive than an unsecured one. We will tell you which of these applies to you rather than submitting an application we expect to fail.',
      },
      {
        q: 'I am paid in cash. Can I get a loan?',
        a: 'Yes, if the cash is banked. Several partner lenders underwrite cash-salaried applicants and cash-turnover businesses from six to twelve months of bank statements showing consistent credits. An applicant who deposits their income is fundable; one who does not is genuinely very hard to help, and we would rather say so at the start.',
      },
      {
        q: 'How much can I actually borrow?',
        a: 'For an unsecured loan, it is driven by your net income less your existing EMI obligations. Lenders work to a fixed-obligation-to-income ratio, and most applicants are constrained by their existing EMIs rather than by their salary. For a secured loan it is driven by the property valuation. Our eligibility calculator gives you an indicative figure in about thirty seconds.',
      },
      {
        q: 'Does a joint application help?',
        a: 'Usually a great deal, particularly on a home loan. Adding a co-applicant with independent income raises the assessed repayment capacity, and on a home loan it can also spread the tax deductions across both applicants. The co-applicant is equally liable, which is the part worth thinking about carefully.',
      },
    ],
  },
  {
    group: 'Process and documents',
    items: [
      {
        q: 'How long does the whole process take?',
        a: 'An unsecured personal or business loan with a clean, complete file typically disburses within 24 to 48 hours of approval. A home loan or loan against property takes longer, usually two to four weeks, because the property has to clear a legal and technical valuation, and that timeline is largely outside anyone’s control.',
      },
      {
        q: 'What is the one thing that most delays a file?',
        a: 'Incomplete documents, by a wide margin. The second is a property title question that nobody checked before the application went in. Both are avoidable in the first conversation, which is why we spend it on the file rather than on the sale.',
      },
      {
        q: 'Do I have to visit your office?',
        a: 'Not necessarily. Most of the process runs over phone, WhatsApp and email, and documents can be shared digitally. If you would rather sit across a desk, the Chinchwad office is at Chapekar Chowk, Monday to Saturday, 9:30 am to 6:30 pm.',
      },
      {
        q: 'Which areas do you serve?',
        a: 'Pune and Pimpri-Chinchwad primarily, from the Chinchwad office, plus Baramati and Phaltan from our branch and registered offices. Lending is not geographically restricted the way a shop is. What matters is that the lender is willing to fund a property in that location, which for the areas we cover it generally is.',
      },
    ],
  },
  {
    group: 'Costs and risks',
    items: [
      {
        q: 'What charges should I expect beyond the interest?',
        a: 'Processing fees, and on secured loans legal and technical valuation charges, stamp duty on the mortgage, and documentation charges. There may be foreclosure or part-payment charges if you close early, and these vary far more between lenders than the headline rate does, and are worth asking about before signing rather than after. We will set out the full cost of any offer before you accept it.',
      },
      {
        q: 'Should I take the longest tenure available to lower my EMI?',
        a: 'Only if you need to. A longer tenure lowers the monthly outgo and raises the total interest substantially, on a twenty-year home loan versus a fifteen-year one, the difference is a large number. Our EMI calculator shows the total interest alongside the EMI for exactly this reason; deciding on the EMI alone is how people end up paying for a house twice.',
      },
      {
        q: 'Is a balance transfer always worth it?',
        a: 'No. A transfer carries processing fees, fresh legal and valuation charges, new documentation and a reset amortisation schedule. It is worth it when the rate difference is real and enough tenure remains for the saving to exceed the cost. Our balance-transfer calculator models that rather than comparing two rates and assuming the lower one wins.',
      },
      {
        q: 'What happens if I miss an EMI?',
        a: 'A late fee, and the missed payment is reported to the credit bureaus, which lowers your score and makes future borrowing harder and dearer. On a secured loan, sustained default puts the security at risk. If you can see trouble coming, speak to the lender early. Restructuring a live loan is possible; renegotiating one already in default is much harder.',
      },
    ],
  },
]

/** Flattened, for the JSON-LD builder and for search. */
export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items)

/** The short set rendered on the homepage. */
export const HOME_FAQ_SLUGS = [
  'Is PayYou Advisory a bank or an NBFC?',
  'What does PayYou charge me?',
  'Can you guarantee my loan will be approved?',
  'My CIBIL score is low. Is there anything you can do?',
  'I am paid in cash. Can I get a loan?',
  'How long does the whole process take?',
]

export const HOME_FAQS = HOME_FAQ_SLUGS.map((q) => ALL_FAQS.find((f) => f.q === q)).filter(Boolean)
