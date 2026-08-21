import { useMemo, useState } from 'react'
import Field, { Readout } from './Field.jsx'
import { eligibleAmount, emi } from '../lib/finance.js'
import { inr, inrCompact, months as fmtMonths, pct } from '../lib/format.js'
import { waLink } from '../data/site.js'

/**
 * Indicative borrowing capacity.
 *
 * This is the widget in the hero, and it earns that position by answering the
 * question people actually arrive with — "how much can I get?" — instead of
 * asking for their phone number first.
 *
 * ── Why it shows the constraint, not just the number ────────────────────────
 * Lenders size unsecured borrowing on the fixed-obligation-to-income ratio:
 * all EMIs including the new one, as a share of net income. Most applicants are
 * limited by the loans they already carry, not by their salary — and almost
 * nobody knows that until they are declined. Surfacing "your existing EMIs are
 * using X% of the room a lender allows" turns a rejection people take
 * personally into an arithmetic problem they can act on, which is genuinely the
 * most useful thing a broker can tell someone.
 *
 * ── Why there is no form ────────────────────────────────────────────────────
 * The category convention is to compute the number and then hide it behind a
 * name-and-mobile gate. That converts a little better and is the reason nobody
 * trusts these tools. The figure is shown; the call to action sits next to it
 * for people who want a real answer rather than an estimate.
 */
export default function EligibilityCalculator({ compact = false }) {
  const [income, setIncome] = useState(75000)
  const [obligations, setObligations] = useState(0)
  const [rate, setRate] = useState(12)
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

  /** What the same income would support with no existing EMIs — the cost of the obligations. */
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
    <div className="border border-ink/15 bg-paper">
      <div className={compact ? '' : 'grid lg:grid-cols-2'}>
        <div
          className={`space-y-7 p-6 sm:p-8 ${compact ? 'border-b border-ink/15' : 'border-b border-ink/15 lg:border-b-0 lg:border-r'}`}
        >
          <Field
            label="Net monthly income"
            value={income}
            onChange={setIncome}
            min={15000}
            max={1000000}
            step={5000}
            prefix="₹"
            hint="take-home, after deductions"
            {...fieldProps}
          />
          <Field
            label="EMIs you already pay"
            value={obligations}
            onChange={setObligations}
            min={0}
            max={Math.max(10000, Math.round(income * 0.7))}
            step={1000}
            prefix="₹"
            hint="all loans and card EMIs"
            {...fieldProps}
          />

          {!compact ? (
            <>
              <Field
                label="Assumed interest rate"
                value={rate}
                onChange={setRate}
                min={7}
                max={26}
                step={0.25}
                suffix="% p.a."
                format="raw"
                {...fieldProps}
              />
              <Field
                label="Tenure"
                value={tenure}
                onChange={setTenure}
                min={12}
                max={360}
                step={12}
                suffix="months"
                hint={fmtMonths(tenure)}
                format="raw"
                {...fieldProps}
              />
            </>
          ) : null}
        </div>

        <div className="p-6 sm:p-8">
          <Readout
            label="You could borrow around"
            value={result.amount > 0 ? inrCompact(result.amount) : '—'}
            emphasis
            sub={
              result.amount > 0
                ? `at ${pct(rate)} over ${fmtMonths(tenure)} — an EMI of about ${inr(emi(result.amount, rate, tenure))}`
                : 'Your existing EMIs already use the room a lender would allow.'
            }
          />

          {/* The constraint, made visible. */}
          <div className="mt-7 border-t border-ink/10 pt-6">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="text-2xs font-medium uppercase tracking-[0.12em] text-ink-faint">
                Repayment room a lender allows
              </span>
              <span className="fig text-sm font-semibold text-ink">{inr(headroom)}</span>
            </div>

            <div
              className="flex h-2.5 w-full overflow-hidden bg-ink/10"
              role="img"
              aria-label={`Your existing EMIs use ${pct(usedByObligations, 0)} of the repayment capacity a lender would allow at this income.`}
            >
              <div
                className="bg-brass transition-[width] duration-300"
                style={{ width: `${usedByObligations}%` }}
              />
            </div>

            <p className="mt-3 text-2xs leading-relaxed text-ink-faint">
              Lenders cap total EMIs — existing and new — at roughly{' '}
              <span className="fig text-ink-soft">{pct(result.foir * 100, 0)}</span> of net income at
              your level. Your current EMIs use{' '}
              <span className="fig text-ink-soft">{pct(usedByObligations, 0)}</span> of that.
            </p>

            {obligations > 0 && cost > 0 ? (
              <p className="mt-4 border-l-2 border-brass pl-4 text-sm leading-relaxed text-ink-soft">
                Those existing EMIs are costing you about{' '}
                <span className="fig font-semibold text-ink">{inrCompact(cost)}</span> of borrowing
                capacity. Clearing the smallest of them before you apply is frequently worth more
                than any rate you could negotiate.
              </p>
            ) : null}
          </div>

          {!compact ? (
            <div className="mt-7 flex flex-wrap gap-3 border-t border-ink/10 pt-6">
              <a
                href={waLink('Hi PayYou Advisory, I used the eligibility calculator and would like an accurate figure for ')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get an accurate figure
              </a>
              <a href="/emi-calculator/" className="btn-ghost">
                Work out the EMI
              </a>
            </div>
          ) : null}
        </div>
      </div>

      <p className="border-t border-ink/15 bg-paper-deep px-6 py-4 text-2xs leading-relaxed text-ink-faint sm:px-8">
        Indicative only. A lender also weighs your credit score, employer, job or business vintage
        and — on a secured loan — the property, and each sets its own ratio. Computed in your
        browser; nothing you enter is transmitted.
      </p>
    </div>
  )
}
