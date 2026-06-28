"use client";
import { useSearchParams } from "next/navigation";
import AdminPasswordConfirmForm from "@/components/ui/forms/admin-password-confirm";
import AdminTemplate from "@/components/ui/forms/admin-template";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    if (!token) {
        return (
            <AdminTemplate title="Invalid Link" description="">
                <div className="py-8 text-center">
                    <p className="text-white/60">
                        Invalid or expired reset link. Please request a new one.
                    </p>
                </div>
            </AdminTemplate>
        );
    }

    return (
        <AdminTemplate title="Set New Password" description="">
            <AdminPasswordConfirmForm token={token} />
        </AdminTemplate>
    );
}
