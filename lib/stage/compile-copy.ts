import type { gsap } from "gsap";
import { COPY_ENTRANCES, COPY_FADE, type CopyEntrance } from "@/lib/stage/constants";
import type { Script } from "@/lib/types";

const SHOT_ATTRIBUTE = "data-shot";

export const compileCopy = (
    film: gsap.core.Timeline,
    script: Script,
    root: HTMLElement,
    entrance: CopyEntrance = "rise",
) => {
    const { from, to, duration } = COPY_ENTRANCES[entrance];
    const cued = script.shots
        .filter((shot) => shot.copy)
        .map((shot) => ({ shot, at: shot.at + shot.length * (shot.copyAt ?? 0) }));
    cued.forEach(({ shot, at }, index) => {
        const element = root.querySelector<HTMLElement>(
            `[${SHOT_ATTRIBUTE}="${shot.id}"]`,
        );
        if (!element) return;
        if (at > 0)
            film.fromTo(
                element,
                { ...from },
                {
                    immediateRender: false,
                    ...to,
                    duration,
                    ease: "none",
                },
                at,
            );
        else film.set(element, { ...to, immediateRender: true }, 0);
        const next = cued[index + 1];
        if (next)
            film.to(
                element,
                { autoAlpha: 0, duration: COPY_FADE, ease: "none" },
                next.at - COPY_FADE,
            );
    });
};
