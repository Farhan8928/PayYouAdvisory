import { STATS, COMPANY } from '../data/site.js'
import Counter from '../components/Counter.jsx'

/**
 * Four figures under the hero, counting up as they arrive.
 *
 * Every one is something a caller could verify — that is the whole selection
 * criterion. It is tempting to put "10,000+ happy customers" and "15 years of
 * excellence" here, and every competitor does, but the company was incorporated
 * in January 2026 and a claim a reader can disprove costs more than a smaller
 * true number earns. See the TODO(client) note above STATS in src/data/site.js
 * about the contradiction on the current site.
 *
 * The third figure is the interesting one. "1 credit enquiry" is not flattering,
 * it is a structural fact about how the service works, and it is the only one on
 * the strip a competitor cannot match by typing a bigger number into theirs.
 *
 * The counters animate from a correct starting render, never from zero — see
 * the note in Counter.jsx. A prerendered page claiming ₹0 facilitated would be
 * a genuinely bad thing to serve to a crawler.
 */
export default function TrustBand() {
  return (
    <section className="relative z-10 -mt-px border-y border-ink/10 bg-paper-deep">
      <div className="container-page py-12 sm:py-16">
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {STATS.map((s) => (
            <div key={s.label} className="group relative pt-5">
              {/* The gold rule grows on hover — a small, cheap acknowledgement
                  that the pointer is there. */}
              <span
                className="absolute inset-x-0 top-0 h-0.5 w-10 bg-accent transition-all duration-500 ease-brand group-hover:w-full"
                aria-hidden="true"
              />
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Counter
                  value={s.value}
                  className="fig block text-4xl font-semibold leading-none text-ink sm:text-5xl"
                />
                <span className="mt-3 block text-sm font-bold text-ink">{s.label}</span>
                <span className="mt-1 block text-2xs leading-snug text-ink-faint">{s.note}</span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 max-w-prose border-t border-ink/10 pt-6 text-2xs leading-relaxed text-ink-faint">
          {COMPANY.name} is a venture of {COMPANY.parent}, incorporated in {COMPANY.incorporated}. We
          publish the figures we can stand behind and none we cannot.
        </p>
      </div>
    </section>
  )
}
