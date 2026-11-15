# Register: Luxury and restraint

**Point of view.** The object and its material are the hero: the photograph, the bottle, the device. The interface is a quiet, consistent frame made of very few values, reused hundreds of times. Confidence shows in what is left out.

**Exemplars.** Aesop (today's re-platformed site; some findings are decay), Apple product pages (Mac, Vision Pro, AirPods Pro, iPhone). Evidence: `references/registers/luxury.md`.

**Suits.** Premium physical goods, hospitality, fashion and beauty, flagship product launches. **Strains** for dense data work and for products whose value is speed rather than feel.

## Axes

Core axes define the register: a build here is expected to share the exemplars' position. Free axes are where the exemplars' values are instances, not the register: the brief chooses its own position, from the alternatives or beyond them.

| Axis                | Core or free | Position                                                                   | Observed                                                                                                                                           | Example positions that stay in the register (directions, not instances)                                                                           |
| ------------------- | ------------ | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neutral temperature | Free         | Warm or near neutral, and the neutrals carry almost all of the colour      | Aesop cream #fffef2 used 447 times, graphite #333 503 times; Apple #fff to #e8e8ed                                                                 | A deep dark ground (charcoal, oxblood) as the carrying neutral `(J)`; a cool mineral grey taken from the product's material `(J)`                 |
| Accent              | Core         | Barely any. Ink is the action; one extra hue marks merchandising status    | Aesop CTA is ink, brown only on "Limited release"; Apple blue on CTA and links, orange only on "New"; chromatic area 0 to 0.43 percent of the page | Core: match the exemplars                                                                                                                         |
| Type voice          | Free         | Two contrasting families, or one superfamily tracked optically per size    | Aesop Zapf Humanist display over Suisse 14px body; Apple SF Pro Display and Text, tracking set per size                                            | One serif family at two optical sizes `(J)`; one grotesque at a single weight, with hierarchy by size and leading `(J)`                           |
| Density             | Free         | Low, with generous air                                                     | Apple section padding 144 to 216px; Aesop body 14px with space around it                                                                           | Gallery: one object per viewport `(J)`; a compact catalogue grid inside generous outer margins, for a large range `(J)`                           |
| Shape language      | Free         | One decided character; the exemplars sit at either pole                    | Aesop radius 0 everywhere plus icon circles; Apple pills on every button, cards 18 to 28px                                                         | One small decided radius (2 to 4px) on every surface (README menu); one soft medium radius on every surface `(J)`                                 |
| Elevation           | Core         | No resting shadow at all; floating layers signalled by a scrim or by glass | Aesop 0 shadows; Apple 0 to 1 per page, frosted nav with a no-blur fallback                                                                        | Core: match the exemplars                                                                                                                         |
| Signature device    | Free         | A recurring device from the brand's own world                              | Aesop product-silhouette loading placeholders; Apple grey paragraphs with ink-highlighted phrases                                                  | The material shown at true scale, as a swatch or sample `(J)`; the packaging's typography used as the section marker `(J)`                        |
| Chrome model        | Free         | A ceremonial masthead, or a thin two-tier bar with one action              | Aesop centred wordmark masthead; Apple 44px global nav plus a 52px local nav with one "Buy" pill                                                   | No persistent bar: a corner wordmark and one menu toggle (README menu, none) `(J)`; a vertical index along one edge, like a catalogue spine `(J)` |
| Value economy       | Core         | Very economical, with very high reuse                                      | Top three font sizes cover 81 to 85 percent of text                                                                                                | Core: match the exemplars                                                                                                                         |

## Layer by layer

| Layer          | Realisation                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Token          | Two neutrals with a few tone steps (adjacent surfaces 1.04 to 1.22:1); one alpha hairline (about 1.45:1); text kept separate from surface roles (Apple's glyph and fill split)             |
| Scale class    | Classes named by role, dozens per page; stack spacing in em relative to type                                                                                                               |
| Primitive      | One button height and few emphasis levels; ink fill; hover one ink step at a slower tempo (0.25 to 0.32s); a designed busy state; a focus highlighter that travels between targets (Aesop) |
| Mark           | Status as a word in a hue, no pill, no fill ("Limited release", "New")                                                                                                                     |
| List and modal | A scrim plus a faint two-layer shadow; square or large-radius per the shape character                                                                                                      |
| Section        | Section padding as a token with a named exception; hierarchy inside a paragraph by colour; theme flips per section when the narrative calls for it                                         |
| Chrome         | Transparent over the hero, gaining material on scroll; one primary action per bar                                                                                                          |

## Signature devices

| Property                       | Exemplar instance                  | Derive your own from                                |
| ------------------------------ | ---------------------------------- | --------------------------------------------------- |
| Loading looks like the product | Aesop bottle and tube silhouettes  | The silhouettes of the real objects sold            |
| Hierarchy by tone, not size    | Apple grey run with ink highlights | The one phrase per paragraph a reader must not miss |
| Few values, enormous reuse     | #333 used 503 times                | The brand's packaging or printed matter             |

## Failure mode

A cream page, a thin serif or Optima-like display at a large size, tracked uppercase eyebrows, sharp outline buttons with an arrow, a muted gold used as the link and button colour, a lifestyle photograph under a centred white headline, uniform section gaps. Neither exemplar uses tracked uppercase (0 of 216 Aesop elements, 0 of 1,004 Apple). The Apple clone: a giant bold headline with a grey subhead, a blue pill on every action, every card at one large radius, glass on every surface, gradient text.

## Staying in the register without cloning its exemplars

The core axes (a very economical value set, no shadow at rest, barely any accent) will match the exemplars; that is what makes a build read as this register. The six free axes are where Aesop and Apple are instances, not the register. On at least three of them, the brief chooses an instance that differs from both exemplars' and records the reason from the domain.

Example: a corner wordmark and one menu toggle with no persistent bar, where Aesop runs a ceremonial masthead and Apple a two-tier bar, while the few reused values, the shadowless surfaces and the near-absent accent stay.

## Exemplar gaps (do not copy)

- Apple: grey running copy #86868b at 17px is 3.62:1; the same device works with #6e6e73 (5.07:1).
- Aesop: `outline: none !important` globally, so focus depends on JavaScript; two parallel spacing systems and a wishlist added after the original design (decay).
- Apple's local-nav "Buy" pill is 24px tall on desktop; touch size UNVERIFIED.

## Evidence gaps

Aesop mobile, product list, cart and checkout (blocked by Cloudflare), the Aesop flyout motion, and Apple's modals, flyout and dark sections were not captured.
