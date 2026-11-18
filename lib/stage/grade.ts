import { Color } from "three";
import type { Node, UniformNode } from "three/webgpu";
import { luminance, mix, smoothstep, uniform, vec3, vec4 } from "three/tsl";
import type { Compose } from "@/lib/stage/depth-of-field";
import type { GradeLook } from "@/lib/types";

const NEUTRAL = [1, 1, 1] as const;

export interface Grade {
    saturation: UniformNode<"float">;
    lift: UniformNode<"color">;
    gain: UniformNode<"color">;
    shade: UniformNode<"color">;
    light: UniformNode<"color">;
    pivot: UniformNode<"float">;
}

export const createGrade = (look: GradeLook): Grade => ({
    saturation: uniform(look.saturation),
    lift: uniform(new Color().setRGB(...look.lift)),
    gain: uniform(new Color().setRGB(...look.gain)),
    shade: uniform(new Color().setRGB(...(look.split?.shade ?? NEUTRAL))),
    light: uniform(new Color().setRGB(...(look.split?.light ?? NEUTRAL))),
    pivot: uniform(look.split?.pivot ?? 1),
});

export const withGrade =
    (grade: Grade, compose: Compose<Node<"vec4">>): Compose<Node<"vec4">> =>
    (scenePass, scene, camera) => {
        const colour = compose(scenePass, scene, camera);
        const brightness = luminance(colour.rgb);
        const balanced = mix(vec3(brightness), colour.rgb, grade.saturation);
        const toned = balanced.mul(mix(grade.shade, grade.light, smoothstep(0, grade.pivot.mul(2), brightness)));
        return vec4(toned.mul(grade.gain).add(grade.lift), colour.a);
    };
