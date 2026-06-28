import AuthTemplate from "@/components/ui/forms/auth-template";

export default function AdminAuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AuthTemplate>{children}</AuthTemplate>;
}
