import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { Vector2 } from "three";

export const usePointerSway = (smoothing: number) => {
    const pointer = useRef<[number, number]>([0, 0]);
    const present = useRef(false);
    const sway = useMemo(() => new Vector2(), []);

    useEffect(() => {
        const move = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            pointer.current = [
                (event.clientX / window.innerWidth) * 2 - 1,
                (event.clientY / window.innerHeight) * 2 - 1,
            ];
            present.current = true;
        };
        const leave = () => {
            present.current = false;
        };
        window.addEventListener("pointermove", move, { passive: true });
        document.documentElement.addEventListener("pointerleave", leave);
        return () => {
            window.removeEventListener("pointermove", move);
            document.documentElement.removeEventListener("pointerleave", leave);
        };
    }, []);

    useFrame((_, delta) => {
        easing.damp2(sway, pointer.current, smoothing, delta);
    });

    return { sway, pointer, present };
};
