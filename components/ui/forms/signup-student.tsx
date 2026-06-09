"use client";
import clsx from "clsx";
import { useState } from "react";
import Back from "../general/back";
import Logo from "../../common/logo";
import Button from "../../common/button";
import FormInput from "../general/form-input";
import { poppins } from "@/public/fonts/font";
import { fast, slow } from "@/lib/data/mapped-data";
import { useRegisterStudent } from "@/hooks/use-auth";
import FormDatePicker from "../general/form-date-picker";
import { signupStudentSchema } from "@/lib/validations/auth";
import MotionWrapper from "@/components/wrappers/motion-wrapper";


export default function SignupForm() {
    const { mutate: register, isPending, error } = useRegisterStudent();
    const [formData, setFormData] = useState({
        dob: "",
        city: "",
        email: "",
        school: "",
        country: "",
        password: "",
        fullName: "",
        guardianEmail: "",
        confirmPassword: "",
    });

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleCustomChange(name, value);
    };

    const handleCustomChange = (name: string, value: string) => {
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

        const result = signupStudentSchema.safeParse(formData);
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

        const { confirmPassword, ...rest } = result.data;
        register({ ...rest, role: "STUDENT" });
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="flex size-full flex-col justify-center overflow-y-auto scroll-smooth px-1 [scrollbar-width:none]"
        >
            <div className="top-0 z-10 w-full">
                <MotionWrapper yOffset={-50} duration={slow} delay={fast * 1}>
                    <div className="block md:hidden">
                        <Back link="/auth/signup" />
                    </div>
                    <Logo />
                </MotionWrapper>
            </div>
            <div className="flex flex-col gap-y-4 pb-5">
                <MotionWrapper yOffset={-50} duration={slow} delay={fast * 1}>
                    <p className="base-text">sign up as a student</p>
                    <p className={clsx(poppins.className, "xs-text")}>
                        Choose your spark. Tell your story. Compete with the
                        best across Africa.
                    </p>
                </MotionWrapper>
                <div className="flex flex-col gap-y-3 sm:gap-y-5">
                    <MotionWrapper
                        yOffset={50}
                        duration={slow}
                        delay={fast * 1}
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
                    <div className="flex w-full gap-x-2.5 sm:gap-x-4 xl:gap-x-6">
                        <MotionWrapper
                            xOffset={-50}
                            duration={slow}
                            delay={fast * 1}
                            className="w-full"
                        >
                            <FormDatePicker
                                name="dob"
                                label="Date of birth"
                                value={formData.dob}
                                placeholder="Select date of birth"
                                error={formErrors.dob}
                                onChange={handleCustomChange}
                            />{" "}
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
                                type="confirm-password"
                                label="ConfirmPassword"
                                value={formData.confirmPassword}
                                placeholder=""
                                error={formErrors.confirmPassword}
                                onChange={handleChange}
                            />
                        </MotionWrapper>
                    </div>
                    <div className="flex w-full gap-x-2.5 sm:gap-x-4 xl:gap-x-6">
                        <MotionWrapper
                            xOffset={-50}
                            duration={slow}
                            delay={fast * 5}
                            className="w-full"
                        >
                            <FormInput
                                name="country"
                                type="text"
                                label="Country"
                                value={formData.country}
                                placeholder=""
                                error={formErrors.country}
                                onChange={handleChange}
                            />{" "}
                        </MotionWrapper>
                        <MotionWrapper
                            xOffset={50}
                            duration={slow}
                            delay={fast * 6}
                            className="w-full"
                        >
                            <FormInput
                                name="city"
                                type="text"
                                label="City"
                                value={formData.city}
                                placeholder=""
                                error={formErrors.city}
                                onChange={handleChange}
                            />
                        </MotionWrapper>
                    </div>
                    <div className="flex w-full gap-x-2.5 sm:gap-x-4 xl:gap-x-6">
                        <MotionWrapper
                            xOffset={-50}
                            duration={slow}
                            delay={fast * 7}
                            className="w-full"
                        >
                            <FormInput
                                name="school"
                                type="text"
                                label="School"
                                value={formData.school}
                                placeholder=""
                                optional
                                error={formErrors.school}
                                onChange={handleChange}
                            />{" "}
                        </MotionWrapper>
                        <MotionWrapper
                            xOffset={50}
                            duration={slow}
                            delay={fast * 8}
                            className="w-full"
                        >
                            <FormInput
                                name="guardianEmail"
                                type="email"
                                label="Guardian email"
                                value={formData.guardianEmail}
                                optional
                                placeholder=""
                                error={formErrors.guardianEmail}
                                onChange={handleChange}
                            />
                        </MotionWrapper>
                    </div>
                </div>
                {error && (
                    <p
                        className={clsx(
                            "text-sm text-red-500",
                            poppins.className,
                        )}
                    >
                        {(error as any)?.response?.data?.message ||
                            "Registration failed. Please try again."}
                    </p>
                )}
                <div className="w-full">
                    <MotionWrapper
                        yOffset={50}
                        duration={slow}
                        delay={fast * 9}
                    >
                        <Button
                            classname={clsx(
                                "w-full bg-blue uppercase font-bold sm-text sm:rounded-lg rounded-md disabled:opacity-60",
                                poppins.className,
                            )}
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending
                                ? "Creating account..."
                                : "Start Your Spark Journey"}
                        </Button>
                    </MotionWrapper>
                </div>
            </div>
        </form>
    );
}
