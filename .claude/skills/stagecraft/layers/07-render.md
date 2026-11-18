# Layer 7: Render

How light becomes pixels: tone mapping, exposure, grade, cleanliness, post. Upstream: light, camera.

## Tells

| ID        | Gen       | Tell                                                                     | Detector                                                                                  | Instead                                                           |
| --------- | --------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| RND-G0-1  | Pre-first | No tone mapping, flat colour output, jagged edges                        | `NoToneMapping` on a lit build; frame: aliasing on every edge                             | A chosen tone mapping and antialiasing                            |
| RND-G3-1  | Third     | Library defaults: ACES, exposure 1, banding in gradients                 | No `toneMapping` decision recorded; frame: banding in smooth regions                      | Tone mapping and exposure chosen for the set; dither              |
| RND-G4-1  | Fourth    | Post as a crutch: bloom, vignette, chromatic aberration and grain stacked | More than two post nodes with no reason in the brief                                      | Each node has a reason                                            |
| RND-G4-2  | Fourth    | Clipped highlights and crushed blacks                                    | Frame: share of pixels at 0 or 255 above the threshold outside the light source itself, in all channels (one channel alone is RND-G4-4) | Exposure metered on the hero                                      |
| RND-G4-3  | Fourth    | The hero exposed darker than its set, or a flat range with no black and no white | Frame: `actors.<id>.darkestExposure` below 1; `flattestRange` below 0.5                   | Exposure metered on the hero per shot; a range from near black to a white the light earns |
| RND-G4-4  | Fourth    | Oversaturated: one channel crushed or clipped while the others are not, so a surface reads as pure orange or pure cyan | Frame: `maxChannelCrushed` above 0.05, `maxChannelClipped` above 0.01 or `maxSaturated` above 0.2; source: no grade node | A grade (`withGrade`) that holds saturation and lifts each channel's floor, tied to the world's light |
| RND-G4-5  | Fourth    | One hue everywhere: a tint, not a grade; light and shade the same colour | Frame, lit frames only: 95 percent of coloured pixels within 15 degrees of one hue, shadows included; or, on any one near-neutral surface (saturation 0.1 to 0.3: paper, plaster, concrete, grey card), lit and shaded areas within 5 degrees in hue and within 0.03 in blue-to-red ratio. A saturated albedo (kraft, terracotta, a red car) reflects too little of the cool fill to move its hue, so judge it by the blue-to-red ratio rising in shade, not by hue (an unlit drawing on tinted paper is one hue by nature) | A grade whose shade differs in hue from its light (warm sun, cool shade), tied to the world |
| RND-G4-6  | Fourth    | Stepped blur: edges in a blur show three to five discrete copies, highlights resolve as a grid of dots | Frame (J): ghost copies along blurred edges, dotted speculars; source: a blur or bokeh kernel with fixed taps and no per-pixel rotation, a scene pass without multisampling | Taps rotated per pixel (`withLens`), enough samples for the largest blur, a multisampled scene pass (`useRenderPipeline`) |

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
