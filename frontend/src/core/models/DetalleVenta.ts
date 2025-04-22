import { Producto } from "./Producto";

export type DetalleVenta = {
  id: string;
  producto: Producto;
  cantidad: number;
  subtotal: number;
};
export type DetalleVentaTableData = { productoNombre: string } & Omit<
  DetalleVenta,
  "producto"
>;

export type FormDetalleVenta = Omit<DetalleVenta, "producto"> & {
  producto: Producto | null;
};
