import { useState } from "react";
import "./AdminBarbero.css";

export default function AdminBarbero() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    edad: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", form);
  };

  return (
    <div className="container">
      <h2 className="title">Administrador de Clientes</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <label className="input-label">Nombre del Cliente:</label>
        <input type="text" name="nombre" className="input-field wide" onChange={handleChange} required />
        
        <label className="input-label">Telefono:</label>
        <input type="text" name="Telefono" className="input-field wide" onChange={handleChange} required />
        
        <label className="input-label">Edad:</label>
        <input type="number" name="edad" className="input-field wide" onChange={handleChange} required />
        
        <label className="input-label">Correo Electrónico:</label>
        <input type="email" name="email" className="input-field wide" onChange={handleChange} required />
        
        <label className="input-label">Contraseña:</label>
        <input type="password" name="password" className="input-field wide" onChange={handleChange} required />

        <button type="submit" className="submit-button">Guardar</button>
      </form>
    </div>
  );
}
