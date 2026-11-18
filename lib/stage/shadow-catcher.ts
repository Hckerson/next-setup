import { Path, Shape, ShapeGeometry } from "three";

const HOLE_SEGMENTS = 64;

export interface CatcherHole {
    centre: readonly [number, number];
    radius: number;
}

export const createCatcherGeometry = (
    size: readonly [number, number],
    position: readonly [number, number, number],
    holes: readonly CatcherHole[],
) => {
    const [width, depth] = size;
    const shape = new Shape();
    shape.moveTo(-width / 2, -depth / 2);
    shape.lineTo(width / 2, -depth / 2);
    shape.lineTo(width / 2, depth / 2);
    shape.lineTo(-width / 2, depth / 2);
    shape.lineTo(-width / 2, -depth / 2);
    holes.forEach(({ centre: [x, z], radius }) => {
        const hole = new Path();
        hole.absarc(x - position[0], -(z - position[2]), radius, 0, Math.PI * 2, true);
        shape.holes.push(hole);
    });
    return new ShapeGeometry(shape, HOLE_SEGMENTS);
};
