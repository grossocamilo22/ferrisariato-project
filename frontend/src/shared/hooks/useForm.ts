import { useState, ChangeEvent } from "react";

export const useForm = <T extends object>(initialValues: T) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return { formData, handleChange, setFormData };
};