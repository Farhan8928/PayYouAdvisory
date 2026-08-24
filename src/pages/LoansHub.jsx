import { PRODUCTS } from '../data/products.js'
import PageHeader, { Section, SectionHead } from '../components/PageHeader.jsx'
import { SpecInline } from '../components/SpecStrip.jsx'
import Disclosure from '../components/Disclosure.jsx'
import ContactStrip from '../sections/ContactStrip.jsx'
import Process from '../sections/Process.jsx'
import { ArrowRight } from '../components/Icon.jsx'
import { pct, inrCompact } from '../lib/format.js'

/**
 * The loans hub: every product in one comparison, plus a table that puts the
 * eight of them in a single column of figures.
 *
 * The comparison table is the page's reason to exist. It is the one view a
 * reader cannot assemble from eight separate product pages, and it answers the
 * question that actually brings people to a broker — *which of these is the
 * right instrument for what I need?* — rather than the question a lender's site
 * answers, which is *would you like this product?*
 */
export default function LoansHub({ trail }) {
  return (
    <>
      <PageHeader
        eyebrow="Every product, side by side"
        title="Which of these is the right instrument?"
        standfirst="Eight products, four of them secured. The cheapest money is almost always secured on something, and the fastest is almost always the dearest. Below is the whole panel in one column of figures."
        trail={trail}
        photo="meeting-india"
      />

      {/* ── The comparison ──────────────────────────────────────────────── */}
      <Section size="md">
        <div className="container-page">
          <SectionHead
            title="All eight, in one table"
            standfirst="Figures are the lowest across our partner panel, not offers. Where a lender has not published a rate, the table says what it depends on instead of guessing."
          />

          <div className="scroll-x">
            <table className="table-doc min-w-[52rem]">
              <caption className="sr-only">
                Comparison of every loan and protection product PayYou Advisory places.
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[22%]">Product</th>
                  <th scope="col">Security</th>
                  <th scope="col" className="text-right">From</th>
                  <th scope="col" className="text-right">Up to</th>
                  <th scope="col">Tenure</th>
                  <th scope="col">Best for</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => (
                  <tr key={p.slug}>
                    <th scope="row" className="border-b border-ink/10 py-3.5 pr-4 text-left align-top normal-case tracking-normal">
                      <a href={`/${p.slug}/`} className="h-card text-ink transition-colors hover:text-accent-deep">
                        {p.name}
                      </a>
                    </th>
                    <td className="text-2xs uppercase tracking-[0.1em] text-ink-faint">
                      {p.categoryLabel}
                    </td>
                    <td className="fig text-right font-medium">
                      {p.spec.rateFrom ? pct(p.spec.rateFrom) : '—'}
                    </td>
                    <td className="fig text-right font-medium">
                      {p.spec.amountMax ? inrCompact(p.spec.amountMax) : '—'}
                    </td>
                    <td className="fig">{p.spec.tenure}</td>
                    <td className="text-sm text-ink-soft">{bestFor[p.slug]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Disclosure className="mt-8" />
        </div>
      </Section>

      {/* ── Editorial index ─────────────────────────────────────────────── */}
      <Section tone="deep" size="md">
        <div className="container-page">
          <SectionHead title="In more detail" />
          <ul className="border-t border-ink/15">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <a
                  href={`/${p.slug}/`}
                  className="group grid gap-x-8 gap-y-3 border-b border-ink/15 py-8 lg:grid-cols-11"
                >
                  <div className="lg:col-span-4">
                    <h3 className="text-2xl text-ink">{p.name}</h3>
                    <p className="mt-1 text-2xs uppercase tracking-[0.12em] text-accent">
                      {p.categoryLabel}
                    </p>
                  </div>
                  <div className="lg:col-span-6">
                    <p className="max-w-prose text-base leading-relaxed text-ink-soft">{p.summary}</p>
                    <div className="mt-3">
                      <SpecInline spec={p.spec} />
                    </div>
                  </div>
                  <span className="flex items-start lg:col-span-1 lg:justify-end">
                    <ArrowRight className="h-5 w-5 text-accent transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Process />
      <ContactStrip />
    </>
  )
}

/**
 * One line each on what the product is genuinely the right answer to.
 * Kept here rather than in products.js because it only makes sense in the
 * context of the comparison — it is a relative judgement, not a product fact.
 */
const bestFor = {
  'personal-loan': 'A requirement that will not wait, where you have nothing to pledge',
  'business-loan': 'Stock, machinery or expansion, without giving up equity',
  'home-loan': 'Buying or building, the cheapest borrowing available to an individual',
  'loan-against-property': 'Raising a large sum against property you keep using',
  'car-loan': 'A vehicle, at a rate a personal loan cannot match',
  'gold-loan': 'A short, urgent requirement, with a damaged or thin credit file',
  'working-capital-loan': 'A stock-and-receivables cycle, or rent from let commercial property',
  insurance: 'Making sure a loan never becomes your family’s problem',
}
