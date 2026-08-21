import { IMAGES, IMAGE_WIDTHS } from '../data/images.gen.js'

/**
 * A responsive photograph.
 *
 * Everything it needs comes from `src/data/images.gen.js`, written by
 * `npm run images` — the intrinsic dimensions, the alt text, the focal point
 * and a ~400-byte blurred placeholder.
 *
 * ── The three things this gets right that an <img> tag does not ────────────
 *
 * **No layout shift.** `width` and `height` are the real intrinsic dimensions,
 * so the browser reserves the correct box before a single byte of image
 * arrives. Combined with the aspect-ratio container, the page never jumps.
 * `npm run audit:seo` fails the build on an <img> missing either attribute,
 * because this is the single most common cause of a poor CLS score.
 *
 * **No blank rectangle.** The blurred placeholder is a CSS background beneath
 * the real file, so the space reads as an image arriving rather than as a hole
 * in the page. On a slow connection that is most of the perceived difference.
 *
 * **No decapitated subjects.** `focal` drives `object-position`, so a face
 * stays in frame when the same photograph is cropped 21:9 on a desktop hero and
 * 4:5 on a phone. The default of `center` is what puts a subject's chin at the
 * top of the crop.
 *
 * `priority` marks the one image that is the Largest Contentful Paint — the
 * hero. That gets `loading="eager"` and `fetchpriority="high"`; everything else
 * is lazy, because an eagerly-loaded photograph below the fold competes with
 * the one the visitor can actually see.
 */
export default function Photo({
  name,
  alt,
  className = '',
  imgClassName = '',
  sizes = '100vw',
  priority = false,
  ratio,
  zoom = false,
  children,
}) {
  const image = IMAGES[name]

  // A missing image is a build-time mistake, not a runtime one. Rendering
  // nothing is better than rendering a broken-image icon on a client's site —
  // and `audit:images` fails the build if any referenced name is absent, so
  // this branch should be unreachable in production.
  if (!image) return null

  const srcSet = IMAGE_WIDTHS.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ')

  return (
    <div
      className={`photo-frame ${className}`}
      style={{
        ...(ratio ? { aspectRatio: ratio } : null),
        backgroundImage: `url("${image.blur}")`,
        backgroundSize: 'cover',
        backgroundPosition: image.focal,
      }}
    >
      <img
        src={`/images/${name}-960.webp`}
        srcSet={srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt ?? image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchpriority={priority ? 'high' : undefined}
        className={[zoom ? 'photo-zoom' : '', imgClassName].filter(Boolean).join(' ') || undefined}
        style={{ objectPosition: image.focal }}
      />
      {children}
    </div>
  )
}

/**
 * A photograph used as a section background, with a scrim over it.
 *
 * The scrim is not decoration. White type on an unknown photograph is a
 * contrast accident waiting to happen — the image can be swapped for a lighter
 * one and the text silently becomes unreadable. A fixed gradient guarantees the
 * text side stays dark whatever the photograph does.
 */
export function PhotoBackdrop({ name, className = '', scrim = 'left', priority = false, children }) {
  const image = IMAGES[name]
  if (!image) return null

  const srcSet = IMAGE_WIDTHS.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ')
  const scrims = {
    left: 'bg-photo-scrim',
    bottom: 'bg-photo-scrim-b',
    full: 'bg-ink-deep/78',
  }

  return (
    // `on-dark` re-declares --accent-ink for everything inside, so `.text-accent`
    // resolves to the bright gold that reads on navy rather than the deep gold
    // meant for paper. See the note in src/styles/index.css.
    <div className={`on-dark relative isolate overflow-hidden bg-ink-deep ${className}`}>
      <img
        src={`/images/${name}-1600.webp`}
        srcSet={srcSet}
        sizes="100vw"
        width={image.width}
        height={image.height}
        alt=""
        aria-hidden="true"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchpriority={priority ? 'high' : undefined}
        data-parallax
        className="absolute inset-0 -z-20 h-full w-full scale-[1.08] object-cover"
        style={{ objectPosition: image.focal }}
      />
      <div className={`absolute inset-0 -z-10 ${scrims[scrim] ?? scrims.left}`} aria-hidden="true" />
      {children}
    </div>
  )
}
