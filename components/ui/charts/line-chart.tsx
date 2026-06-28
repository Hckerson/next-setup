"use client";
import clsx from "clsx";
import { useState } from "react";
import { poppins } from "@/public/fonts/font";
import {
    LineChart,
    Tooltip,
    Line,
    TooltipContentProps,
    ResponsiveContainer,
} from "recharts";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export default function CustomLineChart({ data }: { data: any }) {
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                style={{
                    maxWidth: "700px",
                }}
                data={data}
                margin={{
                    top: 50,
                    right: 12.5,
                    left: 12.5,
                    bottom: 0,
                }}
                className="outline-none"
            >
                <Tooltip content={CustomTooltip} cursor={false} />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#045FE1"
                    strokeWidth={3}
                    isAnimationActive={isAnimating}
                />
                <Line
                    type="monotone"
                    dataKey="lastValue"
                    strokeWidth={5}
                    stroke="#045FE133"
                    isAnimationActive={isAnimating}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

const CustomTooltip = ({
    payload,
    label,
    active,
}: TooltipContentProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return (
            <div
                className={clsx(
                    "relative flex w-fit items-end gap-x-2 rounded-lg bg-[#3d639933]/70 px-2 py-1 shadow-xl",
                    poppins.className,
                )}
            >
                <p className="xs-text text-white">
                    {payload[0]?.payload?.name}
                </p>
                <div>
                    <div className="flex items-center gap-x-2">
                        <div className="h-2 w-2 rounded-full bg-[#045FE1]"></div>
                        <p className="xs-text font-medium text-white">
                            {Number.isInteger(payload[0]?.value) ? payload[0]?.value : Number.parseFloat(
                                payload[0]?.value as string,
                            ).toFixed(2)}
                        </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="h-2 w-2 rounded-full bg-[#006aff33]"></div>
                        <p className="xs-text font-medium text-white">
                            {payload[1]?.value}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};
