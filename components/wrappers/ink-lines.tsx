import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { createInk, createInkGeometry, type InkLevel, type InkPath } from "@/lib/stage/ink";

interface Props {
    paths: readonly InkPath[];
    width: number;
    colour: string;
    drawn: InkLevel;
    resolved: InkLevel;
}

export default function InkLines({ paths, width, colour, drawn, resolved }: Props) {
    const mesh = useRef<Mesh>(null);
    const geometry = useMemo(() => createInkGeometry(paths, width), [paths, width]);
    const material = useMemo(() => createInk(colour, drawn, resolved), [colour, drawn, resolved]);

    useFrame(() => {
        if (mesh.current) mesh.current.visible = drawn.value > 0 && resolved.value < 1;
    });

    return <mesh ref={mesh} geometry={geometry} material={material} renderOrder={1} />;
}
