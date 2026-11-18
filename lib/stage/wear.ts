import { lattice, valueNoise } from "@/lib/stage/noise-texture";
import type { WearLook } from "@/lib/types";

const SCRATCH_STEP = 0.5;

const smudges = (size: number, look: WearLook) => {
    const field = new Float32Array(size * size);
    const grid = lattice(look.seed, look.smudge.cells ** 2);
    for (let row = 0; row < size; row += 1)
        for (let column = 0; column < size; column += 1)
            field[row * size + column] = valueNoise(grid, look.smudge.cells, column / size, row / size) ** look.smudge.power * look.smudge.amount;
    return field;
};

const scratches = (size: number, look: WearLook) => {
    const field = new Float32Array(size * size);
    const strokes = lattice(look.seed + 1, look.scratch.count * 4);
    for (let index = 0; index < look.scratch.count; index += 1) {
        const x = (strokes[index * 4] ?? 0) * size;
        const y = (strokes[index * 4 + 1] ?? 0) * size;
        const angle = (strokes[index * 4 + 2] ?? 0) * Math.PI * 2;
        const length = (0.3 + 0.7 * (strokes[index * 4 + 3] ?? 0)) * look.scratch.length * size;
        for (let travelled = 0; travelled < length; travelled += SCRATCH_STEP) {
            const column = Math.round(x + Math.cos(angle) * travelled);
            const row = Math.round(y + Math.sin(angle) * travelled);
            if (column < 0 || row < 0 || column >= size || row >= size) break;
            field[row * size + column] = look.scratch.amount;
        }
    }
    return field;
};

export const createWear = (size: number, look: WearLook) => ({ smudge: smudges(size, look), scratch: scratches(size, look) });
