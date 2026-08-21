import { CONTACT, fmtMobile } from '../data/site.js'
import { PARTNER_COUNT_CLAIM } from '../data/lenders.js'
import { telHref } from '../lib/format.js'
import { Phone, ArrowRight, Check, ChevronDown } from '../components/Icon.jsx'
import { PhotoBackdrop } from '../components/Photo.jsx'
import EligibilityCalculator from '../widgets/EligibilityCalculator.jsx'

/**
 * The hero.
 *
 * ── The composition ────────────────────────────────────────────────────────
 * A full-bleed photograph of an adviser and a client concluding a meeting,
 * behind a fixed navy scrim, with the headline set in Instrument Serif at
 * display size and a glass panel carrying a working eligibility calculator.
 *
 * The scrim is a fixed gradient rather than a tint sampled from the image, so
 * the headline's contrast is guaranteed no matter which photograph is swapped
 * in — the failure mode of "darken the image a bit" is that someone later
 * chooses a brighter picture and the white type quietly becomes unreadable.
 *
 * The photograph carries `data-parallax`, which drifts it about 6% across a
 * viewport of scroll via a CSS scroll-driven animation. No JavaScript, no
 * scroll listener, nothing on the main thread — and in browsers without support
 * it simply sits still, which nobody notices.
 *
 * ── Why a calculator and not a lead form ───────────────────────────────────
 * The category convention is a form demanding a mobile number before it tells
 * you anything. This answers the question the visitor actually arrived with —
 * "how much could I get?" — before asking them for a thing. It converts
 * slightly worse and earns considerably more trust, and in a business where
 * trust is the product that is the trade worth making.
 */
export default function Hero() {
  return (
    <PhotoBackdrop name="hero-advisory" scrim="left" priority className="-mt-20 text-paper">
      {/* pt-20 restores the height the -mt-20 above removed, so the photograph
          runs behind the transparent navigation bar while the content stays put.
          See the note in PageHeader.jsx. */}
      <div className="container-page grid gap-12 pb-16 pt-36 sm:pb-24 sm:pt-44 lg:grid-cols-12 lg:gap-14 lg:pb-28 lg:pt-48 short:pb-14 short:pt-32">
        {/* ── The argument ───────────────────────────────────────────────── */}
        <div className="lg:col-span-6 lg:pt-4">
          <p className="eyebrow text-gold">Loan advisory · Pune &amp; Pimpri-Chinchwad</p>

          <h1 className="h-display text-paper">
            Twenty-five lenders
            <br />
            will look at your file.
            <br />
            <span className="text-gold-sheen">One will see your name.</span>
          </h1>

          <p className="mt-8 max-w-prose text-lg leading-relaxed text-paper/75">
            Apply to eight banks yourself and your credit report carries eight hard enquiries — and
            a lower score at exactly the wrong moment. We read your profile the way an underwriter
            will, work out which of our {PARTNER_COUNT_CLAIM} partners would actually approve it,
            and submit to one.
          </p>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2" data-stagger>
            {[
              ['One credit enquiry', 'not one per lender you hoped might say yes'],
              ['Soft check first', 'nothing is submitted anywhere without your word'],
              ['Cash income considered', 'several partners underwrite from bank statements'],
              ['The lender pays us', 'our fee comes from them on disbursal, not from you'],
            ].map(([title, sub]) => (
              <li key={title} className="flex gap-3 rounded-lg border border-paper/12 bg-paper/[0.04] p-4 backdrop-blur-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass/20">
                  <Check className="h-3 w-3 text-gold" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-paper">{title}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-paper/55">{sub}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={telHref(CONTACT.landline)} className="btn-brass btn-lg">
              <Phone className="h-4 w-4" />
              <span className="fig">{CONTACT.landlineDisplay}</span>
            </a>
            <a href="/loans/" className="btn-ghost-invert btn-lg">
              See every product
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-6 text-2xs text-paper/45">
            Chapekar Chowk, Chinchwad · {CONTACT.hours} ·{' '}
            <a href={telHref(CONTACT.mobile)} className="fig transition-colors hover:text-brass">
              {fmtMobile(CONTACT.mobile)}
            </a>
          </p>
        </div>

        {/* ── The instrument ─────────────────────────────────────────────── */}
        <div className="lg:col-span-6" data-reveal>
          <div className="glass overflow-hidden p-1.5">
            <div className="flex items-baseline justify-between gap-4 px-4 py-3">
              <h2 className="h-card text-paper">What could you actually borrow?</h2>
              <a
                href="/eligibility-calculator/"
                className="shrink-0 text-2xs text-gold underline decoration-brass/40 underline-offset-4 transition-colors hover:decoration-brass"
              >
                Full version
              </a>
            </div>
            <div className="overflow-hidden rounded-lg">
              <EligibilityCalculator compact />
            </div>
          </div>

          <p className="mt-4 px-1 text-2xs leading-relaxed text-paper/45">
            No name, no mobile number, no OTP. The figure appears as you type and never leaves your
            browser.
          </p>
        </div>
      </div>

      {/* A scroll cue. Small, and the only purely decorative element on the
          page — it earns its place because the hero is a full viewport on
          desktop and there is no other signal that anything follows. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 hidden justify-center lg:flex">
        <ChevronDown className="h-5 w-5 animate-scroll-cue text-paper/40" />
      </div>
    </PhotoBackdrop>
  )
}
