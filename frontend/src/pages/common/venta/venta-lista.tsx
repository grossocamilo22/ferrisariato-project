import { ventasData } from "../../../core/data/ventaData";
import { VentaTableData } from "../../../core/models/Venta";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import ListLayout from "../../../shared/layouts/list/list-layout";

function VentaLista() {
    const nombreTableColumns: string[] = ["Id", "Nombre Cliente", "Fecha", "Total precio"];
    const listaVentas: VentaTableData[] = ventasData.map(venta => ({
        id: venta.id,
        clienteNombre: venta.cliente ? `${venta.cliente?.nombre} ${venta.cliente?.apellido}` : "Ninguno",
        fecha: venta.fecha.toLocaleString(),
        total: venta.total
    }));
    return (
        <ListLayout data={listaVentas} nombreColumnas={nombreTableColumns} nombreEntidad="venta">
            <BtnSearch placeholder={"Buscar Venta"} type={"date"} showIcon={false} />
            <BtnSearch placeholder={"Buscar Venta"} type={"text"} showIcon={true} />
        </ListLayout>
    )
}

export default VentaLista