import clsx from "clsx";
import React, { useState } from "react";

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
  error?: string;
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
  error
}: FormFieldProps) => {
  // Props comunes para ambos tipos de input
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const commonProps = {
    id: name,
    name,
    value,
    disabled,
    readOnly: readOnly || !onChange,
    className: clsx(
      "form-control mb-0",
      error && "is-invalid", // Esta línea agrega la clase condicional
    ),
    placeholder: placeholder ? `Ingrese ${placeholder}` : undefined,
    ...(onChange && { onChange }),
  };
  const inputType = type === "password"
    ? (showPassword ? "text" : "password")
    : type;

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
        <>
          <div className="position-relative">
            <input type={inputType} {...commonProps} />
            {(type === "password" && !error) && <i style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}
              className={`position-absolute p-2 bottom-0 end-0 bi bi-${!showPassword ? "eye" : "eye-slash"} `}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            ></i>}
          </div>
        </>
      )}
      {error && (
        <div className="invalid-feedback d-block "> {/* d-block para forzar visualización */}
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;