import { useEffect, useRef, useState } from 'react'
import { NAV, CONTACT, COMPANY, fmtMobile } from '../data/site.js'
import { telHref } from '../lib/format.js'
import { Phone, ChevronDown, Menu, Close, ArrowRight, Search, Lock, ShieldCheck } from './Icon.jsx'
import Wordmark from './Wordmark.jsx'
import SearchOverlay from './SearchOverlay.jsx'

/**
 * IDFC FIRST Bank inspired navigation system:
 * - Clean top accessibility & utility bar
 * - Search bar trigger with quick overlay
 * - Live rotating customer service ticker button
 * - Security/Eligibility "Login" button with lock icon
 * - Rich mega-menu with L2/L3 product categories
 * - Responsive mobile drawer
 */

const TICKER_ITEMS = [
  'Customer Support',
  'Locate Branch (Pune)',
  '020 2735 0055',
  'Mon-Sat · 9:30 - 6:30',
]

export default function Nav({ path = '/', overlay = false }) {
  const [open, setOpen] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [tickerIndex, setTickerIndex] = useState(0)
  const closeTimer = useRef(null)

  // Rotating ticker animation
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_ITEMS.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  // Scroll listener for sticky header styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(null)
        setDrawer(false)
        setSearchOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = drawer || searchOpen ? 'hidden' : prev
    return () => {
      document.body.style.overflow = prev
    }
  }, [drawer, searchOpen])

  const openPanel = (label) => {
    clearTimeout(closeTimer.current)
    setOpen(label)
  }

  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(null), 150)
  }

  const isActive = (href) => (href === '/' ? path === '/' : path.startsWith(href))
  const clear = overlay && !scrolled

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Top utility / accessibility bar */}
        <div className={`transition-colors duration-300 ${clear ? 'bg-ink-deep/60 backdrop-blur-md text-white/80' : 'bg-ink-deep text-white/90'}`}>
          <div className="container-page flex h-8 items-center justify-between gap-4 text-2xs">
            <div className="flex items-center gap-3 truncate">
              <span className="inline-flex items-center gap-1 font-bold text-accent-light">
                <ShieldCheck className="h-3 w-3" />
                RBI Compliant DSA
              </span>
              <span className="hidden text-white/40 md:inline">|</span>
              <p className="hidden truncate text-white/70 sm:inline">
                {COMPANY.shortName} · Pune, PCMC, Baramati &amp; Phaltan
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="hidden text-white/60 sm:inline">{CONTACT.hours}</span>
              <a
                href={telHref(CONTACT.landline)}
                className="fig -my-3 flex items-center gap-1.5 py-3 font-bold text-white transition-colors hover:text-sky sm:-my-2 sm:py-2"
              >
                <Phone className="h-2.5 w-2.5 text-accent" />
                {CONTACT.landlineDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Primary Navbar */}
        <nav
          aria-label="Primary"
          className={`transition-all duration-300 ${
            clear
              ? 'border-b border-white/10 bg-stage/85 backdrop-blur-xl'
              : `border-b border-ink/10 bg-paper ${scrolled ? 'shadow-nav' : ''}`
          }`}
        >
          <div
            className={`container-page flex items-center justify-between gap-4 transition-[height] duration-300 ${
              scrolled ? 'h-16' : 'h-18 sm:h-20'
            }`}
          >
            {/* Logo */}
            <a
              href="/"
              className="flex min-h-[44px] shrink-0 items-center"
              aria-label={`${COMPANY.shortName} — home`}
            >
              <Wordmark className={scrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-10'} invert={clear} priority />
            </a>

            {/* Desktop Navigation Links */}
            <ul className="hidden items-center gap-1 lg:flex xl:gap-2">
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
                    className={`relative flex items-center gap-1 px-3 py-2 text-sm font-bold transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-accent'
                        : clear
                          ? 'text-white/90 hover:text-white'
                          : 'text-ink hover:text-accent'
                    }`}
                  >
                    {item.label}
                    {item.children ? (
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${
                          open === item.label ? 'rotate-180 text-accent' : 'opacity-60'
                        }`}
                      />
                    ) : null}
                    <span
                      className={`absolute inset-x-3 -bottom-px h-[3px] rounded-full bg-accent transition-transform duration-300 ${
                        isActive(item.href) ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      aria-hidden="true"
                    />
                  </a>

                  {/* Mega Menu Dropdown */}
                  {item.children ? (
                    <div
                      hidden={open !== item.label}
                      onMouseEnter={() => openPanel(item.label)}
                      onMouseLeave={scheduleClose}
                      className="absolute left-0 top-full z-50 w-[30rem] overflow-hidden rounded-2xl border border-ink/10 bg-paper p-3 shadow-lift animate-slide-up"
                    >
                      <div className="grid gap-1">
                        {item.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all hover:bg-paper-deep"
                          >
                            <div>
                              <span className="flex items-center gap-2 text-sm font-bold text-ink group-hover:text-accent">
                                {child.label}
                                <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                              </span>
                              {child.meta ? (
                                <span className="fig text-2xs text-ink-faint">
                                  {child.meta}
                                </span>
                              ) : null}
                            </div>
                            <span className="text-2xs font-semibold text-accent opacity-0 group-hover:opacity-100">
                              Explore →
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>

            {/* Right Action Cluster: Search, Support Odometer, Check Eligibility / Login */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* IDFC Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={`flex h-11 items-center gap-2 rounded-full border px-3.5 text-xs font-semibold transition-all duration-200 ${
                  clear
                    ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                    : 'border-ink/12 bg-paper-deep text-ink-soft hover:border-ink/30 hover:bg-paper'
                }`}
                aria-label="Open search"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search services...</span>
              </button>

              {/* IDFC Odometer Rotating Customer Support Button */}
              <a
                href="/contact/"
                className={`hidden h-11 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-all duration-200 xl:flex ${
                  clear
                    ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                    : 'border-ink/12 bg-paper text-ink hover:border-accent/40 hover:text-accent shadow-sm'
                }`}
                title="Customer Support"
              >
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="w-36 overflow-hidden whitespace-nowrap text-left font-bold transition-all">
                  {TICKER_ITEMS[tickerIndex]}
                </span>
              </a>

              {/* IDFC "Login" / Check Eligibility CTA */}
              <a
                href="/eligibility-calculator/"
                // min-h-[44px]: `btn-sm` is 38px tall, which fails WCAG 2.5.5
                // for a control. The padding grows the target without changing
                // the pill's visual weight beside the other two.
                className="btn-accent btn-sm flex min-h-[44px] items-center gap-1.5 shadow-sm"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Eligibility</span>
              </a>

              {/* Mobile drawer trigger */}
              <button
                type="button"
                onClick={() => setDrawer(true)}
                className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
                  clear ? 'text-white' : 'text-ink'
                }`}
                aria-label="Open menu"
                aria-expanded={drawer}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed inset-0 z-50 lg:hidden ${drawer ? '' : 'pointer-events-none'}`}
          aria-hidden={!drawer}
        >
          <div
            className={`absolute inset-0 bg-ink-deep/60 backdrop-blur-sm transition-opacity duration-300 ${
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
              <a href="/" className="flex items-center" aria-label="Home">
                <Wordmark className="h-7" />
              </a>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-paper-deep"
                aria-label="Close menu"
              >
                <Close className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-ink/10 py-2">
                  <a href={item.href} className="flex min-h-[44px] items-center py-1 text-base font-extrabold text-ink">
                    {item.label}
                  </a>
                  {item.children ? (
                    <ul className="mb-2 space-y-1 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            className="flex items-center justify-between py-1.5 text-sm text-ink-soft hover:text-accent"
                          >
                            <span>{child.label}</span>
                            {child.meta ? (
                              <span className="fig text-2xs text-ink-faint">{child.meta}</span>
                            ) : null}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="shrink-0 space-y-2.5 border-t border-ink/10 p-5">
              <a href="/eligibility-calculator/" className="btn-accent w-full flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" />
                Check Loan Eligibility
              </a>
              <a href={telHref(CONTACT.landline)} className="btn-ghost fig w-full flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                {CONTACT.landlineDisplay}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
