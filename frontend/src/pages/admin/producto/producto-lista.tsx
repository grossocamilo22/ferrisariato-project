import { productosData } from "../../../core/data/productoData";
import { ProductoTableData } from "../../../core/models/Producto";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import ListLayout from "../../../shared/layouts/list/list-layout";

function ProductoLista() {
    const nombreTableColumns: string[] = ["Id", "Nombre", "Cantidad Unitaria", "Precio"];
    const listaProductos: ProductoTableData[] = productosData.map(producto => ({
        id: producto.id,
        nombre: producto.nombre,
        cantidad_unitaria: producto.cantidad_unitaria,
        precio: producto.precio
    }));
    return (
        <ListLayout data={listaProductos} nombreColumnas={nombreTableColumns} nombreEntidad="producto">
            <BtnSearch placeholder={"Buscar Producto"} type={"text"} showIcon={true} />
        </ListLayout>
    )
}

export default ProductoLista