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

## 6. Photographs — **the biggest visible upgrade available**

The site ships with **no photography, deliberately**. A stock photograph of a
smiling couple holding house keys is the single clearest signal that a business
has nothing real to show, and it is on every competitor's site in Pune. Where
they put a stock photo, this site puts a number, a table or a chart.

Real photographs would beat all of it. What would earn its place:

- The Chapekar Chowk office — exterior with signage, and the interior
- The team at work, faces visible, not posed
- The Baramati and Phaltan offices
- Sachin Yadav, a proper portrait

Please avoid: anything from a stock library, and anything AI-generated. Both are
recognisable and both cost more trust than they buy.

*Lands in:* a new `public/images/` set; `DESIGN.md § On photography` has the
rules for how they would be used.

---

## 7. Genuine job vacancies, if there are any

`/careers/` deliberately carries **no `JobPosting` structured data**. Marking up
an evergreen "we're always hiring" page as a live posting is a documented
structured-data violation that gets a site removed from Google Jobs entirely —
the build fails if anyone adds it.

If there is a real opening — a title, a location, a posting date and a closing
date — send it and the schema goes in properly. Google Jobs is a large amount of
free, high-intent traffic for "financial advisor jobs Pune".

*Lands in:* `src/pages/Careers.jsx`

---

## 8. Reviews

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

## 9. Legal review

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
