# Reference: Tekcify

- **Surface:** marketing.
- **Captured:** 2026-11-18, live, `~/.cache/pagecraft/anchors/tekcify/` (11 frames per width, a 60-frame scroll sequence, the style census, the page scripts); the play and the control states in `play/`.
- **Owner's grade:** Fourth. The owner named it for its creativity, its feel and its premium, simple quality, and graded it Fourth on purpose so that it is never read as the ceiling of creativity or any other axis (2026-11-18).
- **What it is not:** a template. Every build still comes from its own sector, world and draw (`differentiation.md`); what transfers below is a property, never the deck, the stickers, the train or the palette.

## Copy tells

Its level of creativity is the floor for every build (`generations.md`, Where the owner's bar sits). None of its devices is banned; each one below must show a source in the build's own world before it appears, or it is a copy, renamed or recoloured or not (`differentiation.md`, References the owner names).

- A fanned deck of product cards; tilted paper cards, taped quotes, sticker notes.
- A cursor-drawn line or path that something travels along; a train, a vehicle or a mascot hauling products.
- A sentence lit word by word across a dark stage.
- A cursor ring that swells over controls.
- A pinned hero title that rises, shrinks, blurs and fades while the theme flips light to dark.
- Inter Tight, a purple accent on a near-white ground, 3D emoji icons.

Learn why each works (content as objects, scroll as choreography, play tied to the story) and find the build's own answer in its sector's world.

## What to learn: creativity

- The content becomes objects the visitor can almost handle: the product line is a fanned deck of cards, the proof is a stat card and a taped quote, tilted like paper on a desk. The property is "the page's things are things", not "use cards". `CAPTURE`
- One moment of play: the visitor lays track with the cursor and a train hauls the products along it. One input, tied to the story, not a toy bolted on. Driven: the drawn line becomes sleepered track at once, the train (the product icons as its cargo) follows it, and the track erases from the tail as the train passes, so the board always returns to empty. The play has an ending, not a mess left behind. `CAPTURE`
- The turn is a single sentence travelling across a dark stage, lit word by word, with three sticker notes pinned to it. A sentence staged as a scene, not a paragraph in a box. `CAPTURE`
- Each beat has one idea at a size that leaves nothing competing with it: "We build solutions." at about 13 percent of the viewport width over the deck, then nothing else. `CAPTURE`

## What to learn: feel

- Scroll is choreography, not travel. The hero is pinned for 5 viewports (6.2 on a phone) with scrub 0.6: the title rises 120 percent, scales to 0.6, blurs 10px and fades while the theme flips light to dark. A horizontal rail and a card stage are pinned the same way, each for as long as its scene needs. `JS`
- Smooth scroll tuned, not defaulted: Lenis at lerp 0.1, wheelMultiplier 0.88, touchMultiplier 1.05, and switched off under reduced motion. `JS`
- The cursor is a thin purple ring that swells over anything clickable and shrinks on press; the controls themselves barely move. The feedback lives in one shared object, not in a hover style per button. Keyboard focus gets its own 2px purple ring, so the custom cursor never stands in for focus. `CAPTURE`
- One easing family carries the page: power3.out for entrances, power3.inOut for scene changes, sine.inOut for idle drift, and a single back.out(2.6) for the one playful pop. Durations sit between 0.5 and 1.7s, staggers between 0.06 and 0.12s. `JS`

## What to learn: premium simplicity

- One family (Inter Tight), three weights; display and body differ by size, weight and grey value, so the voice is calm and the scale does the work. `CAPTURE`
- A near-white neutral ground; colour lives in the objects (the cards), never in the chrome. `CAPTURE`
- Proof is specific and plain: "28k+ active users in 52+ countries", a named role and a real product in each quote, live links on every product. Copy that a person would say ("Useful, not clever"). `CAPTURE`
- Boxes exist (the product row is a row of cards) but sit inside a composed page; the page is not a stack of boxes (PAG-B5). `CAPTURE`

## Gaps

- Touch: the play and the cursor ring were driven with a mouse only; how the board behaves on a phone was not.
- Dragging across the board also selects the caption text beside it, a small miss in an otherwise finished play.
- The census counts 25 durations and 16 radii across the page, an expressive value economy; whether each is decided could not be read from the frames.
