import { useId } from 'react'
import { clamp } from '../lib/finance.js'
import { num } from '../lib/format.js'
import { BRAND } from '../data/brand.js'

/**
 * Modern Bank-Grade Number & Slider Field (IDFC FIRST Bank style):
 * - Clean layout with ample spacing
 * - Suffix and prefix clearly separated from input value (no overlapping text)
 * - Custom gradient-filled slider
 * - Quick selection pills
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
  presets,
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
    const cleaned = String(raw).replace(/[^\d.]/g, '')
    if (cleaned === '') return onChange(min)
    onChange(clamp(parseFloat(cleaned), min, max))
  }

  // Calculate percentage for custom slider track fill
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))

  return (
    <div className="rounded-xl bg-paper p-4 border border-ink/10 shadow-sm space-y-3">
      {/* Top row: Label on left, Clean Input on right */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label htmlFor={id} className="text-xs font-extrabold uppercase tracking-wider text-ink">
          {label}
        </label>

        {/* Input box with clean badge styling */}
        <div className="flex items-center rounded-lg border border-ink/20 bg-paper-deep px-3 py-1.5 focus-within:border-accent focus-within:bg-white focus-within:ring-2 focus-within:ring-accent/20 transition-all">
          {prefix ? (
            <span className="text-sm font-bold text-ink-soft mr-1.5 select-none">
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
            className="w-32 sm:w-36 bg-transparent text-right text-base sm:text-lg font-extrabold text-ink outline-none"
          />
          {suffix ? (
            <span className="text-xs font-bold text-ink-soft ml-1.5 select-none whitespace-nowrap">
              {suffix}
            </span>
          ) : null}
        </div>
      </div>

      {/* Slider Track with Custom Red Progress Fill */}
      <div className="py-1">
        <input
          type="range"
          aria-label={`${label} slider`}
          min={min}
          max={max}
          step={step}
          value={clamp(value, min, max)}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          // Filled portion in the logo red, unfilled in the palette's lightest
          // grey. Both come from src/data/brand.js rather than being written
          // here: the first version hardcoded #e2e8f0, a Tailwind default grey
          // that is in nobody's brand, and `npm run audit:brand` failed 156
          // pages over it.
          style={{
            background: `linear-gradient(to right, ${BRAND.accent} 0%, ${BRAND.accent} ${pct}%, ${BRAND.paperDark} ${pct}%, ${BRAND.paperDark} 100%)`,
          }}
          className="slider w-full cursor-pointer appearance-none rounded-full h-2"
        />
      </div>

      {/* Range Min, Hint, and Max Indicators with clear spacing */}
      <div className="flex items-center justify-between text-2xs font-semibold text-ink-faint">
        <span>
          {prefix ? prefix + ' ' : ''}
          {num(min)} {suffix ? suffix : ''}
        </span>
        {hint ? (
          <span className="rounded-full bg-accent/10 px-2 py-0.5 font-bold text-accent">
            {hint}
          </span>
        ) : null}
        <span>
          {prefix ? prefix + ' ' : ''}
          {num(max)} {suffix ? suffix : ''}
        </span>
      </div>

      {/* Quick Select Preset Pills */}
      {presets && presets.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-ink/8">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => onChange(p.value)}
              className={`rounded-full px-3 py-1 text-2xs font-bold transition-all ${
                value === p.value
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-paper-deep text-ink-soft hover:bg-ink/10 hover:text-ink'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

/**
 * Modern read-out card for calculated outputs.
 */
export function Readout({ label, value, sub, emphasis = false, invert = false }) {
  return (
    <div className={`rounded-xl p-4 transition-all ${emphasis ? 'bg-accent/10 border border-accent/25' : 'bg-paper-deep border border-ink/8'}`}>
      <span
        className={`block text-2xs font-bold uppercase tracking-wider ${
          emphasis ? 'text-accent' : 'text-ink-soft'
        }`}
      >
        {label}
      </span>
      <span
        className={`fig mt-1 block font-extrabold leading-none ${
          emphasis ? 'text-2xl sm:text-3xl text-ink' : 'text-lg sm:text-xl text-ink'
        }`}
      >
        {value}
      </span>
      {sub ? (
        <span className="mt-1 block text-2xs font-medium text-ink-faint">
          {sub}
        </span>
      ) : null}
    </div>
  )
}
