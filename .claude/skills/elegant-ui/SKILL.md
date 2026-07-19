---
name: elegant-ui
description: >-
    Craft or upgrade React/Next UI in this starter's house design language —
    decomposed structure, data-driven rendering, the design tokens defined in
    styles/tokens.css (@theme) and public/fonts/font.ts, thin lucide icons,
    restrained color, smooth micro-motion, and a11y by default. Use when building
    ANY new frontend component / screen /
    section, when asked to make UI look elegant / modern / polished / premium /
    refined, or when asked to "upgrade" an existing component (which additionally
    emits a shadcn-style integration prompt). Frontend only.
---

# Elegant UI

Reproduce the elegance, structure, layout, composition, and color sense of first-class UI — always rendered in **this starter's own design tokens**, never generic shadcn defaults. This is a reusable starter template: it ships the tokens and a minimal set of primitives; build the rest to the standard below.

## Two modes

| Mode        | Trigger                                                                                              | Output                                                                                                             |
| ----------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Create**  | Component/screen does **not** exist yet ("build a…", "add a…", "make a…")                            | An elegant component written directly into `components/` in the house language.                                    |
| **Upgrade** | An existing component named + the word **"upgrade"** (or "elevate", "make it premium", "package it") | The re-elevated component **wrapped in the integration-prompt scaffold** — see `references/integration-prompt.md`. |

If the mode is ambiguous, default to **Create** and say so.

## Prime directive: translate, don't transplant

Learn _structure, layout, composition, and interaction_ from any exemplar (a dribbble shot, a 21st.dev prompt, a pasted component). But **every color, font, radius, shadow, spacing, and easing value must be a house token** from the table below. A dark hardcoded `bg-black text-neutral-50` reference becomes `bg-sidebar text-sidebar-text-active`. `bg-card` becomes `bg-background-muted`. Never emit a raw hex, a stock Tailwind palette color (`neutral-800`, `slate-500`), or a shadcn default token (`bg-card`, `text-muted-foreground`, `text-foreground`, `bg-primary`) — those tokens do not exist here.

## House tokens — the only vocabulary

Tailwind v4, tokens defined in `styles/tokens.css` + `@theme` in `styles/globals.css`. Dark mode = `.dark` class variant (`@custom-variant dark`).

**Color** (prefix `bg-` / `text-` / `border-`):
`background` · `background-alt` · `background-muted` — surfaces
`text` · `text-secondary` · `text-muted` · `text-inverse` — foreground ramp
`accent` · `accent-dark` · `accent-light` — the primary brand / interactive color (CTAs, active, emphasis; use sparingly). The concrete hue is defined once in styles/tokens.css.
`highlight` · `highlight-dark` · `highlight-light` — the secondary/featured accent for "pop" moments only (hue defined in styles/tokens.css).
`border` · `border-light` · `border-dark` — 1px dividers
`success` · `error` · `warning` · `info` (+ each `-light`) — status only
`sidebar` · `sidebar-border` · `sidebar-hover` · `sidebar-active` · `sidebar-text` · `sidebar-text-active` — the dark nav ramp
`metric-pipeline` · `metric-success` · `metric-activity` · `metric-warning` — metric/stat accents
`overlay` — modal scrims

**Type:** families `font-display` (serif display) · `font-body` (sans body) · `font-mono` (monospace) — the concrete typefaces are wired once in public/fonts/font.ts and exposed via the @theme in styles/globals.css; never restate the family names here. Scale `text-h1…text-h6`, `text-lg/base/sm/xs`, `text-label`, `text-caption`. Weights `font-light` (300) … `font-bold` (700).

**Radius** `rounded-xs sm md lg xl full` (xl = 12px, the ceiling). **Shadow** `shadow-sm md lg xl 2xl`. **Motion** easing `ease-smooth` (default), `ease-out`; duration `duration-200` (hover) / `duration-300` (layout). **Z-index** via tokens (`z-modal`, `z-popover`, …).

## Structure rules

1. **Decompose aggressively.** One job per component. A screen is a shell composing many small named pieces (`WorkspaceSwitcher`, `NavItem`, `SectionTitle`), not one 300-line function. Group them with `/* ── section ── */` banners.
2. **Data-driven rendering.** Content lives in a typed array/map above the render; JSX maps over it. Declare the shape (`type NavItemData = { id: string; title: string; icon: React.ElementType; children?: NavItemData[] }`). Recurse when the UI nests (an item renderer that renders itself for `children`).
3. **Build primitives to the house standard**, not shadcn's `data-slot` style: `forwardRef` + explicit `HTMLAttributes<…>` props + `displayName`; `cva` for variants. This starter ships only a **minimal** primitive set — `components/common/button.tsx` and `components/ui/forms/*` — and no `components/ui/index.ts` barrel yet. Reuse those where they fit; when you need Card / Modal / Badge / etc., **build them** to this standard rather than pulling in shadcn defaults (and consider adding a `components/ui/index.ts` barrel as they accrue). House gotcha: **the existing `Button` has no `asChild`/Slot** — for a link, wrap `<Link>` around `<Button>`.
4. **Controlled + uncontrolled duality** where a parent may or may not own state: `const current = value ?? internal`.
5. **`clsx` only (no tailwind-merge).** The codebase composes classes with `clsx` (`import clsx from "clsx"`), matching `components/common/button.tsx`. `className` will NOT override a base utility of the same CSS property — it just appends. Compose additively; put variability in `cva` variants (or `clsx` conditional maps), not in override-by-merge.
6. **Icons from `lucide-react`, absolute `@/` paths only** (`@/*` → project root). 4-space indent.

## Layout & spacing

- Flex-column shells: `flex-1 overflow-y-auto` scroll region, `mt-auto` pinned footer, consistent `gap-*`.
- One radius language per component; `border`/`border-t`/`border-r` (1px `border-border`/`border-border-light`) as the only dividers.
- Animated collapse via `grid-rows-[1fr]↔[0fr]` + `overflow-hidden`, not max-height hacks.
- Precision only when the scale can't express it (`py-[7px]`, `w-[18px]`); otherwise the token spacing steps.

## Color & elevation

- Establish hierarchy with the **text ramp** (`text-text` → `text-secondary` → `text-muted`) and **subtle surface shifts** (`bg-background` → `bg-background-muted`), not with saturated fills.
- Interaction/active state = a quiet wash + border, e.g. `hover:bg-background-muted hover:border-border`, active `bg-accent-light text-accent`. Accent and highlight appear rarely — a CTA, a badge, one focal number.
- Elevation is restrained: `shadow-sm` at rest → `shadow-md`/`lg` on hover, paired with a `hover:-translate-y-px`/`-0.5` lift and `ease-smooth`.
- Dark surfaces (nav rails, command palettes) use the `sidebar-*` ramp.

## Typography & density — two registers

The type scale is **marketing-grade** (`text-h1` 72px · `text-h2` 56px · `text-h3` 40px · `text-h4` 30px · `text-h5` 24px · `text-h6` 20px) with airy `1.75` body leading. It is NOT one size for every context — pick the register, or dense app UI reads oversized (the #1 "everything feels big" cause here).

- **Editorial register** — landing / marketing / hero / section headers / big empty states. The statement: `text-h1…text-h3 font-display font-light`, generous spacing, `text-lg` lede.
- **Application register — the DEFAULT for dashboards, cards, panels, tables, sidebars, forms, menus.** Step the scale DOWN and tighten:
    - Page/section titles `text-h5` / `text-h4` (never `text-h3`); focal numbers/prices `text-h6` / `text-lg`.
    - Body & rows `text-sm`; secondary/meta `text-xs`; micro-labels `text-caption uppercase tracking-wide`.
    - Icons `size-4` (16px); rows ≈ `h-9`; compact padding. Do NOT use `text-h1…h3` or `text-lg` body leading in this register.

- **The refined signal is weight, not size:** `font-display font-light` on whatever heading the register calls for — a `text-h5` in the light display face still reads as elegant. Body/labels `font-body`; keyboard hints `font-mono`.
- Always guard overflow: `truncate` + a `max-w-*`.

## Motion, icons, a11y (defaults, not extras)

- Everything interactive transitions (`transition-colors`/`transition-all duration-200 ease-smooth`). Entrances use `animate-in fade-in zoom-in-95`. Don't add reduced-motion guards — `styles/tokens.css` already does it globally.
- **lucide icons at `strokeWidth={1.5}`** (thin stroke is a core elegance tell); default `size-4` (16px) in the application register, `size-5` only for editorial/hero; colored via the text ramp.
- a11y: `aria-label` on icon-only buttons, `sr-only` labels, `select-none` on chrome, real `focus-visible:ring-2 focus-visible:ring-accent`, `type="button"` on non-submit buttons, keyboard handlers for overlays (Esc to close).
- **Imagery:** distinct real photos, one per item — NEVER a single repeated local placeholder like `/images/hero.jpg`. **Centralize a curated pool** in `lib/config/sample-images.ts` (create it) and pull from it (don't scatter hardcoded URLs across pages). Good free sources: **Unsplash** (`images.unsplash.com/photo-…?w=800&q=80`) and **Pexels** (`images.pexels.com/photos/…`) — large, high-quality free photo libraries — and **loremflickr** (`loremflickr.com/800/600/{keyword}` — dynamic, keyword-based, no IDs; swap `{keyword}` for the domain's subject). This starter has **no `images.remotePatterns` in `next.config.ts` yet** — add the host there before using any remote image, or `next/image` will reject it.

## Create workflow

1. Restate what's being built + where it lands (`components/ui/*` for primitives, `components/sections/*` / `components/patterns/*` / route `page.tsx` for composed UI).
2. Sketch the decomposition (shell + named parts) and the typed data shape.
3. Build it in house tokens per the rules above. Reuse existing primitives; build missing ones to the house standard.
4. Self-check against **Anti-patterns**, then run `pnpm type-check` / lint if available.

## Upgrade workflow

1. Read the existing component; re-elevate it against every rule above (decompose, tokenize, add motion/a11y, tighten type & spacing).
2. Produce a `demo.tsx` exercising it with realistic data.
3. Emit the **integration-prompt scaffold** from `references/integration-prompt.md`, filling: component file + code, `demo.tsx`, any dependency primitive files, and the exact npm deps. Keep the guideline/steps boilerplate verbatim.

## Anti-patterns (reject on sight)

- Any raw hex, stock Tailwind color, or shadcn default token (`bg-card`, `text-muted-foreground`, `bg-primary`, `neutral-*`, `slate-*`).
- A monolithic component that should be decomposed; JSX with content hardcoded inline instead of mapped from typed data.
- Relying on `clsx`/`className` to override a base utility (no tailwind-merge here).
- Thick default icon strokes; missing hover/focus states; saturated fills where a text-ramp/surface shift would do.
- `data-slot` shadcn-style primitives instead of the house `forwardRef` + `displayName` + `cva` pattern.
- Deep-relative imports (`../../../`) instead of `@/`.
