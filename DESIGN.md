# Design direction — PayYou Advisory

Read this before adding a section, a colour, or a font.

---

## History, and the mistake that ran through it

This design took three attempts, and the first two failed the same way.

**v1** argued that every Indian loan website looks identical, so PayYou should
look nothing like them: pine green on bone paper, no photography, no gradients,
data as the only decoration. The client's verdict — *"entire website is looking
fully AI"* — was correct. Austerity is not restraint; a page with no images and
no movement reads as unbuilt, not confident.

**v2** added photography, motion and depth in navy and gold, in the register of
the reference sites. Better, and still wrong, for a reason that should have been
obvious from the start: **the palette and the logo were invented.** The client
asked, reasonably, *why are you choosing colour theme and logo on your own — use
their existing site.*

**v3 — this one — takes both from the client.** The logo is their actual file,
downloaded from payyouadvisory.com. The palette is sampled from it, pixel by
pixel. The bank logos are the ones they already publish. Nothing about the brand
is a guess any more.

The lesson worth writing down: **a brand is not a design decision.** The client
already had one. Two rounds were spent producing coherent, defensible work that
did not match the logo above their own front door.

What survived all three versions is the *honesty*: no invented numbers, no
fabricated testimonials, the disclosure designed rather than buried. That was
never the problem.

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

**Sampled from PayYou's logo, not chosen.** Every saturated pixel in
`PayYou-Logo.webp` falls into two tight clusters:

```
blue   #14478c · #144894 · #1c478c · #144c8d · #1b4794   → #164a90
red    #dc2628 · #e62027 · #ef1e27 · #e81e1e · #e42732   → #e31e24
```

| Token | Hex | Role |
|---|---|---|
| `paper` | `#FFFFFF` | Dominant surface. |
| `paper-deep` | `#F4F7FB` | Second surface — a cool grey for banding without a border. |
| `paper-dark` | `#E4EBF3` | Third surface: table stripes, input wells. |
| `ink` | `#164A90` | **The logo blue.** Headings, dark bands, brand moments. |
| `ink-deep` | `#08203F` | Darkest stop. Scrims, footer, theme colour. |
| `ink-mid` | `#1E5AAE` | The lighter stop in every blue gradient. |
| `ink-text` | `#12325C` | **Body copy.** See below. |
| `ink-soft` | `#3E6BA8` | Secondary text. |
| `ink-faint` | `#8AA3C4` | Tertiary text, rules, disabled states. |
| `accent` | `#E31E24` | **The logo red.** Primary controls, rules, active states. |
| `accent-deep` | `#B8151B` | Red *text* on white. |
| `accent-light` | `#FF4B50` | Highlight stop in the red sheen. |
| `sky` | `#9BC0F0` | Label text on dark grounds. |
| `whatsapp` | `#25D366` | Semantic, not brand. WhatsApp controls only. |

### Why body text is not the logo blue

`ink` is a brand colour, not a reading colour. `#164A90` at 17px is legible and
tiring over a paragraph. `ink-text` (`#12325C`) is the same hue taken darker,
and it is what `body` is set to. Use `ink` for headings and brand surfaces;
`ink-text` for anything someone has to actually read.

### The one rule people get wrong: the accent

`#E31E24` on white is about **4.0:1** — under WCAG AA for body text, and hard to
read on a phone in daylight. On the dark blue it is worse (~4.2:1).

Two tokens plus a convention would be forgotten by the fortieth call site, so
the emphasis colour is a **custom property**:

```css
:root      { --accent-ink: #B8151B; }  /* deep red, on white — 6.5:1 */
.on-dark   { --accent-ink: #9BC0F0; }  /* light blue, on navy */
.text-accent { color: var(--accent-ink); }
```

**Use `.text-accent` for emphasis text. Never `text-accent` as a Tailwind
utility colour on small type.** `.band-dark`, `.glass` and every photo backdrop
carry `.on-dark`, so anything inside them flips automatically.

The hue changes between grounds, which looks inconsistent written down and is
correct on screen: red cannot carry small text on dark blue, and rather than
introduce an unrelated colour the dark-ground emphasis is the brand blue
lightened. Red still appears on dark — as button fills and graphic rules, where
text contrast rules do not apply.

`.text-accent` is a component class resolving a custom property, so **Tailwind's
opacity modifier does not apply**: `text-accent/50` compiles to nothing. Use
`text-accent` as a theme colour (`bg-accent`, `border-accent/30`) where you need
a modifier. `npm run audit:css` catches the mistake.

### Gradients

Allowed, and defined in `tailwind.config.js` rather than written inline:

- `bg-ink-sheen` — the standard dark band, lifted at the top-left so a full-width
  blue section is not a flat rectangle.
- `bg-photo-scrim` / `-b` — the fixed gradient over every photograph. **Fixed,
  not sampled from the image.** "Darken the picture a bit" fails the moment
  someone swaps in a brighter one and the white type becomes unreadable.
- `bg-accent-rule` / `bg-accent-sheen` — the section rule and the emphasis
  gradient on a headline fragment.
- `bg-paper-wash` — the very soft blue lift behind the hero.

Still banned: **blurred colour orbs**, aurora backgrounds, and gradients used as
a substitute for hierarchy.

---

## Typography

Two families.

| Family | Weights | Job |
|---|---|---|
| **Plus Jakarta Sans** | 400–800 | Everything. |
| **IBM Plex Mono** | 400–600 | **Every figure.** |

### One family, not a display serif

v2 paired Instrument Serif for display with a sans for everything else. It read
*editorial* — a magazine about money rather than a place to get some. Every bank
in the client's reference set (IDFC FIRST, Aditya Birla Capital) is set entirely
in sans, and so is every institution a visitor will compare this to. 800 weight
carries the whole hierarchy without a second face.

Use `.h-display`, `.h-section` and `.h-card` rather than assembling sizes by
hand — that is what keeps eight pages of headings on one scale.

### The figure rule

**Every number a borrower could act on is set in IBM Plex Mono with
`font-variant-numeric: tabular-nums`** — rates, amounts, tenures, EMIs, CIBIL
scores, LTV percentages, pincodes, the phone number. Use `.fig`.

Tabular lining figures are the standard for financial data because digits are
uniform in width, so columns align and a decimal point cannot drift. In a
category where a misaligned decimal makes a reader doubt the whole institution,
setting money correctly is a trust signal that costs nothing and that no
competitor bothers with.

Indian formatting throughout: `₹1,50,000`, lakh and crore, never million. See
`src/lib/format.js`.

### Banned

**Inter, Poppins, Montserrat, Space Grotesk, Fraunces, Playfair, Lato, Open
Sans.** Each is among the most-used faces on the generated web. `npm run
audit:brand` fails the build if any appears on any page.

---

## Logos

### PayYou's own

`<Wordmark>` renders the real file from `public/brand/`, downloaded by
`npm run logos`. **Do not draw a replacement.** Two earlier versions of this
site shipped an invented mark; that is the specific mistake this version exists
to correct.

The mark is blue on transparency with **no reversed version**, which has two
consequences that look like styling choices and are not:

- **The navigation bar is white**, not transparent-over-hero. A blue logo on a
  dark photograph disappears.
- **On dark grounds the logo sits on a white chip** (`<Wordmark invert />`).
  That is the correct way to place a mark with no knockout version — it protects
  the artwork rather than mangling it.

Both go away the day the client supplies a reversed version. See
`CLIENT-ACTIONS.md`.

### The partner banks'

Twelve marks, taken from the client's own site and normalised by
`scripts/fetch-logos.mjs`: each is trimmed of dead space and centred in an
identical 240×96 box, so the grid aligns on the logos rather than their original
bounding boxes.

The wall renders them **greyscale at 70% opacity, full colour on hover**. That is
the standard treatment for a partner wall and it is standard because nothing else
reconciles a yellow L&T block with a transparent SBI roundel. It also reads as
quiet texture until you look at it, and resolves into recognisable banks the
moment you do.

Five partners have no logo published. They are named in the index below the wall
rather than given an empty tile.

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
| Shimmer | `.animate-shimmer` | The emphasis fragment in a headline |
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
- **Shadows are blue-tinted**, never neutral grey. A shadow cast in a colour
  unrelated to the palette is the fastest way to make a careful page look cheap.
  Use the defined tokens: `shadow-card`, `shadow-lift`, `shadow-glass`,
  `shadow-accent`, `shadow-nav`.
- **Glass** (`.glass`, `.glass-light`) only over a photograph. Over a flat
  colour it is just a translucent rectangle.
- **Rules mean something.** A red hairline marks a section; a 1px `ink/12` rule
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
| An invented logo or palette | The client has both. Two versions of this site shipped a made-up mark and a made-up colour scheme before that was corrected. See § History. |
| A carousel of testimonials | One is published because one is verified. The section says so, which reads as confidence rather than thinness. Nobody fakes a weakness. |
| `aggregateRating` in JSON-LD | No verified review corpus. Publishing one is a structured-data violation. Flip `RATING.show` in `src/data/site.js` when the Google profile has real reviews. |
| `JobPosting` in JSON-LD | No dated vacancy. Marking up an evergreen careers page gets a site removed from Google Jobs entirely. The audit fails the build on it. |
| Contact form | Needs a backend nobody maintains or an endpoint nobody monitors, and it fails silently. Three channels that cannot fail quietly are used instead. |
| Live chat widget | ~200 kB of third-party script blocking the main thread. The business answers a phone six days a week. |
| Hero carousel | Nobody reads slide two, and it makes the LCP a moving target. |
| AI-generated people | See § Photography. |
| A "5 years of experience" claim | The company was incorporated in January 2026. See `CLIENT-ACTIONS.md` § 1. |
