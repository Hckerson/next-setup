---
name: web-generations
description: >-
    The quality dial for every UI layer, in any style. Classifies work into five
    web generations, named like computer generations, so dated and
    template-looking output is recognised and replaced, and holds the fifth as a
    quality bar that many registers meet (developer-tool, editorial, warm
    utility, tactile, industrial, trust and finance, playful, luxury, or a
    composed one). Use whenever building, restyling or reviewing any layer in
    docs/UI_LAYERS.md (token, scale class, primitive, brand, pattern, mark, row,
    list or modal, section, console, page, chrome, portal layout, root layout),
    for app screens and marketing pages alike, and on "make it premium", "this
    looks basic", "looks like a template", "looks dated", "give it a different
    style" or "audit the UI". Tokens, primitives and file structure stay with
    .claude/CLAUDE.md.
---

# Web Generations

Basic output is what happens when every look decision is made once, globally, as a default. This skill names five generations, tells you which one a layer reads as, and holds every layer you touch to the fifth, in whichever register the product calls for.

Read `.claude/CLAUDE.md` alongside this. It owns vocabulary, tokens and structure; this skill owns how good the look decisions are.

## Three axes, never merged

| Axis           | Question                    | Where it lives                                    |
| -------------- | --------------------------- | ------------------------------------------------- |
| **Generation** | How good are the decisions? | `generations.md`; the Baseline in each layer file |
| **Register**   | Which family of decisions?  | `registers/`                                      |
| **Surface**    | App or marketing?           | The App and Marketing variants in each layer file |

The fifth generation is a quality bar, not a look. Linear, Teenage Engineering, Aesop, Duolingo and Mercury look nothing alike and all meet it. A register is one coherent point of view that meets the bar; the baseline is what every register shares. Confusing the two is how a skill turns one famous product into everyone's template.

## The five generations

Named like computer generations: each is defined by the technology shift that produced its look. Detail and the leak into modern code are in `generations.md`.

| Generation | Technology                                      | Role in this skill                                   |
| ---------- | ----------------------------------------------- | ---------------------------------------------------- |
| **First**  | Hand-written HTML, tables, spacer GIFs          | Avoid. Recognise the tells.                          |
| **Second** | CSS layout, Flash, sliced images, skeuomorphism | Avoid.                                               |
| **Third**  | Bootstrap, jQuery, flat design, carousels       | Avoid.                                               |
| **Fourth** | Component libraries, utility CSS, clean SaaS    | **Floor.** Where default output lands. Not the goal. |
| **Fifth**  | Decided design systems, in any register         | **Target.**                                          |

First to third are never built. They exist so a diff can be recognised against them. The fourth is where unguided output ends up: the **default cluster**, several axes left at a library's default at once. The work of this skill is the gap between the fourth and the fifth.

## The dial

Grade each layer you touch, never the project as a whole. A layer's grade is set by tells that **recur** (3 or more files, or a shared primitive, class or token). Isolated hits are listed and fixed but do not set the grade. `audit.md` has the rule.

- **Third or older: fail.** Fix before reporting done.
- **Fourth: passes only with a stated reason** (a time-boxed placeholder, an explicit instruction, a layer the user said to leave). The reason comes from the user; if none was given, write `pending (user)` and name the missing baseline property.
- **Fifth: the goal.** Every Baseline criterion in the layer file is met or has a named, deliberate exception, and the layer fits the register the brief names.

A **deliberate exception** is a conscious use of an older generation's device in one place (a second-generation gloss on a card, a third-generation table for tabular data). Name it, say why it serves the product, and it is not a tell. A device used across the whole system on purpose (a playful register's hard lip shadow) is not an exception: it is the register, recorded in the brief.

## Surfaces

Pick per surface, before building.

- **App**: dashboards, consoles, forms, settings, anything a person works in. State-complete, efficient for its users, motion that carries meaning. How dense, quiet or loud it is belongs to the register.
- **Marketing**: landing and product pages. Type with tension, a grid, one idea per band, proof as evidence. For scroll-driven, motion-led pages built around a hero object, use the `cinematic-web` skill; this skill's layer files still apply to everything around the hero.

A product may use one register for the app and another for marketing; the brief records both.

**Relation to `cinematic-web`.** The two skills are independent. On a scroll-driven page built around a hero object, `cinematic-web` governs the stage (its scene score, its requirements, such as animating only transform, opacity and clip-path, and its tells) and wins any conflict inside it. This skill governs everything around the stage and every app screen. The two agree on the main bans (gradient text, glassmorphism cards, the same fade-up everywhere, three feature cards); where this skill allows a colour transition on hover, that applies outside the stage.

## Workflow

0. **Brief.** Read `docs/DESIGN_BRIEF.md`. If it does not exist, follow `differentiation.md` to create it, and end the turn for approval unless the user said "just build it". The brief names the register (chosen from `registers/README.md` or composed from its axis menu) and is the authority for the project's own decisions. Every instance (shapes, field order, vocabulary, accent, neutrals) is chosen from it before a layer is built, not after (`differentiation.md`, Property versus instance), and the brief's fingerprint table commits, before building, to how the build's free axes differ from each exemplar of its register.
1. **Classify.** App or marketing. List the layers the work touches (use the table in `docs/UI_LAYERS.md`).
2. **Load.** `generations.md`, `cross-cutting.md`, the register file the brief names, then only the layer files for those layers, from `layers/`. Do not load the rest. Each layer file names its upstream layers; a recurring tell is traced there.
3. **Decide before you write.** For each layer, state the baseline decisions and how the register realises them: roles and ratios, not values. The starter ships no look; project tokens hold every value. Never write a value into this skill's output as "the answer".
4. **Build** against the layer file's Baseline and the register's realisation. Project rules in `.claude/CLAUDE.md` still bind every edit.
5. **Audit** with `audit.md`: run the cross-layer detectors, grade the baseline, check register fit, fix anything at the third generation or older. When the user asks to verify in the app, run `verify.md`. To add a new reference, follow `capture.md`.
6. **Differentiate.** Re-run the brief's fingerprint table against the code, run the checks in `differentiation.md`, and append the build to `references/fingerprints.md`.
7. **Report** the audit table. A layer not audited is reported as **Not audited**, never as passing.

## How the layer files work

Every layer file has the same sections.

- **Tells**: symptom, why it dates, the replacement as a design decision, and a detector in the vocabulary of Tailwind, CSS and React. IDs look like `TOK-G4-2` (layer, generation, number) so an audit can cite them. A tell fires on an undecided default, never on a register's deliberate choice.
- **Floor versus baseline**: what a competent fourth-generation version looks like and the property it lacks.
- **Baseline**: what every register must meet. Each criterion carries its evidence: `(S n/18)` means it was measured or documented in n of the 18 exemplars across the eight registers; `(J)` means judgement from design practice. **An `(S)` criterion states a property to meet, never an instance to copy.** "A distinct silhouette per state" is the property; Linear's dashed, half and check circles are an instance. The instance comes from the project's brief and its domain.
- **Register notes**: how each register realises the layer, pointing at its file in `registers/`.
- **Token roles**: what the layer needs from `styles/tokens.css`, as roles.
- **Checks**: Baseline checks (pass or fail) and register-fit checks (does the layer match the register the brief names). `[source]` can be answered from the code; `[app]` needs the running app and goes to Unverified when it cannot run.

A replacement is always a decision with a property you can check, never a flat prohibition. A rule that says "no X" with nothing to do instead is the failure mode this skill exists to avoid.

## What this skill does not do

- It does not duplicate lint rules. `no-comments`, `one-component-per-file`, `page-composes-only`, `api-access-boundary`, `retired-colours`, spacing and type ceilings are enforced by the repo; read `eslint.config.ts` before citing one.
- It does not prescribe a look. Palettes, fonts and sizes come from the project's tokens, and the project's identity comes from its brief, never from a reference product.
- It does not touch `design-os/`. Design OS never prescribes visuals; this skill applies when a page is built.

## Evidence

- `references/fifth-evidence.md`: Linear, Stripe, Vercel, Raycast, Apple (fetched 2026-11-09).
- `references/registers/`: the eight registers' exemplars (2026-11-10), each claim tagged as quality or register, with what each exemplar breaks. Headspace (playful) and Bear (warm utility) were added on 2026-11-12 at register level; the `(S n/18)` baseline counts in the layer files are over the original 18 exemplars and were not re-counted.
- `references/measured-captures.md`: computed values from the user's rendered captures of 22 sites.
- `references/classification-ledger.md`: every layer criterion classified as baseline or register, with counts.
- `references/ground-truth.md`: what real frontends read as; the calibration for the audit.

The tells for the first to fourth generations are from design history and code-pattern knowledge, not cited sources; treat them as strong heuristics. Do not assert anything the evidence marks UNVERIFIED. Exemplars set the aesthetic bar, not the accessibility bar: several fail baseline properties, and each register file lists those gaps.
