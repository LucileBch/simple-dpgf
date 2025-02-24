import { useCallback, useEffect, useMemo, useState } from "react";
export function useForm({ initialFormValues, validate, onSubmit, }) {
    const [formData, setFormData] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    // handle change on form data
    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        const parts = name.split(".");
        if (parts.length > 1) {
            // nested field
            const [outerKey, innerKey] = parts;
            setFormData((prev) => ({
                ...prev,
                [outerKey]: {
                    ...prev[outerKey],
                    [innerKey]: value,
                },
            }));
        }
        else {
            // simple field
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }, []);
    // handle select change on formData
    const handleSelectChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);
    // form data validation
    const validateForm = useCallback((formData) => {
        const validationErrors = validate(formData);
        setErrors(validationErrors);
        return validationErrors;
    }, [validate]);
    //reset form
    const resetForm = useCallback(() => {
        setFormData(initialFormValues);
        setErrors({});
    }, [initialFormValues]);
    useEffect(() => {
        resetForm();
    }, 
    // resetForm
    []);
    // submit form
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const validationErrors = validateForm(formData);
        if (Object.values(validationErrors).some((error) => error !== undefined)) {
            setIsSubmitting(false);
            return;
        }
        try {
            await onSubmit(formData);
        }
        catch (error) {
            console.log("error in submit form", error);
        }
        finally {
            setIsSubmitting(false);
            resetForm();
        }
    }, [formData, onSubmit, resetForm, validateForm]);
    return useMemo(() => ({
        formData,
        errors,
        isSubmitting,
        handleChange,
        handleSelectChange,
        handleSubmit,
        validateForm,
        resetForm,
    }), [
        formData,
        errors,
        isSubmitting,
        handleChange,
        handleSelectChange,
        handleSubmit,
        validateForm,
        resetForm,
    ]);
}
