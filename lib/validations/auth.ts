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

export const signupParentSchema = z
    .object({
        fullName: z.string().min(3, "Full name must be at least 3 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
        phone: z
            .string()
            .min(10, "Phone number must be at least 10 characters"),
        relationship: z.string().min(2, "Relationship is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const signupSchoolSchema = z
    .object({
        schoolName: z
            .string()
            .min(3, "School name must be at least 3 characters"),
        schoolAddress: z
            .string()
            .min(5, "Address must be at least 5 characters"),
        country: z.string().min(2, "Country is required"),
        schoolEmail: z.string().email("Invalid school email address"),
        phoneNumber: z
            .string()
            .min(10, "Phone number must be at least 10 characters"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
        adminName: z
            .string()
            .min(3, "Admin name must be at least 3 characters"),
        adminRole: z.string().min(2, "Admin role is required"),
        logo: z.any().optional(),
        certificate: z.any().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const signupCreatorSchema = z
    .object({
        fullName: z.string().min(3, "Full name must be at least 3 characters"),
        dob: z.string().min(1, "Date of birth is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
        country: z.string().min(2, "Country is required"),
        portfolioLink: z
            .string()
            .url("Invalid portfolio URL")
            .optional()
            .or(z.literal("")),
        how: z.string().min(2, "This field is required"),
        guardianEmail: z
            .string()
            .email("Invalid guardian email address")
            .optional()
            .or(z.literal("")),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const applicationSchema = z.object({
    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description is too long"), // roughly 200 words
});

export const accessCodeSchema = z.object({
    accessCode: z.string().min(4, "Access code must be at least 4 characters"),
});

export const inviteSchema = z
    .object({
        fullName: z.string().min(3, "Full name must be at least 3 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
        message: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
