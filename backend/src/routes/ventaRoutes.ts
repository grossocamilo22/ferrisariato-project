import express from "express";
import { ventaController } from "../controllers/ventaController";
import ValidateFields from "../validations/validate-fields";

const router = express.Router();
router.post(
  "/",
  ValidateFields.combine([
    ...ValidateFields.isEmpty(
      ["total", "userId", "metodoPago", "fecha"],
      ["El total", "El empleado", "El metodo de pago", "la fecha"]
    ),
    ValidateFields.isNonEmptyArray(
      "detallesVenta",
      "Debe incluir al menos un detalle de la venta"
    ),
    ...ValidateFields.isNumeric(["total"]),
  ]),
  ventaController.create.bind(ventaController)
);
router.get("/", ventaController.findAll.bind(ventaController));
router.get("/:id", ventaController.findOne.bind(ventaController));
router.put(
  "/:id",
  ValidateFields.combine([
    ...ValidateFields.isEmpty(
      ["total", "userId", "metodoPago", "fecha"],
      ["El total", "El empleado", "El metodo de pago", "la fecha"]
    ),
    ValidateFields.isNonEmptyArray(
      "detallesVenta",
      "Debe incluir al menos un detalle de la venta"
    ),
    ...ValidateFields.isNumeric(["total"]),
  ]),
  ventaController.update.bind(ventaController)
);
router.delete("/:id", ventaController.delete.bind(ventaController));
export default router;
