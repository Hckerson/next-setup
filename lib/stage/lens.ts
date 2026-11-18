import { MathUtils, PerspectiveCamera, Vector3, type Camera } from "three";

const FULL_FRAME_HEIGHT = 24;

export interface ShotKey {
    position: readonly [number, number, number];
    target: readonly [number, number, number];
    intensity: number;
    colour: string;
    angle: number;
    shadow?: { mapSize: number; bias: number; near: number; far: number };
}

export interface Shot {
    position: readonly [number, number, number];
    target: readonly [number, number, number];
    focalLength: number;
    aperture?: number;
    focus?: readonly [number, number, number];
    exposure?: number;
    roll?: number;
    key?: ShotKey;
}

export const focalToFov = (focalLength: number, sensorHeight = FULL_FRAME_HEIGHT) =>
    MathUtils.radToDeg(2 * Math.atan(sensorHeight / 2 / focalLength));

export const focusDistance = (shot: Shot) => {
    const eye = new Vector3(...shot.position);
    const forward = new Vector3(...shot.target).sub(eye).normalize();
    return new Vector3(...(shot.focus ?? shot.target)).sub(eye).dot(forward);
};

export const exposeShot = (renderer: { toneMappingExposure: number }, shot: Pick<Shot, "exposure">, fallback: number) => {
    renderer.toneMappingExposure = shot.exposure ?? fallback;
};

export const frameShot = (camera: Camera, shot: Shot) => {
    camera.position.set(...shot.position);
    camera.lookAt(...shot.target);
    camera.rotateZ(MathUtils.degToRad(shot.roll ?? 0));
    if (!(camera instanceof PerspectiveCamera)) return;
    camera.fov = focalToFov(shot.focalLength);
    camera.updateProjectionMatrix();
};
