import Navbar from "@/components/common/navbar";
import Sidebar from "@/components/common/sidebar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={`xs:p-8 bg-background xs:gap-5 relative flex h-screen gap-4 scroll-smooth p-6 antialiased xl:gap-6 xl:p-9`}
        >
            <Sidebar />
            <div className="relative box-border flex h-full w-full flex-1 flex-col items-center rounded-xl sm:rounded-2xl">
                <div className="mx-auto flex h-full w-full flex-col overflow-hidden xl:max-w-500">
                    <Navbar />
                    <div className="flex-1 overflow-auto [scrollbar-width:none]">{children}</div>
                </div>
            </div>
        </div>
    );
}
