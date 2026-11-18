# The critic

Screens are graded by someone who did not build them. The builder always believes the page is better than it is; the critic exists because of that. The builder's audit (`audit.md`) finds tells to fix. The critic's table is the grade.

## Who

A separate agent (the Agent tool), started fresh for each review, never the session that built the screens.

## What the critic gets

- The frames, from `verify.md`'s capture, copied to a neutral folder with neutral names (`f01.jpg`, `f02.jpg`), and an index saying only each frame's width and state ("390, error").
- The measured report for those frames: the style census and the contrast samples.
- `generations.md`, the layer files for the layers in the frames, `worlds/<world>.md` (its category template is the CONV-G4-3 detector) and the register file the brief names.

## What the critic never gets

The builder's name, the brief's story, the client, the grade anyone hopes for, earlier grades, or the source code. A critic who knows the intent grades the intent.

## Sampling is fixed

Rounds of the same kind see the same frames, so a grade can only move when the pixels do.

- **Styleframes:** each key screen at 1440x900 and 390x844, at rest.
- **A build:** every route in scope at both widths, at rest, scrolled to the top and to each section that fills the viewport; then one frame per state the route has (empty, loading, error, selected, disabled, too long), and hover, press and focus on one control of each kind.
- The capture command and its flags go in the dailies log, so the next round reruns it unchanged.

## Rest frames and change frames

A **rest frame** has no transition in progress. A **change frame** is caught mid-transition (an overlay entering, a row leaving).

- Type, colour, density, shape, elevation and contrast are graded on rest frames only.
- A change frame is graded for coherence only: an element drawn wrong, a state that never exists at rest, a jump.

## What the critic returns

```
| Layer | Generation | Tells hit (IDs) | Evidence (frame, region) | Unmet baseline |
```

Then:

- **Convergence:** CONV-G4-3 and CONV-G4-4, each with a yes or no and the frames.
- **Overall reading:** by the rule in `generations.md` (Overall reading), with the override applied when all three conditions hold.
- **Would a client in this sector pay for this today:** yes or no, one sentence.
- **The three changes that would lift it most**, each naming the layer and the frame.
- **Unverified:** anything a frame cannot show (keyboard order, timing between frames, source checks).

A layer the frames cannot show is **Not graded**, never passed. A grade without a named frame is not a grade.

## Two critics, one verdict

A single critic drifts: on Receipt the same unchanged frames swung between Fourth and Fifth across rounds (stagecraft, 2026-11-16/17).

- A round that decides a grade runs two critics on the same frames, independently; neither sees the other.
- A tell sets a layer's grade only when both cite it: the same ID on overlapping frames. A tell only one cites is **disputed**: listed with its evidence and fixed if the builder agrees, but it does not set the grade.
- If the two tables still differ on a layer, report the range ("Fourth to Fifth with gaps") with both evidence lists. The owner sees the range, never a coin toss presented as a verdict.

## Dailies

Each iteration's frames go to `~/.cache/pagecraft/dailies/<build>/<iteration>/` (`/tmp` is wiped on restart) with both critics' tables beside them, and a row goes into the brief's dailies log. Only frames graded Fifth, or Fifth with named gaps, reach the owner, and they reach the owner with the tables. The critics' three changes become the next iteration's work list.

## Calibration

Before the critic's grades are trusted, a fresh critic grades specimens whose owner verdict is known, blind (`references/calibration.md`). If it grades a specimen above the owner's verdict, the layer files are too vague: tighten the tells and baseline that let it through, and run again. A change to `generations.md` or a layer file reruns calibration.
