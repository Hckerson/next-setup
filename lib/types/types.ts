export type Trend = "up" | "down";
export type LabelType = "growth" | "comparison";
export type JudgeStatus = "Ahead" | "Behind" | "On Track";
export type UserAboutCategory = "Overview" | "Wallet" | "Timeline";
export type JudgeExpertise = "Lead" | "Senior" | "Expert" | "Junior";
export type ActiveSchoolCategory = "Overview" | "Wallet" | "Students";

export type AnalyticsCategory =
    | "Overview"
    | "Users"
    | "Content"
    | "Engagement"
    | "Finance";

export type AdminFinancialCategory =
    | "Withdrawals Management"
    | "Payment Disputes"
    | "History";

export type ActiveSubCategory =
    | "Overview"
    | "Entries"
    | "Judges"
    | "Prize Pool"
    | "Analytics";

export type Colors =
    | "orange"
    | "cyan"
    | "green"
    | "clay"
    | "purple"
    | "red"
    | "violet"
    | "pink"
    | "blue"
    | "ash"
    | "yellow"
    | "brown"
    | "mauve"
    | "transparent";
export type ModerationChecklist =
    | "Content quality"
    | "Originality"
    | "technical specs"
    | "guideline compliance";

export type Links =
    | "/"
    | "/content"
    | "/users"
    | "/contests"
    | "/finance"
    | "/analytics"
    | "/schools"
    | "/mentors";

export type PulseAction =
    | "short-story"
    | "judge-rating"
    | "finalist-upload"
    | "prize-win";
