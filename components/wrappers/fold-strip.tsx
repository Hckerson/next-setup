import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { FoldPanel } from "@/lib/stage/fold";

interface Props {
    panel: FoldPanel;
    hinges: { angles: number[] };
    render: (panel: FoldPanel) => ReactNode;
}

export default function FoldStrip({ panel, hinges, render }: Props) {
    const frame = useRef<Group>(null);

    useFrame(() => {
        if (frame.current && panel.hinge !== null) frame.current.rotation.x = hinges.angles[panel.hinge] ?? 0;
    });

    return (
        <group ref={frame} position={[0, panel.pivot[0], panel.pivot[1]]}>
            <group position={[0, panel.centre[0], panel.centre[1]]}>{render(panel)}</group>
            {panel.children.map((child) => (
                <FoldStrip key={child.index} panel={child} hinges={hinges} render={render} />
            ))}
        </group>
    );
}
