import { CylinderGeometry } from "three";

const RIDGE_SIDES = 3;

export const createRidge = (length: number, width: number, rise: number, across: boolean) => {
    const geometry = new CylinderGeometry(width / 2, width / 2, length, RIDGE_SIDES);
    if (across) geometry.rotateZ(Math.PI / 2);
    return geometry.scale(1, 1, rise);
};
