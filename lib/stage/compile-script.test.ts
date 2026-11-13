import { Color } from "three";
import { gsap } from "gsap";
import { describe, expect, it } from "vitest";
import { createActor } from "@/lib/stage/actor";
import { compileScript } from "@/lib/stage/compile-script";
import type { Script, StageContext } from "@/lib/types";

const RED = new Color("#cc2222");
const BLUE = new Color("#2244cc");

const script: Script = {
    length: 1,
    peak: "change",
    shots: [
        {
            id: "arrive",
            at: 0,
            length: 0.3,
            camera: "wide",
            moves: [
                {
                    at: 0,
                    length: 1,
                    move: {
                        verb: "enter",
                        actor: "a",
                        from: { x: 0, y: 4, z: 0 },
                        to: { x: 0, y: 0, z: 0 },
                    },
                },
            ],
        },
        {
            id: "change",
            at: 0.3,
            length: 0.4,
            camera: "close",
            moves: [
                {
                    at: 0,
                    length: 1,
                    move: {
                        verb: "recolour",
                        actor: "a",
                        from: "red",
                        to: "blue",
                        wipe: "up",
                    },
                },
            ],
        },
        {
            id: "travel",
            at: 0.7,
            length: 0.3,
            camera: "follow",
            moves: [
                {
                    at: 0,
                    length: 1,
                    move: {
                        verb: "travel",
                        actor: "a",
                        bank: 0.5,
                        path: [
                            { x: 0, y: 0, z: 0 },
                            { x: 3, y: 0, z: 2 },
                            { x: 6, y: 0, z: 8 },
                        ],
                    },
                },
            ],
        },
    ],
};

const setup = () => {
    const actor = createActor(RED);
    const context: StageContext = {
        actors: { a: actor },
        variants: { red: RED, blue: BLUE },
        mass: { anticipation: 1.5, damping: 5, frequency: 1.1 },
    };
    const film = gsap.timeline({ paused: true });
    compileScript(film, script, context);
    return { film, actor };
};

describe("compileScript", () => {
    it("fills the timeline to exactly the script length and labels every shot", () => {
        const { film } = setup();
        expect(film.duration()).toBe(1);
        expect(film.labels).toMatchObject({ arrive: 0, change: 0.3, travel: 0.7 });
    });

    it("brings the actor in and leaves it at rest", () => {
        const { film, actor } = setup();
        film.seek(0.3, false);
        expect(actor.presence.value).toBe(1);
        expect(actor.position.y).toBeCloseTo(0, 6);
    });

    it("recolours from the first variant to the second", () => {
        const { film, actor } = setup();
        film.seek(0.5, false);
        expect(actor.tint.mix).toBeGreaterThan(0);
        expect(actor.tint.mix).toBeLessThan(1);
        film.seek(0.7, false);
        expect(actor.tint.mix).toBe(1);
        expect(actor.tint.to.getHexString()).toBe(BLUE.getHexString());
    });

    it("ends the travel on the last waypoint, facing along the path", () => {
        const { film, actor } = setup();
        film.seek(1, false);
        const [x, y, z] = actor.position.toArray();
        expect([x, y, z]).toEqual([expect.closeTo(6, 6), expect.closeTo(0, 6), expect.closeTo(8, 6)]);
        expect(actor.rotation.y).toBeGreaterThan(0);
    });

    it("is scrubbable in both directions", () => {
        const { film, actor } = setup();
        film.seek(1, false);
        film.seek(0.5, false);
        const middle = actor.tint.mix;
        film.seek(1, false);
        film.seek(0.5, false);
        expect(actor.tint.mix).toBeCloseTo(middle, 10);
        film.seek(0, false);
        expect(actor.presence.value).toBe(0);
    });

    it("rejects a script that names an unknown actor", () => {
        const film = gsap.timeline({ paused: true });
        const context: StageContext = {
            actors: {},
            variants: { red: RED, blue: BLUE },
            mass: { anticipation: 1, damping: 5, frequency: 1 },
        };
        expect(() => compileScript(film, script, context)).toThrow(/unknown actor/);
    });
});
