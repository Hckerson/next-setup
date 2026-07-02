# Next.js Architecture

Type-safe, layered frontend architecture for scalability and maintainability. Folder structure and layer boundaries are **non-negotiable**.

---

## Core Principles (Apply Everywhere)

**1. Single Source of Truth + Type Inference**
- **Config:** Endpoints in `api-routes.ts`, not hardcoded in components/hooks. Enum values in `enums/`, not as string literals. Theme timings in `mapped-data.ts`, not `delay: 300`.
- **Validation:** Zod schemas define both validation *and* types. DTOs are the type source at request/response boundaries. Never duplicate types.
- **Type Inference:** Let type-generating tools (Zod, React Query, external packages' TypeScript definitions) infer types. Use `z.infer<typeof schema>`, React Query's auto-typed results, and third-party type exports. Never cast to `any` or hand-roll `{ field?: type }`.
- **Apply this principle everywhere:** If a library generates types/schemas/shapes (Zod, React Query, external packages, API response types), use its output directly; never invent your own.

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

| Layer | Pattern | ✅ Do | ❌ Don't |
|-------|---------|-------|----------|
| **Config (SSOT)** | API endpoints, enums, timings | `const url = config.api.users.all` | Hardcode `/api/users` in hook |
| | Theme values | Import `mapped-data.ts` delays | `delay: "300ms"` inline |
| **Validation** | Schema + type source | `export type User = z.infer<typeof userSchema>` | Duplicate type + schema |
| | Component input | Validate with `schema.safeParse()`, use DTO type | Re-validate in hook |
| **Type Inference** | Zod, React Query, external libs | Use `z.infer<>`, React Query's auto-typed results | Cast to `any` or `Record<>` |
| **Styling** | Spacing, typography, colors, animations, shadows, borders | Use `.pad`, `.gap-*`, `.xlarge-text`, `.scale-*` token classes | `px-4 py-6 md:px-6`, `delay-300` |
| | Layout only | Inline `flex`, `grid`, `justify-*` | Inline value-based classes |

**When you use a new library/framework:** Check if it generates types (Zod, React Query, class-validator, API client types, third-party TS definitions). If yes, use its output directly; never cast or reinvent.

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
