import {
    DataTexture,
    LinearFilter,
    LinearMipmapLinearFilter,
    RepeatWrapping,
    RGBAFormat,
    UnsignedByteType,
} from "three";

const PRNG_STEP = 0x6d2b79f5;
const PRNG_RANGE = 4294967296;
const CHANNELS = 4;
const OPAQUE = 255;

interface NoiseOptions {
    size: number;
    cells: number;
    octaves: number;
    seed: number;
    low: number;
    high: number;
    streaks?: number;
    power?: number;
}

export const lattice = (seed: number, count: number) => {
    let state = seed;
    return Float32Array.from({ length: count }, () => {
        state = (state + PRNG_STEP) | 0;
        let mixed = Math.imul(state ^ (state >>> 15), 1 | state);
        mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
        return ((mixed ^ (mixed >>> 14)) >>> 0) / PRNG_RANGE;
    });
};

const smooth = (t: number) => t * t * (3 - 2 * t);

export const valueNoise = (grid: Float32Array, cells: number, u: number, v: number) => {
    const x = u * cells;
    const y = v * cells;
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const at = (column: number, row: number) =>
        grid[((row % cells) * cells + (column % cells)) % grid.length] ?? 0;
    const sx = smooth(x - x0);
    const sy = smooth(y - y0);
    const top = at(x0, y0) + (at(x0 + 1, y0) - at(x0, y0)) * sx;
    const bottom = at(x0, y0 + 1) + (at(x0 + 1, y0 + 1) - at(x0, y0 + 1)) * sx;
    return top + (bottom - top) * sy;
};

export const noiseTexture = ({ size, cells, octaves, seed, low, high, streaks = 0, power = 1 }: NoiseOptions) => {
    const pixels = new Uint8Array(size * size * CHANNELS);
    const grids = Array.from({ length: octaves }, (_, octave) =>
        lattice(seed + octave, (cells << octave) ** 2),
    );
    const scratch = lattice(seed + octaves, size);
    for (let row = 0; row < size; row += 1)
        for (let column = 0; column < size; column += 1) {
            let value = 0;
            let weight = 0;
            grids.forEach((grid, octave) => {
                const amplitude = 0.5 ** octave;
                value += valueNoise(grid, cells << octave, column / size, row / size) * amplitude;
                weight += amplitude;
            });
            const streak = streaks > 0 && (scratch[(row * 7 + column) % size] ?? 0) > 1 - streaks ? 1 : 0;
            const level = Math.min(1, (value / weight) ** power + streak * 0.5);
            const byte = Math.round((low + (high - low) * level) * OPAQUE);
            const at = (row * size + column) * CHANNELS;
            pixels.set([byte, byte, byte, OPAQUE], at);
        }
    const texture = new DataTexture(pixels, size, size, RGBAFormat, UnsignedByteType);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.magFilter = LinearFilter;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    return texture;
};
