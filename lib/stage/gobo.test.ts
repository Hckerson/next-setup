import { describe, expect, it } from "vitest";
import { sunPenumbra, windowTransmission } from "@/lib/stage/gobo";

const opening = { distance: 1.8, width: 1.2, height: 0.9, bar: 0.03, panes: [2, 3] as const, wall: 6, aim: [0, 0, 0] as const };
const penumbra = sunPenumbra(1.8, 0.53);

describe("windowTransmission", () => {
    it("lets the sun through the middle of a pane", () => {
        expect(windowTransmission(0.3, 0, opening, penumbra)).toBe(1);
    });

    it("blocks it under a bar and beyond the frame", () => {
        expect(windowTransmission(0, 0, opening, penumbra)).toBeLessThan(0.1);
        expect(windowTransmission(1, 0, opening, penumbra)).toBe(0);
    });

    it("softens every edge over the sun's penumbra", () => {
        const edge = opening.width / 2;
        expect(windowTransmission(edge, 0.2, opening, penumbra)).toBeCloseTo(0.5, 6);
        expect(windowTransmission(edge - penumbra, 0.2, opening, penumbra)).toBe(1);
    });
});

describe("sunPenumbra", () => {
    it("is about 17 mm for a window 1.8 m away under a half-degree sun", () => {
        expect(penumbra).toBeCloseTo(0.0166, 3);
    });
});
