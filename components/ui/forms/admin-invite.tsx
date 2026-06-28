"use client";
import clsx from "clsx";
import { useState } from "react";
import Button from "../../common/button";
import FormInput from "../../general/form-input";
import { poppins } from "@/public/fonts/font";
import { useAdminInvite } from "@/hooks/use-auth-admin";
import { adminInviteSchema } from "@/lib/validations/auth-admin";
import type { AdminInviteFormData } from "@/lib/validations/auth-admin";

const ADMIN_ROLES = [
    { label: "Super Admin", value: "SUPER_ADMIN" },
    { label: "Admin", value: "ADMIN" },
    { label: "Moderator", value: "MODERATOR" },
];

const ADMIN_PERMISSIONS = [
    { label: "Manage Users", value: "MANAGE_USERS" },
    { label: "Manage Contests", value: "MANAGE_CONTESTS" },
    { label: "Manage Mentors", value: "MANAGE_MENTORS" },
    { label: "Manage Payments", value: "MANAGE_PAYMENTS" },
    { label: "View Analytics", value: "VIEW_ANALYTICS" },
    { label: "Manage Alerts", value: "MANAGE_ALERTS" },
    { label: "System Settings", value: "SYSTEM_SETTINGS" },
];

interface AdminInviteFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function AdminInviteForm({
    onSuccess,
    onCancel,
}: AdminInviteFormProps) {
    const { mutate: invite, isPending } = useAdminInvite();
    const [formData, setFormData] = useState<Partial<AdminInviteFormData>>({
        email: "",
        fullName: "",
        role: "ADMIN",
        permissions: [],
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handlePermissionChange = (permission: string) => {
        setFormData((prev) => {
            const permissions = prev.permissions || [];
            if (permissions.includes(permission)) {
                return {
                    ...prev,
                    permissions: permissions.filter((p) => p !== permission),
                };
            } else {
                return {
                    ...prev,
                    permissions: [...permissions, permission],
                };
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});

        const result = adminInviteSchema.safeParse(formData);
        if (!result.success) {
            const errors: { [key: string]: string } = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    errors[err.path[0] as string] = err.message;
                }
            });
            setFormErrors(errors);
            return;
        }

        invite(result.data, {
            onSuccess: () => {
                setSuccessMessage(
                    `Invitation sent to ${formData.email}. They will receive an email with setup instructions.`,
                );
                setFormData({
                    email: "",
                    fullName: "",
                    role: "ADMIN",
                    permissions: [],
                });
                setTimeout(() => {
                    onSuccess?.();
                }, 2000);
            },
        });
    };

    if (successMessage) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
                <div className="rounded-full bg-green-500/20 p-3">
                    <svg
                        className="size-8 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <p className="text-center text-white">{successMessage}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <FormInput
                name="fullName"
                type="text"
                label="Full Name"
                value={formData.fullName || ""}
                placeholder="John Doe"
                error={formErrors.fullName}
                onChange={handleChange}
            />

            <FormInput
                name="email"
                type="email"
                label="Email Address"
                value={formData.email || ""}
                placeholder="admin@example.com"
                error={formErrors.email}
                onChange={handleChange}
            />

            <div>
                <label className="xs-text mb-2 block text-white/50">
                    Admin Role
                </label>
                <select
                    name="role"
                    value={formData.role || "ADMIN"}
                    onChange={handleChange}
                    className={clsx(
                        "xs-text w-full rounded-md border bg-white/10 p-3 sm:rounded-lg",
                        formErrors.role ? "border-red-500" : "border-white/30",
                    )}
                >
                    {ADMIN_ROLES.map((role) => (
                        <option key={role.value} value={role.value}>
                            {role.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="xs-text mb-3 block text-white/50">
                    Permissions
                </label>
                <div className="grid grid-cols-2 gap-3 rounded-md bg-white/5 p-4">
                    {ADMIN_PERMISSIONS.map((permission) => (
                        <div key={permission.value} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={permission.value}
                                checked={formData.permissions?.includes(permission.value) || false}
                                onChange={() => handlePermissionChange(permission.value)}
                                className="size-4 cursor-pointer rounded border-white/30 bg-white/10"
                            />
                            <label
                                htmlFor={permission.value}
                                className={clsx(
                                    "xs-text cursor-pointer text-white/70",
                                    poppins.className,
                                )}
                            >
                                {permission.label}
                            </label>
                        </div>
                    ))}
                </div>
                {formErrors.permissions && (
                    <p className="mt-2 text-[12px] font-medium text-red-500">
                        {formErrors.permissions}
                    </p>
                )}
            </div>

            <div className="flex gap-4">
                <Button
                    className={clsx(
                        "flex-1 bg-blue uppercase font-bold sm-text sm:rounded-lg rounded-md disabled:opacity-60",
                        poppins.className,
                    )}
                    disabled={isPending}
                >
                    {isPending ? "Sending Invite..." : "SEND INVITATION"}
                </Button>
                <Button
                    type="button"
                    className={clsx(
                        "flex-1 bg-white/10 border border-white/30 text-white uppercase font-bold sm-text sm:rounded-lg rounded-md hover:bg-white/15 transition-colors disabled:opacity-60",
                        poppins.className,
                    )}
                    onClick={onCancel}
                    disabled={isPending}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
