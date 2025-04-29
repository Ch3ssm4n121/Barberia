import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MostrarUsuarios.css"; // Usaremos un CSS separado para la tabla

const MostrarBarberos = () => {
  const [Barberos, setBarberos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/usuarios/mostrarclientes?estado=Barbero")
      .then(res => {
        setBarberos(res.data);
      })
      .catch(err => {
        console.error(err);
        setMensaje("Error al cargar los usuarios");
      });
  }, []);

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Lista de Clientes</h2>

      {mensaje && <p className="error-message">{mensaje}</p>}

      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Edad</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {Barberos.length > 0 ? (
            Barberos.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.edad}</td>
                <td>{cliente.correo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No se encontraron clientes</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MostrarBarberos;
