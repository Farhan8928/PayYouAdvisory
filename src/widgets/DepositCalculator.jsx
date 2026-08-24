import { useMemo, useState } from 'react'
import Field, { Readout } from './Field.jsx'
import { depositMaturity, recurringMaturity } from '../lib/finance.js'
import { inr, pct } from '../lib/format.js'

/**
 * Maturity value of a fixed or recurring deposit.
 *
 * ── Why both modes live in one widget ──────────────────────────────────────
 * Because the comparison is the point. People routinely assume a recurring
 * deposit at 7% and a fixed deposit at 7% are equivalent, and they are not:
 * in a recurring deposit each instalment compounds only for the time left to
 * maturity, so the effective yield on the total contributed is meaningfully
 * lower. Putting the two behind one toggle lets a reader see that in about
 * four seconds, which is faster than any paragraph explaining it.
 *
 * ── Why quarterly compounding is the default ───────────────────────────────
 * Indian banks conventionally compound fixed deposit interest quarterly. A
 * deposit quoted at the same nominal rate but compounded annually matures
 * lower, and that difference is real money on a long deposit — so the
 * frequency is exposed as a control rather than buried as an assumption.
 */
export default function DepositCalculator({ compact = false }) {
  const [mode, setMode] = useState('fd')
  const [amount, setAmount] = useState(500000)
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(7)
  const [months, setMonths] = useState(60)
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
  // The yield actually earned on money contributed, which for a recurring
  // deposit is visibly below the quoted rate. That gap is the whole lesson.
  const effective = invested > 0 ? (result.interest / invested) * 100 : 0

  return (
    <div className="border border-ink/15 bg-paper">
      <div className="scroll-x border-b border-ink/15 bg-paper-deep">
        <div className="flex gap-1 p-2 sm:px-3">
          {[
            { id: 'fd', label: 'Fixed deposit' },
            { id: 'rd', label: 'Recurring deposit' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setMode(t.id)}
              aria-pressed={mode === t.id}
              className={`flex min-h-[44px] shrink-0 items-center rounded px-3.5 text-xs font-semibold transition-colors ${
                mode === t.id ? 'bg-paper text-ink' : 'text-ink-soft hover:bg-paper hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="space-y-7 border-b border-ink/15 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          {isFd ? (
            <Field
              label="Amount deposited"
              value={amount}
              onChange={setAmount}
              min={5000}
              max={10000000}
              step={5000}
              prefix="₹"
              {...fieldProps}
            />
          ) : (
            <Field
              label="Deposited each month"
              value={monthly}
              onChange={setMonthly}
              min={500}
              max={200000}
              step={500}
              prefix="₹"
              {...fieldProps}
            />
          )}

          <Field
            label="Interest rate"
            value={rate}
            onChange={setRate}
            min={3}
            max={12}
            step={0.05}
            suffix="% p.a."
            format="raw"
            {...fieldProps}
          />
          <Field
            label="Term"
            value={months}
            onChange={setMonths}
            min={6}
            max={120}
            step={6}
            suffix="months"
            hint={`${(months / 12).toFixed(months % 12 ? 1 : 0)} years`}
            format="raw"
            {...fieldProps}
          />

          <div>
            <span className="field-label">Compounded</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { n: 4, label: 'Quarterly' },
                { n: 1, label: 'Annually' },
              ].map((f) => (
                <button
                  key={f.n}
                  type="button"
                  onClick={() => setFreq(f.n)}
                  aria-pressed={freq === f.n}
                  className={`flex min-h-[44px] items-center rounded border px-4 text-xs font-semibold transition-colors ${
                    freq === f.n
                      ? 'border-ink bg-ink text-paper'
                      : 'border-ink/20 text-ink-soft hover:border-ink/40'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-2xs leading-relaxed text-ink-faint">
              Indian banks usually compound quarterly. The same rate compounded annually matures
              lower.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Readout label="You put in" value={inr(Math.round(invested))} emphasis />
            <Readout
              label="Matures at"
              value={inr(Math.round(result.value))}
              emphasis
              sub={`${inr(Math.round(result.interest))} of interest`}
            />
          </div>

          <div className="mt-7 border-t border-ink/10 pt-6">
            <Readout
              label="Interest earned on what you contributed"
              value={pct(effective, 1)}
              sub={
                isFd
                  ? 'Over the whole term, not per year.'
                  : `Over the whole term. Lower than ${pct(rate)} because each instalment earns only for the time left to maturity.`
              }
            />
          </div>

          {!compact ? (
            <p className="mt-7 border-t border-ink/10 pt-5 text-2xs leading-relaxed text-ink-faint">
              Interest on a deposit is added to your income and taxed at your slab rate, so the
              figure above is before tax. Deposit rates are set by the bank or finance company and
              change frequently. PayYou Advisory refers deposits and does not accept them.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
