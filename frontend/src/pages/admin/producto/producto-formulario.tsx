import { useNavigate } from "react-router-dom";
import { Producto } from "../../../core/models/Producto";
import { FormEvent } from "react";
import { useAccionFormulario } from "../../../shared/hooks/useAccionFormulario";
import { categoriasData } from "../../../core/data/categoriaData";
import FormActions from "../../../shared/components/form-actions/form-actions";
import { useForm } from "../../../shared/hooks/useForm";
import FormField from "../../../shared/components/form-field/form-field";

function ProductoFormulario() {
    const navigate = useNavigate();
    const { formData, handleChange } = useForm<Producto>({
        id: '',
        nombre: '',
        cantidad_unitaria: '',
        descripcion: '',
        precio: 0,
        categoria: { id: '', nombre: '', descripcion: "" }
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (accion === "show") {
            return navigate(-1);
        }
    }

    const { accion, config } = useAccionFormulario();
    return (
        <form className="row gx-lg-5 gx-3 gy-4" onSubmit={handleSubmit}>
            <div className="col-lg-6 col-12" >
                <label htmlFor="categoria" className="form-label">Categoría del producto:</label>
                <select className="form-select" name="categoria" value={formData.categoria.id} id="categoria" disabled={config.disable} onChange={handleChange}>
                    <option value="">Seleccione la categoria</option>
                    {
                        categoriasData.map((value) => (
                            <option key={value.id} defaultValue={value.id}>{value.nombre}</option>
                        ))
                    }
                </select>
            </div>
            <FormField label="Nombre:" name="nombre" onChange={handleChange} placeholder="el nombre" disabled={config.disable} value={formData.nombre} />
            <FormField label="Cantidad Unitaria:" name="cantidad_unitaria" onChange={handleChange} placeholder="la cantidad unitaria" disabled={config.disable} value={formData.cantidad_unitaria} />
            <FormField label="Precio:" type="number" name="precio" onChange={handleChange} placeholder="el precio" disabled={config.disable} value={formData.precio} />
            <FormField label="Descripción:" name="descripcion" onChange={handleChange} as="textarea" placeholder="la descripción" disabled={config.disable} value={formData.descripcion} />
            <FormActions accion={accion} config={config} />
        </form>
    )
}

export default ProductoFormulario