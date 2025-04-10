import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../../pages/common/home/home";
import MainLayout from "../../shared/layouts/main/main-layout";
import App from "../../App";
import ClienteFormulario from "../../pages/common/cliente/cliente-formulario";
import EmpleadoLista from "../../pages/admin/empleado/empleado-lista";
import ClienteLista from "../../pages/common/cliente/cliente-lista";
import InventarioLista from "../../pages/admin/inventario/inventario-lista";
import InventarioFormulario from "../../pages/admin/inventario/inventario-formulario";
import EmpleadoFormulario from "../../pages/admin/empleado/empleado-formulario";
import ProductoLista from "../../pages/admin/producto/producto-lista";
import ProductoFormulario from "../../pages/admin/producto/producto-formulario";
import ProveedorLista from "../../pages/admin/proveedor/proveedor-lista";
import ProveedorFormulario from "../../pages/admin/proveedor/proveedor-formulario";
import VentaLista from "../../pages/common/venta/venta-lista";
import VentaFormulario from "../../pages/common/venta/venta-formulario";
import AuthLayout from "../../shared/layouts/auth/auth-layout";
import { RouteLoaderData } from "../interfaces/RouteLoaderData";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";

function ruta(
  nombrePath: string,
  listadoComponente?: React.ComponentType,
  formularioComponent?: React.ComponentType
): RouteObject {

  const nombre = nombrePath.charAt(0).toUpperCase()  + nombrePath.slice(1).toLowerCase();
  return {
    path: nombrePath,
    children: [
      {
        loader: ():RouteLoaderData => ({titulo:`Listado de ${nombre}`}),
        index: true,
        Component: listadoComponente,
      },
      {
        loader: ():RouteLoaderData => ({titulo:`Registrar ${nombre.slice(0,nombre.length - 1)}`}),
        path: "add",
        Component: formularioComponent,
      },
      {
        loader: ():RouteLoaderData => ({titulo:`Editar ${nombre.slice(0,nombre.length - 1)}`}),
        path: "edit/:id",
        Component: formularioComponent,
      },
      {
        path: "delete/:id",
        Component: listadoComponente,
      },
    ],
  };
}

export const route = createBrowserRouter([


  { path: "/", Component: App },
  { path: "/auth",Component:AuthLayout,
    children:[
      {
        index:true,
        path: "login",
        Component:Login
      },
      {
        index:true,
        path: "register",
        Component:Register
      },
    ]
  }
  ,
  {
    path: "/admin",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      ruta("clientes",ClienteLista,ClienteFormulario),
      ruta("empleados",EmpleadoLista,EmpleadoFormulario),
      ruta("inventarios",InventarioLista,InventarioFormulario),
      ruta("productos",ProductoLista,ProductoFormulario),
      ruta("proveedores",ProveedorLista,ProveedorFormulario),
      ruta("ventas",VentaLista,VentaFormulario),

    ],
  },
  {
    path: "/employee",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      ruta("clientes",ClienteLista,ClienteFormulario),
      ruta("ventas",VentaLista,VentaFormulario),
    ],
  },
]);
