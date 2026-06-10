import { UserRole } from "../enums/enums";
import { BaseUser } from "./index";

export interface User extends BaseUser {
    bio?: string;
    role?: UserRole;
    country?: string;
    phoneNumber?: string;
    createdAt: Date | string;
    updatedAt?: Date | string;
    lastActive?: Date | string;
}
