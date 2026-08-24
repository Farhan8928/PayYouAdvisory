import { useEffect, useRef, useState } from 'react'
import { Close, Search, ArrowRight } from './Icon.jsx'

const SEARCH_ITEMS = [
  { title: 'Personal Loan', category: 'Loans', href: '/personal-loan/', tags: 'unsecured, salaried, interest rate, instant' },
  { title: 'Business Loan', category: 'Loans', href: '/business-loan/', tags: 'msme, gst, turnover, unsecured' },
  { title: 'Home Loan', category: 'Loans', href: '/home-loan/', tags: 'flat, plot, construction, buying' },
  { title: 'Loan Against Property', category: 'Loans', href: '/loan-against-property/', tags: 'mortgage, lap, commercial' },
  { title: 'Gold Loan', category: 'Loans', href: '/gold-loan/', tags: 'jewellery, same day' },
  { title: 'Education Loan', category: 'Loans', href: '/education-loan/', tags: 'study abroad, college' },
  { title: 'EMI Calculator', category: 'Calculators', href: '/emi-calculator/', tags: 'monthly payment, interest calculation' },
  { title: 'Eligibility Calculator', category: 'Calculators', href: '/eligibility-calculator/', tags: 'how much can i borrow, salary' },
  { title: 'Home Loan EMI Calculator', category: 'Calculators', href: '/home-loan-emi-calculator/', tags: 'housing emi' },
  { title: 'Balance Transfer Calculator', category: 'Calculators', href: '/balance-transfer-calculator/', tags: 'switch loan, save interest' },
  { title: 'SIP Calculator', category: 'Calculators', href: '/sip-calculator/', tags: 'mutual fund, monthly investment' },
  { title: 'Fixed Deposit Calculator', category: 'Calculators', href: '/fd-calculator/', tags: 'fd interest, maturity' },
  { title: 'Term Insurance', category: 'Insurance', href: '/term-insurance/', tags: 'life cover, family' },
  { title: 'Health Insurance', category: 'Insurance', href: '/health-insurance/', tags: 'mediclaim, hospital' },
  { title: 'Fixed Deposit', category: 'Investments', href: '/fixed-deposit/', tags: 'high returns, safe deposit' },
  { title: 'Credit Score Guide', category: 'Guides', href: '/credit-score/', tags: 'cibil, improve score' },
  { title: 'Documents Required', category: 'Guides', href: '/documents-required/', tags: 'checklist, papers, kyc' },
  { title: 'Comparing Interest Rates', category: 'Guides', href: '/interest-rate-comparison/', tags: 'best rates, bank offers' },
  { title: 'Partner Banks & NBFCs', category: 'Lenders', href: '/lenders/', tags: 'hdfc, sbi, icici, axis, bajaj' },
  { title: 'Contact & Branch Offices', category: 'Company', href: '/contact/', tags: 'chinchwad, baramati, phaltan, phone, address' },
]

const QUICK_TAGS = [
  'Personal Loan',
  'Home Loan',
  'Business Loan',
  'EMI Calculator',
  'Check Eligibility',
  'Fixed Deposit',
]

/**
 * IDFC-style full-width search drawer / overlay with quick search suggestions.
 */
export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      const onEsc = (e) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', onEsc)
      return () => window.removeEventListener('keydown', onEsc)
    }
  }, [open, onClose])

  if (!open) return null

  const q = query.trim().toLowerCase()
  const results = q
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.tags.toLowerCase().includes(q)
      )
    : []

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-ink-deep/80 backdrop-blur-md transition-all duration-300 animate-reveal-in">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Search Header Panel */}
      <div className="relative z-10 w-full border-b border-white/15 bg-paper px-4 py-6 shadow-lift sm:px-8">
        <div className="container-page flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-4 h-5 w-5 text-ink-faint" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for loans, calculators, interest rates, deposits..."
                className="w-full rounded-full border border-ink/15 bg-paper-deep py-3.5 pl-12 pr-12 text-base font-semibold text-ink outline-none transition-all placeholder:text-ink-faint focus:border-accent focus:bg-paper focus:ring-2 focus:ring-accent/20 sm:text-lg"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 text-xs font-bold uppercase tracking-wider text-ink-faint hover:text-ink"
                >
                  Clear
                </button>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors hover:bg-paper-deep hover:text-accent"
              aria-label="Close search"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="font-bold text-ink-soft">Trending:</span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="rounded-full border border-ink/10 bg-paper px-3 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-accent"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Dropdown Container */}
      <div className="relative z-10 mx-auto w-full max-w-[82rem] flex-1 overflow-y-auto px-5 py-6 sm:px-8">
        <div className="rounded-2xl border border-white/10 bg-paper/95 p-6 shadow-lift backdrop-blur-xl">
          {q ? (
            results.length > 0 ? (
              <div>
                <p className="mb-4 text-2xs font-bold uppercase tracking-wider text-ink-faint">
                  {results.length} result{results.length === 1 ? '' : 's'} found
                </p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((r) => (
                    <a
                      key={r.href}
                      href={r.href}
                      className="group flex items-center justify-between rounded-xl border border-ink/8 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:bg-paper-deep hover:shadow-card"
                    >
                      <div>
                        <span className="text-2xs font-bold uppercase tracking-wider text-accent">
                          {r.category}
                        </span>
                        <h4 className="text-sm font-bold text-ink group-hover:text-accent-deep">
                          {r.title}
                        </h4>
                      </div>
                      <ArrowRight className="h-4 w-4 text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-accent" />
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-base font-semibold text-ink">No results for &ldquo;{query}&rdquo;</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Try searching for &ldquo;Home Loan&rdquo;, &ldquo;Personal Loan&rdquo;, or &ldquo;EMI Calculator&rdquo;
                </p>
              </div>
            )
          ) : (
            <div>
              <p className="mb-4 text-2xs font-bold uppercase tracking-wider text-ink-faint">
                Recommended Services
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {SEARCH_ITEMS.slice(0, 8).map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex flex-col justify-between rounded-xl border border-ink/8 bg-paper p-4 transition-all hover:border-accent/30 hover:bg-paper-deep"
                  >
                    <span className="text-2xs font-bold uppercase tracking-wider text-accent">
                      {item.category}
                    </span>
                    <span className="mt-1 text-sm font-bold text-ink">{item.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
