import { useEffect, useMemo, useState } from "react";
import BtnSearch from "../../../shared/components/btn-search/btn-search";
import ListLayout from "../../../shared/layouts/list/list-layout";
import { useApiEntity } from "../../../shared/hooks/useApiEntity";
import { Producto, ProductoTableData } from "../../../core/models/Producto";

function ProductoLista() {

    const nombreTableColumns: string[] = ["Codigo de barras", "Nombre", "Cantidad Unitaria", "Precio"];
    const {
        loading,
        error,
        getAll: getProductos,
        remove: deleteProducto
    } = useApiEntity<Producto>('productos');
    const [search, setSearch] = useState('');
    const [allProductos, setAllProductos] = useState<ProductoTableData[]>([]);

    const listaProductos = useMemo(() => {
        if (!search) return allProductos;
        return allProductos.filter(producto =>
            producto.nombre.toLowerCase().includes(search.toLowerCase())
        );
    }, [allProductos, search]);

    const cargarProductos = async () => {
        const productos = await getProductos();
        if (productos) {
            const productosTransformados: ProductoTableData[] = productos.map(producto => ({
                id: producto.id,
                codigoBarras: producto.codigoBarras,
                nombre: producto.nombre,
                cantidadUnitaria: producto.cantidadUnitaria,
                precio: producto.precio
            }));
            setAllProductos(productosTransformados);
        }
    };

    const handleEliminar = async (id: string) => {
        const success = await deleteProducto(id);
        console.log(success);
        if (success) {
            setAllProductos(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleSearch = (term: string) => {
        setSearch(term);
    };

    // Cargar productos al montar el componente
    useEffect(() => {
        cargarProductos();
    }, []);

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error al cargar productos: {error}</div>;
    return (
        <ListLayout onDelete={handleEliminar} columnas={["codigoBarras", "nombre", "cantidadUnitaria", "precio"]} data={listaProductos} nombreColumnas={nombreTableColumns} nombreEntidad="producto">
            <BtnSearch onSearch={handleSearch} placeholder={"Buscar Producto"} type={"text"} showIcon={true} />
        </ListLayout>
    )
}

export default ProductoLista