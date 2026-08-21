/**
 * Measures how alike the generated locality pages actually are.
 *
 * ── Why this exists ────────────────────────────────────────────────────────
 * The 112 product × locality pages are this site's largest SEO asset and its
 * largest single risk. Google's doorway-page guidance describes the standard
 * implementation precisely: many near-identical pages differing only by a place
 * name. A grid built that way does not just fail to rank — it drags the whole
 * site's quality signal down with it.
 *
 * `src/data/areas.js` carries a long essay arguing that these pages are
 * genuinely different. That essay was written before the pages existed, and
 * when they were first measured it turned out to be wrong: only about one line
 * in seven differed between /business-loan-bhosari/ and /business-loan-baner/.
 * The prose in the source file had no idea.
 *
 * So the claim is now measured rather than asserted. This compares every
 * locality page against a sibling — same product, different area, which is the
 * comparison that matters, because that is the set Google would be deciding
 * between — and fails the build if the unique proportion of the page body falls
 * below a floor.
 *
 * Site chrome is excluded: only the content inside `<main>` is compared, and
 * the closing contact block is dropped, because a shared header and footer are
 * not what makes two pages look like duplicates of each other.
 *
 * ── On the threshold ───────────────────────────────────────────────────────
 * There is no published number at which Google calls a page a doorway, and
 * anyone who claims otherwise is guessing. 40% is chosen as a working floor: it
 * is comfortably above the ~14% the first implementation scored, it is
 * achievable without padding, and it is low enough that legitimately shared
 * content — a product's specification, the disclosure — is not penalised. Treat
 * it as a tripwire for a structural mistake, not as a target to optimise
 * against. A page that games this number by rewording boilerplate is worse than
 * one that fails it honestly.
 */
import { readdir, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AREAS, AREA_PRODUCT_SLUGS } from '../src/data/areas.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

/** Minimum share of a locality page's body that must be unique to it. */
const FLOOR = 0.4

/**
 * Words per shingle.
 *
 * The first version of this audit compared *text nodes* — roughly, paragraphs —
 * and reported 29%. That number was close to meaningless: it counted a
 * three-sentence paragraph of locality-specific writing as one unit and a
 * four-word label as another, so a page could improve its score by breaking one
 * paragraph into three.
 *
 * Overlapping n-grams of words are what near-duplicate detection actually uses,
 * and they measure the thing the name suggests: what proportion of the prose on
 * this page appears nowhere on its sibling. Eight words is long enough that a
 * shared idiom — "compared across 25+ banks and NBFCs" — does not register as
 * duplication, and short enough to catch a reworded sentence pretending to be
 * new writing.
 */
const SHINGLE = 8

/**
 * Reduce a page body to a set of overlapping word n-grams.
 *
 * `<main>` only, with the shared closing contact block removed — a shared
 * header and footer are not what makes two pages look like duplicates of each
 * other, and counting them would penalise every page equally for something that
 * is not the problem.
 */
async function shingles(path) {
  const html = await readFile(join(DIST, path, 'index.html'), 'utf8')
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ''

  // Everything from the closing "Tell us the requirement" band onwards is the
  // shared call to action.
  const body = main.split('Tell us the requirement')[0]

  const words = body
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9₹%.,–—'-]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

  const set = new Set()
  for (let i = 0; i + SHINGLE <= words.length; i += 1) {
    set.add(words.slice(i, i + SHINGLE).join(' '))
  }
  return set
}

async function main() {
  const dirs = new Set(
    (await readdir(DIST, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name),
  )

  const results = []
  const failures = []

  for (const product of AREA_PRODUCT_SLUGS) {
    for (let i = 0; i < AREAS.length; i += 1) {
      const area = AREAS[i]
      // Compare against the next area in the list, wrapping — every page gets
      // checked against a genuine sibling, and every sibling pair gets covered.
      const other = AREAS[(i + 1) % AREAS.length]
      const path = `${product}-${area.slug}`
      const otherPath = `${product}-${other.slug}`
      if (!dirs.has(path) || !dirs.has(otherPath)) continue

      const mine = await shingles(path)
      const theirs = await shingles(otherPath)
      if (mine.size === 0) {
        failures.push(`${path}: page body is empty`)
        continue
      }

      const unique = [...mine].filter((s) => !theirs.has(s)).length
      const ratio = unique / mine.size
      results.push({ path, otherPath, unique, total: mine.size, ratio })

      if (ratio < FLOOR) {
        failures.push(
          `/${path}/ is only ${(ratio * 100).toFixed(0)}% distinct from /${otherPath}/ ` +
            `(${unique} of ${mine.size} phrases) — below the ${FLOOR * 100}% floor`,
        )
      }
    }
  }

  results.sort((a, b) => a.ratio - b.ratio)
  const mean = results.reduce((s, r) => s + r.ratio, 0) / Math.max(1, results.length)

  console.log(`\nDuplication audit — ${results.length} locality pages compared against a sibling`)
  console.log(`  mean distinctness  ${(mean * 100).toFixed(0)}%`)
  if (results.length) {
    console.log(
      `  weakest            ${(results[0].ratio * 100).toFixed(0)}%  /${results[0].path}/`,
    )
    console.log(
      `  strongest          ${(results[results.length - 1].ratio * 100).toFixed(0)}%  /${results[results.length - 1].path}/`,
    )
  }

  if (failures.length) {
    console.error(`\n✗ ${failures.length} page(s) below the distinctness floor:`)
    failures.slice(0, 12).forEach((f) => console.error(`   ${f}`))
    if (failures.length > 12) console.error(`   …and ${failures.length - 12} more`)
    console.error('\n   Fix this by writing, not by rewording. The area needs better')
    console.error('   `profile`, `localNotes`, `lenderFit` and per-product `relevance`')
    console.error('   copy in src/data/areas.js — or it does not deserve seven pages.\n')
    process.exit(1)
  }

  console.log('\n✓ duplication audit passed\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
