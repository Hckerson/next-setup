import type { StageContext } from "@/lib/types";

const GLOBAL_NAME = "__stage";

const snapshotOf = (context: StageContext) => () =>
    Object.fromEntries(
        Object.entries(context.actors).map(([id, actor]) => [
            id,
            {
                position: actor.position.toArray(),
                presence: actor.presence.value,
                tintMix: actor.tint.mix,
            },
        ]),
    );

export const exposeStage = (context: StageContext) => {
    if (process.env.NODE_ENV === "production") return () => undefined;
    Object.defineProperty(window, GLOBAL_NAME, {
        value: { snapshot: snapshotOf(context) },
        configurable: true,
    });
    return () => {
        Reflect.deleteProperty(window, GLOBAL_NAME);
    };
};
