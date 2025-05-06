import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Contacto.css';

const Contacto = () => {
  const [barberos, setBarberos] = useState([]);

  useEffect(() => {
    const obtenerBarberos = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/barberos');
        setBarberos(res.data);
      } catch (error) {
        console.error('Error al obtener barberos:', error);
      }
    };

    obtenerBarberos();
  }, []);

  return (
    <div className="contacto-container">
      <h2 className="titulo-contacto">Conoce a nuestros barberos</h2>

      <div className="barberos-lista">
        {barberos.length === 0 ? (
          <p>No hay barberos registrados.</p>
        ) : (
          barberos.map((barbero) => (
            <div key={barbero.id} className="barbero-card">
              <img
                src={`http://localhost:3001/uploads/${barbero.foto}`}
                alt={barbero.nombre}
                className="barbero-img"
              />
              <h3>{barbero.nombre}</h3>
              <p><strong>Especialidad:</strong> {barbero.especialidad}</p>
              <p>{barbero.telefono}</p>
              <p>{barbero.correo}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Contacto;