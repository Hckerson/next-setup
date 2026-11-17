# Daylight Computer (DC-1)

| Field       | Value |
| ----------- | ----- |
| Source      | https://daylightcomputer.com/ (home page) |
| Live        | yes, checked 2026-11-12 |
| Builder     | basement.studio (console signs "From the basement. https://basement.studio"), Next.js |
| Actor route | B scrubbed media and D photographic plates: every stage frame is filmed or photographed in a real place; no `<canvas>` scene and no three or WebGL renderer in the bundles; Media Chrome player warnings in the console. Whether the hero video's frame follows scroll was not verified |
| Set         | `daylight-location` |
| Arc         | `journey` through one day: the tablet crosses morning grass, a sunlit wall, golden hour, dusk and night |
| Measured    | 1440×900: ground L 0.341, ground range 0.872, ground hue 39, accent hue 35, bright share 0.225. 390×844 (0, 0.5): ground L 0.404, range 0.101, hue 38, accent 39. Per frame L: 0.29, 0.30, 0.91, 0.82, 0.83, 0.28, 0.13, 0.03, 0.04, 0.06, 0.05 |
| Stack       | Next.js; Lenis (32 hits in the bundles); GSAP with ScrollTrigger (68 and 6 hits); no three, @react-three or WebGPU; `getHours` appears 3 times in the bundles (what it drives was not verified) |
| Captured    | 2026-11-12, `tools/shoot.mjs`, window scroll over 20020px, settle 3500ms, 11 frames desktop plus 2 phone; three frames kept in `references/daylight-computer/` |

## Actor and destination

The actor is the DC-1 tablet, a paper-like screen that can be read in direct sun. The product truth is "a computer you can use outside", so the light is the argument: the tablet is always shown in real sun or real shade. It ends at night with an ORDER NOW block under a large wordmark, over a photo of a person lit only by the screen's amber backlight (`daylight-computer-1.jpg`). The action that holds is the order button.

## What moves

- 0 to 0.1: the hero, seen from overhead. The tablet lies on grass with fallen leaves and a stone edge, and leaf shadows are cast across its screen. Between `-0.jpg` and `-0_1.jpg` the screen goes from blank to a botanical drawing and the framing holds, so the hero plays on time, not on scroll.
- 0.2: the ground cuts to a warm off-white and the line "The world's first full-speed paper-like display" rises from the lower right.
- 0.3: a horizontal track of use photos (writing on the tablet in sun, the tablet on a stand by a keyboard) beside an app-icon grid.
- 0.4: the ground becomes a white wall striped by window-blind shadows, with "it's a computer you can use outside" set in white over the light.
- 0.5: golden hour. A split frame: the tablet in tall grass under low sun on a peach ground, and a person holding it against a hillside.
- 0.6: dusk. The same blind-shadow wall goes grey-blue (ground L falls from 0.83 to 0.28).
- 0.7 to 1: night. A dark ground, an amber-backlit screen, testimonials, then the closing order block.

The time model is a time-lapse of one day spread over the scroll: copy is cued by section, and the light changes between sections rather than inside a shot.

## Layout

```
+--------------------------------------------------------------+
| [mark]                         [Home Product FAQ][ORDER NOW] |
|  The computer, de-invented                                    |
|  Meet DC-1 ...                    /tablet on grass,  \        |
|                                   \leaf shadows on it/        |
|  [film thumb ▶]                              [ORDER NOW]      |
+--------------------------------------------------------------+
```

The nav is a floating pill at the top right with a solid orange CTA. The hero copy is anchored top left over the photograph. A film thumbnail sits bottom left and a second ORDER NOW sits bottom right. A newsletter toast and a promo card overlay the stage on later frames.

## Art direction

The ground is never a fixed colour. It is the light of the hour: grass green, sun-white wall, peach, grey-blue dusk, near-black night. The ink is a warm black by day and an off-white by night. The single accent is a saturated orange (hue 35 to 39) that matches the screen's amber backlight, so the CTA colour is a light the product actually emits. The display face is a light grotesk set large; labels are small caps. There is visible photographic grain and no bloom.

## Why it works

- The sun is the clock of the page. Each section is a later hour, so scrolling is watching a day pass, and the product claim (usable in any light) is proven by the set rather than stated.
- Shadows fall on the actor. Leaf shadows across the screen in the hero, and blind shadows on the wall at 0.4, prove the tablet and the place share one light.
- The accent is diegetic: the orange of the buttons is the colour of the screen at night.

## Borrow / avoid

Borrow the day-as-timeline structure, the shadow cast across the actor in the opening shot, and an accent taken from a light the product emits. Avoid the commerce furniture on top of the stage (newsletter toast, promo card, app-icon grid), and do not copy the grass-and-leaves opening, the orange, or the wordmark close.

## Ladder

**Fifth on set and light; Fifth with gaps overall.**

- Light is a character: `daylight-computer-0.jpg` shows leaf shadows cast across the tablet's screen on grass, `-0_4.jpg` shows window-blind light on a wall, `-0_5.jpg` shows low golden-hour sun, `-0_6.jpg` dusk, and `-1.jpg` a person lit only by the screen at night. The light has a source, a direction and an hour in every frame.
- A world you could photograph: every stage frame is a real photograph or film in a real place. Nothing is a floating render.
- One film on every device: `daylight-computer-phone-0.jpg` is the same hero (tablet on grass, leaf shadows) recomposed for portrait, and `-phone-0_5.jpg` keeps the golden-hour leaf shadows on the peach ground.

**Gaps and tells**

- No simulation: the light changes between sections by cut, not continuously with scroll.
- That the world reacts to the visitor is unverified: `getHours` is present but its use was not traced.
- Integration tells: the newsletter toast and the "Meet Daylight Kids" card cover the stage on most frames (`-0_1` to `-1`), and the app-icon grid and nav cards at 0.3 and 0.7 are template furniture.
- None of the fourth-generation cluster: no dark glow ground, no bloom, and no floating hero object.
