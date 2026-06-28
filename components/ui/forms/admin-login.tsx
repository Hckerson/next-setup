"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../../common/logo";
import FormInput from "../../general/form-input";
import Button from "../../common/button";
import { poppins } from "@/public/fonts/font";
import { useAdminLogin } from "@/hooks/use-auth-admin";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { adminLoginSchema } from "@/lib/validations/auth-admin";
import { fast, slow } from "@/lib/data/mapped-data";

export default function AdminLoginForm() {
    const router = useRouter();
    const { mutate: login, isPending, error: apiError } = useAdminLogin();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
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

        const result = adminLoginSchema.safeParse(formData);
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

        login(result.data, {
            onSuccess: (data) => {
                if (data.requiresMfa) {
                    router.push("/auth/admin/mfa-verify");
                } else {
                    router.push("/dashboard/admin");
                }
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex size-full flex-col justify-center overflow-y-auto scroll-smooth px-1 [scrollbar-width:none]"
        >
            <div className="top-0 z-10 mb-8 w-full">
                <MotionWrapper yOffset={-50} duration={slow} delay={fast * 1}>
                    <Logo />
                </MotionWrapper>
            </div>

            <div className="flex flex-col gap-y-4 pb-5">
                <MotionWrapper yOffset={-50} duration={slow} delay={fast * 1}>
                    <div>
                        <p className="base-text">Admin Login</p>
                        <p className={clsx(poppins.className, "xs-text")}>
                            Sign in to your admin dashboard
                        </p>
                    </div>
                </MotionWrapper>

                {apiError && (
                    <MotionWrapper
                        yOffset={50}
                        duration={slow}
                        delay={fast * 1}
                    >
                        <p
                            className={clsx(
                                "-mt-2 text-sm text-red-500",
                                poppins.className,
                            )}
                        >
                            {(apiError instanceof Error ? apiError.message : null) || "Invalid credentials. Please try again."}
                        </p>
                    </MotionWrapper>
                )}

                <div className="flex flex-col gap-y-6">
                    <MotionWrapper
                        yOffset={50}
                        duration={slow}
                        delay={fast * 1}
                    >
                        <FormInput
                            name="email"
                            type="email"
                            label="Email"
                            value={formData.email}
                            placeholder="your-email@admin.com"
                            error={formErrors.email}
                            onChange={handleChange}
                        />
                    </MotionWrapper>

                    <MotionWrapper
                        yOffset={50}
                        duration={slow}
                        delay={fast * 2}
                    >
                        <FormInput
                            name="password"
                            type="password"
                            label="Password"
                            value={formData.password}
                            placeholder="Enter your password"
                            error={formErrors.password}
                            onChange={handleChange}
                        />
                    </MotionWrapper>

                    <MotionWrapper
                        yOffset={50}
                        duration={slow}
                        delay={fast * 3}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="size-4 cursor-pointer rounded border-white/30 bg-white/10"
                                />
                                <label
                                    htmlFor="rememberMe"
                                    className={clsx(
                                        "xs-text cursor-pointer text-white/70",
                                        poppins.className,
                                    )}
                                >
                                    Remember me
                                </label>
                            </div>
                            <Link
                                className={clsx("xs-text text-[14px] font-semibold", poppins.className)}
                                href="/auth/admin/forgot-password"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </MotionWrapper>

                    <MotionWrapper
                        yOffset={50}
                        duration={slow}
                        delay={fast * 4}
                    >
                        <Button
                            className={clsx(
                                "w-full bg-blue uppercase font-bold sm-text sm:rounded-lg rounded-md disabled:opacity-60",
                                poppins.className,
                            )}
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? "Logging in..." : "LOG IN"}
                        </Button>
                    </MotionWrapper>
                </div>
            </div>
        </form>
    );
}
