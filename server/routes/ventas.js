const express = require('express');
const router = express.Router();
const db = require('../db/conexion2'); // Asegúrate de que este archivo conecte a tu base de datos

router.get('/resumen', async (req, res) => {
    const { desde, hasta } = req.query;

try {
    const [ventas] = await db.execute(`
        SELECT DATE(cc.fecha) as fecha, cc.barbero_id, c.precio
        FROM citacumplida cc
        JOIN cortes c ON cc.corte_id = c.id
        WHERE cc.fecha BETWEEN ? AND ?
    `, [desde, hasta]);

    console.log("Ventas:", ventas); // 👈

    const ventasPorDia = {};
    const barberos = {};

    ventas.forEach(v => {
        const fecha = typeof v.fecha === 'string' ? v.fecha : v.fecha.toISOString().split('T')[0];
        ventasPorDia[fecha] = (ventasPorDia[fecha] || 0) + v.precio;
        barberos[v.idBarbero] = (barberos[v.idBarbero] || 0) + 1;
    });

    const idBarberoDestacado = Object.entries(barberos).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    let nombreBarbero = null;
    if (idBarberoDestacado) {
        const [resultado] = await db.execute(
            `SELECT nombre FROM barberos WHERE id = ?`,
            [idBarberoDestacado]
        );
        nombreBarbero = resultado[0]?.nombre ?? null;
    }

    res.json({
        ventasPorDia,
        empleadoDestacado: nombreBarbero
    });
} catch (err) {
    console.error("Error en /resumen:", err); // 👈
    res.status(500).json({ error: 'Error al obtener las ventas' });
}
});
module.exports = router;