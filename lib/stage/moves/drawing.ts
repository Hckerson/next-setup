import type { gsap } from "gsap";
import { actorOf, layerOf } from "@/lib/stage/context";
import { smoother } from "@/lib/stage/ease";
import type { Move, StageContext } from "@/lib/types";

type Film = gsap.core.Timeline;
type Draw = Extract<Move, { verb: "draw" }>;
type Fold = Extract<Move, { verb: "fold" }>;
type Resolve = Extract<Move, { verb: "resolve" }>;

const RADIANS = Math.PI / 180;

export const addDraw = (
    film: Film,
    move: Draw,
    at: number,
    length: number,
    context: StageContext,
) => {
    const drawn = layerOf(actorOf(context, move.actor), move.actor, move.layer);
    film.fromTo(
        drawn,
        { value: move.from },
        {
            immediateRender: false,
            value: move.to,
            duration: length,
            ease: smoother,
        },
        at,
    );
};

export const addFold = (
    film: Film,
    move: Fold,
    at: number,
    length: number,
    context: StageContext,
) => {
    const actor = actorOf(context, move.actor);
    if (
        move.from.length !== actor.hinges.angles.length ||
        move.to.length !== actor.hinges.angles.length
    )
        throw new Error(
            `The fold names ${move.to.length} hinges; ${move.actor} has ${actor.hinges.angles.length}`,
        );
    const progress = { t: 0 };
    film.fromTo(
        progress,
        { t: 0 },
        {
            immediateRender: false,
            t: 1,
            duration: length,
            ease: smoother,
            onUpdate: () => {
                actor.hinges.angles = move.from.map(
                    (start, index) =>
                        (start +
                            ((move.to[index] ?? start) - start) * progress.t) *
                        RADIANS,
                );
            },
        },
        at,
    );
};

export const addResolve = (
    film: Film,
    move: Resolve,
    at: number,
    length: number,
    context: StageContext,
) => {
    const actor = actorOf(context, move.actor);
    film.fromTo(
        actor.solid,
        { value: move.from },
        {
            immediateRender: false,
            value: move.to,
            duration: length,
            ease: smoother,
        },
        at,
    );
};
