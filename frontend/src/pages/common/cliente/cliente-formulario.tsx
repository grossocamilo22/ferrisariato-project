import { FormEvent, useEffect } from "react";
import FormActions from "../../../shared/components/form-actions/form-actions";
import { useAccionFormulario } from "../../../shared/hooks/useAccionFormulario";
import { Cliente } from "../../../core/models/Cliente";
import { TipoIdentificacion } from '../../../core/models/Tipo_Identificacion';
import { useNavigate, useParams } from "react-router-dom";
import FormField from "../../../shared/components/form-field/form-field";
import { validations } from "../../../shared/utils/validations";
import { useValidation } from "../../../shared/hooks/useValidation";
import { useApiEntity } from "../../../shared/hooks/useApiEntity";
import { mensaje } from "../../../shared/utils/mensaje";


function ClienteFormulario() {

    const { create, update, getById: getClienteById } = useApiEntity<Cliente>('clientes');
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    /* const { id } = useParams(); */
    const cleinteValidations = {
        id: [validations.required, validations.isNumeric],
        tipoIdentificacion: [validations.required],
        nombre: [validations.required, validations.isAlphaWithSpaces],
        apellido: [validations.required, validations.isAlphaWithSpaces],
        direccion: [validations.required],
        contacto: [validations.required, validations.isNumeric],
    };
    const { formData, setFormData, handleChange, errors, validateForm } = useValidation<Cliente>({
        id: '',
        tipoIdentificacion: 'CC',
        nombre: '',
        apellido: '',
        contacto: '',
        direccion: '',
    }, cleinteValidations);

    const cargarCliente = async () => {
        const cliente = await getClienteById(id!);
        if (cliente) {
            setFormData(cliente);
        }
    };

    useEffect(() => {
        if (id) {
            cargarCliente();
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

        try {
            let result;
            if (accion === "add") {
                result = await create(formData);
            } else {
                if (!id) {
                    throw new Error("ID no proporcionado para edición");
                }
                result = await update(id, formData);
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
        <form className="row  gx-lg-5 gx-3 gy-4" onSubmit={handleSubmit}>
            <div className="col-lg-6 col-12">
                <label htmlFor="tipoIdentificacion" className="form-label">Tipo de identificación:</label>
                <select
                    className={`form-select ${errors.tipoIdentificacion && "is-invalid"}`}
                    name="tipoIdentificacion"
                    value={formData.tipoIdentificacion} // Debería ser la clave (CC, TI, etc.)
                    id="tipoIdentificacion"
                    disabled={config.disable}
                    onChange={handleChange}
                >
                    <option value="">Seleccione el tipo de identificación</option>
                    {Object.entries(TipoIdentificacion).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>
                <div className="invalid-feedback d-block"> {/* d-block para forzar visualización */}
                    {errors.tipoIdentificacion}
                </div>
            </div>
            <FormField error={errors.id} label="Identificación:" name="id" onChange={handleChange} placeholder="la identificación" value={formData.id} disabled={config.disable} />
            <FormField error={errors.nombre} label="Nombre:" name="nombre" onChange={handleChange} placeholder="el nombre" value={formData.nombre} disabled={config.disable} />
            <FormField error={errors.apellido} label="Apellido:" name="apellido" onChange={handleChange} placeholder="el apellido" value={formData.apellido} disabled={config.disable} />
            <FormField error={errors.contacto} label="Contacto:" name="contacto" onChange={handleChange} placeholder="el numero de contacto" value={formData.contacto} disabled={config.disable} />
            <FormField error={errors.direccion} label="Dirección:" name="direccion" onChange={handleChange} placeholder="la dirección" value={formData.direccion} disabled={config.disable} />
            <FormActions accion={accion} config={config} />
        </form>
    )
}

export default ClienteFormulario