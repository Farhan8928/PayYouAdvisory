/**
 * The photography manifest.
 *
 * ── How this works ─────────────────────────────────────────────────────────
 * `npm run images` downloads every source below once, resizes each into a
 * 480 / 960 / 1600 WebP set, extracts a tiny blurred placeholder, and writes
 * `src/data/images.gen.js`. The site then serves them from its own origin.
 *
 * Nothing is hot-linked. That matters for three reasons: the Content Security
 * Policy in vercel.json can stay locked to `img-src 'self' data:`; the images
 * are cached immutably on the same CDN edge as the HTML rather than costing a
 * second DNS lookup and TLS handshake to a third party; and the site does not
 * break the day someone else's CDN changes a URL.
 *
 * ── Licensing ──────────────────────────────────────────────────────────────
 * All sources are from Unsplash, under the Unsplash License — free for
 * commercial use, no permission required. Credit is not required by the licence
 * but is published anyway at /photo-credits/, because a financial firm quietly
 * using photography it has not paid for reads badly if anyone checks.
 *
 * TODO(client): these are placeholders in the honest sense — they are correct,
 * licensed and well-chosen, but they are not PayYou. Real photographs of the
 * Chapekar Chowk office, the team and actual disbursals will outperform every
 * one of them, because they are true. Swapping one is a two-line change here.
 *
 * ── Choosing a replacement ─────────────────────────────────────────────────
 * `focal` sets `object-position`, so a face or a subject stays in frame when
 * the crop is tall on a phone and wide on a desktop. Set it deliberately; the
 * default of `center` decapitates people in 16:9 crops.
 */

export const PHOTOS = {
  // ── Hero and site-wide ──────────────────────────────────────────────────
  'hero-advisory': {
    src: 'https://images.unsplash.com/photo-1698047682091-782b1e5c6536',
    alt: 'A loan adviser and a client shaking hands across a desk after agreeing terms',
    focal: '50% 42%',
  },
  /* ── 'consult-desk' was removed on 24 Aug 2026 ──────────────────────────
     The photograph showed a real office with "AXIS BANK | PUNE" signage
     legible on the glass, twice. It had been in use in six places, including
     the Discover card in the Borrow mega-menu.

     A competitor's branded premises on a loan advisory's own site is not a
     small thing: it implies an association that does not exist, it puts
     another company's trade mark on PayYou's pages, and to a reader who
     recognises it the whole site looks borrowed.

     Every photograph here is licensed stock of a real place, so this is a
     standing risk rather than a one-off. Before adding one, look at it at full
     size and read every sign, screen and lanyard in it. The alt text is not a
     substitute for looking. */

  'review-documents': {
    src: 'https://images.unsplash.com/photo-1775163024488-e88e4a71179f',
    alt: 'Two people reviewing loan documents together at a table',
    focal: '50% 50%',
  },
  'meeting-india': {
    src: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2',
    alt: 'A team meeting in progress around a table in an Indian office',
    focal: '50% 40%',
  },
  'team-office': {
    src: 'https://images.unsplash.com/photo-1565946606128-949cfcbebd3e',
    alt: 'Colleagues seated around a table in a working office',
    focal: '50% 40%',
  },
  'office-window': {
    src: 'https://images.unsplash.com/photo-1761818645943-a3689c34ca03',
    alt: 'A modern office desk beside a window overlooking the city',
    focal: '50% 50%',
  },
  'calculator-papers': {
    src: 'https://images.unsplash.com/photo-1625225233840-695456021cde',
    alt: 'A calculator and pen resting on printed financial statements',
    focal: '50% 50%',
  },

  // ── Products ────────────────────────────────────────────────────────────
  'personal-loan': {
    src: 'https://images.unsplash.com/photo-1780329943665-ac2d6784e956',
    alt: 'A family of five standing together outdoors',
    focal: '50% 35%',
  },
  'business-loan': {
    src: 'https://images.unsplash.com/photo-1764115424737-25aca6f47835',
    alt: 'A business owner standing in his industrial workshop among machinery',
    focal: '50% 45%',
  },
  'home-loan': {
    src: 'https://images.unsplash.com/photo-1689574120966-c7b1e57a8cfe',
    alt: 'Two newly built residential towers against the sky',
    focal: '50% 50%',
  },
  'loan-against-property': {
    src: 'https://images.unsplash.com/photo-1674821770946-4f774b1907d7',
    alt: 'A view across a city of commercial and residential property from a high floor',
    focal: '50% 55%',
  },
  'car-loan': {
    src: 'https://images.unsplash.com/photo-1653565217811-85b41bcd1edb',
    alt: 'A hand holding the keys to a new car',
    focal: '50% 50%',
  },
  'gold-loan': {
    src: 'https://images.unsplash.com/photo-1758995116383-f51775896add',
    alt: 'A stack of ornate gold bangles on a dark surface',
    focal: '50% 50%',
  },
  'working-capital-loan': {
    src: 'https://images.unsplash.com/photo-1721937127582-ed331de95a04',
    alt: 'A warehouse stacked with palletised stock awaiting despatch',
    focal: '50% 50%',
  },
  insurance: {
    src: 'https://images.unsplash.com/photo-1749065311606-fa115df115af',
    alt: 'One hand holding another in a gesture of reassurance',
    focal: '50% 50%',
  },

  // ── Places ──────────────────────────────────────────────────────────────
  'pune-aerial': {
    src: 'https://images.unsplash.com/photo-1705955463252-e3f670e4041b',
    alt: 'An aerial view across Pune’s high-rise skyline',
    focal: '50% 50%',
  },
  'pune-street': {
    src: 'https://images.unsplash.com/photo-1614716194506-ef3694ae131a',
    alt: 'A busy Pune street with people walking during the day',
    focal: '50% 45%',
  },
  'pune-skyline-dusk': {
    src: 'https://images.unsplash.com/photo-1697135376181-f6b7aac6caf6',
    alt: 'The sun setting behind a city skyline of tall buildings',
    focal: '50% 55%',
  },
  'industrial-belt': {
    src: 'https://images.unsplash.com/photo-1579107821380-a2f5df32d67f',
    alt: 'A lathe on the floor of a small engineering unit',
    focal: '50% 50%',
  },
  'agriculture-belt': {
    src: 'https://images.unsplash.com/photo-1606711387932-5ba25bbad5e6',
    alt: 'A tractor working a field in the agricultural belt outside Pune',
    focal: '50% 55%',
  },
  'logistics-yard': {
    src: 'https://images.unsplash.com/photo-1672552226604-4ab36b7e5ca6',
    alt: 'Goods stacked in a distribution warehouse',
    focal: '50% 50%',
  },

  // ── Careers ─────────────────────────────────────────────────────────────
  careers: {
    src: 'https://images.unsplash.com/photo-1776248783518-400b6d0da64c',
    alt: 'A group of colleagues in a conference room',
    focal: '50% 40%',
  },
}

/**
 * Which photograph leads each locality page.
 *
 * Assigned by what the area actually is — Bhosari and Chakan get the industrial
 * belt, Baramati and Phaltan get agriculture, Moshi gets logistics — rather
 * than rotated arbitrarily. A page about funding an MIDC shed that opens with a
 * photograph of a skyline is a page that was assembled rather than made.
 */
export const AREA_PHOTO = {
  pimpri: 'pune-street',
  chinchwad: 'pune-street',
  nigdi: 'pune-aerial',
  akurdi: 'industrial-belt',
  bhosari: 'industrial-belt',
  chakan: 'industrial-belt',
  wakad: 'pune-aerial',
  hinjewadi: 'office-window',
  ravet: 'home-loan',
  moshi: 'logistics-yard',
  'talegaon-dabhade': 'agriculture-belt',
  baner: 'pune-skyline-dusk',
  kothrud: 'pune-street',
  hadapsar: 'pune-aerial',
  baramati: 'agriculture-belt',
  phaltan: 'agriculture-belt',
}
