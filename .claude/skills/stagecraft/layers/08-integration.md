# Layer 8: Integration

How each frame and its copy are one composition. The stage's side only: type, tokens and layout of the copy belong to web-generations. Upstream: render, and the copy web-generations supplies.

## Tells

| ID        | Gen       | Tell                                                                  | Detector                                                                         | Instead                                                               |
| --------- | --------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| INT-G1-1  | First     | Copy pasted over the subject with no relation                         | Frame: copy bounding box overlaps the actor's silhouette                         | Framing that reserves the copy's space                                |
| INT-G3-1  | Third     | A dark overlay to rescue contrast                                     | `bg-black/` overlay over the stage                                               | Contrast from light and framing                                       |
| INT-G4-1  | Fourth    | Copy fades in on its own, same place every shot                       | Copy tweens not cued to a verb label                                             | Copy cued to the script, placed per shot                              |
| INT-G4-2  | Fourth    | Text over a busy region, failing contrast                             | Frame: contrast below 4.5:1 in the copy's region                                 | Move the copy, or move the light                                      |

## Baseline

1. Each shot is composed with its copy: the camera reserves negative space for it. `(J)`
2. Copy contrast at least 4.5:1, measured on the real frame region. `(J)`
3. Copy appears on a verb's label. `(J)`
4. Text placed in the world (on a label, a receipt, a screen) stays real DOM, tracked to the 3D surface. `(J)`
5. The stage hands web-generations its per-shot tones (ground and ink); nothing else is shared. `(J)`

## Checks

- `[frame]` Contrast in each copy region at each shot.
- `[source]` Every copy element is cued from the script.
