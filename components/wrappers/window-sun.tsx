import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, type DirectionalLight, type Group } from "three";
import { sunAt } from "@/lib/stage/sun";
import { createWindowWall, placeSun, placeWindow, windowBars } from "@/lib/stage/window-sun";
import type { FillRig, SunRig, WindowRig } from "@/lib/types";

interface Props {
    rig: SunRig;
    opening: WindowRig;
    fill?: FillRig;
    baked?: boolean;
    hour?: { value: number };
    onLight?: (light: DirectionalLight | null) => void;
    level?: { value: number };
}

export default function WindowSun({ rig, opening, fill, baked = false, hour, onLight, level }: Props) {
    const light = useRef<DirectionalLight>(null);
    const frame = useRef<Group>(null);
    const placed = useRef(rig.hour);
    const sun = useMemo(() => sunAt(rig.hour), [rig.hour]);
    const wall = useMemo(() => createWindowWall(opening), [opening]);
    const { verticals, horizontals } = useMemo(() => windowBars(opening), [opening]);

    useLayoutEffect(() => {
        if (light.current) placeSun(light.current, sun, rig);
        if (frame.current) placeWindow(frame.current, sun, opening);
    }, [sun, rig, opening]);

    useFrame(() => {
        const current = light.current;
        if (!current) return;
        if (hour && hour.value !== placed.current) {
            placed.current = hour.value;
            placeSun(current, sunAt(hour.value), rig);
        }
        if (level) current.intensity = rig.intensity * level.value;
    });

    return (
        <>
            <directionalLight
                ref={(node) => {
                    light.current = node;
                    onLight?.(node);
                }}
                castShadow
            />
            {fill ? <hemisphereLight args={[fill.sky.colour, fill.sky.ground, fill.sky.intensity]} /> : null}
            {fill ? <directionalLight color={fill.bounce.colour} intensity={fill.bounce.intensity} position={[...fill.bounce.from]} /> : null}
            <group ref={frame}>
                <mesh geometry={wall} castShadow={!baked}>
                    <meshBasicMaterial colorWrite={false} depthWrite={false} side={DoubleSide} />
                </mesh>
                {verticals.map((x) => (
                    <mesh key={`v${x}`} position-x={x} castShadow={!baked}>
                        <boxGeometry args={[opening.bar, opening.height, opening.bar]} />
                        <meshBasicMaterial colorWrite={false} depthWrite={false} />
                    </mesh>
                ))}
                {horizontals.map((y) => (
                    <mesh key={`h${y}`} position-y={y} castShadow={!baked}>
                        <boxGeometry args={[opening.width, opening.bar, opening.bar]} />
                        <meshBasicMaterial colorWrite={false} depthWrite={false} />
                    </mesh>
                ))}
            </group>
        </>
    );
}
