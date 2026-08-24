import { STATS, COMPANY } from '../data/site.js'
import Counter from '../components/Counter.jsx'
import { ShieldCheck, Check, Pin } from '../components/Icon.jsx'
import { LINE_ART } from '../components/LineArt.jsx'

/**
 * IDFC FIRST Bank inspired Trust & Metrics Band:
 * - 4 Key verified figures with real-time counters
 * - Dedicated icon badges
 * - Subtle hover depth and border animation
 */

const STAT_ICONS = ['growth', 'award', 'shield', 'building']

export default function TrustBand() {
  return (
    <section className="relative z-10 border-y border-ink/10 bg-paper py-14 sm:py-18">
      <div className="container-page">
        <div className="mb-10 text-center">
          <span className="mx-auto rule-mark" />
          <h2 className="h-section text-ink">Verified Track Record &amp; Reach</h2>
          <p className="mt-2 text-base text-ink-soft">
            Real metrics backed by licensed partnerships and operational presence.
          </p>
        </div>

        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {STATS.map((s, i) => {
            const Art = LINE_ART[STAT_ICONS[i % STAT_ICONS.length]]
            return (
              <div
                key={s.label}
                className="group relative rounded-2xl border border-ink/8 bg-paper-deep p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-paper hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <Art className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-paper px-2.5 py-0.5 text-2xs font-bold text-ink-faint border border-ink/8">
                    Verified
                  </span>
                </div>

                <dt className="sr-only">{s.label}</dt>
                <dd className="mt-5">
                  <Counter
                    value={s.value}
                    className="fig block text-3xl font-extrabold leading-none text-ink sm:text-4xl"
                  />
                  <span className="mt-3 block text-base font-bold text-ink">
                    {s.label}
                  </span>
                  <span className="mt-1 block text-2xs leading-relaxed text-ink-soft">
                    {s.note}
                  </span>
                </dd>

                {/* Animated bottom border accent */}
                <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-accent scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            )
          })}
        </dl>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/8 pt-6 text-xs text-ink-faint">
          <p>
            {COMPANY.name} · Venture of {COMPANY.parent} · Incorporated in {COMPANY.incorporated}
          </p>
          <div className="flex items-center gap-2 font-semibold text-ink-soft">
            <ShieldCheck className="h-4 w-4 text-accent" />
            <span>Direct Selling Agent (DSA) Partner</span>
          </div>
        </div>
      </div>
    </section>
  )
}
