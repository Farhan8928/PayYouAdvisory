import { BRAND_LOGO } from '../data/logos.gen.js'
import { COMPANY } from '../data/site.js'

/**
 * PayYou's actual logo.
 *
 * Two earlier versions of this site drew a mark from scratch — three bars
 * resolving into one, meant to say "many lenders, one application". It was a
 * nice idea and it was not the client's logo, which is the only thing that
 * matters. This is the real file, taken from payyouadvisory.com and processed
 * by `npm run logos`.
 *
 * ── The `invert` problem ───────────────────────────────────────────────────
 * The mark is royal blue with a red swoosh on transparency. On the dark blue
 * footer the blue wordmark all but disappears, and there is no clean way to
 * recolour a two-colour raster logo to white without destroying the swoosh.
 *
 * So on dark grounds it sits on a white chip instead. That is a normal, correct
 * way to place a logo that has no reversed version — it protects the mark's
 * colours rather than mangling them — and it is why the site's dark sections
 * show the logo in a rounded white panel rather than as bare artwork.
 *
 * TODO(client): a proper reversed (white/knockout) version of the logo, plus
 * the original vector, would let the footer drop the chip. Worth asking whoever
 * made the mark; it is a five-minute export.
 */
export default function Wordmark({ className = 'h-9', invert = false, priority = false }) {
  const img = (
    <img
      src="/brand/payyou-logo.png"
      srcSet="/brand/payyou-logo.png 1x, /brand/payyou-logo@2x.png 2x"
      width={BRAND_LOGO.width}
      height={BRAND_LOGO.height}
      alt={`${COMPANY.name} logo`}
      className="h-full w-auto"
      // Only the header lockup is `priority`. The same file also renders in
      // the mobile drawer and the footer, and marking all three eager makes
      // every page ship three high-priority image requests for one 19 kB file
      // — harmless in practice, because the browser fetches it once, but it
      // muddies the signal the LCP heuristics actually use. `audit:images`
      // warns when a page has more than one eager image.
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
    />
  )

  if (invert) {
    return (
      <span className={`inline-flex items-center rounded-md bg-white px-3 py-2 ${className}`}>
        {img}
      </span>
    )
  }

  return <span className={`inline-flex items-center ${className}`}>{img}</span>
}
