import Image from "next/image";
import "./collage.css";

const imagesCol1 = [
    "/images/login/1.png",
    "/images/login/4.png",
    "/images/login/7.png",
    "/images/login/10.png",
    "/images/login/13.png",
    "/images/login/16.png",
    "/images/login/19.png",
];

const imagesCol2 = [
    "/images/login/2.png",
    "/images/login/5.png",
    "/images/login/8.png",
    "/images/login/11.png",
    "/images/login/14.png",
    "/images/login/17.png",
    "/images/login/18.png",
];

const imagesCol3 = [
    "/images/login/3.png",
    "/images/login/6.png",
    "/images/login/9.png",
    "/images/login/12.png",
    "/images/login/15.png",
    "/images/login/18.png",
];

const Column = ({
    images,
    speed,
    reverse = false,
}: {
    images: string[];
    speed: string;
    reverse?: boolean;
}) => {
    // Duplicate images for infinite scroll effect
    const list = [...images, ...images];

    return (
        <div className="pause-on-hover relative flex h-full flex-col gap-4 overflow-hidden">
            <div
                className={`flex flex-col gap-4 md:gap-5 xl:gap-6 ${reverse ? "animate-scroll-down" : "animate-scroll-up"}`}
                style={{ animationDuration: speed }}
            >
                {list.map((src, i) => (
                    <div
                        key={i}
                        className="relative aspect-3/4 w-full shrink-0 overflow-hidden rounded-lg bg-[#1E242B] lg:rounded-xl"
                    >
                        <Image
                            src={src || "/images/general/empty-img.jpg"}
                            alt={`Auth Collage ${i}`}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 33vw"
                            priority={i < 3}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function AuthCollage() {
    return (
        <div className="relative size-full">
            <Image
                src="/images/login/frame.png"
                alt="Login frame image"
                fill
                className="absolute inset-0 z-10 object-cover"
            />
            <div className="grid h-full grid-cols-3 gap-4 overflow-hidden md:gap-5 xl:gap-6">
                <Column images={imagesCol1} speed="40s" />
                <Column images={imagesCol2} speed="50s" reverse />
                <Column images={imagesCol3} speed="36s" />
            </div>
        </div>
    );
}
