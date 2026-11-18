import { Color } from "three";
import { gsap } from "gsap";
import { describe, expect, it } from "vitest";
import { createActor } from "@/lib/stage/actor";
import { compileScript } from "@/lib/stage/compile-script";
import type { Script, StageContext } from "@/lib/types";

const PAPER = new Color("#f4f1ea");

const script: Script = {
    length: 1,
    peak: "fold",
    shots: [
        {
            id: "draw",
            at: 0,
            length: 0.4,
            camera: "front",
            moves: [
                {
                    at: 0,
                    length: 1,
                    move: {
                        verb: "draw",
                        actor: "receipt",
                        layer: "outline",
                        from: 0,
                        to: 1,
                    },
                },
            ],
        },
        {
            id: "fold",
            at: 0.4,
            length: 0.3,
            camera: "front",
            moves: [
                {
                    at: 0,
                    length: 1,
                    move: {
                        verb: "fold",
                        actor: "receipt",
                        from: [0, 0],
                        to: [180, -180],
                    },
                },
            ],
        },
        {
            id: "resolve",
            at: 0.7,
            length: 0.3,
            camera: "plan",
            moves: [
                {
                    at: 0,
                    length: 1,
                    move: { verb: "resolve", actor: "receipt", from: 0, to: 1 },
                },
            ],
        },
    ],
};

const setup = (hinges = 2) => {
    const receipt = createActor(PAPER, { layers: ["outline"], hinges });
    const context: StageContext = {
        actors: { receipt },
        variants: {},
        mass: { anticipation: 1.5, damping: 5, frequency: 1.1 },
    };
    const film = gsap.timeline({ paused: true });
    compileScript(film, script, context);
    return { film, receipt };
};

describe("drawing verbs", () => {
    it("draws a layer from nothing to whole", () => {
        const { film, receipt } = setup();
        film.seek(0.2, false);
        expect(receipt.drawn.outline?.value).toBeGreaterThan(0);
        expect(receipt.drawn.outline?.value).toBeLessThan(1);
        film.seek(0.4, false);
        expect(receipt.drawn.outline?.value).toBe(1);
    });

    it("folds every hinge to its angle without passing through", () => {
        const { film, receipt } = setup();
        for (let at = 0.4; at <= 0.7; at += 0.01) {
            film.seek(at, false);
            expect(receipt.hinges.angles[0] ?? 0).toBeLessThanOrEqual(
                Math.PI + 1e-9,
            );
        }
        film.seek(0.7, false);
        expect(receipt.hinges.angles).toEqual([
            expect.closeTo(Math.PI, 6),
            expect.closeTo(-Math.PI, 6),
        ]);
    });

    it("resolves to solid and scrubs back to a drawing", () => {
        const { film, receipt } = setup();
        film.seek(1, false);
        expect(receipt.solid.value).toBe(1);
        film.seek(0.1, false);
        expect(receipt.solid.value).toBe(0);
        expect(receipt.hinges.angles).toEqual([0, 0]);
    });

    it("rejects a fold that names the wrong number of hinges", () => {
        expect(() => setup(3)).toThrow(/hinges/);
    });

    it("rejects a draw on a layer the actor does not have", () => {
        const receipt = createActor(PAPER, { hinges: 2 });
        const context: StageContext = {
            actors: { receipt },
            variants: {},
            mass: { anticipation: 1, damping: 5, frequency: 1 },
        };
        expect(() =>
            compileScript(gsap.timeline({ paused: true }), script, context),
        ).toThrow(/unknown layer/);
    });
});

describe("two moves on one property", () => {
    it("leaves the earlier move's state alone until the later one starts", () => {
        const twice: Script = {
            length: 1,
            peak: "out",
            shots: [
                { id: "in", at: 0, length: 0.5, camera: "front", moves: [{ at: 0, length: 1, move: { verb: "draw", actor: "receipt", layer: "outline", from: 0, to: 1 } }] },
                { id: "out", at: 0.5, length: 0.5, camera: "front", moves: [{ at: 0, length: 1, move: { verb: "draw", actor: "receipt", layer: "outline", from: 1, to: 0 } }] },
            ],
        };
        const receipt = createActor(PAPER, { layers: ["outline"] });
        const film = gsap.timeline({ paused: true });
        compileScript(film, twice, { actors: { receipt }, variants: {}, mass: { anticipation: 1, damping: 5, frequency: 1 } });
        expect(receipt.drawn.outline?.value).toBe(0);
        film.seek(0.25, false);
        expect(receipt.drawn.outline?.value).toBeGreaterThan(0);
        expect(receipt.drawn.outline?.value).toBeLessThan(1);
    });
});
