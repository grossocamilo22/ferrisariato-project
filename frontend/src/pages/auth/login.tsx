import "./auth.css";

import { FormUserLogin } from "../../core/models/User"
import FormField from "../../shared/components/form-field/form-field"
import "./auth.css"
import { NavLink, useNavigate } from "react-router-dom";
import { validations } from "../../shared/utils/validations";
import { useValidation } from "../../shared/hooks/useValidation";
import { FormEvent } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useAuth } from "../../core/context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();
    const userValidations = {
        correo: [validations.required, validations.isEmail],
        password: [validations.required, validations.minLength(8)],

    };
    const { formData, handleChange, errors, validateForm } = useValidation<FormUserLogin>({
        correo: '',
        password: ''
    }, userValidations)
    const MySwal = withReactContent(Swal);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const userData = await login(formData.correo, formData.password);
                MySwal.fire({
                    title: 'Iniciado Sesión',
                    text: 'El usuario has iniciado sesión',
                    icon: 'success',
                })
                console.log(userData);
                 navigate(userData?.rol === "ADMIN" ? "/admin" : "/employee");
            } catch (err) {
                console.log(err);
                
                MySwal.fire({
                    title: `Error ... `,
                    text: `Credenciales incorrectas`,
                    icon: "error",
                })
            }
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            <FormField error={errors.correo} type="email" name="correo" value={formData.correo || ''} className="col-12 mb-3" onChange={handleChange} placeholder="el correo electrónico" />
            <FormField error={errors.password} type="password" name="password" value={formData.password || ''} className="col-12 mb-3" onChange={handleChange} placeholder="la contraseña" />
            <div className="col-12 d-flex justify-content-between text-center mb-4">
                <div className="form-check">
                    <input className="form-check-input focus-ring focus-ring-secondary" type="checkbox" value="" id="checkDefault" />
                    <label className="form-check-label" htmlFor="checkDefault">
                        Recordarme
                    </label>
                </div>
                <a className="text-decoration-none">¿Olvidaste tu contraseña?</a>
            </div>
            <button className="col-12 btn btn-auth mb-3">Login</button>
            <hr />
            <span className="d-block col-12 text-center fs-6 fw-semibold">¿No tienes cuenta? <NavLink to={"/auth/register"} className="text-decoration-underline">Crear cuenta</NavLink></span>
           
        </form>
    )
}

export default Login