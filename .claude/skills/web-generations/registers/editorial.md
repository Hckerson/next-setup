# Register: Editorial

**Point of view.** The page is a publication. The content object (a book, a story, an essay) is the hero and the interface is paper around it, so typography, per-object colour and pacing do the work that chrome does in a tool.

**Exemplars.** Stripe Press, The Pudding. Evidence: `references/registers/editorial-warm.md`.

**Suits.** Publishing, long-form storytelling, reports, catalogues of a few strong objects, documentation that wants to be read. **Strains** for dense operational work.

## Axes

Core axes define the register: a build here is expected to share the exemplars' position. Free axes are where the exemplars' values are instances, not the register: the brief chooses its own position, from the alternatives or beyond them.

| Axis                | Core or free | Position                                                                                         | Observed                                                                                                    | Example positions that stay in the register (directions, not instances)                                                                               |
| ------------------- | ------------ | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neutral temperature | Free         | Per object, or a pure grey ramp built to be overridden                                           | Stripe Press: 21 background and text pairs, one per book or film; Pudding: 11-step pure grey                | One warm paper neutral applied as a single system `(J)`; ink-tinted neutrals from the publication's printing, such as navy or sepia (README menu)     |
| Accent              | Free         | The object's own palette; or one loud focus colour plus a few role hues                          | Stripe Press page colour cross-fades to the focused book; Pudding green focus with blue, red, purple tokens | None: ink is the action and colour lives only in the content's images `(J)`; one identity hue for links, rules and the masthead `(J)`                 |
| Type voice          | Core         | Serif-led and expressive; italic or a second face used as a role, not decoration                 | Stripe Press Ivar Display, Headline and Text; Pudding Tiempos, Gooper, Atlas Grotesk, Atlas Typewriter      | Core: match the exemplars                                                                                                                             |
| Density             | Core         | Low, with an explicit reading measure                                                            | Stripe Press body 17px at 1.5; Pudding 720px column token                                                   | Core: match the exemplars                                                                                                                             |
| Shape language      | Free         | Near square                                                                                      | Stripe Press 0, 2, 3px; Pudding 2, 3, 6px                                                                   | Zero everywhere (README menu); one soft radius kept to object frames, everything else square `(J)`                                                    |
| Elevation           | Free         | Almost none: one hard shadow or a small card-shadow ladder                                       | Pudding `0 2px 1px` at .1 and .3                                                                            | None, with structure from print rules: column and section hairlines `(J)`; tone steps only (README menu)                                              |
| Signature device    | Core         | The object as navigation. The device that does it is derived per project (see Signature devices) | Stripe Press WebGL shelf of 3D books; every Pudding story a bespoke scrolling essay                         | Core: match the exemplars' property, never their device                                                                                               |
| Chrome model        | Free         | Almost none; the content is the navigation                                                       | Stripe Press has no nav bar; Pudding a small header with filter tabs and a skip link                        | A masthead set in the publication's display face, with sections as type `(J)`; a contents rail beside a long read `(J)`; a thin top bar (README menu) |
| Value economy       | Free         | Economical                                                                                       | Stripe Press 2 radii, 0 shadows on the rendered home                                                        | Very economical (README menu); moderate, where each object brings its own values `(J)`                                                                |

## Layer by layer

| Layer       | Realisation                                                                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Token       | One token pair (background, text) per object parameterises the whole page; a pure neutral ramp reversed for dark; measure tokens for reading columns |
| Scale class | A named fluid type scale (Pudding giant to xsmall about 5x); leading by role                                                                         |
| Primitive   | Sharp corners; buttons that carry the object's information (retailer and price)                                                                      |
| Mark        | Italic or small-caps labels as roles ("Author", "Praise") rather than chips                                                                          |
| Section     | Spacing by narrative role (labels sit 80px below the previous block); one idea per band                                                              |
| Page        | Reading order first; image-first story cards for feeds                                                                                               |
| Chrome      | Minimal; a skip link and a few filters                                                                                                               |

## Signature devices

| Property                          | Exemplar instance                                | Derive your own from                                                   |
| --------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| Each object has its own identity  | Per-book colour pairs on Stripe Press            | The real objects the product publishes                                 |
| Italic or a second face is a role | Ivar Headline italic for labels and author lines | The roles in the content's own structure (byline, pull quote, caption) |
| The content is the navigation     | The shelf; the essay index                       | How readers actually browse the collection                             |

## Failure mode

A serif display on a cream or black page with centred text, one hero image and equal-height sections. It copies the surface (serif, warm neutral, big headline) and drops a measure, a reading order and per-object identity: every section on the same background, one accent everywhere, italics as decoration, no considered line length.

## Staying in the register without cloning its exemplars

The core axes (type voice, density with its reading measure, and the object as navigation) will match the exemplars; that is what makes a build read as this register. The six free axes are where Stripe Press and The Pudding are instances, not the register. On at least three of them, the brief chooses an instance that differs from both exemplars' and records the reason from the domain.

Example: a masthead set in the publication's display face with section names as type, where Stripe Press has no nav bar and The Pudding a small header with filter tabs, while the serif-led voice, the reading measure and the object as navigation stay.

## Exemplar gaps (do not copy)

- Stripe Press: 2 of 21 colour pairs are under 4.5:1 (3.42 and 4.09).
- The Pudding: focus colour is 1.66:1 on its light theme; `transition: all` appears twice.

## Evidence gaps

Stripe Press focus and card-shadow values, its shelf-to-detail transition, and Pudding story pages and dark theme were not measured.
