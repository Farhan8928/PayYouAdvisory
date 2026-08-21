import { CONTACT, OFFICES, fmtMobile, waLink, WA_DEFAULT } from '../data/site.js'
import { telHref } from '../lib/format.js'
import { PhotoBackdrop } from '../components/Photo.jsx'
import { Phone, Whatsapp, Mail, Clock, ArrowRight, Pin } from '../components/Icon.jsx'

/**
 * The closing block: the ask, and every way to make it.
 *
 * Deliberately not a contact form. A form on a static site needs either a
 * backend nobody will maintain or a third-party endpoint nobody will monitor,
 * and its failure mode is silent — the form appears to submit, the enquiry goes
 * nowhere, and the business never learns it lost the customer. This business
 * answers a phone six days a week; the phone number is the conversion.
 *
 * The three offices are repeated here with exactly the wording used in the
 * footer, on /contact/ and in the JSON-LD. Google cross-checks a business's
 * name, address and phone against its Business Profile and every directory
 * listing it can find, and inconsistency quietly costs local ranking.
 */
export default function ContactStrip() {
  return (
    <PhotoBackdrop name="meeting-india" scrim="left">
      <div className="container-page grid gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <span className="rule-mark" />
          <h2 className="h-section max-w-xl text-paper">
            Tell us the requirement. We will tell you where it will clear.
          </h2>
          <p className="mt-7 max-w-prose text-lg leading-relaxed text-paper/72">
            Five minutes on the phone is usually enough to know whether a file is straightforward,
            fixable, or not worth applying with yet. No documents needed for that conversation, and
            nothing is submitted anywhere without your instruction.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href={telHref(CONTACT.landline)} className="btn-accent btn-lg">
              <Phone className="h-4 w-4" />
              <span className="fig">{CONTACT.landlineDisplay}</span>
            </a>
            <a
              href={waLink(WA_DEFAULT)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp btn-lg"
            >
              <Whatsapp className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>

          <ul className="mt-9 space-y-3 border-t border-paper/12 pt-7">
            <li>
              <a
                href={telHref(CONTACT.mobile)}
                className="fig flex items-center gap-3 text-sm text-paper/75 transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                {fmtMobile(CONTACT.mobile)}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-sm text-paper/75 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-paper/60">
              <Clock className="h-4 w-4 shrink-0 text-accent" />
              <span className="fig">{CONTACT.hours}</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6">
          <h3 className="mb-5 text-2xs font-bold uppercase tracking-[0.16em] text-paper/45">
            Where to find us
          </h3>

          <ul className="space-y-3">
            {OFFICES.map((o) => (
              <li
                key={o.id}
                className="group rounded-lg border border-paper/12 bg-paper/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="flex items-center gap-2 font-display text-2xl text-paper">
                    <Pin className="h-4 w-4 text-accent" />
                    {o.locality}
                  </p>
                  <span className="text-2xs uppercase tracking-[0.14em] text-accent">{o.kind}</span>
                </div>
                <address className="mt-3 text-sm not-italic leading-relaxed text-paper/60">
                  {o.lines.join(' ')}
                </address>
                <a
                  href={o.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-2xs font-semibold text-paper/70 transition-colors hover:text-accent"
                >
                  Directions
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>

          <a href="/contact/" className="btn-ghost-invert mt-5 w-full">
            Full contact details &amp; map
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </PhotoBackdrop>
  )
}
