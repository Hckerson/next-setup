# Registers: Tactile and Hardware, Industrial and Technical

Method. Shipped stylesheets were downloaded with plain curl and read directly (teenage.engineering, nothing.tech, ableton.com). WebFetch returned no CSS for any site. bloomberg.com/professional returns HTTP 403 to WebFetch and to curl; no workaround was attempted, so every Bloomberg value is third-party and marked UNVERIFIED. Mobbin has no Nothing, Teenage Engineering, Ableton or Bloomberg screens (searches returned X, Gumloop, ZARA, AirOps, H&M); Mobbin contributed nothing.

Tags: Q = QUALITY (expected in other premium registers), R = REGISTER (this family's own choice).

Source keys:

- TE-ROOT = https://teenage.engineering/assets/root.CyKTWa8o.css
- TE-CTX = https://teenage.engineering/assets/app-context.BmQEkhCy.css
- NT-A = https://cdn.shopify.com/oxygen-v2/43495/38485/80939/5007296/assets/BqFAEGKn.css
- NT-B = same path, Ch7VuJCF.css
- NT-HTML = https://nothing.tech
- NT-BRAND = https://nothing.wiki/nothing/brand_reference (third-party transcription of the Nothing brand guide)
- AB-A = https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/CACHE/css/output.1dd98d07efb4.css
- AB-HTML = https://www.ableton.com/en/
- BB-3P = https://www.shadcn.io/design/bloomberg (third-party "interpretation" of the bloomberg.com homepage, self-declared unofficial, internally inconsistent)
- BB-WS = WebSearch results citing bloomberg.com/ux/2017/05/08/bloombergs-customer-centric-design-ethos/ (page itself 403, only snippet seen), interfacelineage.com/bloomberg-terminal-1982, ted-merz.com/2021/06/26/amber-on-black/

---

## Register A: TACTILE AND HARDWARE

Point of view: the screen is a product datasheet or a faceplate; the object and its labelling are the interface, and the UI keeps out of the way (flat, near-borderless, mono and dot type as printed legend).

### Axis positions (register as a whole)

| Axis                | Position                                                                                                                                                                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neutral temperature | Neutral to slightly warm light greys, near-black. TE: #f5f5f5, #e5e5e5, #0f0e12 (cool-tinted black). Nothing: 12-step grey ramp with a warm-grey "Window Grey" 177 179 179, black 4 4 4, white.                                                                                                                                 |
| Accent              | Rare, printed-label style. Nothing: red 200 16 46, yellow 255 199 0, blue 0 47 108 (NT-A :root). TE: five product colours (blue #0071bb, green #006837, orange #f05a24, red #b81d13, yellow #fab413) used as product identity, not UI accent.                                                                                   |
| Type voice          | Custom or specimen faces with a mechanical origin: TE te-20 and te-40 (weights 100 and 300 only); Nothing NDot 55 (dot matrix) for logotype and product names only, NType82 for headlines and body, Lettera Mono and Geist Mono uppercase for labels.                                                                           |
| Density             | TE: proportional poster scale, generous. Nothing: product-grid marketing, medium.                                                                                                                                                                                                                                               |
| Shape language      | Square or pill, nothing between at brand level. TE: `--tile-border-radius:0` at 768px and up, 2.55vw on mobile, `--round:9999px` for pill buttons. Nothing: 999px pills and .5rem (`rounded-lg`, 11 uses, the most common).                                                                                                     |
| Elevation recipe    | Almost none. TE modal has no shadow; only the toast has one (`0 .2vw .8vw rgb(0 0 0/50%)` at desktop). Nothing brand rule: "No colour fills, drop shadows, or gradients on graphic elements" (NT-BRAND).                                                                                                                        |
| Signature device    | TE: viewport-proportional everything, lowercase wordmark nav. Nothing: dot-matrix type and bracket product lockups such as `Ear(a)` and `phone(2)`.                                                                                                                                                                             |
| Chrome model        | Thin text-link bar, no icon rail, no sidebar. TE header is a plain text list (product, instruments, audio, designs, store, checkout, deals, newsletter, ...) with a `checkout0` count label and a `menu` toggle on small screens (WebFetch text). Nothing `--header-height:64px` (NT-B, UNVERIFIED which header it belongs to). |

### H3 Teenage Engineering (teenage.engineering)

Measured (TE-ROOT unless noted):

| Property                  | Value                                                                                                                                                                                           | Tag                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Layout model              | `--client-width:100vw`, `--base-design-width:980`; every size is a ratio of viewport width, so the page is a scaled poster, not fluid-with-breakpoints                                          | R                                                                             |
| Type steps (768px and up) | fs-10 .00918vw, fs-15 .01327vw, fs-20 .01837vw, fs-25 .02347vw, fs-30 .02755vw, fs-40 .03673vw. At the 980 design width: 9, 13, 18, 23, 27, 36px. Line-heights at 980: 10, 15, 20, 30, 30, 40px | R (scale mechanism); Q (a named finite step set with paired leading)          |
| Font roles                | te-20 for fs-10 to fs-30, te-40 for fs-40 (and fs-30 from 480px up). Weights 100 and 300 only (`--fw-thin`, `--fw-light`)                                                                       | R                                                                             |
| Colour roles              | white, te-white #f5f5f5, grey-100 #e5e5e5 to grey-1000 #272727, te-black #0f0e12, five product colours, `--success` green #006837, `--error` #c0262c                                            | R (palette); Q (numbered grey ladder, error and success roles)                |
| Spacing                   | `--space-xs/sm/md/lg/xl` = .00510, .01020, .01531, .02296, .04592 x vw at desktop (5, 10, 15, 22.5, 45px at 980); ratios double below 768px                                                     | Q (named steps); R (proportional)                                             |
| Header height             | .0816327 x vw at 768px and up (80px at 980, about 117px at 1440); mobile .1837 x vw (about 72px at 390). Footer .0663 x vw (65px at 980)                                                        | R                                                                             |
| Radius                    | tile 0 at 768px and up, 2.55vw on mobile; modal `var(--space-sm)` on mobile, 0 desktop; pill 9999px for the view-cart button; toast 1.0 to 1.5vw                                                | R                                                                             |
| Touch floor               | `--btn-min-click-area:48px`                                                                                                                                                                     | Q                                                                             |
| Elevation                 | toast shadow only (TE-CTX); modal backdrop `#000000b3` (70% black), no modal shadow                                                                                                             | R                                                                             |
| Motion                    | `transform .25s, opacity .15s`; toast `box-shadow .2s, transform .2s ease-out`; entering `.2s ease-in`; leaving sets `box-shadow:none` (TE-CTX)                                                 | Q (motion exists on state change); R (no tokens, no named curves)             |
| z-index                   | named tokens `--z-over:100`, `--z-navigation:1000`, `--z-modal-backdrop:2000`, `--z-dialog:2001`                                                                                                | Q                                                                             |
| Link treatment            | `text-decoration:underline` on hover                                                                                                                                                            | R                                                                             |
| Focus                     | Reset sets `button{outline:none}`. No `:focus-visible` rule found in the four stylesheets fetched                                                                                               | UNVERIFIED (may be in other chunks); if absent it is a defect, not a register |
| Reset                     | `-webkit-font-smoothing:antialiased`, base `line-height:1.5`                                                                                                                                    | Q                                                                             |

Instructive:

- One proportional scale for type, space, radius and chrome removes the "which breakpoint value" decision; relationships are constant at every width. Relevant to layers 1, 2, 11, 14.
- Two optical cuts of one family (te-20 text, te-40 display) at two weights is a type system with tension through cut, not through weight range.
- A numbered grey ladder plus an off-black is the whole UI palette; product photography carries all colour.

Failure mode (the AI tell): "brutalist hardware" cosplay. A grey page, a monospace font, 0 radius and uppercase labels with no product object, no measured scale and no designed states. The register's quality came from rigorous proportion and photography; copying the stylesheet brings neither.

### H3 Nothing (nothing.tech)

Measured:

| Property                 | Value                                                                                                                                                                                                                                                                                                                                             | Tag                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Colour tokens            | Space-separated channels for alpha use: `--accent-red:200 16 46`, `--accent-yellow:255 199 0`, `--accent-blue:0 47 108`; `--greyscale-100:244 244 244` through `--greyscale-1000:60 60 60`, `--greyscale-black:4 4 4`, `--greyscale-dm-light:24 24 24`, `--greyscale-dm-dark:4 4 4` (NT-A)                                                        | Q (ladder, alpha-ready tokens, a designed dark pair); R (the palette)                |
| Dark theme               | Dedicated `dm-light` and `dm-dark` greys (24 and 4), not an inversion                                                                                                                                                                                                                                                                             | Q                                                                                    |
| Type families declared   | Ndot-Regular, Ndot-Bold, NType82-Regular, NType82-Headline, LatteraMonoLL, Geist Variable, Geist Mono Variable (NT-A). HTML class counts: `font-geist-mono` 19, `font-ntype82` 17, `font-geist` 5, `font-ndot-bold` 4 (NT-HTML)                                                                                                                   | R                                                                                    |
| Type rules (brand guide) | NDot 55 only for logotype and product names, never mixed with other fonts in one layout; NType82 Headline 40pt and up, leading 80%, tracking -20 (about -0.02em); NType82 Regular leading 125% at 7.5-15pt, 115% at 15-60pt, 100% at 60-120pt, 85% at 120pt and up; Mono leading 140-145%; Lettera Mono 5-10pt legal text (NT-BRAND, third party) | Q (leading falls as size grows, display under 1.0); R (the faces)                    |
| Tracking in CSS          | `.1em` (labels), `.025em`, `-.04em` (display), one use each (NT-A)                                                                                                                                                                                                                                                                                | Q (tightens large, opens small caps)                                                 |
| Case                     | 15 `uppercase` classes in HTML; labels and buttons are uppercase mono                                                                                                                                                                                                                                                                             | R                                                                                    |
| Radius                   | `rounded-lg` (.5rem) most used, `rounded-md`, 4px, 999px and 9999px pills                                                                                                                                                                                                                                                                         | R                                                                                    |
| Chrome dimensions        | `--header-height:64px`, `--aside-width:400px`, `--grid-item-width:355px` (NT-B)                                                                                                                                                                                                                                                                   | R (values); Q (named chrome dimensions)                                              |
| Motion                   | `transition-duration:.15s` x7 (dominant), .1, .2, .22, .3, .5s; `cubic-bezier(.4,0,.2,1)` x7; fades `opacity .3s/.4s ease-out`; one long registered-property transition `--band 1.25s cubic-bezier(.74,0,.19,.99)`                                                                                                                                | Q (tiered durations, a signature long curve); R (values)                             |
| Reduced motion           | `transition:none!important` and `transition-duration:0s!important` present                                                                                                                                                                                                                                                                        | Q (note: zero duration breaks a JS exit-wait, see 03-primitive)                      |
| Focus                    | `focus-visible:border-accent-yellow` (border swap to yellow); `focus-visible:outline-none` sets `outline:2px solid #0000; outline-offset:2px` (forced-colours fallback)                                                                                                                                                                           | Q (visibly different, accent-coloured); R (single border swap, not a two-layer ring) |
| Grid (brand guide)       | 2, 4, 6, 8 or 10 columns; margin 2.3% of format width; logotype top-aligned, full column width, never wider (NT-BRAND)                                                                                                                                                                                                                            | R                                                                                    |
| Home page structure      | header, hero banner, 4 category image tiles, video feature banners, 3-tile product row, speaker cards, trust row (free delivery, 30-day returns, flexible payments, price match, warranty), newsletter, multi-group footer with social (NT-HTML)                                                                                                  | R                                                                                    |

Instructive:

- The brand guide is a list of prohibitions; each "do not" is a register decision, not a quality rule. That is the cleanest way to state a register.
- A restricted-use display face (NDot only for names) keeps the signature scarce. Scarcity is the quality property; the dots are the register.
- Mono uppercase wide-tracked labels against a grotesque body gives a three-voice type system with one job per face.

Failure mode: dot-matrix font as body or headings everywhere plus a red dot accent; the brand guide itself deprecated NDot 57 for body text. The template tell is the signature used on every surface (dots, red, mono caps) instead of once per surface.

### Per-layer realisation notes (register A)

| Layer              | Note                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1 Token            | Proportional (vw ratio) tokens are legitimate; spacing base is a ratio, not 4 or 8px (TE). Greys named by number, few accents.       |
| 2 Scale class      | Fixed set of six type steps with leading baked in as classes (`.fs-10` to `.fs-40`) and responsive suffixes `:sm :md :lg` (TE-ROOT). |
| 3 Primitive        | Pill or square buttons, no gloss; accent border swap on focus (Nothing); no focus ring evidenced for TE.                             |
| 4 Brand            | Wordmark rules are the register: bracketed model lockups, 2x spacing brand to product, logotype never wider than one column.         |
| 9 Section, 11 Page | Image-led tiles at 0 radius on desktop, text beneath, no card chrome (TE).                                                           |
| 12 Chrome          | Text-link header, wordmark left, utility words (`search`, `support`, `checkout0`, `menu`), no icons, no command palette, no sidebar. |

### Existing (S) criteria this register violates while premium

| File            | Criterion                                                        | Exemplar    | Evidence                                                                                                                                                                                                                     |
| --------------- | ---------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01-token.md     | "Borders are alpha, not hex", 1px and hairline                   | TE          | No border tokens in TE-ROOT; separation by whitespace and tile fills (#f5f5f5 on #fff). Nothing's channel tokens permit alpha but no 1px alpha ring is evidenced.                                                            |
| 01-token.md     | "Surfaces are a luminance ladder of about four steps"            | TE          | Two surfaces in use: `--theme-body-bc:#fff` and `--product-background-color:#f5f5f5` (plus #e5e5e5 for neutral and modal backgrounds).                                                                                       |
| 01-token.md     | "One accent hue, spent on the primary action and selection only" | TE          | Five product hues defined as `--te-*`; used for product identity.                                                                                                                                                            |
| 01-token.md     | "Radius is a stepped family"                                     | TE          | 0 at desktop, pill otherwise.                                                                                                                                                                                                |
| 01-token.md     | "Spacing on a 4px base" and "8px base with clamp()"              | TE          | Spacing is a ratio of 100vw; no px base; no `clamp()`.                                                                                                                                                                       |
| 01-token.md     | "Finer weight steps from a variable font"                        | TE          | Weights 100 and 300 only; fineness comes from two optical cuts, not intermediate weights.                                                                                                                                    |
| 01-token.md     | "Elevation is a system"                                          | TE, Nothing | TE: one toast shadow, none on modal. Nothing guide forbids drop shadows. Depth is by fill and photography.                                                                                                                   |
| 01-token.md     | "Display jump of at least 3x over body"                          | TE          | fs-40 to fs-10 is 4x, but if body is fs-15 or fs-20 the jump is 2x to 2.7x. UNVERIFIED which step is body.                                                                                                                   |
| 03-primitive.md | "Focus is a two-layer ring, 3:1 on any surface"                  | Nothing     | Border swap to yellow plus transparent outline; one layer. TE: no focus rule found (UNVERIFIED).                                                                                                                             |
| 03-primitive.md | "Dialog scale-and-fade enter about 0.3s, exit faster than enter" | TE          | Modal is `position:absolute; top:50%; transform:translate(-50%,-50%)` with no transition found; toast enter and leave both .2s.                                                                                              |
| 03-primitive.md | PRI-G4-3 pill badge tell                                         | TE          | `--round:9999px` on the view-cart button; pill is register for TE, not a tell.                                                                                                                                               |
| 12-chrome.md    | "Chrome is dimmer and thinner than the content"                  | TE          | Header 80px at 980 (8.2% of width), about 117px at 1440, against 64px cited for Vercel and 44-72px marketing range; chrome is at content scale.                                                                              |
| 12-chrome.md    | "Shortcuts live in chrome", "A real command palette"             | TE, Nothing | None found in HTML or CSS of either; both are commerce sites, so the criteria belong to the app register.                                                                                                                    |
| 12-chrome.md    | "The header rule is a 1px alpha line"                            | TE          | No header rule found. Nothing not measured.                                                                                                                                                                                  |
| 12-chrome.md    | CHR-G4-3 four-column footer                                      | TE, Nothing | TE footer is a link list plus newsletter and address; Nothing footer has primary, utility, account and social groups. The tell fires on both; the premium reading rests on the rest of the page. Judgement, not measurement. |

### Could not measure

- TE: any `:focus-visible` style, nav hover colours, how body text maps to fs steps, product page grid, checkout.
- Nothing: shop header markup, product tile card CSS (Tailwind utility classes, per-page chunks not fetched), shadows (NT-A has no `--shadow`, `--radius` or `--spacing` custom properties), Nothing OS and Nothing X app UI.

---

## Register B: INDUSTRIAL AND TECHNICAL

Point of view: the interface is an instrument or a trading desk; hard edges, high contrast and learned conventions beat decoration, and density respects the expert operator.

### Axis positions (register as a whole)

| Axis                | Position                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Neutral temperature | Ableton: pure #fff, #eee, #000, #666 (zero tint). Bloomberg: warm paper tint #f3f4ef over white, black nav #1c1c1c (BB-3P, UNVERIFIED). Terminal: amber on black (BB-WS).                                                                                                                                                                                                                                          |
| Accent              | Ableton: pure `blue` for primary buttons and focus (AB-A `.abl-button--primary`; `a:focus` blue border plus `0 0 .1875rem rgba(0,0,255,.5)`), plus a pastel set (#ffc2ca, #d5b3ff, #00d2be, #b6ffc0, #b1c5ff, #6dcbff, #fed134, #ff5157, #ff8389, #d34312) for product and section colour. Bloomberg: orange #f05143 highlight (BB-3P); Terminal amber ("black and amber" called their strongest hallmark, BB-WS). |
| Type voice          | Ableton: Futura PT, bold for buttons and nav (AB-A). Bloomberg: BWHaasGroteskWeb 14-16px at 400/500/700, BWHaasHead 28-32px with .42-.48px tracking, AvenirNextPForBBG 12px/600 uppercase for footer kickers (BB-3P, UNVERIFIED).                                                                                                                                                                                  |
| Density             | Bloomberg: high; 10 to 32px type, 4px base with 2px micro step (BB-3P); the Terminal is the density reference (BB-WS). Ableton: low to medium with very large display type.                                                                                                                                                                                                                                        |
| Shape language      | Hard. Ableton `border-radius:0` x11, `50%` x5, `2px` x1, `27%` x1 (AB-A). Bloomberg: Sign In 0px, cards and inputs 4px, dots 50% (BB-3P).                                                                                                                                                                                                                                                                          |
| Elevation recipe    | None. Ableton: 2px solid rules (`border:.125rem solid #000`, `border-top:2px solid #eee`), no shadows apart from the 3px blue focus glow. Bloomberg: "no traditional box-shadows", depth from 1px hairlines #e5e7eb, #ccc, #b3b3b3, #000 (BB-3P).                                                                                                                                                                  |
| Signature device    | Ableton: 2px rules and square colour blocks, "Made in Berlin" hallmark in footer (AB-HTML). Bloomberg: orange highlight with black nav band; Terminal: keyboard-first mnemonic commands and a red Cancel key (BB-WS).                                                                                                                                                                                              |
| Chrome model        | Ableton: top nav with large bold labels (`.main-nav__trigger-label` 1.25rem bold, 20px top padding, 2px #eee separator), desktop breakpoint 1024. Bloomberg site: black nav band (UNVERIFIED); Terminal: command line and stable panel positions.                                                                                                                                                                  |

### H3 Ableton (ableton.com)

Measured (AB-A):

| Property               | Value                                                                                                                                                                                                                                              | Tag                                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Spacing                | `--abl-spacing-2xs:.3125rem`, xs .625, s 1.25, m 1.25 to 1.875, l 1.25 to 2.5, xl 1.875 to 3.75, 2xl 2.5 to 5, 3xl 3.75 to 6.25, 4xl 5 to 7.5 rem; three breakpoint tables. Base unit 5px if root is 16px (UNVERIFIED)                             | Q (named, responsive scale); R (5px base)                                                          |
| Type sizes (frequency) | 1.25rem x193, 1rem x126, 1.875rem x115, 2.5rem x71, .875rem x70, 3.75rem x55, 1.5rem x52, 5.625rem x24, 6.875rem x11, 7.5rem x8                                                                                                                    | Q (large display steps, finite set)                                                                |
| Line-height            | 1.5 x507, 1.4 x177, 1.2 x94, 1.1 x81, 1 x28                                                                                                                                                                                                        | Q (display 1.0-1.2, body 1.4-1.5)                                                                  |
| Font                   | `futura-pt` regular, italic, bold with system fallback; Monaco for mono (3 uses)                                                                                                                                                                   | R                                                                                                  |
| Button                 | `padding:.28125rem 1.25rem; font-size:1rem; font-weight:bold; line-height:1.5; border:.125rem solid transparent; border-radius:0`; large variant `.40625rem 1.875rem`, 1.25rem. Primary: white on `blue`. Focus: `border-color:#000; outline:none` | R (square, bold, 2px border); Q (transparent border reserves space so focus does not shift layout) |
| Link focus             | `a:focus{border-color:blue; outline:none; box-shadow:0 0 .1875rem rgba(0,0,255,.5)}`                                                                                                                                                               | Q (visible, accent-coloured); R (soft 3px glow, one layer)                                         |
| Skip link              | `.abl-visually-hidden--focusable:focus` reveals the element                                                                                                                                                                                        | Q                                                                                                  |
| Focus-visible polyfill | `.js-focus-visible .main-nav__section:focus:not(.focus-visible){outline:none}`                                                                                                                                                                     | Q                                                                                                  |
| Borders                | `border:.125rem solid #000` x5, `border-top/bottom:2px solid #eee` x20                                                                                                                                                                             | R                                                                                                  |
| Colours by frequency   | #fff 60, #eee 57, #000 47, #666 28, then ten pastels at 5-9 uses each                                                                                                                                                                              | R                                                                                                  |
| Motion                 | nav colour `transition-duration:.35s`, `opacity .1s ease`, `bottom .15s`                                                                                                                                                                           | Q (shorter for small); R (values)                                                                  |
| Layout                 | `max-width:100rem`; breakpoints 48em, 80em, 100em; `--abl-desktop-breakpoint:1024`; `--abl-icon-size:20`                                                                                                                                           | Q                                                                                                  |
| Page structure         | header with 3 hero teasers, "latest from Ableton" blog cards with category filter links, tutorial video cards, "One Thing" video cards, footer with newsletter, account, social, education, community, language, legal, "Made in Berlin" (AB-HTML) | R                                                                                                  |

Instructive:

- Premium comes from type scale and restraint: display steps up to 7.5rem, 2px structural rules, square corners, one saturated accent, colour-block imagery. Quality is rhythm and discipline, not surface effects.
- Pure blue and pure black on pure white would trip TOK-G1-1 and PRI-G3-1 yet read as intentional because everything else is consistent. G1 and G3 tells are only tells when they are unmotivated residue; the detector alone cannot decide.

Failure mode: Ableton copied as hard 0 radius, 2px borders, a Futura-like face and primary blue, with default spacing and no large display jump. It reads as an early-2010s flat Bootstrap theme, because the display scale and colour blocking that made it premium are missing.

### H3 Bloomberg professional (bloomberg.com/professional) and the Terminal

Status: UNVERIFIED for every number. Direct fetch of bloomberg.com/professional and bloomberg.com/company/stories/... returned 403. Values come from BB-3P (a third-party reading of the bloomberg.com homepage, not /professional) and WebSearch snippets.

| Property             | Value                                                                                                                                                                                                                                                                 | Tag                                                        | Source                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------- |
| Colour roles         | canvas #fff, surface-tint #f3f4ef, ink #000, nav #1c1c1c, ink steps #3c3c3c #545454 #767676 #999, hairlines #e5e7eb #ccc #b3b3b3, orange #f05143, blue #0064fa and #00378e, violet #2800d7, warning #ffcd1e with bg #fff4da, markets-down #e51503, markets-up #338736 | Q (named state roles with paired backgrounds); R (palette) | BB-3P                              |
| Type                 | BWHaasGroteskWeb 14-16px 400/500/700; BWHaasHead 28-32px tracking .42-.48px; footer kicker 12px/600 uppercase; 12 sizes from 10 to 32px; line-height 1.0-1.5                                                                                                          | R; Q (display face distinct from UI face)                  | BB-3P                              |
| Radii                | 0, 4, 6, 8, 12, 28, 120, 9999px; Sign In 0px; cards and inputs 4px                                                                                                                                                                                                    | R                                                          | BB-3P                              |
| Spacing              | 2, 4, 6, 8, 10, 11, 12, 16, 18, 32px; 4px base, 2px micro step                                                                                                                                                                                                        | Q (stepped); R (dense)                                     | BB-3P                              |
| Elevation            | no box-shadows, no gradients, hairline borders only                                                                                                                                                                                                                   | R                                                          | BB-3P                              |
| Terminal colour      | amber and black is "the hallmark", recognisable "from across a trading floor"; high contrast to pick information from noise                                                                                                                                           | R                                                          | BB-WS (snippet of a 403 page)      |
| Terminal interaction | asset-class keys, mnemonic commands, stable panel positions, colour-coded data; slow for newcomers, fast for trained users; Esc key coloured red and named Cancel                                                                                                     | R; Q (consistency, learned position, keyboard model)       | interfacelineage.com via WebSearch |
| Font ownership       | A Wikipedia snippet mentions a 2024 Gotham replacement; no tie between Frere-Jones and Bloomberg confirmed                                                                                                                                                            | n/a                                                        | not confirmed                      |

Instructive (conditional on verification):

- State colour is a vocabulary: up green, down red, warning yellow, each with paired text and background; the accent (orange) stays rare.
- The Terminal keeps panel positions and command names stable so density is learnable. Consistency is the quality; amber is the register.
- Density as a product decision for an expert supports the "density is a token decided per product" line in 07-row.

Failure mode: the "dark finance dashboard" template: black background, orange or amber accent, monospace numbers, green and red deltas, every panel crammed. Without stable layout, a command model and real data, it is dense mess that satisfies "dark UI" but not density-as-decision.

### Per-layer realisation notes (register B)

| Layer       | Note                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| 1 Token     | Small named hex-grey sets with 1px or 2px solid rules are valid; display steps carry the tension (Ableton up to 7.5rem). |
| 3 Primitive | Square bold high-contrast buttons whose transparent border becomes the focus indicator (Ableton) avoid layout shift.     |
| 7 Row       | Not measurable on either site; the Terminal row (dense, aligned, colour-coded) is the exemplar and needs a capture.      |
| 9 Section   | Colour-block sections and card grids with category filter links (Ableton).                                               |
| 10 Console  | Terminal: stable panel positions, command line, keyboard first. UNVERIFIED.                                              |
| 12 Chrome   | Large bold nav labels, 2px separator, desktop breakpoint 1024 (Ableton); black nav band (Bloomberg, UNVERIFIED).         |

### Existing (S) criteria this register violates while premium

| File            | Criterion                                                             | Exemplar | Evidence                                                                                                                                                                                            |
| --------------- | --------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01-token.md     | TOK-G1-1 detector "text and surface at the extremes, no neutral ramp" | Ableton  | #fff, #eee, #000, #666 are the top four colours; pure `blue` primary. Premium by restraint and scale.                                                                                               |
| 01-token.md     | "Borders are alpha, not hex", 1px and hairline                        | Ableton  | `border:.125rem solid #000` and `2px solid #eee`; 2px, hex. Bloomberg 1px hex hairlines (BB-3P).                                                                                                    |
| 01-token.md     | "Radius is a stepped family"                                          | Ableton  | Radii used: 0 (x11), 50%, 2px, 27%. Not a family.                                                                                                                                                   |
| 01-token.md     | "Spacing on a 4px base"                                               | Ableton  | 5px base (.3125rem).                                                                                                                                                                                |
| 01-token.md     | "Neutrals tinted toward the accent" (TOK-G4-2)                        | Ableton  | Zero-chroma neutrals.                                                                                                                                                                               |
| 01-token.md     | "Colour is generated, not hand-picked"                                | Ableton  | Ten hand-named pastel hexes.                                                                                                                                                                        |
| 01-token.md     | "Elevation is a system"                                               | Both     | No shadows; 2px rules and colour blocks.                                                                                                                                                            |
| 01-token.md     | "Body 13-15px, tight scale"                                           | Ableton  | Most-used size is 1.25rem (20px if root is 16px, UNVERIFIED); body leading 1.5. Bloomberg body 14-16px (BB-3P).                                                                                     |
| 03-primitive.md | "Focus is a two-layer ring"                                           | Ableton  | Button focus `border-color:#000; outline:none`; link focus blue border plus 3px 50% glow. One layer.                                                                                                |
| 03-primitive.md | PRI-G3-1 "flat saturated button, 4px radius"                          | Ableton  | Flat saturated blue, 2px border, 0 radius, premium. Hover and press were not measured.                                                                                                              |
| 03-primitive.md | "Hover moves one step on the colour ladder"                           | Ableton  | No ladder exists; `a:hover{color:#fff}` (context unknown).                                                                                                                                          |
| 07-row.md       | "One line, fixed columns", "no zebra"                                 | Both     | Untestable: Ableton lists are image cards; Bloomberg row evidence absent.                                                                                                                           |
| 12-chrome.md    | "Chrome is dimmer and thinner than the content"                       | Ableton  | Nav labels 1.25rem bold (the most-used body size) with 20px top padding; chrome is as loud as content.                                                                                              |
| 12-chrome.md    | "The header rule is a 1px alpha line"                                 | Ableton  | `.main-nav__separator{border-top:2px solid #eee}`.                                                                                                                                                  |
| 12-chrome.md    | "Footer is the last moment, few links"                                | Ableton  | Footer carries newsletter, account, social, education, community, language, legal, imprint, withdrawal form, hallmark (AB-HTML); CHR-G4-3 fires. Partly EU legal necessity, UNVERIFIED as designed. |
| 12-chrome.md    | "Shortcuts in chrome", "A real command palette"                       | Ableton  | None found. For Bloomberg the Terminal command line is the palette; UNVERIFIED for the website.                                                                                                     |

### Could not measure

- Bloomberg: all first-party values (the site rejects non-browser requests).
- Ableton: hover, press and disabled colours, nav dropdown structure, product pages (Live, Push), Learn pages, form controls, root font-size.

---

## QUALITY versus REGISTER: findings across both registers

Shared across all four exemplars (strong QUALITY candidates):

1. A small finite named set for type, spacing and colour (TE six type steps, Nothing twelve greys, Ableton nine spacing steps, Bloomberg twelve type sizes). None improvises values.
2. Deliberate type tension, achieved four different ways: size jump (Ableton to 7.5rem), optical cut (TE te-20 to te-40), face role (Nothing NDot, NType82, mono), tracking and leading (Nothing leading falls to 85% at 120pt).
3. Display leading at or under about 1.2 and body leading 1.4-1.5 (Ableton 1.0-1.2 and 1.5; Nothing 80-85% display; TE 1.5 base).
4. Colour carries meaning and the accent is scarce (Nothing red, Ableton blue, Bloomberg orange and up/down states).
5. Depth is decided once: three of four use no shadow at all, replacing it with hairlines, rules or fills.
6. Focus is visibly different and not left to the UA, but never a two-layer ring in the evidence (Nothing border swap, Ableton border plus glow).
7. Named z-index, chrome dimensions and a touch floor (TE 48px, Nothing 64px header token).
8. Short tiered motion (Nothing .15s dominant with .3 to .5s fades; Ableton .1 to .35s; TE .15 to .25s).

REGISTER, not quality (existing files currently teach these as quality):

- Alpha hairline borders and 1px widths (01-token). Ableton 2px hex, TE none, Bloomberg 1px hex.
- Luminance ladder of four steps (01-token). TE two surfaces, Ableton white and #eee.
- One accent hue (01-token). TE and Ableton run several.
- Tinted neutrals (TOK-G4-2). Ableton and Bloomberg are black and white.
- Stepped radius family (01-token). Both registers run 0 plus pill, or 0 only.
- 4px or 8px spacing base (01-token). TE proportional; Ableton 5px.
- Two-layer focus ring (03-primitive). No exemplar here uses one.
- Chrome dimmer and thinner than content, 1px alpha header rule, shortcuts in chrome, command palette (12-chrome). App-tool register, not universal.
- One-line rows with hover-revealed actions (07-row). Untestable here.
- Elevation: 01-token should say "depth is decided once (ladder, hairline, fill or shadow)" rather than prescribe a recipe per theme.

TOK-G1-1's detector (text and surface at the extremes) and PRI-G3-1 (flat saturated button) fire on Ableton, which is premium. The wording of the criterion should say the tell is the absence of the rest of the system, not the colours themselves.

## Capture requests (human, real browser)

| #   | Capture                                                                                                                                                        | Why                                                                     |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1   | bloomberg.com/professional: DevTools Computed for body, h1, nav, primary button, card and input; export `:root` custom properties; screenshots at 1440 and 390 | Every Bloomberg value is UNVERIFIED; the site blocks scripted requests  |
| 2   | Bloomberg Terminal screenshots (a monitor page, news list, ECO) and a Professional product page                                                                | Row, console and density criteria have no first-party evidence          |
| 3   | TE: Tab through header and a product page; screenshot focus on a link, button and input; nav and tile hover states                                             | No focus rule found; hover unknown                                      |
| 4   | TE store product page and checkout with computed font-size on body text and price                                                                              | Which fs step is body; whether a button or row system exists            |
| 5   | Nothing: product page, cart drawer, an input focused and errored; computed shadow and radius on cards and buttons; 1440 and 390                                | Card, input, error and elevation CSS sit in per-page chunks not fetched |
| 6   | Nothing X companion app and Nothing OS Settings screens                                                                                                        | Only app-surface evidence for dot matrix in UI; Mobbin has none         |
| 7   | Ableton: Live product page, Shop cart; button hover, press, disabled; nav open state; computed root font-size                                                  | Hover and press absent; rem sizes ambiguous                             |
| 8   | Ableton Live and Push application screenshots (session view, browser panel, device chains)                                                                     | Instrument UI is the register's richest row and console evidence        |
