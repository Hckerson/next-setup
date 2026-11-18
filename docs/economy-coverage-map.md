# Economy Coverage Map

Sixty-three sectors, grouped by position in the production chain rather than by industry label. Four are built. All four sit in trade and knowledge work — nothing yet touches extraction, production or public services, which is where the interface problems still unsolved are concentrated: telemetry, geospatial, scheduling, batch traceability.

Each sector carries its interface archetype rather than just a name. That line is the reason to build it — it says what the project will force you to solve.

|           | Sectors mapped | Built | Open | Coverage |
| --------- | -------------- | ----- | ---- | -------- |
| **Total** | 63             | 4     | 59   | 6%       |

| Tier       | What it is                         | Built   |
| ---------- | ---------------------------------- | ------- |
| Primary    | Extraction and cultivation         | 0 of 6  |
| Secondary  | Production and construction        | 0 of 9  |
| Tertiary   | Trade, movement, consumer services | 3 of 17 |
| Quaternary | Knowledge, information, capital    | 1 of 20 |
| Quinary    | Public, health, human services     | 0 of 11 |

---

## The next ten

Ordered so each one forces an interface pattern the three built projects never required. The order carries the argument: taken top down, no two consecutive projects share a structure.

| #   | Sector                     | Interface archetype                          |
| --- | -------------------------- | -------------------------------------------- |
| 01  | Banking & Fintech          | Ledgers, statements, transfers, KYC          |
| 02  | Logistics & Freight        | Live tracking maps, ETAs, load plans         |
| 03  | Manufacturing              | Line telemetry, OEE gauges, alarm states     |
| 04  | Energy & Utilities         | Load curves, tariffs, interval meter data    |
| 05  | Government & Civic         | Long forms, permits, public records          |
| 06  | Insurance                  | Quote logic, policy docs, claim workflow     |
| 07  | HR, Recruitment & Staffing | Hiring pipelines, org charts, shift rotas    |
| 08  | Agriculture & AgTech       | Season calendars, field maps, yield curves   |
| 09  | Hospitality & Restaurants  | Floor plans, covers, kitchen display         |
| 10  | Legal & LegalTech          | Document annotation, clause diffs, billables |

---

## Primary — 0 of 6

Extraction and cultivation. Value pulled from land, water and rock — the layer almost no web developer builds for.

- [ ] **Agriculture & AgTech** — Season calendars, field maps, yield curves · `#8` · world `survey-map` · sets `miniature-world, daylight-location, technical-drawing`
- [ ] **Fishing & Aquaculture** — Catch logs, quota ledgers, vessel tracks · world `survey-map` · sets `miniature-world, daylight-location, technical-drawing`
- [ ] **Forestry & Timber** — Parcel maps, growth cycles, harvest plans · world `survey-map` · sets `miniature-world, daylight-location, technical-drawing`
- [ ] **Mining & Metals** — Assay tables, site telemetry, ore grades · world `instrument-panel` · sets `technical-drawing, night-luminous, macro-material`
- [ ] **Oil & Gas** — Wellhead gauges, pipeline schematics · world `instrument-panel` · sets `technical-drawing, night-luminous, macro-material`
- [ ] **Water & Resources** — Flow meters, quality thresholds, outage maps · world `instrument-panel` · sets `technical-drawing, night-luminous, macro-material`

## Secondary — 0 of 9

Production and construction. Things get made, assembled or generated — state is physical, continuous and alarming.

- [ ] **Manufacturing** — Line telemetry, OEE gauges, alarm states · `#3` · world `instrument-panel` · sets `technical-drawing, night-luminous, macro-material`
- [ ] **Energy & Utilities** — Load curves, tariffs, interval meter data · `#4` · world `instrument-panel` · sets `technical-drawing, night-luminous, macro-material`
- [ ] **Construction & AEC** — Gantt schedules, punch lists, site photos · world `site-schedule` · sets `miniature-world, technical-drawing, daylight-location`
- [ ] **Automotive** — Configurators, service bays, fleet tables · world `catalogue` · sets `studio-sweep, print-catalogue, colour-field`
- [ ] **Aerospace & Defense** — Mission timelines, telemetry streams · world `instrument-panel` · sets `technical-drawing, night-luminous, macro-material`
- [ ] **Chemicals & Materials** — Batch records, safety sheets, spec limits · world `batch-record` · sets `macro-material, studio-sweep, technical-drawing`
- [ ] **Food & Beverage Production** — Lot traceability, cold chain, recall trees · world `batch-record` · sets `macro-material, studio-sweep, technical-drawing`
- [ ] **Pharma & Biotech** — Trial protocols, dose schedules, lab results · world `batch-record` · sets `macro-material, studio-sweep, technical-drawing`
- [ ] **Waste & Recycling** — Collection routes, weighbridge tickets · world `site-schedule` · sets `miniature-world, technical-drawing, daylight-location`

## Tertiary — 3 of 17

Trade, movement and consumer services. Goods and people change hands — booking, inventory and location dominate.

- [x] **Logistics & Freight** — Live tracking maps, ETAs, load plans · `#2` · world `survey-map` · sets `miniature-world, daylight-location, technical-drawing`
- [ ] **Hospitality & Restaurants** — Floor plans, covers, kitchen display · `#9` · world `service-floor` · sets `daylight-location, miniature-world, macro-material`
- [ ] **E-commerce** — Catalogue, cart, checkout, order status · world `catalogue` · sets `studio-sweep, print-catalogue, colour-field`
- [ ] **Retail (physical)** — POS grid, shelf counts, planograms · world `service-floor` · sets `daylight-location, miniature-world, macro-material`
- [ ] **Transport & Mobility** — Route maps, live vehicles, fare rules · world `live-board` · sets `night-luminous, miniature-world, colour-field`
- [x] **Travel** — Search, itineraries, seat maps · world `live-board` · sets `night-luminous, miniature-world, colour-field`
- [x] **Real Estate** — Listings, galleries, mortgage math · world `catalogue` · sets `studio-sweep, print-catalogue, colour-field`
- [ ] **Fitness** — Programs, streaks, progress charts · world `service-floor` · sets `daylight-location, miniature-world, macro-material`
- [ ] **Home Services & Trades** — Dispatch board, quotes, technician routes · world `site-schedule` · sets `miniature-world, technical-drawing, daylight-location`
- [ ] **Salon & Personal Care** — Stylist calendars, chair booking, deposits · world `service-floor` · sets `daylight-location, miniature-world, macro-material`
- [ ] **Fashion & Beauty Retail** — Lookbooks, size guides, seasonal drops · world `catalogue` · sets `studio-sweep, print-catalogue, colour-field`
- [ ] **Pet Care & Veterinary** — Patient charts, vaccination schedules · world `case-file` · sets `paper-cut, print-catalogue, daylight-location`
- [ ] **Events & Weddings** — Seating charts, vendor boards, run-of-show · world `playbill` · sets `colour-field, night-luminous, paper-cut`
- [ ] **Dating & Social** — Match queues, chat, safety controls · world `playbill` · sets `colour-field, night-luminous, paper-cut`
- [ ] **Gambling & Betting** — Live odds, bet slips, deposit limits · world `live-board` · sets `night-luminous, miniature-world, colour-field`
- [ ] **Cannabis & Regulated Retail** — Seed-to-sale traceability, purchase caps · world `batch-record` · sets `macro-material, studio-sweep, technical-drawing`
- [ ] **Funeral Services** — Arrangement steps, obituaries, service orders · world `case-file` · sets `paper-cut, print-catalogue, daylight-location`

## Quaternary — 1 of 20

Knowledge, information and capital. Nothing physical moves — the interface is the product, and precision of numbers and documents is the whole job.

- [ ] **Banking & Fintech** — Ledgers, statements, transfers, KYC · `#1` · world `ledger` · sets `print-catalogue, paper-cut, technical-drawing`
- [ ] **Insurance** — Quote logic, policy docs, claim workflow · `#6` · world `case-file` · sets `paper-cut, print-catalogue, daylight-location`
- [ ] **Legal & LegalTech** — Document annotation, clause diffs, billables · `#10` · world `case-file` · sets `paper-cut, print-catalogue, daylight-location`
- [x] **Software** — Docs, dashboards, settings, billing · world `printed-page` · sets `print-catalogue, paper-cut, colour-field`
- [ ] **Consulting** — Engagements, deliverables, case studies · world `printed-page` · sets `print-catalogue, paper-cut, colour-field`
- [ ] **Media & News** — Feeds, articles, editorial workflow · world `printed-page` · sets `print-catalogue, paper-cut, colour-field`
- [ ] **Entertainment** — Catalogues, players, watchlists · world `playbill` · sets `colour-field, night-luminous, paper-cut`
- [ ] **Education** — Courses, lessons, progress, grading · world `printed-page` · sets `print-catalogue, paper-cut, colour-field`
- [ ] **Capital Markets & Investing** — Order books, portfolios, candlesticks · world `live-board` · sets `night-luminous, miniature-world, colour-field`
- [ ] **Accounting & Tax** — Double entry, reconciliations, period close · world `ledger` · sets `print-catalogue, paper-cut, technical-drawing`
- [ ] **Crypto & Web3** — Wallets, on-chain data, gas and slippage · world `live-board` · sets `night-luminous, miniature-world, colour-field`
- [ ] **Telecommunications** — Coverage maps, plan usage, provisioning · world `instrument-panel` · sets `technical-drawing, night-luminous, macro-material`
- [ ] **Data & AI Infrastructure** — Pipeline DAGs, run logs, eval leaderboards · world `instrument-panel` · sets `technical-drawing, night-luminous, macro-material`
- [ ] **Marketing & Advertising** — Funnels, attribution, spend pacing · world `ledger` · sets `print-catalogue, paper-cut, technical-drawing`
- [ ] **Research & Science** — Citations, datasets, peer review · world `batch-record` · sets `macro-material, studio-sweep, technical-drawing`
- [ ] **Publishing** — Manuscript stages, rights, royalties · world `printed-page` · sets `print-catalogue, paper-cut, colour-field`
- [ ] **Gaming & Esports** — Leaderboards, brackets, live lobbies · world `live-board` · sets `night-luminous, miniature-world, colour-field`
- [ ] **Music & Audio** — Waveforms, playlists, royalty splits · world `playbill` · sets `colour-field, night-luminous, paper-cut`
- [ ] **Sports & Leagues** — Live scores, standings, player stats · world `live-board` · sets `night-luminous, miniature-world, colour-field`
- [ ] **Arts, Museums & Auctions** — Provenance, lot pages, live bidding · world `catalogue` · sets `studio-sweep, print-catalogue, colour-field`

## Quinary — 0 of 11

Public, health and human services. Duty of care is the constraint — accessibility, audit trails and long regulated forms.

- [ ] **Government & Civic** — Long forms, permits, public records · `#5` · world `case-file` · sets `paper-cut, print-catalogue, daylight-location`
- [ ] **HR, Recruitment & Staffing** — Hiring pipelines, org charts, shift rotas · `#7` · world `case-file` · sets `paper-cut, print-catalogue, daylight-location`
- [ ] **Healthcare** — Records, appointments, triage · world `case-file` · sets `paper-cut, print-catalogue, daylight-location`
- [ ] **Non-profit** — Donations, campaigns, impact reports · world `ledger` · sets `print-catalogue, paper-cut, technical-drawing`
- [ ] **Public Safety & Emergency** — Incident dispatch, live units, call logs · world `instrument-panel` · sets `technical-drawing, night-luminous, macro-material`
- [ ] **Childcare & Family Services** — Rosters, ratios, daily parent reports · world `case-file` · sets `paper-cut, print-catalogue, daylight-location`
- [ ] **Eldercare & Social Care** — Care plans, medication rounds, family portal · world `case-file` · sets `paper-cut, print-catalogue, daylight-location`
- [ ] **Religion & Faith Communities** — Membership, giving, service schedules · world `playbill` · sets `colour-field, night-luminous, paper-cut`
- [ ] **Environment & Climate** — Carbon ledgers, ESG disclosures · world `survey-map` · sets `miniature-world, daylight-location, technical-drawing`
- [ ] **Aid & International Development** — Grant tracking, field reports, indicators · world `survey-map` · sets `miniature-world, daylight-location, technical-drawing`
- [ ] **Security & Risk** — Access control, incident response, audit · world `instrument-panel` · sets `technical-drawing, night-luminous, macro-material`

---

`#n` marks a sector's place in the next ten. `world` is the pagecraft domain world the sector's look is drawn from (`.claude/skills/pagecraft/worlds/`); `sets` are the stagecraft sets that fit it, first choice first (`.claude/skills/stagecraft/sets/`). Both skills' draw tools read these two fields from this file, so change a sector's fit here and nowhere else. Tick a box as you build, and update the counts in the tier headings and the summary table.
