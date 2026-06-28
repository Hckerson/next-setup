export function StudentListSkeleton() {
    return (
        <li className="w-full animate-pulse bg-[#051428] p-4">
            <div className="flex gap-2 font-medium">
                {/* Checkbox */}
                <div className="size-10 p-2">
                    <div className="h-full w-full rounded-sm border-2 border-gray-500/40 bg-white/5 sm:rounded-md" />
                </div>
                {/* Avatar + name / email */}
                <div className="flex max-w-[32%] flex-1 items-center gap-x-2">
                    <div className="size-10 shrink-0 rounded-full bg-white/10" />
                    <div className="flex flex-col gap-y-1">
                        <div className="h-3 w-28 rounded bg-white/20" />
                        <div className="h-2.5 w-36 rounded bg-white/10" />
                    </div>
                </div>
                {/* Class */}
                <div className="flex max-w-[12%] flex-1 items-center">
                    <div className="h-3 w-12 rounded bg-white/10" />
                </div>
                {/* Number of Wins */}
                <div className="flex max-w-[12%] flex-1 items-center">
                    <div className="h-3 w-8 rounded bg-white/10" />
                </div>
                {/* Submissions */}
                <div className="flex max-w-[12%] flex-1 items-center">
                    <div className="h-3 w-8 rounded bg-white/10" />
                </div>
                {/* Status badge */}
                <div className="flex max-w-[12%] flex-1 items-center">
                    <div className="h-7 w-20 rounded-2xl bg-white/10" />
                </div>
                {/* Last Active */}
                <div className="flex max-w-[14%] flex-1 items-center">
                    <div className="h-3 w-20 rounded bg-white/10" />
                </div>
            </div>
        </li>
    );
}

export function StudentListSkeletonGroup({ count = 10 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <StudentListSkeleton key={i} />
            ))}
        </>
    );
}
