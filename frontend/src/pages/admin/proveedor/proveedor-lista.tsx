
import { useEffect, useMemo, useState } from "react";
import { Proveedor, ProveedorTableData } from "../../../core/models/Proveedor";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import { useApiEntity } from "../../../shared/hooks/useApiEntity";
import ListLayout from "../../../shared/layouts/list/list-layout";

function ProveedorLista() {
    const nombreTableColumns: string[] = ["Id", "Nombre", "Dirección", "Contacto"];
    const {
        loading,
        error,
        getAll: getProveedores,
        remove: deleteProveedor
    } = useApiEntity<Proveedor>('proveedores');
    const [search, setSearch] = useState('');
    const [allProveedores, setAllProveedores] = useState<ProveedorTableData[]>([]);

    const listaProveedores = useMemo(() => {
        if (!search) return allProveedores;
        return allProveedores.filter(proveedor =>
            proveedor.nombre.toLowerCase().includes(search.toLowerCase())
        );
    }, [allProveedores, search]);

    // Cargar productos al montar el componente
    const cargarProveedores = async () => {
        const proveedores = await getProveedores();
        if (proveedores) {
            const proveedoresTransformados: ProveedorTableData[] = proveedores.map(proveedor => ({
                id: proveedor.id,
                nombre: proveedor.nombre,
                contacto: proveedor.contacto,
                direccion: proveedor.direccion
            }));
            setAllProveedores(proveedoresTransformados);
        }
    };


    const handleEliminar = async (id: string) => {
        const success = await deleteProveedor(id);
        console.log(success);
        if (success) {
            setAllProveedores(prev => prev.filter(p => p.id !== id));
        }
    };
    const handleSearch = (term: string) => {
        setSearch(term);
    };

    useEffect(() => {
        cargarProveedores();
    }, []);

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error al cargar productos: {error}</div>;
    return (
        <ListLayout columnas={["id", "nombre", "direccion", "contacto"]} onDelete={handleEliminar} data={listaProveedores} nombreColumnas={nombreTableColumns} nombreEntidad="proveedor">
            <BtnSearch onSearch={handleSearch} placeholder={"Buscar Proveedor"} type={"text"} showIcon={true} />
        </ListLayout>
    )
}

export default ProveedorLista