export function SchoolListSkeleton() {
    return (
        <li className="w-full bg-[#051428] p-4 animate-pulse">
            <div className="flex gap-2 font-medium">
                {/* Checkbox */}
                <div className="size-10 p-2">
                    <div className="h-full w-full rounded-sm border-2 border-gray-500/40 sm:rounded-md bg-white/5"></div>
                </div>
                {/* Logo + Name */}
                <div className="flex max-w-[35%] flex-1 items-center gap-x-2">
                    <div className="shrink-0 size-[40px] rounded-md bg-white/10"></div>
                    <div className="h-4 w-28 rounded bg-white/20"></div>
                </div>
                {/* Location */}
                <div className="flex max-w-[16%] flex-1 items-center">
                    <div className="h-4 w-20 rounded bg-white/10"></div>
                </div>
                {/* No. of Students */}
                <div className="flex max-w-[11%] flex-1 items-center">
                    <div className="h-4 w-10 rounded bg-white/10"></div>
                </div>
                {/* No. of Entries */}
                <div className="flex max-w-[11%] flex-1 items-center">
                    <div className="h-4 w-10 rounded bg-white/10"></div>
                </div>
                {/* Status badge */}
                <div className="flex max-w-[20%] flex-1 items-center">
                    <div className="h-7 w-28 rounded-2xl bg-white/10"></div>
                </div>
            </div>
        </li>
    );
}

export function SchoolListSkeletonGroup({ count = 5 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <SchoolListSkeleton key={i} />
            ))}
        </>
    );
}
