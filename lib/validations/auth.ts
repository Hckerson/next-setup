import { z } from "zod";
import { UserRole } from "@/lib/enums/enums";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const sessionUserSchema = z.object({
    id: z.string().min(1),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(UserRole),
});

export type SessionUser = z.infer<typeof sessionUserSchema>;

export const authEnvelopeSchema = z.object({
    data: z.object({
        user: sessionUserSchema,
        accessToken: z.string().min(1),
    }),
});

export const signupSchema = z
    .object({
        fullName: z.string().min(3, "Full name must be at least 3 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
