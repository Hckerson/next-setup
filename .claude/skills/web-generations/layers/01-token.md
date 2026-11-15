# Layer 1: Token

`styles/tokens.css`. Every value that decides the look: colour, type, spacing, radius, shadow, motion. Every upper layer reads from here. The starter ships this file empty; a project fills it.

**Upstream:** none. This is the root layer: a tell found here is inherited by every layer below, so fix it here first.

## Tells

A tell fires on a value left at a default, decided by nobody. The same surface value chosen on purpose and recorded in the brief is a register, not a tell.

| ID       | Symptom                                                                                                                                                        | Why it dates                                      | Replacement                                                                                                                                                                                         | Detector                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| TOK-G1-1 | Browser-default palette left in place: UA link colours used because they were there, black on white with no named text or surface roles, no interaction states | No CSS colour control early on                    | Colour roles named by job, with interaction states. Pure extremes are fine when chosen and recorded (Figma's `#000` on `#fff`, Ableton's pure blue)                                                 | No colour role tokens at all, plus UA link colours                                               |
| TOK-G1-2 | No spacing or type scale; fixed pixel page widths                                                                                                              | Layout by `<br>` and tables; fixed screens        | Named spacing and type scales; a width ceiling with a fluid gutter                                                                                                                                  | `width: 800px` on the outer wrapper (not `max-width`); no type or spacing tokens                 |
| TOK-G2-1 | Colours defined as gradient pairs, with an inset white highlight as the default button and surface recipe, imitating lit glass                                 | Sliced and gradient buttons imitating lit objects | One surface per role; depth from the recorded elevation recipe. A 1px inset edge that belongs to a recorded dark-surface recipe or a physical signature device (Raycast's keycaps) is not this tell | `--grad-*` pairs plus `inset 0 1px 0 rgba(255,255,255` on controls by default                    |
| TOK-G2-2 | Radius, body size and motion left at era defaults: one tiny stylesheet radius, 11 to 12px body, instant swaps                                                  | Late `border-radius`; small screens; sprite swaps | A recorded shape language (zero and pill are both decisions); a body size chosen for density; motion tokens                                                                                         | single bare `rounded`; `text-[11px]` body; no motion tokens and no recorded instant-cut decision |
| TOK-G3-1 | The framework's role palette (`--primary --secondary --info --success --warning --danger`) at library values, with no job recorded beyond the framework's      | A framework contract, not a product decision      | Every hue has a job recorded in the brief. Many hues are fine when each has one (Duolingo's 72)                                                                                                     | the framework role set as the whole palette, values unchanged                                    |
| TOK-G3-2 | Pixel type tokens in one family at a ratio near 1.2, roles separated by size alone                                                                             | Pre-fluid web; one face, one ratio                | Display and body differ on at least two axes. Two weights or no `clamp()` are not the tell on their own (Aesop, Things, Ableton)                                                                    | one family, ratio near 1.2, no other axis of difference                                          |
| TOK-G3-3 | The same border and the same small shadow, as a pair, on input, card, table and navbar                                                                         | Flat design outlined everything                   | One border treatment consumed by role, and depth from the recipe. One border token used everywhere is fine (Aesop's alpha hairline, Ableton's 2px rule)                                             | one border token and one shadow token co-occurring on every container                            |
| TOK-G4-1 | One non-zero library `--radius`, derived with `calc(var(--radius) - 2px)`, on every surface, with no recorded shape language                                   | Component-library default                         | A recorded shape language: a stepped family, one deliberate value, zero, or pill                                                                                                                    | one `--radius` with `calc` derivatives and no brief entry                                        |
| TOK-G4-2 | The library's neutral theme left as shipped: `--card`, `--popover`, `--muted` within a few percent of each other, `muted-foreground` the only secondary text   | Library neutral theme                             | Neutrals with a recorded temperature (tinted or pure) and a text ladder by role                                                                                                                     | library neutral variable names at library values                                                 |
| TOK-G4-3 | Purple-to-blue gradient accent                                                                                                                                 | The 2020 to 2024 SaaS signature                   | A hue with a job from the product's subject, flat by default                                                                                                                                        | `from-indigo-* to-purple-*`, `via-fuchsia-*`                                                     |
| TOK-G4-4 | One framework default duration and curve on every transition, with no token naming it and no second tier                                                       | A default, not a decision                         | Durations tiered by interaction. The framework value used as one named tier among several (Vercel .1, .15, .2, .3, .5s) is a decision                                                               | nearly all transitions at one literal duration; no duration tokens                               |
| TOK-G4-5 | Dark theme is the light theme inverted variable by variable                                                                                                    | Auto-generated pair                               | Each shipped theme designed as its own ladder and depth recipe                                                                                                                                      | `.dark` mirrors light variable by variable                                                       |
| TOK-G4-6 | Dead starter tokens beside the live theme; two parallel spacing systems                                                                                        | Starter never reskinned                           | One live spacing system; unused tokens reported, not silently kept                                                                                                                                  | tokens with no consumer; two spacing families                                                    |

## Floor versus baseline

A competent fourth-generation token file is complete, consistent and accessible, and every value in it came from a library. It lacks recorded decisions: a shape language, a neutral temperature, a type voice, a depth recipe. The baseline asks that each of those exists and is applied everywhere; the register decides what they are.

## Baseline

Every register meets these. Counts are of the 18 exemplars (`references/classification-ledger.md`, section 01).

- **TOK-B1. Text ladder.** Text roles form a ladder of two to four steps. Every step that carries essential text reaches 4.5:1 on the surface it sits on (3:1 for large text); a lower step is for disabled, placeholder or decoration only. `(S 9/18)` Observed primaries run 8.7 to 21:1. Apple's 3.62:1 grey running copy is a defect, not a register.
- **TOK-B2. Roles by job.** Colour tokens are named by job (surface, hover, active, border, text, state), and components consume roles, never raw values. `(S 8/18)`
- **TOK-B3. Semantic layer.** A semantic layer sits over the core scale so a theme, section or scope can redefine every role at once and the roles survive. `(S 7/18)` Mercury's 12 section themes, Wise's themes, Figma's `data-theme`.
- **TOK-B4. Every hue has one job.** Each hue has one named job, or one tight family of related jobs recorded together (an action and its focus; an action and selection). Jobs are recorded in the brief: action, selection, state, object identity or section theme. A hue with no job is decoration. How many hues and where they are spent is the register's call. `(S)` across all eight registers.
- **TOK-B5. Text and fill values per hue.** A hue used both as text and as a fill has a separate value for each, chosen for contrast in that role. `(S 3/18)` Apple's #0066cc for text and #0071e3 for fills; Wise never sets its bright green as text.
- **TOK-B6. One neutral temperature.** Every grey, wash, hairline, shadow and scrim shares one temperature, tinted or pure. `(S 5/18)` Things, Notion, Mercury, Wise, Aesop. The failure is a beige page with pure-black shadows and cool-grey borders.
- **TOK-B7. Interaction washes.** Hover and active are washes of the ink (alpha or a recorded tonal step), not unrelated opaque greys. `(S 5/18)`
- **TOK-B8. Surfaces where they layer.** Where surfaces layer, adjacent steps are small and even (about 1.04 to 1.22:1) and named by role. Define only the steps something consumes. `(S 8/18)`
- **TOK-B9. One border treatment per theme.** A recorded treatment (alpha hairline, opaque rule, inset ring, or none) consumed by role. Where a boundary is what identifies a control, it reaches 3:1. `(S)` Wise's input boundary 3.64:1.
- **TOK-B10. One depth recipe.** Depth is one recorded recipe (ladder, hairline, fill, hard offset, shadow, rules, glass, or a mix) applied by layer, and floating layers are distinguishable from resting ones. `(S 13/18)` One soft shadow on every surface, and a shadow change as the hover signal, are the default cluster.
- **TOK-B11. One shape language.** Shape is one decided character (a stepped family, one value, zero, or pill) applied by meaning and recorded in the brief. `(S)` every exemplar has one.
- **TOK-B12. Type voice with tension.** The type voice is chosen and recorded, and display and body differ on at least two axes: size, family or cut, weight, tracking, leading. In an app with no display role, the comparison is between title and body. `(S)` Aesop (size, family, leading), Things (size, weight, leading), Duolingo (size, family), Teenage Engineering (size, optical cut) all pass while sitting under 3x.
- **TOK-B13. One finite spacing scale.** Spacing is one named scale on one base (px, em or a viewport ratio). No improvised values; two parallel systems is TOK-G4-6. `(S)`
- **TOK-B14. Tiered motion.** Durations are tiered by interaction and distance: hover and colour are the fastest class in the system, overlays and long travel slower. In an economical register, one duration plus recorded instant cuts satisfies tiering. `(S 16/18)`
- **TOK-B15. Reduced motion.** A reduced-motion variant exists for every motion token. Where code waits on a transition to end, the reduced duration stays above zero. `(S 14/18)` Duolingo's web app has none: a defect.
- **TOK-B16. Every shipped theme designed.** Each theme is its own ladder and depth recipe. Shipping one theme, or dark sections chosen by content, is a recorded decision. `(S 9/18)`
- **TOK-B17. Value concentration.** A few values carry most of the page: the top three font sizes cover about 80 percent of text. `(S 4/18)` Aesop 84, Apple 81 to 85, Linear 78, Vercel 90 percent. Thin evidence; use as a check, not a gate.
- **TOK-B18. Contrast by calculation.** Every text, icon and focus pair is verified by calculation, not by eye. References set the aesthetic bar, not the accessibility bar.
- **TOK-B19. Roles are a vocabulary.** A token is defined only when something consumes it.
- **TOK-B20. Named faces are loaded.** The named faces are loaded (next/font in the root layout, or an equivalent), so the type voice that ships is the one recorded; a fallback stack standing in for an unloaded face is a gap. `(J, thin)`

## Register notes

How each register realises this layer. Full detail in `registers/`.

| Register       | Token decisions                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editorial      | One background and text pair per object; a pure grey ramp reversed for dark; near-square radii; measure tokens for reading columns                                                                                                                                                                                                                                                                        |
| Warm utility   | One derived neutral system applied to every grey, wash, hairline and shadow: warm (Notion), ink-tinted (Things) or pure with washes mixed from text and background (Bear); soft blurred depth, a faint ladder (Notion, max 4 percent) or two firmer layers (Bear, 12 percent); one friendly accent, blue (Notion, Things) or a red spent as ink (Bear); soft generous radii, sometimes a switchable token |
| Tactile        | A numbered grey ladder and an off-black; spacing as a viewport ratio; zero or pill; no shadows                                                                                                                                                                                                                                                                                                            |
| Industrial     | Zero-chroma greys; solid 1 to 2px rules; zero radius; one saturated hue, or none (ink is the action), plus paired state colours                                                                                                                                                                                                                                                                           |
| Trust          | Tinted neutrals; money roles (in, out, pending, failed); accent spent as fills and washes, always paired for contrast; display leading by script                                                                                                                                                                                                                                                          |
| Playful        | Each colour a (fill, lip) pair; many hues with jobs; rounded radii; hard offset depth                                                                                                                                                                                                                                                                                                                     |
| Luxury         | Two neutrals with a few tone steps carrying almost all colour; one alpha hairline; one decided shape (zero or pill); no resting shadow; slower hover tempo (0.25 to 0.32s)                                                                                                                                                                                                                                |
| Developer-tool | Four-step luminance ladder; alpha borders at about 8, 12, 15 percent; one accent on primary and selected; small stepped radii; 4px base and `clamp()`; finer weights; negative tracking tightening with size; hover 0.1 to 0.16s; a faint tight edge shadow on light themes                                                                                                                               |

## Techniques

- **Set Tailwind's transition defaults from tokens.** Resetting `--ease-*` does not reset `--default-transition-timing-function` or `--default-transition-duration`; set both in `@theme` from the motion tokens, or every bare `transition-*` utility runs on the library curve.

Register-neutral methods, recommended, not required.

- **Generating the colour set.** Pick hues for the accent and the ink, set neutral chroma, generate surface steps as even lightness steps and text steps as offsets from the ink, then measure every pair (TOK-B18). Linear generates from three inputs in LCH, Stripe guarantees contrast by distance between levels in CIELAB, Figma mixes alphas in OKLCH. The method cannot be seen in shipped output, so it is not a criterion.
- **Nested radius.** Where an inner edge sits within about one control height of an outer one, the inner radius is the smaller by roughly the inset (Stripe's 6px card with a 5px inner). A control inside a generously padded panel takes its own radius. Moot in zero-radius registers.

## Token roles this layer needs

Text ladder, surface roles, border treatment, accent and state hues with text and fill values, interaction washes, shape values, depth recipe per layer, spacing scale, type roles (size, leading, tracking, weight, family), duration tiers and easings, reduced-motion variants, focus colour.

## Checks

Baseline:

1. Does every essential text step reach 4.5:1 on its surface, verified by calculation? `[source]`
2. Are colours named by job, with a semantic layer a theme can swap? `[source]`
3. Does every hue in use have one recorded job, or one tight family of related jobs recorded together? `[source]`
4. Do greys, washes, hairlines, shadows and scrims share one temperature? `[source]`
5. Is there one recorded border treatment and one depth recipe, applied everywhere? `[source]`
6. Is the shape language recorded, and is the radius a decision rather than a library default? `[source]`
7. Do display and body (title and body, in an app with no display role) differ on at least two axes? `[source]`
8. Is spacing one finite scale on one base, with no parallel system? `[source]`
9. Are durations tiered, with hover the fastest class (or, in an economical register, one duration plus recorded instant cuts), and is there a reduced-motion variant? `[source]`
10. Is every shipped theme its own design? `[source]`
11. Is every token consumed? `[source]`
12. Are the named faces loaded (next/font in the root layout, or an equivalent), with no fallback stack standing in for a recorded face? `[source]`, rendered face `[app]`

Register fit:

13. Do the ladder, border, accent spend, shape, tracking and tempo match the register the brief names, rather than developer-tool by default? `[source]`
