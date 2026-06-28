"use client";
import clsx from "clsx";
import { useState } from "react";
import Button from "../../common/button";
import FormInput from "../../general/form-input";
import { poppins } from "@/public/fonts/font";
import { useAdminPasswordConfirm } from "@/hooks/use-auth-admin";
import { adminPasswordConfirmSchema } from "@/lib/validations/auth-admin";
import type { AdminPasswordConfirmFormData } from "@/lib/validations/auth-admin";

interface PasswordStrengthIndicatorProps {
    password: string;
}

function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;

    const strength = [
        hasUppercase,
        hasLowercase,
        hasNumber,
        hasSpecial,
        isLongEnough,
    ].filter(Boolean).length;

    const strengthText =
        strength <= 2 ? "Weak" : strength <= 3 ? "Fair" : strength <= 4 ? "Good" : "Strong";
    const strengthColor =
        strength <= 2
            ? "text-red-400"
            : strength <= 3
              ? "text-yellow-400"
              : strength <= 4
                ? "text-blue-400"
                : "text-green-400";

    return (
        <div className="space-y-2">
            <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        className={clsx(
                            "h-1 flex-1 rounded-full transition-colors",
                            level <= strength ? strengthColor : "bg-white/10",
                        )}
                    />
                ))}
            </div>
            <p className={clsx("xs-text", strengthColor)}>
                Password Strength: <span className="font-semibold">{strengthText}</span>
            </p>
        </div>
    );
}

interface AdminPasswordConfirmFormProps {
    token: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function AdminPasswordConfirmForm({
    token,
    onSuccess,
    onCancel,
}: AdminPasswordConfirmFormProps) {
    const { mutate: confirmPassword, isPending } = useAdminPasswordConfirm();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        token,
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [showPasswords, setShowPasswords] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});

        const result = adminPasswordConfirmSchema.safeParse(formData);
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

        confirmPassword(result.data, {
            onSuccess: () => {
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <div>
                <p className={clsx("base-text mb-2", poppins.className)}>
                    Set New Password
                </p>
                <p className={clsx("xs-text text-white/60", poppins.className)}>
                    Create a strong password for your admin account
                </p>
            </div>

            <div>
                <FormInput
                    name="password"
                    type={showPasswords ? "text" : "password"}
                    label="New Password"
                    value={formData.password}
                    placeholder="Create a strong password"
                    error={formErrors.password}
                    onChange={handleChange}
                />
                {formData.password && (
                    <div className="mt-3">
                        <PasswordStrengthIndicator password={formData.password} />
                    </div>
                )}
                <p className="xs-text mt-2 text-white/40">
                    Must include: uppercase, lowercase, number, and special character (!@#$%^&*)
                </p>
            </div>

            <FormInput
                name="confirmPassword"
                type={showPasswords ? "text" : "password"}
                label="Confirm Password"
                value={formData.confirmPassword}
                placeholder="Re-enter your password"
                error={formErrors.confirmPassword}
                onChange={handleChange}
            />

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="showPasswords"
                    checked={showPasswords}
                    onChange={(e) => setShowPasswords(e.target.checked)}
                    className="size-4 cursor-pointer rounded border-white/30 bg-white/10"
                />
                <label
                    htmlFor="showPasswords"
                    className={clsx("xs-text cursor-pointer text-white/70", poppins.className)}
                >
                    Show passwords
                </label>
            </div>

            <div className="flex gap-4">
                <Button
                    className={clsx(
                        "flex-1 bg-blue uppercase font-bold sm-text sm:rounded-lg rounded-md disabled:opacity-60",
                        poppins.className,
                    )}
                    disabled={isPending}
                >
                    {isPending ? "Resetting..." : "RESET PASSWORD"}
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
