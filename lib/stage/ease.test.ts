import { describe, expect, it } from "vitest";
import { anticipate, rebound, settle, smoother } from "@/lib/stage/ease";

const samples = Array.from({ length: 101 }, (_, index) => index / 100);

describe("ease", () => {
    it("smoother starts at 0 and ends at 1 with zero slope at both ends", () => {
        expect(smoother(0)).toBe(0);
        expect(smoother(1)).toBe(1);
        expect(smoother(0.001)).toBeLessThan(0.000001);
    });

    it("settle starts at 0, ends exactly at 1 and overshoots without bouncing past 30 percent", () => {
        const ease = settle(5, 1.2);
        expect(ease(0)).toBe(0);
        expect(ease(1)).toBeCloseTo(1, 10);
        const peak = Math.max(...samples.map(ease));
        expect(peak).toBeGreaterThan(1);
        expect(peak).toBeLessThan(1.3);
    });

    it("anticipate pulls back before it goes, and still arrives", () => {
        const ease = anticipate(1.7);
        expect(Math.min(...samples.map(ease))).toBeLessThan(0);
        expect(ease(1)).toBeCloseTo(1, 10);
    });

    it("rebound never passes through the surface it lands on, and still comes to rest", () => {
        const ease = rebound(5, 2.2);
        expect(ease(0)).toBe(0);
        expect(ease(1)).toBeCloseTo(1, 10);
        expect(Math.max(...samples.map(ease))).toBeLessThanOrEqual(1);
        const first = samples.find((t) => ease(t) > 0.99) ?? 1;
        expect(samples.some((t) => t > first + 0.05 && ease(t) < 0.97)).toBe(true);
    });
});
