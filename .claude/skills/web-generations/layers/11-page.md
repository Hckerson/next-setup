# Layer 11: Page

`app/**/page.tsx`. Project rule: a page composes sections and holds page-level state, nothing else. This layer is about page shape: the order, width and arc of what the sections add up to. Most pages are three lines; the grade is whatever the sections deliver, plus the shape.

**Upstream:** Section, Console. A recurring tell here is usually inherited from these layers: trace it there and fix it once, not once per file here.

## Tells

A tell fires on a page shape nobody decided. The same shape chosen on purpose and recorded in the brief is a register, not a tell.

| ID       | Symptom                                                                                                                                                                                                                                      | Why it dates                        | Replacement                                                                                                                                                         | Detector                                                                                                                                             |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| PAG-G1-1 | One fixed-width centred column on a tiled or grey backdrop; heading, rule, paragraph, rule; layout by nested tables, spacer images or `<br>` stacks; a page ending with a counter and "Last updated"                                         | Table layout; self-publishing       | A page grid with a column-span decision per section, fluid to the viewport, with the reading measure as a token; quiet footer chrome                                | `w-[800px] mx-auto` (a fixed `width`, not a `max-width` measure); repeated `<hr />`; `<table>` for layout in a page; `mailto:` in a footer paragraph |
| PAG-G2-1 | A 960px wrapper with side shadows over a textured body; every section in a bordered box with a coloured header band; sidebars of boxed widgets; engineered for 1024x768 with an "Enter site" page                                            | Fixed wrapper layouts; portal pages | A full-bleed page with an inner measure; side regions only if they carry function; layout tested from small to very wide                                            | `max-w-[960px] mx-auto shadow-xl` over a gradient body; `grid-cols-[200px_1fr_200px]`; `min-h-[768px]`                                               |
| PAG-G3-1 | The Bootstrap skeleton as a whole: navbar, jumbotron, a 12-column `.container > .row > .col-md-*` grid, a four-column footer; a long single page with anchor navigation. A column grid built on tokens (Stripe's 12 columns) is not the tell | The Bootstrap skeleton              | Page shape set by content; some pages full-bleed, some narrow; section awareness while scrolling                                                                    | `.container > .row > .col-md-*`; `#top`                                                                                                              |
| PAG-G4-1 | Every page is a centred column of stacked sections at the same max width                                                                                                                                                                     | Uniform page shape                  | Pages differ by job (landing, detail, workspace); width and alignment change within a page                                                                          | `<Hero/><Features/><Pricing/><CTA/>` in one wrapper; every page inside the same `max-w-*`                                                            |
| PAG-G4-2 | The page ends with a gradient CTA band that repeats the hero's ask, unrelated to the argument. Footers are judged in `layers/12-chrome.md` (CHR-G4-3)                                                                                        | The template close                  | The ending is the last beat of the argument                                                                                                                         | `bg-gradient-to-r` CTA section before `<Footer>` whose copy repeats the hero's                                                                       |
| PAG-G4-3 | Content pops in on a route change and nothing persists: the frame remounts and its state resets                                                                                                                                              | No continuity                       | The frame persists across routes, and route-change motion is a recorded decision: shared elements carried across where the product warrants it, or a deliberate cut | chrome rendered inside `page.tsx` instead of a layout; no route-change decision in the brief                                                         |

## Floor versus baseline

A competent fourth-generation page is a clean stack of correct sections in one centred column at one width. It lacks a shape: width and structure chosen for the page's job, text and media widths set independently, and on marketing an arc that ends on the argument rather than a template close. The baseline asks for those; the register decides how the frame around the content looks.

## Baseline

Every register meets these. Counts are of the 18 exemplars (`references/classification-ledger.md`, section 11).

- **PAG-B1. Shape follows the job.** Detail, list, workspace, settings and landing pages differ in width and structure, each chosen for what the page is for. `(S 1/18, thin)` Apple only.
- **PAG-B2. Measure and media set independently.** Within a page, text holds its reading measure while media and full-bleed bands run wider, each from its own width token. `(S 5/18)` Pudding, Stripe Press, Apple (text at 400 to 820px, media to 1800px), Notion, Things (ledger 02.5).
- **PAG-B3. Marketing: the page has an arc.** A first beat that states the idea, a turn, proof, and a close that completes the argument. The ending is a beat of the argument, not a repeat of the hero's ask. `(J, thin)`
- **PAG-B4. Per-route metadata.** Each route sets its own title and description from constants through the root template (ROO-B10), with a share image. `(J, thin)`

## Register notes

How each register realises this layer. Full detail in `registers/`.

| Register       | Page decisions                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editorial      | Reading order first; text held at a reading measure (Pudding's 720px column, Stripe Press's 380 and 440px text columns); image-first story cards for feeds; the content object as the navigation (Stripe Press's shelf)                                                                                                                                                                                          |
| Warm utility   | App: content distinct from a quieter warm sidebar, with a centred document column (Notion). Marketing: a narrow hero column inside a wider container (Things, 440px inside 900px)                                                                                                                                                                                                                                |
| Tactile        | Marketing: image-led tiles at zero radius with text beneath and no card chrome, scaled in proportion to the viewport (Teenage Engineering)                                                                                                                                                                                                                                                                       |
| Industrial     | Regions divided by drawn rules rather than cards (Ableton's 2px rules). Otherwise no distinct evidence; follow the baseline                                                                                                                                                                                                                                                                                      |
| Trust          | App: content against a sidebar that is only a tint (Mercury, 1.03:1) or the same white (Wise); data pages as title, tabs, filters, then content. Marketing: light and dark section themes that alternate with the narrative, the nav re-theming to match (Mercury)                                                                                                                                               |
| Playful        | App: content beside a deliberately loud labelled sidebar (Duolingo), or against a neutral grey sidebar (Figma's app). Marketing: colour pairs per section (Figma); a centred landing composition (Duolingo)                                                                                                                                                                                                      |
| Luxury         | Marketing: stacked full-width tiles under a compact nav, each its own composition (Apple); bands alternating tone, with theme flips chosen by the content (Apple); modules on the open canvas (Aesop). No web app in the evidence                                                                                                                                                                                |
| Developer-tool | App: content as a distinct panel lifted against a dimmer frame (Linear, 12px app radius); a page header holding only a breadcrumb at the left and icon actions at the right; data pages as title, tabs, filters, then content (Stripe); pages as bordered panels on the second page background with a 1px alpha ring (Vercel); a launcher page as one list with a bottom action bar and a compact mode (Raycast) |

## Techniques

Register-neutral methods, recommended, not required.

- **Shared-element route transitions.** Where the product warrants continuity (an object opening into its detail), carry the shared element across the route change; otherwise record a cut. Unmeasured in the evidence (Stripe Press's shelf-to-detail transition was not recorded), so it is a technique, not a criterion.

## Token roles this layer needs

Content width by content type (prose, data, media), shared with the section measure tokens; content panel surface and radius against the frame, where the register lifts content; page header height; route-change motion, where the brief records one.

## Checks

Baseline:

1. Does the page shape follow its job, with detail, list, workspace and settings pages differing in width and structure? `[source]`
2. Does text keep its reading measure while media runs wider, each from its own token? `[source]`
3. Marketing: does the page have an arc, and does the ending complete the argument rather than repeat the hero's ask in a gradient band? `[source]`
4. Does each route set its own title, description and share image? `[source]`

Register fit:

5. Does the page shape match the register the brief names (a lifted panel and breadcrumb header, a reading order and measure, stacked tiles), rather than developer-tool by default? `[source]`, look `[app]`
