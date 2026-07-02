# Next.js Frontend Architecture

This file is the auto-loaded entry point for every request in `next-setup`.
Follow it before any implementation detail.

## Agent Context

- **Primary agent:** Claude.
- **Secondary agent:** Copilot.
- Keep the rules short, explicit, and machine-agnostic so both agents follow the same architecture.
- Do not rely on hidden defaults from either agent; the file must stand on its own.

## File Roles

- **Claude-first:** `instructions.md`, `QUICK-REF.md`, `GOTCHAS.md`.
- **Claude + Copilot shared:** `BEFORE-YOU-CODE.md` for explicit anchoring when needed.
- **Copilot fallback:** use the same files, but treat `BEFORE-YOU-CODE.md` as the quickest manual prompt entry point.
- Keep the meaning of each file stable across machines and sessions.

## Core Rule

**Derive, never reconstruct.** If a library or framework generates a type, schema, result shape, or validation outcome, use that output directly. Do not rebuild it with `any`, `Record<>`, `as { ... }`, or a hand-written parallel type.

## Non-Negotiables

1. **Component → Hook → lib.**
   - Components render UI only.
   - Hooks fetch data only.
   - `lib/` holds pure business logic only.
   - Never cross layers upward.

2. **Validation happens once at the boundary.**
   - Use Zod schemas as the source of truth.
   - Infer types with `z.infer<typeof schema>`.
   - Do not re-validate in components or duplicate schemas with manual types.

3. **Use single sources of truth.**
   - Endpoints belong in `lib/api-routes.ts`.
   - Timings and mappings belong in `lib/data/mapped-data.ts`.
   - Enum values live in `lib/enums/`.
   - Do not hardcode these values in hooks or components.

4. **Use derived types from libraries.**
   - Prefer React Query’s inferred results, API client exports, and third-party package typings.
   - Narrow with `Pick`, `Omit`, or library helpers if needed.
   - Never write parallel hand-made types.

5. **Styling uses tokens, not inline values.**
   - Use token classes from `styles/`.
   - Avoid inline Tailwind values for spacing, timing, or scale.

## Quick Decision Tree

```
Where does this code belong?
├─ UI logic → component
├─ Data fetching → hook
├─ Pure transformations / shared logic → lib/
└─ Styling tokens / globals → styles/

Is this a type/shape/result from a tool?
├─ Yes → Use it directly.
└─ No  → Define it once in the correct layer/file.
```

## File-Level Checks

- `components/`: JSX only, no API calls, no business logic.
- `hooks/`: React Query only, no JSX, no business logic.
- `lib/`: pure utilities only, no React imports.
- `lib/validations/`: Zod schemas and inferred types.
- `styles/`: token definitions and globals.

## Verification Before Finishing

- No `as Record<>` or `as { ... }` casts.
- No hardcoded endpoints or config values.
- No API calls in components.
- No business logic in hooks.
- No inline value-based styling where tokens exist.

## Reference Files

- `QUICK-REF.md` for decision trees and layer checks.
- `GOTCHAS.md` for concrete failure cases.
- `BEFORE-YOU-CODE.md` for the anchor prompt if needed.
