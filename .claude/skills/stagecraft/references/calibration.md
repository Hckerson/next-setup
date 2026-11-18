# Calibration

Each run: a fresh critic agent, given only the frames, `critic.md`, `generations.md` and `layers/`, grades a specimen whose owner verdict is known. The critic is never told the verdict.

| Date       | Specimen                                   | Owner's verdict | Critic's grades (blind)                                                                                       | Result |
| ---------- | ------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------- | ------ |
| 2026-11-12 | Tidemark Sunline grey-block animatic, 5 desktop frames in `references/calibration/animatic/` (the build itself was deleted) | Below first ("-5") | Form, Material, Light, Set, Render: Pre-first. Camera, Integration: First. Motion, Delivery: Not graded. "Would a client see this today: No" | Pass: nothing graded above First |
| 2026-11-12 | Ward healthcare filament page             | First in quality, fourth by cluster | Not run: the frames were lost from /tmp and the build was reverted | Not run |
| 2026-11-13 | A captured premium-template page (watch brand), 3 frames in `references/calibration/fourth/` | Fourth (chosen as the template the skill must not produce) | Form, Material, Light, Camera, Render, Integration: Fourth. Set: Third. Motion, Delivery: Not graded. "Would a client see this today: No" | Pass: nothing graded above Fourth |
| 2026-11-18 | Receipt scroll page (Tidemark), final round | Fourth (owner: "kinda like 4", liked, not the ceiling) | Form, Light, Camera, Render, Integration: Fifth with gaps; Set: Fifth; Material, Motion: Fourth | Fail: the critic reads a step soft at the top. The owner's Fifth is above anything built or captured so far |
| 2026-11-18 | Rerun after the overall-reading rule (`generations.md`, Overall reading): Receipt final, 36 frames | Fourth (owner) | Fourth / Fourth. Cited by both: MAT-G4-1 (pristine receipt, f30–f35), SET-G4-5 on the opening shot (f01 empty sheet), CAM-G4-2 (no focus anywhere), MOT-G4-3 (view labels before geometry, orphan leaders, ghosted pocket: f13, f21–f23, f27, f29). Both found two fifth properties unmet | Pass: the weakest-layer rule removes the soft step |
| 2026-11-18 | Tekcify, 36 frames from its scroll sequence, no set file given | Fourth (owner, as a whole site; graded Fourth by pagecraft's critics) | Pre-first / Pre-first. Cited by both: SET-G0-1 (flat grey void on the opening shot), no nameable light (LGT-G0-1 / LGT-G1-1), stock 3D emoji as actors (FRM-G1-1), contrast (INT-G4-2), crushed blacks (RND-G4-2). Both called it a polished 2D page that stage tells built for a lit world read as programmer art | Superseded by the next two rows: the critic now gets the set file (`critic.md`) |
| 2026-11-18 | Receipt final, 36 frames, with its set file (`sets/technical-drawing.md`) | Fourth (owner) | Fourth / Fourth. The set's notes set aside the unlit line states, CAM-G4-2 and the rectangle detector, as intended. Cited by both: SET-G4-5 on the opening shot (f01), MOT-G4-3 (f12/f13, f21, f27, f29), MAT-G4-1 (the pristine receipt, f30–f35) | Pass: the set file does not lift it above the owner |
| 2026-11-18 | Tekcify, the same 36 frames, with the closest set (`sets/print-catalogue.md`) | Fourth (owner) | First / Fourth. Cited by both, so grade-setting: MAT-G4-1, LGT-G4-5, SET-G4-2, RND-G4-2, INT-G4-2, all Fourth. Disputed (one critic): FRM-G1-1 and LGT-G1-1 on the stock 3D emoji. Both found the frames break the set's own rules (cast shadows, no paper), so print-catalogue is a near fit, not a fit | Pass: confirmed Fourth, the owner's grade. No set yet fits a flat graphic stage; recorded, not acted on |

## What the critic found that the maker missed

The 2026-11-12 run named defects the maker had not reported: the traced coin lands embedded in the billboard (MOT-G4-1), the sun strip passes through the jar, contact shadows are discs that ignore the actors' shapes (LGT-G3-2), and the opening copy sits at about 3:1 contrast mid-fade (INT-G4-2). Blind review earns its place.

## Next specimens

- The first fifth-generation references from `references/`: the critic must not place them below Fifth with gaps.
