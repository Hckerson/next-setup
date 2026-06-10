import { NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const protectedRoutes = [
    "/student",
    "/mentor",
    "/school",
    "/dashboard",
    "/parent",
];

// Routes only for unauthenticated users
const authRoutes = ["/auth"];

export function middleware(request: NextRequest) {
    return NextResponse.next();
    const { pathname } = request.nextUrl;
    // Read the token from a cookie set on login (Zustand localStorage is not accessible in middleware)
    const token = request.cookies.get("app-token")?.value;

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route),
    );
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    // Redirect unauthenticated users away from protected pages
    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Redirect already-authenticated users away from login/signup pages
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: [
        // Apply middleware to all routes except Next.js internals and static files
        "/((?!_next/static|_next/image|favicon.ico|images|fonts|icons).*)",
    ],
};
