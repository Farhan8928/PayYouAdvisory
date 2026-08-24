import { useEffect, useState } from 'react'

/**
 * Text size and letter spacing controls.
 *
 * ── Why a bank puts these at the top of every page ─────────────────────────
 * The reference site carries them, and it is not decoration. A meaningful part
 * of this audience is reading a loan agreement summary on a phone in daylight,
 * often over fifty, often not in their first language. Browser zoom enlarges
 * the whole layout including the images; this enlarges only the type, which is
 * the thing they actually need bigger. Increased letter spacing is a
 * recognised aid for dyslexic readers, and it is the one accessibility control
 * almost no Indian financial site offers.
 *
 * ── How it works ───────────────────────────────────────────────────────────
 * Two custom properties on `<html>`. `--text-scale` multiplies the root font
 * size, so every `rem` on the site follows — which is why the type scale in
 * tailwind.config.js is in rem and not px. `--tracking-extra` is added to the
 * body's letter spacing.
 *
 * Nothing else in the codebase needs to know these exist.
 *
 * ── Why the choice is read after mount, not during render ──────────────────
 * Reading `localStorage` while rendering would make the server's HTML and the
 * browser's first render disagree, and React would throw away the prerendered
 * DOM to reconcile them — discarding the whole point of prerendering 218
 * pages. The default renders first and the stored preference is applied in an
 * effect, which is the same pattern the EMI calculator uses.
 */

const KEY = 'payyou.reading.v1'

const SIZES = [
  { id: 's', label: 'S', scale: 0.9, title: 'Smaller text' },
  { id: 'm', label: 'M', scale: 1, title: 'Default text size' },
  { id: 'l', label: 'L', scale: 1.15, title: 'Larger text' },
]

/** Three steps, in em so the extra spacing scales with whatever size is set. */
const TRACKING = [0, 0.04, 0.08]

export default function ReadingControls({ invert = false }) {
  const [size, setSize] = useState('m')
  const [track, setTrack] = useState(0)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
      if (saved?.size) setSize(saved.size)
      if (typeof saved?.track === 'number') setTrack(saved.track)
    } catch {
      // A private window or storage blocked entirely. The defaults are the
      // normal reading experience, so there is nothing to recover.
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const scale = SIZES.find((s) => s.id === size)?.scale ?? 1
    root.style.setProperty('--text-scale', String(scale))
    root.style.setProperty('--tracking-extra', `${TRACKING[track] ?? 0}em`)
    try {
      localStorage.setItem(KEY, JSON.stringify({ size, track }))
    } catch {
      /* not worth telling the reader about */
    }
  }, [size, track])

  const tone = invert
    ? 'text-white/60'
    : 'text-ink-faint'

  return (
    <div className={`flex items-center gap-4 ${tone}`}>
      <div className="flex items-center gap-1.5">
        <span className="hidden text-2xs sm:inline">Text size</span>
        <div role="group" aria-label="Text size" className="flex items-center gap-0.5">
          {SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSize(s.id)}
              aria-pressed={size === s.id}
              title={s.title}
              className="reading-btn"
              data-active={size === s.id}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden items-center gap-1.5 sm:flex">
        <span className="text-2xs">Letter spacing</span>
        <div role="group" aria-label="Letter spacing" className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => setTrack((t) => Math.max(0, t - 1))}
            disabled={track === 0}
            aria-label="Decrease letter spacing"
            className="reading-btn"
          >
            &minus;
          </button>
          <span aria-hidden="true" className="px-1 text-2xs font-bold">
            AV
          </span>
          <button
            type="button"
            onClick={() => setTrack((t) => Math.min(TRACKING.length - 1, t + 1))}
            disabled={track === TRACKING.length - 1}
            aria-label="Increase letter spacing"
            className="reading-btn"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
