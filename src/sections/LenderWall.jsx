import { BANKS, NBFCS, PANEL_ARGUMENT, PARTNER_COUNT_CLAIM } from '../data/lenders.js'
import { Section, SectionHead } from '../components/PageHeader.jsx'
import LogoMarquee from '../components/LogoMarquee.jsx'
import { ArrowRight, Check } from '../components/Icon.jsx'

/**
 * The partner wall.
 *
 * ── Making twelve mismatched logos read as one set ─────────────────────────
 * The source files are a genuine mess — twelve resolutions, some transparent
 * and some not, three with a solid coloured block baked into the artwork.
 *
 * The first attempt reconciled them by rendering the whole wall greyscale, with
 * colour restored on hover. It worked, and it was solving the wrong problem:
 * bank recognition *is* the persuasion on this wall. Someone scanning it is
 * looking for HDFC's red or SBI's blue, and desaturating them hides the only
 * thing they came to see. A tidy wall nobody recognises is worse than a
 * slightly uneven one they do.
 *
 * Consistency now comes from the tile rather than from the mark:
 * `scripts/fetch-logos.mjs` trims each logo of its dead space and centres it in
 * an identical box, and every tile is the same white card at the same padding.
 * They align optically even though their source files do not.
 *
 * The band scrolls — see LogoMarquee. Twelve logos sitting still in a six-wide
 * grid is a table of contents; twelve moving past is a business with twelve
 * relationships.
 *
 * Five partners have no logo published on the client's own site. They are named
 * in the index below rather than represented by an empty tile.
 */
export default function LenderWall({ full = false }) {
  return (
    <Section id="lenders" tone="deep" size="lg">
      <div className="container-page">
        <SectionHead
          index="The panel"
          title={`${PARTNER_COUNT_CLAIM} lenders. We apply to one.`}
          standfirst="A single lender gives you one credit policy and one answer. The same file, the same person, the same income, the same property: approved at one institution and declined at another. The panel is not a badge; it is the product."
        />

        {/* ── The wall ─────────────────────────────────────────────────── */}
      </div>

      {/* Full-bleed, deliberately: a marquee that stops at the container edge
          reads as a widget in a box. Running it to the edges of the viewport is
          what makes it read as a band the page is passing through. */}
      <LogoMarquee />

      <div className="container-page">
        <p className="mt-5 text-2xs leading-relaxed text-ink-faint">
          Bank and NBFC names and marks are the property of their respective owners and appear here
          as factual references to institutions PayYou Advisory places business with. No endorsement
          of this website by them is implied.
        </p>

        {/* ── The argument, and the full index ─────────────────────────── */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <LenderGroup title="Banks" lenders={BANKS} full={full} />
            <LenderGroup
              title="NBFCs & housing finance"
              lenders={NBFCS}
              full={full}
              className="mt-10"
            />
          </div>

          <div className="lg:col-span-5">
            <ul className="grid gap-4">
              {PANEL_ARGUMENT.map((a) => (
                <li key={a.title} className="card p-6">
                  <h3 className="h-card text-ink">{a.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{a.body}</p>
                </li>
              ))}
            </ul>

            {!full ? (
              <a href="/lenders/" className="btn-primary mt-6 w-full">
                What each lender is good for
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
      <h3 className="mb-4 flex items-baseline gap-3 text-2xs font-bold uppercase tracking-[0.16em] text-accent">
        {title}
        <span className="fig text-ink-faint">{lenders.length}</span>
      </h3>

      <ul className="border-t border-ink/12">
        {lenders.map((l) => (
          <li key={l.name} className="grid gap-x-6 gap-y-1 border-b border-ink/12 py-3.5 sm:grid-cols-12">
            <span className="flex items-center gap-2.5 text-base font-bold text-ink sm:col-span-5">
              <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
              {l.name}
            </span>
            {full ? (
              <span className="text-sm leading-relaxed text-ink-soft sm:col-span-7">{l.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
