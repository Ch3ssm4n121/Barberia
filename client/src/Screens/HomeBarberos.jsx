import React, { useState } from "react";
import "./HomeBarberos.css";
import { Link } from "react-router-dom";
import MostrarBarberos from "../Components/MostrarBarberos";
const AdminBarberos = () => {
  const [setIsOpen] = useState(false);
  return (
    <div className="admin-container">
      <h2 className="admin-title">Administración de Barberos</h2>
      <div className="admin-actions">
        <button className="admin-button large-button"><Link to="/AdminAgrBarbero" onClick={() => setIsOpen(false)}>Agregar</Link></button>
        <button className="admin-button large-button"><Link to="/AdminElimBarbero" onClick={() => setIsOpen(false)}>Eliminar</Link></button>
        <button className="admin-button large-button"><Link to="/AdminAltBarbero" onClick={() => setIsOpen(false)}>Modificar</Link></button>
      </div>
     <MostrarBarberos />
    </div>
  );
};

export default AdminBarberos;
