import { useMemo, useState } from 'react'
import Field, { Readout } from './Field.jsx'
import { depositMaturity, recurringMaturity } from '../lib/finance.js'
import { inr, inrSmart, pct, months as fmtMonths } from '../lib/format.js'

export default function DepositCalculator({ compact = false }) {
  const [mode, setMode] = useState('fd')
  const [amount, setAmount] = useState(500000)
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(7.75)
  const [months, setMonths] = useState(36)
  const [freq, setFreq] = useState(4)
  const [focused, setFocused] = useState(null)

  const fieldProps = { focused, onFocus: setFocused, onBlur: () => setFocused(null) }
  const isFd = mode === 'fd'

  const result = useMemo(
    () =>
      isFd
        ? depositMaturity({
            principal: amount,
            annualRatePct: rate,
            years: months / 12,
            compoundsPerYear: freq,
          })
        : recurringMaturity({ monthly, annualRatePct: rate, months, compoundsPerYear: freq }),
    [isFd, amount, monthly, rate, months, freq],
  )

  const invested = isFd ? result.principal : result.invested

  return (
    <div className="rounded-2xl border border-ink/10 bg-paper overflow-hidden shadow-sm">
      {/* Top Deposit Mode Toggle */}
      <div className="flex gap-2 p-3 bg-paper-deep border-b border-ink/10">
        {[
          { id: 'fd', label: 'Fixed Deposit (FD)' },
          { id: 'rd', label: 'Recurring Deposit (RD)' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setMode(t.id)}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold transition-all ${
              mode === t.id
                ? 'bg-accent text-white shadow-sm'
                : 'bg-paper text-ink-soft hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-6 lg:col-span-7">
          {isFd ? (
            <Field
              label="Total Deposit Amount"
              value={amount}
              onChange={setAmount}
              min={10000}
              max={10000000}
              step={10000}
              prefix="₹"
              presets={[
                { label: '₹1L', value: 100000 },
                { label: '₹5L', value: 500000 },
                { label: '₹10L', value: 1000000 },
                { label: '₹25L', value: 2500000 },
              ]}
              {...fieldProps}
            />
          ) : (
            <Field
              label="Monthly RD Deposit"
              value={monthly}
              onChange={setMonthly}
              min={1000}
              max={200000}
              step={1000}
              prefix="₹"
              presets={[
                { label: '₹5k', value: 5000 },
                { label: '₹10k', value: 10000 },
                { label: '₹25k', value: 25000 },
              ]}
              {...fieldProps}
            />
          )}

          <Field
            label="Interest Rate (% p.a.)"
            value={rate}
            onChange={setRate}
            min={5}
            max={10}
            step={0.05}
            suffix="%"
            format="raw"
            presets={[
              { label: '7.25% Regular', value: 7.25 },
              { label: '7.75% Senior', value: 7.75 },
              { label: '8.50% Corporate', value: 8.5 },
            ]}
            {...fieldProps}
          />

          <Field
            label="Deposit Tenure"
            value={months}
            onChange={setMonths}
            min={6}
            max={120}
            step={6}
            suffix="Months"
            hint={fmtMonths(months)}
            presets={[
              { label: '1 Yr', value: 12 },
              { label: '2 Yrs', value: 24 },
              { label: '3 Yrs', value: 36 },
              { label: '5 Yrs', value: 60 },
            ]}
            {...fieldProps}
          />
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-paper-deep p-6 sm:p-7 lg:col-span-5 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-accent">
                Guaranteed Maturity Value
              </span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-2xs font-bold text-accent">
                Quarterly Compounding
              </span>
            </div>

            <div className="mt-4 border-b border-ink/10 pb-5">
              <p className="fig text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
                {inr(Math.round(result.maturity))}
              </p>
              <p className="mt-1 text-xs text-ink-soft">
                Total invested: {inr(invested)} · Guaranteed interest: <strong className="text-accent">{inr(Math.round(result.interest))}</strong>
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-paper p-3 border border-ink/8">
                <span className="font-bold text-ink-soft">Principal:</span>
                <p className="fig text-sm font-extrabold text-ink mt-0.5">{inr(invested)}</p>
              </div>
              <div className="rounded-xl bg-paper p-3 border border-ink/8">
                <span className="font-bold text-ink-soft">Earned Interest:</span>
                <p className="fig text-sm font-extrabold text-accent mt-0.5">{inr(Math.round(result.interest))}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-ink/10">
            <a
              href="/fixed-deposit/"
              className="btn-accent w-full flex items-center justify-center gap-2 font-bold shadow-sm"
            >
              <span>Compare Fixed Deposit Rates →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
