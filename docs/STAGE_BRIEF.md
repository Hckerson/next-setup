# Stage brief: Kerfline

stagecraft's record of the stage. Type, tokens, primitives and chrome are in `docs/DESIGN_BRIEF.md`; this brief hands that one only the tones and the copy slots. Anything undecided is marked **open**.

## Truth sheet

| Line | Answer |
| ---- | ------ |
| What it is | A machine shop whose customers watch their own job on the line, and get every part's measured report with the part |
| What it replaces | Emailing the shop for status, hearing "it's on the machine", and a paper certificate in the box |
| The moment of use | An engineer checks the order mid-shift: which operation, which machine, first article measured or not |
| The moment of action | Approving the first article from its measured report, so the batch runs |
| The feeling it leaves | The part is already real and already right: measured, not promised |

## Concept

- **Draw:** `node .claude/skills/stagecraft/tools/draw.mjs --sector Manufacturing --kind physical`, concept 1 (paired with the page's direction 1; chosen by the owner 2026-11-18 as "B · The finished part").
- **Logline:** a part is cut, measured, marked and packed, close enough to see the tool's marks; the box on the scale is the end of the story and the start of the next part.
- **Fails if:** it reads as a luxury product shot of shiny metal (glossy, floating, flawless); or the camera never leaves macro, so the part is never seen whole; or the measurements are decoration rather than proof.
- **Swap test:** a rival shop could show machining macro, so the stage does not rest on the metal: it rests on Kerfline's promise, the measured report travelling with the part and the visitor's own number on it. Re-run on the styleframes.
- **From the owner's idea:** the owner asked for variety and Tekcify's level of creativity as the floor; nothing of Tekcify's is used.

| Axis | Value | Bound to which truth line |
| ---- | ----- | ------------------------- |
| Arc | packing: made ready, then travels into its container | The feeling: already real, already right |
| Actor | ingredient: a 6061 billet that becomes the part | What it is |
| Destination | scale: the packed box weighed | The moment of action, closed: the batch ships |
| Camera | cut-edit: focus pulls are the cuts | The moment of use: checking one thing at a time |
| Time | looped: the last shot hands to the next billet | What it replaces: the line never stops to be asked |
| Set | macro-material | What it is: a shop that works in hundredths |
| Signature | rack-focus reveal: from the part to its engraved tag | The feeling: this part is yours, and it is right |

## Storyboard

1. **Facing.** Millimetres from the billet as the face mill's last pass leaves its marks; coolant film; the raw grey of the bar. Copy: what Kerfline is.
2. **Edge.** The chamfer tool breaks the edge; one chip curls away. Copy: what it replaces.
3. **Measured.** The CMM's ruby probe touches the bore; the page prints nominal, actual and deviation on its tolerance band. Copy: the proof.
4. **Marked.** The part's lot code is engraved, and it is the visitor's (the play). Copy: your job, live.
5. **Packed.** The part laid into cut foam beside its printed report.
6. **Weighed.** The box on the scale; rack focus from the box to the engraved tag (signature); the next billet slides into the vice. Copy: the action, approve your first article.

## World rules

| Rule | Decision | Source |
| ---- | -------- | ------ |
| Material | 6061 aluminium as cut: feed marks from the real feed and tool, a burr until the chamfer, coolant film, fingerprints on the packed part | The billet and the operations on it |
| Light | Raking light from a shop's LED machine lamp, low and to one side, cool white; the inspection room's overhead diffuse for shot 3 | The machine's work lamp; the inspection room |
| Lens | Macro, very shallow depth of field; focus pulls are the cuts; one pull-back per loop to the whole part (set failure mode) | `sets/macro-material.md` |
| Time | One loop of one part; the shop clock reads the visitor's local time | The shift |
| Ground | The material itself; foam and cardboard in shots 5 and 6 | The dispatch bench |

## Actors

| Actor | States | Parts named for verbs | Real size | Asset tier |
| ----- | ------ | --------------------- | --------- | ---------- |
| The part | billet, faced, chamfered, measured, engraved, packed | face, bore, edge, engraving field | **open** (about 60 × 40 × 20 mm) | A once modelled in Blender from a drawing made for it |
| Probe, tool, foam, box, scale | one state each | probe tip, insert, foam cut-out, scale display | real sizes | A, modelled |

## Shot list

**Open** until the styleframes: shares of scroll, focal lengths and tones per shot. **Peak shot:** 6, the rack focus to the tag.

## Handoff to pagecraft

- **Tones:** one ground and ink pair per shot, **open**.
- **Copy slots:** **open**, decided with the styleframes.

## Asset manifest

| Asset | Role | Source | Licence | Size | Cost after any free trial | Status |
| ----- | ---- | ------ | ------- | ---- | ------------------------- | ------ |
| The part, tools, probe, box, scale | Actors and props | Modelled in Blender (installed) | Own | **open** | Free | planned |
| Macro texture of machined aluminium | The set's core axis: a real texture, not noise | Computed in Blender from real cutting data: feed per tooth, cutter diameter and step-over set the arcs; a measured chatter variation on top; CC0 scanned scratches and fingerprints layered over (owner's choice, 2026-11-18) | Own; CC0 layers | **open** | Free | planned |
| Shop lighting HDRI | Fill and reflections | Poly Haven via `tools/assets.mjs` | CC0 | **open** | Free | planned |

The set asks for a scanned or photographed texture. No machined-aluminium scan exists, free or paid (searched 2026-11-18). Milling marks are deterministic (their spacing is the feed per tooth), so marks computed from real cutting data are the surface's real structure, not noise; the critics judge whether it reads as real, and a photograph of a real part is the upgrade if it does not.

## Render and delivery

- **Route:** B, a Blender render scrubbed as video, with shot 4 as a tracked plate: the render exports its camera per frame, and the visitor's lot code is DOM text projected onto the engraving field through that camera (`lib/stage/world-anchor.ts`), so the engraving is live and real text (owner's go-ahead, 2026-11-18). Risk: DOM text must read as cut into metal, not laid over it; the critics judge it on the shot 4 frames.
- **Tone mapping, exposure, grade:** **open**.
- **Tiers and phone film:** **open**; the same camera path as video is the default for the phone.

## Dailies log

| Iteration | Date | Critic's grades by layer | The three changes | Done |
| --------- | ---- | ------------------------ | ----------------- | ---- |
| 01 (stills: Facing, Measured, Weighed) | 2026-11-18 | Two critics, confirmed: Material Fourth (MAT-G4-1, 3 of 3), Light Fourth (LGT-G4-1); Form, Set, Render Fifth with gaps; Camera disputed (CAM-G4-3, one critic); overall Fourth. Both read the probe as a liquid drip | 1. Light: one named raking key that casts (stylus on the bore wall, box on the platform, grazing relief on the cut). 2. Material: an imperfection layer at real scale (dust in the cut, fingerprints, platform smudges) and no moiré at the closest shot; box scuffs that obey the light. 3. Form: the box sits on its own base, flutes on cut edges, a chamfered bore, and a probe that reads as a probe | |

## Fingerprint row

After verification. Differs from Receipt on every drawn axis: actor, arc, set, destination, camera, time and signature.
