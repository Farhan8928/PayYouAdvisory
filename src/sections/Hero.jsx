import { useEffect, useRef, useState } from 'react'
import { CONTACT } from '../data/site.js'
import { HERO_SLIDES } from '../data/heroSlides.js'
import { ArrowRight, ChevronDown, Phone, ShieldCheck } from '../components/Icon.jsx'
import HeroScene from '../components/HeroScene.jsx'

/**
 * IDFC FIRST Bank inspired Hero Carousel:
 * - 640px desktop visual stage
 * - Slide counter badge (01 / 04)
 * - Auto-advancing slider with pause on hover/interaction
 * - Polished dot indicators with progress state
 * - 3D photorealistic asset rendering on the right with ambient glow
 */
export default function Hero() {
  const [index, setIndex] = useState(0)
  const [held, setHeld] = useState(false)
  const [taken, setTaken] = useState(false)
  const region = useRef(null)

  const slide = HERO_SLIDES[index]
  const count = HERO_SLIDES.length

  const go = (n) => {
    setTaken(true)
    setIndex(((n % count) + count) % count)
  }

  // Auto-advance every 6.5s unless paused or interacted
  useEffect(() => {
    if (held || taken || count < 2) return undefined
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), 6500)
    return () => clearTimeout(t)
  }, [index, held, taken, count])

  return (
    <section
      ref={region}
      aria-roledescription="carousel"
      aria-label="PayYou Advisory Loan Services"
      className="hero-band relative isolate overflow-hidden min-h-[580px] lg:min-h-[640px] flex flex-col justify-center"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      {/* Background Graphic & 3D Scene Container */}
      <div className="absolute inset-0 -z-20">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-brand ${
              i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {s.image ? (
              <div className="absolute inset-0 flex items-center justify-end">
                <div className="relative h-full w-full lg:w-3/5 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.eyebrow}
                    className="h-full w-full object-cover object-center lg:object-right opacity-90 transition-transform duration-1000 ease-out scale-105"
                  />
                  {/* Left soft fade gradient so text remains ultra-crisp */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to right, rgba(5, 16, 31, 1) 0%, rgba(5, 16, 31, 0.8) 25%, rgba(5, 16, 31, 0.2) 65%, transparent 100%), linear-gradient(to top, rgba(5, 16, 31, 0.9) 0%, transparent 40%)',
                    }}
                  />
                </div>
              </div>
            ) : (
              <HeroScene scene={s.scene} className="hero-scene" />
            )}
          </div>
        ))}
      </div>

      {/* Scrim Overlay */}
      <div
        aria-hidden="true"
        className="hero-scrim pointer-events-none absolute inset-0 -z-10"
      />

      {/* Content Container */}
      <div className="container-page relative z-10 grid items-center gap-8 pb-20 pt-8 sm:pb-24 lg:grid-cols-12 lg:pb-24 lg:pt-10">
        <div className="lg:col-span-7 xl:col-span-6">
          {/* Slide Tag / Badge + Eyebrow */}
          <div className="flex flex-wrap items-center gap-3">
            {slide.badge ? (
              <span className="rounded-full bg-accent/20 border border-accent/40 px-3 py-0.5 text-2xs font-extrabold uppercase tracking-wider text-white shadow-sm">
                {slide.badge}
              </span>
            ) : null}
            <p
              aria-live="polite"
              className="text-2xs font-bold uppercase tracking-[0.16em] text-accent-light"
            >
              {slide.eyebrow}
            </p>
          </div>

          {/* High-Impact Headline */}
          <h1 className="h-display mt-4 text-paper drop-shadow-md">
            {slide.headline.map((line, i) => (
              <span key={line} className="block">
                {i === slide.accentLine ? <span className="text-sky">{line}</span> : line}
              </span>
            ))}
          </h1>

          {/* Standfirst */}
          <p className="mt-4 max-w-prose text-base leading-relaxed text-paper/85 sm:text-lg">
            {slide.standfirst}
          </p>

          {/* Call-to-action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <a href={slide.primary.href} className="btn-accent btn-lg shadow-lift">
              {slide.primary.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={slide.secondary.href} className="btn-glass btn-lg">
              {slide.secondary.label}
            </a>
          </div>

          {/* IDFC-Style Carousel Indicators & Number Counter */}
          {count > 1 ? (
            <div className="mt-10 flex items-center gap-4">
              {/* Prev Arrow */}
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="hero-arrow"
              >
                <ChevronDown className="h-4 w-4 rotate-90" />
              </button>

              {/* Progress Dots */}
              <ul className="-mx-1 flex items-center gap-1">
                {HERO_SLIDES.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Slide ${i + 1} of ${count}: ${s.eyebrow}`}
                      aria-current={i === index ? 'true' : undefined}
                      className="hero-dot"
                      data-active={i === index}
                    />
                  </li>
                ))}
              </ul>

              {/* Next Arrow */}
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="hero-arrow"
              >
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </button>

              {/* Number Index Badge */}
              <span className="fig ml-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-2xs font-bold text-white/85">
                0{index + 1} / 0{count}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
