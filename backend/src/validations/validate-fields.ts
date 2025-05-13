import { check, ValidationChain } from "express-validator";
import { RequestHandler } from "express";

class ValidateFields {
  static isEmpty(fields: string[], fieldNames: string[]): ValidationChain[] {
    return fields.map((field, index) =>
      check(field, `${fieldNames[index]} es obligatorio`).trim().notEmpty()
    );
  }

  static isEmail(field = "email"): ValidationChain {
    return check(field, "El email no es válido")
      .trim()
      .normalizeEmail()
      .isEmail();
  }

  static isLength(
    fields: string[],
    min: number,
    max?: number,
    customMessages?: string[]
  ): ValidationChain[] {
    return fields.map((field, index) =>
      check(
        field,
        customMessages?.[index] || `Debe tener entre ${min} y ${max} caracteres`
      )
        .trim()
        .isLength(max ? { min, max } : { min })
    );
  }

  static isNumeric(
    fields: string[],
    customMessages?: string[]
  ): ValidationChain[] {
    return fields.map((field, index) =>
      check(field, customMessages?.[index] || "Debe contener solo números")
        .trim()
        .isNumeric()
    );
  }

  static isStrongPassword(field = "password"): ValidationChain {
    return check(field)
      .isLength({ min: 8 })
      .matches(/\d/)
      .withMessage("Debe contener al menos un número")
      .matches(/[A-Z]/)
      .withMessage("Debe contener al menos una mayúscula");
  }

  static isPhoneNumber(field = "telefono"): ValidationChain {
    return check(field)
      .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/)
      .withMessage("Número telefónico no válido");
  }

  static isAlphaWithSpaces(
    fields: string[],
    customMessages?: string[]
  ): ValidationChain[] {
    return fields.map((field, index) =>
      check(
        field,
        customMessages?.[index] || "Solo debe contener letras y espacios"
      )
        .trim()
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    );
  }

  // Método para combinar validaciones
  static combine(validations: ValidationChain[]): RequestHandler[] {
    return validations;
  }

  static isNonEmptyArray(field: string, message?: string): ValidationChain {
    return check(field)
      .isArray({ min: 1 })
      .withMessage(
        message || `${field} debe ser un arreglo con al menos un elemento`
      );
  }
}

export default ValidateFields;
