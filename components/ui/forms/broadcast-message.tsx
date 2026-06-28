"use client";
import clsx from "clsx";
import { useState } from "react";
import Button from "../../common/button";
import FormInput from "../../general/form-input";
import { poppins } from "@/public/fonts/font";
import { useBroadcastMessage } from "@/hooks/use-admin-forms";
import { broadcastMessageSchema } from "@/lib/validations/admin";
import type { BroadcastMessageFormData } from "@/lib/validations/admin";

interface BroadcastMessageFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

const RECIPIENT_TYPES = [
    { label: "All Users", value: "ALL" },
    { label: "Admins Only", value: "ADMINS" },
    { label: "Mentors", value: "MENTORS" },
    { label: "Students", value: "STUDENTS" },
    { label: "Schools", value: "SCHOOLS" },
];

const PRIORITY_LEVELS = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
    { label: "Critical", value: "CRITICAL" },
];

export default function BroadcastMessageForm({
    onSuccess,
    onCancel,
}: BroadcastMessageFormProps) {
    const { mutate: broadcast, isPending } = useBroadcastMessage();
    const [formData, setFormData] = useState<Partial<BroadcastMessageFormData>>({
        title: "",
        message: "",
        recipientType: "ALL",
        priority: "MEDIUM",
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});

        const result = broadcastMessageSchema.safeParse(formData);
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

        broadcast(result.data, {
            onSuccess: () => {
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <FormInput
                name="title"
                type="text"
                label="Message Title"
                value={formData.title || ""}
                placeholder="Enter the title of your message"
                error={formErrors.title}
                onChange={handleChange}
            />

            <div>
                <label className="xs-text mb-2 block text-white/50">
                    Message Body
                </label>
                <textarea
                    name="message"
                    value={formData.message || ""}
                    placeholder="Enter your message here..."
                    onChange={handleChange}
                    className={clsx(
                        "xs-text w-full rounded-md border bg-white/10 p-3 sm:rounded-lg transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#045FE1] focus:bg-white/20",
                        formErrors.message ? "border-red-500" : "border-white/30",
                    )}
                    rows={5}
                />
                {formErrors.message && (
                    <p className="mt-1 text-[12px] font-medium text-red-500">
                        {formErrors.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="xs-text mb-2 block text-white/50">
                        Send To
                    </label>
                    <select
                        name="recipientType"
                        value={formData.recipientType || "ALL"}
                        onChange={handleChange}
                        className={clsx(
                            "xs-text w-full rounded-md border bg-white/10 p-3 sm:rounded-lg transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#045FE1] focus:bg-white/20",
                            formErrors.recipientType ? "border-red-500" : "border-white/30",
                        )}
                    >
                        {RECIPIENT_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="xs-text mb-2 block text-white/50">
                        Priority
                    </label>
                    <select
                        name="priority"
                        value={formData.priority || "MEDIUM"}
                        onChange={handleChange}
                        className={clsx(
                            "xs-text w-full rounded-md border bg-white/10 p-3 sm:rounded-lg transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#045FE1] focus:bg-white/20",
                            formErrors.priority ? "border-red-500" : "border-white/30",
                        )}
                    >
                        {PRIORITY_LEVELS.map((level) => (
                            <option key={level.value} value={level.value}>
                                {level.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex gap-4">
                <Button
                    className="flex-1 rounded-md bg-[#045FE1] hover:bg-[#0673f8] sm:rounded-lg"
                    disabled={isPending}
                >
                    {isPending ? "Sending..." : "Send Message"}
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
