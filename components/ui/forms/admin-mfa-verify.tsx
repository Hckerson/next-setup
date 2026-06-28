"use client";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import Button from "../../common/button";
import { poppins } from "@/public/fonts/font";
import { useVerifyAdminMfa } from "@/hooks/use-auth-admin";
import { adminMfaVerifySchema } from "@/lib/validations/auth-admin";
import type { AdminMfaVerifyFormData } from "@/lib/validations/auth-admin";

interface AdminMfaVerifyFormProps {
    sessionToken: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function AdminMfaVerifyForm({
    sessionToken,
    onSuccess,
    onCancel,
}: AdminMfaVerifyFormProps) {
    const { mutate: verify, isPending } = useVerifyAdminMfa();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [resendTimer, setResendTimer] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleCodeChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});

        const codeString = code.join("");
        const result = adminMfaVerifySchema.safeParse({
            code: codeString,
            sessionToken,
        });

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

        verify(result.data, {
            onSuccess: () => {
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <div>
                <p className={clsx("base-text mb-2", poppins.className)}>
                    Two-Factor Authentication
                </p>
                <p className={clsx("xs-text text-white/60", poppins.className)}>
                    Enter the 6-digit code from your authenticator app
                </p>
            </div>

            {formErrors.code && (
                <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3">
                    <p className="xs-text text-red-400">{formErrors.code}</p>
                </div>
            )}

            <div>
                <div className="flex gap-2 justify-center">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className={clsx(
                                "size-12 rounded-md border bg-white/10 text-center text-2xl font-semibold",
                                formErrors.code ? "border-red-500" : "border-white/30",
                            )}
                        />
                    ))}
                </div>
            </div>

            <div className="flex gap-4">
                <Button
                    className={clsx(
                        "flex-1 bg-blue uppercase font-bold sm-text sm:rounded-lg rounded-md disabled:opacity-60",
                        poppins.className,
                    )}
                    disabled={isPending || code.some((d) => !d)}
                >
                    {isPending ? "Verifying..." : "VERIFY CODE"}
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

            <div className="text-center">
                <button
                    type="button"
                    disabled={resendTimer > 0}
                    className="xs-text text-[14px] font-semibold disabled:text-white/30"
                >
                    {resendTimer > 0
                        ? `Resend code in ${resendTimer}s`
                        : "Didn't receive code? Resend"}
                </button>
            </div>
        </form>
    );
}
