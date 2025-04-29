import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CorteCard from '../Components/CorteCard';

function Cortes() {
  const [cortes, setCortes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/cortes')
      .then(res => setCortes(res.data))
      .catch(err => console.error("Error al obtener cortes:", err));
  }, []);

  return (
    <div className="cortes-container">
      <h2>Cortes Disponibles</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cortes.map(corte => (
          <CorteCard key={corte.id} corte={corte} />
        ))}
      </div>
    </div>
  );
}

export default Cortes;