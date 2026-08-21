import { COMPANY, STATS, OFFICES } from '../data/site.js'
import { PARTNER_COUNT_CLAIM } from '../data/lenders.js'
import PageHeader, { Section, SectionHead } from '../components/PageHeader.jsx'
import ContactStrip from '../sections/ContactStrip.jsx'
import Argument from '../sections/Argument.jsx'
import Disclosure from '../components/Disclosure.jsx'
import { ArrowRight } from '../components/Icon.jsx'

/**
 * About.
 *
 * In a YMYL category this page carries more weight than any other except the
 * homepage, because it is where Google's quality raters — and a cautious
 * borrower — look for evidence that a real organisation with real
 * accountability stands behind the advice. So it is built around the three
 * things that can actually be verified: the parent group, the named chairman
 * and his public record, and three physical addresses.
 *
 * It is also where the site says plainly what PayYou is *not*, at full size
 * rather than in a footnote. A page that concedes its own limits is more
 * credible than one that does not, and this is the page where a reader is
 * specifically looking for the catch.
 */
export default function About({ trail }) {
  return (
    <>
      <PageHeader
        eyebrow={`A venture of ${COMPANY.parent}`}
        title="A broker that tells you when the answer is no."
        standfirst={`${COMPANY.name} is a loan advisory firm in Pimpri-Chinchwad. We are a Direct Selling Agent for ${PARTNER_COUNT_CLAIM} banks and NBFCs, which means we do not lend — we work out who will, and manage the file until they do.`}
        trail={trail}
        photo="team-office"
        aside={
          <dl className="grid grid-cols-2 gap-6 border border-paper/15 p-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="fig block text-2xl font-semibold leading-none text-paper">
                    {s.value}
                  </span>
                  <span className="mt-2 block text-2xs uppercase tracking-[0.12em] text-paper/50">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* ── What we are ─────────────────────────────────────────────────── */}
      <Section size="md">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title="What we are, and what we are not" className="mb-6" />
            <p className="prose-body mb-5">
              PayYou Advisory was incorporated in {COMPANY.incorporated} as the financial-services
              venture of {COMPANY.parent}. We operate as a Direct Selling Agent: a borrower comes to
              us with a requirement, we read the profile the way a credit officer will, and we place
              the file with whichever of our partner lenders is most likely to approve it on terms
              that suit the borrower.
            </p>
            <p className="prose-body mb-5">
              We are not a bank, an NBFC or a housing finance company. We do not accept deposits
              under any circumstances. We do not lend our own money, we cannot sanction anything, and
              we do not set interest rates — every one of those is the lender’s decision under its
              own credit policy.
            </p>
            <p className="prose-body">
              What we do control is which lender sees the file, how it is presented, and whether an
              application should be made at all. On a non-standard profile — cash income, a thin
              credit file, an MIDC leasehold shed, seasonal agricultural earnings — that is the
              difference between an approval and a decline, not between one rate and another.
            </p>

            <Disclosure className="mt-8" />
          </div>

          <div className="lg:col-span-5">
            <div className="border border-ink/15 bg-paper-deep p-7">
              <h3 className="h-card text-ink">Vision</h3>
              <p className="mt-2.5 text-base leading-relaxed text-ink-soft">
                To become the preferred financial-services partner for India’s aspiring classes, and
                to widen access to formal credit for people the system finds inconvenient to
                underwrite.
              </p>

              <h3 className="mt-8 h-card text-ink">Mission</h3>
              <p className="mt-2.5 text-base leading-relaxed text-ink-soft">
                To bring convenience to people’s financial lives through secured and unsecured
                credit solutions matched to what they actually need — not to what pays the most to
                place.
              </p>

              <h3 className="mt-8 h-card text-ink">Values</h3>
              <ul className="mt-3 space-y-2">
                {[
                  ['Integrity', 'in every dealing, including the ones that cost us a file'],
                  ['Transparency', 'about how we are paid and what we cannot promise'],
                  ['Compliance', 'with the law and with each lender’s code of conduct'],
                ].map(([k, v]) => (
                  <li key={k} className="border-l-2 border-brass pl-4 text-base leading-relaxed text-ink-soft">
                    <span className="font-semibold text-ink">{k}</span> — {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Leadership ──────────────────────────────────────────────────── */}
      <Section tone="dark" size="md">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead title="Who stands behind it" invert className="mb-0" />
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-paper/15 pt-8">
              <p className="mb-1.5 font-mono text-2xs uppercase tracking-[0.16em] text-gold">
                Chairman
              </p>
              <h3 className="font-display text-3xl text-paper">Sachin Yadav</h3>
              <p className="mt-5 max-w-prose text-base leading-relaxed text-paper/70">
                A research and development scientist with more than thirty years in agricultural
                science and twenty-two patents to his name. He is a director of six companies with a
                combined group turnover above ₹500 crore, and has supported cancer research
                initiatives alongside that work.
              </p>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-paper/70">
                It is an unusual background for a lending business, and it is the reason this one
                exists: a group built on rural and agricultural enterprise spent three decades
                watching capable businesses and families in Pune, Baramati and Phaltan fail to get
                credit they could comfortably service, for reasons that had nothing to do with their
                ability to repay.
              </p>

              <dl className="mt-8 grid gap-6 border-t border-paper/15 pt-6 sm:grid-cols-4">
                {[
                  ['30+', 'Years in R&D'],
                  ['22', 'Patents held'],
                  ['6', 'Companies directed'],
                  ['₹500 Cr+', 'Group turnover'],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd>
                      <span className="fig block text-2xl font-semibold leading-none text-paper">
                        {v}
                      </span>
                      <span className="mt-2 block text-2xs uppercase tracking-[0.12em] text-paper/50">
                        {l}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>

      <Argument />

      {/* ── Offices ─────────────────────────────────────────────────────── */}
      <Section tone="deep" size="md">
        <div className="container-page">
          <SectionHead
            title="Three offices, one file"
            standfirst="Chinchwad handles Pune and PCMC. Baramati and Phaltan cover the agricultural and sugar-belt districts, where seasonal income needs a lender that assesses a year rather than a month."
          />
          <ul className="grid gap-px border border-ink/12 bg-ink/12 lg:grid-cols-3">
            {OFFICES.map((o) => (
              <li key={o.id} className="bg-paper p-7">
                <p className="mb-3 text-2xs uppercase tracking-[0.14em] text-gold">{o.kind}</p>
                <h3 className="font-display text-2xl text-ink">{o.locality}</h3>
                <address className="mt-3 text-base not-italic leading-relaxed text-ink-soft">
                  {o.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <a
                  href={o.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-brass-deep"
                >
                  Directions
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ContactStrip />
    </>
  )
}
