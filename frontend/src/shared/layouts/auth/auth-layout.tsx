import { Outlet, useMatches } from "react-router-dom";
import "./auth-layout.css";
import { RouteLoaderData } from "../../../core/interfaces/RouteLoaderData";

const AuthLayout = () => {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const routeLoaderData = currentRoute.data as RouteLoaderData;
  return (
    <section className="container-fluid">
      <div className="card h-70 my-lg-5 m-3 p-3 border border-secondary-subtle border-2 border-opacity-50 shadow">
        <div className="card-body">
          <h1 className="card-title text-center mb-5 fw-bold fs-1">{routeLoaderData.titulo}</h1>
          <Outlet />
        </div>
      </div>

    </section>
  );
};

export default AuthLayout;