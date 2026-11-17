# Assets

The concept is free; the actor has to exist. Most clients have photographs, not 3D models. This file turns whatever they have into an actor, and states what it costs before anything is built.

## Intake

Ask in step 0, then place the client on a tier. Tier by the best asset they have, not the one they wish they had.

| They have                                       | Tier  | Actor is made by                                                                                  |
| ----------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------- |
| A clean 3D model or CAD file                    | **A** | Optimise (`gltf-transform`), name the parts and materials, build colourways as part masks         |
| A model that is not web-ready, or heavy photoreal | **B** | Render a frame sequence in Blender (free) and scrub it; no live recolour, so render each variant   |
| Product photographs from several angles         | **C** | 2.5D: cut-out plates with a depth map, a small camera move, a recolour by mask, a contact shadow   |
| One photograph, or none                         | **D** | Generate: an image-to-3D service, or an illustrated or vector actor; then review by hand           |
| A non-physical product                          | **E** | Design the artefact of use as vector or simple 3D: a card, a ticket, a key, a measurement        |

A tier is not a quality ranking. A well-drawn vector actor in a print set is fifth generation; a stretched, badly cut photo in tier C is not. Choose the tier the concept needs and the client can supply.

## Costs, stated up front

The concept names, for every asset, **what it is, where it comes from, and what it costs after any free trial.** Approving the concept approves them.

| Source                        | Cost to state                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| Blender, `gltf-transform`     | Free                                                                                       |
| Local depth and cut-out models | Free to run, needs a capable machine and a download                                       |
| Image-to-3D, image or video generation services | Several offer free credits or a trial. Check the current terms at the time of use; do not rely on this file for prices. State the free allowance, what it covers, and the paid price after it |
| Stock models or textures      | Licence and price per asset                                                                |
| A photographer or a 3D artist | The client's call; give an estimate of the shots needed                                    |

Never shrink the concept to avoid paying. If the best concept needs a paid asset, say so with its price and a free fallback of lower fidelity.

## Fetching CC0 assets

`tools/assets.mjs search <category> --type hdris|textures` lists Poly Haven assets; `get <id> --type textures --res 2k --maps Diffuse,Rough,nor_gl --out public/stage/<feature>` downloads them and records each in the folder's `manifest.json` with source, licence (CC0), authors and real-world dimensions in millimetres, so materials are scaled to size. Every baked or rendered output is recorded the same way: `generated <id> --tool <script> --spec <spec.json> --files a,b --out public/stage/<feature>` writes its tool, the spec that made it and its file sizes. Offline modelling, baking and rendering are in `pipeline.md`.

## Preparing the actor

- **States are data.** The actor's variants live in `lib/data/<feature>.ts`: name, colours as tokens, material parameters, and for tier A or C the mask or part each colour applies to. A recolour verb reads this; it never hardcodes a colour.
- **Parts.** Name meshes and materials in the source so a recolour can target the upper, the sole, the lid. Unnamed meshes cannot be recoloured.
- **Contact.** Every actor has a footprint for its contact shadow and a height reference for lift and land.
- **Provenance.** Record where each asset came from and its licence in the stage brief's asset manifest. A client asset is the client's; a generated asset needs its terms checked.
- **Weight.** Models: optimise geometry with meshopt and textures with KTX2 or WebP; budget the first load so the copy never waits (`techniques.md`).
- **Posters.** Every actor has a still for first paint, for no-GPU, and for reduced motion: the peak shot.

## Placeholders first

Grey blocks are a layout check on the maker's machine and nothing more: they are Pre-first and are never shown to the owner (`SKILL.md`, The bar). Real assets enter at look development (`SKILL.md` step 4). The compiled script does not change when an asset is swapped; if it must, the script was carrying the look.

## When an asset is not good enough

Report it. Name the shot it weakens and what would fix it (a better photograph, a re-render, a paid generation). A weak asset presented as a finished page is the failure this file exists to prevent.
