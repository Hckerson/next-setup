import {
    Day,
    Part,
    Month,
    Policy,
    UserRole,
    SessionStatus,
    MentorSpecialty,
    UserAccountStatus,
    MentorAccountStatus,
    PaymentStatus,
    Level,
    KeywordTriggerCategory,
} from "../enums/enums";
import { Colors, JudgeExpertise, JudgeStatus } from "../types/types";
import {
    Chat,
    Badge,
    Entry,
    School,
    Wallet,
    BaseUser,
    UserStats,
    Timeline,
    Transaction,
    Contest,
    CompetitionAnalysis,
    Notification,
} from "./index";

export interface CreateMentor {
    days: Day[];
    email: string;
    phone: string;
    date: DateRange;
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
    experience: string | undefined;
    setupOptions: ("autoLogin" | "smsEmail" | "passwordChange")[];
}

export interface CreateAssessment {
    securityLevel: Level | undefined;
    policies: Policy[];
    notes: string;
}

export interface DateRange {
    from: Date | undefined;
    to?: Date | undefined;
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
    projects?: JudgeProjects;
    // Database schema fields
}

export interface JudgeProjects {
    active: Contest[];
    completed: Contest[];
    upcoming: Contest[];
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
    students?: Student[];
    updatedAt?: Date | string;
    lastSession?: Date | string;
    status: MentorAccountStatus;
    specialties: MentorSpecialty[];
}

export interface MentorSession {
    id: string;
    reason?: string;
    mentor?: Mentor;
    duration: number;
    mentorId: string;
    endTime: string;
    student?: Student;
    studentId: string;
    startTime: string;
    status: SessionStatus;
    createdAt: Date | string;
    category: MentorSpecialty;
    updatedAt?: Date | string;
    paymentStatus: PaymentStatus;
    flagInfo?: SessionFlagDetails;
}

export interface Profile {
    name: string;
    description: string;
    categories: string[];
}

export interface RecommendedProfile extends Partial<Contest> {
    id: string;
    color: Colors;
    profile: Profile;
}

export interface Student {
    id: string;
    user: User;
    level: Part;
    userId: string;
    school?: School;
    badges: Badge[];
    stats?: UserStats;
    entries: Entry[];
    schoolId?: string;
    guardian?: Guardian;
    guardianId?: string;
    mentor?: Mentor;
    mentorId?: string;
    contests: Contest[];
    mentorFeedback?: number | null;
    updatedAt: Date | string;
    createdAt: Date | string;
    mentorSessions: MentorSession[];
    competitionAnalysis?: CompetitionAnalysis;
}

export interface SessionFlagDetails {
    date?: string;
    reason?: string;
    details?: string;
    keyWords?: string[];
    reportedBy?: string;
    reporterRole: UserRole;
    triggers?: KeywordTriggerCategory[];
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
    timeline?: Timeline[];
    transactions: Transaction[];
    notifications?: Notification[];
}
