"use client";
import { config } from "@/lib/api-routes";
import { apiClient } from "@/lib/api-client";
import type { User } from "@/lib/interface";
import { useQuery } from '@tanstack/react-query';

export const useProfile = (userId: string | 'me' = 'me') => {
    return useQuery({
        queryKey: ['profile', userId],
        queryFn: async () => {
            const url = userId === 'me' ? config.api.users.me : config.api.users.profile(userId);
            const { data } = await apiClient.get(url);
            return data as User;
        },
        enabled: !!userId,
    });
};
