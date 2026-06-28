import clsx from "clsx";

export function EntryCardSkeleton() {
    return (
        <div className="h-fit w-full animate-pulse rounded-md bg-[#051428] p-2 sm:rounded-lg sm:p-3 lg:p-4">
            <div className="flex w-full flex-col gap-y-2">
                <div className="flex-1">
                    <div className="shrink-0">
                        {/* Image Placeholder */}
                        <div className="h-30 w-full rounded-md bg-white/10 sm:rounded-lg" />
                    </div>
                </div>
                <div>
                    {/* Title */}
                    <div className="mt-1 mb-2 h-4 w-12 rounded bg-white/20"></div>

                    {/* Categories */}
                    <ul className="mb-2 flex flex-wrap gap-x-2">
                        <li className="flex items-center gap-x-2">
                            <div className="h-3 w-12 rounded bg-white/10"></div>
                            <span className="size-2 rounded-full bg-white/20"></span>
                        </li>
                        <li className="flex items-center gap-x-2">
                            <div className="h-3 w-16 rounded bg-white/10"></div>
                        </li>
                    </ul>

                    {/* Date */}
                    <div className="mt-1 h-3 w-32 rounded bg-white/10"></div>
                </div>
            </div>
        </div>
    );
}

export function EntryCardListSkeleton({
    count = 6,
    className,
}: {
    count?: number;
    className?: string;
}) {
    return (
        <div
            className={clsx(
                "xs:gap-5 xs:p-5 grid h-fit w-full grid-cols-3 gap-4 rounded-xl bg-[#045FE1]/10 p-4 brightness-50 xl:gap-6",
                className,
            )}
        >
            {Array.from({ length: count }).map((_, i) => (
                <EntryCardSkeleton key={i} />
            ))}
        </div>
    );
}
