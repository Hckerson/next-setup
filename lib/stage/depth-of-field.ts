import type { Camera, Scene } from "three";
import type { Node, PassNode, UniformNode } from "three/webgpu";
import { Fn, Loop, abs, clamp, convertToTexture, cos, float, interleavedGradientNoise, min, perspectiveDepthToViewZ, reference, screenCoordinate, screenSize, select, sin, sqrt, uniform, uv, vec2, vec4 } from "three/tsl";

const FULL_FRAME_WIDTH = 36;
const MILLIMETRES = 1000;
const BLUR_LIMIT = 24;

export type Compose<TNode extends Node = Node> = (scenePass: PassNode, scene: Scene, camera: Camera) => TNode;

export interface Lens {
    focus: UniformNode<"float">;
    reach: UniformNode<"float">;
    blur: UniformNode<"float">;
}

export interface Focus {
    focalLength: number;
    aperture?: number;
    distance: number;
    width: number;
}

export const createLens = (): Lens => ({ focus: uniform(1), reach: uniform(0), blur: uniform(0) });

export const blurAtInfinity = ({ focalLength, aperture, distance, width }: Focus) => {
    if (!aperture) return 0;
    const focal = focalLength / MILLIMETRES;
    const circle = (focal * focal) / (aperture * (distance - focal));
    return ((circle * MILLIMETRES) / FULL_FRAME_WIDTH) * (width / 2);
};

export const focusLens = (lens: Lens, focus: Focus) => {
    const radius = blurAtInfinity(focus);
    lens.focus.value = focus.distance;
    lens.blur.value = Math.min(BLUR_LIMIT, radius);
    lens.reach.value = radius > 0 ? radius / lens.blur.value : 0;
};

const TAPS = 64;
const GOLDEN_ANGLE = 2.39996323;
const TURN = Math.PI * 2;

export const withLens =
    (lens: Lens, compose: Compose): Compose =>
    (scenePass, scene, camera) => {
        const colour = convertToTexture(compose(scenePass, scene, camera));
        const depthMap = scenePass.getTextureNode("depth");
        const near = reference("near", "float", camera);
        const far = reference("far", "float", camera);
        const depthAt = (at: Node<"vec2">) => perspectiveDepthToViewZ(depthMap.sample(at).r, near, far).negate();
        const blurAt = (depth: Node<"float">) => clamp(abs(depth.sub(lens.focus)).div(depth).mul(lens.reach), 0, 1).mul(lens.blur);
        return Fn(() => {
            const centre = uv();
            const ownDepth = depthAt(centre);
            const ownBlur = blurAt(ownDepth);
            const sum = colour.sample(centre).rgb.toVar();
            const weight = float(1).toVar();
            const spin = interleavedGradientNoise(screenCoordinate.xy).mul(TURN);
            Loop(TAPS, ({ i }) => {
                const index = float(i).add(1);
                const distance = sqrt(index.div(TAPS)).mul(lens.blur);
                const angle = index.mul(GOLDEN_ANGLE).add(spin);
                const at = centre.add(vec2(cos(angle), sin(angle)).mul(distance).div(screenSize));
                const depth = depthAt(at);
                const reach = select(depth.greaterThan(ownDepth), min(blurAt(depth), ownBlur), blurAt(depth));
                const share = clamp(reach.sub(distance).add(1), 0, 1);
                sum.addAssign(colour.sample(at).rgb.mul(share));
                weight.addAssign(share);
            });
            return vec4(sum.div(weight), 1);
        })();
    };
