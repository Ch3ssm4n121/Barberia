import "./NavBarBarbero.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  };
     const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Panel de Administración</h2>
       <Link to="/" className="navbar-logo">Barbería</Link>
       <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item"><Link to="/HomeClientes" onClick={() => setIsOpen(false)}>Administracion Clientes</Link></li>
        <li className="sidebar-item"><Link to="/HomeBarberos" onClick={() => setIsOpen(false)}>Administracion Barberos</Link></li>
        <li className="sidebar-item"><Link to="/AdminCitas" onClick={() => setIsOpen(false)}>Administracion Citas</Link></li>
        <li className="sidebar-item"><Link to="/agregar-corte" onClick={() => setIsOpen(false)}>Gestionar Cortes</Link></li>
        <li className="sidebar-item"><Link to="/AgregarContacto" onClick={() => setIsOpen(false)}>Agregar Barbero</Link></li>
        <li className="sidebar-item"><Link to="/VentasGenerales" onClick={() => setIsOpen(false)}>Ventas Generales</Link></li>
        <li className="sidebar-item"><Link to="/Settings" onClick={() => setIsOpen(false)}>Ajustes</Link></li>
        <button className="logout-button" onClick={cerrarSesion}>Cerrar Sesión</button>

      </ul>
    </div>
  );
};

export default SidebarAdmin;