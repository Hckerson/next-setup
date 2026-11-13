# Layer 7: Render

How light becomes pixels: tone mapping, exposure, grade, cleanliness, post. Upstream: light, camera.

## Tells

| ID        | Gen       | Tell                                                                     | Detector                                                                                  | Instead                                                           |
| --------- | --------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| RND-G0-1  | Pre-first | No tone mapping, flat colour output, jagged edges                        | `NoToneMapping` on a lit build; frame: aliasing on every edge                             | A chosen tone mapping and antialiasing                            |
| RND-G3-1  | Third     | Library defaults: ACES, exposure 1, banding in gradients                 | No `toneMapping` decision recorded; frame: banding in smooth regions                      | Tone mapping and exposure chosen for the set; dither              |
| RND-G4-1  | Fourth    | Post as a crutch: bloom, vignette, chromatic aberration and grain stacked | More than two post nodes with no reason in the brief                                      | Each node has a reason                                            |
| RND-G4-2  | Fourth    | Clipped highlights and crushed blacks                                    | Frame: share of pixels at 0 or 255 above the threshold outside the light source itself    | Exposure metered on the hero                                      |

## Floor versus baseline

A competent fourth renders cleanly with a tasteful bloom. It lacks a grade: the frames have no colour intention tied to the world.

## Baseline

1. Tone mapping chosen for the set and exposure metered on the hero, recorded. `(J)`
2. A grade: a LUT or per-shot colour decisions tied to the world's time and place. `(J)`
3. Clean: antialiased, no banding, no clipping beyond the light source itself. `(J)`
4. Every post node has a reason in the brief. `(J)`
5. A DPR range and quality tiers per device, with fps measured. `(J)`

## Checks

- `[source]` Tone mapping and exposure are tokens with a recorded reason.
- `[frame]` Clipped share and banding below the critic's thresholds on every shot.
