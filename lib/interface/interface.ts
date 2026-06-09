import { ActionType, Day, EntityType, Month } from "../enums/enums";
import { BaseImage } from "./index";

export interface VsProps {
    homeLogo: string;
    homeName: string;
    awayLogo: string;
    awayName: string;
}

export interface Navlink {
    name: string;
    link: string;
    visible: string;
}

export interface Meta {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
}

export interface PulseData {
    id: string;
    time: string;
    name?: string;
    prize?: number;
    rating?: number;
    tag: PulseAction;
    location?: string;
    projectName?: string;
}

export interface PackageCard {
    iconSrc: string;
    title: string;
    color: Colors;
    memberCount: number;
    inclusions: {
        iconSrc: string;
        label: string;
    }[];
}

export interface Label {
    color: Colors;
    label: string;
}

export interface LaneItems {
    dir: "ltr" | "rtl";
    title: string;
    label: string;
    description: string;
}

export interface Steps {
    number: string;
    action: string;
    description: string;
}

export interface StatLabel {
    label: string;
    time?: string;
}

export interface SocialMedias extends BaseImage {
    link: string;
    name: string;
}

export interface SellingPoint extends Label {
    figure: number;
}

export interface InfoCardData extends BaseImage {
    alt?: string;
    title?: string;
    about?: string;
    background: Colors;
    description: string;
}

export interface QuickActions extends BaseImage {
    label: string;
    link?: string;
}

export interface CertificateData extends BaseImage {
    title: string;
    downloadLink: string;
}

export interface SubmissionData {
    category: string;
    authorName: string;
    schoolName: string;
}

export interface SideLinks extends Omit<QuickActions, "id"> {
    label: string;
}

export interface Occurence {
    id: string;
    actorId: string;
    createdAt: Date;
    updatedAt: Date;
    entityId: string;
    actorName: string;
    actionType: ActionType | string;
    entityType: EntityType | string;
    metadata?: Record<string, any>;
}

export type UserRole =
    | "ADMIN"
    | "MENTOR"
    | "STUDENT"
    | "GUARDIAN"
    | "SCHOOL_ADMIN";

export interface MetaData {
    entryTitle?: string;
    name?: string;
    amount?: number;
    score?: number;
}

export interface Data<T> {
    name: T;
    value: number;
    lastValue?: number;
}

export type YearlyData = Data<number>[];

export type MonthlyData = Data<Month>[];

export type DailyData = Data<Day>[];

export type Stats = {
    [key: string]: number;
};
