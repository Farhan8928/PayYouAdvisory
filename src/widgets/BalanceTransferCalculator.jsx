import { useMemo, useState } from 'react'
import Field, { Readout } from './Field.jsx'
import { balanceTransfer } from '../lib/finance.js'
import { inr, inrCompact, months as fmtMonths, pct } from '../lib/format.js'

/**
 * Would switching lender actually save anything?
 *
 * The honest answer is frequently no, and this calculator is built to say so.
 *
 * Every balance-transfer tool in the category compares two interest rates and
 * declares the lower one the winner. That is wrong in a way that costs people
 * real money: a transfer carries a processing fee, fresh legal and technical
 * valuation, stamp duty on the new mortgage and a pile of documentation, and
 * when only a few years remain the saving does not cover them. This one nets
 * the switching cost off and prints "not worth it" when it is not.
 *
 * It also flags the other trap. Extending the tenure at the same time as the
 * transfer lowers the EMI and raises the total paid — which every reader will
 * read as a saving unless something points out that it is not one.
 */
export default function BalanceTransferCalculator() {
  const [outstanding, setOutstanding] = useState(3500000)
  const [currentRate, setCurrentRate] = useState(9.5)
  const [newRate, setNewRate] = useState(8.6)
  const [remaining, setRemaining] = useState(180)
  const [cost, setCost] = useState(35000)
  const [keepTenure, setKeepTenure] = useState(true)
  const [newTenure, setNewTenure] = useState(180)
  const [focused, setFocused] = useState(null)

  const r = useMemo(
    () =>
      balanceTransfer({
        outstanding,
        currentRatePct: currentRate,
        newRatePct: newRate,
        remainingMonths: remaining,
        switchingCost: cost,
        newTenureMonths: keepTenure ? remaining : newTenure,
      }),
    [outstanding, currentRate, newRate, remaining, cost, keepTenure, newTenure],
  )

  /** How many months of EMI saving it takes to earn the switching cost back. */
  const breakEven = r.emiSaving > 0 ? Math.ceil(cost / r.emiSaving) : null

  const fieldProps = { focused, onFocus: setFocused, onBlur: () => setFocused(null) }

  return (
    <div className="border border-ink/15 bg-paper">
      <div className="grid lg:grid-cols-2">
        <div className="space-y-7 border-b border-ink/15 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <Field
            label="Outstanding balance"
            value={outstanding}
            onChange={setOutstanding}
            min={100000}
            max={50000000}
            step={50000}
            prefix="₹"
            {...fieldProps}
          />
          <Field
            label="Your current rate"
            value={currentRate}
            onChange={setCurrentRate}
            min={6}
            max={26}
            step={0.05}
            suffix="% p.a."
            format="raw"
            {...fieldProps}
          />
          <Field
            label="Rate on offer"
            value={newRate}
            onChange={setNewRate}
            min={6}
            max={26}
            step={0.05}
            suffix="% p.a."
            format="raw"
            {...fieldProps}
          />
          <Field
            label="Months still to run"
            value={remaining}
            onChange={setRemaining}
            min={12}
            max={360}
            step={6}
            suffix="months"
            hint={fmtMonths(remaining)}
            format="raw"
            {...fieldProps}
          />
          <Field
            label="Cost of switching"
            value={cost}
            onChange={setCost}
            min={0}
            max={300000}
            step={2500}
            prefix="₹"
            hint="fees, valuation, stamp duty"
            {...fieldProps}
          />

          <div className="border-t border-ink/10 pt-5">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={keepTenure}
                onChange={(e) => setKeepTenure(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
              />
              <span className="text-sm leading-relaxed text-ink-soft">
                Keep the same remaining tenure
                <span className="mt-1 block text-2xs text-ink-faint">
                  Uncheck to model a longer one — which lowers the EMI and raises the total.
                </span>
              </span>
            </label>

            {!keepTenure ? (
              <div className="mt-5">
                <Field
                  label="New tenure"
                  value={newTenure}
                  onChange={setNewTenure}
                  min={12}
                  max={360}
                  step={6}
                  suffix="months"
                  hint={fmtMonths(newTenure)}
                  format="raw"
                  {...fieldProps}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* The verdict, first and largest. */}
          <div
            className={`border-l-[3px] p-5 ${
              r.worthIt ? 'border-ink bg-paper-deep' : 'border-accent bg-paper-deep'
            }`}
          >
            <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
              {r.worthIt ? 'Worth doing' : 'Not worth doing'}
            </p>
            <p className="fig text-3xl font-semibold leading-none text-ink sm:text-4xl">
              {r.netSaving >= 0 ? inrCompact(r.netSaving) : `−${inrCompact(Math.abs(r.netSaving))}`}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
              {r.worthIt
                ? `Net saving over the remaining term, after ${inr(cost)} of switching costs.`
                : `You would be ${inrCompact(Math.abs(r.netSaving))} worse off once the ${inr(cost)} of switching costs is counted.`}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-6">
            <Readout label="EMI now" value={inr(r.currentEmi)} />
            <Readout
              label="EMI after"
              value={inr(r.newEmi)}
              sub={r.emiSaving > 0 ? `${inr(r.emiSaving)} lower each month` : 'No monthly saving'}
            />
          </div>

          <div className="mt-7 border-t border-ink/10 pt-6">
            <dl className="space-y-3 text-sm">
              <Row label="Total left to pay, as you are" value={inr(r.currentOutgo)} />
              <Row label="Total after switching, with costs" value={inr(r.newOutgo)} />
              {breakEven ? (
                <Row
                  label="Months to recover the switching cost"
                  value={`${breakEven}`}
                  note={
                    breakEven > remaining
                      ? 'Longer than the loan has left to run'
                      : `${pct((breakEven / remaining) * 100, 0)} of the remaining term`
                  }
                />
              ) : null}
            </dl>
          </div>

          {r.tenureExtended ? (
            <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-relaxed text-ink-soft">
              You have extended the tenure by {fmtMonths(newTenure - remaining)}. That is where most
              of the lower EMI is coming from — not from the rate. Compare the total figures above,
              not the monthly ones.
            </p>
          ) : null}
        </div>
      </div>

      <p className="border-t border-ink/15 bg-paper-deep px-6 py-4 text-2xs leading-relaxed text-ink-faint sm:px-8">
        Indicative. Switching costs vary by lender and by property — ask for the full schedule of
        charges in writing before you commit. Computed in your browser; nothing you enter is
        transmitted.
      </p>
    </div>
  )
}

function Row({ label, value, note }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3 last:border-b-0">
      <dt className="text-ink-soft">
        {label}
        {note ? <span className="mt-0.5 block text-2xs text-ink-faint">{note}</span> : null}
      </dt>
      <dd className="fig shrink-0 font-semibold text-ink">{value}</dd>
    </div>
  )
}
