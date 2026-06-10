"use client";
import { useState } from "react";
import { z } from "zod";

// Shared controlled-form glue: holds formData/formErrors, clears a field's
// error on type, and runs safeParse → map issues → setFormErrors on submit.
// Replaces the block previously copy-pasted into every auth form.
export function useZodForm<Schema extends z.ZodType>(
    schema: Schema,
    initialValues: z.input<Schema>,
) {
    const [formData, setFormData] = useState<z.input<Schema>>(initialValues);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const setField = (name: string, value: string) => {
        // Assertion (not `any`): a computed string key widens the literal to a
        // string index signature, which TS won't narrow back to the schema input.
        setFormData((prev) => ({ ...prev, [name]: value }) as z.input<Schema>);
        if (formErrors[name]) {
            setFormErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setField(name, value);
    };

    const handleSubmit =
        (onValid: (data: z.output<Schema>) => void) =>
        (e: React.FormEvent) => {
            e.preventDefault();
            setFormErrors({});

            const result = schema.safeParse(formData);
            if (!result.success) {
                const errors: { [key: string]: string } = {};
                result.error.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        errors[issue.path[0] as string] = issue.message;
                    }
                });
                setFormErrors(errors);
                return;
            }

            onValid(result.data);
        };

    return { formData, formErrors, setField, handleChange, handleSubmit };
}
