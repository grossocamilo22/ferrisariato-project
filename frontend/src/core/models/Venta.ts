import { Cliente } from "./Cliente";
import { DetalleVenta } from "./DetalleVenta";
import { MetodoPago } from "./MetodoPago";
import { User } from "./User";

export type Venta = {
  id?: string;
  cliente?: Cliente;
  user?: User;
  detalles: DetalleVenta[];
  total: number;
  metodoPago: MetodoPago;
  fecha: Date;
};

export type VentaTableData = { clienteNombre: string; fecha: string } & Omit<
  Venta,
  "detalles" | "user" | "cliente" | "fecha" | "metodoPago"
>;

export type FormVenta = Venta & { clienteName: string };
