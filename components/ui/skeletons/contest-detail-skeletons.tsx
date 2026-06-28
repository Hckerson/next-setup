"use client";
import React from "react";
import clsx from "clsx";
import { bgMap } from "@/styles/styles";

export function HeaderSkeleton() {
    return (
        <div className="flex w-full animate-pulse items-start justify-between">
            <div className="flex w-fit flex-col gap-2">
                {/* Title */}
                <div className="h-8 w-64 rounded bg-white/10" />
                {/* Badges */}
                <div className="mt-1 flex w-fit items-center gap-2">
                    {/* Active/Completed/Upcoming Badge Placeholder */}
                    <div className="h-7 w-20 rounded-full border border-emerald-500/10 bg-[#04372D]/50" />
                    {/* Category Badge Placeholder */}
                    <div className="h-7 w-28 rounded-full border border-blue-500/10 bg-[#045FE1]/20" />
                    {/* End Date / Time remaining Badge Placeholder */}
                    <div className="h-7 w-32 rounded-full border border-red-500/10 bg-[#2B1020]/50" />
                </div>
            </div>
            {/* Buttons */}
            <div className="flex w-fit gap-2">
                <div className="h-9 w-28 rounded-md border border-blue-400/10 bg-[#05234D]/50" />
                <div className="h-9 w-28 rounded-md border border-blue-400/10 bg-[#05234D]/50" />
            </div>
        </div>
    );
}

export function StatsGridSkeleton({
    count,
    cols = 4,
}: {
    count: number;
    cols?: 3 | 4;
}) {
    return (
        <div
            className={clsx(
                "grid h-fit w-full animate-pulse gap-4 xl:gap-6",
                cols === 3 ? "grid-cols-3" : "grid-cols-4",
            )}
        >
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="flex h-[144px] flex-col justify-center gap-y-1.5 rounded-xl bg-[#051726] p-4 sm:rounded-2xl"
                >
                    {/* Label */}
                    <div className="h-4 w-28 rounded bg-white/10" />
                    {/* Figure */}
                    <div className="mt-1.5 h-8 w-16 rounded bg-white/20" />
                    {/* Bottom target/daily count */}
                    <div className="mt-1.5 h-4 w-20 rounded bg-[#045FE1]/10" />
                </div>
            ))}
        </div>
    );
}

export function PrizePoolSkeleton() {
    return (
        <div className="z-10 animate-pulse px-1">
            <div className="blue-gradient relative h-fit w-full flex-1 rounded-3xl">
                <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-[#041731] p-5">
                    {/* Prize pool title */}
                    <div className="mb-4 flex gap-x-2">
                        <div className="h-5 w-5 rounded bg-white/10" />
                        <div className="h-5 w-40 rounded bg-white/10" />
                    </div>
                    {/* Top 3 Placeholders with Card Styles Backgrounds */}
                    <div className="flex w-full gap-x-4">
                        <div
                            className="flex h-14 flex-1 items-center justify-center rounded-md py-4 sm:rounded-lg lg:py-5 xl:py-6"
                            style={{ backgroundColor: bgMap.yellow.fade }}
                        >
                            <div className="flex items-center gap-x-2">
                                <div className="h-5 w-5 rounded bg-white/10" />
                                <div className="h-4 w-24 rounded bg-white/10" />
                            </div>
                        </div>
                        <div
                            className="flex h-14 flex-1 items-center justify-center rounded-md py-4 sm:rounded-lg lg:py-5 xl:py-6"
                            style={{ backgroundColor: bgMap.ash.fade }}
                        >
                            <div className="flex items-center gap-x-2">
                                <div className="h-5 w-5 rounded bg-white/10" />
                                <div className="h-4 w-24 rounded bg-white/10" />
                            </div>
                        </div>
                        <div
                            className="flex h-14 flex-1 items-center justify-center rounded-md py-4 sm:rounded-lg lg:py-5 xl:py-6"
                            style={{ backgroundColor: bgMap.mauve.fade }}
                        >
                            <div className="flex items-center gap-x-2">
                                <div className="h-5 w-5 rounded bg-white/10" />
                                <div className="h-4 w-24 rounded bg-white/10" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ActiveSkeleton() {
    return (
        <div className="xs:gap-5 mt-4 flex h-full w-full flex-col gap-4 xl:gap-6">
            <HeaderSkeleton />
            <StatsGridSkeleton count={8} cols={4} />
            <PrizePoolSkeleton />

            {/* Split layout: Judges (65%) and Quick Actions (35%) */}
            <div className="z-10 flex w-full animate-pulse gap-4 px-1 lg:gap-5 xl:gap-6">
                {/* Judges Section */}
                <div className="w-[65%]">
                    <div className="blue-gradient relative h-fit w-full flex-1 rounded-3xl">
                        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-[#041731] p-5">
                            {/* Header */}
                            <div className="mb-4 flex gap-x-2">
                                <div className="h-5 w-5 rounded bg-white/10" />
                                <div className="h-5 w-32 rounded bg-white/10" />
                            </div>

                            {/* Content */}
                            <div className="flex w-full flex-col gap-5">
                                {/* Overall Completion Continum */}
                                <div className="w-full">
                                    <div className="flex w-full flex-col gap-2">
                                        <div className="flex w-full items-center justify-between">
                                            <div className="h-4 w-32 rounded bg-white/10" />
                                            <div className="h-4 w-8 rounded bg-white/10" />
                                        </div>
                                        <span className="h-2 w-full rounded-md bg-white/5 sm:rounded-lg">
                                            <span className="block h-full w-3/5 animate-pulse rounded-md bg-blue-500/50 sm:rounded-lg" />
                                        </span>
                                    </div>
                                </div>

                                {/* Individual Judges Grid */}
                                <div className="grid grid-cols-2 gap-5 pt-5">
                                    {Array.from({ length: 4 }).map((_, idx) => (
                                        <div
                                            key={idx}
                                            className="flex w-full gap-2"
                                        >
                                            <div className="shrink-0 pr-2">
                                                <div className="h-10 w-10 rounded-full bg-white/5" />
                                            </div>
                                            <div className="flex w-full flex-col gap-2">
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="h-4 w-24 rounded bg-white/10" />
                                                    <div className="h-4 w-8 rounded bg-white/10" />
                                                </div>
                                                <span className="h-2 w-full rounded-md bg-white/5 sm:rounded-lg">
                                                    <span className="block h-full w-[45%] animate-pulse rounded-md bg-blue-500/50 sm:rounded-lg" />
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Section */}
                <div className="flex-1">
                    <div className="blue-gradient relative h-fit w-full flex-1 rounded-3xl">
                        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-[#041731] p-5">
                            {/* Header */}
                            <div className="mb-4 flex gap-x-2">
                                <div className="h-4 w-4 rounded bg-white/10" />
                                <div className="h-5 w-28 rounded bg-white/10" />
                            </div>
                            {/* Button List */}
                            <div className="flex w-full flex-col gap-y-2">
                                {Array.from({ length: 4 }).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="flex h-10 w-full items-center gap-2 rounded-md border border-white/5 bg-[#051B3A] px-4 sm:rounded-lg"
                                    >
                                        <div className="h-6 w-6 rounded bg-white/5" />
                                        <div className="h-4 w-28 rounded bg-white/10" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CompletedSkeleton() {
    return (
        <div className="xs:gap-5 mt-4 flex h-full w-full animate-pulse flex-col gap-4 xl:gap-6">
            <HeaderSkeleton />

            {/* Dual Row Stats Grid */}
            <div className="xs:gap-y-5 flex flex-col gap-y-4 xl:gap-y-6">
                <StatsGridSkeleton count={3} cols={3} />
                <StatsGridSkeleton count={4} cols={4} />
            </div>

            <PrizePoolSkeleton />

            {/* Full Width Judges Section */}
            <div className="z-10 px-1">
                <div className="blue-gradient relative h-fit w-full flex-1 rounded-3xl">
                    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-[#041731] p-5">
                        <div className="mb-4 flex gap-x-2">
                            <div className="h-5 w-5 rounded bg-white/10" />
                            <div className="h-5 w-32 rounded bg-white/10" />
                        </div>
                        <div className="flex w-full flex-col gap-5">
                            {/* Overall completion */}
                            <div className="w-full">
                                <div className="flex w-full flex-col gap-2">
                                    <div className="flex w-full items-center justify-between">
                                        <div className="h-4 w-32 rounded bg-white/10" />
                                        <div className="h-4 w-8 rounded bg-white/10" />
                                    </div>
                                    <span className="h-2 w-full rounded-md bg-white/5 sm:rounded-lg">
                                        <span className="block h-full w-3/4 animate-pulse rounded-md bg-blue-500/50 sm:rounded-lg" />
                                    </span>
                                </div>
                            </div>
                            {/* Judges Grid */}
                            <div className="grid grid-cols-2 gap-5 pt-5">
                                {Array.from({ length: 4 }).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="flex w-full gap-2"
                                    >
                                        <div className="shrink-0 pr-2">
                                            <div className="h-10 w-10 rounded-full bg-white/5" />
                                        </div>
                                        <div className="flex w-full flex-col gap-2">
                                            <div className="flex w-full items-center justify-between">
                                                <div className="h-4 w-24 rounded bg-white/10" />
                                                <div className="h-4 w-8 rounded bg-white/10" />
                                            </div>
                                            <span className="h-2 w-full rounded-md bg-white/5 sm:rounded-lg">
                                                <span className="block h-full w-1/2 animate-pulse rounded-md bg-blue-500/50 sm:rounded-lg" />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Winners Section */}
            <div className="z-10 px-1">
                <div className="blue-gradient relative h-fit w-full flex-1 rounded-3xl">
                    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-[#041731] p-5">
                        <div className="mb-4 flex gap-x-2">
                            <div className="h-6 w-6 rounded bg-white/10" />
                            <div className="h-5 w-32 rounded bg-white/10" />
                        </div>
                        {/* Winner cards matching loaded layout */}
                        <div className="w-full gap-x-2">
                            <div className="flex w-full gap-x-4">
                                <div className="flex h-24 flex-1 items-center gap-x-4 rounded-md border border-[#FFD700]/10 bg-[#FFD700]/10 py-4 pl-6 sm:rounded-lg lg:py-5 xl:py-6">
                                    <div className="h-6 w-6 rounded bg-white/10" />
                                    <div className="flex items-center space-x-2">
                                        <div className="h-[50px] w-[50px] rounded-full bg-white/5" />
                                        <div className="flex flex-col gap-1.5">
                                            <div className="h-4 w-24 rounded bg-white/10" />
                                            <div className="h-3 w-32 rounded bg-white/5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-24 flex-1 items-center gap-x-4 rounded-md border border-white/5 bg-white/5 py-4 pl-6 sm:rounded-lg lg:py-5 xl:py-6">
                                    <div className="h-6 w-6 rounded bg-white/10" />
                                    <div className="flex items-center space-x-2">
                                        <div className="h-[50px] w-[50px] rounded-full bg-white/5" />
                                        <div className="flex flex-col gap-1.5">
                                            <div className="h-4 w-24 rounded bg-white/10" />
                                            <div className="h-3 w-32 rounded bg-white/5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-24 flex-1 items-center gap-x-4 rounded-md border border-white/5 bg-white/5 py-4 pl-6 sm:rounded-lg lg:py-5 xl:py-6">
                                    <div className="h-6 w-6 rounded bg-white/10" />
                                    <div className="flex items-center space-x-2">
                                        <div className="h-[50px] w-[50px] rounded-full bg-white/5" />
                                        <div className="flex flex-col gap-1.5">
                                            <div className="h-4 w-24 rounded bg-white/10" />
                                            <div className="h-3 w-32 rounded bg-white/5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function UpcomingSkeleton() {
    return (
        <div className="xs:gap-5 mt-4 flex h-full w-full animate-pulse flex-col gap-4 xl:gap-6">
            <HeaderSkeleton />

            {/* Setup Progress */}
            <div className="z-10 px-1">
                <div className="blue-gradient relative h-fit w-full flex-1 rounded-3xl">
                    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-[#041731] p-5">
                        <div className="sticky top-0 flex items-center pb-4">
                            <div className="h-5 w-32 rounded bg-white/10" />
                        </div>
                        <div className="flex w-full flex-col gap-4">
                            {/* Overall Completion */}
                            <div className="w-full">
                                <div className="flex w-full flex-col gap-2">
                                    <div className="flex w-full items-center justify-between">
                                        <div className="h-4 w-32 rounded bg-white/10" />
                                        <div className="h-4 w-8 rounded bg-white/10" />
                                    </div>
                                    <span className="h-2 w-full rounded-md bg-white/5 sm:rounded-lg">
                                        <span className="block h-full w-4/5 animate-pulse rounded-md bg-blue-500/50 sm:rounded-lg" />
                                    </span>
                                </div>
                            </div>

                            {/* Checklist Grid */}
                            <div className="flex w-full max-w-[65%] flex-wrap gap-x-6 gap-y-2 pt-2">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="h-5 w-5 rounded-full bg-white/10" />
                                        <div className="h-4 w-36 rounded bg-white/5" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PrizePoolSkeleton />
        </div>
    );
}

export function ScreenLayoutSkeleton({
    selectedStatus,
}: {
    selectedStatus: string;
}) {
    return (
        <div className="xs:gap-5 flex h-full w-full flex-col gap-4 xl:gap-6">
            <HeaderSkeleton />
            <div className="h-full flex-1 animate-pulse overflow-hidden rounded-xl bg-[#041731] sm:rounded-2xl">
                <div className="sticky top-0 z-30 flex w-full gap-6 rounded-t-xl bg-[#051B3A] px-4 py-4 sm:rounded-t-2xl">
                    {[
                        "Overview",
                        "Entries",
                        "Judges",
                        "Prize Pool",
                        "Analytics",
                    ].map((tab) => (
                        <div
                            key={tab}
                            className={clsx(
                                "h-4 w-16 rounded",
                                tab === selectedStatus
                                    ? "bg-white/20"
                                    : "bg-white/5",
                            )}
                        />
                    ))}
                </div>

                {/* Specific Screen Sub-Skeleton */}
                <div className="flex flex-col gap-6 p-6">
                    {selectedStatus === "Overview" && (
                        <div className="flex flex-col gap-4">
                            <div className="h-6 w-48 rounded bg-white/10" />
                            <div className="h-24 w-full rounded bg-white/5" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-32 rounded bg-white/5" />
                                <div className="h-32 rounded bg-white/5" />
                            </div>
                        </div>
                    )}
                    {selectedStatus === "Entries" && (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="h-8 w-48 rounded bg-white/10" />
                                <div className="h-8 w-32 rounded bg-white/10" />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-40 rounded-lg bg-white/5"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {selectedStatus === "Judges" && (
                        <div className="flex flex-col gap-4">
                            <div className="h-6 w-32 rounded bg-white/10" />
                            <div className="grid grid-cols-2 gap-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-24 rounded-lg bg-white/5"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {selectedStatus === "Prize Pool" && (
                        <div className="flex flex-col gap-4">
                            <div className="h-6 w-32 rounded bg-white/10" />
                            <div className="h-24 w-full rounded bg-white/5" />
                            <div className="flex gap-4">
                                <div className="h-16 flex-1 rounded-lg bg-white/5" />
                                <div className="h-16 flex-1 rounded-lg bg-white/5" />
                                <div className="h-16 flex-1 rounded-lg bg-white/5" />
                            </div>
                        </div>
                    )}
                    {selectedStatus === "Analytics" && (
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-28 rounded bg-white/5" />
                                <div className="h-28 rounded bg-white/5" />
                                <div className="h-28 rounded bg-white/5" />
                            </div>
                            <div className="h-64 w-full rounded bg-white/5" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
