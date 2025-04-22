import { MouseEventHandler } from 'react';
import './header.css';
import { NavLink } from "react-router-dom";

function Header({ openSideNav }: { openSideNav: MouseEventHandler<HTMLAnchorElement> }) {
    return (
        <header className='header'>
            <ul className='header-content'>
                <li> <a className='nav-item menu-btn' onClick={openSideNav}><i className="bi bi-list"></i></a> </li>
                <li ><NavLink to="" className='nav-item ' data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Home"><i className='bi bi-house-door-fill' /></NavLink></li>
                <li className='dropdown'>
                    <a className="nav-item" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className='bi bi-person-fill' ></i>
                    </a>
                    <ul className="dropdown-menu">
                        {/* <li><a className="dropdown-item text-center" href="#">Administrar datos</a></li> */}
                        <li><a className="dropdown-item text-center" href="#">Cerrar sesión <i className="bi bi-box-arrow-in-right"></i></a></li>
                    </ul>

                </li>
            </ul>
        </header>

    )
}

export default Header