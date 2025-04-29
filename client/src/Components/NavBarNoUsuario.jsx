import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavBarNoUsuario = () => {
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
          <li><Link to="/register" onClick={() => setIsOpen(false)}>Register</Link></ li>
          <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBarNoUsuario;