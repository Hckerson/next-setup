# Verifying a build

Code that looks right in the editor proves nothing about a scroll-driven page. The build is checked by scrolling it.

## When it runs

Verification needs a dev server and a browser. Start them only when the user's current message asks for it ("verify", "run it", "check it in the browser"). Otherwise end the build report with **Not verified** and the command they can give you to run it. Never present an unverified build as finished.

## Steps

1. `pnpm dev`, then open the route with the `chrome-browser` skill (SKILL.md › Browser).
2. For every scene in the scene table, screenshot at its start, midpoint and end, at 1440×900 and at 390×844.
3. Emulate `prefers-reduced-motion: reduce` and screenshot the top of the page. `<html>` must not carry the `lenis` class, the copy must be visible, and the stage must show the composed peak scene.
4. Put each capture beside its scene-table row and check:
    - **Hero state** matches the row (scattered vs converged, angle, plate positions).
    - **Copy** on screen is the row's copy, fully revealed at the midpoint, legible against the hero (contrast at least 4.5:1 for body, 3:1 for display).
    - **Dead scroll:** no range of more than ~15% where nothing on screen changes.
    - **Anchor variety** holds and no device repeats back to back.
    - **Reference match:** set the peak capture beside the reference frames. Name what is weaker: density, light, type scale, pacing.
5. **Both backends.** Repeat step 2 with `?webgl` added to the URL (development only). `data-stage-backend` on the stage wrapper must read `webgl` with it and `webgpu` without it. Every scene must match the WebGPU pass. TSL compute and any WebGPU-only node are where they diverge.
6. **Text.** Resize 1440 → 390 → 1440. SplitText must re-split each time: lines rebuilt, no clipped descenders or accents, no word cut at the column edge, and the reveal still in step with its label. With JavaScript disabled, every `.stage-reveal` heading is visible; with it enabled, none shows before its reveal.
7. **Phone.** On a real phone: showing and hiding the address bar opens no gap under the stage and does not re-split a heading; touch scrolling keeps the phone's own momentum; in Low Power Mode (30 fps) every scene still reads.
8. **Performance: measure, never eyeball.** Per scene, record fps, p95 frame time, % of frames over 17.5 ms, JS time per ticker callback, and GPU time from `stats-gl` (dev only), at DPR 1 and 2. Pass bar: 55+ fps and under 5% slow frames on the user's machine. Measure in the user's real Chrome: headless Chromium renders in software and its numbers mean nothing (measured: 18 fps on forced WebGL2 for a scene that runs at 60 on hardware). If the Chrome extension is not connected, drive Chrome over CDP with Node's built-in `WebSocket` (no install): `--remote-debugging-port`, `Emulation.setDeviceMetricsOverride` for DPR, `Page.captureScreenshot` per scene. When driving Chrome, launch it with `--disable-backgrounding-occluded-windows --disable-renderer-backgrounding --disable-background-timer-throttling` and close each window before opening the next: a window Chrome thinks is covered is throttled to 1 fps, and the numbers mean nothing. Measure a production build. When it fails the bar, isolate: rerun with one layer hidden at a time (stage, light-chain nodes, overlays, text, antialiasing) before changing anything.
9. **Console.** No errors. No warnings except known library noise on this stack:
    - `THREE.Clock: This module has been deprecated` (R3F 9 on three r183 and later)
    - `THREE.WebGPURenderer: PCFSoftShadowMap has been removed` (R3F's default shadow type)
    - `The powerPreference option is currently ignored when calling requestAdapter() on Windows` (Chrome)
10. **Shipped build:** no ScrollTrigger markers, no `stats-gl` panel, and `?webgl` has no effect.
11. Fix, then repeat from step 2 for the scenes that changed.
12. Stop the dev server.

## Report

A table: `scene | intended | observed | fixed?`, then the backend comparison, then the list of deviations kept on purpose and why. Attach the capture paths.
