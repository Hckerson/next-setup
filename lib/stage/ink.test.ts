import { describe, expect, it } from "vitest";
import { createInkGeometry } from "@/lib/stage/ink";

const square = { points: [[0, 0], [1, 0], [1, 1], [0, 1]] as const, closed: true };
const tick = { points: [[2, 0], [2, 3]] as const };

describe("createInkGeometry", () => {
    it("makes one quad per segment, closing a closed path", () => {
        const geometry = createInkGeometry([square, tick], 0.1);
        expect(geometry.getAttribute("position").count).toBe((4 + 1) * 4);
        expect(geometry.getIndex()?.count).toBe((4 + 1) * 6);
    });

    it("orders the pen by length across every path, from 0 to 1", () => {
        const along = Array.from(createInkGeometry([square, tick], 0.1).getAttribute("along").array);
        expect(along[0]).toBe(0);
        expect(along.at(-1)).toBe(1);
        along.slice(1).forEach((value, index) => expect(value).toBeGreaterThanOrEqual(along[index] ?? 0));
        expect(along[4 * 4]).toBeCloseTo(4 / 7, 6);
    });

    it("gives the ribbon the pen's width", () => {
        const positions = createInkGeometry([tick], 0.2).getAttribute("position");
        expect(Math.abs(positions.getX(0) - positions.getX(1))).toBeCloseTo(0.2, 6);
    });

    it("skips zero-length segments", () => {
        expect(createInkGeometry([{ points: [[0, 0], [0, 0], [1, 0]] }], 0.1).getAttribute("position").count).toBe(4);
    });
});

describe("filled ink", () => {
    it("fills a triangle and appears when the pen reaches it", () => {
        const shaft = { points: [[0, 0], [0, 1]] as const };
        const head = { points: [[0, 1], [-0.1, 0.9], [0.1, 0.9]] as const, filled: true };
        const geometry = createInkGeometry([shaft, head], 0.01);
        expect(geometry.getAttribute("position").count).toBe(4 + 3);
        expect(geometry.getIndex()?.count).toBe(6 + 3);
        expect(geometry.getAttribute("along").getX(4)).toBe(1);
    });
});
