import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh, MeshBasicMaterial } from "three";
import { syncAnimatic } from "@/lib/stage/animatic";
import type { ActorHandle } from "@/lib/types";

const SHADOW_SEGMENTS = 32;

interface Props {
    handle: ActorHandle;
    dimensions: readonly [number, number, number];
    reach: number;
    opacity?: number;
    shadowed?: boolean;
}

export default function AnimaticActor({
    handle,
    dimensions,
    reach,
    opacity = 1,
    shadowed = true,
}: Props) {
    const group = useRef<Group>(null);
    const body = useRef<MeshBasicMaterial>(null);
    const shadow = useRef<Mesh>(null);
    const shadowMaterial = useRef<MeshBasicMaterial>(null);
    const [width, height, depth] = dimensions;

    useFrame(() => {
        if (group.current && body.current && shadow.current && shadowMaterial.current)
            syncAnimatic(
                group.current,
                body.current,
                shadow.current,
                shadowMaterial.current,
                handle,
                reach,
                opacity,
                shadowed,
            );
    });

    return (
        <>
            <mesh ref={shadow} rotation-x={-Math.PI / 2}>
                <circleGeometry args={[Math.max(width, depth) / 2, SHADOW_SEGMENTS]} />
                <meshBasicMaterial ref={shadowMaterial} color="black" transparent />
            </mesh>
            <group ref={group}>
                <mesh position-y={height / 2}>
                    <boxGeometry args={[width, height, depth]} />
                    <meshBasicMaterial ref={body} transparent depthWrite={opacity >= 1} />
                </mesh>
            </group>
        </>
    );
}
