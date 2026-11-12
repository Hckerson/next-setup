# Register: Industrial and technical

**Point of view.** The interface is an instrument or a trading desk. Hard edges, high contrast and learned conventions beat decoration, and density respects the trained operator.

**Exemplars.** Ableton, Bloomberg (website and Terminal). Evidence: `references/registers/tactile-industrial.md` and `references/measured-captures.md`. The research's scripted requests to Bloomberg were blocked, so its values there are third-party and UNVERIFIED; the user's capture of bloomberg.com/professional did render, and its computed values in `measured-captures.md` are first-party (7 radii, 1 shadow, 5 durations, 12 font sizes on the page). The Terminal remains UNVERIFIED.

**Suits.** Professional instruments, operations and monitoring, trading, control rooms, manufacturing floors, any product whose users learn it once and use it fast. **Strains** for first-time consumers who need hand-holding.

## Axes

Core axes define the register: a build here is expected to share the exemplars' position. Free axes are where the exemplars' values are instances, not the register: the brief chooses its own position, from the alternatives or beyond them.

| Axis                | Core or free | Position                                                                                                                                                                                                    | Observed                                                                                | Example positions that stay in the register (directions, not instances)                                                                                                                 |
| ------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neutral temperature | Core         | Pure, zero chroma; or a single strong ground (amber on black)                                                                                                                                               | Ableton #fff, #eee, #000, #666; Terminal amber on black                                 | Core: match the exemplars                                                                                                                                                               |
| Accent              | Free         | One saturated hue for action and focus. State colours form a learned vocabulary whatever the hue: a critical state's ground or mark reaches 3:1 against the page, or carries a second cue (ROW-B13, MRK-B6) | Ableton pure blue; Bloomberg orange plus up, down and warning roles                     | A safety colour the domain already uses, such as signal yellow or safety orange `(J)`; no brand hue, with ink as the action and only the state colours carrying hue (README menu, none) |
| Type voice          | Free         | App: dense, with tension from a change of weight and family rather than size `(J)`. Marketing: very large display steps in a bold geometric or grotesque, with a distinct display face (Ableton)            | Ableton Futura PT, display up to 7.5rem; Bloomberg Haas Grotesk and Haas Head (website) | App: a condensed grotesque with tabular figures and labels in a mono `(J)`. Marketing: a large condensed or technical display face instead of a geometric `(J)`                         |
| Density             | Free         | Expert-high in the tool; low with huge type on marketing                                                                                                                                                    | Bloomberg 4px base with a 2px micro step                                                | Poster scale for a wall or floor display read from a distance `(J)`; medium in the app, with a dense mode the operator switches on `(J)`                                                |
| Shape language      | Core         | Hard: zero radius, circles only for dots                                                                                                                                                                    | Ableton radius 0 eleven times                                                           | Core: match the exemplars                                                                                                                                                               |
| Elevation           | Core         | None; structure by solid rules                                                                                                                                                                              | Ableton 2px solid rules; Bloomberg hairlines, no shadows                                | Core: match the exemplars                                                                                                                                                               |
| Signature device    | Free         | Structural rules and colour blocks; a command model                                                                                                                                                         | Ableton 2px rules and "Made in Berlin"; Terminal mnemonic commands and a red Cancel key | Schematic conventions from the domain: dimension lines, callouts, grid references `(J)`; a station map whose panels never move `(J)`                                                    |
| Chrome model        | Free         | Loud and labelled, or a command line with stable panel positions                                                                                                                                            | Ableton nav labels 1.25rem bold with a 2px separator                                    | A fixed status line along the bottom edge carrying live machine state `(J)`; a station tab bar, one tab per operator station, in fixed positions `(J)`                                  |
| Value economy       | Free         | Economical                                                                                                                                                                                                  | Ableton home: 0 radii, 0 shadows, 2 durations                                           | Very economical: one radius, no shadow, one duration (README menu); moderate where the data needs many state colours, still at zero radius with no shadow `(J)`                         |

**Loud in the app.** In a tool, loud means colour-coded rows, sorting and positions that never move, so an operator finds a stopped line at a glance; a lamp glyph beside a word is not enough on its own (ROW-B13).

**Accent instances near the exemplars.** Safety yellows and oranges sit within the 25 degree instance window of the Bloomberg Terminal's amber and Bloomberg's orange (both UNVERIFIED). If the brief takes a safety colour, check its rendered hue against them; ink as the action, or a hue outside that window, keeps the accent axis free.

**Shape on the measured web page.** The rendered bloomberg.com/professional page uses small radii (5, 10 and 28px), so a hard shape is this register's core on instruments and consoles, not on every Bloomberg surface.

## Layer by layer

| Layer     | Realisation                                                                                                                                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Token     | Small named hex greys with 1px or 2px solid rules are valid; on marketing, display steps carry the tension, in the app weight and family do; state colours paired with backgrounds, each critical state's ground or mark at 3:1 against the page or carrying a second cue |
| Primitive | Square, bold, high-contrast buttons whose transparent border becomes the focus indicator, so focus never shifts layout                                                                                                                                                    |
| Mark      | State as a learned vocabulary: the domain's own states (a trading desk has up, down and warning; a production floor has more), each with paired text and background; a critical mark meets MRK-B6                                                                         |
| Row       | Dense, aligned, colour-coded, sortable, with stable column positions (Terminal; needs capture); a critical row meets ROW-B13                                                                                                                                              |
| Console   | Stable panel positions, command entry, keyboard first; positions never move so density stays learnable                                                                                                                                                                    |
| Chrome    | Large bold nav labels and a 2px separator; or a black band                                                                                                                                                                                                                |

## Signature devices

| Property                           | Exemplar instance                   | Derive your own from                                                          |
| ---------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------- |
| Structure is drawn, not implied    | Ableton's 2px rules                 | The domain's own drawings (schematics, control panels, technical sheets)      |
| Conventions are learned and stable | Terminal mnemonics and fixed panels | The operator's real vocabulary and the stations they work at                  |
| One loud colour carries meaning    | Ableton blue; Terminal amber        | A colour the domain already uses for signal (a warning lamp, a safety colour) |

## Failure mode

The "dark finance dashboard": black background, amber or orange accent, monospace numbers, green and red deltas, every panel crammed. Without stable layout, a command model and real data it is dense mess. The Ableton version: zero radius, 2px borders, a Futura-like face and primary blue with default spacing and no large display jump, which reads as an early-2010s flat theme.

Plain colours here (pure blue and black on white) are deliberate. The first- and third-generation tells about saturated primaries fire only when the rest of the system is absent; see the re-scoped tells in `layers/01-token.md` and `layers/03-primitive.md`.

## Staying in the register without cloning its exemplars

The core axes (zero chroma or one strong ground, structure by rules with no shadow, hard shape) will match the exemplars; that is what makes a build read as this register. The six free axes are where Ableton and Bloomberg are instances, not the register. On at least three of them, the brief chooses an instance that differs from both exemplars' and records the reason from the domain.

Example: a fixed status line along the bottom edge carrying live machine state, where Ableton uses large bold nav labels and the Terminal a command line, while the zero-chroma ground, the solid rules and the hard edges stay.

## Exemplar gaps (do not copy)

- Ableton's footer is long (newsletter, account, social, education, community, legal); partly legal necessity, UNVERIFIED as designed.
- Bloomberg evidence in the register research is third-party; cite only the computed values in `measured-captures.md` as measured.

## Evidence gaps

Bloomberg's custom properties and component states beyond the rendered professional page, Terminal screens, Ableton hover, press and disabled states, and Live and Push application screens were not captured. This register's row and console layers need those captures most.
