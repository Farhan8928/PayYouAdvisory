import { PROCESS } from '../data/products.js'
import { Section, SectionHead } from '../components/PageHeader.jsx'
import Photo from '../components/Photo.jsx'
import { Check } from '../components/Icon.jsx'

/**
 * The four steps, as a connected timeline.
 *
 * The gold line running behind the numbered markers is the whole device — it is
 * what turns four boxes into a sequence. It is drawn as a single absolutely
 * positioned hairline behind the row rather than as borders on each item,
 * because per-item borders leave gaps at every join and the eye reads the gaps.
 *
 * Each step carries a `detail` line stating what does *not* happen at that
 * stage — no documents yet, no hard enquiry yet, nothing submitted without your
 * instruction. In this category the reader's real anxiety is about losing
 * control of their information, and answering it directly is worth more than
 * another adjective about service.
 *
 * The same array drives the `HowTo` JSON-LD on the homepage, so the steps a
 * search engine sees and the steps on the page cannot diverge.
 */
export default function Process() {
  return (
    <Section id="process" tone="deep" size="lg">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead
              index="How it runs"
              title="Four steps, and what does not happen at each."
              standfirst="Nothing is submitted anywhere until you say so. The credit check we run first is a soft one and leaves no mark on your report."
              className="mb-8"
            />
            <Photo
              name="review-documents"
              ratio="4 / 3"
              sizes="(min-width: 1024px) 36vw, 92vw"
              className="photo-rule rounded-lg shadow-card"
            />
          </div>

          <div className="lg:col-span-7">
            <ol className="relative">
              {/* The connecting line. Inset at top and bottom so it starts and
                  ends at the first and last marker rather than floating past
                  them. */}
              <span
                className="absolute left-[1.4375rem] top-8 bottom-8 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent"
                aria-hidden="true"
              />

              {PROCESS.map((s, i) => (
                <li key={s.step} id={`process-${s.step}`} className="relative flex gap-6 pb-10 last:pb-0">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-paper shadow-card">
                    <span className="fig text-sm font-semibold text-accent-deep">{s.step}</span>
                  </span>

                  <div className="pt-1.5">
                    <h3 className="h-card text-ink">{s.title}</h3>
                    <p className="mt-2.5 max-w-prose text-base leading-relaxed text-ink-soft">
                      {s.body}
                    </p>
                    <p className="mt-4 flex items-start gap-2.5 text-2xs leading-relaxed text-ink-faint">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      {s.detail}
                    </p>
                  </div>

                  {i === PROCESS.length - 1 ? null : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  )
}
