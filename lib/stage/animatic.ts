import type { Group, Mesh, MeshBasicMaterial } from "three";
import { shadowOpacity, shadowScale } from "@/lib/stage/shadow";
import type { ActorHandle } from "@/lib/types";

const VISIBLE_AT = 0.001;
const SHADOW_LIFT = 0.001;
const SHADOW_STRENGTH = 0.35;

export const syncAnimatic = (
    group: Group,
    body: MeshBasicMaterial,
    shadow: Mesh,
    shadowMaterial: MeshBasicMaterial,
    handle: ActorHandle,
    reach: number,
    opacity: number,
    shadowed: boolean,
) => {
    const visible = handle.presence.value > VISIBLE_AT;
    group.visible = visible;
    shadow.visible = visible && shadowed;
    group.position.copy(handle.position);
    group.rotation.set(handle.rotation.x, handle.rotation.y, handle.rotation.z, "YXZ");
    group.scale.setScalar(handle.scale.value);
    body.opacity = handle.presence.value * opacity;
    body.color.lerpColors(handle.tint.from, handle.tint.to, handle.tint.mix);
    const height = handle.position.y;
    shadow.position.set(handle.position.x, SHADOW_LIFT, handle.position.z);
    shadow.scale.setScalar(shadowScale(height, reach) * handle.scale.value);
    shadowMaterial.opacity = shadowOpacity(height, reach) * handle.presence.value * SHADOW_STRENGTH;
};
