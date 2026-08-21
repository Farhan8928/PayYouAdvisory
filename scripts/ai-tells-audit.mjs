/**
 * Scans the built site for the specific things that make a page read as
 * machine-written.
 *
 * ── Why this is a build gate ───────────────────────────────────────────────
 * The client's first verdict on this site was "entire website is looking fully
 * AI". That is not a vague complaint — the tells are concrete, they are
 * documented, and they are countable. Rather than rely on taste, this measures
 * them.
 *
 * The checklist is drawn from published breakdowns of AI-generated web design
 * (925 Studios' "AI Slop Web Design" guide, Sikora's "Top 10 Signs a Website
 * Was Built by AI", Shuffle's "Why Do Most AI-Generated Websites Look the
 * Same"). Where a tell is already covered by another audit it is not repeated
 * here: banned typefaces and off-palette colours belong to `audit:brand`, and
 * near-duplicate pages to `audit:dupes`.
 *
 * ── What is deliberately NOT flagged ───────────────────────────────────────
 * Several widely-cited "tells" are just correct practice, and chasing them
 * makes a page worse:
 *
 *   · Curly apostrophes and quotes. Typographically correct; the straight
 *     keyboard versions are the error. Publishers have set them for centuries.
 *   · Numbered steps in a genuine sequence. A four-step process is ordered;
 *     numbering it is information. What is a tell is decorative numbering on
 *     things that are not sequences, which is what `sequenceLabels` counts.
 *   · Sans-serif body type, generous line height, a card. These are not tells,
 *     they are typography.
 *
 * A checklist applied without judgement produces a page that is merely
 * differently generic.
 *
 * ── What "em dash" means here ──────────────────────────────────────────────
 * Only the **spaced** em dash — ` — ` — is counted, because that is the habit:
 * the dash used as an all-purpose connector where a comma, colon or full stop
 * belongs. An unspaced em dash standing alone in a table cell is the correct
 * typographic symbol for "no value", and a range like 21–65 is an en dash doing
 * its job. Counting those would push the number up without a single word of the
 * prose improving, which is how a metric starts driving the wrong edits.
 */
import { readdir, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SRC = join(ROOT, 'src')

const errors = []
const warnings = []

/**
 * Thresholds.
 *
 * `emDashPer1000` is the one worth explaining. Edited human prose runs about
 * one to two em dashes per thousand words; large language models produce them
 * at many times that rate, which is why the em dash has become the single most
 * cited giveaway. This site measured **15.0 per 1000** on its homepage before
 * this audit existed. 3.0 is a ceiling that permits the dash where it genuinely
 * beats a comma or a colon, and forbids it as a default rhythm.
 */
const LIMITS = {
  emDashPer1000: 3.0,
  sequenceLabels: 6, // decorative 01/02/03 markers per page
  revealShare: 0.5, // share of a page's sections carrying a scroll reveal
  leftAccentCards: 2, // the "thin coloured stripe down the card edge" pattern
}

/** Copy that appears in the training data of every model ever shipped. */
const CLICHES = [
  'seamless', 'seamlessly', 'cutting-edge', 'best-in-class', 'all-in-one',
  'next-gen', 'game-chang', 'revolutionar', 'revolutionis', 'revolutioniz',
  'elevate your', 'unlock the', 'unlock your', 'empower', 'world-class',
  'state-of-the-art', 'one-stop', 'holistic', 'synergy', 'take it to the next level',
  'in today’s fast-paced', 'in the ever-evolving', 'delve into', 'tapestry',
  'a testament to', 'navigate the complex', 'we don’t just', 'more than just a',
  'peace of mind', 'at your fingertips', 'tailored to your', 'bespoke solution',
  'transformative', 'paradigm', 'leverage our', 'robust solution',
]

/** Names that turn up in generated testimonials. */
const STOCK_NAMES = [
  'John Smith', 'Jane Doe', 'John Doe', 'Sarah Johnson', 'Michael Chen',
  'Emily Carter', 'David Miller', 'Jessica Brown', 'Alex Morgan', 'Priya Sharma',
]

async function filesIn(dir, ext, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await filesIn(full, ext, acc)
    else if (entry.name.endsWith(ext)) acc.push(full)
  }
  return acc
}

/**
 * Strip a page down to the words a reader actually sees.
 *
 * Tags become a newline rather than a space, which matters more than it looks.
 * The loans-page comparison table has cells containing a lone `—` for "no
 * published figure". Flattened with spaces, `<td>—</td><td>—</td>` becomes
 * ` — — ` and reads as two prose em dashes; the audit duly reported seven
 * "findings" on that page, none of which were a word of copy. Splitting on
 * tags keeps each cell on its own line, so a standalone dash cannot be mistaken
 * for a dash between clauses.
 */
const visibleText = (html) =>
  html
    .replace(/<!--[\s\S]*?-->/g, '\n')
    .replace(/<script[\s\S]*?<\/script>/g, '\n')
    .replace(/<style[\s\S]*?<\/style>/g, '\n')
    .replace(/<svg[\s\S]*?<\/svg>/g, '\n')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    // Collapse runs of horizontal whitespace but keep the newlines, which are
    // what separate one text node from the next.
    .replace(/[^\S\n]+/g, ' ')
    .trim()

async function main() {
  const pages = await filesIn(DIST, '.html')
  const worst = { path: null, rate: 0 }
  let totalDashes = 0
  let totalWords = 0

  for (const file of pages) {
    const name = file.slice(DIST.length + 1).replace(/\\/g, '/')
    const raw = await readFile(file, 'utf8')
    const text = visibleText(raw)
    const words = text.split(/\s+/).filter(Boolean).length
    if (words < 100) continue

    // ── Em dashes ──────────────────────────────────────────────────────────
    // A literal space either side — not `\s`, which would also match the
    // newlines `visibleText` inserts between text nodes and so would count
    // every standalone table-cell dash as prose. See the note at the top.
    const dashes = (text.match(/ — /g) ?? []).length
    const rate = (dashes / words) * 1000
    totalDashes += dashes
    totalWords += words
    if (rate > worst.rate) {
      worst.rate = rate
      worst.path = name
      worst.dashes = dashes
      worst.words = words
    }
    if (rate > LIMITS.emDashPer1000)
      errors.push(
        `${name}: ${dashes} em dashes in ${words} words = ${rate.toFixed(1)} per 1000 (limit ${LIMITS.emDashPer1000})`,
      )

    // ── Emoji standing in for icons ────────────────────────────────────────
    const emoji = raw.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu) ?? []
    if (emoji.length) errors.push(`${name}: ${emoji.length} emoji in markup — use a drawn icon`)

    // ── Cliché copy ────────────────────────────────────────────────────────
    const lower = text.toLowerCase()
    for (const phrase of CLICHES) {
      if (lower.includes(phrase.toLowerCase()))
        errors.push(`${name}: contains "${phrase}"`)
    }

    // ── Invented testimonial names ─────────────────────────────────────────
    for (const person of STOCK_NAMES) {
      if (text.includes(person)) errors.push(`${name}: stock testimonial name "${person}"`)
    }

    // ── Decorative sequence numbering ──────────────────────────────────────
    // Counts standalone 01–09 markers, which is the "01 / 02 / 03 on every
    // list" pattern. Real figures (rates, amounts, pincodes) are set in the
    // mono face inside .fig and do not match this shape.
    const labels = (raw.match(/>\s*0[1-9]\s*(?:—|<)/g) ?? []).length
    if (labels > LIMITS.sequenceLabels)
      errors.push(`${name}: ${labels} decorative 01/02/03 markers (limit ${LIMITS.sequenceLabels})`)

    // ── Uniform scroll reveal ──────────────────────────────────────────────
    const sections = (raw.match(/<section/g) ?? []).length
    const reveals = (raw.match(/data-reveal|data-stagger/g) ?? []).length
    if (sections >= 4) {
      const share = reveals / sections
      if (share > LIMITS.revealShare)
        errors.push(
          `${name}: ${reveals} scroll reveals across ${sections} sections = ${(share * 100).toFixed(0)}% (limit ${LIMITS.revealShare * 100}%) — reveal everything and it reads as a template`,
        )
    }
  }

  // ── Left-stripe cards, counted in source rather than output ─────────────
  const jsx = await filesIn(SRC, '.jsx')
  let stripes = 0
  for (const file of jsx) {
    const source = await readFile(file, 'utf8')
    stripes += (source.match(/border-l-(?:\d|\[)[^"'`]*border-accent/g) ?? []).length
  }
  if (stripes > LIMITS.leftAccentCards)
    warnings.push(
      `${stripes} cards use a left accent stripe (limit ${LIMITS.leftAccentCards}) — the pattern reads as a default when it is everywhere`,
    )

  // ── Report ───────────────────────────────────────────────────────────────
  const overall = totalWords ? (totalDashes / totalWords) * 1000 : 0
  console.log(`\nAI-tells audit — ${pages.length} pages`)
  console.log(`  em dashes        ${overall.toFixed(1)} per 1000 words site-wide (limit ${LIMITS.emDashPer1000})`)
  if (worst.path)
    console.log(`  worst page       ${worst.rate.toFixed(1)} — ${worst.path} (${worst.dashes} in ${worst.words})`)
  console.log(`  left-stripe cards ${stripes}`)

  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} warning(s):`)
    ;[...new Set(warnings)].slice(0, 10).forEach((w) => console.log(`   ${w}`))
  }

  if (errors.length) {
    console.error(`\n✗ ${errors.length} finding(s):`)
    ;[...new Set(errors)].slice(0, 20).forEach((e) => console.error(`   ${e}`))
    console.error('')
    process.exit(1)
  }

  console.log('\n✓ AI-tells audit passed\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
