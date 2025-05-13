import { GeneradorControlador } from "./generadorController";

class InventarioController extends GeneradorControlador<"inventario"> {
  constructor() {
    super("inventario", "El inventario", {
      id: true,
      producto:true,
      stock: true,
      ultimaActualizacion: true,
    });
  }
}

export const inventarioController = new InventarioController();
