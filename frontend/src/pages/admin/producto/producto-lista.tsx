import { productosData } from "../../../core/data/productoData";
import { ProductoTableData } from "../../../core/models/Producto";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import ListLayout from "../../../shared/layouts/list/list-layout";

function ProductoLista() {
    const nombreTableColumns: string[] = ["Id", "Codigo de barras", "Nombre", "Cantidad Unitaria", "Precio"];
    const listaProductos: ProductoTableData[] = productosData.map(producto => ({
        id: producto.id,
        codigoBarras: producto.codigoBarras,
        nombre: producto.nombre,
        cantidadUnitaria: producto.cantidadUnitaria,
        precio: producto.precio
    }));
    return (
        <ListLayout data={listaProductos} nombreColumnas={nombreTableColumns} nombreEntidad="producto">
            <BtnSearch placeholder={"Buscar Producto"} type={"text"} showIcon={true} />
        </ListLayout>
    )
}

export default ProductoLista