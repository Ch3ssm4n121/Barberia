import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Componentefecha.css";

const Componentefecha = () => {
  const [appointment, setAppointment] = useState({
    date: new Date(),
    time: "",
    name: "",
    phone: "",
    email: "",
    haircut: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cita enviada:", appointment);
    // Aquí puedes enviar los datos al backend con axios o fetch
  };

  return (
    <div className="schedule-container">
      <h2>Agendar Cita</h2>
      <form onSubmit={handleSubmit} className="schedule-form">
        <label>Fecha:</label>
        <DatePicker
          selected={appointment.date}
          onChange={(date) => setAppointment({ ...appointment, date })}
          dateFormat="dd/MM/yyyy"
          className="datepicker"
        />

        <label>Hora:</label>
        <input
          type="time"
          name="time"
          value={appointment.time}
          onChange={handleChange}
          required
        />

        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={appointment.name}
          onChange={handleChange}
          required
        />

        <label>Teléfono:</label>
        <input
          type="tel"
          name="phone"
          value={appointment.phone}
          onChange={handleChange}
          required
        />

        <label>Correo:</label>
        <input
          type="email"
          name="email"
          value={appointment.email}
          onChange={handleChange}
          required
        />

        <label>Tipo de corte:</label>
        <input
          type="text"
          name="haircut"
          value={appointment.haircut}
          onChange={handleChange}
          required
        />

        <button type="submit">Agendar</button>
      </form>
    </div>
  );
};

export default Componentefecha;
