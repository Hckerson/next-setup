import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .or(z.string().min(3, "Username must be at least 3 characters")),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupStudentSchema = z
    .object({
        fullName: z.string().min(3, "Full name must be at least 3 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
        dob: z.string().min(1, "Date of birth is required"),
        city: z.string().min(2, "City must be at least 2 characters"),
        school: z.string().optional(),
        country: z.string().min(2, "Country is required"),
        guardianEmail: z
            .string()
            .email("Invalid guardian email address")
            .optional()
            .or(z.literal("")),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })
    .refine(
        (data) =>
            data.fullName.split(" ").map((name) => name.trim()).length === 2,
        {
            message: "Firstname and lastname is required",
            path: ["fullName"],
        },
    );
