import clsx from "clsx";
import Image from "next/image";
import { poppins } from "@/public/fonts/font";
import { notificationMap } from "@/lib/data/maps";
import type { Notification } from "@/lib/interface";

export default function NotificationCard({
    data,
}: {
    data: Notification;
}) {
    const { category } = data;

    const { label, description } = notificationMap[category];
    return (
        <div className={clsx("h-15 w-full overflow-hidden", poppins.className)}>
            <div className="flex h-full w-full items-start gap-x-3">
                <div className="shrink-0 rounded-full bg-stone-500 p-2 shadow-2xl">
                    <Image
                        height={30}
                        width={30}
                        alt="Alert icon"
                        src={"/images/general/alert-time.png"}
                        className="rounded-full"
                    />
                </div>
                <div>
                    <p className="text-[14px] font-semibold">{label}</p>
                    <p className="overflow-hidden text-[12px] font-normal">
                        {`${description.substring(0, 95)}...`}
                    </p>
                </div>
            </div>
        </div>
    );
}
