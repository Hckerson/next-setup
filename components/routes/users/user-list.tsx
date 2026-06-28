import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import type { User } from "@/lib/interface";
import { splitTitleCase } from "@/lib/utils/split-name";

export const UserList = ({ data }: { data: User }) => {
    const { fullName, age, email, avatar, status, lastActive } = data;
    const color =
        status == "ACTIVE" ? "green" : status == "SUSPENDED" ? "red" : "yellow";
    const bgMap = {
        red: "bg-[#2B1020]",
        green: "bg-[#04372D]",
        yellow: "bg-[#373B20]",
    };

    // if issue remove <Link> and check
    return (
        <li className="w-full bg-[#051428] p-4 hover:bg-[#051b3a]">
            <Link href={`/dashboard/admin/users/${data.id}`}>
                <div className="flex gap-2 font-medium">
                    <div className="size-10 p-2">
                        <button className="h-full w-full rounded-sm border-2 border-gray-500 sm:rounded-md"></button>
                    </div>
                    <div className="max-w-[40%] flex-1">
                        <div className="flex items-center gap-x-2">
                            <div className="shrink-0 rounded-full">
                                <Image
                                    height={35}
                                    width={35}
                                    alt={`${fullName} avatar`}
                                    src={
                                        avatar ||
                                        "/images/general/empty-img.jpg"
                                    }
                                    className="rounded-full"
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="xs-text">{fullName}</p>
                                <p className="text-[7px] font-light text-white/50 sm:text-[14px]">
                                    {email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex max-w-[13%] flex-1 items-center">
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
                    <div className="flex max-w-[10%] flex-1 items-center">
                        <p>{age}</p>
                    </div>
                    <div className="flex max-w-[18%] flex-1 items-center gap-x-2">
                        <p>
                            {Number.parseFloat(
                                data.wallet?.balance
                                    ? `${data.wallet.balance}`
                                    : "0",
                            ).toFixed(2)}
                        </p>
                        <div className="shrink-0">
                            <Image
                                height={22.5}
                                width={22.5}
                                alt="PP coin"
                                src={"/images/general/coin.png"}
                            />
                        </div>
                    </div>
                    <div className="flex max-w-[13%] flex-1 items-center">
                        <p>
                            {lastActive
                                ? new Date(lastActive).toJSON().split("T")[0]
                                : "N/A"}
                        </p>
                    </div>
                    <div className="size-10">
                        <div className="flex gap-x-0.5">
                            <div className="size-1.5 rounded-full bg-white"></div>
                            <div className="size-1.5 rounded-full bg-white"></div>
                            <div className="size-1.5 rounded-full bg-white"></div>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
};
