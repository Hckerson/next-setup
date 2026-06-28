"use client";
import clsx from "clsx";
import { poppins } from "@/public/fonts/font";
import Button from "../../common/button";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { fast, slow } from "@/lib/data/mapped-data";

import { useState } from "react";
import { applicationSchema } from "@/lib/validations/auth";

export default function ApplicationForm() {
    const [formData, setFormData] = useState({
        description: "",
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
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

        const result = applicationSchema.safeParse(formData);
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
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-3">
            <MotionWrapper yOffset={50} duration={slow} delay={fast * 1}>
                <div className="flex flex-col gap-y-1">
                    <textarea
                        name="description"
                        id="description"
                        placeholder="ADD DESCRIPTION"
                        value={formData.description}
                        onChange={handleChange}
                        className={clsx(
                            "placeholder:sm-text w-full rounded-lg border-white/30 bg-white/5 p-3 placeholder:font-semibold sm:p-4 lg:h-[10em]",
                            formErrors.description && "border-red-500",
                            poppins.className,
                        )}
                    />
                    {formErrors.description && (
                        <p className="text-xs text-red-500">
                            {formErrors.description}
                        </p>
                    )}
                </div>
            </MotionWrapper>
            <MotionWrapper yOffset={50} duration={slow} delay={fast * 2}>
                <div className="bg-violet/10 border-violet/25 h-31.25 w-full rounded-lg border-2 border-dashed md:h-50">
                    <div></div>
                </div>
            </MotionWrapper>
            <MotionWrapper yOffset={50} duration={slow} delay={fast * 3}>
                <div>
                    <p>Format Validator:</p>
                    <ul className={poppins.className}>
                        <li className="text-[10px] xl:text-[16px]">
                            File type:{" "}
                            <span className="text-[14px] font-semibold xl:text-[18px]">
                                {" "}
                                MP4
                            </span>
                            only
                        </li>
                        <li className="text-[10px] xl:text-[16px]">
                            Max size:{" "}
                            <span className="text-[14px] font-semibold xl:text-[18px]">
                                {" "}
                                200MB
                            </span>{" "}
                        </li>
                        <li className="text-[10px] xl:text-[16px]">
                            Requires description{" "}
                            <span className="text-[14px] font-semibold xl:text-[18px]">
                                {`(≤200 words)`}
                            </span>{" "}
                        </li>
                    </ul>
                </div>
            </MotionWrapper>
            <div className="relative">
                <MotionWrapper yOffset={50} duration={slow} delay={fast * 4}>
                    <Button
                        type="submit"
                        className="bg-violet w-full rounded-md sm:rounded-lg"
                    >
                        Submit
                    </Button>
                </MotionWrapper>
            </div>
        </form>
    );
}
