import type { gsap } from "gsap";
import { COPY_FADE, COPY_RISE } from "@/lib/stage/constants";
import type { Script } from "@/lib/types";

const SHOT_ATTRIBUTE = "data-shot";

export const compileCopy = (
    film: gsap.core.Timeline,
    script: Script,
    root: HTMLElement,
) => {
    const last = script.shots.filter((shot) => shot.copy).at(-1);
    script.shots.forEach((shot) => {
        if (!shot.copy) return;
        const element = root.querySelector<HTMLElement>(
            `[${SHOT_ATTRIBUTE}="${shot.id}"]`,
        );
        if (!element) return;
        if (shot.at > 0)
            film.fromTo(
                element,
                { autoAlpha: 0, y: COPY_RISE, immediateRender: false },
                { autoAlpha: 1, y: 0, duration: COPY_FADE, ease: "none" },
                shot.at,
            );
        if (shot !== last)
            film.to(
                element,
                { autoAlpha: 0, duration: COPY_FADE, ease: "none" },
                shot.at + shot.length - COPY_FADE,
            );
    });
};
