/**
 * The homepage hero slides.
 * Structured to match IDFC FIRST Bank's hero layout:
 * - Dynamic slide badge / tag
 * - High-impact multi-line headline with custom colored accent span
 * - Informative standfirst
 * - Dual call-to-action buttons
 * - Custom 3D render artwork + SVG scene fallback
 */

export const HERO_SLIDES = [
  {
    id: 'compare',
    badge: 'POPULAR CHOICE',
    eyebrow: '25+ Banks & NBFCs · Single Application',
    headline: ['Twenty-five lenders.', 'One application.'],
    accentLine: 1,
    standfirst:
      'Apply to eight banks yourself and you collect eight hard CIBIL enquiries. We pre-assess which partner lender approves your file at the lowest interest rate, then submit once.',
    primary: { label: 'Check Your Eligibility', href: '/eligibility-calculator/' },
    secondary: { label: 'Explore 25+ Partners', href: '/lenders/' },
    scene: 'coin',
    image: '/images/hero-slide-1.jpg',
    // Generated with Veo, then processed: AAC track stripped, the "Veo"
    // watermark cropped out of the lower right, and cut to the band's aspect
    // plus a portrait version for phones. See deliverables/HERO-ASSETS-BRIEF.md.
    video: {
      desktop: '/hero/compare-desktop.mp4',
      mobile: '/hero/compare-mobile.mp4',
    },
    poster: '/hero/compare-poster.jpg',
    // Loops, as the reference site's do — every one of theirs carries
    // `loop: true`. The generated clip was a resolve rather than a cycle, so
    // looping it raw snapped the finished coin back into scattered discs. The
    // file is now a ping-pong built with ffmpeg: converge, hold 1.2s on the
    // coin, disperse in reverse. Last frame and first frame differ by 0.99 on
    // a 0-255 luma scale, so the seam is invisible.
  },
  {
    id: 'home',
    badge: 'STARTING 8.40% P.A.',
    eyebrow: 'Home Loans · Fast Disbursals',
    headline: ['Get your sanction', 'before you book.'],
    accentLine: 1,
    standfirst:
      'A pre-approved sanction letter gives you exact purchasing power and negotiation leverage with builders across Pune and PCMC. 75% to 90% property value financing.',
    primary: { label: 'Explore Home Loans', href: '/home-loan/' },
    secondary: { label: 'Calculate EMI', href: '/home-loan-emi-calculator/' },
    scene: 'keys',
    image: '/images/hero-slide-2.jpg',
    video: null,
    poster: null,
  },
  {
    id: 'business',
    badge: 'UP TO ₹2 CRORE',
    eyebrow: 'MSME & Business Finance',
    headline: ['Your bank statement', 'is your qualification.'],
    accentLine: 1,
    standfirst:
      'For unsecured business credit lines and machinery loans, banking transactions tell the story. Get evaluated on cash flow and GST returns without unnecessary collateral.',
    primary: { label: 'Business Loans', href: '/business-loan/' },
    secondary: { label: 'Apply Without ITR', href: '/business-loan-without-itr/' },
    scene: 'chart',
    image: '/images/hero-slide-3.jpg',
    video: null,
    poster: null,
  },
  {
    id: 'transparent',
    badge: '100% PRIVATE',
    eyebrow: 'Instant Browser Calculators',
    headline: ['Do the arithmetic', 'before sharing PAN.'],
    accentLine: 1,
    standfirst:
      'Seven financial calculators computed entirely in your browser with zero data logging, no OTP gates, and zero spam calls. Transparent financial planning made simple.',
    primary: { label: 'Open All Calculators', href: '/calculators/' },
    secondary: { label: 'Compare Interest Rates', href: '/interest-rate-comparison/' },
    scene: 'shield',
    image: '/images/hero-slide-4.jpg',
    video: null,
    poster: null,
  },
]
