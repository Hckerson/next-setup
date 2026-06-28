export function AlertCardSkeleton() {
    return (
        <div className="w-full rounded-md bg-[#051428] p-2 sm:rounded-lg animate-pulse">
            <div className="flex h-full w-full gap-x-2">
                {/* Icon circle */}
                <div className="shrink-0 size-[30px] rounded-full bg-white/10"></div>
                <div className="flex flex-col justify-center gap-y-2 flex-1">
                    {/* Text line */}
                    <div className="h-4 w-3/4 rounded bg-white/20"></div>
                    {/* Link line */}
                    <div className="h-3 w-1/3 rounded bg-white/10"></div>
                </div>
            </div>
        </div>
    );
}

export function AlertCardSkeletonGroup({ count = 4 }: { count?: number }) {
    return (
        <div className="flex h-fit flex-col gap-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <AlertCardSkeleton key={i} />
            ))}
        </div>
    );
}
