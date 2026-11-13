# Layer 9: Delivery

How the film reaches every device: first paint, weight, loading, fallbacks, frame rate. Upstream: everything.

## Tells

| ID        | Gen       | Tell                                                                       | Detector                                                                       | Instead                                                                  |
| --------- | --------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| DLV-G1-1  | First     | A preloader with a percentage; the page waits for assets                   | `preloader`, `loading.*%`                                                      | Copy at hydration; the stage streams in behind a poster                  |
| DLV-G3-1  | Third     | Uncompressed models and textures; no poster                                | Asset: GLB without meshopt, PNG textures; first stage load above the tier budget | Compressed assets within budget; a poster rendered from the stage        |
| DLV-G4-1  | Fourth    | Phones get a cut-down page or an unrelated still                           | Mobile branch that removes the stage with no matching film                     | One film on every device                                                 |
| DLV-G4-2  | Fourth    | No reduced-motion path, or a broken still                                  | Reduced-motion capture shows an empty or partial stage                         | The composed peak shot, from the real render                             |

## Baseline

1. First paint is a poster rendered from the real stage; LCP under 2.5s. `(J)`
2. A first-load budget per tier, recorded; meshopt geometry, KTX2 or WebP textures. `(J)`
3. Progressive: the opening shot's assets first, later shots stream behind. `(J)`
4. One film on every device: a lighter real-time path, or the identical camera path rendered to video and scrubbed. `(J)`
5. Reduced motion shows the composed peak shot. `(J)`
6. Frame rate measured per tier on the user's hardware (`verify.md`). `(J)`

## Checks

- `[asset]` Sizes and compression per tier against the budget.
- `[app]` LCP, fps per tier, reduced-motion capture.
