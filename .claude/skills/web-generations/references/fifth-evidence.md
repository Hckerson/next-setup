# FIFTH generation ("premium today") evidence

References: Linear, Stripe, Vercel, Raycast, Apple. No other reference added.

Evidence conventions

- CSS = custom properties/rules read from the live site's shipped stylesheets, fetched 2026-11-09 (linear.app, stripe.com, vercel.com, raycast.com, apple.com/iphone). Cited as "CSS <site>".
- DOCS = Geist (vercel.com/geist/*), Linear blog, Stripe blog/docs, Raycast blog.
- MOBBIN = real app screens via Mobbin MCP (preview images, visual read only; pixel values from these are NOT measured and are labelled approximate or not stated). Mobbin ids are cited by first 8 chars of the screen id (mobbin.com/screens/<id>).
- UNVERIFIED = could not be confirmed from a source. Observed values are recorded as ratios/roles, never as values to copy (the starter ships no look).
- Compiled CSS lists variables per theme/breakpoint; where two values appear for one name (light vs dark, mobile vs desktop) both are given.
- Raycast caveat: the app is a native macOS window and not web-inspectable. All Raycast measurable evidence is from the marketing site CSS plus official blog posts. Raycast app layers are thin.

Mobbin ids used: Linear ffa2e456 (new issue modal), fd1b4d88 (backlog list), ef923b0e (grouped issues w/ sub-issue breadcrumbs), ed9cfa1b (settings templates), f71cec1e / f1e8745b / ea0c3b2c (document context menus), f2e7538e (customers empty), ee19dfbc (customer detail empty), ecc68a89 (initiatives inline create). Stripe fc5d4bcd (overview), f706524f (transactions), ec91306d (Radar rule), db9541c9 (analytics + assistant). Vercel e9576405 (deployments), e3e8c78e (CDN), e356ab80 (projects grid), e092c546 (project overview). Note: the Mobbin tool returns images in order; the id-to-image mapping above follows result order and is approximate for Linear (UNVERIFIED which of the first three ids is which image).

---

## 1. Token (colour, type, spacing, radius, shadow, motion)

### Linear (CSS linear.app; linear.app/now/how-we-redesigned-the-linear-ui; linear.app/now/behind-the-latest-design-refresh)

- Theme generation: 98 variables reduced to 3 inputs (base colour, accent colour, contrast); colour space moved HSL to LCH; contrast is a numeric input, high-contrast themes supported (2024 post). 2026 refresh: internal tool exposes hue/chroma/lightness per token, exports JSON to Figma (refresh post).
- Surface ladder (dark, CSS): bg-level-0 #08090a, 1 #0f1011, 2 #141516, 3 #191a1b (each step roughly +5-6 in 0-255 channel value). Light ladder #fff, #f8f8f8, #f4f4f4, #f0f0f0. Depth is made by luminance steps.
- Translucent fills (CSS): bg-secondary #ffffff08, translucent #ffffff0d, tertiary #ffffff12, quaternary #ffffff26 (white at 3 / 5 / 7 / 15 percent alpha).
- Borders are alpha (CSS): border-primary #ffffff14 (8 percent), secondary #ffffff1f (12), tertiary #ffffff26 (15), translucent #ffffff0d. Hairline widths 1px and .5px (--border-hairline).
- Text ladder = 4 steps (dark, CSS): primary #f7f8f8, secondary #d0d6e0, tertiary #8a8f98, quaternary #62666d.
- Accent: one hue, #7170ff dark / #5e6ad2 brand bg, hover #828fff, tint #18182f (CSS). Screens show accent only on the primary button and checked states (MOBBIN ffa2e456).
- Type scale (CSS): tiny .625rem/1.5, micro .75rem/1.4, mini .8125rem/1.5 (-.01em), small .875rem/1.5 (-.013em), regular .9375rem/1.6 (-.011em), large 1.0625rem/1.6 (0em). Titles: 1.0625, 1.25, 1.5, 2, 2.5, 3, 3.5rem; title 1-3 tracking -.012em, lh 1.4/1.33/1.33; title 4+ tracking -.022em, lh 1.125/1.1/1.0/1.1. App body default is 15px, not 16. Tracking tightens with size. Fonts: Inter, Inter Display for headings (2024 post).
- Weights are non-standard variable stops: 300 / 400 / 510 / 590 / 680 (CSS).
- Radius: 4, 6, 8, 12, 16, 24, 32, pill 9999 (CSS). card 12, app frame 12, editor block 6, button 4 or pill.
- Motion tokens (CSS): quick .1s, regular .25s, highlight fade-out .15s, fade-in 0s. Most common transition .16s ease-out-quad on background/color; filter+transform .16s. Full ease palette defined (quad/cubic/quart/quint/expo/circ).
- Marketing header heights 57 / 64 / 65 / 72px by breakpoint (CSS).
- FIFTH vs FOURTH: surface and border colours derive from 3 inputs in a perceptually uniform space and every border is alpha so it works on any surface; the clean-SaaS default hand-picks 8-12 hex greys.

### Stripe (CSS stripe.com; stripe.com/blog/accessible-color-systems)

- Colour built in CIELAB. Rule: any two colours >= 5 levels apart pass 4.5:1 (small text), >= 4 levels pass 3:1 (icons/large text); contrast is guaranteed by level distance, not checked per pair (blog). Step count UNVERIFIED.
- Spacing is a named 8px-based core scale (CSS --hds-space-core-*): 100=8, 200=16, 300=24, 400=32, 450=36, 500=40, 550=44, 600=48, 800=64. Button height tokens 44 or 48 (marketing).
- Radius (CSS): none 0, xs 2, sm 4, md 6, lg 16, xl 32, round. Card radius md (6px), inner 5px; button radius xs/sm (2-4px). Small radii are the signature.
- Border widths 1px, 1.25px, 2px (CSS --hds-space-core-border-sm/md/lg).
- Heading tracking -.01 to -.025em by size, 0em for xs/xxs; heading line-height 1.03 (xxl/xl) to 1.25; text line-height 1.35-1.4 (CSS). Font sohne-var.
- Motion (CSS): card 800ms cubic-bezier(.165,.84,.44,1); accordion .36s cubic-bezier(.65,.05,.36,1); chip 300ms; graphic reveal 300ms.
- Layout tokens (CSS): 12/8/4 columns, content max width 1264px, gap 16px, page margin 16px mobile.
- Accent #533afd (light), #7389ff (dark); neutrals are blue-tinted (#f8fafd, #e5edf5, #64748d).
- FIFTH vs FOURTH: semantic token layers (core scale, then action/input/button roles with explicit hover/disabled/error/focus variants) rather than a raw palette.

### Vercel (CSS vercel.com; vercel.com/geist/colors, /typography, /materials)

- Colour scale, 10 steps per hue with stated roles: 100 default bg, 200 hover bg, 300 active bg, 400 default border, 500 hover border, 600 active border, 700 high-contrast bg, 800 hover high-contrast bg, 900 secondary text/icons, 1000 primary text/icons (DOCS /geist/colors). Two page backgrounds: background-100 and -200 (CSS; dark 4 vs 0 percent lightness; light 100 vs 98).
- Dark grey steps (CSS): gray-100 10%, 200 12%, 400 18%, 1000 93% lightness; saturation 0.
- Type classes: heading 72/64/56/48/40/32/24/20/16/14; label 20/18/16/14/13/12 (+mono); copy 24/20/18/16/14/13 (+mono 13); button 16/14/12; Strong/Subtle via nested strong (DOCS). Per-class px/lh/tracking UNVERIFIED. Marketing Tailwind theme: tracking-tight -.025em, tighter -.05em; line-height pairs 1.25/.875, 1.5/1, 1.75/1.125.
- Spacing base --spacing .25rem (4px). Fluid clamp spacing tokens (e.g. clamp(1rem...1.5rem)).
- Radius: app 6px (--geist-radius), marketing 8px (--geist-marketing-radius). Materials (DOCS): base/small 6, medium/large 12; floating tooltip 6, menu 12, modal 12, fullscreen 16. Tooltip is the only floating element with a stem.
- Shadows (CSS): shadow-border-base 0 0 0 1px #00000014 light / #ffffff25 dark; border-inset 8 / 10 percent; 2xs 0 1px 1px #0000000a; 2xl = three stacked layers (1px, 8px, 24px offsets at ~2, 4, 6 percent). Borders are made with a 0-blur 1px shadow.
- Focus ring (CSS ds-focus-ring): 0 0 0 2px background-100, 0 0 0 4px focus-color (blue-700 light / 900 dark). Two layers so it reads on any surface.
- Motion (CSS): default .15s; popover .2s; overlay .3s with scale .96 and timing cubic-bezier(.175,.885,.32,1.1) (slight overshoot); hero .35s.
- FIFTH vs FOURTH: every colour step has a fixed job (bg / hover / active / border / hover border / text), so components pick a role, not a grey.

### Raycast (CSS raycast.com, marketing only)

- Dark ladder: #101111, #18191a, #313133, #494b4d; border #242728.
- Two functional hues: blue #57c1ff, red #ff6161, each with a 15 percent alpha tint.
- Radii 6, 8, 20, 26 (window radius). Small-text tracking positive: .1/.2/.3/.4px (counts 47/100/25/7). Fonts Inter + Geist Mono.
- Motion: .2s/.3s on colour, opacity, transform; .15s fast.
- App tokens (row height, vibrancy, window size): UNVERIFIED.
- FIFTH vs FOURTH: a two-colour functional palette over a near-black ladder; colour only carries meaning.

### Apple (CSS apple.com/iphone)

- SF Pro Display for headings, SF Pro Text for body, Helvetica Neue/Arial fallback.
- Role-named type: page-header-title 80/64/48px, lh 1.05/1.0625/1.083, weight 600, tracking -.015/-.009/-.003em; headline 28/24/21px, 600, tracking +.007/+.009/+.011em (positive at smaller display sizes); body 17px, lh 1.235-1.47, -.022em; caption 14px lh 1.286 -.016em; fine print 12px lh 1.333 -.01em. Tracking is optical, not constant.
- Component-owned type roles: typography-feature-card-headline/-body, product-tile-price, index-item-elevated, modal-header-headline, etc. (20-40 role classes per page).
- Button tokens: height 36/42/44, radius 980px (pill) or 5/8/10/12, padding 9x16, 14px text, disabled opacity .42.
- Radii: modal overlay 28px, ribbon 10-12, badge 3-6.
- Global nav 44px (48px variant), duration .24s, flyout close delay .12s. Focus 2px solid #0071e3, offset 1px (3px on containers).
- FIFTH vs FOURTH: type is specified per component role with per-breakpoint sizes and size-dependent tracking.

---

## 2. Scale class (named utilities for repeated scales)

- Vercel: type is named classes text-heading-N / label-N / copy-N / button-N (N = size) with -mono and nested strong/subtle modifiers; materials are named presets (material-base, small, medium, large, tooltip, menu, modal, fullscreen) bundling radius + fill + stroke + shadow (DOCS /geist/typography, /materials). Gap tokens geist-gap, half, quarter, double (CSS).
- Stripe: size ladders per role: heading xxs..xxl, text sm/md/lg/xl, input-text sm/md/lg, input-label, quote, quoteAttribution (CSS --hds-font-*).
- Apple: classes named by component role (CSS).
- Linear: size-named variables text-tiny..large and title-1..8 (CSS).
- FIFTH vs FOURTH: classes encode a role or material (job, with radius/shadow bundled), not only a size.

## 3. Primitive (Button, Badge, Input, Modal base)

- Button, Vercel (DOCS /geist/button): sizes tiny (icon-only), small, medium (default), large; variants default, secondary, tertiary, error, warning; shapes square/circle (icon-only, need aria-label), rounded (marketing, with shadow); loading and disabled shown at every size; hover/active only via CustomButton. Pixel heights UNVERIFIED. Focus ring per layer 1.
- Button/Input, Stripe (CSS): button 44/48 marketing, radius 2-4px, border 1px, secondary border colour shifts on hover (secondary-borderHover), disabled border token. Input tokens exist for default, hover, focus, selected, error, errorBlur, errorHover, errorFocus, disabled (--hds-color-input-border-*). Focus = border-colour change + outer ring in subdued colour.
- Button, Apple (CSS): pill, 14px, 9x16 padding, disabled .42.
- Button, Linear (CSS): text size from micro/mini/regular, radius 4 or pill, .16s background transition. Screens: primary = accent fill with ~12-13px label (MOBBIN ffa2e456).
- Modal, Vercel (DOCS /geist/modal): Modal/Body/Header/Title/Subtitle/Inset/Actions; Cancel secondary left, primary right; focus trapped, initialFocusRef; mobile = bottom sheet; toasts render above and stay interactive; Escape and outside click dismiss non-destructive. Destructive: default focus on Cancel, Enter never fires destructive, high stakes gated by typed resource name, title "Verb Noun", body states consequence first, closing line "This cannot be undone.", button "Verb + Noun" not "Confirm/OK". Size and animation in docs UNVERIFIED; motion tokens overlay .3s, scale .96 (CSS).
- Badge (MOBBIN): Stripe chips (Succeeded/Failed/Incomplete/Cancelled) tinted bg + same-hue text, ~11-12px (f706524f); Vercel dot + text "Ready"/"Error" and tinted pills "Current", "Rolled Back" (e9576405).
- FIFTH vs FOURTH: every state has its own token and focus is a two-layer ring.

## 4. Brand (wordmark, logo mark)

- Linear (MOBBIN): product shows only a small workspace avatar top-left, no wordmark. Marketing wordmark size UNVERIFIED.
- Stripe (MOBBIN f706524f): dashboard top-left shows account name + environment label, not the Stripe wordmark; brand colour appears on primary action.
- Vercel (MOBBIN e9576405): team switcher with plan badge ("Pro Trial"); triangle mark per project.
- Raycast: keycap-shaped app icon inspired by Apple Magic Keyboard to signal keyboard-first (blog raycast.com/blog/a-fresh-look-and-feel).
- Apple (CSS): nav 44px; glyph not wordmark; nav items rgba(0,0,0,.8) / rgba(255,255,255,.8) rising to 100 percent on hover.
- FIFTH vs FOURTH: in product the brand recedes to an identity/switcher; brand colour is spent on the primary action.
- Evidence thin (no measured logo sizes).

## 5. Pattern (stat cell, data table, page intro)

- Stat cell, Stripe (MOBBIN fc5d4bcd): label with info icon, larger value, footer "Updated 29 minutes ago" + "More details"; hairline-bordered card; empty chart = dashed placeholder with "No data" chip.
- Stat strip, Stripe Radar (MOBBIN ec91306d): 5 KPI cells in one bordered strip sharing hairline dividers; label, value, link.
- Data table, Vercel (DOCS /geist/table): sortable headers are buttons, decorative arrow; tabular-nums or Geist Mono on numeric columns; em dash for unknown; relative time "2m ago" switching to "Mar 14, 2026" after 7 days; variants striped/bordered/interactive/virtualize; empty list renders Empty State outside the table. Row height UNVERIFIED.
- Data table, Stripe (MOBBIN f706524f): checkbox column, right-aligned amount + currency, status chip, mono IDs, truncated description, "1-13 of 13 results" pager, filter chips above.
- Page intro: Stripe = H1 (~20-24px) + tabs + actions right (MOBBIN); Linear = no H1, breadcrumb header only (MOBBIN).
- Empty state, Vercel (DOCS /geist/empty-state): icon size 32, Title Case title, sentence-case description; max 1 primary CTA (2 only for two legitimate paths, never 3); real Button/Link; never "Get Started"/"OK"; quote single search term verbatim; "No {Items} Match Your Filters" for multi-facet; error variant has copyable request ID + "Try Again"; aria-live=polite after filter change. Variants: blank slate, informational, educational, guide, no-results, permission, tier-denial, error. Permission/tier denial full page; a gated tile uses a Note.
- Empty state, Linear (MOBBIN f2e7538e, ee19dfbc, ecc68a89): small line-art illustration, short title, 1-2 sentences saying what the entity is for, primary button + secondary "Documentation"; initiatives empty = inline-create form in the list.
- FIFTH vs FOURTH: empty/loading/error are designed per variant with a CTA budget and copy rules; numeric cells align.

## 6. Mark (small domain indicator, status chip)

- Linear (MOBBIN fd1b4d88, ffa2e456): status is a ~14px glyph whose shape changes (open circle, half-filled, check circle, dashed) plus colour; priority is a bars glyph; label chip = tinted pill.
- Stripe (MOBBIN f706524f): tinted fill + same-hue text, ~11-12px bold; red Failed, green Succeeded, grey Incomplete/Cancelled.
- Vercel (MOBBIN e9576405): coloured dot + word ("Ready", "Error") plus duration; separate pills for "Current" and "Rolled Back".
- Linear refresh (blog): coloured team icon backgrounds removed, icons scaled down.
- FIFTH vs FOURTH: state is encoded in glyph shape as well as colour, and marks shrink to 11-14px.

## 7. Row (one entity in a list)

- Linear (MOBBIN fd1b4d88): single line; hover drag dots at left; ID in tertiary colour; status glyph; title in primary colour; right-aligned project chip, assignee avatar, date; no dividers; group header bands with count and + (Backlog 4, In Progress 2, Todo 2/3, Done 11). Row pitch about 22-24px at preview scale (approximate, UNVERIFIED in px).
- Long content (MOBBIN ef923b0e): sub-issue as "Parent > child" on one line with parent in secondary colour; titles do not wrap.
- Stripe (MOBBIN f706524f): hairline between rows, no zebra, fixed columns, truncated description.
- Vercel (MOBBIN e9576405): two-line row (ID bold, environment under), six columns, branch/commit in mono; hover/selection UNVERIFIED.
- Raycast: Action Panel reuses the same list item component as the main list (blog launch-week-summary). Row height UNVERIFIED.
- FIFTH vs FOURTH: one line, fixed columns, tertiary metadata, hover-revealed affordances, no divider lines; the default is a bordered card per row with wrapping text.

## 8. List and modal (entity list, confirm modal)

- Linear list (MOBBIN): grouped by status, collapsible, counts, + per group; filter and display icons top-right.
- Linear menus (MOBBIN f71cec1e, f1e8745b, ea0c3b2c): item verb left, shortcut right (Move to P, Rename R, Favorite F, Remind me H); submenu opens to the side; "Move to" submenu has a Filter input at top, sections "Projects"/"Initiatives" in small tertiary labels, check on current.
- Linear composer modal (MOBBIN ffa2e456): centred card (~380px wide at preview scale), property pills in one row, "Create more" toggle + primary in footer, "Save as draft" top right.
- Vercel: destructive confirm rules (layer 3); Modal rather than Sheet/Drawer because those do not fully dim the page.
- Stripe: ContextView = non-blocking drawer beside the page; FocusView = drawer with blocking backdrop for start-to-finish tasks; default to ContextView (DOCS docs.stripe.com/stripe-apps/design).
- FIFTH vs FOURTH: menus show a shortcut per item; side panels and inline-create beat modals; destructive actions use typed confirmation.

## 9. Section (page section: rail, hero, feature band)

- Marketing non-cinematic: Stripe 12/8/4 columns, max content 1264px, gap 16px (CSS). Vercel Geist Grid: visible 1px guide lines and GridCross marks at intersections, solid cells occlude guides (DOCS /geist/grid). Apple: headline 80/64/48px 600 + one-line sub + two links (CSS + page copy). Linear marketing media queries 640/768/1024/1280 dominate (counts 99/31/44/19).
- App sections: Stripe home = grid of equal cards (title, value, chart, footer) (MOBBIN fc5d4bcd); Vercel overview = 3-up recommendation tiles + label/value settings grid (MOBBIN e092c546).
- Section gap tokens exist at core-700 and core-1200 (Stripe CSS); px UNVERIFIED.
- FIFTH vs FOURTH: shared column grid and a token max width; one headline per band.

## 10. Console (table + filters + detail)

- Stripe Transactions (MOBBIN f706524f): title + tabs (Payments, Payouts, Collected fees, Transfers, All activity), then filter chips (status chips + Filter button + column-settings icon), table, pager; actions top-right.
- Stripe analytics (MOBBIN db9541c9): chip filters ("Last 3 months", "Weekly", "Deduplicated"), "Compared to" selector, docked assistant panel (~25 percent width) that does not cover the page; Developers drawer docked at bottom.
- Vercel deployments (MOBBIN e9576405): filter bar (date range, authors, environments, repositories, branches, status 5/6) with "All X" labels and counts; sidebar has "Find... F".
- Linear (MOBBIN): view tabs All issues/Active/Backlog as pills; detail opens in-pane. Command menu UNVERIFIED (keyboard docs URL 404; Mobbin returned context menus).
- FIFTH vs FOURTH: filters are persistent chips with visible state; detail does not navigate away; assistant/dev panels dock.

## 11. Page (composition and page shape)

- Linear (MOBBIN; CSS --app-radius 12px): main content is a lifted rounded panel inside a slightly dim sidebar frame; header = breadcrumb left, icon actions right. Sidebar dimmed "a few notches" so content wins; header actions moved to predictable places (refresh post).
- Stripe: H1 + tabs + filters + content (MOBBIN).
- Vercel: page is bordered cards on bg-200 using 1px alpha ring (MOBBIN, CSS).
- Raycast: single list + bottom action bar; Compact Mode hides most chrome (blog).
- Apple: stacked full-width tiles under a 44px nav.
- FIFTH vs FOURTH: content is a distinct panel against a dimmer chrome frame; header holds only breadcrumb + icon actions.

## 12. Chrome (sidebar, topbar, header, footer, nav)

- Linear sidebar (MOBBIN fd1b4d88): ~190-200px wide at preview scale (approximate), 13px items with 14-16px icons, collapsible tertiary section labels ("Workspace", "Your teams", "Try"), selected = subtle fill, no accent. 2026 refresh: dimmer, compact rounded tabs, icon-only tabs, softer separators (refresh post).
- Stripe sidebar (MOBBIN fc5d4bcd): primary items, then "Products" group with chevrons; global search at top of content; help/bell/settings/+ at right.
- Vercel sidebar (MOBBIN e9576405): dark, 20+ items with 16px icons, "Find... F" chip, upsell card pinned bottom, user at bottom; area nav swaps in place with back chevron (MOBBIN e3e8c78e).
- Vercel header 64px, border-bottom as 1px shadow #0000001a/#ffffff1a, sub-menu 46px (CSS).
- Raycast: bottom action bar; left nav title + toasts, right actions with shortcuts; Cmd+K surfaced in bar; toasts in-window (blog).
- Apple: nav 44px/48px, items 80 percent opacity, flyout .24s. Footers: multi-column link lists, not measured (UNVERIFIED).
- FIFTH vs FOURTH: chrome is dimmer and thinner than content, and shortcuts live in chrome.

## 13. Portal layout (frame of one area)

- Vercel: area sidebar replaces global in place with back chevron + title (MOBBIN e3e8c78e); team switcher top, project switcher in header.
- Stripe: Radar adds a "Shortcuts" group at top of sidebar; area tabs under H1 (MOBBIN ec91306d, db9541c9).
- Linear: Settings frame has "Back to app", grouped nav (Issues, Projects, Features, Administration) (MOBBIN ed9cfa1b).
- Stripe Apps: app drawer beside page with colour-bar app indicator (docs).
- FIFTH vs FOURTH: area frame swaps sidebar contents and offers a labelled way back. Thin on measured values.

## 14. Root layout (fonts, theme, document)

- Linear: Inter + Inter Display; light, dark, custom themes from 3 variables, high contrast (2024 post). 16 prefers-reduced-motion matches in CSS.
- Stripe: sohne-var + code font; light and brandDark tokens; 8 reduced-motion matches.
- Vercel: Geist Sans + Mono; hsla vars light/dark; 13 reduced-motion matches.
- Raycast: Inter + Geist Mono; 7 reduced-motion matches.
- Apple: SF Pro with per-language stacks (ja, ko, ar, th, zh); only 1 reduced-motion match in the fetched iPhone-page CSS.
- FIFTH vs FOURTH: both themes tuned (not inverted), per-language stacks, reduced motion handled.

---

## States (cross-layer)

- Focus-visible: Vercel dual ring (2px bg gap + 2px colour) or 2px outline; Apple 2px solid, offset 1px (3px containers); Linear 2px accent outline offset 2px, inner items use negative offset; Stripe outline + border-colour change (all CSS).
- Hover: Linear .16s background ease-out-quad; Vercel step+1 (bg 200, border 500); Stripe borderHover token; Apple 80 to 100 percent.
- Disabled: Apple opacity .42; Stripe disabled border tokens; Vercel documented per variant.
- Loading: Vercel Button loading prop at all sizes. Skeleton rows UNVERIFIED.
- Empty / error: layer 5 (Vercel error empty state with request ID + Try Again).
- Selected: Linear sidebar subtle fill (MOBBIN). Raycast high-contrast selection is third-party only, UNVERIFIED.

## Motion summary (CSS)

- Durations: Linear .1/.15/.16/.18/.25s; Vercel .12-.55s with popover .2s, overlay .3s; Stripe .3/.36/.8s; Raycast .15/.2/.3s; Apple .12/.24/.5s.
- App interactions mostly <= .25s; marketing .3-.8s on cards/accordions.
- Easing: Linear ease-out-quad on hover; Vercel swift curve with slight overshoot for overlays; Stripe out-expo-like curves.
- What never animates: UNVERIFIED (not derivable from static CSS).

## Keyboard affordances

- Raycast: Action Panel Cmd+K; Enter and Cmd+Enter as primary/secondary (developers.raycast.com Action Panel); shortcuts shown in action bar (blog).
- Linear: menu items show per-row shortcut keys (MOBBIN f71cec1e); "Ctrl R" on Add request button (MOBBIN ee19dfbc). Command menu, J/K navigation UNVERIFIED.
- Vercel: "Find... F" chip in sidebar, "Esc" chip on project search (MOBBIN e9576405, e356ab80). Modal rules in layer 3.
- Stripe: search field at top; shortcuts UNVERIFIED.

---

## FIFTH vs FOURTH (single most important delta per layer)

1. Token: surfaces/borders from alpha and luminance steps; contrast guaranteed by level distance.
2. Scale class: classes bundle a role (type + radius + shadow).
3. Primitive: every state is its own token; two-layer focus ring.
4. Brand: recedes in product; brand colour only on primary action.
5. Pattern: empty/loading/error per variant with CTA budget; numeric alignment.
6. Mark: state in glyph shape and colour at 11-14px.
7. Row: single line, fixed columns, no dividers, hover-revealed affordances.
8. List/modal: shortcut per menu item; side panels over modals; typed confirmation for destructive.
9. Section: shared grid and token max width; one headline per band.
10. Console: persistent filter chips with visible state; detail without navigation.
11. Page: content panel distinct from dimmer chrome; header = breadcrumb + icon actions.
12. Chrome: dimmer and thinner than content; shortcuts exposed.
13. Portal layout: area frame swaps sidebar, labelled way back.
14. Root layout: tuned themes, per-language stacks, reduced motion.

## App-specific vs marketing-specific

App (Linear app, Stripe dashboard, Vercel dashboard, Raycast app)

- Density: 13-15px body (Linear regular .9375rem), single-line rows, alpha hairlines, dim sidebar, accent on one primary action.
- Keyboard-first: shortcuts in menus, action bar, find chip.
- State coverage: empty/loading/error/permission variants, filter chips with counts.
- Non-blocking surfaces: side drawers, in-pane detail, inline create.
- Motion .1-.25s, no decorative motion.

Marketing (Linear/Stripe/Vercel/Raycast sites, Apple)

- Larger type with size-dependent tracking: Apple 80/64/48px at 600, -.015 to -.003em; Stripe -.01 to -.025em, lh 1.03-1.07; Linear titles 2-3.5rem, -.022em, lh 1-1.1. Body lh 1.35-1.6.
- Layout: 12/8/4 columns, max content 1264px (Stripe); breakpoints 640/768/1024/1280 (Linear).
- Nav: 44px (Apple), 64px (Vercel), 57-72px (Linear); items at 80 percent opacity; header rule is a 1px alpha line.
- Rhythm: 8px core scale (Stripe), 4px base (Vercel), fluid clamp spacing (Vercel).
- Motion .3-.8s on cards/accordions; reduced-motion handled (Apple page only 1 match).
- Marketing radius larger than app (Vercel 8 vs 6; Apple tiles/modals 28).
- Proof (logos, quotes, numbers) and footers not measured (UNVERIFIED). Scroll-film heroes defer to cinematic-web.

## Evidence gaps

- Raycast app: no accessible measurements (row height, window size, vibrancy). Thin.
- Linear command menu, J/K navigation, row height px, sidebar width: UNVERIFIED (keyboard docs 404; Mobbin previews only).
- Vercel Geist: per-class px/lh/tracking and Button heights absent from docs; table row height absent.
- Stripe: colour step count, heading font sizes (CSS uses calc/clamp, not resolved), dashboard shortcuts.
- Footers and marketing proof sections not measured for any reference.
- Apple: one marketing page (iPhone) only.
