import clsx from "clsx";
import { poppins } from "@/public/fonts/font";

interface AdminTemplateProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    maxWidth?: string;
}

export default function AdminTemplate({
    children,
    title,
    description,
    maxWidth = "max-w-2xl",
}: AdminTemplateProps) {
    return (
        <div className={clsx("mx-auto w-full p-4 sm:p-6 lg:p-8", maxWidth)}>
            {(title || description) && (
                <div className="mb-8">
                    {title && (
                        <h1
                            className={clsx(
                                "base-text mb-2 font-semibold",
                                poppins.className,
                            )}
                        >
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className={clsx("xs-text text-white/60", poppins.className)}>
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div className="rounded-xl bg-[#051428] p-6 sm:rounded-2xl">
                {children}
            </div>
        </div>
    );
}
