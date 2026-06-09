import { User, Judge, School, BaseImage, Mentor, Student } from "./index";
import { Day, Month, ContestStatus, EntryCategory, EntryStatus } from "../enums/enums";

export interface CreativeQuiz {
    id: string;
    contest: Contest;
    question: string;
    options: string[];
    contestId: string;
    updatedAt?: Date | string;
    createdAt: Date | string;
}

export interface CompetitionAnalysis {
    id: string;
    wins: number;
    losses: number;
    submissions: number;
    participated: number;
}

export interface JudgeActivity {
    [task: string]: {
        completedBy: string[];
    };
}

export interface Participant extends BaseImage {
    role: string;
    color: Colors;
    description: string;
}

export interface Entry {
    id: string;
    name: string;
    height: number;
    author: Student;
    authorId: string;
    contestId: string;
    mediaUrl?: string;
    mediaType?: string;
    thumbNail?: string;
    keywords?: string[];
    status: EntryStatus;
    description: string;
    curatorsPick: boolean;
    updatedAt: Date | string;
    createdAt: Date | string;
    categories: EntryCategory[];
    metadata?: {
        age: string;
        fileName: string;
        fileSize: string;
        duration: string;
        priority: string;
        fileType: string;
        uploadDate: string;
        uploadedBy: User;
        resolution: string;
        submissionId: string;
        detectedKeywords: string[];
    };
    aiStats?: {
        contentIssue: boolean;
        confidenceScore: number;
        copyrightIssues: boolean;
    };
}

export interface Contest {
    id: string;
    day?: Day;
    name: string;
    color: Colors;
    info?: string;
    month?: Month;
    views: number;
    year?: number;
    topic?: string;
    tags: string[];
    judges: Judge[];
    target?: number;
    endDate: string;
    minAge?: number;
    maxAge?: number;
    rejected: number;
    country?: string;
    entries?: Entry[];
    startDate: string;
    imageSrc?: string;
    avgRating: number;
    schools: School[];
    mentors: Mentor[];
    students: Student[];
    description: string;
    totalPrize?: number;
    participants: number;
    totalReviews: number;
    isFeatured?: boolean;
    approvalRate: number;
    status: ContestStatus;
    pendingReviews: number;
    engagementRate: number;
    category: EntryCategory;
    totalSubmissions: number;
    quizzes?: CreativeQuiz[];
    updatedAt?: Date | string;
    createdAt: Date | string;
    judgeActivities: JudgeActivity[];
    prize?: {
        first: number;
        second: number;
        third: number;
    };
    participationRewards: {
        all: number;
        finalist: number;
    };
    winners?: {
        first: Partial<User>;
        second: Partial<User>;
        third: Partial<User>;
    };
    paymentDetails?: {
        time: Date;
        status: "held" | "released";
    };
    todos?: {
        judges: boolean;
        contestDetails: boolean;
        ScheduledEmails: boolean;
        prizeConfiguration: boolean;
        MarketAssetConfiguration: boolean;
    };
    // Database schema fields
}
