import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { placeAnchor, projectToScreen } from "@/lib/stage/world-anchor";

interface Props {
    target: RefObject<HTMLElement | null>;
    position: Vector3;
}

export default function WorldAnchor({ target, position }: Props) {
    useFrame(({ camera, size }) => {
        const element = target.current;
        if (!element) return;
        placeAnchor(
            element,
            projectToScreen(position, camera, size.width, size.height),
        );
    });
    return null;
}
