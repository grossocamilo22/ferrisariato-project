
import { ClienteTableData } from '../../../core/models/Cliente';
import ListLayout from "../../../shared/layouts/list/list-layout";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import { clientesData } from '../../../core/data/ClienteData';


// eslint-disable-next-line react-refresh/only-export-components
export const nombreTableColumns: string[] = ["Identificación", "Nombre", "Apellido", "Dirección", "Celular"];
function ClienteLista() {
    const listaClientes: ClienteTableData[] = clientesData.map(cliente => (
        { id: cliente.id, nombre: cliente.nombre, apellido: cliente.apellido, direccion:cliente.direccion,contacto:cliente.contacto}
    ));
    return (
        <ListLayout data={listaClientes} nombreColumnas={nombreTableColumns} nombreEntidad='cliente'>
            <BtnSearch placeholder={"Buscar Cliente"} type={"text"} showIcon={true} />
        </ListLayout>
    )
}

export default ClienteLista