import { z } from "zod";
import { UserRole } from "@/lib/enums/enums";

export const sessionPayloadSchema = z.object({
    sub: z.string().min(1),
    email: z.string().email(),
    role: z.enum(UserRole),
    iat: z.number(),
    exp: z.number(),
});

export type SessionPayload = z.infer<typeof sessionPayloadSchema>;
