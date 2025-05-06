const db = require('../db/conexion');

exports.obtenerBarberos = (req, res) => {
  const sql = 'SELECT * FROM barberos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener barberos:', err);
      return res.status(500).json({ message: 'Error al obtener barberos' });
    }
    res.status(200).json(results);
  });
};

exports.crearBarbero = (req, res) => {
  const { nombre, telefono, correo, especialidad } = req.body;
  const foto = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO barberos (nombre, telefono, correo, especialidad, foto) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nombre, telefono, correo, especialidad, foto], (err, result) => {
    if (err) {
      console.error('Error al agregar barbero:', err);
      return res.status(500).json({ message: 'Error al agregar barbero' });
    }
    res.status(200).json({ message: 'Barbero agregado correctamente' });
  });
};