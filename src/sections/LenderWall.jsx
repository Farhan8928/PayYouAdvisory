import {
  BANKS,
  NBFCS,
  LENDERS_WITH_LOGOS,
  PANEL_ARGUMENT,
  PARTNER_COUNT_CLAIM,
} from '../data/lenders.js'
import { LOGOS, LOGO_BOX } from '../data/logos.gen.js'
import { Section, SectionHead } from '../components/PageHeader.jsx'
import { ArrowRight, Check } from '../components/Icon.jsx'

/**
 * The partner wall.
 *
 * ── Making twelve mismatched logos read as one set ─────────────────────────
 * The source files are a genuine mess — twelve resolutions, some transparent
 * and some not, three with a solid coloured block baked into the artwork.
 * `scripts/fetch-logos.mjs` handles half of it by trimming each mark of its
 * dead space and centring it in an identical box, so the grid aligns on the
 * logos rather than on their original bounding boxes.
 *
 * The rest is done here: every tile renders greyscale at 70% opacity and
 * returns to full colour on hover. That is the standard treatment for a partner
 * wall, and it is standard because nothing else reconciles a yellow L&T block
 * with a transparent SBI roundel. It has a useful second-order effect too — the
 * wall reads as quiet texture until you look at it, and resolves into
 * recognisable banks the moment you do.
 *
 * Five partners have no logo published on the client's own site. They are named
 * in the index below rather than represented by an empty tile.
 */
export default function LenderWall({ full = false }) {
  return (
    <Section id="lenders" tone="deep" size="lg">
      <div className="container-page">
        <SectionHead
          index="02 — The panel"
          title={`${PARTNER_COUNT_CLAIM} lenders. We apply to one.`}
          standfirst="A single lender gives you one credit policy and one answer. The same file — the same person, the same income, the same property — is approved at one institution and declined at another. The panel is not a badge; it is the product."
        />

        {/* ── The wall ─────────────────────────────────────────────────── */}
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4" data-stagger>
          {LENDERS_WITH_LOGOS.map((lender) => {
            const logo = LOGOS[lender.logo]
            if (!logo) return null
            return (
              <li key={lender.logo} className="logo-tile">
                <img
                  src={`/logos/${lender.logo}.png`}
                  srcSet={`/logos/${lender.logo}.png 1x, /logos/${lender.logo}@2x.png 2x`}
                  width={LOGO_BOX.width}
                  height={LOGO_BOX.height}
                  alt={lender.name}
                  loading="lazy"
                  decoding="async"
                />
              </li>
            )
          })}
        </ul>

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
            <ul className="grid gap-4" data-stagger>
              {PANEL_ARGUMENT.map((a, i) => (
                <li key={a.title} className="card p-6">
                  <span className="fig mb-3 block text-2xs tracking-[0.16em] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
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
