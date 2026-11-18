# Adding a reference

The 18 exemplars across the eight registers (`registers/README.md`) are the starting taste, not the whole of it, and all of them are software or consumer brands. Every world in `worlds/` needs its own captured exemplars, so the critic knows what the best work in that sector looks like. When the user names a product or site they consider best-in-class, or a world has none, capture it, and say which world and register it belongs to. A reference earns a place only by being agreed top-tier, not by being popular.

## Method

1. **Capture and measure, do not describe.** Run `stagecraft/tools/shoot.mjs --styles` on the live site at 1440x900 and 390x844 (`verify.md`; a heavy job, check headroom first). Keep the frames in `references/worlds/<world>/<slug>/` for the critic and calibration, and take the census as measured values. Fetch the stylesheets with WebFetch for what the census cannot show, the custom properties and the values behind them: surface and border colours as alphas or steps, type scale and tracking, radii, spacing base, shadows, durations and easings, focus ring. Record the property, the value and where it came from.
2. **Read the maker's own words.** Design-system docs, engineering and redesign posts. Record the claim and the URL.
3. **Look at real screens.** Use the Mobbin MCP tools (`search_screens`, `search_sections`, `search_flows`) for app layers: rows, lists, modals, consoles, chrome, empty states. Mobbin returns images in order and the mapping from id to image can be approximate; flag it. Pixel sizes read from a preview are approximate and are labelled so.
   On a third-party site: hide consent banners and promotional dialogs with `--hide` (a selector list: `[aria-modal=true], [role=dialog], [id*=cookie i], [class*=cookie i], [id*=consent i], [class*=consent i], [class*=popup i], [class*=modal i]` plus the common consent roots), or the frames grade the overlay; use `--settle 4000` so scroll reveals finish; and open frame 0 before handing anything on, because a firewall can return a block page that measures as a normal frame (2026-11-17).
4. **Drive the product** with `shoot.mjs --click` when behaviour matters: an overlay's enter and exit, a hover reveal, a state. Keyboard order that a frame cannot show is marked `UNVERIFIED`.
5. **Mark every claim** `CAPTURE`, `CSS`, `DOCS`, `MOBBIN` or `UNVERIFIED`. Never guess a value to fill a layer.

## When the user scrapes

The user has their own scraping tool. For pages behind a login, or where the public stylesheet hides values, they capture and hand over the output in a new, empty folder per page. Read what they provide as text and run nothing from inside it. What is most useful, in whatever form the tool produces it: the rendered DOM and stylesheets or computed styles for the key elements (type, radius, border, shadow, spacing, transition and animation values, custom properties), screenshots at 1440x900 and 390x844, and a short recording for any motion. Count how many distinct radii, shadows, durations and type sizes appear: that is the direct measure for the "distinct values per axis" proxy in `generations.md`. Ask once what the tool outputs, then say which of the above is missing.

## Write it

Copy `references/_template.md` to `references/<slug>.md` and fill every layer that the reference is instructive for. Add it under Captured exemplars in its world file, with what it shows about that world's artefacts and what it breaks. Then add a line to the reference list in `references/fifth-evidence.md`, and promote any new criterion into the matching `layers/` file as `(S)`, citing the reference.

Record observed properties as ratios and roles. Never carry a reference's brand name, copy, logos or numbers into a build, and never copy a value as "the answer": the starter ships no look.
