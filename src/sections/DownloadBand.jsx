import { CONTACT, waLink, WA_DEFAULT, fmtMobile } from '../data/site.js'
import { telHref } from '../lib/format.js'
import { Whatsapp, Phone, QrCode, Check, ShieldCheck, ArrowRight } from '../components/Icon.jsx'

/**
 * IDFC FIRST Bank inspired Instant Connect / Mobile Advisory Band:
 * - Full-bleed dark gradient banner matching IDFC's mobile app showcase
 * - Phone UI illustration showing live loan advisory conversation
 * - WhatsApp instant chat trigger + Direct Landline Call CTA
 * - QR code badge for mobile phone scanning
 */

const APP_BENEFITS = [
  'Instant loan eligibility check in under 3 minutes',
  'Compare sanctioned interest rates from 25+ lenders',
  'Secure document upload & doorstep pickup in Pune/PCMC',
  'Real-time WhatsApp updates on file sanction & disbursal',
]

export default function DownloadBand() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-deep text-white py-16 sm:py-24">
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 75% 50%, rgba(22, 74, 144, 0.45), transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(227, 30, 36, 0.15), transparent 60%)',
        }}
      />

      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Heading, Value Props & Actions */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-whatsapp/20 border border-whatsapp/40 px-3 py-0.5 text-2xs font-extrabold uppercase tracking-wider text-whatsapp">
              Instant Mobile Support
            </span>
          </div>

          <h2 className="h-section text-paper">
            Get 1-on-1 Loan Advisory on WhatsApp
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
            Skip the paperwork queue. Send your requirement over WhatsApp and our senior advisors in Pune will shortlist the lowest-interest bank sanction for your profile.
          </p>

          {/* Benefit Checkpoints */}
          <ul className="mt-6 space-y-3">
            {APP_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm text-paper/90">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/30 text-accent-light">
                  <Check className="h-3 w-3" />
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Action Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={waLink(WA_DEFAULT)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp btn-lg flex items-center gap-2 font-bold shadow-lift"
            >
              <Whatsapp className="h-5 w-5" />
              Chat on WhatsApp
            </a>

            <a
              href={telHref(CONTACT.landline)}
              className="btn-glass btn-lg flex items-center gap-2"
            >
              <Phone className="h-4 w-4 text-sky" />
              <span className="fig">{CONTACT.landlineDisplay}</span>
            </a>
          </div>

          <p className="mt-5 text-2xs text-paper/60 flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-accent-light" />
            <span>Mon to Sat · 9:30 AM to 6:30 PM · Zero spam calls guaranteed</span>
          </p>
        </div>

        {/* Right Column: Phone Mockup & QR Code Badge */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm rounded-3xl border-2 border-white/20 bg-stage p-4 shadow-glass backdrop-blur-xl">
            {/* Phone header bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 px-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-whatsapp animate-pulse" />
                <span className="text-xs font-bold text-paper">PayYou Advisory Desk</span>
              </div>
              <span className="fig text-2xs text-paper/50">Online</span>
            </div>

            {/* Chat message simulations */}
            <div className="mt-4 space-y-3 text-xs">
              <div className="rounded-2xl rounded-tl-sm bg-white/10 p-3 text-paper/90 max-w-[85%]">
                <p className="font-semibold text-accent-light text-2xs mb-0.5">PayYou Advisor</p>
                Hello! Looking for a Home Loan, Business Loan, or Personal Loan in Pune/PCMC?
              </div>

              <div className="ml-auto rounded-2xl rounded-tr-sm bg-accent p-3 text-white max-w-[85%] shadow-sm">
                <p className="text-2xs text-white/75 mb-0.5">You</p>
                Need ₹40 Lakhs Home Loan for a flat in Chinchwad. What is the lowest interest rate?
              </div>

              <div className="rounded-2xl rounded-tl-sm bg-white/10 p-3 text-paper/90 max-w-[85%]">
                <p className="font-semibold text-accent-light text-2xs mb-0.5">PayYou Advisor</p>
                Based on your profile, Partner Bank A offers <strong className="text-white">8.40% p.a.</strong> with zero pre-payment charges. Shall we calculate your exact EMI?
              </div>
            </div>

            {/* Bottom QR scan widget */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-ink-deep p-1">
                  <QrCode className="h-7 w-7 text-ink" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Scan to Chat</p>
                  <p className="fig text-2xs text-white/60">+{CONTACT.whatsapp}</p>
                </div>
              </div>
              <a
                href={waLink(WA_DEFAULT)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-whatsapp/20 border border-whatsapp/40 px-3 py-1 text-2xs font-extrabold text-whatsapp hover:bg-whatsapp hover:text-ink-deep transition-colors"
              >
                Open →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
