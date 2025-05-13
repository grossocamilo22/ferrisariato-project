import express from "express";
import { authController } from "../controllers/authController";
import ValidateFields from "../validations/validate-fields";

const router = express.Router();
router.post(
  "/register",
  ValidateFields.combine([
    ...ValidateFields.isEmpty(
      [
        "id",
        "nombre",
        "apellido",
        "tipoIdentificacion",
        "correo",
        "direccion",
        "contacto",
        "password",
      ],
      [
        "La identificación",
        "El nombre",
        "El apellido",
        "El tipo de identificación",
        "El correo",
        "la dirección",
        "El contacto",
        "La contraseña",
      ]
    ),
    ValidateFields.isEmail("correo"),
    ...ValidateFields.isLength(["password"], 8, 20, [
      "La contraseña debe tener 8-20 caracteres",
    ]),
    ...ValidateFields.isAlphaWithSpaces(["nombre", "apellido"]),
    ValidateFields.isStrongPassword(),
    ValidateFields.isPhoneNumber("contacto"),
  ]),
  authController.register.bind(authController)
);
router.post(
  "/login",
  ValidateFields.combine([
    ...ValidateFields.isEmpty(["correo"], ["El correo"]),
    ValidateFields.isEmail("correo"),
    ...ValidateFields.isLength(["password"], 8, 20, [
      "La contraseña debe tener 8-20 caracteres",
    ]),
  ]),
  authController.login.bind(authController)
);
router.get("/renew/:id", authController.revalidarToken.bind(authController));

export default router;
