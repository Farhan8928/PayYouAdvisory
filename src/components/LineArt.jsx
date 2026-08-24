/**
 * White line-art illustrations for the coloured product tiles.
 *
 * ── Why these are drawn rather than downloaded ─────────────────────────────
 * The reference site's tiles each carry a large white outline drawing — a
 * piggy bank, a hand holding coins, a card, a globe wrapped in arrows. That
 * device is most of what makes its product grid recognisable, and it is
 * entirely reproducible: single-weight strokes, round caps and joins, no fill,
 * no detail below about 8px. Downloading an icon set would give a different
 * stroke weight on every glyph and a licence to track; drawing them to one
 * spec gives a set that reads as one hand.
 *
 * ── The spec every glyph follows ───────────────────────────────────────────
 *   · 120 x 120 viewBox, artwork roughly 96 square, centred
 *   · stroke 4, `currentColor`, round cap and join, never a fill
 *   · no shape smaller than 8 units: these render at 120–180px on a tile and
 *     at 28px in the tab strip, and fine detail turns to mud at the small end
 *   · `vector-effect: non-scaling-stroke` so the weight stays 4 at any size
 *
 * Colour comes from `currentColor`, so a tile sets it once on the parent and
 * every glyph follows. Nothing here carries a colour of its own, which is why
 * `npm run audit:brand` has nothing to complain about.
 */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
}

function Art({ children, className = '' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <g {...base}>{children}</g>
    </svg>
  )
}

/** A hand offering coins. The reference uses this for personal lending. */
export const HandCoins = (p) => (
  <Art {...p}>
    <circle cx="47" cy="34" r="17" />
    <circle cx="74" cy="41" r="12" />
    <path d="M20 78 h13 l10 7 h17" />
    <path d="M60 85 h12 a6 6 0 0 0 0 -12 h-19 l-9 -7 h-12" />
    <path d="M20 70 v34" />
    <path d="M60 85 c14 0 24 -4 33 -12 l7 -6" />
  </Art>
)

/** A shopfront with an awning, for business lending. */
export const Storefront = (p) => (
  <Art {...p}>
    <path d="M22 46 l8 -20 h60 l8 20" />
    <path d="M22 46 h76 v54 h-76 z" />
    <path d="M22 46 c0 8 6 12 13 12 s13 -4 13 -12" />
    <path d="M48 46 c0 8 6 12 12 12 s12 -4 12 -12" />
    <path d="M72 46 c0 8 6 12 13 12 s13 -4 13 -12" />
    <path d="M40 100 v-26 h22 v26" />
  </Art>
)

/** A house with a key, for home loans. */
export const HouseKey = (p) => (
  <Art {...p}>
    <path d="M18 58 l42 -34 l42 34" />
    <path d="M28 52 v48 h64 v-48" />
    <path d="M50 100 v-24 h20 v24" />
    <circle cx="60" cy="60" r="8" />
  </Art>
)

/** A building with a rupee plate, for loan against property. */
export const Building = (p) => (
  <Art {...p}>
    <path d="M26 100 v-72 h40 v72" />
    <path d="M66 100 v-44 h28 v44" />
    <path d="M38 44 h16 M38 60 h16 M38 76 h16" />
    <path d="M76 70 h8 M76 84 h8" />
    <path d="M18 100 h84" />
  </Art>
)

/** A car in profile, for vehicle finance. */
export const Car = (p) => (
  <Art {...p}>
    <path d="M20 74 v-12 l10 -22 h48 l14 22 h8 v12" />
    <path d="M20 74 h80" />
    <circle cx="38" cy="80" r="9" />
    <circle cx="84" cy="80" r="9" />
    <path d="M40 40 v20 M62 40 v20" />
  </Art>
)

/** A stack of coins with a rupee, for gold and deposits. */
export const CoinStack = (p) => (
  <Art {...p}>
    <ellipse cx="60" cy="34" rx="28" ry="11" />
    <path d="M32 34 v14 c0 6 13 11 28 11 s28 -5 28 -11 v-14" />
    <path d="M32 56 v14 c0 6 13 11 28 11 s28 -5 28 -11 v-14" />
    <path d="M32 78 v14 c0 6 13 11 28 11 s28 -5 28 -11 v-14" />
  </Art>
)

/** A graduation cap, for education loans. */
export const Graduation = (p) => (
  <Art {...p}>
    <path d="M14 48 l46 -20 l46 20 l-46 20 z" />
    <path d="M34 58 v24 c0 8 12 14 26 14 s26 -6 26 -14 v-24" />
    <path d="M100 52 v26" />
  </Art>
)

/** An umbrella, for insurance. */
export const Umbrella = (p) => (
  <Art {...p}>
    <path d="M16 58 a44 32 0 0 1 88 0 z" />
    <path d="M60 58 v34 a10 10 0 0 0 20 0" />
    <path d="M38 58 c0 -18 10 -32 22 -32 s22 14 22 32" />
  </Art>
)

/** A shield with a tick, for protection and trust. */
export const Shield = (p) => (
  <Art {...p}>
    <path d="M60 18 l34 13 v30 c0 24 -18 36 -34 41 c-16 -5 -34 -17 -34 -41 v-30 z" />
    <path d="M45 60 l11 12 l22 -26" />
  </Art>
)

/** A rising bar chart, for investments and business growth. */
export const Growth = (p) => (
  <Art {...p}>
    <path d="M20 100 h84" />
    <path d="M32 100 v-22 M52 100 v-38 M72 100 v-54 M92 100 v-30" />
    <path d="M28 44 l22 -14 l18 12 l24 -22" />
    <path d="M78 20 h14 v14" />
  </Art>
)

/** A globe wrapped in transfer arrows, for NRI and remittance. */
export const GlobeArrows = (p) => (
  <Art {...p}>
    <circle cx="60" cy="58" r="30" />
    <path d="M60 28 c-14 12 -14 48 0 60 c14 -12 14 -48 0 -60" />
    <path d="M30 58 h60" />
    <path d="M22 92 a44 44 0 0 0 30 12" />
    <path d="M22 78 v14 h14" />
    <path d="M98 24 a44 44 0 0 0 -30 -12" />
    <path d="M98 38 v-14 h-14" />
  </Art>
)

/** A calculator, for the tools group. */
export const Calculator = (p) => (
  <Art {...p}>
    <rect x="28" y="18" width="64" height="84" rx="8" />
    <rect x="40" y="30" width="40" height="16" rx="3" />
    <path d="M42 62 h8 M56 62 h8 M70 62 h8" />
    <path d="M42 78 h8 M56 78 h8 M70 78 h8" />
    <path d="M42 92 h22 M70 92 h8" />
  </Art>
)

/** A document with a tick, for documentation guides. */
export const DocCheck = (p) => (
  <Art {...p}>
    <path d="M32 16 h34 l22 22 v66 h-56 z" />
    <path d="M66 16 v22 h22" />
    <path d="M44 62 h32 M44 76 h32" />
    <path d="M44 46 h14" />
  </Art>
)

/** An award ribbon, for the trust and recognition tile. */
export const Award = (p) => (
  <Art {...p}>
    <circle cx="60" cy="46" r="26" />
    <path d="M60 34 l4 8 l9 1 l-6 6 l1 9 l-8 -4 l-8 4 l1 -9 l-6 -6 l9 -1 z" />
    <path d="M46 68 l-8 34 l22 -10 l22 10 l-8 -34" />
  </Art>
)

/** Named lookup, so a data file can reference art by string. */
export const LINE_ART = {
  'hand-coins': HandCoins,
  storefront: Storefront,
  'house-key': HouseKey,
  building: Building,
  car: Car,
  'coin-stack': CoinStack,
  graduation: Graduation,
  umbrella: Umbrella,
  shield: Shield,
  growth: Growth,
  'globe-arrows': GlobeArrows,
  calculator: Calculator,
  'doc-check': DocCheck,
  award: Award,
}
