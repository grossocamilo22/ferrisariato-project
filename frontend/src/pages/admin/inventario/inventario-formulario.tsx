import { useNavigate } from "react-router-dom";
import { useForm } from "../../../shared/hooks/useForm";
import { Inventario } from "../../../core/models/Inventario";
import { FormEvent } from "react";
import { useAccionFormulario } from "../../../shared/hooks/useAccionFormulario";
import FormField from "../../../shared/components/form-field/form-field";
import FormActions from "../../../shared/components/form-actions/form-actions";

function InventarioFormulario() {
    const navigate = useNavigate();
    const { formData, handleChange } = useForm<Partial<Inventario>>({
        id: '',
        stock: 0,
        ultimaActualizacion: new Date(),
        producto: undefined,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (accion === "show") {
            return navigate(-1);
        }
    }

    const { accion, config } = useAccionFormulario();
    return (
        <form onSubmit={handleSubmit}>
            <span className="p-0 m-0">Datos del producto</span>
            <div className=" row gap-lg-0 gap-4 border rounded-2 m-0 p-4 mb-4">
                <FormField className="col-lg-4 col-12" label="Nombre:" name="nombre" onChange={handleChange} placeholder="el nombre" disabled={config.disable} value={formData.producto?.nombre || ""} />
                <FormField className="col-lg-4 col-12" label="Cantidad Unitaria:" name="cantidad_unitaria"  disabled={true} value={formData.producto?.cantidadUnitaria || ""} />
                <FormField className="col-lg-4 col-12" label="Precio:" name="precio" disabled={true} value={formData.producto?.precio || ""} />
            </div>

            <div className="row gap-lg-0 gap-4 border rounded-2 m-0 p-4">
                <FormField label="Cantidad:" name="cantidad" onChange={handleChange} placeholder="el nombre" disabled={config.disable} value={formData.stock || ""} />
                <FormField label="Fecha:" name="cantidad" placeholder="el nombre" disabled={true} value={formData.ultimaActualizacion?.toLocaleDateString() || ""} />
            </div>
            <FormActions accion={accion} config={config} />
        </form>
    )
}

export default InventarioFormulario