import { useState, ChangeEvent } from "react";

export const useForm = <T extends object>(initialValues: T) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name,value)
        setFormData({ ...formData, [name]: value });
        console.log(formData);
        
    };

    return { formData, handleChange, setFormData };
};