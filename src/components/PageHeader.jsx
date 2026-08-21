import Breadcrumbs from './Breadcrumbs.jsx'
import { PhotoBackdrop } from './Photo.jsx'

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
  children,
}) {
  /**
   * `-mt-20` on the root, `pt-20` here.
   *
   * The navigation bar is transparent until the reader scrolls, so the masthead
   * has to run underneath it — otherwise the bar draws a hard line across the
   * top of every photograph. Pulling the masthead up by the bar's height and
   * adding the same height back as padding puts the dark band behind the bar
   * while leaving the content exactly where it was.
   *
   * The pull-up lives on the masthead rather than on `<main>` on purpose: a
   * page without a dark masthead — the 404 — must not slide under the bar, and
   * doing it this way means it simply does not.
   */
  const content = (
    <div className="pt-20">
      <div className="container-page py-14 sm:py-20 lg:py-24">
      <Breadcrumbs trail={trail} invert />

      <div className={aside ? 'grid gap-12 lg:grid-cols-12 lg:gap-16' : ''}>
        <div className={aside ? 'lg:col-span-7' : ''}>
          {eyebrow ? <p className="eyebrow text-gold">{eyebrow}</p> : null}

          <h1 className="h-section max-w-4xl text-paper">{title}</h1>

          {standfirst ? (
            <p className="mt-7 max-w-prose text-lg leading-relaxed text-paper/72">{standfirst}</p>
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
    </div>
  )

  if (photo) {
    return (
      <PhotoBackdrop name={photo} scrim="left" priority className="-mt-20">
        {content}
      </PhotoBackdrop>
    )
  }

  return <header className="band-dark -mt-20">{content}</header>
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
      {index ? <p className="mb-4 font-mono text-2xs tracking-[0.18em] text-gold">{index}</p> : null}
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
