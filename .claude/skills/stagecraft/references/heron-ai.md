# Heron AI

| Field      | Value |
| ---------- | ----- |
| Source     | https://heronaiapp.com/ (Awwwards Site of the Day 2026-10-12, by Bearplus with Kenny Ho) |
| Live       | yes, checked 2026-11-12 |
| Builder    | Webflow (`meta generator`), with custom scripts |
| Actor route | E vector. The plan's walls arrive as outline paths and fill solid when seated (frames 0_4 to 0_5). There are no `.glb`/`.gltf` or video requests, and one viewport-sized canvas (1440×900; Awwwards tags it Canvas API). The hero elevation and closing perspective are raster drawings (45 images) |
| Set        | `technical-drawing` |
| Arc        | `assembly`: wall fragments arrive and lock into a plan, then each part carries one claim as a dimension or a code violation |
| Measured   | 1440×900: ground L 0.853, ground range 0.063, ground hue 43, accent hue 26, bright share 0.864. 390×844: ground L 0.850, range 0.056, ground hue 48, accent hue 19 |
| Stack      | GSAP 3.12.5 + ScrollTrigger, SplitText 3.13, TextPlugin, Lenis 1.1.5, Barba (core + prefetch) page transitions, Swiper 11, jQuery 3.5.1, Netlify. The document is exactly one viewport tall (900px) and the window cannot scroll: wheel input drives a virtual timeline |
| Captured   | 2026-11-12, `tools/shoot.mjs`, wheel-driven over 16000px (`--wheel 16000`), 11 frames at 1440×900 plus 0 and 0.5 at 390×844, in `~/.cache/stagecraft/captures/c/heron-ai-*`. `--click "Accept"` found a match, but the cookie bar still shows in every frame |

## Actor and destination

The actor is the architect's own drawing, the artefact Heron works inside. It is an elevation, then a floor plan, then sheets with violations marked. It stands for the claim that the agent reads your model. The page ends on "See what Heron can do in your model" with a vermilion Contact us button over a final perspective drawing (0_9). The footer closes on the wordmark drawn as construction line work with tick marks (1).

## What moves

All motion is scrubbed by wheel input on a pinned, one-viewport stage. Timings are shares of the 16000px wheel run.

| Share | Shot | Verbs and cue |
| ----- | ---- | ------------- |
| 0 (load) | Preloader: a line elevation of the house draws itself on the sheet while a vermilion horizontal scan line with a percentage counter sweeps it. A title-block spec list sits bottom right; on phone, a numbered boot log (001 to 010) | draw, sweep |
| 0.1 | Hero: the same house now resolved as a hatched, stippled rendering with trees and cast shadows, two vermilion square markers on the facade. Headline bottom left, body and "Discover more" in a boxed cell, a benefits ticker below | resolve to solid |
| 0.2 | Problems: four ruled cells, each a grey isometric wireframe primitive with dashed hidden lines, numbered [01] to [04] | hold |
| 0.3 | One grey display line ("Right there with you") on an empty sheet: a copy slide | type in, hold |
| 0.4 | Wall fragments of a plan in outline scattered across the sheet behind a second display line. An "Introduction" card bottom left says "[scroll to continue]" | arrive from the edges |
| 0.5 | The fragments are seated: walls filled charcoal, furniture and openings in fine grey line. The card copy changes | lock, fill |
| 0.6 | Push in on the plan: dimension chains with values, door tags (D8, D9, D18), three vermilion violation markers 01 to 03 and an arrow. The card now reads "[click on violation]". The right column introduces the product, and a second plan with a UI panel rises from below | annotate, push in |
| 0.7 | Vermilion violation cards naming building-code clauses, pinned on a cantilevered-house elevation on a grid and on an office floor plan | pin callouts |
| 0.8 | "Learned pattern": a wall path in grey with vermilion node markers and a small card listing what it learned; a vermilion block caught mid-transition with motion blur | trace, wipe |
| 0.9 to 1 | CTA over a one-point-perspective drawing of a brutalist building on a construction grid, with a vermilion disc as the sun and a coordinate label "[0,544]"; then the footer grid and the outlined wordmark | settle |

## Layout

The chrome is a ruled sheet. A thin border with tick-mark rulers and + registration marks frames every shot, and a boxed nav row sits top right with Contact us in the accent. Copy anchors bottom left in heavy grotesk caps, and labels are monospace. The CTA is one vermilion block with a dashed divider before the arrow.

```
+-[logo]---------------------[PRODUCT|PRICING|RESOURCES|ABOUT|CONTACT]-+
|+ ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' +|
|                                                                      |
|               [ hatched elevation of the house, trees ]              |
|                     [■ marker]         [■ marker]                    |
|            ________________________________________ ground line      |
|+ ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' +|
| AN AI AGENT THAT WORKS          | body copy            | DISCOVER  -> |
| INSIDE YOUR DESIGN TOOLS        | o benefit o benefit o benefit ...   |
+----------------------------------------------------------------------+
```

## Art direction

The ground is a warm off-white drawing sheet with paper grain (ground L about 0.85, hue about 45). The ink is graphite to charcoal, and the walls are filled near-black once seated. The accent is a single vermilion (hue about 26), spent on violation markers, callout cards, the scan line, the CTA and the nav's contact link. Display type is a heavy condensed grotesk in caps; labels are monospace in caps with bracketed codes. The texture is grain only: no bloom, no blur except one transition caught in motion (0_8).

## Why it works

- The annotations are the copy. Dimensions, door tags and building-code clauses carry the product claim, so the drawing is information, not decoration (0_6, 0_7).
- Light obeys the set. The line states have none. Light appears only when the house resolves to a rendering (hatched cast shadows in 0_1) and in the closing perspective (the vermilion sun in 0_9).
- One accent with one job. Vermilion means "Heron found something", so the markers read as the product working.

## Borrow / avoid

Borrow: a preloader that draws the actor's elevation behind a scan line and a counter; fragments that arrive in outline and fill solid when seated; annotations and callouts as the copy; a title-block meta panel; one accent reserved for the product's verdicts.

Avoid: the vermilion-on-grained-paper palette, the brutalist building drawings, the code-clause wording and the mark. Avoid the empty one-line copy slides (0_3), and the virtual scroll that takes the scrollbar away.

## Ladder

**Fifth with gaps.**

- Every frame could hang on a wall. 0_1, 0_5, 0_6 and 0_9 are composed drawing sheets with border, rulers, title block and one accent.
- The drawing builds itself with mass. In 0_4 the outline fragments are spread over the sheet; in 0_5 they are seated and filled. The open frame shows the elevation being drawn under the scan line.
- Light is a character in the set's terms: none in line work, one source once the drawing becomes a solid (0_1 hatched shadows, 0_9 sun disc).
- The visitor is inside it: the plan's violation markers are clickable ("[click on violation]" in 0_6).
- One film on every device: the phone captures show the same loader elevation (phone-0) and the same dimensioned plan with markers (phone-0_5).

Gaps and tells:

- The stills cannot show whether parts slide and stop with an ease that reads as mass.
- The hero and closing drawings are static images that scroll does not draw.
- 0_3 is an empty copy slide.
- The accent is also spent on nav and buttons, not only on the drawing.
- Scroll is hijacked: the document is one viewport tall, so keyboard and scrollbar navigation are at risk.

None of the fourth-generation default cluster is present: no dark ground, glow, floating hero or bloom.
