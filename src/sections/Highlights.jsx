import { Section } from '../components/PageHeader.jsx'
import { POSTS } from '../data/posts.js'
import { LINE_ART } from '../components/LineArt.jsx'
import { ArrowRight, ChevronRight, ShieldCheck, Clock } from '../components/Icon.jsx'

/**
 * IDFC FIRST Bank inspired Highlights & Articles Rails:
 * 1. "What makes us special?" — vibrant gradient cards with large white headings
 * 2. "Learn how borrowing actually works" — editorial cards with topic headers
 */

const HIGHLIGHTS = [
  {
    title: 'One credit enquiry, not one per bank',
    badge: 'CIBIL PROTECTION',
    body: 'Applying to eight banks yourself triggers eight hard credit enquiries that lower your score. We assess first and submit once to the winning lender.',
    art: 'shield',
    tone: 'card-ink',
    href: '/about/',
  },
  {
    title: 'Zero cost to the borrower',
    badge: '100% TRANSPARENT',
    body: 'There is zero advisory fee or file processing surcharge. We receive our DSA commission directly from the disbursing bank or NBFC.',
    art: 'hand-coins',
    tone: 'card-accent',
    href: '/about/',
  },
  {
    title: '25+ Banks & NBFCs on one panel',
    badge: 'MAXIMUM APPROVALS',
    body: 'Lenders evaluate identical profiles differently. One declines while another approves with preferential terms. Matching is our core expertise.',
    art: 'growth',
    tone: 'card-mid',
    href: '/lenders/',
  },
  {
    title: 'Cash salary & informal income files',
    badge: 'SPECIAL UNDERWRITING',
    body: 'Multiple partner lenders underwrite cash-salaried borrowers based on 6 months of genuine banking conduct. We know which lenders approve.',
    art: 'doc-check',
    tone: 'card-ink',
    href: '/personal-loan-for-salaried/',
  },
  {
    title: 'Honest loan eligibility advice',
    badge: 'ETHICAL ADVISORY',
    body: 'If your credit file needs 60 days of credit repair prior to applying, we will tell you upfront — saving you multiple loan rejections.',
    art: 'award',
    tone: 'card-accent',
    href: '/blog/why-your-loan-application-was-rejected/',
  },
  {
    title: 'Physical walk-in offices in Pune & PCMC',
    badge: 'LOCAL PRESENCE',
    body: 'Convenient branches in Chinchwad, Baramati, and Phaltan. Complex loan documentation clears faster across a table than over email.',
    art: 'building',
    tone: 'card-mid',
    href: '/contact/',
  },
]

export function Highlights() {
  return (
    <Section tone="paper" size="md" className="py-12 sm:py-16">
      <div className="container-page">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rule-mark" />
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-2xs font-extrabold uppercase tracking-wider text-accent">
                The PayYou Advantage
              </span>
            </div>
            <h2 className="h-section text-ink">What Makes Us Special?</h2>
          </div>
          <a href="/about/" className="btn-text text-accent flex items-center gap-1 font-bold">
            How we work
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Full-bleed horizontal scrolling rail */}
      <div className="rail">
        <ul className="flex min-w-max gap-5">
          {HIGHLIGHTS.map((h) => {
            const Art = LINE_ART[h.art]
            return (
              <li key={h.title} className="w-[19rem] shrink-0 sm:w-[22rem]">
                <a href={h.href} className={`rail-card group ${h.tone} shadow-lift`}>
                  <Art className="rail-art transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                  <div className="relative z-10">
                    <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-2xs font-extrabold uppercase tracking-wider text-white">
                      {h.badge}
                    </span>
                    <h3 className="mt-3 block text-xl font-extrabold leading-snug tracking-tight text-white">
                      {h.title}
                    </h3>
                    <p className="mt-3 block text-sm leading-relaxed text-white/85">
                      {h.body}
                    </p>
                  </div>
                  <div className="relative z-10 mt-6 flex items-center gap-1 text-xs font-bold text-white transition-transform duration-200 group-hover:translate-x-1">
                    <span>Learn more</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

export function Articles() {
  return (
    <Section tone="deep" size="md" className="py-14 sm:py-20">
      <div className="container-page">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rule-mark" />
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-2xs font-extrabold uppercase tracking-wider text-accent-light">
                Financial Literacy
              </span>
            </div>
            <h2 className="h-section text-ink">Learn How Borrowing Actually Works</h2>
            <p className="mt-2 max-w-prose text-base leading-relaxed text-ink-soft">
              Unbiased lending guides written to help you make informed borrowing choices.
            </p>
          </div>
          <a href="/blog/" className="btn-text text-accent flex items-center gap-1 font-bold">
            All guides &amp; articles
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="rail">
        <ul className="flex min-w-max gap-5">
          {POSTS.map((p) => (
            <li key={p.slug} className="w-[19rem] shrink-0 sm:w-[22rem]">
              <a href={`/blog/${p.slug}/`} className="article-card group">
                <div className="article-head flex items-center justify-between">
                  <span className="text-2xs font-extrabold uppercase tracking-[0.14em]">
                    {p.topic}
                  </span>
                  <span className="fig flex items-center gap-1 text-2xs text-white/80">
                    <Clock className="h-3 w-3" />
                    {p.readingMinutes} min read
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="block text-lg font-bold leading-snug text-ink group-hover:text-accent-deep transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-3 block text-sm leading-relaxed text-ink-soft line-clamp-3">
                      {p.standfirst}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-ink/10 pt-4">
                    <span className="flex items-center gap-1 text-xs font-bold text-accent group-hover:underline">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-2xs font-semibold text-ink-faint">PayYou Advisory</span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
