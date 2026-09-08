import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/constants";
import { verifySessionToken } from "@/lib/utils/verify-session-token";
import type { SessionPayload } from "@/lib/validations/session";

export const getSession = async (): Promise<SessionPayload | null> => {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    return token ? await verifySessionToken(token) : null;
};
