import { create } from "zustand";
import { User } from "./interface";
import { persist } from "zustand/middleware";
import type { AdminSessionData } from "@/lib/validations/auth-admin";

export interface AuthState {
    user: AdminSessionData | User | null;
    logout: () => void;
    token: string | null;
    setAuth: (user: AdminSessionData | User, token: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: (user, token) => {
                // Persist token to cookie so Next.js middleware can read it server-side
                document.cookie = `playwork-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                set({ user, token });
            },
            logout: () => {
                document.cookie = "playwork-token=; path=/; max-age=0";
                set({ user: null, token: null });
            },
        }),
        {
            name: "playwork-auth",
        },
    ),
);
