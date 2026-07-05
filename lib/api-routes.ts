export const config = {
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
        auth: {
            login: "/admin/auth/login",
            logout: "/admin/auth/logout",
            invite: "/admin/auth/invite",
            mfaSetup: "/admin/auth/mfa/setup",
            mfaVerify: "/admin/auth/mfa/verify",
            passwordReset: "/admin/auth/password-reset",
            passwordConfirm: "/admin/auth/password-confirm",
            session: "/admin/auth/session",
            verify: "/admin/auth/verify",
            acceptInvite: (token: string) =>
                `/admin/auth/invite/${token}/accept`,
        },
        admin: {
            alerts: { all: "/admin/dashboard/alerts/all" },
            dashboard: {
                stats: "/admin/dashboard/stats",
                alerts: "/admin/dashboard/alerts/critical",
                timeline: "admin/dashboard/timeline",
                activityTimeline: "/admin/dashboard/activity-timeline",
            },
            analytics: {
                stats: "/admin/analytics/stats",
                insights: "/admin/analytics/insights",
                performance: "/admin/analytics/performance",
            },
            finance: {
                stats: "/admin/transaction/stats",
                pending: "/admin/withdrawals/pending",
                alerts: "/admin/transaction/alert/critical",
                transaction: (id: string) => `/admin/withdrawals/${id}`,
            },
            contests: {
                all: "/admin/contests/all",
                stats: "/admin/contests/stats",
                detail: (id: string) => `/admin/contests/${id}`,
            },
            school: {
                all: "/admin/schools/all",
                stats: "/admin/schools/stats",
                detail: (id: string) => `/admin/schools/${id}`,
            },
            entries: {
                all: "/admin/entries/all",
                stats: "/admin/entries/stats",
                update: (id: string) => `/admin/entries/${id}`,
            },
            mentors: {
                all: "/admin/mentors/all",
                stats: "/admin/mentors/stats",
                alerts: "/admin/mentors/alerts/critical",
                status: (id: string) => `/admin/mentors/${id}/status`,
                payments: {
                    stats: "/admin/mentors/payments/stats",
                    details: "/admin/mentors/payments/details",
                    hold: (id: string) => `/admin/mentors/payments/${id}/hold`,
                    review: (id: string) =>
                        `/admin/mentors/payments/${id}/review`,
                    process: (id: string) =>
                        `/admin/mentors/payments/${id}/process`,
                },
                sessions: {
                    all: "/admin/mentors/sessions/all",
                    stats: "/admin/mentors/sessions/stats",
                    detail: (id: string) => `/admin/mentors/sessions/${id}`,
                },
            },
            users: {
                all: "/admin/users/all",
                stats: "/admin/users/stats",
                timeline: (id: string) => `/admin/users/${id}/timeline`,
                individual: (id: string) => `/admin/users/${id}`,
                suspend: (id: string) => `/admin/users/${id}/status`,
            },
        },
    },
};
