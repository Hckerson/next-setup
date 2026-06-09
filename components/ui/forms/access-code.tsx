"use client";
import clsx from "clsx";
import Back from "../general/back";
import { useState } from "react";
import Logo from "../../common/logo";
import FormInput from "../general/form-input";
import Button from "../../common/button";
import { poppins } from "@/public/fonts/font";
import { useVerifyParentCode } from "@/hooks/use-auth";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { fast, slow } from "@/lib/data/mapped-data";

import { accessCodeSchema } from "@/lib/validations/auth";

export default function AccessCode() {
    const {
        mutate: verify,
        isPending,
        error,
        isSuccess,
    } = useVerifyParentCode();
    const [formData, setFormData] = useState({
        accessCode: "",
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

        const result = accessCodeSchema.safeParse(formData);
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

        verify(result.data.accessCode);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex h-full w-full flex-col justify-center"
        >
            <div className="top-0 z-10 my-6 w-full space-y-3">
                <MotionWrapper yOffset={-50} duration={slow} delay={fast * 1}>
                    <Logo />
                </MotionWrapper>
            </div>
            <div className="flex flex-col gap-y-4">
                <MotionWrapper yOffset={-50} duration={slow} delay={fast * 1}>
                    <div>
                        <p className="base-text">Parent Access Portal</p>
                        <p className={clsx(poppins.className, "xs-text")}>
                            Enter a student&apos;s access code to continue
                        </p>
                    </div>
                </MotionWrapper>
                <div className="flex flex-col gap-y-3 sm:gap-y-5">
                    <MotionWrapper
                        yOffset={50}
                        duration={slow}
                        delay={fast * 1}
                    >
                        <FormInput
                            name="accessCode"
                            type="text"
                            label="Student Access Code"
                            value={formData.accessCode}
                            placeholder=""
                            error={formErrors.accessCode}
                            onChange={handleChange}
                        />
                    </MotionWrapper>
                </div>

                {error && (
                    <p
                        className={clsx(
                            "text-sm text-red-500",
                            poppins.className,
                        )}
                    >
                        {(error as any)?.response?.data?.message ||
                            "Invalid access code. Please try again."}
                    </p>
                )}

                {isSuccess && (
                    <p
                        className={clsx(
                            "text-sm text-green-500",
                            poppins.className,
                        )}
                    >
                        Access granted!
                    </p>
                )}

                <div className="w-full">
                    <MotionWrapper
                        yOffset={50}
                        duration={slow}
                        delay={fast * 2}
                    >
                        <Button
                            classname={clsx(
                                "w-full bg-blue uppercase font-bold sm-text sm:rounded-lg rounded-md disabled:opacity-60",
                                poppins.className,
                            )}
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? "Verifying..." : "CONTINUE"}
                        </Button>
                    </MotionWrapper>
                </div>
            </div>
        </form>
    );
}
