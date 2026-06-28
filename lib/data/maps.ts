import { NotificationCategory } from "../enums/enums";

const routeLabelMap: Record<string, string> = {
    "/dashboard/admin": "Dashboard Overview",
    "/dashboard/admin/users": "User Management",
    "/dashboard/admin/schools": "School Management",
    "/dashboard/admin/mentors": "Mentor Management",
    "/dashboard/admin/content": "Content Moderation",
    "/dashboard/admin/contests": "Contest Management",
    "/dashboard/admin/finance": "Financial Management",
    "/dashboard/admin/analytics": "Analytics & Insights",
};

const subRouteMap: Record<string, string> = {
    "/dashboard/admin/users/[id]": "User Details",
    "/dashboard/admin/mentors/new": "Add New Mentor",
    "/dashboard/admin/mentors/[id]": "Mentor Details",
    "/dashboard/admin/schools/[id]": "School Details",
    "/dashboard/admin/contests/[id]": "Contest Details",
    "/dashboard/admin/mentors/sessions/[id]": "Session Details",
    "/dashboard/admin/mentors/schedules": "Mentor Schedules",
    "/dashboard/admin/mentors/sessions/all":
        "Sessions Monitoring And Moderation",
};

const notificationMap: Record<
    NotificationCategory,
    { description: string; label: string; src: string; cta: string; link: string }
> = {
    NEW_ENTRIES: {
        description:
            "Several new submissions have arrived and require moderator attention. Reviewing them promptly ensures a smooth contest flow.",
        label: "New Entries Pending Review",
        src: "/images/general/icon-new.png",
        cta: "Review Entries",
        link:"/dashboard/admin/content",
    },
    JUDGES_LATE: {
        description:
            "A contest judge is falling behind their assigned scoring timeline. This may affect contest deadlines and require follow-up.",
        label: "Judge Behind Schedule",
        src: "/images/general/gavel.png",
        cta: "Contact Judge",
        link:"/dashboard/admin/contests",
    },
    HIGH_PRIORITY_FLAGGED: {
        description:
            "One or more entries have been automatically or manually flagged for urgent review. These may involve sensitive content or potential rule violations.",
        label: "High-Priority Content Flagged",
        src: "/images/general/danger.png",
        cta: "Investigate Flags",
        link:"/dashboard/admin/content",
    },
    WITHDRAWAL_REQUEST: {
        description:
            "One or more entries have an awaiting withdrawal request. Prompt approval is required to process the request efficiently.",
        label: "Withdrawal Request Awaiting Approval",
        src: "/images/general/wallet.png",
        cta: "Approve Request",
        link:"/dashboard/admin/finance",
    },
    CONTEST_SUBMISSION_DEADLINE: {
        description:
            "A live contest is approaching its final submission window. You may want to send user reminders or check entry counts.",
        label: "Contest Reaching Submission Deadline",
        src: "/images/general/time.png",
        cta: "Send Reminders",
        link:"/dashboard/admin/contests",
    },
    REPORT_SUBMISSION: {
        description:
            "A new user report has been filed concerning content, behavior, or platform usage. Reviewing the details helps maintain community standards.",
        label: "User Report Submitted",
        src: "/images/general/icon-report.png",
        cta: "Review Report",
        link:"/dashboard/admin/content",
    },
    SCHOOL_VERIFICATION_PENDING: {
        description:
            "A new school registration is awaiting verification. Verifying school status ensures eligibility and proper platform access.",
        label: "New School Registration Pending Verification",
        src: "/images/general/shield.png",
        cta: "Verify School",
        link:"/dashboard/admin/schools",
    },
    UNUSUAL_ACTIVITY: {
        description:
            "The platform has detected an unusual spike or pattern in user behavior, login attempts, or transactions. Investigating this helps ensure platform security.",
        label: "System Alert: Unusual Activity Detected",
        src: "/images/general/eyes.png",
        cta: "Investigate Activity",
        link:"/dashboard/admin/users",
    },
    MONTHLY_REPORT: {
        description:
            "Your monthly performance report has been generated and is now available for review. It includes key metrics and insights for the past month.",
        label: "Monthly Performance Report Ready",
        src: "/images/general/stats.png",
        cta: "View Report",
        link:"/dashboard/admin/analytics",
    },
    MARKETING_ASSETS_REQUIRED: {
        description:
            "An upcoming contest is missing one or more promotional assets such as banners, judge photos, or descriptions. Uploading assets ensures effective contest promotion.",
        label: "Marketing Assets Required for Upcoming Contest",
        src: "/images/general/icon-content.png",
        cta: "Upload Assets",
        link:"/dashboard/admin/contests",
    },
    MODERATION: {
        description:
            "Content requires immediate moderation and review to maintain community standards and platform integrity.",
        label: "Content Moderation Pending Review",
        src: "/images/general/alert-submission.png",
        cta: "Moderate Content",
        link:"/dashboard/admin/content",
    },
    PAYMENT_DELAY: {
        description:
            "A scheduled payment has been delayed. Review the status and take necessary action to resolve the issue.",
        label: "Scheduled Payment Delayed",
        src: "/images/general/alert-time.png",
        cta: "Resolve Delay",
        link:"/dashboard/admin/finance",
    },
    RECONCILIATION: {
        description:
            "Account reconciliation is required to verify and match transaction records. Reviewing and confirming details is necessary.",
        label: "Account Reconciliation Required",
        src: "/images/general/alert-submission.png",
        cta: "Start Reconciliation",
        link:"/dashboard/admin/finance",
    },
    PAYMENT_DISPUTE: {
        description:
            "A payment dispute has been filed and requires investigation to resolve the transaction discrepancy.",
        label: "Payment Dispute Investigation Required",
        src: "/images/general/alert-dispute.png",
        cta: "Resolve Dispute",
        link:"/dashboard/admin/finance",
    },
    PENDING_WITHDRAWAL: {
        description:
            "A withdrawal request is pending processing. Process the withdrawal to complete the transaction.",
        label: "Pending Withdrawal Request",
        src: "/images/general/alert-time.png",
        cta: "Process Withdrawal",
        link:"/dashboard/admin/finance",
    },
};

const categoryColorMap: Record<string, string> = {
    Visionary: "purple",
    Director: "red",
    Artist: "cyan",
    Creator: "orange",
    Builder: "green",
};

export {
    routeLabelMap,
    notificationMap,
    categoryColorMap,
    subRouteMap,
};
