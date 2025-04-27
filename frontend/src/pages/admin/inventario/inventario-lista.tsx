import { inventarioData } from "../../../core/data/inventarioData";
import { InventarioTableData } from "../../../core/models/Inventario";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import ListLayout from "../../../shared/layouts/list/list-layout";

function InventarioLista() {
    const nombreTableColumns: string[] = ["Id", "Nombre Producto", "Cantidad", "Ultima Actualización"];
    const listaInventarios: InventarioTableData[] = inventarioData.map(inventario => ({
        id: inventario.id,
        productoNombre: inventario.producto.nombre || "",
        stock: inventario.stock,
        ultimaActualizacion: inventario.ultimaActualizacion.toLocaleString()
    }));
    return (
        <ListLayout data={listaInventarios} nombreColumnas={nombreTableColumns} nombreEntidad="producto">
            <BtnSearch placeholder={"Buscar Cliente"} type={"text"} showIcon={true} />
        </ListLayout>
    )
}

export default InventarioLista