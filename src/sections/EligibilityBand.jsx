import { Section, SectionHead } from '../components/PageHeader.jsx'
import EligibilityCalculator from '../widgets/EligibilityCalculator.jsx'
import { ArrowRight, Check } from '../components/Icon.jsx'

/**
 * The eligibility calculator, immediately under the hero.
 *
 * It used to live *inside* the hero, in a glass panel beside the headline. That
 * was the single biggest reason the hero's call-to-action fell below the fold:
 * a four-field calculator with a read-out is 400px tall and nothing shrinks it.
 *
 * Moving it one section down costs almost nothing — a reader who wants the
 * figure scrolls a hundred pixels and finds it — and it buys back the entire
 * hero. It also gets more room here than it ever had up there, which is why the
 * full version renders rather than the compact one.
 *
 * ── Why it is here at all rather than on its own page ──────────────────────
 * "How much can I get?" is the question people actually arrive with. The
 * category convention is to answer it with a form that wants a mobile number
 * first. Answering it immediately, with no gate, converts slightly worse and
 * earns considerably more trust — and in a business where trust is the product,
 * that is the trade worth making.
 */
export default function EligibilityBand() {
  return (
    <Section id="eligibility" size="md">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <SectionHead
            index="Start here"
            title="What could you actually borrow?"
            className="mb-6"
          />
          <p className="prose-body">
            Worked the way a lender does it, on your income less the EMIs you already pay, which is
            what usually decides the answer rather than your salary.
          </p>

          <ul className="mt-7 space-y-3 border-t border-ink/10 pt-6">
            {[
              'No name, no mobile number, no OTP',
              'Runs entirely in your browser',
              'Nothing you type is transmitted anywhere',
            ].map((claim) => (
              <li key={claim} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {claim}
              </li>
            ))}
          </ul>

          <a href="/calculators/" className="btn-ghost btn-sm mt-7">
            All three calculators
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="lg:col-span-8">
          <EligibilityCalculator />
        </div>
      </div>
    </Section>
  )
}
