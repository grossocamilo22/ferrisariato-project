import express from "express";
import { clienteController } from "../controllers/clienteController";
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
        "direccion",
        "contacto",
      ],
      [
        "La identificación",
        "El nombre",
        "El apellido",
        "El tipo de identificación",
        "la dirección",
        "El contacto",
      ]
    ),
    ...ValidateFields.isAlphaWithSpaces(["nombre", "apellido"]),
    ValidateFields.isPhoneNumber("contacto"),
  ]),
  clienteController.create.bind(clienteController)
);
router.get("/", clienteController.findAll.bind(clienteController));
router.get("/:id", clienteController.findOne.bind(clienteController));
router.put(
  "/:id",
  ValidateFields.combine([
    ...ValidateFields.isEmpty(
      [
        "id",
        "nombre",
        "apellido",
        "tipoIdentificacion",
        "direccion",
        "contacto",
      ],
      [
        "La identificación",
        "El nombre",
        "El apellido",
        "El tipo de identificación",
        "la dirección",
        "El contacto",
      ]
    ),
    ...ValidateFields.isAlphaWithSpaces(["nombre", "apellido"]),
    ValidateFields.isPhoneNumber("contacto"),
  ]),
  clienteController.update.bind(clienteController)
);
router.delete("/:id", clienteController.delete.bind(clienteController));
export default router;
