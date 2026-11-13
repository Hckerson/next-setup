# Layer 6: Motion

How things move: verbs, mass, overlap, simulation. `verbs.md` is the vocabulary; this layer grades it. Upstream: form, camera.

## Tells

| ID        | Gen       | Tell                                                                        | Detector                                                                                        | Instead                                                             |
| --------- | --------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| MOT-G1-1  | First     | Nothing moves, or a looping GIF or video stands in for motion               | No timeline on the stage; a looping `<video>` hero                                              | A scripted performance                                              |
| MOT-G2-1  | Second    | Layers sliding at different rates with no cause                             | `yPercent` parallax on every layer with no script reference                                     | Motion with a cause in the script                                   |
| MOT-G3-1  | Third     | Linear tweens, one duration everywhere, spinning in place                   | `ease: "none"` on actor moves; one duration constant reused; `rotation.y +=` in a frame loop    | Verbs with mass and timing roles                                    |
| MOT-G4-1  | Fourth    | One ease family, no secondary motion, actors passing through surfaces       | One ease for every verb; probe shows an actor below its surface                                 | Overlap, follow-through and secondary motion; `rebound` on contact   |
| MOT-G4-2  | Fourth    | Fake physics: many bodies tweened where they should interact                | Ten or more actors moving on tweens in one shot with no simulation                              | A simulation baked for scrubbed playback                            |

## Floor versus baseline

A competent fourth eases everything nicely. It lacks weight and consequence: objects move, but nothing they touch notices.

## Baseline

1. Every move carries mass: anticipation, settle or rebound (`verbs.md`). `(J)`
2. Overlap and follow-through: attached parts lag (a lid after its jar, laces after a shoe). `(J)`
3. Secondary motion: the world responds (dust lifts, a neighbour wobbles, a surface gives). `(J)`
4. Many bodies or deforming matter (pour, fall, drape, fill) are simulated and baked to vertex-animation textures, scrubbable both ways. `(J)`
5. Spacing has rhythm: holds and accents; the peak shot gets the longest share. `(J)`
6. No intersection: the probe asserts no actor passes through a surface. `(J)`

## Asset roles

Baked simulations from Blender as vertex-animation textures with a frame count and bounds; the playback shader; verbs from `lib/stage/moves/`.

## Checks

- `[script]` Every verb names its mass; four or more verb families; none back to back.
- `[app]` The probe shows no actor below its surface at any captured frame.
- `[frame]` Scrubbing forward then back to a frame gives the same image.
