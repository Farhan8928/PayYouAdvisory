import PageHeader, { Section, SectionHead } from '../components/PageHeader.jsx'
import Accordion from '../components/Accordion.jsx'
import SpecStrip from '../components/SpecStrip.jsx'
import ContactStrip from '../sections/ContactStrip.jsx'
import { VARIANT_BY_SLUG, variantsFor, VARIANT_RATE_NOTE } from '../data/variants.js'
import { PRODUCT_BY_SLUG } from '../data/products.js'
import { ArrowRight } from '../components/Icon.jsx'

/**
 * A product variant page — "Personal Loan for Doctors", "Flexi Hybrid",
 * "Business Loan without ITR".
 *
 * ── Why this is not the product page with a different heading ──────────────
 * Because that is what a doorway page is, and there are eighty of these. The
 * layout below deliberately gives the largest, earliest block on the page to
 * `angle` — the one claim that is true of this variant and of nothing else in
 * its family — and renders `points`, `eligibility`, `documents` and `faqs`
 * entirely from the variant's own data. Nothing is inherited from the parent
 * product except the breadcrumb and the closing contact strip.
 *
 * `npm run audit:dupes` compares every one of these against a sibling with an
 * eight-word shingle and fails the build under 40% distinct, so the discipline
 * is enforced rather than trusted.
 *
 * ── Sibling links are on the page for a reason ─────────────────────────────
 * The "others in this family" block at the foot is not decoration. With a
 * family of twenty, a reader who lands on the wrong one from a search result
 * needs a route to the right one, and the internal linking is most of what
 * tells Google how the family is organised.
 */
export default function Variant({ slug, trail }) {
  const v = VARIANT_BY_SLUG[slug]
  const parent = PRODUCT_BY_SLUG[v.parent]
  const siblings = variantsFor(v.parent).filter((s) => s.slug !== v.slug)

  return (
    <>
      <PageHeader
        eyebrow={parent.name}
        title={v.name}
        standfirst={v.summary}
        trail={trail}
        photo={parent.photo ?? parent.slug}
      />

      {/* ── The claim that is only true here ──────────────────────────────
          First block on the page, deliberately. If a reader takes one thing
          from this page rather than from the product hub, it should be this. */}
      <Section tone="paper" size="md">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="rule-mark" />
            <p className="h-card text-ink">{v.tagline}</p>
            <p className="mt-5 text-lg leading-relaxed text-accent-deep">{v.angle}</p>
          </div>
          <div className="lg:col-span-7">
            {v.intro.map((para) => (
              <p key={para.slice(0, 40)} className="mb-5 text-base leading-relaxed text-ink-soft last:mb-0">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* ── What is specifically true of this variant ─────────────────── */}
      <Section tone="deep" size="md">
        <div className="container-page">
          <SectionHead title="What changes on this route" />
          <div className="grid grid-cols-1 gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2">
            {v.points.map((p) => (
              <div key={p.title} className="bg-paper p-7 sm:p-8">
                <h3 className="text-base font-bold text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Eligibility and documents ─────────────────────────────────── */}
      <Section tone="paper" size="md">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title="Who qualifies" className="mb-8" />
            <dl className="border-t border-ink/15">
              {v.eligibility.map((row) => (
                <div
                  key={row.criterion}
                  className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-ink/15 py-4 sm:grid-cols-12"
                >
                  <dt className="text-sm font-semibold text-ink sm:col-span-4">{row.criterion}</dt>
                  <dd className="text-sm leading-relaxed text-ink-soft sm:col-span-8">{row.detail}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-2xs leading-relaxed text-ink-faint">
              Indicative. Every lender sets its own floors, and we match your file to the ones you
              actually clear before anything is submitted.
            </p>
          </div>

          <div className="lg:col-span-5">
            <SectionHead title="What to keep ready" className="mb-8" />
            <ul className="border-t border-ink/15">
              {v.documents.map((d) => (
                <li key={d.label} className="border-b border-ink/15 py-4">
                  <span className="block text-sm font-semibold text-ink">{d.label}</span>
                  <span className="mt-1 block text-sm text-ink-soft">{d.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── The parent product's terms, in the same place on every variant ──
          A variant does not carry its own rate or ceiling. It is the same
          product underwritten differently, and inventing a separate set of
          numbers per variant is exactly how eighty pages of fiction get built. */}
      <SpecStrip spec={parent.spec} columns={4} layout="pair" />
      <Section tone="paper" size="sm">
        <p className="container-page max-w-prose text-sm leading-relaxed text-ink-soft">
          {VARIANT_RATE_NOTE}
        </p>
      </Section>

      {/* ── Questions specific to this variant ────────────────────────── */}
      <Section tone="deep" size="md">
        <div className="container-page">
          <SectionHead title="Questions people ask about this" />
          <Accordion items={v.faqs} />
        </div>
      </Section>

      {/* ── The rest of the family ────────────────────────────────────── */}
      <Section tone="paper" size="md">
        <div className="container-page">
          <SectionHead
            title={`Other ${parent.name.toLowerCase()} routes`}
            standfirst={`If this is not quite your situation, one of these usually is. Or start at the ${parent.name.toLowerCase()} overview.`}
          />
          <ul className="grid grid-cols-1 gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((s) => (
              <li key={s.slug}>
                <a
                  href={`/${s.slug}/`}
                  className="group flex h-full flex-col justify-between gap-4 bg-paper p-6 transition-colors hover:bg-paper-deep"
                >
                  <span>
                    <span className="block text-2xs uppercase tracking-[0.12em] text-ink-faint">
                      {s.group}
                    </span>
                    <span className="mt-2 block text-base font-bold text-ink">{s.name}</span>
                  </span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-accent">
                    Read this one
                    <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a href={`/${parent.slug}/`} className="btn-ghost btn-sm mt-8">
            All about {parent.name.toLowerCase()}s
          </a>
        </div>
      </Section>

      <ContactStrip />
    </>
  )
}
