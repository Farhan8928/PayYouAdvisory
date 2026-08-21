import { PRODUCTS } from '../data/products.js'
import { SpecInline } from '../components/SpecStrip.jsx'
import { Section, SectionHead } from '../components/PageHeader.jsx'
import { ArrowRight } from '../components/Icon.jsx'
import Photo from '../components/Photo.jsx'

/**
 * The product grid.
 *
 * ── The layout ─────────────────────────────────────────────────────────────
 * Deliberately not eight identical cards in a four-by-two grid. The first two —
 * the two products that carry most of the business — get a wide, image-led
 * treatment; the remaining six run three-up beneath them. An asymmetric grid
 * both establishes a hierarchy the reader can use and stops the page reading as
 * a template, which eight equal boxes always do.
 *
 * ── What each card carries ─────────────────────────────────────────────────
 * A photograph, the name, one honest sentence, and — always — the specification
 * strip in tabular mono. That last part is the thing competitors leave out: a
 * reader can run their eye down a column of rates and tenures and compare eight
 * products in a few seconds, instead of opening eight pages of adjectives.
 *
 * The whole card is the link. On a phone that is a target the size of a
 * postcard rather than a "Know more" the width of a thumbnail.
 */
export default function ProductList() {
  const [lead, second, ...rest] = PRODUCTS

  return (
    <Section id="products" size="lg">
      <div className="container-page">
        <SectionHead
          index="01 — What we place"
          title="Eight products, and what each one is actually for."
          standfirst="Rates and limits below are the lowest across our partner panel, not offers. Where a lender has not published a figure we say what it depends on rather than invent one."
        />

        {/* Two wide cards. */}
        <div className="grid gap-6 lg:grid-cols-2" data-stagger>
          {[lead, second].map((p) => (
            <FeatureCard key={p.slug} product={p} />
          ))}
        </div>

        {/* Six standard cards. */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {rest.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function FeatureCard({ product: p }) {
  return (
    <a href={`/${p.slug}/`} className="group card-hover flex flex-col overflow-hidden">
      <Photo
        name={p.slug}
        ratio="16 / 9"
        zoom
        sizes="(min-width: 1024px) 40vw, 92vw"
        className="photo-rule"
      >
        <span className="absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/25 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
          <span>
            <span className="fig block text-2xs tracking-[0.16em] text-gold">{p.index}</span>
            <span className="mt-1.5 block font-display text-3xl leading-none text-paper">
              {p.name}
            </span>
          </span>
          <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper/25 bg-paper/10 backdrop-blur-sm transition-all duration-300 ease-brand group-hover:border-brass group-hover:bg-brass">
            <ArrowRight className="h-4 w-4 text-paper transition-colors group-hover:text-ink-deep" />
          </span>
        </span>
      </Photo>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-brass-deep">
          {p.categoryLabel}
        </p>
        <p className="mt-3 flex-1 text-base leading-relaxed text-ink-soft">{p.summary}</p>
        <div className="mt-5 border-t border-ink/10 pt-4">
          <SpecInline spec={p.spec} />
        </div>
      </div>
    </a>
  )
}

function ProductCard({ product: p }) {
  return (
    <a href={`/${p.slug}/`} className="group card-hover flex flex-col overflow-hidden">
      <Photo
        name={p.slug}
        ratio="3 / 2"
        zoom
        sizes="(min-width: 1024px) 27vw, (min-width: 640px) 45vw, 92vw"
        className="photo-rule"
      >
        <span className="absolute inset-0 bg-gradient-to-t from-ink-deep/70 to-transparent" />
        <span className="fig absolute left-5 top-4 text-2xs tracking-[0.16em] text-gold">
          {p.index}
        </span>
      </Photo>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="h-card flex items-start justify-between gap-3 text-ink">
          {p.name}
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gold transition-transform duration-300 ease-brand group-hover:translate-x-1" />
        </h3>
        <p className="mt-1 text-2xs font-semibold uppercase tracking-[0.14em] text-brass-deep">
          {p.categoryLabel}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{p.summary}</p>
        <div className="mt-4 border-t border-ink/10 pt-3">
          <SpecInline spec={p.spec} />
        </div>
      </div>
    </a>
  )
}
