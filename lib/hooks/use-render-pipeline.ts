import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
    RenderPipeline,
    WebGPURenderer,
    type Node,
    type PassNode,
} from "three/webgpu";
import type { Camera, Scene } from "three";
import { pass } from "three/tsl";

const RENDER_PRIORITY = 1;
const SAMPLES = 4;

export const useRenderPipeline = (
    compose: (scenePass: PassNode, scene: Scene, camera: Camera) => Node,
) => {
    const gl = useThree((state) => state.gl);
    const scene = useThree((state) => state.scene);
    const camera = useThree((state) => state.camera);
    const pipelineRef = useRef<RenderPipeline | null>(null);

    useEffect(() => {
        if (!(gl instanceof WebGPURenderer))
            throw new Error("The render pipeline needs the stage renderer");
        const pipeline = new RenderPipeline(
            gl,
            compose(pass(scene, camera, { samples: SAMPLES }), scene, camera),
        );
        pipelineRef.current = pipeline;
        return () => {
            pipeline.dispose();
            pipelineRef.current = null;
        };
    }, [gl, scene, camera, compose]);

    useFrame((state) => {
        if (pipelineRef.current) pipelineRef.current.render();
        else state.gl.render(state.scene, state.camera);
    }, RENDER_PRIORITY);
};
