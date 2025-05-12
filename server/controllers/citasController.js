const db = require('../db/conexion');

exports.crearCita = (req, res) => {
  const { clienteId, corteId, barberoId, fecha, hora } = req.body;
  const sql = 'INSERT INTO citapendiente (cliente_id, corte_id, barbero_id, fecha, hora) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [clienteId, corteId, barberoId, fecha, hora], (err) => {
    if (err) return res.status(500).json({ error: 'Error al crear la cita' });
    res.status(200).json({ message: 'Cita registrada correctamente' });
  });
};

exports.obtenerPendientes = (req, res) => {
  const sql = `
    SELECT cp.id, u.nombre AS cliente, b.nombre AS barbero, c.nombre AS corte, cp.fecha, cp.hora
    FROM citapendiente cp
    JOIN usuarios u ON cp.cliente_id = u.id
    JOIN barberos b ON cp.barbero_id = b.id
    JOIN cortes c ON cp.corte_id = c.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener citas' });
    res.status(200).json(results);
  });
};

exports.marcarComoCumplida = (req, res) => {
  const citaId = req.params.id;
  const getSql = 'SELECT * FROM citapendiente WHERE id = ?';
  const insertSql = 'INSERT INTO citacumplida (cliente_id, corte_id, barbero_id, fecha, hora) VALUES (?, ?, ?, ?, ?)';
  const deleteSql = 'DELETE FROM citapendiente WHERE id = ?';

  db.query(getSql, [citaId], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'Cita no encontrada' });

    const { cliente_id, corte_id, barbero_id, fecha, hora } = results[0];
    db.query(insertSql, [cliente_id, corte_id, barbero_id, fecha, hora], (err) => {
      if (err) return res.status(500).json({ error: 'Error al mover cita a cumplida' });

      db.query(deleteSql, [citaId], (err) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar cita pendiente' });
        res.status(200).json({ message: 'Cita marcada como cumplida' });
      });
    });
  });
};

exports.rechazarCita = (req, res) => {
  const citaId = req.params.id;
  const sql = 'DELETE FROM citapendiente WHERE id = ?';
  db.query(sql, [citaId], (err) => {
    if (err) return res.status(500).json({ error: 'Error al rechazar cita' });
    res.status(200).json({ message: 'Cita rechazada' });
  });
};

exports.obtenerCumplidas = (req, res) => {
  const sql = `
    SELECT cc.id, u.nombre AS cliente, b.nombre AS barbero, c.nombre AS corte, cc.fecha, cc.hora
    FROM citacumplida cc
    JOIN usuarios u ON cc.cliente_id = u.id
    JOIN barberos b ON cc.barbero_id = b.id
    JOIN cortes c ON cc.corte_id = c.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener citas cumplidas' });
    res.status(200).json(results);
  });
};