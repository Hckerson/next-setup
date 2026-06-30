# Next-Setup Architecture Checklist

**Quick reference for the 5 core rules.** See CLAUDE.md for full details.

---

## 1. Folder Placement (Non-Negotiable)

| What | Where | Why |
|------|-------|-----|
| API endpoints | `lib/api-routes.ts` → `config.api.*` | Single source, never hardcode URLs |
| Validation schemas | `lib/validations/[domain].ts` | Zod = validator + type source |
| Types/interfaces | `lib/interface/[domain].ts` | One type definition per domain |
| Constants/enums | `lib/enums/` or `lib/data/` | No magic strings |
| Utils (pure functions) | `lib/utils/[name].ts` | One function per file |
| Data fetching hooks | `hooks/use-[domain].ts` | React Query only, one per domain |
| Components | `components/[type]/` | UI only, never business logic |
| Styling tokens | `styles/globals.css` → CSS variables + `.scale` classes | Use `.pad`, `.gap`, never inline |

## 2. Import Rules (Enforce Boundaries)

✅ **Allowed:**
```
components/  → hooks/ → lib/ → lib/
             → styles/
```

❌ **Forbidden:**
```
lib/ ← hooks/ ← components/  (CIRCULAR)
components/ calls Prisma directly
hooks/ contains JSX or form state
lib/ imports React
```

## 3. Single Source of Truth

| Decision | Where | How to Use |
|----------|-------|-----------|
| Endpoints | `config.api.domain.action` | `fetch(config.api.users.create)` |
| Validation | `loginSchema from @/lib/validations/auth` | `import { loginSchema }` + infer types |
| Types | `User from @/lib/interface` | `import type { User }` |
| Timings | `fast, slow from @/lib/data/mapped-data` | `duration={slow}` in MotionWrapper |
| Colors | CSS variables in `globals.css` or `bgMap` | `className="bg-blue"` via tokens |
| Spacing | `.pad`, `.gap` classes in `globals.css` | NEVER `px-4 py-6 gap-4` inline |

**Red line:** If defined twice, one gets out of sync.

## 4. Component Template

```typescript
// Form: manual state + Zod validation
const { mutate, isPending } = useFormAction();
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});

const handleSubmit = (e) => {
  e.preventDefault();
  const result = schema.safeParse(formData);
  if (!result.success) { setErrors(...); return; }
  mutate(result.data);
};

// Data display: hook + loading states
const { data, isLoading, error } = useFetchData();
if (isLoading) return <Skeleton />;
if (error) return <Error />;
if (!data?.length) return <Empty />;
return <div>{data.map(...)}</div>;
```

## 5. Styling (Token-First)

❌ **Never:**
```typescript
<div className="px-4 py-6 md:px-6 lg:px-8 gap-4 md:gap-6 text-lg">
```

✅ **Do:**
```typescript
<div className="pad gap-y-4 xlarge-text">
```

**Token checklist:**
- Padding → `.pad`, `.pad-x`, `.pad-y`
- Gap → `.gap`, `.gap-x`, `.gap-y`
- Font size → `.xxlarge-text`, `.xlarge-text`, ..., `.xs-text`
- Color → CSS variables from `globals.css`
- Animation → `.smooth` (pre-configured duration + easing)
- Inline Tailwind OK only for: layout (`flex`, `grid`), responsive breakpoints (`md:`, `lg:`)

---

## Code Review Questions

When reviewing changes, ask:

1. Is an endpoint hardcoded? → Move to `config.api`
2. Is validation outside Zod? → Move to `lib/validations/`
3. Is business logic in a component? → Move to lib/ or utils/
4. Is a hook doing UI logic? → Move to component
5. Is spacing inline? → Use `.pad`, `.gap`
6. Is animation timing hardcoded? → Add to `mapped-data.ts`
7. Is a color value not in globals.css? → Add as CSS variable
8. Is something defined twice? → Consolidate to single source

---

## Workflow: Adding a Feature

1. Write Zod schema → `lib/validations/[domain].ts`
2. Add endpoint → `config.api` in `lib/api-routes.ts`
3. Create hook → `hooks/use-[domain].ts` with React Query
4. Build component → `components/ui/[type]/[name].tsx`
5. Connect them → Inject hook, handle loading/error/data
6. Style with tokens → Use `.pad`, `.gap`, CSS variables

**See CLAUDE.md for full patterns and examples.**
