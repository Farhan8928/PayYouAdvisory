/**
 * The brand palette.
 *
 * ── Where these values come from ───────────────────────────────────────────
 * PayYou's own logo. Not chosen, not inferred from a category convention —
 * sampled, pixel by pixel, from
 * payyouadvisory.com/wp-content/themes/payyou-theme/assets/images/PayYou-Logo.webp
 *
 * The mark is the word "PAYOU" set in a royal blue with a red swoosh forming
 * the Y, over "Advisory Private Limited" in grey. Sampling every sufficiently
 * saturated pixel gives two tight clusters:
 *
 *   blue   #14478c · #144894 · #1c478c · #144c8d · #1b4794   → #164a90
 *   red    #dc2628 · #e62027 · #ef1e27 · #e81e1e · #e42732   → #e31e24
 *
 * Two earlier versions of this site invented a palette instead — first pine
 * and accent, then navy and gold. Both were defensible in the abstract and both
 * were wrong for the same reason: the client already has a brand, and a website
 * that does not match the logo above its own front door is not a design
 * decision, it is an oversight. Blue and red is also, as it happens, exactly
 * the register Indian retail banking works in — HDFC's own guide sheet, which
 * came bundled with their logo file, reads ED232A / FFFFFF / 004C8F.
 *
 * `tailwind.config.js` and `scripts/make-brand-assets.mjs` both import from
 * here, so the site and its generated assets cannot drift apart.
 * `npm run audit:brand` asserts they still agree.
 */
export const BRAND = {
  /** Dominant surface. White, with two cool greys beneath it. */
  paper: '#ffffff',
  paperDeep: '#f4f7fb',
  paperDark: '#e4ebf3',

  /** The logo blue, and the scale built around it. */
  ink: '#164a90',
  /** Dark sections and the footer. Deep enough to hold white type comfortably. */
  inkDeep: '#08203f',
  /** The second stop in every blue gradient — without it a dark band reads flat. */
  inkMid: '#1e5aae',
  /** Body text on white. Darker than the logo blue, because the logo blue is a
   *  brand colour rather than a reading colour: #164a90 at 17px is legible but
   *  tiring over a paragraph. */
  inkText: '#12325c',
  inkSoft: '#3e6ba8',
  inkFaint: '#8aa3c4',

  /** The logo red. Primary controls, rules, active states, emphasis. */
  accent: '#e31e24',
  /**
   * Red text on white.
   *
   * #e31e24 on white is about 4.0:1, which misses WCAG AA for body text by
   * enough to matter on a phone in daylight. #b8151b clears it at 6.5:1 and is
   * close enough that the two read as the same red.
   */
  accentDeep: '#b8151b',
  accentLight: '#ff4b50',

  /**
   * A light tint of the brand blue, for label text on dark grounds.
   *
   * The red cannot do that job: #e31e24 on #08203f is roughly 4.2:1, which is
   * marginal for a 12px letterspaced eyebrow. Rather than introduce an
   * unrelated hue, the emphasis colour on dark is the brand blue lightened
   * until it clears comfortably. Red still appears on dark — as button fills
   * and graphic rules, where contrast rules for text do not apply.
   */
  sky: '#9bc0f0',

  /** Semantic, deliberately outside the brand palette. WhatsApp controls only. */
  whatsapp: '#25d366',

  /* ── The hero shading ramp ──────────────────────────────────────────────
     Added 24 Aug 2026 with the hero rebuild.

     A rendered object needs tonal steps a flat interface palette does not
     have: a stage darker than any section ground, three shadow steps to model
     a form, and a specular highlight. Without them the artwork reads as
     stacked flat shapes rather than as something lit.

     Every value below is the logo blue moved along one axis, so the artwork
     cannot drift away from the brand the way a hand-picked shading set would.
     They live here rather than in the component precisely so that
     `npm run audit:brand` still catches a stray hex: the audit's allowed set
     is `Object.values(BRAND)`, and the fix for "this colour is not in the
     palette" must be a decision recorded here, never a suppression there.

     The reference site's coin is gold. This one is steel, because gold is
     IDFC's accent and not PayYou's. Their brand is blue and red, so the metal
     is a cool one and the rupee glyph on it is the logo red. */

  /** The hero stage. Darker than `inkDeep`, so a lit form reads against it. */
  stage: '#05101f',
  /** Shadow side of a modelled form. */
  formShadow: '#0a1e3c',
  /** Mid-tone body of a form. */
  formMid: '#0d264a',
  /** Lit face of a form. */
  formLit: '#0f2f5c',
  /** Catching the light: edges, chamfers, the top plane. */
  formEdge: '#2b6bbd',
  /** Specular highlight, the brightest point on brushed metal. */
  formSpecular: '#7fa8dc',
}

/** Colours that must also appear in the manifest and the theme-color meta tag. */
export const THEME_COLOR = BRAND.ink
export const BACKGROUND_COLOR = BRAND.paper
