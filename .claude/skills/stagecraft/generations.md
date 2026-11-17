# Generations of the stage

web-generations grades the layers of an interface. This file grades the stage: everything stagecraft makes. That means the actors and their form, materials, light, set, camera, motion, render, how each frame sits with its copy, and how it is delivered. It uses web-generations' dial: third or older fails, fourth passes only with a stated reason, fifth is the goal.

## The ladder

Named like web-generations' generations: each is defined by the technology shift that produced its look.

| Generation    | Enabling shift                                     | What the stage looks like                                                                                          |
| ------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Pre-first** | Nothing; a placeholder shown as work               | Unlit flat grey blocks, no material, no light, no shadow you would believe. Programmer art. Never shown to a client |
| **First**     | Hand-made images                                   | A product photo or clip-art on a plain ground; a looping GIF; a static hero                                        |
| **Second**    | Flash, sprite sequences, early CSS                 | A 360 drag spin, flat cut-outs sliding in parallax, drop shadows, bevel and gloss, an intro to skip                |
| **Third**     | WebGL libraries, stock 3D and footage              | A default-lit model (ambient plus one directional), a gradient sky, an orbit spin, a stock-footage hero under a dark overlay |
| **Fourth**    | PBR and post-processing defaults                   | The premium template: dark ground, studio-HDRI gloss, bloom, one flawless object floating, a field of fine glowing lines, everything clean |
| **Fifth**     | Decided pipelines: scan, simulate, bake, grade, critique | A world you could photograph, that reacts to the visitor, filmed by someone who knows what they are doing      |

The fourth is the dangerous one, as in web-generations: it looks expensive and passes structural checks. Its **default cluster** on the stage: dark ground, emitted glow, a floating hero, perfect materials, library tone mapping, one ease. One axis at default is a gap; three at once is the fourth generation.

## The fifth, defined

Five properties. All are required; none is a look.

1. **Every frame could hang on a wall.** Styleframes at final quality pass the blind critic (`critic.md`) before anything moves.
2. **The world has physics, and it scrubs.** Where the concept moves matter (pour, fall, fill, drape, shatter), the motion is a simulation baked for playback, exact in both scroll directions, not a tween pretending.
3. **Light is a character.** It has a source you can point to, a quality, a direction and a time; it casts, bounces and reveals (shadow, contact, caustic, haze, dust) as the set's rules say.
4. **The visitor is inside it.** The world reacts to who is watching (their local time, their input, their pointer) while the story stays deterministic.
5. **One film on every device.** A phone sees the same film as a desktop: a lighter real-time path or the identical camera path rendered to video, never a cut-down page.

On top of the baseline, each concept earns **one signature move**: a one-shot camera through objects, text printed in the world, a live product screen inside the scene, a simulation the visitor feeds with their own number. It is chosen per concept, recorded in `references/fingerprints.md`, and struck from the next draw, so no signature hardens into the next template.

## Layers

The stage is graded per layer, never as a whole. Each layer file has tells with IDs and detectors, floor against baseline, baseline criteria stated as properties, set notes, and checks.

| #  | Layer           | File                       | Upstream        |
| -- | --------------- | -------------------------- | --------------- |
| 1  | Form            | `layers/01-form.md`        | none            |
| 2  | Material        | `layers/02-material.md`    | form            |
| 3  | Light           | `layers/03-light.md`       | form, material  |
| 4  | Set             | `layers/04-set.md`         | light           |
| 5  | Camera          | `layers/05-camera.md`      | set             |
| 6  | Motion          | `layers/06-motion.md`      | form, camera    |
| 7  | Render          | `layers/07-render.md`      | light, camera   |
| 8  | Integration     | `layers/08-integration.md` | render, copy    |
| 9  | Delivery        | `layers/09-delivery.md`    | everything      |

A recurring tell is usually inherited: a flat frame is a light problem before it is a render problem. Trace it upstream and fix it where it starts.

## Convergence

| ID        | Gen    | Tell                                                         | Detector                                                                                   | Instead                                                        |
| --------- | ------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| CONV-G4-1 | Fourth | The build resembles an earlier build on its measured frames | `tools/shoot.mjs --compare` finds a row in `references/fingerprints.md` within the threshold | Change the set, the light's world rule or the arc, and measure again |
| CONV-G4-2 | Fourth | The frame is the category's stock photo: a heap of gold coins under shallow focus, a sneaker floating on colour, a laptop on a desk at golden hour | Frame (J): a blind viewer names it as stock imagery of the category | The concept's own frame: the signature move, the story's moment, a view the stock library does not have |

A build can pass every layer and still be the last build again. This tell is graded across the whole stage, not per layer.

## Grading

- **Prevalence**, as in web-generations: a tell on 3 or more shots, or on at least half the graded shots when fewer than five are graded, or in one shared material, rig or ease, sets the layer's grade. A tell on a small prop (anything that is not the hero or the set's ground) is isolated unless it appears in 3 or more shots: it is listed and fixed, but does not set the layer's grade. The opening shot is the first paint: a tell on it sets the grade of Set and Delivery whatever the count. An isolated hit is listed and fixed.
- **Evidence** is a file and line, an asset report (`gltf-transform inspect`), or a captured frame with its measured numbers. A grade without evidence is not a grade.
- **Blind.** Frame grades come from the critic (`critic.md`), who never sees who made the frames, the concept's story, or the grade anyone hopes for.
- **Fifth with gaps** when no tell recurs but a baseline criterion is unmet; it is not Fifth until met or named as a deliberate exception.

## Deliberate exceptions

An older device used on purpose is a decision: a 360 drag viewer in a configurator section, a stepped flat cut-out in a paper-cut set. Name the device, the reason and where it is confined.

## Calibration

The ladder is only useful if it reproduces the owner's eye. Two verdicts were given by the owner on 2026-11-12:

| Specimen                                | Owner's verdict                     |
| --------------------------------------- | ----------------------------------- |
| The Tidemark Sunline grey-block animatic | Below first ("-5")                  |
| The Ward healthcare filament page        | First-generation in quality; fourth by its cluster |

The Ward frames were lost before the first run, so that specimen is replaced by a captured fourth-generation page (see `references/calibration.md`). A change to any layer file must be re-run blind against the specimens. If the critic grades either above the owner's verdict, the layer files are too vague: report that instead of grading. Calibration results are recorded in `references/calibration.md`.

## Report

```
| Layer | Generation | Set fit | Prevalence | Tells hit (IDs) | Unmet baseline | Evidence | Action or reason |
```

Then **Isolated hits**, **Deliberate exceptions**, **Not audited**, **Unverified**.
