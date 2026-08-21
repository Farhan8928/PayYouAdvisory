/**
 * Functional icons only — phone, WhatsApp, chevron, close, menu, arrow, check.
 *
 * Hand-drawn inline rather than pulled from an icon library on purpose. The
 * library route costs a dependency and, more to the point, makes it frictionless
 * to drop a decorative icon above every heading — which DESIGN.md § Layout
 * forbids, and which is one of the clearest tells that a page was assembled
 * rather than designed. Adding an icon here should require deciding it is worth
 * drawing.
 *
 * All are 24x24 on a 1.6 stroke, sized by the caller through `className`.
 * `aria-hidden` by default: an icon beside a label is decoration to a screen
 * reader, and repeating the label is noise. Pass a `title` only where the icon
 * is genuinely the only content of a control.
 */

function Svg({ children, className = 'h-4 w-4', title, filled = false, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

export const Phone = (p) => (
  <Svg {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
  </Svg>
)

export const Whatsapp = (p) => (
  <Svg {...p} filled>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.85c0 1.9.5 3.68 1.38 5.2L2 22l5.1-1.53a9.8 9.8 0 0 0 4.94 1.32h.01c5.44 0 9.85-4.4 9.85-9.85C21.9 6.4 17.48 2 12.04 2Zm5.75 13.9c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.1.07-1.78-.11a15.9 15.9 0 0 1-1.6-.6c-2.83-1.22-4.68-4.06-4.82-4.25-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.38.26-.29.57-.36.76-.36l.55.01c.17 0 .41-.07.64.49.24.57.81 1.97.88 2.11.07.14.12.31.02.5-.1.19-.14.31-.29.48l-.43.5c-.14.14-.29.3-.12.58.16.29.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.29.14.45.12.62-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.64-.14.26.09 1.66.78 1.94.93.29.14.48.21.55.33.07.12.07.69-.17 1.36Z" />
  </Svg>
)

export const ChevronDown = (p) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
)

export const ChevronRight = (p) => (
  <Svg {...p}>
    <path d="m9 6 6 6-6 6" />
  </Svg>
)

export const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M4 12h16m0 0-6-6m6 6-6 6" />
  </Svg>
)

export const Close = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

export const Menu = (p) => (
  <Svg {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Svg>
)

export const Check = (p) => (
  <Svg {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Svg>
)

export const Mail = (p) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="1" />
    <path d="m3 6 9 6.5L21 6" />
  </Svg>
)

export const Pin = (p) => (
  <Svg {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
)

export const Clock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </Svg>
)

export const Download = (p) => (
  <Svg {...p}>
    <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 19.5h16" />
  </Svg>
)

export const ShieldCheck = (p) => (
  <Svg {...p}>
    <path d="M12 3 5 6v5.5c0 4 2.9 7.7 7 9.5 4.1-1.8 7-5.5 7-9.5V6l-7-3Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </Svg>
)

/* ── Product marks ──────────────────────────────────────────────────────────
   One line-drawn mark per product, on the same 24x24 grid and the same 1.6
   stroke as the functional icons above, so a product mark and a chevron look
   like they came from the same hand.

   These are drawn rather than pulled from an icon library on purpose. A library
   gives you a house, a car and a shield that were each designed to different
   optical weights, and the mismatch shows the moment you put eight of them in a
   row — which is exactly where these are used.

   They are marks, not illustrations: no fills, no gradients, no little floating
   rupee symbols. At 28px in a card header the only thing that survives is the
   silhouette, and a busy icon at that size reads as a smudge. */

export const IconPersonal = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </Svg>
)

export const IconBusiness = (p) => (
  <Svg {...p}>
    <path d="M3 20h18" />
    <path d="M5 20V8.5L11 5v15" />
    <path d="M11 11h6.5a1.5 1.5 0 0 1 1.5 1.5V20" />
    <path d="M8 9.5v0M8 13v0M8 16.5v0M14.5 14v0M14.5 17v0" />
  </Svg>
)

export const IconHome = (p) => (
  <Svg {...p}>
    <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5Z" />
    <path d="M9.5 21v-6h5v6" />
  </Svg>
)

export const IconProperty = (p) => (
  <Svg {...p}>
    <path d="M4 21V6.5L12 3l8 3.5V21" />
    <path d="M3 21h18" />
    <circle cx="12" cy="11" r="1.9" />
    <path d="M12 12.9V16.5m0-1.2h1.6" />
  </Svg>
)

export const IconCar = (p) => (
  <Svg {...p}>
    <path d="M4 16.5v2a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-2M20 16.5v2a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-2" />
    <path d="M3 16.5v-3.2l1.7-4.4A2 2 0 0 1 6.6 7.6h10.8a2 2 0 0 1 1.9 1.3l1.7 4.4v3.2a.5.5 0 0 1-.5.5h-17a.5.5 0 0 1-.5-.5Z" />
    <path d="M3.6 13h16.8" />
    <path d="M7 15v0M17 15v0" />
  </Svg>
)

export const IconGold = (p) => (
  <Svg {...p}>
    <ellipse cx="12" cy="6.5" rx="6.5" ry="2.6" />
    <path d="M5.5 6.5v4c0 1.4 2.9 2.6 6.5 2.6s6.5-1.2 6.5-2.6v-4" />
    <path d="M5.5 10.5v4c0 1.4 2.9 2.6 6.5 2.6s6.5-1.2 6.5-2.6v-4" />
  </Svg>
)

export const IconWorkingCapital = (p) => (
  <Svg {...p}>
    <path d="M20 12a8 8 0 0 1-13.7 5.6M4 12a8 8 0 0 1 13.7-5.6" />
    <path d="M4 20v-4h4M20 4v4h-4" />
    <path d="M12 9v6M10.3 10.4h2.6a1.3 1.3 0 0 1 0 2.6h-1.8a1.3 1.3 0 0 0 0 2.6h2.6" />
  </Svg>
)

export const IconInsurance = (p) => (
  <Svg {...p}>
    <path d="M12 3 5 6v5.5c0 4 2.9 7.7 7 9.5 4.1-1.8 7-5.5 7-9.5V6l-7-3Z" />
    <path d="M12 8.5v5M9.5 11h5" />
  </Svg>
)

/**
 * The mark for a product slug.
 *
 * Keyed by slug so a product page, a card and the mega-menu all resolve the
 * same mark from one place. An unknown slug renders nothing rather than a
 * fallback question mark — a missing icon is a build mistake, and a placeholder
 * glyph on a client's live site is worse than a gap.
 */
const PRODUCT_ICONS = {
  'personal-loan': IconPersonal,
  'business-loan': IconBusiness,
  'home-loan': IconHome,
  'loan-against-property': IconProperty,
  'car-loan': IconCar,
  'gold-loan': IconGold,
  'working-capital-loan': IconWorkingCapital,
  insurance: IconInsurance,
}

export function ProductIcon({ slug, ...rest }) {
  const Mark = PRODUCT_ICONS[slug]
  return Mark ? <Mark {...rest} /> : null
}
