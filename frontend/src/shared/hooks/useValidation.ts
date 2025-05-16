// src/hooks/useValidation.ts
import { useState, ChangeEvent } from "react";

type ValidationRule = {
  isValid: boolean;
  message: string;
};

type FieldValidations = {
  [key: string]: Array<(value: string) => ValidationRule>;
};

type FormErrors<T> = {
  [K in keyof T]?: string;
};

export const useValidation = <T extends object>(
  initialValues: T,
  fieldValidations: FieldValidations | undefined
) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const validateField = (name: string, value: string) => {
    if (fieldValidations) {
      if (!fieldValidations[name]) return true;

      const failedValidation = fieldValidations[name].find(
        (rule) => !rule(value).isValid
      );

      if (failedValidation) {
        setErrors((prev) => ({
          ...prev,
          [name]: failedValidation(value).message,
        }));
        return false;
      }

      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    return true;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: FormErrors<T> = {};

    if (fieldValidations) {
      Object.entries(formData).forEach(([key, value]) => {
        if (fieldValidations[key]) {
          const failedValidation = fieldValidations[key].find(
            (rule) => !rule(String(value)).isValid
          );
          if (failedValidation) {
            newErrors[key as keyof T] = failedValidation(String(value)).message;
            isValid = false;
          }
        }
      });

      setErrors(newErrors);
    }
    return isValid;
  };

  return { formData, handleChange, errors, validateForm, setFormData };
};
