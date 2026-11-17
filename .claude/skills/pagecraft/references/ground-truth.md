# Ground truth

What real frontends in this codebase family actually contain, as file:line evidence, so the audit can be calibrated: run it blind on the same code and confirm it finds the same default-cluster tells and credits the same deliberate decisions.

## Real-estate frontend (re-calibrated 2026-11-11)

Repo `projects/web/real-estate/frontend`, HEAD `126c4ac` (2026-11-09) plus uncommitted stack changes. Read-only pass; class counts from `.tsx`/`.ts` excluding tests, variant-prefixed uses included.

**Stack.** Next 16, React 19, Tailwind 4.1, Base UI (9 importers), CVA, `motion/react` (55 importers, `MotionConfig reducedMotion="user"`, named presets in `lib/config/motion.ts` with a parity test). The cinematic libraries (gsap, lenis, three) are installed with three untracked stage files that nothing mounts.

**Brief.** No `docs/DESIGN_BRIEF.md` and no `docs/UI_LAYERS.md`. The written design decisions are ADR 0012 (tokens are the source of truth) and ADR 0024 (colour is paper, ink, forest and one alarm). Register fit cannot be graded without a brief; the ADRs and the Fraunces serif with light display weights point toward an editorial or luxury register on a warm paper ground.

### Per layer

| Layer          | Deliberate decisions (credit these)                                                                                                                                         | Default cluster (flag these)                                                                                                                                                                                                                        |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Token          | One brand hue ramp in OKLCH with a P3 upgrade and one alarm colour (`tokens.css:9-19,322-332`); mobile-first type scale with light display weights (`:69-118`)              | Stock Material easings (`:176-180`); shadow ramp sm to 2xl plus elevation-1..3 duplicating it (`:186-194`); dead `--stat-card-*`, `--icon-*`, `--opacities-*`, every `--font-weights-*` (`:62-67,234-265`)                                          |
| Scale class    | Container-query layouts (`globals.css:265-267,327-363,392-456`); hover reveal with a touch fallback (`:208-241`); hairline stat band (`:473-485`)                           | Dead `.smooth { transition: all }` (`:191-193`), `.stat-card`, `.metric-*` and about 20 more unused classes; `.micro-label` at 10px against the 12px floor stated in `tokens.css:111`; breakpoints written six ways                                 |
| Primitive      | Base UI overlays with data-attribute enter and exit (`modal.tsx:55,61`); one-alarm tones (`status-badge.tsx:34-53`); one focus-visible ring recipe (`button-variants.ts:4`) | `Panel` is `rounded-xl border p-4 pt-3 shadow-sm` and is used by 60 files (`panel.tsx:35`); `StatCard` has `transition-all hover:-translate-y-0.5 hover:shadow-md` (`stat-card.tsx:17`); seven primitives with 0 consumers                          |
| Brand          | Custom monogram path (`logo-mark.tsx:5-6`)                                                                                                                                  | Placeholder name "Luxury RE" (`wordmark.tsx:74`); the public header rebuilds the logo in CSS with a different shape (`header.tsx:51-58`)                                                                                                            |
| Pattern        | Arrow-key review queue with `aria-current` (`review-queue.tsx:29-42`)                                                                                                       | `rounded-xl border shadow-sm` container recipe in 5 patterns; hover-only reveals with no touch fallback (`data-table-row.tsx:112`, `data-table-head-cell.tsx:67`); 17 of 18 durations are 200                                                       |
| Mark           | Status as toned text, no pills (17 of 34 marks); quiet default state                                                                                                        | Icon in a tinted square repeated 6 times                                                                                                                                                                                                            |
| Row            | Flat rows on a container-query grid (`deal-ledger-row.tsx:37-46`); whole row is one labelled button                                                                         | Card-per-row with `transition-all duration-300 hover:shadow-md` (`listing-row.tsx:37`, `deal-row.tsx:53`)                                                                                                                                           |
| List and modal | Semantic lists with column-naming labels; `ConfirmModal` locks while a write is pending (26 of 47 modals)                                                                   | Every modal at default `max-w-md` with one stock entrance; hover-only date reveal (`timeline-list.tsx:45`)                                                                                                                                          |
| Section        | Hairline grid bands; "most at stake" heroes                                                                                                                                 | The shadow tile `border-accent/25 bg-background rounded-xl border p-4 shadow-md` copied into 14 files; home cards with lift, `transition-all` and image zoom (`sale-card.tsx:15,24`)                                                                |
| Console        | Three-state contract (unavailable with retry, shape-matched skeleton, content) in 31 of 32 consoles                                                                         | One rhythm and one template order everywhere                                                                                                                                                                                                        |
| Page           | Thin composing pages; per-portal `error.tsx` and `loading.tsx`                                                                                                              | 33 portal pages with no metadata; every home section wrapped in the same fade-up                                                                                                                                                                    |
| Chrome         | `aria-current` across the nav; Cmd+K palette with roving focus (`use-command-palette.ts:48-61,104-122`); scroll-contracting header                                          | Command palette `aria-expanded` hard-coded (`command-palette.tsx:66`) and `focus:outline-none` (`:70`); mobile sidebar without dialog role, focus trap or `inert` (`sidebar.tsx:46-90`); no skip link; literal motion values in `header.module.css` |
| Portal layout  | One guarded shell per portal                                                                                                                                                | Placeholder brand labels; all three client layouts export no metadata                                                                                                                                                                               |
| Root layout    | Three `next/font` families as variables; motion configured once with reduced motion                                                                                         | No root `error.tsx` or `global-error.tsx`; literal `themeColor`; generic SEO copy                                                                                                                                                                   |

### Counts the audit should reproduce

- Duration literals: 169 across 120 files (143 × 200, 16 × 300, 10 × 500); 300 and 500 match no token; 0 token use in classes.
- `transition-all`: 10 files. `transition-colors` 159, `transition-transform` 21, `transition-opacity` 11.
- Radius across `.tsx`: `md` 99, `xl` 65, `lg` 57, `full` 53, `xs` 42; `rounded-2xl` is off-token (2 uses).
- Shadow across `.tsx`: `sm` 40, `md` 28, `lg` 5, `2xl` 3.

### Corrections to the 2026-11-09 calibration

- `deal-ledger-row` was credited with a hover reveal it never had. The touch-safe reveal is the `.reveal-scope` mechanism in `globals.css:208-241`, used by four admin files.
- The dead token and class set is larger than first recorded.

## Fintech frontend (historical, repo deleted 2026-11-10)

Kept for the audit's history only; its files no longer exist, so none of its evidence can be re-checked. The 2026-11-09 pass found a dark luminance theme (near-black ladder, alpha-white borders, one champagne accent) laid over an un-reskinned light starter token file, `transition: all` as a default class, no overlay motion on its native dialog, and strong chrome craft (a shared-layout active indicator with `aria-current`, a skip link and route-change focus). Its marketing metal card was a deliberate second-generation gloss callback: the first worked example of a named exception.

## How to use this file

Run `audit.md` blind on real-estate's layers and compare. A sound audit flags the default-cluster column and credits the deliberate column. If it flags a deliberate decision, the tell that fired needs re-scoping; if it misses a default-cluster item, the detector needs widening.
