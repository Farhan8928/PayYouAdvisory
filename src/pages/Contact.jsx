import { CONTACT, OFFICES, PRIMARY_OFFICE, COMPANY, fmtMobile, waLink, WA_DEFAULT } from '../data/site.js'
import { PRODUCTS } from '../data/products.js'
import { telHref } from '../lib/format.js'
import PageHeader, { Section, SectionHead } from '../components/PageHeader.jsx'
import { Phone, Whatsapp, Mail, Clock, Pin, ArrowRight, Check } from '../components/Icon.jsx'

/**
 * Contact.
 *
 * ── Why there is no contact form ───────────────────────────────────────────
 * A form on a statically hosted site needs either a backend nobody will
 * maintain or a third-party endpoint nobody will monitor, and the failure mode
 * is silent: the form appears to submit, the enquiry goes nowhere, and the
 * business never learns it lost the customer. This one answers a phone six days
 * a week; a phone number, a WhatsApp link and an email address are three
 * channels that cannot fail quietly.
 *
 * The "what to have ready" block is the useful part. Someone on this page is
 * about to call, and telling them what to have in front of them turns a
 * five-minute conversation into a productive one.
 *
 * The map is the only third-party content on the entire site. It is lazy-loaded
 * so it costs nothing until it scrolls into view — an eagerly-loaded Google Map
 * iframe is typically the single heaviest thing on a small business's site.
 */
export default function Contact({ trail }) {
  return (
    <>
      <PageHeader
        eyebrow="Mon – Sat · 9:30 am – 6:30 pm"
        title="Call. Five minutes usually settles it."
        standfirst="Tell us the amount, the purpose and roughly what you earn, and we will tell you whether the file is straightforward, fixable, or not worth applying with yet. No documents needed for that conversation."
        trail={trail}
        photo="office-window"
        aside={
          <div className="border border-paper/15 p-6">
            <h2 className="mb-5 text-2xs font-semibold uppercase tracking-[0.14em] text-gold">
              Reach us
            </h2>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={telHref(CONTACT.landline)}
                  className="fig flex items-center gap-3 text-lg font-medium text-paper transition-colors hover:text-brass"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  {CONTACT.landlineDisplay}
                </a>
              </li>
              <li>
                <a
                  href={telHref(CONTACT.mobile)}
                  className="fig flex items-center gap-3 text-lg font-medium text-paper transition-colors hover:text-brass"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  {fmtMobile(CONTACT.mobile)}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-base text-paper/80 transition-colors hover:text-brass"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-paper/60">
                <Clock className="h-4 w-4 shrink-0 text-gold" />
                <span className="fig">{CONTACT.hours}</span>
              </li>
            </ul>

            <a
              href={waLink(WA_DEFAULT)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-6 w-full"
            >
              <Whatsapp className="h-4 w-4" />
              Start on WhatsApp
            </a>
          </div>
        }
      />

      {/* ── Prepare ─────────────────────────────────────────────────────── */}
      <Section size="md">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead title="What to have in front of you" className="mb-6" />
            <p className="prose-body">
              None of this is needed to call — but if you have it to hand, the answer you get will
              be a real one rather than a range.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="border-t border-ink/15">
              {[
                ['The amount and what it is for', 'The purpose changes which product is right, and sometimes changes the rate.'],
                ['Your net monthly income', 'Take-home, after deductions — not the CTC figure.'],
                ['Your existing EMIs', 'All of them, including credit-card EMIs. This is what most often decides the answer.'],
                ['Your credit score, if you know it', 'If not, we will check it with a soft pull that leaves no mark.'],
                ['For a secured loan, the property', 'Type, location, roughly what it is worth, and whether the title is clear.'],
              ].map(([t, b]) => (
                <li key={t} className="grid gap-x-8 gap-y-1 border-b border-ink/15 py-4 sm:grid-cols-12">
                  <span className="flex gap-2.5 text-base font-semibold text-ink sm:col-span-5">
                    <Check className="mt-1.5 h-3.5 w-3.5 shrink-0 text-gold" />
                    {t}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-soft sm:col-span-7">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-l-[3px] border-brass bg-paper-deep px-5 py-4">
              <p className="text-sm leading-relaxed text-ink-soft">
                <strong className="font-semibold text-ink">We will never</strong> ask you to pay a
                fee in cash to secure a sanction, ask for an internet-banking password or an OTP, or
                ask you to transfer money to an individual account to release a loan. Anyone doing so
                in our name is not acting for us — tell us, and tell the police.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Offices ─────────────────────────────────────────────────────── */}
      <Section tone="deep" size="md">
        <div className="container-page">
          <SectionHead
            title="Three offices"
            standfirst={`Corporate at Chapekar Chowk in Chinchwad, a branch at Bhigwan Chowk in Baramati, and the registered office at Laxmi Nagar, Phaltan.`}
          />

          <ul className="grid gap-px border border-ink/12 bg-ink/12 lg:grid-cols-3">
            {OFFICES.map((o) => (
              <li key={o.id} className="bg-paper p-7">
                <p className="mb-3 flex items-center gap-1.5 text-2xs uppercase tracking-[0.14em] text-gold">
                  <Pin className="h-3.5 w-3.5" />
                  {o.kind}
                </p>
                <h3 className="font-display text-2xl text-ink">{o.locality}</h3>
                <address className="mt-3 text-base not-italic leading-relaxed text-ink-soft">
                  {o.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <p className="fig mt-3 text-sm text-ink-faint">{o.postalCode}</p>
                <a
                  href={o.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-brass-deep"
                >
                  Directions
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>

          {/* The only third-party embed on the site. `loading="lazy"` keeps it
              off the critical path — an eager Google Maps iframe is routinely
              the heaviest object on a small business site. */}
          <div className="mt-10 border border-ink/15">
            <iframe
              src={PRIMARY_OFFICE.mapEmbed}
              title={`Map to ${COMPANY.shortName}, ${PRIMARY_OFFICE.locality}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[22rem] w-full border-0 grayscale-[0.35]"
            />
          </div>
        </div>
      </Section>

      {/* ── Straight to a product ───────────────────────────────────────── */}
      <Section size="sm">
        <div className="container-page">
          <h2 className="mb-6 h-card text-ink">
            Or start with the product you need
          </h2>
          <ul className="flex flex-wrap gap-2.5">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <a
                  href={`/${p.slug}/`}
                  className="inline-block border border-ink/15 px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}
