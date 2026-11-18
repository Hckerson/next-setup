import { useMemo } from "react";
import { createCatcherGeometry, type CatcherHole } from "@/lib/stage/shadow-catcher";

interface Props {
    size: readonly [number, number];
    position: readonly [number, number, number];
    opacity: number;
    holes?: readonly CatcherHole[];
}

export default function ShadowCatcher({ size, position, opacity, holes = [] }: Props) {
    const geometry = useMemo(() => createCatcherGeometry(size, position, holes), [size, position, holes]);
    return (
        <mesh geometry={geometry} position={[...position]} rotation-x={-Math.PI / 2} receiveShadow>
            <shadowMaterial opacity={opacity} transparent />
        </mesh>
    );
}
