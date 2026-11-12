# Layer 6: Mark

`components/features/`. A small domain indicator: status, priority, presence, role, plan, a label chip. Confidence is medium: the first-generation to third-generation entries map era analogues.

**Upstream:** Token, Scale class, Primitive. A recurring tell here is usually inherited from these layers: trace it there and fix it once, not once per file here.

## Tells

A tell fires on a mark left at a library or framework default, decided by nobody. The same form chosen on purpose and recorded in the brief (a tinted chip, a word in a hue, a glyph standing alone) is a register, not a tell.

| ID       | Symptom                                                                                                                                                            | Why it dates                               | Replacement                                                                                                                                                                                                                                                                     | Detector                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| MRK-G1-1 | Status by colour alone (the same dot, glyph or word differing only in hue); tiny GIF dots; spinning or flashing GIF indicators; ASCII markers (`>>`, `[x]`, `(!)`) | Few formats, no icon system                | State readable with colour removed, by shape, word or form, in a tone from the status vocabulary that passes contrast. A status word set in a semantic hue from the tokens (Aesop's "Limited release", Apple's "New") is a fifth-generation form. Motion only for real activity | colour class as the only difference between states; `animate-spin` on a mark that is not loading; `>>` in JSX strings |
| MRK-G2-1 | A glossy glass orb with a specular spot; 16px raster icons with drop shadows in several palettes; 45-degree "sale" or "beta" ribbons                               | Skeuomorphic LEDs and icon packs           | Marks drawn flat in the one icon style the brief records (single-weight outline in `currentColor`, or an illustrated set with a recorded palette); badges in layout flow                                                                                                        | radial gradient with a white stop on a rounded mark; `<img>` icons; a `rotate-45` banner                              |
| MRK-G3-1 | A saturated rectangle with white capitals (`label-success`), or icon-only status where the glyphs differ only in colour                                            | Saturated status colour; icon-only meaning | State carried by a word, a distinct shape or a change of form, with an accessible name. Glyph-only status is fine when each state has a distinct shape and an accessible name (Linear)                                                                                          | `.label-success`, `.badge-danger`, `glyphicon`; status icons that share one shape and differ only by colour class     |
| MRK-G4-1 | The framework palette triple (`bg-*-100 text-*-700`) per state, with no state tokens and every state in the same shape                                             | The SaaS default                           | State tones drawn from the product's status tokens, in the form the brief records. A tinted chip drawn from state tokens, where a container is warranted, is the target (Stripe, Mercury), not the tell                                                                         | literal `bg-*-100 text-*-700` triples in a status map, and no state tokens                                            |
| MRK-G4-2 | A status-to-colour switch defined inline in each component                                                                                                         | A repeated decision                        | One status-to-tone map in constants or data, consumed by the mark                                                                                                                                                                                                               | the same switch in two or more files                                                                                  |
| MRK-G4-3 | An avatar as a circle with initials on a tinted background                                                                                                         | Generated avatar                           | A deterministic fallback inside the token set, with a consistent ring and size scale                                                                                                                                                                                            | `rounded-full bg-primary/10 text-primary` with initials                                                               |

## Floor versus baseline

A competent fourth-generation mark is legible and consistent, and its form came from the library: a tinted pill per state at framework values, with the tone switch rewritten in each component. It lacks a status vocabulary decided once and consumed everywhere, and a form (glyph, word, chip, illustrated icon) chosen by the register. The baseline asks that state reads without colour and every mark has a name; the register decides how the form is drawn.

## Baseline

Every register meets these. Counts are of the 18 exemplars (`references/classification-ledger.md`, section 06).

A glyph or shape plus its word is the baseline form of a mark in every register. It is not a developer-tool form, and using it never counts against register fit. A register decides how the glyph is drawn, whether a container holds it, and whether the word alone or the glyph alone (with an accessible name) is enough.

- **MRK-B1. Readable without colour.** Each state differs from the others by shape, word or form, never by hue alone, so it reads in greyscale and for colour-blind users. `(S 8/18)` Vercel dot and word, Stripe tinted fill and word, Linear glyph shape, Aesop and Apple a word, Mercury a chip plus a struck-through amount, Wise a dashed border, Duolingo illustrated icons. How the form is drawn is the register's.
- **MRK-B2. Every mark has a name.** A status shows its word, or carries an accessible name where a glyph stands alone. `(J)` Thin: screen-reader labels were not measured in any exemplar; none breaks the rule.
- **MRK-B3. One status vocabulary.** One vocabulary, defined once, names every state and its tone, and every mark consumes it. `(S 3/18)` Mercury's money roles (in, out, pending), Duolingo's hue jobs, Apple's glyph and fill pair per hue. Bloomberg's up, down and warning roles are UNVERIFIED.
- **MRK-B4. Paired state colours.** Where a state is drawn on a fill, its text and fill are a recorded pair from the state tokens (TOK-B5). `(S 1/18)` Apple gives each hue a `-secondary` tint; Bloomberg's warning on a pale yellow is UNVERIFIED. Thin evidence.
- **MRK-B5. Contrast by calculation.** A status word reaches 4.5:1 on the surface or fill it sits on, and a glyph that carries state reaches 3:1, verified by calculation. `(J, thin)` The contrast resolution (ledger C3) applied to marks: a word in a light hue is where it fails first.
- **MRK-B6. Critical state findable at a glance.** A mark in a critical state (stopped, failed, error, blocked) differs from the other states by at least two cues: colour plus one of shape, position, weight, or a ground that reaches 3:1 against the page. A tinted ground at about 1.3:1 alone does not meet it. `(J, thin)` Same rule as ROW-B13, applied to the mark.

## Register notes

How each register realises this layer. Full detail in `registers/`.

| Register       | Mark decisions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editorial      | Labels as type roles, italic or small caps ("Author", "Praise"), rather than chips (Stripe Press)                                                                                                                                                                                                                                                                                                                                                                                                    |
| Warm utility   | Marks are objects the user owns or completes: Things' round checkbox, star and moon glyphs. No distinct status-chip evidence; follow the baseline                                                                                                                                                                                                                                                                                                                                                    |
| Tactile        | No distinct evidence; follow the baseline                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Industrial     | State as a learned vocabulary (up, down, warning), each with paired text and background (Bloomberg, UNVERIFIED); one loud colour carries signal                                                                                                                                                                                                                                                                                                                                                      |
| Trust          | Status as a word chip plus a change to the amount itself: Mercury's pink "Failed" chip with the amount struck through, pending greyed, outflows in default ink. Money roles (in, out, pending, failed) as their own state family; Wise marks "not yet set up" with a dashed border                                                                                                                                                                                                                   |
| Playful        | Marks with counts (streaks, gems, hearts) and status by full-colour illustrated icon plus colour, each hue with one job: green correct, red error, yellow progress (Duolingo). Decoration is the register here, not a tell                                                                                                                                                                                                                                                                           |
| Luxury         | Status as a word in a hue, with no pill and no fill: Aesop's "Limited release" in brown, Apple's "New" in orange. Often the only hue on the page besides the action                                                                                                                                                                                                                                                                                                                                  |
| Developer-tool | Small glyphs whose silhouette changes with state, about 11 to 14px (Linear), or a dot plus the word with the duration or time beside it (Vercel); a tinted chip with same-hue small bold text where a container is warranted (Stripe, Linear labels, Vercel's "Current" and "Rolled Back" pills); decoration removed and icons scaled down (Linear refresh); several states sharing one quiet tone (Stripe greys Incomplete and Cancelled). The shapes are the product's own, never Linear's circles |

## Techniques

Register-neutral methods, recommended, not required.

- **Deriving a shape set.** Where the register carries state by silhouette, take the shapes from something the domain already uses to show condition (a signal, a gauge, a lamp, a tag) and record them in the brief. Never reuse a reference's set.
- **Changing the datum.** Where a state changes what a value means, change the value as well as the badge: Mercury strikes through a failed amount and greys a pending one. One exemplar, so a technique, not a criterion.

## Token roles this layer needs

State tones by job (live, pending, terminal, danger, quiet), each with a text value and, where a container is used, a paired fill; glyph and dot sizes; tint alpha; label type role.

## Checks

Baseline:

1. Does every state read with colour removed, by shape, word or form? `[source]` for the markup, `[app]` in greyscale
2. Does every status show its word, or carry an accessible name where a glyph stands alone? `[source]`
3. Is the status vocabulary defined once and consumed by every mark? `[source]`
4. Where a state sits on a fill, are its text and fill a pair from the state tokens? `[source]`
5. Does every status word reach 4.5:1, and every state glyph 3:1, by calculation? `[source]`
6. Does a mark in a critical state differ from the other states by colour plus one more cue (shape, position, weight, or a ground at 3:1 against the page)? `[source]`, at a glance `[app]`

Register fit:

7. Is the mark's form (glyph, dot and word, tinted chip, word in a hue, illustrated icon) the one the register in the brief uses? A glyph or shape plus its word passes in every register; it is not a developer-tool default. `[source]`
8. Are any glyph shapes derived from the product's domain and recorded in the brief, rather than copied from a reference? `[source]`
