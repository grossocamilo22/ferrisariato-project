/* import { Producto } from "./Producto"; */

import { User } from "./User";

export type Proveedor = Omit<
  User,
  "tipoIdentificacion" | "password" | "apellido" | "rol" | "id"
> & {
  id?: string;
  empresa: string;
};

export type ProveedorTableData = Omit<Proveedor, "empresa" | "correo" | "id">;
