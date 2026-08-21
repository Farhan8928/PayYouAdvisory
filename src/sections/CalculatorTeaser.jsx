import { Section, SectionHead } from '../components/PageHeader.jsx'
import { ArrowRight } from '../components/Icon.jsx'
import EmiCalculator from '../widgets/EmiCalculator.jsx'

/**
 * The EMI calculator, on the homepage, in its compact form.
 *
 * It is here rather than only on its own page because "what would the EMI be"
 * is the second question every visitor has after "how much can I get", and
 * making them navigate for it loses a proportion of them. The compact variant
 * drops the amortisation chart, the year table and the prepayment model — those
 * live on /emi-calculator/, which is also a page that can rank on its own for a
 * very large search term.
 */
export default function CalculatorTeaser() {
  return (
    <Section id="calculators" size="lg">
      <div className="container-page">
        <SectionHead
          index="Before you borrow"
          title="Work out what it costs before anyone asks for your PAN."
          standfirst="Three calculators, all running entirely in your browser. Nothing you type is transmitted to us or to anyone else. There is no form, no OTP and no follow-up call you did not ask for."
        />

        <div>
          <EmiCalculator compact />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {[
            {
              href: '/emi-calculator/',
              title: 'EMI, in full',
              body: 'The amortisation chart, the year-by-year table, and what paying a little extra each month would actually save.',
            },
            {
              href: '/eligibility-calculator/',
              title: 'What you could borrow',
              body: 'Worked the way a lender does it, on the ratio of your total EMIs to your income, which is what usually decides it.',
            },
            {
              href: '/balance-transfer-calculator/',
              title: 'Is switching worth it?',
              body: 'Nets the processing fee, valuation and stamp duty off the saving. It frequently answers no, and says so.',
            },
          ].map((c) => (
            <a key={c.href} href={c.href} className="group card-hover p-6">
              <h3 className="h-card flex items-start justify-between gap-3 text-ink">
                {c.title}
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent transition-transform duration-300 ease-brand group-hover:translate-x-1" />
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.body}</p>
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}
