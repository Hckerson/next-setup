import { Vector3, type Camera, type Matrix4 } from "three";

const projected = new Vector3();

export interface ScreenPoint {
    x: number;
    y: number;
    visible: boolean;
}

export const projectToScreen = (
    point: Vector3,
    camera: Camera,
    width: number,
    height: number,
): ScreenPoint => {
    projected.copy(point).project(camera);
    return {
        x: ((projected.x + 1) / 2) * width,
        y: ((1 - projected.y) / 2) * height,
        visible: projected.z > -1 && projected.z < 1,
    };
};

export const anchorTransform = ({ x, y }: ScreenPoint) =>
    `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%)`;

export const placeAnchor = (element: HTMLElement, point: ScreenPoint) => {
    element.style.transform = anchorTransform(point);
    element.style.opacity = point.visible ? "" : "0";
};

export const surfaceMatrix = (origin: ScreenPoint, across: ScreenPoint, down: ScreenPoint, width: number, height: number) => {
    const values = [
        (across.x - origin.x) / width,
        (across.y - origin.y) / width,
        (down.x - origin.x) / height,
        (down.y - origin.y) / height,
        origin.x,
        origin.y,
    ];
    return `matrix(${values.map((value) => value.toFixed(5)).join(", ")})`;
};

const corner = new Vector3();

export const projectSurface = (
    corners: readonly [Vector3, Vector3, Vector3],
    matrixWorld: Matrix4,
    camera: Camera,
    width: number,
    height: number,
) => corners.map((point) => projectToScreen(corner.copy(point).applyMatrix4(matrixWorld), camera, width, height));

export const uprightPoints = (points: ScreenPoint[]): ScreenPoint[] => {
    const [origin, across, down] = points;
    if (!origin || !across || !down || across.x >= origin.x) return points;
    const opposite = { x: across.x + down.x - origin.x, y: across.y + down.y - origin.y, visible: origin.visible };
    return [opposite, down, across];
};

export const placeSurface = (element: HTMLElement, points: ScreenPoint[], size: { width: number; height: number }, level = 1) => {
    const [origin, across, down] = points;
    if (!origin || !across || !down || size.width === 0 || size.height === 0) return;
    element.style.transformOrigin = "0 0";
    element.style.transform = surfaceMatrix(origin, across, down, size.width, size.height);
    const facing = (across.x - origin.x) * (down.y - origin.y) - (across.y - origin.y) * (down.x - origin.x) > 0;
    element.style.opacity = origin.visible && facing ? String(Math.min(1, Math.max(0, level))) : "0";
};
