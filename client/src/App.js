import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar";
import AgregarCorte from "./Screens/AgregarCorte";
import Home from "./Screens/Home";
import Contacto from "./Screens/Contacto";
import Cortes from "./Screens/Cortes";
import Barbero from "./Screens/Barberos";
import Agendar from "./Screens/AgendarCita";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import AdminAltBarbero from "./Screens/AdminAltBarbero";
import Sidebar from "./Components/NavBarBarbero";
import Settings from "./Screens/Settings";
import AdminAltCliente from "./Screens/AdminAltCliente";
import SidebarAdmin from "./Components/NavBarAdminG";
import HomeBarberos from "./Screens/HomeBarberos";
import AdminAgrBarbero from "./Screens/AdminAgrBarbero";
import AdminElimBarbero from "./Screens/AdminElimBarbero";
import HomeClientes from "./Screens/HomeClientes";
import VentasGenerales from "./Screens/VentasGenerales";
import NavBarNoUsuario from './Components/NavBarNoUsuario'; 

function App() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const estado = usuario?.estado;

  // Seleccionar el navbar correcto
  let NavbarComponent;
  if (!usuario) NavbarComponent = <NavBarNoUsuario />;
  else if (estado === 'cliente') NavbarComponent = <Navbar />;
  else if (estado === 'Barbero') NavbarComponent = <Sidebar />;
  else if (estado === 'administrador') NavbarComponent = <SidebarAdmin />;
  
  return (
    <div  className="App">
    <Router>
        {NavbarComponent}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/cortes" element={<Cortes />} />
        <Route path="/agregar-corte" element={<AgregarCorte />} />
        <Route path="/barbero" element={<Barbero />} />
        <Route path="/agendar" element={<Agendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AdminAltBarbero" element={<AdminAltBarbero />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/AdminAltCliente" element={<AdminAltCliente />} />
        <Route path="/HomeBarberos" element={<HomeBarberos />} />
        <Route path="/AdminAgrBarbero" element={<AdminAgrBarbero />} />
        <Route path="/AdminElimBarbero" element={<AdminElimBarbero />} />
        <Route path="/HomeClientes" element={<HomeClientes />} />
        <Route path="/VentasGenerales" element={<VentasGenerales />} />

      </Routes>
    </Router>
    </div>
    
  );
}

export default App;