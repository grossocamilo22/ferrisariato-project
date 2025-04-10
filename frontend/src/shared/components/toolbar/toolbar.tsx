import "./toolbar.css"
import { NavLink } from 'react-router-dom';
function Toolbar() {

    return (
        <section className="d-flex justify-content-between">
            <NavLink
                to="add"
                type="button"
                className="btn btn-light fw-medium d-flex align-items-center gap-2"
            >
                <i className="bi bi-plus-circle fw-bold"></i>
                <span>Agregar</span>
            </NavLink>
            <div className="position-relative col-md-3">
                <input type="text" className="form-control border border-black border-opacity-50" placeholder="Buscar Cliente" />
                <i className="btn position-absolute top-0 end-0 bi bi-search fw-bolder"></i>
            </div>
        </section>
    )
}
export default Toolbar