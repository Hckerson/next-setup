import { z } from "zod";

const point = z.tuple([z.number(), z.number(), z.number()]);

export const setWindowSchema = z.object({
    type: z.literal("window"),
    wall: z.number().positive(),
    opening: z.tuple([z.number().positive(), z.number().positive()]),
    panes: z.tuple([z.number().int().positive(), z.number().int().positive()]),
    bar: z.number().positive(),
    distance: z.number().positive(),
    aim: point,
});

export const setSpecSchema = z.object({
    name: z.string().min(1),
    objects: z.array(z.looseObject({ type: z.string(), name: z.string() })),
    lights: z.array(z.looseObject({ type: z.string(), strength: z.number().positive(), angle: z.number().positive() })).min(1),
    keys: z
        .array(z.object({ name: z.string(), hour: z.number(), sun: z.object({ direction: point, kelvin: z.number().positive() }) }))
        .min(1),
});

export type SetSpec = z.infer<typeof setSpecSchema>;

export const windowOf = (spec: SetSpec) => {
    const window = setWindowSchema.parse(spec.objects.find((item) => item.type === "window"));
    return {
        distance: window.distance,
        width: window.opening[0],
        height: window.opening[1],
        bar: window.bar,
        panes: window.panes,
        wall: window.wall,
        aim: window.aim,
    };
};
