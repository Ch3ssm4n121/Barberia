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