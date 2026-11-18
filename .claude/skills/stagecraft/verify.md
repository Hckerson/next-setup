# Verifying a build

Code that looks right in the editor proves nothing about a scroll-driven page. The build is checked by scrolling it.

## When it runs

Verification needs a dev server and a browser. Start them only when the user's current message asks for it ("verify", "run it", "check it in the browser"). Otherwise end the build report with **Not verified** and the command they can give you to run it. Never present an unverified build as finished.

## Tools

`tools/shoot.mjs` drives the user's Chrome over the DevTools protocol with no install. It scrolls to each fraction of the page (or of `--track`), waits, saves a screenshot and measures the frame: ground luminance, ground hue, accent hue and the bright share. It writes a JSON report and exits 1 when `--compare` finds an earlier build too close.

```
node .claude/skills/stagecraft/tools/shoot.mjs --url http://localhost:3000/ --tag build \
  --frames 0,0.2,0.4,0.6,0.8,1 --size 1440x900 --track .stage-track --compare [--reduce]
```

## The critic's numbers

Every capture reports a `critic` block. They inform the critic; they do not replace it, and the floors below are first estimates until calibration moves them.

| Number            | What it measures                                                       | Reads as a problem when                    | Layer |
| ----------------- | ---------------------------------------------------------------------- | ------------------------------------------ | ----- |
| `maxClipped`      | Share of pixels at full white in any frame                              | above 0.02 outside a visible light source  | 7     |
| `maxCrushed`      | Share of pixels at full black                                           | above 0.02                                 | 7     |
| `maxChannelCrushed` | Share of pixels with one channel at 4 or below while another is 40 or above | above 0.05: colour pushed past what a sensor records (measured 0.29 to 0.48 on a dark wood floor under a warm sun) | 7 |
| `maxSaturated`    | Share of pixels at saturation 0.85 or more, brighter than 60 | above 0.2: a surface reads as lacquered colour, not a material in light (a dark wood floor under a warm sun measured 0.86 to 0.88 median saturation with its blue channel at 9 to 15, so `maxChannelCrushed` missed it) | 7 |
| `maxChannelClipped` | Share of pixels with one channel at 254 or above while another is below 200 | above 0.01 outside a visible light source | 7 |
| `maxBanding`      | Share of smooth gradients that step in long flat runs                   | above 0.5 on a lit, graded frame           | 7     |
| `actors.<id>.meanVariation` | Luminance spread inside the actor's screen box                | near 0: a flat, unlit or default material  | 2     |
| `actors.<id>.worstContact`  | Darkness under the actor against beside it (below 1 is darker) | 1 or above: no contact shadow              | 3     |
| `actors.<id>.darkestExposure` | The actor's lightest surfaces (90th percentile inside its box) against the frame's median, in its darkest frame | below 1: the hero is darker than its set. A dark material is not under-exposure, so meter its whites | 7 |
| `actors.<id>.palestHighlight` | Median saturation of the actor's brightest 5 percent of pixels, in its palest frame | below 0.40 on a coloured metal: its highlights have gone white (MAT-G4-3; a pile at 0.37 still read beige) | 2 |
| `flattestRange`   | 99th minus 1st percentile luminance (linear), in the flattest frame    | below 0.5: no black and no white (the six Fifth references measure 0.62 to 0.97 at their peak frames, 2026-11-13). Lit frames only: an unlit line drawing is judged by its ink's contrast on the paper | 7     |
| `softestForeground` | Sharpness of the bottom third against the middle third, in the softest frame | below 0.5 with no depth of field chosen: the foreground smears. It counts directional grain as detail, so a smeared texture with streaks passes; judge smear by eye where the nearest surface has a strong grain | 4 |
| `minCopyContrast` | The worst contrast of any visible `[data-copy]` element on its real background | below 4.5                         | 8     |

Actor boxes come from `exposeBoxes` on the dev server; copy comes from elements marked `data-copy`. `--sequence <n>` captures n evenly spaced frames for the phone film instead of measuring. After navigating it waits until no request has been in flight for a second (at most `--quiet-limit` milliseconds, default 60000), then `--settle`: a fixed delay alone shot frames before a 10 MB simulation bake had arrived on a cold dev server, and the actors were missing. The tool stops itself after `--timeout` milliseconds (default 300000) and removes its Chrome profile.

## Steps

0. **Measure, then compare.** Run the tool with `--compare`. A build whose fingerprint sits within the threshold (0.25, normalised) of any row in `references/fingerprints.md` fails CONV-G4-1 whatever its structure says: change the set, the ground rule or the arc and measure again.
0b. **Assert the script.** On the dev server, read `window.__stage.snapshot()` at each shot's frame (the tool stores it as `probe`) and check it against the script: at the packing shot the actor sits at the destination, at the recolour shot `tintMix` is between 0 and 1, no actor has `position.y` below its surface. A story that is not happening is a defect even when every frame looks fine.

1. `pnpm dev`, then capture the route with `tools/shoot.mjs` (add `--click` for a gate; wheel driving is automatic when the window does not scroll).
2. For every shot in the script, screenshot at its start, midpoint and end, at 1440×900 and at 390×844.
3. Emulate `prefers-reduced-motion: reduce` and screenshot the top of the page. `<html>` must not carry the `lenis` class, the copy must be visible, and the stage must show the composed peak scene.
4. Put each capture beside its script shot and check:
    - **Actor state** matches the shot (position, presence, variant, pose).
    - **Copy** on screen is the shot's copy, fully revealed at the midpoint, legible against the hero (contrast at least 4.5:1 for body, 3:1 for display).
    - **Dead scroll:** no range of more than ~15% where nothing on screen changes.
    - **Copy slots** hold: each line sits where the stage brief reserved space for it, and no verb repeats back to back.
    - **Reference match:** set the peak capture beside the reference frames, when `references/` holds any. Name what is weaker: density, light, type scale, pacing, mass.
4b. **Critic.** Copy the frames to a neutral folder with neutral names and give them to a fresh critic agent (`critic.md`). The stage audit is the critic's table; nothing graded below Fifth reaches the owner without a named reason.
5. **Both backends.** Repeat step 2 with `?webgl` added to the URL (development only). `data-stage-backend` on the stage wrapper must read `webgl` with it and `webgpu` without it. Every shot must match the WebGPU pass. TSL compute and any WebGPU-only node are where they diverge.
6. **Text.** Resize 1440 → 390 → 1440. SplitText must re-split each time: lines rebuilt, no clipped descenders or accents, no word cut at the column edge, and the reveal still in step with its label. With JavaScript disabled, every `.stage-reveal` heading is visible; with it enabled, none shows before its reveal.
7. **Phone.** On a real phone: showing and hiding the address bar opens no gap under the stage and does not re-split a heading; touch scrolling keeps the phone's own momentum; in Low Power Mode (30 fps) every shot still reads.
8. **Performance: measure, never eyeball.** Per shot, record fps, p95 frame time, % of frames over 17.5 ms, JS time per ticker callback, and GPU time from `stats-gl` (dev only), at DPR 1 and 2. Pass bar: 55+ fps and under 5% slow frames on the user's machine. Measure in the user's real Chrome: headless Chromium renders in software and its numbers mean nothing (measured: 18 fps on forced WebGL2 for a scene that runs at 60 on hardware). If the Chrome extension is not connected, drive Chrome over CDP with Node's built-in `WebSocket` (no install): `--remote-debugging-port`, `Emulation.setDeviceMetricsOverride` for DPR, `Page.captureScreenshot` per scene. When driving Chrome, launch it with `--disable-backgrounding-occluded-windows --disable-renderer-backgrounding --disable-background-timer-throttling` and close each window before opening the next: a window Chrome thinks is covered is throttled to 1 fps, and the numbers mean nothing. Measure a production build. When it fails the bar, isolate: rerun with one layer hidden at a time (stage, light-chain nodes, overlays, text, antialiasing) before changing anything.
9. **Console.** No errors. No warnings except known library noise on this stack:
    - `THREE.Clock: This module has been deprecated` (R3F 9 on three r183 and later)
    - `THREE.WebGPURenderer: PCFSoftShadowMap has been removed` (R3F's default shadow type)
    - `The powerPreference option is currently ignored when calling requestAdapter() on Windows` (Chrome)
10. **Shipped build:** no ScrollTrigger markers, no `stats-gl` panel, and `?webgl` has no effect.
11. Fix, then repeat from step 2 for the shots that changed.
12. Stop the dev server.

## Report

A table: `shot | intended | observed | fixed?`, then the critic's stage audit (`generations.md`, Report), then the backend comparison, then the deviations kept on purpose and why. Attach the capture paths.
