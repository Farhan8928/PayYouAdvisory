import { BANKS, NBFCS, LENDERS, PANEL_ARGUMENT, PARTNER_COUNT_CLAIM } from '../data/lenders.js'
import { Section, SectionHead } from '../components/PageHeader.jsx'
import { ArrowRight } from '../components/Icon.jsx'

/**
 * The lender panel.
 *
 * ── Why there are still no logos ───────────────────────────────────────────
 * This is the one place a photograph or a logo would be wrong, and the reason
 * is legal rather than aesthetic. PayYou has no licence to reproduce HDFC's or
 * SBI's marks; a wall of borrowed logos implies an endorsement that a DSA
 * arrangement does not confer; and in practice it always ships as a row of
 * mismatched PNGs scraped at different resolutions, which is the single
 * clearest way a financial site announces that it is small.
 *
 * The names are set as type instead — in a moving ticker, which reads as
 * confidence rather than as a compliance compromise, and in a full index below
 * where each entry can carry a line about what that lender is genuinely good
 * for. A logo grid cannot do that, and it is the part a reader can use.
 */
export default function LenderWall({ full = false }) {
  return (
    <Section id="lenders" tone="dark" size="lg">
      {/* ── The ticker ──────────────────────────────────────────────────────
          Duplicated once so translating exactly -50% lands on an identical
          frame and the loop is seamless. Pauses on hover so a reader can
          actually read a name they spotted. Masked at both edges so the names
          fade rather than being sliced off. */}
      <div className="mask-fade-r mb-16 overflow-hidden border-y border-paper/12 py-5">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {LENDERS.map((l) => (
                <li key={l.name} className="flex items-center whitespace-nowrap px-7">
                  <span className="font-display text-2xl text-paper/70">{l.name}</span>
                  <span className="ml-7 h-1 w-1 rounded-full bg-brass/60" aria-hidden="true" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="container-page">
        <SectionHead
          index="02 — The panel"
          title={`${PARTNER_COUNT_CLAIM} lenders, and what each is good for.`}
          standfirst="A single lender gives you one credit policy and one answer. The same file — the same person, the same income, the same property — is approved at one institution and declined at another. The panel is not a badge; it is the product."
          invert
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <LenderGroup title="Banks" lenders={BANKS} full={full} />
            <LenderGroup title="NBFCs & housing finance" lenders={NBFCS} full={full} className="mt-12" />

            <p className="mt-8 border-t border-paper/12 pt-5 text-2xs leading-relaxed text-paper/45">
              Named partners as published by PayYou Advisory. Institution names appear as factual
              references to lenders we place business with; all trade marks belong to their owners
              and no endorsement of this site by them is implied.
            </p>
          </div>

          <div className="lg:col-span-5">
            <ul className="space-y-4" data-stagger>
              {PANEL_ARGUMENT.map((a, i) => (
                <li key={a.title} className="rounded-lg border border-paper/12 bg-paper/[0.04] p-6">
                  <span className="fig mb-3 block text-2xs tracking-[0.16em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="h-card text-paper">{a.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-paper/65">{a.body}</p>
                </li>
              ))}
            </ul>

            {!full ? (
              <a href="/lenders/" className="btn-ghost-invert mt-6 w-full">
                The full panel
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  )
}

function LenderGroup({ title, lenders, full, className = '' }) {
  return (
    <div className={className}>
      <h3 className="mb-5 flex items-baseline gap-3 text-2xs font-bold uppercase tracking-[0.16em] text-gold">
        {title}
        <span className="fig text-paper/30">{lenders.length}</span>
      </h3>

      <ul className="border-t border-paper/12">
        {lenders.map((l) => (
          <li
            key={l.name}
            className="group grid gap-x-6 gap-y-1 border-b border-paper/12 py-4 transition-colors duration-300 hover:bg-paper/[0.04] sm:grid-cols-12"
          >
            <span className="font-display text-xl text-paper transition-colors group-hover:text-brass sm:col-span-5">
              {l.name}
            </span>
            {full ? (
              <span className="text-sm leading-relaxed text-paper/55 sm:col-span-7">{l.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
