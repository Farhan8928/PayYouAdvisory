import { BANKS, NBFCS, PANEL_ARGUMENT, PARTNER_COUNT_CLAIM } from '../data/lenders.js'
import { Section, SectionHead } from '../components/PageHeader.jsx'
import LogoMarquee from '../components/LogoMarquee.jsx'
import { ArrowRight, Check, ChevronRight } from '../components/Icon.jsx'

/**
 * IDFC FIRST Bank inspired Partner & Network Showcase:
 * - Full-bleed animated logo marquee
 * - Comparison breakdowns between PSU/Private Banks and Specialized NBFCs
 * - Transparent partner disclosure note
 */

export default function LenderWall({ full = false }) {
  return (
    <Section id="lenders" tone="deep" size="lg" className="py-14 sm:py-20">
      <div className="container-page">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rule-mark" />
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-2xs font-extrabold uppercase tracking-wider text-accent-light">
                Institutional Panel
              </span>
            </div>
            <h2 className="h-section text-ink">
              {PARTNER_COUNT_CLAIM} Partner Lenders. One Single Application.
            </h2>
            <p className="mt-2 max-w-2xl text-base text-ink-soft">
              A single institution gives you one credit policy and one answer. We compare parameters across 25+ partner banks and housing finance corporations to secure your sanction.
            </p>
          </div>
          <a href="/lenders/" className="btn-text text-accent flex items-center gap-1 font-bold">
            View full partner matrix
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Full-bleed animated marquee */}
      <div className="my-6">
        <LogoMarquee />
      </div>

      <div className="container-page">
        <p className="mt-4 text-2xs leading-relaxed text-ink-faint">
          Bank and NBFC marks and names are properties of their respective institutions and appear here as factual reference to lending partnerships. No exclusive endorsement is implied.
        </p>

        {/* Breakdown of Institutional Partners */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <LenderGroup title="Leading Private &amp; PSU Banks" lenders={BANKS} full={full} />
            <LenderGroup
              title="Specialized NBFCs &amp; Housing Finance"
              lenders={NBFCS}
              full={full}
              className="mt-10"
            />
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-4">
                Why Compare Through an Advisory?
              </h3>
              {PANEL_ARGUMENT.map((a) => (
                <div key={a.title} className="card p-6 border border-ink/10 shadow-sm hover:shadow-card transition-all">
                  <h4 className="h-card text-ink">{a.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.body}</p>
                </div>
              ))}

              {!full ? (
                <a href="/lenders/" className="btn-primary mt-6 w-full flex items-center justify-center gap-2">
                  <span>How each lender assesses files</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function LenderGroup({ title, lenders, full, className = '' }) {
  return (
    <div className={className}>
      <h3 className="mb-4 flex items-baseline gap-3 text-2xs font-bold uppercase tracking-[0.16em] text-accent">
        {title}
        <span className="fig text-ink-faint">({lenders.length} Partners)</span>
      </h3>

      <ul className="rounded-2xl border border-ink/10 bg-paper overflow-hidden shadow-sm">
        {lenders.map((l, index) => (
          <li
            key={l.name}
            className={`grid gap-x-6 gap-y-1 p-4 transition-colors hover:bg-paper-deep sm:grid-cols-12 ${
              index !== lenders.length - 1 ? 'border-b border-ink/8' : ''
            }`}
          >
            <span className="flex items-center gap-2.5 text-sm font-bold text-ink sm:col-span-6">
              <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
              {l.name}
            </span>
            <span className="text-xs leading-relaxed text-ink-soft sm:col-span-6">
              {l.note}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
