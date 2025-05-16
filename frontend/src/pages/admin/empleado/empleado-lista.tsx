

import { useEffect, useMemo, useState } from "react";
import { EmpleadoTableData, User } from "../../../core/models/User";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import ListLayout from "../../../shared/layouts/list/list-layout";
import { nombreTableColumns } from "../../common/cliente/cliente-lista";
import { useApiEntity } from "../../../shared/hooks/useApiEntity";

function EmpleadoLista() {
    const {
        loading,
        error,
        getAll: getEmpleados,
        remove: deleteEmpleado
    } = useApiEntity<User>('empleados');
    const [search, setSearch] = useState('');
    const [allEmpleados, setAllEmpleados] = useState<EmpleadoTableData[]>([]);

    const listaEmpleados = useMemo(() => {
        if (!search) return allEmpleados;
        return allEmpleados.filter(empleado =>
            empleado.nombre.toLowerCase().includes(search.toLowerCase())
            || empleado.apellido.toLowerCase().includes(search.toLowerCase())
        );
    }, [allEmpleados, search]);

    const cargarEmpleados = async () => {
        const empleados = await getEmpleados();
        if (empleados) {
            const empleadosTransformados: EmpleadoTableData[] = empleados.map(empleado => ({
                id: empleado.id,
                nombre: empleado.nombre,
                apellido: empleado.apellido,
                contacto: empleado.contacto,
                direccion: empleado.direccion
            }));
            setAllEmpleados(empleadosTransformados);
        }
    };

    const handleEliminar = async (id: string) => {
        const success = await deleteEmpleado(id);
        console.log(success);
        if (success) {
            setAllEmpleados(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleSearch = (term: string) => {
        setSearch(term);
    };

    // Cargar productos al montar el componente
    useEffect(() => {
        cargarEmpleados();
    }, []);

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error al cargar productos: {error}</div>;
    return (
        <ListLayout onDelete={handleEliminar} columnas={["id", "nombre", "apellido", "direccion", "contacto"]} data={listaEmpleados} nombreColumnas={nombreTableColumns} nombreEntidad="empleado">
            <BtnSearch onSearch={handleSearch} placeholder={"Buscar Empleado"} type={"text"} showIcon={true} />
        </ListLayout>
    )
}

export default EmpleadoLista