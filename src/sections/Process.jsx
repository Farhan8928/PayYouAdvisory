import { PROCESS } from '../data/products.js'
import { Section, SectionHead } from '../components/PageHeader.jsx'
import Photo from '../components/Photo.jsx'
import { Check, ArrowRight, ShieldCheck } from '../components/Icon.jsx'

/**
 * IDFC FIRST Bank inspired 4-Step Process Section:
 * - Horizontal step progression cards with clear numbered badges
 * - "What does NOT happen" safety and data security guarantees
 * - Supporting workplace consultation photography
 */

export default function Process() {
  return (
    <Section id="process" tone="paper" size="lg" className="py-14 sm:py-20">
      <div className="container-page">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="rule-mark" />
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-2xs font-extrabold uppercase tracking-wider text-accent">
                Simple &amp; Transparent
              </span>
            </div>
            <h2 className="h-section text-ink">
              How Your Loan File Is Handled
            </h2>
            <p className="mt-2 max-w-2xl text-base text-ink-soft">
              Zero unauthorized submissions. Your data is protected by strict confidentiality agreements with partner banks.
            </p>
          </div>
          <a href="/eligibility-calculator/" className="btn-accent btn-sm shadow-sm">
            Check Your Eligibility First →
          </a>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s, i) => (
            <div
              key={s.step}
              className="group relative flex flex-col justify-between rounded-2xl border border-ink/10 bg-paper-deep p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-paper hover:shadow-lift"
            >
              <div>
                {/* Step number badge & connector cue */}
                <div className="flex items-center justify-between">
                  <span className="fig flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-extrabold text-white shadow-sm">
                    0{s.step}
                  </span>
                  <span className="text-2xs font-bold uppercase tracking-wider text-ink-faint">
                    Step {s.step} of 4
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-ink group-hover:text-accent-deep transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </div>

              {/* Safety assurance callout */}
              <div className="mt-6 border-t border-ink/8 pt-4">
                <p className="flex items-start gap-2 text-2xs leading-relaxed font-semibold text-ink-faint">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  <span>{s.detail}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Trust Strip */}
        <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">
                No Hard CIBIL Enquiries During Pre-Assessment
              </p>
              <p className="text-xs text-ink-soft">
                We shortlist eligible lenders before submitting your official application to prevent multiple credit score hits.
              </p>
            </div>
          </div>
          <a href="/contact/" className="btn-ghost btn-sm whitespace-nowrap">
            Speak to an Advisor
          </a>
        </div>
      </div>
    </Section>
  )
}
