import clsx from "clsx";
import Image from "next/image";
import { format } from "date-fns";
import type { Transaction } from "@/lib/interface";
import { splitTitleCase } from "@/lib/utils/split-name";
import { TransactionAction, TransactionStatus } from "@/lib/enums/enums";

export const TransactionList = ({ data }: { data: Transaction }) => {
    const { referenceMessage, createdAt, amount, status, action } = data;
    const color =
        status === TransactionStatus.COMPLETED
            ? "green"
            : status === TransactionStatus.FAILED
              ? "red"
              : "yellow";
    const bgMap = {
        red: "bg-[#2B1020]",
        green: "bg-[#04372D]",
        yellow: "bg-[#373B20]",
    };
    return (
        <li className="w-full bg-[#041731] p-4">
            <div className="flex gap-2 font-medium">
                <div className="flex max-w-[20%] flex-1 flex-col justify-center">
                    <p className="xs-text">
                        {format(createdAt || Date.now(), "yyyy-MM-dd")}
                    </p>
                </div>
                <div className="flex max-w-[40%] flex-1 items-center">
                    <div
                        className={clsx(
                            "flex gap-x-1 rounded-2xl px-4 py-2 sm:rounded-3xl",
                        )}
                    >
                        <p>{referenceMessage}</p>
                    </div>
                </div>
                <div
                    className={clsx(
                        action === TransactionAction.WITHDRAWAL &&
                            "text-red-600",
                        "flex max-w-[18%] flex-1 items-center",
                    )}
                >
                    <span>
                        {action === TransactionAction.WITHDRAWAL ? "-" : "+"}
                    </span>
                    <p>{amount.toFixed(2)}</p>
                    <div className="ml-2 shrink-0">
                        <Image
                            height={22.5}
                            width={22.5}
                            alt="PP coin"
                            src={"/images/general/coin.png"}
                        />
                    </div>
                </div>
                <div className="flex max-w-[18%] flex-1 items-center gap-x-2">
                    <p
                        style={{ color }}
                        className={clsx(
                            "rounded-2xl px-4 py-2 sm:rounded-3xl",
                            bgMap[color],
                        )}
                    >
                        {splitTitleCase(status)}
                    </p>
                </div>
            </div>
        </li>
    );
};
