"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import FormInput from "../../general/form-input";
import Button from "../../common/button";
import { poppins } from "@/public/fonts/font";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { fast, slow } from "@/lib/data/mapped-data";

import { inviteSchema } from "@/lib/validations/auth";

export default function Invite() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        message: "",
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
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

        const result = inviteSchema.safeParse(formData);
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
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-3 sm:gap-y-5">
                <div className="flex w-full gap-x-2.5 sm:gap-x-4 xl:gap-x-6">
                    <MotionWrapper
                        xOffset={-50}
                        duration={slow}
                        delay={fast * 1}
                        className="w-full"
                    >
                        <FormInput
                            name="fullName"
                            type="text"
                            label="Full name"
                            value={formData.fullName}
                            placeholder=""
                            error={formErrors.fullName}
                            onChange={handleChange}
                        />
                    </MotionWrapper>
                    <MotionWrapper
                        xOffset={50}
                        duration={slow}
                        delay={fast * 2}
                        className="w-full"
                    >
                        <FormInput
                            name="email"
                            type="email"
                            label="Email"
                            value={formData.email}
                            placeholder=""
                            error={formErrors.email}
                            onChange={handleChange}
                        />
                    </MotionWrapper>
                </div>
                <div className="flex w-full gap-x-2.5 sm:gap-x-4 xl:gap-x-6">
                    <MotionWrapper
                        xOffset={-50}
                        duration={slow}
                        delay={fast * 3}
                        className="w-full"
                    >
                        <FormInput
                            name="password"
                            type="password"
                            label="Password"
                            value={formData.password}
                            placeholder=""
                            error={formErrors.password}
                            onChange={handleChange}
                        />{" "}
                    </MotionWrapper>
                    <MotionWrapper
                        xOffset={50}
                        duration={slow}
                        delay={fast * 4}
                        className="w-full"
                    >
                        <FormInput
                            name="confirmPassword"
                            type="password"
                            label="ConfirmPassword"
                            value={formData.confirmPassword}
                            placeholder=""
                            error={formErrors.confirmPassword}
                            onChange={handleChange}
                        />
                    </MotionWrapper>
                </div>
                <MotionWrapper yOffset={50} duration={slow} delay={fast * 5}>
                    <div className={clsx(poppins.className, "flex flex-col")}>
                        <label htmlFor="message" className="mb-1">
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            rows={8}
                            value={formData.message}
                            onChange={handleChange}
                            className={clsx(
                                "w-full rounded-lg border border-white/30 bg-white/10 p-3",
                                formErrors.message && "border-red-500",
                            )}
                        />
                        {formErrors.message && (
                            <p className="mt-1 text-xs text-red-500">
                                {formErrors.message}
                            </p>
                        )}
                    </div>
                </MotionWrapper>
            </div>

            <div className="mt-2 box-border w-full">
                <MotionWrapper yOffset={50} duration={slow} delay={fast * 6}>
                    <Button
                        type="submit"
                        className="bg-yellow w-full rounded-lg text-[#4B004D]"
                    >
                        <span
                            className={clsx(
                                poppins.className,
                                "sm-text font-bold uppercase",
                            )}
                        >
                            Join the Dream Network
                        </span>
                    </Button>
                </MotionWrapper>
            </div>
        </form>
    );
}
