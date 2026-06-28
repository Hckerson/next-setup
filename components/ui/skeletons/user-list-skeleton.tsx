export function UserListSkeleton() {
    return (
        <li className="w-full animate-pulse bg-[#051428] p-4">
            <div className="flex gap-2 font-medium">
                {/* Checkbox */}
                <div className="size-10 p-2">
                    <div className="h-full w-full rounded-sm border-2 border-gray-500/40 bg-white/5 sm:rounded-md"></div>
                </div>
                {/* Avatar + Name + Email */}
                <div className="max-w-[40%] flex-1">
                    <div className="flex items-center gap-x-2">
                        <div className="size-8.75 shrink-0 rounded-full bg-white/10"></div>
                        <div className="flex flex-col gap-y-1.5">
                            <div className="h-4 w-24 rounded bg-white/20"></div>
                            <div className="h-3 w-32 rounded bg-white/10"></div>
                        </div>
                    </div>
                </div>
                {/* Status badge */}
                <div className="flex max-w-[13%] flex-1 items-center">
                    <div className="h-7 w-20 rounded-2xl bg-white/10"></div>
                </div>
                {/* Age */}
                <div className="flex max-w-[10%] flex-1 items-center">
                    <div className="h-4 w-8 rounded bg-white/10"></div>
                </div>
                {/* Wallet Balance */}
                <div className="flex max-w-[18%] flex-1 items-center gap-x-2">
                    <div className="h-4 w-16 rounded bg-white/10"></div>
                </div>
                {/* Last Active */}
                <div className="flex max-w-[13%] flex-1 items-center">
                    <div className="h-4 w-20 rounded bg-white/10"></div>
                </div>
                {/* Action dots */}
                <div className="flex size-10 items-center">
                    <div className="flex gap-x-0.5">
                        <div className="size-1.5 rounded-full bg-white/20"></div>
                        <div className="size-1.5 rounded-full bg-white/20"></div>
                        <div className="size-1.5 rounded-full bg-white/20"></div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export function UserListSkeletonGroup({ count = 5 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <UserListSkeleton key={i} />
            ))}
        </>
    );
}
