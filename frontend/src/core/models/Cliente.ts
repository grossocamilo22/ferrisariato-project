import { User } from "./User";

export type Cliente = Omit<User, "correo" | "password" | "role">;
export type ClienteTableData = Omit<Cliente,'tipoIdentificacion'>;