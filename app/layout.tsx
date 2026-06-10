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
    metadataBase: new URL("https://{{APP_URL}}"),
    title: {
        template: "%s | {{APP_NAME}}",
        default: "{{APP_NAME}} | {{APP_TAGLINE}}",
    },
    description: "{{APP_DESCRIPTION}}",
    applicationName: "{{APP_NAME}}",
    keywords: ["{{APP_NAME}}", "{{KEYWORD}}", "{{KEYWORD}}"],
    authors: [{ name: "{{APP_NAME}}", url: "https://{{APP_URL}}" }],
    creator: "{{APP_NAME}}",
    publisher: "{{APP_NAME}}",
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/en-US",
        },
    },
    openGraph: {
        title: "{{APP_NAME}} | {{APP_TAGLINE}}",
        description: "{{APP_DESCRIPTION}}",
        url: "/",
        siteName: "{{APP_NAME}}",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "{{APP_NAME}}",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "{{APP_NAME}}",
        description: "{{APP_DESCRIPTION}}",
        images: ["/twitter-image.png"],
        site: "@{{APP_HANDLE}}",
        creator: "@{{APP_HANDLE}}",
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
        title: "{{APP_NAME}}",
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
        name: "{{APP_NAME}}",
        url: "https://{{APP_URL}}",
        logo: "https://{{APP_URL}}/images/general/waitlist-logo.png",
        description: "{{APP_DESCRIPTION}}",
        sameAs: [
            "https://twitter.com/{{APP_HANDLE}}",
            "https://linkedin.com/company/{{APP_HANDLE}}",
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
