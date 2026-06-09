import {
    Day,
    Level,
    Month,
    ContestStatus,
    MentorSpecialty,
    UserAccountStatus,
    MentorAccountStatus,
    SessionStatus,
} from "../enums/enums";
import {
    Chat,
    Badge,
    Entry,
    School,
    Wallet,
    BaseUser,
    UserStats,
    Transaction,
    Contest,
    CompetitionAnalysis,
    Notification,
} from "./index";
import { UserRole } from "./interface";

export interface RecommendedProfile extends Partial<Contest> {
    id: string;
    color: Colors;
    profile: {
        name: string;
        description: string;
        categories: string[];
    };
}

export interface Guardian extends BaseUser {
    id: string;
    wards: Student[];
    phoneNumber?: string;
    relationship: string;
    updatedAt: Date | string;
    createdAt: Date | string;
    lastLogin?: Date | string;
}

export interface Judge {
    user: User;
    id: string;
    status: JudgeStatus;
    contests: Contest[];
    phoneNumber?: string;
    level: JudgeExpertise;
    alerts: Notification[];
    completionRate: number;
    createdAt: Date | string;
    updatedAt?: Date | string;
    projects?: {
        active: Contest[];
        completed: Contest[];
        upcoming: Contest[];
    };
    // Database schema fields
}

export interface Student {
    id: string;
    user: User;
    level: Level;
    userId: string;
    school?: School;
    badges: Badge[];
    stats?: UserStats;
    entries: Entry[];
    schoolId?: string;
    guardian?: Guardian;
    guardianId?: string;
    contests: Contest[];
    mentorFeedback: number;
    updatedAt: Date | string;
    createdAt: Date | string;
    mentorSessions: MentorSession[];
    competitionAnalysis?: CompetitionAnalysis;
}

export interface Mentor {
    id: string;
    user: User;
    rating: number;
    userId: string;
    earnings: number;
    contests: Contest[];
    totalSessions: number;
    createdAt: Date | string;
    sessions: MentorSession[];
    updatedAt?: Date | string;
    lastSession?: Date | string;
    status: MentorAccountStatus;
    specialties: MentorSpecialty[];
}

export interface MentorSession {
    id: string;
    mentor?: Mentor;
    duration: number;
    mentorId: string;
    student?: Student;
    studentId: string;
    flagReason?: string;
    status: SessionStatus;
    createdAt: Date | string;
    category: MentorSpecialty;
    updatedAt?: Date | string;
}

export interface User extends BaseUser {
    day: Day;
    bio?: string;
    age?: number;
    year: number;
    month: Month;
    state?: string;
    mentor?: Mentor;
    wallet?: Wallet;
    role?: UserRole;
    country?: string;
    student?: Student;
    sentChats?: Chat[];
    dob?: Date | string;
    phoneNumber?: string;
    passwordHash?: string;
    receivedChats?: Chat[];
    howDidYouHear?: string;
    portfolioLink?: string;
    createdAt: Date | string;
    status: UserAccountStatus;
    updatedAt?: Date | string;
    lastActive?: Date | string;
    transactions: Transaction[];
    notifications?: Notification[];
}

//   ==============  create  ===========

export interface CreateMentor {
    days: Day[];
    email: string;
    phone: string;
    location: string;
    fullName: string;
    schedule: string;
    bankName: string;
    photo: File | null;
    maxStudents: number;
    rate: number | string;
    accountNumber: string;
    customMessage: string;
    dob: string | undefined;
    specialties: MentorSpecialty[];
    experience: number | undefined;
    date: { from: Date | undefined; to?: Date | undefined };
    setupOptions: ("autoLogin" | "smsEmail" | "passwordChange")[];
}
