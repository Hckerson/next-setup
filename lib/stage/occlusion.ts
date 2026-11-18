import type { Camera, Scene } from "three";
import type { PassNode } from "three/webgpu";
import { builtinAOContext, float, mix, mrt, normalView, pass, reference, screenUV } from "three/tsl";
import { ao } from "three/addons/tsl/display/GTAONode.js";
import type { OcclusionLook } from "@/lib/types";

export const withOcclusion =
    (look: OcclusionLook, strength?: { value: number }) =>
    (scenePass: PassNode, scene: Scene, camera: Camera): PassNode => {
        const prePass = pass(scene, camera);
        prePass.setMRT(mrt({ output: normalView }));
        const occlusion = ao(prePass.getTextureNode("depth"), prePass.getTextureNode(), camera);
        occlusion.radius.value = look.radius;
        occlusion.thickness.value = look.thickness;
        occlusion.resolutionScale = look.resolutionScale;
        const shade = occlusion.getTextureNode().sample(screenUV).r;
        scenePass.contextNode = builtinAOContext(strength ? mix(float(1), shade, reference("value", "float", strength)) : shade);
        return scenePass;
    };
