import { Categoria } from "./Categoria";

export type Producto = {
    id:string;
    nombre:string;
    cantidad_unitaria:string;
    descripcion:string;
    precio:number;
    categoria:Categoria 
}

export type ProductoTableData = Omit<Producto,'descripcion'|'categoria'>