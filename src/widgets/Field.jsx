import { useId } from 'react'
import { clamp } from '../lib/finance.js'
import { num } from '../lib/format.js'

/**
 * A number field with a slider beneath it.
 *
 * Both controls edit the same value, because neither alone is good enough: a
 * slider cannot express "₹37,50,000" and a bare text input makes exploring a
 * range tedious. Together they cover both the reader who knows their number and
 * the one who is playing with possibilities — which on a loan calculator is
 * most people.
 *
 * ── Why the text input is `type="text"` ────────────────────────────────────
 * `type="number"` looks like the right answer and is not. It silently discards
 * a value the browser considers invalid mid-typing, so clearing the field to
 * retype an amount can yield an empty string that coerces to 0 and momentarily
 * shows an EMI of ₹0. It also renders spinners nobody wants and, on iOS, does
 * not reliably bring up the numeric keypad. `inputMode="numeric"` does bring up
 * the keypad, and parsing the string ourselves means we control exactly what
 * happens to "12,50,000" and to "".
 *
 * The displayed value is grouped Indian-style while the field is not focused
 * and left raw while it is, so grouping never fights the caret.
 */
export default function Field({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  hint,
  format = 'group',
  focused,
  onFocus,
  onBlur,
}) {
  const id = useId()
  const isFocused = focused === id

  const display = isFocused
    ? String(value)
    : format === 'group'
      ? num(value)
      : String(value)

  const commit = (raw) => {
    // Strip everything that is not a digit or a decimal point, so a pasted
    // "₹12,50,000" lands as 1250000 rather than as NaN.
    const cleaned = String(raw).replace(/[^\d.]/g, '')
    if (cleaned === '') return onChange(min)
    onChange(clamp(parseFloat(cleaned), min, max))
  }

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>

      <div className="relative">
        {prefix ? (
          <span className="fig pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-ink-faint">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={display}
          onChange={(e) => commit(e.target.value)}
          onFocus={() => onFocus?.(id)}
          onBlur={() => onBlur?.()}
          className={`field-fig ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-12' : ''}`}
        />
        {suffix ? (
          <span className="fig pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-faint">
            {suffix}
          </span>
        ) : null}
      </div>

      <input
        type="range"
        aria-label={`${label} slider`}
        min={min}
        max={max}
        step={step}
        value={clamp(value, min, max)}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="slider mt-3"
      />

      <div className="mt-1.5 flex justify-between">
        <span className="fig text-2xs text-ink-faint">
          {prefix}
          {num(min)}
          {suffix}
        </span>
        {hint ? <span className="text-2xs text-ink-faint">{hint}</span> : null}
        <span className="fig text-2xs text-ink-faint">
          {prefix}
          {num(max)}
          {suffix}
        </span>
      </div>
    </div>
  )
}

/**
 * A read-out: a label above a large tabular figure.
 * `emphasis` promotes the one number the reader actually came for.
 */
export function Readout({ label, value, sub, emphasis = false, invert = false }) {
  return (
    <div>
      <span
        className={`mb-1.5 block text-2xs font-medium uppercase tracking-[0.12em] ${
          invert ? 'text-paper/50' : 'text-ink-faint'
        }`}
      >
        {label}
      </span>
      <span
        className={`fig block font-semibold leading-none ${
          emphasis ? 'text-3xl sm:text-4xl' : 'text-xl'
        } ${invert ? 'text-paper' : 'text-ink'}`}
      >
        {value}
      </span>
      {sub ? (
        <span
          className={`mt-1.5 block text-2xs leading-snug ${
            invert ? 'text-paper/50' : 'text-ink-faint'
          }`}
        >
          {sub}
        </span>
      ) : null}
    </div>
  )
}
