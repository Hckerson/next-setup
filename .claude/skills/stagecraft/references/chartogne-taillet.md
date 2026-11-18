# Chartogne-Taillet

| Field      | Value |
| ---------- | ----- |
| Source     | https://chartogne-taillet.com/ (Awwwards Site of the Day 2020-12-02, 7.93; CSSDA Website of the Day 2020-12-23; by Immersive Garden with Bruno Simon) |
| Live       | yes, checked 2026-11-13 |
| Builder    | custom: a Vue CLI app (`chunk-vendors.<hash>.js`, the "chartogne-front doesn't work properly without JavaScript" noscript) |
| Actor route | C real-time 3D. The app bundle names seven hashed `.glb` files and a Draco loader, and builds `ShaderMaterial`s for the engraved look |
| Set        | `miniature-world`, drawn in an engraving idiom that borrows from `print-catalogue` |
| Arc        | `scale-shift`: the camera climbs from the village to the map, and dives from the map into a single plot |
| Measured   | 1440×900: ground L 0.857, ground range 0.035, ground hue 45, accent hue 39, bright share 0.372. 390×844: ground L 0.880, range 0.076, ground hue 44, accent hue 47, bright share 0.465 |
| Stack      | three.js `WebGLRenderer` with `shadowMap`, `DirectionalLight` and `EffectComposer`; GSAP (ScrollTrigger strings present); Howler for sound, with cues named for the modes (`Loop-FreeMode`, `Loop-Parcelle`, `FM vers AQUA`, `Change village`, `Vers carte`). The window has no scroll range; wheel input drives the scene |
| Captured   | 2026-11-13, `tools/shoot.mjs` with `--click "Enter"`, wheel-driven over 8000px, 11 frames at 1440×900 plus 0 and 0.5 at 390×844 (`--settle 15000`), in `~/.cache/stagecraft/captures/b/chartogne-taillet-*`. A run that also clicked a plot name failed: the page threw texture errors and rendered blank, so plot travel on desktop was not captured. The cookie bar sits over the plot timeline in every desktop frame |

## Actor and destination

The world is the actor: the grower's two villages and their vineyard plots, rebuilt in 3D and drawn as an old engraved cadastral map. It stands for the claim that each wine comes from a named plot with a history. The visitor's viewpoint is marked by a red compass reticle at the centre of the frame (0_1, 0_6). There is no traveller inside the world. The destination is a plot: the timeline at the bottom lists 14 plots, numbered 1 to 14, plus "Avize →" for the second village. On phone, entering a plot turns its engraved vignette into colour (phone-0_5).

## What moves

Wheel input drives the opening. Shares are of the 8000px wheel run.

| Share | Shot | Verbs |
| ----- | ---- | ----- |
| 0 | Title "Parcelles de Chartogne Taillet" set as single letterspaced capitals on laid paper, with a scrap of engraving ghosting between two letters (0) | Hold. The plot timeline is already on screen |
| 0–0.1 | The village and its vine rows in 3D from a high three-quarter view, drawn as an engraving; the far fields fade out into the paper (0_1) | The title gives way to the world, and the camera holds high over the village |
| 0.1–0.2 | Straight top-down map plate titled "Merfy et Saint Thierry", with grid references A–E and 0–7, a framed inset of the second village, and a rotated "Avize et Oger" label pointing to it (0_2) | The camera climbs and flattens the village into the map |
| 0.2–1 | The same plate. The "Avize et Oger" label sits slightly differently at 0_6 than at 0_2; frames 0_3 to 1 measure the same (mean L 0.773–0.775) | Settle, then nothing more on the wheel |

On phone the entry is different. It opens on plot 1, "Les Barres": an engraved vignette of workers in the vines inside a shield shape, with Explore and Discover, arrows either side and a 14-segment progress bar (phone-0). The wheel bursts the engraving into a cloud of watercolour dots that reveals the vine row in colour (phone-0_5). The sound cue names (`FM vers AQUA`) confirm a free mode, a watercolour ("aqua") mode and a map mode.

## Layout

```
+-----------------------------------------------------------+
| M E                 MERFY ET SAINT THIERRY        J  MAP  |
| N U   0     1     2     3     4     5     6     7  ---->  |
| A +--------------------------------------------------+    |
|   |         engraved map plate              +------+ |    |
| B |                    (o) N                | inset| |    |
| C |   AVIZE ET OGER >                       +------+ |    |
| D +--------------------------------------------------+    |
|   1    2    3    4 ...                 14                 |
|   Les Barres  Les Oriseaux ... Les Heurtes Bises  Avize > |
+-----------------------------------------------------------+
```

The menu is a stacked "ME / NU", with a music-note sound toggle and "MAP" with an arrow rule at top right. The plot timeline is the only persistent control. There is no CTA button.

## Art direction

**Ground.** Warm laid paper with a visible texture (ground L 0.86 desktop, 0.88 phone); every frame is printed onto it. **Ink.** A dark warm grey line for everything. The only colour is the red compass reticle and the watercolour burst on plot entry. **Type.** One old-style serif in letterspaced capitals for titles and plot names, as type set on an engraved plate. **Texture.** Hatching on fields, stippled trees, a sheet grain under everything. No bloom and no glow.

**Camera.** A high three-quarter view over the village (0_1), then straight down for the map (0_2). The far edge of the village dissolves into the paper instead of a sky, which works like the set's depth-of-field band.

**Light.** One directional light with shadows (`DirectionalLight` and `shadowMap` in the bundle). At 0_1, houses and tree clumps are shaded on one side and drop soft grey shadows onto the fields. Because the shadows are rendered as ink tone, the light reads as engraving shading, not as a sun with a time of day.

**Materials.** One material language. Every surface is an engraving on paper: hatching on the vine rows, stippling on trees, and roofs drawn as line work.

## Why it works

- The world is drawn in the client's own heritage document: the cadastral map that named the plots. That answers the set's failure mode (generic city blocks with no link to the client).
- The scale moves follow one sheet of paper: title plate, then the village in relief, then the flat map, then a single plot in colour. Each is a different printed object, but all share one ground and one ink.
- Colour is held back until the visitor dives into a plot, so the colour burst is the reward.

## Borrow / avoid

Borrow: a world drawn in the client's own historical document form; a far field that dissolves into the paper instead of a sky; withholding colour until arrival; one persistent index of places as the only navigation; sound cues per mode. Avoid: the engraving of these villages, the plot names and the champagne story; a phone entry that skips the flyover; plot travel that only works by clicking.

## Ladder

**Grade: Fifth with gaps.**

1. Every frame could hang on a wall. The title plate (0), the engraved village (0_1) and the map plate with grid and inset (0_6) are each a finished print in one idiom.
2. Physics: the watercolour burst on plot entry (phone-0_5) is particle-based. Whether it is simulated and scrubs both ways was not verified.
3. Light has a source: one directional light whose shadows fall as ink tone (0_1). It has no time of day.
4. The visitor is inside it: their wheel dives into a plot and turns the engraving into colour (phone-0, phone-0_5). Sound follows the mode. Nothing reads the visitor's own time or place.
5. One film on every device: only partly. The phone shows the same world in the same ink, but it enters on a plot with arrows instead of the village flyover.

Signature move: the world is drawn as the client's historical map, and colour arrives only on arrival.

Fourth-generation tells: none of the cluster. The ground is light paper, nothing glows, and there is no floating hero.

Gaps:
- Scroll drives only the opening (0 to 0_2). After that the wheel changes nothing on desktop, and plot travel is by click.
- No actor travels the world; the camera's reticle stands in for one.
- Set pieces reacting to a passing actor were not seen.
- The build is from 2020.
