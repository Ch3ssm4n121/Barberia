import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [nombre, setNombre] = useState('');
  const [pasword, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/usuarios/login', {
        nombre,
        pasword,
      });
      const usuario = res.data.user;
      localStorage.setItem('usuario', JSON.stringify(usuario));
      window.location.href = '/';
    } catch (err) {
      setMensaje(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="pasword"
            value={pasword}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
      </div>
    </div>
  );
}

export default Login;
