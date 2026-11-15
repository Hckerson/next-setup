import type { ComponentProps } from "react";

export default function Button({ className = "", ...props }: ComponentProps<"a">) {
    return (
        <a
            className={`inline-flex h-12 items-center bg-primary px-6 font-mono text-label tracking-micro text-text-inverse uppercase transition-colors duration-(--durations-fast) ease-smooth hover:bg-primary-light ${className}`}
            {...props}
        />
    );
}
