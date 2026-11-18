import { describe, expect, it } from "vitest";
import { blurAtInfinity, createLens, focusLens } from "@/lib/stage/depth-of-field";

describe("blurAtInfinity", () => {
    it("matches the thin lens for a 50 mm lens at f/2 focused at 2 m", () => {
        expect(blurAtInfinity({ focalLength: 50, aperture: 2, distance: 2, width: 3600 })).toBeCloseTo(32.05, 1);
    });

    it("is zero without an aperture", () => {
        expect(blurAtInfinity({ focalLength: 50, distance: 2, width: 3600 })).toBe(0);
    });

    it("grows as the lens opens and as focus comes closer", () => {
        const base = { focalLength: 55, distance: 0.5, width: 1440 };
        expect(blurAtInfinity({ ...base, aperture: 2 })).toBeGreaterThan(blurAtInfinity({ ...base, aperture: 8 }));
        expect(blurAtInfinity({ ...base, aperture: 2, distance: 0.2 })).toBeGreaterThan(blurAtInfinity({ ...base, aperture: 2 }));
    });
});

describe("focusLens", () => {
    const focus = { focalLength: 55, aperture: 11, distance: 0.128, width: 1440 };

    it("caps the blur and keeps the real lens's growth below the cap", () => {
        const lens = createLens();
        focusLens(lens, focus);
        const radius = blurAtInfinity(focus);
        expect(lens.blur.value).toBe(24);
        expect(lens.blur.value * lens.reach.value).toBeCloseTo(radius, 6);
    });

    it("turns the blur off without an aperture", () => {
        const lens = createLens();
        focusLens(lens, { focalLength: 70, distance: 0.8, width: 1440 });
        expect(lens.blur.value).toBe(0);
        expect(lens.reach.value).toBe(0);
        expect(lens.focus.value).toBe(0.8);
    });
});
