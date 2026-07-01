# Next.js Architecture

Opinionated, layered architecture for scalability and maintainability. Folder structure is **non-negotiable**.

---

## Folder Structure (IMMUTABLE)

```
project-root/
├── lib/                             BUSINESS LOGIC LAYER (no React)
│   ├── api-routes.ts               SINGLE SOURCE OF TRUTH for all endpoints
│   │   └── config.api.* (nested)   Organized by domain
│   ├── api-client.ts               HTTP client setup (Axios)
│   ├── validations/                Zod schemas (validation + type source)
│   ├── interface/                  TypeScript interfaces & types
│   ├── enums/                      Enum constants (status, roles, types)
│   ├── data/                       Static data, timings, mappings
│   │   ├── mapped-data.ts          Animation timings (fast, slow)
│   │   ├── maps.ts                 Static mappings (statusMap, etc.)
│   │   └── placeholder-data.ts     Mock data
│   ├── utils/                      Pure utilities (one per function)
│   ├── types/                      Custom type definitions
│   └── hooks/                      Custom hooks (non-data-fetching)
│
├── hooks/                           DATA FETCHING LAYER (React Query ONLY)
│   └── use-[domain].ts             Queries + mutations per domain
│
├── components/                      UI LAYER (React only)
│   ├── common/                     Shared primitives (button, logo, etc.)
│   ├── general/                    Form inputs, layout blocks
│   ├── wrappers/                   Layout composition + animations
│   ├── ui/                         Feature-organized
│   │   ├── forms/                  Form components
│   │   ├── cards/                  Data display cards
│   │   └── (other domains)
│   ├── routes/                     Page-level components
│   └── icons/                      Custom SVG icons
│
├── styles/                          STYLING LAYER (Tokens only)
│   ├── globals.css                 CSS variables, .scale classes, @keyframes
│   └── styles.ts                   Color configuration (bgMap)
│
├── app/                             Next.js App Router
│
└── public/                          Static assets
    ├── fonts/                       Font imports
    └── images/                      Logos, favicons
```

---

## Layer Boundaries (Strictly Enforced)

```
lib/ (config, validation, types, utils)
  ↓
hooks/ (React Query: useQuery, useMutation)
  ↓
components/ (UI: forms, cards, pages)
```

**Import Rules:**
- ✅ components/ imports: hooks/, lib/, styles/
- ✅ hooks/ imports: lib/, styles/
- ✅ lib/ imports: lib/ only
- ❌ Never: components calling API, hooks with JSX, lib/ with React

---

## Critical Code Patterns

### Pattern 1: Centralized API Routes (Never Hardcode URLs)

```typescript
// lib/api-routes.ts
export const config = {
  api: {
    users: {
      all: '/api/users',
      byId: (id) => `/api/users/${id}`,
    },
    auth: {
      login: '/api/auth/login',
    },
  },
};

// ❌ WRONG in component or hook
// const url = '/api/users';

// ✅ RIGHT in hook
const url = config.api.users.all;
```

**Why:** Single source of truth. One URL change updates everywhere.

---

### Pattern 2: Zod Schema as Validator AND Type Source

```typescript
// lib/validations/auth.ts
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Form component
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const result = loginSchema.safeParse(formData);
  
  if (!result.success) {
    // Per-field errors from Zod
    const errors: { [key: string]: string } = {};
    result.error.issues.forEach((err) => {
      errors[err.path[0] as string] = err.message;
    });
    setFormErrors(errors);
    return;
  }
  
  mutate(result.data); // Type-safe data
};
```

**Why:** Eliminate type duplication. Zod validates AND generates types.

---

### Pattern 3: React Query Mutation with Cache Invalidation

```typescript
// hooks/use-users.ts
export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: CreateUserPayload) => {
      const { data } = await query.post(config.api.users.all, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Component
const { mutate, isPending } = useCreateUser();
const handleSubmit = (data) => mutate(data);
```

**Why:** Automatic cache invalidation prevents stale UI.

---

### Pattern 4: Hook Pattern (React Query Only, No UI)

```typescript
// hooks/use-users.ts
export function useFetchUsers(params?: { role?: string }) {
  return useQuery({
    queryKey: ["users", "list", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.role) searchParams.set("role", params.role);
      const url = `${config.api.users.all}?${searchParams}`;
      const { data } = await query.get<User[]>(url);
      return data;
    },
  });
}
```

**Why:** Separate data fetching from UI. Hooks = logic only, components = UI only.

---

### Pattern 5: Token-First Styling (Never Inline Spacing)

```typescript
// ❌ WRONG: Inline spacing
<div className="px-4 py-6 md:px-6 lg:px-8 gap-4 md:gap-6 text-lg">

// ✅ RIGHT: Scale tokens from globals.css
<div className="pad gap-y-4 xlarge-text">
```

**Tokens in globals.css:**
- Padding: `.pad`, `.pad-x`, `.pad-y` (responsive scales)
- Gap: `.gap`, `.gap-x`, `.gap-y` (responsive scales)
- Font: `.xxlarge-text`, `.xlarge-text`, ..., `.xs-text` (fluid type)
- Animation: `.smooth` (duration-300 ease-in-out)

**Inline Tailwind only for:**
- Layout: `flex`, `grid`, `justify-center`, `items-center`
- Breakpoints: `md:`, `lg:`, `xl:`

---

## Workflow: Adding a Feature

1. **Write Zod schema** → `lib/validations/[domain].ts`
2. **Add endpoint** → `config.api` in `lib/api-routes.ts`
3. **Create hook** → `hooks/use-[domain].ts` with React Query
4. **Build component** → `components/ui/[type]/[name].tsx` (manual state + Zod validation)
5. **Connect** → Inject hook, handle loading/error/data states

---

## Code Review Checklist

- Is an endpoint hardcoded in a component? → Move to `config.api`
- Is validation outside Zod? → Move to `lib/validations/`
- Is business logic in a component? → Move to lib/ or utils/
- Is a hook doing UI logic? → Move to component
- Is padding/gap inline? → Use `.pad`, `.gap` tokens
- Is animation timing hardcoded? → Add to `mapped-data.ts`
- Is a color not in globals.css? → Add as CSS variable

---

## Tech Stack

Next.js 16 (App Router) · TypeScript (strict) · Zod · TanStack React Query v5 · Zustand · Axios · Tailwind CSS v4 · Framer Motion · date-fns · Lucide React
