import clsx from "clsx";
import Image from "next/image";
import type { User } from "@/lib/interface";
import { antonSc } from "@/public/fonts/font";
import Button from "@/components/common/button";
import NoData from "@/components/common/noData";
import {
    BasicProfileSkeleton,
    GuardianDetailsSkeleton,
    EngagementMetricsSkeleton,
} from "@/components/ui/skeletons/overview-skeleton";

export default function Overview({
    user,
    isLoading,
}: {
    user: User;
    isLoading: boolean;
}) {
    return (
        <div className="flex h-full max-h-150 gap-4 overflow-auto p-1 [scrollbar-width:none]">
            <div className="z-10 flex w-[65%] flex-col gap-4">
                <div className="blue-gradient relative flex h-fit flex-col rounded-xl p-4 sm:rounded-2xl">
                    {isLoading && !user ? (
                        <BasicProfileSkeleton />
                    ) : !user ? (
                        <div className="h-68.75">
                            <NoData label="User Data" />
                        </div>
                    ) : (
                        <div className="relative flex h-fit flex-col rounded-xl p-4 sm:rounded-2xl">
                            <div className="mb-4 flex items-center gap-x-1">
                                <div className="shrink-0">
                                    <Image
                                        height={15}
                                        width={15}
                                        alt="Users icon"
                                        src={"/images/general/icon-users.png"}
                                    />
                                </div>
                                <p
                                    className={clsx(
                                        "xs-text",
                                        antonSc.className,
                                    )}
                                >
                                    Basic Profile
                                </p>
                            </div>
                            <div className="w-full">
                                <ul className="box-border flex w-full flex-col gap-y-2">
                                    <li className="flex w-full">
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                UID
                                            </label>
                                            <p>{user.id || "N/A"}</p>
                                        </div>
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                Phone Number
                                            </label>
                                            <p>{user.phoneNumber || "N/A"}</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full">
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                Account Type
                                            </label>
                                            <p>{user.role || "N/A"}</p>
                                        </div>
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                Verification Status:
                                            </label>
                                            <p>{user.status || "N/A"}</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full">
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                Joined Date
                                            </label>
                                            <p>
                                                {user.createdAt
                                                    ? new Date(
                                                          user.createdAt,
                                                      ).toLocaleString(
                                                          "en-US",
                                                          {
                                                              month: "short",
                                                              day: "numeric",
                                                              year: "numeric",
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                          },
                                                      )
                                                    : "N/A"}
                                            </p>
                                        </div>
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                Last Login
                                            </label>
                                            <p>
                                                {user.lastActive
                                                    ? new Date(
                                                          user.lastActive,
                                                      ).toLocaleString(
                                                          "en-US",
                                                          {
                                                              month: "short",
                                                              day: "numeric",
                                                              year: "numeric",
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                          },
                                                      )
                                                    : "N/A"}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex w-full">
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                School
                                            </label>
                                            <p>
                                                {user?.student?.school?.name ||
                                                    "N/A"}
                                            </p>
                                        </div>
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                Region
                                            </label>
                                            <p>{user.country || "N/A"}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <div className="blue-gradient relative flex h-fit flex-col rounded-xl p-4 sm:rounded-2xl">
                    {isLoading && !user?.student?.guardian ? (
                        <GuardianDetailsSkeleton />
                    ) : !user?.student?.guardian ? (
                        <div className="h-68.75">
                            <NoData label="Guardian Details" />
                        </div>
                    ) : (
                        <div className="relative flex h-fit flex-col rounded-xl p-4 sm:rounded-2xl">
                            <div className="mb-4 flex items-center gap-x-1">
                                <div className="shrink-0">
                                    <Image
                                        height={15}
                                        width={15}
                                        alt="User icon"
                                        src={
                                            "/images/general/blue-user-icon.png"
                                        }
                                    />
                                </div>
                                <p
                                    className={clsx(
                                        "xs-text",
                                        antonSc.className,
                                    )}
                                >
                                    Guardian Details
                                </p>
                            </div>
                            <div className="w-full">
                                <ul className="box-border w-full">
                                    <li className="flex w-full">
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                Full Name
                                            </label>
                                            <p>
                                                {user?.student?.guardian
                                                    .fullName || "N/A"}
                                            </p>
                                        </div>
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                Relationship
                                            </label>
                                            <p>
                                                {user?.student?.guardian
                                                    .relationship || "N/A"}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex w-full">
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                Email
                                            </label>
                                            <p>
                                                {user?.student?.guardian
                                                    .email || "N/A"}
                                            </p>
                                        </div>
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                Phone Number
                                            </label>
                                            <p>
                                                {user?.student?.guardian
                                                    .phoneNumber || "N/A"}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex w-full">
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                Joined Date
                                            </label>
                                            <p>
                                                {user?.student?.guardian
                                                    .createdAt
                                                    ? new Date(
                                                          user?.student
                                                              ?.guardian
                                                              .createdAt,
                                                      ).toLocaleDateString(
                                                          "en-US",
                                                          {
                                                              year: "numeric",
                                                              month: "short",
                                                              day: "numeric",
                                                          },
                                                      )
                                                    : "N/A"}
                                            </p>
                                        </div>
                                        <div className="flex flex-1 flex-col gap-y-2">
                                            <label
                                                htmlFor=""
                                                className="text-white/50"
                                            >
                                                Last Login
                                            </label>
                                            <p>
                                                {user?.student?.guardian
                                                    .lastLogin
                                                    ? new Date(
                                                          user?.student
                                                              ?.guardian
                                                              .lastLogin,
                                                      ).toLocaleDateString(
                                                          "en-US",
                                                          {
                                                              year: "numeric",
                                                              month: "short",
                                                              day: "numeric",
                                                          },
                                                      )
                                                    : "N/A"}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="z-10 flex flex-1 flex-col gap-4">
                <div className="blue-gradient relative flex h-fit flex-col rounded-xl p-4 sm:rounded-2xl">
                    <div className="mb-4 flex items-center gap-x-1">
                        <div className="shrink-0">
                            <Image
                                height={10}
                                width={10}
                                alt="Flash icon"
                                src={"/images/stats/flash.png"}
                            />
                        </div>
                        <p className={clsx("xs-text", antonSc.className)}>
                            Quick Actions
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-y-2">
                        <div className="w-full">
                            <Button
                                className="w-full rounded-md bg-[#1E0B12] hover:bg-[#2D1219] sm:rounded-lg"
                                disabled={!user || user?.status === "SUSPENDED"}
                            >
                                <span className="flex items-center gap-x-2 px-3">
                                    <Image
                                        height={25}
                                        width={25}
                                        alt="Danger coin"
                                        src={"/images/general/danger.png"}
                                    />
                                    <span>Suspend User</span>
                                </span>
                            </Button>
                        </div>
                        <div className="w-full">
                            <Button
                                className="w-full rounded-md bg-[#041616] hover:bg-[#052525] sm:rounded-lg"
                                disabled={!user || user.status === "ACTIVE"}
                            >
                                <span className="flex items-center gap-x-2 px-3">
                                    <Image
                                        height={25}
                                        width={25}
                                        alt="Check coin"
                                        src={"/images/general/check.png"}
                                    />
                                    <span>Verify Manually</span>
                                </span>
                            </Button>
                        </div>
                        <div className="w-full">
                            <Button
                                className="w-full rounded-md bg-[#051B3A] hover:bg-[#0A2855] sm:rounded-lg"
                                disabled={!user}
                            >
                                <span className="flex items-center gap-x-2 px-3">
                                    <Image
                                        height={25}
                                        width={25}
                                        alt="Notification icon"
                                        src={"/images/general/notification.png"}
                                    />
                                    <span>Send a Message</span>
                                </span>
                            </Button>
                        </div>
                        <div className="w-full">
                            <Button
                                className="w-full rounded-md bg-[#051B3A] hover:bg-[#0A2855] sm:rounded-lg"
                                disabled={!user}
                            >
                                <span className="flex items-center gap-x-2 px-3">
                                    <Image
                                        height={25}
                                        width={25}
                                        alt="Lock icon"
                                        src={"/images/general/lock.png"}
                                    />
                                    <span>Reset Password</span>
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="blue-gradient relative flex h-fit flex-col rounded-xl p-4 sm:rounded-2xl">
                    <div className="mb-4 flex items-center gap-x-1">
                        <div className="shrink-0">
                            <Image
                                height={22}
                                width={22}
                                alt="Sparkles icon"
                                src={"/images/stats/sparkles.png"}
                            />
                        </div>
                        <p className={clsx("xs-text", antonSc.className)}>
                            Engagement Metrics
                        </p>
                    </div>
                    <ul className="flex w-full flex-col gap-y-2">
                        {isLoading && !user?.student ? (
                            <EngagementMetricsSkeleton />
                        ) : !user?.student ? (
                            <NoData />
                        ) : (
                            <>
                                <li className="flex w-full items-center justify-between">
                                    <p className="text-white/50">
                                        Competitions Entered
                                    </p>
                                    <p>
                                        {user?.student?.stats
                                            ?.competitionsEntered || 0}
                                    </p>
                                </li>
                                <li className="flex w-full items-center justify-between">
                                    <p className="text-white/50">
                                        Achievements
                                    </p>
                                    <p>
                                        {user?.student?.stats?.achievements
                                            ? user?.student?.stats
                                                  ?.achievements >= 1000
                                                ? `${(user?.student?.stats.achievements / 1000).toFixed(1)}k`
                                                : user?.student?.stats
                                                      ?.achievements
                                            : 0}
                                    </p>
                                </li>
                                <li className="flex w-full items-center justify-between">
                                    <p className="text-white/50">Submissions</p>
                                    <p>
                                        {user?.student?.stats?.submissions || 0}
                                    </p>
                                </li>
                                <li className="flex w-full items-center justify-between">
                                    <p className="text-white/50">
                                        Mentor Feedback
                                    </p>
                                    <p>{user?.student?.mentorFeedback || 0}</p>
                                </li>
                                <li className="flex w-full items-center justify-between">
                                    <p className="text-white/50">
                                        Sparks Collected
                                    </p>
                                    <p>
                                        {user?.student?.stats
                                            ?.sparksCollected || 0}
                                    </p>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
