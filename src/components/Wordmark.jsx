import { markGeometry } from '../data/mark.js'
import { COMPANY } from '../data/site.js'

/**
 * The lockup: the mark, then the name set in the display serif with "ADVISORY"
 * in letterspaced mono beneath it.
 *
 * The mark's geometry is imported rather than drawn here so the header logo and
 * the favicon are provably the same shape — see src/data/mark.js.
 *
 * Sized by height only (`h-8` and so on); the width follows from the flex row,
 * so the lockup can be dropped anywhere without a magic aspect ratio.
 */
export default function Wordmark({ className = 'h-8', invert = false }) {
  const g = markGeometry(64)

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-full w-auto shrink-0"
        role="img"
        aria-label={COMPANY.shortName}
      >
        <rect width="64" height="64" fill={g.background} />
        {g.bars.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.fill} />
        ))}
      </svg>

      <span className="flex flex-col justify-center leading-none">
        {/* No `font-bold` here on purpose. Instrument Serif ships a single
            weight, so asking for bold makes the browser synthesise one by
            smearing the outline — which on a high-contrast serif looks exactly
            as bad as it sounds, and worst of all at wordmark size. */}
        <span
          className={`font-display text-[1.2em] tracking-[-0.015em] ${
            invert ? 'text-paper' : 'text-ink'
          }`}
        >
          PayYou
        </span>
        <span
          className={`mt-[0.15em] font-mono text-[0.42em] font-medium uppercase tracking-[0.34em] ${
            invert ? 'text-paper/55' : 'text-ink-faint'
          }`}
        >
          Advisory
        </span>
      </span>
    </span>
  )
}
