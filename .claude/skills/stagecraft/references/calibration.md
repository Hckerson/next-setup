# Calibration

Each run: a fresh critic agent, given only the frames, `critic.md`, `generations.md` and `layers/`, grades a specimen whose owner verdict is known. The critic is never told the verdict.

| Date       | Specimen                                   | Owner's verdict | Critic's grades (blind)                                                                                       | Result |
| ---------- | ------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------- | ------ |
| 2026-11-12 | Tidemark Sunline grey-block animatic, 5 desktop frames in `references/calibration/animatic/` (the build itself was deleted) | Below first ("-5") | Form, Material, Light, Set, Render: Pre-first. Camera, Integration: First. Motion, Delivery: Not graded. "Would a client see this today: No" | Pass: nothing graded above First |
| 2026-11-12 | Ward healthcare filament page             | First in quality, fourth by cluster | Not run: the frames were lost from /tmp and the build was reverted | Not run |
| 2026-11-13 | A captured premium-template page (watch brand), 3 frames in `references/calibration/fourth/` | Fourth (chosen as the template the skill must not produce) | Form, Material, Light, Camera, Render, Integration: Fourth. Set: Third. Motion, Delivery: Not graded. "Would a client see this today: No" | Pass: nothing graded above Fourth |

## What the critic found that the maker missed

The 2026-11-12 run named defects the maker had not reported: the traced coin lands embedded in the billboard (MOT-G4-1), the sun strip passes through the jar, contact shadows are discs that ignore the actors' shapes (LGT-G3-2), and the opening copy sits at about 3:1 contrast mid-fade (INT-G4-2). Blind review earns its place.

## Next specimens

- The first fifth-generation references from `references/`: the critic must not place them below Fifth with gaps.
