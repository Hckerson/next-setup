import {
    BaseImage,
    StatLabel,
    MonthlyData,
    BaseLocation,
    BaseChartData,
    DailyData,
    YearlyData,
} from "./index";

export interface DashboardMetrics {
    user: Metrics;
    entry: Metrics;
    school: Metrics;
    revenue: Metrics;
}

export interface UserStats {
    id: string;
    featured: number;
    submissions: number;
    badgesEarned: number;
    achievements: number;
    topPercentile: number;
    sparksCollected: number;
    dreamsFulfilled: number;
    avgCreativityScore: number;
    competitionsEntered: number;
}

export interface Metrics extends BaseChartData {
    dailyData?: DailyData;
    yearlyData?: YearlyData;
    monthlyData?: MonthlyData;
}

export interface LeaderBoardData extends BaseImage, BaseLocation {
    id: string;
    name: string;
}

export interface MetricCardItems extends BaseImage, StatLabel {
    id: string;
    figure: number;
    bgColor: Colors;
    darky?: boolean;
}
