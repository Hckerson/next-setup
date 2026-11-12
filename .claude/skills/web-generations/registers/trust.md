# Register: Trust and finance

**Point of view.** Money is the content. Every surface exists to make an amount legible, attributable and calm, and trust is earned by showing proof (fees, rates, regulators, footnotes) in the same typographic system as the claim.

**Exemplars.** Mercury (marketing and the app design-system CSS), Wise. Evidence: `references/registers/trust-playful.md`.

**Suits.** Banking, payments, accounting, insurance, any product where a number is the decision. **Strains** for playful consumer contexts and for content without figures.

## Axes

Core axes define the register: a build here is expected to share the exemplars' position. Free axes are where the exemplars' values are instances, not the register: the brief chooses its own position, from the alternatives or beyond them.

| Axis                | Core or free | Position                                                                                                                                                                       | Observed                                                                                                                                                              | Example positions that stay in the register (directions, not instances)                                                                                  |
| ------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neutral temperature | Free         | Tinted toward the brand hue                                                                                                                                                    | Mercury blue-violet neutrals and five alternative tinted ladders; Wise hover washes are alphas of its forest green                                                    | Pure zero-chroma greys, with the brand hue only in its contrast pair `(J)`; the warm paper of a printed statement, applied as one system `(J)`           |
| Accent              | Core         | A brand hue always paired for contrast: a recorded fill and ink pair, never set as text where it fails. How widely it is spent (whole sections or actions only) is the brief's | Mercury indigo as a 10 to 22 percent wash on every secondary button; Wise bright green only ever as a fill under forest ink (9.45:1), never as text on white (1.47:1) | Core: match the exemplars                                                                                                                                |
| Type voice          | Core         | A numeric role: a dedicated face or treatment for amounts, separate from the text face. The text face itself is chosen per brief                                               | Mercury weights 300 to 530 and a cheque font in the app; Wise Sans Numeric                                                                                            | Core for the numeric role. The text face is free: the exemplars' proprietary sans with in-between weights is their instance                              |
| Density             | Free         | Spacious marketing, mid-density app                                                                                                                                            | Mercury app body 15px/24px; Wise app body 14 and 16px                                                                                                                 | Expert-high app for accountants and treasury teams (README menu) `(J)`; low, one amount per screen, for a consumer wallet `(J)`                          |
| Shape language      | Free         | Pill buttons, rounded containers                                                                                                                                               | Mercury 4, 8, 12px plus pills; Wise cards 32px, fluid radii                                                                                                           | Small stepped radii (README menu); zero radius with ruled ledger lines `(J)`                                                                             |
| Elevation           | Free         | Tinted layered shadow with its own ring (Mercury), or fill-only cards with shadow only on floating layers (Wise)                                                               | Mercury overlay shadow is a 1px ring plus three tinted offsets                                                                                                        | Luminance ladder and alpha hairlines (README menu); solid ledger rules with no shadow (README menu, solid rules)                                         |
| Signature device    | Core         | Money typography and disclosed proof. The device is derived from how the domain prints money and what it must disclose (see Signature devices)                                 | Mercury raised cents and numbered footnotes wired with `aria-describedby`; Wise live fee breakdown                                                                    | Core: match the exemplars' property, never their device                                                                                                  |
| Chrome model        | Free         | Quiet app sidebar with global search; marketing top bar that adopts the section's theme                                                                                        | Mercury sidebar 1.03:1 against content; nav re-themes per section                                                                                                     | A thin top bar with an account switcher and one primary action, no sidebar (README menu) `(J)`; a bottom tab bar on phones with the balance pinned `(J)` |
| Value economy       | Free         | Moderate                                                                                                                                                                       | Mercury marketing 6 radii, 6 durations on the rendered home                                                                                                           | Economical (README menu); very economical (README menu)                                                                                                  |

## Layer by layer

| Layer       | Realisation                                                                                                                                                                                                                                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Token       | Money colour roles (in, out, pending, failed) as their own family; role tokens that survive a theme swap (Mercury 12 section themes); a designed dark theme with the accent lifted a step                                                                                                                                                |
| Scale class | A numeric display role separate from text; leading set per language and script (Wise 0.85 Latin up to 1.45 tall scripts)                                                                                                                                                                                                                 |
| Primitive   | Overlay motion named by intent, its tempo the brief's decision (PRI-B14): Mercury's app exits faster than it enters (appear 0.2s, disappear 0.15s) and its marketing runs them equal, both instances; pill buttons with every state as a token including busy; disabled as a luminosity blend (Wise); input boundary deliberately at 3:1 |
| Mark        | Status as a word chip plus a change to the amount itself (strikethrough for failed)                                                                                                                                                                                                                                                      |
| Row         | Right-aligned amounts with currency, masked identifiers (••7127), failed and pending variants that change the amount; Wise uses a filled card per row instead                                                                                                                                                                            |
| Section     | Proof sections whose claims carry footnote markers linked to the legal text                                                                                                                                                                                                                                                              |
| Chrome      | Quiet sidebar; marketing nav transparent over the hero, then fixed and re-themed                                                                                                                                                                                                                                                         |

## Signature devices

| Property                          | Exemplar instance                       | Derive your own from                                        |
| --------------------------------- | --------------------------------------- | ----------------------------------------------------------- |
| Amounts have their own typography | Mercury raised cents; Wise numeric face | How the domain prints money (statements, receipts, cheques) |
| Claims carry proof                | Mercury footnotes; Wise fee breakdown   | The real disclosures the product must make                  |
| The brand colour is a pair        | Wise forest on bright green             | The two brand colours that pass contrast together           |

## Failure mode

A navy hero with a glowing 3D card, a "bank-grade security" shield row, a logo cloud, Inter at 600, and amounts in proportional figures that do not align. It copies the costume of trust and drops the mechanics: no money type role, no disclosure system, the accent used as text where it fails contrast, pill buttons with no busy or disabled tokens, one shadow on every card. The second tell is "fintech playful": overshoot easing and saturated green where no fee or rate is ever shown.

## Staying in the register without cloning its exemplars

The core axes (a numeric type role, money typography with disclosed proof, a brand hue paired for contrast) will match the exemplars; that is what makes a build read as this register. The six free axes are where Mercury and Wise are instances, not the register. On at least three of them, the brief chooses an instance that differs from both exemplars' and records the reason from the domain.

Example: solid ledger rules with no shadow, where Mercury uses a tinted layered shadow with a ring and Wise fill-only cards, while the numeric role, the proof system and the paired accent stay.

## Exemplar gaps (do not copy)

- Mercury marketing: buttons 32 and 40px tall at every width, under the 44px touch floor; hover transitions at 300ms.
- Mercury and Figma resting borders sit at 1.13 to 1.45:1, acceptable only where the boundary does not identify a control.

## Evidence gaps

Logged-in Mercury transactions (row pitch, the raised-cents baseline, money-out usage) and the Wise app (transaction rows, amount input motion, focus, dark theme) were not captured.
