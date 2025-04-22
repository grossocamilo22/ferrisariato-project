import React, { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>

      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full border rounded-md px-4 py-2 mb-4 text-sm"
      />

      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          className="w-full border rounded-md px-4 py-2 text-sm"
        />
        <span
          className="absolute right-3 top-3 cursor-pointer text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          👁️
        </span>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700">
        Ingresar
      </button>

      <div className="text-sm text-center mt-4 text-gray-600">
        <p>¿Olvidaste tu contraseña? <a href="#" className="text-blue-600 font-medium">Recupérala</a></p>
        <p className="mt-2">¿No tienes una cuenta? <a href="#" className="text-blue-600 font-medium">Regístrate</a></p>
      </div>
    </>
  );
};

export default LoginForm;
