import { PRODUCT_BY_SLUG } from '../data/products.js'
import { AREA_BY_SLUG, AREAS, AREA_PRODUCT_SLUGS } from '../data/areas.js'
import { AREA_PHOTO } from '../data/photos.js'
import { CONTACT, PRIMARY_OFFICE, waLink } from '../data/site.js'
import { PARTNER_COUNT_CLAIM } from '../data/lenders.js'
import { telHref, pct } from '../lib/format.js'
import PageHeader, { Section, SectionHead } from '../components/PageHeader.jsx'
import SpecStrip from '../components/SpecStrip.jsx'
import Disclosure from '../components/Disclosure.jsx'
import ContactStrip from '../sections/ContactStrip.jsx'
import { Phone, Whatsapp, ArrowRight, Check, Pin } from '../components/Icon.jsx'

/**
 * The product x locality page. 112 of these are generated at build time.
 *
 * ── What keeps these out of doorway-page territory ─────────────────────────
 * The long note at the top of src/data/areas.js has the full argument, and this
 * page had to be rebuilt once to satisfy it. The first version rendered the
 * product's full feature grid, eligibility table and document checklist — all
 * identical across the sixteen localities, and all duplicated from the product
 * hub page. Measured, roughly one line in seven differed between
 * /business-loan-bhosari/ and /business-loan-baner/. That ratio is the
 * doorway-page signature no matter what the source comments claim.
 *
 * Three changes fixed it:
 *
 *   1. The generic blocks moved out. The features, the full eligibility table
 *      and the document checklist live on the hub, and this page links to them.
 *      That raises the unique proportion here and pushes internal link equity
 *      toward the page that should rank for the head term.
 *   2. `area.localNotes` and `area.lenderFit` were added — locality facts
 *      rather than product facts, so they differentiate all seven of an area's
 *      pages from all seven of every other area's at once.
 *   3. The relevance paragraph is rendered once. It was appearing twice: as the
 *      standfirst and again in the body, which is literal self-duplication on a
 *      page whose entire defence is that it is not duplicated.
 *
 * These pages deliberately carry **no FAQPage schema**. The canonical set of
 * questions lives on the product hub; offering the same six questions from 112
 * URLs competes with itself and looks exactly like what it would be.
 */
export default function ProductArea({ productSlug, areaSlug, trail }) {
  const p = PRODUCT_BY_SLUG[productSlug]
  const a = AREA_BY_SLUG[areaSlug]
  if (!p || !a) return null

  const siblings = AREA_PRODUCT_SLUGS.filter((s) => s !== productSlug).map((s) => PRODUCT_BY_SLUG[s])
  const nearby = AREAS.filter((x) => x.slug !== areaSlug && x.district === a.district).slice(0, 8)
  const localOffice = a.home || a.branch || a.registered

  return (
    <>
      <PageHeader
        eyebrow={`${a.name} · ${a.district} · ${a.pincodes.join(' / ')}`}
        title={`${p.name} in ${a.name}`}
        standfirst={a.relevance[p.slug]}
        trail={trail}
        photo={AREA_PHOTO[a.slug]}
        aside={
          <div className="glass p-7">
            <h2 className="mb-4 flex items-center gap-2 text-2xs font-semibold uppercase tracking-[0.14em] text-accent">
              <Pin className="h-3.5 w-3.5" />
              {localOffice ? 'We have an office here' : 'Serving this area from Chinchwad'}
            </h2>
            <address className="text-sm not-italic leading-relaxed text-paper/70">
              {PRIMARY_OFFICE.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <p className="fig mt-3 text-2xs text-paper/45">{CONTACT.hours}</p>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-paper/15 pt-5">
              <a href={telHref(CONTACT.landline)} className="btn-accent btn-sm">
                <Phone className="h-3.5 w-3.5" />
                <span className="fig">{CONTACT.landlineDisplay}</span>
              </a>
              <a
                href={waLink(`Hi PayYou Advisory, I am in ${a.name} and would like to check my eligibility for a ${p.name.toLowerCase()}. `)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp btn-sm"
              >
                <Whatsapp className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        }
      />

      {/* ── The local picture ───────────────────────────────────────────── */}
      <Section size="md">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead
              title={`Who borrows in ${a.name}, and why it matters`}
              className="mb-6"
            />
            <p className="prose-body">{a.profile}</p>

            {/* Three local specifics. Not product copy — these are things that
                are true about borrowing in this place, so they differentiate
                all seven of this area's pages from every other area's at once. */}
            <ul className="mt-7 border-t border-ink/12">
              {a.localNotes.map((note) => (
                <li key={note} className="flex gap-4 border-b border-ink/12 py-4">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-base leading-relaxed text-ink-soft">{note}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-ink/10 pt-6">
              <h3 className="mb-3 text-2xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Around here
              </h3>
              <ul className="flex flex-wrap gap-2">
                {a.landmarks.map((l) => (
                  <li key={l} className="border border-ink/15 px-3 py-1.5 text-sm text-ink-soft">
                    {l}
                  </li>
                ))}
                {a.pincodes.map((pin) => (
                  <li
                    key={pin}
                    className="fig border border-accent/40 bg-paper-deep px-3 py-1.5 text-sm text-ink-soft"
                  >
                    {pin}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <SpecStrip spec={p.spec} columns={4} layout="pair" />
            <Disclosure className="mt-6" />

            {/* Which kind of institution suits this locality's dominant
                borrower. Written per area — it is the most useful thing on the
                page and the part a competitor cannot copy from a template. */}
            <div className="mt-6 border border-ink/15 p-6">
              <h3 className="h-card text-ink">
                Which lenders fit {a.name}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{a.lenderFit}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                One branch on {a.landmarks[0]} gives you one credit policy and one answer. We hold{' '}
                {PARTNER_COUNT_CLAIM} of them, and for a {a.name} file the difference between the
                right lender and the wrong one is frequently approval versus decline, not{' '}
                {pct(0.25)} on the rate.
              </p>
              <a href="/lenders/" className="btn-ghost btn-sm mt-5">
                See the panel
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ── The generic detail, by reference ──────────────────────────────
          Deliberately a summary and a link rather than the full feature grid,
          eligibility table and document checklist. Those are identical across
          all sixteen localities and already live on the product hub; repeating
          them here duplicated the hub, buried the local content, and made these
          pages read as sixteen copies of one page. Linking instead raises the
          unique proportion of this page and sends internal link equity to the
          hub, which is the page that should rank for the head term. */}
      <Section tone="deep" size="md">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead
              title={`The ${p.name.toLowerCase()} itself`}
              standfirst={p.summary}
              className="mb-6"
            />
            <p className="text-base leading-relaxed text-ink-soft">
              Full eligibility criteria, the document checklist, the rate drivers and the questions
              people actually ask are on the {p.name.toLowerCase()} page. They are the same
              wherever in Pune you are. What differs by locality is everything above.
            </p>
            <a href={`/${p.slug}/`} className="btn-primary mt-6">
              {p.name} — full detail
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="lg:col-span-7">
            <h3 className="mb-4 text-2xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
              In short
            </h3>
            {/* Headlines only. The explanatory sentence under each feature is
                on the hub, where it is written once; repeating it here put the
                same 120 words on all sixteen of this product's locality pages
                and pushed the local content below the fold. */}
            <ul className="border-t border-ink/12">
              {p.features.map((f) => (
                <li key={f.title} className="flex gap-3 border-b border-ink/12 py-3">
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                  <span className="text-base font-medium leading-relaxed text-ink">{f.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Eligibility, by reference ─────────────────────────────────────
          The calculator itself is not embedded here. It was, and it was the
          single largest block of text identical across all 112 of these pages —
          about a quarter of the body, saying the same thing everywhere. On a
          page whose entire justification is that it is locally specific, that
          was diluting both the ranking signal and the reader's attention. The
          tool has its own page, which is also the page that ranks for
          "eligibility calculator"; this is a prompt and a door. */}
      <Section tone="deep" size="sm">
        <div className="container-page grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-2xl text-ink">Before you call, get a rough figure</h2>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-ink-soft">
              Our eligibility calculator works it the way a lender does, on your income less the
              EMIs you already pay, which is what usually decides the answer. It runs in your
              browser and asks for no name, no number and no OTP.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <a href="/eligibility-calculator/" className="btn-primary">
              Check eligibility
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={telHref(CONTACT.landline)} className="btn-ghost">
              <Phone className="h-4 w-4" />
              <span className="fig">{CONTACT.landlineDisplay}</span>
            </a>
          </div>
        </div>
      </Section>

      {/* ── Internal linking ────────────────────────────────────────────── */}
      <Section size="sm">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-5 text-2xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
              Other products in {a.name}
            </h2>
            <ul className="border-t border-ink/12">
              {siblings.map((s) => (
                <li key={s.slug} className="border-b border-ink/12">
                  <a
                    href={`/${s.slug}-${a.slug}/`}
                    className="group flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="text-base text-ink-soft transition-colors group-hover:text-ink">
                      {s.name} in {a.name}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-2xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
              {p.name} nearby
            </h2>
            <ul className="border-t border-ink/12">
              {nearby.map((x) => (
                <li key={x.slug} className="border-b border-ink/12">
                  <a
                    href={`/${p.slug}-${x.slug}/`}
                    className="group flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="text-base text-ink-soft transition-colors group-hover:text-ink">
                      {p.name} in {x.name}
                    </span>
                    <span className="fig shrink-0 text-2xs text-ink-faint">{x.pincodes[0]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <ContactStrip />
    </>
  )
}

/** Lower-case the first character unless it begins with a proper noun or acronym. */
function lowerFirst(s) {
  if (!s) return s
  const first = s.split(' ')[0]
  // "MIDC", "PCMC", "NRI" and place names keep their capital.
  if (first.length > 1 && first === first.toUpperCase()) return s
  if (/^(Salaried|Pimpri|Pune|Bhosari|Chakan|MHADA|PAN|ITR|GST|Udyam|OEM|IT|LAP|NA)/.test(s)) return s
  return s.charAt(0).toLowerCase() + s.slice(1)
}
