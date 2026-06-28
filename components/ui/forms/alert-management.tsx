"use client";
import clsx from "clsx";
import { useState } from "react";
import Button from "../../common/button";
import FormInput from "../../general/form-input";
import { poppins } from "@/public/fonts/font";
import { useManageAlerts } from "@/hooks/use-admin-forms";
import { alertManagementSchema } from "@/lib/validations/admin";
import type { AlertManagementFormData } from "@/lib/validations/admin";

interface AlertManagementFormProps {
    selectedAlertIds: string[];
    onSuccess?: () => void;
    onCancel?: () => void;
}

const ACTIONS = [
    { label: "Resolve", value: "RESOLVE" },
    { label: "Dismiss", value: "DISMISS" },
    { label: "Escalate", value: "ESCALATE" },
    { label: "Snooze", value: "SNOOZE" },
];

export default function AlertManagementForm({
    selectedAlertIds,
    onSuccess,
    onCancel,
}: AlertManagementFormProps) {
    const { mutate: manageAlerts, isPending } = useManageAlerts();
    const [formData, setFormData] = useState<Partial<AlertManagementFormData>>({
        alertIds: selectedAlertIds,
        action: "RESOLVE",
        notes: "",
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "snoozeDuration" ? Number(value) : value,
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

        const result = alertManagementSchema.safeParse(formData);
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

        manageAlerts(result.data, {
            onSuccess: () => {
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <div>
                <p className={clsx("xs-text mb-2 text-white/70", poppins.className)}>
                    Alerts to manage: <span className="font-semibold">{selectedAlertIds.length}</span>
                </p>
                {formErrors.alertIds && (
                    <p className="text-[12px] font-medium text-red-500">
                        {formErrors.alertIds}
                    </p>
                )}
            </div>

            <div>
                <label className="xs-text mb-2 block text-white/50">
                    Action
                </label>
                <select
                    name="action"
                    value={formData.action || "RESOLVE"}
                    onChange={handleChange}
                    className={clsx(
                        "xs-text w-full rounded-md border bg-white/10 p-3 sm:rounded-lg transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#045FE1] focus:bg-white/20",
                        formErrors.action ? "border-red-500" : "border-white/30",
                    )}
                >
                    {ACTIONS.map((action) => (
                        <option key={action.value} value={action.value}>
                            {action.label}
                        </option>
                    ))}
                </select>
            </div>

            {formData.action === "SNOOZE" && (
                <FormInput
                    name="snoozeDuration"
                    type="number"
                    label="Snooze Duration (minutes)"
                    value={formData.snoozeDuration?.toString() || ""}
                    placeholder="5 to 1440 minutes"
                    error={formErrors.snoozeDuration}
                    onChange={handleChange}
                />
            )}

            <FormInput
                name="notes"
                type="text"
                label="Notes"
                value={formData.notes || ""}
                placeholder="Add internal notes about this action"
                error={formErrors.notes}
                onChange={handleChange}
                optional
            />

            <div className="flex gap-4">
                <Button
                    className="flex-1 rounded-md bg-[#045FE1] hover:bg-[#0673f8] sm:rounded-lg"
                    disabled={isPending}
                >
                    {isPending ? "Processing..." : "Apply Action"}
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
