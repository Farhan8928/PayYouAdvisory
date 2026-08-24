import { useState } from 'react'
import EmiCalculator from '../widgets/EmiCalculator.jsx'
import EligibilityCalculator from '../widgets/EligibilityCalculator.jsx'
import SipCalculator from '../widgets/SipCalculator.jsx'
import DepositCalculator from '../widgets/DepositCalculator.jsx'
import { ArrowRight, ShieldCheck, Check } from '../components/Icon.jsx'

/**
 * IDFC FIRST Bank inspired spacious Financial Calculator Band:
 * - Full-bleed dark blue background with glowing ambient highlights
 * - Clear header intro with self-service guarantee
 * - Centered, wide tabbed calculator card with zero overflow and zero truncation
 */

const TOOLS = [
  {
    id: 'emi',
    label: 'Loan EMI Calculator',
    lead: 'Instant Monthly Instalment & Amortisation Schedule',
    Widget: EmiCalculator,
  },
  {
    id: 'eligibility',
    label: 'Loan Eligibility Check',
    lead: 'Multi-Lender Income Eligibility & FOIR Analysis',
    Widget: EligibilityCalculator,
  },
  {
    id: 'sip',
    label: 'Monthly SIP Investment',
    lead: 'Wealth Compounding & Target Milestone Growth',
    Widget: SipCalculator,
  },
  {
    id: 'fd',
    label: 'Fixed Deposit (FD / RD)',
    lead: 'Maturity Yield & Guaranteed Returns Calculator',
    Widget: DepositCalculator,
  },
]

export default function CalculatorBand() {
  const [tab, setTab] = useState('emi')
  const tool = TOOLS.find((t) => t.id === tab) ?? TOOLS[0]
  const { Widget } = tool

  return (
    <section className="calc-band relative overflow-hidden py-16 sm:py-24">
      {/* Background ambient radial light */}
      <div aria-hidden="true" className="calc-band-wash" />

      <div className="container-page relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-2xs font-extrabold uppercase tracking-wider text-accent-light border border-white/15 mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            100% Private Browser Calculation
          </div>
          <h2 className="h-section text-paper">
            Financial Calculators
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-paper/80">
            Do the arithmetic before sharing your documents. Every calculation runs entirely in your browser with zero data logging, no OTP gates, and zero spam calls.
          </p>
        </div>

        {/* Wide Calculator Card Container */}
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/20 bg-paper shadow-glass overflow-hidden">
          {/* Top category navigation tabs */}
          <div className="scroll-x border-b border-ink/10 bg-paper-deep/80 px-4 py-2">
            <div role="tablist" aria-label="Calculators" className="flex min-w-max gap-2">
              {TOOLS.map((t) => {
                const active = t.id === tab
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.id)}
                    className={`rounded-xl px-4 py-3 text-xs sm:text-sm font-extrabold transition-all ${
                      active
                        ? 'bg-accent text-white shadow-sm'
                        : 'bg-paper text-ink-soft hover:bg-white hover:text-ink'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Calculator Tool Body */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-ink/8 pb-4">
              <div>
                <span className="text-2xs font-extrabold uppercase tracking-wider text-accent">
                  Interactive Simulation
                </span>
                <h3 className="text-lg font-bold text-ink">{tool.lead}</h3>
              </div>
              <span className="fig rounded-full bg-paper-deep px-3 py-1 text-2xs font-bold text-ink-faint border border-ink/8">
                Updated with Q3 2026 Bank Benchmark Rates
              </span>
            </div>

            <Widget compact />
          </div>
        </div>

        {/* Footer info & Trust pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-paper/70 text-center">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-accent-light" />
            Instant loan eligibility estimation
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-accent-light" />
            No credit score impact
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-accent-light" />
            Multi-lender interest rate comparison
          </span>
        </div>
      </div>
    </section>
  )
}
