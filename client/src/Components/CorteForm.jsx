import React, { useState } from 'react';
import axios from 'axios';

function CorteForm({ onCorteAgregado }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    costo: '',
    imagen_url: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/cortes', formData);
      setFormData({ nombre: '', descripcion: '', costo: '', imagen_url: '' });
      onCorteAgregado(); // para refrescar la lista si es necesario
    } catch (error) {
      console.error('Error al agregar corte:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h3>Agregar Nuevo Corte</h3>
      <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
      <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input name="costo" type="number" step="0.01" value={formData.costo} onChange={handleChange} placeholder="Costo" required />
      <input name="imagen_url" value={formData.imagen_url} onChange={handleChange} placeholder="URL Imagen" />
      <button type="submit">Agregar Corte</button>
    </form>
  );
}

export default CorteForm;