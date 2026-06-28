import clsx from "clsx";

export function StatsCardSkeleton({ fixed }: { fixed?: boolean }) {
    return (
        <div
            className={clsx(
                "xs:p-5 flex-1 animate-pulse rounded-xl bg-[#051428] p-4 sm:rounded-2xl",
                fixed && "h-[144px]",
            )}
        >
            <div
                className={clsx(
                    "flex w-full flex-col gap-y-3",
                    fixed && "h-full justify-center",
                )}
            >
                {/* Label skeleton */}
                <div className="h-4 w-24 rounded bg-white/10"></div>
                {/* Figure skeleton */}
                <div className="h-8 w-16 rounded bg-white/20"></div>
                {/* Percentage/time skeleton */}
                {!fixed && <div className="h-3 w-32 rounded bg-white/10"></div>}
            </div>
        </div>
    );
}

export function StatsCardListSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="xs:gap-5 flex w-full gap-4 overflow-hidden">
            {Array.from({ length: count }).map((_, i) => (
                <StatsCardSkeleton key={i} />
            ))}
        </div>
    );
}
