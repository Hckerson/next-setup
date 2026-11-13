import { useFrame, useThree } from "@react-three/fiber";
import AnimaticActor from "@/components/features/animatic-actor";
import { paintGround } from "@/lib/stage/tone";
import { ACTOR_LOOKS, COIN_LOOK, type Tidemark } from "@/lib/tidemark/context";
import { TIDEMARK_RENDER } from "@/lib/tidemark/constants";

export default function TidemarkScene({ tidemark }: { tidemark: Tidemark }) {
    const scene = useThree((frame) => frame.scene);

    useFrame(() => paintGround(scene, tidemark.live));

    return (
        <>
            {Object.entries(tidemark.context.actors).map(([id, handle]) => {
                const look = ACTOR_LOOKS[id] ?? COIN_LOOK;
                return (
                    <AnimaticActor
                        key={id}
                        handle={handle}
                        dimensions={look.size}
                        opacity={look.opacity}
                        shadowed={look.shadowed}
                        reach={TIDEMARK_RENDER.reach}
                    />
                );
            })}
        </>
    );
}
