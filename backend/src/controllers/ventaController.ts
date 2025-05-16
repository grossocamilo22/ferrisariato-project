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
      { cliente: true, detallesVenta: { include: { producto: true } } }
    );
  }
}

export const ventaController = new VentaController();
