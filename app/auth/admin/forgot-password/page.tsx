import AdminPasswordResetForm from "@/components/ui/forms/admin-password-reset";
import AdminTemplate from "@/components/ui/forms/admin-template";

export default function ForgotPasswordPage() {
    return (
        <AdminTemplate
            title="Reset Password"
            description="Enter your email to receive a password reset link"
        >
            <AdminPasswordResetForm />
        </AdminTemplate>
    );
}
