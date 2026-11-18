import { Color } from "three";
import { MeshPhysicalNodeMaterial } from "three/webgpu";
import { abs, color, depth, dot, mix, normalView, positionViewDirection, smoothstep, viewportDepthTexture, vec4 } from "three/tsl";
import { noiseTexture } from "@/lib/stage/noise-texture";
import type { GlassLook } from "@/lib/types";

const SMUDGE = { size: 256, cells: 6, octaves: 4, seed: 11, power: 5 } as const;
const SILHOUETTE = { from: 0.25, to: 0.55 } as const;

const facing = smoothstep(SILHOUETTE.from, SILHOUETTE.to, abs(dot(normalView, positionViewDirection)));

export const createGlass = (look: GlassLook) => {
    const glass = new MeshPhysicalNodeMaterial({
        color: new Color("#ffffff"),
        transmission: 1,
        thickness: look.refraction,
        ior: look.ior,
        roughness: 1,
        roughnessMap: noiseTexture({ ...SMUDGE, ...look.roughness }),
        attenuationColor: new Color(look.attenuation),
        attenuationDistance: look.attenuationDistance,
        specularIntensity: 1,
        metalness: 0,
    });
    glass.depthNode = mix(depth, viewportDepthTexture().r, facing);
    if (look.shadow) glass.castShadowNode = vec4(color(look.shadow.tint), look.shadow.opacity);
    if (look.smudge) {
        glass.clearcoat = look.smudge.clearcoat;
        glass.clearcoatRoughness = 1;
        glass.clearcoatRoughnessMap = noiseTexture({ ...SMUDGE, seed: SMUDGE.seed + 1, low: look.smudge.low, high: look.smudge.high });
    }
    return glass;
};
