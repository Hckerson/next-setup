type Trend = "up" | "down";
type LabelType = "growth" | "comparison";
type JudgeStatus = "Ahead" | "Behind" | "On Track";
type UserAboutCategory = "Overview" | "Wallet" | "Timeline";
type JudgeExpertise = "Lead" | "Senior" | "Expert" | "Junior";
type ActiveSchoolCategory = "Overview" | "Wallet" | "Students";

type AnalyticsCategory =
    | "Overview"
    | "Users"
    | "Content"
    | "Engagement"
    | "Finance";

type AdminFinancialCategory =
    | "Withdrawals Management"
    | "Payment Disputes"
    | "History";

type ActiveSubCategory =
    | "Overview"
    | "Entries"
    | "Judges"
    | "Prize Pool"
    | "Analytics";

type Colors =
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
type ModerationChecklist =
    | "Content quality"
    | "Originality"
    | "technical specs"
    | "guideline compliance";

type Links =
    | "/"
    | "/content"
    | "/users"
    | "/contests"
    | "/finance"
    | "/analytics"
    | "/schools"
    | "/mentors";

type PulseAction =
    | "short-story"
    | "judge-rating"
    | "finalist-upload"
    | "prize-win";
