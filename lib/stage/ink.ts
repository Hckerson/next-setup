import { BufferGeometry, Color, DoubleSide, Float32BufferAttribute } from "three";
import { MeshBasicNodeMaterial } from "three/webgpu";
import { attribute, float, reference, smoothstep, uniform } from "three/tsl";
import { RESOLVE } from "@/lib/stage/constants";

export type InkPoint = readonly [number, number];

export interface InkPath {
    points: readonly InkPoint[];
    closed?: boolean;
    filled?: boolean;
}

export interface InkLevel {
    value: number;
}

const LIFT = 0.00005;

const segmentsOf = (path: InkPath) => {
    if (path.filled) return [];
    const points = path.closed && path.points.length > 2 ? [...path.points, path.points[0] ?? [0, 0]] : path.points;
    return points.slice(1).map((end, index): [InkPoint, InkPoint] => [points[index] ?? end, end]);
};

const lengthOf = ([start, end]: [InkPoint, InkPoint]) => Math.hypot(end[0] - start[0], end[1] - start[1]);

const alongNear = (segments: [InkPoint, InkPoint][], point: InkPoint, total: number) => {
    let travelled = 0;
    const ends = segments.flatMap((segment) => {
        const from = travelled / total;
        travelled += lengthOf(segment);
        return [
            { point: segment[0], at: from },
            { point: segment[1], at: travelled / total },
        ];
    });
    const distance = (end: { point: InkPoint }) => Math.hypot(end.point[0] - point[0], end.point[1] - point[1]);
    return ends.reduce((best, end) => (distance(end) < distance(best) ? end : best), ends[0] ?? { point, at: 0 }).at;
};

export const createInkGeometry = (paths: readonly InkPath[], width: number) => {
    const segments = paths.flatMap(segmentsOf).filter((segment) => lengthOf(segment) > 0);
    const total = segments.reduce((sum, segment) => sum + lengthOf(segment), 0);
    const positions: number[] = [];
    const along: number[] = [];
    const index: number[] = [];
    const half = width / 2;
    let travelled = 0;
    segments.forEach((segment, count) => {
        const [start, end] = segment;
        const length = lengthOf(segment);
        const dx = (end[0] - start[0]) / length;
        const dy = (end[1] - start[1]) / length;
        const [nx, ny] = [-dy * half, dx * half];
        const [ax, ay] = [start[0] - dx * half, start[1] - dy * half];
        const [bx, by] = [end[0] + dx * half, end[1] + dy * half];
        positions.push(ax + nx, ay + ny, LIFT, ax - nx, ay - ny, LIFT, bx + nx, by + ny, LIFT, bx - nx, by - ny, LIFT);
        const from = total > 0 ? travelled / total : 0;
        travelled += length;
        const to = total > 0 ? travelled / total : 1;
        along.push(from, from, to, to);
        const base = count * 4;
        index.push(base, base + 1, base + 2, base + 2, base + 1, base + 3);
    });
    paths.filter((path) => path.filled && path.points.length > 2).forEach((path) => {
        const start = path.points[0] ?? [0, 0];
        const at = total > 0 ? Math.min(1, alongNear(segments, start, total)) : 0;
        const base = positions.length / 3;
        path.points.forEach(([x, y]) => {
            positions.push(x, y, LIFT);
            along.push(at);
        });
        path.points.slice(2).forEach((_, offset) => index.push(base, base + offset + 1, base + offset + 2));
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geometry.setAttribute("along", new Float32BufferAttribute(along, 1));
    geometry.setIndex(index);
    return geometry;
};

export const createInk = (colour: string, drawn: InkLevel, resolved: InkLevel) => {
    const ink = new MeshBasicNodeMaterial();
    ink.colorNode = uniform(new Color(colour));
    ink.maskNode = attribute("along", "float").lessThanEqual(reference("value", "float", drawn));
    ink.opacityNode = float(1).sub(smoothstep(0, RESOLVE.inkLeaves, reference("value", "float", resolved)));
    ink.transparent = true;
    ink.depthWrite = false;
    ink.side = DoubleSide;
    return ink;
};

export const FILL_CLOSES = 0.9;

const LABEL_CLOSES = 0.98;

export const closing = (level: number) => {
    const t = Math.min(1, Math.max(0, (level - LABEL_CLOSES) / (1 - LABEL_CLOSES)));
    return t * t * (3 - 2 * t);
};

export const createInkFill = (colour: string, presence: InkLevel, resolved: InkLevel) => {
    const fill = new MeshBasicNodeMaterial();
    fill.colorNode = uniform(new Color(colour));
    fill.opacityNode = smoothstep(FILL_CLOSES, 1, reference("value", "float", presence)).mul(float(1).sub(smoothstep(RESOLVE.fillLeaves, 1, reference("value", "float", resolved))));
    fill.transparent = true;
    fill.side = DoubleSide;
    return fill;
};
