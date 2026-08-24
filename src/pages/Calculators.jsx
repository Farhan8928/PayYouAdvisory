import PageHeader, { Section, SectionHead } from '../components/PageHeader.jsx'
import ContactStrip from '../sections/ContactStrip.jsx'
import EmiCalculator from '../widgets/EmiCalculator.jsx'
import EligibilityCalculator from '../widgets/EligibilityCalculator.jsx'
import BalanceTransferCalculator from '../widgets/BalanceTransferCalculator.jsx'
import SipCalculator from '../widgets/SipCalculator.jsx'
import DepositCalculator from '../widgets/DepositCalculator.jsx'
import Disclosure from '../components/Disclosure.jsx'
import { ArrowRight } from '../components/Icon.jsx'
import { flatToReducing } from '../lib/finance.js'
import { pct } from '../lib/format.js'

/**
 * Calculator pages.
 *
 * One component, four routes: the hub and three single-tool pages. Each tool
 * gets its own URL because each is a large, distinct search term in its own
 * right — "EMI calculator" alone is one of the highest-volume financial queries
 * in India — and a page that ranks for it brings in readers who have not yet
 * decided they need a broker at all.
 *
 * Every one of them computes in the browser and sends nothing anywhere. That is
 * stated on each page, because in a category where every competing calculator
 * is a lead-capture form in disguise, it is both true and a differentiator.
 */
export default function Calculators({ tool = 'all', trail }) {
  const meta = TOOLS[tool] ?? TOOLS.all

  return (
    <>
      <PageHeader
        eyebrow="Runs entirely in your browser"
        title={meta.title}
        standfirst={meta.standfirst}
        trail={trail}
        photo="calculator-papers"
      />

      {(tool === 'all' || tool === 'emi' || meta.initial) && (
        <Section size="md">
          <div className="container-page">
            {tool === 'all' ? <SectionHead title="EMI, and what it really costs" /> : null}
            {/* `initial` opens the calculator on figures typical of that
                product, so /home-loan-emi-calculator/ starts at a twenty-year
                tenure rather than at a personal loan's five. The reader arriving
                from that search should not have to reset three sliders before
                the page is about the thing they searched for. */}
            <EmiCalculator initial={meta.initial} />
          </div>
        </Section>
      )}

      {(tool === 'all' || tool === 'eligibility') && (
        <Section tone="deep" size="md">
          <div className="container-page">
            {tool === 'all' ? (
              <SectionHead title="What a lender would lend you" />
            ) : null}
            <EligibilityCalculator />
          </div>
        </Section>
      )}

      {(tool === 'all' || tool === 'bt') && (
        <Section size="md">
          <div className="container-page">
            {tool === 'all' ? (
              <SectionHead title="Whether switching is worth the cost" />
            ) : null}
            <BalanceTransferCalculator />
          </div>
        </Section>
      )}

      {(tool === 'all' || tool === 'sip') && (
        <Section tone="deep" size="md">
          <div className="container-page">
            {tool === 'all' ? (
              <SectionHead title="What a monthly saving would grow to" />
            ) : null}
            <SipCalculator />
          </div>
        </Section>
      )}

      {(tool === 'all' || tool === 'fd') && (
        <Section size="md">
          <div className="container-page">
            {tool === 'all' ? <SectionHead title="What a deposit matures at" /> : null}
            <DepositCalculator />
          </div>
        </Section>
      )}

      {/* ── The flat-rate trap ──────────────────────────────────────────── */}
      <Section tone="dark" size="md">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead
              title="One number worth knowing: flat versus reducing"
              standfirst="Vehicle and consumer finance is still sometimes quoted at a “flat” rate, which charges interest on the whole original amount for the entire tenure, even though you have repaid most of it. It sounds far cheaper than it is."
              invert
              className="mb-0"
            />
          </div>

          <div className="lg:col-span-7">
            <div className="scroll-x">
              <table className="table-doc min-w-[30rem]">
                <caption className="sr-only">
                  Flat interest rates and their reducing-balance equivalents, by tenure.
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="border-paper/30 text-paper/50">Quoted flat rate</th>
                    <th scope="col" className="border-paper/30 text-right text-paper/50">Over 3 years</th>
                    <th scope="col" className="border-paper/30 text-right text-paper/50">Over 5 years</th>
                    <th scope="col" className="border-paper/30 text-right text-paper/50">Over 7 years</th>
                  </tr>
                </thead>
                <tbody>
                  {[6, 8, 9, 10, 12].map((flat) => (
                    <tr key={flat}>
                      <th
                        scope="row"
                        className="fig border-b border-paper/15 py-3.5 pr-4 text-left align-top text-[0.9375rem] font-semibold normal-case tracking-normal text-paper"
                      >
                        {pct(flat)}
                      </th>
                      {[36, 60, 84].map((m) => (
                        <td key={m} className="fig border-paper/15 text-right font-medium text-accent">
                          {pct(flatToReducing(flat, m))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 max-w-prose text-sm leading-relaxed text-paper/60">
              Read the right-hand columns. A “9% flat” loan over five years costs roughly the same as
              a 16% reducing-balance one. If a quote does not say which basis it is on, ask, and if
              the answer is flat, ask for the reducing equivalent in writing before you sign.
            </p>
          </div>
        </div>
      </Section>

      {tool !== 'all' ? (
        <Section size="sm">
          <div className="container-page">
            <h2 className="mb-6 h-card text-ink">The other calculators</h2>
            <ul className="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-3">
              {Object.entries(TOOLS)
                .filter(([k]) => k !== tool && k !== 'all')
                .map(([k, t]) => (
                  <li key={k}>
                    <a
                      href={t.href}
                      className="group flex h-full items-baseline justify-between gap-3 bg-paper p-6 transition-colors hover:bg-paper-deep"
                    >
                      <span className="h-card text-ink">{t.short}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              <li>
                <a
                  href="/calculators/"
                  className="group flex h-full items-baseline justify-between gap-3 bg-paper p-6 transition-colors hover:bg-paper-deep"
                >
                  <span className="h-card text-ink">All three</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            </ul>
          </div>
        </Section>
      ) : null}

      <Section size="sm">
        <div className="container-page">
          <Disclosure>
            <strong className="font-semibold text-ink">These are estimates, not quotations.</strong>{' '}
            They compute standard reducing-balance mathematics on the figures you enter and exclude
            processing fees, insurance premiums, statutory charges and any lender-specific levy. What
            a lender will actually offer depends on your credit profile, your income, your existing
            obligations and, on a secured loan. The property. PayYou Advisory is a Direct Selling
            Agent and does not set rates.
          </Disclosure>
        </div>
      </Section>

      <ContactStrip />
    </>
  )
}

const TOOLS = {
  all: {
    title: 'Do the arithmetic before anyone asks for your PAN.',
    standfirst:
      'Every figure you type stays in your browser. There is no form, no OTP, and no follow-up call you did not ask for.',
  },
  emi: {
    short: 'EMI calculator',
    href: '/emi-calculator/',
    title: 'What the EMI is, and what the loan actually costs.',
    standfirst:
      'The monthly figure, the total interest at the same size, the year-by-year split, and what paying a little extra each month would save. Total interest is promoted deliberately: choosing a tenure on the EMI alone is how people pay for the same thing twice.',
  },
  eligibility: {
    short: 'Eligibility',
    href: '/eligibility-calculator/',
    title: 'What could you actually borrow?',
    standfirst:
      'Worked the way a lender does it, on the ratio of your total EMIs to your net income. Most applicants are limited by the loans they already carry rather than by their salary, and this shows you by how much.',
  },
  'emi-home': {
    short: 'Home loan EMI',
    href: '/home-loan-emi-calculator/',
    initial: { amount: 5000000, rate: 8.6, months: 240 },
    title: 'What a home loan really costs over twenty years.',
    standfirst:
      'Opens on a twenty-year tenure, because that is what a home loan is. Look at the total interest before you choose the tenure: stretching it to reduce the instalment adds more than most people expect, and the year-by-year table below shows how little of an early EMI touches the principal.',
  },
  'emi-personal': {
    short: 'Personal loan EMI',
    href: '/personal-loan-emi-calculator/',
    initial: { amount: 500000, rate: 14, months: 48 },
    title: 'What a personal loan costs across a short tenure.',
    standfirst:
      'Unsecured borrowing is priced well above secured, and the tenures are short, so the total interest builds faster than on any other product here. Move the tenure slider and watch the two figures move in opposite directions.',
  },
  'emi-business': {
    short: 'Business loan EMI',
    href: '/business-loan-emi-calculator/',
    initial: { amount: 2500000, rate: 12.5, months: 60 },
    title: 'What a business facility costs to service.',
    standfirst:
      'The figure to test here is whether the business can carry this EMI alongside everything it already services. Lenders assess exactly that, and a file usually fails on total obligations rather than on turnover.',
  },
  sip: {
    short: 'SIP calculator',
    href: '/sip-calculator/',
    title: 'What would a monthly saving grow to?',
    standfirst:
      'Arithmetic on an assumption you choose, shown alongside a soberer one, because a market return is not a contracted rate. The amount you actually put in is displayed at the same size as the projection, deliberately.',
  },
  fd: {
    short: 'FD calculator',
    href: '/fd-calculator/',
    title: 'What a deposit matures at, and what it really yields.',
    standfirst:
      'Fixed and recurring deposits side by side. A recurring deposit at the same quoted rate yields noticeably less, because each instalment earns only for the time remaining, and this shows by how much.',
  },
  bt: {
    short: 'Balance transfer',
    href: '/balance-transfer-calculator/',
    title: 'Would switching lender actually save you anything?',
    standfirst:
      'Nets the processing fee, the fresh valuation and the stamp duty off the saving, instead of comparing two rates and calling the lower one a win. It frequently answers no, and says so.',
  },
}
