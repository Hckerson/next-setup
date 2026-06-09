import { Day, Month } from "../enums/enums";
import { BaseFinance, School, User } from "./index";
import { TransactionAction, TransactionStatus } from "../enums/enums";

export interface PricingData {
    id: string;
    type: string;
    link: string;
    span: string;
    label: string;
    amount: string;
    bestFor: string;
    perks: string[];
}

export interface Transaction extends BaseFinance {
    day: Day;
    user: User;
    id: string;
    year: number;
    month: Month;
    bank: string;
    school?: School;
    userId?: string;
    schoolId?: string;
    bankReferenceId: string;
    createdAt: Date | string;
    updatedAt?: Date | string;
    action: TransactionAction;
    status: TransactionStatus;
    referenceMessage?: string;
}

export interface Wallet {
    user: User;
    id: string;
    userId: string;
    balance: number;
    updatedAt: Date | string;
    createdAt: Date | string;
}
