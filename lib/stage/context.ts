import type { ActorHandle, StageContext } from "@/lib/types";

export const actorOf = (context: StageContext, id: string): ActorHandle => {
    const actor = context.actors[id];
    if (!actor) throw new Error(`The script names an unknown actor: ${id}`);
    return actor;
};

export const variantOf = (context: StageContext, id: string) => {
    const colour = context.variants[id];
    if (!colour) throw new Error(`The script names an unknown variant: ${id}`);
    return colour;
};
