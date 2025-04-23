import { createBrowserRouter, RouteObject } from "react-router-dom";
import { RouteLoaderData } from "../../interfaces/RouteLoaderData";
import App from "../../../App";
import AuthLayout from "../../../shared/layouts/auth/auth-layout";
import Login from "../../../pages/auth/login";
import Register from "../../../pages/auth/register";
import MainLayout from "../../../shared/layouts/main/main-layout";
import Home from "../../../pages/common/home/home";
import ClienteLista from "../../../pages/common/cliente/cliente-lista";
import ClienteFormulario from "../../../pages/common/cliente/cliente-formulario";
import EmpleadoLista from "../../../pages/admin/empleado/empleado-lista";
import EmpleadoFormulario from "../../../pages/admin/empleado/empleado-formulario";
import InventarioFormulario from "../../../pages/admin/inventario/inventario-formulario";
import InventarioLista from "../../../pages/admin/inventario/inventario-lista";
import ProductoFormulario from "../../../pages/admin/producto/producto-formulario";
import ProductoLista from "../../../pages/admin/producto/producto-lista";
import ProveedorFormulario from "../../../pages/admin/proveedor/proveedor-formulario";
import ProveedorLista from "../../../pages/admin/proveedor/proveedor-lista";
import VentaFormulario from "../../../pages/common/venta/venta-formulario";
import VentaLista from "../../../pages/common/venta/venta-lista";
import Estadistica from "../../../pages/admin/estadistica/estadistica";


function ruta(
  mainPath: string,
  nombreSingular:string,
  listadoComponente?: React.ComponentType,
  formularioComponent?: React.ComponentType
): RouteObject {
  const nombrePlural =
    mainPath.charAt(0).toUpperCase() + mainPath.slice(1).toLowerCase();

  return {
    path: mainPath,
    children: [
      {
        loader: (): RouteLoaderData => ({
          titulo: `Listado de ${nombrePlural}`,
          icon: "file-text-fill",
        }),
        index: true,
        Component: listadoComponente,
      },
      {
        loader: (): RouteLoaderData => ({
          titulo: `Registrar ${nombreSingular}`,
          icon: "file-earmark-plus-fill",
        }),
        path: "add",
        Component: formularioComponent,
      },
      {
        loader: (): RouteLoaderData => ({
          titulo: `Editar ${nombreSingular}`,
          icon: "pencil-fill",
        }),
        path: "edit/:id",
        Component: formularioComponent,
      },
      {
        loader: (): RouteLoaderData => ({
          titulo: `Información de ${nombreSingular}`,
          icon: "eye-fill",
        }),
        path: "show/:id",
        Component: formularioComponent,
      },
    ],
  };
}

export const route = createBrowserRouter([
  { path: "/", Component: App },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        path: "login",
        Component: Login,
        loader: ():RouteLoaderData => ({titulo:"Iniciar sesión"})
      },
      {
        path: "register",
        Component: Register,
        loader: ():RouteLoaderData => ({titulo:"Crear Cuenta"})
      },
    ],
  },
  {
    path: "/admin",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: (): RouteLoaderData => ({ titulo: "Home", icon: "house-fill" }),
      },
      ruta("clientes","Cliente", ClienteLista, ClienteFormulario),
      ruta("empleados","Empleado", EmpleadoLista, EmpleadoFormulario),
      ruta("inventarios","Inventario", InventarioLista, InventarioFormulario),
      ruta("productos","Producto", ProductoLista, ProductoFormulario),
      ruta("proveedores","Proveedor", ProveedorLista, ProveedorFormulario),
      ruta("ventas","Venta", VentaLista, VentaFormulario),
      {
        path:"estadistica",
        Component:Estadistica,
        loader: (): RouteLoaderData => ({ titulo: "Estadistica", icon: "house-fill" }),
      }
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
      ruta("clientes","Cliente", ClienteLista, ClienteFormulario),
      ruta("ventas","Venta", VentaLista, VentaFormulario),
    ],
  },
]);
