import { GeneradorControlador } from "./generadorController";

class ProveedorController extends GeneradorControlador<"proveedor"> {
  constructor() {
    super("proveedor", "El proveedor", {
      id: true,
      nombre: true,
      direccion: true,
      contacto: true,
    });
  }
}

export const proveedorController = new ProveedorController();
