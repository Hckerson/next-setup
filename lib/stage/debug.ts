import type { StageContext } from "@/lib/types";

const GLOBAL_NAME = "__stage";

const snapshotOf = (context: StageContext) => () =>
    Object.fromEntries(
        Object.entries(context.actors).map(([id, actor]) => [
            id,
            {
                position: actor.position.toArray(),
                rotation: actor.rotation.toArray(),
                presence: actor.presence.value,
                tintMix: actor.tint.mix,
                drawn: Object.fromEntries(Object.entries(actor.drawn).map(([layer, level]) => [layer, level.value])),
                hinges: actor.hinges.angles,
                solid: actor.solid.value,
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

const BOXES_NAME = "__stageBoxes";

export const exposeBoxes = (boxes: () => Record<string, [number, number, number, number]>) => {
    if (process.env.NODE_ENV === "production") return () => undefined;
    Object.defineProperty(window, BOXES_NAME, { value: boxes, configurable: true });
    return () => {
        Reflect.deleteProperty(window, BOXES_NAME);
    };
};
