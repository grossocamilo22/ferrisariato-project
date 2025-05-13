import express from "express";
import { empleadoController } from "../controllers/empleadoController";
import ValidateFields from "../validations/validate-fields";

const router = express.Router();
router.post(
  "/",
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
  empleadoController.create.bind(empleadoController)
);
router.get("/", empleadoController.findAll.bind(empleadoController));
router.get("/:id", empleadoController.findOne.bind(empleadoController));
router.put(
  "/:id",
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
      ],
      [
        "La identificación",
        "El nombre",
        "El apellido",
        "El tipo de identificación",
        "El correo",
        "la dirección",
        "El contacto",
      ]
    ),
    ValidateFields.isEmail("correo"),
    ...ValidateFields.isAlphaWithSpaces(["nombre", "apellido"]),
    ValidateFields.isPhoneNumber("contacto"),
  ]),
  empleadoController.update.bind(empleadoController)
);
router.delete("/:id", empleadoController.delete.bind(empleadoController));
export default router;
