import { Quaternion, type Vector3 } from "three";
import type { BakedRigid } from "@/lib/types";
import {
    BAKED_RIGID_STRIDE,
    bakedRigidMetaSchema,
} from "@/lib/validations/baked-rigid";

const PRESENT = 7;
const from = new Quaternion();
const to = new Quaternion();

const offset = (bake: BakedRigid, frame: number, body: number) =>
    (frame * bake.bodies + body) * BAKED_RIGID_STRIDE;

export const sampleBody = (
    bake: BakedRigid,
    progress: number,
    body: number,
    position: Vector3,
    rotation: Quaternion,
) => {
    const clamped = Math.min(1, Math.max(0, progress));
    const exact = clamped * (bake.frames - 1);
    const first = Math.floor(exact);
    const second = Math.min(first + 1, bake.frames - 1);
    const blend = exact - first;
    const a = offset(bake, first, body);
    const b = offset(bake, second, body);
    const { data } = bake;
    position.set(
        data[a] + (data[b] - data[a]) * blend,
        data[a + 1] + (data[b + 1] - data[a + 1]) * blend,
        data[a + 2] + (data[b + 2] - data[a + 2]) * blend,
    );
    from.set(data[a + 3], data[a + 4], data[a + 5], data[a + 6]);
    to.set(data[b + 3], data[b + 4], data[b + 5], data[b + 6]);
    rotation.slerpQuaternions(from, to, blend);
    return blend < 0.5 ? data[a + PRESENT] : data[b + PRESENT];
};

export const loadBakedRigid = async (metaUrl: string): Promise<BakedRigid> => {
    const meta = bakedRigidMetaSchema.parse(
        await (await fetch(metaUrl)).json(),
    );
    const dataUrl = new URL(meta.data, new URL(metaUrl, window.location.href));
    const buffer = await (await fetch(dataUrl)).arrayBuffer();
    const data = new Float32Array(buffer);
    if (data.length !== meta.frames * meta.bodies * meta.stride)
        throw new Error(`The bake at ${metaUrl} does not match its meta`);
    return { rate: meta.rate, frames: meta.frames, bodies: meta.bodies, data };
};
