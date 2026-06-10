import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
    id: string;
    email: string;
    name: string; // backend returns single `name` field (not firstName/lastName)
    role: string; // UserRole enum string, e.g. "ADMIN" | "USER"
    avatar: string | null;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    setAuth: (user: AuthUser, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: (user, token) => {
                // Persist token to cookie so Next.js middleware can read it server-side
                document.cookie = `app-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                set({ user, token });
            },
            logout: () => {
                document.cookie = "app-token=; path=/; max-age=0";
                set({ user: null, token: null });
            },
        }),
        {
            name: "app-auth",
        },
    ),
);
