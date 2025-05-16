import { useEffect, useMemo, useState } from "react";
import { Venta, VentaTableData } from "../../../core/models/Venta";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import { useApiEntity } from "../../../shared/hooks/useApiEntity";
import ListLayout from "../../../shared/layouts/list/list-layout";

function VentaLista() {
    const nombreTableColumns: string[] = ["Id", "Nombre Cliente", "Fecha", "Total precio"];
    const {
        loading,
        error,
        getAll: getVentas,
        remove: deleteVenta
    } = useApiEntity<Venta>('ventas');

    // Estado de búsqueda inicializado correctamente
    const [search, setSearch] = useState<{
        fecha?: string;
        nombreCliente?: string
    }>({
        fecha: '',
        nombreCliente: ''
    });

    const [allVentas, setAllVentas] = useState<VentaTableData[]>([]);

    // Filtrado memoizado
    const listaVentas = useMemo(() => {
        if (!search.fecha && !search.nombreCliente) return allVentas;

        return allVentas.filter(venta => {
            const matchesNombre = search.nombreCliente
                ? venta.clienteNombre.toLowerCase().includes(search.nombreCliente.toLowerCase())
                : true;

            const matchesFecha = search.fecha
                ? venta.fecha.includes(search.fecha)
                : true;

            return matchesNombre && matchesFecha;
        });
    }, [allVentas, search]);

    const cargarVentas = async () => {
        try {
            const ventas = await getVentas();
            if (ventas) {
                const ventasTransformados: VentaTableData[] = ventas.map(venta => ({
                    id: venta.id,
                    clienteNombre: venta.cliente
                        ? `${venta.cliente.nombre} ${venta.cliente.apellido}`
                        : "Ninguno",
                    fecha: new Date(venta.fecha).toLocaleDateString(),
                    total: venta.total
                }));
                setAllVentas(ventasTransformados);
            }
        } catch (err) {
            console.error("Error cargando ventas:", err);
        }
    };

    const handleEliminar = async (id: string) => {
        const success = await deleteVenta(id);
        if (success) {
            setAllVentas(prev => prev.filter(p => p.id !== id));
        }
    };

    // Handlers de búsqueda actualizados
    const handleSearchFecha = (term: string) => {
        setSearch(prev => ({ ...prev, fecha: term }));
    };

    const handleSearchClienteNombre = (term: string) => {
        setSearch(prev => ({ ...prev, nombreCliente: term }));
    };

    useEffect(() => {
        cargarVentas();
    }, []);

    if (loading) return <div>Cargando ventas...</div>;
    if (error) return <div>Error al cargar ventas: {error}</div>;

    return (
        <ListLayout
            onDelete={handleEliminar}
            columnas={["id", "clienteNombre", "total", "fecha"]}
            data={listaVentas}
            nombreColumnas={nombreTableColumns}
            nombreEntidad="venta"
        >

            <BtnSearch
                onSearch={handleSearchFecha}
                placeholder="Buscar por fecha"
                type="date"
                showIcon={false}
            />
            <BtnSearch
                onSearch={handleSearchClienteNombre}
                placeholder="Buscar por cliente"
                type="text"
                showIcon={true}
            />

        </ListLayout>
    )
}

export default VentaLista;