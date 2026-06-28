"use client";
import { useState } from "react";
import Button from "../../common/button";
import { loginSchema } from "@/lib/validations/auth";

// Example: Form component with manual state + Zod validation
export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});

        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            const errors: { [key: string]: string } = {};
            result.error.issues.forEach((err) => {
                errors[err.path[0] as string] = err.message;
            });
            setFormErrors(errors);
            return;
        }

        // TODO: Call mutation hook here: mutate(result.data)
        setIsLoading(true);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 pad">
            <h1 className="base-text font-bold">Login</h1>

            <div>
                <label className="sm-text block mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                        {formErrors.email}
                    </p>
                )}
            </div>

            <div>
                <label className="sm-text block mb-2">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {formErrors.password && (
                    <p className="text-red-500 text-xs mt-1">
                        {formErrors.password}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={isLoading} className="mt-4">
                {isLoading ? "Logging in..." : "Log In"}
            </Button>
        </form>
    );
}
