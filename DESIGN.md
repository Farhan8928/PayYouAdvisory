# Design direction — PayYou Advisory

Read this before adding a section, a colour, or a font.

---

## History, in one paragraph

The first version of this site was built on an argument: that every Indian loan
website looks identical, so PayYou should look nothing like them. It used pine
green on bone paper, no photography at all, no gradients, and data as the only
decoration. It was coherent, it was defensible, and the client's verdict was
that it looked machine-made and unfinished — *"entire website is looking fully
AI"*. That judgement is the one that counts, and it was right about the thing
that matters: austerity is not the same as restraint, and a page with no images
and no movement does not read as confident, it reads as unbuilt.

**This document describes what replaced it.** The instruction was explicit:
premium banking, real photography, real motion, in the register of the
reference sites the client sent — Aditya Birla Capital, IDFC FIRST, Lokmanya.

What survived the rewrite is everything about *honesty*: no invented numbers, no
fabricated testimonials, no bank logos we have no licence to use, the disclosure
designed rather than buried. Those were never the problem.

---

## The concept: an institution, not a landing page

PayYou is not a lender. It is a **Direct Selling Agent** — you give it one
profile, it runs that profile past 25 banks and NBFCs, and you take **one credit
enquiry instead of twenty-five**. That is the whole product, it is genuinely
valuable, and no competitor says it plainly.

The site's job is to make a young firm look like somewhere you would hand over
your PAN number. That means depth, photography, weight and polish — the visual
vocabulary of an institution — carrying copy that is unusually candid.

**Two tests before shipping a section.** Could this section, unchanged, sit on
the website of a project-management SaaS? Then it is wrong. Does it contain a
number, a photograph or a sentence a competitor could not honestly copy? If not,
ask why it exists.

---

## Palette

Deep navy and gold on warm off-white. This is the premium-banking register, and
it is the one the reference sites work in.

| Token | Hex | Role |
|---|---|---|
| `paper` | `#FBFAF7` | Dominant surface (~55%). Warm off-white — never pure `#fff`, which reads clinical. |
| `paper-deep` | `#F3F0E9` | Second surface, for banding without drawing a border. |
| `paper-dark` | `#E5E0D5` | Third surface: table stripes, input wells. |
| `ink` | `#0B1D36` | Deep institutional navy. Body text, dark bands. |
| `ink-deep` | `#061223` | Darkest stop. Scrims, footer, the theme colour. |
| `ink-mid` | `#12304F` | The lighter stop in every navy gradient. |
| `ink-soft` | `#2A4A70` | Secondary text on paper. |
| `ink-faint` | `#7089A8` | Tertiary text, rules, disabled states. |
| `brass` | `#C9A227` | Gold. Accent, rules, primary control. |
| `brass-light` | `#E6C670` | The highlight stop in the gold sheen. |
| `brass-deep` | `#9C7A18` | **Gold text on light grounds** — see below. |
| `whatsapp` | `#25D366` | Semantic, not brand. WhatsApp controls only. |

### The one rule people get wrong: gold text

`#C9A227` on navy is about **7:1** — comfortable. The same gold on the off-white
is about **2.2:1**, which fails WCAG AA and is genuinely hard to read on a phone
in daylight.

Two tokens plus a convention would be forgotten by the fortieth call site, so
the colour is a **custom property** instead:

```css
:root      { --gold-ink: #9C7A18; }  /* deep gold, for paper */
.on-dark   { --gold-ink: #C9A227; }  /* bright gold, for navy */
.text-gold { color: var(--gold-ink); }
```

**Use `.text-gold` for gold text. Never `text-brass`.** `.band-dark`, `.glass`
and every photo backdrop carry `.on-dark`, so anything inside them inherits the
bright gold automatically and nothing at the call site has to know which ground
it is sitting on.

`bg-brass` is deliberately outside this system — a gold button is bright gold on
both grounds, because there the gold is the background and the navy text on it is
what has to be legible.

`.text-gold` is a component class resolving a custom property, so **Tailwind's
opacity modifier does not apply to it**: `text-gold/50` compiles to nothing.
Use `text-brass/50` where a translucent gold is genuinely wanted on a dark
ground. `npm run audit:css` catches this.

### Gradients

Allowed, and used — but only in three defined places, all of which are in
`tailwind.config.js` rather than written inline:

- `bg-ink-sheen` — the standard dark band, lifted toward the top-left so a
  full-width navy section is not a flat rectangle.
- `bg-photo-scrim` / `bg-photo-scrim-b` — the fixed gradient over every
  photograph. **Fixed, not sampled from the image.** "Darken the picture a bit"
  fails the moment someone swaps in a brighter one and the white type silently
  becomes unreadable.
- `bg-gold-rule` / `bg-gold-sheen` — the section rule and the shimmer on the one
  figure per screen that matters most.

Still banned: **blurred colour orbs**, aurora backgrounds, and gradients used as
a substitute for hierarchy. If a gradient is not one of the four above, it needs
a reason written next to it.

---

## Typography

Three families, each with a job.

| Family | Weights | Job |
|---|---|---|
| **Instrument Serif** | 400 (one weight) | Display. Hero, section heads, pull quotes — **only above ~32px**. |
| **Plus Jakarta Sans** | 400–800 | Interface and body. Everything else, including all sub-display headings. |
| **IBM Plex Mono** | 400–600 | **Every figure.** |

### Instrument Serif ships one weight, and that is deliberate

There is no bold. Asking for `font-bold` makes the browser synthesise one by
smearing the outline, which on a high-contrast serif looks exactly as bad as it
sounds — worst of all at wordmark size. **Never put `font-bold` on
`font-display`.** Below display size, use `.h-card` (Plus Jakarta ExtraBold)
instead. `npm run audit:brand` checks the type stack loads; it cannot check this,
so it is on you.

### The figure rule

**Every number a borrower could act on is set in IBM Plex Mono with
`font-variant-numeric: tabular-nums`** — rates, amounts, tenures, EMIs, CIBIL
scores, LTV percentages, pincodes, the phone number. Use `.fig`.

This is not a stylistic tic. Tabular lining figures are the standard for
financial data because digits are uniform in width, so columns align and a
decimal point cannot drift. In a category where a misaligned decimal makes a
reader doubt the whole institution, setting money correctly is a trust signal
that costs nothing and that no competitor bothers with.

Indian formatting throughout: `₹1,50,000`, lakh and crore, never million. See
`src/lib/format.js`.

### Banned

**Inter, Poppins, Montserrat, Space Grotesk, Fraunces, Playfair, Lato, Open
Sans.** Each is among the most-used faces on the generated web, and reaching for
one is the fastest way back to the average. `npm run audit:brand` fails the build
if any appears on any page.

---

## Photography

The site now leads with photographs, and how they are handled is most of the
difference between premium and cheap.

- **Self-hosted, never hot-linked.** `npm run images` downloads each source
  once, emits a 480 / 960 / 1600 WebP set and a ~400-byte blurred placeholder
  into `src/data/images.gen.js`. That keeps the CSP locked to
  `img-src 'self' data:`, keeps everything on one CDN edge, and means no third
  party is told which pages a visitor reads.
- **Always via `<Photo>` or `<PhotoBackdrop>`.** Never a bare `<img>`. The
  component supplies intrinsic width/height (no layout shift), the blur (no
  blank rectangle), `srcset`/`sizes` (no 2000px file on a phone) and the focal
  point.
- **Set the focal point.** `focal` drives `object-position`. The default of
  `center` is what puts a subject's chin at the top of a 21:9 crop.
- **One eager image per page** — the LCP candidate, which is the masthead.
  Everything else is lazy. `npm run audit:images` warns on a second.
- **Choose by meaning.** Bhosari and Chakan get the industrial belt; Baramati
  and Phaltan get agriculture; Moshi gets logistics. A page about funding an
  MIDC shed that opens with a skyline is a page that was assembled, not made.

**Still true, and worth repeating to the client:** these are licensed stock
photographs, not photographs of PayYou. `/photo-credits/` says so in plain
words. Real photographs of the Chinchwad office, the team and actual disbursals
will beat every one of them, and swapping one is a two-line change in
`src/data/photos.js`.

**Never** an AI-generated photograph of a person. It is recognisable, and on a
financial site being caught costs more than the image could ever earn.

---

## Motion

Motion is now a first-class part of the design. It is also the easiest thing on
a site to get catastrophically wrong, so the system has one hard rule.

### The rule: nothing is ever hidden waiting for JavaScript

The usual reveal ships every section at `opacity: 0` and lets JavaScript add a
class. On a prerendered site that is a resilience bug, not an effect — if the
bundle fails to load, the visitor gets a blank page full of perfectly good HTML
they cannot see. It also needs an inline script to avoid a flash, which this
site's CSP forbids.

So every reveal is a **CSS scroll-driven animation** inside
`@supports (animation-timeline: view())`. No JavaScript, no scroll listener,
nothing on the main thread. A browser without support never applies the
animation, so the content was, is and remains visible. There is no failure mode
in which anything is hidden.

| Device | How | Where |
|---|---|---|
| Reveal on scroll | `[data-reveal]` | Section heads, asides, cards |
| Staggered reveal | `[data-stagger]` on the parent | Grids and lists, 4 steps max |
| Parallax | `[data-parallax]` | Photo backdrops — 6% of drift, no more |
| Counters | `<Counter>` | Trust band only |
| Marquee | `.marquee-track` | The lender ticker |
| Shimmer | `.animate-shimmer` | Section rules, the one gold figure |
| Hover lift | `.card-hover`, `.btn-*` | Cards and controls |
| Photo zoom | `.photo-zoom` inside `.group` | Product cards |

### Constraints

- **Counters start from the correct value.** `<Counter>` renders the final
  figure on the server and animates only if JavaScript runs. Initialising at
  zero would put "₹0 facilitated" in the prerendered HTML — which is what a
  crawler, a link preview and anyone with JS disabled would read.
- **One easing curve**: `cubic-bezier(0.22, 1, 0.36, 1)`, exposed as
  `ease-brand`. A page with five different curves feels assembled.
- **Parallax you notice is wrong.** 6% across a full viewport. The image is
  pre-scaled 1.08 so the drift never exposes an edge.
- **`prefers-reduced-motion` switches all of it off**, globally, in
  `@layer base`. Nothing becomes unreachable as a result — that is what the
  never-hidden rule buys.

---

## Shape and surface

- **Radius**: `md` (6px) on controls, `lg` (10px) on cards, `xl` (14px) on glass
  panels. Not pill-shaped, not square.
- **Shadows are navy-tinted**, never neutral grey. A shadow cast in a colour
  unrelated to the palette is the fastest way to make a careful page look cheap.
  Use the four defined tokens: `shadow-card`, `shadow-lift`, `shadow-glass`,
  `shadow-gold`.
- **Glass** (`.glass`, `.glass-light`) only over a photograph. Over a flat
  colour it is just a translucent rectangle.
- **Rules mean something.** A gold hairline marks a section; a 1px `ink/12` rule
  separates rows of data. Do not draw a line for decoration.

---

## Layout

- **Never eight identical cards in a grid.** The product list is deliberately
  asymmetric: two wide image-led cards, then six three-up. The hierarchy is
  information, not decoration.
- **Every product card carries its spec strip.** A reader can run their eye down
  a column of rates and compare eight products in seconds instead of opening
  eight pages of adjectives. This is the figure rule made structural.
- **Alternate the ground.** No two adjacent sections share a background, and no
  two full-bleed photographs sit next to each other.
- **Vary the vertical rhythm.** `Section` has three sizes; use them. A page where
  every section is the same height on the same white reads as a template no
  matter how good the individual sections are — that flatness was the specific
  thing the client rejected.
- **No icon-in-a-circle above a heading.** Icons are functional: phone, WhatsApp,
  chevron, close, menu, check, arrow. If an icon is decorating a heading, delete
  it.
- Data belongs in tables. An eligibility criterion is a table row, not a bullet
  with a green tick.

---

## Copy

- Say the specific true thing. "One application, 25 lenders, one credit enquiry"
  beats "seamless end-to-end financial solutions".
- Banned: *elevate, seamless, curated, bespoke, unlock, empower, journey,
  one-stop solution, we don't just X we Y*.
- **Never invent a number.** Rates, amounts and tenures come from
  `src/data/products.js`, each traceable to something the client has published.
  Where a figure is unknown the page says what the number *depends on*. Five of
  eight products have `rateFrom: null` on purpose.
- **Never imply PayYou is a lender.** It is a DSA. The disclosure renders on
  every page and `npm run audit:seo` **fails the build** if it goes missing —
  that is a compliance check, not a design one.

---

## What is deliberately absent

| Absent | Why |
|---|---|
| Bank partner logos | No licence to reproduce HDFC's or SBI's marks, and a wall of borrowed logos implies an endorsement a DSA arrangement does not confer. The names run as a typographic ticker instead — which also lets each carry a line about what that lender is good for. |
| A carousel of testimonials | One is published because one is verified. The section says so, which reads as confidence rather than thinness. Nobody fakes a weakness. |
| `aggregateRating` in JSON-LD | No verified review corpus. Publishing one is a structured-data violation. Flip `RATING.show` in `src/data/site.js` when the Google profile has real reviews. |
| `JobPosting` in JSON-LD | No dated vacancy. Marking up an evergreen careers page gets a site removed from Google Jobs entirely. The audit fails the build on it. |
| Contact form | Needs a backend nobody maintains or an endpoint nobody monitors, and it fails silently. Three channels that cannot fail quietly are used instead. |
| Live chat widget | ~200 kB of third-party script blocking the main thread. The business answers a phone six days a week. |
| Hero carousel | Nobody reads slide two, and it makes the LCP a moving target. |
| AI-generated people | See § Photography. |
| A "5 years of experience" claim | The company was incorporated in January 2026. See `CLIENT-ACTIONS.md` § 1. |
