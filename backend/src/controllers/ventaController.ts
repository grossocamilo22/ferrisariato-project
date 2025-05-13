import { GeneradorControlador } from "./generadorController";

class VentaController extends GeneradorControlador<"venta"> {
  constructor() {
    super(
      "venta",
      "La venta",
      {
        id: true,
        cliente: true,
        fecha: true,
        total: true,
      },
      {
        detallesVenta: true,
        cliente: true,
      }
    );
  }
}

export const ventaController = new VentaController();
