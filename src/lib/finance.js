/**
 * Loan mathematics.
 *
 * These functions produce numbers a visitor may make a six-figure decision on,
 * so they are written to match how a lender actually computes rather than to be
 * short. Two conventions worth stating explicitly, because getting either wrong
 * produces answers that look plausible and are not:
 *
 *   1. The rate given to every function is a **nominal annual rate**, converted
 *      to a monthly rate by dividing by 12 — which is what Indian lenders do on
 *      a reducing-balance EMI. It is *not* an effective annual rate, and taking
 *      the twelfth root of (1+r) instead would understate every EMI on the site.
 *
 *   2. Interest is charged on the **reducing balance**. Flat-rate quoting still
 *      appears in vehicle and consumer finance and produces a much higher
 *      effective cost for the same headline number; `flatToReducing` exists to
 *      show a visitor what a flat quote really costs.
 *
 * Nothing here talks to a server. Every calculator on the site runs entirely in
 * the visitor's browser, which means no financial detail a visitor types is
 * ever transmitted anywhere — worth saying on the page, because in this
 * category it is a genuine differentiator and costs nothing to be true.
 */

/** Guard: coerce to a finite number, clamped into [min, max]. */
export const clamp = (v, min, max) => {
  const n = Number(v)
  if (!Number.isFinite(n)) return min
  return Math.min(max, Math.max(min, n))
}

/**
 * Equated monthly instalment on a reducing balance.
 *
 * P·r·(1+r)^n / ((1+r)^n − 1), with r the monthly rate.
 * A zero rate degenerates to P/n — the formula divides by zero there, and an
 * interest-free instalment plan is a real thing, so it is handled rather than
 * guarded against.
 */
export function emi(principal, annualRatePct, tenureMonths) {
  const P = Number(principal) || 0
  const n = Math.round(Number(tenureMonths) || 0)
  const r = (Number(annualRatePct) || 0) / 12 / 100

  if (P <= 0 || n <= 0) return 0
  if (r === 0) return P / n

  const growth = Math.pow(1 + r, n)
  return (P * r * growth) / (growth - 1)
}

/** Total paid over the life of the loan. */
export const totalPayable = (principal, annualRatePct, tenureMonths) =>
  emi(principal, annualRatePct, tenureMonths) * Math.round(Number(tenureMonths) || 0)

/** Total interest — the number people forget to look at. */
export const totalInterest = (principal, annualRatePct, tenureMonths) =>
  Math.max(0, totalPayable(principal, annualRatePct, tenureMonths) - (Number(principal) || 0))

/**
 * Full amortisation schedule, one row per month.
 *
 * The closing balance is forced to zero on the final instalment. Without that,
 * floating-point drift leaves a balance of a few paise showing on the last row,
 * which on a financial site reads as a bug even though the maths is right.
 */
export function schedule(principal, annualRatePct, tenureMonths) {
  const P = Number(principal) || 0
  const n = Math.round(Number(tenureMonths) || 0)
  const r = (Number(annualRatePct) || 0) / 12 / 100
  const instalment = emi(P, annualRatePct, n)

  const rows = []
  let balance = P

  for (let i = 1; i <= n; i += 1) {
    const interest = balance * r
    let principalPart = instalment - interest
    if (i === n) principalPart = balance // absorb the rounding drift here
    balance = Math.max(0, balance - principalPart)

    rows.push({
      month: i,
      emi: i === n ? principalPart + interest : instalment,
      interest,
      principal: principalPart,
      balance,
    })
  }
  return rows
}

/** The schedule collapsed to one row per financial year of the loan. */
export function yearlySchedule(principal, annualRatePct, tenureMonths) {
  const rows = schedule(principal, annualRatePct, tenureMonths)
  const years = []

  for (let i = 0; i < rows.length; i += 12) {
    const chunk = rows.slice(i, i + 12)
    years.push({
      year: i / 12 + 1,
      principal: chunk.reduce((s, x) => s + x.principal, 0),
      interest: chunk.reduce((s, x) => s + x.interest, 0),
      balance: chunk[chunk.length - 1].balance,
    })
  }
  return years
}

/**
 * Indicative borrowing capacity.
 *
 * Lenders size an unsecured loan on the **fixed obligation to income ratio**:
 * total EMIs, including the new one, as a share of net monthly income. The
 * usual band is 40–55%, rising with income because a household earning more has
 * more surplus after fixed costs. Most applicants are constrained by their
 * existing EMIs rather than by their salary, which is why `existingEmi`
 * subtracts before the capacity is converted back into a principal.
 *
 * This inverts the EMI formula: given an affordable instalment, what principal
 * does it support at this rate and tenure?
 */
export function eligibleAmount({
  netMonthlyIncome,
  existingEmi = 0,
  annualRatePct,
  tenureMonths,
  foir,
}) {
  const income = Math.max(0, Number(netMonthlyIncome) || 0)
  const obligations = Math.max(0, Number(existingEmi) || 0)
  const ratio = foir ?? defaultFoir(income)

  const affordable = income * ratio - obligations
  if (affordable <= 0) {
    return { amount: 0, affordableEmi: 0, foir: ratio, blockedByObligations: obligations > 0 }
  }

  const n = Math.round(Number(tenureMonths) || 0)
  const r = (Number(annualRatePct) || 0) / 12 / 100
  if (n <= 0) return { amount: 0, affordableEmi: affordable, foir: ratio, blockedByObligations: false }

  const amount =
    r === 0 ? affordable * n : (affordable * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n))

  return {
    amount,
    affordableEmi: affordable,
    foir: ratio,
    blockedByObligations: false,
  }
}

/**
 * The FOIR band a lender would typically apply at a given income.
 * Indicative — every lender sets its own, and a strong employer or a long
 * relationship moves it. Stated on the page as indicative, never as a promise.
 */
export function defaultFoir(netMonthlyIncome) {
  const i = Number(netMonthlyIncome) || 0
  if (i >= 150000) return 0.6
  if (i >= 75000) return 0.55
  if (i >= 40000) return 0.5
  if (i >= 25000) return 0.45
  return 0.4
}

/**
 * What a balance transfer would actually save.
 *
 * Comparing two interest rates and declaring the lower one better is how people
 * lose money on a transfer. The real comparison is the total remaining outgo on
 * the current loan against the total outgo on the new one *plus* the cost of
 * moving — processing fee, legal and valuation charges, stamp duty on the fresh
 * mortgage, and the documentation.
 *
 * Returns the saving net of those costs, which is frequently negative when few
 * years remain. Showing that honestly is the point of the calculator.
 */
export function balanceTransfer({
  outstanding,
  currentRatePct,
  newRatePct,
  remainingMonths,
  switchingCost = 0,
  newTenureMonths,
}) {
  const n = Math.round(Number(remainingMonths) || 0)
  const newN = Math.round(Number(newTenureMonths) || n)

  const currentEmi = emi(outstanding, currentRatePct, n)
  const newEmi = emi(outstanding, newRatePct, newN)

  const currentOutgo = currentEmi * n
  const newOutgo = newEmi * newN + (Number(switchingCost) || 0)

  return {
    currentEmi,
    newEmi,
    emiSaving: currentEmi - newEmi,
    currentOutgo,
    newOutgo,
    netSaving: currentOutgo - newOutgo,
    worthIt: currentOutgo - newOutgo > 0,
    /** True when the saving comes from stretching the tenure rather than the rate. */
    tenureExtended: newN > n,
  }
}

/**
 * Convert a flat rate to its equivalent reducing-balance rate.
 *
 * A "9% flat" vehicle or consumer loan is close to 16% reducing, because a flat
 * rate charges interest on the full original principal for the whole tenure
 * even though you have repaid most of it. This is legal, it is still quoted,
 * and almost nobody converts it before signing.
 *
 * Solved by bisection rather than algebraically — there is no closed form for r
 * given an EMI, and 60 iterations on a bracketed monotonic function converges
 * far past the precision anyone needs.
 */
export function flatToReducing(flatRatePct, tenureMonths) {
  const n = Math.round(Number(tenureMonths) || 0)
  const flat = Number(flatRatePct) || 0
  if (n <= 0 || flat <= 0) return 0

  const P = 100000 // any principal works; the answer is scale-invariant
  const target = (P + (P * flat * (n / 12)) / 100) / n // the flat-rate EMI

  let lo = 0
  let hi = 100
  for (let i = 0; i < 60; i += 1) {
    const mid = (lo + hi) / 2
    if (emi(P, mid, n) < target) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/**
 * The interest saved by paying a fixed extra amount every month.
 * Prepayment is the highest-return financial decision available to most
 * borrowers and the least modelled, so the site models it.
 */
export function prepaymentEffect({ principal, annualRatePct, tenureMonths, extraPerMonth }) {
  const r = (Number(annualRatePct) || 0) / 12 / 100
  const base = emi(principal, annualRatePct, tenureMonths)
  const instalment = base + Math.max(0, Number(extraPerMonth) || 0)

  let balance = Number(principal) || 0
  let paid = 0
  let n = 0

  // Cap the loop well past any real tenure so a pathological input cannot hang
  // the browser: at an instalment below the monthly interest the balance grows
  // and the loop would never terminate.
  const MAX_MONTHS = 12 * 60
  while (balance > 0 && n < MAX_MONTHS) {
    const interest = balance * r
    if (instalment <= interest) return null // never amortises
    const principalPart = Math.min(balance, instalment - interest)
    balance -= principalPart
    paid += principalPart + interest
    n += 1
  }

  const baseTotal = base * Math.round(Number(tenureMonths) || 0)
  return {
    newTenureMonths: n,
    monthsSaved: Math.round(Number(tenureMonths) || 0) - n,
    interestSaved: baseTotal - paid,
    newEmi: instalment,
  }
}
