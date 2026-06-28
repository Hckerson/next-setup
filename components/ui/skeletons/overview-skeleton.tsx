import clsx from "clsx";

export function BasicProfileSkeleton() {
    return (
        <div className="animate-pulse flex h-fit flex-col rounded-xl p-4 sm:rounded-2xl">
            {/* Header */}
            <div className="mb-4 flex items-center gap-x-2">
                <div className="size-[15px] shrink-0 rounded bg-white/10"></div>
                <div className="h-4 w-24 rounded bg-white/20"></div>
            </div>

            {/* List Rows */}
            <div className="w-full">
                <ul className="box-border flex w-full flex-col gap-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <li key={i} className="flex w-full gap-4">
                            <div className="flex flex-1 flex-col gap-y-2">
                                <div className="h-3 w-16 rounded bg-white/10"></div>
                                <div className="h-4 w-32 rounded bg-white/20"></div>
                            </div>
                            <div className="flex flex-1 flex-col gap-y-2">
                                <div className="h-3 w-24 rounded bg-white/10"></div>
                                <div className="h-4 w-20 rounded bg-white/20"></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export function GuardianDetailsSkeleton() {
    return (
        <div className="animate-pulse flex h-fit flex-col rounded-xl p-4 sm:rounded-2xl">
            {/* Header */}
            <div className="mb-4 flex items-center gap-x-2">
                <div className="size-[15px] shrink-0 rounded bg-white/10"></div>
                <div className="h-4 w-28 rounded bg-white/20"></div>
            </div>

            {/* List Rows */}
            <div className="w-full">
                <ul className="box-border flex w-full flex-col gap-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <li key={i} className="flex w-full gap-4">
                            <div className="flex flex-1 flex-col gap-y-2">
                                <div className="h-3 w-16 rounded bg-white/10"></div>
                                <div className="h-4 w-32 rounded bg-white/20"></div>
                            </div>
                            <div className="flex flex-1 flex-col gap-y-2">
                                <div className="h-3 w-20 rounded bg-white/10"></div>
                                <div className="h-4 w-24 rounded bg-white/20"></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export function EngagementMetricsSkeleton() {
    return (
        <div className="animate-pulse flex w-full flex-col gap-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="flex w-full items-center justify-between">
                    <div className="h-4 w-36 rounded bg-white/10"></div>
                    <div className="h-4 w-8 rounded bg-white/20"></div>
                </li>
            ))}
        </div>
    );
}
