import { BRAND } from '../data/brand.js'
import { inrCompact, pct } from '../lib/format.js'

/**
 * Two small charts for the EMI calculator.
 *
 * They exist because this site has no photography (DESIGN.md § On photography)
 * and because the shape of a loan is genuinely hard to grasp from two numbers.
 * "Total interest ₹31,00,000" is abstract; a bar showing that interest is 46%
 * of everything you will pay is not.
 *
 * Drawn as inline SVG rather than through a charting library: the whole visual
 * is a handful of rectangles and one polygon, and a library would cost more
 * transferred bytes than the rest of the page put together. Every colour comes
 * from the palette in src/data/brand.js, so `npm run audit:brand` can prove the
 * charts did not drift when the palette changed.
 *
 * Both carry a text alternative, because a chart that only exists visually is
 * useless to a screen reader and invisible to a crawler.
 */

/** Principal against interest, as one horizontal bar. */
export function SplitBar({ principal, interest }) {
  const total = principal + interest
  const share = total > 0 ? (principal / total) * 100 : 100

  return (
    <figure>
      <div
        className="flex h-9 w-full overflow-hidden border border-ink/15"
        role="img"
        aria-label={`Of the total amount payable, ${pct(share, 0)} is the principal you borrowed and ${pct(100 - share, 0)} is interest.`}
      >
        <div className="bg-ink transition-[width] duration-300" style={{ width: `${share}%` }} />
        <div className="flex-1 bg-brass transition-[width] duration-300" />
      </div>

      <figcaption className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
        <Key colour={BRAND.ink} label="Principal" value={inrCompact(principal)} share={share} />
        <Key colour={BRAND.brass} label="Interest" value={inrCompact(interest)} share={100 - share} />
      </figcaption>
    </figure>
  )
}

function Key({ colour, label, value, share }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 shrink-0" style={{ background: colour }} aria-hidden="true" />
      <span className="text-2xs uppercase tracking-[0.1em] text-ink-faint">{label}</span>
      <span className="fig text-sm font-semibold text-ink">{value}</span>
      <span className="fig text-2xs text-ink-faint">{pct(share, 0)}</span>
    </span>
  )
}

/**
 * Outstanding balance across the life of the loan, with each year's interest
 * and principal stacked beneath it.
 *
 * The point this makes — and it surprises most people — is that the early years
 * are almost entirely interest. Someone planning to sell in four years is
 * looking at a bar chart telling them they will have repaid very little of what
 * they borrowed, which is a genuinely useful thing to learn before signing.
 *
 * The viewBox is fixed and the SVG scales to its container, so there is no
 * measurement, no ResizeObserver, and identical output from the server render
 * and the client — a chart that measures the DOM cannot be prerendered.
 */
export function BalanceChart({ years }) {
  if (!years.length) return null

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

  // The balance line, as a filled area under a polyline. Starts at the opening
  // balance so the first segment shows the first year's repayment, not a
  // horizontal run-in from nowhere.
  const points = [
    [PAD.left, PAD.top + plotH - (openingBalance / openingBalance) * plotH],
    ...years.map((y, i) => [
      PAD.left + slot * (i + 1) - slot / 2 + slot / 2,
      PAD.top + plotH - (y.balance / openingBalance) * plotH,
    ]),
  ]

  const line = points.map(([x, y]) => `${round(x)},${round(y)}`).join(' ')
  const area = `${PAD.left},${PAD.top + plotH} ${line} ${round(points[points.length - 1][0])},${PAD.top + plotH}`

  // Label every year on a short loan, every fifth on a long one — a 30-year
  // axis with 30 labels is unreadable at any width.
  const labelEvery = n <= 10 ? 1 : n <= 20 ? 2 : 5

  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Outstanding balance falls from ${inrCompact(openingBalance)} to zero over ${n} years. In year 1 you pay ${inrCompact(years[0].interest)} of interest against ${inrCompact(years[0].principal)} of principal; by the final year that is reversed.`}
      >
        {/* Yearly outgo, stacked: interest on top of principal. */}
        {years.map((y, i) => {
          const x = PAD.left + slot * i + (slot - barW) / 2
          const pH = (y.principal / maxYearOutgo) * plotH * 0.62
          const iH = (y.interest / maxYearOutgo) * plotH * 0.62
          const base = PAD.top + plotH
          return (
            <g key={y.year}>
              <rect x={round(x)} y={round(base - pH)} width={round(barW)} height={round(pH)} fill={BRAND.ink} opacity="0.16" />
              <rect
                x={round(x)}
                y={round(base - pH - iH)}
                width={round(barW)}
                height={round(iH)}
                fill={BRAND.brass}
                opacity="0.32"
              />
            </g>
          )
        })}

        {/* Balance area and line. */}
        <polygon points={area} fill={BRAND.ink} opacity="0.06" />
        <polyline points={line} fill="none" stroke={BRAND.ink} strokeWidth="2" strokeLinejoin="round" />

        {/* Baseline. */}
        <line
          x1={PAD.left}
          y1={PAD.top + plotH}
          x2={W - PAD.right}
          y2={PAD.top + plotH}
          stroke={BRAND.ink}
          strokeWidth="1"
          opacity="0.25"
        />

        {/* Year labels. */}
        {years.map((y, i) =>
          (i + 1) % labelEvery === 0 || i === 0 ? (
            <text
              key={y.year}
              x={round(PAD.left + slot * i + slot / 2)}
              y={H - 8}
              textAnchor="middle"
              fontSize="11"
              fontFamily="IBM Plex Mono, monospace"
              fill={BRAND.inkFaint}
            >
              {y.year}
            </text>
          ) : null,
        )}
      </svg>

      <figcaption className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-2xs text-ink-faint">
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-4 shrink-0" style={{ background: BRAND.ink }} aria-hidden="true" />
          Outstanding balance
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 shrink-0 opacity-[0.32]" style={{ background: BRAND.brass }} aria-hidden="true" />
          Interest paid that year
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 shrink-0 opacity-[0.16]" style={{ background: BRAND.ink }} aria-hidden="true" />
          Principal repaid that year
        </span>
        <span className="ml-auto">Year of loan →</span>
      </figcaption>
    </figure>
  )
}

const round = (n) => Math.round(n * 10) / 10
