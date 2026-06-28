import { z } from "zod";

export const bulkApprovalSchema = z.object({
    ids: z.array(z.string().min(1, "ID required")).min(1, "Select at least one item"),
    reason: z.string().optional(),
});

export const bulkRejectSchema = z.object({
    ids: z.array(z.string().min(1, "ID required")).min(1, "Select at least one item"),
    reason: z.string().min(5, "Reason must be at least 5 characters"),
    notifyUser: z.boolean().default(true),
});

export const broadcastMessageSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    recipientType: z.enum(["ALL", "ADMINS", "MENTORS", "STUDENTS", "SCHOOLS"]),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
    scheduleFor: z.date().optional(),
});

export const alertManagementSchema = z.object({
    alertIds: z.array(z.string().min(1)).min(1, "Select at least one alert"),
    action: z.enum(["RESOLVE", "DISMISS", "ESCALATE", "SNOOZE"]),
    snoozeDuration: z.number().min(5).max(1440).optional(),
    notes: z.string().optional(),
});

export const adminSettingsSchema = z.object({
    maintenanceMode: z.boolean().default(false),
    maintenanceMessage: z.string().optional(),
    maxConcurrentUsers: z.number().min(1).optional(),
    autoApprovalThreshold: z.number().min(0).max(100).optional(),
    enabledFeatures: z.array(z.string()).optional(),
});

export const suspendUserSchema = z.object({
    userId: z.string().min(1, "User ID required"),
    reason: z.string().min(10, "Reason must be at least 10 characters"),
    duration: z.enum(["TEMPORARY", "PERMANENT"]),
    durationDays: z.number().min(1).max(365).optional(),
    notifyUser: z.boolean().default(true),
});

export type BulkApprovalFormData = z.infer<typeof bulkApprovalSchema>;
export type BulkRejectFormData = z.infer<typeof bulkRejectSchema>;
export type BroadcastMessageFormData = z.infer<typeof broadcastMessageSchema>;
export type AlertManagementFormData = z.infer<typeof alertManagementSchema>;
export type AdminSettingsFormData = z.infer<typeof adminSettingsSchema>;
export type SuspendUserFormData = z.infer<typeof suspendUserSchema>;
