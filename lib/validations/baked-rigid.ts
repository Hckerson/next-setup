import { z } from "zod";

export const BAKED_RIGID_VERSION = 1;

export const BAKED_RIGID_STRIDE = 8;

export const bakedRigidMetaSchema = z.object({
    version: z.literal(BAKED_RIGID_VERSION),
    rate: z.number().positive(),
    frames: z.number().int().min(2),
    bodies: z.number().int().positive(),
    stride: z.literal(BAKED_RIGID_STRIDE),
    data: z.string().min(1),
    source: z.string().min(1),
});

export type BakedRigidMeta = z.infer<typeof bakedRigidMetaSchema>;
