"use client";
import clsx from "clsx";
import { useState } from "react";
import Button from "../../common/button";
import FormInput from "../../general/form-input";
import { poppins } from "@/public/fonts/font";
import { useSuspendUserAction } from "@/hooks/use-admin-forms";
import { suspendUserSchema } from "@/lib/validations/admin";
import type { SuspendUserFormData } from "@/lib/validations/admin";

interface SuspendUserFormProps {
    userId: string;
    userName?: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function SuspendUserForm({
    userId,
    userName = "User",
    onSuccess,
    onCancel,
}: SuspendUserFormProps) {
    const { mutate: suspend, isPending } = useSuspendUserAction();
    const [formData, setFormData] = useState<Partial<SuspendUserFormData>>({
        userId,
        reason: "",
        duration: "TEMPORARY",
        durationDays: 7,
        notifyUser: true,
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "durationDays"
                      ? Number(value)
                      : value,
        }));
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

        const result = suspendUserSchema.safeParse(formData);
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

        suspend(result.data, {
            onSuccess: () => {
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <div className="rounded-md bg-red-500/10 border border-red-500/20 p-4">
                <p className={clsx("xs-text text-red-400", poppins.className)}>
                    ⚠️ You are about to suspend <span className="font-semibold">{userName}</span>. This action will prevent them from accessing the platform.
                </p>
            </div>

            <FormInput
                name="reason"
                type="text"
                label="Reason for Suspension"
                value={formData.reason || ""}
                placeholder="Explain the reason for this suspension"
                error={formErrors.reason}
                onChange={handleChange}
            />

            <div>
                <label className="xs-text mb-2 block text-white/50">
                    Suspension Type
                </label>
                <select
                    name="duration"
                    value={formData.duration || "TEMPORARY"}
                    onChange={handleChange}
                    className={clsx(
                        "xs-text w-full rounded-md border bg-white/10 p-3 sm:rounded-lg transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#045FE1] focus:bg-white/20",
                        formErrors.duration ? "border-red-500" : "border-white/30",
                    )}
                >
                    <option value="TEMPORARY">Temporary</option>
                    <option value="PERMANENT">Permanent</option>
                </select>
            </div>

            {formData.duration === "TEMPORARY" && (
                <FormInput
                    name="durationDays"
                    type="number"
                    label="Duration (days)"
                    value={formData.durationDays?.toString() || ""}
                    placeholder="1 to 365 days"
                    error={formErrors.durationDays}
                    onChange={handleChange}
                />
            )}

            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id="notifyUser"
                    name="notifyUser"
                    checked={formData.notifyUser !== false}
                    onChange={handleChange}
                    className="size-4 cursor-pointer rounded border-white/30 bg-white/10"
                />
                <label
                    htmlFor="notifyUser"
                    className={clsx("xs-text cursor-pointer text-white/70", poppins.className)}
                >
                    Send notification email to user
                </label>
            </div>

            <div className="flex gap-4">
                <Button
                    className="flex-1 rounded-md bg-[#FF0000]/40 hover:bg-[#FF0000]/60 sm:rounded-lg"
                    disabled={isPending}
                >
                    {isPending ? "Suspending..." : "Confirm Suspension"}
                </Button>
                <Button
                    type="button"
                    className="flex-1 rounded-md bg-[#051B3A] hover:bg-[#0A2855] sm:rounded-lg"
                    onClick={onCancel}
                    disabled={isPending}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
