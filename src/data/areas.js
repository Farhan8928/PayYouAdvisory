/**
 * Service areas, used to generate the product x locality landing pages.
 *
 * ── Why these pages are not doorway pages ───────────────────────────────────
 * A grid of location pages is the fastest way to get a site demoted. Google's
 * guidance on doorway pages describes exactly the usual implementation: many
 * near-identical pages differing only by a place name, funnelling to the same
 * destination and adding nothing a reader could use.
 *
 * The defence is not clever templating, it is genuine difference. Every area
 * below carries its own `profile` — who actually borrows there and why — its
 * own landmarks and pincodes, and its own `relevance` map explaining what that
 * locality's borrowers specifically run into on each product. Bhosari and
 * Chakan are MIDC belts where the live question is a loan against an industrial
 * shed; Hinjewadi is salaried IT where it is a home loan on an approved-project
 * list; Baramati is agri-processing where seasonality drives the working-capital
 * cycle. Those are different pages because they are different problems.
 *
 * If you add an area, write the `profile` and `relevance` entries properly. An
 * area with generic filler copy is worse than no page at all — it drags the
 * whole grid's quality signal down with it.
 *
 * Pincodes are load-bearing: they appear in the page copy and in the JSON-LD
 * `areaServed`, and they are how a searcher confirms you actually cover them.
 */

const BASE_AREAS = [
  {
    slug: 'pimpri',
    name: 'Pimpri',
    district: 'Pune',
    pincodes: ['411017', '411018'],
    landmarks: ['Pimpri Chowk', 'Dr. D. Y. Patil campus', 'Pimpri Market', 'Nashik Phata'],
    profile:
      'PCMC’s commercial core: wholesale and retail traders, a dense strip of small shops around Pimpri Market, and salaried staff from the hospitals and colleges. Property here is largely older, well-titled and easy to fund.',
    relevance: {
      'personal-loan':
        'Salaried applicants from the hospitals and colleges around Pimpri Chowk are straightforward files. Traders drawing irregular income are not, and are usually better served by a business loan assessed on banking rather than a personal loan assessed on salary slips.',
      'business-loan':
        'Pimpri Market’s wholesale traders typically need seasonal stock funding rather than a term loan. Where GST filings and current-account banking are consistent, unsecured limits are readily available.',
      'home-loan':
        'A mature, mostly resale market. Older buildings occasionally have chain-of-title gaps or missing society NOCs; worth checking before you pay a token, because that is what stalls a sanction here.',
      'loan-against-property':
        'Shops and commercial units around Pimpri Market are strong LAP security. Lenders differ on tenanted commercial property, so the shortlist matters.',
      'car-loan':
        'Well served by both dealership tie-ups along Nashik Phata and direct bank finance. The dealer desk represents the lenders it has arrangements with, which is a shortlist chosen for the dealer’s convenience rather than for your rate. Comparing the two is worth ten minutes.',
      'gold-loan':
        'Several bank and NBFC branches within Pimpri itself, so the money is same-day. The difference between their repayment structures is larger than the difference between their rates: some are regular EMIs, others interest-only with the principal due as a bullet at maturity.',
      'working-capital-loan':
        'The classic Pimpri file: a trading business whose money is tied up in stock and receivables, being run on a term loan that is the wrong shape for it.',
    },
  },
  {
    slug: 'chinchwad',
    name: 'Chinchwad',
    district: 'Pune',
    pincodes: ['411019', '411033'],
    landmarks: ['Chapekar Chowk', 'Chinchwad Station', 'Morya Gosavi Temple', 'Vishal Arcade'],
    home: true,
    profile:
      'Our own office is at Chapekar Chowk, so this is the area we know street by street. A mix of long-settled residential society stock, small manufacturing units, and the professional and trading families who have been here for two generations.',
    relevance: {
      'personal-loan':
        'Walk in to the Chapekar Chowk office with your last three bank statements and you will know where you stand the same day.',
      'business-loan':
        'Small manufacturing and job-work units around Chinchwad are a well-understood profile here. Vintage is usually strong; what needs work is getting the financials to reflect what the business actually turns over.',
      'home-loan':
        'A lot of older society stock, which means share certificates, society NOCs and occasionally a load-bearing structure. All fundable, but not by every lender, and the wrong first application wastes a month.',
      'loan-against-property':
        'The most common secured requirement we see locally: a family that owns a Chinchwad flat or shop outright and needs to raise against it for a business rather than sell it.',
      'car-loan': 'Straightforward. Bring the proforma invoice and we will compare the dealer scheme against direct bank finance.',
      'gold-loan': 'Same-day, and worth doing at a branch rather than through an intermediary. We will tell you where.',
      'working-capital-loan':
        'Job-work units running on customer receivables need a cash credit limit, not a term loan. This is the single most common structural mistake we correct locally.',
    },
  },
  {
    slug: 'nigdi',
    name: 'Nigdi',
    district: 'Pune',
    pincodes: ['411044'],
    landmarks: ['Bhakti Shakti Chowk', 'Nigdi Pradhikaran', 'Akurdi Railway Station', 'Yamuna Nagar'],
    profile:
      'Pradhikaran-planned sectors with clean layouts and clear titles, among the easiest property in PCMC to fund. Heavily salaried, with a large retired and pensioner population in the older sectors.',
    relevance: {
      'personal-loan':
        'Salaried profiles here are simple. Pensioners have fewer lenders open to them but are far from excluded, because several partner banks lend against pension credits.',
      'business-loan': 'Mostly service businesses and professional practices rather than manufacturing. Assessed on ITR and banking.',
      'home-loan':
        'Pradhikaran sectors are on almost every lender’s approved list, and the title chain is usually clean. This is about as straightforward as a Pune home loan gets.',
      'loan-against-property':
        'Clean Pradhikaran titles get the better end of the loan-to-value range. Worth getting the valuation right rather than accepting the first one.',
      'car-loan':
        'A large second-car market in the older Pradhikaran sectors. Used-vehicle funding turns on the car’s age and valuation more than on your profile, and the rate sits above a new-car loan because the security depreciates faster.',
      'gold-loan':
        'Well covered by branches around Bhakti Shakti Chowk, with same-day valuation. Worth knowing before you pledge: if the gold price falls during the loan, lenders can ask for a part-payment to restore the loan-to-value. Ask what that trigger is.',
      'working-capital-loan':
        'Limited manufacturing here, so this is mostly professional practices and service businesses seeking an overdraft against receivables rather than a term loan against assets they do not have.',
    },
  },
  {
    slug: 'akurdi',
    name: 'Akurdi',
    district: 'Pune',
    pincodes: ['411035'],
    landmarks: ['Akurdi Railway Station', 'Khandoba Mal', 'D. Y. Patil College of Engineering', 'Ajmera'],
    profile:
      'An engineering-industry and education belt. A high proportion of applicants are salaried at the surrounding plants and colleges, with predictable income and clean paperwork, which is exactly the profile that gets the best rates if the file is presented properly.',
    relevance: {
      'personal-loan': 'Employees of the large listed manufacturers here fall into lenders’ top employer categories, which materially improves the rate. Make sure the application says so.',
      'business-loan': 'Ancillary suppliers to the engineering plants, assessed heavily on the strength of their customer concentration, which cuts both ways.',
      'home-loan': 'Well-established society stock plus newer projects. Employer category does real work on the rate here.',
      'loan-against-property':
        'Residential flats and the occasional commercial unit, with conventional titles and straightforward underwriting. The variable worth attention is the lender’s valuation, which is frequently below what an owner believes the flat would fetch.',
      'car-loan':
        'Employer tie-up schemes at the larger engineering plants are sometimes genuinely the cheapest option available, and sometimes not. Compare before assuming, and check the foreclosure terms, which vary more between lenders than the rate does.',
      'gold-loan':
        'Available locally with same-day valuation and disbursal, and one of the few routes open to someone rebuilding a damaged credit file. The gold is the security, so credit history is largely beside the point.',
      'working-capital-loan':
        'Ancillary units supplying the plants often need receivable-backed limits, because their payment cycles are set by their customers rather than by them. A cash credit limit sized on the actual stock-and-debtors gap is the right structure.',
    },
  },
  {
    slug: 'bhosari',
    name: 'Bhosari',
    district: 'Pune',
    pincodes: ['411026', '411039'],
    landmarks: ['Bhosari MIDC', 'Landewadi', 'Nashik Phata', 'Indrayani Nagar'],
    industrial: true,
    profile:
      'One of Maharashtra’s densest small-industry belts. Thousands of MIDC units doing fabrication, machining, moulding and job work, mostly proprietorships and partnerships with real assets, strong vintage and financials that understate what the business actually does.',
    relevance: {
      'personal-loan': 'Not usually the right instrument here. A proprietor drawing from the business is almost always better served by a business loan or a LAP on the shed.',
      'business-loan':
        'The core requirement in Bhosari: machinery, a new job-work contract that needs stock funded upfront, or a customer who pays at ninety days. Turnover and vintage are usually strong; getting the ITR and GST to line up with the banking is the work.',
      'home-loan': 'Applicants are often self-employed with two to three years of ITR: fundable, but underwritten on the returns rather than on the drawings.',
      'loan-against-property':
        'The single most useful product in this belt. MIDC sheds and industrial units are fundable, but only by lenders who accept MIDC leasehold, which is a specific and short list. Most banks decline it outright.',
      'car-loan': 'Commercial vehicle and light goods vehicle funding is as common here as private car finance.',
      'gold-loan': 'Frequently used as short-cycle working capital between payments. Understandable, but a cash credit limit is usually the cheaper answer.',
      'working-capital-loan':
        'Bhosari’s defining problem: money locked in stock and in ninety-day receivables. A cash credit limit sized on the actual working-capital gap is what this belt needs, and what it least often has.',
    },
  },
  {
    slug: 'chakan',
    name: 'Chakan',
    district: 'Pune',
    pincodes: ['410501'],
    landmarks: ['Chakan MIDC Phase I & II', 'Talegaon–Chakan Road', 'Mahalunge', 'Bhamboli'],
    industrial: true,
    profile:
      'The automotive belt. Large OEM plants with a deep tier-two and tier-three supplier base, plus fast-appreciating land on the MIDC periphery. Borrowers here are typically supplier businesses with heavy machinery requirements and customer-dictated payment cycles.',
    relevance: {
      'personal-loan': 'Salaried staff at the OEM plants are strong files. Supplier proprietors are better served elsewhere on this list.',
      'business-loan':
        'Machinery and capacity expansion against confirmed OEM orders. Customer concentration is the underwriting question that decides these files. One large buyer is a strength to a banker and a risk at the same time.',
      'home-loan': 'A rapidly expanding residential market with a lot of newer projects. Check the project is on the lender’s approved list; in a market building this fast, many are not yet.',
      'loan-against-property':
        'Industrial plots, sheds and NA land around Chakan are all fundable with the right lender. Grampanchayat land of 11 guntha or more is possible too, which surprises most applicants.',
      'car-loan': 'Both private and commercial vehicle finance, with a large goods-carrier segment.',
      'gold-loan': 'Available, though for a business requirement of any size a secured facility will cost far less.',
      'working-capital-loan':
        'OEM payment terms set the cycle, and suppliers finance the gap. A properly sized cash credit limit against stock and book debts is the standard structure, and materially cheaper than the alternatives being used.',
    },
  },
  {
    slug: 'wakad',
    name: 'Wakad',
    district: 'Pune',
    pincodes: ['411057'],
    landmarks: ['Wakad Chowk', 'Datta Mandir Road', 'Bhumkar Chowk', 'Mumbai–Bangalore Highway'],
    profile:
      'The residential shoulder of the Hinjewadi IT corridor: young salaried professionals, high household income, high existing EMI load, and a lot of first-time buyers stretching for a larger flat than the EMI comfortably supports.',
    relevance: {
      'personal-loan':
        'High salaries, but frequently high existing obligations: credit cards, a car loan and a personal loan already running. The constraint here is almost always the fixed-obligation ratio, not the income.',
      'business-loan': 'Mostly consultancies and small service companies, assessed on ITR and banking rather than on assets.',
      'home-loan':
        'The dominant requirement in Wakad. Joint applications with a spouse raise eligibility substantially and are under-used. Model the EMI at a higher rate than today’s before you commit. This is a repo-linked product on a twenty-year horizon.',
      'loan-against-property': 'Newer flats with clean titles fund easily. Less common here simply because most owners still have a home loan running.',
      'car-loan': 'High volume, and a market where dealership schemes are aggressively marketed. Compare.',
      'gold-loan': 'Less common in this demographic, but the fastest route to a short-term requirement without touching a credit score.',
      'working-capital-loan': 'IT services consultancies with overseas receivables. An overdraft against book debts fits better than a term loan.',
    },
  },
  {
    slug: 'hinjewadi',
    name: 'Hinjewadi',
    district: 'Pune',
    pincodes: ['411057'],
    landmarks: ['Rajiv Gandhi Infotech Park Phase I, II & III', 'Hinjewadi Chowk', 'Maan', 'Blue Ridge'],
    profile:
      'Rajiv Gandhi Infotech Park: salaried IT professionals in lenders’ highest employer categories, often with variable pay, RSUs or an overseas component that a standard salary-slip assessment handles badly.',
    relevance: {
      'personal-loan':
        'Top-category employers reach the best published rates. Where a large part of your package is variable pay or stock, choosing a lender that counts it properly is worth more than shopping the headline rate.',
      'business-loan': 'Independent consultants and small IT services firms, underwritten on ITR and banking.',
      'home-loan':
        'The highest-volume requirement here. Two things decide it: whether your project is on the lender’s approved list, and whether the lender counts your variable pay. Both are answerable before you apply.',
      'loan-against-property': 'Uncommon. Most property here is recent and still mortgaged. Relevant mainly for owners of older Maan or Marunji land.',
      'car-loan': 'High volume. Employer tie-ups sometimes beat both the dealer and the open market.',
      'gold-loan': 'Rarely the right tool for this profile, but occasionally the fastest one.',
      'working-capital-loan': 'Services firms with 60–90 day client payment terms and payroll every month. That gap is exactly what an overdraft is for.',
    },
  },
  {
    slug: 'ravet',
    name: 'Ravet',
    district: 'Pune',
    pincodes: ['412101'],
    landmarks: ['Ravet BRT Road', 'Mukai Chowk', 'Kiwale', 'Punawale'],
    profile:
      'One of PCMC’s fastest-growing residential fronts, largely new construction sold to first-time salaried buyers. Almost every file here is a home loan on an under-construction flat.',
    relevance: {
      'personal-loan': 'Frequently taken to fund the down payment on a flat, which lenders can see and dislike. Own contribution is expected to be genuinely your own.',
      'business-loan':
        'A limited commercial base as yet: local retail, clinics and services along the BRT road, serving a population that mostly works elsewhere. Vintage is the binding constraint here rather than turnover: a shop that opened with the township two years ago clears very few lenders’ three-year rule, and the ones it does clear are NBFCs pricing for that risk.',
      'home-loan':
        'Under-construction is the norm, so disbursement is staged against construction progress and you pay Pre-EMI in the meantime. Budget for paying rent and Pre-EMI simultaneously. That overlap is what catches first-time buyers here.',
      'loan-against-property':
        'A young market where most owners are still repaying the loan they bought with, so there is little unencumbered equity to mortgage. A top-up on the existing home loan is almost always the cheaper and faster route to additional funds: same lender, same security, no fresh legal and technical valuation, and a rate close to the home loan rather than a LAP rate.',
      'car-loan':
        'Straightforward salaried funding, but worth sequencing carefully: a car loan taken shortly before a home loan application reduces the home loan you qualify for, sometimes by more than the car cost.',
      'gold-loan':
        'Branches in nearby Nigdi and Akurdi handle this same-day. In a first-time-buyer belt it is most often used to bridge a shortfall on the own-contribution, which lenders do check, so speak to us before rather than after.',
      'working-capital-loan':
        'A limited commercial base as yet: local retail and service businesses along the BRT road, mostly needing a modest overdraft rather than a structured facility. For a business this size the honest answer is often that a formal working-capital limit is more paperwork than it is worth, and a smaller unsecured business loan does the same job with a tenth of the documentation.',
    },
  },
  {
    slug: 'moshi',
    name: 'Moshi',
    district: 'Pune',
    pincodes: ['412105'],
    landmarks: ['Moshi Pradhikaran', 'Bhosari–Alandi Road', 'Dudulgaon', 'International Exhibition Centre'],
    profile:
      'A Pradhikaran-planned expansion belt with a mix of new residential projects, warehousing and logistics. Land holdings on the periphery are frequently agricultural or Grampanchayat, which changes what can be funded.',
    relevance: {
      'personal-loan':
        'Standard salaried funding, with a fast-growing self-employed base in warehousing and transport. Proprietors drawing from a business are generally better served by a business loan assessed on banking than by a personal loan assessed on salary slips.',
      'business-loan':
        'Warehousing, logistics and transport operators, assessed on the fleet, the contracts and the banking rather than on a balance sheet that usually understates the business. Where a single large contract carries most of the revenue, expect the lender to want the contract itself, not a summary of it.',
      'home-loan':
        'Newer Pradhikaran stock funds cleanly and sits on most approved lists. On the periphery the picture changes sharply: confirm the land is genuinely NA and the project approved before paying a token, because agricultural or unconverted land is not fundable at any price and no amount of negotiation changes that.',
      'loan-against-property':
        'Warehouses and godowns are fundable with the right lender, as is NA open land, and Grampanchayat holdings of 11 guntha or more are possible with a specific short list of NBFCs rather than with any bank. The valuation is where these files turn: an industrial or storage property in an expanding belt is frequently assessed well below what the owner believes it is worth, and the loan follows the valuation rather than the expectation.',
      'car-loan':
        'A significant commercial and goods-vehicle segment alongside private car finance, driven by the warehousing along the Bhosari–Alandi road. A goods carrier is underwritten on the business and its contracts rather than on the driver, and the funding percentage on a commercial vehicle sits below that on a private car.',
      'gold-loan':
        'Handled same-day at branches in Bhosari and Alandi. Common among transport operators bridging a fuel or maintenance bill until a contract payment lands. Fast, but a receivable-backed overdraft costs materially less for a recurring gap.',
      'working-capital-loan':
        'Transport and logistics operators financing fuel, maintenance and driver wages against contract receivables that settle thirty to sixty days later. That gap is permanent and recurring, which makes it an overdraft problem rather than a term-loan one, and the limit should be sized on the receivables ledger, not on a round number somebody suggested.',
    },
  },
  {
    slug: 'talegaon-dabhade',
    name: 'Talegaon Dabhade',
    district: 'Pune',
    pincodes: ['410507', '410506'],
    landmarks: ['Talegaon MIDC', 'Talegaon Station', 'Vadgaon Maval', 'Old Mumbai–Pune Highway'],
    profile:
      'A MIDC town with floriculture and food-processing alongside engineering, plus a substantial second-home and retirement market drawn by the climate and the highway.',
    relevance: {
      'personal-loan': 'Salaried MIDC employees and a large pensioner base, and several partner banks lend against pension credits.',
      'business-loan': 'Floriculture, food processing and engineering units. Seasonal businesses need the tenure matched to the cycle, not to a round number.',
      'home-loan': 'A strong second-home market. Note that a second property is underwritten differently from a first, and let-out property is treated differently again for tax.',
      'loan-against-property': 'MIDC units, NA land and residential plots. Talegaon land titles need care; get the search done before, not during.',
      'car-loan':
        'Salaried MIDC funding alongside a commercial segment serving the estate, plus a steady second-home market that drives weekend-car purchases. Goods-vehicle finance is underwritten on the business, not the buyer.',
      'gold-loan': 'Available locally, and commonly used for seasonal agricultural working capital.',
      'working-capital-loan': 'Food processing and floriculture are seasonal by nature. A revolving limit fits the cycle where a term loan fights it.',
    },
  },
  {
    slug: 'baner',
    name: 'Baner',
    district: 'Pune',
    pincodes: ['411045'],
    landmarks: ['Baner Road', 'Balewadi High Street', 'Pashan Link Road', 'Mumbai–Bangalore Highway'],
    profile:
      'High-value residential and premium commercial. Larger ticket sizes than anywhere else on this list: senior salaried, business owners and professionals, with commercial property that makes strong LAP and Lease Rental Discounting security.',
    relevance: {
      'personal-loan': 'Large-ticket unsecured lending, where the lender panel narrows sharply above a certain amount and profile quality decides everything.',
      'business-loan': 'Professional practices and established companies. Frequently better served by a secured facility given the property most applicants here already own.',
      'home-loan': 'Large-ticket home loans, where the funding percentage steps down as the amount rises. Worth modelling the margin properly before agreeing a price.',
      'loan-against-property': 'Baner commercial and residential property is among the strongest LAP security in Pune, and reaches the better end of the loan-to-value range.',
      'car-loan': 'A premium and luxury segment, where lender appetite varies by vehicle far more than most buyers expect.',
      'gold-loan': 'Available, though rarely the right instrument for this profile.',
      'working-capital-loan':
        'Lease Rental Discounting is genuinely under-used here. Owners of let commercial property on Baner Road can raise substantial sums against contracted rent, at rates close to a home loan.',
    },
  },
  {
    slug: 'kothrud',
    name: 'Kothrud',
    district: 'Pune',
    pincodes: ['411038', '411029'],
    landmarks: ['Karve Road', 'Paud Road', 'Mahatma Society', 'Chandani Chowk'],
    profile:
      'Old, settled Pune. Long-held property with mature titles, a dense professional and academic population, and a substantial retail and small-business base along Karve and Paud Roads.',
    relevance: {
      'personal-loan':
        'Salaried and professional profiles, mostly straightforward, and an older population for whom a pension is the income. Several partner banks lend against pension credits, which is worth knowing because most people assume retirement closes the door.',
      'business-loan':
        'Established retail along Karve and Paud Roads and long-standing professional practices (doctors, architects, chartered accountants) with the kind of vintage most areas cannot show. That combination is close to the ideal unsecured profile, and owners here routinely under-borrow because they assume an unsecured limit is small. On a fifteen-year practice with clean banking it is not.',
      'home-loan':
        'A largely resale market, which changes the work entirely: instead of a builder’s approved-project list you are dealing with a chain of title, a share certificate, a society NOC and sometimes a live redevelopment proposal. Confirm the society’s status before you commit. A building under redevelopment discussion is fundable by far fewer lenders, and nobody volunteers that at the viewing.',
      'loan-against-property':
        'Kothrud’s long-held, fully-owned property is among the strongest LAP security in Pune, and this is the area where owners most often raise against a home rather than sell it, typically to fund a business, a child’s education abroad, or to clear costlier borrowing. Older societies need the share certificate and the chain of title in order before the valuation, and in a redevelopment-heavy pocket that is worth confirming early.',
      'car-loan':
        'A dense professional and academic population, so applications here are typically clean salaried files that reach the better rate bands. Parking on the older Karve Road lanes shapes what people buy more than eligibility does.',
      'gold-loan':
        'Well served by branches along Karve Road, with same-day valuation. In a settled, long-held neighbourhood this is more often bridging finance between a sale and a purchase than distress borrowing, and the repayment structure matters more than the rate.',
      'working-capital-loan':
        'Retail businesses along Karve and Paud Roads funding stock cycles, and professional practices needing an overdraft against fees receivable rather than a term loan repaid on a fixed schedule. The Kothrud pattern worth naming: a practice with property it owns outright, running its working capital on a personal loan because nobody suggested a secured overdraft at half the rate.',
    },
  },
  {
    slug: 'hadapsar',
    name: 'Hadapsar',
    district: 'Pune',
    pincodes: ['411028', '411013'],
    landmarks: ['Magarpatta City', 'Amanora', 'Hadapsar Industrial Estate', 'Solapur Road'],
    profile:
      'Two economies side by side: the IT and corporate population of Magarpatta and Amanora, and the older Hadapsar Industrial Estate with its manufacturing and trading units. The right product depends entirely on which of the two an applicant belongs to.',
    relevance: {
      'personal-loan': 'Salaried IT and corporate profiles in strong employer categories. Industrial-estate proprietors are usually better served by a business loan.',
      'business-loan': 'Hadapsar Industrial Estate units: manufacturing and trading, with real vintage and real assets.',
      'home-loan':
        'Township property in Magarpatta and Amanora funds cleanly and sits on most approved lists. These are among the easiest sanctions in east Pune. Older Hadapsar stock off Solapur Road is a different exercise: the title chain needs checking properly, and a gap in it will surface during the legal opinion rather than before, which is the expensive moment to find it.',
      'loan-against-property':
        'Hadapsar Industrial Estate sheds and commercial units are strong security, subject to the lender accepting the tenure and title type, and that acceptance is the whole question, because an estate lease is not a freehold and most banks treat the two very differently. Township flats in Magarpatta and Amanora are conventional LAP security and reach the better end of the loan-to-value range.',
      'car-loan':
        'High volume across both populations, and two quite different files: township salaried buyers in strong employer categories, and industrial-estate proprietors underwritten on business banking instead of salary slips.',
      'gold-loan':
        'Widely available along Solapur Road, same-day. Frequently used by industrial-estate units as short-cycle working capital between customer payments. Understandable, but a properly sized cash credit limit is almost always cheaper.',
      'working-capital-loan': 'Industrial estate units with stock and receivable cycles, the standard cash credit case.',
    },
  },
  {
    slug: 'baramati',
    name: 'Baramati',
    district: 'Pune',
    pincodes: ['413102'],
    landmarks: ['Bhigwan Chowk', 'Baramati MIDC', 'Vidya Pratishthan', 'Agricultural Development Trust'],
    branch: true,
    profile:
      'Our branch office is at Bhigwan Chowk. An agricultural and agro-processing economy: sugar, dairy, food processing and the trades that serve them, with an education and healthcare cluster on top. Income here is seasonal in a way city underwriting handles badly.',
    relevance: {
      'personal-loan': 'Salaried applicants from the education and healthcare institutions are straightforward. Agricultural income needs a lender that understands seasonality rather than one that reads twelve flat months and declines.',
      'business-loan':
        'Agro-processing, dairy, trading and transport. The underwriting question is always seasonality: a business that earns in four months and spends in twelve needs the tenure and structure matched to that, not fought against it.',
      'home-loan': 'A steady market. Titles in the surrounding villages need checking properly. This is where a search done early saves a month later.',
      'loan-against-property':
        'NA open land and Grampanchayat holdings of 11 guntha or more are fundable with the right NBFC, as are godowns and processing units. Most banks will not touch these; several of our partners will.',
      'car-loan':
        'Private, commercial and agricultural vehicle finance, including tractors and goods carriers. Where income is seasonal, the tenure and the instalment date should be matched to the crop cycle. Several partner NBFCs will do that, and most banks will not.',
      'gold-loan': 'Heavily used for seasonal working capital, and often at a cost that a properly structured facility would beat.',
      'working-capital-loan': 'Agro-processing runs on a season. A revolving limit that expands into the season and repays after it is the correct shape, and rarely the one in place.',
    },
  },
  {
    slug: 'phaltan',
    name: 'Phaltan',
    district: 'Satara',
    pincodes: ['415523'],
    landmarks: ['Laxmi Nagar', 'Phaltan MIDC', 'Sugar factory belt', 'Phaltan–Baramati Road'],
    registered: true,
    profile:
      'Our registered office is at Laxmi Nagar. A sugar-belt economy with MIDC industry, agricultural landholding and the allied trades: transport, equipment, and the input suppliers around them.',
    relevance: {
      'personal-loan': 'Salaried and professional profiles. Agricultural income requires a lender that assesses a season rather than a month.',
      'business-loan': 'Sugar-allied trades, transport, equipment dealers and input suppliers. Vintage is usually strong; documentation is what needs the work.',
      'home-loan': 'A smaller market with fewer active lenders. Getting to the right one first matters more here than in Pune, where you can afford a false start.',
      'loan-against-property': 'Agricultural-adjacent NA land, MIDC units and commercial property. The lender list that accepts these is short and specific.',
      'car-loan':
        'A substantial commercial and agricultural vehicle segment (goods carriers serving the sugar belt, tractors and farm equipment) alongside private car finance. Seasonal earners need a lender that assesses a year rather than a month.',
      'gold-loan': 'Widely used, and rarely the cheapest option available once a secured facility is on the table.',
      'working-capital-loan': 'Sugar-belt trades finance a season. The facility should do the same.',
    },
  },
]

/**
 * Per-area detail that is not product-specific.
 *
 * ── Why this block exists ──────────────────────────────────────────────────
 * The first version of the locality pages measured badly against their own
 * stated standard. Comparing `/business-loan-bhosari/` with
 * `/business-loan-baner/`, only about one line in seven was genuinely
 * different — the rest was the product's shared features, eligibility and
 * document blocks, repeated across all sixteen localities *and* duplicated
 * from the product hub page. That ratio is the doorway-page signature, and no
 * amount of the essay at the top of this file makes it not so.
 *
 * Two things fixed it. The page stopped repeating the hub's generic blocks and
 * links to them instead — which raises the unique proportion and pushes
 * internal link equity toward the page that should rank for the head term. And
 * every area gained the two fields below, which are locality facts rather than
 * product facts, so they differentiate all seven of an area's pages from all
 * seven of every other area's at once.
 *
 * `localNotes` — three concrete things about borrowing in that specific place.
 * `lenderFit`  — which kind of institution suits its dominant borrower profile.
 *
 * Both must be written, not generated. If you add an area and cannot say three
 * true, specific things about lending there, you do not know the area well
 * enough to publish seven pages about it.
 */
const LOCAL_DETAIL = {
  pimpri: {
    lenderFit:
      'Trading profiles here do best with banks when the GST and current-account banking are consistent, and with NBFCs when the turnover is real but the paperwork lags behind it.',
    localNotes: [
      'Older buildings around Pimpri Market occasionally have chain-of-title gaps or a missing society NOC. The single most common reason a sanction stalls here.',
      'Wholesale traders are usually assessed on twelve months of current-account banking rather than on the balance sheet, so cheque returns matter more than most owners expect.',
      'Hospital and college staff fall into lenders’ salaried categories and are among the fastest files in PCMC.',
    ],
  },
  chinchwad: {
    lenderFit:
      'A broad mix. Long-settled families with unencumbered property reach the better secured rates at banks; job-work units are frequently better served by NBFCs that read banking rather than financials.',
    localNotes: [
      'Our own office is at Chapekar Chowk, so a walk-in with three months of bank statements can get an answer the same day.',
      'A lot of older society stock means share certificates, society NOCs and the occasional load-bearing structure. All fundable, but not by every lender, and the wrong first application costs a month.',
      'The most common local requirement is not a new loan at all: it is raising against a flat or shop the family already owns outright, rather than selling it.',
    ],
  },
  nigdi: {
    lenderFit:
      'Banks, almost always. Pradhikaran titles and salaried profiles are exactly what bank credit policy is written for, and the rate reflects it.',
    localNotes: [
      'Pradhikaran sectors sit on virtually every lender’s approved list and the title chain is usually clean, about as straightforward as property gets in PCMC.',
      'A large pensioner population in the older sectors: several partner banks lend against pension credits, which most retirees assume is not possible.',
      'Because the property is easy, the file is decided almost entirely on the applicant, which means a credit report worth checking before applying, not after.',
    ],
  },
  akurdi: {
    lenderFit:
      'Banks, and specifically the ones with the large listed manufacturers on their top-employer list. That categorisation moves the rate more than negotiation ever will.',
    localNotes: [
      'Employees of the big engineering plants fall into lenders’ highest employer categories. Make sure the application says which employer; it is routinely left off and it costs real money.',
      'Ancillary suppliers to those plants live with customer-dictated payment cycles, so a revolving limit fits where a term loan fights.',
      'Employer tie-up schemes at the larger plants are sometimes genuinely the cheapest option available, and sometimes materially not. Worth ten minutes to check.',
    ],
  },
  bhosari: {
    lenderFit:
      'NBFCs, decisively: specifically the short list that accepts MIDC leasehold as security. Most banks decline the property type outright, which is a dead end rather than a negotiation.',
    localNotes: [
      'MIDC leasehold sheds are fundable, but only by lenders who take that tenure. Identifying them before applying is most of the job in this belt.',
      'Getting the ITR, the GST returns and the bank statements to tell one consistent story is what turns a decline into a sanction here. An underwriter is not reading them for the totals; they are reading them against each other.',
      'Ninety-day receivables against monthly wages is the defining local cash-flow problem, and a term loan is the wrong instrument for it.',
    ],
  },
  chakan: {
    lenderFit:
      'NBFCs for the supplier base and for anything on MIDC or NA land; banks for OEM salaried staff and for mainstream residential purchases.',
    localNotes: [
      'Customer concentration is the question that decides supplier files: one large OEM buyer reads as a strength and a risk at the same time, and how it is presented matters.',
      'The residential market is expanding faster than lenders’ approved-project lists. Confirm the project is on your lender’s list before paying a token.',
      'Industrial plots, sheds and NA land are all fundable with the right lender, including Grampanchayat holdings of 11 guntha or more, which surprises most applicants.',
    ],
  },
  wakad: {
    lenderFit:
      'Banks, on the strength of employer category, but the lender that counts variable pay properly matters more here than the one advertising the lowest rate.',
    localNotes: [
      'The constraint is almost never the income. It is the credit card, the car loan and the personal loan already running: lenders cap total EMIs as a share of net income.',
      'A joint application with a spouse raises the eligible amount substantially and is badly under-used in this demographic.',
      'Model the EMI at a rate above today’s before committing. A home loan here is repo-linked and runs for twenty years; the rate you sign at is not the rate you will pay throughout.',
    ],
  },
  hinjewadi: {
    lenderFit:
      'Banks with the major IT employers in their top categories. Where a large part of the package is variable pay or stock, the lender that assesses it properly beats the one with the better headline rate.',
    localNotes: [
      'Two things decide a home loan here: whether the project is on the lender’s approved list, and whether the lender counts your variable pay. Both are answerable before you apply.',
      'RSUs and overseas allowances are handled very differently between lenders, and a standard salary-slip assessment handles them badly.',
      'Top employer categorisation reaches the lowest published band, but only if the application actually records the employer correctly.',
    ],
  },
  ravet: {
    lenderFit:
      'Banks for the salaried first-time buyer, which is most of this market. The builder’s tie-ups are worth comparing against, not deferring to.',
    localNotes: [
      'Under-construction is the norm: disbursement happens in stages against construction progress, and you pay Pre-EMI in the meantime.',
      'Budget for paying rent and Pre-EMI at the same time. That overlap is what catches first-time buyers in Ravet more than the EMI itself does.',
      'Lenders check that the own-contribution is genuinely yours. A personal loan taken to fund the down payment is visible and is a common reason a file is declined.',
    ],
  },
  moshi: {
    lenderFit:
      'NBFCs for warehousing, logistics and anything on the agricultural periphery; banks for Pradhikaran residential stock.',
    localNotes: [
      'Newer Pradhikaran stock funds cleanly. On the periphery, confirm the land is NA and the project approved before paying anything at all.',
      'Warehouses and godowns are strong security with the right lender, as is NA open land and Grampanchayat holdings of 11 guntha or more.',
      'Transport operators are assessed on the fleet, the contracts and the banking, not on the balance sheet, which usually understates the business.',
    ],
  },
  'talegaon-dabhade': {
    lenderFit:
      'A split: banks for MIDC salaried staff and second-home purchases, NBFCs for floriculture and food processing, where income arrives in a season rather than a month.',
    localNotes: [
      'Seasonal businesses need the tenure and the instalment date matched to the cycle. Several partner NBFCs will do that; most banks will not.',
      'A second property is underwritten differently from a first, and a let-out property is treated differently again for tax. Both are worth knowing before you commit.',
      'Talegaon land titles reward a search done early. Doing it during the application rather than before is how a month disappears.',
    ],
  },
  baner: {
    lenderFit:
      'Banks for large-ticket secured lending, where profile quality reaches the best rates. Above a certain unsecured amount the panel narrows sharply and the shortlist does real work.',
    localNotes: [
      'The funding percentage steps down as the ticket size rises, so the margin you need is a larger share of a larger number. Model it before agreeing a price.',
      'Lease Rental Discounting is genuinely under-used here. Owners of let commercial property can raise substantial sums against contracted rent, at rates close to a home loan.',
      'Lender appetite in the premium and luxury vehicle segment varies by make and model far more than most buyers expect.',
    ],
  },
  kothrud: {
    lenderFit:
      'Banks. Long-held, well-titled property and established professional practices are the profile bank credit policy is built around, and it prices accordingly.',
    localNotes: [
      'A largely resale market: older societies mean share certificates, NOCs and sometimes a live redevelopment question. Confirm the society’s status before you commit.',
      'Long-held, fully-owned property makes this one of the strongest areas in Pune for raising against a home rather than selling it.',
      'Established retail and professional practices with real vintage are a strong profile for unsecured limits, often stronger than the owners assume.',
    ],
  },
  hadapsar: {
    lenderFit:
      'Two answers for two economies: banks for the township salaried population, NBFCs for industrial-estate proprietors underwritten on business banking.',
    localNotes: [
      'Township property in Magarpatta and Amanora funds cleanly and sits on most approved lists. Older Hadapsar stock needs the title chain checked properly.',
      'Industrial estate sheds and commercial units are strong security, subject to the lender accepting the tenure and title type.',
      'Proprietors drawing from a business are usually better served by a business loan assessed on banking than by a personal loan assessed on salary slips.',
    ],
  },
  baramati: {
    lenderFit:
      'NBFCs that understand seasonality, and specifically those that accept NA land, Grampanchayat holdings and processing units. Banks for the salaried education and healthcare cluster.',
    localNotes: [
      'Our branch is at Bhigwan Chowk, so a file here is handled locally rather than referred to Pune.',
      'Agricultural and agro-processing income needs a lender that assesses a year rather than a month. One that reads twelve flat months and declines is not a lender that understands this district.',
      'NA open land and Grampanchayat holdings of 11 guntha or more are fundable with specific NBFCs. Most banks will not look at them at all.',
    ],
  },
  phaltan: {
    lenderFit:
      'A short, specific list of NBFCs. The sugar-belt profile and the property types here are outside most bank credit policy, so getting to the right lender first matters more than it does in Pune.',
    localNotes: [
      'Our registered office is at Laxmi Nagar, and the district is covered directly rather than at arm’s length.',
      'Fewer lenders are active here than in Pune, so a false start is more expensive. The first application should be the right one.',
      'Sugar-belt trades earn across a season and spend across a year. The facility should be shaped to that, and usually is not.',
    ],
  },
}

/**
 * Areas, with their locality detail merged in.
 *
 * Kept as a separate merge rather than inlined above so the product-specific
 * `relevance` copy and the locality-specific copy stay legible as two distinct
 * bodies of writing — they are edited at different times and for different
 * reasons.
 */
export const AREAS = BASE_AREAS.map((a) => ({ ...a, ...LOCAL_DETAIL[a.slug] }))

export const AREA_BY_SLUG = Object.fromEntries(AREAS.map((a) => [a.slug, a]))

/** Every pincode we claim to serve, for the JSON-LD `areaServed`. */
export const ALL_PINCODES = [...new Set(AREAS.flatMap((a) => a.pincodes))].sort()

/**
 * The products that get a page per area.
 *
 * Insurance is deliberately excluded: it is not a locality-sensitive purchase
 * the way a mortgage is, and generating sixteen near-identical insurance pages
 * would be exactly the doorway pattern the rest of this file exists to avoid.
 */
export const AREA_PRODUCT_SLUGS = [
  'personal-loan',
  'business-loan',
  'home-loan',
  'loan-against-property',
  'car-loan',
  'gold-loan',
  'working-capital-loan',
]
