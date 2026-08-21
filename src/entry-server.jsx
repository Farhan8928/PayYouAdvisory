import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'
import { ROUTES, resolve } from './routes.js'

/**
 * Build-time server-render entry point, used only by scripts/prerender.mjs.
 *
 * It does not import the stylesheet — Vite emits that from the client build and
 * the prerenderer only wants markup.
 *
 * `routes()` is re-exported so the prerenderer takes its list of pages from the
 * *same module instance* that renders them. Node could import `src/routes.js`
 * directly — it is plain JavaScript — but then the list of pages to write and
 * the table `App` resolves against would be two separate module graphs, free to
 * disagree after a bad merge. Taking both from one bundle makes "wrote a page
 * the app cannot render" structurally impossible rather than merely unlikely.
 */
export function render(path) {
  return renderToString(<App path={path} />)
}

/**
 * The 404 page, baked into dist/404.html so a hard 404 needs no JavaScript.
 *
 * Rendered through the full `App` shell against a path that deliberately
 * matches no route, rather than by rendering `<NotFound />` alone. Someone who
 * lands here followed a stale link and is not lost so much as misdirected —
 * they need the navigation and the phone number more than most visitors, not
 * less. `NotFound` is imported anyway so this file fails loudly if that
 * component is ever removed.
 */
export function renderNotFound() {
  void NotFound
  return renderToString(<App path="/page-not-found" />)
}

export function routes() {
  return ROUTES.map((r) => ({
    path: r.path,
    kind: r.kind,
    title: r.title,
    description: r.description,
    keywords: r.keywords ?? [],
    priority: r.priority,
    changefreq: r.changefreq,
    jsonLd: r.jsonLd,
  }))
}

export { resolve }
