# Capturing a reference

Turn a site the user likes into a file in `references/` so its taste is available to every later build. Record what it does (the verbs, the timings, the set, the arc, how it ends) and measure its frames with `tools/shoot.mjs`. Never record its look as something to copy.

## From a URL

1. Capture it with `tools/shoot.mjs` at 1440×900 (see Capturing with the tool below).
2. Screenshot at scroll progress 0, 10, 20 … 100%, pausing ~600ms at each so animation settles. Repeat the hero and peak at 390×844.
3. Inspect the page to identify the route, not guess it:
    - `<canvas>` drawing a modelled scene (`.glb` or `.gltf` requests, `three` / `@react-three` in the scripts) → route C.
    - `<canvas>` drawing a field from maths (no model requests; shader source in the scripts) → route A.
    - `<video>` or WebCodecs decoding whose frame follows scroll, or a folder of numbered frames → route B.
    - Lottie, Spline or Rive embeds: name them; they are the tool, not the concept.
4. Identify the stack the same way, and record it:
    - `navigator.gpu.requestAdapter` or WGSL in the scripts → WebGPU; otherwise WebGL.
    - `gsap` or `ScrollTrigger` in the scripts → a GSAP timeline; pinned sections get a `pin-spacer` wrapper.
    - A `lenis` class on `<html>` → Lenis.
    - Headlines split into one `aria-hidden` block per line inside an `overflow: clip` wrapper → SplitText line masks.
5. Note the builder (Framer, Webflow, Aura, custom). Many sites that go viral are templates; that tells you the technique is reproducible.

## From frames the user sends

Ask for 6–10 screenshots spread evenly from the top of the page to the bottom, plus one at the moment they found most impressive. Two frames of the same scene at different moments are the most useful thing they can send: they show what moves.

## From a screen recording

If `ffmpeg` is already installed (`ffmpeg -version`), extract one frame per second into the scratchpad and read them. If it is not, ask the user to install it or to send screenshots instead; do not install it yourself.

## Write the reference

Copy `references/_template.md` to `references/<slug>.md` and fill every field. Describe what moves and why it works, not only what it looks like. Record whether the site is live and where it came from.

Borrow structure, technique, timing and devices. Never carry a reference's brand name, copy, logos or numbers into a build.

## Capturing with the tool

```
node .claude/skills/stagecraft/tools/shoot.mjs --url <url> --tag <slug> --frames 0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1 --settle 2500
  --click "Enter"          click the element whose text matches, before capturing (separate several with |)
  --wheel 8000             drive the page with wheel events over 8000px instead of window scrolling
  --port 9341              a free DevTools port, so parallel captures do not collide
```

Pages whose own scroller is not the window (smooth-scroll libraries, inner containers, canvas worlds) are driven by wheel events automatically when the window cannot scroll; pass `--wheel` to set the distance. Captures go to `~/.cache/stagecraft/captures` unless `--out` says otherwise; `/tmp` is cleared on restart.

Keep three frames per reference in the repo, downscaled, for the critic's calibration: `references/<slug>/` with the opening, the peak and the close, each `sips -Z 720` (about 40 KB each). Name them `open.jpg`, `peak.jpg`, `close.jpg`.
