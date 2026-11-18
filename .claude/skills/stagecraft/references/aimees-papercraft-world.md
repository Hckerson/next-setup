# Aimee's Papercraft World

| Field      | Value |
| ---------- | ----- |
| Source     | https://aimees-papercraft-world.com/ (Awwwards Site of the Day 2026-05-24, 7.33, with Developer Award; FWA of the Day, March 2026; by Andrew Woan) |
| Live       | yes, checked 2026-11-12 |
| Builder    | custom: a Vite build (`/assets/index-<hash>.js`, `type="module"`); React Three Fiber according to the author's write-up |
| Actor route | C real-time 3D. The bundle loads `/models/Scene_1_Winter-transformed.glb`, `Scene_2_Spring`, `Scene_3_Summer`, `Scene_4_Fall` and `Moving_Characters-transformed.glb`, with four `.webp` texture sheets per season scene (`/textures/Scene_1_Winter_1.webp` … `_4.webp`). The `-transformed` suffix is what gltfjsx `--transform` writes |
| Set        | `paper-cut`, with the lens rule broken on purpose (see Ladder) |
| Arc        | `journey`: the actor crosses four seasons and changes costume in each |
| Measured   | 1440×900: ground L 0.213, ground range 0.069, ground hue 32, accent hue 26, bright share 0. 390×844: ground L 0.281, range 0.025, ground hue 24, accent hue 31, bright share 0.001 |
| Stack      | three.js (`WebGLRenderer` and WebGPU strings both in the bundle; the backend used at runtime was not checked), GSAP, Lenis, Draco and KTX2 loaders, shadow maps on (`shadowMap`, `PCFSoft`, `DirectionalLight`, `HemisphereLight` in the bundle). The window has a range (8100px), but the scene follows wheel input |
| Captured   | 2026-11-12, `tools/shoot.mjs` with `--click "Enter" --wheel 8000 --settle 12000`, 11 frames at 1440×900 plus 0 and 0.5 at 390×844 (`--settle 30000`), in `~/.cache/stagecraft/captures/b/aimees-papercraft-world-*`. The Enter button only exists once loading finishes: it was missing after about 5 s, present after about 15 s on desktop and about 33 s on phone |

## Actor and destination

The actor is a flat, hand-drawn cut-out of a girl. She stands for the portfolio's author and her story: she left creative technology after workplace abuse and moved into healthcare. She changes costume in each season: a knitted hat in winter (0_1), a green bow in spring (0_3), a surfboard at the summer seam (0_5, 0_6), riding a blue sea serpent (0_7), and riding a white crane in autumn red (0_8 to 1). There is no CTA button. The destination is the autumn wall, which carries "Feel free to reach out anytime!" (0_9), plus the `Info` link at top right. The scroll loops: frame 1 shows the same seam as frame 0.

## What moves

Scroll is the only driver seen. The world is one round room whose wall is split into four coloured sheets, one per season, and whose floor is split into four coloured wedges. Timings are shares of the 8000px wheel run.

| Share | Shot | Verbs |
| ----- | ---- | ----- |
| 0 | Seam between autumn red and winter blue, no actor in view (0) | Hold on the set |
| 0–0.2 | Winter: log cabin, birch cut-outs on white stands, snowman, a hanging "Aimee's Papercraft World" sign (0_1, 0_2) | The camera yaws right. The actor walks the snow shelf in a knitted hat |
| 0.2–0.4 | Spring green: a torn "About Me" label pinned to the wall, gnomes, a tree with a heart, a pond with a duck and a frog (0_3). Then a white cage holding a small figure, and the story copy (0_4) | Yaw continues. Costume changes to a green bow. The cage beat carries the abuse story |
| 0.4–0.7 | Summer orange: a "My Work" label, a dashed travel route between postcards (Shanghai, Austin, San Francisco, Boston), a beach umbrella, a sandcastle, water as stacked blue strips (0_5, 0_6, 0_7) | The actor surfs across the green/orange seam. The camera pulls back at 0_6 to show three walls at once. At 0_7 the actor rides a sea serpent in front of a credits list |
| 0.8–1 | Autumn red: paper lanterns on a string, a round moon window with a lattice, trees, a cart, a mooncake (0_8, 0_9, 1) | The actor rides a crane across the wall. The camera returns to the opening seam |

Eleven stills cannot show whether the actor and camera move in steps or smoothly; that was not verified. The `−/+` slider at the bottom is a zoom control; it was not exercised.

## Layout

```
+-----------------------------------------------------------+
:                                                  Info     :
:   [pinned torn label]        lanterns on a string         :
:   copy printed on the wall                                :
:        cut-outs on stands      actor        cut-outs      :
:   ~~~~~ stacked paper terraces / water strips ~~~~~~~~~   :
:        floor wedges, one colour per season                :
:                     -  [=======]  +                       :
+-----------------------------------------------------------+
 dashed white cut line around the whole viewport
```

There is no nav bar and no headline. The HTML layer is only `Info` (top right) and the zoom slider (bottom centre). A dashed white cut line runs round the viewport edge in every frame.

## Art direction

**Ground.** The ground is the wall sheet behind the actor, and it changes colour with the season: brick red, dusty blue, sage green, ochre orange. Every desktop frame mixes two or three of them, so ground L stays low and narrow (0.213, range 0.069). **Ink.** Copy is white on the coloured sheets, with highlighted words in the season's accent. **Type.** One rounded hand-lettered face for wall copy, labels and the title. **Texture.** Every surface is fibrous card with visible speckle; the felt-like speckle is strongest on the walls (0_6). No bloom, no grain overlay, no blur.

**Camera.** The camera sits inside the ring of walls. It yaws round the room on scroll and changes distance, from a single wall (0_3) to three walls (0_6). The lens is wide enough to bend the floor wedges.

**Light.** A soft, even top light with no visible key direction and no time of day. The ceiling rim drops a soft dark band onto the top of every wall (0_3, 0_5, 0_9). Cut-outs throw short soft shadows onto the sheet behind them: trees, gnomes and the fox at 0_3. Props on the floor get contact shadows: the cart, the mooncake, the keyboard. No change of light between seasons is visible; only the paper colour changes.

**Materials.** Card cut-outs mounted on white stands (birch trees, deer, flowers). Stepped paper terraces with visible gaps between layers: three green strips at 0_3, wavy blue water strips at 0_5 to 0_7, red terraces at 0_9. Folded papercraft props (cabin, sled, castle, cart). Labels are torn strips held by pushpins.

## Why it works

- The seasons are the set. Four wall colours on one ring mean the ground changes between shots without a cut, and the costume change gives each shot a reason to exist.
- Copy is printed in the world: pinned labels and lettering on the paper walls, so no HTML panel sits over the scene and the story is read as part of the set.
- Every prop obeys one material rule (card, cut, stand, fibre). That is why the frames read as a photographed model, not a render.

## Borrow / avoid

Borrow: one actor whose costume carries the chapter, the ground changing colour between shots, copy printed on the set's surfaces, stepped paper terraces as the depth device, and a loop that returns to the opening frame. Avoid: the author's story, characters and season list; the solid black keyboard prop, which reads as plastic in an all-paper world (0_2, 0_4); and a long load that gates the first frame behind a button.

## Ladder

**Grade: Fifth with gaps.**

1. Every frame could hang on a wall. All eleven desktop frames are composed set photographs with one material, a coloured ground and soft shadows; 0_3, 0_6 and 0_9 hold up as stills.
2. Physics: no matter is poured, dropped or draped, so nothing needs simulating. Not applicable.
3. Light has a source you can point to: the top light and the ceiling rim's shadow band on every wall (0_3, 0_5), cut-outs casting onto the sheet behind (0_3), contact shadows under props (0_6). It has no direction or time, so it reveals little.
4. The visitor is inside it: a ring they turn by scrolling and a zoom slider. Their own time, place or number does not reach the world.
5. One film on every device: phone-0 and phone-0_5 show the same set, camera and actor (surfing at 0.5) in a narrower crop, not a cut-down page.

Signature move: text printed in the world (pinned torn labels, lettering on the walls).

Fourth-generation tells: none of the cluster. The ground is not dark, nothing glows, and the actor is a rough cut-out, not a flawless floating object.

Gaps:
- The set's stepped time model (about 12 fps) could not be confirmed from stills.
- The lens breaks the set's locked-off rule: the camera yaws and dollies. This is a deliberate exception, confined to the camera; parallax between the layers is kept.
- The black keyboard prop breaks the material rule.
- The light has no time of day.
