import { useEffect, useState } from 'react'
import { CONTACT, waLink, WA_DEFAULT } from '../data/site.js'
import { telHref } from '../lib/format.js'
import { Phone, Whatsapp } from './Icon.jsx'

/**
 * The sticky call bar, mobile only.
 *
 * Phones are where this audience reads the site and a phone call is the
 * conversion, so the two controls that start one are pinned. Desktop already
 * has the number in the header and does not need a bar eating 68px of a
 * 1440px viewport.
 *
 * It appears after 500px of scroll rather than immediately, so it does not
 * cover the hero's own call button on first paint — two competing calls to
 * action stacked on top of each other convert worse than one.
 *
 * `--bar-h` in the base stylesheet reserves the matching space at the foot of
 * `<main>`, so the bar never sits on top of the last line of the footer.
 */
export default function CtaBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 animate-slide-up border-t border-ink/15 bg-paper/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <a href={telHref(CONTACT.landline)} className="btn-primary w-full">
          <Phone className="h-4 w-4" />
          Call the office
        </a>
        <a
          href={waLink(WA_DEFAULT)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full"
        >
          <Whatsapp className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
