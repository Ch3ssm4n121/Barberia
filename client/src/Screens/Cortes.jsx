import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgregarCorte.css';

function Cortes() {
  const [cortes, setCortes] = useState([]);

  useEffect(() => {
    const obtenerCortes = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/cortes');
        setCortes(res.data);
      } catch (error) {
        console.error('Error al obtener cortes:', error);
      }
    };

    obtenerCortes();
  }, []);

  return (
    <div className="cortes-lista">
      {cortes.length === 0 ? (
        <p>No hay cortes registrados.</p>
      ) : (
        cortes.map((corte) => (
          <div key={corte.id} className="corte-card">
            <img
              src={`http://localhost:3001/uploads/${corte.imagen}`}
              alt={corte.nombre}
              className="corte-img"
            />
            <h3>{corte.nombre}</h3>
            <p><strong>Precio:</strong> ${corte.precio}</p>
            <p>{corte.descripcion}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Cortes;