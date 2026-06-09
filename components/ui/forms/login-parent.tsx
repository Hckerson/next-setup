"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import Logo from "../../common/logo";
import FormInput from "../general/form-input";
import Button from "../../common/button";
import { useLoginGuardian } from "@/hooks/use-auth";
import { poppins } from "@/public/fonts/font";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { fast, slow } from "@/lib/data/mapped-data";

import { loginSchema } from "@/lib/validations/auth";
import { ZodError } from "zod";

export default function LoginForm() {
    const { mutate: login, isPending, error } = useLoginGuardian();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

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

        const result = loginSchema.safeParse(formData);
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

        login(result.data);
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
                        <p className="base-text">Parent Access Portal</p>
                        <p className={clsx(poppins.className, "xs-text")}>
                            Stay connected to your child’s creative journey.
                        </p>
                    </div>
                </MotionWrapper>
                <div className="flex flex-col gap-y-3 sm:gap-y-5">
                    <MotionWrapper yOffset={50} duration={slow} delay={fast * 1}>
                        <FormInput
                            name="email"
                            type="email"
                            label="Email / Username"
                            value={formData.email}
                            placeholder=""
                            error={formErrors.email}
                            onChange={handleChange}
                        />
                    </MotionWrapper>
                    <MotionWrapper yOffset={50} duration={slow} delay={fast * 2}>
                        <FormInput
                            name="password"
                            type="password"
                            label="Password"
                            value={formData.password}
                            placeholder=""
                            error={formErrors.password}
                            onChange={handleChange}
                        />
                    </MotionWrapper>
                    <MotionWrapper yOffset={50} duration={slow} delay={fast * 3}>
                        <div
                            className={clsx(
                                "sm-text flex w-full -translate-y-2 items-center justify-between",
                                poppins.className,
                            )}
                        >
                            <div className="flex gap-x-2">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    id="remember-me"
                                />
                                <p className="text-[14px] font-semibold">
                                    Remember me
                                </p>{" "}
                            </div>
                            <div>
                                <Link
                                    className="text-[14px] font-semibold"
                                    href={"/forgot-password"}
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>

                {error && (
                    <p
                        className={clsx(
                            "-mt-2 text-sm text-red-500",
                            poppins.className,
                        )}
                    >
                        {(error as any)?.response?.data?.message ||
                            "Invalid credentials. Please try again."}
                    </p>
                )}
                <div className="w-full">
                    <MotionWrapper yOffset={50} duration={slow} delay={fast * 4}>
                        <Button
                            classname={clsx(
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
                <div className="mt-4">
                    <MotionWrapper yOffset={50} duration={slow} delay={fast * 5}>
                        <p className={clsx("xs-text", poppins.className)}>
                            New here?{" "}
                            <Link
                                href="/auth/signup"
                                className="font-semibold underline underline-offset-2 hover:no-underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </MotionWrapper>
                </div>
            </div>
        </form>
    );
}
