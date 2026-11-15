# Layer 1: Form

The actor's shape: silhouette, proportion, edges, detail, scale. Upstream of everything; a weak form cannot be lit into a strong one.

## Tells

| ID        | Gen       | Tell                                                                                   | Detector                                                                                   | Instead                                                                              |
| --------- | --------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| FRM-G0-1  | Pre-first | Primitive boxes, spheres or cylinders standing in for an actor in anything shown       | `boxGeometry`, `sphereGeometry`, `cylinderGeometry` as an actor outside an animatic route; frame: actor silhouette is a rectangle | The actor's real form from the pipeline (`assets.md`)                                 |
| FRM-G1-1  | First     | A photograph pasted flat as the actor                                                  | `planeGeometry` with a photo texture and no displacement or depth                          | A model, or 2.5D plates with a depth map                                             |
| FRM-G3-1  | Third     | Razor-sharp CG edges that catch no light                                               | Asset: no bevel loops; frame: hard aliased edges with no highlight line                    | Bevels at the real radius: a coin's milled rim, a jar's rolled lip                   |
| FRM-G3-2  | Third     | Wrong scale: detail density reads as a toy or a building                               | Frame: detail frequency against the actor's size on screen; no known-size object in a scale-critical shot | Detail density matched to real size; a known-size prop when scale matters  |
| FRM-G4-1  | Fourth    | Flawless CAD form with no manufacturing logic                                          | Asset: no seams, threads, parting lines, print or stitching on the hero                    | The form shows how it was made                                                       |

## Floor versus baseline

A competent fourth is a clean model with correct proportions. It lacks evidence of making and of scale, so it reads as a render, not a thing.

## Baseline

1. The silhouette identifies the product in one frame at 64px tall. `(J)`
2. Edges carry bevels at the real-world radius. `(J)`
3. The hero shows its manufacture: seams, threads, mould lines, print, labels. `(J)`
4. Detail density matches real size; a shot that depends on scale has a known-size object in it. `(J)`
5. A polygon budget per device tier, with a lighter level of detail for phones that keeps the silhouette. `(J)`

## Set notes

- **paper-cut:** form is cut edge and sheet thickness; the bevel is the paper's edge.
- **technical-drawing:** form begins as lines and resolves to a solid; the solid still meets this baseline.
- **colour-field:** simplified form is allowed; bevels and silhouette still are not optional.

## Asset roles

A model in real-world metres, parts named for the recolour and motion verbs, the pivot at the contact point, levels of detail per tier.

## Checks

- `[source]` No primitive geometry stands in for an actor outside an animatic route.
- `[asset]` `gltf-transform inspect` lists named parts, bevels on hero edges and triangle counts within the tier budget.
- `[frame]` At the peak shot, the silhouette is recognisable at 64px tall (downscale the frame).
