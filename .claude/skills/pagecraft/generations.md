# The five generations

## What defines a generation

A generation is a technology shift and the look it produced. The tells in the layer files are the traces of those shifts in modern React and Tailwind output.

| Generation | Era               | Enabling shift                                                                              | Signature                                                                                                                      | How it leaks into modern code                                                                                                                                  |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pre-first** | Any         | Nothing; a placeholder shown as work                                                        | Unstyled browser defaults, lorem ipsum, grey boxes for images, a library's demo page with the name changed                     | Scaffolds left in place: `Lorem`, `placeholder.svg`, a starter's demo copy, an unstyled `<button>`. Never shown to the owner or a client                          |
| **First**  | 1990s             | Hand-written HTML; layout by tables                                                         | Default fonts and colours, fixed centred column, rules and `<br>` for space, counters and "NEW!" markers                       | Literal reads of "classic" or "retro": `<table>` layout, `<hr>`, `window.confirm`, `[edit] [delete]` strings, `>>` markers                                     |
| **Second** | 2000s             | CSS layout, Flash, sliced images, early CSS3                                                | Bevels, gloss, gradients, reflections, ribbons, inset shadows, fixed 960px wrapper                                             | "Skeuomorphic" or "Web 2.0" prompts, copied gradient-button snippets: `bg-gradient-to-b` plus `shadow-[inset_...]`, `drop-shadow` on text, `rotate-45` banners |
| **Third**  | 2010s             | Bootstrap, jQuery, responsive grids                                                         | Flat saturated role colours, carousels, stock-photo heroes, three icon columns, hamburgers, admin templates                    | Bootstrap class names, `col-md-4 text-center`, `carousel`, `navbar-toggler`, Font Awesome                                                                      |
| **Fourth** | late 2010s to now | Component libraries, utility CSS, design tokens                                             | Clean SaaS: one sans, soft shadow on rounded cards, pill badges, bento, purple-blue gradients, logo cloud, three feature cards | The model's default: unmodified shadcn, `rounded-xl border shadow-sm`, `transition-all duration-200`, `text-muted-foreground`                                  |
| **Fifth**  | now               | Decided design systems in many registers; real state coverage; GPU where it earns its place | Decisions made per context and tied by a system with tension                                                                   | Not a leak; the target                                                                                                                                         |

## Why the fourth is the dangerous one

The first three are obvious and rarely produced. The fourth looks finished, so it ships. It is correct, accessible and consistent, and it reads as a template because it makes every decision once, globally, as a default.

**One idea separates fourth from fifth.** The fourth decides once and applies everywhere: one radius, one shadow, one duration, one spacing step, one type ratio. The fifth decides per context and ties the decisions together with a system that has tension: a deliberate scale jump, a deliberate density change, a deliberate silence. `(J)`

**The count of values is not the test; who chose them is.** Measured on the references (`references/measured-captures.md`): Teenage Engineering uses one radius and one background on its homepage, Ableton no radius at all, Vercel's docs two durations, while Stripe's homepage uses 23 durations and 24 easings. All are top tier. How many values a page uses is a register trait (value economy, see `differentiation.md`), not a generation.

The fourth-generation tell is the **default cluster**: several axes left at a library's or framework's default at once, with no decision recorded anywhere.

| Axis            | Fourth (the default cluster)                                                          | Fifth (a decision, in any register)                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Radius          | The library radius (`rounded-lg`, `rounded-xl`) on every surface because it was there | A radius family, or one deliberate radius (even zero), recorded in the brief as the shape language `(S)`                                                                                     |
| Elevation       | One soft shadow on every card, a shadow change as the hover affordance                | One depth recipe chosen for the register (a ladder and hairlines, tone steps, a hard lip, solid rules, fills, or none) and applied everywhere; real shadow only where something floats `(S)` |
| Duration        | The framework default (`duration-200`, `ease-in-out`) on everything                   | Durations and curves chosen per interaction; economical registers may use only one or two, on purpose `(S)`                                                                                  |
| Type            | One neutral sans at a ratio near 1.2, because it was the default                      | Roles with their own size, leading, tracking and weight `(S)`                                                                                                                                |
| Section spacing | Equal gaps                                                                            | Varies by narrative role `(J)`                                                                                                                                                               |
| State coverage  | Populated state only                                                                  | Empty, loading, error, selected, disabled designed `(S)`                                                                                                                                     |

One axis at a default is a gap. Three or more at once is the fourth generation.

## The fifth, defined

Six properties. All are required; none is a look.

1. **Every key screen could be a styleframe.** Two or three screens at final quality (a marketing band, the densest app screen, one state that is not the populated one) pass the blind critic (`critic.md`) before the rest is built.
2. **Decided per context, tied by a system with tension.** The idea above: the fourth decides once, the fifth decides per context and ties the decisions together.
3. **The world is the source.** Every instance (accent, neutrals, type, status vocabulary, signature) traces to an artefact or standard of the sector's world (`worlds/`), so the build fails the swap test: with a competitor's logo it reads wrong.
4. **Every state is designed.** Empty, loading, error, selected, disabled, too long, and offline where it applies, each in the same system as the populated state.
5. **Marketing: one composed world, not a stack of boxes** (PAG-B5). Owned imagery and decided tokens inside stacked boxes are the third generation polished (PAG-G3-2).
6. **One product on every device.** A phone gets the same product rearranged for the hand, never a cut-down page.

On top of the baseline, each build earns **one signature move**: its signature device, taken from a world artefact, carried through at least three layers. It is recorded in `references/fingerprints.md` with its source and struck from the next draw, so no signature hardens into the next template.

## Convergence

A build can pass every layer and still be the last build again, someone else's build, or the category's template. These tells are graded across the whole build, not per layer.

| ID        | Gen    | Tell | Detector | Instead |
| --------- | ------ | ---- | -------- | ------- |
| CONV-G4-1 | Fourth | The build resembles an earlier build | Fewer than 4 axes differ from a row in `references/fingerprints.md`, or `shoot.mjs --compare --fingerprints` finds a row within the threshold | Redraw the axes that match, with `--avoid`, and measure again |
| CONV-G4-2 | Fourth | The build clones an exemplar of its register | More than half the free judgeable axes match one exemplar at instance level (`differentiation.md`, Test 2) | Take the matching axes' instances from the world instead |
| CONV-G4-3 | Fourth | The frame is the category's template: what a template marketplace or stock library returns for the sector | Frame (J): a blind viewer names it as the sector's template; the world file lists what that template is | The world's own artefacts: its documents, panels and standards, not its stock photo |
| CONV-G4-4 | Fourth | The swap test fails: a competitor's logo fits | Frame (J): with the logo replaced by a competitor's in the same sector, nothing reads wrong; or the brief cannot name a world source for the accent, type or signature | Trace the failing cue to a world artefact the competitor does not own |

## Grading

- **Prevalence.** In code: a tell in 3 or more files, or in a shared primitive, class or token. In frames: a tell on at least half the sampled frames of one surface (`critic.md`, Sampling). Either sets the layer's grade. The first paint of the home route is the first impression: a tell on it sets the grade of Page and Root layout whatever the count. An isolated hit is listed and fixed.
- **Evidence** is a file and line, or a captured frame with its measured numbers. A grade without evidence is not a grade.
- **Blind.** Frame grades come from the critic (`critic.md`), never from the session that built the frames. The builder's own audit (`audit.md`) finds tells to fix; it does not grade.
- **Fifth with gaps** when no tell recurs but a baseline criterion is unmet; it is not Fifth until met or named as a deliberate exception.
- **First paint before the overall reading.** Apply the first-paint rule to Page before reading the build as a whole: a third-generation tell on the home route's first screen makes Page Third, whatever the other screens show.

## Where the owner's bar sits

The owner's scale is stricter than any published jury, and it is the scale this ladder serves (`references/calibration.md`):

| Specimen | Owner's grade |
| -------- | ------------- |
| Best-selling sector templates | Third |
| Award-winning marketing sites built as stacked bands of boxes, however polished | Third: "boxed up" |
| A page whose stage is crafted but sits beside a conventional copy column, so page and stage never become one composition | Fourth |
| A page inventive throughout (content as objects, scroll as choreography, play tied to the story) whose craft or world-binding stops short of the five Fifth properties | Fourth |
| Fifth | Nothing captured yet. Above the stage build; it is not the ceiling |

The inventive page above sets the floor for creativity, not the target: every build starts at that level of invention (content as objects, scroll as choreography, one moment of play tied to the story) and goes past it in its own direction. A build whose ideas are less inventive than that page's is not shown to the owner, whatever its craft. Reaching that level by borrowing its devices, with no source in the build's own world, is a clone (CONV-G4-2), not a pass.

A critic that reads anything here above the owner's grade is too soft. Named specimens are in `references/calibration.md`, which critics never read. Never treat an earlier build as the target.

## Overall reading

Layers are graded one by one; an owner judges the whole. The overall reading is the generation most graded layers sit at, capped by the Page layer on a marketing surface: **a marketing page never reads above its Page grade**, because the page is the composition and polish inside a boxed page does not lift it (PAG-G3-2 on the first paint caps the build at Third). Then one override: **a build that is the sector's template (CONV-G4-3) and fits a competitor's logo (CONV-G4-4) and carries a third-generation or older tell on its first paint reads Third**, however finished its primitives and chrome. Polish on top of a template does not lift the template. Set by the owner's verdict on a Site of the Day the critics had read Fourth by majority (`references/calibration.md`, 2026-11-18).

## Calibration: what real code reads as

Two production frontends from this codebase family were read layer by layer (`references/ground-truth.md`). Both read as fourth to fifth. Neither contains the first, second or third generation anywhere.

The consequence for audits: **fifth-generation behaviour is easy to pass** (focus rings, skeletons, a command palette, reduced motion). The tells that still appear, and so the checks that discriminate, are:

1. **Depth by a repeated shadow instead of a system.** `rounded-xl border shadow-sm` on every surface, `hover:shadow-md` as the affordance. One faint edge shadow on a light theme is not the tell; sameness everywhere and shadow as the hover signal are.
2. **One radius everywhere**, with no nesting logic.
3. **`transition: all`** as the default transition.
4. **Overlays with no enter or exit motion.**
5. **Dead starter tokens and classes** left beside the live theme, so nobody can tell which are real.

Start every audit with these five. `audit.md` has the detectors.

## Deliberate exceptions

A device from an older generation, used on purpose, is a design decision, not a tell. One production example: a marketing card with a gradient and a sheen sweep, chosen as a conscious second-generation callback for a card product. The rule is to name it. The audit records the exception, the reason, and where it is confined.
