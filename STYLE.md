# {{APP_NAME}} — Engineering Style Guide

Source of truth for coding style and architecture. Read this before changing code.

## Guiding principle — leverage the tools, don't reimplement them

Before writing code, ask what the framework, library, or platform already does for you, and
lean on it. Use native capabilities over hand-rolled equivalents — they're less code, better
tested, and closer to the platform. This is the lens for *every* dependency we adopt.

- CSS `clamp()` for fluid typography instead of a per-breakpoint size ladder.
- Next.js native routing/metadata/image/font features over custom plumbing.
- A built-in from Query / Zustand / Zod / motion over a bespoke utility.

If you find yourself manually recreating behavior a tool offers, stop and use the tool's feature.

## Stack

- Next.js App Router + React + TypeScript.
- Tailwind CSS **v4**, CSS-first config (no `tailwind.config.js`).
- TanStack Query (server state) · Zustand (client state) · Zod (validation) · `motion` (animation).
- `clsx` for conditional classes. Prefer Next.js native features and the libs above before adding dependencies.

## Architecture

```
app/        Routes (App Router). Route groups: (auth), etc.
components/
  common/     Shared primitives (button, …)
  ui/         Feature UI (forms, auth, charts, skeletons, variants)
  wrappers/   Cross-cutting wrappers (motion-wrapper)
  providers/  Context/provider composition
  icons/
hooks/      Reusable hooks (use-zod-form, use-profile)
lib/
  api-routes.ts   All endpoints via config.api.*
  api-client.ts   The axios instance
  motion.ts       Animation tokens (fast, …)
  validations/    Zod schemas
  interface/ types/ enums/ utils/ data/ auth-store.ts
styles/     globals.css (theme + tokens), styles.ts (palette maps)
public/fonts/font.ts   Font exports
```

Match the existing architecture; preserve existing abstractions. Avoid introducing new patterns — if you deviate, explain why.

## Styling — token-first

The whole point of `styles/globals.css` is that recurring decisions are named once and reused. **Never inline what a token already covers.**

- **Typography:** use the scale classes `.xs-text` `.sm-text` `.base-text` `.md-text` `.large-text` `.xlarge-text` `.xxlarge-text`. Never write a one-off responsive size ladder in markup.
- **Spacing:** use `.pad` `.pad-x` `.pad-y` `.gap` `.gap-x` `.gap-y`, and section spacing `.large-pad` `.md-pad` `.large-pady` `.md-pady`.
- **Transitions:** use `.smooth` / `.easy`.
- Reach for an arbitrary value (`text-[27px]`, `p-[14px]`) only when no token fits — and prefer adding a token over repeating the value.
- Everything is **responsive and mobile-first** by default. No fixed, single-breakpoint sizing.
- **Colors & animations are theme tokens.** Add them as CSS vars in `:root` + `@theme inline` in `globals.css`; never hardcode hex in components. Per-feature color palettes live in `styles/styles.ts` (`cardStyles`).
- Reuse the gradient-border idiom (`::before` + `inset:0` + negative `margin` + `background-clip: padding-box`) for bordered/gradient surfaces — see `.rainbow-box`, `.gradient-link`, `.blue-gradient`.
- Document pragmatic browser fixes with a comment explaining *why* (e.g. the autofill block).

## Components

- Variants are **props-driven maps**, resolved with `clsx` (see `components/common/button.tsx` `sizes`, and `cardStyles`). Don't branch styling with sprawling conditionals.
- Accept the standard **`className`** prop for style overrides and merge it through `clsx`; spread native props via `...rest`.
- Mark client components with `"use client"`. Keep them as low in the tree as possible.
- Fonts come from `@/public/fonts/font`.

## State & data

- Server state → TanStack Query. Client/global state → Zustand stores in `lib/` (e.g. `auth-store.ts`). Don't hand-roll either.
- All endpoints go through `lib/api-routes.ts` (`config.api.*`); all requests through the `lib/api-client.ts` axios instance.
- Read API errors with `lib/utils/get-api-error-message.ts`.
- Validate with Zod (`lib/validations/*`). Controlled forms use `hooks/use-zod-form.ts` for state + validation.
- Entrance animation uses `components/wrappers/motion-wrapper.tsx` + tokens from `lib/motion.ts`.

## Established helpers (use these, don't re-roll them)

- `hooks/use-zod-form.ts` — controlled-form state + Zod validation.
- `lib/utils/get-api-error-message.ts` — read API error messages.
- `components/wrappers/motion-wrapper.tsx` + `lib/motion.ts` — entrance animation.
- `lib/api-routes.ts` (`config.api.*`) — endpoints. `lib/api-client.ts` — axios instance.

## Scaffold-ahead (referenced but not yet built)

`@/hooks/use-auth`, `components/common/logo`, `components/ui/general/*`, `lib/data/*`.

## Conventions

- Minimize LOC; prefer the shorter solution when equally maintainable.
- TypeScript throughout; type props with explicit interfaces.
- Match the surrounding file's idiom, naming, and comment density.
