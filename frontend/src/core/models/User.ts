import { ClienteTableData } from "./Cliente";
import { Rol } from "./Rol";
import { TipoIdentificacion } from "./Tipo_Identificacion";

export type User = {
  id: string;
  tipoIdentificacion: keyof typeof TipoIdentificacion;
  nombre: string;
  apellido: string;
  direccion: string;
  contacto: string;
  correo: string;
  password: string;
  rol: keyof typeof Rol;
};

export type EmpleadoTableData = ClienteTableData;

export type FormUserLogin = Omit<
  User,
  | "id"
  | "tipoIdentificacion"
  | "nombre"
  | "apellido"
  | "direccion"
  | "contacto"
  | "rol"
>;

