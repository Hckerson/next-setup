import { Box3, InstancedMesh, Matrix4, Vector3, type Camera, type Object3D } from "three";

const bounds = new Box3();
const piece = new Box3();
const corner = new Vector3();
const instance = new Matrix4();

export type ScreenBox = [number, number, number, number];

const visibleInstances = (mesh: InstancedMesh) => {
    bounds.makeEmpty();
    if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
    const local = mesh.geometry.boundingBox;
    if (!local) return bounds;
    for (let index = 0; index < mesh.count; index += 1) {
        mesh.getMatrixAt(index, instance);
        if (instance.determinant() === 0) continue;
        bounds.union(piece.copy(local).applyMatrix4(instance));
    }
    return bounds.applyMatrix4(mesh.matrixWorld);
};

export const screenBox = (object: Object3D, camera: Camera): ScreenBox => {
    if (object instanceof InstancedMesh) visibleInstances(object);
    else bounds.setFromObject(object);
    let left = Infinity;
    let top = Infinity;
    let right = -Infinity;
    let bottom = -Infinity;
    for (let index = 0; index < 8; index += 1) {
        corner
            .set(
                index & 1 ? bounds.max.x : bounds.min.x,
                index & 2 ? bounds.max.y : bounds.min.y,
                index & 4 ? bounds.max.z : bounds.min.z,
            )
            .project(camera);
        left = Math.min(left, (corner.x + 1) / 2);
        right = Math.max(right, (corner.x + 1) / 2);
        top = Math.min(top, (1 - corner.y) / 2);
        bottom = Math.max(bottom, (1 - corner.y) / 2);
    }
    return [left, top, right, bottom];
};
