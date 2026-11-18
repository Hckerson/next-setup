export interface FoldStrip {
    lengths: readonly number[];
    root: number;
    thickness: number;
    stacking: readonly number[];
}

export interface FoldPanel {
    index: number;
    length: number;
    hinge: number | null;
    pivot: readonly [number, number];
    centre: readonly [number, number];
    children: FoldPanel[];
}

const offsetOf = (strip: FoldStrip, index: number) => strip.lengths.slice(0, index).reduce((sum, length) => sum + length, 0);

const liftOf = (strip: FoldStrip, hinge: number) => (strip.thickness * (strip.stacking[hinge] ?? 1)) / 2;

const branch = (strip: FoldStrip, index: number, step: 1 | -1, parentLift: number, pivotY: number): FoldPanel | null => {
    const length = strip.lengths[index];
    if (length === undefined) return null;
    const hinge = step === 1 ? index - 1 : index;
    const lift = liftOf(strip, hinge);
    const reach = -step * length;
    const next = branch(strip, index + step, step, lift, reach);
    return {
        index,
        length,
        hinge,
        pivot: [pivotY, lift - parentLift],
        centre: [reach / 2, -lift],
        children: next ? [next] : [],
    };
};

export const layoutStrip = (strip: FoldStrip): FoldPanel => {
    const length = strip.lengths[strip.root];
    if (length === undefined) throw new Error(`The strip has no panel ${strip.root}`);
    const top = -offsetOf(strip, strip.root);
    const children = [branch(strip, strip.root - 1, -1, 0, top), branch(strip, strip.root + 1, 1, 0, top - length)].filter(
        (panel): panel is FoldPanel => panel !== null,
    );
    return { index: strip.root, length, hinge: null, pivot: [0, 0], centre: [top - length / 2, 0], children };
};

export const hingeCount = (strip: FoldStrip) => Math.max(0, strip.lengths.length - 1);

export const foldAmount = (angles: readonly number[]) => angles.reduce((most, angle) => Math.max(most, Math.abs(angle)), 0) / Math.PI;

const FLAT = { from: 0.94, to: 0.985 } as const;

const TURNING = 0.05;

export const turning = (angles: readonly number[]) => Math.min(1, foldAmount(angles) / TURNING);

export const trackTurning = (level: { value: number }, angles: readonly number[]) => {
    level.value = turning(angles);
};

export const flatness = (angles: readonly number[]) => Math.min(1, Math.max(0, (foldAmount(angles) - FLAT.from) / (FLAT.to - FLAT.from)));

export const trackFold = (level: { value: number }, angles: readonly number[]) => {
    level.value = flatness(angles);
};
