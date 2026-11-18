# Register: Tactile and hardware

**Point of view.** The screen is a product datasheet or a faceplate. The object and its labelling are the interface; the UI stays flat and near-borderless, with mono and specimen type as printed legend.

**Exemplars.** Teenage Engineering, Nothing. Evidence: `references/registers/tactile-industrial.md`.

**Suits.** Hardware and physical products, devices, instruments, maker brands, anything with a real object to photograph. **Strains** for dense data work and long reading.

## Axes

Core axes define the register: a build here is expected to share the exemplars' position. Free axes are where the exemplars' values are instances, not the register: the brief chooses its own position, from the alternatives or beyond them.

| Axis                | Core or free | Position                                                                                                                      | Observed                                                                                     | Example positions that stay in the register (directions, not instances)                                                                                           |
| ------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neutral temperature | Free         | Neutral to slightly warm light greys and a near-black                                                                         | TE #f5f5f5, #e5e5e5, #0f0e12; Nothing 12-step grey ramp                                      | A dark faceplate ground with light legend type `(J)`; a ground tinted from the product's housing, such as anodised blue-grey or bone `(J)`                        |
| Accent              | Free         | Rare, printed-label colours, or product colours as identity rather than UI accent                                             | Nothing red, yellow, blue; TE five product hues                                              | None: ink only, with the photographed object as the only colour (README menu); one signal colour taken from the device's own markings, such as a power lamp `(J)` |
| Type voice          | Free         | Specimen or mechanical faces; a restricted display face; mono uppercase labels                                                | TE te-20 and te-40 at weights 100 and 300; Nothing NDot only for names, NType82, mono labels | One grotesque at one weight, with legends in small caps instead of mono `(J)`; an engraved-plate or stencil face reserved for model names `(J)`                   |
| Density             | Free         | Poster scale, often proportional to the viewport                                                                              | TE: every size a ratio of viewport width from a 980 design width                             | Datasheet density: compact spec tables on a fixed px scale `(J)`; medium, on fixed px steps (README menu)                                                         |
| Shape language      | Free         | Square or pill, nothing between                                                                                               | TE tile radius 0 on desktop, pill buttons                                                    | The product's own corner radius as the one value (README menu, one decided value) `(J)`; chamfered corners taken from the housing `(J)`                           |
| Elevation           | Core         | None; depth by fill and photography                                                                                           | TE one toast shadow; Nothing brand guide forbids drop shadows on graphics                    | Core: match the exemplars                                                                                                                                         |
| Signature device    | Core         | Product naming and labelling as graphic system. The device is derived from the product's own markings (see Signature devices) | Nothing bracket lockups and dot matrix; TE lowercase wordmark nav                            | Core: match the exemplars' property, never their device                                                                                                           |
| Chrome model        | Free         | Thin text-link bar, no icons, no sidebar                                                                                      | TE text list header with a `checkout0` count                                                 | A contents index down one side, like a datasheet's `(J)`; no bar, with one scroll and an index in the footer (README menu, none)                                  |
| Value economy       | Core         | Very economical                                                                                                               | TE home: 1 radius, 0 shadows, 1 background                                                   | Core: match the exemplars                                                                                                                                         |

## Layer by layer

| Layer            | Realisation                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| Token            | Numbered grey ladder plus off-black; spacing as a ratio rather than a px base is legitimate; few named accents |
| Scale class      | A small fixed set of type steps with leading baked in (TE six steps)                                           |
| Primitive        | Pill or square, no gloss; focus as an accent border swap (Nothing)                                             |
| Brand            | Wordmark rules are the register: lockups, spacing, never wider than one column                                 |
| Section and page | Image-led tiles at zero radius, text beneath, no card chrome                                                   |
| Chrome           | Text-link header, wordmark left, utility words, no icons, no palette                                           |

## Signature devices

| Property                      | Exemplar instance                        | Derive your own from                                            |
| ----------------------------- | ---------------------------------------- | --------------------------------------------------------------- |
| A scarce display face         | NDot only for logotype and product names | The product's own markings (a stamp, a serial plate, a display) |
| The object carries the colour | Product photography; TE product hues     | Real photography of the real object                             |
| Proportion over breakpoints   | TE's viewport-ratio scale                | The object's own proportions                                    |

## Failure mode

"Brutalist hardware" cosplay: a grey page, a monospace font, zero radius and uppercase labels with no product object, no measured scale and no designed states. Or the signature everywhere: dot-matrix type on every heading, a red dot on every element. Nothing's own guide deprecated its dot face for body text.

## Staying in the register without cloning its exemplars

The core axes (labelling as a graphic system, flat surfaces with no shadow, a very economical value set) will match the exemplars; that is what makes a build read as this register. The six free axes are where Teenage Engineering and Nothing are instances, not the register. On at least three of them, the brief chooses an instance that differs from both exemplars' and records the reason from the domain.

Example: a datasheet layout with compact spec tables on a fixed px scale, where TE scales every size to the viewport and Nothing runs poster-scale product pages, while the labelling system, the flat no-shadow surfaces and the few values stay.

## Exemplar gaps (do not copy)

- TE: a reset sets `button { outline: none }` and no `:focus-visible` rule was found in the fetched stylesheets (UNVERIFIED for other chunks).
- Nothing: reduced motion sets durations to 0, which breaks code that waits for a transition to end (see `layers/03-primitive.md`).

## Evidence gaps

TE focus and hover states, the TE store and checkout, Nothing product pages and inputs, and the Nothing OS and app UI were not measured.
