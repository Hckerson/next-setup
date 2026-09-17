import { NextResponse, type NextRequest } from "next/server";
import { backendFetch } from "@/lib/api-server";
import {
    INVALID_CREDENTIALS,
    SESSION_COOKIE,
    SESSION_MAX_AGE,
} from "@/lib/constants";
import { routes } from "@/lib/contract/routes";
import { authResponseDtoSchema, loginDtoSchema } from "@/lib/contract/schemas";
import { z } from "zod";

const loginSchema = loginDtoSchema.extend({
    email: z.string().email(),
    password: z.string().min(8),
});

const authEnvelopeSchema = z.object({
    data: authResponseDtoSchema.extend({ accessToken: z.string().min(1) }),
});

const rejected = (status: number) =>
    NextResponse.json({ message: INVALID_CREDENTIALS }, { status });

const readJson = async (source: Request | Response) =>
    await source.json().catch(() => null);

export const POST = async (request: NextRequest) => {
    const credentials = loginSchema.safeParse(await readJson(request));
    if (!credentials.success) return rejected(400);

    const upstream = await backendFetch(routes.authLogin(), {
        method: "POST",
        body: JSON.stringify(credentials.data),
    });

    const envelope = authEnvelopeSchema.safeParse(await readJson(upstream));
    if (!upstream.ok || !envelope.success) return rejected(401);

    const { user, accessToken } = envelope.data.data;
    const response = NextResponse.json({ user });

    response.cookies.set(SESSION_COOKIE, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_MAX_AGE,
    });

    return response;
};

export const DELETE = () => {
    const response = new NextResponse(null, { status: 204 });
    response.cookies.delete(SESSION_COOKIE);
    return response;
};
