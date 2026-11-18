import { useEffect, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type { Object3D, Vector3 } from "three";
import { placeSurface, projectSurface, uprightPoints } from "@/lib/stage/world-anchor";
import { closing } from "@/lib/stage/ink";

interface Props {
    target: RefObject<HTMLElement | null>;
    surface: RefObject<Object3D | null>;
    corners: readonly [Vector3, Vector3, Vector3];
    level?: { value: number };
    closes?: boolean;
    upright?: boolean;
}

export default function WorldSurface({ target, surface, corners, level, upright = false, closes = false }: Props) {
    const size = useRef({ width: 0, height: 0 });

    useEffect(() => {
        const element = target.current;
        if (!element) return;
        const observer = new ResizeObserver(() => {
            size.current = { width: element.offsetWidth, height: element.offsetHeight };
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, [target]);

    useFrame(({ camera, size: canvas }) => {
        const element = target.current;
        const object = surface.current;
        if (!element || !object) return;
        object.updateWorldMatrix(true, false);
        const points = projectSurface(corners, object.matrixWorld, camera, canvas.width, canvas.height);
        placeSurface(element, upright ? uprightPoints(points) : points, size.current, level && closes ? closing(level.value) : level?.value);
    });

    return null;
}
