import { Cliente, ClienteTableData } from '../../../core/models/Cliente';
import ListLayout from "../../../shared/layouts/list/list-layout";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import { useApiEntity } from '../../../shared/hooks/useApiEntity';
import { useEffect, useState, useMemo } from 'react';

export const nombreTableColumns: string[] = ["Identificación", "Nombre", "Apellido", "Dirección", "Celular"];

function ClienteLista() {
    const {
        loading,
        error,
        getAll: getClientes,
        remove: deleteCliente
    } = useApiEntity<Cliente>('clientes');
    
    const [search, setSearch] = useState('');
    const [allClientes, setAllClientes] = useState<ClienteTableData[]>([]);
    
    // Filtrado memoizado
    const listaClientes = useMemo(() => {
        if (!search) return allClientes;
        return allClientes.filter(cliente =>
            cliente.nombre.toLowerCase().includes(search.toLowerCase()) ||
            cliente.apellido.toLowerCase().includes(search.toLowerCase()) 
        );
    }, [allClientes, search]);

    const cargarClientes = async () => {
        try {
            const clientes = await getClientes();
            if (clientes) {
                setAllClientes(clientes.map(cliente => ({
                    id: cliente.id,
                    nombre: cliente.nombre,
                    apellido: cliente.apellido,
                    contacto: cliente.contacto,
                    direccion: cliente.direccion
                })));
            }
        } catch (err) {
            console.error(err);
            // Maneja el error adecuadamente
        }
    };

    const handleEliminar = async (id: string) => {
        const success = await deleteCliente(id);
        if (success) {
            setAllClientes(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleSearch = (term: string) => {
        setSearch(term);
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    if (loading) return <div>Cargando clientes...</div>;
    if (error) return <div>Error al cargar clientes: {error}</div>;

    return (
        <ListLayout 
            onDelete={handleEliminar} 
            columnas={["id", "nombre", "apellido", "direccion", "contacto"]} 
            data={listaClientes} 
            nombreColumnas={nombreTableColumns} 
            nombreEntidad='cliente'
        >
            <BtnSearch 
                onSearch={handleSearch} 
                placeholder="Buscar Cliente" 
                type="text" 
                showIcon={true} 
            />
        </ListLayout>
    );
}

export default ClienteLista;