import { AdditiveBlending, MeshStandardMaterial, type Light, type Material, type Mesh, type Object3D, type Texture } from "three";
import { BasicLightMapNode, IrradianceNode, MeshBasicNodeMaterial, MeshStandardNodeMaterial, type Node, type UniformNode } from "three/webgpu";
import { abs, float, lights, max, mix, reference, texture, uniform, uv, vec3 } from "three/tsl";
import { keyAt } from "@/lib/stage/sun";

const LIGHTMAP_CHANNEL = 1;

export type SunKey = UniformNode<"float">;

export const createSunKey = (): SunKey => uniform(0);

export const followHour = (key: SunKey, hours: readonly number[], hour: number) => {
    key.value = keyAt(hours, hour);
};

export const keyHoursOf = (root: Object3D) => {
    let hours: number[] = [];
    root.traverse((object) => {
        const found: unknown = object.userData.keyHours;
        if (hours.length === 0 && Array.isArray(found)) hours = found.filter((hour): hour is number => typeof hour === "number");
    });
    return hours;
};

const isMesh = (object: Object3D): object is Mesh => "isMesh" in object && object.isMesh === true;

const firstOf = (material: Material | Material[]) => (Array.isArray(material) ? material[0] : material);

const originals = new WeakMap<Mesh, Material | undefined>();

const originalOf = (mesh: Mesh) => {
    if (!originals.has(mesh)) originals.set(mesh, firstOf(mesh.material));
    return originals.get(mesh);
};

const isStandard = (material: Material | undefined): material is MeshStandardMaterial => material instanceof MeshStandardMaterial;

const filesOf = (mesh: Mesh) => {
    const files: unknown = mesh.userData.lightmaps;
    return Array.isArray(files) ? files.filter((file): file is string => typeof file === "string") : [];
};

const ALBEDO = Math.PI;

const blend = (maps: Texture[], key: SunKey, intensity: number) =>
    maps
        .reduce<Node<"vec3">>(
            (sum, map, index) => sum.add(texture(map, uv(LIGHTMAP_CHANNEL)).rgb.mul(max(float(0), float(1).sub(abs(key.sub(index)))))),
            vec3(0),
        )
        .mul(intensity);

class BakedLight extends MeshBasicNodeMaterial {
    irradiance: Node<"vec3">;

    constructor(irradiance: Node<"vec3">) {
        super();
        this.irradiance = irradiance;
    }

    setupLightMap() {
        return new BasicLightMapNode(this.irradiance);
    }
}

class BakedBounce extends MeshStandardNodeMaterial {
    irradiance: Node<"vec3">;

    constructor(irradiance: Node<"vec3">) {
        super();
        this.irradiance = irradiance;
    }

    setupLightMap() {
        return new IrradianceNode(this.irradiance);
    }

    setupEnvironment() {
        return null;
    }
}

const sharpen = (textures: (Texture | null)[], anisotropy: number) =>
    textures.forEach((map) => {
        if (map) map.anisotropy = anisotropy;
    });

const bakedMaterial = (source: Material | undefined, irradiance: Node<"vec3">, bakedDirect: boolean, direct: Light[], anisotropy: number) => {
    const material = bakedDirect ? new BakedLight(irradiance) : new BakedBounce(irradiance);
    if (material instanceof BakedBounce) material.lightsNode = lights(direct);
    if (!isStandard(source)) return material;
    sharpen([source.map, source.roughnessMap, source.normalMap], anisotropy);
    material.map = source.map;
    material.color.copy(source.color);
    if (material instanceof BakedBounce) {
        material.roughness = source.roughness;
        material.roughnessMap = source.roughnessMap;
        material.metalness = source.metalness;
        material.metalnessMap = source.metalnessMap;
        material.normalMap = source.normalMap;
        material.normalScale.copy(source.normalScale);
    }
    return material;
};

const addOver = (material: Material) => {
    material.blending = AdditiveBlending;
    material.transparent = true;
    material.depthWrite = false;
    return material;
};

export interface LightmapOptions {
    solid?: { value: number };
    maps: ReadonlyMap<string, Texture>;
    intensity: number;
    key: SunKey;
    anisotropy: number;
    direct?: Light[];
}

const bakedMeshes = (root: Object3D) => {
    const meshes: Mesh[] = [];
    root.traverse((object) => {
        if (isMesh(object) && filesOf(object).length > 0) meshes.push(object);
    });
    return meshes;
};

export const lightmapFiles = (root: Object3D) => [...new Set(bakedMeshes(root).flatMap(filesOf))];

export const applyLightmaps = (root: Object3D, { maps: loaded, intensity, key, anisotropy, direct = [], solid }: LightmapOptions) => {
    bakedMeshes(root).forEach((mesh) => {
            const maps = filesOf(mesh).flatMap((file) => loaded.get(file) ?? []);
            const bakedDirect = mesh.userData.bakedDirect !== false;
            const baked = blend(maps, key, intensity);
            const irradiance = solid ? mix(vec3(ALBEDO), baked, reference("value", "float", solid)) : baked;
            const material = bakedMaterial(originalOf(mesh), irradiance, bakedDirect, direct, anisotropy);
            mesh.material = mesh.userData.additive === true ? addOver(material) : material;
            mesh.receiveShadow = !bakedDirect;
    });
};
