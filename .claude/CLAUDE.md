# Project Instructions

This repo is a reusable **Next.js App Router starter**. It ships the architecture,
conventions, and one example per layer; domain content is intentionally stripped out.

Before making changes:

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

Styling is **token-first**: use the named scale classes in `styles/globals.css`
(`.base-text`, `.pad`, `.gap`, `.smooth`, …) instead of inline responsive utility chains,
and add colors/animations as theme tokens rather than hardcoding them. See STYLE.md › Styling.

Established helpers (use these, don't re-roll them):

- `hooks/use-zod-form.ts` — controlled-form state + Zod validation.
- `lib/utils/get-api-error-message.ts` — read API error messages.
- `components/wrappers/motion-wrapper.tsx` + `lib/motion.ts` — entrance animation.
- `lib/api-routes.ts` (`config.api.*`) — all endpoints. `lib/api-client.ts` — the axios instance.

Scaffold-ahead (referenced but not yet built — see STYLE.md *Scaffold-ahead*):
`@/hooks/use-auth`, `components/common/logo`, `components/ui/general/*`, `lib/data/*`.

Workflow: Analyze → Plan → Implement
