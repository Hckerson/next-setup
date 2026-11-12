# The five generations

## What defines a generation

A generation is a technology shift and the look it produced. The tells in the layer files are the traces of those shifts in modern React and Tailwind output.

| Generation | Era               | Enabling shift                                                                              | Signature                                                                                                                      | How it leaks into modern code                                                                                                                                  |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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
