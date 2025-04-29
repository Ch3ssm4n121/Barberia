import React, { useState } from 'react';
import './AgregarCorte.css';
const AgregarCorte = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('descripcion', formData.descripcion);
    data.append('precio', formData.precio);
    data.append('imagen', formData.imagen);

    try {
      const response = await fetch('http://localhost:3001/api/cortes', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Corte agregado correctamente');
        setFormData({
          nombre: '',
          descripcion: '',
          precio: '',
          imagen: null,
        });
      } else {
        alert('Error al agregar el corte');
      }
    } catch (error) {
      console.error(error);
      alert('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="contenedor-principal">
      <h2>Agregar Nuevo Corte</h2>
      <form className="formulario-corte" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} />
        <input type="number" name="precio" placeholder="Precio" step="0.01" onChange={handleChange} required />
        <input type="file" name="imagen" accept="image/*" onChange={handleChange} />
        <button type="submit">Agregar Corte</button>
      </form>
      
    </div>
  );
};

export default AgregarCorte;