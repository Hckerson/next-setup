// placeholder-data.ts
// ─────────────────────────────────────────────────────────────────────────────
// All relational placeholder data (schools, students, judges, mentors, contests,
// entries). Imports ONLY from placeholder-base (no circular deps).
//
// Declaration order + post-init patches break every circular reference:
//   schools → students → schools (patched)
//   judges  → contests → judges  (patched)
//   mentors → contests → mentors (patched)
// ─────────────────────────────────────────────────────────────────────────────

import { cats } from "./cats";
import {
    Contest,
    Entry,
    Judge,
    Mentor,
    MentorSession,
    School,
    Student,
} from "../interface";
import {
    users,
    userTransactions,
    notifications,
    // re-exported from here so existing imports keep working
    awardCategory,
    chats,
    feedbacks,
    liveAnalyticsStats,
    liveChartData,
    liveContestStats,
    liveFinancialStats,
    liveMentorsStats,
    liveSchoolStats,
    liveUserStats,
    metricCardData,
    pendingFinancials,
    pricingData,
    pulseBoardEntry,
    timeline,
} from "./placeholder-base";
import {
    ContestStatus,
    Day,
    EntryCategory,
    EntryStatus,
    Level,
    MentorAccountStatus,
    MentorSpecialty,
    Month,
    SchoolStatus,
} from "../enums/enums";

// ─── 1. Mentor sessions (no deps) ────────────────────────────────────────────

const mentorSessions: MentorSession[] = [
    {
        id: "session-1",
        mentorId: "mentor-1",
        studentId: "stu-1",
        createdAt: "2026-01-11T00:00:00.000Z",
        duration: 60,
        dateTime: new Date(),
        status: ContestStatus.ACTIVE,
    },
    {
        id: "session-2",
        mentorId: "mentor-2",
        studentId: "stu-2",
        createdAt: "2026-01-11T00:00:00.000Z",
        duration: 45,
        dateTime: new Date(),
        status: ContestStatus.COMPLETED,
    },
];

// ─── 2. Schools — students & contests patched after ──────────────────────────

const schools: School[] = [
    {
        id: "school-1",
        name: "Peabody High School",
        imageSrc: "/images/general/uni-benin-logo.png",
        country: "Nigeria",
        state: "Akwa Ibom",
        status: SchoolStatus.PLAYWORK_CERTIFIED,
        students: [], // patched below
        totalEntries: 2344,
        rank: 1,
        createdAt: "2026-01-11T00:00:00.000Z",
        transactions: userTransactions,
        totalStudents: 2356,
        totalWinners: 23,
        totalAmountEarned: 2000000,
        contests: [], // patched below
        year: 2026,
        day: Day.FRI,
        month: Month.JAN,
    },
    {
        id: "school-2",
        name: "Woodland Hills High School",
        imageSrc: "/images/general/uni-benin-logo.png",
        country: "Nigeria",
        state: "Gombe",
        status: SchoolStatus.PLAYWORK_CERTIFIED,
        students: [], // patched below
        totalEntries: 2344,
        rank: 1,
        createdAt: "2026-01-11T00:00:00.000Z",
        transactions: userTransactions,
        totalStudents: 2356,
        totalWinners: 23,
        totalAmountEarned: 2000000,
        contests: [], // patched below
        year: 2026,
        day: Day.FRI,
        month: Month.JAN,
    },
    {
        id: "school-3",
        name: "Peabody High School",
        imageSrc: "/images/general/uni-lagos-logo.png",
        country: "Nigeria",
        state: "Osun",
        status: SchoolStatus.PLAYWORK_CERTIFIED,
        students: [], // patched below
        totalEntries: 2344,
        rank: 1,
        createdAt: "2026-01-11T00:00:00.000Z",
        transactions: userTransactions,
        totalStudents: 2356,
        totalWinners: 23,
        totalAmountEarned: 2000000,
        contests: [], // patched below
        year: 2026,
        day: Day.FRI,
        month: Month.JAN,
    },
];

// ─── 3. Students (references schools, which are now defined above) ────────────

const students: Student[] = [
    {
        id: "",
        user: users[0],
        school: schools[0],
        userId: "stu-1",
        badges: [],
        schoolId: schools[0].id,
        stats: {
            id: "stats-stu-1",
            submissions: 0,
            sparksCollected: 0,
            competitionsEntered: 0,
            achievements: 0,
            topPercentile: 0,
            badgesEarned: 0,
            dreamsFulfilled: 0,
            avgCreativityScore: 0,
            featured: 0,
        },
        entries: [],
        level: Level.JSS1,
        guardianId: "guardian-stu-1",
        guardian: {
            id: "guardian-stu-1",
            fullName: "Auto Guardian",
            relationship: "Parent",
            email: "guardian@example.com",
            phoneNumber: "0000000000",
            avatar: "/images/profile/olabisi.png",
            lastLogin: new Date(),
            wards: [],
            updatedAt: new Date(),
            createdAt: new Date(),
        },
        contests: [],
        updatedAt: new Date(),
        createdAt: new Date(),
        mentorSessions: [],
        mentorFeedback: 0,
    },
    {
        id: "",
        user: users[1],
        school: schools[1] ?? schools[0],
        userId: "stu-2",
        badges: [],
        schoolId: (schools[1] ?? schools[0]).id,
        stats: {
            id: "stats-stu-2",
            submissions: 0,
            sparksCollected: 0,
            competitionsEntered: 0,
            achievements: 0,
            topPercentile: 0,
            badgesEarned: 0,
            dreamsFulfilled: 0,
            avgCreativityScore: 0,
            featured: 0,
        },
        entries: [],
        level: Level.JSS1,
        guardianId: "guardian-stu-2",
        guardian: {
            id: "guardian-stu-2",
            fullName: "Auto Guardian",
            relationship: "Parent",
            email: "guardian2@example.com",
            phoneNumber: "0000000001",
            avatar: "/images/profile/olabisi.png",
            lastLogin: new Date(),
            wards: [],
            updatedAt: new Date(),
            createdAt: new Date(),
        },
        contests: [],
        updatedAt: new Date(),
        createdAt: new Date(),
        mentorSessions: [],
        mentorFeedback: 0,
    },
    {
        id: "",
        user: users[2],
        school: schools[2],
        userId: "stu-3",
        badges: [],
        schoolId: schools[2].id,
        stats: {
            id: "stats-stu-3",
            submissions: 0,
            sparksCollected: 0,
            competitionsEntered: 0,
            achievements: 0,
            topPercentile: 0,
            badgesEarned: 0,
            dreamsFulfilled: 0,
            avgCreativityScore: 0,
            featured: 0,
        },
        entries: [],
        level: Level.JSS1,
        guardianId: "guardian-stu-3",
        guardian: {
            id: "guardian-stu-3",
            fullName: "Auto Guardian",
            relationship: "Parent",
            email: "guardian3@example.com",
            phoneNumber: "0000000002",
            avatar: "/images/profile/olabisi.png",
            lastLogin: new Date(),
            wards: [],
            updatedAt: new Date(),
            createdAt: new Date(),
        },
        contests: [],
        updatedAt: new Date(),
        createdAt: new Date(),
        mentorSessions: [],
        mentorFeedback: 0,
    },
];

// Patch schools with real students
schools.forEach((s) => {
    s.students = students;
});

// ─── 4. Judges (contests patched after) ──────────────────────────────────────

const judges: Judge[] = [
    {
        id: "judge-1",
        completionRate: 75,
        user: users[0],
        createdAt: "2026-01-11T00:00:00.000Z",
        level: "Senior",
        status: "Ahead",
        contests: [],
        projects: { active: [], completed: [], upcoming: [] },
        alerts: notifications,
    },
    {
        id: "judge-2",
        completionRate: 28,
        user: users[0],
        createdAt: "",
        level: "Junior",
        status: "Behind",
        contests: [],
        projects: { active: [], completed: [], upcoming: [] },
        alerts: notifications,
    },
    {
        id: "judge-3",
        completionRate: 42,
        user: users[0],
        createdAt: "",
        level: "Expert",
        status: "On Track",
        contests: [],
        projects: { active: [], completed: [], upcoming: [] },
        alerts: notifications,
    },
];

// ─── 5. Mentors (contests patched after) ─────────────────────────────────────

const mentors: Mentor[] = [
    {
        id: "mentor-1",
        userId: users[0].id,
        contests: [],
        rating: 4.9,
        specialties: [MentorSpecialty.STEM, MentorSpecialty.MUSIC],
        totalSessions: 0,
        createdAt: "2026-01-11T00:00:00.000Z",
        status: MentorAccountStatus.PENDING_SETUP,
        sessions: [],
        earnings: 200400,
        user: users[0],
    },
    {
        id: "mentor-2",
        userId: users[0].id,
        contests: [],
        rating: 2.6,
        specialties: [MentorSpecialty.ANIMATION, MentorSpecialty.WRITING],
        totalSessions: 0,
        createdAt: "2026-01-11T00:00:00.000Z",
        status: MentorAccountStatus.ACTIVE,
        sessions: [],
        earnings: 193100,
        user: users[0],
    },
    {
        id: "mentor-3",
        userId: users[0].id,
        contests: [],
        rating: 2.6,
        specialties: [MentorSpecialty.ANIMATION, MentorSpecialty.WRITING],
        totalSessions: 0,
        createdAt: "2026-01-11T00:00:00.000Z",
        status: MentorAccountStatus.ACTIVE,
        sessions: [],
        earnings: 193100,
        user: users[0],
    },
    {
        id: "mentor-4",
        userId: users[0].id,
        contests: [],
        rating: 4.9,
        specialties: [MentorSpecialty.STEM, MentorSpecialty.MUSIC],
        totalSessions: 0,
        createdAt: "2026-01-11T00:00:00.000Z",
        status: MentorAccountStatus.PENDING_SETUP,
        sessions: [],
        earnings: 200400,
        user: users[0],
    },
    {
        id: "mentor-5",
        userId: users[0].id,
        contests: [],
        rating: 2.6,
        specialties: [MentorSpecialty.ANIMATION, MentorSpecialty.WRITING],
        totalSessions: 0,
        createdAt: "2026-01-11T00:00:00.000Z",
        status: MentorAccountStatus.ACTIVE,
        sessions: [],
        earnings: 193100,
        user: users[0],
    },
];

// ─── 6. Contests (all deps now available) ────────────────────────────────────

const contests: Contest[] = [
    {
        id: "all-comp-1",
        topic: "Speak for Change Challenge",
        tags: ["STEMHackathon", "FutureTech", "ProblemSolvers"],
        imageSrc: "/images/avatars/speaker-avatar.png",
        color: "orange",
        participants: 186,
        name: "Speak for Change Challenge",
        totalSubmissions: 5,
        schools,
        students,
        mentors,
        description: "",
        category: EntryCategory.FILM,
        startDate: "2026-02-01T00:00:00.000Z",
        endDate: "2026-03-30T23:59:59.999Z",
        prize: { first: 50000, second: 30000, third: 20000 },
        target: 5000,
        status: ContestStatus.ACTIVE,
        winners: { first: users[0], second: users[1], third: users[2] },
        createdAt: "2026-01-11T00:00:00.000Z",
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
        paymentDetails: { time: new Date(), status: "held" },
        participationRewards: { all: 25, finalist: 100 },
    },
    {
        id: "all-comp-2",
        topic: "One-Minute Film Contest",
        tags: ["STEMHackathon", "FutureTech", "ProblemSolvers"],
        imageSrc: "/images/avatars/ANIMATION-avatar.png",
        color: "red",
        participants: 186,
        name: "One-Minute Film Contest",
        totalSubmissions: 5,
        schools,
        students,
        mentors,
        description: "",
        category: EntryCategory.ANIMATION,
        startDate: "2026-05-15T00:00:00.000Z",
        endDate: "2026-08-15T23:59:59.999Z",
        prize: { first: 50000, second: 30000, third: 20000 },
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
        pendingReviews: 45,
        rejected: 12,
        views: 8200,
        engagementRate: 12.3,
        winners: { first: users[0], second: users[1], third: users[2] },
        createdAt: "2026-01-11T00:00:00.000Z",
        judges: judges.slice(0, 5),
        paymentDetails: { time: new Date(), status: "held" },
        participationRewards: { all: 25, finalist: 100 },
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
        topic: "Future Africa Poster Design",
        tags: ["STEMHackathon", "FutureTech", "ProblemSolvers"],
        imageSrc: "/images/avatars/speaker-avatar.png",
        participants: 186,
        name: "Future Africa Poster Design",
        totalSubmissions: 5,
        schools,
        students,
        mentors,
        description: "",
        color: "purple",
        category: EntryCategory.ANIMATION,
        startDate: "2026-07-01T00:00:00.000Z",
        endDate: "2026-09-30T23:59:59.999Z",
        prize: { first: 50000, second: 30000, third: 20000 },
        status: ContestStatus.DRAFT,
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
        pendingReviews: 1123,
        rejected: 0,
        views: 4500,
        engagementRate: 5.1,
        winners: { first: users[0], second: users[1], third: users[2] },
        createdAt: "2026-01-11T00:00:00.000Z",
        judges: judges.slice(0, 5),
        paymentDetails: { time: new Date(), status: "held" },
        participationRewards: { all: 25, finalist: 100 },
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

// Patch judges & mentors with real contests, and schools too
judges.forEach((j) => {
    j.contests = contests;
});
mentors.forEach((m) => {
    m.contests = contests;
});
schools.forEach((s) => {
    s.contests = contests;
});

// ─── 7. Entries ───────────────────────────────────────────────────────────────

const entriesSubmitted: Entry[] = [
    {
        id: "1",
        author: students[0],
        authorId: students[0].user.id,
        contestId: "all-comp-1",
        status: EntryStatus.PENDING,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        name: "Sunrise Creator",
        height: 200,
        thumbNail: cats[7],
        curatorsPick: false,
        description:
            "A breathtaking, evocative Creator that meticulously captures the transition from the serene, golden stillness of a Lagos sunrise to the high-octane, rhythmic energy of the city's waking streets. This project utilizes fluid transitions and a warm color palette to celebrate the everyday resilience and vibrancy of urban Nigerian life.",
        categories: [EntryCategory.WRITING, EntryCategory.ANIMATION],
        aiStats: {
            contentIssue: false,
            copyrightIssues: false,
            confidenceScore: 0.92,
        },
        metadata: {
            submissionId: "PWX-2026-ANM-119",
            uploadedBy: users[0],
            age: "14",
            uploadDate: "2026-06-18T10:00:00.000Z",
            fileName: "sunrise.mp4",
            fileSize: "3.2MB",
            duration: "00:00:45",
            resolution: "1280x720",
            detectedKeywords: ["sunrise", MentorSpecialty.WRITING, "Lagos"],
            fileType: "video/mp4",
            priority: "high",
        },
    },
    {
        id: "2",
        name: "City Sketch",
        author: students[1],
        authorId: students[1].user.id,
        contestId: "all-comp-1",
        status: EntryStatus.PENDING,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        height: 50,
        thumbNail: cats[3],
        curatorsPick: false,
        description:
            "it is a detailed digital sketch portraying the rhythm and bustle of a busy city street, full of hidden stories and small moments.",
        categories: [EntryCategory.ANIMATION],
        aiStats: {
            contentIssue: false,
            copyrightIssues: false,
            confidenceScore: 0.85,
        },
        metadata: {
            submissionId: "PWX-2026-ANM-120",
            uploadedBy: users[1],
            age: "13",
            uploadDate: "2026-06-18T10:05:00.000Z",
            fileName: "city-sketch.png",
            fileSize: "1.1MB",
            duration: "",
            resolution: "2048x1152",
            detectedKeywords: ["city", "sketch"],
            fileType: "image/png",
            priority: "high",
        },
    },
    {
        id: "3",
        name: "Beat Loop",
        author: students[2],
        authorId: students[2].user.id,
        contestId: "all-comp-1",
        status: EntryStatus.PENDING,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        height: 100,
        thumbNail: cats[10],
        curatorsPick: false,
        description:
            "it is a 30-second rhythmic beat that blends Afro-inspired percussion with modern textures to create an upbeat, memorable loop.",
        categories: [EntryCategory.WRITING],
        aiStats: {
            contentIssue: false,
            copyrightIssues: false,
            confidenceScore: 0.78,
        },
        metadata: {
            submissionId: "PWX-2026-ANM-121",
            uploadedBy: users[2],
            age: "28",
            uploadDate: "2026-06-18T10:10:00.000Z",
            fileName: "beat-loop.mp3",
            fileSize: "2.5MB",
            duration: "00:00:30",
            resolution: "",
            detectedKeywords: ["beat", "afro", "music"],
            fileType: "audio/mpeg",
            priority: "high",
        },
    },
];

// ─── Exports ──────────────────────────────────────────────────────────────────
// Re-export base data so files that import from here keep working unchanged.

export {
    // relational data
    users,
    judges,
    schools,
    students,
    mentors,
    mentorSessions,
    contests,
    entriesSubmitted,
    // base data re-exports
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
