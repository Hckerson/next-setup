# Register: Developer-tool minimal

**Point of view.** A quiet instrument for experts. Chrome recedes so content wins; depth comes from small luminance steps and alpha hairlines; everything is reachable from the keyboard; density is high because the user is there all day.

**Exemplars.** Linear, Vercel, Stripe (dashboard and docs), Raycast. Evidence: `references/fifth-evidence.md`, `references/measured-captures.md`, the cross-family table in `references/registers/luxury.md`.

**Suits.** Work tools used for hours by trained people: issue trackers, consoles, admin, developer platforms, operations dashboards. **Strains** for occasional consumers, commerce and anything whose content is emotional rather than operational.

## Axes

Core axes define the register: a build here is expected to share the exemplars' position. Free axes are where the exemplars' values are instances, not the register: the brief chooses its own position, from the alternatives or beyond them.

| Axis                | Core or free | Position                                                                                                                                                 | Observed                                                                                                    | Example positions that stay in the register (directions, not instances)                                                                                                                                    |
| ------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neutral temperature | Free         | Cool, faintly tinted toward the accent                                                                                                                   | Linear dark ladder #08090a, #0f1011, #141516, #191a1b; Vercel greys at saturation 0                         | Warm graphite greys applied as one system `(J)`; ink-tinted greys (forest, slate) from the README menu; pure zero chroma (Vercel)                                                                          |
| Accent              | Free         | One hue, spent on the primary action and selection                                                                                                       | Linear and Raycast; Vercel's CTA is ink (#171717), so even one hue is optional                              | None: ink is the action and selection is a neutral fill (Vercel's CTA); one hue taken from the domain's own signal colours, such as amber for an operations tool `(J)`                                     |
| Type voice          | Free         | One neutral sans, weights between the standard stops, negative tracking tightening with size, mono for identifiers                                       | Linear weights 510 and 590, titles −0.022em; tracked uppercase or mono labels (Linear 8 elements, Vercel 1) | A grotesque or humanist sans at standard weights with neutral tracking `(J)`; a mono-led voice where identifiers and figures dominate the screen `(J)`; one superfamily with optical sizes (README menu)   |
| Density             | Core         | High: app body 13 to 15px, one-line rows                                                                                                                 | Linear app body 15px                                                                                        | Core: match the exemplars                                                                                                                                                                                  |
| Shape language      | Free         | Small stepped radii by component size                                                                                                                    | Linear 4, 6, 8, 12, 16, 24; Vercel 6 and 12                                                                 | Zero radius throughout (README menu); one decided small value on every surface (README menu)                                                                                                               |
| Elevation           | Core         | Luminance ladder plus alpha hairlines; real shadow only on floating layers                                                                               | Linear borders at about 8, 12 and 15 percent alpha; Vercel 1px ring at 8 percent                            | Core: match the exemplars                                                                                                                                                                                  |
| Signature device    | Free         | A keyboard model surfaced in the UI                                                                                                                      | Shortcut chips, a command palette, menus with keys                                                          | A live device from the domain, such as a log tail, a build timeline or a diff gutter `(J)`; state silhouettes derived from the domain (see Signature devices). A keyboard path itself is baseline (CON-B5) |
| Chrome model        | Core         | Dim, thin chrome that recedes so content wins: a sidebar, or a header with a tab sub-menu; breadcrumb and icon actions; shortcuts surfaced in the chrome | Linear refresh dimmed the sidebar so content wins; Vercel 64px app header and 46px sub-menu                 | Core: match the exemplars                                                                                                                                                                                  |
| Value economy       | Free         | Moderate in the app, expressive on marketing                                                                                                             | Linear home 15 radii and 14 shadows; Vercel docs 2 durations                                                | Very economical throughout (Vercel docs, 2 durations); economical everywhere, with the expressive budget spent on one signature moment `(J)`                                                               |

## Layer by layer

| Layer          | Realisation                                                                                                                                                                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Token          | Surface ladder of about four even steps; alpha borders that work on any surface; four-step text ladder; hover and selected as alpha washes; motion: hover about 0.1 to 0.16s, overlays 0.2 to 0.3s                                              |
| Scale class    | Type roles by size name; materials bundling radius, fill, stroke and shadow (Vercel)                                                                                                                                                            |
| Primitive      | Two-layer focus ring (gap, then ring); size scale with icon-only squares; overlay enter from scale about 0.96 (Vercel). Exit timing varies inside the register (Linear eases out a highlight it brings in instantly), so record it in the brief |
| Mark           | Small glyphs whose silhouette changes with state, 11 to 14px                                                                                                                                                                                    |
| Row            | One line, fixed aligned columns, tertiary metadata, no zebra, affordances revealed on hover and focus                                                                                                                                           |
| List and modal | Menus show a shortcut per item; side panels and inline create before modals; destructive confirm by typed name                                                                                                                                  |
| Console        | Filter chips with counts, detail in pane or docked, keyboard stepping                                                                                                                                                                           |
| Page           | Content panel lifted against a dimmer frame; header is breadcrumb plus icon actions                                                                                                                                                             |
| Chrome         | Sidebar items about 13px with 14 to 16px icons; selected by subtle fill, not accent; 1px alpha header rule; "Find… F" style chips                                                                                                               |
| Root layout    | Light and dark themes generated from a few inputs; heavy reduced-motion coverage (Linear 16 and Vercel 13 `prefers-reduced-motion` blocks in their stylesheets; 49 and 30 reduced-motion rules counted on the live pages)                       |

## Signature devices

| Property                 | Exemplar instance                                           | Derive your own from                                              |
| ------------------------ | ----------------------------------------------------------- | ----------------------------------------------------------------- |
| The keyboard is visible  | Linear menu keys, Vercel "Find… F" chip, Raycast action bar | The product's real top tasks: which ones an expert repeats hourly |
| State has a silhouette   | Linear's dashed, half and check circles                     | Something the domain already uses to show progress or condition   |
| Content wins over chrome | Dimmed sidebar, lifted content panel                        | Which surface the user is actually looking at                     |

## Failure mode

The most copied register, so the most common clone. The tell: a near-black page, Inter at 510 and 590, alpha borders, an indigo accent, a dim sidebar with Lucide icons, a command palette with three entries, and the status circles of a famous issue tracker. It keeps the surface and drops what made it work: a keyboard model that covers real tasks, density decided per entity, and state coverage. A blind build test of this skill produced exactly this clone when the layer files named Linear's instances.

## Staying in the register without cloning its exemplars

The core axes (density, elevation, chrome model) will match the exemplars; that is what makes a build read as this register. The six free axes are where Linear, Vercel, Stripe and Raycast are instances, not the register. On at least three of them, the brief chooses an instance that differs from every exemplar's and records the reason from the domain.

Example: zero radius on every control and panel of an operations console, a shape none of the four exemplars uses, while the dense one-line rows, the ladder-and-hairline depth and the dim chrome with surfaced shortcuts stay.

## Exemplar gaps (do not copy)

- `transition: all` exists in small numbers (Linear 4 of 339 declarations, Vercel 10 of 182, Raycast 34 of 274): fine as an exception, a tell as a default.
- The bottom step of every text ladder (Linear 3.45:1, Vercel 3.10:1) is below 4.5:1: decoration and placeholders only.

## Evidence gaps

Logged-in app interiors (Linear issue list, Vercel deployments, Stripe dashboard) were not captured: row heights, sidebar widths and the command menu are from Mobbin previews or UNVERIFIED.
