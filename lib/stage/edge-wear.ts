import { DataTexture, LinearFilter, RGBAFormat, UnsignedByteType } from "three";
import { lattice, valueNoise } from "@/lib/stage/noise-texture";
import type { InkPoint } from "@/lib/stage/ink";

export interface EdgeWearLook {
    reach: number;
    cells: number;
    seed: number;
    size: number;
}

const OPAQUE = 255;
const CHANNELS = 4;

const distanceToSegment = ([px, py]: InkPoint, [ax, ay]: InkPoint, [bx, by]: InkPoint) => {
    const [dx, dy] = [bx - ax, by - ay];
    const along = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy || 1)));
    return Math.hypot(px - (ax + dx * along), py - (ay + dy * along));
};

type Segment = [InkPoint, InkPoint];

const boundsOf = (points: readonly InkPoint[]) => {
    const xs = points.map(([x]) => x);
    const ys = points.map(([, y]) => y);
    const min: InkPoint = [Math.min(...xs), Math.min(...ys)];
    const extent: InkPoint = [Math.max(...xs) - min[0], Math.max(...ys) - min[1]];
    return { min, extent };
};

const wearAlong = (segments: readonly Segment[], { min, extent }: { min: InkPoint; extent: InkPoint }, look: EdgeWearLook) => {
    const grid = lattice(look.seed, look.cells ** 2);
    const pixels = new Uint8Array(look.size * look.size * CHANNELS);
    for (let row = 0; row < look.size; row += 1)
        for (let column = 0; column < look.size; column += 1) {
            const [u, v] = [(column + 0.5) / look.size, (row + 0.5) / look.size];
            const point: InkPoint = [min[0] + u * extent[0], min[1] + v * extent[1]];
            const rub = Math.min(1, segments.reduce((sum, [a, b]) => sum + Math.max(0, 1 - distanceToSegment(point, a, b) / look.reach) ** 2, 0));
            const level = Math.round(rub * valueNoise(grid, look.cells, u, v) * OPAQUE);
            pixels.set([level, level, level, OPAQUE], (row * look.size + column) * CHANNELS);
        }
    const texture = new DataTexture(pixels, look.size, look.size, RGBAFormat, UnsignedByteType);
    texture.magFilter = LinearFilter;
    texture.minFilter = LinearFilter;
    texture.needsUpdate = true;
    return { texture, min, extent };
};

export const createEdgeWear = (outline: readonly InkPoint[], look: EdgeWearLook) =>
    wearAlong(
        outline.map((point, index): Segment => [point, outline[(index + 1) % outline.length] ?? point]),
        boundsOf(outline),
        look,
    );

export const createLineWear = (lines: readonly (readonly InkPoint[])[], frame: readonly InkPoint[], look: EdgeWearLook) =>
    wearAlong(
        lines.flatMap((line) => line.slice(1).map((point, index): Segment => [line[index] ?? point, point])),
        boundsOf(frame),
        look,
    );
