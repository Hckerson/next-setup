# Project Instructions

This repo is a reusable **Next.js App Router starter**. It ships the architecture,
conventions, and one example per layer; domain content is intentionally stripped out.

## The 8 Rules (read first, never break)

1. Read STYLE.md first — it is the source of truth for coding style and architecture.
2. Match the existing architecture; preserve existing abstractions.
3. Prefer Next.js native features and the libs already in use (Query / Zustand / Zod / motion)
   before adding dependencies.
4. **Leverage every framework/library efficiently.** Reach for the capability the tool already
   provides instead of hand-rolling what it does natively (e.g. CSS `clamp()` for fluid type
   instead of a manual breakpoint ladder; a Query/Zustand/Zod built-in over a bespoke helper).
   Fewer moving parts, less to maintain, closer to the platform.
5. **Single source of truth.** Name every recurring decision once as a semantic token and
   reference it by name everywhere — never inline the raw value. This is not styling-only:
   it's `config.api.*` for endpoints, `lib/motion.ts` for durations, enums for constants,
   Zod schemas for shape, theme tokens for design. Define once, change in one place.
6. Minimize LOC; prefer the shorter solution when equally maintainable.
7. Avoid introducing new patterns. If deviating from STYLE.md, explain why.
8. **No `any`.** Prefer `unknown` + narrowing or precise types; use `z.infer` for Zod-derived shapes.

Styling is **token-first**: use the named scale classes in `styles/globals.css`
(`.base-text`, `.pad`, `.gap`, `.smooth`, …) instead of inline responsive utility chains,
and add colors/animations as theme tokens rather than hardcoding them. See STYLE.md › Styling.

## File rules

- One component per file; kebab-case filenames matching the export (`motion-wrapper.tsx` → `MotionWrapper`).
- Absolute imports via `@/` — never deep-relative (`../../../lib/...`).
- A file over ~150 lines of logic is doing too much — split it; co-locate feature parts under `components/<feature>/`.
- Add packages with `pnpm add` — never hand-edit `package.json`.

## Pre-merge checklist

1. `pnpm error` clean (`tsc --noEmit`).
2. `pnpm lint` clean.
3. `pnpm build` succeeds.
4. No `any`, no `console.log`, no dead code.
5. No value inlined that a token, enum, `config.api.*`, or Zod schema already owns (Single source of truth).
6. Reused established helpers and primitives instead of re-rolling them.
7. Matched existing architecture and style; any STYLE.md deviation is explained.

**This is the only architecture.** Follow it precisely. If you're unsure where something goes, the design is broken—re-read this instead of inventing new locations.

Workflow: Analyze → Plan → Implement
