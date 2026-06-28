export function PendingWithdrawalListSkeleton() {
    return (
        <div className="w-full border-b border-[#052148] bg-[#051428] p-4 animate-pulse">
            <div className="flex gap-2 font-medium">
                {/* Name + Email */}
                <div className="flex max-w-[33%] flex-1 flex-col justify-center gap-y-2">
                    <div className="h-4 w-28 rounded bg-white/20"></div>
                    <div className="h-3 w-36 rounded bg-white/10"></div>
                </div>
                {/* Amount */}
                <div className="flex max-w-[21%] flex-1 items-center">
                    <div className="h-4 w-12 rounded bg-white/20"></div>
                </div>
                {/* Status badge */}
                <div className="flex max-w-[19%] flex-1 items-center">
                    <div className="h-7 w-24 rounded-2xl bg-white/10"></div>
                </div>
                {/* Actions */}
                <div className="flex max-w-[25%] flex-1 items-center gap-x-2">
                    <div className="h-4 w-14 rounded bg-white/10"></div>
                    <div className="h-4 w-10 rounded bg-white/10"></div>
                </div>
            </div>
        </div>
    );
}

export function PendingWithdrawalListSkeletonGroup({
    count = 5,
}: {
    count?: number;
}) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <PendingWithdrawalListSkeleton key={i} />
            ))}
        </>
    );
}
