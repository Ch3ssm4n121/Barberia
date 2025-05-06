const db = require('../db/conexion');
const path = require('path');

exports.crearCorte = (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const imagen = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO cortes (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, descripcion, precio, imagen], (err, result) => {
    if (err) {
      console.error('Error al insertar corte:', err);
      return res.status(500).json({ message: 'Error al insertar corte' });
    }
    res.status(200).json({ message: 'Corte agregado correctamente' });
  });
};
exports.obtenerCortes = (req, res) => {
  const sql = 'SELECT * FROM cortes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener cortes:', err);
      return res.status(500).json({ message: 'Error al obtener cortes' });
    }
    res.status(200).json(results);
  });
};