import { describe, expect, it } from "vitest";
import { shadowOpacity, shadowScale } from "@/lib/stage/shadow";

describe("contact shadow", () => {
    it("is full on the ground and shrinks and fades as the actor rises", () => {
        expect(shadowScale(0, 2)).toBe(1);
        expect(shadowScale(2, 2)).toBeLessThan(shadowScale(1, 2));
        expect(shadowOpacity(2, 2)).toBeLessThan(shadowScale(2, 2));
    });

    it("never grows below the ground", () => {
        expect(shadowScale(-5, 2)).toBe(1);
    });
});
