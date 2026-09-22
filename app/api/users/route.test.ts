import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SESSION_COOKIE } from "@/lib/constants";
import { POST } from "./route";

const SESSION_TOKEN = "signed.jwt.value";

vi.mock("next/headers", () => ({
    cookies: () =>
        Promise.resolve({
            get: (name: string) =>
                name === SESSION_COOKIE ? { value: SESSION_TOKEN } : undefined,
        }),
}));

const NEW_USER = {
    fullName: "Ada Lovelace",
    email: "ada@example.com",
    password: "correct-horse",
};

const created = {
    statusCode: 201,
    message: "Success",
    timestamp: "2026-09-22T08:00:00.000Z",
    data: { id: "usr_1", fullName: NEW_USER.fullName, email: NEW_USER.email },
};

const postWith = (body: unknown) =>
    POST(
        new NextRequest(new URL("https://app.test/api/users"), {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
        }),
    );

const respondWith = (status: number, payload: unknown) =>
    vi.fn().mockResolvedValue(
        new Response(JSON.stringify(payload), {
            status,
            headers: { "Content-Type": "application/json" },
        }),
    );

beforeEach(() => {
    vi.stubGlobal("fetch", respondWith(201, created));
});

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("creating a user", () => {
    it("authenticates the backend call with the session cookie", async () => {
        await postWith(NEW_USER);

        const [, init] = vi.mocked(fetch).mock.calls[0];
        expect(new Headers(init?.headers).get("Authorization")).toBe(
            `Bearer ${SESSION_TOKEN}`,
        );
    });

    it("relays the backend envelope and status", async () => {
        const response = await postWith(NEW_USER);

        expect(response.status).toBe(201);
        expect(await response.json()).toEqual(created);
    });

    it("rejects a malformed body before reaching the backend", async () => {
        const response = await postWith({ email: "not-an-email" });

        expect(response.status).toBe(400);
        expect(fetch).not.toHaveBeenCalled();
    });

    it("passes a backend refusal through unchanged", async () => {
        vi.stubGlobal("fetch", respondWith(403, { message: "Forbidden" }));

        expect((await postWith(NEW_USER)).status).toBe(403);
    });
});
