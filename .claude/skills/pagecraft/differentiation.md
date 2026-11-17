# Differentiation

Every register has a house style, and copying it is the fourth generation again, one level up: every decision made once, globally, by imitation. The developer-tool family (Linear, Vercel, Stripe, Raycast) is the most copied, because it dominates what an AI has seen: alpha hairlines, a near-black ladder, one cool accent, tight sans type. This gate keeps each project from becoming a clone of its register's exemplars, or of that family by default.

Borrow structure, technique and measured properties. Never borrow a reference's identity.

## The brief comes first

Every project has a design brief at `docs/DESIGN_BRIEF.md`, written from `references/_brief-template.md`. It records the project's own decisions so they are made once, on purpose, and so every later session builds and audits against them instead of re-deriving a look.

`docs/` is where the repo already keeps `UI_LAYERS.md`; the brief lives beside it. The brief states roles and choices, never token values: values go in `styles/tokens.css`.

If the brief does not exist, create it before building any layer: ask once, in one message, only what is missing, draft it, and **end the turn for approval** unless the user said "just build it". An existing brief is the authority; a change to it is a stated decision, not a drift.

## Property versus instance

The layer files state properties ("a distinct silhouette per state", "one line with aligned columns", "finer weight steps", "alpha borders"). A reference realises each property with an instance (Linear's dashed, half and check circles; its identifier-first row; its weights). The property is the requirement. The instance is the reference's identity, and it is the thing a project must not copy.

Before building a layer, decide the instance from the brief:

1. State the property the layer file requires.
2. Name the project's domain cue that supplies the instance (a real status in the product's world, the first thing an operator reads about this entity, a unit the domain measures in). List at least three candidate sources per cue, note which earlier builds in the same domain already used which, and choose an unused one.
3. The alternatives listed in a register file are directions, not instances. If you take one, show the domain source that produces it independently.
4. If no domain cue supplies it, the instance is a default: stop and either find the cue or ask.

A build that reproduces an exemplar's instances on most of its free axes is a clone and fails, even if every criterion in every layer file is met (see the gate below). Meeting the properties with the reference's instances is the failure this gate exists to catch.

## What the brief must contain

- **Product and audience**, and what the user must feel after five seconds.
- **Register**: one of the eight in `registers/README.md`, or a composed one with a position on every axis of its menu. Name it per surface if app and marketing differ. The register is chosen from the domain and the audience, never from what is most familiar.
- **Mood**: three adjectives, none of them "modern", "clean" or "sleek".
- **Subject-derived cues**: what in the product's own world supplies its identity. The accent, the neutrals, the status vocabulary and one recurring device must each trace back to something real in the domain, not to a reference product. If a decision cannot name its source in the domain, it is a default.
- **Surface and themes**: app, marketing, or both; light, dark, or both.
- **Density**: body size and row pitch as decisions.
- **Signature device**: one thing that recurs across layers (a mark shape, a rule treatment, a numeric style, a status glyph family) so the product is recognisable with the logo hidden.
- **Deliberate exceptions**: any older-generation device used on purpose, with its reason and where it is confined.
- **References used** and what is borrowed from each, as properties.

## The fingerprint gate

Two tests, both run on what the build actually renders, never on the brief's story about it. "Accent from layout fluid" and "accent from Notion" are the same accent if both render the same blue.

**Judgeable axes.** Count only the axes the build realises. A build with no chrome has eight judgeable axes, not nine.

| Axis                | Position (menu level)                                   | Instance match (exemplar level)                                                                                                                                                                                                   |
| ------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neutral temperature | Cool, warm, ink-tinted, or pure                         | Tint hue within about 30 degrees in OKLCH, and chroma in the same band: pure (under 0.005), faint (0.005 to 0.02), strong (over 0.02)                                                                                             |
| Accent              | How many hues, and where they are spent                 | Same hue family (OKLCH hue within about 25 degrees) spent in the same places. State hues count here only when they are also the action or selection colour; ink as the action matches ink as the action                           |
| Type voice          | Face class and pairing                                  | The same face, or the same face class (neo-grotesque, humanist, geometric, rounded, serif, slab, mono) in the same pairing and size structure                                                                                     |
| Density             | Expert-high, medium, low, poster                        | Body size within 1px and row or control height within 4px                                                                                                                                                                         |
| Shape language      | Zero, stepped family, one value, pill, soft             | The radius set within 2px per role                                                                                                                                                                                                |
| Elevation recipe    | Ladder, hairline, fill, lip, rules, glass, shadow, none | The same mechanism with similar parameters: lip within 1px, rule width equal, shadow layers and blur in the same band                                                                                                             |
| Signature device    | The recurring motif                                     | The same mechanism, whatever its story (press travel on a lip; per-object page colour; a keyboard chip). A glyph plus its word is the baseline for every mark, not a signature; a glyph family matches only when its shapes match |
| Chrome model        | Sidebar, top bar, tabs, rail, command-first, none       | The same model in the same position                                                                                                                                                                                               |
| Value economy       | Very economical, economical, moderate, expressive       | The same band. Count distinct durations (dwells, loops and JS motion included), easings and radii across the build: very economical at most 1 of each, economical at most 2, moderate 3 to 5, expressive more than 5              |

**Test 1, between builds.** `references/fingerprints.md` has one row per shipped build. A new build differs from every earlier row on at least 4 judgeable axes, at position or instance level. When several builds are made in one run or one repo, they are each other's earlier rows. Two builds that draw on the same domain source for a cue (the same standard, object or colour code) match on that axis even if the values differ.

**Test 2, against exemplars.** Each register file splits its axes into **core** (what defines the register; matching its exemplars there is expected) and **free** (where the exemplars' values are instances, not the register). Compare the build with each exemplar of its register, and with the developer-tool member that matches it most (never the one that matches least), at instance level on the free judgeable axes of the build's own register. A build that matches any single exemplar on more than half of those axes is a clone and fails. The brief commits to this before building: for each exemplar, it names which free axes will differ and with what instance (`references/_brief-template.md`). After building, re-run the table against the code.

The two tests catch different failures: the first stops a project repeating itself, the second stops it repeating someone else.

After building, append the row. The canonical `fingerprints.md` lives in next-setup; a repo that syncs the skill keeps its own rows, and a cross-project comparison needs the canonical copy.

## Checks

1. Does `docs/DESIGN_BRIEF.md` exist and does the build follow it?
2. Does each of the accent, the neutrals, the status vocabulary and the signature device name a source in the product's domain?
3. Does the build differ from every earlier row on at least 4 judgeable axes?
4. Against each exemplar of its register and the developer-tool family, does it match at instance level on at most half of the free judgeable axes?
5. Is the signature device present in at least three layers?
6. Is the row appended to `references/fingerprints.md` (by the builder; a read-only audit reports it as not done)?
