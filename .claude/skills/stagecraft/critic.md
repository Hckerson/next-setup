# The critic

Frames are graded by someone who did not make them. The maker always believes the frame is better than it is; the critic exists because of that.

## Who

A separate agent (the Agent tool), started fresh for each review, never the session that built the frames.

## What the critic gets

- The frames: a contact sheet of captures from `tools/shoot.mjs` (every shot, desktop and phone), copied to a neutral folder with neutral names.
- The measured report for those frames, when there is one.
- `generations.md` and `layers/`.

## What the critic never gets

The maker's name, the concept's story, the client, the grade anyone hopes for, earlier grades, or the source code. A critic who knows the intent grades the intent.

## What the critic returns

```
| Layer | Generation | Tells hit (IDs) | Evidence (frame, region) | Unmet baseline |
```

Then:

- **Would a client see this today:** yes or no, one sentence.
- **The three changes that would lift it most**, each naming the layer and the frame.
- **Unverified:** anything a frame cannot show (source checks, motion feel between frames).

A layer the frames cannot show is **Not graded**, never passed. A grade without a named frame is not a grade.

## Dailies

Each iteration's frames go to `/tmp/stagecraft/dailies/<build>/<iteration>/` with the critic's table beside them. Only frames the critic grades Fifth, or Fifth with named gaps, reach the owner, and they reach the owner with the table. The critic's three changes become the next iteration's work list.

## Calibration

Before the critic's grades are trusted, a fresh critic grades the calibration specimens blind (`generations.md`, Calibration). If it grades a specimen above the owner's verdict, the layer files are too vague: tighten the tells and baseline that let it through, and run again. Results go to `references/calibration.md`.
