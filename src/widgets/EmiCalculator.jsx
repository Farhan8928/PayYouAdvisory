import { useEffect, useMemo, useState } from 'react'
import Field, { Readout } from './Field.jsx'
import { SplitBar, BalanceChart } from './AmortChart.jsx'
import {
  emi,
  totalInterest,
  totalPayable,
  yearlySchedule,
  prepaymentEffect,
} from '../lib/finance.js'
import { inr, inrCompact, months as fmtMonths, pct } from '../lib/format.js'

const STORE_KEY = 'payyou.emi.v1'

const PRESETS = [
  { label: 'Personal loan', amount: 500000, rate: 14, months: 48 },
  { label: 'Business loan', amount: 2500000, rate: 12.5, months: 60 },
  { label: 'Home loan', amount: 5000000, rate: 8.6, months: 240 },
  { label: 'Loan against property', amount: 3000000, rate: 10.5, months: 180 },
  { label: 'Car loan', amount: 900000, rate: 9.5, months: 60 },
]

/**
 * The EMI calculator.
 *
 * ── Two decisions worth defending ──────────────────────────────────────────
 *
 * **Total interest is given the same visual weight as the EMI.** Every
 * competitor calculator promotes the monthly figure and buries the total, which
 * is how a reader talks themselves into a thirty-year tenure to shave ₹4,000 a
 * month and pays for the house twice. Showing both, at the same size, is the
 * single most useful thing this page does. It is also, commercially, slightly
 * against interest — which is exactly why it is credible.
 *
 * **Nothing is transmitted.** All of this runs in the visitor's browser; no
 * figure typed here reaches a server, and the page says so. In a category where
 * every other calculator is a lead-capture form wearing a costume, that is a
 * real differentiator and it costs nothing to be true.
 *
 * The preset rates are illustrative starting points for the calculator only —
 * they are not offers and are labelled as such. They exist because an empty
 * calculator asking a first-time borrower to guess a rate is a worse experience
 * than a sensible starting position they can change.
 */
export default function EmiCalculator({ compact = false, initial }) {
  const [amount, setAmount] = useState(initial?.amount ?? 2500000)
  const [rate, setRate] = useState(initial?.rate ?? 10.5)
  const [tenure, setTenure] = useState(initial?.months ?? 120)
  const [extra, setExtra] = useState(0)
  const [showTable, setShowTable] = useState(false)
  const [focused, setFocused] = useState(null)

  // Restore after mount, never during render. Reading localStorage in the
  // initial state would make the server render and the first client render
  // disagree, and React would throw away the prerendered DOM to fix it —
  // discarding the whole point of prerendering the page.
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
      // A private window, cleared site data, or a browser blocking storage.
      // The defaults are perfectly serviceable; there is nothing to recover.
    }
  }, [initial])

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ amount, rate, tenure }))
    } catch {
      /* not worth telling the reader about */
    }
  }, [amount, rate, tenure])

  const instalment = useMemo(() => emi(amount, rate, tenure), [amount, rate, tenure])
  const interest = useMemo(() => totalInterest(amount, rate, tenure), [amount, rate, tenure])
  const payable = useMemo(() => totalPayable(amount, rate, tenure), [amount, rate, tenure])
  const years = useMemo(() => yearlySchedule(amount, rate, tenure), [amount, rate, tenure])
  const prepay = useMemo(
    () =>
      extra > 0
        ? prepaymentEffect({ principal: amount, annualRatePct: rate, tenureMonths: tenure, extraPerMonth: extra })
        : null,
    [amount, rate, tenure, extra],
  )

  const fieldProps = { focused, onFocus: setFocused, onBlur: () => setFocused(null) }

  return (
    <div className="border border-ink/15 bg-paper">
      {/* ── Presets ─────────────────────────────────────────────────────── */}
      {!compact ? (
        <div className="scroll-x border-b border-ink/15 bg-paper-deep">
          <div className="flex gap-1 p-2 sm:px-3">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setAmount(p.amount)
                  setRate(p.rate)
                  setTenure(p.months)
                }}
                className="shrink-0 rounded px-3 py-2 text-xs font-medium text-ink-soft transition-colors hover:bg-paper hover:text-ink"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid lg:grid-cols-2">
        {/* ── Inputs ────────────────────────────────────────────────────── */}
        <div className="space-y-7 border-b border-ink/15 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <Field
            label="Loan amount"
            value={amount}
            onChange={setAmount}
            min={50000}
            max={50000000}
            step={50000}
            prefix="₹"
            {...fieldProps}
          />
          <Field
            label="Interest rate"
            value={rate}
            onChange={setRate}
            min={5}
            max={30}
            step={0.05}
            suffix="% p.a."
            format="raw"
            {...fieldProps}
          />
          <Field
            label="Tenure"
            value={tenure}
            onChange={setTenure}
            min={6}
            max={360}
            step={6}
            suffix="months"
            hint={fmtMonths(tenure)}
            format="raw"
            {...fieldProps}
          />

          <p className="border-t border-ink/10 pt-5 text-2xs leading-relaxed text-ink-faint">
            Everything here is computed in your browser. No figure you type is sent to us or to
            anyone else.
          </p>
        </div>

        {/* ── Results ───────────────────────────────────────────────────── */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-6">
            <Readout label="Monthly EMI" value={inr(instalment)} emphasis />
            <Readout
              label="Total interest"
              value={inr(interest)}
              emphasis
              sub={`${pct((interest / Math.max(1, amount)) * 100, 0)} of what you borrowed`}
            />
          </div>

          <div className="mt-7 border-t border-ink/10 pt-6">
            <Readout
              label="Total you will repay"
              value={inr(payable)}
              sub={`${inrCompact(amount)} borrowed, over ${fmtMonths(tenure)}`}
            />
          </div>

          <div className="mt-7">
            <SplitBar principal={amount} interest={interest} />
          </div>
        </div>
      </div>

      {/* ── The shape of the loan ───────────────────────────────────────── */}
      {!compact ? (
        <div className="border-t border-ink/15 p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="h-card text-ink">How it unwinds</h3>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft">
              The early years are almost entirely interest. If you might sell or refinance within
              five, this is the chart to look at before you choose a tenure.
            </p>
          </div>

          <BalanceChart years={years} />

          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            className="btn-ghost btn-sm mt-6"
            aria-expanded={showTable}
          >
            {showTable ? 'Hide' : 'Show'} the year-by-year table
          </button>

          {showTable ? (
            <div className="scroll-x mt-6">
              <table className="table-doc min-w-[34rem]">
                <caption className="sr-only">
                  Year by year: principal repaid, interest paid, and balance outstanding.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col" className="text-right">Principal repaid</th>
                    <th scope="col" className="text-right">Interest paid</th>
                    <th scope="col" className="text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {years.map((y) => (
                    <tr key={y.year}>
                      <td className="fig">{y.year}</td>
                      <td className="fig text-right">{inr(y.principal)}</td>
                      <td className="fig text-right text-accent-deep">{inr(y.interest)}</td>
                      <td className="fig text-right font-medium">{inr(y.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* ── Prepayment ──────────────────────────────────────────────────── */}
      {!compact ? (
        <div className="border-t border-ink/15 bg-paper-deep p-6 sm:p-8">
          <h3 className="mb-2 h-card text-ink">
            What would paying a little extra do?
          </h3>
          <p className="mb-6 max-w-prose text-sm leading-relaxed text-ink-soft">
            Prepayment is the highest-return financial decision available to most borrowers, and the
            one least often modelled. Add an amount to each month’s EMI and see what it buys.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <Field
              label="Extra each month"
              value={extra}
              onChange={setExtra}
              min={0}
              max={Math.max(5000, Math.round(instalment))}
              step={500}
              prefix="₹"
              {...fieldProps}
            />

            <div className="grid grid-cols-2 gap-6 self-center">
              {prepay ? (
                <>
                  <Readout
                    label="Interest saved"
                    value={inr(Math.max(0, prepay.interestSaved))}
                    sub={`New EMI ${inr(prepay.newEmi)}`}
                  />
                  <Readout
                    label="Finished earlier by"
                    value={fmtMonths(Math.max(0, prepay.monthsSaved))}
                    sub={`${fmtMonths(prepay.newTenureMonths)} instead of ${fmtMonths(tenure)}`}
                  />
                </>
              ) : (
                <p className="col-span-2 text-sm text-ink-faint">
                  Move the slider to see the effect.
                </p>
              )}
            </div>
          </div>

          <p className="mt-6 border-t border-ink/10 pt-4 text-2xs leading-relaxed text-ink-faint">
            Most lenders allow prepayment on a floating-rate loan to an individual without a charge,
            but fixed-rate loans and loans to a business frequently carry one. Check your sanction
            letter, or ask us to read it for you.
          </p>
        </div>
      ) : null}
    </div>
  )
}
