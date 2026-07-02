# Next.js Quick Reference — Decision Trees

**Use this before writing code.** Answer each question in order.

---

## The One Rule: Derive, Never Reconstruct

**Every single decision flows from this:** If a tool emits a type/shape/schema, use it directly. Never rebuild it manually.

### Decision Tree: "Should I create a new type?"

```
┌─ Does a framework/library already generate this type/shape?
│  └─ YES → Use it directly (z.infer<>, React Query result, API client type)
│  └─ NO  → Create it once in a designated file (lib/types/, lib/validations/)
│
└─ Do I need a narrower shape (subset/projection)?
   └─ YES → Derive it with Pick/Omit/Extract, not new hand-written type
   └─ NO  → Use the full derived type
```

---

## Layer Checklist: Before You Write Each File

### Component (UI Only)
- ❌ Does this call an API or fetch data? *No. Use a hook.*
- ❌ Does this contain business logic? *No. Use lib/ utilities.*
- ✅ Does this accept data via props? *Yes.*
- ✅ Does this handle loading/error/data states? *Yes.*
- ✅ Does this return JSX? *Yes.*

### Hook (Data Fetching Only)
- ❌ Does this return JSX? *No.*
- ❌ Does this contain business logic? *No. Use lib/ utilities.*
- ✅ Does this use React Query? *Yes.*
- ✅ Does this call the API client? *Yes.*
- ✅ Does this return `{ data, error, isLoading }`? *Yes.*

### lib/ (Business Logic Only)
- ❌ Does this import React or JSX? *No.*
- ❌ Does this fetch data or call APIs? *No. Use hooks.*
- ✅ Does this export pure functions? *Yes.*
- ✅ Does this handle transformations, formatting, validation? *Yes.*
- ✅ Does this import from Zod or other validation tools? *Yes.*

---

## Type Derivation Checklist

Before you cast or hand-write anything:

| Artifact | Source | ✅ Use This | ❌ Never This |
|----------|--------|-----------|-------------|
| Zod validation | `schema.parse(data)` | `z.infer<typeof schema>` | Copy the type by hand |
| React Query result | `useQuery()` hook | The hook's auto-typed return | `as any`, `as Record<>`, `{ data?: T }` |
| API response | Axios/fetch response | Schema validation result or client type export | Hand-written response type |
| Config/enum values | `api-routes.ts`, `enums/`, `mapped-data.ts` | Import and reference the SSOT | Hardcode or duplicate the value |
| Design tokens | CSS variables + scale classes | `.pad`, `.gap-*`, `.scale-*` | Inline `px-4 py-6`, `delay-300` |

---

## Common Pitfalls (Catch Yourself)

### ❌ Pitfall 1: "I'll just cast this API response"
```typescript
// WRONG
const response = await api.getUser(id);
const user = response as Record<string, any>;
```

**Why:** Loses type safety. You already have the schema or client type.

**Right:** Use `z.infer<typeof userSchema>` or the API client's response type.

---

### ❌ Pitfall 2: "I'll create a response type manually"
```typescript
// WRONG
type User = { id: string; email: string; name: string };

// But your server's response schema already defines this!
```

**Why:** Duplicates the source of truth.

**Right:** Validate with Zod and derive the type: `type User = z.infer<typeof userSchema>`.

---

### ❌ Pitfall 3: "I'll re-validate in the component"
```typescript
// WRONG (in component)
const user = data;
if (!user.email.includes('@')) {
  // Re-validation!
}
```

**Why:** Validation already happened at the boundary (hook/lib).

**Right:** Trust the validated data. Component renders it.

---

### ❌ Pitfall 4: "I'll extract a subset manually"
```typescript
// WRONG
type UserPreview = { id: string; name: string };

// RIGHT
type UserPreview = Pick<z.infer<typeof userSchema>, 'id' | 'name'>;
```

---

### ❌ Pitfall 5: "I'll put business logic in the hook"
```typescript
// WRONG (in hook)
const [users, setUsers] = useState([]);
useEffect(() => {
  fetchUsers()
    .then(data => {
      // Business logic: filter admins
      setUsers(data.filter(u => u.role === 'admin'));
    });
}, []);

// RIGHT: Move the filter to lib/utils, use hook for fetching only
```

---

### ❌ Pitfall 6: "I'll hardcode the API endpoint"
```typescript
// WRONG (in component or hook)
const response = await fetch('/api/users/all');

// RIGHT
import { API_ROUTES } from '@/lib/api-routes';
const response = await fetch(API_ROUTES.users.all);
```

---

### ❌ Pitfall 7: "I'll inline spacing/timing values"
```typescript
// WRONG (in component)
<div className="px-4 py-6 md:px-8 delay-300">

// RIGHT
<div className="pad gap-spacious scale-lg">
// Or use CSS variables
```

---

## Before You Start Coding: Verify This

1. **Is the file in the right layer?** (Component ≠ Hook ≠ lib/. No crossing boundaries.)
2. **Am I using a derived type, or did I invent one?** (z.infer, React Query result type, Pick/Omit—never manual `Record<>` or `as`.)
3. **Is validation happening once at the boundary?** (Not re-validated in components or utilities.)
4. **Are hardcoded values in SSOT files?** (api-routes.ts, enums/, mapped-data.ts.)
5. **Am I using token classes for styling?** (Not inline px/py values.)

---

## When You Encounter a New Tool

Ask: **"Does this tool generate types/shapes/validation?"**
- ✅ YES → Use its output directly.
- ❌ NO → Proceed as normal.

**Examples:**
- Zod → infer (use it)
- React Query → hook result type (use it)
- Axios → response type export (use it)
- date-fns → utility functions (use as-is)
- Custom date formatter? → No generated type (pass data through)
- Third-party component library? → Check its type exports (use them)

---

**TL;DR:** If a tool made it, use it. If you made it, it should live once in a designated place (lib/, enums/, validations/). Never rebuild framework outputs.
