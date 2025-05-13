import { GeneradorControlador } from "./generadorController";

class ProductoController extends GeneradorControlador<"producto"> {
  constructor() {
    super("producto", "El producto", {
      id: true,
      codigoBarras: true,
      nombre: true,
      cantidadUnitaria: true,
      precio: true,
    });
  }
}

export const productoController = new ProductoController();
