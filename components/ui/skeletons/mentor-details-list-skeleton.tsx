export function MentorDetailsListSkeleton() {
    return (
        <li className="w-full animate-pulse bg-[#051428] p-4">
            <div className="flex gap-2 font-medium">
                {/* Checkbox */}
                <div className="size-10 p-2">
                    <div className="h-full w-full rounded-sm border-2 border-gray-500/40 bg-white/5 sm:rounded-md" />
                </div>
                {/* Avatar + Name */}
                <div className="flex max-w-[29%] flex-1 items-center gap-x-2">
                    <div className="size-10 shrink-0 rounded-full bg-white/10" />
                    <div className="flex flex-col gap-y-1">
                        <div className="h-3 w-24 rounded bg-white/20" />
                    </div>
                </div>
                {/* Rating 1 */}
                <div className="flex max-w-[7%] flex-1 items-center justify-center">
                    <div className="h-3 w-6 rounded bg-white/10" />
                </div>
                {/* Rating 2 */}
                <div className="flex max-w-[15%] flex-1 items-center gap-x-2">
                    <div className="h-3 w-6 rounded bg-white/10" />
                </div>
                {/* Dropdown Icon */}
                <div className="flex max-w-[8%] flex-1 items-center justify-end">
                    <div className="size-5 rounded-sm bg-white/10" />
                </div>
            </div>
            {/* Category Access Section */}
            <div className="p-2 pt-4">
                <div className="mb-3 h-4 w-32 rounded bg-white/20" />
                <div className="flex gap-x-4 gap-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-x-2">
                            <div className="size-4 rounded border border-gray-500/40 bg-white/5" />
                            <div className="h-3 w-20 rounded bg-white/10" />
                        </div>
                    ))}
                </div>
            </div>
        </li>
    );
}

export function MentorDetailsListSkeletonGroup({ count = 5 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <MentorDetailsListSkeleton key={i} />
            ))}
        </>
    );
}
