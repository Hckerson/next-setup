import clsx from "clsx";
import { antonSc } from "@/public/fonts/font";
import type { StatLabel, BaseChartData } from "@/lib/interface";

export const StatsCard = ({
    data,
    liveData,
}: {
    data: StatLabel;
    liveData: BaseChartData;
}) => {
    const { label, time } = data;
    const { change = 0, currentFigure, trend = "up" } = liveData;
    return (
        <div
            className={clsx(
                "xs:p-5 flex-1 rounded-xl bg-[#051726] p-4 sm:rounded-2xl",
                antonSc.className,
            )}
        >
            <div className="w-full gap-y-3">
                <p className="xs-text">{label}</p>
                <p className={clsx("base-text", antonSc.className)}>
                    {currentFigure}
                </p>
                <span
                    className="text-[12px] sm:text-[14px]"
                    style={{
                        color:
                            label == "Pending Approvals"
                                ? "yellow"
                                : trend == "down"
                                  ? "red"
                                  : "green",
                    }}
                >
                    {trend == "up" ? `+${change}` : `-${change}`}
                    {label !== "Pending Approvals" && "%"}
                    {` `}
                    {time}
                </span>
            </div>
        </div>
    );
};
