import { Color, Matrix4, Quaternion, Vector3, type InstancedMesh } from "three";
import { sampleBody } from "@/lib/stage/baked-rigid";
import { lattice } from "@/lib/stage/noise-texture";
import type { BakedRigid, Variation } from "@/lib/types";

const position = new Vector3();
const rotation = new Quaternion();
const size = new Vector3();
const hidden = new Vector3(0, 0, 0);
const matrix = new Matrix4();
const tint = new Color();
const aged = new Color();

export const poseInstances = (mesh: InstancedMesh, bake: BakedRigid, progress: number, scale = 1) => {
    size.setScalar(scale);
    for (let body = 0; body < bake.bodies; body += 1) {
        const present = sampleBody(bake, progress, body, position, rotation);
        matrix.compose(position, rotation, present > 0 ? size : hidden);
        mesh.setMatrixAt(body, matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
};

export const varyInstances = (mesh: InstancedMesh, count: number, variation: Variation) => {
    const randoms = lattice(variation.seed, count * 2);
    aged.setRGB(...variation.tint);
    for (let index = 0; index < count; index += 1) {
        const chosen = (randoms[index * 2] ?? 0) < variation.share;
        tint.setRGB(1, 1, 1).lerp(aged, chosen ? 1 : (randoms[index * 2 + 1] ?? 0) * (variation.spread ?? 0));
        mesh.setColorAt(index, tint);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
};
