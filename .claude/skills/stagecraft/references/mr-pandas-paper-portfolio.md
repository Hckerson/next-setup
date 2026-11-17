# Mr. Panda's Psychologically Safe Portfolio

| Field      | Value |
| ---------- | ----- |
| Source     | https://www.mr-pandas-psychologically-safe-portfolio.com/ (Awwwards Site of the Day 2026-03-11, 7.44, as "Mr. Pandas Paper Portfolio"; CSS Winner Site of the Month, January 2026; by Andrew Woan, built as a demo for a Codrops article dated 2025-12-30) |
| Live       | yes, checked 2026-11-13 |
| Builder    | custom: a Vite build (`/assets/index-<hash>.js`); the author's repo lists Blender, Three.js and Krita |
| Actor route | C real-time 3D. The bundle loads `/models/Panda.glb`, `Moving_Extras.glb`, `scene_1.glb` to `scene_4.glb` and `single_sheet.glb`, plus KTX2 texture sheets per scene and per costume (`regular`, `samurai`, `pirate`, `desert`, `kpop`) |
| Set        | `paper-cut` |
| Arc        | `journey`: the actor crosses five places and is re-dressed by each |
| Measured   | 1440×900: ground L 0.586, ground range 0.115, ground hue 100, accent hue 29, bright share 0. 390×844: ground L 0.629, range 0.016, ground hue 150, accent hue 61, bright share 0 |
| Stack      | three.js with `castShadow`, `shadowMap` and `DirectionalLight` in the bundle; both `WebGLRenderer` and `WebGPURenderer` strings are present, and the backend used at runtime was not checked. GSAP. Draco and KTX2 loaders. No Lenis strings. The window cannot scroll; wheel input drives the scene |
| Captured   | 2026-11-13, `tools/shoot.mjs`, wheel-driven over 8000px, `--settle 12000`, 11 frames at 1440×900 plus 0 and 0.5 at 390×844, in `~/.cache/stagecraft/captures/b/mr-pandas-paper-portfolio-*`. No entry gate |

## Actor and destination

The actor is a hand-drawn panda cut-out mounted on a stick. It stands for the portfolio's author, a "human researcher". Its costume and vehicle change in each place: bicycle (0, 0_1), samurai helmet on the bicycle (0_3, 0_4), pirate hat on a ship (0_6), headwrap on a camel (0_8), and a green zombie by a haunted house (0_9, 1). The destination is the last line on the sheet, "Reach out anytime!! I won't ghost you!" (1). There is no button.

## What moves

The camera tracks sideways along a stage built on one sheet of lined notebook paper. Shares are of the 8000px wheel run.

| Share | Place | Verbs |
| ----- | ----- | ----- |
| 0–0.1 | Home: a drawn aeroplane sign hung on a string, a handwritten welcome on the sheet, an "About Me" sticky note, grass cut-outs (0, 0_1) | The panda rides its bicycle. The camera trucks right |
| 0.1–0.4 | Cherry blossom trees, a waterfall, a stone lantern, a pagoda, a dragon flying on the sheet, a torii gate (0_3, 0_4) | Costume changes to a samurai helmet. The bicycle passes the pagoda |
| 0.4–0.7 | Sea: three stacked strips of blue lined paper with inked wave tops, an island with a palm and a treasure chest, a sun (0_6) | The bicycle becomes a pirate ship and the panda puts on a pirate hat |
| 0.7–0.8 | Desert: a sand-coloured platform, a folded pyramid cut away to show gold bars and a sarcophagus, a camel, "Work Experience" job cards (0_8) | The panda rides the camel in a headwrap |
| 0.8–1 | Graveyard: a grey platform, a zombie hand, a haunted house, a ghost, a bat, a tombstone, "Featured Work" cards (0_9, 1) | The panda turns into a green zombie. The track stops on the closing line |

Eleven stills cannot show whether motion is stepped or smooth. Hover was not exercised.

## Layout

```
+-----------------------------------------------------------+
|  lined notebook sheet, red margin rules                    |
|   [sticky note label]      cloud cut-out (shadow below)    |
|   handwritten copy on the sheet                            |
|       cut-outs on sticks        actor on its vehicle       |
|  ===== platform strip, lined-paper edge, changes per place |
|  ===== lower step                                          |
+-----------------------------------------------------------+
```

There is no HTML chrome in any frame: no nav, no menu, no scroll cue. Every word is drawn on the sheet or on a pinned card.

## Art direction

**Ground.** One back sheet of lined notebook paper with red margin rules, the same in every place. What changes between places is the platform: green grass, blue water, sand, grey slate. **Ink.** Black felt-tip outline on everything, with flat marker colour inside. **Type.** Handwriting only. Section labels are coloured bubble letters on sticky notes ("About Me", "Work Experience"). **Texture.** Every cut-out, platform edge and wave strip is printed with ruled lines, so the paper shows on every surface. No bloom, no grain overlay.

**Camera.** A sideways track at a slight downward angle, always facing the sheet. Depth comes from parallax between cut-outs, platforms and the back sheet.

**Light.** One directional light from the upper left. Every cut-out casts a soft shadow down and to the right onto the sheet: clouds at 0_3 and 0_6, the dragon and pagoda at 0_4, the ghost and house at 1. The shadow's offset shows the gap between each layer and the sheet. Platform fronts sit in shade under their top surfaces.

**Materials.** Paper only: stick-mounted cut-outs, a folded card pyramid with an open side (0_8), stacked wave strips with gaps between them (0_6), and a two-step platform whose front edges show the ruled lines.

## Why it works

- The cast shadow carries the depth. Each cut-out stands a measurable distance off the sheet, and the light says how far.
- One sheet, one ink and one handwriting from start to end. Places change only by platform colour and props, so the world stays a single notebook.
- The actor's costume is the chapter marker, so no headline is needed.

## Borrow / avoid

Borrow: shadow offset as the depth readout between layers, a platform that changes colour per place while the back sheet holds, costume changes as chapter breaks, and an ending line written into the world. Avoid: the panda, the places and the jokes; the childlike drawing register for any client who needs authority; and the drawn aeroplane's real brand name.

## Ladder

**Grade: Fifth with gaps.**

1. Every frame could hang on a wall: 0_4 (pagoda and dragon), 0_6 (pirate ship on stacked waves) and 0_8 (cut-away pyramid) are complete compositions in one material.
2. Physics: nothing is poured or dropped. Not applicable.
3. Light is a character: one upper-left source whose shadow offset shows the depth of every layer (0_3, 0_4, 0_6, 1). This is the set's light rule played straight. It has no time of day.
4. The visitor is inside it: only the wheel was exercised. Nothing reads the visitor's own time or input.
5. One film on every device: phone-0_5 shows the same pirate shot in a tight vertical crop.

Signature move: the vehicle and costume change at each place.

Fourth-generation tells: none of the cluster. The ground is light paper, nothing glows, and the hero is a rough cut-out on a stick.

Gaps:
- The set's stepped time model could not be confirmed from stills.
- The back sheet never changes colour between shots, against the set's ground rule; the platforms change instead.
- Same author and pipeline as `aimees-papercraft-world` (Blender, Krita, three.js). The two paper-cut references differ in camera (sideways track here, ring yaw there) and ground, not in production method.
