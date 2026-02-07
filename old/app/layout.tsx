import "./globals.css";
import type { Metadata } from "next";
import { inter } from "@/app/fonts/font";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LenisScrollContainer from "@/hooks/lenis";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://hckerson.vercel.app"),
  title: "Hckerson - Portfolio",
  description: "Full-Stack Developer specializing in Next.js & Tailwind CSS",
  keywords: [
    "developer",
    "portfolio",
    "web development",
    "nextjs",
    "tailwind css",
    "backend",
    "frontend",
    "full-stack",
    "javascript",
    "typescript",
    "react",
    "nodejs",
    "express",
    "mongodb",
    "postgresql",
    "docker",
    "kubernetes",
    "aws",
    "ci/cd",
    "devops",
  ],
  authors: [{ name: "Hckerson" }],
  creator: "Hckerson",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hckerson.vercel.app",
    title: "Hckerson - Portfolio",
    description: "Full-Stack Developer specializing in Next.js & Tailwind CSS",
    siteName: "Hckerson Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hckerson - Portfolio",
    description: "Full-Stack Developer specializing in Next.js & Tailwind CSS",
    creator: "@hckerson",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <LenisScrollContainer>{children}</LenisScrollContainer>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
