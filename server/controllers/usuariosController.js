const db = require('../db/conexion');

// Crear un nuevo usuario
exports.crearUsuario = (req, res) => {
  const { nombre, telefono, edad, correo, pasword, estado } = req.body;

  db.query(
    'INSERT INTO usuarios (nombre, telefono, edad, correo, pasword, estado) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, telefono, edad, correo, pasword, estado],
    (err, result) => {
      if (err) {
        console.log('Error al crear usuario:', err);
        return res.status(500).send('Error al crear usuario');
      }
      res.send('Cliente registrado con éxito');
    }
  );
};

// Obtener todos los barberos
exports.obtenerBarberos = (req, res) => {
  const sql = "SELECT * FROM usuarios WHERE estado = 'Barbero'";
  db.query(sql, (err, results) => {
    if (err) {
      console.log('Error al obtener barberos:', err);
      return res.status(500).send('Error en el servidor');
    }
    res.json(results);
  });
};

// Obtener barbero por ID
exports.obtenerBarberoPorId = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM usuarios WHERE id = ? AND estado = 'Barbero'";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send('Error en el servidor');
    if (result.length === 0) return res.status(404).send('Barbero no encontrado');
    res.json(result[0]);
  });
};

// Eliminar usuario por nombre y estado
exports.eliminarUsuario = (req, res) => {
  const { nombre, estado } = req.body;
  const sql = "DELETE FROM usuarios WHERE nombre = ? AND estado = ?";
  db.query(sql, [nombre, estado], (err, result) => {
    if (err) return res.status(500).send('Error en el servidor');
    if (result.affectedRows === 0) return res.status(404).send('No se encontró el usuario');
    res.send('Usuario eliminado correctamente');
  });
};

// Actualizar datos de un barbero por ID
exports.actualizarBarbero = (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, edad, correo } = req.body;
  const sql = `
    UPDATE usuarios 
    SET nombre = ?, telefono = ?, edad = ?, correo = ?
    WHERE id = ? AND estado = 'Barbero'
  `;
  db.query(sql, [nombre, telefono, edad, correo, id], (err, result) => {
    if (err) return res.status(500).send('Error al actualizar barbero');
    res.send('Barbero actualizado correctamente');
  });
};

// Mostrar usuarios filtrados por estado
exports.mostrarClientes = (req, res) => {
  const estado = req.query.estado;
  const sql = "SELECT * FROM usuarios WHERE estado = ?";
  db.query(sql, [estado], (err, result) => {
    if (err) return res.status(500).send('Error en el servidor');
    res.json(result);
  });
};

// Login
exports.login = (req, res) => {
  const { nombre, pasword } = req.body;
  const sql = "SELECT * FROM usuarios WHERE nombre = ? AND pasword = ?";
  db.query(sql, [nombre, pasword], (err, result) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (result.length > 0) {
      res.json({ message: 'Login exitoso', user: result[0] });
    } else {
      res.status(401).json({ message: 'Nombre o contraseña incorrectos' });
    }
  });
};

// Modificar usuario completo
exports.modificarUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, edad, correo, pasword } = req.body;

  const updateQuery = `
    UPDATE usuarios 
    SET nombre = ?, telefono = ?, edad = ?, correo = ?, pasword = ?
    WHERE id = ?
  `;

  db.query(updateQuery, [nombre, telefono, edad, correo, pasword, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({ message: 'Error al actualizar usuario' });
    }

    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al obtener usuario actualizado' });
      }
      res.json({ usuarioActualizado: result[0] });
    });
  });
};
