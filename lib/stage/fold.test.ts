import { Group, Vector3 } from "three";
import { describe, expect, it } from "vitest";
import { flatness, foldAmount, turning, hingeCount, layoutStrip, type FoldPanel, type FoldStrip } from "@/lib/stage/fold";

const strip: FoldStrip = { lengths: [0.06, 0.07, 0.07], root: 1, thickness: 0.001, stacking: [2, 1] };

const build = (panel: FoldPanel, angles: number[], parent: Group, centres: Map<number, Vector3>) => {
    const frame = new Group();
    frame.position.set(0, panel.pivot[0], panel.pivot[1]);
    if (panel.hinge !== null) frame.rotation.x = angles[panel.hinge] ?? 0;
    parent.add(frame);
    const centre = new Group();
    centre.position.set(0, panel.centre[0], panel.centre[1]);
    frame.add(centre);
    panel.children.forEach((child) => build(child, angles, frame, centres));
    centres.set(panel.index, centre.getWorldPosition(new Vector3()));
};

const centresAt = (angles: number[]) => {
    const root = new Group();
    const centres = new Map<number, Vector3>();
    build(layoutStrip(strip), angles, root, centres);
    return centres;
};

describe("layoutStrip", () => {
    it("lays the strip flat and in order at zero", () => {
        const centres = centresAt([0, 0]);
        expect(centres.get(0)?.y).toBeCloseTo(-0.03, 9);
        expect(centres.get(1)?.y).toBeCloseTo(-0.095, 9);
        expect(centres.get(2)?.y).toBeCloseTo(-0.165, 9);
        [0, 1, 2].forEach((index) => expect(centres.get(index)?.z).toBeCloseTo(0, 9));
    });

    it("folds both ends over the root, the outer flap above the inner", () => {
        const centres = centresAt([Math.PI, -Math.PI]);
        expect(centres.get(2)?.y).toBeCloseTo(-0.095, 9);
        expect(centres.get(2)?.z).toBeCloseTo(0.001, 9);
        expect(centres.get(0)?.y).toBeCloseTo(-0.06 - 0.03, 9);
        expect(centres.get(0)?.z).toBeCloseTo(0.002, 9);
    });

    it("counts one hinge between each pair of panels", () => {
        expect(hingeCount(strip)).toBe(2);
    });
});

describe("folding to the back", () => {
    it("lands both flaps behind the root with negative stacking", () => {
        const back: FoldStrip = { lengths: [0.06, 0.07, 0.07], root: 1, thickness: 0.001, stacking: [-2, -1] };
        const root = new Group();
        const centres = new Map<number, Vector3>();
        build(layoutStrip(back), [-Math.PI, Math.PI], root, centres);
        expect(centres.get(2)?.z).toBeCloseTo(-0.001, 9);
        expect(centres.get(0)?.z).toBeCloseTo(-0.002, 9);
        expect(centres.get(2)?.y).toBeCloseTo(-0.095, 9);
    });
});

describe("foldAmount", () => {
    it("is the furthest hinge's share of a half turn", () => {
        expect(foldAmount([0, 0])).toBe(0);
        expect(foldAmount([-Math.PI / 2, Math.PI / 4])).toBeCloseTo(0.5, 9);
    });
});

describe("flatness", () => {
    it("stays at zero while a panel turns and reaches one only as it lies flat", () => {
        expect(flatness([Math.PI / 2])).toBe(0);
        expect(flatness([Math.PI * 0.9])).toBe(0);
        expect(flatness([Math.PI * 0.99])).toBe(1);
    });
});

describe("turning", () => {
    it("reaches one within the first degrees of a fold, so the crease becomes an edge as soon as a panel lifts", () => {
        expect(turning([0, 0])).toBe(0);
        expect(turning([Math.PI * 0.05])).toBe(1);
        expect(turning([Math.PI * 0.025])).toBeCloseTo(0.5, 9);
    });
});
