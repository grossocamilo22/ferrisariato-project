// src/pages/errors/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>404 - Página no encontrada</h1>
            <p>La ruta que estás buscando no existe.</p>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
};

export default NotFound;
