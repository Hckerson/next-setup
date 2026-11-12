# Design brief: <project>

Copy to `docs/DESIGN_BRIEF.md` in the project. Roles and choices only; token values live in `styles/tokens.css`. Mark anything not yet decided as **open**, not guessed.

## Product

- **What it does, and for whom:**
- **After five seconds the user must feel:**
- **Mood (three adjectives, not "modern", "clean" or "sleek"):**

## Register

- **Register (app):** one of `registers/README.md`, or composed (fill every axis below and state its core axes).
- **Register (marketing), if different:**
- **Why this register fits the domain and audience:**
- **Core axes (from the register file):** these will match the register's exemplars, as expected.
- **Free axes:** the rest. The comparison at the end commits to how each differs from each exemplar.

## Surface

- **App, marketing, or both:**
- **Themes (light, dark, both):**

## Subject-derived cues

Each must name its source in the product's own domain. The rendered result counts, not the story: a domain blue that renders like an exemplar's blue is that exemplar's blue.

| Decision                                         | Choice | Source in the domain | Other candidate sources considered |
| ------------------------------------------------ | ------ | -------------------- | ---------------------------------- |
| Accent (hues, their jobs, where spent)           |        |                      |                                    |
| Neutral temperature                              |        |                      |                                    |
| Status vocabulary (states, shapes, tones, words) |        |                      |                                    |
| Signature device                                 |        |                      |                                    |

## Decisions

- **Density:** body size, row pitch and control height, and why.
- **Type voice:** faces, roles, and the two axes on which display (or title) and body differ. How the faces are loaded.
- **Shape language:** the radius character, per role.
- **Spacing:** the base unit and the steps in use.
- **Border treatment, per theme:** alpha hairline, opaque rule, inset ring, or none; width.
- **Elevation recipe, per theme:**
- **Focus indicator:** its style, colour and offset, how it reaches 3:1 on every surface (including over any lip or fill), how it differs from any resting border, and the root `:focus-visible` default.
- **Forced colours:** what changes under `forced-colors: active`.
- **Selected-state recipe:** one recipe, reused on every selected thing.
- **Row anatomy:** the field order for each listed entity, first field first, and why; numeric columns and their alignment; row actions at rest or revealed on hover.
- **Chrome model:**
- **Value economy:** economical, moderate or expressive, read against the scope of the build.
- **Motion character:** durations and curves by interaction, in roles; name every easing curve and where it comes from (an unnamed library curve is a default).
- **Overlay enter and exit:** designed timing, or a recorded instant cut; whether exit is faster, equal or slower; the small-screen form (dialog, sheet or full screen).
- **List changes:** how rows enter, leave and reorder, or a recorded cut.
- **Reduced-motion policy:** what stops, what remains (a state change that carries meaning may remain).
- **Casing:** sentence case or Title Case for titles, buttons and labels.

## Register-wide devices

Devices that belong to the register and recur across the system (a playful register's lip, an industrial register's rules). These are not exceptions.

| Device | Where it recurs | Its logic (what it means or does) |
| ------ | --------------- | --------------------------------- |

## Deliberate exceptions

An older-generation device used on purpose in one confined place.

| Device (older generation) | Reason | Confined to |
| ------------------------- | ------ | ----------- |

## References

| Reference | What is borrowed (as a property) |
| --------- | -------------------------------- |

## Fingerprint comparison

Fill before building, then re-check against the code after building (`differentiation.md`, The fingerprint gate). Instance level, per axis, using the match rules in `differentiation.md`. One table per exemplar of the register, plus one for the developer-tool family (its closest member). Count only axes this build will realise.

| Axis                | Core or free | This build's instance | Exemplar's instance | Match or differ |
| ------------------- | ------------ | --------------------- | ------------------- | --------------- |
| Neutral temperature |              |                       |                     |                 |
| Accent              |              |                       |                     |                 |
| Type voice          |              |                       |                     |                 |
| Density             |              |                       |                     |                 |
| Shape language      |              |                       |                     |                 |
| Elevation recipe    |              |                       |                     |                 |
| Signature device    |              |                       |                     |                 |
| Chrome model        |              |                       |                     |                 |
| Value economy       |              |                       |                     |                 |

Pass: against every exemplar, at most half of the free judgeable axes match. Against every earlier row in `references/fingerprints.md`, and every sibling build in the same run or repo, at least 4 judgeable axes differ.

## Fingerprint row

The row to append to `references/fingerprints.md` after building: build name, date, and this build's instance on each of the nine axes.
