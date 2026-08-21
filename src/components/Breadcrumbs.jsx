import { ChevronRight } from './Icon.jsx'

/**
 * Breadcrumbs, rendered on every page except the homepage.
 *
 * The visible trail and the `BreadcrumbList` JSON-LD are both built from the
 * same `breadcrumbs` array on the route (src/routes.js), which is the point:
 * Google will use the schema to replace the URL in a search result with a
 * readable trail, and it is only entitled to do that when the trail is
 * genuinely on the page too. Two hand-maintained copies diverge; one shared
 * array cannot.
 *
 * The last crumb is the current page and is not a link — an anchor pointing at
 * the page you are already on is noise for a screen reader.
 */
export default function Breadcrumbs({ trail, invert = false }) {
  if (!trail || trail.length < 2) return null

  const muted = invert ? 'text-paper/50' : 'text-ink-faint'
  const active = invert ? 'text-paper/80' : 'text-ink-soft'
  // Bright gold reads on the navy; on paper it does not clear WCAG AA, so the
  // light variant hovers to the deep gold instead. See --accent-ink in index.css.
  const hover = invert ? 'hover:text-accent' : 'hover:text-accent-deep'

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-2xs">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 ? <ChevronRight className={`h-3 w-3 ${muted}`} /> : null}
              {last ? (
                <span aria-current="page" className={active}>
                  {crumb.label}
                </span>
              ) : (
                <a
                  href={crumb.href}
                  className={`${muted} ${hover} transition-colors`}
                >
                  {crumb.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
