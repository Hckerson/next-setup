import { School, User } from "./index";
import { NotificationCategory, NotificationTag } from "../enums/enums";

export interface Chat {
    id: string;
    sender?: User;
    receiver?: User;
    message: string;
    senderId: string;
    highlight?: string;
    receiverId: string;
    updatedAt?: Date | string;
    createdAt: Date | string;
}

export interface Notification {
    user: User;
    id: string;
    userId: string;
    isRead: boolean;
    school?: School;
    isAdmin: boolean;
    critical: boolean;
    highlight: boolean;
    externals?: string;
    description: string;
    tag: NotificationTag;
    updatedAt: Date | string;
    createdAt: Date | string;
    category: NotificationCategory;
}

export interface Feedback {
    id: string;
    title: string;
    about: string;
    replies: Chat[];
    description: string;
}
