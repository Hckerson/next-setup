import type { gsap } from "gsap";
import { actorOf, variantOf } from "@/lib/stage/context";
import { settle, smoother } from "@/lib/stage/ease";
import type { Move, StageContext } from "@/lib/types";

type Film = gsap.core.Timeline;
type Recolour = Extract<Move, { verb: "recolour" }>;
type Rotate = Extract<Move, { verb: "rotate" }>;
type Scale = Extract<Move, { verb: "scale" }>;

const RADIANS = Math.PI / 180;

export const addRecolour = (
    film: Film,
    move: Recolour,
    at: number,
    length: number,
    context: StageContext,
) => {
    const actor = actorOf(context, move.actor);
    const from = variantOf(context, move.from);
    const to = variantOf(context, move.to);
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
                actor.tint.from.copy(from);
                actor.tint.to.copy(to);
                actor.tint.wipe = move.wipe;
                actor.tint.mix = progress.t;
            },
        },
        at,
    );
};

export const addRotate = (
    film: Film,
    move: Rotate,
    at: number,
    length: number,
    context: StageContext,
) => {
    const actor = actorOf(context, move.actor);
    const start =
        move.from === undefined
            ? actor.rotation[move.axis]
            : move.from * RADIANS;
    film.fromTo(
        actor.rotation,
        { [move.axis]: start },
        {
            immediateRender: false,
            [move.axis]: start + move.degrees * RADIANS,
            duration: length,
            ease: settle(context.mass.damping, context.mass.frequency),
        },
        at,
    );
};

export const addScale = (
    film: Film,
    move: Scale,
    at: number,
    length: number,
    context: StageContext,
) => {
    const actor = actorOf(context, move.actor);
    film.fromTo(
        actor.scale,
        { value: actor.scale.value },
        {
            immediateRender: false,
            value: move.to,
            duration: length,
            ease: settle(context.mass.damping, context.mass.frequency),
        },
        at,
    );
};
