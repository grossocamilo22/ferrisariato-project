import { Producto } from "./Producto";

export type DetalleVenta = {
  id?: string;
  producto?: Producto;
  cantidad?: number;
  subtotal: number;
};
export type DetalleVentaTableData = { productoNombre: string } & DetalleVenta;

export type FormDetalleVenta = DetalleVenta & {
  productoName: string;
};
