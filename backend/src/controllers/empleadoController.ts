import { Request, Response } from "express";
import { GeneradorControlador } from "./generadorController";

class EmpleadoController extends GeneradorControlador<"user"> {
  constructor() {
    super("user", "El empleado", {
      id: true,
      nombre: true,
      apellido: true,
      contacto: true,
      direccion: true,
    });
  }


}

export const empleadoController = new EmpleadoController();
