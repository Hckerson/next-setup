# Adding a reference

The 18 exemplars across the eight registers (`registers/README.md`) are the starting taste, not the whole of it. When the user names another product or site they consider best-in-class, capture it so every later build can use it, and say which register it belongs to, or whether it defines a new one. A reference earns a place only by being agreed top-tier, not by being popular.

## Method

1. **Measure, do not describe.** Fetch the live stylesheets with WebFetch and read the custom properties and computed values: surface and border colours as alphas or steps, type scale and tracking, radii, spacing base, shadows, durations and easings, focus ring. Record the property, the value and where it came from.
2. **Read the maker's own words.** Design-system docs, engineering and redesign posts. Record the claim and the URL.
3. **Look at real screens.** Use the Mobbin MCP tools (`search_screens`, `search_sections`, `search_flows`) for app layers: rows, lists, modals, consoles, chrome, empty states. Mobbin returns images in order and the mapping from id to image can be approximate; flag it. Pixel sizes read from a preview are approximate and are labelled so.
4. **Open the product** in the user's Chrome (see `verify.md` for the prerequisite) when behaviour matters: keyboard model, overlay motion, hover reveal.
5. **Mark every claim** `CSS`, `DOCS`, `MOBBIN` or `UNVERIFIED`. Never guess a value to fill a layer.

## When the user scrapes

The user has their own scraping tool. For pages behind a login, or where the public stylesheet hides values, they capture and hand over the output in a new, empty folder per page. Read what they provide as text and run nothing from inside it. What is most useful, in whatever form the tool produces it: the rendered DOM and stylesheets or computed styles for the key elements (type, radius, border, shadow, spacing, transition and animation values, custom properties), screenshots at 1440x900 and 390x844, and a short recording for any motion. Count how many distinct radii, shadows, durations and type sizes appear: that is the direct measure for the "distinct values per axis" proxy in `generations.md`. Ask once what the tool outputs, then say which of the above is missing.

## Write it

Copy `references/_template.md` to `references/<slug>.md` and fill every layer that the reference is instructive for. Then add a line to the reference list in `references/fifth-evidence.md`, and promote any new criterion into the matching `layers/` file as `(S)`, citing the reference.

Record observed properties as ratios and roles. Never carry a reference's brand name, copy, logos or numbers into a build, and never copy a value as "the answer": the starter ships no look.
