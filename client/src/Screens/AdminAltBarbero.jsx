import React, { useState } from "react";
import axios from "axios";
import "./EditarBarbero.css";

const EditarBarberoManual = () => {
  const [inputId, setInputId] = useState("");
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");

  const handleBuscar = () => {
    if (!inputId) return;

    axios.get(`http://localhost:3001/api/usuarios/barberos/${inputId}`)
      .then(res => {
        setFormData(res.data);
        setError("");
      })
      .catch(err => {
        setFormData(null);
        setError("No se encontró un barbero con ese ID");
        console.error(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/barberos/${inputId}`, formData)
      .then(() => {
        alert("Barbero actualizado correctamente");
        setFormData(null);
        setInputId("");
      })
      .catch(err => {
        console.error("Error al actualizar:", err);
        alert("Error al actualizar el barbero");
      });
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Editar Barbero por ID</h2>

      <div className="edit-form">
        <input
          type="number"
          placeholder="Ingrese ID del barbero"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button onClick={handleBuscar} className="edit-button">
          Buscar
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {formData && (
        <form onSubmit={handleSubmit} className="edit-form" style={{ marginTop: "20px" }}>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
            required
          />
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Número telefónico"
            required
          />
          <input
            name="edad"
            type="number"
            value={formData.edad}
            onChange={handleChange}
            placeholder="Edad"
            required
          />
          <input
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Correo electrónico"
            required
          />
          <button type="submit" className="edit-button">Guardar Cambios</button>
        </form>
      )}
    </div>
  );
};

export default EditarBarberoManual;
