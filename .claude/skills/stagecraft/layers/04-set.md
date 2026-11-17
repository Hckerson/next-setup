# Layer 4: Set

The world around the actor: ground, environment, props, atmosphere. The set file in `sets/` gives the point of view; this layer grades the build. Upstream: light.

## Tells

| ID        | Gen       | Tell                                                                     | Detector                                                                        | Instead                                                               |
| --------- | --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| SET-G0-1  | Pre-first | A void: the actor on a flat clear colour, in a set that needs a ground   | No ground mesh; frame: no surface under the actor                               | A surface the actor belongs to                                       |
| SET-G1-1  | First     | A backdrop photograph behind a cut-out, perspective and light mismatched | Frame: horizon and shadow direction disagree between backdrop and actor          | A set built or captured to one camera and one light                  |
| SET-G3-1  | Third     | A gradient sky dome, a floor grid, low-poly stock props                  | Gradient background shader; stock prop names; frame: uniform gradient behind    | A set with material and purpose                                      |
| SET-G4-1  | Fourth    | An infinite dark void with a reflective floor                            | Frame ground luminance below 0.12 with a mirror plane                           | A place, or a sweep whose colour comes from the actor                |
| SET-G4-2  | Fourth    | Props as decoration: floating spheres and shapes with no job             | Props with no reference in the script                                           | Every prop has a story job                                           |
| SET-G4-3  | Fourth    | Built worst where the lens is closest: the foreground smears                | Frame: `softestForeground` below 0.5 where no depth of field was chosen; source: textures without anisotropic filtering, a texel larger than a pixel at the nearest visible point | Anisotropy at the device maximum; texel density checked at the nearest point of every shot; foreground detail (seams, wear) |
| SET-G4-4  | Fourth    | A drawing set with no sheet: a grid edge to edge, with no border, rulers, title block or view labels | Frame (J): the ground is grid wallpaper; nothing names the drawing, its scale or its view | A sheet framed by the camera: border with tick rulers, a title block whose fields change with the script, view labels |
| SET-G4-5  | Fourth    | A sparse drawing: a lone outline on an empty sheet, no information on the actor's half | Frame (J): the actor's half of a line frame carries no dimension chain, section, detail callout or leader | Each shot carries information where the eye lands: dimensions, a section, a detail, a callout tied to the story |

## Floor versus baseline

A competent fourth puts the actor on a tasteful seamless ground. It lacks a place: nothing says when, where or why.

## Baseline

1. A ground or surface the actor belongs to, with a material and a scale. `(J)`
2. Every prop has a story job: a cause, a scale cue or a destination. `(J)`
3. Atmosphere is decided: clear, haze, dust or steam, per the world rules. `(J)`
4. The set changes with the story: time of day, place or season, not a static backdrop. `(J)`
5. Built to the camera: detail only where the lens sees it. `(J)`

## Asset roles

Ground textures and set dressing from CC0 libraries, scans or Blender; an HDRI that matches the set's place; baked lighting for everything that does not move.

## Checks

- `[source]` Every prop appears in the script or the world rules.
- `[frame]` The ground's colour or light changes across the shots as the world rules say.
