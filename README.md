# PayYou Advisory — website

A statically rendered React site for PayYou Advisory Private Limited, a loan
advisory firm (Direct Selling Agent) in Pimpri-Chinchwad, Pune.

**137 pages**, every one rendered to complete HTML at build time, gated by five
audits that fail the build rather than warn.

---

## Quick start

```bash
npm install
npm run images          # download + process the photography (after editing src/data/photos.js)
npm run logos           # PayYou's logo + the 12 partner logos, from the live site
npm run brand           # favicon, PWA icons and the OG card (after a palette change)
npm run dev             # http://localhost:5175
npm run build           # full pipeline: build → audits → prerender → audits
npm run audit:viewport  # measure the built site in real Chrome, at 8 viewport sizes
npm run preview         # serve dist/ exactly as it will be served in production
```

`npm run build` is the only command that matters before shipping. It runs:

| Step | What it does | Fails the build when |
|---|---|---|
| `vite build` | Client bundle + stylesheet | Compile error |
| `audit:css` | Every dynamic Tailwind class actually compiled | A class generates no CSS (e.g. `text-ink/57`, `text-accent/50`) |
| `build:ssr` | SSR bundle for the prerenderer | Compile error |
| `prerender` | 137 pages + `404.html` + `sitemap.xml` + `llms.txt` | A page renders almost nothing, or the head markers are missing |
| `audit:brand` | Palette, icons, manifest and type stack agree | A non-palette colour, a banned typeface, a stale icon |
| `audit:images` | Photography resolves, is responsive and is complete | A missing file, a bare `<img>`, no `srcset`, no width/height |
| `audit:dupes` | How alike the 112 locality pages actually are | A locality page is under 40% distinct from its sibling |
| `audit:seo` | Titles, canonicals, schema, links, redirects, NAP | Duplicate titles, wrong canonical, broken internal link, missing disclosure |

Plus one that needs a browser and therefore runs separately:

| Step | What it does | Fails when |
|---|---|---|
| `audit:viewport` | Loads 5 page kinds x 8 viewports in real Chrome | A CTA falls below the fold, anything overflows horizontally, or a tap target is under its WCAG minimum |

Current state: **44% mean distinctness** across the locality grid, 22
photographs, 734 `<img>` tags, and the viewport audit passing on all 40
page/viewport combinations. Zero warnings anywhere.

`npm run images` is deliberately **not** part of the build: a deploy must work
offline and on a CI box with no network egress, and must never silently depend
on someone else's CDN being up. The processed WebP files are committed.

---

## Stack

- **Vite 5** + **React 18** + **Tailwind 3** — no router, no state library, no UI kit
- **Prerendered multi-page**, not an SPA — see below
- **Vercel** for hosting, with security headers and legacy 301s in `vercel.json`
- **sharp** to generate brand assets at build time
- Two dependencies in production: `react` and `react-dom`. That is the whole list.

### Why prerendered pages rather than a client-side router

Every internal link is a plain `<a href>` causing a real navigation. This looks
like a step backwards and is not, for this site:

- All 137 pages are complete HTML on a CDN edge. A navigation is one cached
  ~65 kB document, which lands faster than a client route change that would have
  to fetch anyway.
- The site works with JavaScript disabled or still loading — which matters for a
  page a borrower reads on a weak connection.
- WhatsApp's link-preview fetcher, Bing and the AI crawlers do not reliably run
  JavaScript. For a business whose links get forwarded around WhatsApp groups,
  that alone settles it.
- There is no router state that can desynchronise from the URL.

`src/main.jsx` prefetches a page on pointer-enter (skipped on save-data or 2G),
so navigation feels instant without any of the above being given up.

---

## Layout

```
src/
  data/           the entire site's content, as plain JS
    brand.js        palette — imported by Tailwind AND the asset generator
    logos.gen.js    GENERATED — PayYou's logo + 12 partner logos, from npm run logos
    photos.js       the photography manifest (source URL, alt, focal point)
    images.gen.js   GENERATED — dimensions + blur placeholders, from npm run images
    site.js         NAP, offices, stats, navigation
    products.js     8 products: specs, eligibility, documents, FAQs, SEO metadata
    areas.js        16 localities: borrower profile + per-product local relevance
    lenders.js      the 17 named bank/NBFC partners
    faqs.js         20 site-level questions
    legal.js        5 policy pages
  lib/
    finance.js      EMI, amortisation, eligibility, balance transfer, flat→reducing
    format.js       Indian number formatting (₹15,00,000 — lakh and crore)
    schema.js       JSON-LD builders, generated from the same objects that render
  components/     Nav, Footer, CtaBar, Accordion, SpecStrip, Disclosure, …
  widgets/        the three calculators + shared Field and SVG charts
  sections/       homepage sections
  pages/          one component per page kind
  routes.js       THE ROUTE TABLE — 137 routes with head, breadcrumbs, JSON-LD
  App.jsx         shell; takes `path` as a prop so it renders on server and client
  entry-server.jsx build-time render entry
scripts/
  fetch-images.mjs · fetch-logos.mjs · make-brand-assets.mjs
  prerender.mjs
  css-audit.mjs · brand-audit.mjs · image-audit.mjs
  duplication-audit.mjs · seo-audit.mjs · viewport-audit.mjs
```

**`src/routes.js` is the single source of truth for what pages exist.** The
client, the prerenderer, the sitemap, the footer's links and the SEO audit all
read from it. Adding a route adds it everywhere, with its `<head>`, breadcrumbs
and structured data attached.

---

## Where the pages come from

| Count | Pages |
|---:|---|
| 1 | Homepage |
| 8 | Product pages, generated from `products.js` |
| 112 | Product × locality pages — 7 loan products × 16 areas |
| 1 | Loans hub (the comparison table) |
| 4 | Calculators (hub + three individual tools) |
| 5 | Policy pages |
| 5 | Lenders, About, Careers, Contact, FAQ |
| 1 | Photo credits |

The 112 locality pages are the SEO engine. **They are not doorway pages, and
keeping them that way takes deliberate work.** Every area in `areas.js` carries
its own borrower `profile`, three `localNotes`, a `lenderFit` line and a
`relevance` entry per product — because Bhosari's MIDC leasehold sheds and
Hinjewadi's approved-project lists are genuinely different problems.

That claim used to be an assertion in a source comment, and when it was first
measured it was **wrong**: only ~14% of each page differed from its sibling. It
is now measured on every build by `audit:dupes`, using word-shingle comparison,
and the build fails below 40%. If you add an area, write those four fields
properly — an area with filler copy is worse than no page, because thin pages
drag the whole grid's quality signal down with them. The long comments at the
top of `src/data/areas.js` and `scripts/duplication-audit.mjs` have the argument
in full.

---

## Things that will bite you

**Do not hard-code a colour.** `src/data/brand.js` is imported by
`tailwind.config.js` and by the asset generator. `npm run audit:brand` fails on
any hex outside the palette, on any built page. This exists because the failure
it prevents is silent: the site changes colour, the browser tab and every
WhatsApp link preview keep the old one, and nobody notices for months.

**Do not draw a logo.** `<Wordmark>` renders PayYou's real file from
`public/brand/`, fetched by `npm run logos`. Two earlier versions of this site
shipped an invented mark; that is the specific mistake this version exists to
correct.

**Use `.text-accent` for emphasis text.** The brand red fails WCAG contrast on
white (4.0:1) and is worse on the dark blue. `.text-accent` resolves a custom
property that dark containers redeclare — deep red on light, a light brand blue
on dark — so it is correct on both grounds automatically. It is a component
class, so `text-accent/50` compiles to nothing; use the theme colour
(`bg-accent`, `border-accent/30`) where you need an opacity modifier.

**Use `.h-display`, `.h-section`, `.h-card`** rather than assembling type sizes
by hand. Their breakpoints were set from measured line counts, not from taste —
see `npm run audit:viewport`.

**Never write a bare `<img>`.** Use `<Photo>` or `<PhotoBackdrop>` so the
intrinsic dimensions, the blur placeholder, the `srcset` and the focal point all
come from the manifest. `audit:images` fails the build on a bare one.

**Never size a layout by arithmetic. Measure it.** The hero was budgeted twice
on paper — "headline 2 lines ≈ 120px, standfirst 2 lines ≈ 56px" — and was wrong
both times, because the browser wrapped the headline to three lines and the
standfirst to four, and the call to action ended up below the fold on an
ordinary laptop. `npm run audit:viewport` is the answer to that: run it after
any layout change. The type scale in `.h-display` has its measured line counts
written next to it for the same reason.

**Check a Tailwind opacity is on the scale.** Tailwind's default steps are
multiples of five, so `border-ink/12` compiles to *nothing* — no error, no
warning, the rule simply does not exist. `12` has been added to the scale
deliberately (see `tailwind.config.js`); anything else off-scale will fail
`audit:css`.

**Never invent a number.** Rates, amounts and tenures in `products.js` are
traceable to something the client published. Five of the eight products have
`rateFrom: null` on purpose — the page renders what the rate *depends on*
instead. Lending is a YMYL category; a figure a borrower can disprove by phoning
a bank costs more than a missing one.

**Never imply PayYou is a lender.** It is a DSA. The disclosure renders on every
page, and `audit:seo` fails the build if it goes missing — that is a compliance
check, not a design one.

**No `aggregateRating`, no `JobPosting`.** Both are structured-data violations
without a real review corpus / a real dated vacancy. The audit warns on the
first and fails on the second. Flip `RATING.show` in `src/data/site.js` when the
Google Business Profile has genuine reviews.

**Read `DESIGN.md` before adding a section.** It is not a style guide, it is a
list of the specific ways this design would drift back into the statistical
average of every loan website in India.

---

## Deploying

Point Vercel at the repository. `vercel.json` already carries:

- the `www` → apex 301
- **12 legacy 301s** from the previous site's URLs (`audit:seo` fails if one is
  missing, because every one of them is in Google's index today and a 404 throws
  that authority away)
- HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- immutable caching on hashed assets, short caching on `sitemap.xml` / `robots.txt`

The CSP allows Google Fonts and the contact page's Maps iframe, and nothing else.
`form-action 'none'` — there are no forms on the site.

---

## Known trade-offs

- **The JS bundle is ~121 kB gzipped**, essentially all React. Every page is
  prerendered and the script is deferred, so it does not affect first paint or
  LCP — but hydration is real work on a low-end phone. If this matters later,
  the calculators are the only genuinely interactive part and could be split out
  behind a dynamic import.
- **The photography is licensed stock, not PayYou.** Correct, licensed and
  well-chosen, but not true. `/photo-credits/` says so plainly. Real photographs
  of the Chinchwad office, the team and actual disbursals will beat every one of
  them; swapping is a two-line change in `src/data/photos.js`.
- **Scroll reveals only run in Chromium-family browsers.** They use
  `animation-timeline: view()`, which Safari and Firefox do not fully support
  yet. Those browsers get a static page that is missing nothing — which is the
  entire reason it was built this way rather than with JavaScript. See
  `DESIGN.md § Motion`.
- **No contact form.** A form on a static site needs a backend nobody maintains
  or an endpoint nobody monitors, and it fails silently. Three channels that
  cannot fail quietly — phone, WhatsApp, email — are used instead.

See `CLIENT-ACTIONS.md` for what is still needed from the client before launch,
including one factual contradiction on the current site that has to be resolved.
