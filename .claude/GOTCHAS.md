# Next.js Common Gotchas — Real Examples to Avoid

These are the specific ways you'll see me slip up. Use this to catch me.

---

## Gotcha 1: Casting API Responses Instead of Using Schema Inference

**The Mistake:**
```typescript
// ❌ BAD — In hook
const response = await api.getUser(id);
const user = response as { id: string; email: string }; // Manual cast
```

**Why it's wrong:**
- You're hand-typing what Zod or the API client already knows
- If the API schema changes, this breaks silently
- You lose type safety and autocomplete

**The Right Way:**
```typescript
// ✅ GOOD
const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

const response = await api.getUser(id);
const user = userSchema.parse(response); // Validates + infers type
type User = z.infer<typeof userSchema>; // Type derives from schema
```

**OR** use the API client's built-in response types:
```typescript
// ✅ GOOD (if client exports types)
import type { AxiosResponse } from 'axios';
const response: AxiosResponse<User> = await api.getUser(id);
```

**In your codebase:** Look for `as { ... }` or `as Record<>` in hook files. That's where this happens.

---

## Gotcha 2: Building Response Types Parallel to Zod Schemas

**The Mistake:**
```typescript
// ❌ BAD — both defined in same file
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export type User = {
  id: string;
  email: string;
  name: string;
}; // Duplicated! Zod already has this
```

**Why it's wrong:**
- Two sources of truth for the same thing
- If you add a required field to Zod, you forget to update the type
- It's redundant

**The Right Way:**
```typescript
// ✅ GOOD
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>; // Derived, single source
```

**In your codebase:** Look for parallel type definitions and schemas in lib/validations/. That's the smell.

---

## Gotcha 3: Not Using API_ROUTES SSOT

**The Mistake:**
```typescript
// ❌ BAD — hardcoded endpoint
const response = await fetch('/api/users/all');

// ❌ Another place does:
const response = await fetch('/api/users');  // Inconsistent!
```

**Why it's wrong:**
- Endpoints scattered across the codebase
- If backend changes endpoint, you update 10 places
- No single source of truth

**The Right Way:**
```typescript
// ✅ GOOD — lib/api-routes.ts is the SSOT
export const API_ROUTES = {
  users: {
    all: '/api/users',
    byId: (id: string) => `/api/users/${id}`,
  },
};

// In hook:
import { API_ROUTES } from '@/lib/api-routes';
const response = await fetch(API_ROUTES.users.all);
```

**In your codebase:** Look for endpoint strings hardcoded in hooks or components. That's wrong.

---

## Gotcha 4: Putting Business Logic in the Hook

**The Mistake:**
```typescript
// ❌ BAD — hook with logic
export function useUsers() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.getUsers();
      // Business logic here!
      return res
        .filter(u => u.role === 'admin')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(u => ({ ...u, displayName: `${u.name} (${u.email})` }));
    },
  });
  return data;
}
```

**Why it's wrong:**
- Hook should only fetch/mutate
- Business logic duplicates across components
- Hard to test or reuse transformations

**The Right Way:**
```typescript
// ✅ GOOD — hook fetches only
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => api.getUsers(),
  });
}

// Transformation in lib/
export function filterAndSortUsers(users: User[]) {
  return users
    .filter(u => u.role === 'admin')
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function formatUserDisplay(user: User) {
  return { ...user, displayName: `${user.name} (${user.email})` };
}

// Component uses both:
function UserList() {
  const { data: users } = useUsers();
  const admins = filterAndSortUsers(users || []);
  return admins.map(formatUserDisplay).map(u => <div key={u.id}>{u.displayName}</div>);
}
```

**In your codebase:** Look for hooks with `.filter()`, `.map()`, or date formatting. That's wrong.

---

## Gotcha 5: Building Manual State When React Query Already Provides It

**The Mistake:**
```typescript
// ❌ BAD
export function useUserDetail(id: string) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getUser(id).then(u => {
      setUser(u);
      setLoading(false);
    }).catch(e => setError(e));
  }, [id]);

  return { user, loading, error };
}

// You re-invented what React Query does!
```

**Why it's wrong:**
- React Query already manages data, loading, error states
- You're duplicating state management
- No caching, no deduplication

**The Right Way:**
```typescript
// ✅ GOOD
export function useUserDetail(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => api.getUser(id),
  });
  // Returns: { data, error, isLoading, isPending, ... }
}

// Component:
function UserDetail({ id }) {
  const { data: user, error, isLoading } = useUserDetail(id);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{user.name}</div>;
}
```

**In your codebase:** Look for `useEffect` + `useState` patterns for data fetching in hooks. That's wrong—use React Query.

---

## Gotcha 6: Hardcoding Config Values (Delays, Thresholds, URLs)

**The Mistake:**
```typescript
// ❌ BAD — hardcoded delays/thresholds scattered everywhere
const DEBOUNCE_MS = 300;
const SEARCH_DELAY = 500;
const CACHE_TTL = 5 * 60 * 1000;

// Same value defined in 5 different files!
```

**Why it's wrong:**
- Inconsistent timing across the app
- If you want to tune performance, you update 5 places
- No SSOT

**The Right Way:**
```typescript
// ✅ GOOD — lib/data/mapped-data.ts is the SSOT
export const TIMINGS = {
  debounce: 300,
  searchDelay: 500,
  cacheTtl: 5 * 60 * 1000,
  animationDuration: 200,
};

// In any file:
import { TIMINGS } from '@/lib/data/mapped-data';
const debouncedSearch = debounce(search, TIMINGS.debounce);
```

**In your codebase:** Look for `const DELAY = `, `const TIMEOUT = ` patterns in component/hook files. Move them to lib/data/.

---

## Gotcha 7: Putting API Calls in Components

**The Mistake:**
```typescript
// ❌ BAD — directly in component
export function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(setUsers);
  }, []);

  return users.map(u => <div key={u.id}>{u.name}</div>);
}
```

**Why it's wrong:**
- API calls should be in hooks
- No caching or deduplication
- Breaks separation of concerns

**The Right Way:**
```typescript
// ✅ GOOD — hook handles fetching
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => api.getUsers(),
  });
}

// Component calls hook
export function UserList() {
  const { data: users } = useUsers();
  return users?.map(u => <div key={u.id}>{u.name}</div>);
}
```

**In your codebase:** Look for `fetch()` or `api.` calls in component files. That's wrong.

---

## Gotcha 8: Inline Styling Values Instead of Using Tokens

**The Mistake:**
```typescript
// ❌ BAD — hardcoded Tailwind values
<div className="px-4 py-6 md:px-8 md:py-8 gap-4 delay-300 text-xl">

// ❌ Also bad: inline values
<div style={{ gap: '1rem', padding: '1.5rem', animationDelay: '300ms' }}>
```

**Why it's wrong:**
- No consistency across the app
- If design changes (e.g., all padding becomes 1.5x larger), you update 50 places
- Hard to maintain

**The Right Way:**
```typescript
// ✅ GOOD — use token classes from globals.css
<div className="pad gap-spacious scale-lg animate-delayed">

// Where tokens are defined in globals.css:
:root {
  --spacing-tight: 0.5rem;
  --spacing-pad: 1rem;
  --spacing-spacious: 1.5rem;
  --animation-delay-std: 300ms;
}

.pad { padding: var(--spacing-pad); }
.gap-spacious { gap: var(--spacing-spacious); }
.scale-lg { font-size: 1.125rem; }
.animate-delayed { animation-delay: var(--animation-delay-std); }
```

**In your codebase:** Look for `px-4 py-6 md:px-8 delay-300` patterns. Replace with token classes.

---

## Gotcha 9: Re-Validating Data in Components

**The Mistake:**
```typescript
// ❌ BAD
import { useUsers } from '@/hooks';

export function UserList() {
  const { data: users } = useUsers();

  // Re-validating what was already validated by Zod at the boundary!
  const validUsers = users?.filter(u => {
    if (!u.email.includes('@')) return false;
    if (u.name.length < 2) return false;
    return true;
  });

  return validUsers?.map(u => <div key={u.id}>{u.name}</div>);
}
```

**Why it's wrong:**
- Validation already happened when fetching data (hook calls Zod)
- Component shouldn't doubt the data
- Duplicates validation logic

**The Right Way:**
```typescript
// ✅ GOOD — validation at the boundary (hook), trust in component
import { useUsers } from '@/hooks'; // Returns validated data

export function UserList() {
  const { data: users } = useUsers();
  // users is guaranteed to pass schema validation
  return users?.map(u => <div key={u.id}>{u.name}</div>);
}
```

**In your codebase:** Look for validation `.filter()` or checks in component files. That's wrong.

---

## Gotcha 10: Creating Types Manually Instead of Deriving from Exports

**The Mistake:**
```typescript
// ❌ BAD
import type { User as UserFromAPI } from 'my-api-client';

type AppUser = {
  id: string;
  email: string;
  name: string;
}; // Hand-written, not derived
```

**Why it's wrong:**
- If the API type changes, your app type is now stale
- No connection to the source

**The Right Way:**
```typescript
// ✅ GOOD
import type { User as UserFromAPI } from 'my-api-client';

type AppUser = UserFromAPI; // Use it directly, or derive:
type AppUserPreview = Pick<UserFromAPI, 'id' | 'email'>; // Narrows if needed
```

**OR with Zod:**
```typescript
// ✅ GOOD
const userSchema = z.object({ /* ... */ });
type User = z.infer<typeof userSchema>; // Derived from schema
```

**In your codebase:** Look for hand-written types that could come from an import or z.infer. That's wrong.

---

## Quick Smell Test

Run these checks on any file you see me commit:

1. **Component (.tsx)**: Only JSX + hook calls? ✅
2. **Hook (use-*.ts)**: Only React Query (useQuery/useMutation) + API calls? ✅
3. **lib/ utility**: No React imports, no JSX? ✅
4. **lib/validations/**: Zod schemas with z.infer types (not manual types)? ✅
5. **Types**: Derived (z.infer, Pick, API client export), not hand-written? ✅
6. **Endpoints**: Using API_ROUTES SSOT, not hardcoded strings? ✅
7. **Styling**: Token classes (`.pad`, `.gap-*`), not inline px/py values? ✅

If any of these fail, ask me to fix it.

---

## When to Flag Me

**Show me this file if:**
- I generate a component with `fetch()` or `api.` calls
- I generate a hook with business logic (`.filter()`, `.map()`, transformations)
- I generate an `as Record<>` or `as { ... }` type cast
- I generate a manual type that duplicates a Zod schema or API export
- I generate hardcoded endpoints (`'/api/users'`) instead of using API_ROUTES
- I generate inline Tailwind values (`px-4 py-6 delay-300`) instead of token classes
- I generate `useState` + `useEffect` for data fetching instead of React Query

**Example prompts:**
> "You used `as Record<>`. That violates QUICK-REF.md. Use z.infer<typeof schema> or the API client's type."

> "That component fetches data. Move it to a hook and keep the component UI-only."

> "That hook has .filter() logic. Move it to lib/utils/ and keep the hook data-fetching-only."
