import { useEffect, useMemo, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
import type { Light, Texture } from "three";
import { WebGPURenderer } from "three/webgpu";
import { useGLTF } from "@react-three/drei";
import { applyLightmaps, createSunKey, followHour, keyHoursOf, lightmapFiles } from "@/lib/stage/baked-set";

interface Props {
    url: string;
    lightmaps: string;
    intensity: number;
    hour?: { value: number };
    direct?: Light[];
    solid?: { value: number };
}

export default function BakedSet({ url, lightmaps, intensity, hour, direct, solid }: Props) {
    const { scene } = useGLTF(url);
    const gl = useThree((state) => state.gl);
    const [key] = useState(createSunKey);
    const hours = useMemo(() => keyHoursOf(scene), [scene]);
    const files = useMemo(() => lightmapFiles(scene), [scene]);
    const textures = useLoader(HDRLoader, files.map((file) => `${lightmaps}/${file}`));
    const maps = useMemo(
        () =>
            new Map(
                files.flatMap((file, index): [string, Texture][] => {
                    const map = textures[index];
                    return map ? [[file, map]] : [];
                }),
            ),
        [files, textures],
    );

    useEffect(() => {
        applyLightmaps(scene, { maps, intensity, key, direct, solid, anisotropy: gl instanceof WebGPURenderer ? gl.getMaxAnisotropy() : gl.capabilities.getMaxAnisotropy() });
    }, [scene, maps, intensity, key, direct, solid, gl]);

    useFrame(() => {
        if (hour) followHour(key, hours, hour.value);
    });

    return <primitive object={scene} />;
}
