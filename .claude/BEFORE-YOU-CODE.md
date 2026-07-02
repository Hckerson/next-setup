# Before You Code — Anchor Prompt

**Paste this into your request to ensure I follow your architecture.**

---

## Full Anchoring Prompt

```
You are working in a Next.js frontend (next-setup).
This repo is used primarily with Claude and secondarily with Copilot, so keep the rules explicit and portable.
Read and follow EVERY principle in these files:
1. QUICK-REF.md (decision trees)
2. GOTCHAS.md (concrete failures to avoid)
3. instructions.md (primary bootstrap and file roles)

Your task: [YOUR TASK HERE]

CRITICAL RULES:
- Use z.infer<typeof schema> for types, never hand-write duplicates or cast with `as Record<>`
- Component (UI only) → Hook (data fetching) → lib/ (business logic)
- Zod validates at boundary once; never re-validate in components or utils
- API endpoints in API_ROUTES, not hardcoded strings
- Config values (timings, delays) in lib/data/mapped-data.ts
- Styling uses token classes (`.pad`, `.gap-*`), not inline px/py values

Before generating code, verify:
1. Is this the right layer (Component/Hook/lib/)?
2. Am I using a derived type (z.infer, React Query result, API client export) or inventing one?
3. Is validation happening once at the boundary?
4. Are hardcoded values in SSOT files?
5. Am I using token classes, not inline Tailwind?

STOP if you're about to:
- Put `fetch()` or API calls in a component (move to hook)
- Put business logic in a hook (move to lib/)
- Cast with `as Record<>` or `as { ... }`
- Hardcode endpoints or config values
- Inline spacing/timing/delay Tailwind classes
- Re-validate data in a component
```

---

## Minimal Anchoring Prompt (Copy-Paste for Quick Tasks)

```
You are in next-setup. Follow QUICK-REF.md and GOTCHAS.md.
This prompt must work for Claude or Copilot without relying on hidden defaults.
Use instructions.md as the primary bootstrap and BEFORE-YOU-CODE.md as the manual fallback.

Task: [YOUR TASK]

Remember:
- z.infer<typeof schema>, not manual types or `as Record<>`
- Component → Hook → lib/ (no shortcuts)
- Zod validates once at boundary
- API_ROUTES for endpoints, not hardcoded
- Token classes for styling, not px-4 py-6
```

---

## How to Use These Files

### Before Each Request

1. **Copy the minimal anchoring prompt** above and paste it at the start of your request.
2. **Specify what you want to build** (e.g., "Create a user search page with debounce and validation").
3. **I will reference QUICK-REF.md and GOTCHAS.md** while writing code.

### If Something Looks Wrong

**You can flag me mid-generation:**
> "You put business logic in the hook. That violates Gotcha #4. Move it to lib/utils."

I'll correct myself immediately.

### To Verify I'm Following the Rules

**You can ask me to audit before committing:**
> "Before you finish, verify this code against all 10 gotchas in GOTCHAS.md."

I'll run through the checklist.

---

## Example Request (Full)

```
You are in next-setup. Follow QUICK-REF.md and GOTCHAS.md.

Task: Create a user search page with:
- Text input that debounces search queries
- Display results in a table
- Show loading skeleton while fetching
- Handle errors gracefully
- Filter results by role (admin/user)

Remember:
- Business logic (filter, sort) goes in lib/utils/
- Hook only fetches, doesn't filter
- Component renders, doesn't fetch or transform
- Use API_ROUTES for endpoint
- Use timings from lib/data/mapped-data.ts for debounce
- Validate response with Zod schema, infer type from it

Before finishing, verify:
1. No fetch() calls in component?
2. No filter/map logic in hook?
3. Using z.infer<> for types?
4. Using API_ROUTES for endpoints?
```

---

## Example Request (Minimal)

```
You are in next-setup. Follow QUICK-REF.md and GOTCHAS.md.

Create a user list page with search, pagination, and role filtering. 
Keep layers clean: component renders, hook fetches, lib/ handles logic.
```

---

## Signs I Need More Anchoring

If I:
- Generate `fetch()` or API calls in a component or lib file
- Put `.filter()`, `.map()`, or transformations in a hook
- Hand-write types instead of deriving from Zod or React Query
- Hardcode endpoints or config delays
- Use inline Tailwind values instead of token classes
- Re-validate data in components

**You should ask:** 
> "What does GOTCHA #{number} say? Apply it."

Or copy-paste the relevant section from GOTCHAS.md to remind me.

---

## Making This Automatic

If you want me to **always** check these files at the start of a request, add this to your workspace settings or as a comment in your `.claude` folder:

```
Every request in next-setup must:
1. Read QUICK-REF.md (decision trees)
2. Read GOTCHAS.md (concrete failures)
3. Apply all 10 gotchas as a pre-flight check
4. Return to user if any rule is violated
```

For now, **copy the minimal anchoring prompt** before each task.

---

## TL;DR

- **QUICK-REF.md** = How to think (decision trees).
- **GOTCHAS.md** = Concrete pitfalls to avoid (10 real examples).
- **Paste the minimal anchoring prompt** before each task.
- **Flag me mid-generation** if I slip.
- **Ask me to verify** before you commit.

This ensures I stay locked to your architecture.
