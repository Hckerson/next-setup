"use client";
import {
    Sector,
    Pie,
    PieChart,
    ResponsiveContainer,
    PieSectorShapeProps,
} from "recharts";


// #endregion
export default function CustomPieChart({
    isAnimationActive,
    data,
    colors
}: {
    isAnimationActive?: boolean;
    data: any[];
    colors: string[]
}) {
    const MyCustomPie = (props: PieSectorShapeProps) => (
        <Sector {...props} fill={colors[props.index % colors.length]} />
    );
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart responsive>
                <Pie
                    data={data}
                    innerRadius="40%"
                    outerRadius="80%"
                    // Corner radius is the rounded edge of each pie slice
                    cornerRadius="50%"
                    // padding angle is the gap between each pie slice
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={isAnimationActive}
                    shape={MyCustomPie}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
