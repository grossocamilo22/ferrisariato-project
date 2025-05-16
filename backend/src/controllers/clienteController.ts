import { GeneradorControlador } from "./generadorController";

class ClienteController extends GeneradorControlador<"cliente"> {
  constructor() {
    super("cliente", "El cliente", {
      id: true,
      nombre: true,
      apellido: true,
      contacto: true,
      direccion: true,
    });
  }
}

export const clienteController = new ClienteController();
