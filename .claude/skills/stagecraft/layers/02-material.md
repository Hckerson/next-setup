# Layer 2: Material

What everything is made of, and whether it behaves like it. Upstream: form.

## Tells

| ID        | Gen       | Tell                                                                                | Detector                                                                                         | Instead                                                                 |
| --------- | --------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| MAT-G0-1  | Pre-first | An unlit flat colour on an actor                                                    | `MeshBasicMaterial`, `meshBasicMaterial` on an actor outside an animatic route                   | A physically based material                                             |
| MAT-G2-1  | Second    | Gloss painted in: highlights and bevels drawn into the texture                      | Albedo texture with baked specular highlights; frame: highlight does not move with the light; frame: an imperfection (scratch, smudge) brighter than its surface where the surface is in shadow, i.e. wear that ignores the light | Specular from the material and the light                                |
| MAT-G3-1  | Third     | The default material: one roughness, one metalness, grey                           | Literal `roughness`/`metalness` with no maps on a hero; asset: hero materials with no textures   | Maps that vary across the surface                                       |
| MAT-G3-2  | Third     | Albedo outside the physical range: pure black or pure white base colour             | Base colour below 0.02 or above 0.95 in linear                                                   | Albedo between about 0.03 and 0.9 linear                                |
| MAT-G4-1  | Fourth    | Perfect surfaces: no smudge, no wear, no dust                                       | Frame: low colour variance inside a patch of the actor under one light (patterned light across the whole actor hides a pristine surface; procedural noise adds variance without imperfection, so judge for wear, creases and fibre at real scale); asset: roughness map with near-zero variance | One imperfection layer per hero material, at real-world scale          |
| MAT-G4-2  | Fourth    | Glass as an opacity slider                                                          | `opacity` below 1 on glass with no `transmission`                                                | Transmission, thickness and IOR; dispersion when glass is the hero      |
| MAT-G4-3  | Fourth    | Metal highlights gone white: gold or copper reads as bone or silver in its brightest areas | Frame: `actors.<id>.highlightSaturation` (the top 5% brightest pixels inside the metal's own box) below 0.40; measured on the whole frame it is a false hit from any pale wall | Exposure metered so the metal's highlights keep their tint; a warm grade; a reflected world that is not white |
| MAT-G4-4  | Fourth    | A thin-walled vessel bends what is behind it like a solid block | Frame: straight lines behind an empty glass displaced or smeared across its middle, not only at its edges; source: `thickness` far above the wall | Refraction strength near the real wall; strong bending only at the silhouette |
| MAT-G4-5  | Fourth    | Metal reflects a world that is not the set: faces go magenta, blue, olive or black in a warm room | Frame: metal pixels in shade whose hue is more than 40 degrees from the set's; source: a library HDRI as the metal's reflection, a grade lift on one channel | A reflection probe baked from the set, a reflector card where the metal needs to read (`pipeline.md`), a lift that keeps hue order |
| MAT-G4-6  | Fourth    | The contents of a glass vessel turn see-through at its walls: grain or floor runs across them | Frame (J): texture from outside the vessel crossing objects inside it near the walls | Refraction strength near the real wall; reflections on the glass from a probe of the set, not of a floor |
| MAT-G4-7  | Fourth    | Glass shows a world that is not the set: stone, sky or a studio in its base or walls | Frame (J): texture in the glass, through it or reflected, that exists nowhere in the room | A reflection probe placed where its lower hemisphere sees the set; refraction sampling the stage, not a library HDRI |

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
