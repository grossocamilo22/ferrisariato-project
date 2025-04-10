import { Outlet, useMatches } from "react-router"
import Breadcrumb from "../../components/breadcrumb/breadcrumb"
import Header from "../../templates/header/header"
import Sidenav from "../../templates/sidenav/sidenav"
import "./main-layout.css"
import { RouteLoaderData } from "../../../core/interfaces/RouteLoaderData"


function MainLayout() {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const  routeLoaderData  = currentRoute.data as  RouteLoaderData ;
 
  return (
    <div className='main-container'>
      <Header />
      <section className='content'>
        <Breadcrumb />
        <div className="card shadow-sm border border-opacity-10 mt-lg-5 mt-3 mx-3 mx-lg-4 ">
          <div className="card-body">
            <h4 className="card-title d-flex align-items-center gap-2" >
              <i className="d-inline-flex border border-dark border-1 p-1 rounded-circle  bi bi-file-text-fill"></i>
             { `${routeLoaderData.titulo}`}</h4>
            <hr className="mb-lg-5 mb-3" />
            <Outlet />
          </div>
        </div>
      </section>
      <Sidenav />
    </div>
  )
}
export default MainLayout