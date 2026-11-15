# Layer 4: Brand

`components/brand/`. Wordmark, logo mark, favicon, the places the identity appears. Confidence on this layer is the lowest: the evidence is thin and measured sizes are absent.

**Upstream:** Token, Scale class. A recurring tell here is usually inherited from these layers: trace it there and fix it once, not once per file here.

## Tells

A tell fires on an identity left at a template or era default, decided by nobody. A mark treatment or placement chosen on purpose and recorded in the brief is a register, not a tell.

| ID       | Symptom                                                                                                                                               | Why it dates                                                    | Replacement                                                                                                | Detector                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| BRA-G1-1 | A bitmap logo with a jagged halo; effect lettering (shadow, emboss, rainbow); "Under construction", hit counters, "Best viewed in" badges as identity | GIF limits; authoring-tool presets; early self-publishing norms | A vector wordmark that inherits colour from tokens; credits in a quiet footer line                         | `<img src="logo.gif">`; text-shadow stacks on a logo; 88x31 badges                               |
| BRA-G2-1 | Glossy reflection beneath the logo, a sphere or swoosh, gradient fill and drop shadow; a "beta" ribbon on the mark; a PNG with a hover image swap     | Web 2.0 logo fashion                                            | A flat mark that works in one colour at 16px; status as a primitive badge; one SVG with a tokenised colour | `linearGradient` plus a mirrored faded copy; `-webkit-box-reflect`; `onMouseOver` swapping `src` |
| BRA-G3-1 | A raster PNG in a navbar brand slot; a logo with a drop shadow or gradient                                                                            | Pre-SVG; late skeuomorphic residue                              | A vector mark with defined clear space and minimum size                                                    | `<img src="logo.png">`, `navbar-brand`, `drop-shadow` on a logo                                  |
| BRA-G4-1 | The product name in the body face at semibold beside a rounded-square icon with a gradient or a stock glyph (a bolt, a sparkle)                       | Placeholder branding                                            | A wordmark with deliberate spacing or letterform decisions; a mark derived from the product concept        | `<span className="font-semibold">Name</span>` beside `<Zap />` or `<Sparkles />`                 |
| BRA-G4-2 | A logo cloud: five or six equal grey client logos at reduced opacity                                                                                  | Social-proof template                                           | Proof as evidence (a named quote, a number, a case); logos sized by optical weight                         | `grayscale opacity-60` on a row of images                                                        |
| BRA-G4-3 | One mark file used at every size and on every theme                                                                                                   | Static asset                                                    | Size-specific versions (full, compact, glyph) and theme-aware colour, switched by token                    | a single SVG import everywhere                                                                   |

## Floor versus baseline

A competent fourth-generation brand layer has a working mark: a clean SVG, the product name in the body face, perhaps a stock icon beside it. It lacks a mark that carries the product's idea, an identity that survives with the logo hidden, and a signature kept scarce enough to mean something. The baseline is short because the evidence is: where the brand sits, how loud it is and where its colour is spent belong to the register.

## Baseline

Every register meets these. Counts are of the 18 exemplars (`references/classification-ledger.md`, section 04).

- **BRA-B1. The mark carries the product's idea.** The mark is derived from what the product is or does, not a stock glyph. `(S 2/18, thin)` Raycast's keycap-shaped icon for a keyboard-first launcher; Nothing's bracketed model lockups (`Ear(a)`).
- **BRA-B2. The brand lives outside the logo.** With the logo hidden, the product is still recognisable from something the brief records: copy voice, photography, placeholders, per-object colour or a character. `(S 3/18)` Aesop's silhouette placeholders and literary microcopy; Stripe Press's per-object page colour; Duolingo's characters, which react as state machines.
- **BRA-B3. The signature is scarce.** The signature device is kept to the places where it means something, not spread over every surface. `(S 2/18, thin)` Nothing keeps its dot-matrix face to the logotype and product names; Figma reserves its maximal colour schemes for emphasis.

## Register notes

How each register realises this layer. Full detail in `registers/`.

| Register       | Brand decisions                                                                                                                                                                                                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editorial      | The publication is the brand: per-object colour carries identity (Stripe Press's page colour cross-fades to the focused book) and the content is the navigation, so the mark stays small. No measured wordmark rules                                                                                                                                                             |
| Warm utility   | The brand lives in the user's own object more than in the mark (Notion's page cover and icon; Things' round checkbox, star and moon glyphs). No measured wordmark rules                                                                                                                                                                                                          |
| Tactile        | Wordmark rules are the register: lockups, 2x spacing from brand to product name, logotype never wider than one column (Nothing); a scarce display face for the logotype and product names only (Nothing's dot matrix); a lowercase wordmark leading a text-link nav (TE)                                                                                                         |
| Industrial     | No distinct evidence for the mark; follow the baseline. The brand is carried by the signature device (Ableton's 2px rules and colour blocks), not by the logo                                                                                                                                                                                                                    |
| Trust          | Brand colour as a pair chosen for contrast and spent beyond the primary action (Wise's forest on bright green at 9.45:1, never bright green as text; Mercury's indigo washes); proof shown in the same system as the claim (section layer). No measured wordmark rules                                                                                                           |
| Playful        | Characters as brand that carry state, not decoration (Duolingo's Rive characters tied to taps and audio); brand colour on the primary action (Duolingo green) or ink (Figma's black CTA); maximal colour reserved for emphasis (Figma)                                                                                                                                           |
| Luxury         | A ceremonial masthead with a centred wordmark swapped per hero in dark and light variants (Aesop), or a glyph in a thin nav (Apple 44px); brand carried by copy voice, photography and placeholders rather than colour (Aesop); ink on the primary action (Aesop) or one hue (Apple blue). Aesop's raster `logo.png` is decay (BRA-G3-1), not register                           |
| Developer-tool | In the app the brand recedes: the top-left holds an identity or switcher, not a wordmark (Linear workspace avatar, Stripe account name with environment, Vercel team switcher with plan); brand colour on the primary action (Linear, Stripe) or ink (Vercel); the mark expresses the product (Raycast's keycap); on marketing, a glyph or restrained mark at a fixed nav height |

## Techniques

Register-neutral methods, recommended, not required.

- **Small-size and variant test.** Draw the mark in one colour at 16px, and keep full, compact and glyph versions plus light and dark variants switched by token. Variants seen: Aesop's dark and light logos swapped per hero, Apple's glyph in its nav, Vercel's triangle per project. No exemplar's 16px rendering was measured, so this is not a criterion.
- **Shared geometry.** Build the mark from the system's radius, stroke and rhythm so the identity is felt outside the logo. Not measured in any exemplar.

## Token roles this layer needs

Mark colour (inheriting from a text or accent role), clear space, minimum size, compact and glyph breakpoints, theme variants, nav height shared with chrome.

## Checks

Baseline:

1. Is the logo a vector that inherits colour from tokens, not a raster? `[source]`
2. Does the mark survive one colour at 16px, with compact, glyph and theme variants switched by token? `[app]`
3. Is the product's idea in the mark, not a stock icon? `[source]`
4. With the logo hidden, is the product still recognisable? `[app]`
5. Is the signature device scarce, kept to the places where it means something? `[source]`
6. Is a deliberate gloss or gradient on the mark named as an exception? `[source]`

Register fit:

7. Do the mark's placement (an identity or switcher, a wordmark-led bar, a masthead), its size in the nav and where brand colour is spent match the register the brief names, rather than developer-tool by default? `[source]`
