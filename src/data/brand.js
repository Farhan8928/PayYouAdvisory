/**
 * The brand palette, in one place.
 *
 * Both `tailwind.config.js` and `scripts/make-brand-assets.mjs` import from
 * here, so the site and its generated assets — favicon, PWA icons, the Open
 * Graph share card — cannot drift apart. The failure this prevents is silent:
 * the site changes colour, the tab icon and every WhatsApp link preview keep
 * the old one, nothing errors, and nobody notices for months.
 * `npm run audit:brand` asserts the two still agree.
 *
 * ── Direction ──────────────────────────────────────────────────────────────
 * Deep navy and gold, on warm off-white. This is the premium-banking register
 * the client asked for and the one their reference sites work in — Aditya Birla
 * Capital's navy and gold, IDFC FIRST's deep institutional ground.
 *
 * An earlier version of this site used pine green and brass on the argument
 * that navy was what every competitor already used. That was a good argument
 * about differentiation and the wrong call for this client: green read austere
 * and cold rather than premium, and PayYou's job is to look like an institution
 * a person would hand their PAN number to. Distinctiveness here comes from
 * execution — the photography, the gold hairlines, the tabular figures, the
 * motion — not from picking an unexpected hue.
 *
 * The token names (`ink`, `paper`, `brass`) are deliberately abstract so a
 * palette change stays a change to this file rather than a rename across
 * eighty components. `brass` is gold; `ink` is navy.
 */
export const BRAND = {
  /** Dominant surface (~60%). Warm off-white — never pure #fff, which reads clinical. */
  paper: '#fbfaf7',
  paperDeep: '#f3f0e9',
  paperDark: '#e5e0d5',

  /** Dominant ink (~30%). Deep institutional navy. */
  ink: '#0b1d36',
  inkDeep: '#061223',
  /** The lighter stop in every navy gradient — without it, dark bands read flat. */
  inkMid: '#12304f',
  inkSoft: '#2a4a70',
  inkFaint: '#7089a8',

  /** Accent (~10%). Gold: rules, figures worth noticing, the primary control. */
  brass: '#c9a227',
  brassLight: '#e6c670',
  brassDeep: '#9c7a18',

  /** Semantic, deliberately outside the brand palette. WhatsApp controls only. */
  whatsapp: '#25d366',
}

/**
 * Colours that must also appear in `public/site.webmanifest` and the
 * `theme-color` meta tag.
 *
 * Note this is the *navy*, not the paper. The address bar tinting to match the
 * header rather than the page body is what makes an installed PWA and a mobile
 * browser look deliberate rather than default.
 */
export const THEME_COLOR = BRAND.inkDeep
export const BACKGROUND_COLOR = BRAND.paper
