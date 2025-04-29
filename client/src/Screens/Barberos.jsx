import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Barberos.CSS";

const Barberos = () => {
  const [barberos, setBarberos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/barberos")
      .then(res => setBarberos(res.data))
      .catch(err => console.error("Error al obtener barberos:", err));
  }, []);

  return (
    <div className="container">
      <h2 className="title">Barberos Registrados</h2>
      <div className="card-grid">
        {barberos.map(barbero => (
          <div key={barbero.id} className="card">
            <p><strong>ID:</strong> {barbero.id}</p>
            <p><strong>Nombre:</strong> {barbero.nombre}</p>
            <p><strong>Teléfono:</strong> {barbero.telefono}</p>
            <p><strong>Edad:</strong> {barbero.edad}</p>
            <p><strong>Correo:</strong> {barbero.correo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Barberos;
