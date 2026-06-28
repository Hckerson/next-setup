"use client";
import clsx from "clsx";
import { useState } from "react";
import Button from "../../common/button";
import FormInput from "../../general/form-input";
import { poppins } from "@/public/fonts/font";
import { useAdminPasswordReset } from "@/hooks/use-auth-admin";
import { adminPasswordResetSchema } from "@/lib/validations/auth-admin";
import type { AdminPasswordResetFormData } from "@/lib/validations/auth-admin";

interface AdminPasswordResetFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function AdminPasswordResetForm({
    onSuccess,
    onCancel,
}: AdminPasswordResetFormProps) {
    const { mutate: resetPassword, isPending } = useAdminPasswordReset();
    const [email, setEmail] = useState("");
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (formErrors.email) {
            setFormErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.email;
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});

        const result = adminPasswordResetSchema.safeParse({ email });
        if (!result.success) {
            const errors: { [key: string]: string } = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    errors[err.path[0] as string] = err.message;
                }
            });
            setFormErrors(errors);
            return;
        }

        resetPassword(result.data, {
            onSuccess: () => {
                setSuccessMessage(
                    "Password reset link has been sent to your email. Please check your inbox.",
                );
                setTimeout(() => {
                    onSuccess?.();
                }, 3000);
            },
        });
    };

    if (successMessage) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
                <div className="rounded-full bg-green-500/20 p-3">
                    <svg
                        className="size-8 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <p className="text-center text-white">{successMessage}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <div>
                <p className={clsx("base-text mb-2", poppins.className)}>
                    Reset Your Password
                </p>
                <p className={clsx("xs-text text-white/60", poppins.className)}>
                    Enter your email address and we'll send you a link to reset your password
                </p>
            </div>

            <FormInput
                name="email"
                type="email"
                label="Email Address"
                value={email}
                placeholder="your-email@admin.com"
                error={formErrors.email}
                onChange={handleChange}
            />

            <div className="flex gap-4">
                <Button
                    className={clsx(
                        "flex-1 bg-blue uppercase font-bold sm-text sm:rounded-lg rounded-md disabled:opacity-60",
                        poppins.className,
                    )}
                    disabled={isPending}
                >
                    {isPending ? "Sending..." : "SEND RESET LINK"}
                </Button>
                <Button
                    type="button"
                    className={clsx(
                        "flex-1 bg-white/10 border border-white/30 text-white uppercase font-bold sm-text sm:rounded-lg rounded-md hover:bg-white/15 transition-colors disabled:opacity-60",
                        poppins.className,
                    )}
                    onClick={onCancel}
                    disabled={isPending}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
