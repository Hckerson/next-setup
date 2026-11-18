import { describe, expect, it } from "vitest";
import { createWear } from "@/lib/stage/wear";

const look = { seed: 3, smudge: { cells: 4, power: 3, amount: 0.2 }, scratch: { count: 40, length: 0.2, amount: 0.5 } };

describe("createWear", () => {
    it("gives the same fields for the same seed", () => {
        expect(createWear(64, look)).toEqual(createWear(64, look));
    });

    it("lays scratches at their amount and nowhere else", () => {
        const { scratch } = createWear(128, look);
        expect(scratch.filter((value) => value === look.scratch.amount).length).toBeGreaterThan(40);
        expect(scratch.every((value) => value === 0 || value === look.scratch.amount)).toBe(true);
    });

    it("keeps smudges within their amount", () => {
        const { smudge } = createWear(128, look);
        expect(Math.max(...smudge)).toBeLessThanOrEqual(look.smudge.amount);
        expect(Math.min(...smudge)).toBeGreaterThanOrEqual(0);
    });

    it("changes with the seed", () => {
        expect(createWear(64, look)).not.toEqual(createWear(64, { ...look, seed: 4 }));
    });
});
