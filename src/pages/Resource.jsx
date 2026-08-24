import PageHeader, { Section, SectionHead } from '../components/PageHeader.jsx'
import Accordion from '../components/Accordion.jsx'
import ContactStrip from '../sections/ContactStrip.jsx'
import { RESOURCES, RESOURCE_BY_SLUG } from '../data/resources.js'
import { ArrowRight } from '../components/Icon.jsx'

/**
 * Guides — the hub at /resources/ and one page per entry in data/resources.js.
 *
 * These exist to be useful to someone who is not ready to borrow. A reader
 * working out why their credit score fell, or what papers to gather, is months
 * from an application, and answering that question properly is the reason they
 * come back when they are ready. It is also the part of the site most likely to
 * earn a link from somewhere that is not a directory.
 */
export default function Resource({ slug, trail }) {
  if (!slug) return <ResourceHub trail={trail} />

  const r = RESOURCE_BY_SLUG[slug]
  const others = RESOURCES.filter((x) => x.slug !== slug)

  return (
    <>
      <PageHeader
        eyebrow="Guide"
        title={r.name}
        standfirst={r.summary}
        trail={trail}
        photo="review-documents"
      />

      <Section tone="paper" size="md">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="rule-mark" />
            <p className="h-card text-ink">{r.tagline}</p>
          </div>
          <div className="lg:col-span-8">
            {r.intro.map((para) => (
              <p
                key={para.slice(0, 40)}
                className="mb-5 text-base leading-relaxed text-ink-soft last:mb-0"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {r.sections.map((s, i) => (
        <Section key={s.title} tone={i % 2 === 0 ? 'deep' : 'paper'} size="md">
          <div className="container-page">
            <SectionHead title={s.title} />
            <div className="grid grid-cols-1 gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2">
              {s.items.map((item) => (
                <div key={item.title} className="bg-paper p-7 sm:p-8">
                  <h3 className="text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section tone="deep" size="md">
        <div className="container-page">
          <SectionHead title="Questions people ask" />
          <Accordion items={r.faqs} />
        </div>
      </Section>

      <Section tone="paper" size="md">
        <div className="container-page">
          <SectionHead title="Other guides" />
          <ul className="grid grid-cols-1 gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <a
                  href={`/${o.slug}/`}
                  className="group flex h-full flex-col justify-between gap-4 bg-paper p-7 transition-colors hover:bg-paper-deep"
                >
                  <span>
                    <span className="block text-base font-bold text-ink">{o.name}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-ink-soft">
                      {o.tagline}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-accent">
                    Read it
                    <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ContactStrip />
    </>
  )
}

function ResourceHub({ trail }) {
  return (
    <>
      <PageHeader
        eyebrow="Guides"
        title="The things worth knowing before you borrow."
        standfirst="Written for someone who is not ready to apply yet. No forms, no gated downloads, and nothing that needs your phone number."
        trail={trail}
        photo="review-documents"
      />

      <Section tone="paper" size="md">
        <div className="container-page">
          <ul className="grid grid-cols-1 gap-px border border-ink/12 bg-ink/12 lg:grid-cols-3">
            {RESOURCES.map((r) => (
              <li key={r.slug}>
                <a
                  href={`/${r.slug}/`}
                  className="group flex h-full flex-col justify-between gap-6 bg-paper p-7 transition-colors hover:bg-paper-deep sm:p-8"
                >
                  <span>
                    <span className="block h-card text-ink">{r.name}</span>
                    <span className="mt-3 block text-sm leading-relaxed text-ink-soft">
                      {r.summary}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-accent">
                    Read it
                    <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ContactStrip />
    </>
  )
}
