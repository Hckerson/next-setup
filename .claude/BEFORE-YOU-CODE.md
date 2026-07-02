# Before You Code — Anchor Prompts

Paste one of these at the start of your request to ensure architecture compliance.

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

## Minimal Anchoring Prompt

```
You are in next-setup. Follow QUICK-REF.md and GOTCHAS.md.

Task: [YOUR TASK]

Remember:
- z.infer<typeof schema>, not manual types or `as Record<>`
- Component → Hook → lib/ (no shortcuts)
- Zod validates once at boundary
- API_ROUTES for endpoints, not hardcoded
- Token classes for styling, not px-4 py-6
```

---

## TL;DR

Use README.md to navigate which file to read when. Flag me if I violate any 10 gotchas in GOTCHAS.md. Ask me to verify code against QUICK-REF.md before committing.
