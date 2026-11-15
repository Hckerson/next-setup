# Layer 5: Camera

How we watch: lens, framing, focus, movement. Upstream: set.

## Tells

| ID        | Gen       | Tell                                                                     | Detector                                                                             | Instead                                                                  |
| --------- | --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| CAM-G1-1  | First     | A static camera with the product dead centre throughout                  | One camera key for the whole script                                                  | Framing per shot, recorded                                              |
| CAM-G2-1  | Second    | A drag-to-rotate viewer as the camera                                    | `OrbitControls` or pointer-bound rotation on the hero                               | The script moves the camera; the pointer adds a damped sway              |
| CAM-G3-1  | Third     | Library defaults: fov 75 or 50, auto-rotate                              | `fov: 75`, `fov: 50` with no record, `autoRotate`                                    | A focal length chosen per shot                                           |
| CAM-G4-1  | Fourth    | The same slow push-in or orbit on every shot                             | Camera keys vary on one axis only; one ease for every camera move                    | The camera grammar from the draw, with variety inside it                |
| CAM-G4-2  | Fourth    | Everything in focus; no lens behaviour                                   | No depth of field, no focus change anywhere                                          | Focus that directs attention                                             |

## Floor versus baseline

A competent fourth moves a camera smoothly around a well-lit object. It lacks a cinematographer: no lens choice, no focus, framing that ignores the copy.

## Baseline

1. A focal length per shot, recorded (wide for place, normal for use, long for product, macro for material). `(J)`
2. Composition reserves the copy's space; the subject on a third or a deliberate centre. `(J)`
3. Focus directs attention at least once: a rack focus or a depth of field cued to the copy. `(J)`
4. The camera grammar from the draw holds across the script; a cut is a decision. `(J)`
5. Camera moves carry mass: they leave rest gradually and settle without overshoot. `(J)`
6. Fast moves get motion blur from velocity. `(J)`

## Checks

- `[source]` Each shot names a focal length; no library default fov.
- `[frame]` In every shot the copy's region is free of the subject's highlights.
