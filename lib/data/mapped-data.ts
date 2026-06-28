import type {
    StatLabel,
    SideLinks,
    QuickActions,
    Contest,
} from "@/lib/interface";
import { judges, users } from "./placeholder-data";
import { ContestStatus, ContestCategory } from "../enums/enums";

const featuredCardData: Contest[] = [
    {
        id: "all-comp-1",
        createdAt: "2026-01-11T00:00:00.000Z",
        topic: "Speak for Change Challenge",
        tags: ["STEMHackathon", "FutureTech", "ProblemSolvers"],
        imageSrc: "/images/avatars/speaker-avatar.png",
        color: "orange",
        participants: 186,
        name: "Speak for Change Challenge",
        totalSubmissions: 5,
        schools: [],
        students: [],
        mentors: [],
        description: "",
        category: ContestCategory.ANIMATION,
        startDate: "2026-05-15T00:00:00.000Z",
        endDate: "2026-08-15T23:59:59.999Z",

        prize: {
            first: 50000,
            second: 30000,
            third: 20000,
        },
        target: 5000,
        status: ContestStatus.ACTIVE,
        winners: {
            first: users[0],
            second: users[1],
            third: users[2],
        },

        judgeActivities: [
            {
                "Sweep the Desert": {
                    completedBy: [
                        judges[0].user.fullName,
                        judges[1].user.fullName,
                    ],
                },
            },
            {
                "Mop the Ocean": {
                    completedBy: [
                        judges[0].user.fullName,
                        judges[2].user.fullName,
                    ],
                },
            },
            {
                "Cool the sun": {
                    completedBy: [
                        judges[0].user.fullName,
                        judges[2].user.fullName,
                    ],
                },
            },
        ],
        // New Mock Data
        pendingReviews: 0,
        rejected: 120,
        views: 15400,
        engagementRate: 8.5,
        totalReviews: 1450,
        approvalRate: 95,
        avgRating: 4.8,
        todos: {
            contestDetails: true,
            judges: false,
            prizeConfiguration: true,
            MarketAssetConfiguration: true,
            ScheduledEmails: false,
        },
        judges: judges.slice(0, 5),
        paymentDetails: {
            time: new Date(),
            status: "held",
        },
        participationRewards: {
            all: 25,
            finalist: 100,
        },
    },
    {
        id: "all-comp-2",
        createdAt: "2026-01-11T00:00:00.000Z",
        topic: "One-Minute Film Contest",
        tags: ["STEMHackathon", "FutureTech", "ProblemSolvers"],
        imageSrc: "/images/avatars/visionary-avatar.png",
        color: "red",
        participants: 186,
        name: "One-Minute Film Contest",
        totalSubmissions: 5,
        schools: [],
        students: [],
        mentors: [],
        description: "",

        category: ContestCategory.STEM,
        startDate: "2026-05-15T00:00:00.000Z",
        endDate: "2026-08-15T23:59:59.999Z",
        prize: {
            first: 50000,
            second: 30000,
            third: 20000,
        },
        status: ContestStatus.ACTIVE,
        judgeActivities: [
            {
                "Sweep the Desert": {
                    completedBy: [
                        judges[0].user.fullName,
                        judges[1].user.fullName,
                    ],
                },
            },
            {
                "Mop the Ocean": {
                    completedBy: [
                        judges[0].user.fullName,
                        judges[2].user.fullName,
                    ],
                },
            },
            {
                "Cool the sun": {
                    completedBy: [
                        judges[0].user.fullName,
                        judges[2].user.fullName,
                    ],
                },
            },
        ],
        // New Mock Data
        pendingReviews: 45,
        rejected: 12,
        views: 8200,
        engagementRate: 12.3,
        winners: {
            first: users[0],
            second: users[1],
            third: users[2],
        },
        judges: judges.slice(0, 5),
        paymentDetails: {
            time: new Date(),
            status: "held",
        },
        participationRewards: {
            all: 25,
            finalist: 100,
        },
        totalReviews: 870,
        approvalRate: 98,
        avgRating: 4.9,
        todos: {
            contestDetails: true,
            judges: true,
            prizeConfiguration: true,
            MarketAssetConfiguration: true,
            ScheduledEmails: true,
        },
    },
    {
        id: "all-comp-3",
        createdAt: "2026-01-11T00:00:00.000Z",
        topic: "Future Africa Poster Design",
        tags: ["STEMHackathon", "FutureTech", "ProblemSolvers"],
        imageSrc: "/images/avatars/speaker-avatar.png",

        participants: 186,
        name: "Future Africa Poster Design",
        totalSubmissions: 5,
        schools: [],
        students: [],
        mentors: [],
        description: "",
        color: "purple",
        category: ContestCategory.FILM,
        startDate: "2026-05-15T00:00:00.000Z",
        endDate: "2026-08-15T23:59:59.999Z",
        prize: {
            first: 50000,
            second: 30000,
            third: 20000,
        },
        status: ContestStatus.ACTIVE,
        judgeActivities: [
            {
                "Sweep the Desert": {
                    completedBy: [
                        judges[0].user.fullName,
                        judges[1].user.fullName,
                    ],
                },
            },
            {
                "Mop the Ocean": {
                    completedBy: [
                        judges[0].user.fullName,
                        judges[2].user.fullName,
                    ],
                },
            },
            {
                "Cool the sun": {
                    completedBy: [
                        judges[0].user.fullName,
                        judges[2].user.fullName,
                    ],
                },
            },
        ],
        // New Mock Data
        pendingReviews: 1123,
        rejected: 0,
        views: 4500,
        engagementRate: 5.1,
        winners: {
            first: users[0],
            second: users[1],
            third: users[2],
        },
        judges: judges.slice(0, 5),
        paymentDetails: {
            time: new Date(),
            status: "held",
        },
        participationRewards: {
            all: 25,
            finalist: 100,
        },
        totalReviews: 78,
        approvalRate: 100,
        avgRating: 5.0,
        todos: {
            contestDetails: true,
            judges: false,
            prizeConfiguration: true,
            MarketAssetConfiguration: false,
            ScheduledEmails: false,
        },
    },
];


const sideLinks: SideLinks[] = [
    {
        label: "Overview",
        link: "/",
        imageSrc: "/images/general/icon-stats.png",
    },
    {
        label: "Content",
        link: "/content",
        imageSrc: "/images/general/icon-content.png",
    },
    {
        label: "Users",
        link: "/users",
        imageSrc: "/images/general/icon-users.png",
    },
    {
        label: "Contests",
        link: "/contests",
        imageSrc: "/images/general/icon-contests.png",
    },
    {
        label: "Finance",
        link: "/finance",
        imageSrc: "/images/general/icon-finance.png",
    },
    {
        label: "Analytics",
        link: "/analytics",
        imageSrc: "/images/general/icon-analytics.png",
    },
    {
        label: "Schools",
        link: "/schools",
        imageSrc: "/images/general/icon-schools.png",
    },
    {
        label: "Mentors",
        link: "/mentors",
        imageSrc: "/images/general/icon-mentors.png",
    },
];

const quickActions: QuickActions[] = [
    {
        label: "New Contest",
        imageSrc: "/images/general/icon-new.png",
        link: "/dashboard/admin/",
    },
    {
        label: "Add User",
        imageSrc: "/images/general/icon-users.png",
        link: "/dashboard/admin/",
    },
    {
        label: "Process Payout",
        imageSrc: "/images/general/icon-card.png",
        link: "/dashboard/admin/",
    },
    {
        label: "Generate Report",
        imageSrc: "/images/general/icon-report.png",
        link: "/dashboard/admin/",
    },
    {
        label: "Review Content",
        imageSrc: "/images/general/icon-lens.png",
        link: "/dashboard/admin/",
    },
];

const chartData: QuickActions[] = [
    {
        label: "Users",
        imageSrc: "/images/general/icon-users.png",
    },
    {
        label: "Entries",
        imageSrc: "/images/general/icon-content.png",
    },
    {
        label: "Schools",
        imageSrc: "/images/general/icon-schools.png",
    },
    {
        label: "Revenue",
        imageSrc: "/images/general/dollar-bundle.png",
    },
    {
        label: "Activity Timeline",
        imageSrc: "/images/general/icon-bell.png",
    },
    {
        label: "Recent Activity",
        imageSrc: "/images/general/icon-bell.png",
    },
];

const userStats: StatLabel[] = [
    {
        label: "Total Users",
        time: "this month",
    },
    {
        label: "Active Users",
        time: "this month",
    },
    {
        label: "Pending Approvals",
        time: "new",
    },
    {
        label: "Suspended Accounts",
        time: "this month",
    },
];

const analyticStatsLabel: StatLabel[] = [
    {
        label: "Total Users",
        time: "this month",
    },
    {
        label: "Active Users",
        time: "this month",
    },
    {
        label: "New Users",
        time: "this month",
    },
    {
        label: "Submissions",
        time: "this month",
    },
    {
        label: "Competitions",
        time: "new this month",
    },
    {
        label: "Total Revenue",
        time: "this month",
    },
];

const EngagementStatsLabel: StatLabel[] = [
    {
        label: "Visitors",
        time: "",
    },
    {
        label: "Signups",
        time: " Conversion",
    },
    {
        label: "Active Users",
        time: "of sign ups",
    },
    {
        label: "Submitted Entry",
        time: " of active users",
    },
    {
        label: "Finalists",
        time: "of submissions",
    },
    {
        label: "Winners",
        time: "of submissions",
    },
];

const coreEngagementStatsLabel: StatLabel[] = [
    {
        label: "Average Session Duration",
        time: "",
    },
    {
        label: "Pages per Session",
        time: "",
    },
    {
        label: "Bounce Rate",
        time: "",
    },
    {
        label: "Return Rate",
        time: "",
    },
];

const mentorsStatsLabel: StatLabel[] = [
    {
        label: "Active Mentors",
        time: "this month",
    },
    {
        label: "Sessions",
        time: "this month",
    },
    {
        label: "Total Paid",
        time: "this month",
    },
    {
        label: "Average Rating",
        time: "this month",
    },
    {
        label: "Active Now",
        time: "this month",
    },
    {
        label: "Issues",
        time: "this month",
    },
];

const mentorPaymentStatsLabel: StatLabel[] = [
    {
        label: "Pending Payouts",
    },
    {
        label: "Processing",
    },
    {
        label: "Paid",
    },
    {
        label: "Failed",
    },
    {
        label: "On Hold",
    },
    {
        label: "Total (all-time)",
    },
];

const financeStatsLabel: StatLabel[] = [
    {
        label: "Total Revenue",
        time: " vs last month",
    },
    {
        label: "Total Prizes",
        time: "vs last month",
    },
    {
        label: "Total Withdrawal",
        time: "vs last month",
    },
    {
        label: "Net Balance",
        time: "this month",
    },
];

const financeAnalyticsStatsLabel: StatLabel[] = [
    {
        label: "Total Revenue",
        time: "",
    },
    {
        label: "Total Expenses",
        time: "",
    },
    {
        label: "Net Profit",
        time: "",
    },
];

const schoolStats: Pick<StatLabel, "label">[] = [
    {
        label: "Total Schools",
    },
    {
        label: "Certified Playwork Hubs",
    },
    {
        label: "Pending Verification",
    },
];

const contestStats: StatLabel[] = [
    {
        label: "Active Contest",
        time: "this month",
    },
    {
        label: "Total Entries",
        time: "this month",
    },
    {
        label: "Total Price Pool",
        time: "vs last period",
    },
    {
        label: "Upcoming contests",
        time: "from last month",
    },
];

const sessionStatsLabel: StatLabel[] = [
    {
        label: "Active Now",
    },
    {
        label: "Sessions This Week",
    },
    {
        label: "Completed",
    },
    {
        label: "Flagged",
    },
    {
        label: "Cancelled",
    },
    {
        label: "Avg. Duration",
    },
];

const activeContestStats: StatLabel[] = [
    {
        label: "Total Entries",
    },
    {
        label: "Total Submissions",
    },
    {
        label: "Pending Review",
    },
    {
        label: "Rejected",
    },
    {
        label: "Views",
    },
    {
        label: "Engagement Rate",
    },
    {
        label: "Schools Participating",
    },
    {
        label: "Created At",
    },
    {
        label: "Total Reviews",
    },
    {
        label: "Approval Rate",
    },
    {
        label: "Avg Rating",
    },
    {
        label: "Views",
    },
    {
        label: "Average",
    },
    {
        label: "Peak submission",
    },
    {
        label: "Predicted final count",
    },
    {
        label: "Last-minute surge expected",
    },
    {
        label: "Total Schools",
    },
    {
        label: "Total Prize Pool",
    },
    {
        label: "1st Place",
    },
    {
        label: "2nd Place",
    },
    {
        label: "3rd Place",
    },
    {
        label: "Page Views",
    },
    {
        label: "Unique Views",
    },
    {
        label: "Avg. Time on Page",
    },
    {
        label: "Time Rate",
    },
];

const activeSchoolStats: StatLabel[] = [
    { label: "Students" },
    { label: "Entries" },
    { label: "Winners" },
    { label: "Total Earned" },
];

const slow = 0.2;
const fast = 0.1;

export {
    slow,
    fast,
    chartData,
    userStats,
    sideLinks,
    schoolStats,
    quickActions,
    contestStats,
    mentorsStatsLabel,
    activeSchoolStats,
    sessionStatsLabel,
    financeStatsLabel,
    activeContestStats,
    analyticStatsLabel,
    EngagementStatsLabel,
    mentorPaymentStatsLabel,
    coreEngagementStatsLabel,
    financeAnalyticsStatsLabel,
    featuredCardData,
};
