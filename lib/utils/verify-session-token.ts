import { importSPKI, jwtVerify } from "jose";
import {
    sessionPayloadSchema,
    type SessionPayload,
} from "@/lib/validations/session";

const ALGORITHM = "RS256";
const PEM_MARKER = "-----BEGIN";

const decodePem = (value: string) =>
    value.includes(PEM_MARKER) ? value : atob(value);

let importedKey: Promise<CryptoKey> | null = null;

const publicKey = () => {
    if (!importedKey) {
        const raw = process.env.JWT_PUBLIC_KEY;
        if (!raw) {
            throw new Error(
                "JWT_PUBLIC_KEY is not set — the proxy cannot verify a session",
            );
        }
        importedKey = importSPKI(decodePem(raw), ALGORITHM);
    }
    return importedKey;
};

export const verifySessionToken = async (
    token: string,
): Promise<SessionPayload | null> => {
    try {
        const { payload } = await jwtVerify(token, await publicKey(), {
            algorithms: [ALGORITHM],
        });
        const parsed = sessionPayloadSchema.safeParse(payload);
        return parsed.success ? parsed.data : null;
    } catch {
        return null;
    }
};
