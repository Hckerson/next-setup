import { poppins } from "@/public/fonts/font";
import { Icon } from "@iconify/react";
import clsx from "clsx";

export default function NoData({
    label,
    className,
}: {
    label?: string;
    className?: string;
}) {
    return (
        <div
            className={clsx(
                "flex size-full flex-1 flex-col items-center justify-center",
                poppins.className,
                className,
            )}
        >
            <Icon
                icon="line-md:coffee-half-empty-twotone-loop"
                width="24"
                height="24"
            />
            <p className="text-base font-semibold text-white">
                No {label || "data"} found
            </p>
        </div>
    );
}
