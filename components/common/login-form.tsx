"use client";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "@/components/common/button";
import { TextInput } from "@/components/ui/forms";
import { INVALID_CREDENTIALS } from "@/lib/constants";
import { useLogin } from "@/lib/hooks/use-login";

interface Props {
    next: string;
}

const FIELDS = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
] as const;

export default function LoginForm({ next }: Props) {
    const router = useRouter();
    const login = useLogin();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const update =
        (field: (typeof FIELDS)[number]["name"]) =>
        (event: ChangeEvent<HTMLInputElement>) =>
            setCredentials((current) => ({
                ...current,
                [field]: event.target.value,
            }));

    const submit = (event: FormEvent) => {
        event.preventDefault();
        login.mutate(credentials, {
            onSuccess: () => {
                router.push(next);
                router.refresh();
            },
        });
    };

    return (
        <form
            onSubmit={submit}
            noValidate
            className="border-border bg-background-alt flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4"
        >
            <h1 className="text-text text-sm font-semibold">Sign in</h1>

            {FIELDS.map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5">
                    <label
                        htmlFor={field.label}
                        className="text-text-secondary text-xs font-medium"
                    >
                        {field.label}
                    </label>
                    <TextInput
                        label={field.label}
                        type={field.type}
                        value={credentials[field.name]}
                        handleChange={update(field.name)}
                    />
                </div>
            ))}

            {login.isError && (
                <p role="alert" className="text-danger text-xs">
                    {INVALID_CREDENTIALS}
                </p>
            )}

            <Button type="submit" isLoading={login.isPending} size="lg">
                Sign in
            </Button>
        </form>
    );
}
