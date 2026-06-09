export const config = {
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
        auth: {
            login: "/auth/login",
            register: "/auth/register",
            logout: "/auth/logout",
            forgotPassword: "/auth/forgot-password",
            resetPassword: "/auth/reset-password",
            onboarding: "/auth/onboarding",
            verifyParentCode: "/parent/verify-code",
            guardianRegister: "/auth/guardian/register",
            guardianLogin: "/auth/guardian/login",
        },
        users: {
            all: "/users",
            me: "/users/me",
            update: (id: string) => `/users/${id}`,
            profile: (id: string) => `/users/${id}`,
            stats: (id: string) => `/users/${id}/stats`,
            badges: (id: string) => `/users/${id}/badges`,
        },
        contests: {
            all: "/contests",
            detail: (id: string) => `/contests/${id}`,
            featured: "/contests/featured",
            submit: (id: string) => `/contests/${id}/submit`,
            results: (id: string) => `/contests/${id}/results`,
        },
        entries: {
            all: "/entries",
            detail: (id: string) => `/entries/${id}`,
            byUser: (userId: string) => `/entries/user/${userId}`,
            byContest: (contestId: string) => `/entries/contest/${contestId}`,
        },
        school: {
            profile: (id: string) => `/schools/${id}`,
            students: (id: string) => `/schools/${id}/students`,
            performance: (id: string) => `/schools/${id}/performance`,
        },
        mentors: {
            all: "/mentors",
            detail: (id: string) => `/mentors/${id}`,
        },
        wallet: {
            balance: "/wallet/balance",
            history: "/wallet/history",
            withdraw: "/wallet/withdraw",
            reject: (id: string) => `/wallet/withdrawals/${id}/reject`,
            approve: (id: string) => `/wallet/withdrawals/${id}/approve`,
        },
        admin: {
            alerts: { all: "/admin/dashboard/alerts/all" },
            dashboard: {
                metrics: "/admin/dashboard/metrics",
                alerts: "/admin/dashboard/alerts/critical",
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
            },
            mentors: {
                all: "/admin/mentors/all",
                stats: "/admin/mentors/stats",
                alerts: "/admin/mentors/alerts/critical",
            },
            users: {
                stats: "/admin/users/stats",
                all: "/admin/users/all",
                individual: (id: string) => `/admin/users/${id}`,
                suspend: (id: string) => `/admin/users/${id}/status`,
                timeline: (id: string) => `/admin/users/${id}/timeline`,
            },
        },
    },
};
