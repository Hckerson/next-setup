export const DATE_VALUE_FORMAT = "yyyy-MM-dd";

export const SESSION_COOKIE = "session";

export const AUTH_ROUTE_PREFIX = "/auth";

export const LOGIN_ROUTE = `${AUTH_ROUTE_PREFIX}/login`;

export const HOME_ROUTE = "/";

export const PROTECTED_ROUTE_PREFIXES = ["/dashboard"];

export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export const INVALID_CREDENTIALS = "Email or password is incorrect";

export const MOTION_DURATION = {
    fast: 0.1,
    slow: 0.2,
} as const;

export const MOTION_SPRING = {
    type: "spring",
    stiffness: 100,
    damping: 30,
} as const;
