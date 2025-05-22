import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaWhatsapp } from 'react-icons/fa';
import './AdminCitas.css'; // Asegúrate de tener este archivo CSS

const AdminCitas = () => {
  const [citas, setCitas] = useState([]);

  const obtenerCitas = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/citas/pendientes');
      setCitas(res.data);
    } catch (err) {
      console.error('Error al obtener citas:', err);
    }
  };

  const cumplirCita = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/citas/cumplir/${id}`);
      alert(res.data.message);
      obtenerCitas(); // refrescar lista
    } catch (err) {
      alert('Error al cumplir cita');
      console.error(err);
    }
  };

  const rechazarCita = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/citas/rechazar/${id}`);
      alert(res.data.message);
      obtenerCitas(); // refrescar lista
    } catch (err) {
      alert('Error al rechazar cita');
      console.error(err);
    }
  };

  useEffect(() => {
    obtenerCitas();
  }, []);

  return (
    <div className="admin-citas-container"> {/* quitar el punto */}
      <h2>Citas Pendientes</h2>
      <table className="tabla-citas"> {/* agregar esta clase */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.id}</td>
              <td>{cita.cliente_id}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>
                <button onClick={() => cumplirCita(cita.id)} title="Cumplida"><FaCheck /></button>
                <button onClick={() => rechazarCita(cita.id)} title="Rechazar"><FaTimes /></button>
                <a
                  href={`https://wa.me/${cita.telefono}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Enviar WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCitas;