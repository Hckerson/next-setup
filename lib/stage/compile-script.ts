import type { gsap } from "gsap";
import { addRecolour, addRotate, addScale } from "@/lib/stage/moves/change";
import { addEnter, addExit, addSwap } from "@/lib/stage/moves/presence";
import { addLand, addLift, addTravel } from "@/lib/stage/moves/transit";
import type { Move, Script, StageContext } from "@/lib/types";

type Film = gsap.core.Timeline;

const addMove = (
    film: Film,
    move: Move,
    at: number,
    length: number,
    context: StageContext,
) => {
    switch (move.verb) {
        case "enter":
            return addEnter(film, move, at, length, context);
        case "exit":
            return addExit(film, move, at, length, context);
        case "swap":
            return addSwap(film, move, at, length, context);
        case "travel":
            return addTravel(film, move, at, length, context);
        case "lift":
            return addLift(film, move, at, length, context);
        case "land":
            return addLand(film, move, at, length, context);
        case "recolour":
            return addRecolour(film, move, at, length, context);
        case "rotate":
            return addRotate(film, move, at, length, context);
        case "scale":
            return addScale(film, move, at, length, context);
        case "hold":
            return undefined;
    }
};

export const compileScript = (
    film: Film,
    script: Script,
    context: StageContext,
) => {
    script.shots.forEach((shot) => {
        film.addLabel(shot.id, shot.at);
        shot.moves.forEach((cue) =>
            addMove(
                film,
                cue.move,
                shot.at + cue.at * shot.length,
                cue.length * shot.length,
                context,
            ),
        );
    });
    film.set({}, {}, script.length);
};
