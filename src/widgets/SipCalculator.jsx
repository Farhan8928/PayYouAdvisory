import { useMemo, useState } from 'react'
import Field, { Readout } from './Field.jsx'
import { sipFutureValue } from '../lib/finance.js'
import { inr, inrCompact } from '../lib/format.js'

/**
 * What a monthly investment might grow to.
 *
 * ── The one thing this page must not do ────────────────────────────────────
 * A SIP calculator is the easiest page on a financial site to turn into a
 * mis-selling instrument. Put 15% in the rate box by default, show a large
 * number in a big font, and the reader leaves believing they have been
 * promised something. They have not: an equity return is an assumption, not a
 * contracted rate, and the same calculation with a lower assumption produces a
 * very different answer.
 *
 * So three deliberate decisions. The assumed return defaults to a modest
 * figure rather than an optimistic one. The amount actually invested is shown
 * at the same size as the projected value, so the reader sees how much of the
 * total is their own money. And a second, lower assumption is always displayed
 * alongside, because the honest way to present an uncertain projection is as a
 * range rather than as a number.
 */
export default function SipCalculator({ compact = false }) {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(10)
  const [focused, setFocused] = useState(null)

  const fieldProps = { focused, onFocus: setFocused, onBlur: () => setFocused(null) }

  const main = useMemo(
    () => sipFutureValue({ monthly, annualReturnPct: rate, years }),
    [monthly, rate, years],
  )
  // A deliberately lower assumption, shown alongside. Four points below is
  // roughly the gap between a hopeful equity assumption and a sober one.
  const lower = useMemo(
    () => sipFutureValue({ monthly, annualReturnPct: Math.max(0, rate - 4), years }),
    [monthly, rate, years],
  )

  return (
    <div className="border border-ink/15 bg-paper">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="space-y-7 border-b border-ink/15 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <Field
            label="Invested each month"
            value={monthly}
            onChange={setMonthly}
            min={500}
            max={500000}
            step={500}
            prefix="₹"
            {...fieldProps}
          />
          <Field
            label="Assumed annual return"
            value={rate}
            onChange={setRate}
            min={1}
            max={20}
            step={0.5}
            suffix="% p.a."
            format="raw"
            hint="an assumption, not a rate"
            {...fieldProps}
          />
          <Field
            label="For how long"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            suffix="years"
            format="raw"
            {...fieldProps}
          />

          <p className="border-t border-ink/10 pt-5 text-2xs leading-relaxed text-ink-faint">
            Everything here is computed in your browser. No figure you type is sent to us or to
            anyone else.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Readout label="You would have put in" value={inr(main.invested)} emphasis />
            <Readout
              label={`Value at ${rate}% a year`}
              value={inr(Math.round(main.value))}
              emphasis
              sub={`${inrCompact(Math.round(main.gain))} of it is growth`}
            />
          </div>

          <div className="mt-7 border-t border-ink/10 pt-6">
            <Readout
              label={`And if returns were ${Math.max(0, rate - 4)}% instead`}
              value={inr(Math.round(lower.value))}
              sub="Same money, a soberer assumption. The gap between these two is the risk."
            />
          </div>

          {!compact ? (
            <p className="mt-7 border-t border-ink/10 pt-5 text-2xs leading-relaxed text-ink-faint">
              Market returns are not contracted and past performance does not predict them. These
              figures are arithmetic on the assumption you entered, not a projection PayYou is
              making and not an offer. PayYou Advisory does not manage money or advise on securities.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
