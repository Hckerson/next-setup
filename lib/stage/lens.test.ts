import { describe, expect, it } from "vitest";
import { focusDistance } from "@/lib/stage/lens";

describe("focusDistance", () => {
    const shot = { position: [0, 0, 1] as const, target: [0, 0, 0] as const, focalLength: 50 };

    it("is the distance to the target without a focus point", () => {
        expect(focusDistance(shot)).toBeCloseTo(1, 6);
    });

    it("measures depth along the view axis, not straight-line distance", () => {
        expect(focusDistance({ ...shot, focus: [0.5, 0, 0.5] })).toBeCloseTo(0.5, 6);
    });
});
