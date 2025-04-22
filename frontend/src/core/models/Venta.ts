import { Cliente } from "./Cliente";
import { DetalleVenta } from "./DetalleVenta";

export type Venta = {
    id:string;
    cliente?:Cliente;
    detalles:DetalleVenta[];
    total:number;
    fecha:Date;
}

export type VentaTableData = {clienteNombre:string,fecha:string} & Omit<Venta,'detalles'|'cliente' | 'fecha'>;

export type FormVenta = Omit<Venta, "cliente"> & {
  cliente: Cliente | null;
};