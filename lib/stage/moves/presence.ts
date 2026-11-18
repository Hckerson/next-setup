import type { gsap } from "gsap";
import { actorOf } from "@/lib/stage/context";
import { PRESENCE_SHARE } from "@/lib/stage/constants";
import { anticipate, rebound } from "@/lib/stage/ease";
import type { Move, StageContext, Waypoint } from "@/lib/types";

type Film = gsap.core.Timeline;
type Enter = Extract<Move, { verb: "enter" }>;
type Exit = Extract<Move, { verb: "exit" }>;
type Swap = Extract<Move, { verb: "swap" }>;

const place = (point: Waypoint) => ({ x: point.x, y: point.y, z: point.z });

export const addEnter = (
    film: Film,
    move: Enter,
    at: number,
    length: number,
    context: StageContext,
) => {
    const actor = actorOf(context, move.actor);
    film.fromTo(
        actor.position,
        { ...place(move.from) },
        {
            immediateRender: false,
            ...place(move.to),
            duration: length,
            ease: rebound(context.mass.damping, context.mass.frequency),
        },
        at,
    );
    film.fromTo(
        actor.presence,
        { value: 0 },
        {
            immediateRender: false,
            value: 1,
            duration: length * PRESENCE_SHARE,
            ease: "none",
        },
        at,
    );
};

export const addExit = (
    film: Film,
    move: Exit,
    at: number,
    length: number,
    context: StageContext,
) => {
    const actor = actorOf(context, move.actor);
    film.fromTo(
        actor.position,
        { ...place(move.from) },
        {
            immediateRender: false,
            ...place(move.to),
            duration: length,
            ease: anticipate(context.mass.anticipation),
        },
        at,
    );
    film.fromTo(
        actor.presence,
        { value: 1 },
        {
            immediateRender: false,
            value: 0,
            duration: length * PRESENCE_SHARE,
            ease: "none",
        },
        at + length * (1 - PRESENCE_SHARE),
    );
};

export const addSwap = (
    film: Film,
    move: Swap,
    at: number,
    length: number,
    context: StageContext,
) => {
    const outgoing: Exit = {
        verb: "exit",
        actor: move.outgoing.actor,
        from: move.incoming.to,
        to: move.outgoing.to,
    };
    const incoming: Enter = { verb: "enter", ...move.incoming };
    const half = length / (2 - move.overlap);
    addExit(film, outgoing, at, half, context);
    addEnter(film, incoming, at + half * (1 - move.overlap), half, context);
};
