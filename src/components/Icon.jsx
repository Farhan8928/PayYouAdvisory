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
