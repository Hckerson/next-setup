import type { InkPath, InkPoint } from "@/lib/stage/ink";

export interface DashPattern {
    dash: number;
    gap: number;
    dot: number;
    dots?: number;
}

export interface DimensionStyle {
    offset: number;
    extension: number;
    arrow: number;
}

const lerp = (from: InkPoint, to: InkPoint, t: number): InkPoint => [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t];

export const dashDot = (from: InkPoint, to: InkPoint, pattern: DashPattern): InkPath[] => {
    const length = Math.hypot(to[0] - from[0], to[1] - from[1]);
    const marks = [pattern.dash, pattern.gap, ...Array.from({ length: pattern.dots ?? 1 }, () => [pattern.dot, pattern.gap]).flat()];
    const paths: InkPath[] = [];
    let at = 0;
    for (let step = 0; at < length; step += 1) {
        const size = marks[step % marks.length] ?? pattern.gap;
        const end = Math.min(length, at + size);
        if (step % 2 === 0) paths.push({ points: [lerp(from, to, at / length), lerp(from, to, end / length)] });
        at = end;
    }
    return paths;
};

export const arrowHead = (tip: InkPoint, back: InkPoint, size: number): InkPath => {
    const length = Math.hypot(back[0] - tip[0], back[1] - tip[1]) || 1;
    const [dx, dy] = [(back[0] - tip[0]) / length, (back[1] - tip[1]) / length];
    const base: InkPoint = [tip[0] + dx * size, tip[1] + dy * size];
    const half = size * 0.3;
    return { points: [tip, [base[0] - dy * half, base[1] + dx * half], [base[0] + dy * half, base[1] - dx * half]], filled: true };
};

export const dimension = (from: InkPoint, to: InkPoint, style: DimensionStyle) => {
    const length = Math.hypot(to[0] - from[0], to[1] - from[1]) || 1;
    const [nx, ny] = [-(to[1] - from[1]) / length, (to[0] - from[0]) / length];
    const shift = (point: InkPoint, distance: number): InkPoint => [point[0] + nx * distance, point[1] + ny * distance];
    const start = shift(from, style.offset);
    const end = shift(to, style.offset);
    const paths: InkPath[] = [
        { points: [shift(from, style.extension / 2), shift(from, style.offset + style.extension)] },
        { points: [shift(to, style.extension / 2), shift(to, style.offset + style.extension)] },
        { points: [start, end] },
        arrowHead(start, end, style.arrow),
        arrowHead(end, start, style.arrow),
    ];
    return { paths, centre: lerp(start, end, 0.5), angle: Math.atan2(end[1] - start[1], end[0] - start[0]) };
};

export const leader = (from: InkPoint, elbow: InkPoint, to: InkPoint): InkPath => ({ points: [from, elbow, to] });

export interface SheetFormat {
    width: number;
    height: number;
    inset: number;
    zones: readonly [number, number];
    block: { width: number; rowHeight: number; rows: number };
}

export interface SheetCell {
    origin: InkPoint;
    width: number;
    height: number;
}

const box = (left: number, bottom: number, right: number, top: number): InkPath => ({
    points: [[left, bottom], [right, bottom], [right, top], [left, top]],
    closed: true,
});

export const sheetFrame = (format: SheetFormat) => {
    const [halfWidth, halfHeight] = [format.width / 2 - format.inset, format.height / 2 - format.inset];
    const [columns, rows] = format.zones;
    const across = Array.from({ length: columns - 1 }, (_, index) => -halfWidth + ((index + 1) * 2 * halfWidth) / columns);
    const up = Array.from({ length: rows - 1 }, (_, index) => -halfHeight + ((index + 1) * 2 * halfHeight) / rows);
    const ticks: InkPath[] = [
        ...across.flatMap((x): InkPath[] => [
            { points: [[x, halfHeight], [x, halfHeight + format.inset / 2]] },
            { points: [[x, -halfHeight], [x, -halfHeight - format.inset / 2]] },
        ]),
        ...up.flatMap((y): InkPath[] => [
            { points: [[halfWidth, y], [halfWidth + format.inset / 2, y]] },
            { points: [[-halfWidth, y], [-halfWidth - format.inset / 2, y]] },
        ]),
    ];
    const left = halfWidth - format.block.width;
    const bottom = -halfHeight;
    const cells: SheetCell[] = Array.from({ length: format.block.rows }, (_, row) => ({
        origin: [left, bottom + (format.block.rows - row) * format.block.rowHeight],
        width: format.block.width,
        height: format.block.rowHeight,
    }));
    const rules: InkPath[] = cells.slice(1).map((cell) => ({ points: [[left, cell.origin[1]], [halfWidth, cell.origin[1]]] }));
    return {
        paths: [box(-halfWidth, -halfHeight, halfWidth, halfHeight), box(left, bottom, halfWidth, bottom + format.block.rows * format.block.rowHeight), ...rules, ...ticks],
        cells,
    };
};
