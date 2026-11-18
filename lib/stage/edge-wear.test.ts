import { describe, expect, it } from "vitest";
import { createEdgeWear, createLineWear } from "@/lib/stage/edge-wear";

const SQUARE = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
] as const;

const LOOK = { reach: 0.1, cells: 1, seed: 3, size: 64 };

const levelAt = (data: ArrayLike<number> | null, size: number, column: number, row: number) => data?.[(row * size + column) * 4] ?? 0;

describe("createEdgeWear", () => {
    const { texture, min, extent } = createEdgeWear(SQUARE, LOOK);
    const { data } = texture.image;

    it("spans the outline's bounds", () => {
        expect(min).toEqual([0, 0]);
        expect(extent).toEqual([1, 1]);
    });

    it("leaves the middle untouched and rubs the corners hardest", () => {
        const middle = levelAt(data, LOOK.size, LOOK.size / 2, LOOK.size / 2);
        const edge = levelAt(data, LOOK.size, LOOK.size / 2, 0);
        const corner = levelAt(data, LOOK.size, 0, 0);
        expect(middle).toBe(0);
        expect(corner).toBeGreaterThanOrEqual(edge);
        expect(corner).toBeGreaterThan(0);
    });
});

describe("createLineWear", () => {
    it("wears along an open line, inside the frame's bounds, and leaves the far side clean", () => {
        const { texture, min, extent } = createLineWear([[[0, 0.5], [1, 0.5]]], SQUARE, LOOK);
        const { data } = texture.image;
        expect(min).toEqual([0, 0]);
        expect(extent).toEqual([1, 1]);
        expect(levelAt(data, LOOK.size, LOOK.size / 2, LOOK.size / 2)).toBeGreaterThan(0);
        expect(levelAt(data, LOOK.size, LOOK.size / 2, 0)).toBe(0);
    });
});
