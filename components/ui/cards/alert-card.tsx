import clsx from "clsx";
import { JSX } from "react";
import Image from "next/image";
import { poppins } from "@/public/fonts/font";
import { notificationMap } from "@/lib/data/maps";
import { NotificationCategory } from "@/lib/enums/enums";
import Link from "next/link";

export interface AlertData {
    category: NotificationCategory;
    count: number;
}

export default function AlertCard({ data }: { data: AlertData }) {
    const { category, count } = data;
    const text: Record<NotificationCategory, (number: number) => JSX.Element> =
        {
            MODERATION: (number: number) => (
                <p className={poppins.className}>
                    <span className="font-bold">{number} submissions</span>{" "}
                    awaiting moderation
                </p>
            ),
            PENDING_WITHDRAWAL: (number: number) => (
                <p className={poppins.className}>
                    <span className="font-bold">{number} withdrawal</span>{" "}
                    requests pending
                </p>
            ),
            RECONCILIATION: (number: number) => (
                <p className={poppins.className}>
                    Monthly reconciliation due in{` `}
                    <span className="font-bold">{number} days</span>
                </p>
            ),
            PAYMENT_DELAY: () => (
                <p className={poppins.className}>
                    Payment processing delays detected
                </p>
            ),
            PAYMENT_DISPUTE: (number: number) => (
                <p className={poppins.className}>
                    <span className="font-bold">
                        {number} payment dispute {` `}
                    </span>
                    opened in last 24hrs
                </p>
            ),
            NEW_ENTRIES: (number: number) => (
                <p className={poppins.className}>
                    <span className="font-bold">{number} new entries</span>{" "}
                    pending review
                </p>
            ),
            JUDGES_LATE: (number: number) => (
                <p className={poppins.className}>
                    <span className="font-bold">{number} judge</span> behind
                    schedule
                </p>
            ),
            HIGH_PRIORITY_FLAGGED: (number: number) => (
                <p className={poppins.className}>
                    <span className="font-bold">{number} entry</span> flagged
                    for urgent review
                </p>
            ),
            WITHDRAWAL_REQUEST: (number: number) => (
                <p className={poppins.className}>
                    <span className="font-bold">{number} withdrawal</span>{" "}
                    requests awaiting approval
                </p>
            ),
            CONTEST_SUBMISSION_DEADLINE: (number: number) => (
                <p className={poppins.className}>
                    Contest deadline approaching in{` `}
                    <span className="font-bold">{number} days</span>
                </p>
            ),
            REPORT_SUBMISSION: (number: number) => (
                <p className={poppins.className}>
                    <span className="font-bold">{number} user report</span>{" "}
                    submitted
                </p>
            ),
            SCHOOL_VERIFICATION_PENDING: (number: number) => (
                <p className={poppins.className}>
                    <span className="font-bold">{number} school</span> awaiting
                    verification
                </p>
            ),
            UNUSUAL_ACTIVITY: (number: number) => (
                <p className={poppins.className}>
                    Unusual activity detected on{` `}
                    <span className="font-bold">{number} account</span>
                </p>
            ),
            MONTHLY_REPORT: (number: number) => (
                <p className={poppins.className}>
                    {number} monthly report is{` `}
                    <span className="font-bold">ready to review</span>
                </p>
            ),
            MARKETING_ASSETS_REQUIRED: (number: number) => (
                <p className={poppins.className}>
                    <span className="font-bold">{number} contest</span> missing
                    marketing assets
                </p>
            ),
        };

    const content = text[category];

    return (
        <div className="w-full rounded-md bg-[#05234D] p-2 sm:rounded-lg">
            <div className="xs-text flex h-full w-full gap-x-2">
                <div className="shrink-0 rounded-full shadow-2xl">
                    <Image
                        height={25}
                        width={25}
                        alt={""}
                        src={
                            notificationMap[category]?.src ||
                            "/images/general/empty-img.jpg"
                        }
                    />
                </div>
                <div>
                    <span className="inline-flex gap-x-1">
                        {content(count)} {` `}
                    </span>

                    <Link
                        href={notificationMap[category]?.link}
                        className={clsx(
                            poppins.className,
                            "text-[7px] text-[#03B2D1] sm:text-[14px] hover:text-[#0AE5FF] hover:underline transition-colors",
                        )}
                    >
                        {notificationMap[category]?.label}
                    </Link>
                </div>
            </div>
        </div>
    );
}
