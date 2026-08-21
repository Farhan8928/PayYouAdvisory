import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

const container = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <App path={window.location.pathname} />
  </React.StrictMode>
)

/**
 * Hydrate the prerendered markup rather than replacing it.
 *
 * `npm run build` server-renders every route into `#root` (scripts/prerender.mjs),
 * so in production the container already holds the correct DOM before any
 * JavaScript runs. `createRoot().render()` would throw all of it away and
 * rebuild from scratch — wasted work on exactly the mid-range Android phones
 * most of this audience reads on, plus a visible flash of re-layout.
 *
 * The dev server does not prerender, so the container is empty there and the
 * normal client render path is taken.
 */
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, tree)
} else {
  ReactDOM.createRoot(container).render(tree)
}

/**
 * Prefetch a page on hover or touch.
 *
 * Navigation is a real page load (see the note in App.jsx), which is fast
 * because every page is static — but it still costs one round trip. Warming the
 * cache the moment a pointer settles on a link removes most of that: a reader
 * hovers for 100–300 ms before clicking, which is usually enough time to have
 * the document already.
 *
 * Guarded so it never becomes a cost of its own: same-origin links only, one
 * prefetch per URL ever, and nothing at all on a connection the browser reports
 * as slow or metered — prefetching on a 2G connection spends someone's data on
 * a page they may not open.
 */
const prefetched = new Set()
const connection = navigator.connection
const frugal =
  connection && (connection.saveData || /2g/.test(connection.effectiveType || ''))

function prefetch(event) {
  if (frugal) return
  const link = event.target.closest?.('a[href^="/"]')
  if (!link) return

  const href = link.getAttribute('href')
  if (!href || href.startsWith('//') || prefetched.has(href)) return
  prefetched.add(href)

  const tag = document.createElement('link')
  tag.rel = 'prefetch'
  tag.href = href
  tag.as = 'document'
  document.head.appendChild(tag)
}

document.addEventListener('pointerenter', prefetch, { capture: true, passive: true })
document.addEventListener('touchstart', prefetch, { capture: true, passive: true })
