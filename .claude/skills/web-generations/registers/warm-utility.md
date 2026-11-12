# Register: Warm utility

**Point of view.** A tool that feels like a calm, human object, so daily work feels like handling paper rather than operating a console. One derived neutral system, one friendly accent, soft blurred depth and generous shape. The warmth can come from tinted neutrals (Notion, Things) or from the type and the ink (Bear's red pen on pure greys); it never comes from decoration.

**Exemplars.** Notion, Things, Bear (2017 Apple Design Award, the same year as Things). Evidence: `references/registers/editorial-warm.md`, `references/registers/warm-bear.md`. Craft was considered and rejected: it repeats Notion's instances (beige ground, blue accent, sans with serif and mono options).

**Suits.** Personal and team productivity, notes and writing, planning, anything used daily by non-experts who should feel at ease. **Strains** for high-density operations and for regulated, proof-heavy content.

## Axes

Core axes define the register: a build here is expected to share the exemplars' position. Free axes are where the exemplars' values are instances, not the register: the brief chooses its own position, from the example directions or beyond them.

| Axis                | Core or free                      | Position                                                                                                              | Observed                                                                                                                                                                                        | Example positions that stay in the register (directions, not instances)                                                                             |
| ------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neutral temperature | Core (system), free (temperature) | One derived neutral system: every grey, wash, hairline and shadow mixed from the same inputs. Its temperature is free | Notion warm greys and a warm-ink hairline; Things navy-ink alphas; Bear pure greys (chroma 0 to 0.0035), every wash and border derived from text and background with `color-mix`                | Core: one derived system. Temperature: warm (Notion), ink-tinted (Things), pure (Bear), or a domain material                                        |
| Accent              | Core                              | One friendly hue with states; functional system hues (selection, search) allowed                                      | Notion blue #097fe8; Things blue #2576eb; Bear red #DD4C4F spent as ink inside the text (caret, bullets, quote bars, ribbon)                                                                    | Core: one friendly hue. The hue and where it is spent are free: a non-blue hue spent as ink inside the content (Bear)                               |
| Type voice          | Free                              | A calm voice with hierarchy from cut, weight or family                                                                | Notion house sans at finer weights with serif and mono options; Things system UI only; Bear one geometric house face in UI and Headline cuts, mono only for code                                | A serif for titles over a humanist sans body (README menu); one face in two optical cuts (Bear)                                                     |
| Density             | Free                              | Medium                                                                                                                | Things 440px hero column, two-line rows; Notion doc-first; Bear list and detail with a 15px, 48em editor (within the gate's tolerance of Notion, so no new instance)                            | Low with a long measure, for a writing-first tool (README menu); compact one-line rows inside generous page margins, for a planner `(J)`            |
| Shape language      | Free                              | Soft and generous                                                                                                     | Notion 5, 6, 12px and a switchable button radius; Things 6px and 1em; Bear radius growing with surface size, 4 to 20px (within tolerance of the others)                                         | Pill controls with rounded containers (README menu); one decided modest radius on every surface (README menu)                                       |
| Elevation           | Core (soft), free (strength)      | Soft, blurred depth on floating things; never a hard edge. How strong is free                                         | Notion a ladder of very faint shadows, max 4 percent alpha, blur to 89px; Things cards by fill; Bear two layers at 12 percent (18 to 20 in dark) with a text-colour border on floating surfaces | Core: soft and blurred. Strength and layer count: faint ladder (Notion), two firmer layers (Bear), fills only (Things)                              |
| Signature device    | Free                              | Something the user owns, makes or marks                                                                               | Notion page with cover and icon; Things round checkbox, star and moon; Bear the accent as pen ink and hashtags as folders                                                                       | The product's real artefact made tangible: a notebook page, a recipe card, a planner sheet `(J)`; the user's own markup made into navigation (Bear) |
| Chrome model        | Free                              | Decided, calm relative to its content                                                                                 | Notion a quiet warm sidebar; Things no sidebar on iOS, a floating plus; Bear three columns with a charcoal sidebar inside a light theme                                                         | A thin top bar with tabs (README menu); a dark sidebar inside a light theme for list and detail work (Bear)                                         |
| Value economy       | Free                              | Moderate                                                                                                              | Things 10 radii on the rendered page; Bear's marketing economical (1 shadow, 2 durations), its app sprawling (a gap)                                                                            | Economical: one or two radii and durations (README menu)                                                                                            |

## Layer by layer

| Layer          | Realisation                                                                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Token          | One derived neutral system (tinted or pure); interaction washes mixed from the ink; a semantic layer over core scales; theme as data, one swap re-skins everything (Bear); a designed dark theme |
| Scale class    | Things ties rhythm to line height (spacers at multiples of its 1.4em leading); Bear uses a small modular header scale: each one exemplar's instance, not a register position                     |
| Primitive      | One accent with hover and active washes; shape as a token that can switch. Overlay tempo is the brief's decision (PRI-B14): Notion exits slower than it enters, Bear faster; both are instances  |
| Row            | Two-line rows with a muted context line are normal; selection is a neutral fill, or a neutral fill plus an accent mark (Bear's ribbon)                                                           |
| List and modal | Selection sheets as soft-shadowed cards over a dimmed page                                                                                                                                       |
| Chrome         | Calm relative to content: a quiet tinted sidebar, contextual navigation with a floating action, or a dark sidebar beside a light page                                                            |
| Root layout    | Every shipped theme designed as its own file (Things `.is-dark`, Bear's separate dark theme with its own shadow strength)                                                                        |

## Signature devices

| Property                         | Exemplar instance                                                        | Derive your own from                                                                          |
| -------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Warmth is a system, not a colour | Notion warm greys plus warm-ink hairline; Bear pure greys with a red pen | The material the domain evokes (paper, linen, wood, slate) or its instrument (a pen, a stamp) |
| The user's object is personal    | Notion cover and icon; Things checkbox; Bear tags and highlighters       | What the user makes, marks or completes in the product                                        |
| Calm completion                  | Things' satisfying check                                                 | The product's most frequent success moment                                                    |

## Failure mode

"Friendly SaaS": cream background, `rounded-xl` cards with `shadow-sm`, pastel blobs, emoji in headings, one blue button. It copies warmth as a colour and drops the discipline: a beige page with pure-black shadows and cool-grey borders, or a default 12px radius on everything. The Bear version: a coral button, a charcoal sidebar and grey meta text on white, with red used as large fills instead of as ink inside the text.

## Staying in the register without cloning its exemplars

The core (one derived neutral system, one friendly accent, soft blurred depth) will match the exemplars; that is what makes a build read as this register. The free axes, now including neutral temperature and depth strength, are where Notion, Things and Bear are instances. On at least half of them, the brief chooses an instance that differs from every exemplar's and records the reason from the domain. Single-exemplar habits are instances too: Things' rhythm at multiples of its leading, Notion's slower exit, Bear's modular header scale.

None of the three supplies a distinct density or shape instance (each sits within the gate's tolerance of another), so those two axes need a domain reason of their own.

Example: pure greys with a pen-ink accent and a dark sidebar is Bear; tinted greys with a blue accent and a quiet sidebar is Notion. A third build might use a sage ink accent on a manila-tinted system, a serif for titles over a humanist sans, and a thin top bar, keeping the derived neutrals, the one friendly hue and the soft depth.

## Exemplar gaps (do not copy)

- Things: link 4.31:1, small text about 3.65:1, nav items about 2.84:1.
- Notion: the 40 percent text step is about 2.85:1; use it for nothing essential.
- Bear: secondary text 3.54:1 and note dates 2.28:1; the accent 4.02:1 as link text and under white labels; no `:focus-visible` in the app and an input ring at 1.79:1; no reduced-motion handling on marketing; sprawl in the app chrome (32 radii, 28 font sizes, 11 durations).

## Evidence gaps

Notion and Things app interiors (row heights, sidebar width, states) were seen only as Mobbin previews; the logged-in Notion app was not captured. Bear's dark theme values and native pixel sizes are UNVERIFIED.
