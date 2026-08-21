import { PRODUCT_BY_SLUG, RATE_DEPENDS_ON } from '../data/products.js'
import { AREAS, AREA_PRODUCT_SLUGS } from '../data/areas.js'
import { CONTACT, waLink } from '../data/site.js'
import { telHref, inr, pct } from '../lib/format.js'
import PageHeader, { Section, SectionHead } from '../components/PageHeader.jsx'
import SpecStrip from '../components/SpecStrip.jsx'
import Disclosure from '../components/Disclosure.jsx'
import Accordion from '../components/Accordion.jsx'
import ContactStrip from '../sections/ContactStrip.jsx'
import EmiCalculator from '../widgets/EmiCalculator.jsx'
import { Phone, Whatsapp, ArrowRight, Check } from '../components/Icon.jsx'

/**
 * The product page template — one page per entry in src/data/products.js.
 *
 * A single template rather than eight hand-built pages, for the reason
 * src/scripts/brand-audit.mjs exists on the reference project: hand-built pages
 * drift. Eight copies of a layout means eight places to update a disclosure and
 * seven of them will be missed. Everything that varies between products lives
 * in the data; the blocks below render only when the data for them exists,
 * which is why the home loan page grows a tax-benefits table and the gold loan
 * page does not.
 *
 * Section order follows what a borrower actually needs, in order: what it is →
 * the numbers → the disclosure that stops those numbers being read as an offer
 * → what it is for → who qualifies → what to bring → do the arithmetic →
 * questions → where you are.
 */
export default function Product({ slug, trail }) {
  const p = PRODUCT_BY_SLUG[slug]
  if (!p) return null

  const hasAreaPages = AREA_PRODUCT_SLUGS.includes(slug)
  const isInsurance = slug === 'insurance'

  return (
    <>
      <PageHeader
        eyebrow={`${p.categoryLabel} · Pune & Pimpri-Chinchwad`}
        title={p.tagline}
        standfirst={p.summary}
        trail={trail}
        photo={p.slug}
        aside={
          <div className="glass p-7">
            <h2 className="mb-5 text-2xs font-semibold uppercase tracking-[0.14em] text-accent">
              {p.name} at a glance
            </h2>
            <dl className="space-y-4">
              <Line label="Interest from" value={p.spec.rateFrom ? `${pct(p.spec.rateFrom)} p.a.` : 'Priced to your profile'} />
              <Line label="Amount" value={p.spec.amountNote} />
              <Line label="Tenure" value={p.spec.tenure} />
              <Line label="Security" value={p.spec.security} />
              <Line label="Disbursal" value={p.spec.disbursal} />
            </dl>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-paper/15 pt-5">
              <a href={telHref(CONTACT.landline)} className="btn-accent btn-sm">
                <Phone className="h-3.5 w-3.5" />
                <span className="fig">{CONTACT.landlineDisplay}</span>
              </a>
              <a
                href={waLink(`Hi PayYou Advisory, I would like to check my eligibility for a ${p.name.toLowerCase()}. `)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp btn-sm"
              >
                <Whatsapp className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        }
      />

      {/* ── Intro + the numbers ─────────────────────────────────────────── */}
      <Section size="md">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {p.intro.map((para) => (
              <p key={para.slice(0, 40)} className="prose-body mb-5 last:mb-0">
                {para}
              </p>
            ))}
          </div>

          <div className="lg:col-span-5">
            <SpecStrip spec={p.spec} columns={4} layout="pair" />
            <Disclosure className="mt-6" />
          </div>
        </div>
      </Section>

      {/* ── Features ──────────────────────────────────────────────────────
          Guarded because not every product has them. Insurance carries a
          `covers` list instead — six named policy types do the same job better
          than four paraphrased benefits would, so it does not get a features
          block rather than getting a padded one. */}
      {p.features ? (
      <Section tone="deep" size="md">
        <div className="container-page">
          <SectionHead title={`What a ${p.name.toLowerCase()} gives you`} />
          <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {p.features.map((f, i) => (
              <div key={f.title}>
                <span className="fig mb-3 block text-2xs tracking-[0.16em] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="h-card leading-snug text-ink">{f.title}</h3>
                <p className="mt-2.5 max-w-prose text-base leading-relaxed text-ink-soft">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      ) : null}

      {/* ── Types (home loan) / property types (LAP) / covers (insurance) ── */}
      {p.types ? (
        <Section size="md">
          <div className="container-page">
            <SectionHead
              title="Six kinds of home loan"
              standfirst="They are underwritten differently and priced differently. Applying for the wrong one is a common and entirely avoidable way to lose a month."
            />
            <ul className="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
              {p.types.map((t) => (
                <li key={t.name} className="bg-paper p-6">
                  <h3 className="h-card text-ink">{t.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {p.propertyTypes ? (
        <Section size="md">
          <div className="container-page">
            <SectionHead
              title="Property our partner lenders will accept"
              standfirst="This list is the reason to use a panel rather than a bank. Most of the second and third groups are declined outright by most banks and are ordinary business for specific NBFCs."
            />
            <div className="grid gap-10 sm:grid-cols-3">
              {p.propertyTypes.map((g) => (
                <div key={g.group}>
                  <h3 className="mb-4 border-b-2 border-accent pb-2 h-card text-ink">
                    {g.group}
                  </h3>
                  <ul className="space-y-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                        <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {p.covers ? (
        <Section size="md">
          <div className="container-page">
            <SectionHead
              title="What we place"
              standfirst="Across multiple insurers rather than a single one, which at least removes the worst version of the conflict every insurance sale carries."
            />
            <ul className="border-t border-ink/15">
              {p.covers.map((c, i) => (
                <li key={c.name} className="grid gap-x-8 gap-y-2 border-b border-ink/15 py-6 lg:grid-cols-12">
                  <span className="index-num lg:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl text-ink lg:col-span-3">{c.name}</h3>
                  <p className="max-w-prose text-base leading-relaxed text-ink-soft lg:col-span-8">
                    {c.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* ── Uses ────────────────────────────────────────────────────────── */}
      {p.uses ? (
        <Section tone="deep" size="sm">
          <div className="container-page">
            <h2 className="mb-6 h-card text-ink">
              What people use it for
            </h2>
            <ul className="flex flex-wrap gap-2.5">
              {p.uses.map((u) => (
                <li
                  key={u}
                  className="border border-ink/15 bg-paper px-4 py-2 text-sm text-ink-soft"
                >
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* ── Eligibility ─────────────────────────────────────────────────── */}
      <Section size="md">
        <div className="container-page">
          <SectionHead title="Who qualifies" standfirst={p.eligibility.note} />

          <div className="scroll-x">
            <table className="table-doc min-w-[36rem]">
              <caption className="sr-only">
                Indicative eligibility criteria for a {p.name.toLowerCase()}.
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-1/3">Criterion</th>
                  {p.eligibility.singleColumn ? (
                    <th scope="col">Requirement</th>
                  ) : (
                    <>
                      <th scope="col">Salaried</th>
                      <th scope="col">Self-employed</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {p.eligibility.rows.map((row) => (
                  <tr key={row.criterion}>
                    <th scope="row" className="border-b border-ink/10 py-3.5 pr-4 text-left align-top text-[0.9375rem] font-semibold normal-case tracking-normal text-ink">
                      {row.criterion}
                    </th>
                    {p.eligibility.singleColumn ? (
                      <td className="fig text-ink-soft">{row.selfEmployed}</td>
                    ) : (
                      <>
                        <td className="text-ink-soft">{row.salaried}</td>
                        <td className="text-ink-soft">{row.selfEmployed}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {p.accepted ? (
            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-16">
              <h3 className="h-card text-ink lg:col-span-4">
                {p.accepted.title}
              </h3>
              <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:col-span-8">
                {p.accepted.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-base leading-relaxed text-ink-soft">
                    <Check className="mt-1.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Section>

      {/* ── Rate drivers ────────────────────────────────────────────────── */}
      {!isInsurance ? (
        <Section tone="dark" size="md">
          <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead
                title="What actually decides your rate"
                standfirst={p.spec.rateNote}
                invert
                className="mb-0"
              />
            </div>
            <ol className="lg:col-span-7">
              {RATE_DEPENDS_ON.map((d, i) => (
                <li
                  key={d}
                  className="flex gap-5 border-b border-paper/12 py-4 first:border-t first:border-paper/12"
                >
                  <span className="fig shrink-0 text-2xs tracking-[0.16em] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base leading-relaxed text-paper/75">{d}</span>
                </li>
              ))}
              <li className="pt-6 text-sm leading-relaxed text-paper/50">
                We will not quote you a headline rate you may never be offered. Call and we will tell
                you which band your profile realistically falls into across the panel.
              </li>
            </ol>
          </div>
        </Section>
      ) : null}

      {/* ── Tax ─────────────────────────────────────────────────────────── */}
      {p.taxBenefits ? (
        <Section size="md">
          <div className="container-page">
            <SectionHead
              title="Tax treatment"
              standfirst="General in nature and dependent on your circumstances. Confirm your own position with a qualified tax adviser before relying on it — these provisions change."
            />
            <div className="scroll-x">
              <table className="table-doc min-w-[34rem]">
                <thead>
                  <tr>
                    <th scope="col">Section</th>
                    <th scope="col">Applies to</th>
                    <th scope="col" className="text-right">Limit</th>
                    <th scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {p.taxBenefits.map((t) => (
                    <tr key={t.section}>
                      <th scope="row" className="fig border-b border-ink/10 py-3.5 pr-4 text-left align-top text-[0.9375rem] font-semibold normal-case tracking-normal text-ink">
                        {t.section}
                      </th>
                      <td className="text-ink-soft">{t.on}</td>
                      <td className="fig text-right font-medium text-ink">
                        {t.limit ? inr(t.limit) : 'Varies'}
                      </td>
                      <td className="text-2xs text-ink-faint">{t.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>
      ) : null}

      {/* ── Documents ───────────────────────────────────────────────────── */}
      <Section tone="deep" size="md">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead title="What to bring" className="mb-6" />
            <p className="max-w-prose text-base leading-relaxed text-ink-soft">
              Incomplete documents delay more files than any other single cause. Getting this set
              together before the first conversation is the highest-value thirty minutes in the whole
              process.
            </p>
          </div>

          <ul className="border-t border-ink/15 lg:col-span-8">
            {p.documents.map((d) => (
              <li key={d.label} className="grid gap-x-8 gap-y-1 border-b border-ink/15 py-4 sm:grid-cols-12">
                <span className="text-base font-semibold text-ink sm:col-span-4">{d.label}</span>
                <span className="text-sm leading-relaxed text-ink-soft sm:col-span-8">{d.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Calculator ──────────────────────────────────────────────────── */}
      {!isInsurance ? (
        <Section size="md">
          <div className="container-page">
            <SectionHead
              title="Work out the EMI"
              standfirst="Total interest is shown at the same size as the monthly figure, on purpose. Choosing a tenure on the EMI alone is how people end up paying for the same thing twice."
            />
            <EmiCalculator compact initial={calcPreset(p)} />
            <a href="/emi-calculator/" className="btn-ghost mt-6">
              Full calculator, with the amortisation schedule
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Section>
      ) : null}

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <Section id="faq" tone="deep" size="md">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead title={`${p.name} questions`} className="mb-6" />
            <a href="/faq/" className="btn-ghost">
              General questions
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={p.faqs} />
          </div>
        </div>
      </Section>

      {/* ── Localities ──────────────────────────────────────────────────── */}
      {hasAreaPages ? (
        <Section size="sm">
          <div className="container-page">
            <h2 className="mb-2 h-card text-ink">
              {p.name} by area
            </h2>
            <p className="mb-6 max-w-prose text-sm leading-relaxed text-ink-soft">
              What borrowers in each locality actually run into on this product — Bhosari’s MIDC
              leaseholds are a different problem from Hinjewadi’s approved-project lists.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
              {AREAS.map((a) => (
                <li key={a.slug}>
                  <a
                    href={`/${p.slug}-${a.slug}/`}
                    className="text-sm text-ink-soft transition-colors hover:text-accent-deep"
                  >
                    {p.name} in {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <ContactStrip />
    </>
  )
}

function Line({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-paper/12 pb-3 last:border-b-0 last:pb-0">
      <dt className="shrink-0 text-2xs uppercase tracking-[0.12em] text-paper/45">{label}</dt>
      <dd className="fig text-right text-sm font-medium text-paper">{value}</dd>
    </div>
  )
}

/**
 * A sensible starting position for the calculator on each product page.
 *
 * Illustrative only, and the page says so. An empty calculator asking a
 * first-time borrower to guess a home-loan rate is a worse experience than a
 * plausible starting point they can immediately change.
 */
function calcPreset(p) {
  const presets = {
    'personal-loan': { amount: 500000, rate: 14, months: 48 },
    'business-loan': { amount: 2500000, rate: 12.5, months: 60 },
    'home-loan': { amount: 5000000, rate: 8.6, months: 240 },
    'loan-against-property': { amount: 3000000, rate: 10.5, months: 180 },
    'car-loan': { amount: 900000, rate: 9.5, months: 60 },
    'gold-loan': { amount: 300000, rate: 12, months: 12 },
    'working-capital-loan': { amount: 5000000, rate: 11, months: 36 },
  }
  return presets[p.slug] ?? { amount: 1000000, rate: 12, months: 60 }
}
