/**
 * Product variants — the sub-pages beneath each loan product.
 *
 * The client's page specification (PAYYOUADVISORY Website Pages, 24 Aug 2026)
 * asks for a page per borrower type, per structure and per end-use beneath each
 * product: "Personal Loan for Doctors", "Flexi Hybrid Personal Loan", "Business
 * Loan without ITR", and so on. This directory is that layer, one module per
 * product family.
 *
 * ── The only thing that makes these pages legitimate ────────────────────────
 * Twenty pages that all say "a personal loan is an unsecured loan against your
 * income" are twenty doorway pages, and Google has been explicit since 2021
 * that it treats that pattern as spam in exactly this category. The whole point
 * of a variant page is the thing that is *only* true of that variant: that a
 * doctor is underwritten on professional qualification rather than employer
 * category, that a flexi facility charges interest on the drawn balance so the
 * headline rate is not comparable to a term loan's, that invoice discounting is
 * priced on the buyer's credit rather than the borrower's.
 *
 * So every entry carries `angle`, the single claim that is true there and
 * nowhere else in its family, plus its own `points`, `eligibility`, `documents`
 * and `faqs`. Nothing is inherited from the parent product except navigation and
 * the compliance footer. `npm run audit:dupes` compares each variant against a
 * sibling with an eight-word shingle and fails the build under 40% distinct,
 * which is the mechanical check on all of it.
 *
 * ── On the numbers ──────────────────────────────────────────────────────────
 * Same rule as products.js: no rate, fee or amount appears in a variant unless
 * it is traceable to something PayYou has published, or it is arithmetic the
 * reader can verify (an EMI computed from an amount, a rate and a tenure).
 * Where a figure would have to be invented, the page explains what the number
 * depends on instead. PayYou is a Direct Selling Agent: it does not set rates
 * and does not lend, and no page here may imply otherwise.
 */
import { PERSONAL } from './variants/personal.js'
import { BUSINESS } from './variants/business.js'
import { HOME } from './variants/home.js'
import { PROPERTY } from './variants/property.js'
import { FINANCIAL } from './variants/financial.js'
import { PROTECTION } from './variants/protection.js'

/** Shown on every variant page, in the same place, under the parent's terms. */
export const VARIANT_RATE_NOTE =
  'Set by the lender, not by PayYou, and different for every profile. We shortlist the lenders you clear before any application is submitted.'

export const VARIANTS = [
  ...PERSONAL,
  ...BUSINESS,
  ...HOME,
  ...PROPERTY,
  ...FINANCIAL,
  ...PROTECTION,
]

export const VARIANT_BY_SLUG = Object.fromEntries(VARIANTS.map((v) => [v.slug, v]))

/** Variants belonging to a product, in file order. */
export const variantsFor = (productSlug) => VARIANTS.filter((v) => v.parent === productSlug)

/** The distinct group headings under a product, in first-appearance order. */
export function variantGroupsFor(productSlug) {
  const groups = new Map()
  for (const v of variantsFor(productSlug)) {
    if (!groups.has(v.group)) groups.set(v.group, [])
    groups.get(v.group).push(v)
  }
  return [...groups.entries()].map(([title, items]) => ({ title, items }))
}
