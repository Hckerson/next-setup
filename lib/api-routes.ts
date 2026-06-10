export const config = {
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
        auth: {
            login: "/auth/login",
            register: "/auth/register",
            logout: "/auth/logout",
            forgotPassword: "/auth/forgot-password",
            resetPassword: "/auth/reset-password",
        },
        users: {
            all: "/users",
            me: "/users/me",
            update: (id: string) => `/users/${id}`,
            profile: (id: string) => `/users/${id}`,
        },
    },
};
