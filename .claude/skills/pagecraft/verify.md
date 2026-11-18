# Verifying in the running app

Code that reads fifth-generation in the editor proves nothing about hover, focus, motion or contrast. The checks tagged `[app]` in the layer files are answered here, and the frames captured here are what the critic grades (`critic.md`).

## When it runs

At the styleframes step, after each build iteration, and whenever the user asks to verify. Otherwise the audit ends with the `[app]` checks listed under **Unverified**. Never present an unverified build as graded.

## The tool

`stagecraft/tools/shoot.mjs` drives Chrome over the DevTools protocol. It lives with stagecraft because both skills capture with it; it needs no extension. Starting it is a heavy job: check the machine's headroom first (the global instructions), run one capture at a time, and stop the dev server when done.

```
node .claude/skills/stagecraft/tools/shoot.mjs --url http://localhost:<port>/<route> --tag <route>-1440
    --size 1440x900 --frames 0,0.25,0.5,0.75,1 --styles
    [--click "Text on a control"]   reach a state before capturing (repeat with |)
    [--reduce]                      prefers-reduced-motion: reduce
    [--compare --fingerprints .claude/skills/pagecraft/references/fingerprints.md]
    [--out ~/.cache/pagecraft/dailies/<build>/<iteration>]
```

`--styles` adds a census of the rendered page: distinct font families, sizes, weights, tracking, text colours, radii, shadows, backgrounds, borders, durations, easings and transition properties, each with its most used values. It is the measured evidence for value economy, the default cluster (`generations.md`) and the fingerprint row. The report also gives each frame's ground, accent and copy contrast.

## Steps

1. Start the dev server on a free port. For each route in scope, capture at 1440x900 and 390x844 with `--styles`, using the fixed sampling in `critic.md`.
2. **States.** Reach the empty, loading, error, selected and disabled states (a fixture, a query parameter, a forced failure, or `--click`) and capture each at both widths.
3. **Census.** Read the census against the brief: every family, radius, shadow, duration and easing in it is one the brief names. An unnamed value is a default (TOK and cross-cutting tells); `transition-property: all` is the cross-cutting tell.
4. **Keyboard and overlays.** With `--click`, open each overlay and capture mid-enter and at rest; tab order, the skip link, focus return and Escape are checked by driving keys through the same session, or listed as Unverified.
5. **Reduced motion.** Repeat one route with `--reduce`: motion collapses and nothing breaks.
6. **Contrast.** The report's copy contrast must reach 4.5:1 for body and 3:1 for large text and icons on every frame where the copy is at rest; sample the focus ring against both surfaces.
7. **Fingerprint.** On the shipped build, run `--compare --fingerprints` against `references/fingerprints.md` (CONV-G4-1) and write the measured columns into the new row.
8. Hand the frames to the critic (`critic.md`). Fix, rerun the same commands, stop the dev server.

## Report

A table: `check | layer | expected | observed | fixed`, with the frame paths. List what could not run and why. A check that was not run stays **Unverified**.
