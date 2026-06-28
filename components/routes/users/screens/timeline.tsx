import clsx from "clsx";
import Image from "next/image";
import dynamic from "next/dynamic";
import { antonSc } from "@/public/fonts/font";
import NoData from "@/components/common/noData";
import { EntryCard } from "../../content/entry-card";
import type { Entry, Timeline } from "@/lib/interface";
import XTimeline from "@/components/general/timeline-card";
import { TimelineSkeletonGroup } from "@/components/ui/skeletons/timeline-skeleton";
import { EntryCardListSkeleton } from "@/components/ui/skeletons/entry-card-skeleton";

const Masonry = dynamic(() => import("masonic").then((m) => m.Masonry), {
    ssr: false,
}) as any;

export default function TimelineScreen({
    entries,
    isLoadingUserData,
    isLoadingTimeline,
    timelineData,
}: {
    entries: Entry[];
    isLoadingUserData: boolean;
    isLoadingTimeline: boolean;
    timelineData: Timeline[];
}) {

    return (
        <div className="flex h-full w-full gap-4">
            <div className="blue-gradient relative z-10 h-fit flex-1 rounded-xl sm:rounded-2xl">
                <div className="relative z-10 h-fit flex-1 rounded-xl sm:rounded-2xl">
                    <div className="flex h-full max-h-150 gap-4 overflow-auto rounded-t-xl [scrollbar-width:none] sm:rounded-t-2xl">
                        <div className="flex-1 rounded-b-xl bg-[#041731] sm:rounded-b-2xl">
                            <div className="m-4 flex items-center gap-x-1">
                                <div className="shrink-0">
                                    <Image
                                        height={15}
                                        width={15}
                                        alt="Time icon"
                                        src={"/images/general/time.png"}
                                    />
                                </div>
                                <p
                                    className={clsx(
                                        "xs-text",
                                        antonSc.className,
                                    )}
                                >
                                    Activity
                                </p>
                            </div>
                            <ul className="grid w-full flex-1 gap-y-4 overflow-y-auto p-4 pt-0 [scrollbar-width:none]">
                                {isLoadingTimeline && !timelineData ? (
                                    <TimelineSkeletonGroup count={6} />
                                ) : !timelineData ||
                                  timelineData.length == 0 ? (
                                    <div className="h-100">
                                        <NoData label="Timeline Data" />
                                    </div>
                                ) : (
                                    timelineData.map((timelineData, idx) => (
                                        <li key={idx} className="w-full">
                                            <XTimeline
                                                timeline={timelineData}
                                            />
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="z-10 flex-1">
                <div className="blue-gradient relative h-fit w-full flex-1 rounded-3xl">
                    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-[#041731]">
                        <div className="sticky top-0 flex items-center rounded-3xl p-4">
                            <div className="flex gap-x-2">
                                <div className="shrink-0">
                                    <Image
                                        src={"/images/general/paper-plane.png"}
                                        width={25}
                                        height={25}
                                        alt="Transfer icon"
                                    />
                                </div>
                                <p
                                    className={clsx(
                                        "sm-text",
                                        antonSc.className,
                                    )}
                                >
                                    Submissions{" "}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex-1 bg-[#051428] xl:gap-6">
                            <div className="xs:gap-5 grid max-h-150 gap-4 overflow-auto [scrollbar-width:none]">
                                {isLoadingUserData && !entries ? (
                                    <EntryCardListSkeleton
                                        count={6}
                                        className="grid-cols-2"
                                    />
                                ) : !entries || entries.length === 0 ? (
                                    <div className="h-100 w-full flex-1 bg-[#045FE1]/10">
                                        <NoData label="Entries" />
                                    </div>
                                ) : (
                                    <div className="xs:gap-5 xs:p-5 h-fit w-full gap-4 bg-[#045FE1]/10 p-4 xl:gap-6">
                                        <Masonry
                                            items={entries}
                                            render={EntryCard}
                                            columnGutter={20}
                                            columnWidth={200}
                                            overscanBy={4}
                                        ></Masonry>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
