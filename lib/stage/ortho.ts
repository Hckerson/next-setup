import { OrthographicCamera, type Camera } from "three";

export interface OrthoView {
    centre: readonly [number, number, number];
    width: number;
}

export const frameOrtho = (camera: Camera, view: OrthoView, canvas: { width: number; height: number }, height: number, aspect: number) => {
    if (!(camera instanceof OrthographicCamera)) return;
    const [x, y, z] = view.centre;
    camera.position.set(x, y + height, z);
    camera.up.set(0, 0, -1);
    camera.lookAt(x, y, z);
    camera.zoom = Math.max(canvas.width / view.width, canvas.height / (view.width / aspect));
    camera.updateProjectionMatrix();
};
