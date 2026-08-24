import { BRAND } from './src/data/brand.js'

/**
 * Design tokens. The reasoning behind every value is in DESIGN.md — read it
 * before adding anything, and especially before adding a colour or a font.
 *
 * Colours are imported from src/data/brand.js, which samples them from PayYou's
 * actual logo, so the site and the generated brand assets cannot drift apart.
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
         * The hero's call to action has to survive that.
         */
        short: { raw: '(max-height: 800px)' },
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
          text: BRAND.inkText,
          soft: BRAND.inkSoft,
          faint: BRAND.inkFaint,
        },
        accent: {
          DEFAULT: BRAND.accent,
          light: BRAND.accentLight,
          deep: BRAND.accentDeep,
        },
        sky: BRAND.sky,
        whatsapp: BRAND.whatsapp,

        /* The hero stage and its shading ramp. See the block at the foot of
           src/data/brand.js for why a rendered form needs tones a flat
           interface palette does not carry. */
        stage: BRAND.stage,
        form: {
          shadow: BRAND.formShadow,
          mid: BRAND.formMid,
          lit: BRAND.formLit,
          edge: BRAND.formEdge,
          specular: BRAND.formSpecular,
        },
      },

      fontFamily: {
        /**
         * One family for everything except figures.
         *
         * An earlier version paired Instrument Serif for display with a sans for
         * everything else. It looked editorial, which is the wrong genre: the
         * client's references — IDFC FIRST, Aditya Birla Capital — are set
         * entirely in sans, and so is every bank a visitor will compare this to.
         * A serif headline on a lending site reads like a magazine about
         * money rather than a place to get some.
         *
         * Plus Jakarta Sans carries 400 to 800, which is enough range to build
         * the whole hierarchy without a second face.
         */
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
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
        base: ['1.0625rem', { lineHeight: '1.65' }],
        lg: ['1.1875rem', { lineHeight: '1.6' }],
        xl: ['1.375rem', { lineHeight: '1.35' }],
        '2xl': ['1.6875rem', { lineHeight: '1.22' }],
        '3xl': ['2.125rem', { lineHeight: '1.14' }],
        '4xl': ['2.625rem', { lineHeight: '1.08' }],
        '5xl': ['3.25rem', { lineHeight: '1.04' }],
        '6xl': ['4rem', { lineHeight: '1.0' }],
        '7xl': ['4.75rem', { lineHeight: '0.98' }],
      },

      maxWidth: {
        prose: '66ch',
      },

      /**
       * Tailwind's default opacity scale runs in steps of five, so `/12` — used
       * for hairline rules — compiles to nothing at all. Silently: no error, no
       * warning, the rule just does not exist. `npm run audit:css` catches it.
       */
      opacity: {
        8: '0.08',
        12: '0.12',
        14: '0.14',
        18: '0.18',
        72: '0.72',
      },

      /**
       * Elevation, tinted with the brand blue rather than neutral grey. A
       * shadow cast in a colour unrelated to the palette is the fastest way to
       * make a careful page look cheap.
       */
      boxShadow: {
        card: '0 1px 2px -1px rgba(8, 32, 63, 0.06), 0 8px 24px -12px rgba(8, 32, 63, 0.14)',
        lift: '0 4px 8px -4px rgba(8, 32, 63, 0.10), 0 24px 48px -20px rgba(8, 32, 63, 0.24)',
        glass: '0 8px 24px -12px rgba(8, 32, 63, 0.30), 0 32px 72px -32px rgba(8, 32, 63, 0.45)',
        accent: '0 8px 24px -10px rgba(227, 30, 36, 0.45)',
        nav: '0 1px 0 0 rgba(8, 32, 63, 0.08), 0 8px 24px -16px rgba(8, 32, 63, 0.20)',
      },

      backgroundImage: {
        /** The standard dark band — brand blue, lifted at the top-left. */
        'ink-sheen': 'linear-gradient(135deg, #1e5aae 0%, #164a90 42%, #08203f 100%)',
        /** Scrim over a photograph, so white type stays legible at any crop. */
        'photo-scrim':
          'linear-gradient(to right, rgba(8,32,63,0.94) 0%, rgba(8,32,63,0.84) 40%, rgba(8,32,63,0.40) 72%, rgba(8,32,63,0.15) 100%)',
        'photo-scrim-b':
          'linear-gradient(to top, rgba(8,32,63,0.92) 0%, rgba(8,32,63,0.55) 45%, rgba(8,32,63,0.10) 100%)',
        /** The red hairline that marks a section, fading at both ends. */
        'accent-rule':
          'linear-gradient(to right, rgba(227,30,36,0) 0%, #e31e24 16%, #ff4b50 50%, #e31e24 84%, rgba(227,30,36,0) 100%)',
        'accent-sheen':
          'linear-gradient(120deg, #b8151b 0%, #e31e24 38%, #ff4b50 52%, #e31e24 66%, #b8151b 100%)',
        /** A very soft blue wash for light sections that need lifting off white. */
        'paper-wash':
          'linear-gradient(180deg, #ffffff 0%, #f4f7fb 45%, #eef3f9 100%)',
      },

      keyframes: {
        'slide-up': { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'parallax-y': {
          from: { transform: 'translateY(-3%) scale(1.08)' },
          to: { transform: 'translateY(3%) scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'scroll-cue': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.45' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 240ms cubic-bezier(0.22, 1, 0.36, 1)',
        marquee: 'marquee 44s linear infinite',
        // Two rows at deliberately un-matched speeds. Identical durations make
        // the pair read as one rigid block sliding past; a difference of about
        // 20% is enough for them to feel independent without either drawing
        // attention to itself.
        'marquee-slow': 'marquee 58s linear infinite',
        'marquee-reverse': 'marquee-reverse 48s linear infinite',
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
