import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgregarContacto.css';

const AgregarContacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    especialidad: '',
    foto: null,
  });

  const [barberos, setBarberos] = useState([]);

  // Obtener barberos
  useEffect(() => {
    obtenerBarberos();
  }, []);

  const obtenerBarberos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/barberos');
      setBarberos(res.data);
    } catch (error) {
      console.error('Error al obtener barberos:', error);
    }
  };

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
    data.append('telefono', formData.telefono);
    data.append('correo', formData.correo);
    data.append('especialidad', formData.especialidad);
    data.append('foto', formData.foto);

    try {
      const res = await axios.post('http://localhost:3001/api/barberos', data);
      if (res.status === 200) {
        alert('Barbero agregado correctamente');
        setFormData({
          nombre: '',
          telefono: '',
          correo: '',
          especialidad: '',
          foto: null,
        });
        obtenerBarberos(); // Recargar la lista
      } else {
        alert('Error al agregar barbero');
      }
    } catch (err) {
      console.error(err);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="contenedor-agregar">
      <h2>Agregar Barbero</h2>
      <form className="formulario-barbero" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
        <input type="email" name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} />
        <input type="text" name="especialidad" placeholder="Especialidad" value={formData.especialidad} onChange={handleChange} />
        <input type="file" name="foto" accept="image/*" onChange={handleChange} />
        <button type="submit">Agregar</button>
      </form>

      <h3 className="subtitulo-barberos">Barberos registrados</h3>
      <div className="cortes-lista">
        {barberos.length === 0 ? (
          <p>No hay barberos registrados.</p>
        ) : (
          barberos.map((barbero) => (
            <div key={barbero.id} className="corte-card">
              <img
                src={`http://localhost:3001/uploads/${barbero.foto}`}
                alt={barbero.nombre}
                className="corte-img"
              />
              <h3>{barbero.nombre}</h3>
              <p><strong>Tel:</strong> {barbero.telefono}</p>
              <p><strong>Correo:</strong> {barbero.correo}</p>
              <p><strong>Especialidad:</strong> {barbero.especialidad}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgregarContacto;