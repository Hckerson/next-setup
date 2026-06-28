"use client";
import { config } from "@/lib/api-routes";
import { query } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User, Stats, Timeline } from "@/lib/interface";

export function useUsers(params?: {
    search?: string;
    role?: string;
    schoolId?: string;
}) {
    return useQuery({
        queryKey: ["admin", "users", params],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            if (params?.search) searchParams.set("search", params.search);
            if (params?.role) searchParams.set("role", params.role);
            if (params?.schoolId) searchParams.set("schoolId", params.schoolId);
            const queryString = searchParams.toString();
            const url = queryString
                ? `${config.api.admin.users.all}?${queryString}`
                : config.api.admin.users.all;
            const { data } = await query.get<User[]>(url);
            return data;
        },
    });
}

export function useUserStats() {
    return useQuery({
        queryKey: ["admin", "users", "stats"],
        queryFn: async () => {
            const { data } = await query.get<Stats>(
                config.api.admin.users.stats,
            );
            return data;
        },
    });
}

export function useUserData(id: string) {
    return useQuery({
        queryKey: ["admin", "users", "individual", id],
        queryFn: async () => {
            const { data } = await query.get<User>(
                config.api.admin.users.individual(id),
            );
            return data;
        },
    });
}

export function useSuspendUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId: string) => {
            const { data } = await query.patch<User>(
                config.api.admin.users.suspend(userId),
                { status: "SUSPENDED" },
                {},
            );
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["admin", "users"],
            });
        },
    });
}

export function useUserTimeline(id: string) {
    return useQuery({
        queryKey: ["admin", "users", "timeline", id],
        queryFn: async () => {
            const { data } = await query.get<Timeline[]>(
                config.api.admin.users.timeline(id),
            );
            return data;
        },
    });
}

export function useTimeline() {
    return useQuery({
        queryKey: ["admin", "users", "timeline"],
        queryFn: async () => {
            const { data } = await query.get<Timeline[]>(
                config.api.admin.dashboard.timeline,
            );
            return data;
        },
    });
}
