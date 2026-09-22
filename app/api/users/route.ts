import { NextResponse, type NextRequest } from "next/server";
import { backendFetch } from "@/lib/api-server";
import { INVALID_REQUEST } from "@/lib/constants";
import { routes } from "@/lib/contract/routes";
import { createUserDtoSchema } from "@/lib/contract/schemas";

export const POST = async (request: NextRequest) => {
    const input = createUserDtoSchema.safeParse(
        await request.json().catch(() => null),
    );
    if (!input.success) {
        return NextResponse.json({ message: INVALID_REQUEST }, { status: 400 });
    }

    const upstream = await backendFetch(routes.usersCreate(), {
        method: "POST",
        body: JSON.stringify(input.data),
    });

    return new NextResponse(upstream.body, {
        status: upstream.status,
        headers: { "Content-Type": "application/json" },
    });
};
