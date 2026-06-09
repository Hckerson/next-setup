// placeholder-base.ts
// ─────────────────────────────────────────────────────────────────────────────
// All primitive / stats placeholder data with ZERO inter-placeholder imports.
// Import from here when you need users, transactions, notifications, or chart data.
// ─────────────────────────────────────────────────────────────────────────────

import {
    Chat,
    User,
    Label,
    PulseData,
    Occurence,
    Notification,
    Feedback,
} from "../interface";
import { BaseChartData } from "../interface/base";
import { MetricCardItems } from "../interface/stats";
import { PricingData, Transaction } from "../interface/finance";
import {
    Day,
    Month,
    NotificationCategory,
    NotificationTag,
    TransactionAction,
    TransactionStatus,
    UserAccountStatus,
} from "../enums/enums";

// ─── Users (transactions patched after userTransactions is defined) ───────────

const users: User[] = [
    {
        id: "user-1",
        fullName: "Alice Johnson",
        email: "alice@example.com",
        avatar: "/images/profile/alice.png",
        status: UserAccountStatus.ACTIVE,
        createdAt: new Date(),
        day: Day.MON,
        month: Month.JAN,
        year: 1990,
        transactions: [], // patched below
    },
    {
        id: "user-2",
        fullName: "Bob Smith",
        email: "bob@example.com",
        avatar: "/images/profile/bob.png",
        status: UserAccountStatus.ACTIVE,
        createdAt: new Date(),
        day: Day.TUE,
        month: Month.FEB,
        year: 1992,
        transactions: [], // patched below
    },
    {
        id: "user-3",
        fullName: "Carol Lee",
        email: "carol@example.com",
        avatar: "/images/profile/carol.png",
        status: UserAccountStatus.ACTIVE,
        createdAt: new Date(),
        day: Day.WED,
        month: Month.MAR,
        year: 1994,
        transactions: [], // patched below
    },
];

// ─── Transactions (uses users defined above) ──────────────────────────────────

const userTransactions: Transaction[] = [
    {
        id: "trans-1",
        createdAt: "2026-01-11T00:00:00.000Z",
        referenceMessage: "Weekly Contest Prize",
        bank: "",
        bankReferenceId: "",
        amount: 1500.0,
        action: TransactionAction.DEPOSIT,
        status: TransactionStatus.COMPLETED,
        day: Day.FRI,
        month: Month.APR,
        user: users[0],
        year: 2008,
    },
    {
        id: "trans-2",
        createdAt: "2026-01-11T00:00:00.000Z",
        referenceMessage: "WITHDRAWAL to Zenith Bank",
        bank: "",
        bankReferenceId: "",
        amount: 5000.0,
        action: TransactionAction.WITHDRAWAL,
        status: TransactionStatus.PENDING,
        day: Day.FRI,
        month: Month.APR,
        user: users[0],
        year: 2008,
    },
    {
        id: "trans-3",
        createdAt: "2026-01-11T00:00:00.000Z",
        referenceMessage: "Referral bonus from Zimuzo A.",
        bank: "",
        bankReferenceId: "",
        amount: 250.0,
        action: TransactionAction.DEPOSIT,
        status: TransactionStatus.FAILED,
        day: Day.FRI,
        month: Month.APR,
        user: users[0],
        year: 2008,
    },
];

// Patch user transactions after both arrays are defined
users.forEach((u) => {
    u.transactions = userTransactions;
});

// ─── Notifications ────────────────────────────────────────────────────────────

const notifications: Notification[] = [
    {
        id: "notif-1",
        user: users[0],
        userId: users[0].id,
        isRead: false,
        isAdmin: false,
        critical: false,
        highlight: true,
        description: "Welcome to Playwork! Stay tuned for updates.",
        tag: NotificationTag.FEST,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        category: NotificationCategory.MODERATION,
    },
    {
        id: "notif-2",
        user: users[1],
        userId: users[1].id,
        isRead: false,
        isAdmin: false,
        critical: false,
        highlight: false,
        description: "Your submission deadline has been extended.",
        tag: NotificationTag.DEADLINE,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        category: NotificationCategory.PAYMENT_DELAY,
    },
    {
        id: "notif-3",
        user: users[2],
        userId: users[2].id,
        isRead: false,
        isAdmin: false,
        critical: false,
        highlight: false,
        description: "New result is available for your entry.",
        tag: NotificationTag.RESULT,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        category: NotificationCategory.RECONCILIATION,
    },
];

// ─── Static / config data ─────────────────────────────────────────────────────

const awardCategory: Label[] = [
    { label: "YOUNG CREATOR OF THE YEAR", color: "orange" },
    { label: "BEST SCHOOL SHOWCASE", color: "pink" },
    { label: "DREAMER AWARD", color: "purple" },
];

const pricingData: PricingData[] = [
    {
        id: "price-1",
        type: "FREE ENTRY",
        amount: "₦0",
        span: "",
        bestFor:
            "National programs, pilot challenges, gov't-backed initiatives, NGO support",
        perks: [
            "Maximum participation",
            "Easier school and Ministry endorsement",
            "Revenue source: Sponsors, ministries, partners",
            "Fund prizes & platform fees",
            "Impact (30%)",
        ],
        label: "START CREATING",
        link: "/create",
    },
    {
        id: "price-2",
        type: "STANDARD PAID ENTRY",
        amount: "₦10,000",
        span: "/Month",
        bestFor: "Independent creative challenges, premium competitions",
        perks: [
            "Challenge participation",
            "Submission + visibility",
            "Basic feedback from judges/AI",
            "Revenue source: Sponsors, ministries, partners, fund prizes & platform fees",
            "Payment required for premium competition entry",
        ],
        label: "UNLOCK YOUR SPOT",
        link: "/unlock-spot",
    },
    {
        id: "price-3",
        type: "SCHOOL LICENSE MODEL",
        amount: "₦300,000",
        span: "/Term for up to 100 students",
        bestFor: "Partnered schools, Ministries, private institutions",
        perks: [
            "Access to all national competitions for the term",
            "School-branded dashboard",
            "Submission management system",
            "Criteria-based dashboard for teachers",
            "Certificates for all entries",
            "School name in public leaderboard (if desired)",
            "Custom dashboard",
            "Class-based reports",
            "Private school-only competitions",
            "Teacher/Guardian portal access",
            "Add-on option: ₦150,000 for every additional 50 students",
        ],
        label: "ACTIVATE SCHOOL PLAN",
        link: "/school-plan",
    },
    {
        id: "price-4",
        type: "PREMIUM TRACK / PRO CREATOR PASS",
        amount: "₦30,000",
        span: "/Month",
        bestFor:
            "Creators who want full benefits, mentorship, and portfolio tools",
        perks: [
            "Access to exclusive competitions",
            "Judge feedback with scores",
            "Personalized mentorship tracks",
            "Priority submission placement",
            "Certificate + recommendation letters",
            "Private showcase badge",
            "50% off all payments required for premium competition entry",
        ],
        label: "GO PREMIUM",
        link: "/premium",
    },
];

const metricCardData: MetricCardItems[] = [
    {
        id: "metric-1",
        figure: 82,
        bgColor: "pink",
        imageSrc: "/svgs/vector-avatar.svg",
        label: "Active Students",
    },
    {
        id: "metric-2",
        figure: 9,
        bgColor: "green",
        imageSrc: "/images/stats/flash.png",
        label: "Competitions Joined",
    },
    {
        id: "metric-3",
        figure: 5,
        bgColor: "violet",
        imageSrc: "/images/stats/paper-plane.png",
        label: "Submissions In Progress",
    },
    {
        id: "metric-4",
        figure: 5,
        bgColor: "violet",
        imageSrc: "/images/stats/paper-plane.png",
        label: "Submissions In Progress",
    },
];

const chats: Chat[] = [
    {
        id: "chat-1",
        message:
            "I'm at a crossroads in life and not sure what path to take. How did you.",
        createdAt: "2026-06-18T10:00:00.000Z",
        senderId: "user-1",
        receiverId: "user-2",
    },
    {
        id: "chat-2",
        message:
            "Lately, I've been feeling a bit down and it's affecting my motivation. Ho.",
        createdAt: "2026-06-18T10:00:00.000Z",
        senderId: "user-1",
        receiverId: "user-2",
    },
    {
        id: "chat-3",
        message:
            "I've been dealing with impostor syndrome at work, and its impactin.",
        createdAt: "2026-06-18T10:00:00.000Z",
        senderId: "user-1",
        receiverId: "user-2",
    },
    {
        id: "chat-4",
        message:
            "I'm at a crossroads in life and not sure what path to take. How did you.",
        createdAt: "2026-06-18T10:00:00.000Z",
        senderId: "user-1",
        receiverId: "user-2",
    },
    {
        id: "chat-5",
        message:
            "Lately, I've been feeling a bit down and it's affecting my motivation. Ho.",
        createdAt: "2026-06-18T10:00:00.000Z",
        senderId: "user-1",
        receiverId: "user-2",
    },
    {
        id: "chat-6",
        message:
            "I've been dealing with impostor syndrome at work, and its impactin.",
        createdAt: "2026-06-18T10:00:00.000Z",
        senderId: "user-1",
        receiverId: "user-2",
    },
    {
        id: "chat-7",
        message:
            "I'm at a crossroads in life and not sure what path to take. How did you.",
        createdAt: "2026-06-18T10:00:00.000Z",
        senderId: "user-1",
        receiverId: "user-2",
    },
    {
        id: "chat-8",
        message:
            "Lately, I've been feeling a bit down and it's affecting my motivation. Ho.",
        createdAt: "2026-06-18T10:00:00.000Z",
        senderId: "user-1",
        receiverId: "user-2",
    },
    {
        id: "chat-9",
        message:
            "I've been dealing with impostor syndrome at work, and its impactin.",
        createdAt: "2026-06-18T10:00:00.000Z",
        senderId: "user-1",
        receiverId: "user-2",
    },
];

const pendingFinancials: any[] = [
    {
        id: "pend-fin-1",
        amount: 1500.0,
        status: "Awaiting review",
        name: "Adekunle Oguntoyinbo",
        email: "billsanders@example.com",
    },
    {
        id: "pend-fin-2",
        amount: 1500.0,
        status: "Awaiting review",
        name: "Zubairu Mohammed",
        email: "alma.lawson@example.com",
    },
    {
        id: "pend-fin-3",
        amount: 1500.0,
        status: "FAILED",
        name: "Tochukwu Nnaji",
        email: "michael.mitc@example.com",
    },
];

const pulseBoardEntry: PulseData[] = [
    {
        id: "1",
        tag: "short-story",
        time: "2025-12-18T20:44:00+01:00",
        name: "Zainab",
        location: "Ilorin",
    },
    {
        id: "2",
        tag: "judge-rating",
        time: "2025-12-18T20:44:00+01:00",
        name: "Adedeji",
        rating: 4.7,
    },
    {
        id: "3",
        tag: "finalist-upload",
        time: "2025-12-18T20:44:00+01:00",
        location: "Ghana",
    },
    {
        id: "4",
        tag: "prize-win",
        time: "2025-12-18T20:44:00+01:00",
        name: "Adesola",
        prize: 1000000,
        projectName: "admire you",
    },
    {
        id: "5",
        tag: "short-story",
        time: "2025-12-18T20:44:00+01:00",
        name: "Zainab",
        location: "Ilorin",
    },
    {
        id: "6",
        tag: "judge-rating",
        time: "2025-12-18T20:44:00+01:00",
        name: "Adedeji",
        rating: 4.7,
    },
    {
        id: "7",
        tag: "finalist-upload",
        time: "2025-12-18T20:44:00+01:00",
        location: "Ghana",
    },
    {
        id: "8",
        tag: "prize-win",
        time: "2025-12-18T20:44:00+01:00",
        name: "Adesola",
        prize: 1000000,
        projectName: "admire you",
    },
];

const timeline: Occurence[] = [
    {
        id: "tl-1",
        actorId: "admin-1",
        actorName: "Super Admin",
        actionType: "CREATE",
        entityType: "CONTEST",
        entityId: "comp-1",
        createdAt: new Date("2026-05-10T09:00:00Z"),
        updatedAt: new Date("2026-05-10T09:00:00Z"),
        metadata: { contestName: "Future Africa Poster Challenge" },
    },
    {
        id: "tl-2",
        actorId: "judge-1",
        actorName: "John Doe",
        actionType: "RATE",
        entityType: "ENTRY",
        entityId: "entry-1",
        createdAt: new Date("2026-05-11T14:30:00Z"),
        updatedAt: new Date("2026-05-11T14:30:00Z"),
        metadata: { score: 8.5, entryTitle: "Sunrise Creator" },
    },
    {
        id: "tl-3",
        actorId: "stu-1",
        actorName: "Olabisi Owolabi",
        actionType: "SUBMIT",
        entityType: "ENTRY",
        entityId: "entry-2",
        createdAt: new Date("2026-05-12T10:15:00Z"),
        updatedAt: new Date("2026-05-12T10:15:00Z"),
        metadata: { contestId: "comp-2" },
    },
    {
        id: "tl-4",
        actorId: "admin-1",
        actorName: "Super Admin",
        actionType: "APPROVE",
        entityType: "TRANSACTION",
        entityId: "trans-1",
        createdAt: new Date("2026-05-13T16:45:00Z"),
        updatedAt: new Date("2026-05-13T16:45:00Z"),
        metadata: { amount: 5000, recipient: "Adebayo Johnson" },
    },
];

const feedbacks: Feedback[] = [
    {
        id: "feedback-1",
        title: "When I Rebuilt My City",
        about: "Tomorrow's Leaders",
        description:
            "Your submission for the 'Future Africa Poster Challenge' showed great creativity. The color palette is vibrant and aligns well with the theme.",
        replies: [
            {
                id: "reply-1",
                sender: users[0],
                createdAt: "2026-08-15T10:00:00Z",
                senderId: "",
                receiverId: "",
                message:
                    "Thank you! I spent a lot of time on the color theory for this piece.",
            },
            {
                id: "reply-2",
                sender: users[1],
                createdAt: "2026-08-15T10:15:00Z",
                senderId: "",
                receiverId: "",
                message:
                    "I agree, the gradients are so smooth. What tool did you use?",
            },
            {
                id: "reply-3",
                sender: users[2],
                createdAt: "2026-08-15T10:30:00Z",
                senderId: "",
                receiverId: "",
                message:
                    "I used Figma primarily, with some custom brushes from Photoshop for the texture.",
            },
        ],
    },
    {
        id: "feedback-2",
        title: "Echoes of the Past",
        about: "Short Film Series",
        description:
            "The pacing in your short film is excellent, but the audio mixing in the second act could be improved.",
        replies: [
            {
                id: "reply-4",
                sender: users[0],
                createdAt: "2026-08-16T14:30:00Z",
                senderId: "",
                receiverId: "",
                message:
                    "I appreciate the detailed feedback. I'll work on smoothing out those audio transitions.",
            },
            {
                id: "reply-5",
                sender: users[1],
                createdAt: "2026-08-16T16:00:00Z",
                senderId: "",
                receiverId: "",
                message:
                    "Yeah, it got a bit loud around the 2-minute mark, but the story is fantastic!",
            },
            {
                id: "reply-6",
                sender: users[2],
                createdAt: "2026-08-16T16:45:00Z",
                senderId: "",
                receiverId: "",
                message:
                    "I've re-balanced the EQ and will be uploading the revised cut soon.",
            },
            {
                id: "reply-7",
                sender: users[2],
                createdAt: "2026-08-16T17:10:00Z",
                senderId: "",
                receiverId: "",
                message: "Can't wait to see the final version. Keep going!",
            },
        ],
    },
    {
        id: "feedback-3",
        title: "The Rhythm of Rain",
        about: "Spoken Word Poetry",
        description:
            "Your spoken word piece was very moving. The delivery had a great rhythm, though a bit fast in the middle.",
        replies: [
            {
                id: "reply-8",
                sender: users[1],
                createdAt: "2026-08-17T09:00:00Z",
                senderId: "",
                receiverId: "",
                message:
                    "Thank you! Breath control is definitely something I'm working on.",
            },
            {
                id: "reply-9",
                sender: users[0],
                createdAt: "2026-08-17T11:20:00Z",
                senderId: "",
                receiverId: "",
                message:
                    "I felt it matched the intensity of the topic perfectly, to be honest.",
            },
            {
                id: "reply-10",
                sender: users[0],
                createdAt: "2026-08-17T12:05:00Z",
                senderId: "",
                receiverId: "",
                message:
                    "Haha I appreciate it, but I did stumble a bit on the second verse. Practice makes perfect!",
            },
        ],
    },
];

// ─── Chart / stats data ───────────────────────────────────────────────────────

const liveChartData: BaseChartData[] = [
    { change: 245, currentFigure: 24891, trend: "down" },
    { change: 89, currentFigure: 14210, trend: "up" },
    { change: 12, currentFigure: 380, trend: "down" },
];

const liveUserStats: BaseChartData[] = [
    { change: 5.2, currentFigure: 1426, trend: "up" },
    { change: 2.0, currentFigure: 1210, trend: "down" },
    { change: 3, currentFigure: 15, trend: "up" },
    { change: 5.2, currentFigure: 1426, trend: "up" },
    { change: 2.0, currentFigure: 1210, trend: "down" },
    { change: 3, currentFigure: 15, trend: "up" },
];

const liveAnalyticsStats: BaseChartData[] = [
    { change: 12, currentFigure: 24891, trend: "up" },
    { change: 8, currentFigure: 18234, trend: "up" },
    { change: 15, currentFigure: 2845, trend: "up" },
    { change: 15, currentFigure: 2845, trend: "up" },
    { change: 15, currentFigure: 2845, trend: "up" },
    { change: 15, currentFigure: 2845, trend: "up" },
    { change: 15, currentFigure: 2845, trend: "up" },
];

const liveMentorsStats: BaseChartData[] = [
    { change: 5, currentFigure: 24891, trend: "up" },
    { change: 8, currentFigure: 18234, trend: "up" },
    { change: 15.1, currentFigure: 2845, trend: "up" },
    { change: 5, currentFigure: 24891, trend: "up" },
    { change: 8, currentFigure: 18234, trend: "up" },
    { change: 15.1, currentFigure: 2845, trend: "up" },
];

const liveSchoolStats: BaseChartData[] = [
    { currentFigure: 380, trend: "up", change: 0 },
    { currentFigure: 156, trend: "up", change: 0 },
    { currentFigure: 15, trend: "up", change: 0 },
];

const liveContestStats: BaseChartData[] = [
    { change: 2, currentFigure: 12, trend: "up" },
    { change: 10, currentFigure: 14567, trend: "up" },
    { change: 5, currentFigure: 1200000, trend: "up" },
    { change: 2, currentFigure: 12, trend: "up" },
    { change: 10, currentFigure: 14567, trend: "up" },
    { change: 5, currentFigure: 1200000, trend: "up" },
];

const liveFinancialStats: BaseChartData[] = [
    { change: 15, currentFigure: 2400000, trend: "up" },
    { change: 22, currentFigure: 540000, trend: "up" },
    { change: 18, currentFigure: 1200000, trend: "up" },
    { change: 15, currentFigure: 2400000, trend: "up" },
    { change: 22, currentFigure: 540000, trend: "up" },
    { change: 18, currentFigure: 1200000, trend: "up" },
];

export {
    users,
    chats,
    timeline,
    feedbacks,
    pricingData,
    awardCategory,
    liveUserStats,
    liveChartData,
    notifications,
    metricCardData,
    pulseBoardEntry,
    liveSchoolStats,
    liveContestStats,
    userTransactions,
    liveMentorsStats,
    pendingFinancials,
    liveFinancialStats,
    liveAnalyticsStats,
};
