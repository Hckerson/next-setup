import type { gsap } from "gsap";
import type { Move, StageContext } from "@/lib/types";

type Simulate = Extract<Move, { verb: "simulate" }>;

export const addSimulate = (
    film: gsap.core.Timeline,
    move: Simulate,
    at: number,
    length: number,
    context: StageContext,
) => {
    const simulation = context.simulations?.[move.simulation];
    if (!simulation)
        throw new Error(
            `The script names an unknown simulation: ${move.simulation}`,
        );
    film.fromTo(
        simulation.progress,
        { value: move.from },
        {
            immediateRender: false,
            value: move.to,
            duration: length,
            ease: "none",
        },
        at,
    );
};
