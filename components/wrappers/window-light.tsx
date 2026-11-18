import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { SpotLight } from "three";
import { sunAt } from "@/lib/stage/sun";
import { createWindowGobo, sunPenumbra } from "@/lib/stage/gobo";
import { placeWindowLight } from "@/lib/stage/window-sun";
import { solidity } from "@/lib/stage/look/resolve";
import type { SunRig, WindowRig } from "@/lib/types";

const GOBO_SIZE = 1024;

interface Props {
    rig: SunRig;
    opening: WindowRig;
    angle: number;
    cover: number;
    level?: { value: number };
    onLight?: (light: SpotLight | null) => void;
}

export default function WindowLight({ rig, opening, angle, cover, level, onLight }: Props) {
    const light = useRef<SpotLight>(null);
    const sun = useMemo(() => sunAt(rig.hour), [rig.hour]);
    const gobo = useMemo(() => createWindowGobo(opening, cover, sunPenumbra(opening.distance, angle), GOBO_SIZE), [opening, cover, angle]);

    useLayoutEffect(() => {
        if (light.current) placeWindowLight(light.current, sun, rig, opening, cover, gobo);
    }, [sun, rig, opening, cover, gobo]);

    useFrame(() => {
        if (level && light.current) light.current.intensity = rig.intensity * solidity(level.value);
    });

    return (
        <spotLight
            ref={(node) => {
                light.current = node;
                onLight?.(node);
            }}
            castShadow
        />
    );
}
