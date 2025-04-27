import { User } from "./User";

export type Cliente = Omit<User, "correo" | "password" | "rol">;
export type ClienteTableData = Omit<Cliente,'tipoIdentificacion'>;