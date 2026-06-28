import clsx from "clsx";
import { poppins } from "@/public/fonts/font";
import { OTPInput, SlotProps } from "input-otp";
import Button from "@/components/common/button";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { fast, slow } from "@/lib/data/mapped-data";

import { useState } from "react";

export default function OtpInput({
    otpLenght,
    buttonText,
    hasConfirmation = false,
    description,
    onComplete,
}: {
    otpLenght: number;
    buttonText: string;
    hasConfirmation?: boolean;
    description?: string;
    onComplete?: (otp: string) => void;
}) {
    const [otp, setOtp] = useState("");
    const [confirmOtp, setConfirmOtp] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = () => {
        setError(null);
        if (otp.length < otpLenght) {
            setError(`Please enter all ${otpLenght} digits.`);
            return;
        }
        if (hasConfirmation && otp !== confirmOtp) {
            setError("Codes do not match.");
            return;
        }
        if (onComplete) {
            onComplete(otp);
        }
    };

    return (
        <div className="box-border flex w-full flex-col items-center gap-y-4">
            {description && (
                <MotionWrapper yOffset={-50} duration={slow} delay={fast * 1}>
                    <div className="w-full space-y-1 text-left">
                        {description && (
                            <p className={clsx("sm-text", poppins.className)}>
                                {description}
                            </p>
                        )}
                    </div>
                </MotionWrapper>
            )}
            <div className="flex w-full flex-col gap-y-6">
                <MotionWrapper yOffset={50} duration={slow} delay={fast * 1}>
                    <div className="w-full space-y-2">
                        {hasConfirmation && (
                            <p className="xs-text font-medium opacity-80">
                                Enter Code
                            </p>
                        )}
                        <OTPInput
                            maxLength={otpLenght}
                            value={otp}
                            onChange={(val) => {
                                setOtp(val);
                                setError(null);
                            }}
                            containerClassName="gap-x-4 w-full justify-between flex"
                            render={({ slots }) => (
                                <>
                                    {slots.map((slot, idx) => (
                                        <div key={idx} className="flex flex-1">
                                            <Slot
                                                {...slot}
                                                hasError={!!error}
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                        />
                    </div>
                </MotionWrapper>

                {hasConfirmation && (
                    <MotionWrapper
                        yOffset={50}
                        duration={slow}
                        delay={fast * 2}
                    >
                        <div className="w-full space-y-2">
                            <p className="xs-text font-medium opacity-80">
                                Confirm Code
                            </p>
                            <OTPInput
                                maxLength={otpLenght}
                                value={confirmOtp}
                                onChange={(val) => {
                                    setConfirmOtp(val);
                                    setError(null);
                                }}
                                containerClassName="gap-x-4 w-full justify-between flex"
                                render={({ slots }) => (
                                    <>
                                        {slots.map((slot, idx) => (
                                            <div
                                                key={idx}
                                                className="flex flex-1"
                                            >
                                                <Slot
                                                    {...slot}
                                                    hasError={!!error}
                                                />
                                            </div>
                                        ))}
                                    </>
                                )}
                            />
                        </div>
                    </MotionWrapper>
                )}
            </div>

            {error && (
                <p className={clsx("text-xs text-red-500", poppins.className)}>
                    {error}
                </p>
            )}

            <div className="mt-2 w-full">
                <MotionWrapper yOffset={50} duration={slow} delay={fast * 3}>
                    <Button
                        onClick={handleSubmit}
                        className="bg-blue w-full rounded-md py-3 font-semibold uppercase sm:rounded-lg"
                    >
                        {buttonText}
                    </Button>
                </MotionWrapper>
            </div>
        </div>
    );
}

function Slot(props: SlotProps & { hasError?: boolean }) {
    return (
        <div
            className={clsx(
                "relative h-14 flex-1 text-[2rem]",
                "flex items-center justify-center",
                "transition-all duration-300",
                "border-border rounded-md border-y border-r border-l bg-white/10 md:border-2",
                props.hasError ? "border-red-500" : "border-white/30",
                "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
                "outline-accent-foreground/20 outline-none",
                { "outline-accent-foreground outline-4": props.isActive },
            )}
        >
            <div className="group-has-[input[data-input-otp-placeholder-shown]]:opacity-20">
                {props.char ?? props.placeholderChar}
            </div>
            {props.hasFakeCaret && <FakeCaret />}
        </div>
    );
}

function FakeCaret() {
    return (
        <div className="animate-caret-blink pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-px bg-white" />
        </div>
    );
}

function FakeDash() {
    return (
        <div className="flex w-10 items-center justify-center">
            <div className="bg-border h-1 w-3 rounded-full bg-stone-300" />
        </div>
    );
}
