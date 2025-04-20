import React, { useState } from 'react';
import './CrearUsuario.css';

function CrearUsuario() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simula el envío al backend
    fetch('https://api.ejemplo.com/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Usuario creado con éxito');
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="contenedor">
      <h2>Crear Usuario - Ferrisariato</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={usuario.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={usuario.correo}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={usuario.contraseña}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
}

export default CrearUsuario;