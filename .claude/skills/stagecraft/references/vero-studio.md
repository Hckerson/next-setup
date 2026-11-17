# Vero (wedding-dress sculpture studio)

| Field       | Value |
| ----------- | ----- |
| Source      | https://verostudio.com/ (Awwwards Site of the Day, 8 Aug 2026, by Rodéo studio) |
| Live        | yes, checked 2026-11-13 |
| Builder     | custom: Next.js and Sanity, developed by plutot.cool (the console says "Developed by plutot.cool") |
| Actor route | D photographic plates plus B video: a studio photograph and video of the dress, a grey render of the scanned dress, and a photograph of the finished sculpture. The page has two `<video>` elements and four `.mp4` sources, and "webgl" appears once in the HTML. Awwwards lists "Interactive product page with 3D objects" (WebGL); that page was not captured |
| Set         | `studio-sweep` |
| Arc         | `metamorphosis`: dress, then data (a scan), then sculpture; the sweep changes colour with each state |
| Measured    | 1440×900, wheel-driven over 14000px: ground L 0.669, ground range 0.740, ground hue 22, accent hue 24, bright share 0.607. 390×844 (0, 0.5): ground L 0.649, range 0.459, hue 17, accent 16. Per frame L: 0.88, 0.86, 0.84, 0.83, 0.14, 0.48, 0.57, 0.62, 0.60, 0.80, 0.76 |
| Stack       | Next.js. The window does not scroll in headless, so a smooth-scroll container is assumed (the library was not identified). Video plates. GSAP, Lenis and three were not found in the HTML; bundles not inspected |
| Captured    | 2026-11-13, `tools/shoot.mjs --wheel 14000`, settle 4000ms, 11 frames desktop plus 2 phone; three frames kept in `references/vero-studio/` |

## Actor and destination

The actor is the client's own wedding dress. The product truth is that the dress survives as an object, so the actor changes state: a worn gown, then a scanned surface, then a sculpture about 15 inches tall in ceramic-based resin on a plinth. The destination is "Start your COMMISSION", which is pinned top right on every frame and repeated as the last block above the wordmark footer (`vero-studio-1.jpg`).

## What moves

- 0: a loader with an outlined wordmark on cream.
- 0.1: the opening shot. A grey render of a dress bodice on a form, with lace relief in the cloth, floats on cream and is cut by the bottom edge.
- 0.2: the camera has dropped down the skirt; the folds fade into the cream ground, and the statement copy and a CTA sit under them.
- 0.3: a studio photograph rises into a card over a large serif headline: a model in the dress stands on a plinth before a painted orange backdrop lit by a spot from the upper left.
- 0.4: the pinned three-state sequence ("From DRESS, to DATA, to SCULPTURE."), with three diamond bullets on the left. The DATA state is a white scanned sculpture on a concrete plinth before a grey seamless sweep under a soft key from the left; the plinth's two faces split into a lit side and a shadow side.
- 0.5: the SCULPTURE state. Back on the orange sweep, the model stands beside the finished sculpture on its plinth. The pinned frame then releases upward into "so THAT YOU BECOME ART."
- 0.6 to 0.8: an editorial grid with a large grey close-up of the sculpture's lace relief, a founder quote and small inset plates.
- 1: CTA, footer links and the wordmark.

Scroll drives the state changes; the copy line cross-fades word by word to name the current state.

## Layout

```
+--------------------------------------------------------------+
| [MENU]                               [Start your COMMISSION] |
|  ◆                                                            |
|  ◇            backdrop, spot upper left                       |
|  ◇                  actor on plinth                           |
|                                                               |
|      From DRESS, to DATA, to SCULPTURE.                       |
+--------------------------------------------------------------+
```

The nav is two white rectangular buttons in the corners with soft drop shadows. State bullets sit at mid-left. The display line runs across the bottom third over the image.

## Art direction

A cream page ground (L 0.88) frames a stage whose sweep is either a hand-painted orange-to-umber backdrop or a neutral grey seamless. Colour lives in the backdrop, not in the UI. The ink is a near-black. The display face is a high-contrast serif with italic connectives ("so", "to", "from"); body copy is a condensed serif with a grotesk for statements. There is soft vignetting on the painted backdrop and no bloom.

## Why it works

- The sweep belongs to the state. The two "real" states (dress, sculpture) share the warm painted backdrop and the "data" state gets a cold grey seamless, so the ground tells you which form the actor is in.
- One light you can point to: a hard spot pool on the backdrop at the upper left in the dress shot, and a soft key from the left on the grey sweep that splits the plinth into a lit face and a shadow face.
- The plinth is constant, so the actor is always on the ground: model, scan and sculpture all stand on the same block.

## Borrow / avoid

Borrow a sweep colour tied to the actor's state, a constant plinth or mark that carries through every metamorphosis, and a single display line that names the current state as it changes. Avoid the floating untextured render as the opening shot, the soft drop-shadowed corner buttons, and the painted orange backdrop itself.

## Ladder

**Fifth with gaps.**

- A world you could photograph: `vero-studio-0_3.jpg` and `-0_5.jpg` are studio photographs on a painted sweep, with a spot pool you can point to and a plinth on the floor.
- Light is a character: in `-0_4.jpg` the key from the left lights one face of the plinth and leaves the other in shadow, and the sculpture's folds carry the same direction.
- The set's ground rule holds: the sweep goes orange (dress), grey (data), orange (sculpture) as the actor changes (`-0_3`, `-0_4`, `-0_5`).
- One film on every device: `vero-studio-phone-0_5.jpg` is the same SCULPTURE state, recomposed portrait, with the plinth and the orange sweep.

**Gaps and tells**

- The opening (`-0_1.jpg`) is a flawless grey object floating on cream with no ground or shadow: a fourth-generation floating hero, confined to the first shot.
- No simulation: states change by cross-fade, not by a baked transformation of the dress into the scan.
- No visitor-reactive layer was observed.
- From 0.6 the page becomes a static editorial grid.
