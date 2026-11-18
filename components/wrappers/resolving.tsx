import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export default function Resolving({ level, children }: { level: { value: number }; children: ReactNode }) {
    const group = useRef<Group>(null);

    useFrame(() => {
        if (group.current) group.current.visible = level.value > 0;
    });

    return (
        <group ref={group} visible={false}>
            {children}
        </group>
    );
}
