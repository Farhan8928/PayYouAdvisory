import { CONTACT, STATS } from '../data/site.js'
import { PARTNER_COUNT_CLAIM } from '../data/lenders.js'
import { telHref } from '../lib/format.js'
import { Phone, ArrowRight, Check, ShieldCheck } from '../components/Icon.jsx'
import Photo from '../components/Photo.jsx'

/**
 * The hero.
 *
 * ── What was wrong with the previous one ───────────────────────────────────
 * It was a full-bleed photograph with a display-serif headline at 76px and the
 * eligibility calculator beside it. On a 1080p laptop at 125% scaling — which
 * is a very ordinary machine in this market — the viewport is about 730px tall,
 * the header takes 116px of it, and the headline alone ate the rest. **The
 * call-to-action was below the fold.** On a page whose entire job is to get
 * someone to phone the office, that is not a styling problem, it is a broken
 * hero.
 *
 * ── How this one is sized ──────────────────────────────────────────────────
 * Everything above is budgeted against ~614px of usable height:
 *
 *   eyebrow 20 · headline 2 lines ≈ 120 · standfirst 2 lines ≈ 56
 *   · buttons 56 · trust row 44 · gaps and padding ≈ 200        → ≈ 500px
 *
 * The headline is two lines, not three, which is why it is shorter than the
 * copy it replaced. `short:` (a height-based breakpoint, not a width one)
 * tightens the padding further on genuinely short viewports.
 *
 * ── Why it is light, not dark ──────────────────────────────────────────────
 * PayYou's logo is royal blue on transparency with no reversed version, so the
 * navigation bar has to be white. A white bar sitting directly on a dark
 * full-bleed hero draws a hard edge across the top of the page. Light hero,
 * white bar, photograph as a framed element on the right — which is also the
 * pattern every bank in the client's reference set uses.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper-wash">
      {/* A very quiet blue wash bleeding in from the right, so the white does
          not read as an empty canvas behind the photograph. Not an orb — no
          blur radius, no floating shape, just a soft directional tint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-2/3 bg-gradient-to-l from-ink/[0.07] to-transparent"
      />

      <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-12 lg:gap-14 lg:py-14 short:py-8">
        {/* ── The argument ───────────────────────────────────────────────── */}
        <div className="lg:col-span-7">
          <p className="eyebrow">Loan advisory · Pune &amp; Pimpri-Chinchwad</p>

          <h1 className="h-display text-ink">
            Twenty-five lenders.
            <br />
            <span className="text-accent-sheen">One application.</span>
          </h1>

          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
            Apply to eight banks yourself and you collect eight hard enquiries — and a lower score at
            exactly the wrong moment. We shortlist which of our {PARTNER_COUNT_CLAIM} partners would
            actually approve your file, then submit to one.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={telHref(CONTACT.landline)} className="btn-accent btn-lg">
              <Phone className="h-4 w-4" />
              <span className="fig">{CONTACT.landlineDisplay}</span>
            </a>
            <a href="/eligibility-calculator/" className="btn-ghost btn-lg">
              Check what you could borrow
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Three checkable claims, on one line at desktop width. */}
          <ul className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2.5 border-t border-ink/10 pt-5">
            {[
              'One credit enquiry, not one per lender',
              'Soft check first — nothing submitted without your word',
              'Our fee is paid by the lender',
            ].map((claim) => (
              <li key={claim} className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                <Check className="h-4 w-4 shrink-0 text-accent" />
                {claim}
              </li>
            ))}
          </ul>
        </div>

        {/* ── The photograph ─────────────────────────────────────────────── */}
        <div className="lg:col-span-5">
          <div className="relative">
            <Photo
              name="hero-advisory"
              ratio="5 / 4"
              priority
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="photo-rule rounded-xl shadow-lift"
            />

            {/* A figure lifted onto the corner of the photograph. This is the
                one piece of overlap on the page: it ties the two columns
                together and gives the composition a foreground. */}
            <div className="absolute -bottom-6 -left-4 hidden rounded-xl border border-ink/10 bg-paper p-5 shadow-lift sm:block lg:-left-8">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                </span>
                <span>
                  <span className="fig block text-2xl font-semibold leading-none text-ink">
                    {STATS[1].value}
                  </span>
                  <span className="mt-1 block text-2xs font-bold uppercase tracking-[0.14em] text-ink-faint">
                    Bank &amp; NBFC partners
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
