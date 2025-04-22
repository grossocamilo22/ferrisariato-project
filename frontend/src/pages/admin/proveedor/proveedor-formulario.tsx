import { useNavigate } from "react-router-dom";
import { Proveedor } from "../../../core/models/Proveedor";
import { useForm } from "../../../shared/hooks/useForm";
import { FormEvent } from "react";
import { useAccionFormulario } from "../../../shared/hooks/useAccionFormulario";
import FormField from "../../../shared/components/form-field/form-field";
import FormActions from "../../../shared/components/form-actions/form-actions";

function ProveedorFormulario(){
    const navigate = useNavigate();
    const { formData, handleChange } = useForm<Proveedor>({
        id: '',
        nombre: '',
        empresa: '',
        contacto: '',
        direccion:'',
        correo:''
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
            <FormField label="Nombre:" name="nombre" onChange={handleChange} placeholder="el nombre del encargado" value={formData.nombre} disabled={config.disable} />
            <FormField label="Empresa:" name="empresa" onChange={handleChange} placeholder="el nombre de la empresa" value={formData.empresa} disabled={config.disable} />
            <FormField label="Contacto:" name="contacto" onChange={handleChange} placeholder="el numero de contacto" value={formData.contacto} disabled={config.disable} />
            <FormField label="Correo:" name="correo" type="email" onChange={handleChange} placeholder="el correo" value={formData.correo || ""} disabled={config.disable} />
            <FormField label="Dirección:" name="direccion" onChange={handleChange} placeholder="la dirección" value={formData.direccion} disabled={config.disable} />
            <FormActions accion={accion} config={config} />
        </form>
    )
}

export default ProveedorFormulario