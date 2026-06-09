import SignupForm from "@/components/ui/forms/signup-student";
import AuthTemplate from "@/components/ui/forms/auth-template";

export default function StudentSignup() {
    return (
        <AuthTemplate>
            <SignupForm />
        </AuthTemplate>
    );
}
