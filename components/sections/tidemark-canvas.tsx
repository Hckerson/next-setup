"use client";
import StageCanvas from "@/components/wrappers/stage-canvas";
import TidemarkScene from "@/components/features/tidemark-scene";
import type { Tidemark } from "@/lib/tidemark/context";
import { TIDEMARK_CAMERA, TIDEMARK_RENDER } from "@/lib/tidemark/constants";

export default function TidemarkCanvas({ tidemark }: { tidemark: Tidemark }) {
    return (
        <StageCanvas
            className="absolute inset-x-0 top-0 h-lvh"
            dpr={TIDEMARK_RENDER.dpr}
            antialias={TIDEMARK_RENDER.antialias}
            toneMapping={TIDEMARK_RENDER.toneMapping}
            exposure={TIDEMARK_RENDER.exposure}
            camera={{
                fov: TIDEMARK_CAMERA.fov,
                near: TIDEMARK_CAMERA.near,
                far: TIDEMARK_CAMERA.far,
                position: [...TIDEMARK_CAMERA.position],
                rotation: [...TIDEMARK_CAMERA.rotation],
            }}
        >
            <TidemarkScene tidemark={tidemark} />
        </StageCanvas>
    );
}
