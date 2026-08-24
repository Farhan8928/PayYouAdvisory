import { BRAND } from '../data/brand.js'
import { inrCompact, pct } from '../lib/format.js'

/**
 * Modern Segmented Progress Bar for Principal vs Interest split.
 */
export function SplitBar({ principal, interest }) {
  const total = principal + interest
  const share = total > 0 ? (principal / total) * 100 : 100

  return (
    <figure className="space-y-3">
      {/* Sleek rounded split progress track */}
      <div
        className="flex h-4 w-full overflow-hidden rounded-full bg-paper-deep border border-ink/10 p-0.5"
        role="img"
        aria-label={`Of the total amount payable, ${pct(share, 0)} is principal and ${pct(100 - share, 0)} is interest.`}
      >
        <div
          className="rounded-l-full bg-ink transition-all duration-300 shadow-sm"
          style={{ width: `${share}%` }}
        />
        <div
          className="rounded-r-full bg-accent transition-all duration-300 shadow-sm"
          style={{ width: `${100 - share}%` }}
        />
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-ink shadow-sm" aria-hidden="true" />
          <span className="font-bold text-ink-soft">Principal:</span>
          <span className="font-extrabold text-ink">{inrCompact(principal)}</span>
          <span className="rounded-md bg-paper-deep px-1.5 py-0.5 text-2xs font-bold text-ink-soft border border-ink/8">
            {pct(share, 0)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-accent shadow-sm" aria-hidden="true" />
          <span className="font-bold text-ink-soft">Total Interest:</span>
          <span className="font-extrabold text-accent">{inrCompact(interest)}</span>
          <span className="rounded-md bg-accent/10 px-1.5 py-0.5 text-2xs font-bold text-accent border border-accent/20">
            {pct(100 - share, 0)}
          </span>
        </div>
      </figcaption>
    </figure>
  )
}

function round(n) {
  return Math.round(n * 10) / 10
}

/**
 * Balance progression across tenure.
 */
export function BalanceChart({ years }) {
  if (!years || !years.length) return null

  const W = 720
  const H = 220
  const PAD = { top: 12, right: 8, bottom: 26, left: 8 }
  const plotW = W - PAD.left - PAD.right
  const plotH = H - PAD.top - PAD.bottom

  const maxYearOutgo = Math.max(...years.map((y) => y.principal + y.interest))
  const openingBalance = years[0].balance + years[0].principal

  const n = years.length
  const slot = plotW / n
  const barW = Math.max(2, Math.min(34, slot * 0.56))

  const points = [
    [PAD.left, PAD.top + plotH - (openingBalance / openingBalance) * plotH],
    ...years.map((y, i) => [
      PAD.left + slot * (i + 1) - slot / 2 + slot / 2,
      PAD.top + plotH - (y.balance / openingBalance) * plotH,
    ]),
  ]

  const line = points.map(([x, y]) => `${round(x)},${round(y)}`).join(' ')
  const area = `${PAD.left},${PAD.top + plotH} ${line} ${round(points[points.length - 1][0])},${PAD.top + plotH}`

  return (
    <figure className="rounded-xl border border-ink/10 bg-paper p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Amortisation schedule chart"
      >
        {years.map((y, i) => {
          const x = PAD.left + slot * i + (slot - barW) / 2
          const pH = (y.principal / maxYearOutgo) * plotH * 0.62
          const iH = (y.interest / maxYearOutgo) * plotH * 0.62
          const base = PAD.top + plotH
          return (
            <g key={y.year}>
              <rect x={round(x)} y={round(base - pH)} width={round(barW)} height={round(pH)} fill={BRAND.ink} rx="2" opacity="0.4" />
              <rect x={round(x)} y={round(base - pH - iH)} width={round(barW)} height={round(iH)} fill={BRAND.accent} rx="2" opacity="0.6" />
            </g>
          )
        })}
        <polygon points={area} fill={BRAND.ink} opacity="0.08" />
        <polyline points={line} fill="none" stroke={BRAND.accent} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </figure>
  )
}
