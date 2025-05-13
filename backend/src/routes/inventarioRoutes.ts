import express from "express";
import { inventarioController } from "../controllers/inventarioController";
import ValidateFields from "../validations/validate-fields";

const router = express.Router();
router.post(
  "/",
  ValidateFields.combine([
    ...ValidateFields.isEmpty(
      ["stock", "ultimaActualizacion", "productoId"],
      ["El stock", "La ultima actualización", "El producto"]
    ),
    ...ValidateFields.isNumeric(["stock"]),
  ]),
  inventarioController.create.bind(inventarioController)
);
router.get("/", inventarioController.findAll.bind(inventarioController));
router.get("/:id", inventarioController.findOne.bind(inventarioController));
router.put(
  "/:id",
  ValidateFields.combine([
    ...ValidateFields.isEmpty(
      ["stock", "ultimaActualizacion", "productoId"],
      ["El stock", "La ultima actualización", "El producto"]
    ),
    ...ValidateFields.isNumeric(["stock"]),
  ]),
  inventarioController.update.bind(inventarioController)
);
router.delete("/:id", inventarioController.delete.bind(inventarioController));
export default router;
