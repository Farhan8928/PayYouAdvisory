import { useEffect, useRef, useState } from 'react'
import { NAV, CONTACT, COMPANY, fmtMobile } from '../data/site.js'
import { telHref } from '../lib/format.js'
import { Phone, ChevronDown, Menu, Close, ArrowRight } from './Icon.jsx'
import Wordmark from './Wordmark.jsx'

/**
 * Site navigation: a utility strip, a white bar, a mega-menu on desktop and a
 * drawer on mobile.
 *
 * ── Why the bar is always solid ────────────────────────────────────────────
 * A previous version made it transparent over the masthead and solid on scroll.
 * That looked good and could not survive the real logo: PayYou's mark is royal
 * blue on transparency with no reversed version, so over a dark photograph it
 * vanished. Rather than mangle the client's logo to fit a nav trick, the bar is
 * white and the logo is always shown in its correct colours. Every bank the
 * client benchmarked against does the same thing for the same reason.
 *
 * ── Two things that are easy to undo by accident ───────────────────────────
 *
 * 1. **The mega-menu panels are real links in the server HTML.** They are shown
 *    and hidden with `hidden`, never conditionally mounted. A crawler that does
 *    not run JavaScript still sees every product URL, and that is most of this
 *    site's internal linking.
 *
 * 2. **Hover opens the panel; it does not navigate.** The top-level item stays
 *    a link to its hub for keyboard and touch users, and the panel opens on
 *    focus as well as hover — a menu that only answers a mouse is unusable with
 *    a keyboard.
 */
export default function Nav({ path = '/' }) {
  const [open, setOpen] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef(null)

  // Only used to add a shadow and tighten the bar once the reader has moved.
  // `passive: true` matters — a non-passive scroll listener is measurable
  // input latency on a mid-range Android, which is most of this audience.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(null)
      setDrawer(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

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
      {/* Utility strip. Carries the phone number above everything else: in this
          business a call is the conversion, and the number should never be more
          than one glance away. */}
      <div className="band-dark">
        {/* h-11 on mobile so the phone number is a 44px tap target; h-9 from
            sm up, where a pointer does not need one. */}
        <div className="container-page flex h-11 items-center justify-between gap-4 text-2xs sm:h-9">
          <p className="truncate text-white/65">
            {COMPANY.shortName} · Loan advisory across Pune, PCMC, Baramati &amp; Phaltan
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden text-white/50 sm:inline">{CONTACT.hours}</span>
            <a
              href={telHref(CONTACT.landline)}
              // -my-2 py-2 makes the link fill the 36px strip without changing
              // its visual position. A 16px-tall phone number is a 16px tap
              // target, which on a phone is a miss waiting to happen.
              className="fig -my-3 flex items-center gap-1.5 py-3 font-semibold text-white transition-colors hover:text-sky sm:-my-2 sm:py-2"
            >
              <Phone className="h-3 w-3" />
              {CONTACT.landlineDisplay}
            </a>
          </div>
        </div>
      </div>

      <nav
        aria-label="Primary"
        className={`border-b border-ink/10 bg-paper transition-shadow duration-300 ${
          scrolled ? 'shadow-nav' : ''
        }`}
      >
        <div
          className={`container-page flex items-center justify-between gap-6 transition-[height] duration-300 ease-brand ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          <a href="/" className="shrink-0" aria-label={`${COMPANY.shortName} — home`}>
            <Wordmark className={scrolled ? 'h-8' : 'h-10'} priority />
          </a>

          {/* ── Desktop ─────────────────────────────────────────────────── */}
          <ul className="hidden items-center lg:flex">
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
                  className={`relative flex items-center gap-1 px-3.5 py-2 text-sm font-bold transition-colors duration-200 ${
                    isActive(item.href) ? 'text-accent' : 'text-ink-text hover:text-accent'
                  }`}
                >
                  {item.label}
                  {item.children ? (
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-200 ${
                        open === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  ) : null}
                  {/* The active underline, in the logo red. */}
                  <span
                    className={`absolute inset-x-3.5 -bottom-px h-[3px] rounded-full bg-accent transition-transform duration-300 ease-brand ${
                      isActive(item.href) ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    aria-hidden="true"
                  />
                </a>

                {/* Always rendered — see the note at the top of this file. */}
                {item.children ? (
                  <div
                    hidden={open !== item.label}
                    onMouseEnter={() => openPanel(item.label)}
                    onMouseLeave={scheduleClose}
                    className="absolute left-0 top-full w-[27rem] overflow-hidden rounded-b-xl border border-t-0 border-ink/10 bg-paper shadow-lift"
                  >
                    <ul className="p-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            className="group flex items-baseline justify-between gap-4 rounded-md px-3.5 py-3 transition-colors hover:bg-paper-deep"
                          >
                            <span className="flex items-center gap-2 text-sm font-bold text-ink-text">
                              {child.label}
                              <ArrowRight className="h-3 w-3 -translate-x-1 text-accent opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                            </span>
                            {child.meta ? (
                              <span className="fig shrink-0 text-2xs text-ink-faint">
                                {child.meta}
                              </span>
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

          <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
            <a href="/eligibility-calculator/" className="btn-ghost btn-sm">
              Check eligibility
            </a>
            <a href={telHref(CONTACT.mobile)} className="btn-accent btn-sm fig">
              {fmtMobile(CONTACT.mobile)}
            </a>
          </div>

          {/* ── Mobile trigger ──────────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="-mr-2.5 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            aria-label="Open menu"
            aria-expanded={drawer}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${drawer ? '' : 'pointer-events-none'}`}
        aria-hidden={!drawer}
      >
        <div
          className={`absolute inset-0 bg-ink-deep/50 transition-opacity duration-300 ${
            drawer ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setDrawer(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-paper transition-transform duration-300 ease-brand ${
            drawer ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-ink/10 px-5">
            {/* The drawer covers the bar, so this is the only logo on screen
                while the menu is open. It has to be the link home — that is
                what everyone taps. */}
            <a
              href="/"
              className="-my-2 flex shrink-0 items-center py-2"
              aria-label={`${COMPANY.shortName} — home`}
            >
              <Wordmark className="h-8" />
            </a>
            <button
              type="button"
              onClick={() => setDrawer(false)}
              className="-mr-2.5 flex h-11 w-11 items-center justify-center text-ink"
              aria-label="Close menu"
            >
              <Close className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-ink/10 py-1">
                <a href={item.href} className="flex min-h-[44px] items-center py-3 text-lg font-extrabold text-ink">
                  {item.label}
                </a>
                {item.children ? (
                  <ul className="mb-2 space-y-0.5 pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          className="flex min-h-[44px] items-center justify-between gap-3 py-2 text-sm text-ink-soft"
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

          <div className="shrink-0 space-y-2 border-t border-ink/10 p-5">
            <a href={telHref(CONTACT.landline)} className="btn-accent fig w-full">
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
