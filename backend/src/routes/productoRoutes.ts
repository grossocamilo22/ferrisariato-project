import express from "express";
import { productoController } from "../controllers/productoController";
import ValidateFields from "../validations/validate-fields";

const router = express.Router();
router.post(
  "/",
  ValidateFields.combine([
    ...ValidateFields.isEmpty(
      [
        "nombre",
        "codigoBarras",
        "cantidadUnitaria",
        "descripcion",
        "precio",
        "categoriaId",
      ],
      [
        "El nombre",
        "El codigo de barras",
        "La cantidad unitaria",
        "la descripción",
        "El precio",
        "La cateria",
      ]
    ),
    ...ValidateFields.isAlphaWithSpaces(["nombre"]),
    ...ValidateFields.isNumeric(["precio", "codigoBarras"]),
  ]),
  productoController.create.bind(productoController)
);
router.get("/", productoController.findAll.bind(productoController));
router.get("/:id", productoController.findOne.bind(productoController));
router.put(
  "/:id",
  ValidateFields.combine([
    ...ValidateFields.isEmpty(
      [
        "nombre",
        "codigoBarras",
        "cantidadUnitaria",
        "descripcion",
        "precio",
        "categoriaId",
      ],
      [
        "El nombre",
        "El codigo de barras",
        "La cantidad unitaria",
        "la descripción",
        "El precio",
        "La cateria",
      ]
    ),
    ...ValidateFields.isAlphaWithSpaces(["nombre"]),
    ...ValidateFields.isNumeric(["precio", "codigoBarras"]),
  ]),
  productoController.update.bind(productoController)
);
router.delete("/:id", productoController.delete.bind(productoController));
export default router;
