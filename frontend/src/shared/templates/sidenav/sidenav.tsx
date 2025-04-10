import "./sidenav.css"
import { NavItem } from '../../../core/interfaces/NavItem';
import { NavLink } from "react-router-dom";

function Sidenav() {
    const navItems: NavItem[] = [
        { icon: "people-fill", name: "Clientes", url: "clientes" },
        { icon: "person-fill-gear", name: "Empleados", url: "empleados" },
        { icon: "cart-plus-fill", name: "Ventas", url: "ventas" },
        { icon: "tools", name: "Productos", url: "productos" },
        { icon: "person-fill-check", name: "Proveedores", url: "proveedores" },
        { icon: "file-earmark-text-fill", name: "Inventario", url: "inventarios" },
        { icon: "bar-chart-fill", name: "Estadistica", url: "estadistica" },
    ];


    return (
        <nav className="sidenav">
            <ul className="sidenav-header">
                <li><img src="/assets/logo.png" alt="logo" /> <span>Ferrisariato</span></li>
            </ul>
            <ul className="sidenav-content">
                {navItems.map((element, key) => (
                    <li key={key}>
                        <NavLink to={`${element.url}`}><i className={`className="bi bi-${element.icon}`}></i> <span>{element.name}</span> </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );

}

export default Sidenav