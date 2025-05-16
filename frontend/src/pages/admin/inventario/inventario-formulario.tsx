import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useAccionFormulario } from "../../../shared/hooks/useAccionFormulario";
import FormField from "../../../shared/components/form-field/form-field";
import FormActions from "../../../shared/components/form-actions/form-actions";
import { Inventario, InventarioForm } from "../../../core/models/Inventario";
import Autocomplete from "../../../shared/components/autocomplete/autocomplete";
import { useValidation } from "../../../shared/hooks/useValidation";
import { validations } from "../../../shared/utils/validations";
import { useApiEntity } from "../../../shared/hooks/useApiEntity";
import { Producto } from "../../../core/models/Producto";
import { mensaje } from "../../../shared/utils/mensaje";

function InventarioFormulario() {
    const { create, update, getById: getInventarioById } = useApiEntity<Omit<Inventario, "producto"> & { productoId: string }>('inventarios');
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        getAll: getProductos
    } = useApiEntity<Producto>('productos');
    const inventarioValidations = {
        productName: [validations.required],
        stock: [validations.required, validations.isNumeric],

    };
    const [allProductos, setAllProductos] = useState<Omit<Producto, 'categoria'>[]>([]);
    const { formData, setFormData, handleChange, validateForm } = useValidation<Partial<InventarioForm>>({
        productName: "",
        stock: 0,
        ultimaActualizacion: new Date(),
        producto: undefined,
    }, inventarioValidations);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (accion === "show") {
            navigate(-1);
            return;
        }

        if (!validateForm()) {
            return;
        }

        const inventarioData = {
            productoId: formData.producto?.id ?? "",
            stock: parseInt(String(formData.stock ?? 0), 10),
            ultimaActualizacion: formData.ultimaActualizacion ?? new Date(),
        };


        console.log(inventarioData);
        try {
            let result;
            if (accion === "add") {
                result = await create(inventarioData);
            } else {
                if (!id) {
                    throw new Error("ID no proporcionado para edición");
                }
                result = await update(id, inventarioData);
            }

            // Asumiendo que tu API devuelve un objeto con propiedad 'msg'
            if (result && typeof result === 'object' && 'msg' in result && typeof result.msg === 'string') {
                mensaje(result.msg, "success");
            }

            navigate(-1);
        } catch (error) {
            console.error("Error al procesar el formulario:", error);
            mensaje(error instanceof Error
                ? error.message
                : "Ocurrió un error inesperado", "error");
        }
    }

    const cargarInventario = async () => {
        const inventario = await getInventarioById(id!);
        if (inventario) {
            console.log(inventario);
            setFormData({ ...inventario, id: inventario.id ?? "", ultimaActualizacion: new Date(inventario.ultimaActualizacion) });
        }
    };

    useEffect(() => {
        if (id) {
            cargarInventario();
        }
    }, []);

    const cargarProductos = async () => {
        const productos = await getProductos();

        if (productos) {
            const productosTransformados: Omit<Producto, 'categoria'>[] = productos.map(producto => ({
                id: producto.id,
                nombre: producto.nombre,
                cantidadUnitaria: producto.codigoBarras,
                precio: producto.precio,
                codigoBarras: producto.codigoBarras,
                descripcion: producto.descripcion ?? ""
            }));
            setAllProductos(productosTransformados);

        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const { accion, config } = useAccionFormulario();
    return (
        <form onSubmit={handleSubmit}>
            <span className="p-0 m-0">Datos del producto</span>
            <div className=" row gap-lg-0 gap-4 border rounded-2 m-0 p-4 mb-4">
                <Autocomplete listaDatos={allProductos}
                    setFormData={setFormData}
                    parametro={formData.productName ?? ""}
                    campoObjeto="producto"
                    campoTexto="productName"
                    properties={["nombre"]}
                    className="col-lg-4 col-12"
                >
                    <FormField className="col-12" label="Nombre:" name="productName" onChange={handleChange} placeholder="el nombre" disabled={config.disable} value={formData.productName ?? ""} />
                </Autocomplete>
                <FormField className="col-lg-4 col-12" label="Cantidad Unitaria:" name="cantidad_unitaria" disabled={true} value={formData.producto?.cantidadUnitaria ?? ''} />
                <FormField className="col-lg-4 col-12" label="Precio:" name="precio" disabled={true} value={formData.producto?.precio ?? ""} />

            </div>

            <div className="row gap-lg-0 gap-4 border rounded-2 m-0 p-4">
                <FormField label="Stock:" name="stock" onChange={handleChange} placeholder="El stock" disabled={config.disable} value={formData.stock ?? ""} />
                <FormField label="Fecha:" name="ultimaActualizacion" placeholder="la fecha" disabled={true} value={formData.ultimaActualizacion?.toLocaleDateString() ?? ""} />
            </div>
            <FormActions accion={accion} config={config} />
        </form>
    )
}

export default InventarioFormulario