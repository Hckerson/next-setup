import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { BufferGeometry, Mesh } from "three";
import { FILL_CLOSES, createInkFill, type InkLevel } from "@/lib/stage/ink";

interface Props {
    geometry: BufferGeometry;
    colour: string;
    presence: InkLevel;
    resolved: InkLevel;
    position?: readonly [number, number, number];
}

export default function InkFill({ geometry, colour, presence, resolved, position = [0, 0, 0] }: Props) {
    const mesh = useRef<Mesh>(null);
    const material = useMemo(() => createInkFill(colour, presence, resolved), [colour, presence, resolved]);

    useFrame(() => {
        if (mesh.current) mesh.current.visible = presence.value > FILL_CLOSES && resolved.value < 1;
    });

    return <mesh ref={mesh} geometry={geometry} material={material} position={[...position]} />;
}
