import { useMutation } from "@tanstack/react-query";
import { local } from "@/lib/api-client";
import { apiRoutes } from "@/lib/api-routes";
import {
    loginSchema,
    type LoginInput,
    type SessionUser,
} from "@/lib/validations/auth";

export const useLogin = () =>
    useMutation({
        mutationFn: (input: LoginInput) =>
            local.post<{ user: SessionUser }>(
                apiRoutes.session(),
                loginSchema.parse(input),
            ),
    });
