import { useNavigate, useParams } from "react-router-dom";
import { Producto } from "../../../core/models/Producto";
import { FormEvent, useEffect, useState } from "react";
import { useAccionFormulario } from "../../../shared/hooks/useAccionFormulario";
import FormField from "../../../shared/components/form-field/form-field";
import { validations } from "../../../shared/utils/validations";
import { useValidation } from "../../../shared/hooks/useValidation";
import FormActions from "../../../shared/components/form-actions/form-actions";
import { useApiEntity } from "../../../shared/hooks/useApiEntity";
import { mensaje } from "../../../shared/utils/mensaje";
import { Categoria } from "../../../core/models/Categoria";

function ProductoFormulario() {
    const navigate = useNavigate();
    const { create, update, getById: getProductoById } = useApiEntity<Omit<Producto, "categoria"> & {categoriaId: string }>('productos');
    const { id } = useParams<{ id: string }>();
    const productoValidations = {
        nombre: [validations.required],
        codigoBarras: [validations.required, validations.isNumeric],
        cantidadUnitaria: [validations.required],
        descripcion: [validations.required],
        precio: [validations.required, validations.isNumeric],
        categoria: [validations.required]
    };
    const {
        getAll: getCategorias,
    } = useApiEntity<Categoria>('categorias');
    const [allCategorias, setAllCategorias] = useState<Categoria[]>([]);
    const { formData, setFormData, handleChange, errors, validateForm } = useValidation<Producto>({
        nombre: '',
        codigoBarras: '',
        cantidadUnitaria: '',
        descripcion: '',
        precio: 0,
        categoria: { id: '', nombre: '', descripcion: "" }
    }, productoValidations);


    const cargarProducto = async () => {
        const producto = await getProductoById(id!);
        if (producto) {
            console.log(producto);
            setFormData({ ...producto, id: producto.id ?? "" });
        }
    };
    const cargarCategorias = async () => {
        const categorias = await getCategorias();

        if (categorias) {
            const categoriasTransformados: Categoria[] = categorias.map(categoria => ({
                id: categoria.id,
                nombre: categoria.nombre,
                descripcion: categoria.descripcion ?? ""
            }));
            setAllCategorias(categoriasTransformados);

        }
    };

    useEffect(() => {
        if (id) {
            cargarProducto();
        }
    }, []);

    useEffect(
        () => {
            cargarCategorias();
        }, []
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (accion === "show") {
            navigate(-1);
            return;
        }

        if (!validateForm()) {
            return;
        }

        const productoData = {
            nombre: formData.nombre,
            cantidadUnitaria: formData.cantidadUnitaria,
            codigoBarras: formData.codigoBarras,
            descripcion: formData.descripcion,
            precio: formData.precio,
            categoriaId: formData.categoria?.id ?? "",
        };

        try {
            let result;
            if (accion === "add") {
                result = await create(productoData);
            } else {
                if (!id) {
                    throw new Error("ID no proporcionado para edición");
                }
                result = await update(id, productoData);
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

    const { accion, config } = useAccionFormulario();
    return (
        <form className="row gx-lg-5 gx-3 gy-4" onSubmit={handleSubmit}>
            <FormField label="Codigo de barras:" name="codigoBarras" onChange={handleChange} placeholder="el codigo de barras" disabled={config.disable} value={formData.codigoBarras} />
            <div className="col-lg-6 col-12" >
                <label htmlFor="categoria" className="form-label">
                    Categoría del producto:
                </label>
                <select
                    className={`form-select ${errors.categoria && "is-invalid"}`}
                    name="categoria"
                    value={formData.categoria?.id}
                    id="categoria"
                    disabled={config.disable}
                    onChange={handleChange}
                >
                    <option value="">Seleccione la categoría</option>
                    {allCategorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>


                {errors.categoria && (
                    <div className="invalid-feedback d-block">
                        {errors.categoria}
                    </div>
                )}
            </div>
            <FormField error={errors.nombre} label="Nombre:" name="nombre" onChange={handleChange} placeholder="el nombre" disabled={config.disable} value={formData.nombre} />
            <FormField error={errors.cantidadUnitaria} label="Cantidad Unitaria:" name="cantidadUnitaria" onChange={handleChange} placeholder="la cantidad unitaria" disabled={config.disable} value={formData.cantidadUnitaria} />
            <FormField error={errors.precio} label="Precio:" type="number" name="precio" onChange={handleChange} placeholder="el precio" disabled={config.disable} value={formData.precio} />
            <FormField error={errors.descripcion} label="Descripción:" name="descripcion" onChange={handleChange} as="textarea" placeholder="la descripción" disabled={config.disable} value={formData.descripcion ?? ""} />
            <FormActions accion={accion} config={config} />
        </form>
    )
}

export default ProductoFormulario