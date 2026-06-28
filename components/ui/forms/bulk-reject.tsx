"use client";
import clsx from "clsx";
import { useState } from "react";
import Button from "../../common/button";
import FormInput from "../../general/form-input";
import { poppins } from "@/public/fonts/font";
import { useBulkRejectItems } from "@/hooks/use-admin-forms";
import { bulkRejectSchema } from "@/lib/validations/admin";
import type { BulkRejectFormData } from "@/lib/validations/admin";

interface BulkRejectFormProps {
    selectedIds: string[];
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function BulkRejectForm({
    selectedIds,
    onSuccess,
    onCancel,
}: BulkRejectFormProps) {
    const { mutate: reject, isPending } = useBulkRejectItems();
    const [formData, setFormData] = useState<Partial<BulkRejectFormData>>({
        ids: selectedIds,
        reason: "",
        notifyUser: true,
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
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

        const result = bulkRejectSchema.safeParse(formData);
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

        reject(result.data, {
            onSuccess: () => {
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <div>
                <p className={clsx("xs-text mb-2 text-white/70", poppins.className)}>
                    Items to reject: <span className="font-semibold">{selectedIds.length}</span>
                </p>
                {formErrors.ids && (
                    <p className="text-[12px] font-medium text-red-500">
                        {formErrors.ids}
                    </p>
                )}
            </div>

            <FormInput
                name="reason"
                type="text"
                label="Rejection Reason"
                value={formData.reason || ""}
                placeholder="Explain why these items are being rejected"
                error={formErrors.reason}
                onChange={handleChange}
            />

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
                    Notify users about this rejection
                </label>
            </div>

            <div className="flex gap-4">
                <Button
                    className="flex-1 rounded-md bg-[#2B1020] hover:bg-[#3d1620] sm:rounded-lg"
                    disabled={isPending}
                >
                    {isPending ? "Rejecting..." : "Reject Items"}
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
