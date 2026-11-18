# The critic

Frames are graded by someone who did not make them. The maker always believes the frame is better than it is; the critic exists because of that.

## Who

A separate agent (the Agent tool), started fresh for each review, never the session that built the frames.

## What the critic gets

- The frames: a contact sheet of captures from `tools/shoot.mjs` (every shot, desktop and phone), copied to a neutral folder with neutral names.
- The measured report for those frames, when there is one.
- `generations.md` and `layers/`.
- The set file the stage brief names (`sets/<set>.md`). Its rules and grading notes say which tells do not apply to it (an unlit line state in `technical-drawing`, no cast light in `print-catalogue`); a tell the set exempts is not graded. A calibration specimen gets the set its frames fit most closely, recorded in `references/calibration.md`.

## What the critic never gets

The maker's name, the concept's story, the client, the grade anyone hopes for, earlier grades, or the source code. A critic who knows the intent grades the intent.

## What the critic returns

```
| Layer | Generation | Tells hit (IDs) | Evidence (frame, region) | Unmet baseline |
```

Then:

- **The fifth properties:** each of the five in `generations.md` (The fifth, defined) as met, unmet or not visible, with frames.
- **Overall reading:** by the rule in `generations.md` (Overall reading).
- **Would a client see this today:** yes or no, one sentence.
- **The three changes that would lift it most**, each naming the layer and the frame.
- **Unverified:** anything a frame cannot show (source checks, motion feel between frames).

A layer the frames cannot show is **Not graded**, never passed. A grade without a named frame is not a grade.

## Sampling is fixed

Rounds of the same kind see the same frames, so a grade can only move when the pixels do.

- **Stills:** one frame per shot, at its rest pose.
- **Motion:** 36 frames evenly spaced from the top of the page to the bottom, every round. Prevalence (`generations.md`) counts shots, so a count over 24 frames and one over 36 do not compare.

## Rest frames and change frames

A **rest frame** is one where no verb is in progress: the actor holds. A **change frame** is sampled mid-verb, which a scrubbed page allows anywhere.

- Set density (SET-G4-5), Material, Light, Render and copy contrast are graded on rest frames. On a change frame they are listed, never grade-setting: a sheet mid-collapse is sparse by nature, and a headline mid-wipe is faint by nature.
- A change frame is graded for coherence only: MOT-G4-3, and FRM-G4-3 where an object is drawn wrong rather than caught moving.

## Two critics, one verdict

A single critic drifts. Across six rounds on Receipt, the same unchanged frames swung between Fourth and Fifth on Form, Set, Material and Integration (2026-11-16/17), so one critic's table is a reading, not a verdict.

- A round that decides a grade runs two critics on the same frames, independently, and neither sees the other.
- A tell sets a layer's grade only when both cite it: the same ID on overlapping frames. A tell only one cites is listed as **disputed**, with its evidence, and fixed if the maker agrees, but it does not set the grade.
- If the two tables still differ on a layer, report the range ("Fourth to Fifth with gaps") with both evidence lists. The owner sees the range, never a coin toss presented as a verdict.

## Dailies

Each iteration's frames go to `~/.cache/stagecraft/dailies/<build>/<iteration>/` (`/tmp` is wiped on restart) with the critic's table beside them. Only frames the critic grades Fifth, or Fifth with named gaps, reach the owner, and they reach the owner with the table. The critic's three changes become the next iteration's work list.

## Calibration

Before the critic's grades are trusted, a fresh critic grades the calibration specimens blind (`generations.md`, Calibration). If it grades a specimen above the owner's verdict, the layer files are too vague: tighten the tells and baseline that let it through, and run again. Results go to `references/calibration.md`.
