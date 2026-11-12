---
name: cinematic-web
description: >-
    The cinematic register: award-level, motion-led marketing pages where one
    hero object or world carries the brand and scroll plays the page like a
    film. Use for any landing page, marketing site, product launch page, hero
    section, "make it look like an Awwwards site", "not a template", "premium
    website", or when the user shares reference frames / URLs of a motion-heavy
    site. Tokens, primitives and file structure stay with .claude/CLAUDE.md.
    Not for dashboards, forms or app screens.
---

# Cinematic Web

A basic site is what happens when code starts before a concept exists. This skill forces the concept, the scene score and the technique to exist first, builds against them, then checks the result against them.

Read `.claude/CLAUDE.md` alongside this. It owns vocabulary and structure; this skill owns the visual register. `techniques.md` owns the stack and the mechanics.

## The standard

What every build must have:

1. **One hero object or world that is a metaphor for the product.** Someone who reads no copy still gets the idea. Never a generic gradient blob, a globe, floating UI cards, or particles with no structure.
2. **Scroll is the timeline.** The page is a sequence of scenes; the hero changes state between them (disperses, converges, turns, splits, opens).
3. **Choreography.** The hero's state and the copy sit on one master timeline per scroll track, cued at the same scene labels. Never independent fade-ins.
4. **Restraint.** Near-black or near-white ground, one accent at most, colour lives in the hero and in light, not in UI paint. A large light display face, tiny mono or uppercase labels, generous negative space.
5. **The signature recurs.** The hero device (a shape, a light, a motion) returns as a motif down the page, as image frames, dividers or transitions, so every section belongs to the same site. A hero that is never echoed makes the rest of the page read as a template.
6. **No repeated section header.** Vary header composition (split title and lead, header beside media, centred quote); the same eyebrow, title and empty right half nine times is the template tell. Feature one item in every grid instead of equal columns.
7. **Tactility.** Pointer response is damped in the frame loop, never 1:1. Nothing snaps, nothing bounces.

## Workflow

Run these in order. Steps 1–4 produce a written concept and **end the turn** for approval unless the user said "just build it".

### 1. Brief

Ask once, in one message, only what is missing: product and what it does, audience and what they must believe after five seconds, mood (three adjectives), references (URLs, frames, or names in `references/`), real copy or placeholder, existing assets. Never invent real-looking customer numbers, logos or testimonials; placeholder copy is marked as placeholder.

When the user gives no product, the concept starts from a sector on `docs/economy-coverage-map.md`, with a realistic client in it. Every build is client and portfolio work; a product invented to exercise the stack is the failure this rule exists for.

### 2. Metaphor

Three candidate hero objects. For each: the object, the product truth it expresses, why it beats the obvious choice. Recommend one in two sentences. The hero must be legible and striking in its first frame: no fade from nothing, no dark subject on a dark ground. Real data (a real city, real geography) beats invented structure.

### 3. Journey and score

- **Beats:** four to seven, e.g. recognition → tension → turn → substance → proof → commitment. State what the visitor believes after each.
- **Feeling curve:** one emotion per scene; neighbours differ; the peak gets the most scroll length and the one before it is quieter.
- **Scene table:** `timeline label | length | hero state | camera | copy on screen | device | pointer`. Devices come from `techniques.md` › Devices; use at least four families, never the same device twice in a row, at most two scrubs.
- **Anchor variety:** copy alternates lead / trail / split; never centred in every scene.

### 4. Technique and art direction

- Pick the **hero route** from `techniques.md` (procedural field, scrubbed media, or real-time 3D) on what the metaphor needs, and say why the other two lose for this metaphor.
- Name the single hardest visual problem and the plan for it.
- Palette as tokens (ground, ink, muted ink, accent, glow), type pair with `clamp()` sizes, motion curves and durations as tokens. These become entries in `styles/tokens.css` and `lib/<feature>/constants.ts`, never inline values.
- **Every library setting that decides the look is a token too:** eases, Lenis smoothing, tone mapping and exposure, bloom strength, radius and threshold, grain, DPR range, the display face's extent (`--fonts-display-extent`). A library default left in place is a look chosen by nobody.
- ASCII wireframes of the hero and the peak scene at desktop and 390px.
- **Fingerprint gate:** compare against `references/fingerprints.md`. The build must differ from every prior row on at least 4 of: page shape, nav treatment, hero route, scene sequence, close, signature move. Report the comparison.
- The stack in `techniques.md` is installed. Name everything else the concept needs in the concept itself: footage, models, datasets, a generation service, a package outside the stack, and what each costs. Approving the concept approves them. Never shrink the concept to avoid asking.

### 5. Build

**Hero gate first.** Build the hero alone (scene one only), then show the user a first-frame still and a short capture from a real browser and **end the turn**. Build the remaining scenes only after the hero passes. A weak hero costs one step, not a whole build.

Follow `techniques.md` for the stack and mechanics and `.claude/CLAUDE.md` for structure. `StageScrollProvider` goes in the cinematic route group's layout; the stage is a `StageCanvas`; one master timeline per track drives the hero's uniforms and the copy. `prefers-reduced-motion` gets a composed still of the peak scene; no WebGPU falls back to WebGL2 on its own, and no WebGL2 or a failed media load gets a poster image.

### 6. Verify

Follow `verify.md`. A build that has not been checked against the scene table is not done; say so explicitly if verification could not run.

Append the build to `references/fingerprints.md`.

## Requirements

Not taste: a build that breaks one of these is broken.

- All copy is real DOM text in reading order; the stage is `aria-hidden`. No text baked into images, video or the canvas.
- In the DOM, animate only `transform`, `opacity` and `clip-path`.
- One scroll owner per stage: GSAP. Motion's `useScroll` never drives a stage.
- No ScrollTrigger markers, `stats-gl` panel or debug UI in a shipped build.
- Scrub media ships with its audio track removed.
- No em dashes in visible copy.

## Tells

Each of these is what a generator reaches for by default. Avoiding one is not enough: replace it with the column on the right, or the build slides to the next default.

| ID     | Tell                                                                                                                   | Why it reads as a template                                          | Instead                                                                                               |
| ------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| CIN-1  | Centred headline over a gradient blob                                                                                  | The default hero of every generator and starter                     | The hero object from step 2, with copy anchored lead, trail or split                                  |
| CIN-2  | Three feature cards with icons; a logo cloud as the second section                                                     | Template section order, not a score                                 | One featured item per grid; proof placed where the feeling curve needs it                             |
| CIN-3  | Purple-to-blue gradient grounds; gradient text                                                                         | The 2020–2024 SaaS signature                                        | A near-black or near-white ground; colour lives in the hero and in light                              |
| CIN-4  | Glassmorphism cards; glow on UI chrome                                                                                 | Light painted onto the interface instead of emitted by the scene    | Light comes from the hero through the light chain; chrome stays flat                                  |
| CIN-5  | Everything fades in on load; the same fade-up on every section                                                         | Motion with no cue, so nothing reads as caused                      | Copy cued to the hero at its timeline labels; devices vary as the scene table says                    |
| CIN-6  | Bouncy or elastic easing                                                                                               | Reads as a toy, not a film                                          | Eases per segment from tokens: out on entry, linear hold, in on exit                                  |
| CIN-7  | A 3D object spinning in place, unrelated to scroll                                                                     | A screensaver, not a story                                          | The hero moves between named scene states on the timeline                                             |
| CIN-8  | Scroll arrows, animated mice, section counters (`01 / 06`)                                                             | A crutch for a first scene that does not invite scrolling           | The first scene plays on load and its motion leads the eye down                                       |
| CIN-9  | Library defaults left in place: GSAP's `power1.out`, Lenis's smoothing, R3F's ACES tone mapping, bloom at its defaults | Every other site using the library looks the same                   | Each value set from the build's tokens (step 4)                                                       |
| CIN-10 | The same section header composition repeated                                                                           | The template's rhythm shows through                                 | Vary the composition per section (standard 6)                                                         |
| CIN-11 | A full-page preloader with a percentage counter                                                                        | Makes every visitor wait for the heaviest asset, and delays the LCP | Copy shows at hydration; the hero opens on a state that needs no assets, and they stream in behind it |

## Browser

Capture and verify run in the user's Chrome through the `chrome-browser` skill and the Claude in Chrome extension. Before either starts, check both and install whatever is missing first:

- **`chrome-browser` is not in the skill list:** it is Anthropic's skill and only arrives through claude.ai sync. Ask the user to turn it on in their claude.ai skills settings and restart Claude Code; it lands in `~/.claude/skills/synced/`.
- **No `mcp__claude-in-chrome__*` tools:** ask the user to run `/chrome`, or restart with `claude --chrome`, and take the **Install extension** prompt. The extension must be signed in to the same claude.ai account as Claude Code.

## Adding references

When the user shares a site they like, follow `capture.md` and write a new file in `references/` from `references/_template.md`. The library is how this skill learns the user's taste.
