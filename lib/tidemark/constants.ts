import { NoToneMapping } from "three";
import type { MassTokens, Waypoint } from "@/lib/types";

export const TIDEMARK_MASS: MassTokens = {
    anticipation: 1.4,
    damping: 5,
    frequency: 1.1,
};

export const TIDEMARK_PEAK = "offpace";

export const TIDEMARK_TOP_ROW = 3;

export const COIN = { count: 12, columns: 3, width: 0.5, height: 0.26, pitch: 0.42, base: 0.1, spread: 0.6 } as const;

export const JAR = { x: -1.5, width: 2.1, height: 2.1, depth: 1.6 } as const;

export const LAPTOP = { x: 4.2, z: -0.5, width: 2.2, height: 1.5, depth: 0.2 } as const;

export const AD = { x: -4.6, z: -2, width: 0.4, height: 2.4, depth: 1.6 } as const;

export const SUN = { fromX: -6, toX: 6, width: 1.4, height: 0.04, depth: 7 } as const;

export const MARK = { startY: 1.75, drop: -0.9, width: 2.1, height: 0.05, depth: 0.05 } as const;

export const GLASS_OPACITY = 0.35;

export const SUN_OPACITY = 0.5;

export const SPEND_EXIT = { x: 4, y: 1.5, z: 2 } as const;

export const DROP_HEIGHT = 4;

export const TRACE_ARC: readonly Waypoint[] = [
    { x: JAR.x, y: 2, z: 0 },
    { x: -2.8, y: 3.2, z: -0.8 },
    { x: AD.x, y: 2.4, z: AD.z },
];

export const TIDEMARK_CAMERA = {
    fov: 35,
    near: 0.1,
    far: 60,
    position: [0, 7, 12],
    rotation: [-0.477, 0, 0],
} as const;

export const TIDEMARK_RENDER = {
    dpr: [1, 1.5],
    antialias: true,
    toneMapping: NoToneMapping,
    exposure: 1,
    reach: 2,
} as const;

export const TIDEMARK_LENIS = { lerp: 0.05 } as const;

export const TIDEMARK_TRACK_CLASS = "stage-track-6";

export const TIDEMARK_ANCHOR = "connect";

export const coinSlot = (index: number): Waypoint => {
    const row = TIDEMARK_TOP_ROW - Math.floor(index / COIN.columns);
    const column = index % COIN.columns;
    return {
        x: JAR.x + (column - 1) * COIN.spread,
        y: COIN.base + row * COIN.pitch,
        z: 0,
    };
};

export const TIDEMARK_DEFAULTS = { ease: "none" } as const;

export const TIDEMARK_CONTACT = "mailto:hello@example.com";
