import { Quaternion, Vector3 } from "three";
import { describe, expect, it } from "vitest";
import { sampleBody } from "@/lib/stage/baked-rigid";
import type { BakedRigid } from "@/lib/types";

const turned = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);

const bake: BakedRigid = {
    rate: 60,
    frames: 3,
    bodies: 1,
    data: new Float32Array([
        0, 0, 0, 0, 0, 0, 1, 0,
        2, 4, 0, turned.x, turned.y, turned.z, turned.w, 1,
        4, 4, 0, turned.x, turned.y, turned.z, turned.w, 1,
    ]),
};

describe("sampleBody", () => {
    it("returns each stored frame exactly at its progress", () => {
        const position = new Vector3();
        const rotation = new Quaternion();
        sampleBody(bake, 0.5, 0, position, rotation);
        expect(position.toArray()).toEqual([2, 4, 0]);
        expect(rotation.angleTo(turned)).toBeCloseTo(0, 5);
        sampleBody(bake, 1, 0, position, rotation);
        expect(position.toArray()).toEqual([4, 4, 0]);
    });

    it("interpolates position and rotation between frames", () => {
        const position = new Vector3();
        const rotation = new Quaternion();
        sampleBody(bake, 0.25, 0, position, rotation);
        expect(position.toArray()).toEqual([1, 2, 0]);
        expect(rotation.angleTo(new Quaternion())).toBeCloseTo(Math.PI / 4, 5);
    });

    it("gives the same state whichever direction it is scrubbed from", () => {
        const forward = new Vector3();
        const backward = new Vector3();
        const rotation = new Quaternion();
        sampleBody(bake, 0.2, 0, forward, rotation);
        sampleBody(bake, 1, 0, backward, rotation);
        sampleBody(bake, 0.2, 0, backward, rotation);
        expect(backward.toArray()).toEqual(forward.toArray());
    });

    it("reports presence and clamps progress outside 0 to 1", () => {
        const position = new Vector3();
        const rotation = new Quaternion();
        expect(sampleBody(bake, -1, 0, position, rotation)).toBe(0);
        expect(position.toArray()).toEqual([0, 0, 0]);
        expect(sampleBody(bake, 2, 0, position, rotation)).toBe(1);
    });
});
