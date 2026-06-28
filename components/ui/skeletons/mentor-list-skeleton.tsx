export function MentorListSkeleton() {
    return (
        <div className="w-full bg-[#051428] p-4 animate-pulse">
            <div className="flex gap-2 font-medium">
                {/* Checkbox */}
                <div className="size-10 p-2">
                    <div className="h-full w-full rounded-sm border-2 border-gray-500/40 sm:rounded-md bg-white/5"></div>
                </div>
                {/* Avatar + Name + Email */}
                <div className="flex max-w-[29%] flex-1 items-center gap-x-2">
                    <div className="shrink-0 size-[25px] rounded-full bg-white/10"></div>
                    <div className="flex flex-col gap-y-1.5">
                        <div className="h-4 w-24 rounded bg-white/20"></div>
                        <div className="h-3 w-32 rounded bg-white/10"></div>
                    </div>
                </div>
                {/* Rating */}
                <div className="flex max-w-[7%] flex-1 items-center justify-center gap-x-1">
                    <div className="h-4 w-8 rounded bg-white/20"></div>
                </div>
                {/* Specialties */}
                <div className="flex max-w-[27%] flex-1 items-center gap-2">
                    <div className="h-7 w-16 rounded-2xl bg-white/10"></div>
                    <div className="h-7 w-16 rounded-2xl bg-white/10"></div>
                </div>
                {/* Status */}
                <div className="flex max-w-[15%] flex-1 items-center">
                    <div className="h-7 w-24 rounded-2xl bg-white/10"></div>
                </div>
                {/* Sessions */}
                <div className="flex max-w-[8%] flex-1 items-center">
                    <div className="h-4 w-10 rounded bg-white/10"></div>
                </div>
                {/* Earnings */}
                <div className="flex max-w-[10%] flex-1 items-center">
                    <div className="h-4 w-14 rounded bg-white/10"></div>
                </div>
                {/* Action button placeholder */}
                <div className="size-10 p-2"></div>
            </div>
        </div>
    );
}

export function MentorListSkeletonGroup({ count = 5 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <MentorListSkeleton key={i} />
            ))}
        </>
    );
}
