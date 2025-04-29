import React from 'react';
import './CorteCard.css';

function CorteCard({ corte }) {
  return (
    <div className="corte-card">
      <img src={corte.imagen_url} alt={corte.nombre} />
      <h3>{corte.nombre}</h3>
      <p>{corte.descripcion}</p>
      <span>${parseFloat(corte.costo).toFixed(2)}</span>
    </div>
  );
}

export default CorteCard;