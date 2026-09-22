Redesign the token layer (level 0 only) of this Next.js app.

## Target feel

Simple, minimal, top-tier product UI: think Linear, Vercel, Uniswap's current app, Phantom.

- Dark by default, near-black neutral surfaces, depth from surface steps and hairlines, not shadows.
- One electric accent used sparingly; everything else is greyscale plus status colour.
- Two type families at most: one geometric sans, one mono. Numbers always mono, tabular, slashed zero.
- Tight, consistent geometry: one radius language, 1px hairlines, snappy motion.
- Explicitly NOT: violet/blue gradients, glassmorphism, glows, noise, gradient text, rounded-full CTAs.

## Scope

- In: styles/tokens.css, styles/globals.css (@theme + named classes), public/fonts/font.ts,
  theme wiring in app/layout.tsx.
- Out: components. Components must not need edits — keep every public token/class name stable.
- Light theme: keep it as a complete, equal-quality counterpart, toggled by the existing .dark class.

## Engineering bar

- Tiered tokens: brand (hue/chroma) → theme (lightness) → semantic. Rebrand = one number.
- OKLCH. Derived colours (tints, washes, shadows) computed from base tokens, never restated.
- WCAG AA ≥ 4.5:1 for every text/background pair in both themes — prove it numerically.
- Audit every @theme mapping actually produces a working Tailwind utility; fix any that don't.
- Remove raw values from globals.css (px, breakpoints, opacities) into tokens.
- Flag, don't delete, anything that looks unused.

## Process

1. Audit first: report what exists, what's broken, what's redundant. Wait for my go-ahead.
2. Propose the palette, type pairing and radius/motion scale with reasoning, then build.
3. Verify with type-check, lint, tests, build, and a screenshot of the two most representative screens in both themes.

## Done means

Components untouched, all checks green, contrast table included, screenshots attached,
and a short list of follow-ups for level 1.
