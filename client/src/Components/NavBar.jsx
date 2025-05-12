import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Barbería</Link>
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link></li>
          <li><Link to="/cortes" onClick={() => setIsOpen(false)}>Cortes</Link></li>
          <li><Link to="/agendar" onClick={() => setIsOpen(false)}>Agendar Cita</Link></li>
          <li><Link to="/Settings" onClick={() => setIsOpen(false)}>Ajustes</Link></li>
          <button className="logout-button" onClick={cerrarSesion}>Cerrar Sesión</button>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;