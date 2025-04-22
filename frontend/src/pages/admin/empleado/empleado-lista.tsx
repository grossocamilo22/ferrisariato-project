

import { empleadosData } from "../../../core/data/empleadoData";
import { EmpleadoTableData } from "../../../core/models/User";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import ListLayout from "../../../shared/layouts/list/list-layout";
import { nombreTableColumns } from "../../common/cliente/cliente-lista";

function EmpleadoLista() {
    const listaEmpleados: EmpleadoTableData[] = empleadosData.map(empleado => ({
        id: empleado.id,
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        direccion: empleado.direccion,
        contacto: empleado.contacto,
    }));
    return (
        <ListLayout data={listaEmpleados} nombreColumnas={nombreTableColumns} nombreEntidad="empleado">
            <BtnSearch placeholder={"Buscar Empleado"} type={"text"} showIcon={true} />
        </ListLayout>
    )
}

export default EmpleadoLista