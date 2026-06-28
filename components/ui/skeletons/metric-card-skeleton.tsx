import clsx from "clsx";

export function MetricCardSkeleton() {
    return (
        <div className="relative h-50 flex-1 animate-pulse rounded-xl bg-[#051428] sm:rounded-2xl">
            <div className="absolute inset-x-0 top-0 p-3 xl:p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-1">
                        {/* Icon skeleton */}
                        <div className="h-[22px] w-[22px] shrink-0 rounded-full bg-white/10"></div>
                        {/* Label skeleton */}
                        <div className="h-4 w-16 rounded bg-white/10"></div>
                    </div>
                    <div className="flex items-center gap-x-1">
                        {/* Diff skeleton */}
                        <div className="h-3 w-8 rounded bg-white/10"></div>
                        {/* Figure skeleton */}
                        <div className="h-4 w-12 rounded bg-white/20"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MetricCardSkeletonGroup({ count = 4 }: { count?: number }) {
    return (
        <div className="xs:gap-5 flex w-full flex-wrap gap-4 xl:gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <MetricCardSkeleton key={i} />
            ))}
        </div>
    );
}
