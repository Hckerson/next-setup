# Calibration

Each run: a fresh critic agent, given only the frames, `critic.md`, `generations.md`, the layer files, and the world file for the specimen's sector, grades a specimen whose owner verdict is known. The critic is never told the verdict. Frames are kept in `references/calibration/<specimen>/` so a later change to the layer files can be rerun against them.

| Date | Specimen | Owner's verdict | Critic's grades (blind) | Result |
| ---- | -------- | --------------- | ----------------------- | ------ |
| 2026-11-17 | Manufacturing templates: Industrial (Anps), Manufacturer (StylemixThemes), Real Factory (GoodLayers) | Fourth (template, outside) | Third / Third; Fourth / Third; Third / Third. CONV-G4-3 and CONV-G4-4 cited by every critic | Pass |
| 2026-11-17 | Hospitality templates: Grand Restaurant, White Rock, Laurent | Fourth (template, outside) | Third / Third on all three; CONV-G4-3 cited, "the world file's template almost word for word" | Pass |
| 2026-11-17 | Manufacturing nominees: Milrem Robotics, MWDT, Kardev | Below award (outside) | Fifth with gaps (both); Fourth (both); Third (both) | Pass |
| 2026-11-17 | Hospitality nominees: Margaret's, Onyx, SEM | Below award (outside) | Fifth with gaps (both) on all three | Pass, but the critic does not separate them from the winners |
| 2026-11-17 | Winners: Jonite (7.19), Gucci Osteria (7.68) | Fifth (outside) | Fifth with gaps (both) on both | Pass |
| 2026-11-17 | Winner: Q-Industrial (7.26) | Fifth (outside) | Fourth (both): CONV-G4-3 (turbine at sunset, abstract glowing 3D), CONV-G4-4 (generic copy), `transition: all`, secondary text about 3.6:1 | Fail: graded below the outside verdict. Open: is the ladder stricter than the jury on purpose (sector convergence, which Awwwards does not score), or too harsh? Owner's eye decides |
| 2026-11-17 | Winner: Tigermilk (7.39) | Fifth (outside) | Fourth (both) | Void: the home page does not scroll (document height 0); every frame is the same full-screen video, so the critics graded a splash, not the awarded page |
| 2026-11-18 | Q-Industrial, owner's eye | Third (owner, outranks the jury) | Round 1: Fourth / Fourth. After the stock-footage and stand-in-render tells were tightened (SEC-G3-1, `cross-cutting.md`): Section Third in both, overall Fourth / Fourth by majority. With the overall-reading override (`generations.md`): Third / Third | Pass after two changes |
| 2026-11-18 | Controls after the change: Jonite, Gucci Osteria, Milrem | Must not drop | Jonite Fifth with gaps / Fifth with gaps; Gucci Fifth with gaps / Fifth with gaps; Milrem Fifth with gaps / Fourth (default Tailwind curve, radius and border found by one critic) | Pass; Milrem's range is a disputed reading, not the change |
| 2026-11-18 | Crav Burgers (7.25), replacing Tigermilk | Fifth (outside) | Fifth with gaps / Fourth: stock lifestyle photos and generic slogans in both; one critic also cited the template | Range, reported as such |
| 2026-11-18 | All 17 specimens above, including every Site of the Day | Third (owner: "they all look the same, boxed up") | Read Third to Fifth with gaps; seven read Fifth with gaps | Fail: two steps too soft on seven. Added PAG-G3-2 (the boxed page) and PAG-B5 (one composed world); rerun pending |
| 2026-11-18 | Receipt (stage build, next-setup, now in `web/tidemark`) | Fourth (owner: liked it, but not the ceiling) | stagecraft's critic read Fifth with gaps on most layers (`docs/STAGE_BRIEF.md` in tidemark) | Fail in stagecraft too: one step soft |
| 2026-11-18 | Rerun of the seven that read Fifth with gaps (Jonite, Gucci, Milrem, Onyx, Margaret's, SEM, Crav), after PAG-G3-2 and PAG-B5 | Third (owner) | Both critics graded Page Third on all seven (PAG-G3-2, or a third-generation tell on the first paint). By layer majority four still read Fifth with gaps or Fourth; both critics flagged that the majority rule let boxed pages through. With the Page cap added to the overall reading (`generations.md`): Third / Third on all seven | Pass after the cap |
| 2026-11-18 | Tekcify (owner's creativity reference, `references/tekcify.md`) | Fourth (owner: learn its creativity, feel and premium simplicity; graded Fourth on purpose so it is never the ceiling) | Fourth / Fourth. Neither boxed (PAG-G3-2 did not fire) nor one continuous world (PAG-B5 half met: light, black, light cuts; empty beats); stock 3D emoji and a generic SaaS purple cited by both | Pass: reads above the boxed sites and below Fifth, as the owner graded |

Pass: nothing graded above the owner's verdict on any layer. A fail names the layer file that let it through and the tell or baseline added to fix it.

## Outside verdicts

Where the owner has not judged a specimen, a published verdict stands in, and the owner checks a sample by eye.

| Band | Source | Verdict it supports | The critic passes if |
| ---- | ------ | ------------------- | -------------------- |
| Template | A sector's best-selling commercial template (sales on the marketplace listing) | Fourth: the category template | It grades Fourth or lower and cites CONV-G4-3 |
| Nominee | An Awwwards nominee with no Honorable Mention (the jury bar is 6.5) | Not shown to be award level; weak evidence, since a site can miss on the user vote alone | It does not grade it Fifth |
| Winner | An Awwwards Site of the Day with a published jury score | Fifth | It does not grade it below Fifth with gaps |

Awwwards judges marketing pages, so these bands calibrate the marketing surface well and app screens weakly.

## Findings from the first run (2026-11-17)

- Two critics per specimen agreed on 15 of 16 overall readings; the one split was Third against Fourth on a template.
- No template read above Fourth, and every critic cited the category template on every template. Real sites spread from Third (Kardev) to Fifth with gaps, so a weak real site can read as low as a template, which is the intent. The ladder does not separate award winners from nominees: four of six nominees read Fifth with gaps, the same as two winners. That band is weak evidence (a nominee can miss on the user vote alone), so this is expected, not a fault.
- Frames are kept in `~/.cache/pagecraft/calibration/` and the blind folders in `~/.cache/pagecraft/critic/`; copy a specimen into `references/calibration/` before relying on it for a rerun.

## Specimens

- **First set (2026-11-17):** for each of Manufacturing and Hospitality, three best-selling templates, three nominees and two winners, under the outside verdicts above; the owner asked for published verdicts in place of their own list. Any site the owner names later joins with the owner's verdict, which outranks a published one.
- **The bar from above:** one captured fifth-generation reference per world, once captured: the critic must not place them below Fifth with gaps.
