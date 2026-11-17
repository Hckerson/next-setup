# Verifying in the running app

Code that reads fifth-generation in the editor proves nothing about hover, focus, motion or contrast. The checks tagged `[app]` in the layer files are answered here.

## When it runs

Only when the user's current message asks for it ("verify", "run it", "check it in the browser"). Otherwise the audit ends with the `[app]` checks listed under **Unverified**. Never present an unverified build as graded.

## Prerequisite

Verification drives the user's Chrome through the `chrome-browser` skill and the Claude in Chrome extension. Check both first. If `chrome-browser` is missing from the skill list, ask the user to turn it on in their claude.ai skills settings and restart. If there are no `mcp__claude-in-chrome__*` tools, ask the user to run `/chrome` and install the extension.

## Steps

1. `pnpm dev`, then open each route in scope. Screenshot at 1440x900 and at 390x844.
2. **Keyboard pass.** Tab through every interactive element on the route. Record the order, that the focus ring is visible on every element and on both surfaces (light and dark parts), that a skip link appears first, that focus moves into an opened overlay and returns on close, and that Escape closes it.
3. **State pass.** For each list or console, reach the empty, loading, error and no-results states (a slow network profile, an empty account, a forced failure) and screenshot each beside the populated one.
4. **Hover and press.** Hover, press and focus one control per kind (button, row, nav item, chip). Confirm hover differs from press and focus, and that a row's hover, focus and selected states share a surface.
5. **Overlays.** Open and close each overlay, record enter and exit durations from the Performance panel or by wrapping `requestAnimationFrame`; exit must be faster than enter. Check the scrim fades.
6. **Reduced motion.** Emulate `prefers-reduced-motion: reduce` and repeat the overlay and list-change checks; motion collapses and nothing breaks.
7. **Contrast.** Sample text against its surface (body 4.5:1, large text and icons 3:1) and the focus ring against both surfaces (3:1).
8. **Squint test.** Screenshot, blur it, and check: is depth varied or one shadow everywhere, do control, card and overlay share a radius, do gaps between sections vary?
9. Fix, re-run the steps for what changed, stop the dev server.

## Report

A table: `check | layer | expected | observed | fixed`. Attach the screenshot paths. List what could not run and why. A check that was not run stays **Unverified**.
