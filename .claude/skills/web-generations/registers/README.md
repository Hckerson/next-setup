# Registers

The fifth generation is a quality bar, not a look. A **register** is one coherent point of view that meets the bar: a family of style decisions that hang together. Premium products in different registers legitimately disagree about borders, accent, radius, tracking, chrome and density; they agree on the baseline in each layer file.

Three axes, never merged:

| Axis       | Question                    | Where it lives                                    |
| ---------- | --------------------------- | ------------------------------------------------- |
| Generation | How good are the decisions? | `generations.md`, the Baseline in each layer file |
| Register   | Which family of decisions?  | This folder                                       |
| Surface    | App or marketing?           | The App and Marketing variants in each layer file |

## The registers

| Register                 | Point of view                                                                                             | Exemplars                       | File                |
| ------------------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------- |
| Developer-tool minimal   | A quiet instrument for experts: dim chrome, alpha hairlines, dense rows, keyboard first                   | Linear, Vercel, Stripe, Raycast | `developer-tool.md` |
| Editorial                | A publication: the content object is the hero and the interface is paper around it                        | Stripe Press, The Pudding       | `editorial.md`      |
| Warm utility             | A calm, human tool: one derived neutral system, one friendly accent, soft blurred depth                   | Notion, Things, Bear            | `warm-utility.md`   |
| Tactile and hardware     | A product datasheet or faceplate: flat, near-borderless, printed-legend type                              | Teenage Engineering, Nothing    | `tactile.md`        |
| Industrial and technical | An instrument or trading desk: hard edges, high contrast, learned conventions, expert density             | Ableton, Bloomberg              | `industrial.md`     |
| Trust and finance        | Money is the content: amounts legible, attributable and calm; proof shown in the same system as the claim | Mercury, Wise                   | `trust.md`          |
| Playful and bold         | A toy with rules: saturated colour with jobs, characters or physical feedback that carry state            | Duolingo, Headspace, Figma      | `playful.md`        |
| Luxury and restraint     | The object is the hero: very few values reused hundreds of times; confidence in what is left out          | Aesop, Apple                    | `luxury.md`         |

Evidence for every register is in `references/registers/` and, for developer-tool, `references/fifth-evidence.md`. Computed values from rendered captures are in `references/measured-captures.md`.

## Where they sit on the nine axes

| Register       | Neutral temperature                                      | Accent                                      | Type voice                                                                                                      | Density               | Shape                                | Elevation                                                                               | Chrome                                                                                              | Value economy                                                |
| -------------- | -------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Developer-tool | Cool, tinted toward the accent                           | One hue, on primary and selected            | One neutral sans, finer weights, tight negative display tracking                                                | High                  | Small stepped radii                  | Luminance ladder plus alpha hairlines; shadow only floating                             | Dim thin sidebar, shortcuts, palette                                                                | Moderate to expressive                                       |
| Editorial      | Per object, or pure grey                                 | The object's own palette                    | Serif-led, italic as a role                                                                                     | Low, long measure     | Near square                          | Almost none                                                                             | Almost none                                                                                         | Economical                                                   |
| Warm utility   | One derived system; warm, ink-tinted or pure             | One friendly hue                            | A calm voice: house sans, serif titles, or one face in two cuts                                                 | Medium                | Soft, generous                       | Soft, blurred depth on floating things, faint or firmer; cards by surface step or rules | Calm relative to content: a quiet sidebar, a floating action, or a dark sidebar beside a light page | Moderate                                                     |
| Tactile        | Neutral to warm greys                                    | Rare, printed-label colours                 | Specimen faces, mono labels                                                                                     | Poster scale          | Square or pill                       | None; fills and photography                                                             | Thin text-link bar                                                                                  | Very economical                                              |
| Industrial     | Pure, zero chroma                                        | One saturated hue                           | Bold geometric or grotesque, large display                                                                      | Expert-high or poster | Hard, zero                           | None; 2px rules                                                                         | Loud, labelled                                                                                      | Economical                                                   |
| Trust          | Tinted toward the brand                                  | Brand hue spent widely, paired for contrast | Proprietary sans, numeric face                                                                                  | Medium                | Pill buttons, rounded cards          | Tinted layered shadow or fill-only                                                      | Quiet sidebar, theme-aware top bar                                                                  | Moderate                                                     |
| Playful        | Any, decided as one system (pure, warm-faint, or tinted) | Many hues, each with a job                  | A voice with character in strict roles (rounded heavy, a grotesque with a mono utility voice, or variable axes) | Low to medium         | Rounded or pill, decided             | Depth that changes on press (same-hue lip with travel, or a neutral lip on one action)  | Loud labelled sidebar, or a quiet rail                                                              | Expressive in imagery and colour; the UI set may be moderate |
| Luxury         | Warm or near neutral, carrying almost all colour         | Barely any; merchandising only              | Two contrasting families, or one superfamily tracked optically                                                  | Low, generous air     | One decided character (zero or pill) | None at rest; scrim or glass                                                            | Ceremonial masthead or thin two-tier bar                                                            | Very economical                                              |

Each register file marks every axis **core** or **free**. Core axes define the register: a build in it is expected to share the exemplars' position there. Free axes are where the exemplars' values are instances, not the register: the brief chooses its own position on at least half of them, different from every exemplar, and each file lists alternatives that stay in the register. On a free axis, read the table above as one instance, not the register's answer. Each file's "Staying in the register without cloning its exemplars" section gives a worked example.

| Register       | Core axes                                                                                                                                       | File                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Developer-tool | Density, elevation recipe, chrome model                                                                                                         | `developer-tool.md` |
| Editorial      | Type voice, density (reading measure), signature (object as navigation)                                                                         | `editorial.md`      |
| Warm utility   | One derived neutral system (temperature free), elevation (soft blurred depth, strength free), accent (one friendly hue)                         | `warm-utility.md`   |
| Tactile        | Signature (labelling as graphic system), elevation (flat, no shadow), value economy                                                             | `tactile.md`        |
| Industrial     | Neutral (zero chroma or one strong ground), elevation (rules, no shadow), shape (hard)                                                          | `industrial.md`     |
| Trust          | Type (numeric role), signature (money typography and proof), accent (paired for contrast)                                                       | `trust.md`          |
| Playful        | Accent (several hues with jobs), signature (characters or physical feedback that carry state), value economy (expressive in imagery and colour) | `playful.md`        |
| Luxury         | Value economy, elevation (none at rest), accent (barely any)                                                                                    | `luxury.md`         |

The signature device is per register and per project; see each file. Where the signature is a core axis, the property is core and the device is derived per project.

## Choosing a register

The brief chooses, before any layer is built. Ask:

1. **Who works in it, and for how long?** Experts all day lean developer-tool or industrial. Occasional consumers lean playful, warm or luxury.
2. **What is the content?** Money leans trust. A publication leans editorial. A physical product leans tactile or luxury.
3. **What must a person feel in five seconds?** The brief's three mood adjectives should read true for the register.
4. **What does the domain already look like?** A real-world source (a control panel, a ledger, a printed manual, a shop window) usually points at one register.

A product can use one register for the app and another for marketing (Figma: playful marketing, quiet tool). Record both.

## Composing a new register

The eight are a starting set, not the limit. To compose one, take a position on every axis below, record it in the brief, and check it against the baseline. A composed register is valid when every position is a decision with a reason from the domain, and it differs from each named register on at least 4 of the 9 axes (otherwise it is that register, and should say so). A composed register must also state its core axes, the positions every build in it shares, and mark the rest free with at least two alternatives each, so its first build does not become its template.

| Axis                | Menu of positions seen in premium work                                                                                                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neutral temperature | Cool tinted; warm tinted; ink-tinted (navy, forest, graphite); pure zero-chroma; per object or per section                                                                                                        |
| Accent              | None (ink is the action); one hue on primary and selected; one hue spent widely as fill and wash; several hues each with one job; per-object palettes                                                             |
| Type voice          | One neutral sans with finer weights; serif-led with italic roles; specimen or mechanical face; bold geometric; rounded heavy; two contrasting families; one superfamily tracked optically; variable axes as roles |
| Density             | Expert-high; medium; low with long measure; poster or proportional                                                                                                                                                |
| Shape language      | Zero; small stepped family; soft generous; pill controls with rounded containers; one decided value; jumbo primitives                                                                                             |
| Elevation recipe    | Luminance ladder and alpha hairline; tone steps only; layered faint shadow; tinted fill only; hard offset lip; solid rules; glass on floating layers; none                                                        |
| Signature device    | Derived from the domain (see `differentiation.md`)                                                                                                                                                                |
| Chrome model        | Dim sidebar with shortcuts; loud labelled sidebar; thin top bar; two-tier bar; ceremonial masthead; floating action; none                                                                                         |
| Value economy       | Very economical (one or two values per axis); moderate; expressive (many durations, easings and type values, still concentrated)                                                                                  |

## What every register shares

The Baseline section of each layer file. In short: finite named scales reused at high counts; type roles with tension on at least two axes; colour that has a job; one depth recipe applied consistently; visible designed focus; distinct hover, press, focus, busy and disabled states; designed enter and exit; reduced-motion handling; measured contrast; role tokens a theme can swap; chrome that responds to context; designed loading, empty and error states.

## Exemplars set the aesthetic bar, not the accessibility bar

Several exemplars fail baseline properties: Duolingo's web app has no visible focus and no reduced-motion handling, and white on its green is 2.09:1; Apple's grey running copy is 3.62:1; Things' link is 4.31:1; The Pudding's focus ring is 1.66:1 on its light theme; Mercury's marketing buttons are 32 to 40px tall. Copy the register, never the lapse. Each register file lists its exemplars' gaps.
