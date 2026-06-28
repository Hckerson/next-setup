"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { poppins } from "@/public/fonts/font";
import Button from "@/components/common/button";
import Wallet from "@/components/routes/users/screens/wallet";
import Overview from "@/components/routes/users/screens/overview";
import TimelineScreen from "@/components/routes/users/screens/timeline";

import {
    useSuspendUser,
    useUserData,
    useUserTimeline,
} from "@/hooks/use-users";
import type {
    User,
    Timeline as ITimeline,
    Transaction,
    Entry as IEntry,
} from "@/lib/interface";
import type { UserAboutCategory } from "@/lib/types/types";

export default function User() {
    const [selectedStatus, setSelectedStatus] =
        useState<UserAboutCategory>("Overview");
    const { id } = useParams<{ id: string }>();

    const { data: userData, isLoading: isLoadingUserData } = useUserData(id);
    const { data: timelineData, isLoading: isLoadingTimeline } =
        useUserTimeline(id);
    const { mutate: suspendUser, isPending: isSuspending } = useSuspendUser();

    const handleSelectedStatusChange = (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        const target = e.currentTarget;
        const name = target.name;
        setSelectedStatus(name as UserAboutCategory);
    };

    const renderScreen = () => {
        switch (selectedStatus) {
            case "Overview":
                return (
                    <Overview
                        user={userData as User}
                        isLoading={isLoadingUserData}
                    />
                );
            case "Wallet":
                return (
                    <Wallet
                        wallet={userData?.wallet}
                        isLoading={isLoadingUserData}
                        transactions={userData?.transactions as Transaction[]}
                    />
                );
            default:
                return (
                    <TimelineScreen
                        isLoadingUserData={isLoadingUserData}
                        isLoadingTimeline={isLoadingTimeline}
                        entries={userData?.student?.entries as IEntry[]}
                        timelineData={timelineData as ITimeline[]}
                    />
                );
        }
    };

    return (
        <div className="xs:pt-5 h-full w-full pt-4 xl:pt-6">
            <div className="xs:gap-5 flex h-full w-full flex-col gap-y-4 xl:gap-6">
                <div
                    className={clsx(
                        "xs:p-5 box-border flex w-full items-center justify-between rounded-2xl bg-[#051726] p-4 sm:rounded-3xl",
                        poppins.className,
                    )}
                >
                    <div className="flex items-center gap-x-2">
                        <div className="shrink-0">
                            <Image
                                height={100}
                                width={100}
                                alt="Profile avatar"
                                src={
                                    userData?.avatar ||
                                    "/images/general/empty-img.jpg"
                                }
                                className="rounded-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="xs-text">
                                Welcome {userData?.fullName || "User"}
                            </p>
                            <p className="text-[7px] font-light text-white/50 sm:text-[14px]">
                                {userData?.email || "N/A"}
                            </p>
                        </div>
                    </div>
                    <Button
                        className="w-42.5 rounded-md bg-[#FF0000]/40 hover:bg-[#FF0000]/60 disabled:opacity-60 sm:rounded-lg"
                        onClick={() => userData?.id && suspendUser(userData.id)}
                        disabled={isSuspending || userData?.status === "SUSPENDED"}
                    >
                        <span className="flex gap-x-2 px-3">
                            <Image
                                height={25}
                                width={25}
                                alt="Danger icon"
                                src={"/images/general/danger.png"}
                            />
                            <span>
                                {isSuspending
                                    ? "Suspending..."
                                    : "Suspend User"}
                            </span>
                        </span>
                    </Button>
                </div>
                <div className="flex-1">
                    <div className="h-full flex-1 overflow-auto rounded-xl [scrollbar-width:none] sm:rounded-2xl">
                        <div
                            className={clsx(
                                "relative flex h-full w-full flex-col rounded-b-xl [scrollbar-width:none] sm:rounded-b-2xl",
                                poppins.className,
                                "xs-text",
                            )}
                        >
                            <div className="w-full rounded-t-xl bg-[#051B3A] px-4 sm:rounded-t-2xl">
                                <div className="flex gap-2">
                                    <button
                                        name="Overview"
                                        onClick={handleSelectedStatusChange}
                                        className="hover:text-white/80 transition-colors"
                                    >
                                        <p
                                            className={clsx(
                                                selectedStatus == "Overview"
                                                    ? "border-b-3 border-[#045FE1] font-semibold"
                                                    : "font-light text-white/50",
                                                "xs-text px-2 py-4",
                                            )}
                                        >
                                            Overview
                                        </p>
                                    </button>
                                    <button
                                        name="Wallet"
                                        onClick={handleSelectedStatusChange}
                                        className="hover:text-white/80 transition-colors"
                                    >
                                        <p
                                            className={clsx(
                                                selectedStatus == "Wallet"
                                                    ? "border-b-3 border-[#045FE1] font-semibold"
                                                    : "font-light text-white/50",
                                                "xs-text px-2 py-4",
                                            )}
                                        >
                                            Wallet
                                        </p>
                                    </button>
                                    <button
                                        name="Timeline"
                                        onClick={handleSelectedStatusChange}
                                        className="hover:text-white/80 transition-colors"
                                    >
                                        <p
                                            className={clsx(
                                                selectedStatus == "Timeline"
                                                    ? "border-b-3 border-[#045FE1] font-semibold"
                                                    : "font-light text-white/50",
                                                "xs-text px-2 py-4",
                                            )}
                                        >
                                            Timeline
                                        </p>
                                    </button>
                                </div>
                            </div>

                            <div className="h-full rounded-b-xl bg-[#051428] p-3 sm:rounded-b-2xl">
                                {renderScreen()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
