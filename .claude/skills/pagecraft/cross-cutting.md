# Cross-cutting concerns

The 14 layers cover structure. These concerns cut across every layer and have no folder. Judgement `(J)` unless marked; the evidence for them is thin. Load this file for any build and any audit.

## Responsive

- Dropping a column at narrow widths never drops an action: it moves to an overflow menu or the detail view.
- Design at 390px and at 1440px as two compositions, not one layout squeezed. Dense app rows drop columns by priority and keep the primary line; marketing bands re-stack with their scale tension intact.
- A tap target is at least 44px on touch. Hover-only affordances need a visible touch fallback. `(S)` Apple 44, 48; `(J)` fallback.
- Fourth-generation tell: a hamburger at every width, a desktop table shrunk to horizontal scroll, a hero that is only a smaller copy of desktop.

## Imagery and illustration

- Imagery is owned by the product: the real UI, the real object, a deliberate type treatment. Generic stock, a handshake or a laptop on a desk, is a third-generation tell. A blurred gradient blob or abstract 3D shape that stands for "AI" is a fourth.
- Illustration is small and purposeful (an empty state), single-weight, from the token palette. `(S)` Linear empty states.
- Product screenshots are cropped and framed in the register's depth recipe (a hairline, a fill, a rule), not floated with a glow.

## Iconography

- One family, one stroke weight, drawn on one grid, coloured by `currentColor`, sized from a scale (16, 20, 24). `(S)` Linear scaled icons down in its refresh.
- An icon in every button and every nav item is the fourth-generation habit; an icon earns its place by speeding recognition.
- Mixed families or weights, or an icon font, is a third-generation tell.

## Copy

Copy has generations too. A button label or headline that could sit on any product is the tell.

| Generation | Tell                                                                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| First      | "Click here", "Welcome to", "Under construction"                                                                                                |
| Second     | "Sign up now!", "Submit", exclamation marks as emphasis                                                                                         |
| Third      | "Learn more", "Read more", "Our services"                                                                                                       |
| Fourth     | "Get started", "Unlock", "seamless", "supercharge", "Welcome back!", three-word taglines in a parallel list                                     |
| Fifth      | A specific verb and noun ("Create invoice"), a number or named outcome, sentence case in app UI, Title Case for empty-state titles `(S)` Vercel |

- Casing is a project decision recorded in the brief (sentence case or Title Case for titles); apply it everywhere, including confirm titles.
- Error and empty copy says what happened, what it means, and the one next step. `(S)` Vercel.
- Em dashes are avoided in visible copy. Placeholder copy is marked as placeholder; never invent real-looking customer numbers, logos or testimonials.

## Accessibility baseline

Every layer meets this before it is graded for generation. Contrast 4.5:1 for body and 3:1 for large text, icons and focus rings; visible `:focus-visible` on every interactive element; real DOM text; accessible names on icon-only controls; colour never the sole signal; `prefers-reduced-motion` honoured. `(S)` Apple, Vercel, Stripe publish these as tokens.

## Performance

The fifth generation must not cost the user. Animate `transform`, `opacity` and colour, not layout properties. A blurred backdrop over scrolling content is paid on every frame; use it only where it is functional. Fonts are subset and preloaded; the largest above-the-fold element does not wait for scroll or script. `(J)`

## Light and dark

Both themes are designed, not inverted; each has its own surface ladder and elevation recipe (see `layers/01-token.md`). A product that ships one theme says so and designs that one fully.
