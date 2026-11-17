# Stage brief: <project>

Copy to `docs/STAGE_BRIEF.md`. This is stagecraft's record of the stage. Type, tokens, primitives and chrome go in web-generations' `docs/DESIGN_BRIEF.md`; this brief hands that one only the tones and the copy slots below. Mark anything undecided as **open**; never guess.

## Truth sheet

| Line                 | Answer |
| -------------------- | ------ |
| What it is           |        |
| What it replaces     |        |
| The moment of use    |        |
| The moment of action |        |
| The feeling it leaves |       |

## Concept

- **Draw:** the `tools/draw.mjs` command and seed, and the card chosen.
- **Logline:**
- **Fails if:**
- **Swap test:** the result, and why.
- **From the owner's idea:** what was kept, what was changed and why.

| Axis        | Value | Bound to which truth line |
| ----------- | ----- | ------------------------- |
| Arc         |       |                           |
| Actor       |       |                           |
| Destination |       |                           |
| Camera      |       |                           |
| Time        |       |                           |
| Set         |       |                           |
| Signature   |       |                           |

## World rules

| Rule     | Decision | Source in the client's domain, or the reason for departing from it |
| -------- | -------- | ------------------------------------------------------------------ |
| Material |          |                                                                    |
| Light    | source, direction, quality, colour temperature, time |                      |
| Lens     |          |                                                                    |
| Time     |          |                                                                    |
| Ground   |          |                                                                    |

## Actors

| Actor | States (variants, poses, presence) | Parts named for verbs | Real size | Asset tier (`assets.md`) |
| ----- | ---------------------------------- | --------------------- | --------- | ------------------------ |

## Shot list

The script in `lib/<feature>/script.ts` is the source of truth; this table is its summary for review.

| Shot | Share of scroll | Verbs (with mass) | Camera and focal length | Focus | Tone (ground, ink) | Copy slot |
| ---- | --------------- | ----------------- | ----------------------- | ----- | ------------------ | --------- |

**Peak shot:** the one reduced motion shows, and the poster.

## Handoff to web-generations

- **Tones:** one ground and ink pair per shot, written by web-generations as `--tones-<shot>-ground` and `--tones-<shot>-ink`.
- **Copy slots:** per shot, the region of the frame reserved for copy (for example, left third below the horizon), so the camera keeps it clear and contrast holds.

Nothing else is shared.

## Asset manifest

| Asset | Role | Source | Licence | Size | Cost after any free trial | Status |
| ----- | ---- | ------ | ------- | ---- | ------------------------- | ------ |

Status is one of: planned, sourced, built, optimised, verified.

## Render and delivery

- **Route** (`techniques.md`) and why the others lose.
- **Tone mapping, exposure and grade**, with the reason.
- **Post nodes**, each with a reason; none by default.
- **Tiers:** desktop, phone and low power, with the first-load budget and the DPR range of each.
- **Phone film:** a lighter real-time path, or the identical camera path rendered to video.
- **Poster and reduced-motion still:** rendered from the peak shot.

## Dailies log

| Iteration | Date | Critic's grades by layer | The three changes | Done |
| --------- | ---- | ------------------------ | ----------------- | ---- |

## Fingerprint row

The row to append to `references/fingerprints.md` after verification, with the measured numbers from `tools/shoot.mjs`.
