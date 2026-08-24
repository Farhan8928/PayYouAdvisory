import PageHeader, { Section, SectionHead } from '../components/PageHeader.jsx'
import ContactStrip from '../sections/ContactStrip.jsx'
import { POSTS, POST_BY_SLUG } from '../data/posts.js'
import { ArrowRight } from '../components/Icon.jsx'

/** "18 August 2026" — written out, because 08/07 is ambiguous across readers. */
const longDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  return `${d} ${months[m - 1]} ${y}`
}

/**
 * The blog: the index at /blog/ and one page per post.
 *
 * ── Why the body is structured data rather than HTML ───────────────────────
 * Each post is an array of `{ heading, paragraphs }`. That is more constrained
 * than letting an author write markup, and the constraint is the point: it
 * guarantees a single h1 from the masthead and a clean h2 outline beneath it on
 * every post, which is what `npm run audit:seo` checks and what a screen reader
 * navigates by. It also means a post cannot quietly introduce a colour, a font
 * or a layout of its own.
 */
export default function Blog({ slug, trail }) {
  if (!slug) return <BlogIndex trail={trail} />

  const post = POST_BY_SLUG[slug]
  const others = POSTS.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      <PageHeader
        eyebrow={post.topic}
        title={post.title}
        standfirst={post.standfirst}
        trail={trail}
        photo={post.photo}
      />

      <Section tone="paper" size="md">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <dl className="border-t border-ink/15 pt-5 text-sm">
              <dt className="text-2xs uppercase tracking-[0.12em] text-ink-faint">Published</dt>
              <dd className="mt-1 text-ink">
                <time dateTime={post.published}>{longDate(post.published)}</time>
              </dd>
              <dt className="mt-4 text-2xs uppercase tracking-[0.12em] text-ink-faint">Reading</dt>
              <dd className="mt-1 text-ink">{post.readingMinutes} minutes</dd>
              <dt className="mt-4 text-2xs uppercase tracking-[0.12em] text-ink-faint">Written by</dt>
              <dd className="mt-1 text-ink">The PayYou Advisory desk</dd>
            </dl>
          </div>

          <article className="lg:col-span-9">
            {post.body.map((block) => (
              <section key={block.heading} className="mb-12 last:mb-0">
                <h2 className="h-card max-w-2xl text-ink">{block.heading}</h2>
                {block.paragraphs.map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="mt-4 max-w-prose text-base leading-relaxed text-ink-soft"
                  >
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </Section>

      <Section tone="deep" size="md">
        <div className="container-page">
          <SectionHead title="More from the desk" />
          <PostGrid posts={others} />
        </div>
      </Section>

      <ContactStrip />
    </>
  )
}

function BlogIndex({ trail }) {
  return (
    <>
      <PageHeader
        eyebrow="From the desk"
        title="Notes on borrowing, written for the borrower."
        standfirst="What we would tell you across the desk, including the parts that are not in our immediate interest. No newsletter sign-up, no gated downloads."
        trail={trail}
        photo="office-window"
      />

      <Section tone="paper" size="md">
        <div className="container-page">
          <PostGrid posts={POSTS} />
        </div>
      </Section>

      <ContactStrip />
    </>
  )
}

function PostGrid({ posts }) {
  return (
    <ul className="grid grid-cols-1 gap-px border border-ink/12 bg-ink/12 lg:grid-cols-3">
      {posts.map((p) => (
        <li key={p.slug}>
          <a
            href={`/blog/${p.slug}/`}
            className="group flex h-full flex-col justify-between gap-6 bg-paper p-7 transition-colors hover:bg-paper-deep sm:p-8"
          >
            <span>
              <span className="block text-2xs uppercase tracking-[0.12em] text-accent">
                {p.topic}
              </span>
              <span className="mt-3 block h-card text-ink">{p.title}</span>
              <span className="mt-3 block text-sm leading-relaxed text-ink-soft">
                {p.standfirst}
              </span>
            </span>
            <span className="flex items-center justify-between gap-4 text-sm font-semibold text-accent">
              <span className="flex items-center gap-2">
                Read it
                <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </span>
              <span className="fig text-2xs font-normal text-ink-faint">
                {p.readingMinutes} min
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
