/**
 * Number and currency formatting, Indian conventions throughout.
 *
 * Every figure on this site goes through one of these. The reason is DESIGN.md
 * § The figure rule: on a lending site the numbers *are* the product, and a
 * rupee amount grouped the international way — ₹1,500,000 instead of
 * ₹15,00,000 — tells an Indian reader immediately that the site was not built
 * for them. It is a small thing that is noticed every single time.
 */

/**
 * Indian digit grouping: the last three digits, then groups of two.
 * 1500000 → "15,00,000".
 *
 * `Intl.NumberFormat('en-IN')` does this correctly and is available in every
 * browser this site targets and in Node 18+, so the prerender and the hydrated
 * client agree. Hand-rolling the regex was the first implementation and it
 * disagreed with Intl on negative numbers, which is exactly the kind of
 * mismatch that produces a hydration warning nobody can reproduce.
 */
const groupIN = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })
const groupIN2 = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** ₹15,00,000 */
export const inr = (n) => `₹${groupIN.format(Math.round(Number(n) || 0))}`

/** ₹15,00,000.00 — for anything that has to reconcile to the paisa. */
export const inr2 = (n) => `₹${groupIN2.format(Number(n) || 0)}`

/** Bare grouped number, no symbol. For table columns that carry the ₹ in the header. */
export const num = (n) => groupIN.format(Math.round(Number(n) || 0))

/**
 * ₹2 Cr, ₹15 L, ₹40,000 — lakh and crore, never million.
 *
 * Below one lakh the compact form is not compact, so it falls through to the
 * plain grouped number. Above that it keeps one decimal only when the decimal
 * carries information: "₹1.5 Cr" is useful, "₹2.0 Cr" is noise.
 */
export function inrCompact(n) {
  const v = Number(n) || 0
  const abs = Math.abs(v)
  const sign = v < 0 ? '-' : ''

  if (abs >= 1e7) return `${sign}₹${trimZero(abs / 1e7)} Cr`
  if (abs >= 1e5) return `${sign}₹${trimZero(abs / 1e5)} L`
  return inr(v)
}

/** 2.0 → "2", 1.5 → "1.5", 1.25 → "1.3" */
const trimZero = (x) => {
  const s = x.toFixed(x >= 100 ? 0 : 1)
  return s.endsWith('.0') ? s.slice(0, -2) : s
}

/** 10.5 → "10.50%" — rates always carry two decimals, because a lender's do. */
export const pct = (n, dp = 2) => `${(Number(n) || 0).toFixed(dp)}%`

/** 84 → "7 years", 18 → "1 year 6 months", 6 → "6 months" */
export function months(m) {
  const total = Math.round(Number(m) || 0)
  const y = Math.floor(total / 12)
  const mo = total % 12
  const parts = []
  if (y) parts.push(`${y} year${y === 1 ? '' : 's'}`)
  if (mo) parts.push(`${mo} month${mo === 1 ? '' : 's'}`)
  return parts.join(' ') || '0 months'
}

/**
 * "020 2735 0055" → "+912027350055", for a tel: href.
 * Landlines here are already stored without spaces; this guards anyway.
 */
export const telHref = (n) => `tel:+91${String(n).replace(/\D/g, '').replace(/^91/, '')}`

/** Title-case a slug: "loan-against-property" → "Loan Against Property". */
export const titleFromSlug = (s) =>
  s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
