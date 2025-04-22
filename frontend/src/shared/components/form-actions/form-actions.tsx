import { useNavigate } from 'react-router-dom';
import { Accion, ActionOptions } from '../../hooks/useAccionFormulario';

function FormActions({ accion, config }: { accion: Accion, config: ActionOptions }) {
    const navigate = useNavigate();

    return (
        <div className={`col-12 d-flex flex-wrap align-items-center mt-5  ${accion !== "show" ? "justify-content-between" : "justify-content-center"}`}>
            <button type="submit" className={`btn btn-shadow text-white ${config.className} `}><i className={`bi bi-${config.icon}`}></i> {config.btnName}</button>
            {accion !== "show" && (
                <button type="button" className="btn btn-shadow fw-medium btn-danger" onClick={()=>navigate(-1)}>
                    <i className="bi bi-x-octagon"></i> Cancelar
                </button>
            )}

        </div>
    )
}

export default FormActions