import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';

function Settings() {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    edad: '',
    correo: '',
    pasword: ''
  });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('usuario'));
    if (storedUser) {
      setUsuario(storedUser);
      setFormData({
        nombre: storedUser.nombre || '',
        telefono: storedUser.telefono || '',
        edad: storedUser.edad || '',
        correo: storedUser.correo || '',
        pasword: ''
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/modificarusuarios/${usuario.id}`, formData);
  
      if (res.data && res.data.usuarioActualizado) {
        const actualizado = res.data.usuarioActualizado;
        localStorage.setItem('usuario', JSON.stringify(actualizado));
        setUsuario(actualizado); // ← actualiza el estado local
        setFormData(prev => ({
          ...prev,
          pasword: '' // opcional: limpiar campo de contraseña
        }));
        setMensaje('Datos actualizados correctamente');
      } else {
        setMensaje('Error inesperado al actualizar los datos');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Error al actualizar los datos');
    }
  };
  return (
    <div className="ajustes-container">
      <h2>Ajustes de Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label>Teléfono</label>
        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />

        <label>Edad</label>
        <input type="number" name="edad" value={formData.edad} onChange={handleChange} />

        <label>Correo</label>
        <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />

        <label>Contraseña</label>
        <input type="password" name="pasword" value={formData.pasword} onChange={handleChange} />

        <button type="submit">Guardar Cambios</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}

export default Settings;
