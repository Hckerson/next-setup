# Design brief: Kerfline

Roles and choices only; token values live in `styles/tokens.css`. Anything not yet decided is marked **open**.

## Sector, truth sheet and direction

- **Sector:** Manufacturing (`docs/economy-coverage-map.md`): line telemetry, OEE gauges, alarm states.
- **World:** `instrument-panel` (`pagecraft/worlds/instrument-panel.md`), narrowed to the machine shop: the CNC cell, the inspection room and the dispatch bench.
- **Client:** Kerfline, a contract CNC machining shop (placeholder, invented; all copy is placeholder). Aluminium and steel parts, one to five hundred off, for hardware teams.
- **Direction:** `node .claude/skills/pagecraft/tools/draw.mjs --sector Manufacturing`, seed 153640848, direction 1. Chosen by the owner (2026-11-18) as "B · The finished part": the furthest of the three from the last two builds (Receipt, Tekcify) and from the category template.

| Truth | Answer |
| ----- | ------ |
| What it is | A machine shop whose customers watch their own job on the line, and get every part's measured report with the part |
| What it replaces | Emailing the shop for status, hearing "it's on the machine", and a paper certificate in the box |
| The moment of use | An engineer checks the order mid-shift: which operation, which machine, first article measured or not |
| The moment of action | Approving the first article from its measured report, so the batch runs |
| The feeling it leaves | The part is already real and already right: measured, not promised |

## Product

- **What it does, and for whom:** machines parts for hardware teams and shows each job live, from billet to box, with the inspection data attached.
- **After five seconds the user must feel:** these people measure everything, and I can see it.
- **Mood:** exact, unhurried, tactile.

## Register

- **Register (app and marketing):** trust (`registers/trust.md`). In this world the number that is the decision is a measured dimension against its tolerance, not an amount of money.
- **Why it fits:** a buyer of machined parts trusts the shop that shows proof (inspection reports, certificates) in the same system as the claim; that is the register's core.
- **Core axes, matching the exemplars as expected:** a numeric role separate from the text, proof disclosed beside every claim, a brand hue recorded as a fill and ink pair.
- **Free axes:** neutral, density, shape, elevation, chrome and economy, each differing from Mercury and Wise (see the comparison below).

## Surface

- **Both.** Marketing page with a stage (`docs/STAGE_BRIEF.md`); app screens for the customer's live job view.
- **Themes:** light only. The world's rule is that normal is quiet; a dark theme is not a decision this build needs.

## Subject-derived cues

| Decision | Choice | Source in the domain | Other candidate sources considered |
| -------- | ------ | -------------------- | ---------------------------------- |
| Accent | One pair: layout blue as the fill, bare-metal near-white as its ink. Spent on actions and on the one live element per screen | Layout fluid (machinist's blue dye) painted on a part, where the scribe cuts through to bright metal | Anodise colours; inspection tag green and red; the machine's beacon stack |
| Neutral temperature | A cool light grey ground with a strong presence, the grey of mill-finish 6061 bar | The raw billet, before any operation | ISA-101 HMI grey; the granite surface plate; machine enclosure paint |
| Status vocabulary | Job states as words with shapes: queued, cutting, measuring, held, passed, shipped. Colour only on held (abnormal); every normal state is grey | ISA-101: colour means abnormal; ISA-18.2 states for held | IEC 60073 colour meanings; NAMUR NE 107 symbols |
| Signature device | A measured value is never shown alone: it is printed as nominal, actual and deviation, with the deviation placed on a small tolerance band | CMM inspection reports and ISA-101 analogue bars with a normal band | Dial indicator faces; strip-chart traces; the DRO readout |

## Decisions

- **Density:** low (draw). One idea per marketing band; one job per app screen. Body and row pitch **open** until the styleframes.
- **Type voice:** a geometric sans for text, from the single-line engraving fonts used to mark parts; measured values in the same face with tabular lining figures and the tolerance band as their treatment. Face **open**: candidates Jost and Outfit, chosen on tabular figures and the engraving look at the styleframes. Display and body differ by size and weight.
- **Shape language:** one radius everywhere, the radius an end mill leaves in an internal corner. Value **open** (one cutter size, chosen at the styleframes).
- **Spacing:** **open**.
- **Border treatment:** a scribed hairline: thin, opaque, the colour of a scribe line through layout blue. No alpha borders.
- **Elevation recipe:** hairline only; no shadows on UI. The stage owns every shadow.
- **Focus indicator:** **open**; must reach 3:1 on the grey ground and on layout blue.
- **Forced colours:** **open**.
- **Selected-state recipe:** **open**.
- **Row anatomy:** job rows start with the operation and machine, then the part, then the latest measured value with its band. Numeric columns right-aligned with tabular figures.
- **Chrome model:** a top bar (draw), quiet, re-themed by section on the marketing page.
- **Value economy:** economical.
- **Motion character:** **open**; marketing motion belongs to the stage. UI motion follows the machine: moves have a feed (a steady rate) and a stop, no overshoot.
- **Overlay enter and exit:** **open**.
- **List changes:** **open**.
- **Reduced-motion policy:** the stage's peak still; state changes that carry meaning remain.
- **Casing:** sentence case.

## Register-wide devices

| Device | Where it recurs | Its logic |
| ------ | --------------- | --------- |
| Tolerance band | Every measured value, marketing and app | A number is proof only beside its limits |
| Disclosed proof | Every claim on the marketing page links its evidence (an inspection report, a certificate) | The register's core: proof in the same system as the claim |

## Deliberate exceptions

None yet.

## References

| Reference | What is borrowed (as a property) |
| --------- | -------------------------------- |
| Tekcify (`pagecraft/references/tekcify.md`) | The creativity floor only: content as objects, scroll as choreography, one moment of play tied to the story. No device is taken; the copy test applies (`differentiation.md`) |

## Fingerprint comparison

| Axis | Core or free | This build | Mercury | Wise | Receipt | Match or differ |
| ---- | ------------ | ---------- | ------- | ---- | ------- | --------------- |
| Neutral temperature | Free | Strong cool grey ground (billet) | Blue-violet tinted | Green-tinted washes | Ink-tinted paper | Differs from all |
| Accent | Core | Layout blue, paired with bare-metal ink | Indigo wash | Bright green under forest | None, ink only | Core property matches; instance differs |
| Type voice | Core | Geometric engraving sans, numeric treatment by band | Proprietary sans, cheque font | Wise Sans Numeric | Condensed | Core property matches; instance differs |
| Density | Free | Low | Spacious marketing | Spacious marketing | Poster | Differs from Receipt; near the exemplars on marketing |
| Shape language | Free | One radius (end-mill corner) | Stepped plus pills | Large fluid radii | Zero | Differs from all |
| Elevation recipe | Free | Scribed hairline, no UI shadow | Tinted layered shadow | Fill-only cards | None | Differs from all |
| Signature device | Core | Tolerance band on every measured value | Raised cents, footnotes | Fee breakdown | Label system | Core property matches; instance differs |
| Chrome model | Free | Top bar | Sidebar plus re-themed nav | Top nav | None | Differs from Mercury's app and from Receipt |
| Value economy | Free | Economical | Moderate | Moderate | Very economical | Differs from all |

Free axes matching an exemplar: at most one of six (density on marketing). Against Receipt: eight of nine differ.

## Fingerprint row

After building.

## Styleframes and dailies

Key screens: the stage's opening band with the hero copy; the customer's live job screen (the densest app screen); a held job (the abnormal, non-populated state).

| Round | Date | Capture command | Critics' grades by layer | Disputed tells | The three changes | Done |
| ----- | ---- | --------------- | ------------------------ | -------------- | ----------------- | ---- |
