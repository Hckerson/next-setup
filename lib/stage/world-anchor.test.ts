import { PerspectiveCamera, Vector3 } from "three";
import { describe, expect, it } from "vitest";
import { anchorTransform, projectToScreen, surfaceMatrix, uprightPoints } from "@/lib/stage/world-anchor";

const camera = new PerspectiveCamera(50, 2, 0.1, 100);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);
camera.updateMatrixWorld();

describe("projectToScreen", () => {
    it("puts a point on the camera's axis at the centre of the screen", () => {
        const point = projectToScreen(new Vector3(0, 0, 0), camera, 1000, 500);
        expect(point.x).toBeCloseTo(500, 6);
        expect(point.y).toBeCloseTo(250, 6);
        expect(point.visible).toBe(true);
    });

    it("moves right and up on screen as the point moves right and up in the world", () => {
        const point = projectToScreen(new Vector3(1, 1, 0), camera, 1000, 500);
        expect(point.x).toBeGreaterThan(500);
        expect(point.y).toBeLessThan(250);
    });

    it("hides a point behind the camera", () => {
        expect(projectToScreen(new Vector3(0, 0, 20), camera, 1000, 500).visible).toBe(false);
    });
});

describe("anchorTransform", () => {
    it("centres the element on the point using a transform only", () => {
        expect(anchorTransform({ x: 10, y: 20, visible: true })).toBe(
            "translate3d(10.00px, 20.00px, 0) translate(-50%, -50%)",
        );
    });
});

describe("surfaceMatrix", () => {
    it("maps the element's corners onto the projected surface corners", () => {
        const origin = { x: 100, y: 50, visible: true };
        const across = { x: 300, y: 90, visible: true };
        const down = { x: 80, y: 250, visible: true };
        const matrix = surfaceMatrix(origin, across, down, 200, 100);
        const [a, b, c, d, e, f] = (matrix.match(/-?[\d.]+/g) ?? []).map(Number);
        const map = (x: number, y: number) => [(a ?? 0) * x + (c ?? 0) * y + (e ?? 0), (b ?? 0) * x + (d ?? 0) * y + (f ?? 0)];
        expect(map(0, 0)).toEqual([100, 50]);
        expect(map(200, 0)).toEqual([expect.closeTo(300, 3), expect.closeTo(90, 3)]);
        expect(map(0, 100)).toEqual([expect.closeTo(80, 3), expect.closeTo(250, 3)]);
    });
});

describe("uprightPoints", () => {
    const point = (x: number, y: number) => ({ x, y, visible: true });

    it("keeps text that already reads left to right", () => {
        const points = [point(0, 0), point(100, 0), point(0, 20)];
        expect(uprightPoints(points)).toBe(points);
    });

    it("turns text that would read right to left by half a turn", () => {
        const [origin, across, down] = uprightPoints([point(100, 20), point(0, 20), point(100, 0)]);
        expect([origin?.x, origin?.y]).toEqual([0, 0]);
        expect([across?.x, across?.y]).toEqual([100, 0]);
        expect([down?.x, down?.y]).toEqual([0, 20]);
    });
});
