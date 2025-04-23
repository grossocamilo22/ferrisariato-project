import "./auth.css";

import { FormUserLogin } from "../../core/models/User"
import FormField from "../../shared/components/form-field/form-field"
import { useForm } from "../../shared/hooks/useForm"
import "./auth.css"
import { NavLink } from "react-router-dom";

function Login() {

    const { formData, handleChange } = useForm<FormUserLogin>({
        correo: '',
        password: ''
    })

    return (
        <form action="">
            <FormField type="email" name="correo" value={formData.correo || ''} className="col-12 mb-4" onChange={handleChange} placeholder="el correo electrónico" />
            <FormField type="password" name="password" value={formData.password || ''} className="col-12 mb-4" onChange={handleChange} placeholder="la contraseña" />
            <div className="col-12 d-flex justify-content-between text-center mb-4">
                <div className="form-check">
                    <input className="form-check-input focus-ring focus-ring-secondary" type="checkbox" value="" id="checkDefault"/>
                        <label className="form-check-label" htmlFor="checkDefault">
                            Recordarme
                        </label>
                </div>
                <a className="text-decoration-none">¿Olvidaste tu contraseña?</a>
            </div>
            <button className="col-12 btn mb-3">Login</button>
            <hr />
            <span className="d-block col-12 text-center fs-6 fw-semibold">¿No tienes cuenta? <NavLink to={"/auth/register"}  className="text-decoration-underline">Crear cuenta</NavLink></span>
        </form>
    )
}

export default Login