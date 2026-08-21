import { PRODUCTS } from '../data/products.js'
import { CONTACT } from '../data/site.js'
import { telHref } from '../lib/format.js'
import { Section } from '../components/PageHeader.jsx'
import { Phone, ArrowRight } from '../components/Icon.jsx'

/**
 * The 404 page.
 *
 * Rendered by the React app for a client-side miss, and separately baked into
 * `dist/404.html` at build time so the host can serve it for a hard 404 without
 * running any JavaScript.
 *
 * It carries the full product list rather than a "go home" button. Most arrivals
 * here are following a stale link from the previous site — every URL we know
 * about is 301-redirected (see LEGACY_REDIRECTS in src/routes.js), but the ones
 * we do not know about land here, and the useful thing is to put what they were
 * looking for one click away.
 */
export default function NotFound() {
  return (
    <Section size="lg">
      <div className="container-page">
        <p className="fig mb-6 text-2xs tracking-[0.16em] text-accent">404</p>
        <h1 className="max-w-2xl text-4xl text-ink sm:text-5xl">
          That page is not here any more.
        </h1>
        <p className="prose-body mt-6">
          The site was rebuilt, and a few addresses changed. Almost every old link redirects
          automatically. This one did not, which is our fault rather than yours. What were you
          looking for?
        </p>

        <ul className="mt-10 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <li key={p.slug}>
              <a
                href={`/${p.slug}/`}
                className="group flex h-full items-baseline justify-between gap-3 bg-paper p-5 transition-colors hover:bg-paper-deep"
              >
                <span className="text-base font-semibold text-ink">{p.name}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="/" className="btn-primary">
            Start at the beginning
          </a>
          <a href="/loans/" className="btn-ghost">
            Compare every product
          </a>
          <a href={telHref(CONTACT.landline)} className="btn-ghost">
            <Phone className="h-4 w-4" />
            <span className="fig">{CONTACT.landlineDisplay}</span>
          </a>
        </div>
      </div>
    </Section>
  )
}
