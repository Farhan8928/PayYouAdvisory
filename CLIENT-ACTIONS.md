# What we need from Kay Bee Bio-Organics before launch

Everything below is something only PayYou can supply or decide. Each is marked
`TODO(client)` at the exact place in the code where it lands.

The list is ordered by what it costs to get wrong.

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

1. **Google Search Console** — verify the domain, submit
   `https://payyouadvisory.com/sitemap.xml`, and check the Coverage report after
   ten days. All 136 URLs should be discovered; watch specifically for any
   locality page marked "Crawled — currently not indexed", which is the early
   signal that a page is reading as thin.
2. **Confirm the 12 legacy redirects** resolve. Every old URL is in the index
   today; a 301 passes that authority on, a 404 throws it away. `npm run
   audit:seo` checks they are configured, but only production can prove they
   work.
3. **Bing Webmaster Tools** — same sitemap. Bing does not reliably render
   JavaScript, which is precisely why every page here is prerendered.
4. **Google Business Profile** — the description should use the same language as
   the homepage, and the categories should be *Loan agency* and *Financial
   consultant*.
