import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import './ventasgenerales.css'; // Asegúrate de tener este archivo CSS

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

function VentasGenerales() {
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');
    const [datos, setDatos] = useState(null);

    const consultar = async () => {
        const res = await axios.get('http://localhost:3001/api/ventas/resumen', {
            params: { desde, hasta }
        });
        setDatos(res.data);
    };

    const chartData = datos ? {
        labels: Object.keys(datos.ventasPorDia),
        datasets: [{
            label: 'Ventas',
            data: Object.values(datos.ventasPorDia),
            backgroundColor: 'red'
        }]
    } : null;

    const options = {
        scales: {
            x: {
                type: 'category',
                ticks: {
                    maxRotation: 45,
                    minRotation: 45
                }
            },
            y: {
                type: 'linear',
                beginAtZero: true
            }
        }
    };

    return (
      <div class="ventas-generales-container">
    <h2>Resumen de Ventas</h2>
    <div class="filtros-ventas">
        <label>Desde: <input type="date" value={desde} onChange={e => setDesde(e.target.value)} /></label>
        <label>Hasta: <input type="date" value={hasta} onChange={e => setHasta(e.target.value)} /></label>
        <button onClick={consultar}>Consultar</button>
    </div>

    {datos && (
        <div class="resultados-ventas">
            <div class="grafica-container">
                <Bar data={chartData} options={options} />
            </div>
            <h3>Empleado Destacado: {datos.empleadoDestacado}</h3>
        </div>
    )}
</div>
    );
}

export default VentasGenerales;