# Hero films and imagery — what to generate, and exactly how

Everything on the site is built and live. This document covers the one thing
that cannot be drawn in code: the hero films.

---

## What the reference site actually does

Measured in a real browser on 24 August 2026, not guessed at.

IDFC FIRST's hero is **a plain `<video>` carousel**. Eight slides. No WebGL, no
Lottie, no canvas, no animation library.

| | Desktop | Mobile |
|---|---|---|
| Element | `<video autoplay muted loop playsinline>` | same |
| Size | 1440 × 620 | 390 × 720 (**portrait, a separate cut**) |
| Format | MP4 (H.264) | MP4, one slide is a GIF |
| Text | live HTML on the left, **not** baked into the film | live HTML above the film |

Two kinds of film across their slides:

1. **Photoreal 3D product renders** — a rupee coin against dark cylinders, a
   fan of credit cards, a dark red globe with silver coins orbiting it. Studio
   lighting, near-black stage, one hero object.
2. **Cut-out lifestyle photography** — a real couple celebrating, a man in a
   suit — composited on a deep gradient ground in their brand red.

That is the whole recipe. This site now reproduces the structure exactly: dark
stage, live text left, visual right, dots and arrows lower left, glass tab rail
overlapping the foot, coloured tiles with white line drawings beneath.

---

## What is already done, and what is waiting

| Piece | Status |
|---|---|
| Header, transparent over the hero, solid on scroll | **Built** |
| Hero carousel: 4 slides, dots, arrows, pause on hover | **Built** |
| Glass tab rail with line icons | **Built** |
| Coloured product tiles with white line art | **Built** |
| White line-art illustration set (14 drawings) | **Built** |
| Hero films | **Waiting on you** — placeholder scenes running |

The placeholder is an animated SVG in the same register. It is deliberately not
pretending to be a render: the moment a film exists it is replaced by naming the
file, and nothing else changes.

### Where to put a finished film

```
public/hero/compare-desktop.mp4      1920 × 828   (16:6.9, matches 1440 × 620)
public/hero/compare-mobile.mp4        1080 × 1994  (portrait)
public/hero/compare-poster.jpg        first frame, for slow connections
```

Then in `src/data/heroSlides.js`, change that slide's `video: null` to:

```js
video: { desktop: '/hero/compare-desktop.mp4', mobile: '/hero/compare-mobile.mp4' },
poster: '/hero/compare-poster.jpg',
```

That is the entire integration. Repeat per slide.

---

## Non-negotiable specifications

Get these wrong and the film either breaks the layout or refuses to autoplay.

- **Duration 6–8 seconds, seamless loop.** The carousel advances at 7 seconds.
- **No text, no logo, no words in the film.** The headline is live HTML on top.
  Text inside the film cannot be translated, cannot be read by a screen reader,
  and goes blurry on a phone.
- **Keep the left 45% of the desktop frame quiet and dark.** That is where the
  headline sits. Subject on the right.
- **On the portrait cut, keep the top 50% quiet.** The text sits above the
  subject on a phone.
- **Muted, no audio track at all.** Autoplay with sound is blocked everywhere.
- **H.264 MP4, under 2.5 MB per file.** Ideally under 1.5 MB. A 12 MB hero film
  is the single commonest reason a bank homepage feels slow on a phone.
- **Near-black stage: `#05101f`.** This is the site's hero ground. A film on a
  different black shows a visible seam at its edges.
- **Brand colours only: deep blue `#164a90`, red `#e31e24`.** No gold. Gold is
  IDFC's accent, not PayYou's — using it is the fastest way to look like a copy
  rather than a peer.

---

## The four prompts

Paste these into Google Flow / Veo, Runway, Kling or Sora. Each produces the
right-hand visual for one slide. Generate the desktop cut first, then re-run the
same prompt with the portrait framing note for the mobile cut.

### Slide 1 — "Twenty-five lenders. One application."

> Photorealistic 3D product render, cinematic studio lighting on a near-black
> seamless background (#05101f). A single large brushed-steel coin, deep blue
> anodised finish, stands upright on edge in the right third of the frame,
> rotating very slowly about its vertical axis. A rupee symbol is machined into
> its face in polished red enamel. Behind it, two matte deep-blue cylindrical
> plinths of different heights, slightly out of focus. One soft key light from
> upper left creating a crisp specular highlight along the coin's rim; deep
> shadow falling to the lower right. Shallow depth of field. Slow, continuous,
> seamless loop. No text, no logos. The left 45 percent of the frame is empty
> dark background. 16:7 aspect ratio.

**Mobile cut:** same description, but *"vertical 9:16 portrait framing; the coin
sits in the lower two-thirds; the top half of the frame is empty dark
background."*

### Slide 2 — "Get the sanction before you book."

> Photorealistic 3D render, cinematic studio lighting on a near-black seamless
> background (#05101f). A modern architectural model of a small house in matte
> deep blue (#164a90), sitting on a dark reflective surface in the right third
> of the frame. A polished steel door key floats and rotates slowly above it,
> catching a bright rim light. Faint red accent light (#e31e24) grazing one edge
> of the roof. Soft key light from upper left, deep shadows to the right,
> shallow depth of field, gentle camera push-in of only a few percent. Seamless
> loop, 7 seconds. No text, no logos. Left 45 percent empty dark background.
> 16:7 aspect ratio.

### Slide 3 — "Your bank statement is the application."

> Photorealistic 3D data-visualisation render on a near-black seamless
> background (#05101f). Four tall rectangular bars in matte deep blue
> (#164a90) with polished top faces, arranged left to right in ascending
> height in the right third of the frame, rising and settling in a slow
> continuous loop. A thin glowing red ribbon (#e31e24) traces an upward path
> across their tops, with a soft pulse of light travelling along it. Volumetric
> haze, cinematic studio lighting from upper left, shallow depth of field.
> Seamless loop, 7 seconds. No text, no numbers, no logos. Left 45 percent empty
> dark background. 16:7 aspect ratio.

### Slide 4 — "Do the arithmetic before anyone asks."

> Photorealistic 3D render on a near-black seamless background (#05101f). A
> translucent deep-blue glass shield (#164a90) floating and rotating extremely
> slowly in the right third of the frame, with a polished red checkmark
> (#e31e24) inset into its face. Behind it, several sheets of dark paper drift
> slowly and dissolve into fine particles as they touch the shield. Cinematic
> rim lighting from upper left, volumetric light shafts, shallow depth of field.
> Seamless loop, 7 seconds. No text, no logos. Left 45 percent empty dark
> background. 16:7 aspect ratio.

---

## The alternative: photography, which is faster and often better

Two of the reference's own slides are not renders at all. They are photographs
of people, cut out and placed on a deep coloured gradient. That approach has
three advantages here: it is quicker, it costs nothing to license correctly, and
a photograph of a real family in Pune is more persuasive to a Pune borrower than
any abstract render.

If you would rather go that way, brief a shoot or license stock as follows:

- A couple in their thirties receiving keys, mid-celebration, natural light
- A shop owner behind the counter of a small Pimpri-Chinchwad business
- A family of three at a kitchen table with a laptop and papers
- A woman doctor in a clinic, mid-consultation

Cut out on a transparent background, placed on a `#05101f`-to-`#164a90` radial
gradient with the subject on the right. That is exactly the construction of
their personal-loan and FCNR slides.

**Say the word and I will build the photographic version of the hero instead —
the component already accepts either, and it is roughly an hour's work.**

---

## On the two libraries you sent

**threeui** (`github.com/MengTo/threeui`) — MIT licensed, React and Vite, real
Three.js components. Good library. It is not what the reference uses, and it is
the wrong tool for this hero: a Three.js runtime is roughly 600 kB before it
draws anything, it needs a canvas that no screen reader can see into, and on the
mid-range Android most of this audience reads on it costs frames the page cannot
spare. The reference site chose video for exactly these reasons, and it was
right to. If you want a WebGL section elsewhere on the site — an interactive
piece, something that responds to the cursor — it is a good candidate and I am
happy to use it there.

**motionsites.ai** — a prompt library for Lovable, Bolt and Cursor rather than a
source of assets. Nothing to integrate. The prompts above are written against
the actual measured specification of the reference hero, which is more specific
than a general library can be.

---

## What I could not do, and why

**I have not copied IDFC's films, vectors or artwork.** Their assets are their
property, and their red is their brand. A site that used them would be both an
infringement and, more practically, a site that looks like somebody else's bank
rather than like PayYou.

What has been reproduced is the format: the structure, the proportions, the
carousel behaviour, the tab rail, the tile system, the line-art device, the pill
controls, the transparent-to-solid header. Every frame of artwork is PayYou's
own, in the blue and red sampled from their actual logo.
