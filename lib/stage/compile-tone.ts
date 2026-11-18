import type { gsap } from "gsap";
import { GROUND_VAR, INK_VAR, TONE_SHARE } from "@/lib/stage/constants";
import { smoother } from "@/lib/stage/ease";
import type { Script, Tone } from "@/lib/types";

const hex = (colour: Tone["ground"]) => `#${colour.getHexString()}`;

export const applyTone = (live: Tone, root: HTMLElement) => {
    root.style.setProperty(GROUND_VAR, hex(live.ground));
    root.style.setProperty(INK_VAR, hex(live.ink));
};

export const compileTone = (
    film: gsap.core.Timeline,
    script: Script,
    tones: Record<string, Tone>,
    live: Tone,
    root: HTMLElement,
) => {
    const toned = script.shots.filter((shot) => shot.tone);
    toned.forEach((shot, index) => {
        const to = tones[shot.tone ?? ""];
        const previous = toned[index - 1];
        const from = previous ? tones[previous.tone ?? ""] : to;
        if (!to || !from)
            throw new Error(`The script names an unknown tone: ${shot.tone}`);
        const progress = { t: 0 };
        film.fromTo(
            progress,
            { t: 0 },
            {
                immediateRender: false,
                t: 1,
                duration: shot.length * TONE_SHARE,
                ease: smoother,
                onUpdate: () => {
                    live.ground.lerpColors(from.ground, to.ground, progress.t);
                    live.ink.lerpColors(from.ink, to.ink, progress.t);
                    applyTone(live, root);
                },
            },
            shot.at,
        );
    });
};
