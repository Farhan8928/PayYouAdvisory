import { HOME_FAQS } from '../data/faqs.js'
import Accordion from '../components/Accordion.jsx'
import { Section, SectionHead } from '../components/PageHeader.jsx'
import { ArrowRight } from '../components/Icon.jsx'

/**
 * Six questions on the homepage, out of the twenty on /faq/.
 *
 * The homepage deliberately carries no `FAQPage` structured data: Google shows
 * one FAQ rich result per page and the canonical set is /faq/, so offering the
 * same six questions from two URLs competes with itself for nothing.
 *
 * The six chosen are the awkward ones — what a DSA charges, whether approval
 * can be guaranteed, what happens with a poor credit score. A FAQ that only
 * answers comfortable questions is marketing copy in a different shape, and
 * every reader can tell.
 */
export default function FaqHome() {
  return (
    <Section id="faq" tone="deep" size="lg">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHead
            index="Straight answers"
            title="The questions people ask on the phone."
            className="mb-6"
          />
          <p className="max-w-prose text-base leading-relaxed text-ink-soft">
            Including the ones a broker would rather you did not ask. Twenty more, on eligibility,
            costs, timelines and what happens if you miss an EMI, are on the questions page.
          </p>
          <a href="/resources/" className="btn-ghost mt-7">
            All twenty answers
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="lg:col-span-8">
          <Accordion items={HOME_FAQS} />
        </div>
      </div>
    </Section>
  )
}
