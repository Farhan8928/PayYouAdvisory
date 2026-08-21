import { useEffect, useRef, useState } from 'react'

/**
 * A figure that counts up the first time it scrolls into view.
 *
 * ── The rule this obeys ────────────────────────────────────────────────────
 * **The final value is what renders on the server and on the first client
 * paint.** The animation only ever starts from a value that is already correct,
 * and only if JavaScript runs. Nothing is hidden, nothing shows a zero, and a
 * visitor whose bundle never loads reads "₹20 Cr+" exactly as intended.
 *
 * The obvious implementation — initialise the state at 0 and animate up — puts
 * a wrong number in the prerendered HTML. On a financial site that is not a
 * cosmetic problem: a crawler, a link preview, or anyone with JavaScript
 * disabled sees a company claiming ₹0 facilitated.
 *
 * So the value is parsed out of the label rather than passed separately, the
 * prefix and suffix are preserved verbatim, and anything unparseable simply
 * renders as given. `₹20 Cr+` animates; `Same-day` does not, and does not need
 * to be special-cased.
 */
export default function Counter({ value, className = '', duration = 1400 }) {
  const parsed = parseValue(value)
  const [display, setDisplay] = useState(value)
  const ref = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    if (!parsed || done.current) return undefined
    const node = ref.current
    if (!node) return undefined

    // Respect the OS setting. A counter is decorative motion like any other.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return
        done.current = true
        observer.disconnect()

        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration)
          // Ease-out cubic: fast at first, settling rather than stopping. A
          // linear count reads mechanical; a bouncing one reads like a toy.
          const eased = 1 - Math.pow(1 - t, 3)
          const current = parsed.number * eased
          setDisplay(`${parsed.prefix}${format(current, parsed.decimals)}${parsed.suffix}`)
          if (t < 1) requestAnimationFrame(tick)
          else setDisplay(value)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [parsed, value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

/**
 * Pull a number out of a display string, keeping whatever surrounds it.
 * "₹20 Cr+" → { prefix: '₹', number: 20, suffix: ' Cr+' }
 * "Same-day" → null
 */
function parseValue(value) {
  const match = String(value).match(/^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/)
  if (!match) return null

  const number = parseFloat(match[2].replace(/,/g, ''))
  if (!Number.isFinite(number)) return null

  // A single-digit target has nowhere interesting to count from — "1 credit
  // enquiry" animating from 0 to 1 is a flicker, not an effect.
  if (number < 3) return null

  return {
    prefix: match[1],
    number,
    suffix: match[3],
    decimals: (match[2].split('.')[1] ?? '').length,
  }
}

const format = (n, decimals) =>
  new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n)
