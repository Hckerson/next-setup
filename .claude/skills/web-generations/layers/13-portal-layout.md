# Layer 13: Portal layout

`app/<portal>/layout.tsx`. The frame of one area (an admin, an agent workspace, a customer dashboard): its guard, shell, navigation set and tokens. Confidence is the lowest of the app layers; the evidence has screens but no measured values.

**Upstream:** Token, Chrome, Page. A recurring tell here is usually inherited from these layers: trace it there and fix it once, not once per file here.

## Tells

A tell fires on an area frame copied without a decision about its audience. One shell shared on purpose by areas of one audience is the target, not a tell.

| ID       | Symptom                                                                                                                                                                                               | Why it dates                          | Replacement                                                                                                                                       | Detector                                                                                                  |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| POR-G1-1 | A frameset or a shared include of a table header and left column re-rendered each page, with no persistent state; an area distinguished only by a title and a coloured band                           | Server includes; no theming           | A persistent shell that preserves state between routes, with the area's nav and identity                                                          | `<table>` frame; `<iframe>` for area content; the header duplicated in every page                         |
| POR-G2-1 | An admin that imitates a desktop window: gradient title bar, bordered content pane, fixed sidebar with accordion plus and minus, a status bar; a wrapper with fixed side widget columns on every page | ExtJS-era admin panels; portal themes | A sidebar, topbar and scrollable content region that use the viewport; regions as slots the page opts into                                        | `border` plus `shadow` round the whole pane; `w-[220px]` sidebar; hardcoded left and right widget columns |
| POR-G3-1 | A portal as a copied template with a coloured stripe                                                                                                                                                  | Copy-paste themes                     | A frame that expresses the audience and task                                                                                                      | per-portal copied CSS                                                                                     |
| POR-G4-1 | Portals for different audiences share one shell, density and accent, differing only in menu items. One shell with labelled area swaps for one audience is the target, not the tell                    | One shell reused                      | Density and accent recorded per audience and applied through a scope at the layout boundary (POR-B3, POR-B4)                                      | identical layout files across portals whose audiences differ, with no scope                               |
| POR-G4-2 | `max-w-7xl mx-auto p-6` in every portal                                                                                                                                                               | Uniform                               | Content width by page type                                                                                                                        | `max-w-7xl` in a layout                                                                                   |
| POR-G4-3 | The guard shows a blank page or a spinner while loading                                                                                                                                               | Missing state                         | The frame renders at once, with skeletons in the content region                                                                                   | `if (!session) return null`                                                                               |
| POR-G4-4 | Areas for different audiences (operator and customer) share one density and accent because the providers set no scope                                                                                 | Same look everywhere                  | Each audience's portal sets a token scope at the layout boundary. Areas of one audience sharing one token set is correct (Linear, Vercel, Stripe) | no `data-portal` or token scope on a layout whose audience differs from the root's                        |

## Floor versus baseline

A competent fourth-generation portal has a working guarded shell and a menu. It lacks decisions at the boundary: a density recorded for its audience, a scope that can redefine roles, a labelled way back from each sub-area, and a frame that renders before data arrives. How an area is navigated and switched belongs to the register.

## Baseline

Every register meets these. Counts are of the 18 exemplars (`references/classification-ledger.md`, section 13).

- **POR-B1. A labelled way back.** Every sub-area shows where it sits and has a labelled way back to its parent. `(S 2/18, thin)` Vercel's project area, Linear's settings ("Back to app"). Swapping the sidebar contents in place is the developer-tool instance.
- **POR-B2. The frame renders before data.** A shell skeleton variant exists, the guard redirects on the server, and loading and error files exist at each route level, so the frame never blanks while the session or data resolve. `(J, thin)`
- **POR-B3. Scopes redefine roles.** A scope at the layout boundary (portal, section or mode) can redefine every role at once, and the roles survive. `(S 3/18)` Mercury's 12 section themes, Wise's personal and business themes, Figma's `data-theme`. See TOK-B3.
- **POR-B4. Density per audience.** Density matches the portal's audience and is recorded per portal. `(S 2/18, thin)` Mercury (spacious marketing, mid-density app), Duolingo (low density for consumers); Bloomberg's expert density is UNVERIFIED.

## Register notes

How each register realises this layer. Full detail in `registers/`.

| Register       | Portal layout decisions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editorial      | No distinct evidence; follow the baseline                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Warm utility   | No distinct evidence; follow the baseline                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Tactile        | No distinct evidence; follow the baseline                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Industrial     | Operator portals at expert density with stable panel positions, so the density can be learned (Bloomberg Terminal, UNVERIFIED)                                                                                                                                                                                                                                                                                                                                                                          |
| Trust          | Marketing and app density recorded separately (Mercury: spacious marketing, mid-density app); section themes that redefine every role (Mercury), personal and business themes plus a sentiment layer (Wise); a mode with its own scoped ladder inside the product, such as Mercury's dark command shell in a light app (1 of 18; a register candidate)                                                                                                                                                  |
| Playful        | Low density for a consumer audience (Duolingo); theme scopes by `data-theme` (Figma); product areas identified by colour in the app sidebar (Figma's per-product chips)                                                                                                                                                                                                                                                                                                                                 |
| Luxury         | No web app in the evidence; no distinct evidence; follow the baseline                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Developer-tool | An area swaps the sidebar contents in place, with a back chevron and the area's title (Vercel's project area; Linear's settings with grouped navigation); an area adds its own shortcuts group at the top of the sidebar, with area tabs under the title (Stripe Radar); a secondary surface as a drawer beside the page with a colour-bar indicator (Stripe Apps); a team or account switcher at the top and a project switcher in the header (Vercel); one token set across the areas of one audience |

## Techniques

Register-neutral methods, recommended, not required.

- **Scope by attribute.** Set a scope attribute (`data-portal`, `data-theme`) on the layout's root element and redefine semantic roles under it, never core values, so components keep consuming roles (Figma's `data-theme`, Mercury's theme classes).

## Token roles this layer needs

Portal scope (accent, density and surface roles redefined per audience), shell dimensions shared with chrome, shell skeleton, back-affordance label.

## Checks

Baseline:

1. Does the frame render before data and the session resolve, with the guard redirecting on the server? `[source]`
2. Does each route level have loading and error handling? `[source]`
3. Is there a labelled way back from every sub-area? `[source]`
4. Can the portal redefine every role through a scope at the layout boundary, and do the roles survive? `[source]`
5. Is the portal's density recorded for its audience, and do portals for different audiences differ? `[source]`

Register fit:

6. Do the area navigation, switchers and secondary surfaces match the register the brief names, rather than the developer-tool area model by default? `[source]`
