import { resolve } from './routes.js'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import CtaBar from './components/CtaBar.jsx'

import Home from './pages/Home.jsx'
import LoansHub from './pages/LoansHub.jsx'
import Product from './pages/Product.jsx'
import ProductArea from './pages/ProductArea.jsx'
import Lenders from './pages/Lenders.jsx'
import About from './pages/About.jsx'
import Careers from './pages/Careers.jsx'
import Contact from './pages/Contact.jsx'
import Faq from './pages/Faq.jsx'
import Calculators from './pages/Calculators.jsx'
import Legal from './pages/Legal.jsx'
import Credits from './pages/Credits.jsx'
import NotFound from './pages/NotFound.jsx'

/**
 * The app shell.
 *
 * `path` is passed in rather than read from `window`, because this component
 * renders in two places: the browser, and `react-dom/server` at build time
 * where there is no window at all. One prop makes both work with no branching
 * and no `typeof window` checks scattered through the tree.
 *
 * ── Why this is not a client-side router ────────────────────────────────────
 * There is no history API, no link interception, no route transition. Every
 * internal link is a plain `<a href>` and causes a real navigation.
 *
 * That looks like a step backwards and is not, for this site specifically.
 * Every one of the ~140 pages is fully rendered to static HTML at build time
 * and served from a CDN edge, so a navigation is one cached document of about
 * 40 kB — which lands faster than a client-side route change that has to fetch
 * data anyway. It also means the site works with JavaScript disabled or still
 * loading, which for a page a borrower may be reading on a weak connection is
 * worth more than a transition animation. And it removes an entire class of
 * bug: there is no router state to desynchronise from the URL.
 */
export default function App({ path = '/' }) {
  const route = resolve(path)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>

      {/* `overlay` tells the bar whether there is a dark masthead beneath it to
          be transparent over. Every real route opens with one; the 404 does
          not, so there the bar stays solid and legible. */}
      <Nav path={path} overlay={Boolean(route)} />

      <main id="main" className="pb-[var(--bar-h)] lg:pb-0">
        {renderPage(route)}
      </main>

      <Footer />
      <CtaBar />
    </>
  )
}

function renderPage(route) {
  if (!route) return <NotFound />

  const trail = route.breadcrumbs

  switch (route.kind) {
    case 'home':
      return <Home />
    case 'loans-hub':
      return <LoansHub trail={trail} />
    case 'product':
      return <Product slug={route.params.product} trail={trail} />
    case 'product-area':
      return (
        <ProductArea
          productSlug={route.params.product}
          areaSlug={route.params.area}
          trail={trail}
        />
      )
    case 'lenders':
      return <Lenders trail={trail} />
    case 'about':
      return <About trail={trail} />
    case 'careers':
      return <Careers trail={trail} />
    case 'contact':
      return <Contact trail={trail} />
    case 'faq':
      return <Faq trail={trail} />
    case 'calculators':
      return <Calculators tool="all" trail={trail} />
    case 'calc-emi':
      return <Calculators tool="emi" trail={trail} />
    case 'calc-eligibility':
      return <Calculators tool="eligibility" trail={trail} />
    case 'calc-bt':
      return <Calculators tool="bt" trail={trail} />
    case 'legal':
      return <Legal slug={route.params.legal} trail={trail} />
    case 'credits':
      return <Credits trail={trail} />
    default:
      return <NotFound />
  }
}
