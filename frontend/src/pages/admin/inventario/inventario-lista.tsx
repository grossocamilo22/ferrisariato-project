import { useEffect, useMemo, useState } from "react";
import { Inventario, InventarioTableData } from "../../../core/models/Inventario";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import { useApiEntity } from "../../../shared/hooks/useApiEntity";
import ListLayout from "../../../shared/layouts/list/list-layout";

function InventarioLista() {
    const nombreTableColumns: string[] = ["Id", "Nombre Producto", "Cantidad", "Ultima Actualización"];
    const {
        loading,
        error,
        getAll: getInventarios,
        remove: deleteInventario
    } = useApiEntity<Inventario>('inventarios');
    const [search, setSearch] = useState('');
    const [allInventarios, setAllInventarios] = useState<InventarioTableData[]>([]);

    const listaInventarios = useMemo(() => {
        if (!search) return allInventarios;
        return allInventarios.filter(inventario =>
            inventario.productoNombre.toLowerCase().includes(search.toLowerCase())
        );
    }, [allInventarios, search]);

    const cargarInventarios = async () => {
        const inventarios = await getInventarios();
        if (inventarios) {
            const inventariosTransformados: InventarioTableData[] = inventarios.map(inventario => ({
                id: inventario.id,
                productoNombre: inventario.producto.nombre,
                stock: inventario.stock,
                ultimaActualizacion: inventario.ultimaActualizacion.toLocaleString()
            }));
            setAllInventarios(inventariosTransformados);
        }
    };

    const handleEliminar = async (id: string) => {
        const success = await deleteInventario(id);
        console.log(success);
        if (success) {
            setAllInventarios(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleSearch = (term: string) => {
        setSearch(term);
    };

    // Cargar productos al montar el componente
    useEffect(() => {
        cargarInventarios();
    }, []);

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error al cargar productos: {error}</div>;
    return (
        <ListLayout onDelete={handleEliminar} columnas={["id", "productoNombre", "stock", "ultimaActualizacion"]} data={listaInventarios} nombreColumnas={nombreTableColumns} nombreEntidad="producto">
            <BtnSearch onSearch={handleSearch} placeholder={"Buscar producto"} type={"text"} showIcon={true} />
        </ListLayout>
    )
}

export default InventarioLista