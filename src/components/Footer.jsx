import { COMPANY, CONTACT, OFFICES, NAV, fmtMobile } from '../data/site.js'
import { PRODUCTS } from '../data/products.js'
import { AREAS } from '../data/areas.js'
import { LEGAL_PAGES } from '../data/legal.js'
import { telHref } from '../lib/format.js'
import Wordmark from './Wordmark.jsx'
import { Phone, Mail, Pin } from './Icon.jsx'

/**
 * The footer does three jobs, in this order of importance.
 *
 * 1. **It states what PayYou is not.** The "we are a DSA, not a lender"
 *    disclosure sits here on every page, set at readable size rather than in
 *    the 10px grey that the category treats as adequate. Buried disclosure is
 *    a 2026 category weakness; designing it as an editorial element is both
 *    the compliant thing and the trust signal.
 * 2. **It carries the internal link graph.** Every product page and every one
 *    of the 112 locality pages is reachable from here, which is how a page
 *    seven clicks from the homepage gets crawled at all.
 * 3. **It repeats the NAP** — name, address, phone — identically to the
 *    contact page and the JSON-LD, because Google cross-checks all three.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="band-dark">
      {/* ── Disclosure ──────────────────────────────────────────────────── */}
      <div className="border-b border-paper/10">
        <div className="container-page py-8">
          <div className="border-l-[3px] border-accent pl-5">
            <p className="max-w-prose text-sm leading-relaxed text-paper/70">
              <strong className="font-semibold text-paper">
                {COMPANY.name} is a loan referral and advisory firm, a Direct Selling Agent.
              </strong>{' '}
              We are not a bank or an NBFC. We do not lend, sanction or disburse, and we do not set
              interest rates. Every credit decision is made by the lender under its own policy. Rates
              and eligibility figures shown here are indicative and are not offers. Our fee is paid by
              the lender on a completed disbursal.
            </p>
          </div>
        </div>
      </div>

      {/* ── Link columns ────────────────────────────────────────────────── */}
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <a href="/" className="inline-flex" aria-label={`${COMPANY.shortName} — home`}>
            <Wordmark className="h-9" invert />
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
            One application, compared across {''}
            <span className="fig text-paper/80">25+</span> banks and NBFCs. One credit enquiry, not
            twenty-five.
          </p>
          <p className="mt-4 text-2xs uppercase tracking-[0.14em] text-paper/40">
            A venture of {COMPANY.parent}
          </p>

          <div className="mt-6 space-y-2.5">
            <a
              href={telHref(CONTACT.landline)}
              className="fig flex items-center gap-2.5 text-sm text-paper/80 transition-colors hover:text-accent"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-accent" />
              {CONTACT.landlineDisplay}
            </a>
            <a
              href={telHref(CONTACT.mobile)}
              className="fig flex items-center gap-2.5 text-sm text-paper/80 transition-colors hover:text-accent"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-accent" />
              {fmtMobile(CONTACT.mobile)}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2.5 text-sm text-paper/80 transition-colors hover:text-accent"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-accent" />
              {CONTACT.email}
            </a>
          </div>
        </div>

        <FooterCol title="Borrow" className="lg:col-span-2">
          {PRODUCTS.map((p) => (
            <FooterLink key={p.slug} href={`/${p.slug}/`}>
              {p.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Tools" className="lg:col-span-2">
          <FooterLink href="/emi-calculator/">EMI calculator</FooterLink>
          <FooterLink href="/eligibility-calculator/">Eligibility calculator</FooterLink>
          <FooterLink href="/balance-transfer-calculator/">Balance transfer</FooterLink>
          <FooterLink href="/calculators/">All calculators</FooterLink>
          <FooterLink href="/faq/">Questions answered</FooterLink>
        </FooterCol>

        <FooterCol title="Company" className="lg:col-span-2">
          {NAV.filter((n) => !n.children).map((n) => (
            <FooterLink key={n.href} href={n.href}>
              {n.label}
            </FooterLink>
          ))}
          <FooterLink href="/loans/">All loan products</FooterLink>
        </FooterCol>

        <FooterCol title="Offices" className="lg:col-span-2">
          {OFFICES.map((o) => (
            <li key={o.id} className="mb-4 last:mb-0">
              <p className="mb-1 flex items-center gap-1.5 text-2xs uppercase tracking-[0.12em] text-accent">
                <Pin className="h-3 w-3" />
                {o.kind}
              </p>
              <address className="text-sm not-italic leading-relaxed text-paper/60">
                {o.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </li>
          ))}
          <li className="fig pt-1 text-2xs text-paper/50">{CONTACT.hours}</li>
        </FooterCol>
      </div>

      {/* ── Locality index ──────────────────────────────────────────────────
          Every generated page, linked. This is not decoration: without it the
          112 locality pages sit at crawl depth four and most never get indexed.
          Kept visually quiet because it is for the crawler and for the reader
          who genuinely wants their own area — not for everyone else. */}
      <div className="border-t border-paper/10">
        <div className="container-page py-10">
          <h2 className="mb-4 text-2xs font-semibold uppercase tracking-[0.14em] text-paper/40">
            Areas we serve
          </h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {AREAS.map((a) => (
              <li key={a.slug}>
                <a
                  href={`/personal-loan-${a.slug}/`}
                  className="text-sm text-paper/55 transition-colors hover:text-accent"
                >
                  {a.name}
                  <span className="fig ml-1.5 text-2xs text-paper/30">{a.pincodes[0]}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Base ────────────────────────────────────────────────────────── */}
      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-2xs text-paper/40">
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_PAGES.map((l) => (
              <li key={l.slug}>
                <a
                  href={`/${l.slug}/`}
                  className="text-2xs text-paper/50 transition-colors hover:text-accent"
                >
                  {l.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/photo-credits/"
                className="text-2xs text-paper/50 transition-colors hover:text-accent"
              >
                Photo credits
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children, className = '' }) {
  return (
    <div className={className}>
      <h2 className="mb-4 text-2xs font-semibold uppercase tracking-[0.14em] text-paper/40">
        {title}
      </h2>
      <ul>{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }) {
  return (
    <li>
      <a
        href={href}
        className="block py-1 text-sm text-paper/65 transition-colors hover:text-accent"
      >
        {children}
      </a>
    </li>
  )
}
