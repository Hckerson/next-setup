import { Day, Month } from "../enums/enums";
import { SchoolStatus } from "../enums/enums";
import { Wallet, Contest, Student, BaseImage, Transaction } from "./index";

export interface School extends BaseImage {
    day: Day;
    id: string;
    rank: number;
    year: number;
    month: Month;
    name: string;
    state?: string;
    wallet?: Wallet;
    country?: string;
    contests: Contest[];
    students: Student[];
    totalWinners: number;
    status: SchoolStatus;
    totalEntries: number;
    totalStudents: number;
    updatedAt?: Date | string;
    createdAt: Date | string;
    totalAmountEarned: number;
    transactions: Transaction[];
}
