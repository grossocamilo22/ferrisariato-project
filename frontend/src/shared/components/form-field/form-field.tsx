import React from "react";

type FormFieldProps = {
  label?: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  as?: "input" | "textarea";
  readOnly?: boolean;
};

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  disabled = false,
  className = "col-lg-6 col-12",
  placeholder,
  as = "input",
  readOnly = false,
}: FormFieldProps) => {
  // Props comunes para ambos tipos de input
  const commonProps = {
    id: name,
    name,
    value,
    disabled,
    readOnly: readOnly || !onChange, 
    className: "form-control",
    placeholder: placeholder ? `Ingrese ${placeholder}` : undefined,
    ...(onChange && { onChange }), 
  };

  return (
    <div className={className}>
       {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      
      {as === "textarea" ? (
        <textarea {...commonProps} />
      ) : (
        <input type={type} {...commonProps} />
      )}
    </div>
  );
};

export default FormField;