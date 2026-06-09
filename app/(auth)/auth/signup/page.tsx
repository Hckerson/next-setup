"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/common/logo";
import { poppins } from "@/public/fonts/font";
import Button from "@/components/common/button";
import { fast, slow } from "@/lib/data/mapped-data";
import AuthTemplate from "@/components/ui/forms/auth-template";
import { ArrowComponent } from "@/components/ui/general/arrows";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { useRouter } from "next/navigation";

export default function Onboarding() {
    const [onboardingType, setOnboardingType] = useState<
        "student" | "school" | "creator" | "parent" | null
    >(null);
    const router = useRouter();
    return (
        <AuthTemplate>
            <div className="mb-8 flex w-full flex-col justify-center">
                <MotionWrapper yOffset={50} duration={slow} delay={fast * 1}>
                    <Logo />
                </MotionWrapper>
                <div className="flex flex-col gap-y-4">
                    <MotionWrapper
                        yOffset={50}
                        duration={slow}
                        delay={fast * 1}
                    >
                        <div>
                            <p className="base-text">
                                Let’s Get Creative – Join the Playground of
                                Possibility
                            </p>
                            <p className={clsx(poppins.className, "xs-text")}>
                                Choose your spark. Tell your story. Compete with
                                the best across Africa.
                            </p>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper
                        yOffset={-50}
                        duration={slow}
                        delay={fast * 0.5}
                    >
                        <div
                            className={clsx(
                                "flex flex-col gap-y-4",
                                poppins.className,
                            )}
                        >
                            <button
                                name="student"
                                onClick={(e) => setOnboardingType("student")}
                                className={clsx(
                                    "group rounded-lg px-4 py-4 xl:px-8 xl:py-6",
                                    onboardingType === "student"
                                        ? "border-2 border-[#00D5FF]"
                                        : "bg-blue/40 hover:bg-blue/50 border-blue border",
                                )}
                            >
                                <div className="flex w-full items-center justify-between">
                                    <p className="sm-text font-bold">
                                        {"sign up as a student".toUpperCase()}
                                    </p>
                                    <span className="transition-transform duration-150 ease-out group-hover:translate-x-1">
                                        <ArrowComponent />
                                    </span>
                                </div>
                            </button>
                            <button
                                name="school"
                                onClick={(e) => setOnboardingType("school")}
                                className={clsx(
                                    "group rounded-lg px-4 py-4 xl:px-8 xl:py-6",
                                    onboardingType === "school"
                                        ? "border-2 border-[#00D5FF]"
                                        : "bg-blue/40 hover:bg-blue/50 border-blue border",
                                )}
                            >
                                <div className="flex w-full items-center justify-between">
                                    <p className="sm-text font-bold">
                                        {"sign up as a school".toUpperCase()}
                                    </p>
                                    <span className="transition-transform duration-150 ease-out group-hover:translate-x-1">
                                        <ArrowComponent />
                                    </span>
                                </div>
                            </button>
                            <button
                                name="creator"
                                onClick={(e) => setOnboardingType("creator")}
                                className={clsx(
                                    "group rounded-lg px-4 py-4 xl:px-8 xl:py-6",
                                    onboardingType === "creator"
                                        ? "border-2 border-[#00D5FF]"
                                        : "bg-blue/40 hover:bg-blue/50 border-blue border",
                                )}
                            >
                                <div className="flex w-full items-center justify-between">
                                    <p className="sm-text font-bold">
                                        {`sign up as a Creator (Out-of-School)`.toUpperCase()}
                                    </p>
                                    <span className="transition-transform duration-150 ease-out group-hover:translate-x-1">
                                        <ArrowComponent />
                                    </span>
                                </div>
                            </button>
                            <button
                                name="parent"
                                onClick={(e) => setOnboardingType("parent")}
                                className={clsx(
                                    "group rounded-lg px-4 py-4 xl:px-8 xl:py-6",
                                    onboardingType === "parent"
                                        ? "border-2 border-[#00D5FF]"
                                        : "bg-blue/40 hover:bg-blue/50 border-blue border",
                                )}
                            >
                                <div className="flex w-full items-center justify-between">
                                    <p className="sm-text font-bold">
                                        {" sign up as a Parent".toUpperCase()}
                                    </p>
                                    <span className="transition-transform duration-150 ease-out group-hover:translate-x-1">
                                        <ArrowComponent />
                                    </span>
                                </div>
                            </button>
                            {onboardingType && (
                                <MotionWrapper
                                    yOffset={50}
                                    duration={slow}
                                    delay={fast * 1}
                                >
                                    <div className="mt-2">
                                        <Button
                                            classname={clsx(
                                                "w-full bg-blue uppercase font-bold sm-text sm:rounded-lg rounded-md disabled:opacity-60",
                                                poppins.className,
                                            )}
                                            onClick={() =>
                                                router.push(
                                                    `/auth/signup/${onboardingType}`,
                                                )
                                            }
                                        >
                                            {`go to ${onboardingType || ""} sign up`}
                                        </Button>
                                    </div>
                                </MotionWrapper>
                            )}
                        </div>
                    </MotionWrapper>
                    <MotionWrapper
                        yOffset={50}
                        duration={slow}
                        delay={fast * 0.5}
                    >
                        <p className={clsx("xs-text", poppins.className)}>
                            Already part of the dream?{" "}
                            <Link
                                href={"/auth/login"}
                                className="xs-text font-semibold underline underline-offset-2 hover:no-underline"
                            >
                                {" "}
                                Jump back in!
                            </Link>
                        </p>
                    </MotionWrapper>
                </div>
            </div>
        </AuthTemplate>
    );
}
