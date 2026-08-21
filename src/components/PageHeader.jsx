import Breadcrumbs from './Breadcrumbs.jsx'
import { PhotoBackdrop } from './Photo.jsx'
import { CONTACT, waLink, WA_DEFAULT } from '../data/site.js'
import { telHref } from '../lib/format.js'
import { Phone, Whatsapp } from './Icon.jsx'

/**
 * The masthead on every page except the homepage.
 *
 * `photo` puts a full-bleed photograph behind it under a fixed navy scrim;
 * without one it falls back to the navy gradient band. Both are dark, so the
 * type treatment is identical either way and a page can gain or lose its
 * photograph without anything else being touched.
 *
 * The scrim is a fixed gradient rather than a tint derived from the image, so
 * contrast is guaranteed whichever photograph is used. "Darken the picture a
 * bit" fails the moment someone chooses a brighter one.
 *
 * Exactly one `<h1>` per page comes from here. `npm run audit:seo` fails the
 * build if any page has zero or more than one.
 */
export default function PageHeader({
  eyebrow,
  title,
  standfirst,
  trail,
  aside,
  photo,
  cta = true,
  children,
}) {  const content = (
    <div className="container-page py-9 sm:py-16 lg:py-24">
      <Breadcrumbs trail={trail} invert />

      <div className={aside ? 'grid gap-12 lg:grid-cols-12 lg:gap-16' : ''}>
        <div className={aside ? 'lg:col-span-7' : ''}>
          {eyebrow ? <p className="eyebrow text-accent">{eyebrow}</p> : null}

          <h1 className="h-section max-w-4xl text-paper">{title}</h1>

          {standfirst ? (
            // text-base on a phone, text-lg from sm up. A locality page's
            // standfirst is its unique local paragraph and must not be
            // truncated — but at 19px on a 360px screen it runs to nine lines
            // and pushed the call to action off the bottom. Two points smaller
            // buys a line back without touching the content.
            <p className="mt-5 max-w-prose text-base leading-relaxed text-paper/72 sm:mt-7 sm:text-lg">
              {standfirst}
            </p>
          ) : null}

          {/* ── An action, above the fold ────────────────────────────────
              Every inner page needs one, and until `npm run audit:viewport`
              measured it, none had one on a small phone: the masthead's aside
              panel — which held the phone number — stacks *below* the
              standfirst at narrow widths, so on a 360x640 screen the first
              call to action on /personal-loan/ sat at 1059px. On /lenders/,
              where the aside is a statistics block rather than a panel, the
              first one was at 7415px.

              The sticky bar catches people who scroll. This catches the ones
              who do not. */}
          {cta ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={telHref(CONTACT.landline)} className="btn-accent">
                <Phone className="h-4 w-4" />
                <span className="fig">{CONTACT.landlineDisplay}</span>
              </a>
              <a
                href={waLink(WA_DEFAULT)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-invert"
              >
                <Whatsapp className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          ) : null}

          {children}
        </div>

        {aside ? (
          <div className="lg:col-span-5" data-reveal>
            {aside}
          </div>
        ) : null}
      </div>
    </div>
  )

  if (photo) {
    return (
      <PhotoBackdrop name={photo} scrim="left" priority>
        {content}
      </PhotoBackdrop>
    )
  }

  return <header className="band-dark">{content}</header>
}

/**
 * A section wrapper, so vertical rhythm is set in one place rather than
 * re-guessed at every call site. `tone` shifts the ground rather than drawing a
 * border.
 */
export function Section({ id, tone = 'paper', size = 'md', children, className = '' }) {
  const tones = {
    paper: 'bg-paper',
    deep: 'bg-paper-deep',
    dark: 'band-dark',
  }
  const sizes = {
    sm: 'py-14 sm:py-18',
    md: 'py-18 sm:py-24',
    lg: 'py-20 sm:py-32',
  }

  return (
    <section id={id} className={`${tones[tone]} ${sizes[size]} ${className}`}>
      {children}
    </section>
  )
}

/**
 * A section heading: an optional index, the shimmering gold rule, the heading
 * and an optional standfirst.
 *
 * No all-caps eyebrow above every single section — that repetition is one of
 * the clearest signs a page was assembled from a kit rather than composed.
 */
export function SectionHead({ index, title, standfirst, invert = false, className = '' }) {
  return (
    <div className={`mb-12 sm:mb-16 ${className}`} data-reveal>
      {index ? <p className="mb-4 font-mono text-2xs tracking-[0.18em] text-accent">{index}</p> : null}
      <span className="rule-mark" />
      <h2 className={`h-section max-w-3xl ${invert ? 'text-paper' : 'text-ink'}`}>{title}</h2>
      {standfirst ? (
        <p
          className={`mt-6 max-w-prose text-lg leading-relaxed ${
            invert ? 'text-paper/72' : 'text-ink-soft'
          }`}
        >
          {standfirst}
        </p>
      ) : null}
    </div>
  )
}
