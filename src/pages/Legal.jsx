import { LEGAL_BY_SLUG, LEGAL_PAGES } from '../data/legal.js'
import { CONTACT } from '../data/site.js'
import { telHref } from '../lib/format.js'
import PageHeader, { Section } from '../components/PageHeader.jsx'
import { Phone, Mail, Check } from '../components/Icon.jsx'

/**
 * The policy pages — privacy, terms, disclaimer, cookies, grievance redressal.
 *
 * Rendered from data through one template, set at the same size and in the same
 * face as the rest of the site rather than in the small grey type these pages
 * usually get. In a YMYL category the policy set is read by Google's quality
 * raters as a direct trust signal, and by a cautious borrower deciding whether
 * to hand over a PAN number. Both notice when it looks like an afterthought.
 *
 * The grievance page is the one that does the most work: a named escalation
 * path all the way to the RBI Ombudsman is something a small advisory can
 * publish honestly and a fly-by-night intermediary cannot.
 */
export default function Legal({ slug, trail }) {
  const doc = LEGAL_BY_SLUG[slug]
  if (!doc) return null

  return (
    <>
      <PageHeader
        eyebrow={`Last updated ${doc.updated}`}
        title={doc.title}
        standfirst={doc.intro}
        trail={trail}
      />

      <Section size="md">
        <div className="container-narrow">
          {doc.sections.map((s, i) => (
            <section key={s.heading} className="mb-12 last:mb-0">
              <div className="mb-4 flex items-baseline gap-4">
                <span className="fig shrink-0 text-2xs tracking-[0.16em] text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="text-2xl text-ink">{s.heading}</h2>
              </div>

              {s.body?.map((para) => (
                <p key={para.slice(0, 40)} className="mb-4 max-w-prose text-base leading-relaxed text-ink-soft">
                  {para}
                </p>
              ))}

              {s.list ? (
                <ul className="mt-2 space-y-2.5">
                  {s.list.map((item) => (
                    <li key={item} className="flex max-w-prose gap-3 text-base leading-relaxed text-ink-soft">
                      <Check className="mt-1.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {/* ── Contact for this policy ───────────────────────────────── */}
          <div className="mt-14 border-t border-ink/15 pt-8">
            <h2 className="h-card text-ink">Questions about this page</h2>
            <p className="mt-2 max-w-prose text-base leading-relaxed text-ink-soft">
              Write or call, and a person will answer. You are entitled to a straight explanation of
              anything on this page.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={telHref(CONTACT.landline)} className="btn-ghost btn-sm">
                <Phone className="h-3.5 w-3.5" />
                <span className="fig">{CONTACT.landlineDisplay}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="btn-ghost btn-sm">
                <Mail className="h-3.5 w-3.5" />
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* ── The other policies ────────────────────────────────────── */}
          <nav aria-label="Other policies" className="mt-12 border-t border-ink/15 pt-8">
            <h2 className="mb-4 text-2xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
              The rest of the policy set
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL_PAGES.filter((l) => l.slug !== slug).map((l) => (
                <li key={l.slug}>
                  <a
                    href={`/${l.slug}/`}
                    className="link-underline text-sm text-ink-soft hover:text-ink"
                  >
                    {l.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Section>
    </>
  )
}
