export function TimelineSkeleton() {
    return (
        <div className="w-full animate-pulse rounded-lg">
            <div className="flex w-full items-start rounded-lg bg-white/5">
                {/* Circle */}
                <div className="mt-4 ml-4 size-3 shrink-0 rounded-full bg-white/10"></div>
                
                <div className="flex flex-1 justify-between p-3">
                    {/* Content */}
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-48 rounded bg-white/20"></div>
                        <div className="h-3 w-32 rounded bg-white/10"></div>
                    </div>
                    
                    {/* Time */}
                    <div className="h-3 w-12 rounded bg-white/10"></div>
                </div>
            </div>
        </div>
    );
}

export function TimelineSkeletonGroup({ count = 6 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <li key={i} className="w-full list-none">
                    <TimelineSkeleton />
                </li>
            ))}
        </>
    );
}
