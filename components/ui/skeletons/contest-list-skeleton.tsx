export const ContestListSkeleton = () => {
    return (
        <li className="w-full bg-[#051428] p-4 animate-pulse">
            <div className="flex gap-2 font-medium">
                <div className="size-10 p-2">
                    <div className="h-full w-full rounded-sm border-2 border-gray-500/50 sm:rounded-md bg-white/5"></div>
                </div>
                <div className="flex max-w-[53%] flex-1 flex-col justify-center">
                    <div className="h-4 w-1/3 rounded bg-white/10"></div>
                </div>
                <div className="flex max-w-[18%] flex-1 items-center">
                    <div className="h-4 w-24 rounded bg-white/10"></div>
                </div>
                <div className="flex max-w-[12%] flex-1 items-center">
                    <div className="h-4 w-8 rounded bg-white/10"></div>
                </div>
                <div className="flex max-w-[12%] flex-1 items-center gap-x-2">
                    <div className="h-4 w-16 rounded bg-white/10"></div>
                </div>
            </div>
        </li>
    );
};

export const ContestListSkeletonGroup = ({ count = 5 }: { count?: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <ContestListSkeleton key={i} />
            ))}
        </>
    );
};
