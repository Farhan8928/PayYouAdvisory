import { TESTIMONIALS, CONTACT } from '../data/site.js'
import { telHref } from '../lib/format.js'
import { PhotoBackdrop } from '../components/Photo.jsx'
import { Phone, ArrowRight } from '../components/Icon.jsx'

/**
 * One testimonial, and an honest note about why there is only one.
 *
 * Every competitor runs a carousel of three to five glowing quotes, and a large
 * proportion of them are invented — stock portrait, plausible name, a sentence
 * about "seamless service". It is the easiest claim on a financial website to
 * check: the portrait is reverse-image-searchable in seconds.
 *
 * So this renders the single quote PayYou actually publishes, at full size
 * where a carousel would be, and says in plain words that it is the only
 * verified one and where the rest will appear. Volunteering a shortage is a
 * strange thing to do in marketing copy and it is exactly why it lands — nobody
 * fakes a weakness.
 *
 * When the Google Business Profile fills up, add entries to TESTIMONIALS in
 * src/data/site.js and this becomes a grid without any change here.
 */
export default function Testimonial() {
  const [lead] = TESTIMONIALS
  if (!lead) return null

  return (
    <PhotoBackdrop name="pune-skyline-dusk" scrim="full">
      <div className="container-page py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-7" data-reveal>
            {/* `text-brass/50`, not `text-gold/50`. `.text-gold` is a component
                class resolving a custom property, so Tailwind's opacity
                modifier does not apply to it and compiles to nothing at all —
                `npm run audit:css` catches exactly this. The mark sits on navy,
                where the bright gold is the right one regardless. */}
            <span
              className="block font-display text-7xl leading-none text-brass/50"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="-mt-6">
              <p className="font-display text-3xl leading-[1.25] text-paper sm:text-4xl">
                {lead.quote}
              </p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="h-px w-10 bg-brass" aria-hidden="true" />
              <span>
                <span className="block text-base font-bold text-paper">{lead.name}</span>
                <span className="block text-sm text-paper/55">
                  {lead.role} · {lead.place}
                </span>
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-span-5 lg:pt-16" data-reveal>
            <div className="rounded-lg border border-paper/15 bg-ink-deep/50 p-7 backdrop-blur-sm">
              <h2 className="h-card text-paper">Why only one?</h2>
              <p className="mt-3 text-base leading-relaxed text-paper/70">
                Because it is the only one we can stand behind. Most sites in this business run a
                carousel of five, and a good number of those are invented — the portraits are
                reverse-image-searchable in about four seconds.
              </p>
              <p className="mt-4 text-base leading-relaxed text-paper/70">
                Ours will appear on our Google Business Profile as customers leave them, where you
                can read them without us in the middle. That is slower and it is the only version
                worth anything.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 border-t border-paper/12 pt-6">
                <a href={telHref(CONTACT.landline)} className="btn-brass btn-sm">
                  <Phone className="h-3.5 w-3.5" />
                  <span className="fig">{CONTACT.landlineDisplay}</span>
                </a>
                <a href="/about/" className="btn-ghost-invert btn-sm">
                  Who runs PayYou
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhotoBackdrop>
  )
}
