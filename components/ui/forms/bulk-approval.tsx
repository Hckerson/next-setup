"use client";
import clsx from "clsx";
import { useState } from "react";
import Button from "../../common/button";
import FormInput from "../../general/form-input";
import { poppins } from "@/public/fonts/font";
import { useBulkApproveItems } from "@/hooks/use-admin-forms";
import { bulkApprovalSchema } from "@/lib/validations/admin";
import type { BulkApprovalFormData } from "@/lib/validations/admin";
import { ZodError } from "zod";

interface BulkApprovalFormProps {
    selectedIds: string[];
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function BulkApprovalForm({
    selectedIds,
    onSuccess,
    onCancel,
}: BulkApprovalFormProps) {
    const { mutate: approve, isPending } = useBulkApproveItems();
    const [formData, setFormData] = useState<Partial<BulkApprovalFormData>>({
        ids: selectedIds,
        reason: "",
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        const result = bulkApprovalSchema.safeParse(formData);
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

        approve(result.data, {
            onSuccess: () => {
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <div>
                <p className={clsx("xs-text mb-2 text-white/70", poppins.className)}>
                    Items to approve: <span className="font-semibold">{selectedIds.length}</span>
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
                label="Reason for Approval"
                value={formData.reason || ""}
                placeholder="Optional: Provide context for this approval"
                error={formErrors.reason}
                onChange={handleChange}
                optional
            />

            <div className="flex gap-4">
                <Button
                    className="flex-1 rounded-md bg-[#04372D] hover:bg-[#065f3c] sm:rounded-lg"
                    disabled={isPending}
                >
                    {isPending ? "Approving..." : "Approve Items"}
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
