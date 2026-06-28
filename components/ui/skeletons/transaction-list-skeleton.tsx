export function TransactionListSkeleton() {
    return (
        <li className="w-full animate-pulse bg-[#041731] p-4">
            <div className="flex gap-2 font-medium">
                {/* Date */}
                <div className="flex max-w-[20%] flex-1 flex-col justify-center">
                    <div className="h-4 w-24 rounded bg-white/20"></div>
                </div>
                {/* Type/Description */}
                <div className="flex max-w-[40%] flex-1 items-center">
                    <div className="h-8 w-40 rounded-2xl bg-white/10 px-4 py-2 sm:rounded-3xl"></div>
                </div>
                {/* Amount */}
                <div className="flex max-w-[18%] flex-1 items-center gap-x-2">
                    <div className="h-4 w-16 rounded bg-white/20"></div>
                    <div className="size-[22.5px] shrink-0 rounded-full bg-white/10"></div>
                </div>
                {/* Status */}
                <div className="flex max-w-[18%] flex-1 items-center">
                    <div className="h-8 w-20 rounded-2xl bg-white/10 sm:rounded-3xl"></div>
                </div>
            </div>
        </li>
    );
}

export function TransactionListSkeletonGroup({ count = 5 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <TransactionListSkeleton key={i} />
            ))}
        </>
    );
}
