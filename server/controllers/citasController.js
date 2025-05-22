const db = require('../db/conexion');

exports.crearCita = (req, res) => {
  const { clienteId, corteId, barberoId, fecha, hora } = req.body;
  const sql = 'INSERT INTO citapendiente (cliente_id, corte_id, barbero_id, fecha, hora) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [clienteId, corteId, barberoId, fecha, hora], (err) => {
    if (err) return res.status(500).json({ error: 'Error al crear la cita' });
    res.status(200).json({ message: 'Cita registrada correctamente' });
  });
};

exports.obtenerCitasPendientes = (req, res) => {
  db.query('SELECT * FROM citapendiente', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener citas pendientes' });
    res.status(200).json(results);
  });
};

exports.obtenerCitasCumplidas = (req, res) => {
  db.query('SELECT * FROM citacumplida', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener citas cumplidas' });
    res.status(200).json(results);
  });
};

exports.cumplirCita = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM citapendiente WHERE id = ?', [id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'Cita no encontrada' });

    const cita = results[0];
    db.query('INSERT INTO citacumplida SET ?', cita, (err2) => {
      if (err2) return res.status(500).json({ error: 'Error al mover cita a cumplidas' });

      db.query('DELETE FROM citapendiente WHERE id = ?', [id], (err3) => {
        if (err3) return res.status(500).json({ error: 'Error al eliminar cita pendiente' });
        res.status(200).json({ message: 'Cita marcada como cumplida' });
      });
    });
  });
};

exports.rechazarCita = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM citapendiente WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al rechazar cita' });
    res.status(200).json({ message: 'Cita rechazada' });
  });
};