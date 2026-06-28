export function ContestCategorySkeleton() {
    return (
        <li className="w-full animate-pulse bg-[#051428] p-4">
            <div className="flex gap-2 font-medium">
                {/* Category Name */}
                <div className="flex max-w-[29%] flex-1 items-center gap-x-2">
                    <div className="h-3 w-24 rounded bg-white/20" />
                </div>
                {/* Entry Count */}
                <div className="flex max-w-[25%] flex-1 items-center justify-center">
                    <div className="h-3 w-8 rounded bg-white/10" />
                </div>
                {/* Mentor Count */}
                <div className="flex max-w-[25%] flex-1 items-center gap-x-2">
                    <div className="h-3 w-8 rounded bg-white/10" />
                </div>
                {/* Manage Access Button */}
                <div className="flex max-w-[20%] flex-1 items-center gap-x-2">
                    <div className="h-8 w-28 rounded-lg bg-white/10" />
                </div>
            </div>
        </li>
    );
}

export function ContestCategorySkeletonGroup({ count = 5 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <ContestCategorySkeleton key={i} />
            ))}
        </>
    );
}
