import Hero from '../sections/Hero.jsx'
import TrustBand from '../sections/TrustBand.jsx'
import ProductList from '../sections/ProductList.jsx'
import LenderWall from '../sections/LenderWall.jsx'
import Process from '../sections/Process.jsx'
import EligibilityBand from '../sections/EligibilityBand.jsx'
import CalculatorTeaser from '../sections/CalculatorTeaser.jsx'
import Argument from '../sections/Argument.jsx'
import Testimonial from '../sections/Testimonial.jsx'
import FaqHome from '../sections/FaqHome.jsx'
import ContactStrip from '../sections/ContactStrip.jsx'

/**
 * The homepage.
 *
 * Section order is the argument in sequence: the one idea → proof we are real →
 * what we place → the panel that makes the idea work → how it runs → do the
 * arithmetic yourself → why a broker at all → someone who used it → the awkward
 * questions → the ask.
 *
 * ── Rhythm ─────────────────────────────────────────────────────────────────
 * The grounds alternate deliberately — photograph, paper-deep, paper, navy,
 * paper-deep, paper, paper, photograph, paper-deep, photograph — so no two
 * adjacent sections share a background, and three full-bleed photographs are
 * spaced far enough apart that none of them is competing with another.
 *
 * The vertical padding varies too. A page where every section is the same
 * height on the same white reads as a template no matter how good the
 * individual sections are, and that flatness was the specific thing the client
 * rejected in the first version of this site.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <EligibilityBand />
      <ProductList />
      <LenderWall />
      <Process />
      <CalculatorTeaser />
      <Argument />
      <Testimonial />
      <FaqHome />
      <ContactStrip />
    </>
  )
}
