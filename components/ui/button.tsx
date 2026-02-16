"use client";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    size?: "sm" | "md" | "lg" | "xl" | "custom";
    classname?: string;
    children: React.ReactNode;
}
export default function Button({
    children,
    isLoading,
    classname,
    size = "custom",
    ...rest
}: Button) {
    const small = size == "sm" || size == "md";
    const sizes = {
        "h-[36px] lg:h-[42px] xl:h-[48px] w-25 lg:w-30 xl:w-35 xl:rounded-xl md:rounded-lg rounded-md":
            size == "sm",
        "h-[40px] lg:h-[46px] xl:h-[52px] w-35 lg:w-40 xl:w-45 xl:rounded-xl rounded-lg":
            size == "md",
        "h-[42px] lg:h-[56px] xl:h-[64px] w-37.5 lg:w-45 xl:w-50 xl:rounded-3xl md:rounded-xl rounded-lg":
            size == "lg",
        "h-[48px] lg:h-[64px] xl:h-[72px] w-45 lg:w-55 xl:w-60 xl:rounded-3xl md:rounded-2xl rounded-xl":
            size == "xl",
        "h-[40px] lg:h-[52px]": size == "custom",
    };
    return (
        <button
            {...rest}
            className={clsx(
                "relative z-0 flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl shadow-inner",
                sizes,
                classname,
            )}
        >
            {small ? (
                isLoading ? (
                    <Loader2 className="size-6 animate-spin" />
                ) : (
                    <span
                        className={clsx(
                            "xs:text-base absolute inset-0 flex items-center justify-center text-sm transition-colors duration-150 ease-in",
                        )}
                    >
                        {children}
                    </span>
                )
            ) : (
                <div
                    className={clsx(
                        "absolute inset-0 flex h-full items-center justify-center border-none! transition-colors duration-150 ease-in hover:bg-none",
                        classname,
                    )}
                >
                    {isLoading && (
                        <span className="pl-2">
                            <Loader2 className="relative flex size-6 animate-spin items-center justify-center" />
                        </span>
                    )}
                    <span className="xs:text-base flex h-full w-full items-center justify-center text-sm">
                        {children}
                    </span>
                </div>
            )}
        </button>
    );
}
