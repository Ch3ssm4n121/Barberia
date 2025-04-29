import React, { useState } from "react";
import axios from "axios";
import "./EditarBarbero.css"; // Usamos el mismo CSS

const AdminElimBarbero = () => {
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Barbero");
  const [mensaje, setMensaje] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEliminar = () => {
    if (!nombre || !estado) {
      setMensaje("Completa ambos campos");
      return;
    }
    setShowConfirm(true);
  };

  const confirmarEliminacion = () => {
    axios.delete(`http://localhost:3001/usuarios`, {
      data: { nombre, estado },
    })
      .then(res => {
        setMensaje("Usuario eliminado correctamente");
        setNombre("");
        setShowConfirm(false); // Cerrar modal
      })
      .catch(err => {
        console.error(err);
        setMensaje("No se encontró un usuario con ese nombre y estado");
        setShowConfirm(false); // Cerrar modal
      });
  };

  const cancelarEliminacion = () => {
    setShowConfirm(false); // Solo cerrar el modal si cancela
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Eliminar Usuario</h2>

      <div className="edit-form">
        <input
          type="text"
          placeholder="Nombre del usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Barbero">Barbero</option>
          <option value="Cliente">Cliente</option>
          <option value="Administrador">Administrador</option>
        </select>
        <button onClick={handleEliminar} className="edit-button">
          Eliminar
        </button>
      </div>

      {mensaje && <p className="error-message">{mensaje}</p>}

      {/* Modal de Confirmación */}
      {showConfirm && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro de que quieres eliminar este usuario?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-buttons">
              <button onClick={confirmarEliminacion} className="confirm-button">Confirmar</button>
              <button onClick={cancelarEliminacion} className="cancel-button">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminElimBarbero;
