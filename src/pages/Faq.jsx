import { FAQ_GROUPS, ALL_FAQS } from '../data/faqs.js'
import { PRODUCTS } from '../data/products.js'
import Accordion from '../components/Accordion.jsx'
import PageHeader, { Section } from '../components/PageHeader.jsx'
import ContactStrip from '../sections/ContactStrip.jsx'
import { ArrowRight } from '../components/Icon.jsx'

/**
 * The canonical questions page.
 *
 * This is the only page carrying `FAQPage` structured data for the site-level
 * questions — the homepage renders six of the same items without schema, and
 * the 112 locality pages carry none. Google surfaces one FAQ rich result per
 * page, and offering the same questions from several URLs is competing with
 * yourself for nothing.
 *
 * The per-product questions stay on their product pages, where they have their
 * own `FAQPage` block and where the intent that brought the reader actually
 * matches. They are linked from the bottom of this page rather than duplicated
 * into it.
 */
export default function Faq({ trail }) {
  return (
    <>
      <PageHeader
        eyebrow={`${ALL_FAQS.length} questions`}
        title="Straight answers, including the awkward ones."
        standfirst="What a broker charges, whether approval can be guaranteed, what happens with a poor credit score, and what actually delays a file. If a question you have is not here, the phone is answered six days a week."
        trail={trail}
        photo="review-documents"
      />

      {FAQ_GROUPS.map((group, i) => (
        <Section key={group.group} tone={i % 2 === 0 ? 'paper' : 'deep'} size="md">
          <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="fig mb-3 block text-2xs tracking-[0.16em] text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="rule-mark" />
              <h2 className="h-section text-ink">{group.group}</h2>
              <p className="fig mt-4 text-2xs text-ink-faint">
                {group.items.length} question{group.items.length === 1 ? '' : 's'}
              </p>
            </div>

            <div className="lg:col-span-8">
              <Accordion items={group.items} defaultOpen={i === 0 ? 0 : -1} />
            </div>
          </div>
        </Section>
      ))}

      {/* ── Per-product questions ───────────────────────────────────────── */}
      <Section size="sm">
        <div className="container-page">
          <h2 className="mb-2 h-card text-ink">
            Questions about a specific product
          </h2>
          <p className="mb-6 max-w-prose text-sm leading-relaxed text-ink-soft">
            Each product page carries its own set — eligibility, documents, rates and the traps
            particular to that instrument.
          </p>
          <ul className="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <a
                  href={`/${p.slug}/#faq`}
                  className="group flex h-full items-baseline justify-between gap-3 bg-paper p-5 transition-colors hover:bg-paper-deep"
                >
                  <span className="text-base font-semibold text-ink">{p.name}</span>
                  <span className="fig shrink-0 text-2xs text-ink-faint">{p.faqs.length}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href="/loans/" className="btn-ghost mt-8">
            Compare every product
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Section>

      <ContactStrip />
    </>
  )
}
