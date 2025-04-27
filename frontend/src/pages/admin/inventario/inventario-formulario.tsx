import { useNavigate } from "react-router-dom";
import { useForm } from "../../../shared/hooks/useForm";
import { FormEvent } from "react";
import { useAccionFormulario } from "../../../shared/hooks/useAccionFormulario";
import FormField from "../../../shared/components/form-field/form-field";
import FormActions from "../../../shared/components/form-actions/form-actions";
import { InventarioForm } from "../../../core/models/Inventario";
import Autocomplete from "../../../shared/components/autocomplete/autocomplete";
import { productosData } from "../../../core/data/productoData";

function InventarioFormulario() {
    const navigate = useNavigate();
    const { formData, setFormData, handleChange } = useForm<Partial<InventarioForm>>({
        id: '',
        productName: "",
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
                <Autocomplete listaDatos={productosData.map(producto => (producto))}
                    setFormData={setFormData}
                    parametro={formData.productName ?? ""}
                    campoObjeto="producto"
                    campoTexto="productName">
                    <FormField className="col-12" label="Nombre:" name="productName" onChange={handleChange} placeholder="el nombre" disabled={config.disable} value={formData.productName ?? ""} />
                </Autocomplete>
                <FormField className="col-lg-4 col-12" label="Cantidad Unitaria:" name="cantidad_unitaria" disabled={true} value={formData.producto?.cantidadUnitaria ?? ''} />
                <FormField className="col-lg-4 col-12" label="Precio:" name="precio" disabled={true} value={formData.producto?.precio ?? ""} />
                <FormField className="col-lg-4 col-12" label="Nombre:" name="nombre" onChange={handleChange} placeholder="el nombre" disabled={config.disable} value={formData.producto?.nombre || ""} />
                <FormField className="col-lg-4 col-12" label="Cantidad Unitaria:" name="cantidad_unitaria"  disabled={true} value={formData.producto?.cantidadUnitaria || ""} />
                <FormField className="col-lg-4 col-12" label="Precio:" name="precio" disabled={true} value={formData.producto?.precio || ""} />
            </div>

            <div className="row gap-lg-0 gap-4 border rounded-2 m-0 p-4">
                <FormField label="Cantidad:" name="cantidad" onChange={handleChange} placeholder="la cantidad" disabled={config.disable} value={formData.stock ?? ""} />
                <FormField label="Fecha:" name="cantidad" placeholder="el nombre" disabled={true} value={formData.ultimaActualizacion?.toLocaleDateString() ?? ""} />
                <FormField label="Cantidad:" name="cantidad" onChange={handleChange} placeholder="el nombre" disabled={config.disable} value={formData.stock || ""} />
                <FormField label="Fecha:" name="cantidad" placeholder="el nombre" disabled={true} value={formData.ultimaActualizacion?.toLocaleDateString() || ""} />
            </div>
            <FormActions accion={accion} config={config} />
        </form>
    )
}

export default InventarioFormulario