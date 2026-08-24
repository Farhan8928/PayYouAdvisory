import { useEffect, useRef, useState } from 'react'
import { CONTACT } from '../data/site.js'
import { HERO_SLIDES } from '../data/heroSlides.js'
import { ArrowRight, ChevronDown, Phone, ShieldCheck } from '../components/Icon.jsx'
import HeroScene from '../components/HeroScene.jsx'
import { HERO_IMAGES } from '../data/heroImages.gen.js'

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
            {s.video || s.image ? (
              <div className="absolute inset-0 flex items-center justify-end">
                <div className="relative h-full w-full lg:w-3/5 overflow-hidden">
                  {/* ── Film, where one exists ──────────────────────────
                      Deliberately inside the same right-hand 60% box as the
                      still rather than full-bleed. The render is composed with
                      its subject centred, so full-bleed put the coin directly
                      behind the headline. Sharing the still's container puts
                      the subject at roughly 70% across the band, which is
                      where the reference site's is.

                      `loop` is per slide. This first film is a resolve, not a
                      cycle: twenty-five discs converge into one coin. Looping
                      it snaps the finished coin back into scattered discs
                      every eight seconds, so it plays once and holds on the
                      final frame — which is the strongest image in the clip
                      and the one carrying the rupee mark. */}
                  {s.video ? (
                    <video
                      // `contain`, not `cover`. The film is 2.32:1 and this box is about
                      // 1.35:1, so cover scaled it 2.3x and cropped the coin's
                      // rupee mark clean off the top and right. Contain shows the
                      // frame the render was composed as — and the letterboxing is
                      // invisible because the film's stage is the same near-black
                      // as the band behind it.
                      className="h-full w-full object-contain opacity-95"
                      autoPlay
                      muted
                      loop={s.loop !== false}
                      playsInline
                      preload={i === 0 ? 'auto' : 'none'}
                      poster={s.poster ?? undefined}
                      aria-hidden="true"
                      tabIndex={-1}
                    >
                      {/* Portrait cut first: the browser takes the first
                          source whose media query matches. */}
                      <source src={s.video.mobile} type="video/mp4" media="(max-width: 767px)" />
                      <source src={s.video.desktop} type="video/mp4" />
                    </video>
                  ) : null}
                  {/* Width, height, srcset and a blur placeholder all come
                      from `npm run hero`. A bare <img src> here meant a
                      guaranteed layout shift, the 2400px file served to a
                      360px phone, and ~2.8 MB of hero imagery — which is what
                      `npm run audit:images` failed the build over. `sizes`
                      says 60vw because the still occupies lg:w-3/5. */}
                  {!s.video && s.image ? (() => {
                    const img = HERO_IMAGES[s.image.replace(/^\/images\/|\.jpg$/g, '')]
                    return (
                      <img
                        src={img?.src ?? s.image}
                        srcSet={img?.srcSet}
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        width={img?.width}
                        height={img?.height}
                        // Decorative: the headline beside it carries the
                        // meaning, so an alt describing the photograph would
                        // just be read out twice. Empty alt plus aria-hidden
                        // is the pair that tells a screen reader to skip it.
                        alt=""
                        aria-hidden="true"
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding={i === 0 ? 'sync' : 'async'}
                        style={
                          img?.lqip
                            ? { backgroundImage: `url(${img.lqip})`, backgroundSize: 'cover' }
                            : undefined
                        }
                        className="h-full w-full scale-105 object-cover object-center opacity-90 transition-transform duration-1000 ease-out lg:object-right"
                      />
                    )
                  })() : null}
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
