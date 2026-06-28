# Project Instructions

This repo is a reusable **Next.js App Router starter** with an **opinionated, layered architecture**
designed for scalability and maintainability. The folder structure and architectural patterns are
**non-negotiable**—they define how everything is built.

---

## Folder Architecture (IMMUTABLE)

Every file goes in ONE correct place. If you're unsure, the architecture is broken.

```
project-root/
│
├── public/
│   ├── fonts/
│   │   └── font.ts                 ← Font imports & exports
│   └── images/                     ← Static assets, logos, favicons
│
├── lib/                             ← BUSINESS LOGIC LAYER (no React)
│   ├── api-routes.ts               ← SINGLE SOURCE OF TRUTH for all endpoints
│   │   └── config.api.* (nested)   ← Organized by domain/feature
│   │
│   ├── api-client.ts               ← HTTP client setup (Axios with defaults)
│   │
│   ├── validations/                ← Zod schemas (VALIDATION + TYPE SOURCE)
│   │   ├── [domain].ts             ← domainSchema, actionSchema, etc.
│   │   └── index.ts                ← (if re-exporting)
│   │
│   ├── interface/                  ← TypeScript interfaces & types
│   │   ├── index.ts                ← Re-exports all from ./
│   │   ├── [domain].ts             ← Domain-specific interfaces
│   │   └── base.ts                 ← Base/reusable interfaces
│   │
│   ├── enums/                      ← Enum constants (status, roles, types)
│   │   └── enums.ts
│   │
│   ├── data/                       ← Static data, constants, mappings
│   │   ├── mapped-data.ts          ← Animation timings (fast, slow constants)
│   │   ├── maps.ts                 ← Static mappings (statusMap, roleMap, etc.)
│   │   └── placeholder-data.ts     ← Mock data for development
│   │
│   ├── utils/                      ← Pure utility functions (no side effects, no React)
│   │   └── [utility-name].ts       ← One per function (date-formatter, currency-converter, etc.)
│   │
│   ├── types/                      ← Custom type definitions
│   │   └── types.ts
│   │
│   └── hooks/                      ← Custom React hooks (non-data-fetching)
│       └── use-[name].ts           ← useCallback helpers, useDebounce, etc.
│
├── hooks/                           ← DATA FETCHING LAYER (React Query hooks ONLY)
│   └── use-[domain].ts             ← One file per domain (use-users, use-contests, etc.)
│       (contains: useQuery, useMutation for that domain)
│
├── components/                      ← UI LAYER (React components)
│   ├── providers/
│   │   └── provider.tsx            ← QueryClientProvider, theme provider, etc.
│   │
│   ├── common/                     ← Shared, reusable primitives
│   │   ├── button.tsx
│   │   ├── logo.tsx
│   │   └── (shared primitives)
│   │
│   ├── general/                    ← General-purpose UI components
│   │   ├── form-input.tsx
│   │   └── (form/layout building blocks)
│   │
│   ├── wrappers/                   ← Layout wrappers & composition
│   │   └── motion-wrapper.tsx      ← Animations, layout composition
│   │
│   ├── ui/                         ← Feature-organized components
│   │   ├── forms/                  ← Form components (manual state + Zod)
│   │   ├── cards/                  ← Data display cards
│   │   ├── charts/                 ← Chart components
│   │   ├── skeletons/              ← Loading skeletons
│   │   └── (other domains)
│   │
│   ├── routes/                     ← Page-level components
│   │   └── [feature]/
│   │       ├── screens/            ← Dashboard screens
│   │       ├── [component-name].tsx ← Composition of smaller components
│   │       └── (features organized by domain)
│   │
│   └── icons/                      ← Custom SVG icons
│
├── styles/                          ← STYLING LAYER (CSS + theme tokens)
│   ├── globals.css                 ← Theme variables, scale classes, animations
│   │   ├── CSS variables (colors, fonts)
│   │   ├── .scale classes (.pad, .gap, .xxlarge-text, .smooth)
│   │   └── @keyframes (animations)
│   │
│   └── styles.ts                   ← Color configuration (bgMap or equivalent)
│
├── app/                             ← Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── (routes)
│
├── .claude/
│   └── CLAUDE.md                   ← THIS FILE
│
├── .next/, node_modules/
├── next.config.ts
├── tsconfig.json                   ← Strict mode; @/ alias = root
├── tailwind.config.ts
├── package.json
└── README.md
```

### Folder Architecture Principles

1. **Separation of Concerns** — Each folder has ONE responsibility
   - `lib/` = business logic (validation, types, utilities, API config) — no React
   - `hooks/` = data fetching ONLY (React Query wrapper) — no UI, no business logic
   - `components/` = UI ONLY — no business logic, no API calls
   - `styles/` = styling (CSS variables, scale classes) — no logic

2. **Single Responsibility Per File**
   - `api-routes.ts` → endpoints only
   - `api-client.ts` → HTTP client setup only
   - `validations/[domain].ts` → Zod schemas only
   - `hooks/use-[domain].ts` → all queries/mutations for one domain
   - `components/common/[component].tsx` → one primitive or reusable component

3. **Layered Communication** — Data flows DOWN only
   ```
   lib/ (config, validation, types, utils)
       ↓
   hooks/ (React Query: useQuery, useMutation)
       ↓
   components/ (UI: forms, cards, pages)
       ↓
   User
   ```

4. **Domain Organization**
   - Related files grouped by domain (auth, users, contests, etc.)
   - One validation file per domain: `lib/validations/auth.ts`
   - One hook file per domain: `hooks/use-auth.ts`
   - One UI folder per domain: `components/ui/forms/`, `components/ui/cards/`
   - Minimize cross-domain imports

5. **Immutability of Structure**
   - All endpoints → `lib/api-routes.ts` (NEVER hardcode URLs)
   - All validation → `lib/validations/` (NEVER inline validation)
   - All data fetching → `hooks/` (NEVER useQuery in components)
   - All UI → `components/` (NEVER className/style logic in lib/)
   - All styling → `styles/` (NEVER inline Tailwind)

---

## Architectural Patterns (THE FOUNDATION)

These are not suggestions—they are the system's backbone. Breaking these breaks everything.

### Pattern #1: Single Source of Truth at Every Layer

**Principle:** Define something once, reference it everywhere. Never duplicate.

**Implementation:**

| Decision Type | Where Defined | How Referenced | Why |
|---|---|---|---|
| API endpoints | `lib/api-routes.ts` → `config.api.*` | `const url = config.api.admin.users.all` | One change point; breaking changes surface immediately |
| Data shapes | `lib/validations/*.ts` → Zod schemas | `import { loginSchema } from "@/lib/validations/auth"` | Schema = validator + type source |
| Type definitions | `lib/interface/*.ts` → exported interfaces | `import type { User } from "@/lib/interface"` | Single type source, no duplication |
| Animation timings | `lib/data/mapped-data.ts` → `fast`, `slow` constants | `<MotionWrapper duration={slow} delay={fast * 2}>` | Consistent pacing; change once = changes everywhere |
| Theme tokens | `styles/globals.css` → CSS variables + class scales | `className="pad gap-y-4"` | No hardcoded values; tokens change = everything updates |
| Enum values | `lib/enums/enums.ts` → `TransactionStatus.PENDING` | `if (status === TransactionStatus.PENDING)` | No magic strings; type-safe |
| Static mappings | `lib/data/maps.ts` → `statusMap`, `roleMap`, etc. | `statusMap[status]` | Single mapping source |

**Red Line:** If something is defined in two places, one will get out of sync.

### Pattern #2: Layered Architecture with Strict Boundaries

Every layer has ONE job. Data flows DOWN only. Never flow UP.

```
LAYER 1: CONFIGURATION & VALIDATION (non-React, portable)
┌────────────────────────────────────────┐
│ lib/api-routes.ts       (endpoints)    │
│ lib/validations/        (Zod schemas)  │
│ lib/interface/          (types)        │
│ lib/enums/              (constants)    │
│ lib/data/               (static data)  │
│ styles/globals.css      (tokens)       │
└────────────────────────────────────────┘
              ↓
LAYER 2: BUSINESS LOGIC (React utilities, state, HTTP)
┌────────────────────────────────────────┐
│ lib/utils/              (pure functions)│
│ lib/api-client.ts       (HTTP setup)   │
│ lib/[store].ts          (Zustand)      │
│ lib/hooks/              (custom hooks) │
└────────────────────────────────────────┘
              ↓
LAYER 3: DATA FETCHING (React Query wrappers)
┌────────────────────────────────────────┐
│ hooks/use-[domain].ts   (useQuery,     │
│                          useMutation)   │
└────────────────────────────────────────┘
              ↓
LAYER 4: UI COMPONENTS (React only, dumb)
┌────────────────────────────────────────┐
│ components/common/      (primitives)   │
│ components/ui/          (features)     │
│ components/routes/      (pages)        │
└────────────────────────────────────────┘
```

**Import Rules (Strictly Enforced):**
- ✅ `components/` imports from: hooks/, lib/, styles/
- ❌ `components/` CANNOT: contain logic, make API calls, do validation
- ✅ `hooks/` imports from: lib/, styles/
- ❌ `hooks/` CANNOT: contain UI (JSX), form state, component logic
- ✅ `lib/` imports from: lib/ only (internal)
- ❌ `lib/` CANNOT: import from hooks/ or components/ (circular deps)

### Pattern #3: Data Flow (How Everything Connects)

Request → Validate (Zod) → Fetch (hook) → Cache (React Query) → Component → Render

```
READING DATA:
─────────────
Component renders
    ↓
Calls hook: const { data, isLoading, error } = useSomething()
    ↓
Hook calls config.api route
    ↓
API client (Axios) fetches with auth headers
    ↓
Response cached by React Query
    ↓
Component re-renders with data

WRITING DATA:
─────────────
User submits form
    ↓
Validate with Zod schema (client-side)
    ↓
If valid, call mutation: mutate(validData)
    ↓
Hook makes API call via Axios
    ↓
React Query caches + invalidates related queries
    ↓
Component updates from hook result or error
    ↓
Display success/error to user
```

### Pattern #4: Component Shapes (Every Component Type Has a Template)

#### Form Component Template
```typescript
"use client";
import { useState } from "react";
import { formSchema } from "@/lib/validations/[domain]";

export default function FormComponent() {
    const { mutate: submit, isPending, error } = useFormAction();
    const [formData, setFormData] = useState({ /* initial state */ });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (formErrors[e.target.name]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[e.target.name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = formSchema.safeParse(formData);
        if (!result.success) {
            const errors: { [key: string]: string } = {};
            result.error.issues.forEach((err) => {
                errors[err.path[0] as string] = err.message;
            });
            setFormErrors(errors);
            return;
        }
        submit(result.data);
    };

    return <form onSubmit={handleSubmit}>...</form>;
}
```

#### Data Display Component Template
```typescript
"use client";
import { useFetchData } from "@/hooks/use-[domain]";

export default function DataDisplay() {
    const { data, isLoading, error } = useFetchData();

    if (isLoading) return <Skeleton />;
    if (error) return <Error />;
    if (!data?.length) return <Empty />;

    return (
        <div>
            {data.map(item => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    );
}
```

#### Layout/Wrapper Component Template
```typescript
export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="pad gap-y-4">
            {children}
        </div>
    );
}
```

#### Primitive Component Template
```typescript
interface Props extends React.HTMLAttributes<HTMLElement> {
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

export default function Primitive({
    variant = "primary",
    size = "md",
    isLoading,
    children,
    className,
    ...rest
}: Props) {
    return (
        <div
            {...rest}
            className={clsx(
                "transition-all",
                variant === "primary" && "bg-blue",
                size === "sm" && "px-2 py-1",
                isLoading && "opacity-50",
                className
            )}
        >
            {children}
        </div>
    );
}
```

### Pattern #5: Hook Shapes (Data Fetching Hooks Only)

Hooks ONLY handle data fetching. No UI logic, no business logic, only React Query wrappers.

#### Query Hook Template (Read Data)
```typescript
import { useQuery } from "@tanstack/react-query";
import { config } from "@/lib/api-routes";
import { query } from "@/lib/api-client";
import type { DataType } from "@/lib/interface";

export function useFetchData(params?: { filter?: string }) {
    return useQuery({
        queryKey: ["domain", "resource", params],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            if (params?.filter) searchParams.set("filter", params.filter);
            const url = `${config.api.domain.resource}?${searchParams}`;
            const { data } = await query.get<DataType[]>(url);
            return data;
        },
    });
}
```

#### Mutation Hook Template (Write Data)
```typescript
export function useUpdateData() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: any) => {
            const { data } = await query.post(
                config.api.domain.action,
                payload
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["domain"] });
        },
    });
}
```

**Key Rules:**
- One file per domain: `hooks/use-[domain].ts`
- Multiple hooks per file (query + mutations for that domain)
- `queryKey` structure: `["domain", "resource", params?]`
- Mutations MUST invalidate related caches on success
- Only fetch/mutate; NO business logic, NO UI
- Error handling: extract via `error.response.data.message`

### Pattern #6: Styling (Token-First, Never Inline)

**NEVER do this:**
```typescript
// ❌ WRONG
<div className="px-4 py-6 md:px-6 lg:px-8 gap-4 md:gap-6 lg:gap-8">
```

**DO this:**
```typescript
// ✅ RIGHT
<div className="pad gap">
```

**Token-First Checklist:**
- Padding → use `.pad`, `.pad-x`, `.pad-y` (responsive scales defined in globals.css)
- Gap → use `.gap`, `.gap-x`, `.gap-y` (responsive scales)
- Animation → use `.smooth` or `.easy` (defined in globals.css)
- Font size → use `.xxlarge-text`, `.xlarge-text`, ..., `.xs-text` (fluid type scale)
- Color → use CSS variables from `styles/globals.css` or bgMap from `styles/styles.ts`
- Transition → use `.smooth` class (duration-300 ease-in-out pre-configured)

**If you need inline Tailwind:**
- Only for layout (flex, grid, justify-center, etc.)
- Only for responsive breakpoints (md:, lg:, xl:)
- NEVER for spacing, animation, or color
- Always justify in a comment if unusual

---

## Enforcing the Architecture

**How to Know If You're Following the Pattern:**

1. **Folder Check** — Can I find any file in the structure above without searching?
2. **Import Check** — Are imports flowing DOWN the layers? (components → hooks → lib, never reverse)
3. **Responsibility Check** — Does this file do ONE thing? Is business logic in lib/, UI in components/?
4. **Duplication Check** — Is this value/endpoint/validation defined only once in the codebase?
5. **Token Check** — Are all spacing/animation/color decisions coming from globals.css or mapped-data.ts?

**Code Review Questions:**
- Is there an endpoint hardcoded in a component? (Add to config.api)
- Is there validation logic outside of Zod schemas? (Move to lib/validations/)
- Is there UI logic in a hook? (Move to component)
- Is there business logic in a component? (Move to lib/ or hooks/)
- Is padding/gap inline instead of using scale classes? (Use .pad, .gap)
- Is animation timing hardcoded? (Add to mapped-data.ts, reference by name)
- Is a color value not in globals.css? (Add as CSS variable or to bgMap)

---

## Core Principles (Supporting the Architecture)

1. **Single Source of Truth** — Define recurring decisions once, reference by name everywhere
   - All endpoints in `lib/api-routes.ts` (never hardcode URLs)
   - All validation in Zod schemas (define once, reuse)
   - All constants in `lib/data/` or `lib/enums/` (no magic values)
   - All theme tokens in `styles/globals.css` (no hardcoded colors)
   - All types in `lib/interface/` (single type source)

2. **Pragmatic Minimalism** — Use framework/library built-ins; avoid hand-rolling
   - React Query for caching, mutations, invalidation (don't reinvent)
   - Zod for validation (use `.refine()` for complex rules)
   - Tailwind utilities (use `clamp()` for fluid type)
   - date-fns for all date logic
   - Fewer moving parts = less to maintain

3. **Type Safety First** — Strict TypeScript mode always
   - Data shapes are Zod schemas first (validation + type inference)
   - Interfaces for domain models
   - Generics for reusable patterns

4. **Lean Code** — Shorter is better, avoid unnecessary comments
   - Comments only for non-obvious WHY (not what)
   - No docstrings; good names are self-documenting
   - Delete unused code immediately; no stubs


## Established Patterns (Use These)

- `components/wrappers/` — Layout/animation composition
- `lib/data/mapped-data.ts` — Constants and timings (reused everywhere)
- `lib/api-routes.ts` — All endpoints centralized (never hardcode)
- `lib/api-client.ts` — HTTP client setup (reusable across all hooks)
- `lib/validations/[domain].ts` — Zod schemas (one file per domain)
- `lib/interface/` — Type definitions (single source of type truth)
- `lib/enums/` — Enum constants (no magic strings)
- `hooks/use-[domain].ts` — Data fetching per domain

## What NOT to Do

- Don't add dependencies before checking if TanStack Query / Zustand / Zod / Framer Motion already do it
- Don't create generic form components; use manual state + Zod validation
- Don't inline endpoint URLs; use `config.api.*` centralized routes
- Don't hardcode values (timings, colors, sizes); use theme tokens
- Don't re-export types unnecessarily; export from source
- Don't commit stub or placeholder files
- Don't break the layer boundaries (no logic in UI, no UI in lib)

## Tech Stack

| Layer | Library | Why |
|-------|---------|-----|
| Framework | Next.js 16 (App Router) | Latest, native RSC support |
| Type safety | TypeScript (strict mode) | Catch errors at compile time |
| Validation | Zod | Type inference + runtime validation |
| State (server) | TanStack React Query v5 | Caching, invalidation, background refetch |
| State (client) | Zustand | Minimal, persist middleware, DevTools |
| HTTP | Axios | Request/response interceptors, error handling |
| Styling | Tailwind CSS v4 | Utility-first, `clamp()` for fluid type |
| Animations | Framer Motion (motion library) | Entrance animations, springs |
| UI utils | clsx, class-variance-authority | Class composition, variants |
| Dates | date-fns | Parse, format, calculate (no moment) |
| Icons | Lucide React | ~500 icons, inline SVGs |

## Workflow

**When adding a feature:**
1. Define the shape: write Zod schema in `lib/validations/`
2. Define the endpoint: add to `config.api` in `lib/api-routes.ts`
3. Fetch the data: create hook in `hooks/use-*.ts` with React Query
4. Build the UI: component + form (manual state + Zod validation)
5. Connect them: inject hook into component, handle errors/loading

**Commits:**
- Semantic prefix (feat, fix, refactor, docs)
- Clear message (what changed, why briefly)
- One logical change per commit
