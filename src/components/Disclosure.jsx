/**
 * The "we are not a lender" block.
 *
 * Rendered on every product page and every locality page, directly beneath the
 * specification strip — that is, immediately after the numbers a reader might
 * otherwise mistake for an offer.
 *
 * Placement is the whole point. The category convention is to put this in the
 * footer at 10px, which is compliant in the narrowest sense and useless in
 * every other. Reference research on 2026 financial design is blunt about it:
 * buried legal copy now reads as a category weakness, and disclosure designed
 * as an editorial element reads as confidence. It is also the single strongest
 * E-E-A-T signal available to a firm this young.
 */
export default function Disclosure({ children, className = '' }) {
  return (
    <aside className={`disclosure ${className}`}>
      {children ?? (
        <>
          <strong className="font-semibold text-ink">PayYou Advisory is not a lender.</strong> We are
          a Direct Selling Agent: we prepare your file, identify which partner banks and NBFCs are
          likely to approve it, and manage the application. Sanction, interest rate and disbursal are
          the lender’s decision under its own credit policy. The figures above are indicative, not an
          offer. Our fee is paid by the lender on disbursal, not by you.
        </>
      )}
    </aside>
  )
}
