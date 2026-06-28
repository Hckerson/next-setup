"use client";
import { config } from "@/lib/api-routes";
import { query } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    BulkApprovalFormData,
    BulkRejectFormData,
    BroadcastMessageFormData,
    AlertManagementFormData,
    AdminSettingsFormData,
    SuspendUserFormData,
} from "@/lib/validations/admin";

export function useBulkApproveItems() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: BulkApprovalFormData) => {
            const { data: result } = await query.post(
                "/admin/bulk-approval",
                data,
                {},
            );
            return result;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["admin"],
            });
        },
    });
}

export function useBulkRejectItems() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: BulkRejectFormData) => {
            const { data: result } = await query.post(
                "/admin/bulk-reject",
                data,
                {},
            );
            return result;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["admin"],
            });
        },
    });
}

export function useBroadcastMessage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: BroadcastMessageFormData) => {
            const { data: result } = await query.post(
                "/admin/broadcast",
                data,
                {},
            );
            return result;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["admin", "notifications"],
            });
        },
    });
}

export function useManageAlerts() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: AlertManagementFormData) => {
            const { data: result } = await query.post(
                "/admin/alerts/manage",
                data,
                {},
            );
            return result;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["admin", "alerts"],
            });
        },
    });
}

export function useUpdateAdminSettings() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: AdminSettingsFormData) => {
            const { data: result } = await query.patch(
                "/admin/settings",
                data,
                {},
            );
            return result;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["admin", "settings"],
            });
        },
    });
}

export function useSuspendUserAction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: SuspendUserFormData) => {
            const { data: result } = await query.patch(
                config.api.admin.users.suspend(data.userId),
                {
                    status: "SUSPENDED",
                    reason: data.reason,
                    duration: data.duration,
                    durationDays: data.durationDays,
                },
                {},
            );
            return result;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["admin", "users"],
            });
        },
    });
}
