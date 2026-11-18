import { Color, LinearSRGBColorSpace, MeshPhysicalMaterial, Vector2 } from "three";
import type { MetalLook, MetalMaps } from "@/lib/types";

export const createMetal = (look: MetalLook, maps: MetalMaps) =>
    new MeshPhysicalMaterial({
        color: new Color().setRGB(...look.reflectance, LinearSRGBColorSpace),
        map: maps.colour ?? null,
        metalness: 1,
        roughness: 1,
        roughnessMap: maps.roughness,
        normalMap: maps.normal,
        normalScale: new Vector2(look.normalScale, look.normalScale),
    });
