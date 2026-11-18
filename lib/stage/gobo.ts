import { DataTexture, LinearFilter, LinearMipmapLinearFilter, RGBAFormat, UnsignedByteType } from "three";
import type { WindowRig } from "@/lib/types";

const OPAQUE = 255;
const CHANNELS = 4;

const ramp = (distance: number, penumbra: number) => Math.min(1, Math.max(0, distance / penumbra + 0.5));

const across = (position: number, size: number, panes: number, bar: number, penumbra: number) => {
    const half = size / 2;
    const inside = Math.min(ramp(position + half, penumbra), ramp(half - position, penumbra));
    const bars = Array.from({ length: panes - 1 }, (_, index) => -half + ((index + 1) * size) / panes);
    const blocked = bars.reduce((shade, centre) => Math.max(shade, ramp(bar / 2 - Math.abs(position - centre), penumbra)), 0);
    return inside * (1 - blocked);
};

export const windowTransmission = (x: number, y: number, opening: WindowRig, penumbra: number) => {
    const [columns, rows] = opening.panes;
    return across(x, opening.width, columns, opening.bar, penumbra) * across(y, opening.height, rows, opening.bar, penumbra);
};

export const sunPenumbra = (distance: number, angleDegrees: number) => distance * Math.tan((angleDegrees * Math.PI) / 180);

export const createWindowGobo = (opening: WindowRig, cover: number, penumbra: number, size: number) => {
    const pixels = new Uint8Array(size * size * CHANNELS);
    for (let row = 0; row < size; row += 1)
        for (let column = 0; column < size; column += 1) {
            const x = ((column + 0.5) / size - 0.5) * cover;
            const y = ((row + 0.5) / size - 0.5) * cover;
            const level = Math.round(windowTransmission(x, y, opening, penumbra) * OPAQUE);
            pixels.set([level, level, level, OPAQUE], (row * size + column) * CHANNELS);
        }
    const gobo = new DataTexture(pixels, size, size, RGBAFormat, UnsignedByteType);
    gobo.magFilter = LinearFilter;
    gobo.minFilter = LinearMipmapLinearFilter;
    gobo.generateMipmaps = true;
    gobo.needsUpdate = true;
    return gobo;
};
