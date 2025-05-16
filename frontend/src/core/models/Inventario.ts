import { Producto } from "./Producto";

export type Inventario = {
  id?: string;
  producto: Producto;
  stock: number;
  ultimaActualizacion: Date;
};

export type InventarioTableData = {
  productoNombre: string;
  ultimaActualizacion: string;
} & Omit<Inventario, "producto" | "ultimaActualizacion">;

export type InventarioForm = {productName:string} & Inventario; 