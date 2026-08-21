import PageHeader, { Section, SectionHead } from '../components/PageHeader.jsx'
import LenderWall from '../sections/LenderWall.jsx'
import ContactStrip from '../sections/ContactStrip.jsx'
import Disclosure from '../components/Disclosure.jsx'
import { PARTNER_COUNT_CLAIM, LENDERS } from '../data/lenders.js'

/**
 * The lender panel page.
 *
 * The old site had three URLs for this — /bank-nbfc-loan-partners/, /banks/ and
 * /nbfc/ — which is three pages competing for one intent. They are all
 * 301-redirected here (see LEGACY_REDIRECTS in src/routes.js), which
 * consolidates whatever authority they had accumulated rather than throwing it
 * away with three 404s.
 *
 * The section below the panel is the honest part: the difference between a bank
 * and an NBFC, written from the borrower's side. It is genuinely useful, it is
 * the sort of thing that earns links, and no competitor writes it because it
 * involves conceding that the cheaper option is not always available to you.
 */
export default function Lenders({ trail }) {
  return (
    <>
      <PageHeader
        eyebrow={`${PARTNER_COUNT_CLAIM} lending partners`}
        title="A panel, not a preference."
        standfirst="We are not tied to one lender, and the reason matters more than it sounds: the same file gets a different answer at different institutions. Knowing which is which before you apply is the entire service."
        trail={trail}
        photo="pune-aerial"
        aside={
          <dl className="grid grid-cols-2 gap-6 border border-paper/15 p-6">
            <Stat value={PARTNER_COUNT_CLAIM} label="Partner lenders" />
            <Stat value={String(LENDERS.length)} label="Named on this page" />
            <Stat value="1" label="You apply to" />
            <Stat value="0" label="Fee you pay us" />
          </dl>
        }
      />

      <LenderWall full />

      {/* ── Bank vs NBFC ────────────────────────────────────────────────── */}
      <Section size="md">
        <div className="container-page">
          <SectionHead
            title="Bank or NBFC. The difference from your side"
            standfirst="Not a question of which is better. They underwrite differently, and which one suits you depends almost entirely on how standard your profile is."
          />

          <div className="scroll-x">
            <table className="table-doc min-w-[40rem]">
              <thead>
                <tr>
                  <th scope="col" className="w-1/4">&nbsp;</th>
                  <th scope="col">Banks</th>
                  <th scope="col">NBFCs</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.criterion}>
                    <th scope="row" className="border-b border-ink/10 py-3.5 pr-4 text-left align-top text-[0.9375rem] font-semibold normal-case tracking-normal text-ink">
                      {row.criterion}
                    </th>
                    <td className="text-ink-soft">{row.bank}</td>
                    <td className="text-ink-soft">{row.nbfc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 max-w-prose border-t-2 border-accent pt-5 text-base leading-relaxed text-ink-soft">
            The practical rule: start with a bank if your profile is standard: salaried, clean
            credit, a well-titled flat in a mainstream project. Go to an NBFC when it is not, and
            treat the higher rate as the price of an approval you would not otherwise get. Refinance
            to a bank in two years once the record is established. That last step is the one almost
            nobody takes, and it is worth a great deal.
          </p>

          <Disclosure className="mt-10" />
        </div>
      </Section>

      <ContactStrip />
    </>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="fig block text-3xl font-semibold leading-none text-paper">{value}</span>
        <span className="mt-2 block text-2xs uppercase tracking-[0.12em] text-paper/50">{label}</span>
      </dd>
    </div>
  )
}

const COMPARISON = [
  {
    criterion: 'Interest rate',
    bank: 'Generally lower, and on home loans linked to the RBI repo rate so it moves with policy.',
    nbfc: 'Generally higher. The premium is for taking on files a bank’s policy will not.',
  },
  {
    criterion: 'Underwriting',
    bank: 'Policy-driven and rigid. A profile that does not fit a template is declined rather than discussed.',
    nbfc: 'More judgement, more flexibility. Cash income, thin credit files and unusual property are workable.',
  },
  {
    criterion: 'Property accepted',
    bank: 'Mainstream residential and commercial with clean, conventional title.',
    nbfc: 'Also MIDC leasehold, industrial sheds, godowns, Grampanchayat land and load-bearing structures.',
  },
  {
    criterion: 'Speed',
    bank: 'Slower. More checks, more layers, more queries.',
    nbfc: 'Materially faster, which for a business with a deadline is sometimes the only thing that matters.',
  },
  {
    criterion: 'Credit score',
    bank: 'Strict floors. Below them the application does not progress at all.',
    nbfc: 'Lower floors, priced accordingly. A route back for someone rebuilding a record.',
  },
  {
    criterion: 'Best used when',
    bank: 'Your profile is standard and you have time. This is the cheaper money.',
    nbfc: 'Your profile is not standard, or the timing matters more than the rate.',
  },
]
