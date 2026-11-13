import { describe, expect, it } from "vitest";
import { createPath, headingAt, turnAt } from "@/lib/stage/path";

const waypoints = [
    { x: 0, y: 0, z: 0 },
    { x: 2, y: 1, z: 2 },
    { x: 4, y: 0, z: 6 },
];

describe("path", () => {
    it("starts and ends on its first and last waypoints", () => {
        const curve = createPath(waypoints);
        expect(curve.getPoint(0).toArray()).toEqual([0, 0, 0]);
        expect(curve.getPoint(1).toArray()).toEqual([4, 0, 6]);
    });

    it("faces along the direction of travel", () => {
        const curve = createPath([
            { x: 0, y: 0, z: 0 },
            { x: 5, y: 0, z: 0 },
        ]);
        expect(headingAt(curve, 0.5)).toBeCloseTo(Math.PI / 2, 6);
    });

    it("turns on a bend and not on a straight", () => {
        const straight = createPath([
            { x: 0, y: 0, z: 0 },
            { x: 0, y: 0, z: 5 },
        ]);
        const bent = createPath(waypoints);
        expect(turnAt(straight, 0.5, 0.05)).toBeCloseTo(0, 6);
        expect(Math.abs(turnAt(bent, 0.5, 0.05))).toBeGreaterThan(0.01);
    });
});
