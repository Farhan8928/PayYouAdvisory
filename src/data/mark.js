/**
 * The mark's geometry, in one place.
 *
 * Both the React `<Wordmark />` and `scripts/make-brand-assets.mjs` build their
 * SVG from this function, so the logo in the header and the icon in the browser
 * tab are the same drawing rather than two drawings that happen to look alike.
 * The Gouri project shipped that second thing and the two silently diverged.
 *
 * ── What it draws ──────────────────────────────────────────────────────────
 * Three accent strokes of unequal length, the middle one continuing past the
 * others in paper: several lenders assessed, one application submitted. The
 * site's entire argument in four rectangles.
 *
 * Everything is rectangles on purpose. At 16px in a browser tab a diagonal
 * anti-aliases into grey mush and a curve disappears; flat horizontal bars on a
 * solid ground survive down to a favicon, which is the only size at which most
 * people will ever see it.
 *
 * ── Why the bars are unequal ───────────────────────────────────────────────
 * The first version drew them the same length, which was tidier and wrong:
 * three equal horizontal bars is the universal hamburger-menu glyph, and a
 * favicon that reads as a menu button is worse than no favicon. Staggering the
 * lengths breaks that read instantly and, as a bonus, makes the mark scan as a
 * small bar chart — which is the right neighbourhood for a lending business.
 *
 * `pad` insets the whole mark for the Android maskable icon, which is cropped
 * to a circle.
 */
import { BRAND } from './brand.js'

export function markGeometry(size, pad = 0) {
  const inset = size * pad
  const inner = size - inset * 2
  /** Position on a 64-unit design grid, mapped into the padded box. */
  const u = (n) => inset + (inner * n) / 64
  /** Length on the same grid. */
  const w = (n) => (inner * n) / 64

  const barH = w(6)

  return {
    size,
    background: BRAND.ink,
    bars: [
      // Three inputs, stacked and deliberately unequal.
      { x: u(12), y: u(15), w: w(24), h: barH, fill: BRAND.accent },
      { x: u(12), y: u(29), w: w(15), h: barH, fill: BRAND.accent },
      { x: u(12), y: u(43), w: w(19), h: barH, fill: BRAND.accent },
      // The output: continues the middle row, in paper, past all three.
      { x: u(31), y: u(29), w: w(21), h: barH, fill: BRAND.paper },
    ],
  }
}

/** The same drawing as a standalone SVG string, for the build-time asset generator. */
export function markSvgString(size, pad = 0) {
  const g = markGeometry(size, pad)
  const rects = g.bars
    .map((b) => `<rect x="${r(b.x)}" y="${r(b.y)}" width="${r(b.w)}" height="${r(b.h)}" fill="${b.fill}"/>`)
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${g.background}"/>${rects}</svg>`
}

/** Trim float noise so the generated SVG diffs cleanly between builds. */
const r = (n) => Math.round(n * 100) / 100
