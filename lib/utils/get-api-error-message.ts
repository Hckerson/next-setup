import { isAxiosError } from "axios";

// Reads the backend's error message off an axios error, falling back to a
// caller-supplied default. Centralized so call sites stop reaching into
// `(error as any)?.response?.data?.message`.
export function getApiErrorMessage(
    error: unknown,
    fallback = "Something went wrong. Please try again.",
): string {
    if (isAxiosError(error)) {
        const message = error.response?.data?.message;
        if (typeof message === "string") return message;
    }
    return fallback;
}
