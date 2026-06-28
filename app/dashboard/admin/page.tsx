"use client";
import clsx from "clsx";
import Image from "next/image";
import Map from "@/components/general/map";
import NoData from "@/components/common/noData";
import { useTimeline } from "@/hooks/use-users";
import { useAlerts } from "@/hooks/use-notifications";
import { useDashboardMetrics } from "@/hooks/use-dashboard";
import TimelineCard from "@/components/general/timeline-card";
import KeyMetrics from "@/components/routes/home/key-metrics";
import QuickActions from "@/components/routes/home/quick-action";
import AlertCard, { AlertData } from "@/components/ui/cards/alert-card";
import type { DashboardMetrics, Notification, Timeline } from "@/lib/interface";
import { AlertCardSkeletonGroup } from "@/components/ui/skeletons/alert-card-skeleton";

export default function Home() {
    const bellSrc = "/images/general/icon-bell.png";
    const { data: criticalAlerts, isLoading: isLoadingAlerts } = useAlerts();
    const { data: userTimeline, isLoading: isLoadingUserTimeline } =
        useTimeline();
    const { data: dashboardMetrics, isLoading: isLoadingDashboard } =
        useDashboardMetrics();
    // const { data: activityTimeline, isLoading: isLoadingActivity } =
    //     useAdminActivityTimeline();

    const renderAlertsList = (label: string) => {
        if (isLoadingAlerts && !criticalAlerts) {
            return <AlertCardSkeletonGroup count={4} />;
        }
        if (!criticalAlerts || criticalAlerts.length === 0) {
            return <NoData label={label} className="min-h-64" />;
        }
        const aggregatedAlerts: AlertData[] = criticalAlerts.reduce(
            (acc, alert: Notification) => {
                const existing = acc.find((a) => a.category === alert.category);
                if (existing) {
                    existing.count++;
                } else {
                    acc.push({ category: alert.category, count: 1 });
                }
                return acc;
            },
            [] as AlertData[],
        );
        return aggregatedAlerts.map((alert, idx: number) => (
            <AlertCard data={alert} key={idx} />
        ));
    };

    const renderRecentActivity = (label: string) => {
        if (isLoadingUserTimeline && !userTimeline) {
            return <AlertCardSkeletonGroup count={4} />;
        }
        if (!userTimeline || userTimeline.length === 0) {
            return <NoData label={label} className="min-h-64" />;
        }
        return userTimeline?.map((timeline: Timeline, idx: number) => (
            <TimelineCard timeline={timeline} key={idx} />
        ));
    };

    return (
        <div className="flex h-full w-full flex-col">
            <QuickActions />
            <div className="flex flex-1 flex-col">
                <KeyMetrics
                    dashboardData={dashboardMetrics as DashboardMetrics}
                    isLoading={isLoadingDashboard}
                />
                <div className="xs:mt-5 mt-4 flex-1 xl:mt-6">
                    <div className="xs:gap-5 grid h-full w-full grid-cols-2 gap-4 xl:gap-6 2xl:max-h-162.5">
                        <div className="xs:gap-5 grid w-full grid-cols-2 gap-4 xl:gap-6">
                            <div className="h-fit flex-1 rounded-xl bg-[#051428] p-4 sm:rounded-2xl">
                                <div className="flex items-center gap-x-1">
                                    <div className="shrink-0">
                                        <Image
                                            height={22}
                                            width={22}
                                            alt="Notification icon"
                                            src={
                                                bellSrc ||
                                                "/images/general/empty-img.jpg"
                                            }
                                        />
                                    </div>
                                    <p className={clsx("xs-text")}>
                                        {`Critical Alerts (${criticalAlerts?.length || 0})`}
                                    </p>
                                </div>
                                <div className="mt-2 h-fit w-full overflow-auto [scrollbar-width:none]">
                                    <div className="flex h-full w-full flex-col gap-y-4">
                                        {renderAlertsList("critical alerts")}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col gap-y-6 [scrollbar-width:none] sm:rounded-2xl">
                                {/* {isLoadingActivity && !activityTimeline ? (
                                    <div className="h-fit">
                                        <MetricCardSkeleton />
                                    </div>
                                ) : (
                                    <div className="h-fit">
                                        <MetricCard
                                            data={chartData[5]}
                                            liveData={
                                                activityTimeline as Metrics
                                            }
                                            hidden
                                        />
                                    </div>
                                )} */}
                                <div className="h-fit rounded-xl bg-[#051428] p-4 sm:rounded-2xl">
                                    <div className="flex items-center gap-x-1">
                                        <div className="shrink-0">
                                            <Image
                                                height={22}
                                                width={22}
                                                alt="Notification icon"
                                                src={
                                                    bellSrc ||
                                                    "/images/general/empty-img.jpg"
                                                }
                                            />
                                        </div>
                                        <p className={clsx("xs-text")}>
                                            Recent Activity
                                        </p>
                                    </div>
                                    <div className="mt-2 h-full w-full overflow-auto [scrollbar-width:none]">
                                        <div className="flex h-full w-full flex-col gap-y-4">
                                            {renderRecentActivity(
                                                "Recent Activity",
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-col rounded-xl bg-[#051428] p-4 sm:rounded-2xl">
                            <div className="flex items-center gap-x-1">
                                <div className="shrink-0">
                                    <Image
                                        height={22}
                                        width={22}
                                        alt="Notification icon"
                                        src={
                                            bellSrc ||
                                            "/images/general/empty-img.jpg"
                                        }
                                    />
                                </div>
                                <p className={clsx("xs-text")}>
                                    Geographic Distribution
                                </p>
                            </div>
                            <div className="mt-2 flex-1 p-4">
                                <Map />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
