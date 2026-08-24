import { BRAND } from '../data/brand.js'

/**
 * The hero's right-hand visual.
 *
 * ── Why this exists at all ─────────────────────────────────────────────────
 * The reference site runs a rendered film here. The client will supply one;
 * until then a hero with an empty right half is not a hero. These scenes sit in
 * exactly the same register as the film that will replace them — dark stage,
 * one large modelled form, restrained motion — so the layout is finished today
 * and the swap is a one-line change in data/heroSlides.js.
 *
 * ── Why SVG rather than three.js ───────────────────────────────────────────
 * The client offered threeui as a source. The reference site does not use WebGL
 * and neither does this: a three.js runtime is roughly 600 kB before anything
 * is drawn, needs a canvas a screen reader cannot see into, and on the
 * mid-range Android most of this audience reads on it costs frames the page
 * cannot spare. These are a few kilobytes of markup, render at any resolution,
 * and cost nothing on a phone.
 *
 * ── Every colour comes from the palette ────────────────────────────────────
 * Nothing here is a literal hex. The shading ramp is declared in
 * src/data/brand.js and imported, so the artwork cannot drift from the brand
 * and `npm run audit:brand` still means something. When it complains that a
 * colour is not in the palette, the fix is a decision recorded in brand.js,
 * never a new constant here.
 *
 * ── Motion ─────────────────────────────────────────────────────────────────
 * Every animation is CSS and every one sits inside a `motion-safe:` variant, so
 * `prefers-reduced-motion: reduce` leaves a still composition rather than a
 * half-drawn one. Nothing moves faster than a slow drift; this is a masthead
 * behind a headline, not a screensaver.
 */

// Gradient ids must be unique per scene: several scenes are in the DOM at once
// inside the carousel, and duplicate ids make every one of them resolve to
// whichever was parsed first.
const ids = (k) => ({ metal: `${k}-metal`, glow: `${k}-glow` })

export default function HeroScene({ scene = 'coin', className = '' }) {
  const Scene = SCENES[scene] ?? SCENES.coin
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} aria-hidden="true">
      <Scene />
    </div>
  )
}

/** Shared defs: the brushed-metal ramp and the stage glow. */
function Defs({ k }) {
  const g = ids(k)
  return (
    <defs>
      {/* Brushed metal needs a wide tonal range or it reads as a flat disc,
          which is exactly what the first version did. White is the specular:
          it is permitted outside the palette (see ALLOWED_EXTRA in
          scripts/brand-audit.mjs) and it is what makes a surface look lit. */}
      {/* One light, upper left. A face that runs bright to dark across its
          diameter is what makes a disc read as a solid object rather than as a
          coloured circle, which is what the first two attempts produced. White
          is the specular and is permitted outside the palette (ALLOWED_EXTRA
          in scripts/brand-audit.mjs). */}
      <linearGradient id={g.metal} x1="0.12" y1="0.04" x2="0.86" y2="0.96">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="14%" stopColor={BRAND.sky} />
        <stop offset="34%" stopColor={BRAND.inkSoft} />
        <stop offset="58%" stopColor={BRAND.ink} />
        <stop offset="80%" stopColor={BRAND.formLit} />
        <stop offset="100%" stopColor={BRAND.formShadow} />
      </linearGradient>
      <radialGradient id={g.glow} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={BRAND.inkMid} stopOpacity="0.5" />
        <stop offset="100%" stopColor={BRAND.inkMid} stopOpacity="0" />
      </radialGradient>
    </defs>
  )
}

/** A slow-turning rupee coin resting between two plinths. */
function CoinScene() {
  const g = ids('coin')
  return (
    <svg viewBox="0 0 800 620" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Defs k="coin" />
      <ellipse cx="470" cy="330" rx="330" ry="300" fill={`url(#${g.glow})`} />

      <g className="motion-safe:animate-[heroFloat_11s_ease-in-out_infinite]">
        <ellipse cx="286" cy="268" rx="74" ry="24" fill={BRAND.ink} />
        <rect x="212" y="268" width="148" height="164" fill={BRAND.formLit} />
        <ellipse cx="286" cy="432" rx="74" ry="24" fill={BRAND.formShadow} />

        <ellipse cx="600" cy="352" rx="92" ry="30" fill={BRAND.inkMid} />
        <rect x="508" y="352" width="184" height="136" fill={BRAND.formMid} />
        <ellipse cx="600" cy="488" rx="92" ry="30" fill={BRAND.formShadow} />
      </g>

      {/* `heroSpin` fakes a slow turn about the vertical axis with scaleX. */}
      <g
        className="origin-center motion-safe:animate-[heroSpin_14s_ease-in-out_infinite]"
        style={{ transformBox: 'fill-box' }}
      >
        {/* The thickness of the coin, offset down-right so it has a body. */}
        <circle cx="424" cy="404" r="112" fill={BRAND.formShadow} />
        <circle cx="415" cy="395" r="112" fill={`url(#${g.metal})`} />

        {/* Rim: bright where the light falls, dark where it does not. Two arcs
            rather than a full stroke, because a uniform ring flattens it again. */}
        <path
          d="M415 283 A112 112 0 0 0 303 395"
          fill="none"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M415 507 A112 112 0 0 0 527 395"
          fill="none"
          stroke={BRAND.formShadow}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="415" cy="395" r="90" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.22" />

        {/* ₹ in white: it has to hold at 40px on a phone, and white is the only
            value that clears every part of a gradient running bright to dark. */}
        <g stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M383 348 h64" />
          <path d="M383 376 h64" />
          <path d="M439 348 c0 29 -23 28 -38 28 l44 70" />
        </g>
      </g>

      <g className="motion-safe:animate-[heroSheen_9s_linear_infinite]">
        <rect
          x="300"
          y="270"
          width="34"
          height="250"
          fill={BRAND.paper}
          opacity="0.14"
          transform="rotate(18 415 395)"
        />
      </g>
    </svg>
  )
}

/** A key turning beside a house form, for the home loan slide. */
function KeysScene() {
  const g = ids('keys')
  return (
    <svg viewBox="0 0 800 620" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Defs k="keys" />
      <ellipse cx="440" cy="320" rx="330" ry="290" fill={`url(#${g.glow})`} />

      <g className="motion-safe:animate-[heroFloat_13s_ease-in-out_infinite]">
        <path d="M250 330 L410 210 L570 330 L570 500 L250 500 Z" fill={BRAND.formMid} />
        <path d="M410 210 L570 330 L570 500 L410 430 Z" fill={BRAND.formLit} />
        <rect x="330" y="380" width="70" height="120" fill={BRAND.formShadow} />
        <rect x="452" y="360" width="62" height="62" fill={BRAND.ink} />
        <path d="M250 330 L410 210 L570 330" fill="none" stroke={BRAND.formEdge} strokeWidth="4" />
      </g>

      <g
        className="origin-center motion-safe:animate-[heroTilt_10s_ease-in-out_infinite]"
        style={{ transformBox: 'fill-box' }}
      >
        <circle cx="600" cy="200" r="52" fill="none" stroke={`url(#${g.metal})`} strokeWidth="20" />
        <rect x="592" y="248" width="16" height="150" fill={`url(#${g.metal})`} />
        <rect x="608" y="352" width="34" height="14" fill={BRAND.formSpecular} />
        <rect x="608" y="382" width="26" height="14" fill={BRAND.formSpecular} />
      </g>
    </svg>
  )
}

/** Rising bars under a trend line, for the business slide. */
function ChartScene() {
  const g = ids('chart')
  const bars = [
    { x: 230, h: 130, d: '0s' },
    { x: 330, h: 200, d: '0.5s' },
    { x: 430, h: 270, d: '1s' },
    { x: 530, h: 360, d: '1.5s' },
  ]
  return (
    <svg viewBox="0 0 800 620" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Defs k="chart" />
      <ellipse cx="430" cy="330" rx="330" ry="290" fill={`url(#${g.glow})`} />

      {bars.map((b) => (
        <g
          key={b.x}
          className="motion-safe:animate-[heroRise_6s_ease-in-out_infinite]"
          style={{ animationDelay: b.d, transformOrigin: '50% 100%', transformBox: 'fill-box' }}
        >
          <rect x={b.x} y={500 - b.h} width="70" height={b.h} fill={BRAND.formLit} />
          <rect x={b.x} y={500 - b.h} width="70" height="10" fill={BRAND.formEdge} />
          <rect x={b.x + 70} y={500 - b.h} width="18" height={b.h} fill={BRAND.formShadow} />
        </g>
      ))}

      <path
        d="M250 400 L350 340 L450 280 L570 170"
        fill="none"
        stroke={BRAND.accent}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="570" cy="170" r="16" fill={BRAND.accent} />
      <circle
        cx="570"
        cy="170"
        r="16"
        fill="none"
        stroke={BRAND.accent}
        strokeWidth="3"
        className="motion-safe:animate-[heroPulse_3.5s_ease-out_infinite]"
        style={{ transformOrigin: '570px 170px' }}
      />
    </svg>
  )
}

/** A shield over a document, for the privacy slide. */
function ShieldScene() {
  const g = ids('shield')
  return (
    <svg viewBox="0 0 800 620" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Defs k="shield" />
      <ellipse cx="430" cy="320" rx="320" ry="285" fill={`url(#${g.glow})`} />

      <g className="motion-safe:animate-[heroFloat_12s_ease-in-out_infinite]">
        <rect x="250" y="180" width="240" height="310" rx="8" fill={BRAND.formLit} />
        <g stroke={BRAND.formEdge} strokeWidth="9" strokeLinecap="round">
          <path d="M292 250 h150" />
          <path d="M292 296 h150" />
          <path d="M292 342 h96" />
          <path d="M292 388 h124" />
        </g>
      </g>

      <g
        className="motion-safe:animate-[heroTilt_11s_ease-in-out_infinite]"
        style={{ transformBox: 'fill-box' }}
      >
        <path
          d="M540 190 L660 232 L660 350 C660 420 600 462 540 486 C480 462 420 420 420 350 L420 232 Z"
          fill={BRAND.ink}
        />
        <path
          d="M540 190 L660 232 L660 350 C660 420 600 462 540 486 Z"
          fill={BRAND.formShadow}
          opacity="0.6"
        />
        <path
          d="M482 336 l42 44 l76 -104"
          fill="none"
          stroke={BRAND.accent}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

const SCENES = { coin: CoinScene, keys: KeysScene, chart: ChartScene, shield: ShieldScene }
