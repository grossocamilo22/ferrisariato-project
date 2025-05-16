// src/pages/errors/Unauthorized.tsx
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized: React.FC = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🚫 Acceso denegado</h1>
      <p>No tienes permisos para ver esta página.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default Unauthorized;
