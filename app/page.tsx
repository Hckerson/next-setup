import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { poppins } from "@/public/fonts/font";

export const metadata: Metadata = {
    title: "Waitlist",
    description: "Playwork Dreams will be showcasing at GITEX Africa 2026. Join our waitlist today to be part of the future of EdTech.",
};

export default function Waitlist() {
    return (
        <div className="relative box-border flex h-screen min-h-150 w-full items-center overflow-hidden bg-white!">
            <div className="absolute -top-24 -left-24">
                <Image
                    height={500}
                    width={500}
                    alt="Chained light bulb"
                    src={"/images/general/chained-light-bulb.png"}
                    className="h-auto max-w-xs md:max-w-lg xl:max-w-2xl"
                />
            </div>
            <div className="absolute inset-x-0 top-0 left-0 flex h-40 w-full items-end">
                <div className="mx-auto">
                    <Image
                        height={75}
                        width={300}
                        alt="Waitlist logo"
                        src={"/images/general/waitlist-logo.png"}
                    />
                </div>
            </div>
            <div
                className={clsx(
                    poppins.className,
                    "relative mx-auto max-w-3xl space-y-5 translate-y-5 px-5 text-black",
                )}
            >
                <div className="absolute -top-5 -right-5 shrink-0">
                    <Image
                        height={25}
                        width={25}
                        alt="Star"
                        src={"/images/general/star.png"}
                    />
                </div>
                <div className="absolute top-1/3 -left-15 shrink-0">
                    <Image
                        height={15}
                        width={15}
                        alt="Star"
                        src={"/images/general/star.png"}
                    />
                </div>
                <p className="base-text text-center font-semibold">
                    We have been selected by{" "}
                    <span className="text-[#FE7300]">NITDA</span> to represent
                    Nigeria at{" "}
                    <span className="text-[#FE7300]">GITEX Africa 2026</span>{" "}
                    and we couldn’t be more ready.
                </p>
                <p className="sm-text text-center">
                    At GITEX Africa 2026, Playwork Dreams will be showcasing its
                    platform at{" "}
                    <span className="font-semibold">Stand 20D-130</span>. We are
                    actively seeking partnerships with EdTech innovators,
                    content creators, impact investors, and child-focused brands
                    ready to invest in the digital future of Africa’s next
                    generation.
                </p>
                <div className="mx-auto flex w-3/4 flex-col items-center gap-3">
                    <Link
                        href="https://cal.com/playworkdreams/playwork-dreams-in-gitex-2026"
                        className="w-full rounded-3xl bg-[#9136B7] p-3 text-white"
                    >
                        <p className="sm-text text-center">
                            Schedule a meeting
                        </p>
                    </Link>
                    <Link
                        href="https://forms.gle/tyVofRgxDLnLnyhx8"
                        className="w-full rounded-3xl border border-[#9136B7] p-3 text-[#9136B7]"
                    >
                        <p className="sm-text text-center">
                            Join the waiting list
                        </p>
                    </Link>
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 left-0">
                <div className="relative inset-0 hidden lg:block">
                    <Image
                        height={460}
                        width={400}
                        alt="Biking avatars"
                        src={"/images/general/waitlist-bikers.png"}
                        className="absolute bottom-0 left-0 z-20 translate-y-30"
                    />
                    <Image
                        height={460}
                        width={400}
                        alt="Speaking avatars"
                        src={"/images/general/waitlist-speakers.png"}
                        className="absolute right-0 bottom-0 z-20 translate-y-20"
                    />
                </div>
                <Image
                    height={30}
                    width={2000}
                    alt="wave"
                    src={"/images/general/wave.png"}
                    className="relative z-30"
                />
            </div>
        </div>
    );
}
