# Layer 2: Scale class

`styles/globals.css`. Named classes for a scale or role that repeats, such as `.pad`. Project rule: promote a pattern to a named class only when it repeats; tokens come first.

**Upstream:** Token. A recurring tell here is usually inherited from these layers: trace it there and fix it once, not once per file here.

## Tells

A tell fires on a class named after a look or a default repeated on every element, decided by nobody. A composition or rhythm chosen on purpose and recorded in the brief is a register, not a tell.

| ID      | Symptom                                                                                                                                                                | Why it dates                                       | Replacement                                                                                                                                                                                   | Detector                                                                                                                                                                   |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SC-G1-1 | Classes named after a look (`.red`, `.big`, `.spacer`) used as the design vocabulary, with no role layer behind them; a `.center` that centres block and text together | `<font>` and `<center>` were the vocabulary        | Classes named by role and step, mapped to tokens; centring by layout, text alignment a separate choice. A centred composition recorded as the register's (Duolingo's landing) is not the tell | look-named classes with no role classes beside them; `text-center` on whole sections with no centred composition in the brief                                              |
| SC-G2-1 | Float layout and hack classes: `.fl`, `.fr`, `.clearfix`, image replacement, sprites, `zoom: 1`, `* html`                                                              | Float layout and per-browser bugs                  | Grid with named areas and a gap token; inline SVG icons                                                                                                                                       | `float-left`, `clear-both`, `indent-[-9999px]`, `bg-[position:-32px_-64px]`                                                                                                |
| SC-G3-1 | Offset helpers (`.mt-20`, `.pull-right`) and modifier sprawl (`.btn-primary-outline-lg`)                                                                               | Layout by micro-adjustment; combinatorial variants | One class per role and step; size and tone as orthogonal props                                                                                                                                | 3 or more hyphen-joined modifiers; `float` in a scale class                                                                                                                |
| SC-G3-2 | A content `.container` stepping through fixed Bootstrap widths (540, 720, 960, 1140)                                                                                   | Device-width-driven design                         | A content-width ceiling token and a measure per content type                                                                                                                                  | a container whose `max-width` steps through 540, 720, 960 and 1140px (or sits at 1170px). Media queries alone are not the tell                                             |
| SC-G4-1 | One section padding on every band, equal top and bottom, with no named exception and no role                                                                           | The stacked-section template                       | Section padding named by role, with at least one recorded exception, whatever the range                                                                                                       | `py-20` or `py-24` on every `<section>`, and no section padding token with a second value                                                                                  |
| SC-G4-2 | `container mx-auto px-4 max-w-7xl` repeated; one width for all content                                                                                                 | One width for everything                           | A measure per content type (prose, data, media); a hero may run full-bleed                                                                                                                    | `max-w-7xl mx-auto` more than 5 times                                                                                                                                      |
| SC-G4-3 | Raw `text-sm`, `text-lg` in JSX with `leading-*` and `tracking-*` re-specified each time                                                                               | Sizes instead of roles                             | Role classes (display, title, lead, body, caption, label) carrying size, leading, tracking and weight                                                                                         | `text-*` with `leading-*` and `tracking-*` on the same element in many files                                                                                               |
| SC-G4-4 | `transition: all` as the default transition: the most common transition declaration, or a shared `.smooth`-style class. Presence alone is not the tell                 | Convenience                                        | Transitions that name their property groups, with duration and easing tokens                                                                                                                  | `transition: all` or `transition-all` is the most common transition declaration, or sits in a shared class. Count, do not grep for presence: 15 of 18 exemplars ship a few |

## Floor versus baseline

A competent fourth-generation scale-class layer is tidy utility CSS, and every element re-states its own size, leading, width and padding. It lacks roles: type and label roles that bundle their decisions, a measure per content type, section padding named by role with a recorded break, and transitions that say what they animate. The baseline asks that those roles exist and are consumed; the register decides how many steps there are and what they look like.

## Baseline

Every register meets these. Counts are of the 18 exemplars (`references/classification-ledger.md`, section 02).

- **SC-B1. Type by role.** Type is applied through role classes or tokens that bundle size, leading, tracking and weight. No element re-specifies leading and tracking beside a raw size. `(S 10/18)` Vercel `text-heading-N`, Mercury `arcadia-display-*`, TE `.fs-10` to `.fs-40`. Aesop's size-named CMS helpers are a commerce concession, not a model.
- **SC-B2. A UI label role.** Controls, labels and metadata have their own type role, separate from body. `(S 4/18)` Mercury `arcadia-ui-1` and an uppercase `ui-4`; Wise, Figma and Duolingo also separate it.
- **SC-B3. Stack spacing tied to type.** Recommended, not required: set space inside a text stack relative to the type (em, or multiples of the line height), so it moves with the role. Stack spacing taken from the spacing scale is not a gap. `(S 2/18, thin)` Advisory. Apple's headline-to-paragraph margins in em; Things' spacers at multiples of its 1.4em leading.
- **SC-B4. Leading and tracking per script.** Where the product is localised, leading and tracking are set per script and language. `(S 3/18)` Wise display leading 0.85 for Latin up to 1.45 for tall scripts; Duolingo tracking 0 for Arabic; Apple per-language stacks.
- **SC-B5. Measure by content type.** Measure is a named token per content type (prose, data, media), so text width and media width are set independently. `(S 5/18)` Pudding 720px regular and 1280px wide columns; Apple text at 400 to 820px inside media up to 1800px.
- **SC-B6. Marketing: section rhythm with a recorded break.** Section padding is named by role, with at least one recorded exception: a band tighter or looser than its neighbours. No minimum range. `(S 4/18)` Apple 160px with a named 216px exception (1.5x); Things 2.75 to 4.5em (1.6x); Figma; Stripe Press.
- **SC-B7. Transitions name their properties.** Transitions name the properties they animate (colour, transform, opacity, shadow). `transition: all` is at most an exception, never the dominant declaration. `(S 18/18)` No exemplar exceeds 22 percent of its transition declarations; Ableton, Things and Stripe Press ship none.

## Register notes

How each register realises this layer. Full detail in `registers/`.

| Register       | Scale class decisions                                                                                                                                                                                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editorial      | A named fluid type scale with leading by role (Pudding giant to xsmall, about 5x); each role a distinct family, weight, style and leading (Stripe Press); measure tokens for reading columns (Pudding 720px and 1280px; Press 380 and 440px); spacing by narrative role (Press labels 80px below the previous block)            |
| Warm utility   | Things ties rhythm to line height (spacers at multiples of its 1.4em leading), one exemplar's instance, not the register's position; section padding by role in em (Things 4.5em slices, 2.75em features); tracking set per size and weight (Notion); marketing measures of 600, 840 and 1024px (Notion)                        |
| Tactile        | A small fixed set of type steps with leading baked in and responsive suffixes (TE six steps, `.fs-10` to `.fs-40`); sizes as ratios of the viewport rather than px steps (TE)                                                                                                                                                   |
| Industrial     | No distinct evidence; follow the baseline                                                                                                                                                                                                                                                                                       |
| Trust          | A numeric display role separate from the text face (Wise Sans Numeric, Mercury raised cents and MICR); leading per language and script (Wise); a UI label role (Mercury `arcadia-ui-1`, uppercase `ui-4`); a disclosure-footnote role                                                                                           |
| Playful        | Variable axes as type roles in one family (Figma: width for display, slant for italic, MONO for code); role tokens for body and headings (Duolingo `--text-body-size`); a centred landing composition recorded as the register's (Duolingo)                                                                                     |
| Luxury         | Classes named by role, dozens per page (Apple `typography-section-headline`, `-section-body`); stack spacing in em relative to type (Apple); section padding as a token with a named exception (Apple 160px, 216px); media widths set apart from text measures (Apple)                                                          |
| Developer-tool | Type roles named by size step (Vercel `text-heading-N`, `label-N`, `copy-N`; Linear text and title steps carrying leading and tracking); materials bundling radius, fill, stroke and shadow (Vercel); a tracked uppercase or mono label role (Linear 8 elements, Vercel 1); fluid `clamp()` steps on marketing (Vercel, Linear) |

## Techniques

Register-neutral methods, recommended, not required.

- **Materials.** When two or more components consume the same bundle of radius, fill, stroke and shadow (an overlay shared by modal, drawer and popover), name it once as a material class. With a single consumer it stays utilities until the second arrives (project rule: a class exists only because it repeats). Vercel's material presets and Notion's `--tatami-shadow-card-shadow` are the two observed cases.
- **Tabular figures.** Where figures align (tables, stat cells, amounts), set tabular figures through the numeric role, or use a face whose figures are tabular by default. Vercel uses `tabular-nums` or Geist Mono on numeric columns. Mercury and Wise amount cells are not yet captured, so this is not a criterion.
- **Heading wrap.** `text-wrap: balance` and hyphenation limits on headings keep display lines even (Wise).

## Token roles this layer needs

Type roles (display, title, body, UI label, caption, and numeric where figures align), stack spacing tied to type, leading and tracking per script where the product is localised, measure per content type, section padding by role with its recorded exception, transition property groups, material presets where two components share them.

## Checks

Baseline:

1. Is type applied through role classes or tokens, with no raw size whose leading and tracking are re-specified on the element? `[source]`
2. Is there a UI label role separate from body? `[source]`
3. Is measure a named token per content type, with text and media widths set independently? `[source]`
4. Marketing: is section padding named by role, with at least one recorded break? `[source]`
5. Do transitions name their properties, with `transition: all` at most an exception and never the dominant declaration? `[source]`
6. Where the product is localised, are leading and tracking set per script? `[source]`
7. Does every named class have at least two consumers (project rule)? `[source]`

Register fit:

8. Do the role names, the number of type steps, the measures and the section rhythm match the register the brief names, rather than developer-tool by default? `[source]`
