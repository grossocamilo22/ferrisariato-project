import { FormEvent } from "react";
import FormActions from "../../../shared/components/form-actions/form-actions";
import { useAccionFormulario } from "../../../shared/hooks/useAccionFormulario";
import { Cliente } from "../../../core/models/Cliente";
import { TipoIdentificacion } from '../../../core/models/Tipo_Identificacion';
import { useNavigate } from "react-router-dom";
import { useForm } from "../../../shared/hooks/useForm";
import FormField from "../../../shared/components/form-field/form-field";


function ClienteFormulario() {

    const navigate = useNavigate();
    /* const { id } = useParams(); */
    const { formData, handleChange } = useForm<Cliente>({
        id: '',
        nombre: '',
        apellido: '',
        contacto: '',
        direccion: '',
        tipoIdentificacion: ""
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (accion === "show") {
            return navigate(-1);
        }
    }

    /* useEffect(() => {
        if (id) {
            const obtenerCliente = async () => {
                const cliente = await obtenerPorId('clientes', id);
                setFormData(cliente);
            };
            obtenerCliente();
        }
    }, [id, setFormData]); */

    const { accion, config } = useAccionFormulario();

    return (
        <form className="row  gx-lg-5 gx-3 gy-4" onSubmit={handleSubmit}>
            <div className="col-lg-6 col-12" >
                <label htmlFor="tipoIdentificacion" className="form-label">Tipo de identificación:</label>
                <select className="form-select" name="tipoIdentificacion" value={formData.tipoIdentificacion} id="tipoIdentificacion" disabled={config.disable} onChange={handleChange}>
                    <option value="">Seleccione el tipo de identificación</option>
                    {
                        Object.entries(TipoIdentificacion).map(([key, value]) => (
                            <option key={key} defaultValue={key}>{value}</option>
                        ))
                    }
                </select>
            </div>
            <FormField label="Identificación:" name="id" onChange={handleChange} placeholder="la identificación" value={formData.id} disabled={config.disable} />
            <FormField label="Nombre:" name="nombre" onChange={handleChange} placeholder="el nombre" value={formData.nombre} disabled={config.disable} />
            <FormField label="Apellido:" name="apellido" onChange={handleChange} placeholder="el apellido" value={formData.apellido} disabled={config.disable} />
            <FormField label="Contacto:" name="contacto" onChange={handleChange} placeholder="el numero de contacto" value={formData.contacto} disabled={config.disable} />
            <FormField label="Dirección:" name="direccion" onChange={handleChange} placeholder="la dirección" value={formData.direccion} disabled={config.disable} />
            <FormActions accion={accion} config={config} />
        </form>
    )
}

export default ClienteFormulario