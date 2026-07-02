# Next.js Architecture

Type-safe, layered frontend architecture for scalability and maintainability. Folder structure and layer boundaries are **non-negotiable**.

---

## Core Principles (Apply Everywhere)

**1. Derive, Never Reconstruct.**
- **Derived artifacts rule:** If a library or framework generates a type, schema, validation result, or query shape, use that derived output directly. Examples include Zod `infer`, React Query results, API response types, class-validator DTO output, and third-party package typings.
- **No manual reconstruction:** Never replace a derived artifact with `any`, `Record<>`, `as { field?: type }`, or a hand-written parallel type just to satisfy the compiler.
- **Narrow by derivation:** If you need a smaller shape, derive it from the source artifact with the framework's own helpers or standard TypeScript utilities like `Pick` and `Omit`, not ad hoc object literals.
- **Single source of truth:** Config values (endpoints, enums, timings) live once in designated files (`api-routes.ts`, `enums/`, `mapped-data.ts`). Reference them everywhere, never duplicate.
- **Validate at the boundary:** Schemas validate input once at the edge. Never re-validate or duplicate validation logic across layers.
- **Generalize the rule:** Whenever a new tool emits a type, shape, or validation outcome, prefer its generated output over inventing a parallel abstraction.

**2. Design Tokens (All Layers)**
- Spacing, typography, colors, animations, shadows, borders—all defined once in tokens (CSS variables + scale classes), referenced everywhere.
- No inline Tailwind for values; use `.pad`, `.gap`, `.scale-*` token classes. Layout-only inline (flex, grid, justify-*).

**3. Strict Layer Separation**
- `lib/` = business logic only (no React). `hooks/` = data fetching only (React Query), no UI. `components/` = UI only, no API calls.
- One-way imports: components → hooks → lib. Never upwards.

**4. Strict Types, Always**
- No `any`. No manual type casts. DTOs + schema inference are the type source. Validate at boundaries, trust internal code.

**5. No Dead Code, No Stubs, No Placeholders**
- Delete unused code. Comments explain *why*, not *what*.

---

## Folder Structure (Immutable)

```
project-root/
├── lib/                          Business logic (no React)
│   ├── api-routes.ts            SSOT for endpoints + api shape
│   ├── api-client.ts            Axios client setup
│   ├── validations/             Zod schemas (type source)
│   ├── data/                    Static mappings, timings, enums
│   ├── enums/                   Constant enums
│   ├── interface/               TypeScript interfaces
│   ├── types/                   Custom types
│   ├── utils/                   Pure utilities (one per function)
│   └── hooks/                   Non-data-fetching hooks
├── hooks/                        Data fetching (React Query only)
│   └── use-[domain].ts          Queries + mutations
├── components/                   UI (React only)
│   ├── common/                  Shared primitives
│   ├── ui/                      Feature-organized components
│   ├── wrappers/                Layout + animations
│   ├── routes/                  Page-level components
│   └── icons/                   SVG icons
├── styles/                       Tokens (CSS vars + scales)
│   ├── globals.css             Design tokens, @keyframes
│   └── styles.ts               Color config
└── app/                         Next.js App Router
```

**Import Rules:**
- ✅ components/ → hooks/, lib/, styles/, external packages
- ✅ hooks/ → lib/, styles/, external packages
- ✅ lib/ → lib/ only, external packages
- ❌ Never: components calling API, hooks with JSX, lib/ with React

---

## Applying Principles: Framework Examples

**Principles 1–2 in action:**

| Derived artifact | Source → Use | ✅ Do | ❌ Don't |
|------|---|---|---|
| **Zod schema** | `schema` → validated input + inferred type | Use `z.infer<typeof schema>` | Duplicate the type by hand |
| **React Query result** | Query/mutation hook → auto-typed data + error | Use the hook's result type directly | Cast to `any` or `Record<>` |
| **API response type** | Axios/fetch response → typed payload | Use TypeScript's type inference or schema validation result | Re-type the response manually |
| **Config/enum values** | Single source (`api-routes.ts`, `enums/`, `mapped-data.ts`) | Import and reference the SSOT | Hardcode or duplicate the value |
| **Design tokens** | CSS variables + scale classes (`.pad`, `.gap-*`, `.xlarge-text`) | Use token classes | Inline value-based Tailwind |

**When you use a new library/framework:** First check whether it produces a derived type, schema, result shape, or validation outcome. If it does, use that output directly and avoid manual reconstruction with `any`, `Record<>`, `as` assertions, or parallel hand-written types.

---

## Workflow: Adding a Feature

1. Write schema → `lib/validations/[domain].ts`, export types via `z.infer<>`
2. Add endpoints → `lib/api-routes.ts` (SSOT)
3. Create hook → `hooks/use-[domain].ts` (React Query only)
4. Build component → `components/ui/[type]/[name].tsx`
5. Connect → Inject hook, handle loading/error/data states

---

## Cross-Package References

**Internal:** Use `@/*` for project paths (e.g., `@/lib/api-routes`, `@/components/common/button`).

**External packages:**
- Import types from `zod`, `react-query`, `axios`, etc. Let them infer shapes.
- Example: `import type { AxiosResponse } from 'axios'` for API response types, or use `z.infer<typeof schema>` for validation types.
- **Never duplicate external types** — use package exports and TypeScript's `typeof`, `z.infer<>`, library type helpers.

**Shared utilities (if in monorepo):**
- Use path aliases (e.g., `@shared/*` for workspace packages).
- Import types, schemas, enums, and configs from shared layers.
- Avoid circular imports: `shared/lib` → shared components only if necessary.

**Extending shared components:**
- Import from `@/*` or shared package, compose, add app-specific logic in local components.
- Don't modify shared components directly—wrap or extend.

**Type safety across packages:**
- When importing from external packages, prefer TypeScript definitions over manual typing.
- Use strict mode; let the compiler catch missing types.

---

## Code Review Checklist

**Principles:**
- ✅ Is this value/config/enum a candidate for SSOT (lib/)? If yes, move it.
- ✅ Is this a value that could change? If yes, should it be a token or config?
- ✅ Is a type duplicated instead of inferred? Use `z.infer<>`, package types, or computed types.
- ✅ Is a library generating shapes/types/validation that's being overridden? Use the library output directly.

**Layer violations:**
- ❌ Component calling API directly → move to hook
- ❌ Hook with JSX → move to component
- ❌ lib/ importing from React → move to hooks/
- ❌ Config/endpoint hardcoded in component → move to lib/api-routes.ts

**Styling:**
- ❌ Spacing/typography inline → use token classes (`.pad`, `.gap-*`, `.xlarge-text`)
- ❌ Animation timing hardcoded → add to `lib/data/mapped-data.ts`
- ❌ Color inline → use CSS variable or add to `globals.css`

---

## Tech Stack

Next.js 16 (App Router) · TypeScript (strict) · Zod · TanStack React Query v5 · Zustand · Axios · Tailwind CSS v4 · Framer Motion · date-fns · Lucide React

---

**This is the only architecture.** Follow it precisely. If you're unsure where something goes, the design is broken—re-read this instead of inventing new locations.
