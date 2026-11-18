import type { Texture } from "three";

export type Rgb = readonly [number, number, number];

export type Point = readonly [number, number, number];

export interface GlassLook {
    ior: number;
    refraction: number;
    attenuation: string;
    attenuationDistance: number;
    roughness: { low: number; high: number };
    shadow?: { tint: string; opacity: number };
    smudge?: { clearcoat: number; low: number; high: number };
}

export interface MetalLook {
    reflectance: Rgb;
    reflection: number;
    normalScale: number;
}

export interface MetalMaps {
    colour?: Texture;
    roughness: Texture;
    normal: Texture;
}

export interface SunRig {
    hour: number;
    intensity: number;
    distance: number;
    mapSize: number;
    extent: number;
    bias: number;
    normalBias: number;
    softness?: number;
}

export interface WindowRig {
    distance: number;
    width: number;
    height: number;
    bar: number;
    panes: readonly [number, number];
    wall: number;
    aim: Point;
}

export interface FillRig {
    sky: { colour: string; ground: string; intensity: number };
    bounce: { colour: string; intensity: number; from: Point };
}

export interface OcclusionLook {
    radius: number;
    thickness: number;
    resolutionScale: number;
}

export interface Variation {
    seed: number;
    share: number;
    tint: Rgb;
    spread?: number;
}

export interface WearLook {
    seed: number;
    smudge: { cells: number; power: number; amount: number };
    scratch: { count: number; length: number; amount: number };
}

export interface GradeLook {
    saturation: number;
    lift: Rgb;
    gain: Rgb;
    split?: { shade: Rgb; light: Rgb; pivot: number };
}
