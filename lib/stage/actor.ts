import { Color, Vector3 } from "three";
import type { ActorHandle, ActorParts } from "@/lib/types";

export const createActor = (rest: Color, parts: ActorParts = {}): ActorHandle => ({
    position: new Vector3(),
    rotation: new Vector3(),
    scale: { value: 1 },
    presence: { value: 0 },
    tint: { from: rest.clone(), to: rest.clone(), mix: 1, wipe: "up" },
    drawn: Object.fromEntries((parts.layers ?? []).map((layer) => [layer, { value: 0 }])),
    hinges: { angles: Array.from({ length: parts.hinges ?? 0 }, () => 0) },
    solid: { value: 0 },
});
