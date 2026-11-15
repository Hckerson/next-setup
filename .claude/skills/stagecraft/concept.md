# Concept

A concept is an actor, a story, a world and an end. This file says how to make one that is not the one a model finds obvious, and how to prove it.

## Why a tool deals the concepts

A model asked for three ideas returns three nouns from the same neighbourhood, and then judges its own first idea as the best. So the divergence is mechanical. `tools/draw.mjs` deals three cards over seven axes, strikes every value an earlier build used (`references/fingerprints.md`), and guarantees any two cards differ on at least three axes. You then make each card true to the client. You do not choose the card because it is familiar.

```
node .claude/skills/stagecraft/tools/draw.mjs --kind physical|digital|service
  --lock axis=value    keep one axis fixed (the client demands it)
  --seed N             reproduce a draw
  --allow-repeat       ignore earlier builds (a deliberate re-use, state why)
  --json
```

`--kind` filters arcs, actors and destinations to those that make sense: a bank is `service` or `digital`, a shoe is `physical`. A lock the product truth really demands (a restaurant's destination is a table) goes in as `--lock`; do not lock anything for taste.

## The seven axes

| Axis            | Question                                       | Menu (`tools/menus.json`)                                                                                   |
| --------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Arc**         | What happens, start to end?                    | unboxing, packing, journey, assembly, disassembly, metamorphosis, replacement, parade, craft, scale-shift, moment-of-use, cause-chain, reveal-by-removal, counting |
| **Actor**       | Who or what performs?                          | product, packaging, component, ingredient, artefact-of-use, tool, measurement, place-in-miniature            |
| **Destination** | Where does it end, and why is that the action? | box, bag, hand, shelf, door, slot, table, pocket, scale, screen                                              |
| **Camera**      | How do we watch?                               | locked-off, follow, orbit, top-down, macro-dolly, isometric, cut-edit, no-camera-flat                        |
| **Time**        | How does time behave?                          | continuous, stepped, slow-motion, time-lapse, reversed, looped                                               |
| **Set**         | In what world?                                 | the nine in `sets/README.md`                                                                                |
| **Signature**   | What one move will people remember?            | one-shot-camera, text-in-the-world, live-surface, visitor-input, visitor-local-time, baked-simulation, scanned-actor, caustic-light, rack-focus-reveal, pass-through-transition |

These are directions, not instances. The menu is a floor: add an entry when a client needs one, and say so in the brief. The draw's value is that it is not drawn from the model's taste.

## From card to concept

For each card:

1. **Bind it to the truth sheet.** Which of the five product truths (what it is, what it replaces, the moment of use, the moment of purchase, the feeling) does each axis serve? An axis serving none is a default; redraw it with `--lock` on the others.
2. **Name the actor's states.** Variants (colour, material, form), poses, presence. A state list with one entry is a still, not an actor.
3. **Name the verbs** from `verbs.md`, with the mass of each. At least four families; none repeated back to back.
4. **Write the six-panel storyboard.** Panels are frames from the beat, not sections of the page. Each panel: the frame in one sentence, the verb in play, the copy on screen, the page colour.
5. **Write the logline** in one line, and **the sentence that would make it fail**. A failure sentence you cannot write means you do not understand the concept.
6. **Run the swap test.** Replace the client's logo with a competitor's. If the concept still works, it is a template: reject it.
7. **Run the squint test.** Blur the six panels. Do they still differ from each other, and from the earlier builds' panels? If not, the set or the ground has not been decided.

Recommend one card and say what you kept from the user's idea. An idea is a seed: when it fits the truth, build on it; when it does not, say why and propose what replaces it. Never discard an idea silently and never copy it blindly.

## World rules

Before looks, write five rules the world obeys. These are the brief's spine.

| Rule     | Question                                       | Example realisations (instances, not defaults) |
| -------- | ---------------------------------------------- | ---------------------------------------------- |
| Material | What is everything made of?                    | paper, glossy plastic, felt, wet clay, brushed metal, cut vinyl |
| Light    | Where does it come from and what does it do?   | a window at four o'clock, one overhead softbox, a lamp inside the box, flat print light with no shadows |
| Lens     | How wide, how deep, how still?                 | long lens with shallow focus, orthographic, a locked wide shot, a handheld drift |
| Time     | How does time move?                            | continuous, 12 fps stepped, slow-motion, reversed                                                      |
| Ground   | What does the actor stand on or travel across? | seamless paper, a table, a road, a shelf, nothing (a flat colour field)                                 |

Each rule must be answerable from the client's domain (the shoe's material is leather, the table is a pavement) or recorded as a deliberate departure with a reason. A rule that no one chose is the default cluster.

## Storyboard format

```
CONCEPT <n>: <logline>
Actor: <name> | states: <variant list> | verbs: <list with mass>
Set: <set> | camera: <grammar> | time: <model> | destination: <where, and the action it holds>
Panels:
  1. <frame> | verb | copy | page colour
  ... 6
Fails if: <one sentence>
Swap test: <result>
```

A storyboard is words and, where it helps, a sketch in ASCII. It is not a mood board.

## When the draw cannot be followed

If a client's constraint contradicts every card, the constraint wins and the card is redrawn with a `--lock`. Never override the draw because a card feels unfamiliar: unfamiliar is what it is for.
