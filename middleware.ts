import { NextRequest, NextResponse } from "next/server";

// Admin routes that require authentication
const adminProtectedRoutes = ["/dashboard/admin", "/admin"];

// Admin auth routes (login, password reset, etc.)
const adminAuthRoutes = ["/auth/admin"];

export function middleware() {
    // Middleware disabled for now
}

export const config = {
    matcher: [],
};
