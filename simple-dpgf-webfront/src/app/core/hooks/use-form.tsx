import { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UnitEnum } from "../enums/UnitEnum";

export type FormValues<T extends object> = T;

interface IProps<T extends object> {
  initialFormValues: FormValues<T>;
  validate(formData: FormValues<T>): Record<string, string | undefined>;
  onSubmit(formData: FormValues<T>): Promise<void>;
}

export function useForm<T extends object>({
  initialFormValues,
  validate,
  onSubmit,
}: Readonly<IProps<T>>): FormHook<T> {
  const [formData, setFormData] = useState<FormValues<T>>(initialFormValues);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // handle change on form data
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      const parts = name.split(".");
      if (parts.length > 1) {
        // nested field
        const [outerKey, innerKey] = parts;
        setFormData((prev) => ({
          ...prev,
          [outerKey]: {
            ...prev[outerKey as keyof T],
            [innerKey]: value,
          },
        }));
      } else {
        // simple field
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    []
  );

  // handle select change on formData
  const handleSelectChange = useCallback(
    (event: SelectChangeEvent<UnitEnum>) => {
      const { name, value } = event.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // form data validation
  const validateForm = useCallback(
    (formData: FormValues<T>) => {
      const validationErrors = validate(formData);
      setErrors(validationErrors);
      return validationErrors;
    },
    [validate]
  );

  //reset form
  const resetForm = useCallback(() => {
    setFormData(initialFormValues);
    setErrors({});
  }, [initialFormValues]);

  useEffect(
    () => {
      resetForm();
    },
    // resetForm
    []
  );

  // submit form
  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setIsSubmitting(true);

      const validationErrors = validateForm(formData);

      if (
        Object.values(validationErrors).some((error) => error !== undefined)
      ) {
        setIsSubmitting(false);
        return;
      }

      try {
        await onSubmit(formData);
      } catch (error) {
        console.log("error in submit form", error);
      } finally {
        setIsSubmitting(false);
        resetForm();
      }
    },
    [formData, onSubmit, resetForm, validateForm]
  );

  return useMemo(
    () => ({
      formData,
      errors,
      isSubmitting,
      handleChange,
      handleSelectChange,
      handleSubmit,
      validateForm,
      resetForm,
    }),
    [
      formData,
      errors,
      isSubmitting,
      handleChange,
      handleSelectChange,
      handleSubmit,
      validateForm,
      resetForm,
    ]
  );
}

interface FormHook<T extends object> {
  formData: FormValues<T>;
  errors: Record<string, string | undefined>;
  isSubmitting: boolean;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (event: SelectChangeEvent<UnitEnum>) => void;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  validateForm(formData: FormValues<T>): Record<string, string | undefined>;
  resetForm: () => void;
}
