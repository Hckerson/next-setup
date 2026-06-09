import "swiper/css";
import "../styles/globals.css";
import { antonSc } from "@/public/fonts/font";
import type { Metadata, Viewport } from "next";
import "react-datepicker/dist/react-datepicker.css";
import Provider from "@/components/providers/provider";

export const viewport: Viewport = {
    themeColor: "#9136B7",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export const metadata: Metadata = {
    metadataBase: new URL("https://playwork.vercel.app"),
    title: {
        template: "%s | Playwork",
        default: "Playwork | Empowering Africa's Next Generation",
    },
    description:
        "Discover, compete, and engage with Playwork. The ultimate platform for mentoring, competitions, and discovering talent. Showcasing at GITEX Africa 2026.",
    applicationName: "Playwork",
    keywords: [
        "Playwork",
        "competition",
        "mentor",
        "talent",
        "submissions",
        "EdTech Africa",
        "GITEX 2026",
    ],
    authors: [{ name: "Playwork Dreams", url: "https://playwork.vercel.app" }],
    creator: "Playwork Dreams",
    publisher: "Playwork",
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/en-US",
        },
    },
    openGraph: {
        title: "Playwork | Empowering Africa's Next Generation",
        description:
            "Discover, compete, and engage with Playwork. The ultimate platform for mentoring, competitions, and discovering talent.",
        url: "/",
        siteName: "Playwork",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Playwork Platform",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Playwork",
        description:
            "Discover, compete, and engage with Playwork. The ultimate platform for mentoring, competitions, and discovering talent.",
        images: ["/twitter-image.png"],
        site: "@playwork",
        creator: "@playwork",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    appleWebApp: {
        capable: true,
        title: "Playwork",
        statusBarStyle: "black-translucent",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Playwork Dreams",
        url: "https://playwork.vercel.app",
        logo: "https://playwork.vercel.app/images/general/waitlist-logo.png",
        description:
            "The ultimate platform for mentoring, competitions, and discovering talent in Africa.",
        sameAs: [
            "https://twitter.com/playwork",
            "https://linkedin.com/company/playwork",
        ],
    };

    return (
        <html lang="en">
            <body
                className={`${antonSc.className} relative scroll-smooth antialiased`}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
