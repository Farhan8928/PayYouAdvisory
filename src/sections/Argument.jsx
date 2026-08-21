import { Section, SectionHead } from '../components/PageHeader.jsx'
import Photo from '../components/Photo.jsx'

/**
 * "Why us", written as an argument rather than a list of virtues.
 *
 * The convention here is four cards saying *Transparent · Trusted · Fast ·
 * Customer-first*, which are not claims so much as words. Every competitor
 * makes all four, none can be checked, and a reader discounts the lot.
 *
 * These four are written to be falsifiable instead: each states a specific
 * thing PayYou does, and — in the `against` line — the specific thing it costs
 * PayYou to do it. A stated cost is the cheapest way to make a claim credible,
 * because a business does not volunteer a downside it is not actually carrying.
 */
const POINTS = [
  {
    n: '01',
    title: 'We tell you when the answer is no',
    body: 'If your file will not clear, we say so at the first conversation and explain what would have to change — a settled account cleared, an EMI closed, six months of consistent banking. Submitting an application we expect to fail costs you a hard enquiry and a month.',
    against: 'It also costs us the commission we would have earned by letting you find out the slow way.',
  },
  {
    n: '02',
    title: 'One enquiry, not one per hope',
    body: 'We check your credit report with a soft pull, shortlist the lenders whose policy your profile actually fits, and submit to one. Your report carries a single enquiry rather than a trail of them.',
    against: 'Spraying eight applications converts better in the short run. It is also what leaves people unable to borrow six months later.',
  },
  {
    n: '03',
    title: 'The lender pays us, and we say so',
    body: 'Our fee is a referral commission from the lender on a completed disbursal. That is how every DSA in the country is paid; the difference is that it is written on this page rather than left for you to assume.',
    against: 'You should weigh our recommendation in that light — which is why we show you the comparison between lenders rather than only our conclusion.',
  },
  {
    n: '04',
    title: 'The hard files are the point',
    body: 'Cash salary. An MIDC leasehold shed. Grampanchayat land. A thin credit file. Seasonal agricultural income. These are declined by most banks as a matter of policy and are ordinary business for specific NBFCs on our panel — knowing which is the job.',
    against: 'A straightforward salaried applicant at a top employer may well do just as well walking into a branch. We will tell you that too.',
  },
]

export default function Argument() {
  return (
    <Section id="why-us" size="lg">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* The photograph is sticky on desktop, so it holds the reader's place
              while the four points scroll past it. It is the one moment on the
              page where an image does structural work rather than decorative. */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHead
                index="05 — Why a broker at all"
                title="Four things we do, and what each costs us."
                standfirst="Every advisory firm claims to be transparent and customer-first. Those are not claims, they are words. These four are specific enough that you could catch us failing at them."
                className="mb-8"
              />
              <Photo
                name="consult-desk"
                ratio="5 / 4"
                sizes="(min-width: 1024px) 36vw, 92vw"
                className="photo-rule rounded-lg shadow-card"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-5" data-stagger>
              {POINTS.map((p) => (
                <article
                  key={p.n}
                  className="group rounded-lg border border-ink/10 bg-paper p-7 shadow-card transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:border-brass/40 hover:shadow-lift"
                >
                  <span className="fig mb-4 block text-2xs tracking-[0.16em] text-gold">{p.n}</span>
                  <h3 className="font-display text-2xl leading-tight text-ink">{p.title}</h3>
                  <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-soft">{p.body}</p>
                  <p className="mt-5 border-l-2 border-brass/50 pl-5 text-sm leading-relaxed text-ink-faint">
                    {p.against}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
