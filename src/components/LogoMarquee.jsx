import { LENDERS_WITH_LOGOS } from '../data/lenders.js'
import { LOGOS, LOGO_BOX } from '../data/logos.gen.js'

/**
 * The partner logos, as two continuously scrolling rows.
 *
 * ── How the seamless loop works ────────────────────────────────────────────
 * Each row renders its logos twice and animates `translateX` from 0 to exactly
 * -50%. At the end of the cycle the track is showing the second copy in the
 * position the first copy occupied at the start, so the jump back to 0 is
 * invisible. The duplicate is `aria-hidden`, so a screen reader hears twelve
 * bank names rather than twenty-four.
 *
 * The two rows run in opposite directions at 58s and 48s. Matching the speeds
 * makes the pair read as one rigid block sliding past; a difference of about
 * 20% is enough for them to feel independent without either drawing attention
 * to itself. Hovering anywhere over the band pauses both, so a reader can stop
 * on a logo they spotted instead of chasing it.
 *
 * ── The part that is easy to get wrong ─────────────────────────────────────
 * A marquee is `w-max` inside `overflow-hidden`. Switch the animation off and
 * it does not become a static row — it freezes at frame zero with everything
 * past the right edge clipped and invisible. So the `prefers-reduced-motion`
 * rule in index.css does not merely stop the animation: it makes the row wrap
 * and centre, and removes the duplicate copy. Same twelve logos, no movement,
 * nothing hidden. That is the whole reason the fallback is CSS rather than a
 * `motion-safe:` variant on the animation class.
 *
 * ── Why they are in colour ─────────────────────────────────────────────────
 * See the note on `.logo-tile` in src/styles/index.css. Short version: bank
 * recognition is the persuasion here, and desaturating HDFC's red hides the one
 * thing the reader came to the wall for.
 */
export default function LogoMarquee() {
  // Second row reversed, so the two bands never show the same pair of logos
  // above one another as they pass.
  const rows = [
    { key: 'a', lenders: LENDERS_WITH_LOGOS, className: 'marquee-row--slow' },
    { key: 'b', lenders: [...LENDERS_WITH_LOGOS].reverse(), className: 'marquee-row--reverse' },
  ]

  return (
    <div className="marquee mask-fade-r space-y-4 overflow-hidden">
      {rows.map((row) => (
        <div key={row.key} className={`marquee-row ${row.className}`}>
          {[false, true].map((isCopy) => (
            <ul
              key={isCopy ? 'copy' : 'original'}
              // The duplicate exists only to make the loop seamless. Hiding it
              // from the accessibility tree is what stops a screen reader
              // announcing the whole panel twice.
              aria-hidden={isCopy || undefined}
              className="flex shrink-0 gap-4"
            >
              {row.lenders.map((lender) => {
                const logo = LOGOS[lender.logo]
                if (!logo) return null
                return (
                  <li key={lender.logo} className="logo-tile">
                    <img
                      src={`/logos/${lender.logo}.png`}
                      srcSet={`/logos/${lender.logo}.png 1x, /logos/${lender.logo}@2x.png 2x`}
                      width={LOGO_BOX.width}
                      height={LOGO_BOX.height}
                      alt={isCopy ? '' : lender.name}
                      // `aria-hidden` here as well as on the parent <ul>. It is
                      // redundant for assistive technology — an empty alt
                      // already removes the image from the accessibility tree,
                      // and the container is hidden anyway — but it states the
                      // intent locally rather than by inheritance, which is
                      // what lets `audit:images` distinguish "decorative on
                      // purpose" from "somebody forgot the alt text".
                      aria-hidden={isCopy || undefined}
                      loading="lazy"
                      decoding="async"
                    />
                  </li>
                )
              })}
            </ul>
          ))}
        </div>
      ))}
    </div>
  )
}
