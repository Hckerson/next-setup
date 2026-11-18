import { Path, Shape, ShapeGeometry, Vector3, type DirectionalLight, type Object3D, type SpotLight, type Texture } from "three";
import { kelvinToColor, type Sun } from "@/lib/stage/sun";
import type { SunRig, WindowRig } from "@/lib/types";

const NEAR = 0.1;

export const placeSun = (light: DirectionalLight, sun: Sun, rig: SunRig) => {
    light.position.copy(sun.direction).multiplyScalar(rig.distance);
    light.target.position.set(0, 0, 0);
    light.color.copy(kelvinToColor(sun.kelvin));
    light.intensity = rig.intensity;
    const camera = light.shadow.camera;
    camera.left = -rig.extent;
    camera.right = rig.extent;
    camera.top = rig.extent;
    camera.bottom = -rig.extent;
    camera.near = NEAR;
    camera.far = rig.distance * 2;
    camera.updateProjectionMatrix();
    light.shadow.mapSize.set(rig.mapSize, rig.mapSize);
    light.shadow.bias = rig.bias;
    light.shadow.normalBias = rig.normalBias;
};

export const placeWindow = (frame: Object3D, sun: Sun, rig: WindowRig) => {
    const aim = new Vector3(...rig.aim);
    frame.position.copy(sun.direction).multiplyScalar(rig.distance).add(aim);
    frame.lookAt(aim);
};

const rectangle = <T extends Path>(path: T, width: number, height: number) => {
    path.moveTo(-width / 2, -height / 2);
    path.lineTo(width / 2, -height / 2);
    path.lineTo(width / 2, height / 2);
    path.lineTo(-width / 2, height / 2);
    path.lineTo(-width / 2, -height / 2);
    return path;
};

export const createWindowWall = (rig: WindowRig) => {
    const wall = rectangle(new Shape(), rig.wall, rig.wall);
    wall.holes.push(rectangle(new Path(), rig.width, rig.height));
    return new ShapeGeometry(wall);
};

export const windowBars = (rig: WindowRig) => {
    const [columns, rows] = rig.panes;
    return {
        verticals: Array.from({ length: columns + 1 }, (_, index) => (index / columns - 0.5) * rig.width),
        horizontals: Array.from({ length: rows + 1 }, (_, index) => (index / rows - 0.5) * rig.height),
    };
};

const FAR_SUN = 30;
const SHADOW_DEPTH = 2;

export const placeWindowLight = (light: SpotLight, sun: Sun, rig: SunRig, opening: WindowRig, cover: number, gobo: Texture) => {
    const aim = new Vector3(...opening.aim);
    light.position.copy(sun.direction).multiplyScalar(FAR_SUN).add(aim);
    light.target.position.copy(aim);
    light.target.updateMatrixWorld();
    light.color.copy(kelvinToColor(sun.kelvin));
    light.intensity = rig.intensity;
    light.angle = Math.atan(cover / 2 / FAR_SUN);
    light.penumbra = 0;
    light.decay = 0;
    light.distance = 0;
    light.map = gobo;
    light.shadow.mapSize.set(rig.mapSize, rig.mapSize);
    light.shadow.bias = rig.bias;
    light.shadow.normalBias = rig.normalBias;
    light.shadow.radius = rig.softness ?? 1;
    light.shadow.camera.near = FAR_SUN - SHADOW_DEPTH;
    light.shadow.camera.far = FAR_SUN + SHADOW_DEPTH;
    light.shadow.camera.updateProjectionMatrix();
};
