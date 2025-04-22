import { proveedoresData } from "../../../core/data/proovedorData";
import { ProveedorTableData } from "../../../core/models/Proveedor";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import ListLayout from "../../../shared/layouts/list/list-layout";

function ProveedorLista(){
    const nombreTableColumns: string[] = ["Id", "Nombre","Dirección", "Contacto"];
    const listaProveedores: ProveedorTableData[] = proveedoresData.map(proveedor => ({
        id: proveedor.id,
        nombre: proveedor.nombre,
        direccion:proveedor.direccion,
        contacto: proveedor.contacto,
        
    }));
    return (
        <ListLayout data={listaProveedores} nombreColumnas={nombreTableColumns} nombreEntidad="proveedor">
            <BtnSearch placeholder={"Buscar Proveedor"} type={"text"} showIcon={true} />
        </ListLayout>
    )
}

export default ProveedorLista