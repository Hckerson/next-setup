import { useMutation } from "@tanstack/react-query";
import { local } from "@/lib/api-client";
import { apiRoutes } from "@/lib/api-routes";
import type { ApiResponse } from "@/lib/types/api";
import {
    createUserDtoSchema,
    type CreateUserDto,
    type UserResponseDto,
} from "@/lib/contract/schemas";

export const useCreateUser = () =>
    useMutation({
        mutationFn: (input: CreateUserDto) =>
            local.post<ApiResponse<UserResponseDto>>(
                apiRoutes.users(),
                createUserDtoSchema.parse(input),
            ),
    });
