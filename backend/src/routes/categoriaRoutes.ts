import express from "express";
import { categoriaController } from "../controllers/categoriasController";
const router = express.Router();
router.get("/", categoriaController.findAll.bind(categoriaController));

export default router;
