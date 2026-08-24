import { useMemo, useState } from 'react'
import Field, { Readout } from './Field.jsx'
import { sipFutureValue } from '../lib/finance.js'
import { inrCompact, inrSmart, inr } from '../lib/format.js'
import { ArrowRight } from '../components/Icon.jsx'

export default function SipCalculator({ compact = false }) {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const [focused, setFocused] = useState(null)

  const fieldProps = { focused, onFocus: setFocused, onBlur: () => setFocused(null) }

  const main = useMemo(
    () => sipFutureValue({ monthly, annualReturnPct: rate, years }),
    [monthly, rate, years],
  )

  const investedShare = main.value > 0 ? (main.invested / main.value) * 100 : 100

  return (
    <div className="rounded-2xl border border-ink/10 bg-paper overflow-hidden shadow-sm">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-6 lg:col-span-7">
          <Field
            label="Monthly Investment Amount"
            value={monthly}
            onChange={setMonthly}
            min={500}
            max={200000}
            step={500}
            prefix="₹"
            presets={[
              { label: '₹5k', value: 5000 },
              { label: '₹10k', value: 10000 },
              { label: '₹25k', value: 25000 },
              { label: '₹50k', value: 50000 },
            ]}
            {...fieldProps}
          />

          <Field
            label="Expected Annual Return (% p.a.)"
            value={rate}
            onChange={setRate}
            min={5}
            max={25}
            step={0.5}
            suffix="%"
            format="raw"
            presets={[
              { label: '8% Conservative', value: 8 },
              { label: '12% Balanced', value: 12 },
              { label: '15% Aggressive', value: 15 },
            ]}
            {...fieldProps}
          />

          <Field
            label="Investment Horizon (Years)"
            value={years}
            onChange={setYears}
            min={1}
            max={35}
            step={1}
            suffix="Yrs"
            format="raw"
            presets={[
              { label: '3 Yrs', value: 3 },
              { label: '5 Yrs', value: 5 },
              { label: '10 Yrs', value: 10 },
              { label: '20 Yrs', value: 20 },
            ]}
            {...fieldProps}
          />
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-paper-deep p-6 sm:p-7 lg:col-span-5 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-accent">
                Expected Future Value
              </span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-2xs font-bold text-accent">
                Compounded
              </span>
            </div>

            <div className="mt-4 border-b border-ink/10 pb-5">
              <p className="fig text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
                {inr(Math.round(main.value))}
              </p>
              <p className="mt-1 text-xs text-ink-soft">
                Total investment: {inr(main.invested)} · Estimated wealth gain: <strong className="text-accent">{inr(Math.round(main.gain))}</strong>
              </p>
            </div>

            {/* Split progress */}
            <div className="mt-5 space-y-2">
              <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-paper border border-ink/10 p-0.5">
                <div
                  className="rounded-l-full bg-ink transition-all duration-300"
                  style={{ width: `${investedShare}%` }}
                />
                <div
                  className="rounded-r-full bg-accent transition-all duration-300"
                  style={{ width: `${100 - investedShare}%` }}
                />
              </div>
              <div className="flex justify-between text-2xs font-bold text-ink-soft pt-1">
                <span>Invested: {inrCompact(main.invested)}</span>
                <span className="text-accent">Returns: {inrCompact(Math.round(main.gain))}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-ink/10">
            <a
              href="/calculators/"
              className="btn-accent w-full flex items-center justify-center gap-2 font-bold shadow-sm"
            >
              <span>Explore Wealth &amp; Investment Plans →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
