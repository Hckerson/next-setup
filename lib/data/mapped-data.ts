import type {
    Label,
    Meta,
    Steps,
    Navlink,
    SideLinks,
    LaneItems,
    PackageCard,
    StatLabel,
    SocialMedias,
    QuickActions,
    SellingPoint,
    InfoCardData,
    Contest,
    Participant,
    LeaderBoardData,
    CreativeQuiz,
    CertificateData,
    SubmissionData,
    RecommendedProfile,
    MonthlyData,
    Metrics,
} from "@/lib/interface";
import { judges, schools, users } from "./placeholder-data";
import { ContestStatus, EntryCategory, Month } from "../enums/enums";

const navlinks: Navlink[] = [
    { name: "The arena", link: "/arena", visible: "sm" },
    { name: "Contest", link: "/competitions", visible: "md" },
    { name: "How it works", link: "/how-it-works", visible: "md" },
    { name: "leaderboard", link: "/national-leaderboard", visible: "lg" },
    { name: "Pricing", link: "/pricing", visible: "lg" },
    { name: "Gallery", link: "/gallery", visible: "lg" },
];

const participantTypeData: Participant[] = [
    {
        imageSrc: "/images/avatars/speaker-avatar.png",
        role: "The Speaker",
        description: "The Speaker",
        color: "yellow",
    },
    {
        imageSrc: "/images/avatars/gamehead-avatar.png",
        role: "The Gamehead",
        description: "Builder of logic and fun",
        color: "orange",
    },
    {
        imageSrc: "/images/avatars/visionary-avatar.png",
        role: "The Visionary",
        description: "Sees stories before the world does",
        color: "green",
    },
    {
        imageSrc: "/images/avatars/illustrator-avatar.png",
        role: "The Illustrator",
        description: "Brings dreams to life in color",
        color: "cyan",
    },
    {
        imageSrc: "/images/avatars/performer-avatar.png",
        role: "The Performer",
        description: "Becomes the moment",
        color: "blue",
    },

    {
        imageSrc: "/images/avatars/scribe-avatar.png",
        role: "The Scribe",
        description: "Write magic into the margins",
        color: "pink",
    },
    {
        imageSrc: "/images/avatars/sound-crafter-avatar.png",
        role: "The Sound-crafter",
        description: "Hears what other miss",
        color: "green",
    },
    {
        imageSrc: "/images/avatars/tinkerer-avatar.png",
        role: "The Tinkerer",
        description: "Never stops building",
        color: "red",
    },
];

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
        category: EntryCategory.FILM,
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

        category: EntryCategory.GAME_DESIGN,
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
        category: EntryCategory.ANIMATION,
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

const submissionsData: SubmissionData[] = [
    {
        category: "Anemation",
        authorName: "fatima musa",
        schoolName: "Queens College, Lagos",
    },
    {
        category: "Danny Nguyen",
        authorName: "Aimuzo Ibu",
        schoolName: "Bayview High School",
    },
    {
        category: "Music Beat",
        authorName: "Ademide Iretioluwa",
        schoolName: "Poly international college, Ogun",
    },
];

const steps: Steps[] = [
    {
        number: "01",
        action: "Sign Up",
        description:
            "Go to www.playwork.com to sign up now to enjoy what we have for you",
    },
    {
        number: "02",
        action: "Join a Challenge",
        description: "Bring out the best in you by joining challenges",
    },
    {
        number: "03",
        action: "Get Mentorship",
        description: "Get mentored by the best of the best",
    },
    {
        number: "04",
        action: "Showcase Work",
        description:
            "Showcase your work to fellow like-minds and the world at large",
    },
    {
        number: "05",
        action: "Win and grow",
        description: "Win and grow with playwork",
    },
];

const socialMedias: SocialMedias[] = [
    {
        name: "X",
        link: "/",
        imageSrc: "/images/general/x.png",
    },
    {
        name: "Linkedin",
        link: "/",
        imageSrc: "/images/general/linkedin.png",
    },
    {
        name: "Facebook",
        link: "/",
        imageSrc: "/images/general/facebook.png",
    },
    {
        name: "Instagram",
        link: "/",
        imageSrc: "/images/general/instagram.png",
    },
    {
        name: "Reddit",
        link: "/",
        imageSrc: "/images/general/reddit.png",
    },
];

const recommendedProfile: RecommendedProfile[] = [
    {
        id: "rec-1",
        color: "orange",
        imageSrc: "/images/avatars/speaker-avatar.png",
        topic: "Future Creators STEM Hackathon",
        tags: [
            "#STEMHackathon",
            "#FutureTech",
            "#Innovation",
            "#ProblemSolvers",
        ],
        participants: 186,
        totalSubmissions: 1200,
        description: "",
        name: "Speak for Change Challenge",
        startDate: "2026-05-15T00:00:00.000Z",
        endDate: "2026-08-15T23:59:59.999Z",
        category: EntryCategory.FILM,

        prize: {
            first: 50000,
            second: 30000,
            third: 20000,
        },

        profile: {
            name: "The Visionary",
            description: "Bold ideas, speaks clearly",
            categories: ["Public speaking", "storytelling", "poetry"],
        },
    },
    {
        id: "rec-2",
        color: "cyan",

        imageSrc: "/images/avatars/speaker-avatar.png",
        topic: "Future Creators STEM Hackathon",
        tags: [
            "#STEMHackathon",
            "#FutureTech",
            "#Innovation",
            "#ProblemSolvers",
        ],
        participants: 186,
        totalSubmissions: 1200,
        description: "",
        name: "Speak for Change Challenge",
        startDate: "2026-05-15T00:00:00.000Z",
        endDate: "2026-08-15T23:59:59.999Z",
        category: EntryCategory.FILM,
        prize: {
            first: 50000,
            second: 30000,
            third: 20000,
        },

        profile: {
            name: "The Creator",
            description: "Thinks in rhythms or melodies",
            categories: ["Sound Design", "Music", "Audio Drama"],
        },
    },
    {
        id: "rec-3",
        color: "green",
        imageSrc: "/images/avatars/speaker-avatar.png",
        topic: "Future Creators STEM Hackathon",
        tags: [
            "#STEMHackathon",
            "#FutureTech",
            "#Innovation",
            "#ProblemSolvers",
        ],
        participants: 186,
        totalSubmissions: 1200,
        description: "",
        name: "Speak for Change Challenge",
        startDate: "2026-05-15T00:00:00.000Z",
        endDate: "2026-08-15T23:59:59.999Z",
        category: EntryCategory.FILM,
        prize: {
            first: 50000,
            second: 30000,
            third: 20000,
        },

        profile: {
            name: "The BUILDER",
            description: "Tinkers, solves, invents",
            categories: ["STEM hackathons", "Product Design"],
        },
    },
    {
        id: "rec-4",
        color: "purple",
        imageSrc: "/images/avatars/speaker-avatar.png",
        topic: "Future Creators STEM Hackathon",
        tags: [
            "#STEMHackathon",
            "#FutureTech",
            "#Innovation",
            "#ProblemSolvers",
        ],
        participants: 186,
        totalSubmissions: 1200,
        description: "",
        name: "Speak for Change Challenge",
        startDate: "2026-05-15T00:00:00.000Z",
        endDate: "2026-08-15T23:59:59.999Z",
        category: EntryCategory.FILM,
        prize: {
            first: 50000,
            second: 30000,
            third: 20000,
        },

        profile: {
            name: "The ARTIST",
            description: "Bold ideas, speaks clearly",
            categories: ["Drawing", "Digital Art", "Fashion Design"],
        },
    },
    {
        id: "rec-5",
        color: "red",
        imageSrc: "/images/avatars/speaker-avatar.png",
        topic: "Future Creators STEM Hackathon",
        tags: [
            "#STEMHackathon",
            "#FutureTech",
            "#Innovation",
            "#ProblemSolvers",
        ],
        participants: 186,
        totalSubmissions: 1200,
        description: "",
        name: "Speak for Change Challenge",
        startDate: "2026-05-15T00:00:00.000Z",
        endDate: "2026-08-15T23:59:59.999Z",
        category: EntryCategory.FILM,
        prize: {
            first: 50000,
            second: 30000,
            third: 20000,
        },

        profile: {
            name: "The Director",
            description: "Bold ideas, speaks clearly",
            categories: ["Film", "Short Docs", "Skits"],
        },
    },
];

const leaderBoardData: LeaderBoardData[] = [
    {
        id: "leader-1",
        name: "Adaeze Obi",

        country: ", South Africa",
        state: "Pretoria",
        imageSrc: "/images/general/adaeze.png",
    },
    {
        id: "leader-2",
        name: "Kabiru Danjuma",

        country: "Lagos",
        state: "Nigeria",
        imageSrc: "/images/general/kabiru.png",
    },
    {
        id: "leader-3",
        name: "Jamilu Umar",

        country: "Ghana",
        state: "Accra",
        imageSrc: "/images/general/umar.png",
    },
];

const creativeQuiz: CreativeQuiz[] = [
    {
        id: "1",
        contest: {} as any,
        contestId: "1",
        createdAt: "2026-01-11T00:00:00.000Z",
        question: "What’s your creative superpower? (Choose one)",
        options: [
            "Solving tough logic and coding challenges",
            "Bringing stories to life through animation",
            "Visualizing new product or tech ideas",
            "Solving problems in creative ways",
            "Innovating by rethinking design differently",
        ],
    },
    {
        id: "2",
        contest: {} as any,
        contestId: "2",
        createdAt: "2026-01-11T00:00:00.000Z",
        question: "If you had a free weekend, you’d most likely… (Choose one)",
        options: [
            "Prototype a new app or invention",
            "Write or record videos for fun projects",
            "Draw, paint, or build creative crafts",
            "Design graphics or social content",
            "Read about the newest trends in STEM",
        ],
    },
    {
        id: "3",
        contest: {} as any,
        contestId: "3",
        createdAt: "2026-01-11T00:00:00.000Z",
        question: "What’s your favorite way to express yourself? (Choose one)",
        options: [
            "Storytelling or writing",
            "Visual arts or design",
            "Music or sound creation",
            "Designing things or building stuff",
            "Analyzing, inventing, or coding tools",
        ],
    },
    {
        id: "4",
        contest: {} as any,
        contestId: "4",
        createdAt: "2026-01-11T00:00:00.000Z",
        question: "What kind of school subject excites you most? (Choose one)",
        options: [
            "Science and discovery",
            "Math or logic challenges",
            "Subjects that fuel creativity",
            "Technology or innovation studies",
            "Storytelling or communication classes",
        ],
    },
    {
        id: "5",
        contest: {} as any,
        contestId: "5",
        createdAt: "2026-01-11T00:00:00.000Z",
        question: "Your friends describe you as… (Choose one)",
        options: [
            "The imaginative creator",
            "The logical problem-solver",
            "The tech-savvy one",
            "The storyteller",
            "The artist",
        ],
    },
];

const aboutData: InfoCardData[] = [
    {
        imageSrc: "/images/general/star-cup.png",
        description:
            "National Recognition through verified creative competitions",
        background: "green",
    },
    {
        imageSrc: "/images/general/star-idea.png",
        description:
            "Curriculum-aligned challenges that build 21st-century skills",
        background: "pink",
    },
    {
        imageSrc: "/images/general/star-data.png",
        description:
            "Admin dashboards to monitor student entries & performance",
        background: "violet",
    },
    {
        imageSrc: "/images/general/star-handshake.png",
        description:
            "Direct links to Ministry of Education + Corporate Partners",
        background: "orange",
    },
];

const pointsData: InfoCardData[] = [
    {
        imageSrc: "/images/general/ball.png",
        description:
            "National Recognition through verified creative competitions",
        background: "ash",
        title: "Safe Upload Zones",
    },
    {
        imageSrc: "/images/general/ball.png",
        description:
            "Curriculum-aligned challenges that build 21st-century skills",
        background: "ash",
        title: "Feedback Loop",
    },
    {
        imageSrc: "/images/general/ball.png",
        description:
            "Admin dashboards to monitor student entries & performance",
        background: "ash",
        title: "Verified Privacy",
    },
    {
        imageSrc: "/images/general/ball.png",
        description:
            "Direct links to Ministry of Education + Corporate Partners",
        background: "ash",
        title: "Growth Focused Loop",
    },
];

const commitmentData: InfoCardData[] = [
    {
        imageSrc: "/images/general/gavel.png",
        title: "Transparent Judging",
        background: "transparent",
        description:
            "Every entry is reviewed fairly by real mentors and judges — no bias, just talent.",
    },
    {
        imageSrc: "/images/general/no-ads.png",
        title: "No Ads, No Exploitation",
        background: "transparent",
        description:
            "Your child’s creativity isn’t for sale — no distractions, no hidden agenda.",
    },
    {
        imageSrc: "/images/general/target.png",
        title: "Purpose Over Popularity",
        background: "transparent",
        description:
            "It’s not about likes or clout — it’s about growth, learning, and real recognition.",
    },
];

const feastActivities: Label[] = [
    { color: "green", label: "Competitions" },
    { color: "orange", label: "Awards" },
    { color: "cyan", label: "Installations" },
    { color: "purple", label: "Animation previews" },
    { color: "red", label: "Panels" },
    { color: "ash", label: "Market Zones" },
    { color: "violet", label: "Showcases" },
    { color: "cyan", label: "Games" },
    { color: "pink", label: "AI demos" },
];

const packages: PackageCard[] = [
    {
        iconSrc: "/svgs/community.svg", // replace with actual icon path if known
        title: "SCHOOL GROUP",
        color: "green", // or hex: #39FF14 / lime green
        memberCount: 10,
        inclusions: [
            { iconSrc: "/svgs/access.svg", label: "Access" },
            { iconSrc: "/svgs/merch.svg", label: "Merch" },
            { iconSrc: "/svgs/car-seat.svg", label: "Workshop seats" },
        ],
    },
    {
        iconSrc: "/svgs/group.svg",
        title: "PARENT & CHILD",
        color: "pink", // hot pink
        memberCount: 2,
        inclusions: [
            { iconSrc: "/svgs/access.svg", label: "Full access" },
            { iconSrc: "/svgs/family-zone.svg", label: "Family zone" },
        ],
    },
    {
        iconSrc: "/svgs/paint-brush.svg",
        title: "PREMIUM FILM",
        color: "yellow", // bright yellow
        memberCount: 1,
        inclusions: [
            { iconSrc: "/svgs/access.svg", label: "Full fest" },
            { iconSrc: "/svgs/vip-zone.svg", label: "VIP zone" },
            { iconSrc: "/svgs/slot.svg", label: "Feature slot" },
        ],
    },
    {
        iconSrc: "/svgs/circle.svg",
        title: "GENERAL",
        color: "orange", // coral/orange
        memberCount: 1,
        inclusions: [{ iconSrc: "/svgs/access.svg", label: "Full access" }],
    },
];

const sponsorCategories: Label[] = [
    {
        label: "Scholarship Donors",
        color: "green",
    },
    {
        label: "Awards Sponsors",
        color: "pink",
    },
    {
        label: "Zone Sponsors",
        color: "orange",
    },
    {
        label: "Product Installations",
        color: "purple",
    },
];

const sellingPoint: SellingPoint[] = [
    { label: "SCHOOLS REACHED", figure: 712, color: "orange" },
    { label: "YOUTHS IMPACTED", figure: 14000, color: "pink" },
    { label: "CHALLENGES HOSTED", figure: 28, color: "purple" },
    { label: "COUNTRIES TARGETED", figure: 712, color: "green" },
    { label: "AI INTEGRATED TOOLS", figure: 7, color: "ash" },
    { label: "MENTORS", figure: 103, color: "red" },
];

const laneItems: LaneItems[] = [
    {
        dir: "rtl" as const,
        title: "NGOS & DEV ORGS",
        label: "Co-design a Challenge",
        description: "Impact-focused partners aligned with SDGs",
    },
    {
        dir: "rtl" as const,
        title: "TECH FIRMS",
        label: "Enable a Toolset",
        description: "Tool & platform donors (AI, design, video)",
    },
    {
        dir: "ltr" as const,
        title: "SPONSORS",
        label: "Sponsor a Category",
        description: "Brands seeking creative, youth-focused visibility",
    },
    {
        dir: "ltr" as const,
        title: "EDUCATION BOARDS",
        label: "Join Our National Program",
        description: "Ministries, schools, district networks",
    },
    {
        dir: "ltr" as const,
        title: "MEDIA HOUSES",
        label: "Feature Young Creators",
        description: "Broadcast, storytellers, coverage partners",
    },
];

const offerings: Label[] = [
    { color: "orange", label: "CO-BRANDED COMPETITIONS" },
    { color: "pink", label: "VISIBILITY ACROSS YOUTH AND PARENT AUDIENCES" },
    { color: "green", label: "CUSTOM DATA DASHBOARDS" },
    { color: "violet", label: "SOCIAL GOOD STORYTELLING" },
    { color: "cyan", label: "TALENT SOURCING PIPELINE" },
    { color: "red", label: "PANEL SPEAKING SLOTS AT MAKANAKI FEST" },
    { color: "yellow", label: "SCHOLARSHIP OR GRANT DELIVERY FRAMEWORK" },
    { color: "purple", label: "NATIONWIDE IMPACT DOCUMENTATION" },
];

const menuLabels: string[] = [
    "Edit school profile info",
    "Add teacher admins",
    "Payment history and renewals",
    "Request mentorship sessions",
    "Support ticket",
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

const badgesData = [
    { key: "aqua-shield", value: "/images/badges/aqua-shield.png" },
    { key: "champion-seal", value: "/images/badges/champion-seal.png" },
    { key: "crown-gem", value: "/images/badges/crown-gem.png" },
    { key: "fire-medal", value: "/images/badges/fire-medal.png" },
    { key: "general", value: "/images/badges/general.png" },
    { key: "golden-knight", value: "/images/badges/golden-knight.png" },
    { key: "grand-master", value: "/images/badges/grand-master.png" },
    { key: "guardian-star", value: "/images/badges/guardian-star.png" },
    { key: "heart-medal", value: "/images/badges/heart-medal.png" },
    { key: "hero-star", value: "/images/badges/hero-star.png" },
    { key: "ice-core", value: "/images/badges/ice-core.png" },
    { key: "leaf-medal", value: "/images/badges/leaf-medal.png" },
    {
        key: "most-popular-badge",
        value: "/images/badges/most-popular-badge.png",
    },
    { key: "nature-star", value: "/images/badges/nature-star.png" },
    { key: "passion-medal", value: "/images/badges/passion-medal.png" },
    { key: "platinum-trophy", value: "/images/badges/platinum-trophy.png" },
    { key: "position-badge", value: "/images/badges/position-badge.png" },
    { key: "royal-crest", value: "/images/badges/royal-crest.png" },
    { key: "shining-merit", value: "/images/badges/shining-merit.png" },
    { key: "silver-trophy", value: "/images/badges/silver-trophy.png" },
    { key: "sun-core", value: "/images/badges/sun-core.png" },
    { key: "valor-shield", value: "/images/badges/valor-shield.png" },
    { key: "water-medal", value: "/images/badges/water-medal.png" },
];

const statsData = [
    { key: "badge", value: "/images/stats/badge.png" },
    { key: "calendar", value: "/images/stats/calendar.png" },
    { key: "fire", value: "/images/stats/fire.png" },
    { key: "flash", value: "/images/stats/flash.png" },
    { key: "love", value: "/images/stats/love.png" },
    { key: "paper-plane", value: "/images/stats/paper-plane.png" },
    { key: "scroll", value: "/images/stats/scroll.png" },
    { key: "sparkles", value: "/images/stats/sparkles.png" },
    { key: "trophy", value: "/images/stats/trophy.png" },
];

const certificateCards: CertificateData[] = [
    {
        imageSrc: "/images/general/certificate.png",
        title: "Certificate of Participation in the Playwork Dreams Challenge",
        downloadLink: "",
    },
    {
        imageSrc: "/images/general/certificate.png",
        title: "Certificate of Achievement in the Playwork National Creative Series",
        downloadLink: "",
    },
    {
        imageSrc: "/images/general/certificate.png",
        title: "SPECIAL: Certificate of the Creative Dreamer",
        downloadLink: "",
    },
];

const placeholderMonthlyData: MonthlyData = [
    { name: Month.JAN, value: 400, lastValue: 240 },
    { name: Month.FEB, value: 300, lastValue: 139 },
    { name: Month.MAR, value: 200, lastValue: 980 },
    { name: Month.APR, value: 278, lastValue: 390 },
    { name: Month.MAY, value: 189, lastValue: 480 },
    { name: Month.JUN, value: 239, lastValue: 380 },
    { name: Month.JUL, value: 349, lastValue: 430 },
    { name: Month.AUG, value: 400, lastValue: 240 },
    { name: Month.SEP, value: 300, lastValue: 139 },
    { name: Month.OCT, value: 200, lastValue: 980 },
    { name: Month.NOV, value: 278, lastValue: 390 },
    { name: Month.DEC, value: 189, lastValue: 480 },
];

const defaultMetrics: Metrics = {
    change: 0,
    currentFigure: 0,
    trend: "up",
    monthlyData: placeholderMonthlyData,
};

const slow = 0.2;
const fast = 0.1;

export {
    slow,
    fast,
    steps,
    navlinks,
    packages,
    laneItems,
    aboutData,
    offerings,
    chartData,
    sideLinks,
    userStats,
    statsData,
    pointsData,
    badgesData,
    menuLabels,
    schoolStats,
    quickActions,
    creativeQuiz,
    sellingPoint,
    contestStats,
    socialMedias,
    commitmentData,
    submissionsData,
    leaderBoardData,
    feastActivities,
    featuredCardData,
    certificateCards,
    mentorsStatsLabel,
    sponsorCategories,
    activeSchoolStats,
    sessionStatsLabel,
    financeStatsLabel,
    activeContestStats,
    recommendedProfile,
    analyticStatsLabel,
    participantTypeData,
};
