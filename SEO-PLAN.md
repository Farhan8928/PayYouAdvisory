# Technical SEO plan — PayYou Advisory

What the site does, why, and what has to happen off the site for it to work.

---

## The category, and what it means

Lending is **YMYL** — Google's classification for pages that could affect a
person's financial stability. Two consequences drive almost every decision here:

1. **Accuracy is a ranking factor, not just an ethic.** Quality raters check
   financial claims. A rate a reader can disprove by phoning a bank is worse
   than no rate. Five of the eight products therefore carry no headline rate at
   all — they explain what the rate *depends on*.
2. **E-E-A-T carries more weight than in any other vertical.** Experience,
   Expertise, Authoritativeness, Trustworthiness. For a company incorporated in
   January 2026 competing against Bajaj and Aditya Birla, the only available
   levers are verifiable ones — which is why the site names the parent group,
   names the chairman, publishes three physical addresses, states plainly that
   it is not a lender, explains how it is paid, and carries a grievance
   escalation path to the RBI Ombudsman.

The single biggest remaining E-E-A-T gap is registration numbers. See
`CLIENT-ACTIONS.md § 2`.

---

## Architecture

### Everything is prerendered

136 pages of complete HTML, generated at build time by `scripts/prerender.mjs`
through `react-dom/server`. No page depends on JavaScript to have content.

This matters more than the usual "Google renders JS anyway" argument allows:

- **Bing** and Yandex render JavaScript unreliably.
- **AI crawlers** — GPTBot, ClaudeBot, PerplexityBot — largely do not, and they
  increasingly answer "loan advisor in Pimpri Chinchwad" directly rather than
  sending a click. `/llms.txt` is written for them specifically and states that
  PayYou is an intermediary, which is the one thing a summary must not get
  wrong.
- **WhatsApp's link-preview fetcher** does not run JavaScript at all. For a
  business whose links are forwarded around WhatsApp groups, an empty preview is
  a lost customer.

### Per-page `<head>`, generated from the route table

`src/routes.js` attaches title, description, keywords, canonical, hreflang, Open
Graph, Twitter and JSON-LD to each of the 136 routes. `prerender.mjs` writes them
into a marked block in `index.html`.

If that substitution ever silently no-ops, all 136 pages ship the homepage's
title and canonical — which looks perfectly fine in a browser and is
catastrophic in an index. So the prerenderer **fails the build** if it cannot
find the markers, and `audit:seo` **fails the build** on any duplicate title or
non-self-referential canonical.

### Structured data, generated from the rendering objects

`src/lib/schema.js` builds JSON-LD from the same data the page renders. Schema
describing content that is not on the page is a spam signal rather than a
ranking one, and hand-maintained JSON-LD diverges within about two edits.

| Type | Where |
|---|---|
| `FinancialService` (organisation) | Homepage, About |
| `FinancialService` (LocalBusiness) | Homepage, Contact |
| `LoanOrCredit` / `FinancialProduct` | Every product and locality page |
| `FAQPage` | `/faq/` and each product page — **once each** |
| `BreadcrumbList` | Every page except the homepage |
| `HowTo` | Homepage (the four-step process) |
| `ItemList` | Loans hub, Lenders |

Deliberately absent: `aggregateRating` (no verified reviews — a violation) and
`JobPosting` (no dated vacancy — the audit fails the build on it).

`FAQPage` appears exactly once per intent. The homepage renders six of the same
questions **without** schema, and the 112 locality pages carry none — Google
shows one FAQ rich result per page, and offering the same questions from 113
URLs is competing with yourself for nothing.

---

## Keyword architecture

Three tiers, mapped to how people actually search for credit.

### Tier 1 — head terms (homepage, product pages)

`personal loan Pune` · `business loan Pune` · `home loan Pimpri Chinchwad` ·
`loan against property Pune` · `loan DSA Pune`

High volume, brutally competitive against aggregators and the lenders
themselves. Realistically these follow from tiers 2 and 3 rather than being won
directly.

### Tier 2 — locality × product (112 pages)

`personal loan Hinjewadi` · `business loan Bhosari` · `loan against property
Chakan` · `gold loan Baramati`

**This is the engine.** Lower volume each, far higher intent, and genuinely
winnable because the national aggregators do not write locality-specific
content and the local competitors do not have 112 pages.

The pincode appears in the copy and in the `areaServed` schema on every one,
because a pincode is how "near me" resolves for a service business without a
shopfront in each area.

### Tier 3 — problem-led long tail (FAQ, product pages, calculators)

`personal loan for cash salary Pune` · `low CIBIL score loan` · `loan against
MIDC property` · `loan against Grampanchayat land` · `is balance transfer worth
it` · `flat vs reducing interest rate`

The most valuable tier and the least contested. Someone searching "loan against
MIDC property" has a specific problem most lenders decline outright and three of
PayYou's NBFC partners handle routinely. That is a customer who cannot be served
by a comparison site, and the page that answers them is the page that earns the
enquiry — and the backlink.

`/emi-calculator/` is the outlier: enormous volume, weakly commercial, and worth
having because it brings in readers who have not yet decided they need a broker.

---

## Why the 112 locality pages are not doorway pages

This is the one thing that could turn the site's biggest asset into a penalty,
so it is worth being explicit.

Google's doorway-page guidance describes the standard implementation exactly:
many near-identical pages differing only by a place name, funnelling to one
destination, adding nothing a reader could use. A grid of location pages built
that way gets demoted, and it takes the rest of the site with it.

The defence is not clever templating, it is genuine difference:

- Every area in `src/data/areas.js` carries its own **borrower profile** — who
  actually borrows there and why.
- Every area carries its own **relevance entry per product**. Bhosari's business
  loan page is about MIDC job-work receivables and ninety-day payment cycles.
  Baner's is about Lease Rental Discounting against commercial rent. Baramati's
  is about a business that earns in four months and spends in twelve. Those are
  different pages because they are different problems.
- Landmarks, pincodes and nearby-area links differ per page.
- Each links to the seven sibling products in that area and the same product in
  nearby areas, so the grid is a navigable structure rather than 112 leaves.

### It is measured, not asserted

All of the above was originally written as a comment in `src/data/areas.js` and
believed. When the pages were first built and actually compared, roughly **one
line in seven** differed between `/business-loan-bhosari/` and
`/business-loan-baner/` — the rest was the product's shared feature grid,
eligibility table, document checklist and calculator, repeated sixteen times and
duplicated from the hub. That is the doorway signature regardless of what the
source comment claims.

`scripts/duplication-audit.mjs` now runs on every build. It reduces each
locality page's body to overlapping eight-word phrases, compares it against a
sibling — same product, different area, which is the set a search engine would
be choosing between — and **fails the build below 40% distinct**.

Getting there meant three structural changes and a lot of writing:

- the generic blocks moved to the hub and are linked, not repeated
- the embedded eligibility calculator — a quarter of the body, identical on all
  112 pages — became a prompt and a link
- every area gained `localNotes` and `lenderFit`, and the thinnest `relevance`
  entries were rewritten

**Current: 44% mean distinctness, weakest page 40%.**

Note what the threshold is *not*. There is no published number at which Google
calls a page a doorway; 40% is a tripwire for structural mistakes, not a target.
A page that games it by rewording boilerplate is worse than one that fails it
honestly. **If you add an area, write the four fields properly** — if you cannot
say three true, specific things about lending there, you do not know the area
well enough to publish seven pages about it.

Insurance deliberately has **no** locality pages — it is not a locality-sensitive
purchase the way a mortgage is, and sixteen near-identical insurance pages would
be precisely the pattern this section exists to avoid.

---

## Migration from the old site

Twelve URLs from the previous site are 301-redirected in `vercel.json`:

| Old | New |
|---|---|
| `/financial-services/` | `/loans/` |
| `/financial-services/personal-loan-pune/` | `/personal-loan/` |
| `/financial-services/business-loan-pune/` | `/business-loan/` |
| `/financial-services/home-loan-pune/` | `/home-loan/` |
| `/financial-services/loan-against-property-pune/` | `/loan-against-property/` |
| `/financial-services/insurance-plans-pune/` | `/insurance/` |
| `/payyou-advisory-company/` | `/about/` |
| `/financial-advisor-jobs-pune/` | `/careers/` |
| `/bank-nbfc-loan-partners/`, `/banks/`, `/nbfc/` | `/lenders/` |
| `/blog/` | `/faq/` |

Every one is in the old sitemap and therefore in Google's index today. A 301
passes the accumulated authority on; a 404 throws it away, and the loss is
invisible until the traffic simply does not arrive. `audit:seo` fails the build
if any of them is missing from `vercel.json`.

Note the consolidation: the old site had **three** URLs competing for the lender
intent (`/bank-nbfc-loan-partners/`, `/banks/`, `/nbfc/`). They now point at one
page, which concentrates rather than splits the signal.

---

## Performance

Core Web Vitals are a ranking factor and, more importantly, a conversion one on
the mid-range Android phones most of this audience uses.

- **LCP is text** — the hero headline, present in the served HTML, needing no
  network round trip. There is no hero image to be the largest paint.
- **CLS is near zero** — no images, no injected banners, no web-font layout
  shift beyond `font-display: swap` on three families with real fallback stacks.
- **~65 kB of HTML per page** (about 12 kB gzipped), served from a CDN edge with
  immutable caching on hashed assets.
- **~109 kB gzipped of JavaScript**, deferred, needed only for hydration and the
  calculators. It does not block first paint. If it becomes a problem, the
  calculators are the only genuinely interactive component and can be split out.
- **One third-party request on the whole site**: the Maps iframe on `/contact/`,
  lazy-loaded. No analytics tag, no chat widget, no tag manager, no font kit
  beyond Google Fonts.
- **Prefetch on hover** in `src/main.jsx`, skipped on save-data and 2G.

---

## Off-site — where the actual wins are

The site is now better than any competitor's in Pimpri-Chinchwad. That is
necessary and nowhere near sufficient. In order of return:

1. **Google Business Profile.** For a local service business this outranks
   everything on this list combined. Complete every field, use the same language
   as the homepage, categories *Loan agency* and *Financial consultant*, post
   weekly, and answer every question. Consider separate listings for the
   Baramati and Phaltan offices — each is a genuine staffed location.
2. **Reviews.** Fifty genuine GBP reviews will do more for enquiries than any
   change to this website. It is also what unlocks the rating in the schema
   (`RATING.show` in `src/data/site.js`).
3. **Consistent NAP** across Justdial, Sulekha, IndiaMART, Google Maps and every
   directory the business is listed on. Character-for-character identical to
   `src/data/site.js`. Google cross-checks these and inconsistency quietly costs
   local ranking.
4. **Local links.** PCMC trade associations, MIDC industry bodies, Baramati and
   Phaltan business groups, the local press. Ten of these are worth more than a
   hundred directory listings.
5. **Content that earns links.** The tier-3 pages already do some of this work.
   The natural extensions: a genuine guide to funding an MIDC leasehold
   property, and one on lending against Grampanchayat land — both are questions
   nobody has answered properly online, both are searched, and both are
   subjects where PayYou has real expertise. Anyone can write about personal
   loans; almost nobody can write those two.

---

## What to watch, and what it means

| Signal | Where | What it is telling you |
|---|---|---|
| Locality pages "Crawled — currently not indexed" | Search Console → Pages | Those pages are reading as thin. Deepen the `relevance` copy for that area. |
| Impressions rising, clicks flat | Search Console → Performance | Titles or descriptions are not earning the click. |
| Product pages losing to locality pages | Performance, by page | Healthy — that is the design working. |
| Any `aggregateRating` warning | `npm run audit:seo` | Someone added a rating. Confirm it is real and matches the GBP exactly. |
| Orphan-page warnings | `npm run audit:seo` | A page nothing links to is a page Google will struggle to find, whatever the sitemap says. |
