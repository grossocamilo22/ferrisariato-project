/* import { Producto } from "./Producto"; */

import { User } from "./User";

export type Proveedor = Omit<User,"tipoIdentificacion"|"password"|"apellido"|"role"> & {
  empresa: string;
};

export type ProveedorTableData = Omit<Proveedor, "empresa"|"correo">;