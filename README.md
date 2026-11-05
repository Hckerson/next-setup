# Next.js App Router Starter

A domain-neutral, reusable Next.js (App Router) starter. Clone it, fill in the design tokens, and build.

## Getting Started

```bash
pnpm install
pnpm dev
```

The starter ships no pages. Add `app/layout.tsx` and `app/page.tsx` to start the UI; the API routes live under `app/api/`.

Scripts: `pnpm dev` · `pnpm build` · `pnpm start` · `pnpm type-check` · `pnpm lint` · `pnpm format`.

## Architecture

The binding conventions live in `.claude/CLAUDE.md` (no hardcoding, single source of truth, no code comments in TS/TSX). Read it before adding anything.

## Design tokens

`styles/tokens.css` lists every design token with an empty value. Fill the values in; `styles/globals.css` maps them to Tailwind theme names (`text-text`, `bg-background`, `font-display`, `text-h*`, `ease-smooth`).

Until they are filled, some of Tailwind's own utilities resolve to nothing, because the theme points them at those empty tokens: `text-xs` to `text-lg`, `shadow-sm` to `shadow-2xl`, `rounded-xs` to `rounded-xl`, `ease-in`, `ease-out`, `ease-in-out` and `font-mono`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
