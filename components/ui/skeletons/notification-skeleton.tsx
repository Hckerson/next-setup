import clsx from "clsx";

export function NotificationSkeleton() {
    return (
        <div className="h-15 w-full animate-pulse overflow-hidden">
            <div className="flex h-full w-full items-start gap-x-3">
                <div className="shrink-0 h-[46px] w-[46px] rounded-full bg-white/10 shadow-2xl"></div>
                <div className="flex flex-1 flex-col gap-y-2 mt-1">
                    <div className="h-4 w-24 rounded bg-white/20"></div>
                    <div className="h-3 w-full rounded bg-white/10"></div>
                </div>
            </div>
        </div>
    );
}

export function NotificationSkeletonGroup({ count = 3 }: { count?: number }) {
    return (
        <div className="flex w-full flex-col gap-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <NotificationSkeleton key={i} />
            ))}
        </div>
    );
}
