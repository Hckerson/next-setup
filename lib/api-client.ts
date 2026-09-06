import axios from "axios";
import { API_BASE_URL, AUTH_ROUTE_PREFIX, LOGIN_ROUTE } from "@/lib/constants";
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from "axios";

const defaultConfig: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
};

interface Response<T> {
    data: T;
    message: string;
    timestamp: string;
    statusCode: number;
}

export const apiClient: AxiosInstance = axios.create(defaultConfig);

const sameOriginClient: AxiosInstance = axios.create({
    headers: defaultConfig.headers,
});

export const local = {
    post: async <T>(url: string, body: unknown) =>
        (await sameOriginClient.post<T>(url, body)).data,
    delete: async <T>(url: string) =>
        (await sameOriginClient.delete<T>(url)).data,
};

const request = async <T>(config: AxiosRequestConfig): Promise<Response<T>> => {
    const defaultResponse: Response<T> = {
        data: [] as unknown as T,
        message: "",
        timestamp: new Date().toLocaleDateString("en-Us", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }),
        statusCode: 200,
    };

    try {
        const response: AxiosResponse = await apiClient.request({
            ...defaultConfig,
            ...config,
        });
        return response.data as Response<T>;
    } catch {
        return defaultResponse;
    }
};

export const query = {
    get: async <T>(url: string, config?: AxiosRequestConfig) => {
        return await request<T>({ method: "GET", url, ...config });
    },
    post: async <T>(
        url: string,
        body: unknown,
        config?: AxiosRequestConfig,
    ) => {
        return await request<T>({ method: "POST", url, data: body, ...config });
    },
    patch: async <T>(
        url: string,
        body: unknown,
        config?: AxiosRequestConfig,
    ) => {
        return await request<T>({
            method: "PATCH",
            url,
            data: body,
            ...config,
        });
    },
    put: async <T>(url: string, body: unknown, config?: AxiosRequestConfig) => {
        return await request<T>({ method: "PUT", url, data: body, ...config });
    },
    delete: async <T>(url: string, config?: AxiosRequestConfig) => {
        return await request<T>({ method: "DELETE", url, ...config });
    },
};

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (
                typeof window !== "undefined" &&
                !window.location.pathname.startsWith(AUTH_ROUTE_PREFIX)
            ) {
                window.location.href = LOGIN_ROUTE;
            }
        }
        return Promise.reject(error);
    },
);
