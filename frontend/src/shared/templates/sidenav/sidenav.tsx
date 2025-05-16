import "./sidenav.css"
import { NavItem } from '../../../core/interfaces/NavItem';
import { NavLink } from "react-router-dom";
import { MouseEventHandler } from "react";
import { useAuth } from "../../../core/context/AuthContext";

function Sidenav({ closeSideNav }: { closeSideNav: MouseEventHandler<HTMLAnchorElement> }) {
    const { user } = useAuth();

    const navItems: NavItem[] = [
        { icon: "people-fill", name: "Clientes", url: "clientes", roles: ["ADMIN", "EMPLEADO"] },
        { icon: "person-fill-gear", name: "Empleados", url: "empleados", roles: ["ADMIN"] },
        { icon: "cart-plus-fill", name: "Ventas", url: "ventas", roles: ["ADMIN", "EMPLEADO"] },
        { icon: "tools", name: "Productos", url: "productos", roles: ["ADMIN"] },
        { icon: "person-fill-check", name: "Proveedores", url: "proveedores", roles: ["ADMIN"] },
        { icon: "file-earmark-text-fill", name: "Inventario", url: "inventarios", roles: ["ADMIN"] },
       /*  { icon: "bar-chart-fill", name: "Estadistica", url: "estadistica", roles: ["ADMIN"] }, */
    ];

    // Filtra según el rol del usuario
    const filteredNavItems = navItems.filter(item =>
        item.roles.includes(user?.rol || "empleado")
    );



    return (
        <nav className="sidenav">
            <ul className="sidenav-header">
                <li><img src="/assets/logo.png" alt="logo" /> <span>Ferrisariato</span></li>
                <li> <a className='nav-item close-btn' onClick={closeSideNav}><i className="bi bi-x-lg"></i></a> </li>
            </ul>
            <ul className="sidenav-content">
                {filteredNavItems.map((element, key) => (
                    <li key={key}>
                        <NavLink to={`${element.url}`} onClick={closeSideNav}>
                            <i className={`bi bi-${element.icon}`}></i>
                            <span>{element.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );

}

export default Sidenav