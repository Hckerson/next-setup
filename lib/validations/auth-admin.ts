import { z } from "zod";

export const adminLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    rememberMe: z.boolean().default(false),
});

export const adminInviteSchema = z.object({
    email: z.string().email("Invalid email address"),
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    role: z.enum(["SUPER_ADMIN", "ADMIN", "MODERATOR"]),
    permissions: z.array(z.string()).min(1, "Select at least one permission"),
});

export const adminMfaSetupSchema = z.object({
    method: z.enum(["AUTHENTICATOR", "SMS", "EMAIL"]),
    phone: z.string().optional(),
    backupCodes: z.boolean().default(true),
});

export const adminMfaVerifySchema = z.object({
    code: z.string().length(6, "Code must be 6 digits").regex(/^\d+$/, "Code must contain only digits"),
    sessionToken: z.string(),
});

export const adminPasswordResetSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const adminPasswordConfirmSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain uppercase letter")
            .regex(/[a-z]/, "Password must contain lowercase letter")
            .regex(/[0-9]/, "Password must contain number")
            .regex(/[!@#$%^&*]/, "Password must contain special character"),
        confirmPassword: z.string(),
        token: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const adminSessionSchema = z.object({
    adminId: z.string(),
    email: z.string().email(),
    role: z.enum(["SUPER_ADMIN", "ADMIN", "MODERATOR"]),
    permissions: z.array(z.string()),
    mfaEnabled: z.boolean(),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;
export type AdminInviteFormData = z.infer<typeof adminInviteSchema>;
export type AdminMfaSetupFormData = z.infer<typeof adminMfaSetupSchema>;
export type AdminMfaVerifyFormData = z.infer<typeof adminMfaVerifySchema>;
export type AdminPasswordResetFormData = z.infer<typeof adminPasswordResetSchema>;
export type AdminPasswordConfirmFormData = z.infer<typeof adminPasswordConfirmSchema>;
export type AdminSessionData = z.infer<typeof adminSessionSchema>;
