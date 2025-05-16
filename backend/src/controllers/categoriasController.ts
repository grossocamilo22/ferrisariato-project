import { GeneradorControlador } from "./generadorController";

class CategoriaController extends GeneradorControlador<"categoria"> {
  constructor() {
    super("categoria", "La categoria", {
      id: true,
      nombre: true,
    });
  }
}

export const categoriaController = new CategoriaController();
