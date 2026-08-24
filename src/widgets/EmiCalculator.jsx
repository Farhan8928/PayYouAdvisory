import { useEffect, useMemo, useState } from 'react'
import Field from './Field.jsx'
import { SplitBar } from './AmortChart.jsx'
import {
  emi,
  totalInterest,
  totalPayable,
} from '../lib/finance.js'
import { inr, inrCompact, months as fmtMonths } from '../lib/format.js'
import { Lock, ArrowRight, Check } from '../components/Icon.jsx'

const STORE_KEY = 'payyou.emi.v3'

const AMOUNT_PRESETS = [
  { label: '₹10 L', value: 1000000 },
  { label: '₹25 L', value: 2500000 },
  { label: '₹50 L', value: 5000000 },
  { label: '₹1 Cr', value: 10000000 },
]

const RATE_PRESETS = [
  { label: '8.4% Home', value: 8.4 },
  { label: '10.5% LAP', value: 10.5 },
  { label: '12.5% MSME', value: 12.5 },
  { label: '14.0% Personal', value: 14.0 },
]

const TENURE_PRESETS = [
  { label: '3 Yrs', value: 36 },
  { label: '5 Yrs', value: 60 },
  { label: '10 Yrs', value: 120 },
  { label: '20 Yrs', value: 240 },
]

export default function EmiCalculator({ compact = false, initial }) {
  const [amount, setAmount] = useState(initial?.amount ?? 2500000)
  const [rate, setRate] = useState(initial?.rate ?? 10.5)
  const [tenure, setTenure] = useState(initial?.months ?? 120)
  const [focused, setFocused] = useState(null)

  useEffect(() => {
    if (initial) return
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null')
      if (saved && typeof saved.amount === 'number') {
        setAmount(saved.amount)
        setRate(saved.rate)
        setTenure(saved.tenure)
      }
    } catch {
      // ignore
    }
  }, [initial])

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ amount, rate, tenure }))
    } catch {
      // ignore
    }
  }, [amount, rate, tenure])

  const instalment = useMemo(() => emi(amount, rate, tenure), [amount, rate, tenure])
  const interest = useMemo(() => totalInterest(amount, rate, tenure), [amount, rate, tenure])
  const payable = useMemo(() => totalPayable(amount, rate, tenure), [amount, rate, tenure])

  const fieldProps = { focused, onFocus: setFocused, onBlur: () => setFocused(null) }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left column: Input controls */}
        <div className="space-y-4 lg:col-span-7">
          <Field
            label="Loan Amount Required"
            value={amount}
            onChange={setAmount}
            min={50000}
            max={50000000}
            step={50000}
            prefix="₹"
            presets={AMOUNT_PRESETS}
            {...fieldProps}
          />

          <Field
            label="Interest Rate (% p.a.)"
            value={rate}
            onChange={setRate}
            min={7.5}
            max={28}
            step={0.05}
            suffix="%"
            format="raw"
            presets={RATE_PRESETS}
            {...fieldProps}
          />

          <Field
            label="Loan Tenure"
            value={tenure}
            onChange={setTenure}
            min={6}
            max={360}
            step={6}
            suffix="Months"
            hint={fmtMonths(tenure)}
            presets={TENURE_PRESETS}
            {...fieldProps}
          />
        </div>

        {/* Right column: IDFC-style live computation result card */}
        <div className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-paper-deep p-6 lg:col-span-5 shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-ink/10 pb-3">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-accent">
                Monthly Loan EMI
              </span>
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-2xs font-bold text-accent">
                Instant Calculation
              </span>
            </div>

            {/* Monthly EMI figure with generous space */}
            <div className="py-4">
              <div className="flex items-baseline flex-wrap gap-1.5">
                <span className="fig text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
                  {inr(instalment)}
                </span>
                <span className="text-sm font-bold text-ink-soft">/ month</span>
              </div>
              <p className="mt-1 text-xs text-ink-soft">
                For {inrCompact(amount)} at {rate}% over {fmtMonths(tenure)}
              </p>
            </div>

            {/* Breakdown summary grid with ample padding and text wrapping */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl bg-paper p-3.5 border border-ink/8">
                <span className="text-2xs font-bold uppercase tracking-wider text-ink-faint">
                  Total Interest
                </span>
                <p className="fig mt-1 text-base sm:text-lg font-extrabold text-accent">
                  {inr(interest)}
                </p>
              </div>

              <div className="rounded-xl bg-paper p-3.5 border border-ink/8">
                <span className="text-2xs font-bold uppercase tracking-wider text-ink-faint">
                  Total Payable
                </span>
                <p className="fig mt-1 text-base sm:text-lg font-extrabold text-ink">
                  {inr(payable)}
                </p>
              </div>
            </div>

            {/* Principal vs Interest visual split */}
            <div className="mt-5">
              <SplitBar principal={amount} interest={interest} />
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 border-t border-ink/10 pt-4">
            <a
              href={`/eligibility-calculator/?amount=${amount}&rate=${rate}&tenure=${tenure}`}
              className="btn-accent w-full flex items-center justify-center gap-2 font-bold shadow-sm"
            >
              <Lock className="h-4 w-4" />
              <span>Apply for this Loan →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
