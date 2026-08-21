import { IMAGES } from '../data/images.gen.js'
import PageHeader, { Section } from '../components/PageHeader.jsx'
import Photo from '../components/Photo.jsx'

/**
 * Photography credits.
 *
 * The Unsplash License does not require attribution. This page exists anyway,
 * for two reasons that have nothing to do with the licence.
 *
 * A financial firm quietly using photography it has not paid for and does not
 * credit reads badly the moment anyone checks, and in this category people do
 * check. And publishing the list makes the honest point that these are not
 * photographs of PayYou — which is a thing a visitor is entitled to know, and
 * which gives the client an obvious reason to commission real ones.
 *
 * Generated from the image manifest, so it can never list a photograph the site
 * no longer uses or miss one it does. `npm run audit:images` fails the build on
 * an orphan in either direction.
 */
export default function Credits({ trail }) {
  const entries = Object.entries(IMAGES)

  return (
    <>
      <PageHeader
        eyebrow={`${entries.length} photographs`}
        title="Photography credits"
        standfirst="Every photograph on this site is licensed under the Unsplash License — free for commercial use, no permission required. Attribution is not required by that licence; we publish it anyway."
        trail={trail}
        photo="office-window"
      />

      <Section size="md">
        <div className="container-narrow">
          <div className="disclosure mb-12">
            <strong className="font-bold text-ink">
              These are not photographs of PayYou Advisory.
            </strong>{' '}
            They are licensed stock images chosen to illustrate the products and the places we
            work in. Photographs of our own office at Chapekar Chowk, our team and our actual
            clients will replace them as they become available, and they will be better, because
            they will be true.
          </div>

          <ul className="grid gap-8 sm:grid-cols-2">
            {entries.map(([name, image]) => (
              <li key={name}>
                <Photo
                  name={name}
                  ratio="3 / 2"
                  sizes="(min-width: 640px) 26rem, 92vw"
                  className="rounded-md"
                />
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{image.alt}</p>
                <p className="fig mt-1.5 text-2xs text-ink-faint">
                  Unsplash ·{' '}
                  <a
                    href={image.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {image.source.replace('https://images.unsplash.com/', '')}
                  </a>
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-12 border-t border-ink/10 pt-6 text-2xs leading-relaxed text-ink-faint">
            Photographs are downloaded at build time, resized into a 480 / 960 / 1600 WebP set and
            served from this site’s own origin, nothing is hot-linked, so no third party is told
            which pages you read here.
          </p>
        </div>
      </Section>
    </>
  )
}
