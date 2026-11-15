import { Color, Vector3 } from "three";
import type { ActorHandle } from "@/lib/types";

export const createActor = (rest: Color): ActorHandle => ({
    position: new Vector3(),
    rotation: new Vector3(),
    scale: { value: 1 },
    presence: { value: 0 },
    tint: { from: rest.clone(), to: rest.clone(), mix: 1, wipe: "up" },
});
