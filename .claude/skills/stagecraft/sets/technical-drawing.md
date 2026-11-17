# Set: technical-drawing

**Point of view.** The product explained as a drawing that builds itself: orthographic views, callouts, an exploded stack that reassembles.

**Core axes.** Orthographic views, line work that draws itself, annotations as the copy, an exploded and an assembled state.
**Free axes.** Line weight and colour, how much the drawing becomes a solid, sheet format.

| Rule     | Realisation                                                                              |
| -------- | ---------------------------------------------------------------------------------------- |
| Light    | None until the drawing resolves to a solid, then one named source                        |
| Ground   | A sheet; the grid is part of the set                                                      |
| Lens     | Orthographic, locked to named views                                                       |
| Mass     | Parts have travel and a seat: a part slides, stops, locks                                 |

**Failure mode.** A wireframe filter on a 3D model with no annotation: decoration with no information. Also a grid edge to edge with no sheet (SET-G4-4).

**Grading notes for the critic.** The line states are unlit by this set's rule, so LGT-G0-1, MAT-G0-1 and RND-G4-5 do not apply to them; light and material are graded on the frames where the drawing resolves to a solid, and the solid still meets every baseline (one solid frame sets those layers). Focus does not apply to an orthographic drawing (CAM-G4-2, camera baseline 3); its substitute is a hierarchy of line weight and one accent. The tonal range of a line state is ink against paper: judge the ink's contrast, not `flattestRange`, because ink under 1 percent of the pixels never reaches the first percentile. Paper, cards and screens are rectangles by nature, so FRM-G0-1's silhouette detector does not apply to them. The lens is locked by rule, so CAM-G1-1 and CAM-G4-1 do not apply; the check is that the named view changes per shot. `flattestRange` never applies to a line state, however much ink it carries. CAM-G4-3 exempts extension and dimension lines, which sit on an actor's edge by convention. MAT-G4-1's variance detector applies to solid frames only. A push-in that crops the sheet is not wallpaper while part of the border, the title block or the sheet's edge stays in view. A solid object on the desk stands proud of it (a stuffed envelope about 3 mm): at 0.2 mm its cast shadow was unmeasurable and a critic read it as casting nothing. Its shadow must come from the set's named source, hard at contact and softening with distance, on every edge away from the sun: a fixed-width slab on one side reads as a decal. Oblique dimension text in an isometric view follows the ISO 129 rule: it reads from the bottom or the right of the sheet, never running down-right steeper than 30 degrees. A lighter outline on a panel that sits under another is a fault unless drawn as a hidden line (dashed). Density is part of the set: a lone outline on an empty sheet passes every line tell and still sits far below the exemplar; each shot carries information on the actor's half of the sheet (a dimension chain, a section, a detail callout). Amounts on a printed actor are right-aligned to its column width. A flat object of even thickness casts a constant-width shadow by physics: judge the decal tell by whether every occluding edge casts, not by width. The named view must change in geometry, not only in its label. World callouts are not `[data-copy]`, so measure their contrast by hand. Any shading in a line state (a stipple, a soft shadow, occlusion) breaks the light rule and counts as LGT-G0-1's opposite: light before the solid. The margin between border and trim may carry the grid.

**Measured on Receipt (2026-11-14).** A sheet framed exactly by the camera (16:10 to the frame), with a border, tick rulers, a title block and view labels, is the set's ground; a pad running past the frame edges is wallpaper. Faces that hide lines behind them are ink fills of the paper's colour. Leaders must point at something still on the sheet.

**Exemplars.**

- `references/heron-ai.md` (captured 2026-11-13): Fifth with gaps. An elevation draws itself, plan fragments seat into a dimensioned plan, and the callouts are the copy. Scroll is hijacked.
- A second exemplar is open.
