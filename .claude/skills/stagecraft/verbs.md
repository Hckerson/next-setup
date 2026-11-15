# Verbs

A verb is a move an actor performs. The script (`lib/types/stage.ts`) is a list of shots, each a list of moves; `lib/stage/compile-script.ts` turns it into one GSAP timeline. This file says what each verb reads as and what it needs to carry **mass**.

## Mass

Every verb that moves an actor carries three things. Left at a library default, a move reads as a sticker.

| Part            | What it is                                                              | In code                          |
| --------------- | ----------------------------------------------------------------------- | -------------------------------- |
| **Anticipation** | A small move against the direction before the main move                | `anticipate(amount)` in `lib/stage/ease.ts` |
| **Settle**      | A damped overshoot that comes to rest, for moves in free space (scale, rotate). Never elastic | `settle(damping, frequency)` |
| **Rebound**     | A damped contact that never passes through the surface it lands on, for moves that end on a surface (a drop, a landing) | `rebound(damping, frequency)` |
| **Contact**     | A response from the set when the actor touches it (shadow, dust, give) | Set-specific; `contactShadow(height)` supplies the scale |

Moves that end on a surface use `rebound`, never `settle`: a verified bug in the first test build had a dropped actor overshoot through the floor. A set may dial mass down (a flat colour field has no contact) but states it in the brief.

## The vocabulary

| Verb       | Reads as                                              | Params (`lib/types/stage.ts`)                           | Mass                              |
| ---------- | ----------------------------------------------------- | ------------------------------------------------------- | --------------------------------- |
| `enter`    | The actor arrives; equal `from` and `to` is a fade in place | `from`, `to` waypoints                          | Rebound on arrival, shadow grows in |
| `exit`     | The actor leaves                                      | `from`, `to` waypoints                                  | Anticipation, then away           |
| `travel`   | The actor crosses the set along a path                | `path` waypoints, `bank`, `ease`                        | Banks into curves, settles at the end |
| `recolour` | The actor changes variant                             | `from`, `to` variant ids, `wipe`: `up`, `down`, `left`, `right`, `radial` | The change has a direction and takes time |
| `swap`     | One actor leaves while another arrives                | `outgoing`, `incoming`, `overlap` (0 to 1)              | Both carry their own enter and exit mass |
| `rotate`   | The actor turns to show another face                  | `axis`, `degrees`                                       | Anticipation and settle           |
| `scale`    | The actor grows or shrinks                            | `to`                                                    | Settle                            |
| `lift`     | The actor leaves the ground and hovers                | `from` height, `height`                                 | Shadow scales with height         |
| `land`     | The actor meets a surface                             | `from` height, `surface` height                         | Rebound and contact response      |
| `hold`     | The actor waits; the set carries the beat             | none                                                    | None; use it deliberately         |

Extend the vocabulary in `lib/stage/moves/` and here together: a verb without a row is undocumented, and a row without a move is a promise.

## Choosing verbs

- Use at least four families across the script; never the same verb twice in a row.
- The verb is chosen for what the product truth needs said. A `recolour` says "this comes in many forms"; a `land` into the destination says "this is yours now". Do not use a verb because it is impressive.
- The peak shot gets the longest length and the most verbs; the shot before it is the quietest.
- Copy is cued to a verb's label, never placed beside it by eye.

## Timing roles

Durations and curves are tokens in `lib/<feature>/constants.ts`, never literals. Name the roles, then set values from the set's time model.

| Role            | Used for                          |
| --------------- | --------------------------------- |
| `entrance`      | The actor arriving                |
| `transit`       | A `travel`                        |
| `change`        | A `recolour` or `swap`            |
| `landing`       | The `land` and its settle         |
| `dwell`         | A `hold`                          |

A stepped time model (12 fps) quantises these; the set file says how.

## Anti-patterns

- A verb with no cause: the actor moves because the beat needed motion. State the cause in the shot.
- Two verbs fighting for the same property on one actor at the same time.
- A `travel` that is a straight line between two points with no bank: the default path.
- A `recolour` that is an instant swap of a texture. The change has a direction and takes time.
