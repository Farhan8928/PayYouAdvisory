import { useEffect, useRef, useState } from 'react'
import { NAV, CONTACT, COMPANY, fmtMobile } from '../data/site.js'
import { telHref } from '../lib/format.js'
import { Phone, ChevronDown, Menu, Close } from './Icon.jsx'
import Wordmark from './Wordmark.jsx'

/**
 * Site navigation: a utility strip, a wordmark, a mega-menu on desktop and a
 * full drawer on mobile.
 *
 * Two things here are deliberate and easy to undo by accident.
 *
 * 1. **The panels are real links, rendered in the server HTML.** They are shown
 *    and hidden with CSS and `hidden`, never conditionally mounted. A crawler
 *    that does not run JavaScript still sees every product URL in the markup,
 *    which is most of this site's internal linking. Mounting the panel only on
 *    hover would make the site's link graph invisible to anything that does not
 *    execute React.
 *
 * 2. **Hover opens the panel; it does not navigate.** The top-level item is
 *    still a link to the hub page for keyboard and touch users, and the panel
 *    opens on focus as well as hover — a menu that only responds to a mouse is
 *    unusable with a keyboard, and this is a site people will read on a phone
 *    on a train.
 */
export default function Nav({ path = '/', overlay = true }) {
  const [open, setOpen] = useState(null) // label of the open desktop panel
  const [drawer, setDrawer] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef(null)

  /**
   * `solid` is the single switch driving the bar's two colour schemes.
   *
   * It is true once the reader has scrolled past the masthead, and always true
   * on a page that has no dark masthead to sit over — the 404, for instance,
   * opens on paper, and a white wordmark on a transparent bar over it would be
   * invisible. Deriving it here rather than checking `overlay` at six separate
   * call sites is what stops one of them being missed.
   */
  const solid = scrolled || !overlay

  // Condense the header once the reader has left the hero. `passive: true`
  // matters — a non-passive scroll listener on a long page is a measurable
  // input-latency cost on a mid-range Android, which is most of this audience.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes whatever is open. Bound once rather than per-panel.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(null)
      setDrawer(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Lock the page behind the mobile drawer. Restoring the previous value rather
  // than clearing it stops this fighting any other component that touches
  // overflow — of which there is currently one, the calculator's table modal.
  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = drawer ? 'hidden' : prev
    return () => {
      document.body.style.overflow = prev
    }
  }, [drawer])

  const openPanel = (label) => {
    clearTimeout(closeTimer.current)
    setOpen(label)
  }
  // A short delay before closing, so the pointer can cross the gap between the
  // trigger and the panel without the panel vanishing underneath it.
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(null), 140)
  }

  const isActive = (href) => (href === '/' ? path === '/' : path.startsWith(href))

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip. Carries the phone number above everything else, because
          in this business a call is the conversion and the number should never
          be more than one glance away. */}
      <div className="band-dark border-b border-paper/10">
        <div className="container-page flex h-9 items-center justify-between gap-4 text-2xs">
          <p className="truncate text-paper/60">
            {COMPANY.shortName} · Loan advisory across Pune, PCMC, Baramati &amp; Phaltan
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden text-paper/50 sm:inline">{CONTACT.hours}</span>
            <a
              href={telHref(CONTACT.landline)}
              className="fig flex items-center gap-1.5 font-medium text-gold transition-colors hover:text-paper"
            >
              <Phone className="h-3 w-3" />
              {CONTACT.landlineDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* ── The bar ─────────────────────────────────────────────────────────
          Transparent while the reader is still in the masthead, solid once they
          have scrolled past it.

          Every page on this site opens with a dark band — a photograph under a
          navy scrim, or the navy gradient — so a light bar sitting on top of it
          at the very top of the page draws a hard line across the composition
          for no reason. Letting the masthead run under a transparent bar is
          what makes the hero read as full-bleed.

          The trade is that the bar has two colour schemes, which is why the
          text colours below are conditional rather than fixed. It is worth it:
          this is the first thing anybody sees. */}
      <nav
        aria-label="Primary"
        className={`border-b transition-all duration-500 ease-brand ${
          solid
            ? 'border-ink/10 bg-paper/95 shadow-card backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div
          className={`container-page flex items-center justify-between gap-6 transition-[height] duration-500 ease-brand ${
            solid ? 'h-16' : 'h-20'
          }`}
        >
          <a href="/" className="shrink-0" aria-label={`${COMPANY.shortName} — home`}>
            <Wordmark className={solid ? 'h-7' : 'h-9'} invert={!solid} />
          </a>

          {/* ── Desktop ─────────────────────────────────────────────────── */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && openPanel(item.label)}
                onMouseLeave={scheduleClose}
              >
                <a
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  aria-expanded={item.children ? open === item.label : undefined}
                  onFocus={() => item.children && openPanel(item.label)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors duration-300 ${
                    solid
                      ? isActive(item.href)
                        ? 'text-ink'
                        : 'text-ink-soft hover:text-ink'
                      : isActive(item.href)
                        ? 'text-gold'
                        : 'text-paper/80 hover:text-brass'
                  }`}
                >
                  {item.label}
                  {item.children ? (
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-150 ${
                        open === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  ) : null}
                </a>

                {/* Always rendered — see the note at the top of this file. */}
                {item.children ? (
                  <div
                    hidden={open !== item.label}
                    onMouseEnter={() => openPanel(item.label)}
                    onMouseLeave={scheduleClose}
                    className="absolute left-0 top-full w-[26rem] border border-ink/15 bg-paper p-2 shadow-[0_18px_40px_-24px_rgba(12,42,34,0.45)]"
                  >
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            className="flex items-baseline justify-between gap-4 px-3 py-2.5 transition-colors hover:bg-paper-deep"
                          >
                            <span className="text-sm font-medium text-ink">{child.label}</span>
                            {child.meta ? (
                              <span className="fig shrink-0 text-2xs text-ink-faint">{child.meta}</span>
                            ) : null}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <a
              href="/eligibility-calculator/"
              className={solid ? 'btn-ghost btn-sm' : 'btn-ghost-invert btn-sm'}
            >
              Check eligibility
            </a>
            <a href={telHref(CONTACT.mobile)} className="btn-brass btn-sm fig">
              {fmtMobile(CONTACT.mobile)}
            </a>
          </div>

          {/* ── Mobile trigger ──────────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className={`-mr-2 flex items-center gap-2 p-2 transition-colors duration-300 lg:hidden ${
              solid ? 'text-ink' : 'text-paper'
            }`}
            aria-label="Open menu"
            aria-expanded={drawer}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────────────────
          A panel rather than a full-screen takeover, so the page stays visible
          behind it and the reader keeps their place. */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${drawer ? '' : 'pointer-events-none'}`}
        aria-hidden={!drawer}
      >
        <div
          className={`absolute inset-0 bg-ink-deep/50 transition-opacity duration-200 ${
            drawer ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setDrawer(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-paper transition-transform duration-200 ${
            drawer ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-ink/15 px-5">
            <Wordmark className="h-7" />
            <button
              type="button"
              onClick={() => setDrawer(false)}
              className="-mr-2 p-2 text-ink"
              aria-label="Close menu"
            >
              <Close className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-ink/10 py-1">
                <a
                  href={item.href}
                  className="block py-3 h-card text-ink"
                >
                  {item.label}
                </a>
                {item.children ? (
                  <ul className="mb-2 space-y-0.5 pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          className="flex items-baseline justify-between gap-3 py-2 text-sm text-ink-soft"
                        >
                          <span>{child.label}</span>
                          {child.meta ? (
                            <span className="fig shrink-0 text-2xs text-ink-faint">{child.meta}</span>
                          ) : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          <div className="shrink-0 space-y-2 border-t border-ink/15 p-5">
            <a href={telHref(CONTACT.landline)} className="btn-primary fig w-full">
              <Phone className="h-4 w-4" />
              {CONTACT.landlineDisplay}
            </a>
            <a href="/eligibility-calculator/" className="btn-ghost w-full">
              Check what you could borrow
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
