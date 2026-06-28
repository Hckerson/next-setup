"use client";
import clsx from "clsx";
import Image from "next/image";
import { poppins } from "@/public/fonts/font";
import NoData from "@/components/common/noData";
import { storage } from "@/lib/utils/local-storage";
import { useEffect, useState, useRef } from "react";
import { userStats as userStatsLabel } from "@/lib/data/mapped-data";
import { UserList } from "@/components/routes/users/user-list";
import { StatsCard } from "@/components/routes/users/stats-card";
import { UserListSkeletonGroup } from "@/components/ui/skeletons/user-list-skeleton";
import { StatsCardListSkeleton } from "@/components/ui/skeletons/stats-card-skeleton";
import { getPercentAndTrendAndCurrentFigure } from "@/lib/utils/percentage-calculator";

import type {
    BaseChartData,
    MetricSkeleton,
    School,
    User,
} from "@/lib/interface";
import { useUsers, useUserStats } from "@/hooks/use-users";
import { useSchools } from "@/hooks/use-schools";

const ROLES = [
    { label: "Admin", value: "ADMIN" },
    { label: "Mentor", value: "MENTOR" },
    { label: "Student", value: "STUDENT" },
    { label: "Guardian", value: "GUARDIAN" },
    { label: "School Admin", value: "SCHOOL" },
];

export default function User() {
    const schoolRef = useRef<HTMLDivElement>(null);
    const userTypeRef = useRef<HTMLDivElement>(null);

    const [search, setSearch] = useState("");
    const [localSearch, setLocalSearch] = useState("");
    const [schoolOpen, setSchoolOpen] = useState<boolean>(false);
    const [userTypeOpen, setUserTypeOpen] = useState<boolean>(false);
    const [school, setSchool] = useState<School | undefined>(undefined);
    const [userType, setUserType] = useState<string | undefined>(undefined);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(localSearch);
        }, 300);
        return () => clearTimeout(timer);
    }, [localSearch]);

    const { data: schoolsData } = useSchools();
    const { data: userStats, isLoading: isLoadingLiveStats } =
        useUserStats();
    const { data: userList, isLoading: isLoadingLiveUsers } = useUsers({
        search,
        role: userType,
        schoolId: school?.id,
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userTypeRef.current &&
                !userTypeRef.current.contains(event.target as Node)
            ) {
                setUserTypeOpen(false);
            }
            if (
                schoolRef.current &&
                !schoolRef.current.contains(event.target as Node)
            ) {
                setSchoolOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    type PayloadType = "total" | "active" | "pending" | "suspected";
    type Payload = Record<PayloadType, number>;

    const [stats, setStats] = useState<MetricSkeleton<PayloadType>>({
        total: { trend: "up", change: 0, currentFigure: 0 },
        active: { trend: "up", change: 0, currentFigure: 0 },
        pending: { trend: "up", change: 0, currentFigure: 0 },
        suspected: { trend: "up", change: 0, currentFigure: 0 },
    });

    useEffect(() => {
        const storedMetrics = storage.getItem("userStats");
        if (!storedMetrics) {
            const payload: Payload = {
                total: userStats?.total ?? 0,
                active: userStats?.active ?? 0,
                pending: userStats?.pending ?? 0,
                suspected: userStats?.suspected ?? 0,
            };
            storage.setItem("userStats", JSON.stringify(payload));
        } else {
            const storedPayload = storage.getItem("userStats") || "";
            const { total, active, pending, suspected } = JSON.parse(
                storedPayload,
            ) as Payload;
            const change: Record<PayloadType, BaseChartData> = {
                total: getPercentAndTrendAndCurrentFigure(
                    userStats?.total ?? 0,
                    total,
                ),
                active: getPercentAndTrendAndCurrentFigure(
                    userStats?.active ?? 0,
                    active,
                ),
                pending: getPercentAndTrendAndCurrentFigure(
                    userStats?.pending ?? 0,
                    pending,
                ),
                suspected: getPercentAndTrendAndCurrentFigure(
                    userStats?.suspected ?? 0,
                    suspected,
                ),
            };
            setStats(change);
        }
    }, [userStats]);

    const renderUserList = () => {
        if (isLoadingLiveUsers && !userList) {
            return <UserListSkeletonGroup count={10} />;
        }
        if (!userList || userList.length === 0) {
            return (
                <NoData label="Users" className="h-100" />
            );
        }
        return userList?.map((user: User, idx: number) => (
            <UserList key={idx} data={user} />
        ));
    };

    return (
        <div className="xs:pt-5 xs:gap-5 box-border flex h-full w-full flex-col gap-y-4 pt-4 xl:gap-6 xl:pt-6">
            <div className="xs:gap-5 grid gap-y-4 xl:gap-6">
                {isLoadingLiveStats && !userStats ? (
                    <StatsCardListSkeleton count={4} />
                ) : (
                    <div className="xs:gap-5 flex w-full gap-4 xl:gap-6">
                        <StatsCard
                            data={userStatsLabel[0]}
                            liveData={stats?.total}
                        />
                        <StatsCard
                            data={userStatsLabel[1]}
                            liveData={stats?.active}
                        />
                        <StatsCard
                            data={userStatsLabel[2]}
                            liveData={stats?.pending}
                        />
                        <StatsCard
                            data={userStatsLabel[3]}
                            liveData={stats?.suspected}
                        />
                    </div>
                )}
                <div className="w-full rounded-xl bg-[#051B3A] p-4 sm:rounded-2xl">
                    <div
                        className={clsx(
                            "grid grid-cols-[59%_20%_20%] gap-2",
                            poppins.className,
                        )}
                    >
                        <span className="relative flex w-full items-center justify-center gap-x-2 rounded-md bg-white/10 p-2 sm:rounded-lg">
                            <div className="size-6 shrink-0">
                                <Image
                                    height={50}
                                    width={50}
                                    alt="Search Icon"
                                    src={"/svgs/search.svg"}
                                />
                            </div>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                className="placeholder:xs-text w-full flex-1 border-none placeholder:text-white/50 focus:outline-none"
                                placeholder="Search by name or email"
                            />
                        </span>
                        <div
                            ref={userTypeRef}
                            className="relative flex items-center justify-between rounded-md bg-white/10 sm:rounded-lg"
                        >
                            <button
                                onClick={() => setUserTypeOpen(!userTypeOpen)}
                                className="flex w-full items-center justify-between px-2 py-3 text-left outline-none sm:px-3"
                            >
                                <span className="truncate uppercase text-white/50">
                                    {ROLES.find((r) => r.value === userType)
                                        ?.label || "User type"}
                                </span>
                                <div className="rounded-sm p-1 hover:bg-[#111F33]">
                                    <Image
                                        height={50}
                                        width={50}
                                        alt="Caret down icon"
                                        src={"/svgs/caret-down.svg"}
                                        className={clsx(
                                            "size-5 transition-transform duration-200",
                                            userTypeOpen && "rotate-180",
                                        )}
                                    />
                                </div>
                            </button>
                            {userTypeOpen && (
                                <ul className="absolute top-[105%] left-0 z-50 max-h-60 w-full overflow-auto rounded-md border border-white/10 bg-[#051B3A] py-1 shadow-lg [scrollbar-color:#051b3a_#051428] [scrollbar-width:thin]">
                                    <li
                                        onClick={() => {
                                            setUserType(undefined);
                                            setUserTypeOpen(false);
                                        }}
                                        className="cursor-pointer px-4 py-2 uppercase text-white/70 hover:bg-white/10 hover:text-white"
                                    >
                                        All
                                    </li>
                                    {ROLES.map((role) => (
                                        <li
                                            key={role.value}
                                            onClick={() => {
                                                setUserType(role.value);
                                                setUserTypeOpen(false);
                                            }}
                                            className="cursor-pointer px-4 py-2 uppercase text-white/70 hover:bg-white/10 hover:text-white"
                                        >
                                            {role.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div
                            ref={schoolRef}
                            className="relative flex items-center justify-between rounded-md bg-white/10 sm:rounded-lg"
                        >
                            <button
                                onClick={() => setSchoolOpen(!schoolOpen)}
                                className="flex w-full items-center justify-between px-2 py-3 text-left outline-none sm:px-3"
                            >
                                <span className="truncate uppercase text-white/50">
                                    {school?.name || "School"}
                                </span>
                                <div className="rounded-sm p-1 hover:bg-[#111F33]">
                                    <Image
                                        height={50}
                                        width={50}
                                        alt="Caret down icon"
                                        src={"/svgs/caret-down.svg"}
                                        className={clsx(
                                            "size-5 transition-transform duration-200",
                                            schoolOpen && "rotate-180",
                                        )}
                                    />
                                </div>
                            </button>
                            {schoolOpen && (
                                <ul className="absolute top-[105%] left-0 z-50 max-h-60 w-full overflow-auto rounded-md border border-white/10 bg-[#051B3A] py-1 shadow-lg [scrollbar-color:#051b3a_#051428] [scrollbar-width:thin]">
                                    <li
                                        onClick={() => {
                                            setSchool(undefined);
                                            setSchoolOpen(false);
                                        }}
                                        className="cursor-pointer px-4 py-2 uppercase text-white/70 hover:bg-white/10 hover:text-white"
                                    >
                                        All
                                    </li>
                                    {schoolsData?.map((s) => (
                                        <li
                                            key={s.id}
                                            onClick={() => {
                                                setSchool(s);
                                                setSchoolOpen(false);
                                            }}
                                            className="cursor-pointer px-4 py-2 uppercase text-white/70 hover:bg-white/10 hover:text-white"
                                        >
                                            {s.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 overflow-hidden rounded-xl bg-[#051726] [scrollbar-width:none] sm:rounded-2xl">
                <div
                    className={clsx(
                        "relative h-full w-full overflow-auto rounded-b-xl [scrollbar-width:none] sm:rounded-b-2xl",
                        poppins.className,
                        "xs-text",
                    )}
                >
                    <div className="sticky top-0 z-30 w-full rounded-t-xl bg-[#051b3a] p-4 sm:rounded-t-2xl">
                        <div className="xs-text flex gap-2 font-medium">
                            <div className="size-10 p-2">
                                <button className="h-full w-full rounded-sm border-2 border-gray-500 sm:rounded-md"></button>
                            </div>
                            <div className="flex max-w-[40%] flex-1 items-center">
                                <p>User</p>
                            </div>
                            <div className="flex max-w-[13%] flex-1 items-center">
                                <p className="px-4 py-2">Status</p>
                            </div>
                            <div className="flex max-w-[10%] flex-1 items-center">
                                <p>Age</p>
                            </div>
                            <div className="flex max-w-[18%] flex-1 items-center">
                                <p>Wallet Balance</p>
                            </div>
                            <div className="flex max-w-[13%] flex-1 items-center">
                                <p>Last Active</p>
                            </div>
                            <div className="size-10 p-2"></div>
                        </div>
                    </div>
                    <ul className="h-full max-h-150 w-full overflow-y-auto rounded-b-xl [scrollbar-width:none] sm:rounded-b-2xl [&>li]:border-b [&>li]:border-[#052148] [&>li:last-child]:rounded-b-xl [&>li:last-child]:border-b-0 [&>li:last-child]:sm:rounded-b-2xl">
                        {renderUserList()}
                    </ul>
                </div>
            </div>
        </div>
    );
}
