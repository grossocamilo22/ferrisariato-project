import express from "express";
import { proveedorController } from "../controllers/proveedorController";
import ValidateFields from "../validations/validate-fields";

const router = express.Router();
router.post(
  "/",
  ValidateFields.combine([
    ...ValidateFields.isEmpty(
      ["nombre", "empresa", "correo", "direccion", "contacto"],
      ["El nombre", "la empresa", "El correo", "la dirección", "El contacto"]
    ),
    ValidateFields.isEmail("correo"),
    ...ValidateFields.isAlphaWithSpaces(["nombre"]),
    ValidateFields.isPhoneNumber("contacto"),
  ]),
  proveedorController.create.bind(proveedorController)
);
router.get("/", proveedorController.findAll.bind(proveedorController));
router.get("/:id", proveedorController.findOne.bind(proveedorController));
router.put(
  "/:id",
  ValidateFields.combine([
    ...ValidateFields.isEmpty(
      ["nombre", "empresa", "correo", "direccion", "contacto"],
      ["El nombre", "la empresa", "El correo", "la dirección", "El contacto"]
    ),
    ValidateFields.isEmail("correo"),
    ...ValidateFields.isAlphaWithSpaces(["nombre"]),
    ValidateFields.isPhoneNumber("contacto"),
  ]),
  proveedorController.update.bind(proveedorController)
);
router.delete("/:id", proveedorController.delete.bind(proveedorController));
export default router;
