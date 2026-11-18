import { describe, expect, it } from "vitest";
import { arrowHead, dashDot, dimension, sheetFrame } from "@/lib/stage/drafting";

describe("dashDot", () => {
    it("alternates dash and dot along the line and stops at its end", () => {
        const paths = dashDot([0, 0], [0.02, 0], { dash: 0.004, gap: 0.001, dot: 0.0005 });
        const lengths = paths.map((path) => Math.abs((path.points[1]?.[0] ?? 0) - (path.points[0]?.[0] ?? 0)));
        expect(lengths[0]).toBeCloseTo(0.004, 9);
        expect(lengths[1]).toBeCloseTo(0.0005, 9);
        expect(Math.max(...paths.flatMap((path) => path.points.map((point) => point[0])))).toBeLessThanOrEqual(0.02 + 1e-12);
    });

    it("draws a phantom line with two dots between dashes", () => {
        const paths = dashDot([0, 0], [0.02, 0], { dash: 0.004, gap: 0.001, dot: 0.0005, dots: 2 });
        const lengths = paths.map((path) => Math.abs((path.points[1]?.[0] ?? 0) - (path.points[0]?.[0] ?? 0)));
        expect(lengths.slice(0, 4).map((length) => Number(length.toFixed(4)))).toEqual([0.004, 0.0005, 0.0005, 0.004]);
    });
});

describe("arrowHead", () => {
    it("points at the tip and opens toward the line", () => {
        const head = arrowHead([0, 0], [1, 0], 0.1);
        expect(head.filled).toBe(true);
        expect(head.points[0]).toEqual([0, 0]);
        expect(head.points[1]?.[0]).toBeCloseTo(0.1, 9);
    });
});

describe("dimension", () => {
    it("measures between two points with the line offset to one side", () => {
        const { paths, centre, angle } = dimension([0, 0], [0, -0.2], { offset: 0.01, extension: 0.002, arrow: 0.002 });
        expect(paths).toHaveLength(5);
        expect(centre[1]).toBeCloseTo(-0.1, 9);
        expect(Math.abs(centre[0])).toBeCloseTo(0.01, 9);
        expect(angle).toBeCloseTo(-Math.PI / 2, 9);
    });
});

describe("sheetFrame", () => {
    const format = { width: 0.45, height: 0.28, inset: 0.008, zones: [6, 4] as const, block: { width: 0.09, rowHeight: 0.006, rows: 5 } };

    it("draws the border inside the trim and a title block in the bottom right", () => {
        const { paths, cells } = sheetFrame(format);
        const border = paths[0]?.points ?? [];
        expect(border[0]).toEqual([expect.closeTo(-0.217, 9), expect.closeTo(-0.132, 9)]);
        expect(cells).toHaveLength(5);
        expect(cells[0]?.origin[0]).toBeCloseTo(0.127, 9);
        expect(cells.at(-1)?.origin[1]).toBeCloseTo(-0.132 + 0.006, 9);
    });

    it("ticks every zone boundary on all four sides", () => {
        const { paths } = sheetFrame(format);
        const rules = format.block.rows - 1;
        expect(paths.length - 2 - rules).toBe((6 - 1) * 2 + (4 - 1) * 2);
    });
});
