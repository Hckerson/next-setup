# Layer 2: Material

What everything is made of, and whether it behaves like it. Upstream: form.

## Tells

| ID        | Gen       | Tell                                                                                | Detector                                                                                         | Instead                                                                 |
| --------- | --------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| MAT-G0-1  | Pre-first | An unlit flat colour on an actor                                                    | `MeshBasicMaterial`, `meshBasicMaterial` on an actor outside an animatic route                   | A physically based material                                             |
| MAT-G2-1  | Second    | Gloss painted in: highlights and bevels drawn into the texture                      | Albedo texture with baked specular highlights; frame: highlight does not move with the light    | Specular from the material and the light                                |
| MAT-G3-1  | Third     | The default material: one roughness, one metalness, grey                           | Literal `roughness`/`metalness` with no maps on a hero; asset: hero materials with no textures   | Maps that vary across the surface                                       |
| MAT-G3-2  | Third     | Albedo outside the physical range: pure black or pure white base colour             | Base colour below 0.02 or above 0.95 in linear                                                   | Albedo between about 0.03 and 0.9 linear                                |
| MAT-G4-1  | Fourth    | Perfect surfaces: no smudge, no wear, no dust                                       | Frame: low colour variance inside the actor region; asset: roughness map with near-zero variance | One imperfection layer per hero material, at real-world scale          |
| MAT-G4-2  | Fourth    | Glass as an opacity slider                                                          | `opacity` below 1 on glass with no `transmission`                                                | Transmission, thickness and IOR; dispersion when glass is the hero      |

## Floor versus baseline

A competent fourth uses PBR materials from a library, correctly assigned. It lacks variation and history: nothing has been touched, worn or lived in.

## Baseline

1. Physically based: plausible albedo, metals as metals, dielectrics with the right IOR. `(J)`
2. Roughness varies across every hero surface, from a map. `(J)`
3. One imperfection layer per hero material (fingerprints on glass, wear on a coin's rim, dust in a seam), at real scale. `(J)`
4. Behaviour matches the substance: transmission for glass, subsurface for skin, wax and food, sheen for fabric, clearcoat for paint. `(J)`
5. Texel density matched to how large the surface appears; textures compressed to KTX2 or WebP. `(J)`

## Set notes

- **print-catalogue, paper-cut:** the material is paper and ink: fibre, deckle, registration, halftone.
- **macro-material:** the material is the story; the scan or texture must hold at the closest shot.
- **night-luminous:** emissive materials are light sources and are lit-designed, not glow-dialled.

## Asset roles

PBR texture sets (base colour, roughness, normal, plus the substance's extra maps) from a scan, a CC0 library (Poly Haven, ambientCG), a procedural shader, or a Blender bake; an imperfection map per hero.

## Checks

- `[source]` No unlit material on an actor; no literal-only roughness on a hero.
- `[asset]` Each hero material has a roughness map with measurable variance.
- `[frame]` Colour variance inside the actor region at the peak shot is above the critic's floor.
