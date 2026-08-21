import { inrCompact, pct } from '../lib/format.js'

/**
 * The rate / amount / tenure / security strip that appears under every product
 * name, and in the product list on the homepage.
 *
 * The whole design argument of this site is here in miniature: a reader can
 * scan one column of tabular figures and compare seven products, instead of
 * reading seven paragraphs of adjectives. See DESIGN.md § The figure rule.
 *
 * Where the client has not published a figure, this renders what the number
 * *depends on* rather than a plausible invention — `spec.rateFrom` is `null`
 * on five of the eight products and that is deliberate, not unfinished.
 */
export default function SpecStrip({ spec, columns = 4, layout = 'row', className = '' }) {
  // Label and value are chosen together — see the note in SpecInline below.
  const cells = [
    spec.rateFrom
      ? {
          label: 'Interest from',
          value: pct(spec.rateFrom),
          note: 'per annum, lowest across the panel',
        }
      : {
          label: 'Interest rate',
          value: 'By profile',
          note: 'lenders price to your file',
        },
    {
      label: 'Amount',
      value: spec.amountMax ? `up to ${inrCompact(spec.amountMax)}` : 'By eligibility',
      note: spec.amountNote,
    },
    { label: 'Tenure', value: spec.tenure, note: null },
    { label: 'Security', value: spec.security, note: null },
  ].slice(0, columns)

  /**
   * `layout` picks the grid rather than the caller passing extra grid classes.
   *
   * Overriding from outside looked tidier and is a trap: `lg:grid-cols-4` from
   * here and `lg:grid-cols-2` from a caller both compile, and which one wins is
   * decided by their order in the generated stylesheet rather than by the order
   * they appear in the class string. That resolves one way in development and
   * can resolve the other after a rebuild reorders the CSS.
   */
  const grids = {
    row: 'sm:grid-cols-2 lg:grid-cols-4',
    pair: 'sm:grid-cols-2',
    third: 'sm:grid-cols-3',
  }

  return (
    <div className={`spec-grid ${grids[layout] ?? grids.row} ${className}`}>
      {cells.map((c) => (
        <div key={c.label} className="spec-cell">
          <span className="spec-label">{c.label}</span>
          <span className="spec-value">{c.value}</span>
          {c.note ? (
            <span className="mt-1 block text-2xs leading-snug text-ink-faint">{c.note}</span>
          ) : null}
        </div>
      ))}
    </div>
  )
}

/**
 * The compact two-figure form used in the homepage product list, where a full
 * four-cell strip would overwhelm the row it belongs to.
 */
export function SpecInline({ spec }) {
  /**
   * The label changes with the value, rather than the value being squeezed
   * under a fixed label. "From · 10.50%" reads correctly; "From · By profile"
   * and "Up to · Eligibility" do not — they are two half-sentences colliding.
   * Since five of the eight products have no published rate and six have no
   * published ceiling, the unpublished case is the common one and has to read
   * as well as the published one.
   */
  const pairs = [
    spec.rateFrom
      ? { label: 'From', value: pct(spec.rateFrom) }
      : { label: 'Rate', value: 'By profile' },
    spec.amountMax
      ? { label: 'Up to', value: inrCompact(spec.amountMax) }
      : { label: 'Amount', value: 'By eligibility' },
    { label: 'Tenure', value: spec.tenure },
  ]

  return (
    <dl className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
      {pairs.map((p) => (
        <div key={p.label} className="flex items-baseline gap-2">
          <dt className="text-2xs uppercase tracking-[0.12em] text-ink-faint">{p.label}</dt>
          <dd className="fig text-sm font-semibold text-ink">{p.value}</dd>
        </div>
      ))}
    </dl>
  )
}
