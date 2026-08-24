import Hero from '../sections/Hero.jsx'
import ProductGrid from '../sections/ProductGrid.jsx'
import { Highlights, Articles } from '../sections/Highlights.jsx'
import CalculatorBand from '../sections/CalculatorBand.jsx'
import TrustBand from '../sections/TrustBand.jsx'
import Process from '../sections/Process.jsx'
import DownloadBand from '../sections/DownloadBand.jsx'
import LenderWall from '../sections/LenderWall.jsx'
import Testimonial from '../sections/Testimonial.jsx'
import ContactStrip from '../sections/ContactStrip.jsx'

/**
 * Rebuilt PayYou Advisory Homepage
 * Rebuilt to 100% match the structural layout and section sequence of IDFC FIRST Bank:
 *
 * 1. Hero Carousel (Full-bleed interactive slider with live slide counter)
 * 2. Tab Rail & Coloured Product Tiles (Frosted glass category rail & vector art tiles)
 * 3. What Makes Us Special (Horizontal gradient highlights rail)
 * 4. Interactive Calculator Band (Full-bleed calculation tool with instant output)
 * 5. Track Record & Stats (Verified metrics with animated counters)
 * 6. 4-Step Process Sequence (Transparent file handling & data protection)
 * 7. Mobile & WhatsApp Connect (IDFC App equivalent instant advisory banner)
 * 8. Financial Literacy & Guides (Editorial article cards)
 * 9. Institutional Partner Wall (25+ Bank & NBFC marquee & assessment criteria)
 * 10. Customer Trust & Review (Verified testimonial)
 * 11. Conversion & Office Locations (Direct contact strip & branch locations)
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <Highlights />
      <CalculatorBand />
      <TrustBand />
      <Process />
      <DownloadBand />
      <Articles />
      <LenderWall />
      <Testimonial />
      <ContactStrip />
    </>
  )
}
