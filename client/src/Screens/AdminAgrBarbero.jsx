import React, { useState } from "react";
import "./Register.css";
import Axios from "axios";
const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    edad: "",
    correo: "",
    pasword: "",
    estado:"Barbero",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const add= () => {
    Axios.post("http://localhost:3001/api/usuarios/create", formData).then(() => {
      alert("has sido registrado correctamente")
    });
  };

  return (
    <div className="register-container">
      <h2>Registro Barbero</h2>
      <form>
        <label>Nombre Completo:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Tu nombre completo"
          required
        />

        <div className="form-row">
          <div>
            <label>Teléfono:</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Número de teléfono"
              required
            />
          </div>
          <div>
            <label>Edad:</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              placeholder="Tu edad"
              required
            />
          </div>
        </div>

        <label>Correo Electrónico:</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
          
        <label>Contraseña:</label>
        <input
          type="password"
          name="pasword"
          value={formData.pasword}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
         
        <button type="submit" onClick={add}>Registrarse</button>
      </form>
    </div>
  );
};

export default Register;