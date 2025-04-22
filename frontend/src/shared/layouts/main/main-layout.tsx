import { Outlet, useMatches } from "react-router"
import Breadcrumb from "../../components/breadcrumb/breadcrumb"
import Header from "../../templates/header/header"
import Sidenav from "../../templates/sidenav/sidenav"
import "./main-layout.css"
import { RouteLoaderData } from "../../../core/interfaces/RouteLoaderData"
import { useState } from "react"


function MainLayout() {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const routeLoaderData = currentRoute.data as RouteLoaderData;
  const [isSideNavOpened, setIsSideNavOpened] = useState(false);
  return (
    <div className={`main-container ${isSideNavOpened && 'open-sidenav'}`}>
      <Header openSideNav={() => setIsSideNavOpened(true)} />
      <section className='content'>
        <Breadcrumb />
        <div className="card shadow-sm border border-opacity-10 my-lg-5 my-3 mx-3 mx-lg-4 py-1">
          <div className="card-body">
            <h4 className="card-title d-flex align-items-center gap-2" >
              <i className={`d-inline-flex border border-dark border-1 p-1 rounded-circle  bi bi-${routeLoaderData.icon}`}></i>
              {`${routeLoaderData.titulo}`}</h4>
            <hr />
            <section className="container px-3 px-md-5 px-lg-5 py-3">
              <Outlet />
            </section>
          </div>
        </div>
      </section>
      <Sidenav closeSideNav={() => setIsSideNavOpened(false)} />
    </div>
  )
}
export default MainLayout