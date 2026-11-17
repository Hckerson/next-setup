# Techniques

How a stagecraft page is built in this starter. Mechanics only; the concept comes from SKILL.md steps 0 to 3 and the look from the set.

## The stack

Each job has one library, chosen as the best available, not the most common. Versions are pinned exactly in `package.json`. Upgrade three on purpose and re-read its migration notes: the TSL API moves (`PostProcessing` became `RenderPipeline` in r183).

| Job                | Library                                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| Renderer           | `three` on `WebGPURenderer` (`three/webgpu`) through `@react-three/fiber` 9; WebGL2 fallback built in |
| Shaders            | TSL (`three/tsl`): one source compiles to WGSL and GLSL                                               |
| Light chain        | three `RenderPipeline` with the TSL display nodes (`three/addons/tsl/display/*`)                      |
| Timeline           | `gsap` ScrollTrigger: one master timeline per scroll track                                            |
| Smooth scroll      | `lenis`, driven by `gsap.ticker`                                                                      |
| Line reveals       | GSAP SplitText                                                                                        |
| SVG devices        | GSAP MorphSVG, DrawSVG                                                                                |
| Scrubbed video     | `mediabunny` `CanvasSink` (WebCodecs)                                                                 |
| Pointer inertia    | `maath` `easing.damp` in the frame loop                                                               |
| Colour from tokens | `colorjs.io`                                                                                          |
| Assets             | `@gltf-transform/cli` (meshopt geometry, KTX2 textures) and drei loaders                              |
| Adaptive quality   | drei `PerformanceMonitor`                                                                             |
| Measurement        | `stats-gl` (dev only): GPU time on both backends                                                      |
| Font metrics       | `@capsizecss/metrics` (dev only): the display face's extent for the glyph bleed                       |

## Actor and script

The performance is data. `lib/types/stage.ts` defines the script (shots, each a list of moves with `at` and `length` as fractions of the shot) and the actor handle. `compileScript(film, script, context)` in `lib/stage/compile-script.ts` adds every move to one master timeline, so `useStageTimeline`'s `compose` is one call.

| Piece                                   | File                                | Does                                                                                                                              |
| --------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `createActor(rest)`                     | `lib/stage/actor.ts`                | A handle: position, rotation, scale, presence, tint (from, to, mix, wipe). Components read it; moves write it                      |
| Moves                                   | `lib/stage/moves/`                  | One function per verb (`verbs.md`). Position moves tween the handle; path and recolour tween a proxy and write the handle in `onUpdate`, so scrubbing both ways is exact |
| `settle`, `rebound`, `anticipate`, `smoother` | `lib/stage/ease.ts`           | The mass curves. `rebound` never passes through a surface; use it for any move that ends on one                                  |
| `shadowScale`, `shadowOpacity`          | `lib/stage/shadow.ts`               | The contact shadow from the actor's height                                                                                         |
| `createPath`, `headingAt`, `turnAt`     | `lib/stage/path.ts`                 | A centripetal Catmull-Rom path, the heading along it and the turn rate that banks the actor                                       |
| `exposeStage(context)`                  | `lib/stage/debug.ts`                | Development only: `window.__stage.snapshot()` returns each actor's position, presence and tint, so `tools/shoot.mjs` can assert the script happened |
| `exposeBoxes(fn)`                       | `lib/stage/debug.ts`                | Development only: `window.__stageBoxes()` returns each actor's screen box (from `screenBox` in `lib/stage/screen-box.ts`), so the capture tool measures the actor's material variation and the darkness under it |
| `loadBakedRigid`, `sampleBody`          | `lib/stage/baked-rigid.ts`          | Plays a baked rigid-body simulation: a meta file validated by `lib/validations/baked-rigid.ts` and a binary of 8 floats per body per frame (position, rotation quaternion, presence). Positions lerp and rotations slerp between frames, so any scroll progress is exact in both directions |
| `simulate` verb                         | `lib/stage/moves/simulate.ts`       | Drives a simulation's progress from the script, like any other verb |
| `sunAt`, `hourOf`, `kelvinToColor`      | `lib/stage/sun.ts`                  | The sun's direction and colour for an hour; `hourOf(new Date())` gives the visitor's own time for the visitor-local-time signature |
| `projectToScreen`, `WorldAnchor`        | `lib/stage/world-anchor.ts`, `components/wrappers/world-anchor.tsx` | Text in the world: a real DOM element pinned to a 3D point by a transform each frame, hidden when the point is behind the camera |
| `focalToFov`, `frameShot`               | `lib/stage/lens.ts`                 | Shots are framed by focal length in millimetres (full-frame sensor), never by a raw fov |
| `arc`, `lathe`                          | `lib/stage/profile.ts`              | Turned objects from a profile with real fillets: jars, coins, bottles, cups |
| `noiseTexture`                          | `lib/stage/noise-texture.ts`        | A deterministic roughness or wear map, for imperfection where no scanned map exists |

Rules the code relies on:

- **Every move states its start.** `enter`, `exit`, `lift` and `land` carry explicit `from` values, so a tween never reads a state set by an earlier tween. A scrubbed timeline jumped to the middle must give the same result as one played through.
- **Mass tokens come from the build.** `context.mass` has no defaults in the library. A default is a look chosen by nobody.
- **Scene lengths are timeline units.** Every shot, cue and reveal is a fraction of the one timeline. A tween measured in seconds stretches the timeline and shifts every later scene (measured: reveals of 1.3 s on a timeline of length 1 put the last scene at 45 percent of the scroll).
- **The script contains no values that belong to an asset.** Swapping a placeholder for the real actor changes no script line.

## Look modules

Materials, light rigs and baked playback that any build reuses. Each takes a look or rig object from the build's `lib/<feature>/constants.ts`, typed in `lib/types/look.ts`; none holds a value of its own that decides a look. A build that needs a new material or rig adds it here, generic, before using it; a module written inside one build's folder is a copy waiting to happen.

| Module                                                | File                                                    | Does                                                                                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `createGlass(look)`                                   | `lib/stage/look/glass.ts`                               | Clear or tinted glass: transmission with a thickness, measured IOR, an attenuation colour, and a smudge roughness map between two values. It writes the depth of what lies behind it where it faces the camera and its own depth toward its silhouette, so the lens blurs the view through it like the view beside it while its rim and print stay sharp. `look.smudge` adds a clearcoat with a patchy roughness: fingerprints that show only where the glass reflects something bright. `look.shadow` gives it the pale tinted real-time shadow real glass casts (light through it becomes `tint` at `opacity`); needs `StageCanvas colouredShadows` |
| `createMetal(look, maps)`                             | `lib/stage/look/metal.ts`                               | Any metal from its measured reflectance (F0, linear) with required roughness and normal maps: a metal without them is a tell             |
| `applyEnvironment`, `reflect`, `tile`                 | `lib/stage/look/environment.ts`                         | The HDRI as scene light; the HDRI on a material's own reflection (WebGPU ignores `envMapIntensity` without it); textures tiled in metres   |
| `WindowSun`, `placeSun`, `placeWindow`                | `components/wrappers/window-sun.tsx`, `lib/stage/window-sun.ts` | A sun for an hour (`sunAt`) through a window opening with bars, plus sky and bounce fill. `baked` stops the window casting real-time shadow when the bake already holds it |
| `ShotKey`                                             | `components/features/shot-key.tsx`                      | A per-shot key light from the shot's framing, for a close-up the sun alone leaves flat                                                    |
| `withLens`, `createLens`, `focusLens`                 | `lib/stage/depth-of-field.ts`                           | Depth of field from the shot's real lens: focal length, f-number (`aperture`) and focus distance give the thin-lens circle of confusion at every depth, capped at 24 px. `withLens` is its own depth-aware gather (64 taps on a golden-angle disc), not three's `dof`: a tap counts only if its own blur disc reaches the pixel, and a tap from behind spreads no further than the pixel's own blur, so a sharp detail never bleeds into the background and the background never smears over a sharp edge. A shot without an aperture renders sharp |
| `withGrade`, `createGrade`                            | `lib/stage/grade.ts`                                    | The grade: a split-tone (`split`: shade and light tints blended by luminance around a pivot, so shade is cooler than sun, not a darker multiply), saturation about luminance, a per-channel gain (white balance) and a per-channel lift, as uniforms a timeline can move per shot. Runs on the scene pass, before the lens (all three are linear, so the order does not change the result): `withLens(lens, withGrade(grade, withOcclusion(look)))` |
| `exposeShot`, `focusDistance`                         | `lib/stage/lens.ts`                                     | Exposure per shot, metered on the hero (`shot.exposure`); `shot.roll` turns the camera about its axis (degrees), to stand a mark upright or tilt a horizon; the depth of the shot's `focus` point along the view axis. Focus on the surface the eye lands on, never the aim point: a macro aimed into a pile focused 5 cm behind the faces and blurred the whole frame |
| `withOcclusion(look)`                                 | `lib/stage/occlusion.ts`                                | A `useRenderPipeline` compose that adds GTAO to the scene pass: contact darkening where objects meet                                     |
| `poseInstances`, `varyInstances`                      | `lib/stage/instances.ts`                                | Plays a baked simulation on an instanced mesh at any progress; gives a seeded share of the instances a tint (age, wear, a second finish)   |
| `WindowSun` `onLight`, `hour`                         | `components/wrappers/window-sun.tsx`                    | `hour` moves the real-time sun each frame; `onLight` hands its light to `BakedSet` as `direct`, so a bounce bake takes the sun in real time and nothing else |
| `BakedSet`, `applyLightmaps`, `keyAt`                 | `components/wrappers/baked-set.tsx`, `lib/stage/baked-set.ts`, `lib/stage/sun.ts` | Loads the GLB from `tools/blender/bake_set.py` and puts its lightmaps on UV1, blending sun keys by the `sunKey` uniform; `keyAt` turns an hour into a key. Full bakes render unlit plus the lightmap; bounce bakes take the `direct` lights in real time (`pipeline.md`) |
| `InkLines`, `createInkGeometry`, `createInk`          | `components/wrappers/ink-lines.tsx`, `lib/stage/ink.ts` | Line work that draws itself: each path a ribbon of real pen width in world units with square caps, filled paths for arrowheads, ordered by length so the pen moves at an even pace. Reads its actor's `drawn` layer and fades as the actor resolves. The one place unlit material is allowed (`stage-tells` allows files named `ink`) |
| `dashDot`, `arrowHead`, `dimension`, `leader`         | `lib/stage/drafting.ts`                                 | Technical-drawing primitives: centre and fold lines, dimension chains with extension lines and filled arrowheads (the offset falls to the left of the direction measured), leaders |
| `FoldStrip`, `layoutStrip`                            | `components/wrappers/fold-strip.tsx`, `lib/stage/fold.ts` | Panels joined at creases around a root panel (a letter fold keeps the middle still); each hinge pivots above the paper by its stacking order, so the outer flap lands on top. Driven by the `fold` verb |
| `WorldSurface`, `surfaceMatrix`                       | `components/wrappers/world-surface.tsx`, `lib/stage/world-anchor.ts` | Real DOM text laid onto any 3D rectangle (a receipt's print, a label, a dimension): exact under an orthographic camera, hidden when the surface turns its back, faded by a level |
| `InkFill`                                             | `components/wrappers/ink-fill.tsx`, `createInkFill` in `lib/stage/ink.ts` | A face in the drawing's paper colour that hides the lines behind it (hidden-line removal in a stack); appears with its outline and fades as the actor resolves |
| `Resolving`, `fadeWith`                               | `components/wrappers/resolving.tsx`, `lib/stage/look/resolve.ts` | A solid that arrives with the `resolve` verb: hidden while its level is 0 (an invisible mesh still writes depth and occlusion, and hid ink behind it), then faded in |
| `frameOrtho`                                          | `lib/stage/ortho.ts`                                    | An orthographic camera framed by a centre and a width in metres, looking straight down; `StageCanvas orthographic` |
| `ShadowCatcher`                                       | `components/wrappers/shadow-catcher.tsx`, `lib/stage/shadow-catcher.ts` | Real-time shadows of moving actors over a baked surface, with holes over footprints the bake already holds                 |

## What the starter ships

Five pieces of wiring and two classes. None of them carries a look: every value that decides how a build looks or moves is a prop from the build's tokens in `lib/<feature>/constants.ts`.

| Piece                                                     | File                                             | Does                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `StageScrollProvider`                                     | `components/providers/stage-scroll-provider.tsx` | Registers ScrollTrigger, SplitText and `useGSAP`; runs Lenis first on `gsap.ticker` with `lagSmoothing(0)`; updates ScrollTrigger on every Lenis scroll; `ignoreMobileResize`; no Lenis under reduced motion. Takes `LenisOptions`.                                                                                                                                |
| `StageCanvas`                                             | `components/wrappers/stage-canvas.tsx`           | R3F `Canvas` on `WebGPURenderer`; advanced from `gsap.ticker` only while on screen; `frameloop="demand"` under reduced motion; DPR range scaled by `PerformanceMonitor`; `aria-hidden`. Tone mapping and exposure are required props. In development, `?webgl` in the URL forces the WebGL2 backend and `data-stage-backend` on the wrapper reports which one ran. |
| `useStageTimeline(trackRef, { compose, peak, defaults })` | `lib/hooks/use-stage-timeline.ts`                | Builds the master timeline under `gsap.matchMedia`: scrubbed by ScrollTrigger over the track, or, under reduced motion, paused at the `peak` label so the page shows its composed still. `compose(film, still)` adds the labels and tweens; `defaults` carries the build's ease token. `compose` and `defaults` must be stable.                                    |
| `useRenderPipeline(compose)`                              | `lib/hooks/use-render-pipeline.ts`               | Builds a `RenderPipeline` from `compose(scenePass, scene, camera)`, renders it at priority 1, disposes it. `compose` must be stable: a module function or `useCallback`.                                                                                                                                                                                                          |
| `usePointerSway(smoothing)`                               | `lib/hooks/use-pointer-sway.ts`                  | Tracks the window pointer (mouse only) and damps it with maath inside the frame loop; returns the damped `Vector2` plus the raw pointer and whether it is present, for picking.                                                                                                                                                                                    |
| `.stage-line`                                             | `styles/globals.css`                             | Glyph bleed for SplitText line masks, derived from `--fonts-display-extent`. See Copy choreography.                                                                                                                                                                                                                                                                |
| `.stage-reveal`                                           | `styles/globals.css`                             | Hides a heading until SplitText has built its masks, only when scripting is on and motion is allowed, with a fallback after `--durations-reveal-fallback`. See Copy choreography.                                                                                                                                                                                  |

Mount `StageScrollProvider` in the stage route group's layout, never the root layout: app screens keep native scroll. Extend these pieces in place; never write a parallel helper.

## The one clock

```
gsap.ticker
 ├─ 1. lenis.raf(time)          smoothed native scroll (added with prioritize, so it always runs first)
 ├─ 2. ScrollTrigger.update()   the master timeline is scrubbed; labels are scenes
 │      ├─ SplitText line tweens → DOM copy
 │      └─ uniform .value tweens → hero state
 └─ 3. advance(time)            R3F renders through the RenderPipeline (frameloop "never")
pointer → maath damp in useFrame → uniforms
```

Scroll, timeline and render land in the same frame, in that order, so the canvas never trails the copy by a frame. Never start a `requestAnimationFrame` loop for stage work, never let R3F run its own loop, and never put a per-frame value in React state.

## Scene container

Every scrollytelling section is a tall track with a sticky stage:

- Outer track height = scenes × `100svh`, as a named class in `styles/globals.css` per scene count.
- Inner stage is `sticky top-0 h-svh overflow-hidden`; the `StageCanvas` or media fills it.
- CSS sticky, not ScrollTrigger `pin`, for the stage: no pin-spacer, no jump on hydration. `pin` is for devices inside one section, such as a pan.

## One master timeline

```tsx
const compose = useCallback(
    (film: gsap.core.Timeline, still: boolean) => {
        SCENES.forEach((scene) => film.addLabel(scene.id, scene.at));
        film.to(
            hero.disperse,
            { value: 1, duration: SCENES[1].length, ease: STAGE_EASE.turn },
            "turn",
        );
    },
    [hero],
);
useStageTimeline(trackRef, {
    compose,
    peak: PEAK_LABEL,
    defaults: STAGE_DEFAULTS,
});
```

- A scene's share of the scroll is its duration on the timeline. Scene ids, positions and lengths live in `lib/<feature>/constants.ts`.
- `scrub: true` with Lenis. Lenis already smooths the scroll; a numeric `scrub` adds a second lag on top.
- The hero's state is TSL `uniform()` nodes; tween their `.value` directly. Copy tweens sit on the same timeline at the same labels. That is what makes the choreography one system.
- Every tween's ease comes from a token, through `defaults` or per tween. GSAP's own default (`power1.out`) is a look chosen by nobody.
- **Reduced motion is the same timeline, paused at the peak.** Copy tweens sit on the timeline too, so seeking to the peak label lands every element in its peak state: that is the composed still. `compose` receives `still` so it can skip anything that only makes sense in motion, such as the intro. Measured: under reduced motion the timeline held at the peak and ignored the wheel; with motion it scrubbed from the first label to the last.
- Overlap neighbouring scenes' copy with the position parameter (`"<+=0.2"`, `"-=0.1"`) instead of leaving an empty beat.

## Copy choreography

- **A hero that is the page's LCP plays on load, by time, not by scroll.** A mount timeline runs the first scene's hero state and reveals its headline immediately; the scroll timeline takes over from the second scene. Never make the largest above-the-fold element wait for the visitor to scroll.
- **Line reveal:** `SplitText.create(el, { type: "lines", mask: "lines", autoSplit: true, onSplit })`, and return the tween from `onSplit` so a re-split on resize or font load keeps its place in the timeline. SplitText's default `aria: "auto"` keeps the text readable to screen readers.
- **No flash before the split.** The server renders the headline visible; the reveal then hides it and slides it in, so without a guard the visitor sees it twice. Add `stage-reveal` to every heading SplitText reveals. The class hides it until its masks exist, but only when scripting is enabled and motion is allowed, so readers without JavaScript or with reduced motion see the text at once. If the split never happens, a CSS fallback shows it after `--durations-reveal-fallback` (2.5s, the good threshold for LCP). Measured: the heading was hidden in its first painted frame and visible once split, it was visible with JavaScript disabled, and a heading that never split appeared at the fallback.
- **Glyph bleed:** the line mask is `overflow: clip`, so at a tight display line-height it cuts descenders (g, j, p, q, y) below the line and accents (É, Å, Ç) above it. Pass `linesClass: "stage-line"` with `mask: "lines"`. SplitText names each mask `stage-line-mask`, and the class in `styles/globals.css` pads each line by the bleed and cancels it with margins on the masks: the layout does not move, and a hidden line still clears its mask.
- **The bleed is derived, not guessed:** `(extent × 1em − 1lh) / 2`, where the extent is the display face's ascent plus descent over its units per em. It resolves on each heading, so it is right for every size, line-height and breakpoint. Set `--fonts-display-extent` in `styles/tokens.css` from Capsize: `node --input-type=module -e "const { default: m } = await import('@capsizecss/metrics/playfairDisplay'); process.stdout.write(String((m.ascent - m.descent) / m.unitsPerEm))"` (font names are camelCase). The starter's 1.4 is a safe ceiling for most faces: too much bleed is invisible, too little cuts glyphs. A second display face sets its own extent on its headings.
- **Measured:** Segoe UI (extent 1.330; the browser reported 1.333) at line-height 0.95 and Playfair Display (1.333) at 0.9 kept every descender and accent inside its mask, with heading heights unchanged to within 0.1px. A fixed 0.1em, the starter's old value, cut 5px of descender and 8px of accent. Padding both sides with `-my` on the line does not work: adjacent negative margins collapse to one, so every line gap grows by the bleed.
- **The mask clips sideways too.** A word wider than its column is cut, not spilled. Size display type so the longest word fits its column at every breakpoint.
- **Type-on:** GSAP TextPlugin, for a single short line that should feel like a system speaking.
- **Stat count-up:** tween a number with `snap`, and set tabular numerals.
- **Nothing moves linearly and nothing starts hard.** Ease out on entry, hold linear, ease in on exit. State ramps inside TSL use smootherstep (zero velocity and acceleration at both ends), written as a TSL `Fn`; the built-in `smoothstep` is cubic. The hero fades in from zero on load, and a field that starts inside the viewport fades in along its length instead of showing a cut edge.

## Pointer with inertia

R3F's `state.pointer` only tracks events on the canvas, and a stage under DOM copy rarely receives them. `usePointerSway` reads the window pointer and damps it in the frame loop with maath (frame-rate independent); the smoothing time is a token. To pick what is under the pointer, ray-cast its raw position against the ground. Touch devices get a slow idle drift instead.

## Mobile

- **Touch keeps native momentum.** Lenis smooths the wheel; leave `syncTouch` off (its default). Turning it on replaces the phone's own inertia with Lenis's, which reads as wrong under a finger.
- **Viewport units:** the track is a multiple of `100svh`. The canvas layer is `h-lvh`, so no gap opens below it when the address bar retracts; copy is anchored inside an `h-svh` box, so it never sits under the browser's UI. The provider's `ignoreMobileResize` stops the address bar from refreshing every trigger.
- **WebGPU on phones:** Safari ships WebGPU from version 26; older iOS falls back to WebGL2 by itself. Verify both on a real phone.
- **30 fps is normal.** iOS Low Power Mode caps animation frames at 30. GSAP and maath damping run on time, not frames, so speeds stay right; check that each scene still reads at 30.
- **DPR:** phones report 3; the top of `StageCanvas`'s range caps it, and `PerformanceMonitor` lowers it further when frames drop.
- **Re-splits:** check on a phone that showing and hiding the address bar does not re-split a heading mid-reveal.

## Loading

- **Copy never waits for assets.** DOM text and its reveal run at hydration; the stage loads behind them through `next/dynamic`, and its scene suspends inside `StageCanvas`.
- **Compile before showing.** TSL pipelines compile on first use and stall the first frames. `await gl.compileAsync(scene, camera)` once the scene has mounted, then fade the hero in from zero.
- **Preload models** at module scope with `useGLTF.preload(url, false, true)` (meshopt on).
- **Image sequences load coarse to fine:** every eighth frame first, then the gaps, so scrubbing works early at lower time resolution and sharpens as frames arrive.
- **Video starts before it finishes downloading:** encode with `-movflags +faststart` so the index sits at the front, and mediabunny decodes the first frames while the rest arrives.
- **No full-page preloader or percentage counter** (DLV-G1-1). If the hero needs heavy assets, its first state is one that needs none, such as the ground, the light or a poster, and the assets arrive inside it.

## Actor routes

The route is chosen from the actor and the asset tier (`assets.md`), never because it is installed. Five exist.

## Route A: procedural field

- Instanced geometry positioned in TSL (`positionNode`), per-instance parameters as instanced attributes, and a few uniforms (state, time, pointer). Shader constants come from the TS constants so there is one source of truth.
- A field that must simulate (flow, flocking, settling) runs as TSL compute (`Fn(...).compute(count)`). Check the WebGL2 fallback for it in verify.
- Noise is TSL's MaterialX set (`mx_noise_float`, `mx_fractal_noise_float`, `mx_worley_noise_float`).
- **`antialias: false` for dense additive fields.** Measured on the first build (Intel HD 620): MSAA alone halved the frame rate on a thousand faint overlapping lines, which show no aliasing.
- Glow: only for the night-luminous set. Additive blending on a node material with `depthWrite: false`, over a ground cleared to the ground token, so density builds the light. Budget the sum of alpha per pixel: a field of fine lines turned white until the line count fell about fivefold and alpha rose (measured, 900 lines at 0.4 alpha read as threads; 14,000 at 0.035 read as fog).
- **Colour temperature is narrow.** A heat ramp reads as heat only when the hot zone is tight around the focal point and the hot token is a saturated gold, not near-white; otherwise the whole field turns silver.
- 2D canvas or SVG only for a few hundred strokes. Measured: 900 strands in 2D canvas ran at 3–13 fps; the same field on the GPU runs at 60.

## Route B: scrubbed media

- **Video:** `CanvasSink` from mediabunny returns the decoded frame for a timestamp. Map the timeline's progress to a timestamp, request that frame, draw it when it resolves, and drop any result older than the latest request. Use `canvasesAtTimestamps` to decode a short window ahead in one pass, and `poolSize` to keep VRAM flat.
- **Encode for seeking, not playback:** every frame a keyframe (`ffmpeg -i in.mov -c:v libx264 -g 1 -an -movflags +faststart out.mp4`), audio stripped. Test on a real phone.
- **Image sequence (fallback, and for browsers without WebCodecs):** 60–150 AVIF or WebP frames, preloaded progressively, drawn at `Math.round(progress * (n - 1))`.
- **Layering:** split the hero into background, subject and foreground plates and move them at different rates for parallax depth.
- **Generated assets:** one style preamble reused verbatim in every prompt so separate renders read as one world. Never bake copy into the media.
- Poster = the peak frame, also used for reduced motion.

## Route C: real-time 3D

- Optimise every model: `pnpm exec gltf-transform optimize in.glb out.glb --compress meshopt --texture-compress ktx2`. KTX2 needs KTX-Software on the machine; without it use `webp` and say so.
- Load with drei's `useGLTF` (meshopt on). drei is used for loaders, cameras and `PerformanceMonitor` only.
- Glass: `MeshPhysicalNodeMaterial` with `transmission`, `thickness`, `ior` and `dispersion`.
- Animate in `useFrame` through refs and uniforms; never set state per frame.
- Load the stage with `next/dynamic` so three stays out of the first chunk and the copy hydrates first. Server rendering the stage is safe (measured: `three/webgpu` imports on the server without error), so `ssr: false` is not required.

## Route D: 2.5D plates

For a client with photographs and no model (`assets.md`, tier C).

- Cut the subject out of each photo (a local cut-out model, or by hand) and estimate a depth map for it. Render each plate as a plane displaced by its depth in the shader; a small camera move then shows real parallax.
- One plate per angle; cross-fade between plates with the camera's heading so the actor appears to turn. Stay within the arc the photos cover: past it the illusion breaks.
- Recolour by mask: a hand-painted or generated mask per part, applied as a tint in the plate's material, driven by the actor's tint handle.
- Contact shadow is a separate plane under the actor, driven by `shadowScale`. A photographed shadow baked into the plate fights it: cut it out.
- Match the light: the photo's light direction is the set's light direction. Choose the set from the photos, not the other way round.

## Route E: vector and 2D

For print, paper-cut, technical and colour-field sets and for non-physical actors.

- SVG for a few hundred paths (GSAP DrawSVG and MorphSVG are in the stack); a 2D canvas or a shader plane for more. Animate `transform`, `opacity` and `clip-path` only in the DOM.
- A stepped time model is a quantised timeline: round the scrubbed time to the frame length (`Math.floor(t * rate) / rate`) before writing state.
- The actor handle is the same; the component writes to a CSS transform instead of a Three group.

## Light chain

Only when the stage brief names emitted light (the night-luminous set). Every other set is lit by a named source with shadows and needs none of this. There is no default budget: each node needs a reason in the stage brief.

```ts
const compose = (scene: PassNode) => {
    const output = scene.getTextureNode("output");
    const glow = bloom(output, LIGHT.strength, LIGHT.radius, LIGHT.threshold);
    return film(output.add(glow), float(LIGHT.grain));
};
```

- Bloom thresholds on luminance, which keeps a warm light's hue. A custom bright pass must do the same: scale the colour by `max(lum - threshold, 0) / lum`, never subtract per channel (that shifts saturated warm light toward green-yellow).
- **Lens streak** has no stock node. Build it from the stock `gaussianBlur(brightPass, vec2(1, 0), sigma)`, horizontal only, added at its own strength token.
- Tone mapping is the renderer's (`AgXToneMapping` or `NeutralToneMapping`, chosen per build), passed to `StageCanvas`; the pipeline applies it at output. `StageCanvas` sets `flat` so R3F's default ACES never applies.
- Light buffers are half-float by default in the pipeline.
- Each node costs every frame. Add a node only when the concept names it.

## Colour from tokens

Read the token from the element the theme class sits on, and convert it with colorjs.io so the canvas ground matches the page ground with no seam:

```ts
const [r, g, b] = new Color(style.getPropertyValue("--colors-ground"))
    .to("srgb-linear")
    .toGamut().coords;
```

`coords` entries are typed `number | null`; narrow them before use. Pass the result to `new THREE.Color().setRGB(r, g, b, LinearSRGBColorSpace)`. Never hardcode a colour in a shader or a constant.

## Typing the stage

- R3F 9 types `state.gl` as `WebGLRenderer` even when the stage runs `WebGPURenderer`. Narrow with `instanceof WebGPURenderer` before any WebGPU-only API; never cast.
- Node materials: `extend()` only the classes the build uses, and add a `ThreeElements` augmentation per class with `ThreeElement<typeof Class>`. Never `extend(THREE as any)`, the pattern most guides show.
- Some TSL parameters take nodes, not numbers: `film(input, float(0.2))`.
- To report the backend: `gl instanceof WebGPURenderer && "isWebGPUBackend" in gl.backend`.
- Look settings are typed from the libraries: `LenisOptions`, `ScrollTrigger.Vars`, `ToneMapping`.

## Devices

The script's verbs carry the performance; the devices below are page-level presentation moves for shots that need one beyond a verb. At least four families per page, never the same twice in a row, at most two scrubs.

| Device       | Reads as                                                     | Mechanism                                                          |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------------ |
| **scrub**    | The visitor drives time: the hero transforms under the wheel | The master timeline                                                |
| **pin**      | The frame holds while copy or elements assemble around it    | CSS sticky stage; ScrollTrigger `pin` inside a section             |
| **reveal**   | A `clip-path` wipe from one state to another                 | A `clipPath` tween at a label                                      |
| **pan**      | Lateral travel through a row of options                      | An `xPercent` tween on a pinned row                                |
| **parallax** | Independent planes at different rates; depth                 | `yPercent` tweens of different distances on one label              |
| **morph**    | The hero changes form between two named states               | MorphSVG for SVG; a uniform blend between two TSL states for WebGL |
| **cut**      | A hard scene change, used once for emphasis                  | A zero-duration `set` at a label                                   |

## Performance and fallback

- 55+ fps on a mid-range laptop. The stage advances only while on screen; a hidden tab stops the ticker on its own.
- `PerformanceMonitor` scales DPR inside the build's range; the range's top is the cap (1.5 unless measured otherwise).
- `prefers-reduced-motion`: no Lenis, no scrub, `frameloop="demand"`, the timeline paused at the peak label (`useStageTimeline`), and `.stage-reveal` headings visible from the first paint.
- No WebGPU: the renderer falls back to WebGL2 by itself. Neither, or a failed media load: the poster image.
- The stage is `aria-hidden`; every word on screen is real DOM text in reading order.
- In the DOM, animate only `transform`, `opacity` and `clip-path`.

## Tones: the handoff to web-generations

The ground and ink come from the actor's variants and the set's light, never from a mood. The stage brief lists one tone (ground, ink) per shot. web-generations writes them as tokens named `--tones-<shot>-ground` and `--tones-<shot>-ink`; `loadTone` in `lib/stage/tone.ts` reads them and `compileTone` tweens the live tone across the timeline, so the page and the canvas ground change together. Type, spacing, colour roles and every other token are web-generations' decisions, not this skill's.

## Build notes

Measured on the first test builds (2026-11, since deleted). Each one cost a debugging round once.

**Lessons from the Sunline look development (2026-11-13), all measured in the real browser**

- **`envMapIntensity` does nothing against `scene.environment` on the WebGPU renderer.** It scales only a material's own `envMap`. To make metal reflect more, set the material's `envMap` to the same HDRI and its `envMapIntensity` (`reflect()` in `lib/stage/look/environment.ts`).
- **A `DataTexture` defaults to nearest filtering and no mipmaps.** Generated normal, roughness and toning maps then stair-step at a distance. Set `magFilter` to `LinearFilter`, `minFilter` to `LinearMipmapLinearFilter`, `generateMipmaps` and an anisotropy (`noiseTexture` and `createCoinMaps` do).
- **Glass is transmission, never opacity, and `thickness` is the refraction strength.** three treats it as a solid of that depth. At 30 mm a blind critic read an empty jar as a solid block: the planks behind it bent across its whole middle (MAT-G4-4) and objects behind the rim showed a displaced second copy. About 10 mm, a few times the real wall, bends mostly at the silhouette, as a hollow vessel does. Glass should not cast an opaque shadow: leave `castShadow` off and let the light through.
- **Metal colour is measured reflectance, not a picked hex.** Gold is about (1.0, 0.78, 0.34) linear. A metal looks like what it reflects: a cool studio HDRI turns gold olive in shade, a warm interior keeps it gold, and a bright window turns it silver-white. Choose the HDRI as part of the set, and a raking key brings out relief.
- **Rough glass flattens everything behind it.** Transmission samples a blurred copy of the scene by the glass's roughness, so smudges at roughness 0.35 turned metal behind the glass into flat olive card. Keep glass roughness low (about 0.08 at most) and confine smudges to small, sparse areas.
- **The camera must not look through glass it should not.** A macro camera on a jar's rim sees the sunlit lip as a haze over the whole frame. Put it inside the opening or clearly outside.
- **Wear is a decision.** A random per-instance tint reads as mixed alloys; a chosen share of aged pieces reads as wear.
- **A placeholder line on glass reads as a stray wire.** Every mark in the world needs a purpose a blind viewer can read: printed graduations, a label, a fill line.
- **A mark printed on glass must be `transparent`.** Transmission refracts a copy of every opaque object, so an opaque mark on the glass's surface shows twice, offset: a blind critic read a level mark as misregistered print. A transparent mark renders after the glass has sampled the scene, so it shows once (measured 2026-11-13).
- **Swap materials idempotently.** React runs effects twice in development, and a material swap that reads `mesh.material` after an `await` reads its own replacement on the second run and loses the texture (measured: the baked set rendered white). Keep each mesh's original material the first time it is seen (`applyLightmaps` does).
- **Metals reflect the set, not a library HDRI.** A coin in a sunlit room facing up reflects the room's lit wall and window; a library interior HDRI made the same faces dark olive, darker than the table beside them. Bake a reflection probe from the actor's place in the set (`probes` in `bake_set.py`) and use it as the environment and the reflection of every metal and glass actor there, at intensity 1: it is already in the set's light units.
- **Lift has to clear the tone mapper's toe.** `NeutralToneMapping` maps every value below 0.08 to 6.25x², so a linear lift of 0.005 leaves pure orange wood with its blue channel at 0 (measured: 29 to 48 percent of pixels crushed in one channel). To hold the floor of a channel, lift it by about 0.008 before exposure. Lifting blue more than red is a decision, not a fix: it gives the cool shade a late sun really has, under warm light.
- **Global desaturation pales metal.** A saturation of 0.76 that fixed an orange floor turned gold coins pale brass; 0.88 kept the gold and still held every channel above its floor once the lift was right. Fix oversaturation with the lift first and desaturate last.
- **Wear is shape, not paint.** Scratches written into roughness or albedo glow evenly on faces in shadow, and a blind critic reads them as an overlay (MAT-G2-1). Write them as shallow grooves in the normal map (`createWear` returns `scratch` and `smudge` separately): a groove catches light only where it faces it. Depth matters: grooves with walls of about 20 degrees still read as drawn lines; about 7 degrees reads as hairlines.
- **three's `dof` halos every bright, sharp detail.** It blurs without checking depth and ends in a 16-tap max filter, so a white mark or a rim highlight next to a blurred region becomes a disc of light (measured on printed glass graduations). `withLens` replaces it.
- **A fixed tap pattern shows.** 64 taps on a golden-angle disc spread over a 24 px blur left gaps of about 3 px, and a blind critic saw every blurred edge as three to five copies and every highlight as a dot grid (RND-G4-6). Rotating the disc per pixel by interleaved gradient noise turns the copies into fine grain the eye reads as blur.
- **`useRenderPipeline` multisamples its scene pass.** The renderer's `antialias` applies only to the canvas; a post-processing pass renders to its own target, and without `samples` every fine edge (tick marks, reeding) stair-steps.
- **Anything invisible must be hidden, not transparent.** A mesh at opacity 0 still writes depth and still enters the ambient-occlusion prepass: invisible paper hid the ink behind it, and invisible dashboard sheets left grey hatched ghosts along a receipt's edges (measured 2026-11-14). `InkLines`, `InkFill` and `Resolving` set `visible` from their levels each frame.
- **In a post pass, `cameraNear` and `cameraFar` are the full-screen quad's.** Converting a depth texture to distance there needs the scene camera's planes: `reference("near", "float", camera)`. With the quad's planes every pixel read as out of focus.
- **Instanced bounds count hidden instances.** `InstancedMesh.computeBoundingBox` includes instances parked at zero scale (bodies not yet released), so a measured box spans the frame; `screenBox` skips them.
- **Every key light casts.** A per-shot key without a shadow brightens the lower of two overlapping pieces instead of darkening it: the critic read it as no contact shadow. Give `ShotKey` a `shadow` with a near plane that fits its distance (a spot light's default near of 0.5 m clips a close key entirely).

**Lessons from the stagecraft proof and the Ward test (2026-11-12)**

- **A scrubbed state must not depend on what ran before.** Give every tween explicit start values and `immediateRender: false`, in the **to-vars** of `fromTo`: GSAP 3 ignores it in the from-vars and renders the start at creation, so with two moves on one property the later move's start overwrote the earlier one before the film played (measured 2026-11-14: at 13 percent of Receipt every later layer already showed). One move per property hides the bug; `lib/stage/moves/drawing.test.ts` guards it.
- **`useGSAP` scopes string selectors to its root.** A selector for an element outside the root finds nothing (the nav could not find the section below it); pass the element.
- **`invalidateOnRefresh` is a ScrollTrigger property.** Set on a tween it is ignored with a warning; set it on the timeline's `scrollTrigger` so function-based values re-measure.
- **Tailwind needs a token for `z-fixed`.** A named z-index with no theme mapping produces no class; the header sat under the canvas. Use `z-(--z-indices-fixed)`.
- **Draw the canvas against a measured budget.** Check a frame with `tools/shoot.mjs` before tuning by eye: the first field was overexposed to white, and the numbers showed it at once.
- **A damped overshoot on a drop drives the actor through the floor.** Use `rebound` for any move that ends on a surface.
- **Production builds drop the `__stage` hook.** Assert choreography against the dev server.

**Hero and look**

- **First paint is a poster.** Render the hero once (`?poster` holds it at its first state), save it as WebP behind the canvas, and fade the live stage in over it. The first frame is the hero, not a dark page, and the LCP is the poster or the headline (measured 1.8s in dev).
- **Lights read as lamps, not tubes.** A street drawn as a uniform glowing line reads as a map demo. Modulate brightness along the segment in periodic pulses (street-lamp spacing) over a faint base, and keep line widths thin.
- **Light pollution from density.** Draw the same instanced geometry a second time, many times wider and very faint, additively. Where the subject is dense the faint quads stack into a glow, which is what makes an aerial read as a photograph.
- **A screen-space sky breaks in top-down views.** A horizon gradient on `screenUV` smears a band across a plan view; plan cameras get a plain ground.
- **Real data.** Fetch OpenStreetMap through Overpass in tiles, rotating the public mirrors with backoff; one large query times out. Pack the geometry into `Int16` (21,000 street segments in 343 KB) and validate the metadata with Zod.

**Rendering**

- **Custom quads must face the camera.** A quad built in TSL from a segment and its normal takes its winding from the normal's sign; the wrong sign makes every instance a back face, and nothing renders.
- **`StageCanvas` uses `IntersectionObserver` for on-screen.** A ScrollTrigger range measured from a sticky stage ends after one viewport of scroll, and the canvas stops advancing.
- **Per-instance inertia is a compute pass.** A storage buffer of brightness eased toward a target each frame makes load changes ripple through a district; materials read it with `.toAttribute()`.
- **React Compiler forbids mutating props and memoised values.** Three.js objects are mutable by design: keep every mutation (camera aim, uniforms, render targets) in `lib` helpers the component calls.
- **TSL types:** `uniformArray<"float">(values, "float")` (the generic is not inferred), `Node` and `UniformArrayNode` come from `three/webgpu`, and a literal passed to `uniform()` must be typed `number` before it is tweened.

**Performance**

- **Antialiasing off, again.** Turning MSAA on for thin street lines took a test build to 27 fps; with it off, bloom at half resolution (`setResolutionScale(0.5)`), a narrower halo and a DPR floor of 0.75 for `PerformanceMonitor`, production ran at 48 to 59 fps on the same machine.
- **Measure in production.** Dev mode added a large per-frame JavaScript cost; production numbers are the ones that count.
- **The poster is the LCP.** As a CSS background it measured 2.8 s; as a `next/image` with `priority` it measured 1.9 to 2.4 s.

**Media**

- **H.264 encoding needs the user's real Chrome.** Playwright's bundled Chromium has no H.264 encoder in WebCodecs. Reading frames back from a WebGPU canvas (`CanvasSource`, `toDataURL`) works after present.
- **`CanvasSink` needs `fit` when both width and height are given**, or it throws and the replay silently falls back to frames.
- **All-intra is too heavy.** Every frame a keyframe at high quality came to 16.8 MB for six seconds; a 0.2 s keyframe interval at medium quality came to 1.5 MB, and `CanvasSink` still lands on the exact frame.

**Timeline and DOM**

- **A cut is a `set` at the label.** A zero-duration `fromTo` renders its end state immediately, so the cut scene shows on load.
- **DrawSVG cannot measure `vector-effect: non-scaling-stroke`** inside a non-uniformly scaled SVG; set the stroke width in viewBox units instead.
- **A child with `visibility: visible` shows inside a hidden parent.** Toggle layered cards with opacity, so the parent's `autoAlpha` hides them.

## Lessons kept from the earlier engine

| Lesson                                              | Where it lives now                                                                                              |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| MSAA halves the frame rate on dense additive fields | `antialias: false` on `StageCanvas`; TRAA or SMAA if edges show                                                 |
| Bright-pass on luminance, never per channel         | Bloom does it; custom bright passes follow Light chain                                                          |
| Half-float light buffers                            | The pipeline default                                                                                            |
| DPR cap 1.5                                         | The top of `StageCanvas`'s `dpr` range                                                                          |
| Scroll spring around stiffness 70 / damping 24      | Lenis `lerp` 0.05. Lenis damps with λ = 60 × lerp (measured 6.84/s at 0.1); the old spring's slow pole is 3.4/s |
| The LCP hero plays on load                          | Copy choreography                                                                                               |

## Considered and rejected

Recorded so later sessions do not re-add them.

| Rejected                                                                                                                       | Reason                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| pmndrs `postprocessing`, `@react-three/postprocessing`                                                                         | WebGL only; does not run on `WebGPURenderer`                                                                            |
| drei components that patch shaders (`Text`, `MeshTransmissionMaterial`, any `onBeforeCompile` material), GLSL `ShaderMaterial` | GLSL does not compile on WebGPU. In-canvas text is also banned by the DOM-text rule                                     |
| GSAP ScrollSmoother                                                                                                            | Transforms the page content, which breaks `position: sticky`                                                            |
| Theatre.js, `@14islands/r3f-scroll-rig`, `r3f-perf`, `detect-gpu`                                                              | No release in about two years                                                                                           |
| LYGIA                                                                                                                          | GLSL or WGSL functions pin the stage to one backend; TSL's MaterialX noise covers it                                    |
| culori                                                                                                                         | colorjs.io follows the CSS spec's gamut mapping                                                                         |
| Motion's `useScroll` on the stage                                                                                              | One scroll owner per stage. Motion stays the starter's app UI library                                                   |
| R3F 10, `@react-three/tsl`, GSAP 4, Lenis 2                                                                                    | Alpha, beta or dev builds when chosen (2026-11). R3F 10 makes WebGPU the default, so this stack's upgrade path is short |
