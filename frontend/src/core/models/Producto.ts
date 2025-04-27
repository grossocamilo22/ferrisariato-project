import { Categoria } from "./Categoria";

export type Producto = {
  id: string;
  codigoBarras: string;
  nombre: string;
  cantidadUnitaria: string;
  descripcion?: string;
  precio: number;
  categoria?: Categoria;
};

export type ProductoTableData = Omit<Producto, "descripcion"  | "categoria">;
