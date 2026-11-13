import { Color } from "three";
import { createActor } from "@/lib/stage/actor";
import { createTone } from "@/lib/stage/tone";
import { AD, COIN, GLASS_OPACITY, JAR, LAPTOP, MARK, SUN, SUN_OPACITY, TIDEMARK_MASS } from "@/lib/tidemark/constants";
import type { StageContext, Tone } from "@/lib/types";

const NEUTRAL = "#b9b9b9";
const TONE_NAMES = ["dawn", "spend", "offpace", "trace", "correct", "connect"] as const;
const VARIANT_NAMES = ["neutral", "search", "light"] as const;

export const createTidemark = () => {
    const variants: Record<string, Color> = Object.fromEntries(
        VARIANT_NAMES.map((name) => [name, new Color(NEUTRAL)]),
    );
    const neutral = variants.neutral ?? new Color(NEUTRAL);
    const actors: StageContext["actors"] = {
        jar: createActor(neutral),
        laptop: createActor(neutral),
        ad: createActor(neutral),
        mark: createActor(neutral),
        sun: createActor(neutral),
    };
    for (let index = 0; index < COIN.count; index += 1)
        actors[`coin-${index}`] = createActor(neutral);
    const tones: Record<string, Tone> = Object.fromEntries(
        TONE_NAMES.map((name) => [name, createTone()]),
    );
    const context: StageContext = { actors, variants, mass: TIDEMARK_MASS };
    return { context, tones, live: createTone() };
};

export type Tidemark = ReturnType<typeof createTidemark>;

interface ActorLook {
    size: readonly [number, number, number];
    opacity: number;
    shadowed: boolean;
}

export const ACTOR_LOOKS: Record<string, ActorLook> = {
    jar: { size: [JAR.width, JAR.height, JAR.depth], opacity: GLASS_OPACITY, shadowed: true },
    laptop: { size: [LAPTOP.width, LAPTOP.height, LAPTOP.depth], opacity: 1, shadowed: true },
    ad: { size: [AD.width, AD.height, AD.depth], opacity: 1, shadowed: true },
    mark: { size: [MARK.width, MARK.height, MARK.depth], opacity: 1, shadowed: false },
    sun: { size: [SUN.width, SUN.height, SUN.depth], opacity: SUN_OPACITY, shadowed: false },
};

export const COIN_LOOK: ActorLook = {
    size: [COIN.width, COIN.height, COIN.width],
    opacity: 1,
    shadowed: true,
};
