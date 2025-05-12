import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgendarCita.css';

const AgendarCita = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const [cortes, setCortes] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [formData, setFormData] = useState({
    corteId: '',
    barberoId: '',
    fecha: '',
    hora: ''
  });

  // Cargar cortes y barberos
  useEffect(() => {
    const fetchData = async () => {
      const cortesRes = await axios.get('http://localhost:3001/api/cortes');
      const barberosRes = await axios.get('http://localhost:3001/api/barberos');
      setCortes(cortesRes.data);
      setBarberos(barberosRes.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cita = {
        clienteId: usuario.id,
        corteId: formData.corteId,
        barberoId: formData.barberoId,
        fecha: formData.fecha,
        hora: formData.hora
      };
      await axios.post('http://localhost:3001/api/citas/nueva', cita);
      alert('Cita agendada correctamente');
    } catch (err) {
      console.error(err);
      alert('Error al agendar cita');
    }
  };

  return (
    <div className="agendar-container">
      <h2>Agendar Cita</h2>
      <form onSubmit={handleSubmit} className="agendar-form">
        <input type="text" value={usuario.nombre} disabled />
        <select name="corteId" value={formData.corteId} onChange={handleChange} required>
          <option value="">Selecciona un corte</option>
          {cortes.map(corte => (
            <option key={corte.id} value={corte.id}>{corte.nombre}</option>
          ))}
        </select>
        <select name="barberoId" value={formData.barberoId} onChange={handleChange} required>
          <option value="">Selecciona un barbero</option>
          {barberos.map(barbero => (
            <option key={barbero.id} value={barbero.id}>{barbero.nombre}</option>
          ))}
        </select>
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
        <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
        <button type="submit">Confirmar Cita</button>
      </form>
    </div>
  );
};

export default AgendarCita;