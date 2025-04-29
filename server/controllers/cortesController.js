const db = require('../db/conexion');

const crearCorte = (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const imagen = req.file.filename;

  const sql = "INSERT INTO cortes (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)";

  db.query(sql, [nombre, descripcion, precio, imagen], (err, result) => {
    if (err) {
      console.error("Error al agregar corte:", err);
      return res.status(500).send("Error en el servidor");
    }
    res.send("Corte agregado exitosamente");
  });
};

const obtenerCortes = (req, res) => {
  db.query("SELECT * FROM cortes", (err, result) => {
    if (err) return res.status(500).send("Error al obtener cortes");
    res.json(result);
  });
};

module.exports = { crearCorte, obtenerCortes };