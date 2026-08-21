import { useId, useState } from 'react'
import { ChevronDown } from './Icon.jsx'

/**
 * A disclosure list, used for FAQs and for long document checklists.
 *
 * The answer text is **always in the DOM**, hidden by collapsing a CSS grid row
 * rather than by `display: none` or by not rendering it. Two reasons, and both
 * have bitten this pattern before:
 *
 *   · Every page here is prerendered. If the answers were mounted only on
 *     click, the FAQ content would be absent from the served HTML — and a
 *     `FAQPage` schema describing answers that are not on the page is a
 *     structured-data violation, not a rich result.
 *   · Browser find-in-page finds text in a collapsed grid row. It cannot find
 *     text that was never rendered, which is maddening on a long FAQ.
 *
 * `defaultOpen` opens the first item, so a reader landing here sees the shape
 * of an answer rather than a wall of identical closed rows.
 */
export default function Accordion({ items, defaultOpen = 0, className = '' }) {
  const [open, setOpen] = useState(defaultOpen)
  const base = useId()

  return (
    <div className={`border-t border-ink/15 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${base}-b${i}`
        const panelId = `${base}-p${i}`

        return (
          <div key={item.q} className="border-b border-ink/15">
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-ink-soft"
              >
                <span className="h-card leading-snug text-ink">
                  {item.q}
                </span>
                <ChevronDown
                  className={`mt-1 h-4 w-4 shrink-0 text-accent transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              data-open={isOpen}
              className="accordion-panel"
            >
              <div>
                <p className="max-w-prose pb-6 pr-10 text-base leading-relaxed text-ink-soft">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
