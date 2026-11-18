# Layer 3: Light

Where the light comes from and what it does. The layer that most separates a render from a photograph. Upstream: form, material.

## Tells

| ID        | Gen       | Tell                                                                             | Detector                                                                                      | Instead                                                                          |
| --------- | --------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| LGT-G0-1  | Pre-first | No light: an unlit render, no shading, no believable shadow                      | No light in the scene; actors unlit                                                           | A named source                                                                   |
| LGT-G1-1  | First     | Light painted into a photo that disagrees with the stage's light                 | Frame: shadow direction on the photo against the scene's key                                  | One light direction for photo and stage                                         |
| LGT-G3-1  | Third     | The default rig: ambient plus one white directional, no shadows                  | `ambientLight` and `directionalLight` only; no `castShadow`                                   | A designed rig from the set's rules                                             |
| LGT-G3-2  | Third     | Shadows that are aliased or never touch the ground (a hard sun shadow is correct in daylight; judge contact, not hardness) | Default shadow map size; no contact shadow or ambient occlusion                               | Soft area shadows with contact hardening; contact shadow and occlusion           |
| LGT-G4-1  | Fourth    | A studio HDRI as the only light: evenly reflective, no direction                 | Environment set; no directional, spot or area light casting                                   | A key with direction; the environment only for reflection and fill              |
| LGT-G4-2  | Fourth    | Glow as light: bloom and emissive carry the frame                                | `bloom(`, emissive intensity above 1, frame bright share above 0.15 with halos (a bright region whose falloff is wider than the object casting it); a high bright share with hard edges is overexposure (RND-G4-3), not glow                           | Light from a source that casts; glow only at the source                          |
| LGT-G4-3  | Fourth    | Clear glass in direct sun casts a solid, even shadow with no caustic             | Frame: the glass's shadow as dark as an opaque one and even inside; source: glass casting a default shadow, no `shadow` on its look, no caustic in the bake | A pale tinted shadow (`createGlass` `shadow`, the bake's `"shadow": "transparent"`); a solid or filled glass also throws a bright focused caustic (a `caustic` catcher in the bake). An empty thin-walled vessel focuses little: bright edge lines, not a pool (`pipeline.md`) |
| LGT-G4-4  | Fourth    | The sun lights the set but never the hero: a sun patch on the wall, window shadows on the floor, and the hero lit soft and broad | Frame (J): the hero has no hard shadow, no glint and no edge of sun while the set shows a sunlit patch; or the sun's stripe crosses the hero and the hero casts nothing | Stage the hero in the beam: the sun crosses it, it casts a hard shadow and catches glints; meter exposure on that |
| LGT-G4-5  | Fourth    | A cast shadow as a decal: a fixed-width offset copy of the object, or shadows pointing two ways | Frame (J): shadow width constant along an edge, no hardening at contact, or two shadow directions in one frame | One source casts every shadow; hard at contact, softer with distance, on every edge away from it |

## Floor versus baseline

A competent fourth is lit with an HDRI and a soft key. It lacks a point of view: no time, no direction you could name, nothing the light reveals.

## Baseline

1. A named source with direction, quality, colour temperature and time, recorded in the stage brief. `(J)`
2. The key-to-fill ratio is a decision, recorded; never 1:1 by default. `(J)`
3. Contact: every actor touching a surface has a contact shadow or occlusion. `(J)`
4. Bounce: indirect light on the static set from a baked lightmap, probes or screen-space GI. `(J)`
5. Light reveals material: a grazing or rim light shows the hero's texture or edge in the peak shot. `(J)`
6. Light effects come only from the source: caustics from glass, shafts through an opening, dust in a beam. `(J)`

## Set notes

- **daylight-location:** the sun is the clock; its angle and colour are script variables.
- **studio-sweep:** one key, a fill and a bounce card; shadow softness is a token.
- **night-luminous:** the source is in frame or implied by what it lights; darkness is earned.
- **print-catalogue, colour-field:** flat light is allowed and recorded; contact still applies where depth exists.

## Asset roles

Baked lightmaps for static sets (Blender Cycles), an HDRI for reflection and fill (CC0), light probes, a projected texture for caustics or a window shadow when real-time caustics are too costly.

## Checks

- `[source]` The rig is not ambient plus one directional; casting lights have shadow maps sized by tier.
- `[frame]` A shadow is measurably present under every grounded actor at rest.
- `[frame]` The peak shot's highlight direction matches the named key.
