import { cookies } from "next/headers";
import { API_BASE_URL, SESSION_COOKIE } from "@/lib/constants";

export const backendFetch = async (path: string, init: RequestInit = {}) => {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;

    return fetch(`${API_BASE_URL}${path}`, {
        ...init,
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            ...init.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
};
