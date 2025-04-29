import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";
import "./SalesOverview.css";

const SalesOverview = () => {
  // Simulando datos de ejemplo
  const [salesData] = useState([
    { day: "Lun", ventas: 120 },
    { day: "Mar", ventas: 200 },
    { day: "Mié", ventas: 170 },
    { day: "Jue", ventas: 250 },
    { day: "Vie", ventas: 300 },
    { day: "Sáb", ventas: 400 },
    { day: "Dom", ventas: 280 },
  ]);

  const [topSeller] = useState("Jesus Alfredo");

  const handleAdd = () => {
    // Acción para añadir una venta (puedes abrir un modal aquí)
    alert("Funcionalidad para añadir venta");
  };

  const handleEdit = () => {
    // Acción para modificar venta (puedes abrir otro modal aquí)
    alert("Funcionalidad para modificar venta");
  };

  return (
    <div className="sales-container">
      <h2>Resumen de Ventas (Últimos 7 días)</h2>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ventas" fill="#b30000" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="actions">
        <button className="btn-add" onClick={handleAdd}>Añadir Venta</button>
        <button className="btn-edit" onClick={handleEdit}>Modificar Venta</button>
      </div>

      <div className="top-seller">
        <h3>Empleado Destacado de la Semana</h3>
        <p>{topSeller}</p>
      </div>
    </div>
  );
};

export default SalesOverview;
