import { BRAND } from './src/data/brand.js'

/**
 * Design tokens. The reasoning behind every value is in DESIGN.md — read it
 * before adding anything, and especially before adding a colour or a font.
 *
 * Colours are imported rather than written here so the site and the generated
 * brand assets cannot drift apart. See src/data/brand.js.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        /**
         * Height-based, not width-based. A 1080p laptop at Windows 125%
         * scaling reports ~1536 CSS px wide — firmly `lg`, so it gets the
         * desktop layout — but only ~730px tall once browser chrome is gone.
         * The hero has to fit its call to action into that.
         */
        short: { raw: '(max-height: 820px)' },
      },

      colors: {
        paper: {
          DEFAULT: BRAND.paper,
          deep: BRAND.paperDeep,
          dark: BRAND.paperDark,
        },
        ink: {
          DEFAULT: BRAND.ink,
          deep: BRAND.inkDeep,
          mid: BRAND.inkMid,
          soft: BRAND.inkSoft,
          faint: BRAND.inkFaint,
        },
        brass: {
          DEFAULT: BRAND.brass,
          light: BRAND.brassLight,
          deep: BRAND.brassDeep,
        },
        whatsapp: BRAND.whatsapp,
      },

      fontFamily: {
        /**
         * Display — Instrument Serif. One weight, very high contrast, and it
         * only earns its place above about 32px, where it reads expensive
         * rather than decorative. Everything smaller is set in the sans, which
         * is why `sans` carries weights up to 800.
         */
        display: ['"Instrument Serif"', 'Georgia', 'Cambria', 'serif'],
        /** Interface and body. Modern humanist geometric — the fintech register. */
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        /** Every figure. See DESIGN.md § The figure rule. */
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      borderRadius: {
        none: '0',
        DEFAULT: '4px',
        sm: '3px',
        md: '6px',
        lg: '10px',
        xl: '14px',
        '2xl': '20px',
        '3xl': '28px',
        full: '9999px',
      },

      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1.45' }],
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.8125rem', { lineHeight: '1.55' }],
        base: ['1.0625rem', { lineHeight: '1.68' }],
        lg: ['1.1875rem', { lineHeight: '1.6' }],
        xl: ['1.375rem', { lineHeight: '1.4' }],
        '2xl': ['1.75rem', { lineHeight: '1.24' }],
        '3xl': ['2.25rem', { lineHeight: '1.12' }],
        '4xl': ['3rem', { lineHeight: '1.04' }],
        '5xl': ['4rem', { lineHeight: '0.98' }],
        '6xl': ['5.25rem', { lineHeight: '0.94' }],
        '7xl': ['6.5rem', { lineHeight: '0.92' }],
      },

      maxWidth: {
        prose: '68ch',
      },

      /**
       * Tailwind's default opacity scale runs in steps of five, so `/12` — used
       * for hairline rules — compiles to nothing at all. Silently: no error, no
       * warning, the rule just does not exist. `npm run audit:css` catches it.
       */
      opacity: {
        12: '0.12',
        14: '0.14',
        18: '0.18',
        /* Standfirst copy on a dark ground. 70% is a shade too grey against a
           photograph and 75% starts competing with the headline; 72% is where
           it sits comfortably below the h1 and still reads at arm's length. */
        72: '0.72',
      },

      /**
       * Elevation. Long, soft, navy-tinted rather than neutral grey — a shadow
       * cast in a colour unrelated to the palette is the fastest way to make a
       * careful page look cheap.
       */
      boxShadow: {
        card: '0 2px 4px -2px rgba(11, 29, 54, 0.08), 0 12px 32px -12px rgba(11, 29, 54, 0.16)',
        lift: '0 4px 8px -4px rgba(11, 29, 54, 0.12), 0 24px 56px -20px rgba(11, 29, 54, 0.28)',
        glass: '0 8px 24px -12px rgba(6, 18, 35, 0.5), 0 32px 80px -32px rgba(6, 18, 35, 0.7)',
        gold: '0 8px 28px -12px rgba(201, 162, 39, 0.55)',
      },

      backgroundImage: {
        /** The standard dark band — navy, lifted toward the top-left so it is not flat. */
        'ink-sheen':
          'linear-gradient(135deg, #12304f 0%, #0b1d36 45%, #061223 100%)',
        /** Scrim over a photograph, so white type stays legible at any crop. */
        'photo-scrim':
          'linear-gradient(to right, rgba(6,18,35,0.94) 0%, rgba(6,18,35,0.82) 42%, rgba(6,18,35,0.35) 75%, rgba(6,18,35,0.15) 100%)',
        'photo-scrim-b':
          'linear-gradient(to top, rgba(6,18,35,0.92) 0%, rgba(6,18,35,0.55) 45%, rgba(6,18,35,0.12) 100%)',
        /** Gold hairline that fades at both ends, used as a section rule. */
        'gold-rule':
          'linear-gradient(to right, rgba(201,162,39,0) 0%, #c9a227 18%, #e6c670 50%, #c9a227 82%, rgba(201,162,39,0) 100%)',
        'gold-sheen': 'linear-gradient(120deg, #9c7a18 0%, #c9a227 38%, #e6c670 52%, #c9a227 66%, #9c7a18 100%)',
      },

      keyframes: {
        'slide-up': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        /** Used by the scroll-driven reveal — see src/styles/index.css. */
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        /** Hero photograph drift. Small — 6% over a full viewport of scroll. */
        'parallax-y': {
          from: { transform: 'translateY(-3%) scale(1.08)' },
          to: { transform: 'translateY(3%) scale(1.08)' },
        },
        /** The gold sweep across a heading rule or a primary control. */
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'scroll-cue': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 240ms cubic-bezier(0.22, 1, 0.36, 1)',
        marquee: 'marquee 44s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        'scroll-cue': 'scroll-cue 2.2s ease-in-out infinite',
      },

      transitionTimingFunction: {
        /** The one easing curve on the site. Decisive out, soft in. */
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
