# Techniques

How the cinematic register is built in this starter. Mechanics only; the concept comes from SKILL.md steps 1–4.

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

## What the starter ships

Five pieces of wiring and two classes. None of them carries a look: every value that decides how a build looks or moves is a prop from the build's tokens in `lib/<feature>/constants.ts`.

| Piece                                                     | File                                             | Does                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `StageScrollProvider`                                     | `components/providers/stage-scroll-provider.tsx` | Registers ScrollTrigger, SplitText and `useGSAP`; runs Lenis first on `gsap.ticker` with `lagSmoothing(0)`; updates ScrollTrigger on every Lenis scroll; `ignoreMobileResize`; no Lenis under reduced motion. Takes `LenisOptions`.                                                                                                                                |
| `StageCanvas`                                             | `components/wrappers/stage-canvas.tsx`           | R3F `Canvas` on `WebGPURenderer`; advanced from `gsap.ticker` only while on screen; `frameloop="demand"` under reduced motion; DPR range scaled by `PerformanceMonitor`; `aria-hidden`. Tone mapping and exposure are required props. In development, `?webgl` in the URL forces the WebGL2 backend and `data-stage-backend` on the wrapper reports which one ran. |
| `useStageTimeline(trackRef, { compose, peak, defaults })` | `lib/hooks/use-stage-timeline.ts`                | Builds the master timeline under `gsap.matchMedia`: scrubbed by ScrollTrigger over the track, or, under reduced motion, paused at the `peak` label so the page shows its composed still. `compose(film, still)` adds the labels and tweens; `defaults` carries the build's ease token. `compose` and `defaults` must be stable.                                    |
| `useRenderPipeline(compose)`                              | `lib/hooks/use-render-pipeline.ts`               | Builds a `RenderPipeline` from `compose(scenePass)`, renders it at priority 1, disposes it. `compose` must be stable: a module function or `useCallback`.                                                                                                                                                                                                          |
| `usePointerSway(smoothing)`                               | `lib/hooks/use-pointer-sway.ts`                  | Tracks the window pointer (mouse only) and damps it with maath inside the frame loop; returns the damped `Vector2` plus the raw pointer and whether it is present, for picking.                                                                                                                                                                                    |
| `.stage-line`                                             | `styles/globals.css`                             | Glyph bleed for SplitText line masks, derived from `--fonts-display-extent`. See Copy choreography.                                                                                                                                                                                                                                                                |
| `.stage-reveal`                                           | `styles/globals.css`                             | Hides a heading until SplitText has built its masks, only when scripting is on and motion is allowed, with a fallback after `--durations-reveal-fallback`. See Copy choreography.                                                                                                                                                                                  |

Mount `StageScrollProvider` in the cinematic route group's layout, never the root layout: app screens keep native scroll. Extend these pieces in place; never write a parallel helper.

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
- **No full-page preloader or percentage counter** (CIN-11). If the hero needs heavy assets, its first state is one that needs none, such as the ground, the light or a poster, and the assets arrive inside it.

## Route A: procedural field

- Instanced geometry positioned in TSL (`positionNode`), per-instance parameters as instanced attributes, and a few uniforms (state, time, pointer). Shader constants come from the TS constants so there is one source of truth.
- A field that must simulate (flow, flocking, settling) runs as TSL compute (`Fn(...).compute(count)`). Check the WebGL2 fallback for it in verify.
- Noise is TSL's MaterialX set (`mx_noise_float`, `mx_fractal_noise_float`, `mx_worley_noise_float`).
- **`antialias: false` for dense additive fields.** Measured on the first build (Intel HD 620): MSAA alone halved the frame rate on a thousand faint overlapping lines, which show no aliasing.
- Glow: additive blending on a node material with `depthWrite: false`, over a ground cleared to the ground token, so density builds the light.
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

## Light chain

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
- Each node costs every frame. Bloom and film are the default budget; depth of field, motion blur, SSR, GTAO, lensflare and god rays only when the concept names them.

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

The scene table assigns one device per scene. At least four families per page, never the same twice in a row, at most two scrubs.

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

## Theming the stage

A cinematic page usually needs a dark ground the starter's light tokens do not have. Add a theme class in `styles/tokens.css` that redefines the `--colors-*` values (plus whatever the hero reads) and put it on the element the stage owns. When the project maps its tokens with `@theme inline` (the starter has since 2026-11-12), utilities read the `--colors-*` tokens where they are used, so the class works on any element: a dark stage section can carry its own theme and every house utility (`bg-background`, `text-text`, `Button` tones) follows without a parallel set of classes. With a plain `@theme` block the mapping resolves once at `:root`, so the class has to sit on `<html>`, or the `--color-*` mappings be redeclared in the scope. The stage reads its colours from the same tokens (see Colour from tokens).

Display and scene sizes are `clamp()` tokens, used as `text-(length:--stage-display)` (Tailwind reads a bare `text-(--var)` as a colour) or through a named class when several elements share them. Layout and breakpoints are Tailwind utilities in the JSX; CSS is for what utilities cannot express: keyframes, sticky tracks, state selectors and the stage itself.

## Build notes

Measured on the first test builds (2026-11, since deleted). Each one cost a debugging round once.

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
