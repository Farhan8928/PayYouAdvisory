# What we need from Kay Bee Bio-Organics before launch

Everything below is something only PayYou can supply or decide. Each is marked
`TODO(client)` at the exact place in the code where it lands.

The list is ordered by what it costs to get wrong.

---

## 0. Decisions raised by your page specification of 24 August 2026

The site has been rebuilt to the structure in *PAYYOUADVISORY Website Pages*.
Four items in that document could not be built truthfully without input from
you, and two pages were removed because the document does not list them. Both
sets need a decision.

### Three pages we did not build as specified

**"Interest Rate Comparison (all lenders, all products)."** Building this means
publishing roughly two hundred live rate figures across twenty-five lenders.
None of them is a figure PayYou has published, all of them change without
notice, and a borrower who telephones a bank and finds our number stale has good
reason to distrust everything else on the site.

What is live instead is `/interest-rate-comparison/`, which teaches a reader to
read an offer: flat versus reducing basis, what the annual percentage rate
includes, which fees sit outside the headline. That page is durable and does not
go stale.

To ship the live table we need: your current rate sheets from each lender, in
writing; a named person who owns updating them; and an agreed review frequency.
Without the third, the table becomes a liability within a quarter.

**"Today's gold interest rate."** A rate that changes daily needs a live data
source, not a page. `/gold-loan-interest-rates/` explains how gold loans are
actually priced instead — purity and net weight, why making charges raise
nothing, and the RBI cap of 75% loan-to-value, which is published regulation
rather than a figure we invented. If you want a live rate, tell us where the
number should come from.

**"CIBIL / Credit Score Check."** Checking a score requires a bureau
integration, a commercial agreement with the bureau and consent handling for
personal data. That is a project rather than a page. The "improve your score"
guide you asked for is live at `/credit-score/`. Say the word if you want us to
scope the bureau integration separately.

### One question about the Investments section

The specification asks for fixed deposits, recurring deposits, savings and
current accounts. Those pages are live at `/investments/` and beneath it.

**They are written as referral, not as deposit-taking.** Every page states that
PayYou arranges these with partner banks and finance companies, that the deposit
is held by the institution in your name, and that PayYou does not accept
deposits or manage money. That framing is deliberate: PayYou's DSA appointment
covers loans, and distributing deposits or opening accounts is a different
arrangement.

**What we need:** confirmation of what your actual arrangement is with the
institutions for deposits and account opening. If there is a distribution or
referral agreement, we will name it. If there is not, this section should not be
live at all, and it is better to find that out now than after it is indexed.

### Two pages removed, and our recommendation on one of them

Following the specification exactly, four pages were removed: the FAQ hub, photo
credits, the cookie policy and the grievance redressal page. All four now 301
to the nearest equivalent, so no accumulated search value is lost.

**We recommend putting grievance redressal back.** A disclosed grievance
mechanism with a named officer and an escalation path is expected of a financial
intermediary in India, and its absence is the kind of thing that is noticed by
exactly the wrong audience. It is one line to restore. The cookie policy matters
less now that the privacy policy absorbs it, and photo credits was courtesy
rather than obligation.

---

## 1. Resolve a contradiction on the current site — **blocking**

The existing payyouadvisory.com says two things that cannot both be true:

| Where | Claim |
|---|---|
| Homepage | "5 years of experience", "100+ loans processed" |
| About page | Incorporated **January 2026**, "50+ customers", "₹20 Crore+ facilitated" |

Incorporation dates are public record at the MCA. In lending — which Google
classifies as **YMYL** ("Your Money or Your Life") and holds to its strictest
accuracy standard — a claim a reader can disprove costs far more than a smaller
true number earns. A competitor, a disgruntled applicant or a quality rater can
check this in ninety seconds.

**The new site uses the conservative set** (₹20 Cr+, 25+ partners, 3 offices).

What we need: confirmation of the real figures. If the five years refers to the
*founding team's* experience rather than the company's, say exactly that — "a
team with 5+ years in lending" is both true and stronger than an ambiguous badge.

*Lands in:* `src/data/site.js` → `STATS`

---

## 2. Registration numbers — **high value, low effort**

- **CIN** (Corporate Identity Number)
- **GSTIN**
- **IRDAI licence number**, if insurance is placed under one

These go in the footer of every page. A registration number a reader can verify
on a government portal is worth more than every adjective on the site put
together, and it is one of the specific things Google's quality raters look for
on a YMYL site. Right now the site has none, which is the single largest gap in
its credibility.

*Lands in:* `src/data/site.js` → `COMPANY`

---

## 3. A named Grievance Officer — **high value, low effort**

The site has a full `/grievance-redressal/` page with a four-step escalation
path ending at the RBI Ombudsman. It currently names the general office contact
at every step.

We need a **name** and ideally a dedicated email. A named person accountable for
complaints is something a legitimate advisory can publish and a fly-by-night
intermediary cannot, and it costs nothing.

*Lands in:* `src/data/legal.js` → `grievance-redressal`

---

## 4. The exact Google Business Profile pin

The site's geo tags and `LocalBusiness` schema currently use coordinates for
Chapekar Chowk, Chinchwad. They are close, but they must match the **verified
GBP pin to the decimal** — a mismatch between the site, the profile and the
directory listings quietly weakens local ranking, and local ranking is where
most of this business's traffic will come from.

Please send: the GBP listing link, and confirmation that the address on it reads
character-for-character the same as the site's.

*Lands in:* `src/data/site.js` → `OFFICES[0].geo`

---

## 5. The full lender panel

The site claims "25+ lending partners" — PayYou's own published figure — and
names **17**, because 17 are named on the current site.

Every named lender is a searchable entity and an E-E-A-T signal; eight unnamed
ones are worth nothing. Please send the remaining names, and confirm the 17
already listed are current.

Also worth confirming: what each one is genuinely good for. The lenders page
carries a line per institution, which is the thing that makes it a useful page
rather than a trust badge. We drafted those from public positioning — your desk
will know better.

*Lands in:* `src/data/lenders.js`

---

## 6. Logo files — **small ask, visible payoff**

The site now uses your real logo, downloaded from payyouadvisory.com. The file
there is **166 × 72 pixels**, which is small for the job it is doing. Three
things would each fix something specific:

| What | Fixes |
|---|---|
| **The original vector** (AI / EPS / SVG) | The header logo is the most-seen graphic on the site. At 166px wide it is soft on any retina screen; a vector is crisp at every size forever. |
| **A reversed (white / knockout) version** | The mark is blue on transparency, so on dark sections it currently sits on a white chip, and the navigation bar has to be white rather than transparent over the hero. A reversed version removes both constraints. |
| **A square app-icon version** | The browser-tab icon and the Android home-screen icon are currently the full wide wordmark squeezed into a square — legible at 192px, a smudge at 16px. The swoosh alone, or a "P" monogram drawn properly, would be unmistakable at any size. |

All three are a short conversation with whoever designed the mark.

---

## 7. Permission to use the lenders' marks

The partner wall shows twelve bank and NBFC logos — the same files already
published on your current site, so nothing new is being claimed. Worth
confirming anyway: **most DSA agreements permit use of the lender's mark on
marketing material, and a few require prior written approval of the creative.**

It is a five-minute question to each relationship manager and it is much better
asked before launch than after. If any lender declines, removing that tile is a
one-line change in `src/data/lenders.js` — the name stays in the written index
below the wall.

Also worth noting: five partners (ICICI, Union Bank, HSBC, Shriram,
Cholamandalam) have no logo file on your current site, so they appear as names
rather than marks. Send those files and they join the wall.

---

## 8. Photographs — **the biggest visible upgrade available**

The site currently carries **22 licensed stock photographs** (Unsplash License,
free for commercial use, credited at `/photo-credits/`). They are correctly
sourced and well-chosen — and they are not PayYou.

Real photographs would beat every one of them, because they would be true. What
would earn its place:

- The Chapekar Chowk office — exterior with signage, and the interior
- The team at work, faces visible, not posed
- A real client meeting, with permission
- The Baramati and Phaltan offices
- Sachin Yadav, a proper portrait

Anything usable off a decent phone in good light is enough; this does not need a
studio. Please avoid anything AI-generated — it is recognisable, and on a
financial site being caught costs more than the image could earn.

*Lands in:* `src/data/photos.js`. Swapping one is a two-line change, then
`npm run images`.

---

## 9. Genuine job vacancies, if there are any

`/careers/` deliberately carries **no `JobPosting` structured data**. Marking up
an evergreen "we're always hiring" page as a live posting is a documented
structured-data violation that gets a site removed from Google Jobs entirely —
the build fails if anyone adds it.

If there is a real opening — a title, a location, a posting date and a closing
date — send it and the schema goes in properly. Google Jobs is a large amount of
free, high-intent traffic for "financial advisor jobs Pune".

*Lands in:* `src/pages/Careers.jsx`

---

## 10. Reviews

`RATING.show` in `src/data/site.js` is **false**, and the JSON-LD carries no
`aggregateRating`. Publishing a rating the business has not earned is a Google
structured-data violation that can attract a manual action.

Once the Google Business Profile has genuine reviews, flip that flag and fill in
the real score and count — matching the profile exactly — and the rating appears
in the trust band and the schema automatically.

Getting there is the highest-return marketing action available to this business
right now. Fifty real reviews on the GBP will do more for enquiries than any
change to this website.

---

## 11. Legal review

The five policy pages — privacy, terms, disclaimer, cookies, grievance — are
drafted to describe how a DSA actually operates and to be plain enough that
someone will read them. **They should be reviewed by a lawyer before launch.**

Specific items to confirm with counsel:

- The data-retention period actually operated (§ "How long we keep it")
- The full list of third parties data is shared with, beyond partner lenders
- Whether the insurance vertical requires additional IRDAI-mandated disclosures
- That the fee description matches the actual DSA agreements

*Lands in:* `src/data/legal.js`

---

## Post-launch, in the first week

0. **Point payyouadvisory.com at this site — first.**

   The site is currently deployed at `https://pay-you-advisory.vercel.app`, and
   every canonical, sitemap entry and JSON-LD URL now names that address. That
   is correct for a live preview and wrong as a destination: while it is
   indexable it is a complete duplicate of what will eventually sit on
   payyouadvisory.com, and two identical sites competing for the same searches
   costs both of them.

   Two ways to close it, either is fine:

   - **Attach the real domain** in Vercel, then change `SITE_URL` in
     `src/data/site.js` back to `https://payyouadvisory.com` and rebuild. That
     one line drives every canonical, the sitemap, robots.txt, llms.txt and all
     structured data — `npm run audit:seo` fails the build if any of them
     disagree, so it cannot half-apply.
   - **Or tell me and I will add `noindex`** to the Vercel deployment, so it
     stays available for review without competing with the real domain.

1. **Google Search Console** — verify the domain, submit `/sitemap.xml`, and
   check the Coverage report after ten days. All 137 URLs should be discovered;
   watch specifically for any locality page marked "Crawled — currently not
   indexed", which is the early signal that a page is reading as thin.
2. **Confirm the 12 legacy redirects** resolve. Every old URL is in the index
   today; a 301 passes that authority on, a 404 throws it away. `npm run
   audit:seo` checks they are configured, but only production can prove they
   work.
3. **Bing Webmaster Tools** — same sitemap. Bing does not reliably render
   JavaScript, which is precisely why every page here is prerendered.
4. **Google Business Profile** — the description should use the same language as
   the homepage, and the categories should be *Loan agency* and *Financial
   consultant*.
