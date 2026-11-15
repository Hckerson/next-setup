import type { gsap } from "gsap";
import { actorOf } from "@/lib/stage/context";
import { BANK_SAMPLE_STEP } from "@/lib/stage/constants";
import { rebound, smoother } from "@/lib/stage/ease";
import { createPath, headingAt, turnAt } from "@/lib/stage/path";
import type { Move, StageContext } from "@/lib/types";

type Film = gsap.core.Timeline;
type Travel = Extract<Move, { verb: "travel" }>;
type Lift = Extract<Move, { verb: "lift" }>;
type Land = Extract<Move, { verb: "land" }>;

export const addTravel = (
    film: Film,
    move: Travel,
    at: number,
    length: number,
    context: StageContext,
) => {
    const actor = actorOf(context, move.actor);
    const curve = createPath(move.path);
    const progress = { t: 0 };
    film.fromTo(
        progress,
        { t: 0, immediateRender: false },
        {
            t: 1,
            duration: length,
            ease: smoother,
            onUpdate: () => {
                actor.position.copy(curve.getPoint(progress.t));
                actor.rotation.y = headingAt(curve, progress.t);
                actor.rotation.z = move.bank * turnAt(curve, progress.t, BANK_SAMPLE_STEP);
            },
        },
        at,
    );
};

export const addLift = (
    film: Film,
    move: Lift,
    at: number,
    length: number,
    context: StageContext,
) => {
    const actor = actorOf(context, move.actor);
    film.fromTo(
        actor.position,
        { y: move.from, immediateRender: false },
        { y: move.from + move.height, duration: length, ease: smoother },
        at,
    );
};

export const addLand = (
    film: Film,
    move: Land,
    at: number,
    length: number,
    context: StageContext,
) => {
    const actor = actorOf(context, move.actor);
    film.fromTo(
        actor.position,
        { y: move.from, immediateRender: false },
        {
            y: move.surface,
            duration: length,
            ease: rebound(context.mass.damping, context.mass.frequency),
        },
        at,
    );
};
