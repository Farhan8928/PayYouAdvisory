import { CONTACT, OFFICES, waLink } from '../data/site.js'
import { telHref } from '../lib/format.js'
import PageHeader, { Section, SectionHead } from '../components/PageHeader.jsx'
import { Mail, Phone, Whatsapp, Check } from '../components/Icon.jsx'

/**
 * Careers.
 *
 * ── Deliberately no JobPosting structured data ─────────────────────────────
 * `JobPosting` schema is tempting here — it can put listings into Google's jobs
 * carousel, which is a large amount of free traffic. It also requires a real
 * vacancy with a real title, a valid `datePosted`, and a `validThrough` that is
 * honoured. Marking up an evergreen "we're always hiring" page as a live
 * posting is a documented structured-data violation and gets sites removed from
 * the jobs experience entirely.
 *
 * TODO(client): when there is a genuine opening with a title, a location and a
 * closing date, add it to a ROLES array with those fields and the schema can go
 * in properly. Until then this page ranks on its copy, which it can do
 * perfectly well — "financial advisor jobs Pune" is not a hard term.
 *
 * The copy is written to describe the job honestly, including the parts that
 * put people off. A careers page that admits the first six months are hard
 * attracts fewer applicants and better ones.
 */
export default function Careers({ trail }) {
  return (
    <>
      <PageHeader
        eyebrow="Careers · Pune, Pimpri-Chinchwad, Baramati & Phaltan"
        title="Learn how credit actually gets decided."
        standfirst="Most people in lending learn one lender's policy. Working on a panel of twenty-five, you learn why the same file passes at one and fails at another — which is the only knowledge in this industry that keeps its value."
        trail={trail}
        photo="careers"
      />

      {/* ── The work ────────────────────────────────────────────────────── */}
      <Section size="md">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title="What the job actually is" className="mb-6" />
            <p className="prose-body mb-5">
              You sit with someone who needs money and works out whether they can get it. That means
              reading bank statements properly, understanding why a credit report says what it says,
              knowing which of twenty-five lenders will look at a cash-salaried applicant or an MIDC
              leasehold shed, and telling people the truth when the answer is no.
            </p>
            <p className="prose-body mb-5">
              It is a sales role and we will not pretend otherwise — the business only earns when a
              loan disburses. But it is the kind of sales where the product is a judgement, and the
              people who do it well are the ones who get good at the judgement rather than at the
              pitch.
            </p>
            <p className="prose-body">
              The first six months are hard. You will not know the lender policies, you will submit
              files that get declined for reasons you did not anticipate, and you will have to go
              back to a customer and explain it. Everyone who is good at this went through that.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-ink/15 bg-paper-deep p-7">
              <h3 className="h-card text-ink">Who we look for</h3>
              <ul className="mt-4 space-y-3">
                {[
                  'Graduates from any stream — we have no preference for commerce or finance, and some of the best people in this industry came from neither.',
                  'Anyone who can read a bank statement and get curious about what it shows.',
                  'People who would rather lose a file than mis-sell one.',
                  'Local knowledge of Pune, PCMC, Baramati or Phaltan is a genuine advantage.',
                  'Marathi and Hindi alongside English — most of this job happens in them.',
                ].map((x) => (
                  <li key={x} className="flex gap-2.5 text-base leading-relaxed text-ink-soft">
                    <Check className="mt-1.5 h-3.5 w-3.5 shrink-0 text-gold" />
                    {x}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 h-card text-ink">Where you would sit</h3>
              <ul className="mt-3 space-y-1.5">
                {OFFICES.map((o) => (
                  <li key={o.id} className="fig text-sm text-ink-soft">
                    {o.locality}
                    <span className="ml-2 font-sans text-2xs uppercase tracking-[0.1em] text-ink-faint">
                      {o.kind}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Roles ───────────────────────────────────────────────────────── */}
      <Section tone="deep" size="md">
        <div className="container-page">
          <SectionHead
            title="The kinds of role"
            standfirst="We recruit against these continuously rather than posting dated vacancies. Write to us and we will tell you honestly whether there is something open."
          />

          <ul className="border-t border-ink/15">
            {ROLES.map((r, i) => (
              <li key={r.title} className="grid gap-x-8 gap-y-3 border-b border-ink/15 py-8 lg:grid-cols-12">
                <span className="index-num lg:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <div className="lg:col-span-4">
                  <h3 className="text-2xl text-ink">{r.title}</h3>
                  <p className="mt-1.5 text-2xs uppercase tracking-[0.12em] text-gold">{r.level}</p>
                </div>
                <div className="lg:col-span-7">
                  <p className="max-w-prose text-base leading-relaxed text-ink-soft">{r.body}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-faint">
                    <span className="font-semibold text-ink-soft">You would need:</span> {r.needs}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Apply ───────────────────────────────────────────────────────── */}
      <Section tone="dark" size="md">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHead
              title="How to apply"
              standfirst="There is no application portal and no automated screening. Send a CV and a few lines about why this rather than something else, and a person will read it."
              invert
              className="mb-8"
            />

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Application — careers')}`}
                className="btn-brass"
              >
                <Mail className="h-4 w-4" />
                {CONTACT.email}
              </a>
              <a
                href={waLink('Hi PayYou Advisory, I would like to apply for a role. ')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <Whatsapp className="h-4 w-4" />
                WhatsApp a CV
              </a>
              <a href={telHref(CONTACT.landline)} className="btn-ghost-invert">
                <Phone className="h-4 w-4" />
                <span className="fig">{CONTACT.landlineDisplay}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <h3 className="mb-5 text-2xs font-semibold uppercase tracking-[0.14em] text-paper/40">
              What happens next
            </h3>
            <ol className="border-t border-paper/12">
              {[
                ['A reply', 'Within a few working days, either way. A silent rejection is a discourtesy and we do not do it.'],
                ['A conversation', 'Half an hour, mostly about what you have done and what you want to learn. No aptitude test.'],
                ['A real file', 'We show you an anonymised case and talk through it together. It tells us more than any interview question, and it tells you whether the work interests you.'],
                ['An offer, or a straight no', 'With the reason. If it is a "not yet", we will say what would change it.'],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-5 border-b border-paper/12 py-4">
                  <span className="fig shrink-0 text-2xs tracking-[0.16em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-semibold text-paper">{t}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-paper/60">{b}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </>
  )
}

const ROLES = [
  {
    title: 'Relationship Manager',
    level: 'Entry to mid · field',
    body: 'The front of the business. You meet borrowers, take the requirement, gather documents and stay with the file through to disbursal. Most of the learning happens here because you see every product and every lender response.',
    needs: 'Any graduate degree, a two-wheeler and a licence, Marathi or Hindi alongside English. No prior banking experience required.',
  },
  {
    title: 'Credit & Documentation Officer',
    level: 'Mid · office',
    body: 'You read the file before a lender does — bank statements, ITRs, GST returns, credit reports, property papers — and decide whether it is ready. The job is finding the problem before the underwriter does.',
    needs: 'An eye for detail and a tolerance for spreadsheets. Prior experience at a bank, NBFC or DSA is useful but not required.',
  },
  {
    title: 'Secured Loans Specialist',
    level: 'Experienced',
    body: 'Home loans, loans against property and lease rental discounting, including the awkward security — MIDC leasehold, industrial sheds, Grampanchayat land. You need to know which lender takes what, and why a valuation came back low.',
    needs: 'Two or more years placing secured loans in Pune or PCMC, and familiarity with local title and approval practice.',
  },
  {
    title: 'Insurance Advisor',
    level: 'Entry to mid',
    body: 'Life, health and loan protection placed across multiple insurers. The part of this job that matters is loan protection — making sure a family does not inherit a home loan alongside a bereavement.',
    needs: 'The relevant certification, or a willingness to obtain it. We will support the process.',
  },
  {
    title: 'Graduate & internship programme',
    level: 'No experience needed',
    body: 'Three to six months across origination, documentation and lender liaison, with a view to a permanent role. You will sit with real files from the first week rather than shadowing.',
    needs: 'A degree in progress or completed, in any subject.',
  },
]
