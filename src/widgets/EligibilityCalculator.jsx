import { useMemo, useState } from 'react'
import Field, { Readout } from './Field.jsx'
import { eligibleAmount, emi } from '../lib/finance.js'
import { inr, inrCompact, months as fmtMonths, pct } from '../lib/format.js'
import { waLink, WA_DEFAULT } from '../data/site.js'
import { Lock, ArrowRight, Check } from '../components/Icon.jsx'

export default function EligibilityCalculator({ compact = false }) {
  const [income, setIncome] = useState(75000)
  const [obligations, setObligations] = useState(0)
  const [rate, setRate] = useState(10.5)
  const [tenure, setTenure] = useState(60)
  const [focused, setFocused] = useState(null)

  const result = useMemo(
    () =>
      eligibleAmount({
        netMonthlyIncome: income,
        existingEmi: obligations,
        annualRatePct: rate,
        tenureMonths: tenure,
      }),
    [income, obligations, rate, tenure],
  )

  const unencumbered = useMemo(
    () =>
      eligibleAmount({
        netMonthlyIncome: income,
        existingEmi: 0,
        annualRatePct: rate,
        tenureMonths: tenure,
      }),
    [income, rate, tenure],
  )

  const headroom = income * result.foir
  const usedByObligations = headroom > 0 ? Math.min(100, (obligations / headroom) * 100) : 100
  const cost = Math.max(0, unencumbered.amount - result.amount)

  const fieldProps = { focused, onFocus: setFocused, onBlur: () => setFocused(null) }

  return (
    <div className="rounded-2xl border border-ink/10 bg-paper overflow-hidden shadow-sm">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
        {/* Input parameters */}
        <div className="space-y-6 lg:col-span-7">
          <Field
            label="Net Monthly In-Hand Income"
            value={income}
            onChange={setIncome}
            min={15000}
            max={1000000}
            step={5000}
            prefix="₹"
            presets={[
              { label: '₹35k', value: 35000 },
              { label: '₹75k', value: 75000 },
              { label: '₹1.5L', value: 150000 },
              { label: '₹3L', value: 300000 },
            ]}
            {...fieldProps}
          />

          <Field
            label="Current Monthly EMIs You Pay"
            value={obligations}
            onChange={setObligations}
            min={0}
            max={Math.max(10000, Math.round(income * 0.7))}
            step={1000}
            prefix="₹"
            presets={[
              { label: 'Zero EMIs', value: 0 },
              { label: '₹10k', value: 10000 },
              { label: '₹25k', value: 25000 },
              { label: '₹50k', value: 50000 },
            ]}
            {...fieldProps}
          />

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              min={7.5}
              max={24}
              step={0.1}
              suffix="%"
              format="raw"
              {...fieldProps}
            />
            <Field
              label="Tenure"
              value={tenure}
              onChange={setTenure}
              min={12}
              max={240}
              step={12}
              suffix="Mo"
              hint={fmtMonths(tenure)}
              {...fieldProps}
            />
          </div>
        </div>

        {/* Output Calculation Result Box */}
        <div className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-paper-deep p-6 sm:p-7 lg:col-span-5 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-accent">
                Maximum Loan Eligibility
              </span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-2xs font-bold text-accent">
                Pre-Approved
              </span>
            </div>

            {/* Principal Eligible Amount */}
            <div className="mt-4 border-b border-ink/10 pb-5">
              <p className="fig text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
                {inr(result.amount)}
              </p>
              <p className="mt-1 text-xs text-ink-soft">
                Estimated monthly EMI: <strong className="text-ink">{inr(result.maxEmi)}</strong>
              </p>
            </div>

            {/* Metrics */}
            <div className="mt-5 space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-paper p-3 border border-ink/8">
                <span className="font-bold text-ink-soft">Lender FOIR Limit:</span>
                <span className="font-extrabold text-ink">{pct(result.foir * 100, 0)}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-paper p-3 border border-ink/8">
                <span className="font-bold text-ink-soft">Existing EMI Burden:</span>
                <span className={`font-extrabold ${usedByObligations > 60 ? 'text-accent' : 'text-ink'}`}>
                  {pct(usedByObligations, 0)} of capacity
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-ink/10">
            <a
              href={waLink(`${WA_DEFAULT} loan eligibility of ${inr(result.amount)} with monthly income of ${inr(income)}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent w-full flex items-center justify-center gap-2 shadow-sm font-bold"
            >
              <Lock className="h-4 w-4" />
              <span>Apply with Pre-Sanction →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
