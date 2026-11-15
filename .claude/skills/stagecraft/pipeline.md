# Pipeline

How assets are made offline: Blender run headless from scripts, then optimised and verified for the browser. Written 2026-11-12 before Blender was installed; every script below is planned, and each is marked tested only after it has produced an asset that passed its check.

## The machine

Measured 2026-11-12: Intel Core i7-8569U (4 cores, 8 threads), Intel Iris Plus Graphics 655 (Metal 3). Cycles renders on the CPU here; EEVEE uses the GPU. Plan for minutes per baked map and minutes per offline frame; measure the first of each and record it below before promising a sequence. `ffmpeg` is not installed: encode video in the user's Chrome through WebCodecs (`techniques.md`, Media) or install a static `ffmpeg` with the owner's approval.

## Running Blender

```
BLENDER=${BLENDER_PATH:-/Applications/Blender.app/Contents/MacOS/Blender}
$BLENDER --version
$BLENDER --background --factory-startup --python .claude/skills/stagecraft/tools/blender/<script>.py -- <args>
```

Everything after `--` reaches the script as its own arguments. Scripts read a JSON spec, never values typed into the script, so one script serves every build. Outputs go to `public/stage/<feature>/` and are recorded in that folder's `manifest.json` with source "Blender (generated)" and the spec that produced them.

## Scripts

| Script               | Input                                                   | Output                                                                 | Check                                                                    | Status  |
| -------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------- |
| `model_lathe.py`     | A profile curve, segments, bevel radius, thickness      | A GLB of a turned object (jar, bottle, cup) with UVs and a bevel       | `gltf-transform inspect`: bevel loops, UV0 and UV1, metres               | Planned |
| `model_extrude.py`   | An SVG outline, depth, bevel                            | A GLB of a flat object (coin, card, key, logo plate) with a milled or rounded edge | Same                                                          | Planned |
| `bake_light.py`      | A scene GLB, an HDRI, a sun (angle, colour, size), samples | Lightmaps on UV1 for the static set, denoised                        | Frame: bounce and contact visible; no seams on UV islands                | Planned |
| `bake_rigid.py`      | Bodies, a container, initial state, frames              | A rigid vertex-animation pair: per-body position and rotation textures for every frame, plus bounds | Browser playback matches Blender's frame at three sample frames | Planned |
| `bake_soft.py`       | A mesh, a cloth or fluid setup, frames                  | A per-vertex animation texture and normals texture                     | Same                                                                     | Planned |
| `render_path.py`     | The scene, the camera path from the script, samples     | A PNG sequence of the identical camera path, for posters and the phone film | The poster frame matches the live stage's first frame               | Planned |

## Into the browser

- **Optimise:** `pnpm exec gltf-transform optimize in.glb out.glb --compress meshopt --texture-compress webp` (KTX2 needs KTX-Software; without it use WebP and say so).
- **Lightmaps:** read on UV1 by the material; the moving actors take real-time light that matches the baked sun.
- **Vertex animation:** a loader in `lib/stage/` reads the textures and bounds; a TSL node samples the frame from the timeline's progress, so the scroll scrubs the simulation exactly in both directions. Written alongside the first baked output, tested against Blender's frames.
- **Sequences:** encoded for seeking (`techniques.md`, Route B), scrubbed by mediabunny on the phone tier.

## CC0 sources

`tools/assets.mjs` fetches HDRIs and texture sets from Poly Haven (CC0) with their real-world dimensions, so materials are scaled correctly. ambientCG is the second CC0 source; add it to the tool when a build needs it.

## Order on the first day

1. Install Blender; record the version here.
2. `model_lathe.py` and `model_extrude.py`: a jar and a coin.
3. `bake_light.py`: the Sunline desk under a late sun; measure the bake time.
4. `bake_rigid.py`: twelve coins poured into the jar; then the browser loader, scrubbed both ways.
5. Look-dev styleframes for Sunline; the critic grades them blind; the owner sees only what passes.
