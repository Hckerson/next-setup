import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { smoother } from "@/lib/stage/ease";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MEDIA = {
    motion: "(prefers-reduced-motion: no-preference)",
    still: "(prefers-reduced-motion: reduce)",
    portrait: "(orientation: portrait)",
};

export interface StageConditions {
    still: boolean;
    portrait: boolean;
}

export interface StageOpening {
    at: number;
    duration: number;
}

interface StageTimeline {
    compose: (film: gsap.core.Timeline, conditions: StageConditions) => void;
    peak: string | number;
    defaults: gsap.TweenVars;
    opening?: StageOpening;
    ready?: boolean;
}

const scrubFrom = (film: gsap.core.Timeline, track: HTMLElement, start: number) =>
    ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        animation: film.tweenFromTo(start, film.duration(), { ease: "none", paused: true }),
    });

export const useStageTimeline = (
    trackRef: RefObject<HTMLElement | null>,
    { compose, peak, defaults, opening, ready = true }: StageTimeline,
) =>
    useGSAP(
        () => {
            const track = trackRef.current;
            if (!track) return;
            const media = gsap.matchMedia();
            media.add(MEDIA, (context) => {
                const still = context.conditions?.still ?? false;
                const portrait = context.conditions?.portrait ?? false;
                const film = gsap.timeline({ defaults, paused: true });
                compose(film, { still, portrait });
                if (still) {
                    film.seek(peak, false);
                    return;
                }
                if (opening?.duration === 0) film.seek(opening.at, false);
                if (!ready) return;
                const start = opening?.at ?? 0;
                if (!opening || opening.duration === 0 || window.scrollY > 0) {
                    film.seek(start, false);
                    scrubFrom(film, track, start);
                    return;
                }
                film.tweenFromTo(0, start, { duration: opening.duration, ease: smoother, onComplete: () => void scrubFrom(film, track, start) });
            });
            return () => media.revert();
        },
        { scope: trackRef, dependencies: [compose, peak, defaults, opening, ready] },
    );
