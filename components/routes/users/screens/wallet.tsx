import clsx from "clsx";
import Image from "next/image";
import NoData from "@/components/common/noData";
import { TransactionList } from "../transaction-list";
import { antonSc } from "@/public/fonts/font";
import type { Transaction, Wallet } from "@/lib/interface";
import { useEffect, useMemo, useRef, useState } from "react";
import { TransactionAction, TransactionStatus } from "@/lib/enums/enums";
import { TransactionListSkeletonGroup } from "@/components/ui/skeletons/transaction-list-skeleton";
import { splitTitleCase } from "@/lib/utils/split-name";

export default function Wallet({
    wallet,
    isLoading,
    transactions,
}: {
    wallet?: Wallet;
    isLoading?: boolean;
    transactions: Transaction[];
}) {
    const typeRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);

    const [search, setSearch] = useState<string>("");
    const [typeOpen, setTypeOpen] = useState<boolean>(false);
    const [statusOpen, setStatusOpen] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<
        TransactionAction | undefined
    >(undefined);
    const [selectedStatus, setSelectedStatus] = useState<
        TransactionStatus | undefined
    >(undefined);
    const noTransactions = !transactions || transactions?.length === 0;

    const filteredTransactions = useMemo(() => {
        const filtered = transactions?.filter((tx) => {
            const isStatusMatch = selectedStatus
                ? tx.status === selectedStatus
                : true;
            const isTypeMatch = selectedType
                ? tx.action === selectedType
                : true;

            const isSearchMatch = search
                ? tx.bank?.toLowerCase().includes(search.toLowerCase())
                : true;

            return isStatusMatch && isTypeMatch && isSearchMatch;
        });
        return filtered;
    }, [transactions, search, selectedStatus, selectedType]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                typeRef.current &&
                !typeRef.current.contains(event.target as Node)
            ) {
                setTypeOpen(false);
            }
            if (
                statusRef.current &&
                !statusRef.current.contains(event.target as Node)
            ) {
                setStatusOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex h-full w-full gap-4">
            <div className="blue-gradient relative z-10 h-full w-[70%] rounded-xl sm:rounded-2xl">
                <div className="flex h-full gap-4 overflow-auto rounded-t-xl [scrollbar-width:none] sm:rounded-t-2xl">
                    <div className="flex flex-1 flex-col rounded-b-xl bg-[#041731] sm:rounded-b-2xl">
                        <div className="m-4 flex items-center gap-x-1">
                            <div className="shrink-0">
                                <Image
                                    height={15}
                                    width={15}
                                    alt="Time icon"
                                    src={"/images/general/time.png"}
                                />
                            </div>
                            <p className={clsx("xs-text", antonSc.className)}>
                                Recent Transactions
                            </p>
                        </div>
                        <div className="mx-4 rounded-xl bg-[#051B3A] p-4 sm:rounded-2xl">
                            <div
                                className={clsx(
                                    "grid grid-cols-[58%_20%_20%] gap-2",
                                    antonSc.className,
                                )}
                            >
                                <span className="relative flex w-full items-center justify-center gap-x-2 rounded-md bg-white/10 p-2 sm:rounded-lg">
                                    <div className="size-6 shrink-0">
                                        <Image
                                            height={40}
                                            width={40}
                                            alt="Search Icon"
                                            src={"/svgs/search.svg"}
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        name="search"
                                        id="search"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="placeholder:xs-text w-full flex-1 border-none placeholder:text-white/50 focus:outline-none"
                                        placeholder="Search by Bank"
                                    />
                                </span>
                                <div
                                    ref={typeRef}
                                    className="relative flex items-center justify-between rounded-md bg-white/10 sm:rounded-lg"
                                >
                                    <button
                                        onClick={() => setTypeOpen(!typeOpen)}
                                        className="flex w-full items-center justify-between px-2 py-3 text-left outline-none sm:px-3"
                                    >
                                        <span className="truncate text-white/50">
                                            {Object.entries(
                                                TransactionAction,
                                            ).find(
                                                ([, action]) =>
                                                    action === selectedType,
                                            )?.[0] || "Type"}
                                        </span>
                                        <div className="rounded-sm p-1 hover:bg-[#111F33]">
                                            <Image
                                                height={50}
                                                width={50}
                                                alt="Caret down icon"
                                                src={"/svgs/caret-down.svg"}
                                                className={clsx(
                                                    "size-5 transition-transform duration-200",
                                                    typeOpen && "rotate-180",
                                                )}
                                            />
                                        </div>
                                    </button>
                                    {typeOpen && (
                                        <ul className="absolute top-[105%] left-0 z-50 max-h-60 w-full overflow-auto rounded-md border border-white/10 bg-[#051B3A] py-1 shadow-lg [scrollbar-color:#051b3a_#051428] [scrollbar-width:thin]">
                                            <li
                                                onClick={() => {
                                                    setSelectedType(undefined);
                                                    setTypeOpen(false);
                                                }}
                                                className="cursor-pointer px-4 py-2 text-white/70 hover:bg-white/10 hover:text-white"
                                            >
                                                All
                                            </li>
                                            {Object.entries(
                                                TransactionAction,
                                            ).map(([, action]) => (
                                                <li
                                                    key={action}
                                                    onClick={() => {
                                                        setSelectedType(action);
                                                        setTypeOpen(false);
                                                    }}
                                                    className="cursor-pointer px-4 py-2 text-white/70 hover:bg-white/10 hover:text-white"
                                                >
                                                    {action}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div
                                    ref={statusRef}
                                    className="relative flex items-center justify-between rounded-md bg-white/10 sm:rounded-lg"
                                >
                                    <button
                                        onClick={() =>
                                            setStatusOpen(!statusOpen)
                                        }
                                        className="flex w-full items-center justify-between px-2 py-3 text-left outline-none sm:px-3"
                                    >
                                        <span className="truncate text-white/50">
                                            {Object.entries(
                                                TransactionStatus,
                                            ).find(
                                                ([, status]) =>
                                                    status === selectedStatus,
                                            )?.[0] || "Status"}
                                        </span>
                                        <div className="rounded-sm p-1 hover:bg-[#111F33]">
                                            <Image
                                                height={50}
                                                width={50}
                                                alt="Caret down icon"
                                                src={"/svgs/caret-down.svg"}
                                                className={clsx(
                                                    "size-5 transition-transform duration-200",
                                                    statusOpen && "rotate-180",
                                                )}
                                            />
                                        </div>
                                    </button>
                                    {statusOpen && (
                                        <ul className="absolute top-[105%] left-0 z-50 max-h-60 w-full overflow-auto rounded-md border border-white/10 bg-[#051B3A] py-1 shadow-lg [scrollbar-color:#051b3a_#051428] [scrollbar-width:thin]">
                                            <li
                                                onClick={() => {
                                                    setSelectedStatus(
                                                        undefined,
                                                    );
                                                    setStatusOpen(false);
                                                }}
                                                className="cursor-pointer px-4 py-2 text-white/70 hover:bg-white/10 hover:text-white"
                                            >
                                                All
                                            </li>
                                            {Object.entries(
                                                TransactionStatus,
                                            ).map(([, status]) => (
                                                <li
                                                    key={status}
                                                    onClick={() => {
                                                        setSelectedStatus(
                                                            status,
                                                        );
                                                        setStatusOpen(false);
                                                    }}
                                                    className="cursor-pointer px-4 py-2 text-white/70 hover:bg-white/10 hover:text-white"
                                                >
                                                    {splitTitleCase(
                                                        status,
                                                    ).toUpperCase()}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="m-4 mt-4 flex flex-1 flex-col overflow-auto rounded-t-xl [scrollbar-width:none] sm:rounded-t-2xl">
                            <div
                                className={clsx(
                                    "relative flex h-full w-full flex-col",
                                    antonSc.className,
                                    "xs-text",
                                )}
                            >
                                <div className="sticky top-0 z-30 w-full rounded-t-xl bg-[#051B3A] p-4 sm:rounded-t-2xl">
                                    <div className="xs-text flex gap-2 font-medium">
                                        <div className="flex max-w-[20%] flex-1 items-center">
                                            <p>Date</p>
                                        </div>
                                        <div className="flex max-w-[40%] flex-1 items-center">
                                            <p className="px-4 py-2">
                                                Type/Description
                                            </p>
                                        </div>
                                        <div className="flex max-w-[18%] flex-1 items-center">
                                            <p>Amount</p>
                                        </div>
                                        <div className="flex max-w-[18%] flex-1 items-center">
                                            <p>Status</p>
                                        </div>
                                    </div>
                                </div>
                                <ul className="w-full flex-1 [&>li]:border-b [&>li]:border-[#052148] [&>li:last-child]:border-b-0">
                                    {isLoading && noTransactions ? (
                                        <TransactionListSkeletonGroup
                                            count={5}
                                        />
                                    ) : noTransactions ? (
                                        <NoData label="Transactions" />
                                    ) : (
                                        filteredTransactions?.map(
                                            (transaction, idx) => (
                                                <TransactionList
                                                    key={idx}
                                                    data={transaction}
                                                />
                                            ),
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="z-10 flex-1">
                <div className="blue-gradient relative h-fit w-full flex-1 rounded-3xl">
                    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-[#041731]">
                        <div className="sticky top-0 flex items-center rounded-3xl p-4">
                            <div className="flex gap-x-2">
                                <div className="shrink-0">
                                    <Image
                                        src={"/images/general/wallet.png"}
                                        width={25}
                                        height={25}
                                        alt="Wallet icon"
                                    />
                                </div>
                                <p className="sm-text">Wallet </p>
                            </div>
                        </div>
                        <div className="w-full gap-x-2 p-5 pt-0">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-x-2">
                                    <p
                                        className={clsx(
                                            "large-text",
                                            antonSc.className,
                                        )}
                                    >
                                        ₦{" "}
                                        {Number.parseFloat(
                                            (wallet?.balance as unknown as string) ||
                                                "0",
                                        ).toFixed(2) ?? 0}
                                    </p>
                                    <div className="shrink-0">
                                        <Image
                                            src={"/images/general/pp-coin.png"}
                                            width={50}
                                            height={50}
                                            alt="PP coin"
                                        />
                                    </div>
                                </div>
                                <p
                                    className={clsx(
                                        antonSc.className,
                                        "xs-text text-center font-semibold text-white/60 italic!",
                                    )}
                                >
                                    ₦{" "}
                                    {Number.parseFloat(
                                        (wallet?.balance as unknown as string) ||
                                            "0",
                                    ).toFixed(2) ?? 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
