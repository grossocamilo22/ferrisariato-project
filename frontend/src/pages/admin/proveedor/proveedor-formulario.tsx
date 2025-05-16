import { useNavigate, useParams } from "react-router-dom";
import { Proveedor } from "../../../core/models/Proveedor";
import { FormEvent, useEffect } from "react";
import { useAccionFormulario } from "../../../shared/hooks/useAccionFormulario";
import FormField from "../../../shared/components/form-field/form-field";
import FormActions from "../../../shared/components/form-actions/form-actions";
import { validations } from "../../../shared/utils/validations";
import { useValidation } from "../../../shared/hooks/useValidation";
import { useApiEntity } from "../../../shared/hooks/useApiEntity";
import { mensaje } from "../../../shared/utils/mensaje";

function ProveedorFormulario() {
    const navigate = useNavigate();
    const { create, update, getById: getProveedorById } = useApiEntity<Omit<Proveedor, "id"> & { id?: string }>('proveedores');
    const { id } = useParams<{ id: string }>();
    const proveedorValidations = {
        nombre: [validations.required, validations.isAlphaWithSpaces],
        empresa: [validations.required],
        direccion: [validations.required],
        correo: [validations.required, validations.isEmail],
        contacto: [validations.required, validations.isNumeric],
    };


    const { formData, setFormData, handleChange, errors, validateForm } = useValidation<Proveedor>({
        id: '',
        nombre: '',
        empresa: '',
        contacto: '',
        direccion: '',
        correo: ''
    }, proveedorValidations);

    const cargarProveedor = async () => {
        const proveedor = await getProveedorById(id!);
        if (proveedor) {
            setFormData({ ...proveedor, id: proveedor.id ?? "" });
        }
    };

    useEffect(() => {
        if (id) {
            cargarProveedor();
        }
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (accion === "show") {
            navigate(-1);
            return;
        }

        if (!validateForm()) {
            return;
        }

        const proveedorData = {
            nombre: formData.nombre,
            contacto: formData.contacto,
            correo: formData.correo,
            direccion: formData.direccion,
            empresa: formData.empresa
        };

        try {
            let result;
            if (accion === "add") {
                result = await create(proveedorData);
            } else {
                if (!id) {
                    throw new Error("ID no proporcionado para edición");
                }
                result = await update(id, proveedorData);
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
    };

    const { accion, config } = useAccionFormulario();
    return (
        <form className="row gx-lg-5 gx-3 gy-4" onSubmit={handleSubmit}>
            <FormField error={errors.nombre} label="Nombre:" name="nombre" onChange={handleChange} placeholder="el nombre del encargado" value={formData.nombre} disabled={config.disable} />
            <FormField error={errors.empresa} label="Empresa:" name="empresa" onChange={handleChange} placeholder="el nombre de la empresa" value={formData.empresa} disabled={config.disable} />
            <FormField error={errors.contacto} label="Contacto:" name="contacto" onChange={handleChange} placeholder="el numero de contacto" value={formData.contacto} disabled={config.disable} />
            <FormField error={errors.correo} label="Correo:" name="correo" type="email" onChange={handleChange} placeholder="el correo" value={formData.correo || ""} disabled={config.disable} />
            <FormField error={errors.direccion} label="Dirección:" name="direccion" onChange={handleChange} placeholder="la dirección" value={formData.direccion} disabled={config.disable} />
            <FormActions accion={accion} config={config} />
        </form>
    )
}

export default ProveedorFormulario