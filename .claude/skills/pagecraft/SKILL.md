---
name: pagecraft
description: >-
    The quality dial for every UI layer, in any style. Classifies work into five
    web generations, named like computer generations, so dated and
    template-looking output is recognised and replaced, and holds the fifth as a
    quality bar that many registers meet (developer-tool, editorial, warm
    utility, tactile, industrial, trust and finance, playful, luxury, or a
    composed one). Use whenever building, restyling or reviewing any layer in
    docs/UI_LAYERS.md (token, scale class, primitive, brand, pattern, mark, row,
    list or modal, section, console, page, chrome, portal layout, root layout),
    for app screens and ordinary marketing pages (an animated, scroll-driven landing page is built with the stagecraft skill), and on "make it premium", "this
    looks basic", "looks like a template", "looks dated", "give it a different
    style" or "audit the UI", for any client in any sector of the economy
    (each sector's world supplies the look's sources). A blind critic grades
    styleframes before the build. Tokens, primitives and file structure stay
    with .claude/CLAUDE.md.
---

# Pagecraft

Basic output is what happens when every look decision is made once, globally, as a default. This skill names five generations, tells you which one a layer reads as, and holds every layer you touch to the fifth, in whichever register the product calls for.

Read `.claude/CLAUDE.md` alongside this. It owns vocabulary, tokens and structure; this skill owns how good the look decisions are.

## Four axes, never merged

| Axis           | Question                    | Where it lives                                    |
| -------------- | --------------------------- | ------------------------------------------------- |
| **Generation** | How good are the decisions? | `generations.md`; the Baseline in each layer file |
| **Register**   | Which family of decisions?  | `registers/`                                      |
| **World**      | Where do the instances come from? | `worlds/`, one per sector in `docs/economy-coverage-map.md` |
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
- **Marketing**: landing and product pages. Type with tension, a grid, one idea per band, proof as evidence. For scroll-driven pages where an actor performs, use the `stagecraft` skill; this skill's layer files still apply to everything around the stage.

A product may use one register for the app and another for marketing; the brief records both.

**Relation to `stagecraft`.** The two skills are independent. On a scroll-driven page built around a performing actor, `stagecraft` governs the stage (its script, its requirements, such as animating only transform, opacity and clip-path, and its tells) and grades it with its own `generations.md`; it wins any conflict inside the stage. This skill governs and grades everything around the stage and every app screen. The two agree on the main bans (gradient text, glassmorphism cards, the same fade-up everywhere, three feature cards); where this skill allows a colour transition on hover, that applies outside the stage.

## Workflow

Steps 2 and 4 end the turn for approval unless the user said "just build it".

0. **Intake.** Ask once, only what is missing: what the client does and for whom, the belief after five seconds, the action, mood (never "modern", "clean", "sleek" or "premium"). Find the sector in `docs/economy-coverage-map.md`; its interface archetype is a requirement and its world is the source of every instance. With no client, take an open sector (the next ten first) and invent a realistic client; placeholder copy is marked.
1. **Truth sheet.** Five lines: what it is, what it replaces, the moment of use, the moment of action, the feeling. When the page also has a stage, it is the same truth sheet as `docs/STAGE_BRIEF.md`.
2. **Directions.** `node .claude/skills/pagecraft/tools/draw.mjs --sector "<sector>"` deals three directions (a register plus a position on each of the nine axes), striking every value earlier builds used. Bind each to the world: name the artefact or standard that supplies the accent, neutrals, type, status vocabulary and signature, and run the swap and stock tests (CONV-G4-3, CONV-G4-4). Recommend one and say what you kept from the user's idea. Never override a card because it feels unfamiliar; redraw with `--lock` only for a truth the client demands.
3. **Brief.** `docs/DESIGN_BRIEF.md` from `references/_brief-template.md`: the direction, its world sources, every decision as a role, and the fingerprint comparison (`differentiation.md`). The brief is the authority from here on.
4. **Styleframes.** Build two or three key screens at final quality (a marketing band, the densest app screen the archetype needs, and one non-populated state), capture them (`verify.md`), and have two critics grade them blind (`critic.md`). Only frames graded Fifth, or Fifth with named gaps, go to the user, with the tables. The look is approved before the rest is built.
5. **Build.** Classify the surface and the layers (`docs/UI_LAYERS.md`); load `generations.md`, `cross-cutting.md`, the register file, the world file, and only the layer files touched. Decide each layer's baseline and its realisation before writing, as roles, never values. Project rules in `.claude/CLAUDE.md` bind every edit.
6. **Dailies.** After each iteration, capture with the fixed sampling, run the critics, and take their three changes as the next iteration's list. Log each round in the brief.
7. **Audit and verify.** `audit.md` finds tells to fix (the builder's pass); `verify.md` answers the `[app]` checks with frames and the style census. The critics' tables are the grade.
8. **Differentiate.** Re-run the fingerprint comparison against the rendered build, append the measured row to `references/fingerprints.md`, and tick the sector in the coverage map.
9. **Report** the critics' audit table. A layer not graded is reported as **Not graded**, never as passing. To add a reference, follow `capture.md`.

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
- `references/calibration.md`: the critic's blind grades against the owner's verdicts.
- `worlds/`: each world's artefacts, standards and category template; captured exemplars per world as they are added.

The tells for the first to fourth generations are from design history and code-pattern knowledge, not cited sources; treat them as strong heuristics. Do not assert anything the evidence marks UNVERIFIED. Exemplars set the aesthetic bar, not the accessibility bar: several fail baseline properties, and each register file lists those gaps.
