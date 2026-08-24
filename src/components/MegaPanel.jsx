import { useState } from 'react'
import { MEGA, SUPPORT_PANEL } from '../data/megamenu.js'
import { CONTACT, waLink, WA_DEFAULT } from '../data/site.js'
import { telHref } from '../lib/format.js'
import Photo from './Photo.jsx'
import { ArrowRight, Phone, Whatsapp, Pin, ShieldCheck } from './Icon.jsx'
import { LINE_ART } from './LineArt.jsx'

/**
 * The mega-menu sheet, and the support sheet behind "Contact us".
 *
 * ── Structure, measured off the reference ──────────────────────────────────
 * A full-width white panel about 520px tall, in three parts: a grey category
 * rail on the left, two columns of links in the middle each under a heading
 * with a "View All →", and a "Discover" promo card on the right.
 *
 * ── Why the categories are hover-not-click ─────────────────────────────────
 * Because the rail is a filter on the panel, not navigation. Hovering swaps
 * the middle; nothing navigates until you choose an actual link. They are
 * still real `<button>`s with `aria-selected`, so the whole panel is operable
 * from a keyboard — a rail of hover-only `<div>`s would be invisible to a
 * screen reader and unreachable by tab, which is how most mega-menus on
 * banking sites are built and why most of them are inaccessible.
 *
 * ── The panel is always in the HTML ────────────────────────────────────────
 * Shown and hidden with `hidden`, never conditionally mounted. A crawler that
 * does not run JavaScript still sees every product URL, and on this site the
 * menu carries a large share of the internal linking. `npm run audit:seo`
 * checks every one of those hrefs resolves to a real route.
 */

const ICONS = {
  whatsapp: Whatsapp,
  phone: Phone,
  pin: Pin,
  shield: ShieldCheck,
  calculator: LINE_ART.calculator,
  doc: LINE_ART['doc-check'],
}

export default function MegaPanel({ group, open, onEnter, onLeave }) {
  const panel = MEGA[group]
  const [cat, setCat] = useState(0)
  if (!panel) return null

  const active = panel.categories[Math.min(cat, panel.categories.length - 1)]
  const single = panel.categories.length === 1

  return (
    <div
      hidden={!open}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="mega-sheet"
    >
      <div className="container-page grid gap-0 lg:grid-cols-12">
        {/* ── Category rail ─────────────────────────────────────────────── */}
        {!single ? (
          <div className="lg:col-span-3 lg:border-r lg:border-ink/10">
            <ul role="tablist" aria-label={`${group} categories`} className="py-5 pr-5">
              {panel.categories.map((c, i) => (
                <li key={c.label}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={i === cat}
                    onMouseEnter={() => setCat(i)}
                    onFocus={() => setCat(i)}
                    onClick={() => setCat(i)}
                    className="mega-cat"
                    data-active={i === cat}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* ── Link columns ──────────────────────────────────────────────── */}
        <div className={`${single ? 'lg:col-span-8' : 'lg:col-span-5'} py-7 lg:pl-9`}>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {active.columns.map((col) => (
              <div key={col.heading}>
                <div className="mb-4 flex items-baseline gap-3">
                  <h3 className="text-sm font-extrabold text-ink">{col.heading}</h3>
                  <a href={col.viewAll} className="mega-viewall">
                    View all
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
                <ul className="space-y-0.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <a href={l.href} className="mega-link">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Discover ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-4 lg:pl-9">
          <div className="py-7">
            <p className="mb-4 text-2xs font-bold uppercase tracking-[0.14em] text-ink-faint">
              Discover
            </p>
            <div className="overflow-hidden rounded-xl border border-ink/10 bg-paper-deep">
              <Photo name={active.discover.photo} ratio="16 / 9" sizes="24vw" />
              <div className="p-5">
                <p className="text-2xs font-bold uppercase tracking-[0.14em] text-accent">
                  {active.discover.eyebrow}
                </p>
                <p className="mt-2 text-base font-bold leading-snug text-ink">
                  {active.discover.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{active.discover.body}</p>
                <a href={active.discover.cta.href} className="btn-ghost btn-sm mt-4">
                  {active.discover.cta.label}
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * The support sheet behind "Contact us".
 *
 * The reference puts an app-download panel in the right-hand slot. PayYou has
 * no app, so that space carries what it does have — three offices somebody can
 * walk into — rather than a QR code pointing nowhere.
 */
export function SupportPanel({ open, onEnter, onLeave }) {
  return (
    <div hidden={!open} onMouseEnter={onEnter} onMouseLeave={onLeave} className="mega-sheet">
      <div className="container-page grid gap-8 py-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORT_PANEL.tiles.map((t) => {
              const Icon = ICONS[t.icon]
              const href =
                t.href === 'wa' ? waLink(WA_DEFAULT) : t.href === 'tel' ? telHref(CONTACT.landline) : t.href
              const external = t.href === 'wa'
              return (
                <li key={t.title}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="support-tile"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm font-bold text-ink">{t.title}</span>
                      <ArrowRight className="ml-auto h-3 w-3 shrink-0 text-ink-faint" />
                    </span>
                    <span className="mt-2 block text-xs leading-relaxed text-ink-soft">{t.body}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <div className="h-full rounded-xl border border-ink/10 bg-paper-deep p-6">
            <p className="text-base font-extrabold text-ink">Three offices you can walk into</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              A loan file is a paperwork exercise, and paperwork moves faster across a desk than over
              email.
            </p>
            <dl className="mt-5 space-y-3 border-t border-ink/10 pt-4">
              {[
                ['Chinchwad', 'Vishal Arcade, Chapekar Chowk'],
                ['Baramati', 'Branch office'],
                ['Phaltan', 'Branch office'],
              ].map(([place, line]) => (
                <div key={place} className="flex items-start gap-2.5">
                  <Pin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-sm font-bold text-ink">{place}</dt>
                    <dd className="text-xs text-ink-soft">{line}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <a href={telHref(CONTACT.landline)} className="btn-accent btn-sm fig mt-5 w-full">
              <Phone className="h-3.5 w-3.5" />
              {CONTACT.landlineDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
