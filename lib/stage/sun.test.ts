import { Color } from "three";
import { describe, expect, it } from "vitest";
import { hourOf, keyAt, kelvinToColor, sunAt } from "@/lib/stage/sun";

describe("sunAt", () => {
    it("rises at six, peaks at noon and sets at eighteen", () => {
        expect(sunAt(6).elevation).toBeCloseTo(0, 6);
        expect(sunAt(18).elevation).toBeCloseTo(0, 6);
        expect(sunAt(12).elevation).toBeGreaterThan(sunAt(9).elevation);
        expect(sunAt(22).elevation).toBeLessThan(0);
    });

    it("crosses the sky from east to west", () => {
        expect(sunAt(7).direction.x).toBeGreaterThan(0);
        expect(sunAt(17).direction.x).toBeLessThan(0);
        expect(sunAt(13).direction.length()).toBeCloseTo(1, 6);
    });

    it("is warm near the horizon and neutral when high", () => {
        expect(sunAt(17.5).kelvin).toBeLessThan(3500);
        expect(sunAt(12).kelvin).toBeGreaterThan(6000);
    });

    it("reads the visitor's local clock", () => {
        expect(hourOf(new Date(2026, 10, 13, 21, 40))).toBeCloseTo(21 + 40 / 60, 6);
    });
});

describe("kelvinToColor", () => {
    it("is red-heavy when warm and near white at daylight", () => {
        const warm = kelvinToColor(2000);
        expect(warm.r).toBeGreaterThan(warm.b);
        const day = kelvinToColor(6500, new Color());
        expect(Math.min(day.r, day.g, day.b)).toBeGreaterThan(0.9);
    });
});

describe("keyAt", () => {
    const hours = [15, 16, 18];

    it("holds the first and last key outside the baked range", () => {
        expect(keyAt(hours, 14)).toBe(0);
        expect(keyAt(hours, 19)).toBe(2);
        expect(keyAt([16], 17)).toBe(0);
    });

    it("interpolates between keys by hour, not by index", () => {
        expect(keyAt(hours, 15)).toBe(0);
        expect(keyAt(hours, 15.5)).toBeCloseTo(0.5, 6);
        expect(keyAt(hours, 17)).toBeCloseTo(1.5, 6);
    });
});
