import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/constants";
import {
    verifySessionToken,
    type SessionPayload,
} from "@/lib/utils/verify-session-token";

export const getSession = async (): Promise<SessionPayload | null> => {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    return token ? await verifySessionToken(token) : null;
};
