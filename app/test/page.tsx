import CustomLineChart from "@/components/ui/charts/line-chart";

export default function Test() {
    interface Data {
        name: string;
        uv: number;
        pv: number;
    }

    const monthlyChartData: Data[] = [
        { name: "Day 1", uv: 4000, pv: 2400 },
        { name: "Day 2", uv: 3000, pv: 1398 },
        { name: "Day 3", uv: 2000, pv: 9800 },
        { name: "Day 4", uv: 2780, pv: 3908 },
        { name: "Day 5", uv: 1890, pv: 4800 },
        { name: "Day 6", uv: 2390, pv: 3800 },
        { name: "Day 7", uv: 3490, pv: 4300 },
        { name: "Day 8", uv: 4000, pv: 2400 },
        { name: "Day 9", uv: 3000, pv: 1398 },
        { name: "Day 10", uv: 2000, pv: 9800 },
    ];
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <CustomLineChart data={monthlyChartData} />
        </div>
    );
}
