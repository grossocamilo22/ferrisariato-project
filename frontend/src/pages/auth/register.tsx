import { NavLink, useNavigate } from "react-router-dom";
import "./auth.css"
import FormField from "../../shared/components/form-field/form-field";
import { FormEvent, useState } from "react";
import { validations } from "../../shared/utils/validations";
import { useValidation } from "../../shared/hooks/useValidation";
import { User } from "../../core/models/User";
import { TipoIdentificacion } from "../../core/models/Tipo_Identificacion";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useAuth } from "../../core/context/AuthContext";

function Register() {

    const { register } = useAuth();
    const navigate = useNavigate();
    const userValidations = {
        id: [validations.required, validations.isNumeric],
        tipoIdentificacion: [validations.required],
        nombre: [validations.required, validations.isAlphaWithSpaces],
        apellido: [validations.required, validations.isAlphaWithSpaces],
        direccion: [validations.required],
        correo: [validations.required, validations.isEmail],
        password: [validations.required, validations.minLength(8)],
        contacto: [validations.required, validations.isNumeric],
    };
    const { formData, handleChange, errors, validateForm } = useValidation<User>({
        id: '',
        nombre: '',
        apellido: '',
        contacto: '',
        direccion: '',
        tipoIdentificacion: "CC",
        password: "",
        rol: "EMPLEADO",
        correo: ""
    }, userValidations)
    const [error, setError] = useState<string | null>(null);
    const MySwal = withReactContent(Swal);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const userData = await register(formData);
                MySwal.fire({
                    title: 'Iniciado Sesión',
                    text: 'El usuario has iniciado sesión',
                    icon: 'success',
                })
                console.log(userData);
                navigate(userData?.rol === "ADMIN" ? "/admin" : "/employee");
            } catch (err) {
                console.log(err);
                setError("Credenciales inválidas");
                MySwal.fire({
                    title: `Error ... `,
                    text: `${error}`,
                    icon: "success",
                })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <NavLink to={"/auth/login"} className="btn position-absolute top-0 start-0"><i className="bi bi-arrow-left"></i></NavLink>
            <FormField error={errors.id} type="text" name="id" value={formData.id || ''} className="col-12 mb-3" onChange={handleChange} placeholder="la identificación" />
            <div className="col-12 mb-3" >
                <select className={`form-select ${errors.tipoIdentificacion && "is-invalid"}`} name="tipoIdentificacion" value={formData.tipoIdentificacion} id="tipoIdentificacion" onChange={handleChange}>
                    <option value="">Seleccione el tipo de identificación</option>
                    {
                        Object.entries(TipoIdentificacion).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))
                    }
                </select>
                <div className="invalid-feedback d-block"> {/* d-block para forzar visualización */}
                    {errors.tipoIdentificacion}
                </div>
            </div>
            <FormField error={errors.nombre} type="text" name="nombre" value={formData.nombre || ''} className="col-12 mb-3" onChange={handleChange} placeholder="el nombre" />
            <FormField error={errors.apellido} type="text" name="apellido" value={formData.apellido || ''} className="col-12 mb-3" onChange={handleChange} placeholder="el apellido" />
            <FormField error={errors.contacto} type="text" name="contacto" value={formData.contacto || ''} className="col-12 mb-3" onChange={handleChange} placeholder="el numero de contacto" />
            <FormField error={errors.direccion} type="text" name="direccion" value={formData.direccion || ''} className="col-12 mb-3" onChange={handleChange} placeholder="la dirección" />
            <FormField error={errors.correo} type="email" name="correo" value={formData.correo || ''} className="col-12 mb-3" onChange={handleChange} placeholder="el correo electrónico" />
            <FormField error={errors.password} type="password" name="password" value={formData.password || ''} className="position-relative col-12 mb-3" onChange={handleChange} placeholder="la contraseña" />

            <button className="col-12 btn btn-auth mb-3">Registrar</button>
        </form>
    )
}

export default Register