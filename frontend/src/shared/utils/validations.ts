export const validations = {
  required: (value: string) => ({
    isValid: !!value.trim(),
    message: "Este campo es requerido",
  }),

  isNumeric: (value: string) => ({
    isValid: /^[0-9]+$/.test(value),
    message: "Solo se permiten números",
  }),

  isAlphaWithSpaces: (value: string) => ({
    isValid: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value),
    message: "Solo se permiten letras y espacios",
  }),

  isEmail: (value: string) => ({
    isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: "Ingrese un email válido",
  }),

  minLength: (length: number) => (value: string) => ({
    isValid: value.length >= length,
    message: `Mínimo ${length} caracteres`,
  }),

  maxLength: (length: number) => (value: string) => ({
    isValid: value.length <= length,
    message: `Máximo ${length} caracteres`,
  }),

  exactLength: (length: number) => (value: string) => ({
    isValid: value.length === length,
    message: `Debe tener exactamente ${length} caracteres`,
  }),

  isNonEmptyArray: (value: Array<object>) => ({
    isValid: value.length < 1,
    message: `Debe contener al menos un elemento.`,
  }),
};
