---
name: stagecraft
description: >-
    Makes the stage of a cinematic, scroll-driven landing page and every asset
    it uses: the concept and script, the actors and their form, materials,
    light, set, camera, motion, simulation, render, posters and fallbacks, for
    any client in any sector. Runs like a production studio: styleframes before
    motion, a blind critic before the owner sees anything, graded on its own
    generation ladder. Use for "landing page", "product launch", "make it
    animate", "make it cinematic", "premium", "Awwwards", or any idea for a
    motion-led page; an idea from the user is a seed, never the spec. Tokens,
    type, primitives, chrome and copy layout belong to pagecraft.
---

# Stagecraft

A stage is judged as a film is judged: frame by frame, by people who have seen great ones. This skill makes a stage that holds up to that, and makes every asset it needs to get there.

## What it owns, and what it does not

| stagecraft makes                                                                 | pagecraft makes                                   |
| -------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Concept, story, script                                                           | Tokens, type, spacing, colour roles                     |
| Actors: form, materials, textures                                                | Primitives, patterns, chrome, nav                       |
| Light, set, camera, motion, simulation                                           | The layout and typography of the copy                   |
| Render, grade, posters, video fallbacks, the reduced-motion still                | Everything that is not the stage                        |

The handoff is two things: the stage gives pagecraft its per-shot tones (ground and ink) and its copy slots (where each line may sit in each shot). Nothing else is shared.

## The bar

`generations.md` is the ladder, from Pre-first to Fifth, with nine layers in `layers/`. The fifth is five properties: every frame could hang on a wall; the world has physics and it scrubs; light is a character; the visitor is inside it; one film on every device. Each concept also earns one signature move, struck from the next draw so it never becomes a template.

Pre-first work (grey blocks, unlit placeholders) is never shown to the owner or a client. It may exist on the maker's machine as a layout check, nowhere else.

## The studio

Each department owns layers. One session can play every role; the critic is always a separate agent.

| Department        | Layers                  | Makes                                                                    |
| ----------------- | ----------------------- | ------------------------------------------------------------------------ |
| Art direction     | concept, 4 set, 8       | Truth sheet, concept cards, world rules, styleframe compositions         |
| Modelling         | 1 form                  | Models from client files, Blender scripts, scans, CC0 libraries          |
| Look development  | 2 material, 3 light, 7  | Materials, light rigs, baked lighting, the grade                         |
| Simulation        | 6 motion                | Physics baked to vertex-animation textures for scrubbed playback         |
| Animation         | 5 camera, 6 motion      | The script: verbs with mass, the camera, timing                          |
| Delivery          | 9                       | Posters, video fallbacks, budgets, the reduced-motion still              |
| Critic            | all, blind              | Grades every frame set before the owner sees it (`critic.md`)            |

## Workflow

Steps 0 to 2 end the turn for approval unless the owner said "just build it". Step 5 ends the turn again.

0. **Intake.** Ask once, only what is missing: what the client sells and to whom, the belief after five seconds, the action, mood (never "modern", "clean", "sleek" or "premium": those are what the work must earn, not a brief), and **what assets exist**. With no client, take a sector from `docs/economy-coverage-map.md` and invent a realistic one; placeholder copy is marked.
1. **Truth sheet.** Five lines: what it is, what it replaces, the moment of use, the moment of action, the feeling. Every choice traces to one.
2. **Concept.** `tools/draw.mjs` deals three cards (`concept.md`). Each becomes a six-panel storyboard, a logline, the sentence that would make it fail, and a swap test. Recommend one and say what you kept from the owner's idea.
3. **Script and stage brief.** The script as data (`lib/<feature>/script.ts`, `verbs.md`). The stage brief in `docs/STAGE_BRIEF.md`, copied from `references/_stage-brief-template.md`: world rules (material, light, lens, time, ground), the signature move, the shot list with focal lengths, and the **asset manifest** (every asset, its source, licence, size and status; `assets.md`).
4. **Look development.** Build the two or three key shots at final quality: real form, materials, light and grade. Capture them with `tools/shoot.mjs`; the critic grades them blind.
5. **Styleframes to the owner.** Only frames the critic grades Fifth, or Fifth with named gaps, with the critic's table. **End the turn.** The look is approved before anything moves.
6. **Asset production.** Everything on the manifest: models, textures, baked lighting, baked simulations, HDRIs, video. Sources and costs are in `assets.md`; free trials are named before use.
7. **Motion pass.** The script runs on the real assets. Dailies after each iteration (`critic.md`); the critic's three changes are the next iteration's list.
8. **Delivery.** Posters from the real render, the reduced-motion still, the phone path (lighter real-time or the identical camera path as video), budgets.
9. **Verify and report.** `verify.md`, the measured convergence gate, the stage audit per layer (`generations.md`), and the row in `references/fingerprints.md`.

## Tools

| Tool               | Does                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `tools/draw.mjs`   | Deals concept cards that differ from each other and from every earlier build                 |
| `tools/shoot.mjs`  | Drives Chrome over the DevTools protocol: frames per shot, measured fingerprint, clone gate, state probe |
| `tools/assets.mjs` | Fetches CC0 HDRIs and texture sets from Poly Haven into the build's asset folder             |
| `tools/blender/bake_rigid.py` | Bakes rigid-body physics (pours, falls, scatters) in Blender's Bullet, deterministic, for scrubbed playback, including piles of thin bodies (`pipeline.md`) |
| `tools/blender/bake_set.py` | Bakes soft shadows, bounce and caustics for any static set into lightmaps and a GLB; `BakedSet` and `ShadowCatcher` put it on the stage (`pipeline.md`) |
| `tools/ruled-sheet.mjs` | Writes paper at real scale as a PNG: graph paper, engineering pads, dot grids (`--grid`, `--major`), or plain stock with fibres such as kraft (`--grid 0 --fibres`) |
| `tools/sun-keys.mjs` | Writes sun keys (direction and colour per hour, from the stage's own sun) into a set spec, for a sun that moves through the story |
| `tools/overlap.mjs`, `tools/freeze.mjs` | Measure interpenetration in a bake; hold a settled pile still from its calmest frame |
| Blender, headless  | Modelling, baking light and simulation, offline renders (`pipeline.md`)                      |

## Requirements

Not taste: breaking one is a defect.

- All copy is real DOM text in reading order; the stage is `aria-hidden`. Text that appears in the world is DOM tracked to the surface, never baked into a texture.
- In the DOM, animate only `transform`, `opacity` and `clip-path`.
- One scroll owner per stage: GSAP. Motion's `useScroll` never drives a stage.
- No markers, `stats-gl` panel or debug UI in a shipped build.
- Scrub media ships with audio removed. Sound, if any, starts only on the visitor's action.
- No em dashes in visible copy. Never invent customer numbers, logos or testimonials.
- Nothing flashes more than three times a second.
- Every asset has a recorded source and licence.

## Adding references

When the owner shares a site, follow `capture.md`: capture it with `tools/shoot.mjs`, record its verbs, light, materials and camera, and where it sits on the ladder with frame evidence. The library calibrates the critic.
