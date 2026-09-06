# Project Instructions

This is a reusable **Next.js App Router starter**. It ships architecture, conventions, and one example per layer as a foundation for new projects.

## Non-negotiable rules

1. **No comments in code.** Ever. Code reads clearly on its own — when it doesn't, the abstraction is wrong. Fix the abstraction.
2. **No hardcoding.** API routes, durations, enums, and copy that appears twice live in `lib/constants.ts` or feature-scoped `lib/<feature>/constants.ts`. Endpoints come from `lib/api-routes.ts`, shapes from Zod schemas. Seed and sample data lives in `lib/data/`, never inline in a page.
3. **No `any` in TypeScript.** Use `unknown` + narrowing or a precise type. Derive types from Zod with `z.infer`.
4. **Match the existing architecture.** Do not invent patterns, and do not invent locations — when you are unsure where something goes, re-read this file. State the reason before deviating.
5. **Use the framework natively.** Next.js and the installed libraries (Query / Zustand / Zod / motion / CSS `clamp()`) cover the need. Do not add a dependency that duplicates one, and do not rebuild what the tool already does.
6. **Single source of truth.** Name a recurring decision once as a semantic token and reference it everywhere. Define once, change in one place.
7. **Minimize LOC.** Ship the shortest solution that stays maintainable.
8. **No `console.log`, `console.error`, or debug statements** in committed code. Logging belongs in services.

## Required patterns

| Need               | Use                                                                                                                                                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Styling            | Token-first: named scale classes in `styles/globals.css` (`.pad`, `.pad-x`, `.pad-y`, `.gap`, `.gap-x`, `.gap-y`, `.smooth`) over tokens in `styles/tokens.css`. Inline responsive utility chains are forbidden. Colors and animations are theme tokens. |
| Component patterns | Reuse `components/ui/` (primitives) and `components/common/` (shared compositions) before writing JSX. A pattern used twice is promoted out of the page that birthed it.                                                                                 |
| Domain types       | Every shared domain type lives in `lib/types/<domain>.ts` and is re-exported by `lib/types/index.ts`. Components import types; they never declare shared ones.                                                                                           |
| Page composition   | A route `page.tsx` composes sections and holds page-level state — nothing else. Mock/seed data goes to `lib/data/`, JSX blocks to `components/`. No inline data array, no inline sub-component.                                                          |
| State management   | TanStack Query for server state. `useState` / `useReducer` / URL params for local state. `useSyncExternalStore` + `localStorage` for persistence. A global store requires a stated reason.                                                               |
| Validation         | Zod schemas in `lib/validations/`. Types derive with `z.infer`. API responses are never loosely typed.                                                                                                                                                   |
| IDs                | `nanoid`. Never `uuid` or `Date.now()`.                                                                                                                                                                                                                  |
| Async flows        | Endpoints in `lib/api-routes.ts`, transport in `lib/api-client.ts`, wrapped in hooks in `lib/hooks/use-<resource>.ts`. Components consume hooks — never call the client directly.                                                                        |

## Folder Structure

| Route                   | Immediate Subfolders                                                                      | Purpose                                                                                                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/app`                  | `api/session` • `auth/login`                                                              | App Router routes. Pages compose — they do not define data or components. Nesting here is the URL, not a choice: a route handler or page must sit at the path it serves. |
| `/components/ui`        | `forms`                                                                                   | Generic, domain-free primitives. Reusable in any app.                                                                                                                    |
| `/components/common`    | _(flat)_                                                                                  | Shared compositions over primitives.                                                                                                                                     |
| `/components/wrappers`  | _(flat)_                                                                                  | Behavioural wrappers (motion, boundaries).                                                                                                                               |
| `/components/providers` | _(flat)_                                                                                  | React context providers.                                                                                                                                                 |
| `/lib`                  | `contract` • `data` • `enums` • `hooks` • `interface` • `types` • `utils` • `validations` | Core logic layer. No JSX. Transport lives in `api-client.ts` + `api-routes.ts`.                                                                                          |
| `/design-os`            | _(flat)_                                                                                  | Design-system seed prompt. Not application code.                                                                                                                         |
| `/public`               | `fonts`                                                                                   | Static assets.                                                                                                                                                           |
| `/styles`               | _(flat)_                                                                                  | Global styles and token exports.                                                                                                                                         |
| `/tools/eslint`         | `rules`                                                                                   | Custom ESLint rules that enforce the conventions in this file. Not app code.                                                                                             |
| `/tools/codemods`       | _(flat)_                                                                                  | ts-morph codemods that rewrite violations the rules report. Not app code.                                                                                                |
| `/tools/contract`       | _(flat)_                                                                                  | Generator that turns the backend's OpenAPI document into `lib/contract/`.                                                                                                |

Add `lib/data/` (seed data) and `lib/constants.ts` on first use — the rules above assume those homes.

Conventions in this file that can be checked mechanically belong in `tools/eslint/rules/` as a rule with a colocated `.test.ts`, registered by the `starter` plugin in `eslint.config.ts`. Where flat config already expresses the constraint (`no-restricted-imports` and friends), use config — a custom rule must earn itself by needing scope or path analysis config cannot reach.

A rule that reports a violation ESLint cannot autofix — because the fix spans files — gets a matching codemod in `tools/codemods/`, also with a colocated `.test.ts` driven by an in-memory ts-morph project. Codemods are dry-run by default and only write under `--write`. When a transform would have to guess intent, it skips the call and reports the reason instead.

## The contract layer

`lib/contract/` is **generated — never edit it**. The backend's class-validator DTOs are the origin; `pnpm openapi` in `nest-setup` emits `openapi.json`, and `pnpm contract` here turns that into Zod schemas, `z.infer` types, and typed route builders. Change a field on a DTO, regenerate, and `pnpm type-check` fails here at every consumer — that break is the point of the layer.

Import request shapes and endpoints from `@/lib/contract`, not by hand. `lib/api-routes.ts` remains for endpoints the backend does not publish. Hand-written Zod in `lib/validations/` composes over the generated schemas (`.extend`, `.pick`) rather than restating them.

## Sessions

The backend signs RS256 and holds `JWT_PRIVATE_KEY`. This tier gets `JWT_PUBLIC_KEY` only, so it can verify a session but never mint one — copy the public half from `pnpm keys:generate` in `nest-setup` into `.env`.

`proxy.ts` reads the `SESSION_COOKIE`, verifies the signature with `lib/utils/verify-session-token.ts`, and gates `PROTECTED_ROUTE_PREFIXES`; a rejected cookie is cleared on the way to `LOGIN_ROUTE`. Server components read the same session through `getSession()` in `lib/utils/session.ts`. Both names live in `lib/constants.ts` — never restate a route or the cookie name.

The file is `proxy.ts`, not `middleware.ts` — Next 16 renamed the convention and warns on the old name. It exports `proxy`; Next accepts that named export or a default, nothing else.

An unverified token is not a session. Nothing may trust a claim that has not been through `verifySessionToken`, decoding the payload included.

`app/api/session/route.ts` is the only place the token is handled: `POST` forwards credentials to the backend and puts the returned token straight into an `httpOnly` cookie, so it never reaches client JavaScript; `DELETE` clears it. The browser therefore has no token to attach — **do not add an `Authorization` header on the client, and never store a token in `localStorage` or a readable cookie.** Components reach these through `useLogin` / `useLogout`, which post same-origin via `local` in `lib/api-client.ts` — `query` targets the backend and swallows errors, so it cannot carry a sign-in.

A redirect target taken from the URL passes through `internalPath()` first. `?next=` is attacker-controllable, and an absolute or protocol-relative value would walk the user off the site.

**Authenticated backend calls go through the server, never the browser.** The cookie belongs to this origin, so it is never sent to the backend on another port — the browser cannot authenticate a direct call, and lowering `SameSite` to let it is not the fix. Server components and route handlers call `backendFetch()` in `lib/api-server.ts`, which attaches the token as a Bearer header. `lib/api-client.ts` stays for unauthenticated, browser-initiated calls only; it imports `next/headers` nowhere, which is why the two files are separate.

## File rules

- **One component per file.** Kebab-case filename matching the export (`motion-wrapper.tsx` → `MotionWrapper`).
- **Absolute imports via `@/`.** Never deep-relative (`../../../lib/...`).
- **Any file over ~150 lines gets split**, `page.tsx` included. Data moves to `lib/data/`, JSX to `components/`.
- **Add packages with `pnpm add`.** Never hand-edit `package.json`.

## Before you commit or push

Formatting and linting are automated. They are not chores you run by hand.

- **Commit** — Husky's `pre-commit` hook runs `pnpm lint-staged` and nothing else: `eslint --fix` then `prettier --write`, over staged files only. It is fast by design.
- **Push** — Husky's `pre-push` hook runs `pnpm type-check`, then `pnpm lint`, and blocks on failure. This is the real gate.
- **Tests** — `pnpm test` is on you. A failing test is never left for later.

`pnpm format` and `pnpm lint` stay available for a manual full-repo sweep, but no workflow requires you to run them.

The rules above are not restated here. They bind every edit, not the gate.
