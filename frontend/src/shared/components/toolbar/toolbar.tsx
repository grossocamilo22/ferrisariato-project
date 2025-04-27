import "./toolbar.css"
import { NavLink } from 'react-router-dom';

export interface ToolBarProps {
    children: React.ReactNode;
}
function Toolbar({ children }: ToolBarProps) {

    return (
        <section className="d-flex flex-wrap gap-3 justify-content-between mb-3">

            <NavLink
                to="add"
                type="button"
                className="btn btn-shadow btn-light fw-medium d-flex align-items-center gap-2"
            >
                <i className="bi bi-plus-circle fw-bold"></i>
                <span>Agregar</span>
            </NavLink>

            <section className="col-lg-8 col-12 d-flex flex-wrap justify-content-end gap-3">
                {children}
            </section>

        </section>
    )
}
export default Toolbar