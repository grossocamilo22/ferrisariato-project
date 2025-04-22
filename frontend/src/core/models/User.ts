import { ClienteTableData } from "./Cliente";
import { TipoIdentificacion } from "./Tipo_Identificacion";

export type User = {
  id: string;
  tipoIdentificacion:TipoIdentificacion | "";
  nombre: string;
  apellido: string;
  direccion: string;
  contacto: string;
  correo?: string;
  password?: string;
  role: "admin" | "empleado"; 
};


export type EmpleadoTableData = ClienteTableData;
