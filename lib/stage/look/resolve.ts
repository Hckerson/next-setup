import type { NodeMaterial } from "three/webgpu";
import { reference, smoothstep } from "three/tsl";
import { RESOLVE } from "@/lib/stage/constants";

export const solidity = (level: number) => {
    const t = Math.min(1, Math.max(0, (level - RESOLVE.solidOpaque) / (1 - RESOLVE.solidOpaque)));
    return t * t * (3 - 2 * t);
};

export const fadeWith = <T extends NodeMaterial>(material: T, level: { value: number }) => {
    material.transparent = true;
    material.opacityNode = smoothstep(RESOLVE.solidArrives, RESOLVE.solidOpaque, reference("value", "float", level));
    return material;
};
