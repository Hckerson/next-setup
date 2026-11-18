import {
    EquirectangularReflectionMapping,
    RepeatWrapping,
    SRGBColorSpace,
    type MeshPhysicalMaterial,
    type MeshStandardMaterial,
    type Scene,
    type Texture,
} from "three";

const ANISOTROPY = 8;

export const applyEnvironment = (scene: Scene, texture: Texture, intensity: number) => {
    texture.mapping = EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.environmentIntensity = intensity;
};

type Reflective = Pick<MeshStandardMaterial | MeshPhysicalMaterial, "envMap" | "envMapIntensity" | "needsUpdate">;

export const reflect = (material: Reflective, texture: Texture, intensity: number) => {
    material.envMap = texture;
    material.envMapIntensity = intensity;
    material.needsUpdate = true;
};

export const tile = (textures: Texture[], repeatX: number, repeatY: number, colour?: Texture) => {
    textures.forEach((texture) => {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(repeatX, repeatY);
        texture.anisotropy = ANISOTROPY;
    });
    if (colour) colour.colorSpace = SRGBColorSpace;
};
