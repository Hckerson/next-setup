"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminMfaVerifyForm from "@/components/ui/forms/admin-mfa-verify";
import AdminTemplate from "@/components/ui/forms/admin-template";

export default function MfaVerifyPage() {
    const router = useRouter();
    const [sessionToken, setSessionToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get session token from sessionStorage set during login
        const token = sessionStorage.getItem("sessionToken");
        if (!token) {
            router.push("/auth/admin/login");
            return;
        }
        setSessionToken(token);
        setIsLoading(false);
    }, [router]);

    if (isLoading) {
        return (
            <AdminTemplate title="Loading..." description="">
                <div className="py-8 text-center">
                    <p className="text-white/60">Loading...</p>
                </div>
            </AdminTemplate>
        );
    }

    return (
        <AdminTemplate
            title="Verify Two-Factor Authentication"
            description="Enter the code from your authenticator app"
        >
            <AdminMfaVerifyForm
                sessionToken={sessionToken}
                onSuccess={() => router.push("/dashboard/admin")}
                onCancel={() => router.push("/auth/admin/login")}
            />
        </AdminTemplate>
    );
}
